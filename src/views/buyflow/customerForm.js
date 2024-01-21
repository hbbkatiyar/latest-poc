import React from "react";
import CallToAction from "./partials/cta";
import FieldLabel from "../../components/label";
import ErrorMessage from "./partials/error";
import withStyles from "@material-ui/core/styles/withStyles";
import { useStyles } from "./indexFormStyles";
import { Box, TextField } from "@material-ui/core";

function CustomerDetailsForm({
  classes: {
    formGroup,
  },
  form,
  errorMessage,
  errors,
  isFormSubmitted,
  handleChange,
  modal,
  onSubmit,
  validateInputLength
}) {
  return (
    <form noValidate autoComplete="off" onSubmit={onSubmit}>
      <Box direction="column" style={{ width: "100%" }}>
        <Box className={formGroup}>
          <FieldLabel label={"Full Name"} />
          <TextField
            id="standard-basic"
            variant="outlined"
            value={form.name}
            name="name"
            onInput={validateInputLength}
            onChange={handleChange}
            autoComplete="off"
            helperText={errorMessage.name}
            disabled={true}
            className="disabled"
            fullWidth
          />
        </Box>

        <Box className={formGroup}>
          <FieldLabel label={"Mobile"} />
          <TextField
            id="standard-basic"
            variant="outlined"
            value={form.mobile}
            name="mobile"
            onInput={validateInputLength}
            onChange={handleChange}
            autoComplete="off"
            helperText={errorMessage.mobile}
            disabled={true}
            className="disabled"
            fullWidth
          />
        </Box>

        <Box className={formGroup}>
          <FieldLabel label={"Email"} />
          <TextField
            id="standard-basic"
            variant="outlined"
            value={form.email}
            name="email"
            onInput={validateInputLength}
            onChange={handleChange}
            autoComplete="off"
            helperText={errorMessage.email}
            fullWidth
          />
        </Box>

        <Box className={formGroup}>
          <FieldLabel label={"Date of Birth"} />
          <TextField
            type="date"
            id="standard-basic"
            variant="outlined"
            value={form.dob}
            name="dob"
            onInput={validateInputLength}
            onChange={handleChange}
            autoComplete="off"
            helperText={errorMessage.dob}
            style={{ width: "100%" }}
            disabled={true}
            className="disabled"
            fullWidth
          />
        </Box>

        <Box className={formGroup}>
          <FieldLabel label={"Gender"} />
          <TextField
            id="standard-basic"
            variant="outlined"
            value={form.gender}
            name="gender"
            onInput={validateInputLength}
            onChange={handleChange}
            autoComplete="off"
            helperText={errorMessage.gender}
            disabled={true}
            className="disabled"
            fullWidth
          />
        </Box>
        <Box className={formGroup}>
          <FieldLabel label={"Address"} />
          <TextField
            id="standard-basic"
            variant="outlined"
            value={form.address}
            name="address"
            onInput={validateInputLength}
            onChange={handleChange}
            autoComplete="off"
            helperText={errorMessage.address}
            disabled={true}
            className="disabled"
            fullWidth
          />
        </Box>
      </Box>

      <ErrorMessage errors={errors} modal={modal} />

      <CallToAction
        buttonType={"submit"}
        errorMessage={errorMessage}
        form={form}
        isDisabled={isFormSubmitted}
        isFormSubmitted={isFormSubmitted}
        marginTopClass={"marginTop10"}
        text={"Make Payment"}
      />
    </form>
  );
}

export default withStyles(useStyles, { withTheme: true })(CustomerDetailsForm);
