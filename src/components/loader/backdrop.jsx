import React, { useState } from "react";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));

export default function SimpleBackdrop() {
  const classes = useStyles();
  const [open, setOpen] = useState(true);

  const handleClose = () => setOpen(true); //false

  return (
    <Box>
      <Backdrop className={classes.backdrop} open={open} onClick={handleClose}>
        <CircularProgress color="primary" />
      </Backdrop>
    </Box>
  );
}
