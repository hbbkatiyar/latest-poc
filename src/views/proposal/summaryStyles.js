import { createStyles } from "@material-ui/core";
export const useStyles = (theme) =>
  createStyles({
    button: {
      width: "100%",
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
    buttonBox: {
      alignItems: "center",
      display: "flex",
      justifyContent: "center",
    },
    buttonText: {
      alignItems: "center",
      display: "flex",
      justifyContent: "space-between",
    },
    buyButton: {
      borderRadius: "2vh",
    },
    container: {
      alignItems: "center",
      display: "flex",
      margin: "0 auto",
      [theme.breakpoints.down("sm")]: {
        padding: theme.spacing(0),
        width: "100%",
      },
      [theme.breakpoints.up("sm")]: {
        padding: theme.spacing(0),
        width: "100%",
      },
      [theme.breakpoints.up("md")]: {
        padding: theme.spacing(0),
        width: "100%",
      },
    },
    cursorPointer: {
      cursor: "pointer",
    },
    errorMsg: {
      color: "#ff585d",
      fontFamily: '"Montserrat", sans-serif',
      fontSize: "0.875rem",
      fontWeight: 400,
      lineHeight: 1.66,
      letterSpacing: "0.03333em",
      margin: 0,
      marginTop: "3px",
      textAlign: "left",
    },
    gutterTop: {
      // width: '100%',
      padding: theme.spacing(2, 0, 2, 0),
    },
    headerBox: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "flex-start",
      [theme.breakpoints.down("sm")]: {
        padding: theme.spacing(1, 3, 0),
        textAlign: "left",
        flexDirection: "column",
      },
      [theme.breakpoints.up("sm")]: {
        padding: theme.spacing(1, 3),
        textAlign: "center",
        flexDirection: "row",
      },
      [theme.breakpoints.up("md")]: {
        padding: theme.spacing(1, 10),
        textAlign: "center",
        flexDirection: "row",
      },
    },
    headerTitle: {
      flexGrow: 1,
      display: "flex",
      justifyContent: "center",
      [theme.breakpoints.down("sm")]: {
        flexDirection: "column",
        alignItems: "flex-start",
        textAlign: "left",
      },
      [theme.breakpoints.up("sm")]: {
        flexDirection: "row",
        alignItems: "center",
        textAlign: "center",
      },
      [theme.breakpoints.up("md")]: {
        flexDirection: "row",
        alignItems: "center",
        textAlign: "center",
      },
    },
    headerBoxOuter: {
      backgroundColor: "#ffffff",
      border: "1px solid #e9e9e9",
      boxShadow: "0 12px 15px 12px rgba(78, 78, 78, 0.13)",
      marginBottom: "40px",
      padding: theme.spacing(3, 0),
      width: "100%",
    },
    headerDetailsBox: {
      display: "flex",
      justifyContent: "space-between",
      textAlign: "center",
      [theme.breakpoints.down("sm")]: {
        alignItems: "flex-start",
        flexDirection: "column",
        padding: theme.spacing(1, 3),
        textAlign: "left",
      },
      [theme.breakpoints.up("sm")]: {
        alignItems: "flex-start",
        flexDirection: "row",
        padding: theme.spacing(2, 3),
        textAlign: "left",
      },
      [theme.breakpoints.up("md")]: {
        alignItems: "flex-start",
        flexDirection: "row",
        padding: theme.spacing(3, 4),
        textAlign: "center",
      },
    },
    hr: {
      width: "84%",
      backgroundColor: "#ccc",
      opacity: 0.6,
    },
    hr100: {
      backgroundColor: "#ccc",
      opacity: 0.6,
      width: "100%",
    },
    loaderBox: {
      alignItems: "center",
      display: "flex",
      height: "100vh",
      justifyContent: "center",
    },
    main: {
      alignItems: "center",
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-start",
      padding: theme.spacing(4, 2, 0, 2),
      // textAlign: "center",
    },
    mainCta: {
      padding: theme.spacing(0, 3),
      whiteSpace: "nowrap",
      width: "100%",
    },
    outerContainer: {
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
    premiumBreakDownBox: {
      backgroundColor: "#ECF0F4",
      [theme.breakpoints.down("sm")]: {
        width: "100%",
        padding: theme.spacing(2),
      },
      [theme.breakpoints.up("sm")]: {
        width: "100%",
        padding: theme.spacing(2),
      },
      [theme.breakpoints.up("md")]: {
        width: "auto",
        padding: theme.spacing(2),
        margin: theme.spacing(2, 2),
      },
    },
    premiumBreakDownHeader: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: theme.spacing(1, 0),
    },
    question: {
      // color: '#B5BBC4',
      color: "#9099A7",
      // fontWeight: 'bold',
      [theme.breakpoints.down("sm")]: {
        fontSize: "14px",
      },
      [theme.breakpoints.up("sm")]: {
        fontSize: "14px",
      },
      [theme.breakpoints.up("md")]: {
        fontSize: "16px",
      },
    },
    link: {
      color: theme.palette.primary.main,
    },
    textField: {
      width: "100%",
      "&:MuiInputBase-root": {
        fontWeight: "400 !important",
      },
    },
    textLeft: {
      textAlign: "left",
    },
    vehicleIcon: {
      [theme.breakpoints.down("sm")]: {
        margin: theme.spacing(2, 0),
      },
      [theme.breakpoints.up("sm")]: {
        margin: theme.spacing(0, 3, 0, 0),
      },
      [theme.breakpoints.up("md")]: {
        margin: theme.spacing(0, 3, 0, 0),
      },
    },
    vehicleDetailsText: {
      width: "100%",
      [theme.breakpoints.down("sm")]: {
        padding: theme.spacing(2, 0),
      },
      [theme.breakpoints.up("sm")]: {
        padding: theme.spacing(2, 0),
      },
      [theme.breakpoints.up("md")]: {
        padding: theme.spacing(0),
      },
    },
    wordBreak: {
      wordBreak: "break-all",
    },
    slider: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      [theme.breakpoints.down("sm")]: {
        margin: theme.spacing(0, 0, 0, 0),
      },
      [theme.breakpoints.up("sm")]: {
        margin: theme.spacing(1, 10, 0, 0),
      },
      [theme.breakpoints.up("md")]: {
        margin: theme.spacing(2, 20, 0, 0),
      },
    },
    sliderText: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      [theme.breakpoints.down("sm")]: {
        margin: theme.spacing(0, 0, 0, 0),
      },
      [theme.breakpoints.up("sm")]: {
        margin: theme.spacing(0, 10, 0, 0),
      },
      [theme.breakpoints.up("md")]: {
        margin: theme.spacing(0, 20, 0, 0),
      },
    },
    uploadSection: {
      border: "1px solid rgba(224, 224, 224, 1)",
      [theme.breakpoints.down("sm")]: {
        margin: theme.spacing(2),
      },
      [theme.breakpoints.up("sm")]: {
        margin: theme.spacing(2),
      },
      [theme.breakpoints.up("md")]: {
        margin: theme.spacing(1, 5, 1, 5),
      },
    },
    document: {
      [theme.breakpoints.down("sm")]: {
        padding: theme.spacing(0),
      },
      [theme.breakpoints.up("sm")]: {
        padding: theme.spacing(0),
      },
      [theme.breakpoints.up("md")]: {
        padding: theme.spacing(1, 1, 1),
      },
    },
  });
