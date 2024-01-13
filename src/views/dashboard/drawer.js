import React, { useEffect } from "react";
import clsx from "clsx";
import ReactTooltip from "react-tooltip";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import DashboardIcon from "@material-ui/icons/Dashboard";
import PolicyIcon from "@material-ui/icons/Policy";
// import ContactsIcon from "@material-ui/icons/Contacts";
import Policies from "../policies/index";
import DashboardComponent from "./dashboard";
import withStyles from "@material-ui/core/styles/withStyles";
import {
  AppBar,
  Box,
  CssBaseline,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  Toolbar,
} from "@material-ui/core";
import { getRoute, logout } from "../../helpers/utils";
import { Images } from "../../constants/images";
import { useStyles } from "./drawerStyles";
import { useHistory, useLocation } from "react-router";
import { useTheme } from "@material-ui/core/styles";

function HomeDrawer(props) {
  const { classes } = props;
  const history = useHistory();
  const location = useLocation();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [token, setToken] = React.useState(localStorage.getItem("token"));

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      setTimeout(() => {
        // onClickHandler(getRoute("home"));
      }, 1000);
    }
  }, [token]);

  const onClickHandler = (pathname) => history.push({ pathname });

  const handleDrawerOpen = () => setOpen(true);

  const handleDrawerClose = () => setOpen(false);

  const handleLogout = () => {
    logout();
    setToken("");
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <MenuIcon />
          </IconButton>
          <Box className={classes.logoBox}>
            {/* <img src={Images.toffeeLogoRed} className={classes.logo} /> */}
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <MenuIcon />
          </IconButton>
          <Box className={classes.title1}>
            {token ? (
              <IconButton onClick={handleLogout}>
                <Box display="flex" justifyContent="start" data-tip="Logout">
                  <ExitToAppIcon
                    fontSize={"default"}
                    color={"primary"}
                    style={{ marginTop: "1px" }}
                  />
                  &nbsp;&nbsp;
                  <Typography
                    variant={"body2"}
                    color={"primary"}
                    style={{ marginTop: "3px" }}
                  >
                    Log Out
                  </Typography>
                </Box>
              </IconButton>
            ) : (
              <div>
                <span
                  className="spinner-border spinner-border-sm"
                  role="status"
                  aria-hidden="true"
                ></span>{" "}
                Please wait ...
              </div>
            )}
          </Box>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <Typography data-tip="Show Drawer">
                <ChevronRightIcon />
              </Typography>
            ) : (
              <Typography data-tip="Hide Drawer">
                <ChevronLeftIcon />
              </Typography>
            )}
          </IconButton>
        </div>

        <List>
          {["Dashboard", "Claims"].map((text, index) => {
            let routeName = getRoute("home");
            switch (index) {
              case 1:
                routeName = getRoute("policies");
                break;
              default:
                routeName = getRoute("dashboard");
                break;
            }
            return (
              <Typography data-tip={text} key={text}>
                <ListItem button key={text}>
                  <ListItemIcon
                    onClick={(e) => onClickHandler(`${routeName}`)}
                    className={
                      location.pathname === routeName
                        ? classes.active
                        : classes.disabled
                    }
                  >
                    {index === 0 && <DashboardIcon />}
                    {index === 1 && <PolicyIcon />}
                    {/* {index === 2 && <ContactsIcon />} */}
                  </ListItemIcon>
                  <ListItemText
                    onClick={(e) => onClickHandler(`${routeName}`)}
                    primary={text}
                  />
                </ListItem>
                <ReactTooltip />
              </Typography>
            );
          })}
        </List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {location.pathname === getRoute("dashboard") && (
          <DashboardComponent />
        )}
        {location.pathname === getRoute("policies") && <Policies />}
      </main>
    </div>
  );
}

export default withStyles(useStyles, { withTheme: true })(HomeDrawer);
