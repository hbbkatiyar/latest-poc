import React from "react";
import ReactTooltip from "react-tooltip";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import DoneOutlineOutlinedIcon from "@material-ui/icons/DoneOutlineOutlined";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import withStyles from "@material-ui/core/styles/withStyles";
import "react-toastify/dist/ReactToastify.css";
import { Box, Button } from "@material-ui/core";
import { StyledTableRow, StyledTableCell, useStyles } from "./styles";
import { renderClaimStatus, getStorageItem } from "../../helpers/utils";
import {
  BUTTON_INVOICE_UPLOADED,
  BUTTON_UPLOAD_INVOICE,
  BUTTON_UPLOAD_REPAIRED_MOBILE,
  BUTTON_REPAIRED_MOBILE_UPLOADED,
} from "../../constants/index";

function PoliciesListItem(props) {
  const {
    classes: {
      borderRadius,
      capitalize,
      cancelledPolices,
      marginLeft,
      statusButton,
    },
    classes,
    index,
    isPolicyInActive,
    onRowClick,
    policy: item,
    uploadClickHandler,
  } = props;

  return (
    <StyledTableRow
      name="row"
      key={index}
      onClick={() => onRowClick(item)}
      // className={`${isPolicyInActive(item.active) ? cancelledPolices : ""}`}
    >
      <StyledTableCell className={classes.td} component="th" scope="row">
        <Box data-tip={item?.id}>{item?.id}</Box>
        <ReactTooltip />
      </StyledTableCell>
      <StyledTableCell className={classes.td} component="th" scope="row">
        {item?.name}
      </StyledTableCell>
      <StyledTableCell className={classes.td} component="th" scope="row">
        {item?.product}
      </StyledTableCell>
      <StyledTableCell className={[classes.td, classes.inLine]}>
        {`₹${Number(item?.claimed_amount).toLocaleString("en")}`}
      </StyledTableCell>
      <StyledTableCell className={[classes.td, classes.inLine]}>
        {item?.approved_amount
          ? `₹${Number(item?.approved_amount).toLocaleString("en")}`
          : "-"}
      </StyledTableCell>
      <StyledTableCell className={[classes.td, classes.inLine]}>
        {`${item?.created_at}`}
      </StyledTableCell>
      <StyledTableCell className={`${classes.td} ${item?.status}`}>
        <Box
          className={`${statusButton} ${item?.active
            .toLowerCase()
            .replace(" ", "_")}`}
        >
          {renderClaimStatus(item?.active)}
        </Box>
      </StyledTableCell>
      <StyledTableCell className={classes.td}>
        <Box layout="column" display="flex">
          {item?.active.toLowerCase() === "approved" &&
            (getStorageItem(`invoice_uploaded_for_claim_${item?.id}`) ? (
              <Box data-tip1={"Repaired Invoice has been uploaded"}>
                <Button
                  variant="contained"
                  color="secondary"
                  size={"small"}
                  className={`${borderRadius} ${marginLeft} ${capitalize} disabled`}
                  // disabled={true}
                >
                  <CheckCircleIcon style={{ margin: "6px 6px" }} />
                  {BUTTON_INVOICE_UPLOADED}
                </Button>
                {/* <ReactTooltip /> */}
              </Box>
            ) : (
              <Box data-tip1={"Upload Repaired Invoice"}>
                <Button
                  variant="contained"
                  color="primary"
                  size={"small"}
                  className={`${borderRadius} ${marginLeft} ${capitalize}`}
                  onClick={() => uploadClickHandler(item?.id, "invoice")}
                >
                  <AddCircleOutlineIcon style={{ margin: "6px 6px" }} />
                  {BUTTON_UPLOAD_INVOICE}
                </Button>
                {/* <ReactTooltip /> */}
              </Box>
            ))}

          {item?.active.toLowerCase() === "approved" &&
            (getStorageItem(
              `repaired_mobile_uploaded_for_claim_${item?.id}`
            ) ? (
              <Box data-tip1={"Repaired Mobile Photo has been uploaded"}>
                <Button
                  variant="contained"
                  color="secondary"
                  size={"small"}
                  className={`${borderRadius} ${marginLeft} ${capitalize} disabled`}
                  // disabled={true}
                >
                  <CheckCircleIcon style={{ margin: "6px 6px" }} />
                  {BUTTON_REPAIRED_MOBILE_UPLOADED}
                </Button>
                {/* <ReactTooltip /> */}
              </Box>
            ) : (
              <Box data-tip1={"Upload Repaired Mobile Photo"}>
                <Button
                  variant="contained"
                  color="primary"
                  size={"small"}
                  className={`${borderRadius} ${marginLeft} ${capitalize}`}
                  onClick={() => uploadClickHandler(item?.id, "repairedMobile")}
                >
                  <AddCircleOutlineIcon style={{ margin: "6px 6px" }} />
                  {BUTTON_UPLOAD_REPAIRED_MOBILE}
                </Button>
                {/* <ReactTooltip /> */}
              </Box>
            ))}
        </Box>
        {item?.active.toLowerCase().replace(" ", "_") ===
          "settlement_completed" && (
          <Box data-tip1={"Claim has been settled"}>
            <Button
              variant="contained"
              color="secondary"
              size={"small"}
              className={`${borderRadius} ${marginLeft} ${capitalize} disabled`}
            >
              <CheckCircleIcon style={{ margin: "6px 6px" }} />
              {renderClaimStatus(item?.active)}
            </Button>
            {/* <ReactTooltip /> */}
          </Box>
        )}
      </StyledTableCell>
    </StyledTableRow>
  );
}

export default withStyles(useStyles, { withTheme: true })(PoliciesListItem);
