import React, { useState } from "react";
import { useStyles } from "./style";
import withStyles from "@material-ui/core/styles/withStyles";
import { Box, Typography } from "@material-ui/core";

function Support(props) {
  const { classes } = props;
  return (
    <>
      <Box className={classes.detailPane}>
        <Box className={classes.icon}>{/**********Icon********* */}</Box>
        <Box className={classes.heading}>Our Address</Box>
        <Box className={classes.title}>
          308-309 Tower C, Unitech Business Zone, Sector 50, Golf Course
          Extension Road, Gurugram, Haryana 122018
        </Box>
      </Box>
      <Box className={classes.detailPane}>
        <Box className={classes.icon}>{/**********Icon********* */}</Box>
        <Box className={classes.heading}>Call Us</Box>
        <Box className={classes.title}>
          +91-938-9-938-938 Working Days: Mon - Sat
        </Box>
      </Box>
      <Box className={classes.detailPane}>
        <Box className={classes.icon}>{/**********Icon********* */}</Box>
        <Box className={classes.heading}>Mail Us</Box>
        <Box className={classes.title}>
          support@toffeeinsurance.com Timings : 9:30 AM to - 6:30 PM
        </Box>
      </Box>
    </>
  );
}

export default withStyles(useStyles)(Support);
