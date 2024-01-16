import React from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: "#39A9AD", //theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

function createData(proposal, name,  status) {
  return { proposal, name, status };
}

const rows = [
  createData("PR0001", "Ansh Katiyar", "Payment"),
  createData("PR0002", "Palak Gupta", "Payment"),
  createData("PR0003", "Arti Singh", "e-KYC"),
  createData("PR0004", "Man Singla", "Nominee"),
  createData("PR0005", "Amit Kumar", "Nominee"),
];

const useStyles = makeStyles({
  table: {
    minWidth: 350,
  },
});

export default function CustomizedTables() {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Proposal</StyledTableCell>
            <StyledTableCell>Name</StyledTableCell>
            <StyledTableCell>Status</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.proposal}>
              <StyledTableCell component="th" scope="row">
                {row.proposal}
              </StyledTableCell>
              <StyledTableCell>{row.name}</StyledTableCell>
              <StyledTableCell>{row.status}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
