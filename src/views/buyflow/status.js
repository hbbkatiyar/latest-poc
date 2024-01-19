import React, { useContext, useEffect, useState } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import ApplicationContext from "../../context/index";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useStyles } from "./indexFormStyles";
import { Box, Typography } from "@material-ui/core";
import { getRoute } from "../../helpers/utils";
import { useHistory } from "react-router";
import LinearProgress from "@material-ui/core/LinearProgress";

function BuyflowApplicationStatus({
  classes: { autoPay, autoPayIcon, container, main, loaderBox, question },
}) {
  const { state, dispatch } = useContext(ApplicationContext);
  const history = useHistory();
  const [isProcessed, setIsProcessed] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsProcessed(true);
    }, 10000);
  }, []);

  useEffect(() => {
    if (isProcessed) {
      navigateTo(getRoute("submitted"));
    }
  }, [isProcessed]);

  const navigateTo = (pathname) => history.push({ pathname });

  const onSubmit = (event) => {
    event.preventDefault();

    navigateTo(getRoute("submitted"));
  };

  const handleClick = (event) => {
    event.preventDefault();

    navigateTo(getRoute("submitted"));
  };

  return (
    <Box className={main}>
      <Box container={"true"} justifyContent="center" className={container}>
        <Box m={1}>
          <Typography variant="h5">Application Status</Typography>
        </Box>
        <Box m={5}>&nbsp;</Box>
        <Box m={5}>
          <CircularProgress />
        </Box>
        <Box textAlign={"center"}>
          <Typography variant="body2">
            Your application submission is in progress. Please wait for a few seconds.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default withStyles(useStyles, { withTheme: true })(
  BuyflowApplicationStatus
);
