import React, { useContext, useEffect, useState } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import CircularProgress from "@material-ui/core/CircularProgress";
import LoanSummaryDetails from "./summaryForm";
import LendingContext from "../../context/index";
import useApi from "../../hooks/useApi";
import { Box } from "@material-ui/core";
import { useStyles } from "./summaryStyles";
import { useHistory, useParams } from "react-router";
import {
  getRoute,
  logout,
  navigateToUrl,
  parseMessage,
  scrollTop,
  setStorageItem,
} from "../../helpers/utils";
import { ReducerUtils } from "../../constants/reducers";
import {
  buildProvisionalQuotesList,
  buildSystemErrorMessage,
  buildUpdateProposalPayload,
  calculateEMI,
  calculateRepayAmount,
  reBuildOrderDetails,
  sleep,
  syncFetchOriginalQuoteResponse,
  syncOrderDetails,
} from "../../helpers/proposal";
import { getWebService, putWebService } from "../../helpers/server";
import {
  DELAY_AVERAGE,
  DELAY_LONG,
  DELAY_SHORT,
  HANDOVER,
  QUOTES_LIST,
} from "../../constants";

const defaultFormObject = {
  amount: null,
  emi: null,
  interest_rate: null,
  processing_charges: null,
  reference_code: null,
  repay_amount: null,
  selected_quote: null,
  taxes: null,
  tenure: null,
};

