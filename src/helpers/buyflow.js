import moment from "moment";
import * as XLSX from "xlsx";
import {
  BUTTON_CONFIRM_AND_ISSUE_POLICY,
  DEALER_OTP_LENGTH,
  DOCUMENT_CDN_PATH,
  ERROR_MESSAGE_TEXT,
  EX_SHOWROOM_PRICE,
  FORMAT_DOB,
  FORMAT_YYYY_MM_DD,
  GST_PERCENTAGE,
  PAYMENT_FAILED_MESSAGE,
  PROPOSAL_STATUS_DRAFT,
  PROPOSAL_STATUS_INITIATED,
  QUOTES_LIST,
  THIS_MONTH_TEXT,
  THIS_WEEK_TEXT,
  THIS_YEAR_TEXT,
  USER,
  USER_DETAILS,
} from "../constants";
import {
  FIELDS_HAVING_ALPHABET_AND_SPACE_ONLY,
  FIXED_LENGTH_FIELDS,
  ONLY_ALPHA_NUMERIC_FIELDS,
  ONLY_ALPHA_NUMERIC_SPACE_FIELDS,
  ONLY_DIGIT_FIELDS,
} from "../constants/field";
import { getStorageItem } from "./utils";
import { Utils } from "../constants/utils";
import { sectionTitle } from "../mapping";
import { validations } from "../messages/validation";

export const buildSystemErrorMessage = () => {
  return {
    data: {
      error_msg:
        "It looks like something went wrong. Please try again in a while.",
    },
  };
};

export const getMinDobDate = (years = 99) =>
  moment(moment(new Date()).subtract(years, "years").add(1, "days")).format(
    FORMAT_YYYY_MM_DD
  );

export const getMaxDobDate = (years = 18) =>
  moment(moment(new Date()).subtract(years, "years").add(1, "days")).format(
    FORMAT_YYYY_MM_DD
  );

export const getSectionTitle = (str) =>
  sectionTitle[removeTrailingBackslash(removeDigits(str))];

export const getUniqueListBy = (list, key) => {
  return [...new Map(list.map((item) => [item[key], item])).values()];
};

export const isOnlyAlphaNumericField = (fieldName) =>
  ONLY_ALPHA_NUMERIC_FIELDS.indexOf(fieldName) > -1;

export const isOnlyAlphaNumericSpaceField = (fieldName) =>
  ONLY_ALPHA_NUMERIC_SPACE_FIELDS.indexOf(fieldName) > -1;

export const isOnlyDigitField = (fieldName) =>
  ONLY_DIGIT_FIELDS.indexOf(fieldName) > -1;

export const isFixedLengthField = (fieldName) =>
  FIXED_LENGTH_FIELDS.indexOf(fieldName) > -1;

export const isValidDate = (dateString) =>
  moment(dateString, FORMAT_YYYY_MM_DD, true).isValid() === true;

export const sleep = (m) => new Promise((r) => setTimeout(r, m));

export const renderFieldTitleByValue = (list = [], value) => {
  let title = "",
    isFound = false;

  list.forEach((item) => {
    if (!isFound && item.value === value) {
      title = item.title;
      isFound = true;
    }
  });

  return title;
};

export const removeDigits = (str) => str.replace(/[0-9]/g, "");

export const removeTrailingBackslash = (str) => str.replace(/\/$/, "");

export const syncDateFormat = (
  dob = null,
  currentFormat = FORMAT_DOB,
  newFormat = FORMAT_YYYY_MM_DD
) => {
  if (!dob) {
    return dob;
  }

  return moment(dob, currentFormat).format(newFormat);
};

export const validateInputLength = (event) => {
  const elName = event.target.name;
  let elValue = event.target.value;

  if (FIELDS_HAVING_ALPHABET_AND_SPACE_ONLY.indexOf(elName) > -1) {
    elValue = elValue.replace(/(\s{2,})|[^a-zA-Z']/g, " ");
    elValue = elValue.replace(/^\s*/, "");
    event.target.value = elValue;
  }

  if (isOnlyDigitField(elName)) {
    event.target.value = elValue.replace(/[^0-9]+/g, "");
  }

  if (isOnlyAlphaNumericField(elName)) {
    event.target.value = elValue.replace(/[^0-9A-Za-z]+/g, "").toUpperCase();
  }

  if (isOnlyAlphaNumericSpaceField(elName)) {
    event.target.value = elValue.replace(/[^0-9A-Za-z\s]+/g, "").toUpperCase();
  }

  if (elValue.length > Utils.limit.digits[elName]) {
    event.target.value = elValue.substring(0, Utils.limit.digits[elName]);
  }
};

export const toSentenceCase = (string) =>
  string.charAt(0).toUpperCase() + string.slice(1);

export const toTitleCase = (str) => {
  return str
    .replaceAll("_", " ")
    .toLowerCase()
    .replace(/\b\w/g, (s) => s.toUpperCase());
};
/* End: Lending Proposal Section */
