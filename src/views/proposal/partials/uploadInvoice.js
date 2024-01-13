import React from "react";
import { Dialog, DialogContent, DialogTitle } from "@material-ui/core";
import ErrorMessage from "./error";
import ImageUpload from "../../../components/common/imageUpload";
import withStyles from "@material-ui/core/styles/withStyles";
import { Box, Button } from "@material-ui/core";
import { useStyles } from "./calculatorStyles";
import { BUTTON_SUBMIT } from "../../../constants";

function UploadPhotoDialog(props) {
  const {
    classes: { container },
    buttonText = "Close",
    disabled = true,
    errors,
    filename = "invoice",
    handleOnClose,
    modal,
    modalKey,
    photoChangeHandler,
    submitHandler = {},
    title,
  } = props;

  return (
    <Dialog
      onClose={(event, reason) => handleOnClose(event, reason, modalKey)}
      aria-labelledby="simple-dialog-title"
      open={modal[modalKey]}
      fullWidth={"true"}
      maxWidth={"sm"}
    >
      {title && <DialogTitle id="simple-dialog-title">{title}</DialogTitle>}

      <DialogContent>
        <Box
          className={container}
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="30vh"
        >
          <Box>
            <ImageUpload
              title="Add Photo"
              photoChangeHandler={photoChangeHandler}
              filename={filename}
            />
          </Box>
        </Box>
      </DialogContent>

      <ErrorMessage errors={errors} modal={modal} />

      <Box m={2} mt={0} display={"flex"} justifyContent={"center"}>
        <Box m={1}>
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

        <Box m={1}>
          <Button
            type={"button"}
            variant="contained"
            size="small"
            color="primary"
            onClick={submitHandler}
            disabled={disabled}
          >
            {BUTTON_SUBMIT}
          </Button>
        </Box>
      </Box>
    </Dialog>
  );
}

export default withStyles(useStyles, { withTheme: true })(UploadPhotoDialog);
