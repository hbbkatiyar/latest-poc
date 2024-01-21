import React, { useContext, useEffect, useState } from "react";
import FieldLabel from "../../components/label";
import withStyles from "@material-ui/core/styles/withStyles";
import { useStyles } from "./indexFormStyles";
import { Box, Button, TextField } from "@material-ui/core";

function CustomerAadhaarForm({
  classes: { button, buyButton, customBtn, formGroup },
  form,
  errorMessage,
  handleChange,
  isFormSubmitted,
  onSubmit,
  validateInputLength,
}) {
  return (
    <form noValidate autoComplete="off" onSubmit={onSubmit}>
      <Box className={formGroup}>
        <FieldLabel label={"Aadhaar Number"} />
        <TextField
          id="standard-basic"
          variant="outlined"
          value={form.aadhaar_number}
          name="aadhaar_number"
          onInput={validateInputLength}
          onChange={handleChange}
          autoComplete="off"
          helperText={errorMessage.aadhaar_number}
          fullWidth
        />
      </Box>
      <Box className={customBtn}>
        <Button
          type={"submit"}
          variant={"contained"}
          className={`${buyButton} ${button}`}
          color={"primary"}
          size={"large"}
          {...((isFormSubmitted ||
            !form.aadhaar_number ||
            errorMessage.aadhaar_number) && { disabled: true })}
        >
          OTP
        </Button>
      </Box>
    </form>
  );
}

export default withStyles(useStyles, { withTheme: true })(CustomerAadhaarForm);
