import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import SummaryField from "../partials/summaryField";
import theme from "../../../theme/muiTheme";
import { Box, Slider, Typography } from "@material-ui/core";
import { useStyles } from "./indexStyles";
import { DASH_SYMBOL } from "../../../constants";

const PrettoSlider = withStyles({
  root: {
    backgroundImage: "linear-gradient(to right,#ffb300, #b8d611, #2cca56) ",
    height: "1px",
    color: "transparent",
    backgroundSize: "100% 14px",
    backgroundRepeat: "no-repeat",
    borderRadius: "4px 4px 20px 20px",
  },
  thumb: {
    height: 33,
    width: 20,
    borderRadius: "100px",
    backgroundColor: "#fff",
    border: "2px solid #E3E3E3",
    marginLeft: -12,
    boxShadow:
      "4px 4px 24px 0 rgba(198, 198, 198, 0.5), inset 0 0 3px rgba(198, 198, 198, 0.5)",
    "&:focus, &:hover, &$active": {
      // boxShadow: 'inherit',
      boxShadow:
        "4px 4px 24px 0 rgba(198, 198, 198, 0.5), inset 0 0 3px rgba(198, 198, 198, 0.5)",
    },
    [theme.breakpoints.down("sm")]: {
      marginTop: -28,
    },
    [theme.breakpoints.up("sm")]: {
      marginTop: -28,
    },
    [theme.breakpoints.up("md")]: {
      marginTop: -22,
    },
  },
  active: {},
  valueLabel: {
    left: "calc(-50% + 4px)",
  },
  track: {
    height: 8,
    borderRadius: 4,
  },
  rail: {
    height: 8,
    borderRadius: 4,
  },
})(Slider);

function TenureSection(props) {
  const {
    classes: {
      question,
      slider,
      sliderText,
      vehicleDetailsText,
    },
    index,
    item: {
      max_tenure = null,
      min_tenure = null,
      step_tenure = null,
      tenure = null,
      tenure_unit = "months"
    },
    onChangeHandler,
  } = props;

  return (
    <Box className={vehicleDetailsText}>
      <SummaryField label={`Loan Tenure`} value={""} />

      {tenure ? (
        <>
          <Box className={slider}>
            <PrettoSlider
              valueLabelDisplay="auto"
              aria-label="pretto slider"
              id={`tenure-${index}`}
              value={tenure}
              track={false}
              min={min_tenure}
              max={max_tenure}
              onChange={onChangeHandler}
              step={step_tenure}
            />
          </Box>

          <Box className={sliderText}>
            <Box className={question}>
              <Typography variant={"body2"}>{`${min_tenure}`}</Typography>
            </Box>
            <Box>
              <Typography variant={"body2"}>
                {`${tenure} ${tenure_unit}`}
              </Typography>
            </Box>
            <Box className={question}>
              <Typography variant={"body2"}>{`${max_tenure}`}</Typography>
            </Box>
          </Box>
        </>
      ) : (
        <Box style={{ minHeight: "6vh" }}>{DASH_SYMBOL}</Box>
      )}
    </Box>
  );
}

export default withStyles(useStyles, { withTheme: true })(TenureSection);
