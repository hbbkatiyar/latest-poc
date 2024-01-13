import { createStyles } from "@material-ui/core";

export const useStyles = (theme) =>
  createStyles({
    main: {
      backgroundColor: "#142550 !important", //theme.palette.primary.main,
      padding: theme.spacing(1, 2),
      textAlign: "center",
    },
    toffeeLogo: {
      width: "100px",
    },
    toffeeLogoBox: {
      width: "100%",
    },
    logoBox: {
      width: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: theme.spacing(0, 0, 1, 0),
    },
    logo: {},
  });
