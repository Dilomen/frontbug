import { initRecord } from "./record";
import { loadScript, loadLink, isIE, isDiff } from "./utils";
import { getEventRecord } from "./record";

// 之后会设成可配置
const BASE_URL = "http://localhost:3090";
const frontbugConfig = {
  isFramework: true,
  isNeedRecord: true
};

if (frontbugConfig.isNeedRecord) {
  loadLink("https://cdn.jsdelivr.net/npm/rrweb@latest/dist/rrweb.min.css");
  loadScript(
    "https://cdn.jsdelivr.net/npm/rrweb@latest/dist/rrweb.min.js"
  ).then(() => {
    initRecord();
  });
}

const URL_GROUP = {
  error: BASE_URL + "/errorRequest",
  performance: BASE_URL + "/performance"
};

let _preError = null;
/**
 * 手动上报错误
 * @param {Object} err 错误对象
 * @param {Boolean} isFramework 是否是框架，即代码是否被编译
 */
export const reportError = async (
  error,
  isFramework = frontbugConfig.isFramework
) => {
  error.type = error.type || "default";
  let errorObjGroup = {
    unhandledrejection: { type: error.type, msg: error.reason },
    network: handleNetwork(error),
    default: handleError(error)
  };
  let errorObj = errorObjGroup[error.type];
  // 对同一个错误不进行重复发送
  if (_preError && !isDiff(errorObj, _preError)) {
    return;
  } else {
    _preError = errorObj;
  }
  const eventsRecord = frontbugConfig.isNeedRecord
    ? await getEventRecord()
    : [];
  errorObj = {
    ...errorObj,
    eventsRecord,
    url: window.location.href,
    framework: isFramework
  };
  setTimeout(async () => {
    report(URL_GROUP["error"], errorObj);
  }, 30);
};

function report(reportUrl, dataObj) {
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
      XHR = new window.ActiveXObject();
    }
    // XHR.withCredentials = true
    XHR.open("POST", reportUrl, true);
    XHR.setRequestHeader("Content-Type", "application/json; charset=utf-8");
    XHR.send(data);
  }
}

function handleError(error) {
  const msg = error.message;
  const errorStack = (error.stack && error.stack.split("\n")) || [];
  const pattern = window.location.origin;
  let errorStackPosition = errorStack.find(errorItem =>
    new RegExp(pattern).test(errorItem)
  );
  if (errorStackPosition) {
    let index = errorStackPosition.lastIndexOf("/");
    const [path, lineNoStr, columnNoStr] = errorStackPosition
      .substr(index + 1)
      .split(":");
    const lineNo = Number(lineNoStr.match(/\d+/)[0]);
    const columnNo = Number(columnNoStr.match(/\d+/)[0]);
    return { path, lineNo, columnNo, msg, error };
  }
  return false;
}

function handleNetwork(error) {
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
    msg: statusText,
    errorInfo: responseText,
    headers,
    method
  };
}
