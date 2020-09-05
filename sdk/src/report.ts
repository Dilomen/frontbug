import { isIE, isDiff } from "./utils";

let _preError: any = null;
function report(reportUrl: string, dataObj: object) {
  // 对同一个错误不进行重复发送
  if (_preError && !isDiff(dataObj, _preError)) {
    return;
  } else {
    _preError = dataObj;
  }
  const data = JSON.stringify(dataObj);
  if (window.navigator.sendBeacon) {
    window.navigator.sendBeacon(reportUrl + "FromBeacon", data);
    // IE的URL长度限制为2083，其余浏览器更大，支持最小且主流的Chrome长度限制为8182
  } else if (
    (isIE() && encodeURIComponent(data).length < 2083) ||
    (!isIE() && encodeURIComponent(data).length < 8182)
  ) {
    let image = new Image();
    image.src = reportUrl + "?error=" + encodeURIComponent(data);
  } else if (window.fetch) {
    fetch(reportUrl, {
      body: data,
      method: "POST",
      headers: {
        "content-type": "application/json; charset=utf-8"
      }
    });
  } else {
    let XHR = null;
    if (window.XMLHttpRequest) {
      XHR = new window.XMLHttpRequest();
    } else if (window.ActiveXObject) {
      XHR = new window.ActiveXObject("vangen");
    }
    // XHR.withCredentials = true
    XHR.open("POST", reportUrl, true);
    XHR.setRequestHeader("Content-Type", "application/json; charset=utf-8");
    XHR.send(data);
  }
}

export default report;
