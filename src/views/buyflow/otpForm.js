import React, { useContext, useEffect, useState } from "react";
import FieldLabel from "../../components/label";
import withStyles from "@material-ui/core/styles/withStyles";
import { useStyles } from "./indexFormStyles";
import { Box, Button, TextField } from "@material-ui/core";

function CustomerAadhaarOTP({
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
        <FieldLabel label={"OTP"} />
        <TextField
          id="standard-basic"
          variant="outlined"
          value={form.otp}
          name="otp"
          onInput={validateInputLength}
          onChange={handleChange}
          autoComplete="off"
          helperText={errorMessage.otp}
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
            !form.otp ||
            errorMessage.otp ||
            form.otp.length !== 6) && {
            disabled: true,
          })}
        >
          Verify
        </Button>
      </Box>
    </form>
  );
}

export default withStyles(useStyles, { withTheme: true })(CustomerAadhaarOTP);
