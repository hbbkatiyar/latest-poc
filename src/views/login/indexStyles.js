import { createStyles } from "@material-ui/core";

export const useStyles = (theme) =>
  createStyles({
    input: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "space-between",
      flexDirection: "column",
      width: "70%",
      [theme.breakpoints.down("sm")]: {
        height: "auto",
        padding: theme.spacing(3),
      },
      [theme.breakpoints.up("sm")]: {
        height: "auto",
        padding: theme.spacing(3),
      },
      [theme.breakpoints.up("md")]: {
        padding: theme.spacing(0),
      },
    },
    mobileInput: {
      border: 0,
      [theme.breakpoints.down("sm")]: {
        width: "100%",
      },
      [theme.breakpoints.up("sm")]: {
        width: "100%",
      },
      [theme.breakpoints.up("md")]: {
        width: "350px",
      },
    },
    mobileInputFocus: {
      width: "100%",
      border: 0,
      fontFamily: "Montserrat",
      fontSize: "15px",
      color: "#22334F",
      fontWeight: 600,
      [theme.breakpoints.down("sm")]: {
        width: "100%",
        marginTop: "0px",
      },
      [theme.breakpoints.up("sm")]: {
        width: "100%",
      },
      [theme.breakpoints.up("md")]: {
        width: "350px",
      },
    },
    
    button: {
      borderRadius: "8px",
      padding: theme.spacing(2, 3),
      [theme.breakpoints.down("sm")]: {
        position: "none",
      },
      [theme.breakpoints.up("sm")]: {
      },
      [theme.breakpoints.up("md")]: {
      },
    },
    buttonText: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
    customBtn: {
      display: "flex",
      bottom: 0,
      [theme.breakpoints.down("sm")]: {
        justifyContent: "center",
        padding: theme.spacing(1, 0, 1, 0),
      },
      [theme.breakpoints.up("sm")]: {
        justifyContent: "center",
        padding: theme.spacing(1, 0, 1, 0),
      },
      [theme.breakpoints.up("md")]: {
        height: "100%",
        justifyContent: "center",
        padding: theme.spacing(1, 0, 1, 0),
      },
      position: "relative",
      marginTop: "60%",
    },
    formInputCard: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: theme.palette.common.white,
    },
    errorMsg: {
      height: "20px",
      color: "#ff585d",
    },
    formGroup: {
      display: "flex",
      flexDirection: "column",
      alignItems: "start",
      [theme.breakpoints.down("sm")]: {
        padding: theme.spacing(1, 0, 1, 0),
        width: "auto",
      },
      [theme.breakpoints.up("sm")]: {
        padding: theme.spacing(1, 0, 1, 0),
        width: "auto",
      },
      [theme.breakpoints.up("md")]: {
        padding: theme.spacing(1, 0, 1, 0),
        width: "100%",
      },
    },
    partnerName: {
      display: "flex",
      margin: theme.spacing(1, 0, 1, 0),
      padding: theme.spacing(1, 0, 1, 0),
      backgroundColor: "#ffd900",
    },
    mainCta: {
      width: "100%",
      whiteSpace: "nowrap",
      padding: theme.spacing(0, 3),
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
