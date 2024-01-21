import React, { useContext, useState, useRef, useCallback } from "react";
import CallToAction from "./partials/cta";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import CircularProgress from "@material-ui/core/CircularProgress";
import SectionTitle from "../../components/sectionTitle";
import Webcam from "react-webcam";
import withStyles from "@material-ui/core/styles/withStyles";
import { useStyles } from "./indexFormStyles";
import { Box } from "@material-ui/core";
import { getRoute, getStorageItem, setStorageItem } from "../../helpers/utils";
import { useHistory } from "react-router";

function BuyflowCustomerLivelinessCheck({
  classes: {
    autoPayIcon,
    capturePhoto,
    container,
    main,
    loaderBox,
    webcamContainer,
  },
}) {
  const history = useHistory();
  const [errorMessage, setErrorMessage] = useState({});
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
  }, [webcamRef]);

  const navigateTo = (pathname) => history.push({ pathname });

  const onSubmit = (event) => {
    event.preventDefault();

    navigateTo(getRoute("dashboard"));
  };

  return isLoaded ? (
    <Box className={main}>
      <Box container={"true"} justifyContent="center" className={container}>
        <SectionTitle title={"Customer liveliness Check"} />

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

export default withStyles(useStyles, { withTheme: true })(
  BuyflowCustomerLivelinessCheck
);
