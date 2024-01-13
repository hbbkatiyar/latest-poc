import React from "react";
import ReactTooltip from "react-tooltip";
import RefreshIcon from "@material-ui/icons/Refresh";
import withStyles from "@material-ui/core/styles/withStyles";
import { Box, Typography } from "@material-ui/core";
import { useStyles } from "./indexStyles";
import { REFRESH_ICON_TOOLTIP } from "../../../constants";

function HeaderSection(props) {
  const {
    classes: { cursorPointer, disabled },
    index,
    item: { max_amount = null, name = null },
    item,
    onClickHandler,
  } = props;

  return (
    <>
      <Box alignItems="center" display="flex" justifyContent="space-between">
        <Typography variant="body2">
          <b> {name} </b>
        </Typography>
        {max_amount ? (
          <Typography
            className={cursorPointer}
            data-tip={REFRESH_ICON_TOOLTIP}
            onClick={() => onClickHandler(item, index)}
          >
            <RefreshIcon />
            <ReactTooltip />
          </Typography>
        ) : <Box className={disabled}><RefreshIcon /></Box>}
      </Box>
    </>
  );
}

export default withStyles(useStyles, { withTheme: true })(HeaderSection);
