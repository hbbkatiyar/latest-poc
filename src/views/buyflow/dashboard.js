import React, { useState } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import { Box, Button, Typography } from "@material-ui/core";
import { useHistory } from "react-router";
import { useStyles } from "./indexFormStyles";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { getRoute, setStorageItem } from "../../helpers/utils";

function Dashboard({
  classes: {
    button,
    buyButton,
    buttonText,
    container,
    main,
    mainCta,
    performanceCardsBox,
    performanceCards,
    spacing,
  },
}) {
  const history = useHistory();
  const [value, setValue] = useState(1);
  const count = {
    proposal: {
      0: 2,
      1: 3,
      2: 5
    },
    policy: {
      0: 1,
      1: 3,
      2: 5
    }
  };

  const navigateTo = (pathname) => history.push({ pathname });

  const tileClickHandler = (keyname, storageKey) => {
    setStorageItem(storageKey, value);

    navigateTo(getRoute(keyname));
  };

  const clickhandler = () => {
    navigateTo(getRoute("product"));
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box className={main}>
      <Box container={"true"} justifyContent="center" className={container}>
        <Box display={"flex"} justifyContent={"center"}>
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
        </Box>

        <Box className={performanceCardsBox}>
          <Box className={performanceCards}>
            <Box className={spacing}>
              <Typography variant={"h4"}>
                Proposal
              </Typography>
            </Box>
            <Box className={spacing}>
              <Typography variant={"h4"} style={{color: "orange"}} onClick={() => tileClickHandler("proposals", "proposalDashboardTab")}>
                {`0${count.proposal[value]}`}
              </Typography>
            </Box>
          </Box>
          <Box className={performanceCards}>
            <Box className={spacing}>
              <Typography variant={"h4"}>
                Policy
              </Typography>
            </Box>
            <Box className={spacing}>
              <Typography variant={"h4"} style={{ color: "#05B050"}}  onClick={() => tileClickHandler("policies", "policyDashboardTab")}>
                {`0${count.policy[value]}`}
              </Typography>
            </Box>
          </Box>
        </Box>

        <Box
          // className={customBtn}
          justifyContent="center"
          alignContent="center"
        >
          <Button
            type="click"
            size="large"
            variant={"contained"}
            color="primary"
            className={`${button} ${buyButton}`}
            fullWidth
            onClick={clickhandler}
          >
            <Box className={buttonText}>
              <Typography variant={"body1"} className={mainCta}>
                Select Product
              </Typography>
            </Box>
          </Button>
        </Box>
        
      </Box>
    </Box>
  );
}

export default withStyles(useStyles, { withTheme: true })(Dashboard);
