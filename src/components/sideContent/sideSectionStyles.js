import { createStyles } from "@material-ui/core";

export const useStyles = (theme) =>
  createStyles({
    main: {
      display: "flex",
      justifyContent: "space-between",
      [theme.breakpoints.down("sm")]: {
        flexDirection: "column-reverse",
      },
      [theme.breakpoints.up("sm")]: {
        flexDirection: "column-reverse",
      },
      [theme.breakpoints.up("md")]: {
        flexDirection: "row",
        padding: theme.spacing(0, 5, 0, 0),
      },
    },
    sideContent: {
      width: "100%",
      [theme.breakpoints.down("sm")]: {
        width: "auto",
        height: "auto",
        alignItems: "center",
      },
      [theme.breakpoints.up("sm")]: {
        height: "auto",
        width: "auto",
        //  alignItems: "center"
      },
      [theme.breakpoints.up("md")]: {
        height: "97vh",
        width: "90%",
      },
    },
  });
