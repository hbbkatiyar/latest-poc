import React, { useContext, useEffect, useState } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import useApi from "../../hooks/useApi";
import CallToAction from "./partials/cta";
import ErrorMessage from "./partials/error";
import ChipSelect from "../../components/common/chipSelectHook";
import ApplicationContext from "../../context/index";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useStyles } from "./indexFormStyles";
import { Box, Grid, Hidden, TextField, Typography } from "@material-ui/core";
import { getRoute, getStorageItem } from "../../helpers/utils";
import { ReducerUtils } from "../../constants/reducers";
import { useHistory } from "react-router";

function ProductSelection({
  classes: { container, main, formGroup, gutterTop, textField, loaderBox },
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
    sumAssured: 300000,
    premium: 600,
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
    if (form.sumAssured) {
      setFormState(
        "premium",
        state?.productDetails?.premiumMapping[form.sumAssured] ?? 600
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

    navigateTo(getRoute("customer"));
  };

  const handleClick = (event) => {
    console.log("handleClick");
    console.log(form);
    event.preventDefault();

    navigateTo(getRoute("customer"));
  };

  return isLoaded && state.productDetails ? (
    <Box className={main}>
      <Box container={"true"} justifyContent="center" className={container}>
        <form noValidate autoComplete="off" onSubmit={onSubmit}>
          <Box m={3}>
            <Typography variant="subtitle2">Product Selection</Typography>
          </Box>
          <Box m={3}>
            <Typography variant="body2">Product Name</Typography>
          </Box>
          <Box direction="column" style={{ width: "100%" }}>
            <Grid container spacing={2}>
              <Grid container item xs={4}>
                <Box className={formGroup}>
                  <Typography variant="body2">Sum Assured</Typography>
                </Box>
              </Grid>
              <Grid container item xs={8}>
                <Box className={formGroup}>
                  <ChipSelect
                    compact={false}
                    fontWeight={"regular"}
                    fieldname={"sumAssured"}
                    handleChangeChipSelect={handleChangeChipSelect}
                    options={[
                      { title: "5 Lacs", value: 500000 },
                      { title: "3 Lacs", value: 300000 },
                    ]}
                    selectedItem={form?.sumAssured}
                  />
                </Box>
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid container item xs={4}>
                <Typography variant="body2">Premium</Typography>
              </Grid>
              <Grid container item xs={8}>
                <Box className={formGroup}>
                  <TextField
                    id="standard-basic"
                    variant="outlined"
                    value={form?.premium}
                    name="premium"
                    onChange={handleChange}
                    disabled={true}
                  />
                </Box>
              </Grid>
            </Grid>
          </Box>

          <ErrorMessage errors={errors} modal={modal} />

          <CallToAction
            buttonType={"submit"}
            errorMessage={errorMessage}
            form={form}
            isDisabled={isFormSubmitted}
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
