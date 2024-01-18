import React, { useEffect, useState } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Box, Button, Grid, Typography } from "@material-ui/core";
// import Paper from '@material-ui/core/Paper';
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import csvDownload from "json-to-csv-export";
import CloudDownloadIcon from "@material-ui/icons/CloudDownload";
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

function createData(proposal, name, status) {
  return { proposal, name, status };
}

const rows = {
  0: [
    createData("PR0003", "-", "e-KYC"),
    createData("PR0005", "Amit Kumar", "Nominee"),
  ],
  1: [
    createData("PR0001", "Ansh Katiyar", "Payment"),
    createData("PR0003", "-", "e-KYC"),
    createData("PR0005", "Amit Kumar", "Nominee"),
  ],
  2: [
    createData("PR0001", "Ansh Katiyar", "Payment"),
    createData("PR0002", "Palak Gupta", "Payment"),
    createData("PR0003", "-", "e-KYC"),
    createData("PR0004", "Man Singla", "Nominee"),
    createData("PR0005", "Amit Kumar", "Nominee"),
  ],
};

const data = {
  0: [
    { proposal: "PR0003", name: "-", status: "e-KYC" },
    { proposal: "PR0005", name: "Amit Kumar", status: "Nominee" },
  ],
  1: [
    { proposal: "PR0001", name: "Ansh Katiyar", status: "Payment" },
    { proposal: "PR0003", name: "-", status: "e-KYC" },
    { proposal: "PR0005", name: "Amit Kumar", status: "Nominee" },
  ],
  2: [
    { proposal: "PR0001", name: "Ansh Katiyar", status: "Payment" },
    { proposal: "PR0002", name: "Palak Gupta", status: "Payment" },
    { proposal: "PR0003", name: "-", status: "e-KYC" },
    { proposal: "PR0004", name: "Man Singla", status: "Nominee" },
    { proposal: "PR0005", name: "Amit Kumar", status: "Nominee" },
  ],
};

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
  const [value, setValue] = useState(localStorage.getItem("proposalDashboardTab") ? Number(localStorage.getItem("proposalDashboardTab")) : 1);

  const dataToConvert = {
    data: data[value],
    filename: "proposal",
    delimiter: ",",
    headers: ["Proposal", "Name", "Status"],
  };

  const tabIndex = {
    0: "Month",
    1: "Week",
    2: "Year"
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
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

      <Box mt={2} ml={1} mr={1} mb={2} display={"flex"} justifyContent={"space-between"}>
        <Box style={{ marginTop: "12px"}}>
          <Typography variant="body2">Proposal: {rows[value].length}</Typography>
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
        <Table aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Proposal</StyledTableCell>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell>Status</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows[value].map((row) => (
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

                {/* {row.status !== "e-KYC" && (
                <StyledTableCell>{row.status}</StyledTableCell>
              )} */}
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
