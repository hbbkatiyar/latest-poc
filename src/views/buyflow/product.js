import React, { useContext, useEffect, useState } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import ApplicationContext from "../../context/index";
import CallToAction from "./partials/cta";
import ChipSelect from "./partials/chipSelect";
import CircularProgress from "@material-ui/core/CircularProgress";
import ErrorMessage from "./partials/error";
import useApi from "../../hooks/useApi";
import { Box, Grid, Hidden, TextField, Typography } from "@material-ui/core";
import {
  clearBuyflowStorageData,
  getRoute,
  getStorageItem,
  setStorageItem,
} from "../../helpers/utils";
import { ReducerUtils } from "../../constants/reducers";
import { useHistory } from "react-router";
import { useStyles } from "./indexFormStyles";

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
      : 300000,
    premium: getStorageItem("premium")
      ? Number(getStorageItem("premium"))
      : 599,
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
      console.log(
        "here",
        state?.productDetails?.premiumMapping[form.sumAssured]
      );
      setFormState(
        "premium",
        state?.productDetails?.premiumMapping[form.sumAssured]
          ? state?.productDetails?.premiumMapping[form.sumAssured]
          : 599
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
    console.log("onSubmit");
    console.log(form);
    event.preventDefault();

    clearBuyflowStorageData();
    setStorageItem("sumAssured", form.sumAssured);
    setStorageItem("premium", form.premium);

    navigateTo(getRoute("customer"));
  };

  const handleClick = (event) => {
    console.log("handleClick");
    console.log(form);
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
          {/* <Box m={3}>
            <Typography variant={"body2"} className={question}>
              {state?.productDetails?.name}
            </Typography>
          </Box> */}
          {/* <Box className={formGroup}>
            <Typography variant="body2" className={question}>
              Product Name
            </Typography>
            <TextField
              id="standard-basic"
              variant="outlined"
              value={state?.productDetails?.name}
              name="product_name"
              onChange={handleChange}
              disabled={true}
              fullWidth
            />
          </Box> */}
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
            <Typography variant="body2" className={question}>
              Sum Assured
            </Typography>
            <Box display="flex" justifyContent="center" textAlign="center" style={{width: '100%'}}>
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
            <Typography variant="body2" className={question}>
              Premium
            </Typography>
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
            handleClick={handleClick}
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
