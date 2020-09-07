import initXMLHttpRequest from "./ajaxProxy";
import initFetch from "./fetchProxy";
import { VangenConfig } from "../interface";

function initHttpProxy(options:VangenConfig) {
  initXMLHttpRequest(options);
  window.fetch = initFetch(options);
}

export default initHttpProxy