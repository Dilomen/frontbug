import { NetworkError, VangenConfig } from "../interface";
import report from "../report";

export function reportNetworkError(
  error: NetworkError,
  options: VangenConfig
) {
  let errorObj = handleNetwork(error);
  errorObj = {
    ...errorObj,
    url: window.location.href,
    framework: options.isFramework || false
  };
  report(options.BASE_URL + "/errorRequest", errorObj);
}

function handleNetwork(error: NetworkError): NetworkError {
  const {
    type,
    status,
    responseURL,
    statusText,
    responseText,
    headers,
    method
  } = error;
  return {
    type,
    status,
    requestUrl: responseURL,
    message: statusText,
    errorInfo: responseText,
    headers,
    method
  }
}