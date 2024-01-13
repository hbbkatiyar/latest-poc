import { createStyles } from "@material-ui/core";

export const useStyles = (theme) =>
  createStyles({
    main: {
      display: "flex",
    },
    leftPanel: {
      flexGrow: 1,
      width: "35%",
      backgroundColor: "#22334F",
      color: "#FFFFFF",
      borderRadius: "24px",
      mixBlendMode: "normal",
      padding: theme.spacing(4),
    },
    detailPane: {
      margin: theme.spacing(5, 2),
    },
    heading: {
      fontFamily: "Montserrat",
      fontWeight: 900,
      margin: theme.spacing(1, 0),
    },
    rightPanel: {
      flexGrow: 8,
      width: "70%",
      padding: theme.spacing(0.2, 4),
    },
    col12: {
      display: "flex",
      [theme.breakpoints.down("sm")]: {
        display: "flex",
        flexDirection: "column",
      },
    },
    gutterSpace: {
      width: "100%",
      padding: theme.spacing(1.5, 3, 1),
    },
    submitBtn: {
      backgroundColor: "#EB5757",
      color: "#FFFFFF",
      padding: theme.spacing(2),
      borderRadius: "16px",
      margin: theme.spacing(0, 2),
      "&:hover": {
        background: "#EB5757",
        opacity: 0.5,
      },
    },
  });
