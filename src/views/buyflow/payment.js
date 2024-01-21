import React, { useContext, useState } from "react";
import ApplicationContext from "../../context/index";
import CallToAction from "./partials/cta";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import CircularProgress from "@material-ui/core/CircularProgress";
import ErrorMessage from "./partials/error";
import SectionTitle from "../../components/sectionTitle";
import withStyles from "@material-ui/core/styles/withStyles";
import { useStyles } from "./indexFormStyles";
import { Box, Typography, TextField } from "@material-ui/core";
import { getRoute } from "../../helpers/utils";
import { useHistory } from "react-router";
import { Images } from "../../constants/images";
import { getStorageItem, setStorageItem } from "../../helpers/utils";

function BuyflowPayment({
  classes: { autoPay, autoPayIcon, container, main, loaderBox, formGroup, question },
}) {
  const { state, dispatch } = useContext(ApplicationContext);
  const history = useHistory();
  const [errorMessage, setErrorMessage] = useState({});
  const [errors, setErrors] = useState([]);
  const [form, setForm] = useState({
    upi_id: getStorageItem("upi_id") ? getStorageItem("upi_id") : "",
  });
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [isLoaded, setIsLoaded] = useState(true);
  const [modal, setModal] = useState({ open: false });

  const navigateTo = (pathname) => history.push({ pathname });

  const setFormState = (name, value) => setForm({ ...form, [name]: value });

  const handleChange = (event) =>
    setFormState(event.target.name, event.target.value);

  const onSubmit = (event) => {
    event.preventDefault();

    setStorageItem("upi_id", form.upi_id);
    navigateTo(getRoute("nominee"));
  };

  return isLoaded ? (
    <Box className={main}>
      <Box container={"true"} justifyContent="center" className={container}>
        <SectionTitle
          title={"Payment Section"}
        />
        <form noValidate autoComplete="off" onSubmit={onSubmit}>
          <Box m={3} justifyContent="center">
            <TextField
              id="standard-basic"
              variant="outlined"
              value={form.upi_id}
              name="upi_id"
              onChange={handleChange}
              autoComplete="off"
              placeholder="Enter UPI ID"
            />
          </Box>
          <Typography variant="body2">OR</Typography>
          <Box m={3}>
            <img src={Images.QRCode} />
          </Box>

          <Box m={3}>
            <Box className={autoPay}>
              <Typography>UPI + AutoPay UPI successfully Registered</Typography>
            </Box>
            <CheckCircleOutlineIcon className={autoPayIcon} />
          </Box>

          <ErrorMessage errors={errors} modal={modal} />

          <CallToAction
            buttonType={"submit"}
            errorMessage={errorMessage}
            form={form}
            isDisabled={isFormSubmitted}
            isFormSubmitted={isFormSubmitted}
            text={"Next"}
            marginTopClass={"marginTop10"}
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

export default withStyles(useStyles, { withTheme: true })(BuyflowPayment);
