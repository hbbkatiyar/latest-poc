import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import { Box } from "@material-ui/core";
import { useStyles } from "../indexFormStyles";

function ErrorMessage(props) {
  const {
    classes: { formGroup, textField },
    errors,
    modal = { open: false},
  } = props;

  return (
    errors.length > 0 &&
    !modal.open && (
      <Box className={formGroup} m={2} style={{ color: "red", textAlign: "center" }}>
        {errors.map((item, key) => {
          return (
            <Box className={textField} key={key} style={{ color: "red" }}>
              {item}
            </Box>
          );
        })}
      </Box>
    )
  );
}

export default withStyles(useStyles, { withTheme: true })(ErrorMessage);
