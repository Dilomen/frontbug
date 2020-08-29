import { reportError } from "../report";

enum stateType {
  UNSENT = 0,
  OPENED = 1,
  HEADERS_RECEIVED = 2,
  LOADING = 3,
  DONE = 4
}

type XMLConfig = {
  [propName: string]: any;
};

const _xmlRequest: XMLConfig = new XMLHttpRequest();

function XMLHttpRequestProxy(this: XMLConfig): void {
  this.UNSENT = stateType.UNSENT;
  this.OPENED = stateType.OPENED;
  this.HEADERS_RECEIVED = stateType.HEADERS_RECEIVED;
  this.LOADING = stateType.LOADING;
  this.DONE = stateType.DONE;
  this.onreadystatechange = null;
  this.onopen = null;
  this.onsend = null;
  this.onabort = null;
}

XMLHttpRequestProxy.prototype.readyState = 0;
XMLHttpRequestProxy.prototype.responseText = "";
XMLHttpRequestProxy.prototype.responseXML = null;
XMLHttpRequestProxy.prototype.status = 0;
XMLHttpRequestProxy.prototype.statusText = "";
XMLHttpRequestProxy.prototype.priority = "NORMAL";
XMLHttpRequestProxy.prototype.onreadystatechange = null;

XMLHttpRequestProxy.prototype.open = function(...args: any[]) {
  const _self = this;
  let nState = this.readyState;
  _xmlRequest.open(...args);
  this.readyState = this.OPENED;
  this.fReadyStateChange(this);
  _xmlRequest.onreadystatechange = function() {
    _self.fSynchronizeValues(_self);
    if (nState != _self.readyState) _self.fReadyStateChange(_self);
    if (this.readyState == 4 && !/2\d{2}/.test(this.status)) {
      this.type = "network";
      reportError(this, false);
    }
    nState = _self.readyState;
  };
};
XMLHttpRequestProxy.prototype.send = function(vData: any) {
  if (this.onsend) this.onsend.apply(this, arguments);
  if (!arguments.length) vData = null;
  _xmlRequest.send(vData);
  this.fSynchronizeValues(this);

  while (this.readyState < this.DONE) {
    this.readyState++;
    this.fReadyStateChange(this);
  }
};
XMLHttpRequestProxy.prototype.fReadyStateChange = function(
  oRequest: XMLConfig
) {
  if (this.onreadystatechange) this.onreadystatechange.apply(oRequest);
  oRequest.dispatchEvent({
    type: "readystatechange",
    bubbles: false,
    cancelable: false,
    timeStamp: +new Date()
  });
};
XMLHttpRequestProxy.prototype.fSynchronizeValues = function(
  oRequest: XMLConfig
) {
  oRequest.readyState = _xmlRequest.readyState;
  oRequest.responseText = _xmlRequest.responseText;
  oRequest.responseXML = _xmlRequest.responseXML;
  oRequest.status = _xmlRequest.status;
  oRequest.statusText = _xmlRequest.statusText;
};

XMLHttpRequestProxy.prototype.dispatchEvent = function(oEvent: any) {
  var oEventPseudo = {
    type: oEvent.type,
    target: this,
    currentTarget: this,
    eventPhase: 2,
    bubbles: oEvent.bubbles,
    cancelable: oEvent.cancelable,
    timeStamp: oEvent.timeStamp,
    stopPropagation: function() {},
    preventDefault: function() {},
    initEvent: function() {}
  };
  if (oEventPseudo.type == "readystatechange" && this.onreadystatechange)
    (this.onreadystatechange.handleEvent || this.onreadystatechange).apply(
      this,
      [oEventPseudo]
    );
};

export default XMLHttpRequestProxy;
