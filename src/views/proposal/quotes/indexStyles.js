import { createStyles } from "@material-ui/core";
export const useStyles = (theme) =>
  createStyles({
    button: {
      borderRadius: "2vh",
      textTransform: "capitalize",
      [theme.breakpoints.down("sm")]: {
        padding: theme.spacing(1, 2),
        width: "100%",
      },
      [theme.breakpoints.up("sm")]: {
        padding: theme.spacing(1, 2),
        width: "100%",
      },
      [theme.breakpoints.up("md")]: {
        padding: theme.spacing(1, 2),
        width: "100%",
      },
    },
    container: {
      alignItems: "center",
      display: "flex",
      // justifyContent: "center",
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
    cursorDefault: {
      cursor: "default",
    },
    cursorPointer: {
      cursor: "pointer",
    },
    downloadIcon: {
      width: "45px",
      height: "45px",
      backgroundColor: "#FFFFFF",
      borderRadius: "50px",
      display: "flex",
      alignItems: "center",
      color: "#EA5757",
      cursor: "pointer",
      justifyContent: "center",
    },
    iconContainer: {
      [theme.breakpoints.down("sm")]: {
        padding: theme.spacing(0, 0, 0, 0),
      },
      [theme.breakpoints.up("sm")]: {
        padding: theme.spacing(0, 0, 0, 0),
      },
      [theme.breakpoints.up("md")]: {
        padding: theme.spacing(2, 0, 3, 0),
      }
    },
    disabled: {
      opacity: 0
    },
    label: {
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
    loaderBox: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
    },
    nextIcon: {
      width: "45px",
      height: "45px",
      backgroundColor: "#EA5757",
      borderRadius: "50px",
      display: "flex",
      alignItems: "center",
      color: "#FFFFFF",
      cursor: "pointer",
      justifyContent: "center",
    },
    loaderContainer: {
      display: "flex",
      [theme.breakpoints.down("sm")]: {
        height: "44vh !important"
      },
      [theme.breakpoints.up("sm")]: {
        height: "44vh !important"
      },
      [theme.breakpoints.up("md")]: {
        height: "40vh !important"
      },
    },
    outerContainer: {
      [theme.breakpoints.down("sm")]: {
        padding: theme.spacing(0),
      },
      [theme.breakpoints.up("sm")]: {
        padding: theme.spacing(0),
      },
      [theme.breakpoints.up("md")]: {
        padding: theme.spacing(0, 10, 0, 10),
      },
    },
    quote: {
      borderRadius: "20px",
      backgroundColor: "#FFF0F0",
      justify: "center",
      [theme.breakpoints.down("sm")]: {
        padding: theme.spacing(2, 2, 2, 2),
      },
      [theme.breakpoints.up("sm")]: {
        padding: theme.spacing(2, 2, 2, 2),
      },
      [theme.breakpoints.up("md")]: {
        padding: theme.spacing(4, 4, 4, 4),
      },
    },
    quoteBGLight: {
      backgroundColor: "#FFF0F0",
    },
    quoteBGDark: {
      backgroundColor: "#ECF0F4",
    },
    question: {
      color: "#9099A7",
      [theme.breakpoints.down("sm")]: {
        fontSize: "12px !important",
      },
      [theme.breakpoints.up("sm")]: {
        fontSize: "12px !important",
      },
      [theme.breakpoints.up("md")]: {
        fontSize: "12px !important",
      },
    },
    selectedTenureBGColorDark: {
      backgroundColor: '#ECF0F4'
    },
    selectedTenureBGColorLight: {
      backgroundColor: '#FFF0F0' //''#F6F6F6' //'#FFF0F0'
    },
    slider: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      width: "100%",
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
      width: "100%",
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
    tenuresSection: {
      width: "100%",
      [theme.breakpoints.down("sm")]: {
        padding: theme.spacing(2, 2),
      },
      [theme.breakpoints.up("sm")]: {
        padding: theme.spacing(2, 2),
      },
      [theme.breakpoints.up("md")]: {
        padding: theme.spacing(3, 3),
      },
    },
    textField: {
      width: "60%",
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
  });
