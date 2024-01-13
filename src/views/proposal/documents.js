import React, { useContext, useEffect, useState } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import CircularProgress from "@material-ui/core/CircularProgress";
import DocumentsForm from "./documentsForm";
import LendingContext from "../../context/index";
import useApi from "../../hooks/useApi";
import { Box } from "@material-ui/core";
import { useStyles } from "./summaryStyles";
import { useHistory, useParams } from "react-router";
import {
  getRoute,
  getStorageItem,
  logout,
  navigateToUrl,
  parseMessage,
  scrollTop,
} from "../../helpers/utils";
import { ReducerUtils } from "../../constants/reducers";
import {
  buildUpdateHandoverPayload,
  buildSystemErrorMessage,
  calculateEMI,
  reBuildOrderDetails,
} from "../../helpers/proposal";
import { postWebService, putWebService } from "../../helpers/server";
import { HANDOVER } from "../../constants";

function Documents(props) {
  const {
    classes: { loaderBox },
  } = props;

  const { order: orderId } = useParams();
  const history = useHistory();

  const orderDetails = useApi(`lending/proposal/${orderId}`);
  const { state, dispatch } = useContext(LendingContext);

  const [errors, setErrors] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [form, setForm] = useState({
    amount: null,
    tenure: null,
    emi: null,
    repay_amount: null,
    interest_rate: null,
  });

  useEffect(() => scrollTop(), []);

  useEffect(() => {
    if (orderDetails) {
      dispatchEvent(
        ReducerUtils.order.details,
        reBuildOrderDetails(orderDetails)
      );

      const {
        data: { amount, emi, interest_rate, repay_amount, tenure },
      } = orderDetails;
      setForm({
        ...form,
        amount,
        emi,
        interest_rate,
        repay_amount,
        tenure,
      });
      setIsLoaded(true);
    }
  }, [orderDetails]);

  useEffect(() => {
    setFormState(
      "emi",
      calculateEMI(form.amount, form.interest_rate, form.tenure)
    );
  }, [form.amount]);

  useEffect(() => {
    setFormState(
      "emi",
      calculateEMI(form.amount, form.interest_rate, form.tenure)
    );
  }, [form.tenure]);

  useEffect(() => {
    setFormState("repay_amount", form.emi * form.tenure * 12);
  }, [form.emi]);

  const dispatchEvent = (type, payload) => dispatch({ type, payload });

  const doForceLogout = () => {
    // Here setTimeout has been added in order to introduced some delay so that dealer should be able to read error message clearly before redirecting it to login page
    setTimeout(() => {
      logout();
      navigateToUrl("/", history);
    }, 1000);
  };

  const setFormState = function (name, value) {
    setForm({
      ...form,
      [name]: value,
    });
  };

  const cbError = ({ data: { error_msg }, code = 400 }, modalKey = "") => {
    setIsFormSubmitted(false);

    const message = parseMessage(error_msg);
    if (Array.isArray(message)) {
      setErrors(message);
    } else {
      let messageArray = [];
      messageArray.push(message);
      setErrors(messageArray);
    }

    if (code === 401) {
      doForceLogout();
    }
  };

  const handleClick = async () => navigateToUrl(`${getRoute("acknowledgement")}/${orderId}`, history);

  const cbUpdateProposal = ({ data }, action) => {
    setIsFormSubmitted(false);

    const routeKey = action === HANDOVER ? "handover" : "acknowledgement";
    navigateToUrl(`${getRoute(routeKey)}/${orderId}`, history);
  };

  const updateProposal = async (action = HANDOVER) => {
    try {
      setErrors([]);
      setIsFormSubmitted(true);

      const response = await putWebService(
        `lending/proposal/${orderId}`,
        { action }
      );

      cbUpdateProposal(response.data, action);
    } catch (error) {
      cbError(
        error && error.response && error.response.data
          ? error.response.data
          : buildSystemErrorMessage()
      );
    }
  };

  /* Start File Upload Section */
  const [pancard, setPancard] = useState("");
  const [aadhaarFront, setAadhaarFront] = useState("");
  const [aadhaarBack, setAadhaarBack] = useState("");
  const [fileSize, setFileSize] = useState(true);
  const [fileUploadProgress, setFileUploadProgress] = useState(false);
  const [fileUploadResponse, setFileUploadResponse] = useState(null);
  
  const uploadPancardHandler = (event) => {
    setPancard(event.target.files);
  };

  const uploadAadhaarFrontSideHandler = (event) => {
    setAadhaarFront(event.target.files);
  };

  const uploadAadhaarBackSideHandler = (event) => {
    setAadhaarBack(event.target.files);
  };

  const fileToBase64 = (file) => {
		return new Promise((resolve) => {
			var reader = new FileReader();
			reader.onload = function (event) {
				resolve(event.target.result);
			};
			reader.readAsDataURL(file);
		});
  };
  
  const fileSubmitHandler = async (event) => {
    event.preventDefault();

    setFileSize(true);
    setFileUploadProgress(true);
    setFileUploadResponse(null);

    const documents = [];

    for (let i = 0; i < pancard.length; i++) {
      documents.push({
        data: await fileToBase64(pancard[i]),
        category: "pancard"
      });
    }

    for (let i = 0; i < aadhaarFront.length; i++) {
      documents.push({
        data: await fileToBase64(aadhaarFront[i]),
        category: "aadhaar_front_side"
      });
    }

    for (let i = 0; i < aadhaarBack.length; i++) {
      documents.push({
        data: await fileToBase64(aadhaarBack[i]),
        category: "aadhaar_back_side"
      });
    }
    
    uploadDocuments(documents);
  };
  
  const uploadDocuments = async (payload) => {
    try {
      setErrors([]);
      setIsFormSubmitted(true);

      const response = await postWebService(`lending/proposal/${orderId}/documents`, payload);
      
      setIsFormSubmitted(false);
      setFileUploadProgress(false);
      setFileUploadResponse(response.data.message);
      handleClick();
    } catch (error) {
      cbError(
        error && error.response && error.response.data
          ? error.response.data
          : buildSystemErrorMessage()
      );
    }
  };
  /* End File Upload Section */

  return isLoaded && orderDetails ? (
    <DocumentsForm
      errors={errors}
      form={form}
      isFormSubmitted={isFormSubmitted}
      handleClick={handleClick}
      uploadDocuments={uploadDocuments}
      uploadPancardHandler={uploadPancardHandler}
      uploadAadhaarFrontSideHandler={uploadAadhaarFrontSideHandler}
      uploadAadhaarBackSideHandler={uploadAadhaarBackSideHandler}
      updateProposal={updateProposal}
      fileUploadResponse={fileUploadResponse}
      fileUploadProgress={fileUploadProgress}
      fileSubmitHandler={fileSubmitHandler}
      fileSize={fileSize}
    />
  ) : (
    <Box className={loaderBox}>
      <CircularProgress color={"secondary"} />
    </Box>
  );
}

export default withStyles(useStyles, { withTheme: true })(Documents);
