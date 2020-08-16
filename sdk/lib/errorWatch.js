import { getEventRecord } from './record'
import { report } from './report'

// 重写console.error
const oldError = console.error
console.error = function(e) {
  try {
    throw new Error(e)
  } catch(err) {
    const stackT = err.stack.split('\n')[2]
    let errObj = handleError(stackT);
    if (!errObj) {
      return false;
    }
    report({ msg: err.message, ...errObj, error: err.stack });
  }
  return oldError.apply(console, arguments)
}
// 重写Promise.reject
const oldReject = Promise.reject
Promise.reject = function(e) {
  try {
    throw new Error(e)
  } catch(err) {
    const stackT = err.stack.split('\n')[2]
    let errObj = handleError(stackT);
    if (!errObj) {
      return false;
    }
    report({ msg: err.message, ...errObj, error: err.stack });
  }
  return () => oldReject.apply(Promise, arguments)
}

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

// 对没有catch的reject进行监听
window.addEventListener('unhandledrejection', function(event) {
  event.preventDefault();
  const { type, reason } = event;
  report({ type, msg: reason })
});

// 对vue进行上报
export function install(Vue) {
  Vue.config.errorHandler = function(err) {
    reportError(err);
  };
}
// 对react进行上报
export function ErrorRequest(React) {
  class Error extends React.Component {
    componentDidCatch(err) {
      reportError(err);
    }

    render() {
      return this.props.children;
    }
  }

  return Error;
}

async function reportError(err) {
  const error = err.stack;
  const msg = err.toString();
  const errorStackTop = !!error && error.split('\n')[1];
  let errObj = handleError(errorStackTop);
  if (!errObj) {
    return false;
  }
  const eventsRecord = await getEventRecord()
  const formData = {
    ...errObj,
    msg,
    url: window.location.href,
    framework: true,
    eventsRecord,
    error
  };
  report(formData)
}

function handleError(errorStackLine) {
  if (errorStackLine) {
    let index = errorStackLine.lastIndexOf('/');
    const [path, lineNoStr, columnNoStr] = errorStackLine
      .substr(index + 1)
      .split(':');
    const lineNo = Number(lineNoStr.match(/\d+/)[0]);
    const columnNo = Number(columnNoStr.match(/\d+/)[0]);
    return { path, lineNo, columnNo };
  }
  return false;
}
