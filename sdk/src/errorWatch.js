import { reportError } from './report'

// // 重写console.error
// const oldError = console.error
// console.error = function(e) {
//   try {
//     throw new Error(e)
//   } catch(err) {
//     const stackT = err.stack.split('\n')[2]
//     let errObj = handleError(stackT);
//     if (!errObj) {
//       return false;
//     }
//     report({ msg: err.message, ...errObj, error: err.stack });
//   }
//   return oldError.apply(console, arguments)
// }
// // 重写Promise.reject
// const oldReject = Promise.reject
// Promise.reject = function(e) {
//   try {
//     throw new Error(e)
//   } catch(err) {
//     const stackT = err.stack.split('\n')[2]
//     let errObj = handleError(stackT);
//     if (!errObj) {
//       return false;
//     }
//     report({ msg: err.message, ...errObj, error: err.stack });
//   }
//   return () => oldReject.apply(Promise, arguments)
// }

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
    reportError(event.error, false);
  },
  true
);

// 对没有catch的reject进行监听
window.addEventListener('unhandledrejection', function(event) {
  event.preventDefault();
  const { type, reason } = event;
  reportError({ type, msg: reason }, false)
});

// 对vue进行上报
export function install(Vue) {
  Vue.config.errorHandler = function(err) {
    reportError(err, true);
  };
}

// 对react进行上报
export function ErrorRequest(React) {
  class Error extends React.Component {
    componentDidCatch(err) {
      reportError(err, true);
    }

    render() {
      return this.props.children;
    }
  }

  return Error;
}
