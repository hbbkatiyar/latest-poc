import React, { useContext } from "react";
import ReactTooltip from "react-tooltip";
import LendingContext from "../../context/index";
import PaymentIcon from "@material-ui/icons/Payment";
import withStyles from "@material-ui/core/styles/withStyles";
import { Box, Typography } from "@material-ui/core";
import { Help } from "@material-ui/icons";
import { useStyles } from "./labelStyles";

function FieldLabel(props) {
  const {
    classes: { cursorPointer, question },
    handleIconClick = () => { },
    icon = false,
    label = null,
    labelKey = null,
    required = true,
    fieldValue = null
  } = props;

  const {
    state: { productConfig = null },
  } = useContext(LendingContext);
  const tooltip = productConfig?.field_tooltip[labelKey] ?? "";

  return (
    <Box>
      <Typography variant={"h6"} className={question}>
        {label}
        {required && <span className="red">*</span>}
        {tooltip && (
          <Typography
            className={cursorPointer}
            data-tip={tooltip}
            style={{ display: "inline", marginTop: "1vh" }}
          >
            <Help style={{ height: "16px" }} />
          </Typography>
        )}
        {(fieldValue && icon) && (
          <Box
            className={cursorPointer}
            data-tip={"Click to calculate on road price"}
            style={{ display: "inline", marginTop: "1vh" }}
            onClick={() => handleIconClick()}
          >
            <PaymentIcon style={{ height: "16px" }} />
          </Box>
        )}
      </Typography>
      <ReactTooltip />
    </Box>
  );
}

export default withStyles(useStyles, { withTheme: true })(FieldLabel);
