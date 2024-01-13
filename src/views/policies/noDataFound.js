import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import "react-toastify/dist/ReactToastify.css";
import { StyledTableRow, StyledTableCell, useStyles } from "./styles";

function NoDataFound() {
  return (
    <StyledTableRow>
      <StyledTableCell
        component="th"
        colSpan={9}
        scope="row"
        style={{ textAlign: "center" }}
      >
        No records found
      </StyledTableCell>
    </StyledTableRow>
  );
}

export default withStyles(useStyles, { withTheme: true })(NoDataFound);
