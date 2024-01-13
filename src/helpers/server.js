import axios from "axios";
import { logout } from "../helpers/utils";
import { AUTHORIZATION } from "../constants";

const cbError = (err) => {
  if (err && err.response && err.response.data) {
    const {
      data: { error },
    } = err.response.data;

    if (error === AUTHORIZATION) {
      logout();
      window.location.href = "/";
    }
  }
};

const getApiUrl = (url) =>
  url.indexOf("localhost") > -1 || url.indexOf(".json") > -1
    ? `${url}`
    : `${process.env.REACT_APP_API_EP}${url}`;

const getRequestHeaders = () => {
  const token = localStorage.getItem("token");

  return token
    ? {
        Authorization: `Bearer ${token}`,
      }
    : {};
};

export const deleteWebService = async (
  url,
  payload,
  headers = getRequestHeaders()
) => {
  return await axios({
    url: getApiUrl(url),
    data: payload,
    method: "delete",
    headers: headers,
  });
};

export const getWebService = async (url, headers = getRequestHeaders()) => {
  try {
    return await axios({
      url: getApiUrl(url),
      method: "get",
      headers: headers,
    });
  } catch (err) {
    cbError(err);
  }
};

export const patchWebService = async (
  url,
  payload,
  headers = getRequestHeaders()
) => {
  return await axios({
    url: getApiUrl(url),
    data: payload,
    method: "patch",
    headers: headers,
  });
};

export const postWebService = async (
  url,
  payload = {},
  headers = getRequestHeaders()
) => {
  return await axios({
    url: getApiUrl(url),
    data: payload,
    method: "post",
    headers: headers,
  });
};

export const putWebService = async (
  url,
  payload,
  headers = getRequestHeaders()
) => {
  return await axios({
    url: getApiUrl(url),
    data: payload,
    method: "put",
    headers: headers,
  });
};
