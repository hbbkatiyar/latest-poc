import React from "react";
import { Box, Button, Grid, Typography } from "@material-ui/core";
import { useStyles } from "./indexStyles";
// import { COMING_SOON } from '../../constants/index';
import withStyles from "@material-ui/core/styles/withStyles";

function SampleTemple(props) {
  const {
    classes: { next },
    handleClick,
    text = "This grid item is centered both horizontally and vertically.",
  } = props;

  return (
    <Box>
      <Grid
        container
        spacing={0}
        align="center"
        justify="center"
        direction="column"
        style={{ backgroundColor: "teal" }}
      >
        <Grid item style={{ backgroundColor: "yellow", margin: 1, padding: 5 }}>
          <Typography variant={"body1"}>{text}</Typography>
        </Grid>
      </Grid>

      <Box mt={5}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleClick}
          className={next}
        >
          <b>Next</b>
        </Button>
      </Box>
    </Box>
  );
}

export default withStyles(useStyles, { withTheme: true })(SampleTemple);
