import React, { Component } from "react";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { Chip, Grid, withStyles } from "@material-ui/core";

const useStyles = (theme) => ({
  activeChip: {
    backgroundColor: theme.palette.primary.main,
    border: "1px solid #dfeeff",
    borderRadius: "4px",
    color: "#22334f",
    "&:hover, &:focus": {
      backgroundColor: "#ebe7df !important",
    },
    [theme.breakpoints.down("sm")]: {
      padding: "18px 0px",
    },
    [theme.breakpoints.up("sm")]: {
      padding: "18px 0px",
    },
    [theme.breakpoints.up("md")]: {
      padding: "18px 0px",
    },
  },
  chip: {
    backgroundColor: "#ffffff",
    border: "1px solid #ebe7df",
    borderRadius: "4px",
    color: "#979797",
    "&:hover, &:focus": {
      backgroundColor: "#ebe7df !important",
    },
    [theme.breakpoints.down("sm")]: {
      padding: "18px 0px",
    },
    [theme.breakpoints.up("sm")]: {
      padding: "18px 0px",
    },
    [theme.breakpoints.up("md")]: {
      padding: "18px 0px",
    },
  },
});

class ChipSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedItem: this.props.selectedItem ?? "",
      options: this.props.options ?? [],
      compact: this.props.compact ?? true,
    };
  }

  selectItem(item) {
    this.setState(
      {
        selectedItem: item.value,
      },
      () => {
        this.props.onChange(item.value);
      }
    );
  }

  render() {
    const { classes } = this.props;
    return (
      <Box py={2}>
        <Typography>{this.props.title}</Typography>
        <Grid container spacing={1}>
          {this.state.options.map((item) => {
            return (
              <Grid item key={item.value}>
                <Chip
                  label={item.title}
                  onClick={(e) => {
                    this.selectItem(item);
                  }}
                  className={
                    this.state.selectedItem === item.value
                      ? classes.activeChip
                      : classes.chip
                  }
                />
              </Grid>
            );
          })}
        </Grid>
      </Box>
    );
  }
}

export default withStyles(useStyles, { withTheme: true })(ChipSelect);
