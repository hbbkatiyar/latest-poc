import React, { useContext } from "react";
import AddressDetailsForm from "./address";
import LendingContext from "../../../context/index";
import FieldLabel from "../../../components/common/label";
import DownloadField from "./downloadField";
import CloudDownloadIcon from "@material-ui/icons/CloudDownload";
import withStyles from "@material-ui/core/styles/withStyles";
import {
  Box,
  Button,
  Grid,
  Hidden,
  TextField,
  Typography,
} from "@material-ui/core";
import {
  getMinDobDate,
  getMaxDobDate,
  validateInputLength,
} from "../../../helpers/proposal";
import { redirectWithBlank } from "../../../helpers/utils";
import { useStyles } from "../indexFormStyles";
import CustomerDetailsField from "./customerField";
import { NOT_AVAILABLE_TEXT } from "../../../constants/index";

function AssetDetailsForm(props) {
  const {
    state: {
      orderDetails = null,
      productConfig: { field_label: fieldLabelUtils },
    },
  } = useContext(LendingContext);
  const {
    classes: {
      button,
      buyButton,
      cursorPointer,
      formGroup,
      gutterTop,
      textField,
    },
    errorMessage,
    form,
    handleChange,
    handleChangeChipSelect,
  } = props;

  return (
    <Box direction="column" style={{ width: "100%" }}>
      <Grid container spacing={2}>
        <Grid container item md={5} direction="column">
          {/* <Box className={formGroup}>
            <FieldLabel label={"Brand"} />
            <Box className={gutterTop}>
              <TextField
                type={"text"}
                id="outlined-margin-none"
                name="phone_brand"
                className={textField}
                helperText={errorMessage.phone_brand}
                value={form.phone_brand}
                onInput={validateInputLength}
                onChange={handleChange}
                disabled={true}
              />
            </Box>
          </Box> */}
          <CustomerDetailsField label={"Brand"} value={form.phone_brand} />

          {/* <Box className={formGroup}>
            <FieldLabel label={"Model"} />
            <Box className={gutterTop}>
              <TextField
                type={"text"}
                id="outlined-margin-none"
                name="phone_model"
                className={textField}
                helperText={errorMessage.phone_model}
                value={form.phone_model}
                onInput={validateInputLength}
                onChange={handleChange}
                disabled={true}
              />
            </Box>
          </Box> */}
          <CustomerDetailsField label={"Model"} value={form.phone_model} />

          {/* <Box className={formGroup}>
            <FieldLabel label={"Color"} />
            <Box className={gutterTop}>
              <TextField
                type={"text"}
                id="outlined-margin-none"
                name="phone_color"
                className={textField}
                helperText={errorMessage.phone_color}
                value={form.phone_color}
                onInput={validateInputLength}
                onChange={handleChange}
                disabled={true}
              />
            </Box>
          </Box> */}
          <CustomerDetailsField label={"Color"} value={form.phone_color} />

          {/* <Box className={formGroup}>
            <FieldLabel label={"Storage"} />
            <Box className={gutterTop}>
              <TextField
                type={"text"}
                id="outlined-margin-none"
                name="phone_storage"
                className={textField}
                helperText={errorMessage.phone_storage}
                value={form.phone_storage}
                onInput={validateInputLength}
                onChange={handleChange}
                disabled={true}
              />
            </Box>
          </Box> */}
          <CustomerDetailsField label={"Storage"} value={form.phone_storage} />

          {/* <Box className={formGroup}>
            <FieldLabel label={"RAM"} />
            <Box className={gutterTop}>
              <TextField
                type={"text"}
                id="outlined-margin-none"
                name="phone_ram"
                className={textField}
                helperText={errorMessage.phone_ram}
                value={form.phone_ram}
                onInput={validateInputLength}
                onChange={handleChange}
                disabled={true}
              />
            </Box>
          </Box> */}
          <CustomerDetailsField label={"RAM"} value={form.phone_ram} />

          {/* <Box className={formGroup}>
            <FieldLabel label={"IMEI Number"} />
            <Box className={gutterTop}>
              <TextField
                type={"text"}
                id="outlined-margin-none"
                name="imei_number"
                className={textField}
                helperText={errorMessage.imei_number}
                value={form.imei_number}
                onInput={validateInputLength}
                onChange={handleChange}
                disabled={true}
              />
            </Box>
          </Box> */}
          <CustomerDetailsField
            label={"IMEI Number"}
            value={form.imei_number}
          />

          {/* <Box className={formGroup}>
            <FieldLabel label={"Invoice Amount"} />
            <Box className={gutterTop}>
              <TextField
                type={"text"}
                id="outlined-margin-none"
                name="invoice_amount"
                className={textField}
                helperText={errorMessage.invoice_amount}
                value={form.invoice_amount}
                onInput={validateInputLength}
                onChange={handleChange}
                disabled={true}
              />
            </Box>
          </Box> */}
          <CustomerDetailsField
            label={"Invoice Amount"}
            value={form.invoice_amount}
          />

          {/* <Box className={formGroup}>
            <FieldLabel label={"Invoice Number"} />
            <Box className={gutterTop}>
              <TextField
                type={"text"}
                id="outlined-margin-none"
                name="invoice_number"
                className={textField}
                helperText={errorMessage.invoice_number}
                value={form.invoice_number}
                onInput={validateInputLength}
                onChange={handleChange}
                disabled={true}
              />
            </Box>
          </Box> */}
          <CustomerDetailsField
            label={"Invoice Number"}
            value={form.invoice_number}
          />

          {/* <Box className={formGroup}>
            <FieldLabel label={"Invoice Date"} />
            <Box className={gutterTop}>
              <TextField
                type={"text"}
                id="outlined-margin-none"
                name="invoice_date"
                className={textField}
                helperText={errorMessage.invoice_date}
                value={form.invoice_date}
                onInput={validateInputLength}
                onChange={handleChange}
                disabled={true}
              />
            </Box>
          </Box> */}
          <CustomerDetailsField
            label={"Invoice Amount"}
            value={form.invoice_amount}
          />

          {/* <Box className={formGroup}>
            <FieldLabel label={"Manufactured Date"} />
            <Box className={gutterTop}>
              <TextField
                type={"text"}
                id="outlined-margin-none"
                name="manufactured_date"
                className={textField}
                helperText={errorMessage.manufactured_date}
                value={form.manufactured_date}
                onInput={validateInputLength}
                onChange={handleChange}
                disabled={true}
              />
            </Box>
          </Box> */}
          <CustomerDetailsField
            label={"Manufactured Date"}
            value={form.manufactured_date}
          />

          {/* <Box className={formGroup}>
            <FieldLabel label={"Serial Number"} />
            <Box className={gutterTop}>
              <TextField
                type={"text"}
                id="outlined-margin-none"
                name="serial_number"
                className={textField}
                helperText={errorMessage.serial_number}
                value={form.serial_number}
                onInput={validateInputLength}
                onChange={handleChange}
                disabled={true}
              />
            </Box>
          </Box> */}
          <CustomerDetailsField
            label={"Serial Number"}
            value={form.serial_number}
          />
        </Grid>

        <Hidden smDown>
          <Grid container item md={2} direction="column"></Grid>
        </Hidden>

        <Grid container item md={5} direction="column">
          {/* <Box className={formGroup}>
            <FieldLabel label={"Product Name"} />
            <Box className={gutterTop}>
              <TextField
                type={"text"}
                id="outlined-margin-none"
                name="product_name"
                className={textField}
                helperText={errorMessage.product_name}
                value={form.product_name}
                onInput={validateInputLength}
                onChange={handleChange}
                disabled={true}
              />
            </Box>
          </Box> */}
          <CustomerDetailsField
            label={"Product Name"}
            value={form.product_name}
          />

          {/* <Box className={formGroup}>
            <FieldLabel label={"Coverage Period"} />
            <Box className={gutterTop}>
              <TextField
                type={"text"}
                id="outlined-margin-none"
                name="coverage_period"
                className={textField}
                helperText={errorMessage.coverage_period}
                value={form.coverage_period}
                onInput={validateInputLength}
                onChange={handleChange}
                disabled={true}
              />
            </Box>
          </Box> */}
          <CustomerDetailsField
            label={"Coverage Period"}
            value={form.coverage_period}
          />

          {/* <Box className={formGroup}>
            <FieldLabel label={"Coverage Start Date"} />
            <Box className={gutterTop}>
              <TextField
                type={"text"}
                id="outlined-margin-none"
                name="start_date"
                className={textField}
                helperText={errorMessage.start_date}
                value={form.start_date}
                onInput={validateInputLength}
                onChange={handleChange}
                disabled={true}
              />
            </Box>
          </Box> */}
          {/* <CustomerDetailsField
            label={"Coverage Start Date"}
            value={form.start_date}
          /> */}
          <CustomerDetailsField
            label={"Coverage Duration"}
            value={form.start_date ? `${form.start_date} - ${form.end_date}` : NOT_AVAILABLE_TEXT}
          />

          {/* <Box className={formGroup}>
            <FieldLabel label={"Coverage End Date"} />
            <Box className={gutterTop}>
              <TextField
                type={"text"}
                id="outlined-margin-none"
                name="end_date"
                className={textField}
                helperText={errorMessage.end_date}
                value={form.end_date}
                onInput={validateInputLength}
                onChange={handleChange}
                disabled={true}
              />
            </Box>
          </Box> */}
          {/* <CustomerDetailsField
            label={"Coverage End Date"}
            value={form.end_date}
          /> */}

          {/* <Box className={formGroup}>
            <FieldLabel label={"Mobile Photo"} />
            <Box
              className={gutterTop}
              display="flex"
              style={{ textAlign: "left" }}
            >
              {form.screen_photo ? (
                <Box
                  display="inline-flex"
                  onClick={() => redirectWithBlank(form.screen_photo_link)}
                >
                  <Typography className={cursorPointer} display="inline">
                    <CloudDownloadIcon color={"secondary"} fontSize="large" />
                  </Typography>
                  <Typography
                    className={cursorPointer}
                    style={{ padding: "10px" }}
                  >
                    {"Download"}
                  </Typography>
                </Box>
              ) : (
                NOT_AVAILABLE_TEXT
              )}
            </Box>
          </Box> */}
          <DownloadField
            label={"Mobile Photo"}
            clickHandler={redirectWithBlank}
            url={form.screen_photo_link}
          />

          {/* <Box className={formGroup}>
            <FieldLabel label={"Invoice Photo"} />
            <Box
              className={gutterTop}
              display="flex"
              style={{ textAlign: "left" }}
            >
              {form.invoice ? (
                <Box
                  display="inline-flex"
                  onClick={() => redirectWithBlank(form.invoice_link)}
                >
                  <Typography className={cursorPointer} display="inline">
                    <CloudDownloadIcon color={"secondary"} fontSize="large" />
                  </Typography>
                  <Typography
                    className={cursorPointer}
                    style={{ padding: "10px" }}
                  >
                    {"Download"}
                  </Typography>
                </Box>
              ) : (
                NOT_AVAILABLE_TEXT
              )}
            </Box>
          </Box> */}
          <DownloadField
            label={"Invoice Photo"}
            clickHandler={redirectWithBlank}
            url={form.invoice_link}
          />

          {/* <Box className={formGroup}>
            <FieldLabel label={"Coverage Certificate"} />
            <Box
              className={gutterTop}
              display="flex"
              style={{ textAlign: "left" }}
            >
              {form.policy_document ? (
                <Box
                  display="inline-flex"
                  onClick={() => redirectWithBlank(form.policy_document)}
                >
                  <Typography
                    className={cursorPointer}
                    display="inline"
                    variant="button"
                  >
                    <CloudDownloadIcon color={"secondary"} fontSize="large" />
                  </Typography>
                  <Typography
                    className={cursorPointer}
                    style={{ padding: "10px" }}
                  >
                    {"Download"}
                  </Typography>
                </Box>
              ) : (
                NOT_AVAILABLE_TEXT
              )}
            </Box>
          </Box> */}
          <DownloadField
            label={"Coverage Certificate"}
            clickHandler={redirectWithBlank}
            url={form.policy_document}
            type={"pdf"}
            value={"Download"}
          />

        </Grid>
      </Grid>
    </Box>
  );
}

export default withStyles(useStyles, { withTheme: true })(AssetDetailsForm);
