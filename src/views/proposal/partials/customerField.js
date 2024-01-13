import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import { Box, Typography } from "@material-ui/core";
import { useStyles } from "../summaryStyles";
import { NOT_AVAILABLE_TEXT } from "../../../constants";

function CustomerDetailsField(props) {
  const {
    classes: { gutterTop, question, wordBreak, },
    label = "",
    value = "",
  } = props;

  return (
    <Box className={gutterTop} justifyContent={"left"} textAlign="left">
      <Typography variant={"body2"} gutterBottom className={question}>
        {label}
      </Typography>
      <Typography variant={"body2"} className={wordBreak}>
        {value ? value : NOT_AVAILABLE_TEXT}
      </Typography>
    </Box>
  );
}

export default withStyles(useStyles, { withTheme: true })(CustomerDetailsField);
