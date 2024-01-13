import React, { useState } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import StyledTab from "../../components/customTab/styleTab";
import StyledTabs from "../../components/customTab/styleTabs";
import { Box, Paper } from "@material-ui/core";
import { useStyles } from "./dashboardStyles";
import { detectMob } from "../../helpers/utils";
import {
  MONTH_TEXT,
  THIS_MONTH_TEXT,
  THIS_WEEK_TEXT,
  WEEK_TEXT,
  TODAY_TEXT,
} from "../../constants/index";

function DurationTabsComponent(props) {
  const {
    classes: {
      tabsBox,
      tabsPaper,
    },
    value,
    handleChange,
  } = props;
  const [isMobile, setIsMobile] = useState(detectMob());

  return (
    <Box className={tabsBox}>
      <Paper square className={tabsPaper}>
        <StyledTabs
          value={value}
          onChange={handleChange}
          aria-label="icon tabs example"
        >
          <StyledTab icon={TODAY_TEXT} aria-label="person" />
          <StyledTab
            icon={isMobile ? WEEK_TEXT : THIS_WEEK_TEXT}
            aria-label="phone"
          />
          <StyledTab
            icon={isMobile ? MONTH_TEXT : THIS_MONTH_TEXT}
            aria-label="favorite"
          />
        </StyledTabs>
      </Paper>
    </Box>
  );
}

export default withStyles(useStyles, { withTheme: true })(
  DurationTabsComponent
);
