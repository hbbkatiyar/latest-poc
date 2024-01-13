import React, { Component } from "react";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";
import Box from "@material-ui/core/Box";
import { Images } from "../../constants/images";
import { Hidden } from "@material-ui/core";
import { Call } from "@material-ui/icons";
import { useStyles } from "./sideContentBoxStyles";
import Logo from "../common/logo";
import { Utils } from "../../constants/utils";

class SideContentBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDesktop: window.innerWidth > 600,
      timeOut: false,
    };
  }

  logoSlide = () => {
    this.setState({
      timeOut: true,
    });
  };

  componentDidMount() {
    setTimeout(this.logoSlide, 1);
  }

  render() {
    const { classes, logo, checked, title, desc, subDesc, centerAlign } =
      this.props;
    const {
      card,
      cardMobile,
      logoBox,
      logoBoxSlide,
      logoStyle,
      topContent,
      titleStyle,
      subDescBox,
      subDescCenterAlign,
      subDescStyle,
      bottomBox,
      contactBox,
      callIcon,
    } = classes;
    const { timeOut } = this.state;
    const isDesktop = this.state.isDesktop;
    return (
      <Box className={isDesktop ? card : checked ? cardMobile : card} p={5}>
        {/* {logo && (
          <Box className={!timeOut ? logoBox : logoBoxSlide}>
            <Logo src={Images.toffeeLogoRed} logoStyle={logoStyle} />
          </Box>
        )} */}
        <Box display={"flex"} justifyContent={"center"} flexWrap="wrap">
          <Box className={topContent}>
            <Typography className={titleStyle} gutterBottom>
              {title}
            </Typography>
            {desc}
            {subDesc && (
              <Box className={subDescBox}>
                <Typography
                  variant={"h5"}
                  className={centerAlign ? subDescCenterAlign : subDescStyle}
                >
                  {subDesc}
                </Typography>
              </Box>
            )}
          </Box>
        </Box>
        <Hidden smDown>
          <Box className={bottomBox}>
            <Typography variant={"body1"}>Support</Typography>
            <Box className={contactBox}>
              <Call className={callIcon} />
              <Typography variant={"body2"}>{Utils.support.mobile}</Typography>
            </Box>
          </Box>
        </Hidden>
      </Box>
    );
  }
}

export default withStyles(useStyles, { withTheme: true })(SideContentBox);
