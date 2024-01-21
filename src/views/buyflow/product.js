import React, { useContext, useEffect, useState } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import ApplicationContext from "../../context/index";
import CallToAction from "./partials/cta";
import ChipSelect from "./partials/chipSelect";
import CircularProgress from "@material-ui/core/CircularProgress";
import ErrorMessage from "./partials/error";
import FieldLabel from "../../components/label";
import useApi from "../../hooks/useApi";
import { Box, TextField, Typography } from "@material-ui/core";
import { ReducerUtils } from "../../constants/reducers";
import { useHistory } from "react-router";
import { useStyles } from "./indexFormStyles";
import {
  clearBuyflowStorageData,
  getRoute,
  getStorageItem,
  setStorageItem,
} from "../../helpers/utils";
import { DEFAULT_PRODUCT_SUM_ASSURED, DEFAULT_PRODUCT_PREMIUM } from "../../constants";

function ProductSelection({
  classes: { container, main, formGroup, loaderBox, question, productName },
}) {
  const productDetails = useApi(
    `/data/product.json?partnerId=${getStorageItem("partnerId")}`
  );
  const { state, dispatch } = useContext(ApplicationContext);
  const history = useHistory();
  const [errorMessage, setErrorMessage] = useState({
    sumAssured: false,
    premium: false,
  });
  const [errors, setErrors] = useState([]);
  const [form, setForm] = useState({
    sumAssured: getStorageItem("sumAssured")
      ? Number(getStorageItem("sumAssured"))
      : DEFAULT_PRODUCT_SUM_ASSURED,
    premium: getStorageItem("premium")
      ? Number(getStorageItem("premium"))
      : DEFAULT_PRODUCT_PREMIUM,
    partnerId: getStorageItem("partnerId"),
  });
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [modal, setModal] = useState({ open: false });

  useEffect(() => {
    dispatchEvent(ReducerUtils.product.details, productDetails);
    setTimeout(() => {
      setIsLoaded(true);
    }, 100);
  }, [productDetails]);

  useEffect(() => {
    if (
      form.sumAssured &&
      state?.productDetails?.premiumMapping[form.sumAssured]
    ) {
      setFormState(
        "premium",
        state?.productDetails?.premiumMapping[form.sumAssured]
          ? state?.productDetails?.premiumMapping[form.sumAssured]
          : DEFAULT_PRODUCT_PREMIUM
      );
    }
  }, [form.sumAssured]);

  const dispatchEvent = (type, payload) => dispatch({ type, payload });

  const setFormState = (name, value) => setForm({ ...form, [name]: value });

  const handleChange = (event) =>
    setFormState(event.target.name, event.target.value);

  const handleChangeChipSelect = (name, value) => setFormState(name, value);

  const navigateTo = (pathname) => history.push({ pathname });

  const onSubmit = (event) => {
    event.preventDefault();

    clearBuyflowStorageData();
    setStorageItem("sumAssured", form.sumAssured);
    setStorageItem("premium", form.premium);

    navigateTo(getRoute("customer"));
  };

  return isLoaded && state.productDetails ? (
    <Box className={main}>
      <Box container={"true"} justifyContent="center" className={container}>
        <form noValidate autoComplete="off" onSubmit={onSubmit}>
          <Box
            className={productName}
            justifyContent={"center"}
            alignItems="center"
          >
            <Typography variant="body2">
              {state?.productDetails?.name}
            </Typography>
          </Box>

          <Box className={formGroup}>
            <FieldLabel label={"Sum Assured"} />
            <Box
              display="flex"
              justifyContent="center"
              textAlign="center"
              style={{ width: "100%" }}
            >
              <ChipSelect
                compact={false}
                fontWeight={"regular"}
                fieldname={"sumAssured"}
                handleChangeChipSelect={handleChangeChipSelect}
                options={[
                  { title: "3 Lacs", value: 300000 },
                  { title: "5 Lacs", value: 500000 },
                ]}
                selectedItem={form?.sumAssured}
              />
            </Box>
          </Box>

          <Box className={formGroup}>
            <FieldLabel label={"Premium"} />
            {form?.premium ? (
              <TextField
                id="standard-basic"
                variant="outlined"
                value={form?.premium}
                name="premium"
                onChange={handleChange}
                disabled={true}
                fullWidth
              />
            ) : (
              "Please select sum assured"
            )}
          </Box>

          <ErrorMessage errors={errors} modal={modal} />

          <CallToAction
            buttonType={"submit"}
            errorMessage={errorMessage}
            form={form}
            isDisabled={isFormSubmitted || !form.sumAssured || !form.premium}
            isFormSubmitted={isFormSubmitted}
            text={"Buy Product"}
            handleClick={{}}
          />
        </form>
      </Box>
    </Box>
  ) : (
    <Box className={loaderBox}>
      <CircularProgress color={"secondary"} />
    </Box>
  );
}

export default withStyles(useStyles, { withTheme: true })(ProductSelection);
