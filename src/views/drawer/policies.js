import React, { useContext, useEffect } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import { useStyles } from "./indexFormStyles";
import { Box, Typography } from "@material-ui/core";
import PolicyTable from "./policyTable";

function Policies({ classes: { container, main, section } }) {
  return (
    <Box className={main}>
      <Box container={"true"} justifyContent="center" className={container}>
        <Box mt={1}>
          <Typography variant="h5">Policy COI</Typography>
        </Box>
        {/* <Box m={1}>&nbsp;</Box> */}
        <PolicyTable />
      </Box>
    </Box>
  );
}

export default withStyles(useStyles, { withTheme: true })(Policies);
