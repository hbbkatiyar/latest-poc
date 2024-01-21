import React, { useContext, useState } from "react";
import ApplicationContext from "../../context/index";
import CallToAction from "./partials/cta";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import CloudDownloadIcon from "@material-ui/icons/CloudDownload";
import CircularProgress from "@material-ui/core/CircularProgress";
import ErrorMessage from "./partials/error";
import withStyles from "@material-ui/core/styles/withStyles";
import { useStyles } from "./indexFormStyles";
import { Box, Button, Typography } from "@material-ui/core";
import { getRoute, redirectWithBlank } from "../../helpers/utils";
import { useHistory } from "react-router";

function BuyflowApplicationSubmitted({
  classes: { container, main, loaderBox, buyButton, button, autoPayIcon },
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

  const downloadClickHandler = () =>
    redirectWithBlank("/AGTL_GT100142_SM2212230000000001_1.pdf");

  const onSubmit = (event) => {
    event.preventDefault();

    navigateTo(getRoute("liveliness"));
  };

  return isLoaded ? (
    <Box className={main}>
      <Box container={"true"} justifyContent="center" className={container}>
        <Box m={3}>
          <Typography variant="h5">Application Submitted</Typography>
          <CheckCircleOutlineIcon className={autoPayIcon} />
        </Box>
        <form noValidate autoComplete="off" onSubmit={onSubmit}>
          <Box mt={3} textAlign={"left"}>
            <Typography variant="body2">
              We appreciate your interest in joining our family.
            </Typography>
          </Box>
          <Box mt={3} justifyContent={"center"}>
            <Button
              type={"click"}
              variant={"contained"}
              className={`${buyButton} ${button}`}
              color={"secondary"}
              size={"large"}
              onClick={downloadClickHandler}
            >
              <CloudDownloadIcon />
              &nbsp; Download Policy
            </Button>
          </Box>

          <ErrorMessage errors={errors} modal={modal} />

          <CallToAction
            buttonType={"submit"}
            errorMessage={errorMessage}
            form={form}
            isDisabled={isFormSubmitted}
            isFormSubmitted={isFormSubmitted}
            text={"Close"}
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

export default withStyles(useStyles, { withTheme: true })(
  BuyflowApplicationSubmitted
);
