import React, { useState } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import MenuIcon from "@material-ui/icons/Menu";
import PolicyIcon from "@material-ui/icons/Policy";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import LibraryBooksIcon from "@material-ui/icons/LibraryBooks";
import AssignmentReturnIcon from "@material-ui/icons/AssignmentReturn";
import {
  Box,
  Grid,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import { useStyles } from "./indexStyles";
import {
  getRoute,
  getStorageItem,
  removeStorageItem,
} from "../../helpers/utils";
import clsx from "clsx";
import { useHistory } from "react-router-dom";
import { Images } from "../../constants/images";

function SubHeader({
  bgColor = "dark",
  classes: {
    bgColorDark,
    bgColorLight,
    headerBox,
    headerBoxContainer,
    headerText,
    logo,
    partnerLogo
  },
  classes,
}) {
  const [state, setState] = useState({
    right: false,
  });
  const history = useHistory();

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const clickHandler = (event, item, index) => {
    console.log(`click handler, ${item.text}, ${index}`);

    if (item.slug === "logout") {
      removeStorageItem("token");
      navigateTo(getRoute("home"));
    } else {
      navigateTo(getRoute(item.slug));
    }
  };

  const logoClickHandler = () => {
    navigateTo(getRoute("dashboard"));
  };

  const navigateTo = (pathname) => history.push({ pathname });

  const renderList = (anchor = "right") => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === "top" || anchor === "bottom",
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {[
          { text: "Knowledge Hub", slug: "knowledgeHub" },
          { text: "Login Status", slug: "loginStatus" },
          { text: "Policy COI", slug: "policyCoi" },
          { text: "Logout", slug: "logout" },
        ].map((item, index) => (
          <ListItem
            button
            key={item.text}
            onClick={(event) => clickHandler(event, item, index)}
          >
            <ListItemIcon>
              {index === 0 && <LibraryBooksIcon />}
              {index === 1 && <AssignmentReturnIcon />}
              {index === 2 && <PolicyIcon />}
              {index === 3 && <ExitToAppIcon />}
            </ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <Box className={headerBoxContainer}>
      <Box
        className={`${headerBox} ${bgColorDark}`}
      >
        <Box className={headerText}>
          <Grid container spacing={3}>
            <Grid item xs="4">
              <Box
                className={partnerLogo}
              >
                Partner <br /> Logo
              </Box>
            </Grid>
            {getStorageItem("token") ? (
              <Grid item xs="6">
                <Box onClick={logoClickHandler}>
                  <img src={Images.AvivaLogo} className={logo} />
                </Box>
              </Grid>
            ) : (
              <Grid item xs="4"></Grid>
            )}
            {getStorageItem("token") ? (
              <Grid item xs="2">
                <Box onClick={toggleDrawer("right", true)}>
                  <MenuIcon />
                </Box>
                <Drawer
                  anchor={"right"}
                  open={state["right"]}
                  onClose={toggleDrawer("right", false)}
                >
                  {renderList("right")}
                </Drawer>
              </Grid>
            ) : (
              <Grid item xs="4">
                <Box>
                  <img src={Images.AvivaLogo} className={logo} />
                </Box>
              </Grid>
            )}
          </Grid>
        </Box>
      </Box>
    </Box>
  );
}

export default withStyles(useStyles, { withTheme: true })(SubHeader);
