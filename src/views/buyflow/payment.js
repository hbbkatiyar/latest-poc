import React, { useContext, useState } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import CallToAction from "./partials/cta";
import ErrorMessage from "./partials/error";
import ApplicationContext from "../../context/index";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useStyles } from "./indexFormStyles";
import { Box, Typography } from "@material-ui/core";
import { getRoute } from "../../helpers/utils";
import { useHistory } from "react-router";
import { Images } from "../../constants/images";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";

function BuyflowPayment({
  classes: { autoPay, autoPayIcon, container, main, loaderBox },
}) {
  const { state, dispatch } = useContext(ApplicationContext);
  const history = useHistory();
  const [errorMessage, setErrorMessage] = useState({});
  const [errors, setErrors] = useState([]);
  const [form, setForm] = useState({});
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [isLoaded, setIsLoaded] = useState(true);
  const [modal, setModal] = useState({ open: false });

  const navigateTo = (pathname) => history.push({ pathname });

  const onSubmit = (event) => {
    event.preventDefault();

    navigateTo(getRoute("declaration"));
  };

  const handleClick = (event) => {
    event.preventDefault();

    navigateTo(getRoute("declaration"));
  };

  return isLoaded ? (
    <Box className={main}>
      <Box container={"true"} justifyContent="center" className={container}>
        <form noValidate autoComplete="off" onSubmit={onSubmit}>
          <Box m={3}>
            <img src={Images.qrCode} />
          </Box>
          <Box m={3}>
            <Box className={autoPay}>
              <Typography>UPI + AutoPay UPI successfully Registered</Typography>
            </Box>
            <CheckCircleOutlineIcon
              className={autoPayIcon}
            />
          </Box>

          <ErrorMessage errors={errors} modal={modal} />

          <CallToAction
            buttonType={"submit"}
            errorMessage={errorMessage}
            form={form}
            isDisabled={isFormSubmitted}
            isFormSubmitted={isFormSubmitted}
            text={"Next"}
            handleClick={handleClick}
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
