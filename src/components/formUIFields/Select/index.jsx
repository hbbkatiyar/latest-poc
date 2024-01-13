import React from "react";
import {
  Box,
  Select,
  MenuItem,
  Typography,
  FormHelperText,
} from "@material-ui/core";
import { useStyles } from "./style";
import withStyles from "@material-ui/core/styles/withStyles";
import { useField } from "formik";

function SelectInput({
  label,
  classes,
  options,
  extraFn,
  placeholder,
  name,
  isLabel = true,
  wrapper,
  ...textFieldsProps
}) {
  const [field, meta] = useField(name);
  const config = {
    ...field,
    ...textFieldsProps,
    className: classes.textField,
  };

  if (meta && meta.touched && meta.error) {
    config.error = true;
    config.helperText = meta.error;
  }

  const { helperText, ...propsProvider } = config;

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
        <Select name={name} className={classes.textField} {...propsProvider}>
          <MenuItem key="0" className={classes.placeholder} value={"-"}>
            <Typography variant={"body2"} className={classes.text}>
              {placeholder}
            </Typography>
          </MenuItem>
          {options.map((e) => {
            return (
              <MenuItem key={e.value} value={e.value}>
                <Typography variant={"body2"}>{e.title}</Typography>
              </MenuItem>
            );
          })}
        </Select>
      )}
      <FormHelperText className={classes.helperText}>
        {helperText}
      </FormHelperText>
    </Box>
  );
}

export default withStyles(useStyles)(SelectInput);
