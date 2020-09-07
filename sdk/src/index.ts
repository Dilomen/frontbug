import httpMonitor from "./httpProxy/index";
import errorMonitor, {
  install,
  ErrorWatch,
  reportError as _reportError
} from "./pragram/errorMonitor";
import rrwebControl from "./record";
import { VangenConfig, ProgramError } from "./interface";
const defaultConfig = {
  isFramework: true,
  isNeedRecord: true,

};
function createMonitor(options: VangenConfig) {
  const vangenConfig = Object.assign(defaultConfig, options);
  errorMonitor.initConfig(vangenConfig);
  if (!vangenConfig.BASE_URL) {
    throw new Error("Vangen Error: 请设置BASE_URL");
  }
  if (vangenConfig.isNeedRecord) {
    rrwebControl.instance(vangenConfig.RRWEB_COUNT);
  }
  httpMonitor(vangenConfig);
  const reportError = (error: ProgramError) =>
    _reportError(error, vangenConfig.isFramework, vangenConfig);
  return { install, ErrorWatch, reportError };
}

let Vangen: any = {};
Vangen.init = createMonitor;
export default Vangen;
