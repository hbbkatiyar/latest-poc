import React, { useContext } from "react";
import LendingContext from "../../../context/index";
import ChipSelect from "../../../components/common/chipSelectHook";
import FieldLabel from "../../../components/common/label";
import withStyles from "@material-ui/core/styles/withStyles";
import {
  Box,
  FormControl,
  Grid,
  Hidden,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@material-ui/core";
import { useStyles } from "../indexFormStyles";
import { Utils } from "../../../constants/utils";
import { validations } from "../../../messages/validation";
import { validateInputLength } from "../../../helpers/proposal";

function EmploymentDetailsForm(props) {
  const {
    state: {
      productConfig: {
        field_label: fieldLabelUtils,
        options: { applicant_type, employment_type },
      },
      productConfig = null,
    },
  } = useContext(LendingContext);
  const {
    classes: { formGroup, gutterTop, textField },
    errorMessage,
    form,
    handleChange,
    handleChangeChipSelect,
  } = props;

  return (
    <Box direction="column" style={{ width: "100%" }}>
      <Grid container spacing={2}>
        <Grid container item md={5} direction="column">
          <Box className={formGroup}>
            <FormControl
              variant="standard"
              style={{ width: "100%", textAlign: "left" }}
            >
              <FieldLabel label={fieldLabelUtils.employment_type} />
              {productConfig && (
                <Select
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  name="employment_type"
                  value={form.employment_type}
                  onChange={handleChange}
                >
                  <MenuItem value="">
                    <em>Select</em>
                  </MenuItem>
                  {employment_type.map((item, index) => {
                    return (
                      <MenuItem value={item.value} key={index}>
                        {item.title}
                      </MenuItem>
                    );
                  })}
                </Select>
              )}
              {errorMessage.employment_type && (
                <Typography
                  component={"p"}
                  variant={"string"}
                  paragraph={true}
                  className="error-message"
                >
                  {validations.employment_type.required}
                </Typography>
              )}
            </FormControl>
          </Box>

          {(form.employment_type === "SALARIED" ||
            form.employment_type === "SALARIED_DOCTOR") && (
            <>
              <Box className={formGroup}>
                <FieldLabel label={fieldLabelUtils.employer_name} />
                <TextField
                  type={"text"}
                  id="outlined-margin-none"
                  name="employer_name"
                  className={textField}
                  helperText={errorMessage.employer_name}
                  value={form.employer_name}
                  onInput={validateInputLength}
                  onChange={handleChange}
                />
              </Box>

              <Box className={formGroup}>
                <FieldLabel label={fieldLabelUtils.work_email} />
                <TextField
                  type={"text"}
                  id="outlined-margin-none"
                  name="work_email"
                  className={textField}
                  helperText={errorMessage.work_email}
                  value={form.work_email}
                  onInput={validateInputLength}
                  onChange={handleChange}
                  inputProps={{ maxLength: Utils.limit.digits.open_text_field }}
                />
              </Box>
            </>
          )}

          {(form.employment_type === "SELF_EMPLOYED_BUSINESS" ||
            form.employment_type === "SELF_EMPLOYED_PROFESSIONAL") && (
            <Box className={formGroup}>
              <FieldLabel label={fieldLabelUtils.business_name} />
              <TextField
                type={"text"}
                id="outlined-margin-none"
                name="business_name"
                className={textField}
                helperText={errorMessage.business_name}
                value={form.business_name}
                onInput={validateInputLength}
                onChange={handleChange}
              />
            </Box>
          )}
        </Grid>

        <Hidden smDown>
          <Grid container item md={2} direction="column"></Grid>
        </Hidden>

        <Grid container item md={5} direction="column">
          {(form.employment_type === "SALARIED" ||
            form.employment_type === "SALARIED_DOCTOR") && (
            <>
              <Box className={formGroup}>
                <FieldLabel label={fieldLabelUtils.monthly_salary} />
                <TextField
                  type={"text"}
                  id="outlined-margin-none"
                  name="monthly_salary"
                  className={textField}
                  helperText={errorMessage.monthly_salary}
                  value={form.monthly_salary}
                  onInput={validateInputLength}
                  onChange={handleChange}
                />
              </Box>

              <Box className={formGroup}>
                <FieldLabel
                  label={fieldLabelUtils.salary_deposit_tenure}
                  labelKey={"salary_deposit_tenure"}
                />
                {productConfig && (
                  <ChipSelect
                    compact={false}
                    fontWeight={"regular"}
                    fieldname={"salary_deposit_tenure"}
                    handleChangeChipSelect={handleChangeChipSelect}
                    options={productConfig.options.salary_deposit_tenure}
                    selectedItem={form.salary_deposit_tenure}
                  />
                )}
                {!form.salary_deposit_tenure && (
                  <Typography
                    component={"p"}
                    variant={"string"}
                    paragraph={true}
                    className="error-message"
                  >
                    {validations.salary_deposit_tenure.required}
                  </Typography>
                )}
              </Box>
            </>
          )}

          {(form.employment_type === "SELF_EMPLOYED_BUSINESS" ||
            form.employment_type === "SELF_EMPLOYED_PROFESSIONAL") && (
            <>
              <Box className={formGroup}>
                <FieldLabel label={fieldLabelUtils.annual_income} />
                <TextField
                  type={"text"}
                  id="outlined-margin-none"
                  name="annual_income"
                  className={textField}
                  helperText={errorMessage.annual_income}
                  value={form.annual_income}
                  onInput={validateInputLength}
                  onChange={handleChange}
                />
              </Box>

              <Box className={formGroup}>
                <FormControl
                  variant="standard"
                  style={{ width: "100%", textAlign: "left" }}
                >
                  <FieldLabel label={fieldLabelUtils.applicant_type} />
                  {productConfig && (
                    <Select
                      labelId="demo-simple-select-standard-label"
                      id="demo-simple-select-standard"
                      name="applicant_type"
                      value={form.applicant_type}
                      onChange={handleChange}
                    >
                      <MenuItem value="">
                        <em>Select</em>
                      </MenuItem>
                      {applicant_type.map((item, index) => {
                        return (
                          <MenuItem value={item.value} key={index}>
                            {item.title}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  )}
                  {errorMessage.applicant_type && (
                    <Typography
                      component={"p"}
                      variant={"string"}
                      paragraph={true}
                      className="error-message"
                    >
                      {validations.applicant_type.required}
                    </Typography>
                  )}
                </FormControl>
              </Box>
            </>
          )}
        </Grid>
      </Grid>
    </Box>
  );
}

export default withStyles(useStyles, { withTheme: true })(
  EmploymentDetailsForm
);
