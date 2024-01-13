import { createStyles } from "@material-ui/core";

export const useStyles = (theme) =>
  createStyles({
    content: {
      display: "flex",
    },
    main: {
      display: "flex",
      flexDirection: "column",
      margin: "auto",
      [theme.breakpoints.up("md")]: {
        width: "80%",
      },
    },
    header: {
      backgroundColor: "#ECF0F4",
      display: "flex",
      width: "100%",
      justifyContent: "center",
      fontFamily: "Montserrat",
      padding: theme.spacing(4),
      margin: theme.spacing(4, 0),
      color: "#22334F",
      borderRadius: "16px",
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
    },
    gutterSpace: {
      width: "100%",
      padding: theme.spacing(1.5, 1, 1),
    },
    submitBtn: {
      backgroundColor: "#EB5757",
      color: "#FFFFFF",
      padding: theme.spacing(2),
      borderRadius: "16px",
    },
  });
