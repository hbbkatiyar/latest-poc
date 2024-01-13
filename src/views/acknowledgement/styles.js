import { createStyles } from "@material-ui/core";
export const useStyles = (theme) =>
  createStyles({
    button: {
      width: "80%",
      borderRadius: "2vh",
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
      width: "75%",
      [theme.breakpoints.down("sm")]: {
        padding: theme.spacing(4, 2),
        width: "100%",
      },
      [theme.breakpoints.up("md")]: {
        padding: theme.spacing(4, 5),
      },
      [theme.breakpoints.up("lg")]: {
        padding: theme.spacing(4),
      },
    },
    container: {
      border: "1px solid #ECF0F4",
      borderRadius: "20px",
      padding: theme.spacing(2),
      margin: theme.spacing(2, 0),
      boxShadow: "0 12px 31px 0 rgb(0 37 91 / 13%)",
      [theme.breakpoints.down("sm")]: {
        padding: theme.spacing(0),
      },
      [theme.breakpoints.up("sm")]: {
        padding: theme.spacing(0),
      },
      [theme.breakpoints.up("md")]: {
        padding: theme.spacing(5, 10, 5, 10),
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
  });
