import React, { useContext, useEffect } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import { useStyles } from "./indexFormStyles";
import { Box, Typography } from "@material-ui/core";

function PolicyCoi({ classes: { container, main, section } }) {
  return (
    <Box className={main}>
      <Box container={"true"} justifyContent="center" className={container}>
        <Box>
          <Typography variant="h5">Policy COI</Typography>
        </Box>
        <Box m={2} justifyContent="left" className={section}>
          <Typography variant="body2">
            Policy (COI Download) Section
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default withStyles(useStyles, { withTheme: true })(PolicyCoi);
