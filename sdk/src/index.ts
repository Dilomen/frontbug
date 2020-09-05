import httpMonitor from './httpProxy/index'
import ProgramMonitor from "./pragram/errorMonitor"
import { initRecord } from "./record";
import { loadScript, loadLink } from "./utils";
import { VangenConfig } from './interface'
const defaultConfig = {
  BASE_URL: "http://localhost:3090",
  isFramework: true,
  isNeedRecord: true
}
function createMonitor(options:VangenConfig) {
  const lastConfig = Object.assign(defaultConfig, options)
  if (lastConfig.isNeedRecord) {
    loadLink("https://cdn.jsdelivr.net/npm/rrweb@latest/dist/rrweb.min.css");
    loadScript(
      "https://cdn.jsdelivr.net/npm/rrweb@latest/dist/rrweb.min.js"
    ).then(() => {
      initRecord();
    });
  }
  httpMonitor(lastConfig)
  const errorMonitor = new ProgramMonitor(lastConfig);
  const install = errorMonitor.vueErrorProxy();
  const ErrorWatch = errorMonitor.reactErrorProxy;
  return { install, ErrorWatch }
}


// export const URL_GROUP = {
//   error: BASE_URL + "/errorRequest",
//   performance: BASE_URL + "/performance"
// };
let Vangen: any = {}
Vangen.init = createMonitor

export default Vangen
