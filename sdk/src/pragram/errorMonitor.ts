import { ProgramError, VangenConfig } from "../interface";
import rrwebControl from "../record";
import report from "../report";

type reportError = (
  error: ProgramError,
  isFramework: boolean,
  options: VangenConfig
) => void;

let _options:VangenConfig = {}

interface ErrorMonitorConfig {
  creatcErrorFactory: () => void;
  vueErrorProxy: (Vue: any) => void;
}
class ErrorMonitor implements ErrorMonitorConfig {
  constructor() {
    this.creatcErrorFactory();
  }
  initConfig(options: VangenConfig) {
    _options = {
      ...options,
      reportErrorUrl: options.BASE_URL + "/errorRequest"
    };
  }
  creatcErrorFactory() {
    window.addEventListener(
      "error",
      (event: any) => {
        reportError(
          event.error,
          (_options || {}).isFramework || false,
          _options || {}
        );
      },
      true
    );
    window.addEventListener("unhandledrejection", function(event: any) {
      event.preventDefault();
      const { type, reason } = event;
      reportError(
        { type, message: reason },
        (_options || {}).isFramework || false,
        _options || {}
      );
    });
  }
  vueErrorProxy(Vue: any) {
    Vue.config.errorHandler = function(err: Event) {
      reportError(err, true, _options);
    };
  }
  reactErrorProxy(React: any) {
    return class Error extends React.Component {
      componentDidCatch(err: Event) {
        reportError(err, true, _options);
      }

      render() {
        return this.props.children;
      }
    };
  }
}

/**
 * 手动上报错误
 * @param {Object} err 错误对象
 * @param {Boolean} isFramework 是否是框架，即代码是否被编译
 */
async function reportError<reactErrorProxy>(
  error: ProgramError,
  isFramework: boolean,
  options: VangenConfig
) {
  let errorObj: any =
    error.type === "unhandledrejection"
      ? { type: error.type, msg: error.reason }
      : handleError(error);
  const eventsRecord: any = options.isNeedRecord ? await rrwebControl.getEventRecord() : [];
  errorObj = {
    ...errorObj,
    eventsRecord,
    url: window.location.href,
    framework: isFramework
  };
  report(options.reportErrorUrl || "", errorObj);
}
function handleError(error: ProgramError) {
  const msg = error.message;
  const errorStack = (error.stack && error.stack.split("\n")) || [];
  const pattern = window.location.origin;
  const errorStackPosition:
    | string
    | undefined = errorStack.find((errorItem: string) =>
    new RegExp(pattern).test(errorItem)
  );
  if (errorStackPosition) {
    let index = errorStackPosition.lastIndexOf("/");
    const [
      path,
      lineNoStr = "",
      columnNoStr = ""
    ]: string[] = errorStackPosition.substr(index + 1).split(":");
    const lineNo: number = Number((lineNoStr.match(/\d+/) || [])[0]);
    const columnNo: number = Number((columnNoStr.match(/\d+/) || [])[0]);
    return { path, lineNo, columnNo, msg, error };
  }
  return false;
}

const errorMonitor = new ErrorMonitor();
const install = errorMonitor.vueErrorProxy;
const ErrorWatch = errorMonitor.reactErrorProxy;
export default errorMonitor;
export { install, ErrorWatch, reportError };
