import React, { useContext, useEffect, useState } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import CircularProgress from "@material-ui/core/CircularProgress";
import ProposalAcknowledgeForm from "./indexForm";
import LendingContext from "../../context/index";
import useApi from "../../hooks/useApi";
import { Box } from "@material-ui/core";
import { useStyles } from "./styles";
import { useParams } from "react-router";
import { getStorageItem, scrollTop, setStorageItem } from "../../helpers/utils";
import { reBuildOrderDetails } from "../../helpers/proposal";
import { ReducerUtils } from "../../constants/reducers";
import { useHistory } from "react-router";
import { getRoute, navigateToUrl } from "../../helpers/utils";

function ProposalAcknowledge(props) {
  const {
    classes: { loaderBox },
  } = props;

  const history = useHistory();

  const { order: orderId } = useParams();
  const orderDetails = useApi(`lending/proposal/${orderId}`);
  const { state, dispatch } = useContext(LendingContext);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => scrollTop(), []);

  useEffect(() => {
    if (orderDetails) {
      dispatchEvent(
        ReducerUtils.order.details,
        reBuildOrderDetails(orderDetails)
      );
      setIsLoaded(true);
    }
  }, [orderDetails]);

  const dispatchEvent = (type, payload) => dispatch({ type, payload });

  const handleClick = () => {
    setStorageItem("counter", Number(getStorageItem("counter")) + 1);
    navigateToUrl(getRoute("dashboard"), history);
  };

  return isLoaded ? (
    <ProposalAcknowledgeForm handleClick={handleClick} />
  ) : (
    <Box className={loaderBox}>
      <CircularProgress color={"secondary"} />
    </Box>
  );
}

export default withStyles(useStyles, { withTheme: true })(ProposalAcknowledge);
