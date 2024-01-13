import React from "react";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { Chip, Grid, withStyles } from "@material-ui/core";

const useStyles = (theme) => ({
  activeChip: {
    backgroundColor: theme.palette.primary.light,
    border: "1px solid #ffd900",
    borderRadius: "5px",
    color: "#EF7878",
    fontWeight: 300,
    "&:hover, &:focus": {
      backgroundColor: "#ffd900 !important",
    },
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(3, 2, 3, 2),
    },
    [theme.breakpoints.up("sm")]: {
      padding: theme.spacing(3, 2, 3, 2),
    },
    [theme.breakpoints.up("md")]: {
      padding: theme.spacing(3, 2, 3, 2),
    },
  },
  chip: {
    backgroundColor: "#ECF0F4",
    border: "1px solid #ffd900",
    borderRadius: "5px",
    color: "#22334f",
    fontWeight: 300,
    "&:hover, &:focus": {
      backgroundColor: "#ffd900 !important",
    },
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(3, 2, 3, 2),
    },
    [theme.breakpoints.up("sm")]: {
      padding: theme.spacing(3, 2, 3, 2),
    },
    [theme.breakpoints.up("md")]: {
      padding: theme.spacing(3, 2, 3, 2),
    },
  },
  activeChipLarge: {
    backgroundColor: theme.palette.primary.light,
    border: "1px solid #eb5757",
    borderRadius: "0px",
    color: "#22334f",
    "&:hover, &:focus": {
      backgroundColor: "#ffd900 !important",
    },
    [theme.breakpoints.down("sm")]: {
      padding: "34px 24px",
    },
    [theme.breakpoints.up("sm")]: {
      padding: "34px 34px",
    },
    [theme.breakpoints.up("md")]: {
      padding: "34px 34px",
    },
  },
  chipLarge: {
    backgroundColor: "#ffffff",
    border: "1px solid #eb5757",
    borderRadius: "0px",
    color: "#22334f",
    "&:hover, &:focus": {
      backgroundColor: "#ffd900 !important",
    },
    [theme.breakpoints.down("sm")]: {
      padding: "34px 24px",
    },
    [theme.breakpoints.up("sm")]: {
      padding: "34px 34px",
    },
    [theme.breakpoints.up("md")]: {
      padding: "34px 34px",
    },
  },

  label: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    flexDirection: "column",
  },
  bold: {
    fontWeight: 500,
  },
  thin: {
    fontWeight: 300,
  },
  regular: {
    fontWeight: 400,
  },
  fullWidth: {
    width: "90%",
    display: "flex",
    justifyContent: "flex-start",
    // alignItems: "flex-start",
    // flexDirection: "column",
  },
  chipsBox: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    flexWrap: "wrap",
  },
  wrap: {
    whiteSpace: "pre-wrap",
  },
});

const ChipSelectHook = (props) => {
  const {
    classes,
    fieldname,
    handleChangeChipSelect,
    selectedItem,
    disabled = false,
    disabledValue = null,
    rowIndex,
  } = props;

  return (
    <Box>
      <Typography>{props.title}</Typography>
      <Grid container spacing={1}>
        {props.options.map((item) => {
          return (
            <Box
              p={1}
              key={item.value}
              className={props.width === "full" ? classes.fullWidth : ""}
            >
              <Chip
                label={
                  <Box className={classes.label}>
                    <Typography className={classes[props.fontWeight]}>
                      {item.title}
                    </Typography>
                    <Typography
                      className={classes.wrap + " " + classes[props.fontWeight]}
                    >
                      {item.subTitle}
                    </Typography>
                  </Box>
                }
                onClick={(e) => {
                  handleChangeChipSelect(fieldname, item.value, rowIndex);
                }}
                className={
                  (props.size === "large"
                    ? selectedItem === item.value
                      ? classes.activeChipLarge
                      : classes.chipLarge
                    : selectedItem === item.value
                    ? classes.activeChip
                    : classes.chip) +
                  " " +
                  (props.width === "full" && classes.fullWidth)
                }
                {...((disabled ||
                  item.value === disabledValue ||
                  item.disabled) && { disabled: true })}
              />
            </Box>
          );
        })}
      </Grid>
    </Box>
  );
};

export default withStyles(useStyles, { withTheme: true })(ChipSelectHook);
