import React, { useEffect } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import DashboardComponent from "./dashboardComponent";
import { useStyles } from "./indexStyles";

function Dashboard(props) {
  const { classes: {}, classes } = props;

  useEffect(() => {
    localStorage.removeItem("id");
    localStorage.removeItem("cardTitle");
    localStorage.removeItem("premium");
    localStorage.removeItem("tenure");
  }, []);

  return (
    <>
      <DashboardComponent />
    </>
  );
}

export default withStyles(useStyles, { withTheme: true })(Dashboard);
