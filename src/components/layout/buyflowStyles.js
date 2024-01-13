import { createStyles } from "@material-ui/core";

export const useStyles = (theme) =>
  createStyles({
    buyflowContainer: {
      [theme.breakpoints.down("sm")]: {
        padding: theme.spacing(0),
      },
      [theme.breakpoints.up("sm")]: {
        padding: theme.spacing(0),
      },
      [theme.breakpoints.up("md")]: {
        padding: theme.spacing(0, 20, 0, 20),
      },
    },
  });
