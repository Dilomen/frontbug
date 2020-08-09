import { initRecord, getEventRecord } from './record'
import { loadScript, loadLink } from './utils';
loadLink('https://cdn.jsdelivr.net/npm/rrweb@latest/dist/rrweb.min.css');
loadScript('https://cdn.jsdelivr.net/npm/rrweb@latest/dist/rrweb.min.js').then(() => {
  initRecord()
});
const errorUrl = 'http://localhost:3090/errorRequest';
// 即时上报:主要是一些严重的问题，导致流程无法正常进行

// 之后会设成可配置
const frontbugConfig = {
  isFramework: true,
};

/**
 * 手动上报
 * @param {*} err 错误对象
 * @param {*} isFramework 是否是框架，即代码是否被编译
 */
export const report = async (err, isFramework = frontbugConfig.isFramework) => {
  let errObj = handleError(err);
  if (!errObj) {
    return false;
  }
  const eventsRecord = await getEventRecord()
  const formData = {
    ...errObj,
    url: window.location.href,
    framework: err.framework || isFramework,
    eventsRecord
  };
  const data = JSON.stringify(formData);
  if (window.navigator.sendBeacon) {
    window.navigator.sendBeacon(errorUrl + 'FromBeacon', data)
    // IE的URL长度限制为2083，其余浏览器更大，支持最小且主流的Chrome长度限制为8182
  } else if ((isIE && e.length < 2083) || (!isIE && e.length < 8182)) {
    let image = new Image()
    image.src = errorUrl + '?' + encodeURIComponent(JSON.stringify(data))
  } else if(window.fetch) {
    fetch(errorUrl, {
      body: data,
      method: 'POST',
      headers: {
        'content-type': 'application/json; charset=utf-8',
      },
    });
  } else {
    let XHR = null
    if (window.XMLHttpRequest) {
      XHR = new XMLHttpRequest()
    }
    XHR.withCredentials = true
    XHR.open('POST', errorUrl, false)
    XHR.setRequestHeader('Content-Type', 'application/json; charset=utf-8')
    XHR.send(data)
  }
};

// window.onerror = function(msg, path, lineNo, columnNo, error) {
//   const errorObj = {
//     msg,
//     path,
//     lineNo,
//     columnNo,
//     error,
//     framework: '',
//   };
//   report(errorObj)
// };

window.addEventListener(
  'error',
  (event) => {
    const {
      message: msg,
      filename: path,
      lineno: lineNo,
      colno: columnNo,
      error,
    } = event;
    const errorObj = {
      msg,
      path,
      lineNo,
      columnNo,
      error,
      framework: false,
    };
    report(errorObj);
  },
  true
);

function handleError(err) {
  const error = err.stack;
  const msg = err.toString();
  const errorStackTop = !!error && error.split('\n')[1];
  if (errorStackTop) {
    let index = errorStackTop.lastIndexOf('/');
    const [path, lineNoStr, columnNoStr] = errorStackTop
      .substr(index + 1)
      .split(':');
    const lineNo = Number(lineNoStr.match(/\d+/)[0]);
    const columnNo = Number(columnNoStr.match(/\d+/)[0]);
    return { msg, path, lineNo, columnNo, error };
  }
  return false;
}

// window.addEventListener('unhandledrejection', function(event) {
//   console.log('unhandledrejection', event);
//   event.preventDefault();
//   const { type, reason } = event;
//   // report({ type: event.type,reason: event.reason })
// });

function install(Vue) {
  Vue.config.errorHandler = function(err) {
    console.log(err)
    report(err, true);
  };
}

export function ErrorRequest(React) {
  class Error extends React.Component {
    componentDidCatch(err) {
      report(err, true);
    }

    render() {
      return this.props.children;
    }
  }

  return Error;
}
export default { install };
