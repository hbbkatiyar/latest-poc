import { createStyles } from "@material-ui/core";

export const useStyles = (theme) =>
  createStyles({
    formGroup: {
      display: "flex",
      flexDirection: "column",
      alignItems: "start",
      width: "100%",
      [theme.breakpoints.down("sm")]: {
        padding: theme.spacing(1, 0),
      },
      [theme.breakpoints.up("sm")]: {},
      [theme.breakpoints.up("md")]: {
        padding: theme.spacing(2, 0),
      },
    },
    helperText: {
      padding: theme.spacing(0, 0, 0, 3),
    },
    text: {
      color: "#C6C6C6",
    },
    placeholder: {
      fontSize: "12px",
    },
    question: {
      margin: theme.spacing(1, 0),
      [theme.breakpoints.down("sm")]: {
        fontSize: "14px",
        // display: "none",
      },
      [theme.breakpoints.up("sm")]: {
        // display: "none",
      },
      [theme.breakpoints.up("md")]: {
        fontSize: "20px",
        display: "block",
      },
    },
    textField: {
      width: "100%",
      "&:MuiInputBase-root": {
        fontWeight: "400 !important",
      },
    },
  });
