import initXMLHttpRequest from "./ajaxProxy";
import initFetch from "./fetchProxy";

function initHttpProxy(options) {
  window.XMLHttpRequest = initXMLHttpRequest(options);
  window.fetch = initFetch(options);
}

export default initHttpProxy