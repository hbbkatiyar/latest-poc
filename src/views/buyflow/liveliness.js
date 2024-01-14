import React, { useContext, useState, useRef, useCallback } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import CallToAction from "./partials/cta";
import ErrorMessage from "./partials/error";
import ApplicationContext from "../../context/index";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useStyles } from "./indexFormStyles";
import { Box, Typography } from "@material-ui/core";
import { getRoute, getStorageItem, setStorageItem } from "../../helpers/utils";
import { useHistory } from "react-router";
import Webcam from "react-webcam";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";

function CustomerLivelinessCheck({
  classes: {
    autoPayIcon,
    capturePhoto,
    policyIssuance,
    container,
    main,
    loaderBox,
    screenshotIcon,
    webcamContainer,
  },
}) {
  const { state, dispatch } = useContext(ApplicationContext);
  const history = useHistory();
  const [errorMessage, setErrorMessage] = useState({});
  const [errors, setErrors] = useState([]);
  const [form, setForm] = useState({});
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [isLoaded, setIsLoaded] = useState(true);
  const [modal, setModal] = useState({ open: false });
  const [capturedImage, setCapturedImage] = useState(
    getStorageItem("capturedImage") ? getStorageItem("capturedImage") : null
  );

  const webcamRef = useRef(null);
  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setCapturedImage(imageSrc);
    setStorageItem("capturedImage", imageSrc);
    // Do something with the captured image
  }, [webcamRef]);

  const navigateTo = (pathname) => history.push({ pathname });

  const onSubmit = (event) => {
    event.preventDefault();

    navigateTo(getRoute("dashboard"));
  };

  const handleClick = (event) => {
    event.preventDefault();

    navigateTo(getRoute("dashboard"));
  };

  return isLoaded ? (
    <Box className={main}>
      <Box container={"true"} justifyContent="center" className={container}>
        <Box m={3}>
          <Typography variant="h5">Customer liveliness Check</Typography>
        </Box>

        <form noValidate autoComplete="off" onSubmit={onSubmit}>
          <Box m={1} display="flex" justifyContent="center">
            <Box m={1} className={webcamContainer}>
              <Webcam width={200} audio={false} ref={webcamRef} />
            </Box>
          </Box>
          <Box display="flex" justifyContent="center">
            <Box
              className={capturePhoto}
              onClick={capture}
              title={"Click to capture photo"}
            >
              &nbsp;
            </Box>
          </Box>

          {capturedImage && (
            <Box m={5}>
              <Box display="flex" justifyContent="center" layout="column">
                <Box className={webcamContainer}>
                  <img
                    src={capturedImage}
                    style={{ width: "200px", border: "5px solid #FFFFFF" }}
                  />
                </Box>
              </Box>
              <Box m={1}>
                <CheckCircleOutlineIcon className={autoPayIcon} />
              </Box>
            </Box>
          )}

          <CallToAction
            buttonType={"submit"}
            errorMessage={errorMessage}
            form={form}
            isDisabled={isFormSubmitted}
            isFormSubmitted={isFormSubmitted}
            text={"Dashboard"}
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

export default withStyles(useStyles, { withTheme: true })(
  CustomerLivelinessCheck
);
