import React, { useState } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import MenuIcon from "@material-ui/icons/Menu";
import PolicyIcon from "@material-ui/icons/Policy";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import LibraryBooksIcon from "@material-ui/icons/LibraryBooks";
import AssignmentReturnIcon from "@material-ui/icons/AssignmentReturn";
import AutorenewIcon from '@material-ui/icons/Autorenew';
import HomeIcon from '@material-ui/icons/Home';
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
  clearBuyflowStorageData,
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
    partnerLogo,
    bomLogo
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
      clearBuyflowStorageData();

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
          { text: "Product", slug: "dashboard" },
          { text: "Knowledge Hub", slug: "knowledgeHub" },
          { text: "Proposal Status", slug: "proposals" },
          { text: "Policy COI", slug: "policies" },
          { text: "Logout", slug: "logout" },
        ].map((item, index) => (
          <ListItem
            button
            key={item.text}
            onClick={(event) => clickHandler(event, item, index)}
          >
            <ListItemIcon>
              {index === 0 && <HomeIcon style={{ color: '#ffd900' }} />}
              {index === 1 && <LibraryBooksIcon style={{ color: '#014FB6' }} />}
              {index === 2 && <AutorenewIcon style={{ color: 'orange' }} />}
              {index === 3 && <PolicyIcon style={{ color: '#05B050' }} />}
              {index === 4 && <ExitToAppIcon style={{ color: '#C00001' }} />}
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
          <Grid container>
            <Grid item xs="3" style={{ textAlign: "left" }}>
              <Box>
                <img src={Images.BOMLogo} className={bomLogo} />
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
              <Grid item xs="3">
                <Box onClick={toggleDrawer("right", true)} style={{marginLeft: "35px"}}>
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
                <Box style={{ marginLeft: "25px"}}>
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
