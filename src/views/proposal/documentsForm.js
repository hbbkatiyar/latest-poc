import React, { useContext, useState } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import LendingContext from "../../context/index";
import CallToAction from "./partials/cta";
import ErrorMessage from "./partials/error";
import SummaryField from "./partials/summaryField";
import {
  Box,
  Button,
  Grid,
  Hidden,
  Paper,
  Typography,
  TableRow,
  TableHead,
  TableCell,
  TableContainer,
  Table,
  TableBody,
} from "@material-ui/core";
import { useStyles } from "./summaryStyles";
import { useHistory } from "react-router-dom";
import renderHTML from "react-render-html";
import { toTitleCase } from "../../helpers/proposal";
import { redirectWithBlank } from "../../helpers/utils";
import { Utils } from "../../constants/utils";
import { BUTTON_HANDOVER, HANDOVER } from "../../constants/index";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: "#ECF0F4",
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

function createData(name, calories) {
  return { name, calories };
}

function DocumentsForm(props) {
  const history = useHistory();
  const {
    state: {
      orderDetails: {
        data: {
          amount,
          name,
          emi,
          interest_rate,
          interest_rate_suffix_text,
          repay_amount,
          tenure,
          tenure_suffix_text = "months",
          documents = [],
        },
      },
      orderDetails = null,
    },
  } = useContext(LendingContext);

  const {
    classes: {
      document,
      headerBoxOuter,
      headerDetailsBox,
      main,
      buyButton,
      button,
      question,
      uploadSection,
    },
    errors,
    fileSubmitHandler,
    handleClick,
    isFormSubmitted,
    uploadPancardHandler,
    uploadAadhaarFrontSideHandler,
    uploadAadhaarBackSideHandler,
    updateProposal,
    fileUploadResponse,
    fileUploadProgress,
    fileSize,
  } = props;

  const rows = [
    createData(
      "Foreclosure/Pre-payment charges",
      "Prepayment is not allowed within three months of EMI repayment. <br />Within 4 months to 12 months from the 1st EMI - 6% of principal outstanding. <br />Within 13 months to 24 months from the 1st EMI - 5% of principal outstanding. <br />24 months from 1st EMI - 3% of principal outstanding."
    ),
    createData(
      "Stamp Duty & Other Statutory Charges",
      "At actuals as levied by respective State Govt"
    ),
    createData("EMI Late Payment Panalty", "2.5% Per Month on unpaid EMI"),
    createData("Installment Frequency", "Monthly"),
  ];

  return (
    orderDetails && (
      <>
        <Box>
          <Box className={main}>
            <Box className={headerBoxOuter}>
              <Box className={headerDetailsBox} m={2}>
                <SummaryField
                  label={"Loan Amount"}
                  value={`₹${Number(amount).toLocaleString("en")}`}
                />
                <SummaryField
                  label={"Loan Tenure"}
                  value={`${tenure} ${tenure_suffix_text}`}
                />
                <SummaryField
                  label={"Interest Rate"}
                  value={`${interest_rate}% ${interest_rate_suffix_text}`}
                />
                <SummaryField
                  label={"Monthly EMI"}
                  value={`₹${Number(emi).toLocaleString("en")}`}
                />
                <SummaryField
                  label={"Total to Repay"}
                  value={`₹${Number(repay_amount).toLocaleString("en")}`}
                />
              </Box>

              <Box m={5} p={5} className={`${uploadSection} ${buyButton}`}>
                {documents.map((item) => {
                  return (
                    <Grid container spacing={2} className={document}>
                      <Grid container item md={2} className={question}>
                        {toTitleCase(item.category)}
                      </Grid>
                      <Grid container item md={2}>
                        <Button
                          title
                          className={buyButton}
                          variant={"outlined"}
                          size="small"
                          color={"primary"}
                          onClick={() =>
                            redirectWithBlank(
                              `${Utils.s3Bucket.url}/${item.name}`
                            )
                          }
                        >
                          View Document
                        </Button>
                      </Grid>
                    </Grid>
                  );
                })}

                {(documents.length === 0 || 1 === 1) && (
                  <form onSubmit={fileSubmitHandler}>
                    <Grid container spacing={2} className={document}>
                      <Grid container item md={2} className={question}>
                        Pancard
                      </Grid>
                      <Grid container item md={2}>
                        <input
                          type="file"
                          multiple
                          onChange={uploadPancardHandler}
                        />
                      </Grid>
                    </Grid>
                    <Grid container spacing={2} className={document}>
                      <Grid container item md={2} className={question}>
                        Aadhaar Front Side
                      </Grid>
                      <Grid container item md={2}>
                        <input
                          type="file"
                          multiple
                          onChange={uploadAadhaarFrontSideHandler}
                        />
                      </Grid>
                    </Grid>
                    <Grid container spacing={2} className={document}>
                      <Grid container item md={2} className={question}>
                        Aadhaar Back Side
                      </Grid>
                      <Grid container item md={5}>
                        <input
                          type="file"
                          multiple
                          onChange={uploadAadhaarBackSideHandler}
                        />
                      </Grid>
                      <Grid container item md={2}>
                        <Button
                          type={"submit"}
                          variant={"contained"}
                          className={`${buyButton}`}
                          color={"primary"}
                          // size={"small"}
                        >
                          Proceed
                        </Button>
                      </Grid>
                      {1 === 2 && (
                        <Grid container item md={2}>
                          <Button
                            type={"click"}
                            variant={"contained"}
                            className={`${buyButton}`}
                            color={"secondary"}
                            // size={"small"}
                            onClick={() => updateProposal()}
                            isDisabled={isFormSubmitted}
                            isFormSubmitted={isFormSubmitted}
                          >
                            {BUTTON_HANDOVER}
                          </Button>
                        </Grid>
                      )}
                    </Grid>

                    {!fileSize && (
                      <p style={{ color: "red" }}>File size exceeded!!</p>
                    )}
                    {fileUploadProgress && (
                      <p style={{ color: "red" }}>Uploading File(s)</p>
                    )}
                    {fileUploadResponse != null && (
                      <p style={{ color: "green" }}>{fileUploadResponse}</p>
                    )}

                    <ErrorMessage errors={errors} />
                  </form>
                )}
              </Box>

              <Hidden smDown>
                <Box m={5}>
                  <TableContainer component={Paper}>
                    <Table aria-label="customized table">
                      <TableHead>
                        <TableRow>
                          <StyledTableCell colspan="2">
                            CHARGES (Including Govt Taxes & Levies)
                          </StyledTableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {rows.map((row) => (
                          <TableRow key={row.name}>
                            <StyledTableCell component="th" scope="row">
                              {row.name}
                            </StyledTableCell>
                            <StyledTableCell>
                              {renderHTML(row.calories)}
                            </StyledTableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Box>
              </Hidden>

              <Hidden smUp>
                <Box className={headerDetailsBox}>
                  <Typography variant="body1">
                    CHARGES (Including Govt Taxes & Levies)
                  </Typography>
                  {rows.map((row) => (
                    <SummaryField
                      label={row.name}
                      value={renderHTML(row.calories)}
                    />
                  ))}
                </Box>
              </Hidden>
            </Box>
          </Box>
        </Box>
      </>
    )
  );
}

export default withStyles(useStyles, { withTheme: true })(DocumentsForm);
