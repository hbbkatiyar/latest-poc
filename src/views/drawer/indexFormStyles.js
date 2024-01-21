import { createStyles } from "@material-ui/core";
export const useStyles = (theme) =>
  createStyles({
    button: {
      width: "100%",
      [theme.breakpoints.down("sm")]: {
        padding: "14px 16px",
      },
      [theme.breakpoints.up("sm")]: {
        padding: "14px 34px",
      },
      [theme.breakpoints.up("md")]: {
        padding: "14px 34px",
      },
    },
    buyButton: {
      borderRadius: "1vh",
    },
    container: {
      width: "100%",
      margin: "0 auto",
    },
    customBtn: {
      display: "flex",
      [theme.breakpoints.down("sm")]: {
        justifyContent: "center",
        padding: theme.spacing(2, 0, 2, 0),
      },
      [theme.breakpoints.up("sm")]: {
        justifyContent: "center",
        padding: theme.spacing(2, 0, 2, 0),
      },
      [theme.breakpoints.up("md")]: {
        height: "100%",
        justifyContent: "center",
        padding: theme.spacing(2, 0, 2, 0),
      },
      position: "relative",
      marginTop: "30%",
    },
    cursorPointer: {
      cursor: "pointer",
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
    main: {
      alignItems: "center",
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-start",
      padding: theme.spacing(4, 1, 0, 1),
      textAlign: "center",
    },
    mainKnowledgeHub: {
      alignItems: "center",
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-start",
      padding: theme.spacing(4, 2, 0, 2),
      textAlign: "center",
    },
    question: {
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
