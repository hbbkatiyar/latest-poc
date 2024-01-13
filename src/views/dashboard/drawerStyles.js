import { createStyles } from "@material-ui/core";

const drawerWidth = 240;

export const useStyles = (theme) =>
  createStyles({
    active: {
      color: "#eb5757",
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(0, 0),
    },
    disabled: {
      cursor: "arrow",
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
      whiteSpace: "nowrap",
    },
    drawerClose: {
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      overflowX: "hidden",
      width: theme.spacing(7) + 1,
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9) + 1,
      },
      [theme.breakpoints.down("sm")]: {
        position: "absolute"
      },
    },
    drawerOpen: {
      width: drawerWidth,
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    hide: {
      display: "none",
    },
    logo: {
      // width: '80px'
    },
    logoBox: {
      width: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: theme.spacing(0, 0, 1, 0),
    },
    menuButton: {
      marginRight: 36,
    },
    root: {
      display: "flex",
    },
    toolbar: {
      display: "flex",
      alignItems: "center",
      // justifyContent: 'flex-end',
      padding: theme.spacing(1.1, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
    },
  });
