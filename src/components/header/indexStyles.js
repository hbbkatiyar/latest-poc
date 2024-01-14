import { createStyles } from "@material-ui/core";
export const useStyles = (theme) =>
  createStyles({
    colorDark: {
      color: "#ffd900",
    },
    colorLight: {
      color: "#ffffff",
    },
    headerText: {
      flexGrow: 1,
      fontWeight: "bold",
      textAlign: "center",
    },
    headerBox: {
      display: "flex",
      justifyContent: "flex-start",
      alignItems: "flex-start",
      backgroundColor: "#FFF0F0",
      [theme.breakpoints.down("sm")]: {
        padding: theme.spacing(2, 3, 0),
        textAlign: "left",
        width: "100%",
        height: "40px"
      },
      [theme.breakpoints.up("sm")]: {
        padding: theme.spacing(2, 3, 1),
        textAlign: "left",
        width: "100%",

        height: "40px"
      },
      [theme.breakpoints.up("md")]: {
        padding: theme.spacing(2, 10, 1),
        textAlign: "left",
        width: "100%",
        height: "40px"
      },
    },
    headerBoxContainer: {
      display: "flex",
      width: "100%",
      justifyContent: "center",
      height: "6vh",
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
    bgColorDark: {
      backgroundColor: "#ffd900",
    },
    bgColorLight: {
      backgroundColor: "#FFF0F0",
    },
    list: {
      width: 250,
    },
    fullList: {
      width: "auto",
    },
    partnerLogo: {
      backgroundColor: "#C90100 ",
      borderRadius: "5px",
      width: "56px",
      height: "32px",
      fontSize: "12px",
      color: "#FFF",
      padding: "4px",
      marginTop: "-8px",
    },
    logo: {
      width: "108px",
      height: "25px",
    },
    bomLogo: {
      height: "25px"
    }
  });
