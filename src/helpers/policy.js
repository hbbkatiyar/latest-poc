import moment from "moment";
import queryString from "query-string";
import { CUSTOM_DATE_RANGE } from "../constants/index";
import {
  PAYMENT_CAPTURED,
  POLICY_CANCELLED,
  POLICY_CANCELLATION_INITIATED,
  POLICY_CREATED,
  POLICY_CREATION_FAILED,
  POLICY_DETAILS_AWAITED,
  POLICY_DOCUMENTS_PENDING,
  POLICY_NEED_INSURED_REVIEW,
  POLICY_ON_HOLD,
  POLICY_STATUS_FAILED,
  POLICY_STATUS_SUCCESS,
  QUOTATION_CREATED,
  QUOTATION_STATUS_CREATED,
} from "../constants/status";
import { renderClaimStatus } from "./utils";

export const buildDefaultPolicyStatusList = () => [];

export const buildPolicyStatusList = () => {
  return [
    { key: 27, cat: POLICY_CANCELLED },
    { key: 26, cat: POLICY_CANCELLATION_INITIATED },
    { key: 21, cat: POLICY_CREATED },
    { key: 5, cat: PAYMENT_CAPTURED },
    { key: 1, cat: QUOTATION_CREATED },
  ];
};

export const buildStatusFilterParams = (selectedStatus) => {
  const policyStatusList = buildPolicyStatusList();
  let statuses = [];

  if (
    selectedStatus.length &&
    selectedStatus.length !== policyStatusList.length
  ) {
    selectedStatus.map((item) => statuses.push(item.key));
  }

  return statuses.length
    ? queryString.stringify({ status_id: statuses.toString() })
    : "";
};

export const getCurrentDate = (format = "YYYY-MM-DD") => {
  return moment(new Date()).format(format);
};

export const getDateAfterMonths = (startDate, months = 12) => {
  const endDate = moment(startDate)
    .add(months, "month")
    .subtract(1, "days")
    .format("YYYY-MM-DD");
  const currentDate = getCurrentDate();

  return endDate && moment(endDate).isSameOrBefore(currentDate)
    ? endDate
    : currentDate;
};

export const getDefaultCustomDate = () => {
  const dateFrom = new Date(
    moment().subtract(1, "months").startOf("month").format("MM/DD/YYYY")
  );
  const dateTo = new Date();

  return [dateFrom, dateTo];
};

export const getFilterEndDate = (startDate) => {
  if (!startDate) {
    return "";
  }

  return getDateAfterMonths(startDate);
};

export const getFilterMaxEndDate = (startDate = "") => {
  if (!startDate) {
    return getCurrentDate();
  }

  return getDateAfterMonths(startDate);
};

export const isDurationCustomDateRange = (duration) =>
  duration === CUSTOM_DATE_RANGE;

export const isArrayContainsAllNonNullable = (array) => {
  let isNonNullable = true;

  array.forEach((value) => {
    isNonNullable = isNonNullable && (value ? true : false);
  });

  return isNonNullable;
};

export const policyStatusContainerMinHeight = (selectedStatus) => {
  return 300 - selectedStatus.length * 60;
};

export const isPolicyIssued = (status) => POLICY_CREATED === status;

export const isPolicyCreationFailed = (status) =>
  POLICY_CREATION_FAILED === status;

export const isPolicyCancellationInitiated = (status) =>
  POLICY_CANCELLATION_INITIATED === status;

export const isPolicyCancelled = (status) => POLICY_CANCELLED === status;

export const isQuotationCreated = (status) => QUOTATION_CREATED === status;

export const isPolicyDetailsAwaited = (status) =>
  POLICY_DETAILS_AWAITED === status;

export const isPolicyDocumentsPending = (status) =>
  POLICY_DOCUMENTS_PENDING === status;

export const isPaymentCaptured = (status) => PAYMENT_CAPTURED === status;

export const isPolicyOnHold = (status) => POLICY_ON_HOLD === status;

export const isPolicyNeedInsuredReview = (status) =>
  POLICY_NEED_INSURED_REVIEW === status;

export const isStatusQuotationCreated = (status_id) =>
  status_id === QUOTATION_STATUS_CREATED;

export const isStatusPolicyCreationFailed = (status_id) =>
  status_id === POLICY_STATUS_FAILED;

export const isStatusPolicyCreated = (status_id) =>
  status_id === POLICY_STATUS_SUCCESS;

export const renderCustomDateRangeText = (selectedDate) => {
  return isArrayContainsAllNonNullable(selectedDate)
    ? `${moment(selectedDate[0]).format("DD MMM, YYYY")} - ${moment(
        selectedDate[1]
      ).format("DD MMM, YYYY")}`
    : "Custom Date Range";
};

export const buildClaimsListToExport = (data) => {
  const shallowCopy = JSON.parse(JSON.stringify(data));
  const list = [];

  shallowCopy.forEach((item) => {
    list.push({
      "Claim ID": item?.id,
      "Customer Name": item?.name,
      "Product Name": item?.product,
      "Claimed Amount": `₹${item?.claimed_amount}`,
      "Approved Amount": item?.approved_amount ? `₹${item?.approved_amount}` : '-',
      "Claim Date": item?.created_at ? moment(item?.created_at).format("DD/MM/YYYY") : '',
      "Claim Status": item?.active ? renderClaimStatus(item?.active) : "",
    })
  });

  return list;
};
