import withStyles from "@material-ui/core/styles/withStyles";
import { createStyles } from "@material-ui/core";
import { TableCell, TableRow } from "@material-ui/core";

export const useStyles = (theme) =>
  createStyles({
    actionButton: {
      textAlign: "left",
      color: "#142550",
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
    borderRadius: {
      borderRadius: "2vh"
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
    buttonExport: {
      width: "30px",
      height: "30px",
      backgroundColor: "#ffffff",
      cursor: "pointer",
    },
    buyButton: {
      minWidth: "800px",
    },
    capitalize: {
      textTransform: "capitalize"
    },
    contentBox: {
      width: "100%",
      flexGrow: 1,
      padding: theme.spacing(0, 0, 5),
    },
    cancelledPolices: {
      backgroundColor: "transparent !important",
      opacity: 0.5,
    },
    clearIconBox: {
      padding: theme.spacing(1),
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      cursor: "pointer",
      margin: theme.spacing(2),
    },
    dangerRed: {
      color: "#f52d56",
    },
    directionIcons: {
      height: "16px",
      width: "16px",
    },
    disabled: {
      cursor: "arrow",
      opacity: 0.5,
    },
    durationFilter: {
      margin: theme.spacing(3),
      width: "25%",
    },
    export: {
      padding: theme.spacing(1, 2),
      border: "1px solid #c6c6c6",
      borderRadius: theme.spacing(1),
      cursor: "pointer",
      backgroundColor: "#ffffff",
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    green: {
      backgroundColor: "#d6e8cc",
    },
    hr: {
      width: "100%",
      opacity: 0.3,
    },
    headerTitle: {
      flexGrow: 1,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    header: {
      fontWeight: 700,
      fontFamily: "Montserrat",
      color: "#22334F",
    },
    headerBox: {
      width: "100%",
      display: "flex",
      backgroundColor: "#ECF0F4",
      justifyContent: "flex-start",
      alignItems: "flex-start",
      borderRadius: "15px",

      [theme.breakpoints.down("sm")]: {
        padding: theme.spacing(3, 3, 0),
        textAlign: "left",
      },
      [theme.breakpoints.up("sm")]: {
        padding: theme.spacing(3),
        textAlign: "center",
      },
      [theme.breakpoints.up("md")]: {
        padding: theme.spacing(3),
        textAlign: "center",
      },
    },
    iconName: {
      margin: theme.spacing(0, 2),
      backgroundColor: "#ccc",
      borderRadius: "50%",
      padding: theme.spacing(2),
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
    itemContainer: {
      backgroundColor: "#ECF0F4",
      borderRadius: "15px",
    },
    issuedDateBox: {
      margin: theme.spacing(3),
      width: "20%",
    },
    inline: {
      whiteSpace: "nowrap",
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
    },
    listingItemContainerPolicies: {
      width: "100%",
      padding: theme.spacing(0),
      border: "0px solid #D9D7D7",
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
    listingItemLeft: {
      textAlign: "left",
      display: "flex",
      justifyContent: "flex-start",
      alignItems: "center",
    },
    listingItemOuter: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
      margin: theme.spacing(0, 2, 2),
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
      width: "100%",
      padding: theme.spacing(0, 5),
      textAlign: "center",
      height: "100vh",
      "& .MuiInput-underline:after": {
        borderBottomStyle: "none",
      },
      ".MuiSelect-icon": {
        right: "10px",
      },
      "& .MuiSelect-select": {
        color: "#22334F",
        fontWeight: "bold",
        textAlign: "center",
      },
      "& .MuiSelect-select:focus": {
        color: "#22334F",
        fontWeight: "bold",
        backgroundColor: "transparent",
      },
      "& .MuiInputBase-inputMarginDense": {
        padding: "8px 0px",
      },
    },
    mainContainer: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "flex-start",
    },
    marginLeft: {
      marginLeft: '1vh'
    },
    orange: {
      backgroundColor: "#ffa928",
    },
    performanceCards: {
      boxShadow:
        "0 0 20px 0 rgba(215, 222, 227, 0.39), 0 26px 90px 0 rgba(51, 59, 69, 0.1)",
      minWidth: "300px",
      textAlign: "left",
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
    percentageBox: {
      display: "flex",
      justifyContent: "flex-start",
      alignItems: "center",
    },
    pink: {
      backgroundColor: "#e71cc5",
    },
    policiesListingItemHeader: {
      backgroundColor: "transparent",
      justifyContent: "space-between",
      alignItems: "center",
      textAlign: "center",
      transition: "padding .3s",
      display: "inline-flex",
      [theme.breakpoints.down("sm")]: {
        width: "100%",
      },
      [theme.breakpoints.up("sm")]: {
        width: "100%",
      },
      [theme.breakpoints.up("md")]: {
        width: "90%",
      },
    },
    policiesListingItemHeaderHidden: {
      backgroundColor: "#ffe3e3",
      width: "100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      textAlign: "center",
      padding: theme.spacing(2, 4),
      transition: "padding .3s",
    },
    policyListingBox: {
      overflow: "hidden",
      margin: theme.spacing(0, 5),
      borderRadius: "15px",
      backgroundColor: "#ffffff",
      [theme.breakpoints.down("sm")]: {},
      [theme.breakpoints.up("sm")]: {},
      [theme.breakpoints.up("md")]: {
        padding: theme.spacing(1),
      },
    },
    searchBox: {
      width: "75%",
      display: "flex",
      borderRadius: "12px",
      overflow: "hidden",
      padding: theme.spacing(1, 2),
      justifyContent: "space-between",
      alignItems: "center",
      backgroundColor: "#ffffff",
      transition: "width .3s",
      "& ::-webkit-input-placeholder": {
        /* Edge */ color: "#D3D6DC",
      },
      "& input": {
        height: "38px",
      },
      "& ::placeholder": {
        color: "#D3D6DC",
        fontSize: "1.15rem",
      },
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
      backgroundColor: "#22334F",
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
    select: {
      "&:before": {
        display: "none",
      },
      padding: theme.spacing(1.5, 1),
      backgroundColor: "#ffffff",
      borderRadius: "12px",
    },
    statusButton: {
      borderRadius: '2vh',
      // color: 'white',
      padding: theme.spacing(1, 0),
      // textAlign: 'center',
      textTransform: "capitalize"
    },
    statusContainer: {
      minHeight: "300px !important",
    },
    statusFilter: {
      cursor: "pointer",
    },
    statusFilterImage: {
      paddingLeft: "10px",
    },
    successGreen: {
      color: "#2d9d66",
    },
    tabsBox: {
      margin: theme.spacing(4, 0, 0),
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    tabsPaper: {
      backgroundColor: "transparent",
      flexGrow: 1,
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
    td: {
      fontSize: "14px",
      fontWeight: 550,
      color: "#23334F",
      fontFamily: "Montserrat",
    },
    tableBody: {
      // height: '300px',
      // overflow: 'hidden',
      // overflowY: 'scroll'
    },
    tableContainer: {
      maxHeight: "600px",
      borderRadius: "15px",
    },
    tableWrapper: {
      backgroundColor: "red",
    },
    width5: {},
  });

export const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: "#23334F",
    color: "#ffffff",
    borderRadius: 0,
    fontSize: "14px",
    fontWeight: 700,
    fontFamily: "Montserrat",
  },
  body: {
    fontSize: 14,
    cursor: "pointer",
  },
}))(TableCell);

export const StyledTableRow = withStyles((theme) => ({
  root: {
    borderRadius: 0,
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);
