import React, { useContext } from "react";
import CallToAction from "./cta";
import FieldLabel from "../../../components/common/label";
import LendingContext from "../../../context/index";
import withStyles from "@material-ui/core/styles/withStyles";
import { Box, Grid, Hidden, TextField } from "@material-ui/core";
import { BUTTON_SUBMIT } from "../../../constants/index";
import { validateInputLength } from "../../../helpers/proposal";
import { useStyles } from "../indexFormStyles";

function SearchForm(props) {
  const {
    state: { orderDetails = null },
  } = useContext(LendingContext);
  const {
    classes: { formGroup, gutterTop, textField },
    errorMessage,
    form,
    handleChange,
    clickHandler,
    isFormSubmitted,
  } = props;

  return (
    <Box direction="column" m={2} p={2}>
      <Grid container spacing={2}>
        <Grid container item md={5} direction="column">
          <Box className={formGroup}>
            <FieldLabel label={"Customer Mobile Number"} />
            <Box className={gutterTop}>
              <TextField
                type={"text"}
                id="outlined-margin-none"
                name="mobile"
                className={textField}
                helperText={errorMessage.mobile}
                value={form.mobile}
                onInput={validateInputLength}
                onChange={handleChange}
              />
            </Box>
          </Box>
        </Grid>

        <Hidden smDown>
          <Grid container item md={2} direction="column"></Grid>
        </Hidden>

        <Grid container item md={5} direction="column">
          <Box className={formGroup}>
            <CallToAction
              buttonType={"click"}
              errorMessage={errorMessage}
              form={form}
              isDisabled={isFormSubmitted || !form.mobile || errorMessage.mobile}
              isFormSubmitted={isFormSubmitted}
              text={BUTTON_SUBMIT}
              handleClick={clickHandler}
            />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default withStyles(useStyles, { withTheme: true })(SearchForm);
