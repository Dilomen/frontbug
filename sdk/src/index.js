import "./report";
import "@babel/polyfill";
import XMLHttpRequestProxy from './httpProxy/ajaxProxy.ts'
import './httpProxy/fetchProxy.ts'
XMLHttpRequest = XMLHttpRequestProxy
import { ErrorRequest, install } from "./errorWatch"
export default { install }
export { ErrorRequest }
