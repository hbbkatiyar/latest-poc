import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import "react-toastify/dist/ReactToastify.css";
import { StyledTableCell, useStyles } from "./styles";
import { TableHead, TableRow } from "@material-ui/core";
import { Images } from "../../constants/images";

function CustomTableHead(props) {
  const { classes, handleClick } = props;

  const { inline, statusFilter, statusFilterImage } = classes;

  return (
    <TableHead>
      <TableRow>
        <StyledTableCell className={inline}>Claim ID</StyledTableCell>
        <StyledTableCell className={inline}>Customer Name</StyledTableCell>
        <StyledTableCell className={inline}>Product</StyledTableCell>
        <StyledTableCell className={inline}>Claimed Amount</StyledTableCell>
        <StyledTableCell className={inline}>Approved Amount</StyledTableCell>
        <StyledTableCell className={inline}>Claim Date</StyledTableCell>
        <StyledTableCell className={inline}>Status</StyledTableCell>
        <StyledTableCell className={inline}></StyledTableCell>
      </TableRow>
    </TableHead>
  );
}

export default withStyles(useStyles, { withTheme: true })(CustomTableHead);
