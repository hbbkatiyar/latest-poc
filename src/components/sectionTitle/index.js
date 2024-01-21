import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import { useStyles } from "./indexStyles";
import { Box, Typography } from "@material-ui/core";

function SectionTitle({
  classes: {},
  title = "",
  secondaryTitle = ""
}) {
  return (
    <Box m={3}>
      <Typography variant="h5">
        {title} {secondaryTitle && <><br /> e-KYC</>}
      </Typography>
    </Box>
  );
}

export default withStyles(useStyles, { withTheme: true })(SectionTitle);
