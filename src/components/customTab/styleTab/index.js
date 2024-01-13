import React from "react";
import { Tab } from "@material-ui/core";
import { styled } from "@material-ui/core/styles";

const StyledTab = styled((props) => <Tab disableRipple {...props} />);

export default StyledTab(({ theme }) => ({
  textTransform: "none",
  fontWeight: theme.typography.fontWeightRegular,
  fontSize: theme.typography.pxToRem(17),
  marginRight: theme.spacing(1),
  color: "#2A4C7C",
  "&.Mui-selected": {
    color: "#2A4C7C",
    fontWeight: 900,
    lineHeight: "29px",
  },

  "&.Mui-focusVisible": {
    backgroundColor: "rgba(100, 95, 228, 0.32)",
  },
}));
