import React, { useContext, useEffect } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import { useStyles } from "./indexFormStyles";
import { Box, Typography } from "@material-ui/core";
import ProposalTable from "./proposalTable";

function Proposals({ classes: { container, main, section } }) {
  return (
    <Box className={main}>
      <Box container={"true"} justifyContent="center" className={container}>
        <Box mt={3}>
          <Typography variant="h5">Proposal Status</Typography>
        </Box>
        <Box m={1}>&nbsp;</Box>
        <ProposalTable />
      </Box>
    </Box>
  );
}

export default withStyles(useStyles, { withTheme: true })(Proposals);
