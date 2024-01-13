import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import SummaryField from "../partials/summaryField";
import { Box } from "@material-ui/core";
import { useStyles } from "./indexStyles";
import { DASH_SYMBOL } from "../../../constants";

function EmiSection(props) {
  const {
    classes: { iconContainer },
    item: { emi = null, repay_amount = null },
  } = props;

  return (
    <Box
      display="flex"
      direction="row"
      justifyContent="space-between"
      className={iconContainer}
    >
      <Box>
        <SummaryField
          label={"Monthly EMI"}
          value={`${emi ? "₹" : ""}${
            emi ? Number(emi).toLocaleString("en") : DASH_SYMBOL
          }`}
        />
      </Box>
      <Box>
        <SummaryField
          label={"Repay Amount"}
          value={`${repay_amount ? "₹" : ""}${
            repay_amount ? Number(repay_amount).toLocaleString("en") : DASH_SYMBOL
          }`}
        />
      </Box>
    </Box>
  );
}

export default withStyles(useStyles, { withTheme: true })(EmiSection);
