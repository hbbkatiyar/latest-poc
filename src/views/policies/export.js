import React from "react";
import ReactTooltip from "react-tooltip";
import SystemUpdateAltIcon from '@material-ui/icons/SystemUpdateAlt';
import withStyles from "@material-ui/core/styles/withStyles";
import "react-toastify/dist/ReactToastify.css";
import { Box, Typography } from "@material-ui/core";
import { EXPORT_LIST } from "../../constants/index";
import { useStyles } from "./styles";

function ExportButton(props) {
  const {
    classes: {
      disabled
    },
    classes,
    handlePolicyExport,
    totalCount,
  } = props;

  return (
    <Box ml={2}>
      {totalCount > 0 ? (
        <Box className={classes.export}>
          <Typography
            data-tip={EXPORT_LIST}
            onClick={handlePolicyExport}
          >
            <SystemUpdateAltIcon />
          </Typography>
          <ReactTooltip />
        </Box>
      ) : (
        <Box className={classes.export}>
          <Typography
            data-tip={EXPORT_LIST}
            className={disabled}
          >
            <SystemUpdateAltIcon />
          </Typography>
        </Box>
      )}
    </Box>
  );
}

export default withStyles(useStyles, { withTheme: true })(ExportButton);
