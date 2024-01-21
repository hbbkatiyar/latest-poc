import React, { useState } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@material-ui/core";
import { proposalRows } from "../../defaultValues";
import CustomTabs from "./customTabs";

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

const useStyles = makeStyles({
  table: {
    minWidth: 350,
  },
  buyButton: {
    borderRadius: "2vh",
  },
  button: {
    width: "100%",
    padding: "14px 16px",
  },
});

export default function CustomizedTables({ clickHandler }) {
  const classes = useStyles();
  const [value, setValue] = useState(
    localStorage.getItem("proposalDashboardTab")
      ? Number(localStorage.getItem("proposalDashboardTab"))
      : 1
  );

  const handleChange = (event, newValue) => setValue(newValue);

  return (
    <>
      <Box mt={1} mb={2} display={"flex"} justifyContent={"center"}>
        <CustomTabs value={value} handleChange={handleChange} />
      </Box>

      <Box m={2} display={"flex"} justifyContent={"center"}>
        <Typography variant="subtitle2">
          Proposal: {`0${proposalRows[value].length}`}
        </Typography>
      </Box>

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
            {proposalRows[value].map((row) => (
              <StyledTableRow key={row.proposal}>
                <StyledTableCell component="th" scope="row">
                  {row.proposal}
                </StyledTableCell>
                <StyledTableCell>{row.name}</StyledTableCell>
                <StyledTableCell>
                  <Box onClick={() => clickHandler(row.status)}>
                    <Typography
                      variant="body2"
                      style={{
                        fontSize: "14px",
                        color: "#014FB6",
                        cursor: "pointer",
                      }}
                    >
                      {row.status}
                    </Typography>
                  </Box>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
