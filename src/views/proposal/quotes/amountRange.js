import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import SummaryField from "../partials/summaryField";
import { Box } from "@material-ui/core";
import { useStyles } from "./indexStyles";
import { DASH_SYMBOL } from "../../../constants";

function AmountRangeSection(props) {
  const {
    classes: { iconContainer },
    item: {
      min_amount = null,
      max_amount = null
    },
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
          label={"Min Amount"}
          value={`${min_amount ? "₹" : ""}${
            min_amount ? Number(min_amount).toLocaleString("en") : DASH_SYMBOL
          }`}
        />
      </Box>
      <Box>
        <SummaryField
          label={"Max Amount"}
          value={`${max_amount ? "₹" : ""}${
            max_amount ? Number(max_amount).toLocaleString("en") : DASH_SYMBOL
          }`}
        />
      </Box>
    </Box>
  );
}

export default withStyles(useStyles, { withTheme: true })(AmountRangeSection);
