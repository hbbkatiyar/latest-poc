import React, { useContext, useEffect } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import { useStyles } from "./indexFormStyles";
import { Box, Typography } from "@material-ui/core";
import ProposalTable from "./proposalTable";
import { useHistory } from "react-router-dom";
import { getRoute } from "../../helpers/utils";

function Proposals({ classes: { container, main, section } }) {
  const history = useHistory();

  const mapping = {
    "e-KYC": "customer",
    Payment: "payment",
    Nominee: "nominee",
  };

  const navigateTo = (pathname) => history.push({ pathname });

  const clickHandler = (keyname) => {
    navigateTo(getRoute(mapping[keyname]));
  };

  return (
    <Box className={main}>
      <Box container={"true"} justifyContent="center" className={container}>
        <Box mt={3}>
          <Typography variant="h5">Proposal Status</Typography>
        </Box>
        <Box m={1}>&nbsp;</Box>
        <ProposalTable clickHandler={clickHandler} />
      </Box>
    </Box>
  );
}

export default withStyles(useStyles, { withTheme: true })(Proposals);
