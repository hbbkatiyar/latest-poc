import React, { useContext, useEffect } from "react";
import Accordion from "../../components/common/accordian";
import SimpleBackdrop from "../../components/loader/backdrop";
import CallToAction from "./partials/cta";
import CustomerDetailsForm from "./partials/customer";
import AssetDetailsForm from "./partials/asset";
import ErrorMessage from "./partials/error";
import EmploymentDetailsForm from "./partials/employment";
import FieldLabel from "../../components/common/label";
import LendingContext from "../../context/index";
import OnRoadPriceCalculatorDialog from "./partials/calculator";
import EstimationDetailsForm from "./partials/estimation";
import SearchForm from "./partials/search";
import withStyles from "@material-ui/core/styles/withStyles";
import { Box, Grid, Hidden, TextField } from "@material-ui/core";
import { BUTTON_SUBMIT, BUTTON_SUBMIT_CLAIM } from "../../constants/index";
import {
  syncProposalDetails,
  validateInputLength,
} from "../../helpers/proposal";
import { useStyles } from "./indexFormStyles";

function ProposalForm(props) {
  const {
    state: {
      productConfig: { section_label: sectionLabelUtils },
      orderDetails = null,
    },
  } = useContext(LendingContext);
  const {
    classes: { container, main, formGroup, gutterTop, textField },
    breakup,
    changeOptionBaseOnValue,
    disabledAccordion,
    errorMessage,
    errors,
    form,
    handleAutocompleteChange,
    handleChange,
    handleChangeChipSelect,
    handleIconClick,
    handleOnClose,
    searchClickHanlder,
    isFormSubmitted,
    isManufacturerChanged,
    isModelChanged,
    isManufacturerVisible,
    isModelVisible,
    isSearchCompleted = true,
    isVariantVisible,
    modal,
    onSubmit,
    noSearchResultFound,
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
        <SearchForm
          errorMessage={errorMessage}
          form={form}
          handleChange={handleChange}
          clickHandler={searchClickHanlder}
          isFormSubmitted={isFormSubmitted}
        />

        <ErrorMessage errors={noSearchResultFound} modal={modal} />

        <form noValidate autoComplete="off" onSubmit={onSubmit}>
          <Accordion title={"Customer Details"} disabled={disabledAccordion}>
            <CustomerDetailsForm
              errorMessage={errorMessage}
              form={form}
              handleChange={handleChange}
              handleChangeChipSelect={handleChangeChipSelect}
              isFormSubmitted={isFormSubmitted}
            />
          </Accordion>

          <Accordion title={"Mobile & Coverage Details"} disabled={disabledAccordion}>
            <AssetDetailsForm
              errorMessage={errorMessage}
              form={form}
              handleChange={handleChange}
              handleChangeChipSelect={handleChangeChipSelect}
              isFormSubmitted={isFormSubmitted}
            />
          </Accordion>

          <Accordion title={"Repair Estimate"} defaultExpanded={true} disabled={false}>
            <EstimationDetailsForm
              breakup={breakup}
              changeOptionBaseOnValue={changeOptionBaseOnValue}
              errorMessage={errorMessage}
              form={form}
              handleAutocompleteChange={handleAutocompleteChange}
              handleChange={handleChange}
              handleChangeChipSelect={handleChangeChipSelect}
              handleIconClick={handleIconClick}
              isManufacturerChanged={isManufacturerChanged}
              isModelChanged={isModelChanged}
              isManufacturerVisible={isManufacturerVisible}
              isModelVisible={isModelVisible}
              isVariantVisible={isVariantVisible}
              photoChangeHandler={photoChangeHandler}
              isSearchCompleted={isSearchCompleted}
            />
          </Accordion>

          <ErrorMessage errors={errors} modal={modal} />

          <CallToAction
            buttonType={"submit"}
            errorMessage={errorMessage}
            form={form}
            isDisabled={isFormSubmitted || !orderDetails || !form?.on_road_price || errorMessage?.on_road_price || !photo?.estimate || !photo?.aadhaar || !photo?.phone}
            isFormSubmitted={isFormSubmitted}
            text={BUTTON_SUBMIT_CLAIM}
          />
        </form>

        {modal.on_road_price && (
          <OnRoadPriceCalculatorDialog
            breakup={breakup}
            handleOnClose={handleOnClose}
            modal={modal}
            modalKey={"on_road_price"}
            onRoadPrice={form.on_road_price}
            title={`${form.vehicle_manufacturer}/${form.vehicle_model}`}
          />
        )}

        {(!isSearchCompleted || isFormSubmitted) && <SimpleBackdrop />}
      </Box>
    </Box>
  );
}

export default withStyles(useStyles, { withTheme: true })(ProposalForm);
