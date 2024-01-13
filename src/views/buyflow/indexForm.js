import React, { useContext, useEffect } from "react";
// import SimpleBackdrop from "../../components/loader/backdrop";
import CallToAction from "./partials/cta";
import ErrorMessage from "./partials/error";
import LendingContext from "../../context/index";
// import OnRoadPriceCalculatorDialog from "./partials/calculator";
import withStyles from "@material-ui/core/styles/withStyles";
import { Box, Grid, Hidden, TextField } from "@material-ui/core";
import {
  syncProposalDetails,
  validateInputLength,
} from "../../helpers/proposal";
import { useStyles } from "./indexFormStyles";
import ProductSelection from "./product";

function BuyflowForm(props) {
  const {
    state: {
      orderDetails = null,
    },
  } = useContext(LendingContext);
  const {
    classes: { container, main, formGroup, gutterTop, textField },
    errorMessage,
    errors,
    form,
    handleChange,
    handleChangeChipSelect,
    handleOnClose,
    isFormSubmitted,
    modal,
    onSubmit,
    setForm,
    photo,
    photoChangeHandler,
  } = props;

  useEffect(() => {
    setForm({ ...form, ...syncProposalDetails(orderDetails ? orderDetails : {}) });
  }, [orderDetails]);

  return (
    <Box className={main}>
      <Box container={"true"} justifyContent="center" className={container}>
        <form noValidate autoComplete="off" onSubmit={onSubmit}>
          
          <ProductSelection
            handleChangeChipSelect={handleChangeChipSelect}
          />
          {/* <ErrorMessage errors={errors} modal={modal} />

          <CallToAction
            buttonType={"submit"}
            errorMessage={errorMessage}
            form={form}
            isDisabled={isFormSubmitted}
            isFormSubmitted={isFormSubmitted}
            text={"Buy Product"}
          /> */}
        </form>

        {/* {modal.payment && (
          <OnRoadPriceCalculatorDialog
            breakup={breakup}
            handleOnClose={handleOnClose}
            modal={modal}
            modalKey={"payment"}
            onRoadPrice={form.payment}
            title={"Make Payment"}
          />
        )} */}
      </Box>
    </Box>
  );
}

export default withStyles(useStyles, { withTheme: true })(BuyflowForm);
