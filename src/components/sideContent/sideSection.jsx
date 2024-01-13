import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import SideContentBox from "./sideContentBox";
import Box from "@material-ui/core/Box";
import { useStyles } from "./sideSectionStyles";

class SideSection extends Component {
  render() {
    const { classes, title, description, image, data, onFocus } = this.props;
    const { main, sideContent } = classes;

    return (
      <>
        <Box id="mainBlock" className={main}>
          <Box className={sideContent}>
            <SideContentBox
              logo={true}
              checked={onFocus}
              title={title}
              desc={description}
              img={image}
            />
          </Box>
          {data}
        </Box>
      </>
    );
  }
}

export default withStyles(useStyles, { withTheme: true })(SideSection);
