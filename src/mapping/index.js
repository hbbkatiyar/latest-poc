import {
  CHECK_LOAN_ELIGIBILITY,
  DASHBOARD_SECTION,
  LOAN_ACKNOWLEDGEMENT,
  LOAN_DOCUMENTS,
  LOAN_HANDOVER,
  LOAN_ELIGIBILITY_SUMMARY,
  CLAIMS_LISTING,
  NEW_CLAIM
} from "../constants";

export const routes = {
  home: "/",
  dashboard: "/buyflow/product-selection",
  product: "/buyflow/product-selection",
  customer: "/buyflow/customer-details",
  payment: "/buyflow/payment",
  nominee: "/buyflow/nominee-details",
  declaration: "/buyflow/health-declaration",
  submitted: "/buyflow/application-submitted",
  liveliness: "/buyflow/liveliness-check",
  knowledgeHub: "/drawer/knowledge-hub",
  loginStatus: "/drawer/login-status",
  policyCoi: "/drawer/policy-coi",
};

export const sectionTitle = {
  "/": DASHBOARD_SECTION,
  "/dashboard": DASHBOARD_SECTION,
  "/claims": CLAIMS_LISTING,
  "/claim/new": NEW_CLAIM,
  "/loan/summary": LOAN_ELIGIBILITY_SUMMARY,
  "/loan/documents": LOAN_DOCUMENTS,
  "/loan/acknowledgement": LOAN_ACKNOWLEDGEMENT,
  "/loan/handover": LOAN_HANDOVER,
};

export const durationMapping = {
  0: 'today',
  1: 'thisWeek',
  2: 'thisMonth'
};
