import React, { useContext, useEffect, useState } from "react";
import ApplicationContext from "../../context/index";
import CircularProgress from "@material-ui/core/CircularProgress";
import CustomerAadhaarForm from "./aadhaarForm";
import CustomerAadhaarOTPForm from "./otpForm";
import CustomerDetailsForm from "./customerForm";
import SectionTitle from "../../components/sectionTitle";
import isEmail from "validator/lib/isEmail";
import isMobilePhone from "validator/lib/isMobilePhone";
import moment from "moment";
import withStyles from "@material-ui/core/styles/withStyles";
import { useStyles } from "./indexFormStyles";
import { Box } from "@material-ui/core";
import {
  getRoute,
  getStorageItem,
  parseMessage,
  setStorageItem,
} from "../../helpers/utils";
import { ReducerUtils } from "../../constants/reducers";
import { useHistory } from "react-router";
import { Utils } from "../../constants/utils";
import { getWebService } from "../../helpers/server";
import { validations } from "../../messages/validation";
import {
  buildSystemErrorMessage,
  getMinDobDate,
  getMaxDobDate,
} from "../../helpers/buyflow";
import { FORM_FIELD_MOBILE } from "../../constants/field";
import {
  AADHAAR_NUMBER_LIST,
  DEFAULT_AADHAAR_NUMBER,
  FORMAT_DD_MM_YYYY,
} from "../../constants/index";

const defaultCustomerObject = {
  aadhaar_number: false,
  email: false,
  otp: false,
  mobile: false,
  name: false,
  dob: false,
  gender: false,
  address: false,
};

