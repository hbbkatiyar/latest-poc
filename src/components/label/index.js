import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import { Typography } from "@material-ui/core";
import { useStyles } from "./indexStyles";

function FieldLabel({
  classes: { label: labelText },
  label = null
}) {
  return (
    <Typography variant="body2" className={labelText}>
      {label}
    </Typography>
  );
}

export default withStyles(useStyles, { withTheme: true })(FieldLabel);
