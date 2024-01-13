import React from "react";
import { Box, TextField, Typography } from "@material-ui/core";
import { useStyles } from "./style";
import withStyles from "@material-ui/core/styles/withStyles";
import { useField } from "formik";

function TextInput({
  label,
  classes,
  placeholder,
  wrapper,
  isLabel = true,
  ...textFieldsProps
}) {
  const [field, meta] = useField(textFieldsProps.name);
  const config = {
    ...field,
    ...textFieldsProps,
    className: classes.textField,
  };

  if (meta && meta.touched && meta.error) {
    config.error = true;
    config.helperText = meta.error;
  }

  return (
    <Box className={classes.formGroup}>
      {isLabel ? (
        <Box>
          <Typography variant={"h6"} className={classes.question}>
            {label}
          </Typography>
        </Box>
      ) : (
        <></>
      )}
      {wrapper(
        <TextField
          placeholder={placeholder}
          className={classes.textField}
          {...config}
        ></TextField>
      )}
    </Box>
  );
}

export default withStyles(useStyles)(TextInput);
