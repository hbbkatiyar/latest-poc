import { createStyles } from "@material-ui/core";
export const useStyles = (theme) =>
  createStyles({
    container: {
      width: "100%",
      [theme.breakpoints.down("sm")]: {
        padding: theme.spacing(0),
      },
      [theme.breakpoints.up("sm")]: {
        padding: theme.spacing(0),
      },
      [theme.breakpoints.up("md")]: {
        padding: theme.spacing(0),
      },
    },
    formGroup: {
      display: "flex",
      flexDirection: "column",
      alignItems: "start",
      [theme.breakpoints.down("sm")]: {
        padding: theme.spacing(1),
        width: "auto",
      },
      [theme.breakpoints.up("sm")]: {
        padding: theme.spacing(1),
        width: "auto",
      },
      [theme.breakpoints.up("md")]: {
        padding: theme.spacing(1, 0),
        width: "100%",
      },
    },
  });
