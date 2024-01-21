import React, { useContext, useEffect, useState } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import ApplicationContext from "../../context/index";
import CallToAction from "./partials/cta";
import CircularProgress from "@material-ui/core/CircularProgress";
import ErrorMessage from "./partials/error";
import FieldLabel from "../../components/label";
import SectionTitle from "../../components/sectionTitle";
import { useStyles } from "./indexFormStyles";
import {
  Box,
  FormControl,
  MenuItem,
  Select,
  TextField,
} from "@material-ui/core";
import { getRoute, getStorageItem, setStorageItem } from "../../helpers/utils";
// import { ReducerUtils } from "../../constants/reducers";
import { useHistory } from "react-router";
import { validations } from "../../messages/validation";

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

  useEffect(() => validateRequiredInput("nominee_name"), [form.nominee_name]);

  useEffect(
    () => validateRequiredInput("nominee_relationship"),
    [form.nominee_relationship]
  );

  useEffect(() => validateDateOfBirth("nominee_dob"), [form.nominee_dob]);

  const validateDateOfBirth = (fieldName) => {
    if (form[fieldName]) {
      setTouchFieldsState(fieldName, true);
      setErrorMessageState(fieldName, "");
    } else if (touchFields[fieldName]) {
      setErrorMessageState(fieldName, validations[fieldName].required);
    }
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

  const setFormState = (name, value) => setForm({ ...form, [name]: value });

  const setErrorMessageState = (name, value) =>
    setErrorMessage({ ...errorMessage, [name]: value });

  const dispatchEvent = (type, payload) => dispatch({ type, payload });

  const handleChange = (event) =>
    setFormState(event.target.name, event.target.value);

  const navigateTo = (pathname) => history.push({ pathname });

  const onSubmit = (event) => {
    event.preventDefault();

    setStorageItem("nominee_name", form.nominee_name);
    setStorageItem("nominee_relationship", form.nominee_relationship);
    setStorageItem("nominee_dob", form.nominee_dob);
    navigateTo(getRoute("declaration"));
  };

  return isLoaded ? (
    <Box className={main}>
      <Box container={"true"} justifyContent="center" className={container}>
        <SectionTitle title={"Nominee Details"} />
        <form noValidate autoComplete="off" onSubmit={onSubmit}>
          <Box direction="column" style={{ width: "100%" }}>
            <Box className={formGroup}>
              <FieldLabel label={"Name"} />
              <TextField
                id="standard-basic"
                variant="outlined"
                value={form.nominee_name}
                name="nominee_name"
                onChange={handleChange}
                autoComplete="off"
                helperText={errorMessage.nominee_name}
                fullWidth
              />
            </Box>
            <Box className={formGroup}>
              <FieldLabel label={"Relationship"} />
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
              <FieldLabel label={"Date of Birth"} />
              <TextField
                type="date"
                id="standard-basic"
                variant="outlined"
                value={form.nominee_dob}
                name="nominee_dob"
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
