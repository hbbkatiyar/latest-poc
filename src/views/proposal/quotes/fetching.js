import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Box } from "@material-ui/core";
import { useStyles } from "./indexStyles";
import { FETCHING_QUOTE_TEXT } from "../../../constants";

function FetchingQuoteSection(props) {
  const {
    classes: {
      loaderBox,
      loaderContainer,
    },
  } = props;

  return (
    <Box
      display="flex"
      className={loaderContainer}
      justifyContent="center"
      alignItems="center"
    >
      <Box className={loaderBox}>
        {FETCHING_QUOTE_TEXT}
        {/* <CircularProgress color={"secondary"} /> */}
      </Box>
    </Box>
  );
}

export default withStyles(useStyles, { withTheme: true })(FetchingQuoteSection);
