import React, { useContext } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import CallToAction from "./partials/cta";
import LendingContext from "../../context/index";
import ErrorMessage from "./partials/error";
import Quotes from "./quotes/index";
import SimpleBackdrop from "../../components/loader/backdrop";
import SummaryField from "./partials/summaryField";
import { Box, Typography } from "@material-ui/core";
import { useStyles } from "./summaryStyles";
import { vehicleCategoryIcon } from "../../defaultValues/index";
import {
  BUTTON_HANDOVER,
  BUTTON_PROCEED,
  HANDOVER,
} from "../../constants/index";
import {
  isHandoverButtonDisabled,
  isHandoverButtonVisible,
  isProceedButtonVisible,
} from "../../helpers/proposal";
import { getStorageItem } from "../../helpers/utils";

function LoanSummaryDetails(props) {
  const {
    state: {
      orderDetails: {
        responses_vehicle_category: vehicle_category,
        responses_vehicle_manufacturer: vehicle_manufacturer,
        responses_vehicle_model: vehicle_model,
        responses_vehicle_variant: vehicle_variant,
        responses_ex_showroom_price: ex_showroom_price,
        responses_dealer_code: dealer_code,
        responses_on_road_price: on_road_price,
      },
      orderDetails = null,
    },
  } = useContext(LendingContext);
  const {
    classes: {
      headerBox,
      headerBoxOuter,
      headerDetailsBox,
      headerTitle,
      main,
      vehicleIcon,
    },
    amountChangeHandler,
    errors,
    form,
    isFormSubmitted,
    provisionalQuotes = [],
    refreshClickHandler,
    selectQuoteClickHandler,
    showBackdrop,
    tenureChangeHandler,
    updateProposal,
  } = props;

  return (
    orderDetails && (
      <>
        <Box>
          <Box className={main}>
            <Box className={headerBoxOuter}>
              <Box className={headerBox}>
                <Box className={headerTitle}>
                  {/* {vehicleCategoryIcon[vehicle_category] && (
                    <img
                      src={vehicleCategoryIcon[vehicle_category]}
                      className={vehicleIcon}
                    />
                  )} */}
                  <Typography variant={"body2"}>
                    {`${getStorageItem("brand")} - ${getStorageItem("model")}`}
                  </Typography>
                </Box>
              </Box>

              <Box className={headerDetailsBox}>
                <SummaryField
                  label={"Dealer Quoted Price"}
                  value={
                    getStorageItem("on_road_price")
                      ? `₹${Number(getStorageItem("on_road_price")).toLocaleString("en")}`
                      : "N/A"
                  }
                />
                <SummaryField
                  label={"Invoice Amount"}
                  value={`₹${Number(getStorageItem("ex_showroom_price")).toLocaleString("en")}`}
                />
                <SummaryField label={"Reference Code"} value={getStorageItem("dealer_code")} />
              </Box>

              <Box>
                <Quotes
                  amountChangeHandler={amountChangeHandler}
                  form={form}
                  provisionalQuotes={provisionalQuotes}
                  refreshClickHandler={refreshClickHandler}
                  selectQuoteClickHandler={selectQuoteClickHandler}
                  tenureChangeHandler={tenureChangeHandler}
                />
              </Box>
            </Box>
          </Box>

          <ErrorMessage errors={errors} />

          {form.selected_quote && (
            <Box justifyContent="center" align="center">
              <Box>
                {isProceedButtonVisible(form) && (
                  <CallToAction
                    handleClick={() => updateProposal()}
                    isDisabled={
                      isFormSubmitted || isHandoverButtonDisabled(form)
                    }
                    isFormSubmitted={isFormSubmitted}
                    text={BUTTON_PROCEED}
                  />
                )}

                {isHandoverButtonVisible(form) && (
                  <CallToAction
                    handleClick={() => updateProposal(HANDOVER)}
                    isDisabled={
                      isFormSubmitted || isHandoverButtonDisabled(form)
                    }
                    isFormSubmitted={isFormSubmitted}
                    text={BUTTON_HANDOVER}
                  />
                )}
              </Box>
            </Box>
          )}
        </Box>
        { showBackdrop && <SimpleBackdrop /> }
      </>
    )
  );
}

export default withStyles(useStyles, { withTheme: true })(LoanSummaryDetails);
