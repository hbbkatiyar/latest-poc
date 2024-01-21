import { createStyles } from "@material-ui/core";

export const useStyles = (theme) =>
  createStyles({
    label: {
      margin: theme.spacing(1, 0, 1, 0),
      [theme.breakpoints.down("sm")]: {
        fontSize: "18px",
      },
      [theme.breakpoints.up("sm")]: {
        fontSize: "18px",
      },
      [theme.breakpoints.up("md")]: {
        fontSize: "18px",
      },
    },
  });
