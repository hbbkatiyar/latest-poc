import React, { useEffect, useState } from "react";
import Backdrop from "../loader/backdrop";
import { useHistory } from "react-router";
import { postWebService } from "../../helpers/server";
import { buildInitiateRazorpay, parseMessage } from "../../helpers/utils";
import { buildRazorpayResponseErrorMessage } from "../../helpers/proposal";
import { Box, Button, Typography } from "@material-ui/core";
import {
  ASSURANCE_PRODUCT_CATEGORY_SLUG,
  BUTTON_GO_BACK_TO_DASHBOARD,
  BUTTON_GO_BACK_TO_REVIEW_DETAILS,
  BUTTON_PROCESSING,
} from "../../constants/index";

const styles = {
  buyButton: {
    borderRadius: "2vh",
  },
};

const RazorpayPayment = (props) => {
  const {
    cancelPaymentSearchParams = "",
    entity = "order",
    entity_id = null,
    errors = [],
    is_credit_bulk_payment = false,
    is_monthly = false,
    is_recurring = false,
    quotationDetails: { name = null, mobile = null, email = null },
    redirectUrl,
    searchParams = null,
    setErrors,
    take_first_payment = false,
  } = props;
  const history = useHistory();
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [paymentInitiated, setPaymentInitiated] = useState(false);
  const [showBackdrop, setShowBackdrop] = useState(false);

  useEffect(() => {
    handlePayClick();
  }, []);

  const buildRazorpayOptions = ({
    key = null,
    rp_order_id,
    rp_key = null,
    dealer_id = null,
    rp_merchant_account = null,
  }) => {
    return {
      key: rp_key ? rp_key : key,
      order_id: rp_order_id,
      handler: (response) => {
        updateRazorPayPaymentResponse(response, dealer_id, rp_merchant_account);
      },
      prefill: {
        name: name,
        contact: mobile,
        email: email,
      },
      notes: {
        order_id: entity_id,
        entity: entity,
      },
      modal: {
        ondismiss: function () {
          setIsFormSubmitted(false);
          setPaymentInitiated(false);
        },
      },
    };
  };

  const openCheckout = (options) => {
    let rzp = new window.Razorpay(options);
    rzp.open();
  };

  const navigateTo = (pathname, search = null) => {
    history.push({
      pathname,
      search: search ? `?${search}` : null,
    });
  };

  const cbUpdateRazorPayPaymentResponse = ({ success }) => {
    if (success) {
      setTimeout(() => {
        setShowBackdrop(false);
      }, 1000);
      navigateTo(redirectUrl, searchParams);
    } else {
      console.log("need to handle error here...");
    }
  };

  const updateRazorPayPaymentResponse = async (
    {
      razorpay_payment_id,
      razorpay_signature,
      razorpay_order_id,
      razorpay_subscription_id = "",
    },
    dealer_id,
    rp_merchant_account = null
  ) => {
    try {
      setShowBackdrop(true);

      const payload = is_credit_bulk_payment
        ? {
            entity,
            entity_id: dealer_id,
            razorpay_payment_id,
            razorpay_signature,
            razorpay_order_id,
            razorpay_subscription_id,
            ...(rp_merchant_account && { rp_merchant_account }),
          }
        : {
            entity,
            entity_id,
            is_recurring,
            is_monthly,
            take_first_payment,
            razorpay_payment_id,
            razorpay_signature,
            razorpay_order_id,
          };
      const response = await postWebService("razorpay/response", payload);

      cbUpdateRazorPayPaymentResponse(response.data);
    } catch (error) {
      cbError(
        error && error.response && error.response.data
          ? error.response.data
          : buildRazorpayResponseErrorMessage()
      );
    }
  };

  const cbInitiate = ({ data, success }) => {
    success
      ? openCheckout(buildRazorpayOptions(data))
      : console.log("need to handle error here...");
  };

  const cbError = ({ data: { error_msg }, data }) => {
    setErrors(parseMessage(error_msg));
    setPaymentInitiated(false);
    setIsFormSubmitted(false);
  };

  const initiateRazorpayForEntity = async () => {
    try {
      const payload = buildInitiateRazorpay(entity, entity_id);
      const response = await postWebService("initiateRazorpay", payload);

      cbInitiate(response.data);
    } catch (error) {
      cbError(error.response.data);
    }
  };

  const initiateRazorpayForCreditBulkPayment = async () => {
    try {
      const response = await postWebService("credit", {
        product_category_slug: ASSURANCE_PRODUCT_CATEGORY_SLUG,
      });

      cbInitiate(response.data);
    } catch (error) {
      cbError(error.response.data);
    }
  };

  const handlePayClick = () => {
    setIsFormSubmitted(true);
    setPaymentInitiated(true);

    is_credit_bulk_payment
      ? initiateRazorpayForCreditBulkPayment()
      : initiateRazorpayForEntity();
  };

  return (
    <>
      {errors.length > 0 && (
        <Box mt={5} mb={5}>
          <Typography variant={"span"} gutterBottom style={{ color: "red" }}>
            {errors}
          </Typography>
        </Box>
      )}

      <Button
        type="button"
        size="large"
        variant={"contained"}
        color="primary"
        onClick={() =>
          navigateTo(
            is_credit_bulk_payment
              ? redirectUrl
              : `/product/buy/review/${entity_id}`,
            cancelPaymentSearchParams
          )
        }
        {...((isFormSubmitted || paymentInitiated) && { disabled: true })}
        style={styles.buyButton}
      >
        {paymentInitiated
          ? BUTTON_PROCESSING
          : is_credit_bulk_payment
          ? BUTTON_GO_BACK_TO_DASHBOARD
          : BUTTON_GO_BACK_TO_REVIEW_DETAILS}
      </Button>

      {showBackdrop && <Backdrop />}
    </>
  );
};

export default RazorpayPayment;
