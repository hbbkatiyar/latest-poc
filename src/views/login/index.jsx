import React, { useEffect, useState } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import renderHTML from "react-render-html";
import withStyles from "@material-ui/core/styles/withStyles";
import { useHistory } from "react-router-dom";
import { Box, Button, Typography, TextField } from "@material-ui/core";
import { useStyles } from "./indexStyles";
import { getQueryStringParameterValue, getRoute, setStorageItem } from "../../helpers/utils";
import { validations } from "../../messages/validation";
import { Utils } from "../../constants/utils";

const Login = ({
  classes: {
    formInputCard,
    input,
    mobileInput,
    mobileInputFocus,
    errorMsg,
    customBtn,
    button,
    formGroup,
    partnerName,
  },
  classes,
}) => {
  const history = useHistory();
  const partnerId = getQueryStringParameterValue("partnerId") ?? 1001;

  const [errorMessage, setErrorMessage] = useState({ empcode: "", password: "" });
  const [errors, setErrors] = useState([]);
  const [form, setForm] = useState({
    empcode: "",
    password: "",
    hasError: false,
  });
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [onfocusMobile, setOnfocusMobile] = useState(false);
  const [touchFields, setTouchFields] = useState({ empcode: false, password: false });

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigateTo(getRoute("dashboard"));
    }
  });

  // useEffect(() => validateMobile(), [form.mobile]);

  useEffect(() => validateRequiredInput("empcode"), [form.empcode]);

  useEffect(() => validateRequiredInput("password"), [form.password]);

  const validateEmployeeCode = () => {
    if (form.empcode) {
      
    } else if (touchFields.empcode) {
      setErrorMessageState("empcode", validations.empcode.required);
    }
  };


  const validateRequiredInput = (fieldName) => {
    if (form[fieldName]) {
      setTouchFieldsState(fieldName, true);
      setErrorMessageState(fieldName, "");
    } else if (touchFields[fieldName] && !form[fieldName]) {
      setErrorMessageState(fieldName, validations[fieldName].required);
    }
  };

  const validatePassword = () => {
    if (form.password) {
      let isValid = form.password.length >= 6;
      setStateVariables(
        "password",
        isValid,
        isValid ? "" : validations.password.min
      );
    } else if (touchFields.password) {
      setErrorMessageState("password", validations.password.required);
    }
  };

  const validateInputLength = (event) => {
    let elName = event.target.name;
    let elValue = event.target.value;

    if (event.target.name === "empcode") {
      var clean = elValue.replace(/[^0-9A-Za-z]+/g, "");
      event.target.value = clean;
    }

    if (elValue.length > Utils.limit.digits[elName]) {
      event.target.value = elValue.substring(0, Utils.limit.digits[elName]);
    }
  };

  const toggleClass = () => setOnfocusMobile(true);

  const setStateVariables = (key, isValid, message) => {
    setFormState("hasError", !isValid);
    setErrorMessageState(key, message);
    setTouchFieldsState(key, true);
  };

  const setFormState = (name, value) => setForm({ ...form, [name]: value });

  const setErrorMessageState = (name, value) =>
    setErrorMessage({ ...errorMessage, [name]: value });

  const setTouchFieldsState = (name, value) =>
    setTouchFields({ ...touchFields, [name]: value });

  const handleChange = (event) => {
    setErrors([]);
    setFormState(event.target.name, event.target.value);
  };

  const navigateTo = (pathname) => history.push({ pathname });

  const submitLogin = (event) => {
    event.preventDefault();

    setStorageItem("partnerId", partnerId);
    setStorageItem("token", `${form.empcode}_${form.password}`);

    navigateTo(getRoute("dashboard"));
  };

  return (
    <Box className={formInputCard}>
      <form
        noValidate
        autoComplete="off"
        className={input}
        onSubmit={submitLogin}
      >
        <Box m={3}>&nbsp;</Box>
        
        <Box
          className={partnerName}
          justifyContent={"center"}
          alignItems="center"
        >
          <Typography variant="body2">Bank of Maharashtra</Typography>
        </Box>

        <Box className={formGroup}>
          <TextField
            id="standard-basic"
            variant="outlined"
            value={form.empcode}
            className={!onfocusMobile ? mobileInput : mobileInputFocus}
            name="empcode"
            onInput={validateInputLength}
            onChange={handleChange}
            onFocus={toggleClass}
            autoComplete="off"
            placeholder="Employee ID"
            helperText={errorMessage.empcode}
          />
        </Box>

        <Box className={formGroup}>
          <TextField
            type="password"
            id="standard-basic"
            variant="outlined"
            value={form.password}
            className={!onfocusMobile ? mobileInput : mobileInputFocus}
            name="password"
            onInput={validateInputLength}
            onChange={handleChange}
            onFocus={toggleClass}
            autoComplete="off"
            placeholder="Password"
            helperText={errorMessage.password}
          />
        </Box>

        {errors.length > 0 && (
          <Box className={`mt-5`}>
            {errors.map((item, index) => {
              return (
                <Typography
                  key={index}
                  className={`mb-5 ${errorMsg}`}
                  // color={"primary"}
                  variant={"body2"}
                >
                  {item}
                </Typography>
              );
            })}
          </Box>
        )}

        <Box
          className={customBtn}
          justifyContent="center"
          alignContent="center"
        >
          <Button
            type="submit"
            size="large"
            variant={"contained"}
            color="primary"
            className={button}
            {...((isFormSubmitted || !form.empcode || !form.password || errorMessage.empcode || errorMessage.password) && {
              disabled: true,
            })}
          >
            {!isFormSubmitted ? (
              renderHTML("Login")
            ) : (
              <CircularProgress
                color={"inherit"}
                className={classes.loaderStyle}
                size={20}
              />
            )}
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default withStyles(useStyles, { withTheme: true })(Login);
