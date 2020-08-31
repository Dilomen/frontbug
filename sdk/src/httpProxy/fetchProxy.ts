import { reportError } from "../report";

type errorObjConfig = {
  status: number | string;
  statusText: string;
  type: string;
  url: string;
  options?: object;
  method?: string;
  headers?: object;
};

const fetchProxy = window.fetch;
const fetchRequestProxy = (url: string, options: any = null) =>
  fetchProxy(url, options).then((res: any) => {
    const { status, statusText, url } = res;
    if (!/2\d{2}/.test(status)) {
      let errorObj: errorObjConfig = {
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
      reportError(errorObj);
    }
  });
window.fetch = fetchRequestProxy;
