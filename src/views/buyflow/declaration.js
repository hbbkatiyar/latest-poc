import React, { useContext, useState } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import CallToAction from "./partials/cta";
import ErrorMessage from "./partials/error";
import ApplicationContext from "../../context/index";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useStyles } from "./indexFormStyles";
import { Box, Typography } from "@material-ui/core";
import { getRoute } from "../../helpers/utils";
import { useHistory } from "react-router";
import { Images } from "../../constants/images";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";

function BuyflowHealthDeclation({
  classes: { autoPay, autoPayIcon, container, main, loaderBox, question },
}) {
  const { state, dispatch } = useContext(ApplicationContext);
  const history = useHistory();
  const [errorMessage, setErrorMessage] = useState({});
  const [errors, setErrors] = useState([]);
  const [form, setForm] = useState({});
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [isLoaded, setIsLoaded] = useState(true);
  const [modal, setModal] = useState({ open: false });

  const navigateTo = (pathname) => history.push({ pathname });

  const onSubmit = (event) => {
    event.preventDefault();

    navigateTo(getRoute("submitted"));
  };

  const handleClick = (event) => {
    event.preventDefault();

    navigateTo(getRoute("submitted"));
  };

  return isLoaded ? (
    <Box className={main}>
      <Box container={"true"} justifyContent="center" className={container}>
        <Box m={3}>
          <Typography variant="h5">Health Declaration</Typography>
        </Box>

        <form noValidate autoComplete="off" onSubmit={onSubmit}>
          <Box textAlign={"left"} style={{color: "#4F6F97"}}>
            <Typography variant="body2">
              <small>"I hereby declare that:<br/> I have neversuffered from or undergoing any treatment for any cardiovascular, renal, musculoskeletal, neurological, nervous, nephrological, Skeletal, respiratory, digestive, uninary, endocrine, lymphatic disorder and my family, inlcuding me, do not have any adverse medical history. During last three monthsI have never tested COVID positive. None of my parent/s or my sibling/s having died before the age 50 due to any adverse chronic ailment. I do not have any habit of smoking or consumption of alcohol and been advised to quit or under treatment for related diagnosis, nor overweight or underweight as per WHO standards."</small>
            </Typography>
          </Box>
          <ErrorMessage errors={errors} modal={modal} />

          <CallToAction
            buttonType={"submit"}
            errorMessage={errorMessage}
            form={form}
            isDisabled={isFormSubmitted}
            isFormSubmitted={isFormSubmitted}
            text={"Accept"}
            handleClick={handleClick}
            marginTopClass={"marginTop10"}
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

export default withStyles(useStyles, { withTheme: true })(BuyflowHealthDeclation);
