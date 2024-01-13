import { createStyles } from "@material-ui/core";

export const useStyles = (theme) =>
  createStyles({
    main: {
      backgroundColor: theme.palette.primary.main,
      height: "100vh",
    },
  });
