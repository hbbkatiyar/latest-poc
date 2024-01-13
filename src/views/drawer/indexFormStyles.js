import { createStyles } from "@material-ui/core";
import { Color } from "../../constants/colors";

export const useStyles = (theme) =>
  createStyles({
    backStep: {
      backgroundColor: "#ffffff",
      borderRadius: "50%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer",
      "&:hover": {
        backgroundColor: "#d4d3d3",
      },
      [theme.breakpoints.down("sm")]: {
        margin: theme.spacing(0, 2, 0, 0),
      },
      [theme.breakpoints.up("sm")]: {
        margin: theme.spacing(0, 4, 0, 0),
      },
      [theme.breakpoints.up("md")]: {
        margin: theme.spacing(0, 6, 0, 0),
        padding: theme.spacing(1),
      },
    },
    badgeBox: {
      backgroundColor: Color.toffeeSkyBlue.main,
      padding: theme.spacing(0),
      borderRadius: "16px",
      minWidth: "140px",
      textAlign: "center",
    },
    bigCtaBox: {
      margin: theme.spacing(5, 0, 0),
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
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
    buttonBox: {
      display: "inline-flex",
      justifyContent: "center",
      alignItems: "center",
    },
    buttonText: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
    buyButton: {
      borderRadius: "2vh",
    },
    container: {
      width: "100%",
      margin: "0 auto",
    },
    cursorPointer: {
      cursor: "pointer",
    },
    disabled: {
      opacity: 0.6,
    },
    formBox: {
      maxWidth: "100%",
      [theme.breakpoints.down("sm")]: {
        padding: theme.spacing(5, 0),
      },
      [theme.breakpoints.up("sm")]: {
        padding: theme.spacing(5, 3),
      },
      [theme.breakpoints.up("md")]: {
        padding: theme.spacing(5, 10),
      },
    },
    formControl: {
      margin: theme.spacing(3),
    },
    formBoxInner: {
      height: "100%",
      display: "flex",
      flexDirection: "column",
      maxWidth: "600px",
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
    formGroupDate: {
      display: "flex",
      flexDirection: "column",
      alignItems: "start",
      [theme.breakpoints.down("sm")]: {
        padding: theme.spacing(2),
        width: "50%",
      },
      [theme.breakpoints.up("sm")]: {
        padding: theme.spacing(2),
        width: "50%",
      },
      [theme.breakpoints.up("md")]: {
        padding: theme.spacing(2, 0),
        width: "50%",
      },
    },
    gutterBottom: {
      width: "100%",
      padding: theme.spacing(0, 0, 5, 0),
    },
    gutterSectionTop: {
      width: "100%",
      padding: theme.spacing(5, 0, 0),
    },
    gutterTop: {
      width: "100%",
      padding: theme.spacing(1.5, 0, 0),
    },
    headerBox: {
      maxWidth: "725px",
      display: "flex",
      justifyContent: "flex-start",
      alignItems: "flex-start",
      [theme.breakpoints.down("sm")]: {
        padding: theme.spacing(3, 3, 0),
        textAlign: "left",
      },
      [theme.breakpoints.up("sm")]: {
        padding: theme.spacing(3, 3),
        textAlign: "center",
      },
      [theme.breakpoints.up("md")]: {
        padding: theme.spacing(5, 10),
        textAlign: "center",
      },
    },
    headerText: {
      display: "flex",
      justifyContent: "flex-start",
      alignItems: "center",
      maxWidth: "600px",
    },
    layoutColumn: {
      layout: "row",
    },
    loaderBox: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
    },
    main: {
      alignItems: "center",
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-start",
      padding: theme.spacing(4, 2, 0, 2),
      textAlign: "center",
    },
    mainCta: {
      width: "100%",
      whiteSpace: "nowrap",
      padding: theme.spacing(0, 3),
    },
    planBox: {
      border: "1px solid #ECF0F4",
      borderRadius: "20px",
      padding: theme.spacing(2),
      margin: theme.spacing(2, 0),
      boxShadow: "0 12px 31px 0 rgb(0 37 91 / 13%)",
    },
    policyDateBox: {
      [theme.breakpoints.down("sm")]: {
        flexDirection: "column",
        width: "100%",
      },
      [theme.breakpoints.up("md")]: {
        flexDirection: "row",
        width: "46%",
      },
      [theme.breakpoints.up("lg")]: {
        flexDirection: "row",
        width: "46%",
      },
    },
    policyDateDetailsBox: {
      display: "flex",
      alignItems: "start",
      justifyContent: "space-between",

      [theme.breakpoints.down("sm")]: {
        flexDirection: "column",
        width: "100%",
      },
      [theme.breakpoints.up("md")]: {
        flexDirection: "row",
        width: "100%",
      },
      [theme.breakpoints.up("lg")]: {
        flexDirection: "row",
        width: "100%",
      },
    },
    premiumBox: {
      display: "flex",
      alignItems: "center",
      [theme.breakpoints.down("sm")]: {
        flexDirection: "row",
        width: "100%",
        justifyContent: "flex-start",
      },
      [theme.breakpoints.up("sm")]: {
        flexDirection: "row",
        width: "100%",
        justifyContent: "flex-end",
      },
      [theme.breakpoints.up("md")]: {
        flexDirection: "row",
        width: "40%",
        justifyContent: "flex-end",
      },
    },
    question: {
      [theme.breakpoints.down("sm")]: {
        fontSize: "14px",
      },
      [theme.breakpoints.up("sm")]: {},
      [theme.breakpoints.up("md")]: {
        fontSize: "20px",
      },
    },
    smallText: {
      fontSize: "13px",
    },
    textField: {
      width: "100%",
      "&:MuiInputBase-root": {
        fontWeight: "400 !important",
      },
    },
    textFieldSmall: {
      "&:MuiInputBase-root": {
        fontWeight: "400 !important",
        borderColor: "#eb5757 !important",
      },
      [theme.breakpoints.down("sm")]: {
        width: "50vw",
      },
      [theme.breakpoints.up("md")]: {
        width: "100%",
      },
      [theme.breakpoints.up("lg")]: {
        width: "100%",
      },
    },
    width100: {
      width: "100%",
    },
    section: {
      border: "1px solid #cccccc",
      borderRadius: "5px",
      minHeight: "10vh",
      paddingTop: "6vh"
    }
  });
