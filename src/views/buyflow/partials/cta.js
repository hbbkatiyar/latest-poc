import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import withStyles from "@material-ui/core/styles/withStyles";
import { Box, Button, Typography } from "@material-ui/core";
import { useStyles } from "../indexFormStyles";

function CallToAction(props) {
  const {
    classes: { button, buttonBox, buttonText, buyButton, mainCta },
    classes,
    color = "primary",
    buttonType = "click",
    handleClick = () => {},
    isDisabled = false,
    isFormSubmitted = false,
    text = "Submit",
    variant = "contained",
    marginTopClass=""
  } = props;

  return (
    <Box className={`${buttonBox} ${marginTopClass}`}>
      <Button
        type={buttonType}
        variant={variant}
        className={`${buyButton} ${button}`}
        color={color}
        onClick={handleClick}
        fullWidth
        {...(isDisabled && { disabled: true })}
      >
        <Box className={buttonText}>
          <Typography variant={"body1"} className={mainCta}>
            {isFormSubmitted ? (
              <CircularProgress
                color={"inherit"}
                className={classes.loaderStyle}
                size={20}
              />
            ) : (
              text
            )}
          </Typography>
        </Box>
      </Button>
    </Box>
  );
}

export default withStyles(useStyles, { withTheme: true })(CallToAction);
