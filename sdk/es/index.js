function loadScript(src) {
  return new Promise((resolve, reject) => {
    let script = document.createElement('script');
    script.async = true;
    script.src = src;
    script.onload = resolve;

    script.onerror = error => reject(new Error('Unable to load ' + src + ': ' + error));

    document.body.appendChild(script);
  });
}
function loadLink(href) {
  return new Promise((resolve, reject) => {
    let link = document.createElement('link');
    link.href = href;
    link.rel = 'stylesheet';
    link.onload = resolve;

    link.onerror = error => reject(new Error('Unable to load ' + href + ': ' + error));

    document.body.appendChild(link);
  });
}
class MyLoopQueue {
  constructor(capacity = 10) {
    this.front = 0;
    this.tail = 0;
    this.size = 0;
    this.Queue = new Array(capacity);
  }

  getSize() {
    return this.size;
  }

  enqueue(E) {
    const queueLength = this.Queue.length;
    const tail = this.tail % queueLength; // 如果队列满了，那么就将"第一位"变成"最后一位"

    if (this.tail === this.front && this.getSize() !== 0) {
      this.front = (this.front + 1) % queueLength;
    }

    this.tail = (this.tail + 1) % queueLength;
    this.Queue[tail] = E;
    this.size++;
  }

  dequeue() {
    const queueLength = this.Queue.length; // 如果队列为空，就不能出列了

    if (this.getSize() === 0 && this.front % queueLength === this.tail) {
      throw new Error("Can't get empty queue");
    }

    const ret = this.Queue[this.front];
    this.Queue[this.front] = null;
    this.front = (this.front + 1) % queueLength;
    this.size--;
    return ret;
  }

  getQueue() {
    let newQueue = [];
    const length = this.Queue.length;

    if (this.getSize() < length) {
      newQueue = this.Queue.slice(0, this.tail);
    } else if (this.font === 0) {
      newQueue = this.Queue;
    } else {
      let frontQueue = this.Queue.slice(this.front);
      let tailQueue = this.Queue.slice(0, this.front);
      newQueue = [...frontQueue, ...tailQueue];
    }

    return newQueue;
  }

}

const CONFIG_COUNT = 50;
const MAX_COUNT = CONFIG_COUNT ;
const queue =  new MyLoopQueue(MAX_COUNT);
function initRecord() {
  rrweb.record({
    emit(event) {
      if (queue.getSize() >= MAX_COUNT) {
        queue.dequeue();
      }

      queue.enqueue(event);
    }

  });
}
async function getEventRecord() {
  return queue.getQueue();
}

const BASE_URL = 'http://localhost:3090';

{
  loadLink('https://cdn.jsdelivr.net/npm/rrweb@latest/dist/rrweb.min.css');
  loadScript('https://cdn.jsdelivr.net/npm/rrweb@latest/dist/rrweb.min.js').then(() => {
    initRecord();
  });
}

const URL_GROUP = {
  error: BASE_URL + '/errorRequest',
  performance: BASE_URL + '/performance'
};
let timer = null;
/**
 * 手动上报
 * @param {Object} err 错误对象
 * @param {Boolean} isFramework 是否是框架，即代码是否被编译
 */

const report = (formData, type = 'error') => {
  clearTimeout(timer);
  timer = setTimeout(async () => {
    const data = JSON.stringify(formData);

    if (window.navigator.sendBeacon) {
      window.navigator.sendBeacon(URL_GROUP[type] + 'FromBeacon', data); // IE的URL长度限制为2083，其余浏览器更大，支持最小且主流的Chrome长度限制为8182
    } else if (isIE && e.length < 2083 || !isIE && e.length < 8182) {
      let image = new Image();
      image.src = URL_GROUP[type] + '?' + encodeURIComponent(JSON.stringify(data));
    } else if (window.fetch) {
      fetch(URL_GROUP[type], {
        body: data,
        method: 'POST',
        headers: {
          'content-type': 'application/json; charset=utf-8'
        }
      });
    } else {
      let XHR = null;

      if (window.XMLHttpRequest) {
        XHR = new XMLHttpRequest();
      }

      XHR.withCredentials = true;
      XHR.open('POST', URL_GROUP[type], false);
      XHR.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
      XHR.send(data);
    }
  }, 30);
};

const oldError = console.error;

console.error = function (e) {
  try {
    throw new Error(e);
  } catch (err) {
    const stackT = err.stack.split('\n')[2];
    let errObj = handleError(stackT);

    if (!errObj) {
      return false;
    }

    report({
      msg: err.message,
      ...errObj,
      error: err.stack
    });
  }

  return oldError.apply(console, arguments);
}; // 重写Promise.reject


const oldReject = Promise.reject;

Promise.reject = function (e) {
  try {
    throw new Error(e);
  } catch (err) {
    const stackT = err.stack.split('\n')[2];
    let errObj = handleError(stackT);

    if (!errObj) {
      return false;
    }

    report({
      msg: err.message,
      ...errObj,
      error: err.stack
    });
  }

  return () => oldReject.apply(Promise, arguments);
}; // window.onerror = function(msg, path, lineNo, columnNo, error) {
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


window.addEventListener('error', event => {
  const {
    message: msg,
    filename: path,
    lineno: lineNo,
    colno: columnNo,
    error
  } = event;
  const errorObj = {
    msg,
    path,
    lineNo,
    columnNo,
    error,
    framework: false
  };
  report(errorObj);
}, true); // 对没有catch的reject进行监听

window.addEventListener('unhandledrejection', function (event) {
  event.preventDefault();
  const {
    type,
    reason
  } = event;
  report({
    type,
    msg: reason
  });
}); // 对vue进行上报

function install(Vue) {
  Vue.config.errorHandler = function (err) {
    reportError(err);
  };
} // 对react进行上报

function ErrorRequest(React) {
  class Error extends React.Component {
    componentDidCatch(err) {
      reportError(err);
    }

    render() {
      return this.props.children;
    }

  }

  return Error;
}

async function reportError(err) {
  const error = err.stack;
  const msg = err.toString();
  const errorStackTop = !!error && error.split('\n')[1];
  let errObj = handleError(errorStackTop);

  if (!errObj) {
    return false;
  }

  const eventsRecord = await getEventRecord();
  const formData = { ...errObj,
    msg,
    url: window.location.href,
    framework: true,
    eventsRecord,
    error
  };
  report(formData);
}

function handleError(errorStackLine) {
  if (errorStackLine) {
    let index = errorStackLine.lastIndexOf('/');
    const [path, lineNoStr, columnNoStr] = errorStackLine.substr(index + 1).split(':');
    const lineNo = Number(lineNoStr.match(/\d+/)[0]);
    const columnNo = Number(columnNoStr.match(/\d+/)[0]);
    return {
      path,
      lineNo,
      columnNo
    };
  }

  return false;
}

// // 加载lz-string库，用以压缩字符串数据
var index = {
  ErrorRequest,
  install
};

export default index;
