import React, { useEffect, useState } from "react";
import SubHeader from "../subHeader";
import withStyles from "@material-ui/core/styles/withStyles";
import { Box } from "@material-ui/core";
import { getSectionTitle } from "../../helpers/proposal";
import { useHistory, useLocation } from "react-router-dom";
import { useStyles } from "./buyflowStyles";

function BuyflowLayout({ children, ...rest }) {
  const {
    classes: { buyflowContainer },
  } = rest;
  const history = useHistory();
  const location = useLocation();
  const { pathname } = location;
  const [title, setTitle] = useState(null);

  useEffect(() => setTitle(getSectionTitle(pathname)), [pathname]);

  const handleClick = () => history.goBack();

  return (
    <Box className={buyflowContainer}>
      {children}
    </Box>
  );
}

export default withStyles(useStyles, { withTheme: true })(BuyflowLayout);
