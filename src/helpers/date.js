import queryString from "query-string";
import moment from "moment";
import {
  FORMAT_YYYY_MM_DD,
  FORMAT_YYYY_MM_DD_HMS,
} from "../constants/index";
import {
  CUSTOM_DATE_RANGE,
  START_TIME,
  END_TIME,
  TODAY,
  THIS_WEEK,
  THIS_MONTH,
  LAST_WEEK,
  LAST_MONTH,
  PREV_X_DAYS,
} from "../constants/index";

export const buildTodayDate = () => {
  return {
    start: moment(new Date()),
    end: getCurrentDate(),
  };
};

export const buildThisWeekDate = () => {
  return {
    start: moment().clone().startOf("isoweek"),
    end: moment().clone().startOf("isoweek").add(6, "days"),
  };
};

export const buildLastWeekDate = () => {
  return {
    start: moment().clone().startOf("isoweek").subtract(7, "days"),
    end: moment().clone().startOf("isoweek").subtract(1, "days"),
  };
};

export const buildThisMonthDate = () => {
  return {
    start: moment().clone().startOf("month"),
    end: moment().clone().startOf("month").add(1, "months").subtract(1, "days"),
  };
};

export const buildLastMonthDate = () => {
  return {
    start: moment().clone().subtract(1, "months").startOf("month"),
    end: moment()
      .clone()
      .subtract(1, "months")
      .startOf("month")
      .add(1, "months")
      .subtract(1, "days"),
  };
};

export const buildPreviousXDaysDate = (days = 6) => {
  return {
    start: moment(new Date()).subtract(days, "days"),
    end: getCurrentDate(),
  };
};

export const buildPreviousXMonthsDate = (months = 1) => {
  return {
    start: moment(new Date()).subtract(months, "months").add(1, "days"),
    end: getCurrentDate(),
  };
};

export const buildCustomDate = (startDate, endDate) => {
  return {
    start: moment(startDate),
    end: moment(endDate),
  };
};

export const buildDateFilter = (
  duration,
  startKey,
  endKey,
  startDate,
  endDate
) => {
  /* Today, This Week, This Month, All Time, and Custom. */
  let dates = null;

  switch (duration) {
    case TODAY:
      dates = buildTodayDate();
      break;

    case THIS_WEEK:
      dates = buildThisWeekDate();
      break;

    case THIS_MONTH:
      dates = buildThisMonthDate();
      break;

    case LAST_WEEK:
      dates = buildLastWeekDate();
      break;

    case LAST_MONTH:
      dates = buildLastMonthDate();
      break;

    case PREV_X_DAYS:
      dates = buildPreviousXDaysDate();
      break;

    case CUSTOM_DATE_RANGE:
      dates = buildCustomDate(startDate, endDate);
      break;

    default:
      dates = null;
      break;
  }

  return dates
    ? {
        [startKey]: moment(dates.start).format(
          `${FORMAT_YYYY_MM_DD} ${START_TIME}`
        ),
        [endKey]: moment(dates.end).format(`${FORMAT_YYYY_MM_DD} ${END_TIME}`),
      }
    : null;
};

export const buildDateFilterParams = (
  duration = "today",
  { startDate = "", endDate = "" },
  startKey = "createdAtStartDate",
  endKey = "createdAtEndDate"
) => {
  const filter = buildDateFilter(
    duration,
    startKey,
    endKey,
    startDate,
    endDate
  );

  return filter ? queryString.stringify(filter) : "";
};

export const buildStartEndDate = (selectedDate) => {
  return {
    startDate: moment(selectedDate[0]).format(FORMAT_YYYY_MM_DD),
    endDate: moment(selectedDate[1]).format(FORMAT_YYYY_MM_DD),
  };
};

export const convertDateTimeFormat = (value, format = FORMAT_YYYY_MM_DD_HMS) =>
  moment(value).format(format);

export const getCurrentDate = () => moment(new Date());

export const getDateOfBirthMinDate = () =>
  moment(new Date())
    .subtract(12 * 70, "months")
    .add(1, "days")
    .format(FORMAT_YYYY_MM_DD);

export const getDateOfBirthMaxDate = () =>
  moment(new Date())
    .subtract(3 * 1, "months")
    .format(FORMAT_YYYY_MM_DD);

export const isBeforeCurrentDate = (date) => moment(new Date()).isBefore(date);

export const getCurrentMonth = () => moment().format('M');

export const getCurrentYear = () => moment().format('YYYY');