function LoanSummary(props) {
  const {
    classes: { loaderBox },
  } = props;

  const { order: orderId } = useParams();
  const history = useHistory();

  const orderDetails = useApi(`/data/order.json`);
  const { state, dispatch } = useContext(LendingContext);

  const [errors, setErrors] = useState([]);
  const [form, setForm] = useState({ ...defaultFormObject });
  const [initiateCall, setInitiateCall] = useState(false);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [provisionalQuotes, setProvisionalQuotes] = useState([]);
  const [showBackdrop, setShowBackdrop] = useState(false);

  useEffect(() => scrollTop(), []);

  useEffect(() => {
    if (orderDetails) {
      dispatchEvent(
        ReducerUtils.order.details,
        reBuildOrderDetails(orderDetails)
      );
      
      setForm({
        ...form,
        ...syncOrderDetails(orderDetails),
      });

      const quotes = buildProvisionalQuotesList(orderDetails);

      setStorageItem(QUOTES_LIST, JSON.stringify(quotes));
      dispatchEvent(ReducerUtils.provisionalQuotes.list, [...quotes]);

      setProvisionalQuotes([...quotes]);
      setIsLoaded(true);
    }
  }, [orderDetails]);

  useEffect(() => {
    if (provisionalQuotes.length && !initiateCall) {
      fetchOriginalQuotes();
    }
  }, [provisionalQuotes]);

  const dispatchEvent = (type, payload) => dispatch({ type, payload });

  const doForceLogout = () => {
    // Here setTimeout has been added in order to introduced some delay so that dealer should be able to read error message clearly before redirecting it to login page
    setTimeout(() => {
      logout();
      navigateToUrl("/", history);
    }, 1000);
  };

  const fetchQuote = async (url, delay = 0) => {
    const response = await getWebService(url);

    // TODO: We need to remove this delay as it has been implemented to see the dealy in API response
    if (delay) await sleep(delay);

    return response.data.data;
  };

  const fetchOriginalQuotesSuccess = (shallowCopy) => {
    setStorageItem(QUOTES_LIST, JSON.stringify(shallowCopy));
    setProvisionalQuotes([...shallowCopy]);
    dispatchEvent(ReducerUtils.provisionalQuotes.list, shallowCopy);
  };

  const fetchOriginalQuotes = () => {
    setInitiateCall(true);

    const {
      responses_quotes: {
        nbfc1: {
          original_eligibility: originalQuote1 = null,
          selected_eligibility: selectedQuote1 = null,
        },
        nbfc2: {
          original_eligibility: originalQuote2 = null,
          selected_eligibility: selectedQuote2 = null,
        },
        nbfc3: {
          original_eligibility: originalQuote3 = null,
          selected_eligibility: selectedQuote3 = null,
        },
      },
    } = orderDetails;

    if (!originalQuote1) {
      fetchQuote(`/data/quotes/original/nbfc1.json`, DELAY_SHORT)
        .then((data) => {
          fetchOriginalQuotesSuccess(
            syncFetchOriginalQuoteResponse(data, "nbfc1")
          );
        })
        .catch((error) => {
          console.log(error);
        });
    }

    if (!originalQuote2) {
      fetchQuote(`/data/quotes/original/nbfc2.json`, DELAY_AVERAGE)
        .then((data) => {
          fetchOriginalQuotesSuccess(
            syncFetchOriginalQuoteResponse(data, "nbfc2")
          );
        })
        .catch((error) => {
          console.log(error);
        });
    }

    if (!originalQuote3) {
      fetchQuote(`/data/quotes/original/nbfc3.json`, DELAY_LONG)
        .then((data) => {
          fetchOriginalQuotesSuccess(
            syncFetchOriginalQuoteResponse(data, "nbfc3")
          );
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const fetchRequestedQuoteSuccess = (quote, index, quotes, data) => {
    const { amount, interest_rate, tenure } = quote;
    //TODO: revert back this emi and repay_amount calculation logic once it has been dynamic from API.
    const emi = data ? calculateEMI(amount, interest_rate, tenure / 12) : null;
    const repay_amount = emi ? calculateRepayAmount(emi, tenure / 12) : null;

    quotes[index] = data
      ? {
          ...quote,
          ...data,
          ...(data && { emi }),
          ...(data && { repay_amount }),
        }
      : {
          ...quote,
          emi: null,
          processing_charges: null,
          repay_amount: null,
          taxes: null,
        };

    dispatchEvent(ReducerUtils.provisionalQuotes.list, quotes);
    setProvisionalQuotes([...quotes]);
    setShowBackdrop(false);
  };

  const fetchRequestedQuote = async (quote, index, quotes) => {
    setShowBackdrop(true);
    try {
      const { amount, reference_code, tenure } = quote;
      const queryString = `amount=${amount}&tenure=${tenure}`;
      const data = await fetchQuote(
        `/data/quotes/selected/${reference_code}/${tenure}.json?${queryString}`,
        DELAY_AVERAGE
      );

      fetchRequestedQuoteSuccess(quote, index, quotes, data);
    } catch (error) {
      console.log(error);
      setShowBackdrop(false);
    }
  };

  const refreshClickHandler = (quote, index) => {
    const { interest_rate, max_amount, max_tenure } = quote;

    fetchRequestedQuote(
      { ...quote, amount: max_amount, interest_rate, tenure: max_tenure },
      index,
      JSON.parse(JSON.stringify(provisionalQuotes))
    );
  };

  const selectQuoteClickHandler = (item, index, source = "switch") => {
    setForm({
      ...form,
      reference_code: item.reference_code,
    });

    updateProposal(null, item);
  };

  const setFormState = function (name, value) {
    setForm({
      ...form,
      [name]: value,
    });
  };

  const changeHandler = (key, value, index) => {
    const shallowCopy = JSON.parse(JSON.stringify(provisionalQuotes));
    const quote = shallowCopy[index];

    quote[key] = value;

    dispatchEvent(ReducerUtils.provisionalQuotes.list, shallowCopy);
    setProvisionalQuotes([...shallowCopy]);

    // Invoke API to fetch requested (tenure and amount) quote for new loan amount and tenure.
    const { amount = null, min_amount = null, max_amount = null } = quote;
    if (Number(amount) >= min_amount && Number(amount) <= max_amount)
      fetchRequestedQuote(quote, index, shallowCopy);
  };

  const amountChangeHandler = (event, index, item) => changeHandler('amount', event.target.value, index);

  const tenureChangeHandler = (event, newValue) => {
    console.log(`slider id = ${event.target.id}`);
    if (!event.target.id) {
      return false;
    }

    changeHandler('tenure', newValue, event.target.id.split("-")[1]);
  };

  const updateProposalError = (
    { data: { error_msg }, code = 400 },
    modalKey = ""
  ) => {
    setIsFormSubmitted(false);

    const message = parseMessage(error_msg);
    if (Array.isArray(message)) {
      setErrors(message);
    } else {
      let messageArray = [];
      messageArray.push(message);
      setErrors(messageArray);
    }

    if (code === 401) {
      doForceLogout();
    }
  };

  const updateProposalSuccess = ({ data }, action) => {
    setIsFormSubmitted(false);

    const routeKey = action === HANDOVER ? "handover" : "documents";
    navigateToUrl(`${getRoute(routeKey)}/${orderId}`, history);
  };

  const updateProposal = async (action = null, item = null) => {
    try {
      setErrors([]);
      setIsFormSubmitted(true);

      const payload = buildUpdateProposalPayload({ ...form, ...item }, action);
      const response = await putWebService(
        `lending/proposal/${orderId}`,
        payload
      );

      updateProposalSuccess(response.data, action);
    } catch (error) {
      updateProposalError(
        error && error.response && error.response.data
          ? error.response.data
          : buildSystemErrorMessage()
      );
    }
  };

  return isLoaded && orderDetails ? (
    <LoanSummaryDetails
      amountChangeHandler={amountChangeHandler}
      errors={errors}
      form={form}
      isFormSubmitted={isFormSubmitted}
      provisionalQuotes={provisionalQuotes}
      refreshClickHandler={refreshClickHandler}
      selectQuoteClickHandler={selectQuoteClickHandler}
      showBackdrop={showBackdrop}
      tenureChangeHandler={tenureChangeHandler}
      updateProposal={updateProposal}
    />
  ) : (
    <Box className={loaderBox}>
      <CircularProgress color={"secondary"} />
    </Box>
  );
}

export default withStyles(useStyles, { withTheme: true })(LoanSummary);
