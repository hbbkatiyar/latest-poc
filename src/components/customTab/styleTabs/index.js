import React from "react";
import { Tabs } from "@material-ui/core";
import { styled } from "@material-ui/core/styles";
import { useStyles } from "./indexStyles";

const StyledTabs = styled((props) => (
  <Tabs
    {...props}
    TabIndicatorProps={{ children: <span className="MuiTabs-indicatorSpan" /> }}
  />
));

export default StyledTabs(useStyles);
