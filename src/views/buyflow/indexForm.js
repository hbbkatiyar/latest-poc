import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import { Box } from "@material-ui/core";
import { useStyles } from "./indexFormStyles";

function BuyflowForm(props) {
  const {
    classes: { container, main, },
  } = props;

  return (
    <Box className={main}>
      <Box container={"true"} justifyContent="center" className={container}>
        Buyflow Form
      </Box>
    </Box>
  );
}

export default withStyles(useStyles, { withTheme: true })(BuyflowForm);
