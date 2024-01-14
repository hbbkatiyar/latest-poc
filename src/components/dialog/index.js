import React from "react";
import { Dialog, DialogContent, DialogTitle } from "@material-ui/core";
import withStyles from "@material-ui/core/styles/withStyles";
import { Box, Button, Typography } from "@material-ui/core";
import { useStyles } from "./customDialogStyles";

function CustomDialog(props) {
  const {
    classes: { container },
    buttonText = "Close",
    handleOnClose,
    modal,
    modalKey,
    title = null,
  } = props;

  return (
    <Dialog
      // onClose={() => handleClose(false)}
      onClose={(event, reason) => handleOnClose(event, reason, modalKey)}
      aria-labelledby="simple-dialog-title"
      open={modal[modalKey]}
      fullWidth={"true"}
      maxWidth={"sm"}
    >
      {title && <DialogTitle id="simple-dialog-title">{title}</DialogTitle>}

      <DialogContent>
        <Box className={container}>
          <Box>Scanner Placeholder</Box>
          <Box>Note Placeholder</Box>
        </Box>
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

export default withStyles(useStyles, { withTheme: true })(CustomDialog);
