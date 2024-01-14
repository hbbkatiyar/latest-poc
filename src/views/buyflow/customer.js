import React, { useContext, useEffect, useState } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import CallToAction from "./partials/cta";
import ErrorMessage from "./partials/error";
import ApplicationContext from "../../context/index";
import CircularProgress from "@material-ui/core/CircularProgress";
import isEmail from "validator/lib/isEmail";
import isMobilePhone from "validator/lib/isMobilePhone";
import moment from "moment";
import { useStyles } from "./indexFormStyles";
import {
  Box,
  Button,
  Grid,
  Hidden,
  TextField,
  Typography,
} from "@material-ui/core";
import { getRoute, getStorageItem, parseMessage, setStorageItem } from "../../helpers/utils";
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
import { FORMAT_DD_MM_YYYY } from "../../constants/index";

function CustomerDetails({
  classes: {
    container,
    main,
    formGroup,
    gutterTop,
    textField,
    loaderBox,
    buyButton,
    button,
    mainCta,
    text,
    buttonText,
    loaderStyle,
  },
}) {
  const { state, dispatch } = useContext(ApplicationContext);
  const history = useHistory();
  const [errorMessage, setErrorMessage] = useState({
    aadhaar_number: false,
    email: false,
    otp: false,
    mobile: false,
    name: false,
    dob: false,
    gender: false,
    address: false,
  });
  const [errors, setErrors] = useState([]);
  const [form, setForm] = useState({
    aadhaar_number: "",
    email: "",
    otp: "",
    mobile: getStorageItem("mobile")  ? getStorageItem("mobile")  : "",
    name: getStorageItem("name")  ? getStorageItem("name")  : "",
    dob: getStorageItem("dob")  ? getStorageItem("dob")  : "",
    gender: getStorageItem("gender")  ? getStorageItem("gender")  : "",
    address: getStorageItem("address")  ? getStorageItem("address")  : "",
    partnerId: getStorageItem("partnerId"),
    generateOtp: getStorageItem("generateOtp") ? JSON.parse(getStorageItem("generateOtp").toLowerCase()) : false,
    verifyOtp: getStorageItem("verifyOtp") ? JSON.parse(getStorageItem("verifyOtp").toLowerCase()) : false,
  });
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [isLoaded, setIsLoaded] = useState(true);
  const [modal, setModal] = useState({ open: false });
  const [touchFields, setTouchFields] = useState({
    aadhaar_number: false,
    email: false,
    otp: false,
    mobile: false,
    name: false,
    dob: false,
    gender: false,
    address: false,
  });

  // dispatchEvent(ReducerUtils.product.details, productDetails);

  useEffect(() => {
    validatePanAndAadhaarNumber("aadhaar_number", form.aadhaar_number);
  }, [form.aadhaar_number]);

  useEffect(() => {
    validateEmail("email");
  }, [form.email]);

  useEffect(() => {
    validateMobile();
  }, [form.mobile]);

  useEffect(() => {
    validateRequiredInput("name");
  }, [form.name]);

  useEffect(() => {
    validateDateOfBirth("dob");
  }, [form.dob]);

  useEffect(() => {
    validateRequiredInput("gender");
  }, [form.gender]);

  useEffect(() => {
    validateRequiredInput("address");
  }, [form.address]);

  /* Start: Customer Details Section */
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
  /* End: Customer Details Section */

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

  const dispatchEvent = (type, payload) => dispatch({ type, payload });

  const setFormState = (name, value) => setForm({ ...form, [name]: value });

  const setErrorMessageState = (name, value) =>
    setErrorMessage({ ...errorMessage, [name]: value });

  const handleChange = (event) =>
    setFormState(event.target.name, event.target.value);

  const navigateTo = (pathname) => history.push({ pathname });

  const onSubmit = (event) => {
    event.preventDefault();

    navigateTo(getRoute("payment"));
  };

  const handleClick = (event) => {
    event.preventDefault();

    setStorageItem("mobile", form.mobile);
    setStorageItem("name", form.name);
    setStorageItem("dob", form.dob);
    setStorageItem("gender", form.gender);
    setStorageItem("address", form.address);

    navigateTo(getRoute("payment"));
  };

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

  const handleGenerateOtp = async () => {
    try {
      setErrors([]);
      setIsFormSubmitted(true);

      const response = await getWebService(`/data/otp.json`);
      const { data } = response.data;
      console.log(data);
      setIsFormSubmitted(false);
      setForm({
        ...form,
        generateOtp: true,
      });
      setStorageItem("generateOtp", true);
    } catch (error) {
      console.log(error);
      cbError(
        error && error.response && error.response.data
          ? error.response.data
          : buildSystemErrorMessage()
      );
    }
  };

  const handleVerifyOtp = async () => {
    try {
      setErrors([]);
      setIsFormSubmitted(true);

      const folderName = ["123456789012", "554787508115"].indexOf(form.aadhaar_number) > -1 ? form.aadhaar_number : "123456789012";
      const response = await getWebService(
        `/data/${folderName}/customer-details.json`
      );
      const {
        data: { mobile, name, dob, gender, address },
        data,
      } = response.data;
      console.log(data);
      setIsFormSubmitted(false);
      setForm({
        ...form,
        verifyOtp: true,
        mobile,
        name,
        dob,
        gender,
        address,
      });
      setStorageItem("verifyOtp", true);
    } catch (error) {
      console.log(error);
      cbError(
        error && error.response && error.response.data
          ? error.response.data
          : buildSystemErrorMessage()
      );
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

  return isLoaded ? (
    <Box className={main}>
      <Box container={"true"} justifyContent="center" className={container}>
        <Box m={3}>
          <Typography variant="h5">Customer Details <br/>e-KYC</Typography>
        </Box>

        {!form.generateOtp && !form.verifyOtp && (
          <Box m={2} direction="column" style={{ width: "100%" }}>
            <Grid container spacing={2}>
              <Grid container item xs>
                <Box className={formGroup}>
                  <TextField
                    id="standard-basic"
                    variant="outlined"
                    value={form.aadhaar_number}
                    name="aadhaar_number"
                    onInput={validateInputLength}
                    onChange={handleChange}
                    autoComplete="off"
                    placeholder="Aadhaar Number"
                    helperText={errorMessage.aadhaar_number}
                  />
                </Box>
              </Grid>
              <Grid container item xs>
                <Box className={formGroup}>
                  <Button
                    type={"click"}
                    variant={"contained"}
                    className={`${buyButton} ${button}`}
                    color={"primary"}
                    size={"large"}
                    onClick={handleGenerateOtp}
                    {...((isFormSubmitted ||
                      !form.aadhaar_number ||
                      errorMessage.aadhaar_number ||
                      !form.email ||
                      errorMessage.email) && { disabled: true })}
                  >
                    OTP
                  </Button>
                </Box>
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid container item xs>
                <Box className={formGroup}>
                  <TextField
                    id="standard-basic"
                    variant="outlined"
                    value={form.email}
                    name="email"
                    onInput={validateInputLength}
                    onChange={handleChange}
                    autoComplete="off"
                    placeholder="Email ID"
                    helperText={errorMessage.email}
                  />
                </Box>
              </Grid>
              <Grid container item xs="4"></Grid>
            </Grid>
          </Box>
        )}

        {form.generateOtp && !form.verifyOtp && (
          <Box m={2} direction="column" style={{ width: "100%" }}>
            <Grid container spacing={2}>
              <Grid container item xs>
                <Box className={formGroup}>
                  <TextField
                    id="standard-basic"
                    variant="outlined"
                    value={form.otp}
                    name="otp"
                    onInput={validateInputLength}
                    onChange={handleChange}
                    autoComplete="off"
                    placeholder="OTP"
                    helperText={errorMessage.otp}
                  />
                </Box>
              </Grid>
              <Grid container item xs>
                <Box className={formGroup}>
                  <Button
                    type={"click"}
                    variant={"contained"}
                    className={`${buyButton} ${button}`}
                    color={"primary"}
                    size={"large"}
                    onClick={handleVerifyOtp}
                    {...((isFormSubmitted ||
                      !form.otp ||
                      errorMessage.otp ||
                      form.otp.length !== 6) && {
                      disabled: true,
                    })}
                  >
                    Submit
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Box>
        )}

        {form.verifyOtp && (
          <form noValidate autoComplete="off" onSubmit={onSubmit}>
            <Box direction="column" style={{ width: "100%" }}>
              <Grid container spacing={2}>
                <Grid container item xs={4}>
                  <Box className={formGroup}>
                    <Typography variant="body2">Mobile No.</Typography>
                  </Box>
                </Grid>
                <Grid container item xs>
                  <Box className={formGroup}>
                    <TextField
                      id="standard-basic"
                      variant="outlined"
                      value={form.mobile}
                      name="mobile"
                      onInput={validateInputLength}
                      onChange={handleChange}
                      autoComplete="off"
                      // placeholder="Mobile"
                      helperText={errorMessage.mobile}
                      disabled={true}
                      className="disabled"
                    />
                  </Box>
                </Grid>
              </Grid>
              <Grid container spacing={2}>
                <Grid container item xs={4}>
                  <Box className={formGroup}>
                    <Typography variant="body2">Name</Typography>
                  </Box>
                </Grid>
                <Grid container item xs>
                  <Box className={formGroup}>
                    <TextField
                      id="standard-basic"
                      variant="outlined"
                      value={form.name}
                      name="name"
                      onInput={validateInputLength}
                      onChange={handleChange}
                      autoComplete="off"
                      // placeholder="Name"
                      helperText={errorMessage.name}
                      disabled={true}
                      className="disabled"
                    />
                  </Box>
                </Grid>
              </Grid>
              <Grid container spacing={2}>
                <Grid container item xs={4}>
                  <Box className={formGroup}>
                    <Typography variant="body2">Date of Birth</Typography>
                  </Box>
                </Grid>
                <Grid container item xs>
                  <Box className={formGroup}>
                    <TextField
                      type="date"
                      id="standard-basic"
                      variant="outlined"
                      value={form.dob}
                      name="dob"
                      onInput={validateInputLength}
                      onChange={handleChange}
                      autoComplete="off"
                      // placeholder="Date of Birth"
                      helperText={errorMessage.dob}
                      style={{ width: "100%" }}
                      disabled={true}
                      className="disabled"
                    />
                  </Box>
                </Grid>
              </Grid>
              <Grid container spacing={2}>
                <Grid container item xs={4}>
                  <Box className={formGroup}>
                    <Typography variant="body2">Gender</Typography>
                  </Box>
                </Grid>
                <Grid container item xs>
                  <Box className={formGroup}>
                    <TextField
                      id="standard-basic"
                      variant="outlined"
                      value={form.gender}
                      name="gender"
                      onInput={validateInputLength}
                      onChange={handleChange}
                      autoComplete="off"
                      helperText={errorMessage.gender}
                      disabled={true}
                      className="disabled"
                    />
                  </Box>
                </Grid>
              </Grid>
              <Grid container spacing={2}>
                <Grid container item xs={4}>
                  <Box className={formGroup}>
                    <Typography variant="body2">Address</Typography>
                  </Box>
                </Grid>
                <Grid container item xs>
                  <Box className={formGroup}>
                    <TextField
                      id="standard-basic"
                      variant="outlined"
                      value={form.address}
                      name="address"
                      onInput={validateInputLength}
                      onChange={handleChange}
                      autoComplete="off"
                      // placeholder="Date of Birth"
                      helperText={errorMessage.address}
                      disabled={true}
                      className="disabled"
                    />
                  </Box>
                </Grid>
              </Grid>
            </Box>

            <ErrorMessage errors={errors} modal={modal} />

            <CallToAction
              buttonType={"submit"}
              errorMessage={errorMessage}
              form={form}
              isDisabled={isFormSubmitted}
              isFormSubmitted={isFormSubmitted}
              text={"Auto Renew"}
              handleClick={handleClick}
            />
          </form>
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
