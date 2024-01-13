import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import {
  Box,
  Paper,
  Radio,
  TableRow,
  TableHead,
  TableCell,
  TableContainer,
  Table,
  TableBody,
} from "@material-ui/core";
import { useStyles } from "./indexStyles";

const StyledTableCell = withStyles((theme) => ({
  head: {
    // backgroundColor: "#ECF0F4",
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

function EmiChart(props) {
  const {
    classes: { selectedTenureBGColorDark, selectedTenureBGColorLight, tenuresSection },
    form: {
      selected_quote_index = 0
    } = {},
      form,
    handleTenureChange,
    tenures = [],
  } = props;

  return (
    <Box className={tenuresSection}>
      <TableContainer component={Paper}>
        <Table aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Tenure (Months)</StyledTableCell>
              <StyledTableCell>EMI Amount</StyledTableCell>
              <StyledTableCell>Repay Amount</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tenures.map((row) => (
              <TableRow key={row.name} className={ row.value === form.tenure ? (selected_quote_index + 1) % 2 === 0
                  ? selectedTenureBGColorDark
                  : selectedTenureBGColorLight : ''}>
                <StyledTableCell component="th" scope="row">
                  <Radio
                    value={`${row.value}_${row.emi}_${row.repay_amount}`}
                    defaultSelected={false}
                    checked={
                      row.value != form.tenure ? false : true
                    }
                    onChange={() => handleTenureChange(row.value)}
                  />

                  {row.value}
                </StyledTableCell>
                <StyledTableCell>
                  {`₹${Number(row.emi).toLocaleString("en")}`}
                </StyledTableCell>
                <StyledTableCell>
                  {`₹${Number(row.repay_amount).toLocaleString("en")}`}
                </StyledTableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default withStyles(useStyles, { withTheme: true })(EmiChart);
