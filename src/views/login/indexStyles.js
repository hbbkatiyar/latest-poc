import { createStyles } from "@material-ui/core";

export const useStyles = (theme) =>
  createStyles({
    main: {
      display: "flex",
      justifyContent: "space-between",
      [theme.breakpoints.down("sm")]: {
        flexDirection: "column",
      },
      [theme.breakpoints.up("sm")]: {
        flexDirection: "column",
      },
      [theme.breakpoints.up("md")]: {
        flexDirection: "row",
        padding: theme.spacing(0, 5, 0, 0),
      },
    },

    sideContent: {
      width: "100%",
    },
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
        // height: '88vh',
        padding: theme.spacing(0),
      },
    },
    imgLg: {
      [theme.breakpoints.down("sm")]: {
        height: "auto",
        width: "100%",
      },
      [theme.breakpoints.up("sm")]: {
        height: "auto",
        width: "350px",
      },
      [theme.breakpoints.up("md")]: {
        height: "auto",
        width: "350px",
      },
    },
    mobileInput: {
      // padding: theme.spacing(2, 0),
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
      // padding: theme.spacing(2, 0),
      width: "100%",
      border: 0,
      fontFamily: "Montserrat",
      // borderLeft: '1px solid #142550',
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
    customBtn: {
      display: "flex",
      bottom: 0,
      // flexDirection: "reverse-row",
      [theme.breakpoints.down("sm")]: {
        justifyContent: "center",
        padding: theme.spacing(1, 0, 1, 0),
      },
      [theme.breakpoints.up("sm")]: {
        justifyContent: "center",
        padding: theme.spacing(1, 0, 1, 0),
      },
      [theme.breakpoints.up("md")]: {
        // position: 'relative',
        height: "100%",
        justifyContent: "center",
        padding: theme.spacing(1, 0, 1, 0),
      },
      position: "relative",
      marginTop: "60%",
    },
    button: {
      borderRadius: "8px",
      padding: theme.spacing(2, 3),
      // textTransform: "capitalize",
      [theme.breakpoints.down("sm")]: {
        position: "none",
      },
      [theme.breakpoints.up("sm")]: {
        // justifyContent: "justify",
      },
      [theme.breakpoints.up("md")]: {
        // position: "absolute",
        // bottom: 100,
        // right: 10
      },
    },
    buttonText: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
    subTitle: {
      [theme.breakpoints.down("sm")]: {
        textAlign: "center",
      },
      [theme.breakpoints.up("sm")]: {
        textAlign: "center",
      },
      [theme.breakpoints.up("md")]: {
        textAlign: "left",
        maxWidth: "380px",
      },
    },
    tinyLogo: {
      height: "4rem",
    },
    logoHeader: {
      color: "#22334F",
    },
    otpHeader: {
      margin: theme.spacing(3, 0),
    },
    bold: {
      fontFamily: "Montserrat",
      color: "#22334F",
      fontWeight: 700,
    },
    btnChange: {
      backgroundColor: "#FFF0F0",
      borderRadius: "8px",
      color: "#EB5757",
      fontSize: "10px",
      fontWeight: 800,
      margin: theme.spacing(0, 2),
      cursor: "pointer",
      boxSizing: "border-box",
      fontFamily: "Montserrat",
      padding: theme.spacing(1),
    },
    textHeader: {
      fontFamily: "Montserrat",
      fontWeight: 900,
      lineHeight: "50px",
    },
    formInput: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      alignItems: "flex-start",
      padding: theme.spacing(8, 0),
      [theme.breakpoints.down("sm")]: {
        width: "100%",
        alignItems: "center",
      },
      [theme.breakpoints.up("md")]: {
        paddingLeft: "100px",
        width: "100%",
      },
      [theme.breakpoints.up("lg")]: {
        // padding: theme.spacing(10, 0, 0),
        width: "100%",
      },
      "& .MuiInputBase-input": {
        fontSize: "20px",
        fontWeight: 600,
        color: "#22334F",
      },
      "& .MuiInputLabel-root": {
        fontSize: "1.3rem",
      },
    },
    btnLoader: {
      color: "#ffffff",
      height: "26px",
      width: "26px",
      marginLeft: "26px",
      marginRight: "26px",
    },
    formInputCard: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: theme.palette.common.white,
      // minHeight: "300px",
    },
    numberInputBox: {
      display: "flex",
      justifyContent: "flex-end",
      flexDirection: "column",
      // flexDirection: "column"
      [theme.breakpoints.down("sm")]: {
        marginTop: "80px",
        alignItems: "center",
        height: "auto",
      },
      [theme.breakpoints.up("sm")]: {
        alignItems: "center",
        height: "auto",
      },
      [theme.breakpoints.up("md")]: {
        alignItems: "flex-start",
        width: "100%",
        // height: '100%',
      },
    },
    numberInput: {
      borderBottom: "1px solid #142550",
      display: "flex",
      justifyContent: "center",
      borderStyle: "none",
      alignItems: "center",
    },
    countryCode: {
      padding: theme.spacing(0, 1.5),
      color: "#22334f",
      opacity: "0.5",
    },
    errorMsg: {
      height: "20px",
    },
    label: {
      color: "#9099A7",
      fontFamily: "Montserrat",
      margin: theme.spacing(1, 0),
    },
    mobileLabel: {
      margin: theme.spacing(0, 0, 5),
      fontFamily: "Montserrat",
      fontWeight: 700,
      color: "#22334F",
    },
    mobileLabelOtp: {
      width: "100%",
      margin: theme.spacing(0, 0, 1),
      textAlign: "left",
    },
    formContent: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
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
    errorMsg: {
      color: "#ff585d",
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
    passwordIcon: {
      textAlign: "right",
      width: "100%",
      margin: theme.spacing(1, 0, 0, 0)
    },
    mainCta: {
      width: "100%",
      whiteSpace: "nowrap",
      padding: theme.spacing(0, 3),
    },
  });
