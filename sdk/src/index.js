import "./report";
import "@babel/polyfill";
import XMLHttpRequestProxy from './httpProxy/ajaxProxy.ts'
XMLHttpRequest = XMLHttpRequestProxy
import { ErrorRequest, install } from "./errorWatch"
export default { install }
export { ErrorRequest }
