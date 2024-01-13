import { createStyles } from "@material-ui/core";

export const useStyles = (theme) =>
  createStyles({
    root: {
      height: 180,
    },
    card: {
      backgroundColor: "#23334F",
      color: "#FFFFFF",
      display: "flex",
      justifyContent: "space-between",
      flexDirection: "column",
      [theme.breakpoints.down("sm")]: {
        minHeight: "auto",
        width: "auto",
      },
      [theme.breakpoints.up("sm")]: {
        minHeight: "auto",
        width: "auto",
      },
      [theme.breakpoints.up("md")]: {
        minHeight: "94%",
        padding: theme.spacing(2, 5, 2, 9),
        width: "auto",
        margin: theme.spacing(3, 3),
        borderRadius: "3vh",
      },
    },
    cardMobile: {
      width: "100%",
      backgroundColor: "#23334F",
      color: "#FFFFFF",
      textAlign: "center",
    },
    titleStyle: {
      fontWeight: "bold",
      [theme.breakpoints.down("sm")]: {
        fontSize: "24px",
        textAlign: "center",
      },
      [theme.breakpoints.up("sm")]: {
        fontSize: "24px",
        textAlign: "center",
      },
      [theme.breakpoints.up("md")]: {
        fontSize: "36px",
        textAlign: "justify",
      },
    },
    topContent: {
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
      [theme.breakpoints.down("sm")]: {
        width: "280px",
        padding: theme.spacing(4, 0),
      },
      [theme.breakpoints.up("sm")]: {
        width: "280px",
        padding: theme.spacing(4, 0),
      },
      [theme.breakpoints.up("md")]: {
        width: "100%",
        margin: "auto",
      },
    },
    subDescBox: {
      [theme.breakpoints.down("sm")]: {
        paddingTop: "30px",
        paddingBottom: "30px",
      },
      [theme.breakpoints.up("sm")]: {
        paddingTop: "30px",
        paddingBottom: "30px",
      },
      [theme.breakpoints.up("md")]: {
        paddingTop: "30px",
        paddingBottom: "60px",
      },
    },
    subDescStyle: {
      [theme.breakpoints.down("sm")]: {
        textAlign: "center",
      },
      [theme.breakpoints.up("sm")]: {
        textAlign: "left",
      },
      [theme.breakpoints.up("md")]: {
        textAlign: "left",
      },
    },
    subDescCenterAlign: {
      textAlign: "center",
    },
    logoBox: {
      width: "100%",
      [theme.breakpoints.down("sm")]: {
        textAlign: "center",
      },
      [theme.breakpoints.up("sm")]: {
        textAlign: "left",
      },
      [theme.breakpoints.up("md")]: {
        textAlign: "right",
        alignSelf: " flex-end",
      },
    },
    logoBoxSlide: {
      transition: "width .5s ease-out",
      width: "0",
      [theme.breakpoints.down("sm")]: {
        width: "100%",
        textAlign: "center",
      },
      [theme.breakpoints.up("sm")]: {
        textAlign: "left",
      },
      [theme.breakpoints.up("md")]: {
        textAlign: "right",
        alignSelf: " flex-start",
      },
    },
    logoStyle: {
      [theme.breakpoints.down("sm")]: {
        height: "50px",
      },
      [theme.breakpoints.up("sm")]: {
        height: "70px",
      },
      [theme.breakpoints.up("md")]: {
        height: "70px",
      },
    },
    bottomBox: {
      alignSelf: "flex-start",
    },
    contactBox: {
      display: "flex",
      justifyContent: "flex-start",
      alignItems: "center",
    },
    callIcon: {
      height: "20px",
    },
  });
