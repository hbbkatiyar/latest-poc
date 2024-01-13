import React, { useContext, useEffect, useState } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import AssuranceContext from "../../context/index";
import withStyles from "@material-ui/core/styles/withStyles";
import ReactTooltip from "react-tooltip";
import DurationTabsComponent from "./duration";
import { Help } from "@material-ui/icons";
import { Box, Button, Hidden, Typography } from "@material-ui/core";
import { buildDefaultPolicyStatusList } from "../../helpers/policy";
import {
  getRoute,
  getStorageItem,
  logout,
  removeStorageItem,
  setStorageItem,
} from "../../helpers/utils";
import {
  buildSystemErrorMessage,
  removeSelectedProductFromStorage,
} from "../../helpers/proposal";
import { getWebService } from "../../helpers/server";
import { ReducerUtils } from "../../constants/reducers";
import { useHistory } from "react-router";
import { useStyles } from "./dashboardStyles";
import {
  AUTHORIZATION,
  DURATION_FILTER_DEFAULT_VALUE,
  NEW_CLAIM,
  PARTNER_ID_MOBILE_STACK_DEMO,
} from "../../constants/index";
import { durationMapping } from "../../mapping";

function DashboardComponent(props) {
  const history = useHistory();
  const {
    classes: {
      button,
      buyButton,
      contentBox,
      loaderBox,
      main,
      mainContainer,
      performanceCards,
      performanceCardsBox,
      spacing,
    },
    classes,
  } = props;

  const { state, dispatch } = useContext(AssuranceContext);
  const [value, setValue] = useState(0);
  const [dashboardCards, setDashboardCards] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatchEvent(ReducerUtils.search.text, "");
    dispatchEvent(ReducerUtils.filter.duration, DURATION_FILTER_DEFAULT_VALUE);
    dispatchEvent(ReducerUtils.filter.customDateRange, [null, null]);
    dispatchEvent(ReducerUtils.filter.status, buildDefaultPolicyStatusList());
    removeSelectedProductFromStorage();

    console.log("[useEffect dashboard component using qa pipeline...]");
    if (!getStorageItem("counter")) {
      setStorageItem("counter", 1);
    }
  }, []);

  useEffect(() => getDashboardCards(value), [value]);

  const dispatchEvent = (type, payload) => dispatch({ type, payload });

  const handleChange = (event, newValue) => setValue(newValue);

  const navigateTo = (pathname) => history.push({ pathname });

  const onClickHandler = () => {
    removeStorageItem("proposalId");
    removeStorageItem("mobile");

    navigateTo(getRoute("product"));
  };

  const cbError = ({ data: { error, error_msg } }) => {
    setIsLoaded(true);
    if (error === AUTHORIZATION) {
      logout();
      window.location.href = "/";
    } else {
      console.log(`error_msg = ${error_msg}`);
    }
  };

  const syncDashboardCardData = (cards) => {
    setIsLoaded(true);
    setDashboardCards(cards);
  };

  const syncCardsAndClaims = (cards, claims) => {
    cards.forEach((card) => {
      claims.forEach((claim) => {
        if (card.values.indexOf(claim.active) > -1) {
          card.count++;
        } else if (
          card.slug === "in_progress" &&
          [
            "Claim Initiated",
            "Claim Submitted",
            "Approved",
            "Settlement Completed",
          ].indexOf(claim.active) === -1
        ) {
          card.count++;
        }
      });
    });

    syncDashboardCardData([...cards]);
  };

  const fetchClaims = async ({ data: cards }) => {
    try {
      const url = `partners/claim?start=0&partner_id=${PARTNER_ID_MOBILE_STACK_DEMO}&date=${durationMapping[value]}`;
      // const url = `partners/claim?start=0&partner_id=${PARTNER_ID_MOBILE_STACK_DEMO}&month=${getCurrentMonth()}&year=${getCurrentYear()}`;
      // const url = "partners/claim?start=0&partner_id=16&month=6&year=2023";
      const response = await getWebService(url);
      const {
        data: { claims },
      } = response.data;

      syncCardsAndClaims(cards, claims);
    } catch (error) {
      console.log("line 136...");
      cbError(
        error && error.response && error.response.data
          ? error.response.data
          : buildSystemErrorMessage()
      );
    }
  };

  const getDashboardCards = async () => {
    try {
      const response = await getWebService("/data/cards.json");
      await fetchClaims(response.data);
    } catch (error) {
      cbError(
        error && error.response && error.response.data
          ? error.response.data
          : buildSystemErrorMessage()
      );
    }
  };

  return (
    <>
      {isLoaded ? (
        <Box className={main}>
          <Box className={mainContainer}>
            <Box className={contentBox}>
              <>
                <Box className={classes.backSolid}>
                  <Box>
                    <Typography variant={"h6"}>
                      <strong>{`Welcome to Claim Portal`}</strong>
                    </Typography>
                  </Box>

                  {1 === 2 && (
                    <DurationTabsComponent
                      value={value}
                      handleChange={handleChange}
                    />
                  )}

                  {1 === 2 && (
                    <Box className={performanceCardsBox}>
                      {dashboardCards.map((item, index) => {
                        return (
                          item.visible && (
                            <Box key={index} className={performanceCards}>
                              <Box className={`${spacing} ${item.class}`}>
                                <Typography variant={"h4"}>
                                  {
                                    <b>
                                      {item.count >= 10
                                        ? item.count
                                        : `0${item.count}`}
                                    </b>
                                  }
                                  {/* {value === 1 && <b>{item.count >= 10 ? item.count : `0${item.count}`}</b>}
                                {value === 2 && <b>{item.count >= 10 ? item.count : `0${item.count}`}</b>} */}
                                </Typography>
                              </Box>
                              <Box className={spacing}>
                                <Typography
                                  variant={"body1"}
                                  data-tip={item.tooltip}
                                  className={`${item.class}1`}
                                >
                                  {item.title}{" "}
                                  {item.tooltip && (
                                    <>
                                      <Help style={{ height: "16px" }} />{" "}
                                      <ReactTooltip />
                                    </>
                                  )}
                                </Typography>
                              </Box>
                            </Box>
                          )
                        );
                      })}
                    </Box>
                  )}
                  <Box style={{ height: "30vh" }}>&nbsp;</Box>
                </Box>

                <Hidden smDown>
                  <Box m={5}>&nbsp;</Box>
                </Hidden>

                <Box className={"searchBox animated " + button}>
                  <Button
                    variant={"contained"}
                    color={"primary"}
                    className={buyButton}
                    onClick={(e) => {
                      onClickHandler();
                    }}
                    disabled={false}
                  >
                    <b>{NEW_CLAIM}</b>
                  </Button>
                </Box>
              </>
            </Box>
          </Box>
        </Box>
      ) : (
        <Box className={loaderBox}>
          <CircularProgress color={"secondary"} />
        </Box>
      )}
    </>
  );
}

export default withStyles(useStyles, { withTheme: true })(DashboardComponent);
