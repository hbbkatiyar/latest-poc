import React, { useContext, useEffect, useState } from "react";
import BuyflowForm from "./indexForm";
import withStyles from "@material-ui/core/styles/withStyles";
import { useStyles } from "./indexFormStyles";

function Proposal(props) {
  const {
    classes: { loaderBox },
  } = props;

  return (<BuyflowForm />
  );
}

export default withStyles(useStyles, { withTheme: true })(Proposal);
