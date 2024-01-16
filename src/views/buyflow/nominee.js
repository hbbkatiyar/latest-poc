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
  FormControl,
  Select,
  MenuItem,
  InputLabel,
} from "@material-ui/core";
import {
  getRoute,
  getStorageItem,
  parseMessage,
  setStorageItem,
} from "../../helpers/utils";
// import { ReducerUtils } from "../../constants/reducers";
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

function NomineeDetails({
  classes: { container, main, formGroup, loaderBox, question },
}) {
  const { state, dispatch } = useContext(ApplicationContext);
  const history = useHistory();
  const [errorMessage, setErrorMessage] = useState({
    nominee_name: false,
    nominee_dob: false,
    nominee_relationship: false,
  });
  const [errors, setErrors] = useState([]);
  const [form, setForm] = useState({
    nominee_name: getStorageItem("nominee_name")
      ? getStorageItem("nominee_name")
      : "",
    nominee_dob: getStorageItem("nominee_dob")
      ? getStorageItem("nominee_dob")
      : "",
    nominee_relationship: getStorageItem("nominee_relationship")
      ? getStorageItem("nominee_relationship")
      : "",
    partnerId: getStorageItem("partnerId"),
  });
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [isLoaded, setIsLoaded] = useState(true);
  const [modal, setModal] = useState({ open: false });
  const [touchFields, setTouchFields] = useState({
    nominee_name: false,
    nominee_dob: false,
    nominee_relationship: false,
  });

  useEffect(() => {
    validateRequiredInput("nominee_name");
  }, [form.nominee_name]);

  useEffect(() => {
    validateRequiredInput("nominee_relationship");
  }, [form.nominee_relationship]);

  useEffect(() => {
    validateDateOfBirth("nominee_dob");
  }, [form.nominee_dob]);

  const validateDateOfBirth = (fieldName) => {
    if (form[fieldName]) {
      setTouchFieldsState(fieldName, true);
      setErrorMessageState(fieldName, "");

      /*
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
      */
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

  const dispatchEvent = (type, payload) => dispatch({ type, payload });

  const setFormState = (name, value) => setForm({ ...form, [name]: value });

  const setErrorMessageState = (name, value) =>
    setErrorMessage({ ...errorMessage, [name]: value });

  const handleChange = (event) =>
    setFormState(event.target.name, event.target.value);

  const navigateTo = (pathname) => history.push({ pathname });

  const onSubmit = (event) => {
    event.preventDefault();

    navigateTo(getRoute("declaration"));
  };

  const handleClick = (event) => {
    event.preventDefault();

    setStorageItem("nominee_name", form.nominee_name);
    setStorageItem("nominee_relationship", form.nominee_relationship);
    setStorageItem("nominee_dob", form.nominee_dob);

    navigateTo(getRoute("declaration"));
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
          <Typography variant="h5">Nominee Details</Typography>
        </Box>

        <form noValidate autoComplete="off" onSubmit={onSubmit}>
          <Box direction="column" style={{ width: "100%" }}>
            <Box className={formGroup}>
              <Typography variant="body2" className={question}>
                Name
              </Typography>
              <TextField
                id="standard-basic"
                variant="outlined"
                value={form.nominee_name}
                name="nominee_name"
                onInput={validateInputLength}
                onChange={handleChange}
                autoComplete="off"
                helperText={errorMessage.nominee_name}
                fullWidth
              />
            </Box>
            <Box className={formGroup}>
              <Typography variant="body2" className={question}>
                Relationship
              </Typography>
              <FormControl
                variant="outlined"
                style={{ width: "100%", textAlign: "left" }}
                fullWidth
              >
                <Select
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  value={form.nominee_relationship}
                  onChange={handleChange}
                  label="Age"
                  name="nominee_relationship"
                >
                  <MenuItem value="">
                    <em>Select</em>
                  </MenuItem>
                  <MenuItem value={"mother"}>Mother</MenuItem>
                  <MenuItem value={"father"}>Father</MenuItem>
                  <MenuItem value={"son"}>Son</MenuItem>
                  <MenuItem value={"daughter"}>Daughter</MenuItem>
                  <MenuItem value={"wife"}>Wife</MenuItem>
                  <MenuItem value={"husband"}>Husband</MenuItem>
                  <MenuItem value={"brother"}>Brother</MenuItem>
                  <MenuItem value={"sister"}>Sister</MenuItem>
                  <MenuItem value={"grandparent"}>Grand Parent</MenuItem>
                  <MenuItem value={"granddaughter"}>Grand Daughter</MenuItem>
                  <MenuItem value={"grandson"}>Grand Son</MenuItem>
                  <MenuItem value={"other"}>Other</MenuItem>
                </Select>
                {errorMessage.nominee_relationship && (
                  <Box className="error-message">
                    {"Please select relationship"}
                  </Box>
                )}
              </FormControl>
            </Box>
            
            <Box className={formGroup}>
              <Typography variant="body2" className={question}>
                Date of Birth
              </Typography>
              <TextField
                type="date"
                id="standard-basic"
                variant="outlined"
                value={form.nominee_dob}
                name="nominee_dob"
                onInput={validateInputLength}
                onChange={handleChange}
                autoComplete="off"
                helperText={errorMessage.nominee_dob}
                fullWidth
              />
            </Box>
          </Box>

          <ErrorMessage errors={errors} modal={modal} />

          <CallToAction
            buttonType={"submit"}
            errorMessage={errorMessage}
            form={form}
            isDisabled={
              isFormSubmitted ||
              !form.nominee_name ||
              !form.nominee_dob ||
              !form.nominee_relationship
            }
            isFormSubmitted={isFormSubmitted}
            text={"Submit"}
            handleClick={handleClick}
            marginTopClass={"marginTop30"}
          />
        </form>
      </Box>
    </Box>
  ) : (
    <Box className={loaderBox}>
      <CircularProgress color={"secondary"} />
    </Box>
  );
}

export default withStyles(useStyles, { withTheme: true })(NomineeDetails);
