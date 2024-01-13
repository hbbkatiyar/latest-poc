import { createStyles } from "@material-ui/core";

export const useStyles = (theme) =>
  createStyles({
    actionButton: {
      textAlign: "left",
      color: "#142550",
    },
    backSolid: {
      backgroundColor: "#ECF0F4",
      [theme.breakpoints.down("sm")]: {
        padding: theme.spacing(3, 2),
      },
      [theme.breakpoints.up("sm")]: {
        padding: theme.spacing(3, 2),
      },
      [theme.breakpoints.up("md")]: {
        padding: theme.spacing(3, 8),
      },
    },
    backStep: {
      backgroundColor: "#ffffff",
      width: "30px",
      height: "30px",
      borderRadius: "50%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      // padding: theme.spacing(1),
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
    blue: {
      backgroundColor: "#dfeeff",
    },
    bold: {
      fontWeight: 900,
    },
    buttonBox: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      textAlign: "left",
      backgroundColor: "#ffe3e3",
      padding: theme.spacing(0.2, 2),
      width: "100%",
      borderRadius: "18px",
      cursor: "pointer",
      transition: "padding .3s",
      "&:hover": {
        padding: theme.spacing(0.2, 1, 0.2, 2),
      },
    },
    buyButton: {
      borderRadius: "2vh",
    },
    contentBox: {
      width: "100%",
      flexGrow: 1,
      padding: theme.spacing(0, 0, 5),
    },
    dangerRed: {
      color: "#f52d56",
    },
    directionIcons: {
      height: "16px",
      width: "16px",
    },
    dueAmount: {
      display: "flex",
      margin: theme.spacing(4, "auto", 0, "auto"),
      border: "1px dashed #F8C7C7",
      borderRadius: "24px",
      color: "#22334F",
      padding: theme.spacing(1, 3),
      alignItems: "center",
      justifyContent: "space-between",
      [theme.breakpoints.down("sm")]: {
        width: "100%",
      },
      [theme.breakpoints.up("md")]: {
        width: "60%",
      },
      [theme.breakpoints.up("lg")]: {
        width: "60%",
      },
    },
    green: {
      backgroundColor: "#d6e8cc",
    },
    header: {
      backgroundColor: "#22334F",
      borderRadius: "16px",
      fontFamily: "Montserrat",
      display: "flex",
      justifyContent: "space-between",
      height: "88px",
      alignItems: "center",
      padding: theme.spacing(3),
      // margin:theme.spacing(1,8)
    },
    headerBox: {
      width: "100%",
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
      color: "white",
      fontWeight: "900",
    },
    headerTitle: {
      flexGrow: 1,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    hr: {
      width: "100%",
      opacity: 0.3,
    },
    iconName: {
      margin: theme.spacing(0, 2),
      backgroundColor: "#ccc",
      borderRadius: "50%",
      padding: theme.spacing(2),
    },
    inline: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      "& p": {
        margin: theme.spacing(0, 2),
      },
    },
    input: {
      padding: theme.spacing(0, 0, 0, 2),
      border: "0 !important",
      width: "100%",
      "&:focus": {
        outline: "none !important",
      },
      transition: "width .3s",
    },
    inputHidden: {
      padding: theme.spacing(0),
      border: "0 !important",
      width: "0%",
      "&:focus": {
        outline: "none !important",
      },
    },
    listingBox: {
      width: "100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
      margin: theme.spacing(5, 0),
    },
    listingItem: {
      width: "100%",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
    listingItemContainer: {
      minWidth: "800px",
      backgroundColor: "#ffffff",
      padding: theme.spacing(0),
      border: "2px solid #D9D7D7",
      // width:'100%',
    },
    listingItemContainerPolicies: {
      // minWidth:'900px',
      width: "100%",
      backgroundColor: "#ffffff",
      padding: theme.spacing(0),
      border: "2px solid #D9D7D7",
    },
    listingItemHeader: {
      backgroundColor: "#d7dcf6",
      width: "100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      textAlign: "center",
      margin: theme.spacing(0, 0, 2),
    },
    listingItemOuter: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
      margin: theme.spacing(0, 2, 2),
    },
    listingItemLeft: {
      textAlign: "left",
      display: "flex",
      justifyContent: "flex-start",
      alignItems: "center",
    },
    listingItemRight: {
      width: "20%",
    },
    loaderBox: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
    },
    main: {
      // backgroundColor: theme.palette.primary.light,
      width: "100%",
      padding: theme.spacing(0),
      textAlign: "center",
      height: "100vh",
    },
    mainContainer: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "flex-start",
    },
    orange: {
      backgroundColor: "#ffa928",
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
    payButton: {
      borderRadius: "12px",
      backgroundColor: "#FFF0F0",
      color: "#EB5757",
      fontWeight: 800,
      textDecoration: "none",
      padding: theme.spacing(1.5, 3),
    },
    payNow: {
      [theme.breakpoints.down("sm")]: {
        padding: theme.spacing(0, 0, 0, 1),
      },
      [theme.breakpoints.up("md")]: {
        padding: theme.spacing(0, 0),
      },
      [theme.breakpoints.up("lg")]: {
        padding: theme.spacing(0, 0),
      },
    },
    percentageBox: {
      display: "flex",
      justifyContent: "flex-start",
      alignItems: "center",
    },
    performanceCards: {
      boxShadow: "0px 1px 1px rgba(0, 0, 0, 0.15)",
      minWidth: "300px",
      backgroundColor: "rgba(255, 255, 255, 0.4)",
      textAlign: "left",
      borderRadius: "3vh",
      [theme.breakpoints.down("sm")]: {
        width: "100%",
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
    pink: {
      backgroundColor: "#e71cc5",
    },
    policyListingBox: {
      height: "500px",
      overflow: "hidden",
      overflowY: "scroll",
    },
    policiesListingItemHeader: {
      backgroundColor: "#ffe3e3",
      width: "100%",
      display: "flex",
      justifyContent: "flex-start",
      alignItems: "center",
      textAlign: "center",
      padding: theme.spacing(4),
      transition: "padding .3s",
    },
    policiesListingItemHeaderHidden: {
      backgroundColor: "#ffe3e3",
      width: "100%",
      display: "flex",
      justifyContent: "flex-start",
      alignItems: "center",
      textAlign: "center",
      padding: theme.spacing(2, 4),
      transition: "padding .3s",
    },
    searchBox: {
      width: "100%",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      backgroundColor: "#ffffff",
      transition: "width .3s",
    },
    searchBoxHidden: {
      width: "0%",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      backgroundColor: "#ffffff",
      transition: "width .3s",
    },
    searchIconBox: {
      backgroundColor: "#eb5757",
      padding: theme.spacing(1),
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      color: "#ffffff",
      cursor: "pointer",
    },
    sideDrawer: {
      width: "20%",
    },
    spacing: {
      margin: theme.spacing(0, 0, 1),
    },
    successGreen: {
      color: "#2d9d66",
    },
    tableBody: {
      height: "300px",
      // overflow: 'hidden',
      // overflowY: 'scroll'
    },
    tabsBox: {
      margin: theme.spacing(4, 0, 0),
      display: "flex",
      justifyContent: "center",
      // alignItems: 'center'
    },
    tabsPaper: {
      backgroundColor: "transparent",
      // flexGrow: 1,
      // maxWidth: 500,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      boxShadow: "none",
    },
    tabsPaperPolicies: {
      backgroundColor: "transparent",
      flexGrow: 1,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      boxShadow: "none",
    },
  });
