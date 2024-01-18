import { createStyles } from "@material-ui/core";

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
      backgroundColor: "#d4d3d3",
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
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      position: "relative",
      marginTop: "60%",
    },
    buttonText: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
    buyButton: {
      borderRadius: "1vh",
      // textTransform: "capitalize",
    },
    container: {
      margin: theme.spacing(1, 2, 1, 2),
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
        // padding: theme.spacing(1),
        width: "auto",
      },
      [theme.breakpoints.up("sm")]: {
        // padding: theme.spacing(1),
        width: "auto",
      },
      [theme.breakpoints.up("md")]: {
        // padding: theme.spacing(1, 0),
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
      // alignItems: "center",
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-start",
      padding: theme.spacing(3, 1, 0, 1),
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
    customBtn: {
      display: "flex",
      // flexDirection: "reverse-row",
      [theme.breakpoints.down("sm")]: {
        justifyContent: "center",
        padding: theme.spacing(2, 0, 2, 0),
      },
      [theme.breakpoints.up("sm")]: {
        justifyContent: "center",
        padding: theme.spacing(2, 0, 2, 0),
      },
      [theme.breakpoints.up("md")]: {
        // position: 'relative',
        height: "100%",
        justifyContent: "center",
        padding: theme.spacing(2, 0, 2, 0),
      },
      position: "relative",
      marginTop: "60%",
    },
    autoPay: {
      backgroundColor: "#05B050",
      color: "#FFFFFF",
      padding: theme.spacing(1, 1, 1, 1),
    },
    autoPayIcon: {
      color: "#05B050",
      fontSize: "40px",
    },
    policyIssuance: {
      backgroundColor: "#0071C0",
      color: "#FFFFFF",
      padding: theme.spacing(1, 1, 1, 1),
      width: "50%",
    },
    capturePhoto: {
      width: "50px",
      height: "50px",
      backgroundColor: "#C00001",
      borderRadius: "50px",
      border: "5px solid #000000",
    },
    webcamContainer: {
      backgroundColor: "#FFFFFF",
      width: "220px",
      padding: "15px 5px 10px 5px",
      border: "1px solid #FFFFFF",
      borderTop: "0px",
      backgroundColor: "#F3F3F3",
      boxShadow: "10px 10px 5px #aaaaaa",
    },
    screenshotIcon: {
      color: "#05B050",
      fontSize: "20px",
    },
    productName: {
      display: "flex",
      fontSize: "18px",
      margin: theme.spacing(3, 0, 3, 0),
      padding: theme.spacing(1, 0, 1, 0),
      backgroundColor: "#ffd900",
    },
    marginTop60: {
      marginTop: "60%",
    },
    marginTop20: {
      marginTop: "20%",
    },
    performanceCardsBox: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      margin: theme.spacing(5, 0),
      [theme.breakpoints.down("sm")]: {
        flexDirection: "column",
        width: "100%",
      },
      [theme.breakpoints.up("md")]: {
        flexDirection: "row",
        width: "auto",
      },
      [theme.breakpoints.up("lg")]: {
        flexDirection: "row",
        width: "auto",
      },
    },
    performanceCards: {
      boxShadow: "8px 8px 5px #ECF0F4",
      minWidth: "200px",
      backgroundColor: "#f4f5f5",
      // textAlign: "left",
      borderRadius: "3vh",
      [theme.breakpoints.down("sm")]: {
        width: "80%",
        margin: theme.spacing(2),
        padding: theme.spacing(3, 4),
      },
      [theme.breakpoints.up("md")]: {
        width: "auto",
        margin: theme.spacing(0, 2),
        padding: theme.spacing(3),
      },
      [theme.breakpoints.up("lg")]: {
        width: "auto",
        margin: theme.spacing(0, 2),
        padding: theme.spacing(3),
      },
    },
    spacing: {
      margin: theme.spacing(0, 0, 1),
    },
  });
