import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  shadows: ["none"],
  palette: {
    type: "light",
    primary: {
      light: "#ffd900",
      main: "#ffd900",
      dark: "#ffd900",
      grey: "#f7f7f7",
      contrastText: "#000000",
    },
    secondary: {
      lightest: "#edf2fa",
      lighter: "#d5e5fe",
      light: "#424d7d",
      main: "#142550",
      dark: "#000028",
      darkest: "#22334f",
    },
  },
  typography: {
    htmlFontSize: 16,
    // pxToRem: ()=>{},
    // round: ()=>{},
    fontFamily: `"Montserrat", sans-serif`,
    fontSize: 16,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 700,
    h1: {
      fontFamily: "PlayfairDisplay",
      fontWeight: "bold",
      fontSize: "3.875rem",
      lineHeight: 1.167,
      letterSpacing: "-0.01562em",
    },
    h2: {
      fontFamily: "PlayfairDisplay",
      fontWeight: "bold",
      fontSize: "3rem",
      lineHeight: 1.2,
      letterSpacing: "-0.00833em",
    },
    h3: {
      fontFamily: "PlayfairDisplay",
      fontWeight: "bold",
      fontSize: "2.375rem",
      lineHeight: 1.167,
      letterSpacing: "0em",
      color: "#22334f",
    },
    h4: {
      fontFamily: `"Montserrat", sans-serif`,
      fontWeight: 400,
      fontSize: "2.25rem",
      lineHeight: 1.235,
      letterSpacing: "0.00735em",
    },
    h5: {
      fontFamily: `"Montserrat", sans-serif`,
      fontWeight: 600,
      fontSize: "1.5rem",
      lineHeight: 1.334,
      letterSpacing: "0em",
    },
    h6: {
      fontFamily: `"Montserrat", sans-serif`,
      fontWeight: 300,
      fontSize: "1.5rem",
      lineHeight: 1.6,
      letterSpacing: "0.0075em",
    },
    subtitle1: {
      fontFamily: `"Montserrat", sans-serif`,
      fontWeight: 400,
      fontSize: "1.375rem",
      lineHeight: 1.75,
      letterSpacing: "0.00938em",
    },
    subtitle2: {
      fontFamily: `"Montserrat", sans-serif`,
      fontWeight: 500,
      fontSize: "1.25rem",
      lineHeight: 1.8,
      letterSpacing: "0.00714em",
      color: "#22334f",
    },
    body1: {
      fontFamily: `"Montserrat", sans-serif`,
      fontWeight: 600,
      fontSize: "1rem",
      lineHeight: 1.5,
      letterSpacing: "0.00938em",
    },
    body2: {
      fontFamily: `"Montserrat", sans-serif`,
      fontWeight: 400,
      fontSize: "1rem",
      lineHeight: 1.43,
      letterSpacing: "0.01071em",
    },
    caption: {
      fontFamily: `"Montserrat", sans-serif`,
      fontWeight: 400,
      fontSize: "0.875rem",
      lineHeight: 1.66,
      letterSpacing: "0.03333em",
    },
    overline: {
      fontFamily: `"Montserrat", sans-serif`,
      fontWeight: 600,
      fontSize: "0.75rem",
      lineHeight: 2.66,
      letterSpacing: "0.09375em",
      textTransform: "uppercase",
    },
    button: {
      fontFamily: `"Montserrat", sans-serif`,
      fontWeight: 500,
      fontSize: "1rem",
      lineHeight: 1.75,
      letterSpacing: "0.125em",
      textTransform: "uppercase",
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1430,
      xl: 1600,
    },
  },
  overrides: {
    MuiButton: {
      root: {
        borderRadius: "0px",
        padding: "14px 80px",
        "&disabled": {
          backgroundColor: "#ffd900",
        },
      },
    },
    MuiInput: {
      formControl: {
        fontSize: "16px",
        fontWeight: "300",
      },
    },
    MuiChip: {
      root: {
        backgroundColor: "#ffffff",
        fontSize: "16px",
        fontWeight: 500,
        "&:hover:not($disabled):not($focused):not($error)": {
          backgroundColor: "rgba(255, 88, 93, .2)",
          "@media (hover: none)": {
            backgroundColor: "rgba(255, 88, 93, .2)",
          },
        },
        "&$focused": {
          backgroundColor: "rgba(255, 88, 93, .2)",
        },
      },
    },
    MuiFormLabel: {
      root: {
        fontSize: "18px",
        fontWeight: 300,
        "&$focused": {
          color: "#ffd900",
          backgroundColor: "#ffffff",
          fontSize: "18px",
          fontWeight: 500,
        },
      },
    },
    MuiInputBase: {
      root: {
        fontWeight: 300,
      },
    },

    MuiSelect: {
      select: {
        fontSize: "18px",
        fontWeight: 300,
      },
    },
    MuiFormHelperText: {
      root: {
        color: "#ffd900",
      },
    },
    MuiTimelineItem: {
      missingOppositeContent: {
        "&:MuiTimelineConnector": {
          display: "none !important",
        },
      },
    },
  },
  MuiDialogContent: {
    root: {
      firstChild: {
        padding: "0px",
      },
    },
  },
});

export default theme;
