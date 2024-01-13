import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import { Box, Typography } from "@material-ui/core";
import { useStyles } from "../summaryStyles";

function SummaryDetailsField(props) {
  const {
    classes: { question, vehicleDetailsText, cursorPointer, link },
    label = "",
    value = "",
    onClick = () => {},
    isLink = false,
  } = props;

  return (
    <Box className={vehicleDetailsText}>
      <Typography variant={"body2"} className={question}>
        {label}
      </Typography>
      <Typography
        variant={"body2"}
        onClick={onClick}
        className={isLink && [link, cursorPointer]}
        component="div"
        whiteSpace="normal"
      >
        {value}
      </Typography>
    </Box>
  );
}

export default withStyles(useStyles, { withTheme: true })(SummaryDetailsField);
