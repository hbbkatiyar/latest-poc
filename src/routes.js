import React, { useContext, useReducer } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { getRoute } from "./helpers/utils";
import ApplicationReducer from "./reducers";
import ApplicationContext from "./context/index";
import MainLayout from "./components/layout/index";
import BuyflowLayout from "./components/layout/buyflow";
import Login from "./views/login";
import Buyflow from "./views/buyflow/index";
import BuyflowProductSelection from "./views/buyflow/product";
import BuyflowCustomerDetails from "./views/buyflow/customer";
import BuyflowPayment from "./views/buyflow/payment";
import BuyflowNomineeDetails from "./views/buyflow/nominee";
import BuyflowHealthDeclaration from "./views/buyflow/declaration";
import BuyflowApplicationSubmitted from "./views/buyflow/submitted";
import CustomerLivelinessCheck from "./views/buyflow/liveliness";
import KnowledgeHub from "./views/drawer/knowledgeHub";
import LoginStatus from "./views/drawer/loginStatus";
import PolicyCoi from "./views/drawer/policyCoi";

const RouteWithLayout = ({ component: Component, layout: Layout, ...rest }) => (
  <Route
    {...rest}
    render={(props) => (
      <Layout>
        <Component {...props} />
      </Layout>
    )}
  />
);

function Routes() {
  const initialReducerState = useContext(ApplicationContext);
  const [state, dispatch] = useReducer(ApplicationReducer, initialReducerState);

  return (
    <Router>
      <Switch>
        <ApplicationContext.Provider value={{ state, dispatch }}>
          <RouteWithLayout
            path={getRoute("home")}
            exact
            layout={MainLayout}
            component={Login}
          />
          <RouteWithLayout
            path={getRoute("dashboard")}
            exact
            layout={MainLayout}
            component={BuyflowProductSelection}
          />
          <RouteWithLayout
            path={getRoute("customer")}
            exact
            layout={MainLayout}
            component={BuyflowCustomerDetails}
          />
          <RouteWithLayout
            path={getRoute("payment")}
            exact
            layout={MainLayout}
            component={BuyflowPayment}
          />
          <RouteWithLayout
            path={getRoute("nominee")}
            exact
            layout={MainLayout}
            component={BuyflowNomineeDetails}
          />
          <RouteWithLayout
            path={getRoute("declaration")}
            exact
            layout={MainLayout}
            component={BuyflowHealthDeclaration}
          />
          <RouteWithLayout
            path={getRoute("submitted")}
            exact
            layout={MainLayout}
            component={BuyflowApplicationSubmitted}
          />
          <RouteWithLayout
            path={getRoute("liveliness")}
            exact
            layout={MainLayout}
            component={CustomerLivelinessCheck}
          />
          <RouteWithLayout
            path={getRoute("knowledgeHub")}
            exact
            layout={MainLayout}
            component={KnowledgeHub}
          />
          <RouteWithLayout
            path={getRoute("loginStatus")}
            exact
            layout={MainLayout}
            component={LoginStatus}
          />
          <RouteWithLayout
            path={getRoute("policyCoi")}
            exact
            layout={MainLayout}
            component={PolicyCoi}
          />

          {/* <RouteWithLayout
            path={`${getRoute("newClaim")}/:order`}
            exact
            layout={MainLayout}
            component={Proposal}
          /> */}
          {/* <RouteWithLayout
            path={`${getRoute("summary")}/:order`}
            exact
            layout={MainLayout}
            component={ProposalSummary}
          /> */}
        </ApplicationContext.Provider>
      </Switch>
    </Router>
  );
}

export default Routes;
