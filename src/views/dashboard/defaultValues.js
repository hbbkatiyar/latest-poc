import {
  COMING_SOON,
  COLOR_SUCCESS_GREEN,
  COLOR_DANGER_RED,
  POLICY_SOLD,
  RANKING,
  THIS_WEEK_TEXT,
  TOTAL_EARNIGS,
} from "../../constants/index";

export const dashCards = [
  {
    title: 0,
    desc: POLICY_SOLD,
    timePeriod: THIS_WEEK_TEXT,
    color: COLOR_SUCCESS_GREEN,
  },
  {
    title: 0,
    desc: RANKING,
    timePeriod: THIS_WEEK_TEXT,
    color: COLOR_DANGER_RED,
  },
  {
    title: COMING_SOON,
    desc: TOTAL_EARNIGS,
    timePeriod: THIS_WEEK_TEXT,
    color: COLOR_DANGER_RED,
  },
];

export const initialCreditDetailsState = {
  creditAmount: 0,
  creditConsumed: 0,
  creditLimit: 0,
  isDealerPaymentDue: true,
  invoicingModel: "",
};