function CustomerDetails({ classes: { container, loaderBox, main } }) {
  const { state, dispatch } = useContext(ApplicationContext);
  const history = useHistory();
  const [errorMessage, setErrorMessage] = useState({
    ...defaultCustomerObject,
  });
  const [errors, setErrors] = useState([]);
  const [form, setForm] = useState({
    aadhaar_number: "",
    email: "",
    otp: "",
    email: getStorageItem("email") ? getStorageItem("email") : "",
    mobile: getStorageItem("mobile") ? getStorageItem("mobile") : "",
    name: getStorageItem("name") ? getStorageItem("name") : "",
    dob: getStorageItem("dob") ? getStorageItem("dob") : "",
    gender: getStorageItem("gender") ? getStorageItem("gender") : "",
    address: getStorageItem("address") ? getStorageItem("address") : "",
    partnerId: getStorageItem("partnerId"),
    generateOtp: getStorageItem("generateOtp")
      ? JSON.parse(getStorageItem("generateOtp").toLowerCase())
      : false,
    verifyOtp: getStorageItem("verifyOtp")
      ? JSON.parse(getStorageItem("verifyOtp").toLowerCase())
      : false,
  });
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [isLoaded, setIsLoaded] = useState(true);
  const [modal, setModal] = useState({ open: false });
  const [touchFields, setTouchFields] = useState({
    ...defaultCustomerObject,
  });

  /* Start: Form Validation Section */
  useEffect(
    () => validatePanAndAadhaarNumber("aadhaar_number", form.aadhaar_number),
    [form.aadhaar_number]
  );

  useEffect(() => validateEmail("email"), [form.email]);

  useEffect(() => validateMobile(), [form.mobile]);

  useEffect(() => validateRequiredInput("name"), [form.name]);

  useEffect(() => validateDateOfBirth("dob"), [form.dob]);

  useEffect(() => validateRequiredInput("gender"), [form.gender]);

  useEffect(() => validateRequiredInput("address"), [form.address]);

  const validateMobile = () => {
    if (form[FORM_FIELD_MOBILE]) {
      let isValid = isMobilePhone(form[FORM_FIELD_MOBILE], ["en-IN"]);
      setStateVariables(
        FORM_FIELD_MOBILE,
        isValid,
        isValid ? "" : validations[FORM_FIELD_MOBILE].valid
      );
    } else if (touchFields[FORM_FIELD_MOBILE]) {
      setErrorMessageState(
        FORM_FIELD_MOBILE,
        validations[FORM_FIELD_MOBILE].required
      );
    }
  };

  const validateEmail = (fieldName) => {
    if (form[fieldName]) {
      let isValid = isEmail(form[fieldName]);
      setStateVariables(
        fieldName,
        isValid,
        isValid ? "" : validations[fieldName].valid
      );
    } else if (touchFields[fieldName]) {
      setErrorMessageState(fieldName, validations[fieldName].required);
    }
  };

  const validateDateOfBirth = (fieldName) => {
    if (form[fieldName]) {
      const minDate = getMinDobDate();
      const maxDate = getMaxDobDate();

      if (
        moment(form[fieldName]).isSameOrAfter(minDate) &&
        moment(form[fieldName]).isSameOrBefore(maxDate)
      ) {
        setTouchFieldsState(fieldName, true);
        setErrorMessageState(fieldName, "");
      } else if (!moment(form[fieldName]).isSameOrAfter(minDate)) {
        setErrorMessageState(
          fieldName,
          validations[fieldName].min +
            " " +
            moment(minDate).format(FORMAT_DD_MM_YYYY) +
            ". (Maximum age should be 99 years)"
        );
      } else if (!moment(form[fieldName]).isSameOrBefore(maxDate)) {
        setErrorMessageState(
          fieldName,
          validations[fieldName].max +
            " " +
            moment(maxDate).format(FORMAT_DD_MM_YYYY) +
            ". (Minimum age should be 18 years)"
        );
      } else {
        setErrorMessageState(fieldName, validations[fieldName].valid);
      }
    } else if (touchFields[fieldName]) {
      setErrorMessageState(fieldName, validations[fieldName].required);
    }
  };

  const validatePanAndAadhaarNumber = (fieldName, fieldValue) => {
    if (fieldValue) {
      let isValid = Utils.regex[fieldName].test(fieldValue);
      setStateVariables(
        fieldName,
        isValid,
        isValid ? "" : validations[fieldName].valid
      );
    } else if (touchFields[fieldName]) {
      setErrorMessageState(fieldName, validations[fieldName].required);
    }
  };

  const setStateVariables = (key, isValid, message) => {
    setFormState("hasError", !isValid);
    setErrorMessageState(key, message);
    setTouchFieldsState(key, true);
  };

  const setTouchFieldsState = (name, value) =>
    setTouchFields({ ...touchFields, [name]: value });

  const validateRequiredInput = (fieldName) => {
    if (form[fieldName]) {
      setTouchFieldsState(fieldName, true);
      setErrorMessageState(fieldName, "");
    } else if (touchFields[fieldName] && !form[fieldName]) {
      setErrorMessageState(fieldName, validations[fieldName].required);
    }
  };

  const validateInputLength = (event) => {
    let elName = event.target.name;
    let elValue = event.target.value;

    if (event.target.name === "aadhaar_number" || event.target.name === "otp") {
      var clean = elValue.replace(/[^0-9]+/g, "");
      event.target.value = clean;
    }

    if (elValue.length > Utils.limit.digits[elName]) {
      event.target.value = elValue.substring(0, Utils.limit.digits[elName]);
    }
  };

  const setErrorMessageState = (name, value) =>
    setErrorMessage({ ...errorMessage, [name]: value });

  const setFormState = (name, value) => setForm({ ...form, [name]: value });
  /* End: Form Validation Section */

  const cbError = ({ data: { error_msg } }) => {
    setIsFormSubmitted(false);

    const message = parseMessage(error_msg);
    if (Array.isArray(message)) {
      setErrors(message);
    } else {
      let messageArray = [];
      messageArray.push(message);
      setErrors(messageArray);
    }
  };

  const dispatchEvent = (type, payload) => dispatch({ type, payload });

  const handleChange = (event) =>
    setFormState(event.target.name, event.target.value);

  const navigateTo = (pathname) => history.push({ pathname });

  const onSubmit = (event) => {
    event.preventDefault();

    setStorageItem("email", form.email);
    setStorageItem("mobile", form.mobile);
    setStorageItem("name", form.name);
    setStorageItem("dob", form.dob);
    setStorageItem("gender", form.gender);
    setStorageItem("address", form.address);
    navigateTo(getRoute("payment"));
  };

  const cbSuccessGenerateOtp = ({ data }) => {
    console.log(data);
    setIsFormSubmitted(false);
    setForm({
      ...form,
      generateOtp: true,
    });
    setStorageItem("generateOtp", true);
  };

  const onSubmitGenerateOtp = async (event) => {
    try {
      event.preventDefault();
      setErrors([]);
      setIsFormSubmitted(true);

      const response = await getWebService(`/data/otp.json`);

      cbSuccessGenerateOtp(response.data);
    } catch (error) {
      cbError(
        error && error.response && error.response.data
          ? error.response.data
          : buildSystemErrorMessage()
      );
    }
  };

  const onSuccessVerifyOtp = ({
    data: { email, mobile, name, dob, gender, address },
  }) => {
    setIsFormSubmitted(false);
    setForm({
      ...form,
      verifyOtp: true,
      email,
      mobile,
      name,
      dob,
      gender,
      address,
    });
    setStorageItem("verifyOtp", true);
  };

  const onSubmitVerifyOtp = async (event) => {
    try {
      event.preventDefault();
      setErrors([]);
      setIsFormSubmitted(true);

      const folderName =
        AADHAAR_NUMBER_LIST.indexOf(form.aadhaar_number) > -1
          ? form.aadhaar_number
          : DEFAULT_AADHAAR_NUMBER;
      const response = await getWebService(
        `/data/${folderName}/customer-details.json`
      );

      onSuccessVerifyOtp(response.data);
    } catch (error) {
      cbError(
        error && error.response && error.response.data
          ? error.response.data
          : buildSystemErrorMessage()
      );
    }
  };

  return isLoaded ? (
    <Box className={main}>
      <Box container={"true"} justifyContent="center" className={container}>
        <SectionTitle title={"Customer Details"} secondaryTitle={"e-KYC"} />

        {!form.generateOtp && !form.verifyOtp && (
          <CustomerAadhaarForm
            form={form}
            errorMessage={errorMessage}
            handleChange={handleChange}
            isFormSubmitted={isFormSubmitted}
            onSubmit={onSubmitGenerateOtp}
            validateInputLength={validateInputLength}
          />
        )}

        {form.generateOtp && !form.verifyOtp && (
          <CustomerAadhaarOTPForm
            form={form}
            errorMessage={errorMessage}
            handleChange={handleChange}
            isFormSubmitted={isFormSubmitted}
            onSubmit={onSubmitVerifyOtp}
            validateInputLength={validateInputLength}
          />
        )}

        {form.verifyOtp && (
          <CustomerDetailsForm
            form={form}
            errorMessage={errorMessage}
            errors={errors}
            handleChange={handleChange}
            isFormSubmitted={isFormSubmitted}
            modal={modal}
            onSubmit={onSubmit}
            validateInputLength={validateInputLength}
          />
        )}
      </Box>
    </Box>
  ) : (
    <Box className={loaderBox}>
      <CircularProgress color={"secondary"} />
    </Box>
  );
}

export default withStyles(useStyles, { withTheme: true })(CustomerDetails);
