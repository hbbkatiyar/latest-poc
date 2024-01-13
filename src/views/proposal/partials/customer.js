import React, { useContext } from "react";
import AddressDetailsForm from "./address";
import LendingContext from "../../../context/index";
import FieldLabel from "../../../components/common/label";
import withStyles from "@material-ui/core/styles/withStyles";
import { Box, Grid, Hidden, TextField } from "@material-ui/core";
import {
  getMinDobDate,
  getMaxDobDate,
  validateInputLength,
} from "../../../helpers/proposal";
import { useStyles } from "../indexFormStyles";
import CustomerDetailsField from "./customerField";
import { NOT_AVAILABLE_TEXT } from "../../../constants";

function CustomerDetailsForm(props) {
  const {
    state: {
      orderDetails = null,
      productConfig: { field_label: fieldLabelUtils },
    },
  } = useContext(LendingContext);
  const {
    classes: { formGroup, gutterTop, textField },
    errorMessage,
    form,
    handleChange,
    handleChangeChipSelect,
  } = props;

  return (
    <Box direction="column" style={{ width: "100%" }}>
      <Grid container spacing={2}>
        <Grid container item md={5} direction="column">
          {/* <Box className={formGroup}>
            <FieldLabel label={fieldLabelUtils.name} />
            <Box className={gutterTop}>
              <TextField
                type={"text"}
                id="outlined-margin-none"
                name="name"
                className={textField}
                helperText={errorMessage.name}
                value={form.name}
                onInput={validateInputLength}
                onChange={handleChange}
                disabled={true}
              />
            </Box>
          </Box> */}
          <CustomerDetailsField label={fieldLabelUtils.name} value={form.name} />

          {/* <Box className={formGroup}>
            <FieldLabel label={fieldLabelUtils.mobile} />
            <Box className={gutterTop}>
              <TextField
                type={"text"}
                id="outlined-margin-none"
                name="mobile"
                className={textField}
                helperText={errorMessage.mobile}
                value={form.mobile}
                onInput={validateInputLength}
                onChange={handleChange}
                disabled={true}
              />
            </Box>
          </Box> */}
          <CustomerDetailsField label={fieldLabelUtils.mobile} value={orderDetails?.mobile} />

          {/* <Box className={formGroup}>
            <FieldLabel label={fieldLabelUtils.email} />
            <Box className={gutterTop}>
              <TextField
                type={"text"}
                id="outlined-margin-none"
                name="mobile"
                className={textField}
                helperText={errorMessage.email}
                value={form.email}
                onInput={validateInputLength}
                onChange={handleChange}
                disabled={true}
              />
            </Box>
          </Box> */}
          {/* <CustomerDetailsField label={fieldLabelUtils.email} value={form?.email} /> */}
        </Grid>

        <Hidden smDown>
          <Grid container item md={2} direction="column"></Grid>
        </Hidden>

        <Grid container item md={5} direction="column">
          <CustomerDetailsField label={fieldLabelUtils.email} value={form.email} />

          <CustomerDetailsField label={"Address"} value={form.address ? `${form.address}, ${form.city}, ${form.state}, ${form.pincode}` : NOT_AVAILABLE_TEXT} />
          {/* <AddressDetailsForm
            form={form}
            errorMessage={errorMessage}
            handleChange={handleChange}
            handleChangeChipSelect={handleChangeChipSelect}
            validateInputLength={validateInputLength}
          /> */}
        </Grid>
      </Grid>
    </Box>
  );
}

export default withStyles(useStyles, { withTheme: true })(CustomerDetailsForm);
