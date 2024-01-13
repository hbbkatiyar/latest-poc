import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import SummaryField from "../partials/summaryField";
import { Box, TextField, Typography } from "@material-ui/core";
import { useStyles } from "./indexStyles";
import { DASH_SYMBOL } from "../../../constants";
import { validateInputLength } from "../../../helpers/proposal";

function AmountSection(props) {
  const {
    classes: { iconContainer, label, textField, vehicleDetailsText },
    handleChange,
    index,
    item: {
      amount = null,
      emi = null,
      interest_rate = null,
      max_amount = null,
    },
    item
  } = props;

  return (
    <Box
      display="flex"
      direction="row"
      justifyContent="space-between"
      className={iconContainer}
    >
      <Box>
        {max_amount ? (
          <Box className={vehicleDetailsText}>
            <Typography variant={"body2"} className={label}>
              Loan Amount
            </Typography>
            <TextField
              type={"text"}
              id="outlined-margin-none"
              name="amount"
              className={textField}
              helperText={item.amount < item.min_amount || item.amount >item.max_amount && "Please enter valid amount" }
              value={item.amount}
              onInput={validateInputLength}
              onChange={(event) => handleChange(event, index, item)}
            />
          </Box>
        ) : (
          <SummaryField
            label={"Loan Amount"}
            value={`${amount ? "₹" : ""}${
              amount ? Number(amount).toLocaleString("en") : DASH_SYMBOL
            }`}
          />
        )}
      </Box>
      <Box>
        <SummaryField
          label={"Interest Rate"}
          value={`${interest_rate && emi ? interest_rate : ""}${
            interest_rate && emi ? "% p.a." : DASH_SYMBOL
          }`}
        />
      </Box>
    </Box>
  );
}

export default withStyles(useStyles, { withTheme: true })(AmountSection);
