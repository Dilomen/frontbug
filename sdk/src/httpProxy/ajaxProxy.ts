import { reportNetworkError } from "./handleError";
import { VangenConfig } from '../interface'
interface XMLConfig {
  open: (
    method: string,
    url: string,
    async?: boolean,
    user?: string,
    password?: string
  ) => void;
  send: (body?: ArrayBuffer | Document | string) => void;
  setRequestHeader: (header: string, value: string) => void;
  [propName: string]: any;
}

const assignmentsFn: string[] = [
  "onload",
  "onreadystatechange",
  "onloadstart",
  "onloadend",
  "onprogress",
  "onerror",
  "onabort"
];


const oXMLHttpRequest: any = window.XMLHttpRequest;

class XMLHttpRequestProxy implements XMLConfig {
  private _headers: any;
  private _coverAttr: XMLConfig;
  private _xmlRequest: XMLConfig;
  private method: string;
  private readyState: number;
  private type: "network";
  private status: any;
  static _options: VangenConfig
  constructor() {
    this._xmlRequest = new oXMLHttpRequest();
    this._headers = {};
    this.method = "get";
    this.readyState = 0;
    this.type = "network";
    this.status = 0;
    this._coverAttr = {
      open: this.open,
      send: this.send,
      setRequestHeader: this.setRequestHeader
    };
    this.initCover();
  }
  private initCover() {
    for (const key in this._xmlRequest) {
      const isCoverAttr = this._coverAttr.hasOwnProperty(key);
      Object.defineProperty(this, key, {
        get: () => (isCoverAttr ? this._coverAttr[key] : this._xmlRequest[key]),
        set: newValue => {
          if (assignmentsFn.includes(key)) {
            this._xmlRequest[key] = newValue;
          } else {
            isCoverAttr ? this._coverAttr[key] : this._xmlRequest[key];
          }
        }
      });
    }
  }
  public open(method: string, url: string, ...args: any[]) {
    this.method = method;
    this._xmlRequest.open(method, url, ...args);
  }
  public send(data?: any) {
    if (!data) data = null;
    this._xmlRequest.send(data);
    if (this.readyState === 4 && !/2\d{2}/.test(this.status)) {
      reportNetworkError(this, XMLHttpRequestProxy._options);
    }
  }
  public setRequestHeader(header: string, value: string) {
    this._headers[header] = value;
    this._xmlRequest.setRequestHeader(header, value);
  }
}

window.XMLHttpRequest = XMLHttpRequestProxy;

function initXMLHttpRequest(options:VangenConfig) {
  XMLHttpRequestProxy._options = options
}

export default initXMLHttpRequest;
