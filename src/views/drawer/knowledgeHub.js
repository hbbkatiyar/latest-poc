import React, { useEffect, useState } from "react";
import Alert from "@material-ui/lab/Alert";
import CloudDownloadIcon from "@material-ui/icons/CloudDownload";
import SectionTitle from "../../components/sectionTitle";
import ShareIcon from "@material-ui/icons/Share";
import isEmail from "validator/lib/isEmail";
import isMobilePhone from "validator/lib/isMobilePhone";
import withStyles from "@material-ui/core/styles/withStyles";
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  Grid,
  Snackbar,
  TextField,
  Typography,
} from "@material-ui/core";
import { redirectWithBlank } from "../../helpers/utils";
import { Utils } from "../../constants/utils";
import { useStyles } from "./indexFormStyles";
import { validations } from "../../messages/validation";
import { FORM_FIELD_MOBILE } from "../../constants/field";

function KnowledgeHub({
  classes: {
    buyButton,
    button,
    container,
    customBtn,
    formGroup,
    mainKnowledgeHub,
    question,
  },
}) {
  const list = [
    { title: "Fact Sheet", slug: "factsheet" },
    { title: "FAQs", slug: "faqs" },
    { title: "Videos", slug: "videos" },
  ];
  const [modal, setModal] = useState({ open: false, snackbar: false });
  const [form, setForm] = useState({ mobile: "", email: "" });
  const [errorMessage, setErrorMessage] = useState({
    email: false,
    mobile: false,
  });
  const [touchFields, setTouchFields] = useState({
    email: false,
    mobile: false,
  });

  useEffect(() => validateEmail("email"), [form.email]);

  useEffect(() => validateMobile(), [form.mobile]);

  const handleClose = (keyname = "open") =>
    setModal({ ...modal, [keyname]: false });

  const handleChange = (event) =>
    setForm({ ...form, [event.target.name]: event.target.value });

  const setStateVariables = (key, isValid, message) => {
    setFormState("hasError", !isValid);
    setErrorMessageState(key, message);
    setTouchFieldsState(key, true);
  };

  const setTouchFieldsState = (name, value) =>
    setTouchFields({ ...touchFields, [name]: value });

  const setFormState = (name, value) => setForm({ ...form, [name]: value });

  const setErrorMessageState = (name, value) =>
    setErrorMessage({ ...errorMessage, [name]: value });

  const validateMobile = () => {
    if (form[FORM_FIELD_MOBILE]) {
      let isValid = isMobilePhone(form[FORM_FIELD_MOBILE], ["en-IN"]);
      setStateVariables(
        FORM_FIELD_MOBILE,
        isValid,
        isValid ? "" : validations[FORM_FIELD_MOBILE].valid
      );
    }
    // else if (touchFields[FORM_FIELD_MOBILE]) {
    //   setErrorMessageState(
    //     FORM_FIELD_MOBILE,
    //     validations[FORM_FIELD_MOBILE].required
    //   );
    // }
  };

  const validateEmail = (fieldName) => {
    if (form[fieldName]) {
      let isValid = isEmail(form[fieldName]);
      setStateVariables(
        fieldName,
        isValid,
        isValid ? "" : validations[fieldName].valid
      );
    }
    // else if (touchFields[fieldName]) {
    //   setErrorMessageState(fieldName, validations[fieldName].required);
    // }
  };

  const validateInputLength = (event) => {
    let elName = event.target.name;
    let elValue = event.target.value;

    if (event.target.name === "mobile") {
      var clean = elValue.replace(/[^0-9]+/g, "");
      event.target.value = clean;
    }

    if (elValue.length > Utils.limit.digits[elName]) {
      event.target.value = elValue.substring(0, Utils.limit.digits[elName]);
    }
  };

  const downloadClickHandler = (slug) => {
    redirectWithBlank(
      slug === "videos"
        ? "https://www.youtube.com/watch?v=RpSsF4ZMTCg"
        : "/Aviva_New_Group_Term_Life_122N141V03.pdf"
    );
  };

  const shareClickHandler = () => setModal({ ...modal, open: true });

  const onSubmit = (event) => {
    event.preventDefault();

    setModal({ ...modal, open: false, snackbar: true })
  };

  return (
    <Box className={mainKnowledgeHub}>
      <Box container={"true"} justifyContent="center" className={container}>
        <SectionTitle title={"Knowledge Hub"} />

        <Box m={1}>&nbsp;</Box>
        <Box direction="column" style={{ width: "95%" }}>
          {list.map((item) => {
            return (
              <Grid container spacing={5}>
                <Grid container item xs>
                  <Typography variant="body2" className={question}>
                    {item.title}
                  </Typography>
                </Grid>
                <Grid container item xs="3">
                  <Button
                    type={"click"}
                    variant={"contained"}
                    className={`${buyButton} ${button}`}
                    color={"primary"}
                    size={"small"}
                    onClick={() => downloadClickHandler(item.slug)}
                  >
                    <CloudDownloadIcon />
                  </Button>
                </Grid>
                <Grid container item xs="3">
                  <Button
                    type={"click"}
                    variant={"contained"}
                    className={`${buyButton} ${button}`}
                    color={"primary"}
                    size={"small"}
                    onClick={shareClickHandler}
                  >
                    <ShareIcon />
                  </Button>
                </Grid>
              </Grid>
            );
          })}
        </Box>

        <Snackbar
          open={modal.snackbar}
          autoHideDuration={6000}
          onClose={() => handleClose("snackbar")}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert onClose={() => handleClose("snackbar")} severity="success">
            Content has been shared successfully.
          </Alert>
        </Snackbar>

        <Dialog
          onClose={handleClose}
          aria-labelledby="simple-dialog-title"
          open={modal.open}
          fullScreen={true}
          maxWidth={"lg"}
          fullWidth={true}
        >
          <DialogTitle id="simple-dialog-title">
            <Typography variant="h5">Share Content</Typography>
          </DialogTitle>

          <form noValidate autoComplete="off" onSubmit={onSubmit}>
            <Box m={2}>
              <Box className={formGroup}>
                <Typography variant="body2" className={question}>
                  Mobile Number
                </Typography>
                <TextField
                  id="standard-basic"
                  variant="outlined"
                  value={form.mobile}
                  name="mobile"
                  onInput={validateInputLength}
                  onChange={handleChange}
                  autoComplete="off"
                  helperText={errorMessage.mobile}
                  fullWidth
                />
              </Box>
              <Box className={formGroup}>
                <Typography variant="body2" className={question}>
                  Email
                </Typography>
                <TextField
                  id="standard-basic"
                  variant="outlined"
                  value={form.email}
                  name="email"
                  // onInput={validateInputLength}
                  onChange={handleChange}
                  autoComplete="off"
                  helperText={errorMessage.email}
                  fullWidth
                />
              </Box>

              <Box className={customBtn}>
                <Button
                  type={"submit"}
                  variant={"contained"}
                  className={`${buyButton} ${button}`}
                  color={"primary"}
                  size={"large"}
                  // onClick={shareSubmitHandler}
                  fullWidth
                  {...(((!form.mobile && !form.email) ||
                    (form.mobile && errorMessage.mobile) ||
                    (form.email && errorMessage.email)) && { disabled: true })}
                >
                  Share
                </Button>
              </Box>
              <Box className={""}>
                <Button
                  type={"click"}
                  variant={"outlined"}
                  className={`${buyButton} ${button}`}
                  color={"primary"}
                  size={"large"}
                  onClick={() => handleClose("open")}
                  fullWidth
                >
                  Close
                </Button>
              </Box>
            </Box>
          </form>
        </Dialog>
      </Box>
    </Box>
  );
}

export default withStyles(useStyles, { withTheme: true })(KnowledgeHub);
