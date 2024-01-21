import React from "react";
import { Paper, Tabs, Tab } from "@material-ui/core";

export default function CustomTabs({ value, handleChange }) {
  return (
    <Paper>
      <Tabs
        value={value}
        indicatorColor="primary"
        textColor="primary"
        onChange={handleChange}
        aria-label="disabled tabs example"
      >
        <Tab label="Week" />
        <Tab label="Month" />
        <Tab label="Year" />
      </Tabs>
    </Paper>
  );
}
