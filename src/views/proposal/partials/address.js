import React, { useContext } from "react";
import LendingContext from "../../../context/index";
import FieldLabel from "../../../components/common/label";
import withStyles from "@material-ui/core/styles/withStyles";
import {
  Box,
  FormControl,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@material-ui/core";
import { useStyles } from "../indexFormStyles";
import { validateInputLength } from "../../../helpers/proposal";
import { validations } from "../../../messages/validation";
import CustomerDetailsField from "./customerField";

function AddressDetailsForm(props) {
  const {
    state: {
      productConfig: { field_label: fieldLabelUtils },
      productConfig = null,
    },
  } = useContext(LendingContext);
  const {
    classes: { formGroup, gutterTop, textField },
    errorMessage,
    form,
    handleChange,
  } = props;

  return (
    <>
      {/* <Box className={formGroup}>
        <FieldLabel label={fieldLabelUtils.pincode} />
        <Box className={gutterTop}>
          <TextField
            id="pincode"
            name="pincode"
            type={"text"}
            className={textField}
            helperText={errorMessage.pincode}
            fullWidth
            value={form.pincode}
            onInput={validateInputLength}
            onChange={handleChange}
            disabled={true}
          />
        </Box>
      </Box> */}
      <CustomerDetailsField label={fieldLabelUtils.pincode} value={form.pincode} />

      {/* <Box className={formGroup}>
        <FieldLabel label={fieldLabelUtils.city} />
        <Box className={gutterTop}>
          <TextField
            id="city"
            name="city"
            type={"text"}
            className={textField}
            fullWidth
            value={form.city}
            onChange={handleChange}
            disabled={true}
          />
        </Box>
      </Box> */}
      <CustomerDetailsField label={fieldLabelUtils.city} value={form.city} />

      {/* <Box className={formGroup}>
        <FieldLabel label={fieldLabelUtils.state} />
        <Box className={gutterTop}>
          <TextField
            id="state"
            name="state"
            type={"text"}
            className={textField}
            fullWidth
            value={form.state}
            onChange={handleChange}
            disabled={true}
          />
        </Box>
      </Box> */}
      <CustomerDetailsField label={fieldLabelUtils.state} value={form.state} />

      {/* <Box className={formGroup}>
        <FieldLabel label={"Address"} />
        <Box className={gutterTop}>
          <TextField
            type={"text"}
            id="outlined-margin-none"
            name="address"
            className={textField}
            helperText={errorMessage.address}
            value={form.address}
            onInput={validateInputLength}
            onChange={handleChange}
            disabled={true}
          />
        </Box>
      </Box> */}
      <CustomerDetailsField label={"Address"} value={form.address} />
    </>
  );
}

export default withStyles(useStyles, { withTheme: true })(AddressDetailsForm);
