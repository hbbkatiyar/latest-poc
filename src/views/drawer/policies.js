import React, { useContext, useEffect } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import { useStyles } from "./indexFormStyles";
import { Box, Typography } from "@material-ui/core";
import PolicyTable from "./policyTable";
import SectionTitle from "../../components/sectionTitle";

function Policies({ classes: { container, main, } }) {
  return (
    <Box className={main}>
      <Box container={"true"} justifyContent="center" className={container}>
        <SectionTitle title={"Policy COI"} />
        <PolicyTable />
      </Box>
    </Box>
  );
}

export default withStyles(useStyles, { withTheme: true })(Policies);
