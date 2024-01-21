import React, { useEffect, useState } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import CircularProgress from "@material-ui/core/CircularProgress";
import SectionTitle from "../../components/sectionTitle";
import { useStyles } from "./indexFormStyles";
import { Box, Typography } from "@material-ui/core";
import { getRoute } from "../../helpers/utils";
import { useHistory } from "react-router";

function BuyflowApplicationStatus({
  classes: { container, main },
}) {
  const history = useHistory();
  const [isProcessed, setIsProcessed] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsProcessed(true);
    }, 5000);
  }, []);

  useEffect(() => {
    if (isProcessed) {
      navigateTo(getRoute("submitted"));
    }
  }, [isProcessed]);

  const navigateTo = (pathname) => history.push({ pathname });

  return (
    <Box className={main}>
      <Box container={"true"} justifyContent="center" className={container}>
        <SectionTitle title={"Application Status"} />
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
