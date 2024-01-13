import React, { useContext } from "react";
import LendingContext from "../../../context/index";
import FieldLabel from "../../../components/common/label";
import ImageUpload from "../../../components/common/imageUpload";
import withStyles from "@material-ui/core/styles/withStyles";
import { Box, Grid, Hidden, TextField } from "@material-ui/core";
import { useStyles } from "../indexFormStyles";
import { validateInputLength } from "../../../helpers/proposal";

function VehicleDetailsForm(props) {
  const {
    state: {
      orderDetails = null,
      productConfig: { field_label: fieldLabelUtils },
    },
  } = useContext(LendingContext);
  const {
    classes: { formGroup, textField },
    errorMessage,
    form,
    handleChange,
    isSearchCompleted,
    photoChangeHandler,
  } = props;

  return (
    isSearchCompleted && (
      <Box direction="column" style={{ width: "100%" }}>
        <Grid container spacing={2} className={!orderDetails && "disabled"}>
          <Grid container item md={5} direction="column">
            <Box className={formGroup}>
              <FieldLabel label={"Approximate Estimate"} fieldValue={""} labelKey={"on_road_price"} />
              <TextField
                type={"text"}
                id="outlined-margin-none"
                name="on_road_price"
                className={textField}
                helperText={errorMessage.on_road_price}
                value={form.on_road_price}
                onInput={validateInputLength}
                onChange={handleChange}
              />
            </Box>

            <Box className={formGroup}>
              <FieldLabel label={"Estimate Photo"} fieldValue={form.estimate} />
              <ImageUpload
                title="Add Estimate"
                photoChangeHandler={photoChangeHandler}
                filename="estimate"
              />
            </Box>
          </Grid>

          <Hidden smDown>
            <Grid container item md={2} direction="column"></Grid>
          </Hidden>

          <Grid container item md={5} direction="column">
            {/* <Box className={formGroup}>
            <FieldLabel label={"Add Photo"} fieldValue={"form.estimate"} />
            <Box display="flex" layout={"row"}>
              <ImageUpload title="Estimate" photoChangeHandler={photoChangeHandler} filename="estimate" />

              <ImageUpload title="Aadhaar" photoChangeHandler={photoChangeHandler} filename="aadhaar" />

              <ImageUpload title="Phone" photoChangeHandler={photoChangeHandler} filename="phone" />
            </Box>
          </Box> */}

            <Box className={formGroup}>
              <FieldLabel label={"Aadhaar Photo"} fieldValue={""} />
              <ImageUpload
                title="Add Aadhaar"
                photoChangeHandler={photoChangeHandler}
                filename="aadhaar"
              />
            </Box>

            <Box className={formGroup}>
              <FieldLabel label={"Damage Mobile Photo"} fieldValue={form.estimate} />
              <ImageUpload
                title="Add Phone"
                photoChangeHandler={photoChangeHandler}
                filename="phone"
              />
            </Box>
          </Grid>
        </Grid>
      </Box>
    )
  );
}

export default withStyles(useStyles, { withTheme: true })(VehicleDetailsForm);
