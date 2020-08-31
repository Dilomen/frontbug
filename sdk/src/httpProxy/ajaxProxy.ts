import { reportError } from "../report";

type XMLConfig = {
  open: (method:string, url:string, async?:boolean, user?:string, password?:string) => void,
  send: (body?:FormData | Blob | ArrayBuffer | Document) => void,
  setRequestHeader: (header: string, value: string) => void
  [propName: string]: any;
};

const oXMLHttpRequest: any = window.XMLHttpRequest;
class XMLHttpRequestProxy implements XMLConfig {
  private _headers: any;
  private _coverAttr: XMLConfig;
  private _xmlRequest: XMLConfig;
  private method: string;
  private readyState: number
  private type: 'network'
  private status: any
  constructor() {
    this._xmlRequest = new oXMLHttpRequest();
    this._headers = {};
    this.method = "get";
    this.readyState = 0
    this.type = "network";
    this.status = 0
    this._coverAttr = {
      open: this.open,
      send: this.send,
      setRequestHeader: this.setRequestHeader
    };
    this.initCover();
  }
  initCover() {
    for (const key in this._xmlRequest) {
      const isCoverAttr = this._coverAttr.hasOwnProperty(key);
      Object.defineProperty(this, key, {
        get: () => (isCoverAttr ? this._coverAttr[key] : this._xmlRequest[key]),
        set: newValue => {
          if (key === "onreadystatechange") {
            this._xmlRequest[key] = newValue;
          } else {
            isCoverAttr ? this._coverAttr[key] : this._xmlRequest[key];
          }
        }
      });
    }
  }
  open(method:string, url:string, ...args: any[]) {
    this.method = method;
    this._xmlRequest.open(method, url, ...args);
  }
  send(data?: any) {
    if (!data) data = null;
    this._xmlRequest.send(data);
    if (this.readyState === 4 && !/2\d{2}/.test(this.status)) {
      reportError(this, false);
    }
  }
  setRequestHeader(header: string, value: string) {
    this._headers[header] = value;
    this._xmlRequest.setRequestHeader(header, value);
  }
}

export default XMLHttpRequestProxy;
