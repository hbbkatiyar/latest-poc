import React from "react";
import { Dialog, DialogContent, DialogTitle } from "@material-ui/core";
import withStyles from "@material-ui/core/styles/withStyles";
import { Box, Button, Typography } from "@material-ui/core";
import { useStyles } from "./errorDialogStyles";

function ErrorDialog(props) {
  const {
    classes,
    buttonText = "Close",
    errors,
    handleOnClose,
    modal,
    modalKey,
  } = props;

  return (
    <Dialog
      // onClose={() => handleClose(false)}
      onClose={(event, reason) => handleOnClose(event, reason, modalKey)}
      aria-labelledby="simple-dialog-title"
      open={modal[modalKey]}
    >
      <DialogTitle id="simple-dialog-title">Premium Error</DialogTitle>

      <DialogContent>
        {errors.length > 0 && (
          <Box m={5} className={classes.formGroup}>
            {errors.map((error, key) => {
              return (
                <Typography
                  key={key}
                  component={"p"}
                  variant={"string"}
                  paragraph={true}
                  className="error-message"
                >
                  {error}
                </Typography>
              );
            })}
          </Box>
        )}
      </DialogContent>

      <Box m={2} mt={0} display={"flex"} justifyContent={"center"}>
        <Button
          type={"button"}
          variant="outlined"
          size="small"
          color="secondary"
          onClick={(event, reason) => handleOnClose(event, reason, modalKey)}
        >
          {buttonText}
        </Button>
      </Box>
    </Dialog>
  );
}

export default withStyles(useStyles, { withTheme: true })(ErrorDialog);
