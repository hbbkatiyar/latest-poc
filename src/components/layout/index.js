import React, { useEffect } from "react";
import Header from "../header";
import withStyles from "@material-ui/core/styles/withStyles";
import { Box } from "@material-ui/core";
import { useHistory, useLocation } from "react-router-dom";
import { useStyles } from "./indexStyles";
import { getRoute, navigateToUrl } from "../../helpers/utils";

function MainLayout({ children, ...rest }) {
  const {
    classes: { buyflowContainer },
  } = rest;
  const history = useHistory();
  const location = useLocation();
  const { pathname } = location;

  useEffect(() => {
    if (pathname === "/") {
      navigateToUrl(getRoute("home"), history);
    }
  }, [pathname, history]);

  return (
    <Box className={buyflowContainer}>
      <Header onClick={() => {}} title={""} isBackButtonVisible={false} />
      {children}
    </Box>
  );
}

export default withStyles(useStyles, { withTheme: true })(MainLayout);
