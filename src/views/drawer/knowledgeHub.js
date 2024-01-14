import React, { useContext, useEffect } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import { useStyles } from "./indexFormStyles";
import { Box, Grid, Hidden, TextField, Typography } from "@material-ui/core";

function KnowledgeHub({ classes: { container, main, section } }) {
  return (
    <Box className={main}>
      <Box container={"true"} justifyContent="center" className={container}>
        <Box>
          <Typography variant="h5">Knowledge Hub</Typography>
        </Box>
        <Box m={2} justifyContent="left" className={section}>
          <Typography variant="body2">Factsheet Section</Typography>
        </Box>
        <Box m={2} justifyContent="left" className={section}>
          <Typography variant="body2">FAQs Section</Typography>
        </Box>
        <Box m={2} justifyContent="left" className={section}>
          <Typography variant="body2">Video Section</Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default withStyles(useStyles, { withTheme: true })(KnowledgeHub);
