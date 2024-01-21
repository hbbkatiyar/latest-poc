import React, { useState } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import CloudDownloadIcon from "@material-ui/icons/CloudDownload";
import CustomTabs from "./customTabs";
import { redirectWithBlank } from "../../helpers/utils";
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
import { policyRows } from "../../defaultValues";

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
    minWidth: 320,
  },
  buyButton: {
    borderRadius: "2vh",
  },
  button: {
    width: "100%",
    padding: "14px 16px",
  },
});

export default function CustomizedTables() {
  const classes = useStyles();
  const [value, setValue] = useState(
    localStorage.getItem("policyDashboardTab")
      ? Number(localStorage.getItem("policyDashboardTab"))
      : 1
  );

  const handleChange = (event, newValue) => setValue(newValue);

  const downloadClickHandler = (slug) => {
    redirectWithBlank("/AGTL_GT100142_SM2212230000000001_1.pdf");
  };

  return (
    <>
      <Box mt={1} mb={2} display={"flex"} justifyContent={"center"}>
        <CustomTabs value={value} handleChange={handleChange} />
      </Box>

      <Box m={2} display={"flex"} justifyContent={"center"}>
        <Typography variant="subtitle2">
          Total Policy: {`0${policyRows[value].length}`}
        </Typography>
      </Box>

      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Policy No.</StyledTableCell>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell>COI</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {policyRows[value].map((row) => (
              <StyledTableRow key={row.policy}>
                <StyledTableCell component="th" scope="row">
                  {row.policy}
                </StyledTableCell>
                <StyledTableCell>{row.name}</StyledTableCell>
                <StyledTableCell onClick={downloadClickHandler}>
                  <CloudDownloadIcon />
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
