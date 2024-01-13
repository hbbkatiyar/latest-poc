import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { getWebService } from "../helpers/server";
import { getRoute } from "../helpers/utils";

const useApi = (
  endpoint,
  params = {},
  isLocal = false,
  defaultValue = null
) => {
  const history = useHistory();
  const [result, setResult] = useState(defaultValue);

  useEffect(() => {
    fetchData();
  }, []);

  const interceptor = ({ data: { error, error_msg }, data }) => {
    if (error === "authorization") {
      history.push({
        pathname: "/",
      });
    } else {
      console.log(`error_msg = ${error_msg}`);
      // This has been handled gracefully
      window.location = getRoute("home");
    }
  };

  const fetchData = async () => {
    try {
      const response = await getWebService(endpoint);

      setResult(response.data.data);
    } catch (error) {
      interceptor(error.response.data);
    }
  };

  return result;
};

export default useApi;
