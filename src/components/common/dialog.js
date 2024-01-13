import React, { useState } from "react";
import {
  Button,
  CircularProgress,
  Fade,
  Modal,
  useMediaQuery,
  withStyles,
} from "@material-ui/core";
import { useHistory } from "react-router";
import theme from "../../theme/muiTheme";
import Backdrop from "@material-ui/core/Backdrop";
import Box from "@material-ui/core/Box";

const useStyles = (theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    outline: "none",

    [theme.breakpoints.down("sm")]: {
      maxWidth: "auto",
      minWidth: "auto",
      marginLeft: "0%",
    },
    [theme.breakpoints.up("md")]: {
      maxWidth: "500px",
      minWidth: "500px",
      marginLeft: "30%",
    },
    [theme.breakpoints.up("lg")]: {
      maxWidth: "500px",
      minWidth: "500px",
      marginLeft: "30%",
    },
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  btn: {
    marginRight: "15px",
  },
  actionBox: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  loader: {
    height: "20px !important",
    width: "20px !important",
    padding: theme.spacing(0.45, 2),
  },
});

function CustomDialog(props) {
  const {
    classes: { actionBox, loader },
    classes,
    buttonTitle,
    bodyTitle,
    bodyHeader,
    variant,
    buttonColor,
    onClick,
    bodyContent,
    disabled,
    cancelText,
    send,
    refresh,
    sending,
    productId,
  } = props;

  const history = useHistory();

  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
    refresh();
  };

  const handleClose = () => {
    if (productId === 36 || productId === 41) {
      return history.push({
        pathname: "/",
      });
    }
    setOpen(false);
  };

  return (
    <div>
      <Button variant={variant} color={buttonColor} onClick={handleClickOpen}>
        {buttonTitle}
      </Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <>
            <div className={classes.paper}>
              <h2 id="transition-modal-title"> {bodyTitle}</h2>
              <h4 id="transition-modal-title"> {bodyHeader}</h4>
              <p id="transition-modal-description">{bodyContent}</p>
              <Box className={actionBox}>
                <Button onClick={handleClose} color="secondary">
                  {cancelText}
                </Button>
                {!send && (
                  <Button
                    size={"small"}
                    variant={"contained"}
                    onClick={
                      onClick
                      // handleClose
                    }
                    color="secondary"
                    disabled={disabled}
                  >
                    {sending ? <CircularProgress className={loader} /> : "Send"}
                  </Button>
                )}
              </Box>
            </div>
          </>
        </Fade>
      </Modal>
    </div>
  );
}

export default withStyles(useStyles, { withTheme: true })(CustomDialog);
