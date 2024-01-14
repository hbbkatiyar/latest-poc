import moment from "moment";
import { Utils } from "../constants/utils";
import { routes } from "../mapping";
import { CLAIM_STATUS_MAPPING, CLAIM_STATUS_IN_PROGRESS } from "../constants/index";

/* Start Storage Methods */
export const getStorageItem = (key) => {
  var now = Date.now(),
    expiresIn = localStorage.getItem(key + "_expiresIn");

  if (expiresIn === undefined || expiresIn === null) {
    expiresIn = 0;
  }

  if (expiresIn < now) {
    // Expired
    removeStorageItem(key);
    return null;
  } else {
    try {
      var value = localStorage.getItem(key);
      return value;
    } catch (e) {
      console.log(
        "getStorage: Error reading key [" +
          key +
          "] from localStorage: " +
          JSON.stringify(e)
      );
      return null;
    }
  }
};

export const setStorageItem = (key, value, expires = null) => {
  if (expires === undefined || expires === null) {
    expires = 365 * 24 * 60 * 60; // default: seconds for 1 year
  } else {
    expires = Math.abs(1000 * expires);
  }

  var now = Date.now(),
    schedule = now + expires * 1000;

  try {
    localStorage.setItem(key, value);
    localStorage.setItem(key + "_expiresIn", schedule);
  } catch (e) {
    console.log(
      "setStorage: Error setting key [" +
        key +
        "] in localStorage: " +
        JSON.stringify(e)
    );
    return false;
  }
  return true;
};

export const removeStorageItem = (key) => {
  try {
    localStorage.removeItem(key);
    localStorage.removeItem(key + "_expiresIn");
  } catch (e) {
    console.log(
      "removeStorage: Error removing key [" +
        key +
        "] from localStorage: " +
        JSON.stringify(e)
    );
    return false;
  }
  return true;
};

export const removeAllStorageItem = (list) => {
  for (let i of list) {
    removeStorageItem(i);
  }
};
/* End Storage Methods */

export const navigateToUrl = (url, history) => {
  history.push({
    pathname: url,
  });
};

export const redirectWithBlank = (url) => {
  var a = document.createElement("a");
  if (!detectMob()) {
    a.target = "_blank";
  }
  a.href = url;
  a.click();
};

export const buildInitiateRazorpay = (
  entity,
  entity_id,
  is_monthly = false
) => {
  return {
    entity,
    entity_id,
    is_monthly,
  };
};

export const buildSystemErrorMessage = () => {
  return {
    data: {
      error_msg:
        "It looks like something went wrong. Please try again in a while.",
    },
  };
};

export const capitalize = (word) =>
  word[0].toUpperCase() + word.slice(1).toLowerCase();

export const convertDateToString = ({ date }) =>
  moment(date).format("YYYY-MM-DD");

export const convertDateToTime = ({ date }) => moment(date).format("HH:mm");

export const detectMob = () => {
  let match = window.matchMedia || window.msMatchMedia;
  if (match) {
    let mq = match("(pointer:coarse)");
    return mq.matches;
  }
  return false;
};

export const detectMobile = () =>
  /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

export const extractFirstName = (name) => {
  if (!name) {
    return name;
  }

  return capitalize(name.split(" ")[0]);
};

export const getRoute = (reference) => routes[reference];

export const getQueryStringParameterValue = (keyName) =>
  new URLSearchParams(window.location.search).get(keyName);

export const isAgentPortalHeaderVisible = (pathname) => {
  return true;
  // Since login section is without header, dashbaord and polices section have some different inline header
  return !(
    pathname === getRoute("home") ||
    pathname === getRoute("dashboard") ||
    pathname === getRoute("policies") ||
    pathname === getRoute("product") ||
    pathname.indexOf("buy") > -1 ||
    pathname === getRoute("support") ||
    pathname.indexOf("review") > -1 ||
    pathname.indexOf("success") > -1
  );
};

export const linkClickHandler = (keyname, history) => {
  Utils.redirectionUsingReactRouter.sections.indexOf(keyname) >= 0
    ? navigateToUrl(Utils.links[keyname], history)
    : redirectWithBlank(Utils.links[keyname]);
};

export const logout = () => localStorage.clear();

export const parseBool = (str) => {
  if (str === null) return false;

  if (typeof str === "boolean") {
    return str === true;
  }

  if (typeof str === "string") {
    if (str === "") return false;

    str = str.replace(/^\s+|\s+$/g, "");
    if (str.toLowerCase() === "true" || str.toLowerCase() === "yes")
      return true;

    str = str.replace(/,/g, ".");
    str = str.replace(/^\s*\-\s*/g, "-");
  }

  if (!isNaN(str)) return parseFloat(str) !== 0;

  return false;
};

export const parseMessage = (message) => {
  if (typeof message === "string") {
    return message;
  } else if (Array.isArray(message) && message.length) {
    let errors = [];

    const output = message.map((item) => [...errors, item.msg]);

    return output.join(", ");
  } else {
    let errors = [];

    for (const [key, value] of Object.entries(message)) {
      errors.push(value);
    }

    return errors;
  }
};

export const redirectWithImage = (url) => {
  let data = `${url}`;
  let w = window.open("about:blank");
  let image = new Image();
  image.src = data;
  setTimeout(function () {
    w.document.write(image.outerHTML);
  }, 0);
};

export const renderOTPTimer = (totalSeconds) => {
  totalSeconds %= 3600;

  let minutes = Math.floor(totalSeconds / 60);
  let seconds = totalSeconds % 60;

  // If you want strings with leading zeroes:
  minutes = String(minutes).padStart(2, "0");
  seconds = String(seconds).padStart(2, "0");

  return `${minutes} : ${seconds}`;
};

export const scrollTo = (id) => {
  const section = document.querySelector(`#${id}`);
  section.scrollIntoView({ behavior: "smooth", block: "center" });
};

export const scrollTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

export const toObject = (fields, value = "") => {
  const object = {};

  fields.forEach((field) => (object[field] = value));

  return object;
};

export const truncateString = (word = "") => {
  try {
    return word.length > 30 ? `${word.substring(0, 27)}...` : word;
  } catch (err) {
    return word;
  }
};
