import React from "react";
import { Dialog, DialogContent, DialogTitle } from "@material-ui/core";
import withStyles from "@material-ui/core/styles/withStyles";
import {
  Box,
  Button,
  Typography,
  Paper,
  Radio,
  TableRow,
  TableHead,
  TableCell,
  TableContainer,
  Table,
  TableBody,
} from "@material-ui/core";
import { useStyles } from "./calculatorStyles";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: "none", //"#ECF0F4",
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

function OnRoadPriceCalculatorDialog(props) {
  const {
    classes: { container },
    breakup = [],
    buttonText = "Close",
    handleOnClose,
    modal,
    modalKey,
    onRoadPrice,
    title = null,
  } = props;

  return (
    <Dialog
      // onClose={() => handleClose(false)}
      onClose={(event, reason) => handleOnClose(event, reason, modalKey)}
      aria-labelledby="simple-dialog-title"
      open={modal[modalKey]}
      fullWidth={"true"}
      maxWidth={"sm"}
    >
      {title && <DialogTitle id="simple-dialog-title">{title}</DialogTitle>}

      <DialogContent>
        <Box className={container}>
          <TableContainer component={Paper}>
            <Table aria-label="customized table">
              <TableBody>
                {breakup.map((row) => (
                  <TableRow key={row.title}>
                    <StyledTableCell component="th" scope="row">
                      {row.title}
                    </StyledTableCell>
                    <StyledTableCell>
                      {`₹${Number(row.amount).toLocaleString("en")}`}
                    </StyledTableCell>
                  </TableRow>
                ))}
                <TableRow key={"total"}>
                  <StyledTableCell component="th" scope="row">
                    <strong>{"Total Amount"}</strong>
                  </StyledTableCell>
                  <StyledTableCell>
                    <strong>{`₹${Number(onRoadPrice).toLocaleString("en")}`}</strong>
                  </StyledTableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </DialogContent>

      <Box m={2} mt={0} display={"flex"} justifyContent={"center"}>
        <Button
          type={"button"}
          variant="outlined"
          size="small"
          color="secondary"
          onClick={(event, reason) => handleOnClose(event, reason, modalKey)}
        >
          {buttonText}
        </Button>
      </Box>
    </Dialog>
  );
}

export default withStyles(useStyles, { withTheme: true })(
  OnRoadPriceCalculatorDialog
);
