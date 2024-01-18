import React, { useState } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import CloudDownloadIcon from "@material-ui/icons/CloudDownload";
import { redirectWithBlank } from "../../helpers/utils";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { Box, Button, Typography } from "@material-ui/core";
import csvDownload from "json-to-csv-export";
import ShareIcon from "@material-ui/icons/Share";

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

function createData(policy, name) {
  return { policy, name };
}

const rows = {
  0: [createData("POLICY001", "Mohan Singh")],
  1: [
    createData("POLICY001", "Mohan Singh"),
    createData("POLICY002", "Aman Gupta"),
    createData("POLICY003", "Naman Kumar"),
  ],
  2: [
    createData("POLICY001", "Mohan Singh"),
    createData("POLICY002", "Aman Gupta"),
    createData("POLICY003", "Naman Kumar"),
    createData("POLICY004", "Amit Singh"),
    createData("POLICY005", "Mac Mohan"),
  ],
};

const data = {
  0: [{ policy: "POLICY001", name: "Mohan Singh" }],
  1: [
    { policy: "POLICY001", name: "Mohan Singh" },
    { policy: "POLICY002", name: "Aman Gupta" },
    { policy: "POLICY003", name: "Naman Kumar" },
  ],
  2: [
    { policy: "POLICY001", name: "Mohan Singh" },
    { policy: "POLICY002", name: "Aman Gupta" },
    { policy: "POLICY003", name: "Naman Kumar" },
    { policy: "POLICY004", name: "Amit Singh" },
    { policy: "POLICY005", name: "Mac Mohan" },
  ],
};

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

  const [value, setValue] = useState(localStorage.getItem("policyDashboardTab") ? Number(localStorage.getItem("policyDashboardTab")) : 1);

  const dataToConvert = {
    data: data[value],
    filename: "policy",
    delimiter: ",",
    headers: ["Policy Number", "Name"],
  };

  const tabIndex = {
    0: "Month",
    1: "Week",
    2: "Year"
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const downloadClickHandler = (slug) => {
    redirectWithBlank(
      "/AGTL_GT100142_SM2212230000000001_1.pdf"
    );
  };

  return (
    <>
      <Box mt={1} mb={2} display={"flex"} justifyContent={"center"}>
        <Paper>
          <Tabs
            value={value}
            indicatorColor="primary"
            textColor="primary"
            onChange={handleChange}
            aria-label="disabled tabs example"
          >
            <Tab label="Week" />
            <Tab label="Month" />
            <Tab label="Year" />
          </Tabs>
        </Paper>
      </Box>

      <Box m={2} display={"flex"} justifyContent={"space-between"}>
        <Box style={{ marginTop: "12px" }}>
          <Typography variant="body2">Total Policy: {rows[value].length}</Typography>
        </Box>
        <Box>
          <Button
            type={"click"}
            variant={"contained"}
            className={`${classes.buyButton} ${classes.button}`}
            color={"primary"}
            size={"small"}
            onClick={() => csvDownload(dataToConvert)}
          >
            <ShareIcon />
          </Button>
        </Box>
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
            {rows[value].map((row) => (
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
