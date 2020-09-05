import { reportNetworkError } from "./handleError";
import { NetworkError, VangenConfig } from "../interface";

const fetchProxy = window.fetch;
const fetchRequestProxy: any = (url: string, options: any = null) =>
  fetchProxy(url, options).then((res: any) => {
    const { status, statusText, url } = res;
    if (!/2\d{2}/.test(status)) {
      let errorObj: NetworkError = {
        status,
        statusText,
        type: "network",
        url,
        method: "get",
        headers: {}
      };
      if (options) {
        let headers: any = {};
        options.headers.keys((key: string) => {
          headers[key] = options.headers.get(key);
        });
        errorObj = {
          ...errorObj,
          method: options.method,
          headers
        };
      }
      reportNetworkError(errorObj, fetchRequestProxy._config);
    }
  });

function createFetchRequest(config: VangenConfig) {
  fetchRequestProxy._config = config;
  return fetchRequestProxy
}
export default createFetchRequest;
