import React, { useContext, useReducer } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { getRoute } from "./helpers/utils";
import ApplicationReducer from "./reducers";
import ApplicationContext from "./context/index";
import MainLayout from "./components/layout/index";
// Created this additional BuyflowLayout but not in use right now, if someon ewant to use then can use it in the buyflow
// import BuyflowLayout from "./components/layout/buyflow";
import Login from "./views/login";
// Uncomment this Buyflow Component, if someone want to use a common entry component for Buyflow.
// import Buyflow from "./views/buyflow/index";
import BuyflowDashboard from "./views/buyflow/dashboard";
import BuyflowProductSelection from "./views/buyflow/product";
import BuyflowCustomerDetails from "./views/buyflow/customer";
import BuyflowPayment from "./views/buyflow/payment";
import BuyflowNomineeDetails from "./views/buyflow/nominee";
import BuyflowHealthDeclaration from "./views/buyflow/declaration";
import BuyflowApplicationStatus from "./views/buyflow/status";
import BuyflowApplicationSubmitted from "./views/buyflow/submitted";
import BuyflowCustomerLivelinessCheck from "./views/buyflow/liveliness";
import KnowledgeHub from "./views/drawer/knowledgeHub";
import Proposals from "./views/drawer/proposals";
import Policies from "./views/drawer/policies";

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
          {/* Login Section Route */}
          <RouteWithLayout
            path={getRoute("home")}
            exact
            layout={MainLayout}
            component={Login}
          />

          {/* Buyflow Section Routes */}
          <RouteWithLayout
            path={getRoute("dashboard")}
            exact
            layout={MainLayout}
            component={BuyflowDashboard}
          />
          <RouteWithLayout
            path={getRoute("product")}
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
            path={getRoute("status")}
            exact
            layout={MainLayout}
            component={BuyflowApplicationStatus}
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
            component={BuyflowCustomerLivelinessCheck}
          />

          {/* Hamburger Section Routes */}
          <RouteWithLayout
            path={getRoute("knowledgeHub")}
            exact
            layout={MainLayout}
            component={KnowledgeHub}
          />
          <RouteWithLayout
            path={getRoute("proposals")}
            exact
            layout={MainLayout}
            component={Proposals}
          />
          <RouteWithLayout
            path={getRoute("policies")}
            exact
            layout={MainLayout}
            component={Policies}
          />
        </ApplicationContext.Provider>
      </Switch>
    </Router>
  );
}

export default Routes;
