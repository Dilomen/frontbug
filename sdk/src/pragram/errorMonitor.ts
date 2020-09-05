import { ProgramError, VangenConfig } from "../interface";
import { getEventRecord } from "../record";
import report from "../report";

interface ErrorMonitorConfig {
  creatcErrorFactory: () => void;
  vueErrorProxy: () => Function;
  reactErrorProxy: (React: any) => Function;
  reportError: (
    error: ProgramError,
    isFramework: boolean,
    options: VangenConfig
  ) => void;
}
class ErrorMonitor implements ErrorMonitorConfig {
  private isFramework: boolean;
  private readonly reportErrorUrl: string;
  private _options: VangenConfig;
  constructor(options: VangenConfig) {
    this.creatcErrorFactory();
    this._options = options;
    this.isFramework = options.isFramework;
    this.reportErrorUrl = options.BASE_URL + "/errorRequest";
  }
  creatcErrorFactory() {
    let _self = this;
    // window.onerror = (
    //   message: any,
    //   path?: string,
    //   lineNo?: number,
    //   columnNo?: number,
    //   error?: Error
    // ): any => {
    //   _self.reportError(
    //     { message, path, lineNo, columnNo, error },
    //     false,
    //     _self._options
    //   );
    // };
    window.addEventListener(
      "error",
      (event: any) => {
        _self.reportError(event.error, false, _self._options);
      },
      true
    );
    window.addEventListener("unhandledrejection", function(event: any) {
      event.preventDefault();
      const { type, reason } = event;
      _self.reportError({ type, message: reason }, false, _self._options);
    });
  }
  vueErrorProxy() {
    return function install(Vue: any) {
      Vue.config.errorHandler = function(err: Event) {
        this.reportError(err, true, this._options);
      };
    };
  }
  reactErrorProxy(React: any) {
    return class Error extends React.Component {
      componentDidCatch(err: Event) {
        this.reportError(err, true, this._options);
      }

      render() {
        return this.props.children;
      }
    };
  }
  /**
   * 手动上报错误
   * @param {Object} err 错误对象
   * @param {Boolean} isFramework 是否是框架，即代码是否被编译
   */
  async reportError(
    error: ProgramError,
    isFramework: boolean = this.isFramework,
    options: VangenConfig
  ) {
    let errorObj: any =
      error.type === "unhandledrejection"
        ? { type: error.type, msg: error.reason }
        : this._handleError(error);
    const eventsRecord: any = options.isNeedRecord
      ? await getEventRecord()
      : [];
    errorObj = {
      ...errorObj,
      eventsRecord,
      url: window.location.href,
      framework: isFramework
    };
    report(this.reportErrorUrl, errorObj);
  }
  private _handleError(error: ProgramError) {
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
}

export default ErrorMonitor;
