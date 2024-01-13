import React from "react";

const ApplicationContext = React.createContext({
  actualPlans: [],
  makes: [],
  models: [],
  orderDetails: null,
  plans: [],
  variants: [],
  vehicleDetails: null,
  rtaCodes: [],
  rtsCities: [],
  insurers: [],
  searchtext: "",
  systemConfig: null,
  
  productDetails: null,
});

export default ApplicationContext;
