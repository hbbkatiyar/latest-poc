import React from "react";
import { Box } from "@material-ui/core";

function Logo(props) {
  const { classes } = props;

  return (
    <>
      <Box>
        <img
          src={props.src}
          alt={"logo"}
          className={classes}
          // onClick={() => window.location.href = `${process.env.REACT_APP_SITE_URL}`}
        />
      </Box>
    </>
  );
}

export default Logo;
