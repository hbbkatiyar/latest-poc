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
    center: {
      backgroundColor: "#ffffff",
      textAlign: "center",
      [theme.breakpoints.down("sm")]: {
        padding: theme.spacing(4, 2),
      },
      [theme.breakpoints.up("md")]: {
        padding: theme.spacing(4, 5),
      },
      [theme.breakpoints.up("lg")]: {
        padding: theme.spacing(4),
      },
    },
    buttonDone: {
      margin: theme.spacing(2, 0),
      width: "80%",
      height: "43px",
      borderRadius: "2vh",
    },
    downloadBox: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      cursor: "pointer",
      width: "100%",
      "& h5": {
        fontSize: "18px",
      },
      [theme.breakpoints.down("sm")]: {
        width: "auto",
      },
      [theme.breakpoints.up("sm")]: {
        width: "100%",
      },
      [theme.breakpoints.up("md")]: {
        width: "100%",
      },
    },
    downloadIcon: {
      margin: theme.spacing(0, 2, 0, 0),
      cursor: "pointer",
    },
    errorMsg: {
      color: "#ff585d",
      margin: 0,
      fontSize: "0.875rem",
      marginTop: "3px",
      textAlign: "left",
      fontFamily: '"Montserrat", sans-serif',
      fontWeight: 400,
      lineHeight: 1.66,
      letterSpacing: "0.03333em",
    },
    loaderBox: {
      alignItems: "center",
      display: "flex",
      height: "100vh",
      justifyContent: "center",
    },
    main: {
      // backgroundColor: theme.palette.primary.main,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      // height: '100vh',
      [theme.breakpoints.down("sm")]: {
        padding: theme.spacing(0, 2),
      },
      [theme.breakpoints.up("md")]: {
        padding: theme.spacing(0, 10),
      },
      [theme.breakpoints.up("lg")]: {
        padding: theme.spacing(0, 20),
      },
    },
    container: {
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
    buttonYesNo: {
      margin: theme.spacing(2, 1),
      width: "40%",
      height: "43px",
      borderRadius: "2vh",
    },
  });
