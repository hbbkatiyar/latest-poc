import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import Logo from "../common/logo";
import { Box } from "@material-ui/core";
import { useStyles } from "./indexStyles";
import { Images } from "../../constants/images";

function Header(props) {
  const { classes, backgroundColor } = props;
  const { main, logo } = classes;

  return (
    <>
      <Box className={main} style={{ backgroundColor: backgroundColor ?? "" }}>
        {/* <Logo src={Images.toffeeLogoRed} classes={logo} boxClass={logo} /> */}
      </Box>
    </>
  );
}

export default withStyles(useStyles, { withTheme: true })(Header);
