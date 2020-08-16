import { initRecord } from './record'
import { loadScript, loadLink } from './utils';

// 之后会设成可配置
const BASE_URL = 'http://localhost:3090'
const frontbugConfig = {
  isFramework: true,
  isNeedRecord: true
};

if (frontbugConfig.isNeedRecord) {
  loadLink('https://cdn.jsdelivr.net/npm/rrweb@latest/dist/rrweb.min.css');
  loadScript('https://cdn.jsdelivr.net/npm/rrweb@latest/dist/rrweb.min.js').then(() => {
    initRecord()
  });
}

const URL_GROUP = {
  error: BASE_URL + '/errorRequest',
  performance: BASE_URL + '/performance'
}

let timer = null

/**
 * 手动上报
 * @param {Object} err 错误对象
 * @param {Boolean} isFramework 是否是框架，即代码是否被编译
 */
export const report = (formData, type = 'error') => {
  clearTimeout(timer)
  timer = setTimeout(async () => {
    const data = JSON.stringify(formData);
    if (window.navigator.sendBeacon) {
      window.navigator.sendBeacon(URL_GROUP[type] + 'FromBeacon', data)
      // IE的URL长度限制为2083，其余浏览器更大，支持最小且主流的Chrome长度限制为8182
    } else if ((isIE && e.length < 2083) || (!isIE && e.length < 8182)) {
      let image = new Image()
      image.src = URL_GROUP[type] + '?' + encodeURIComponent(JSON.stringify(data))
    } else if(window.fetch) {
      fetch(URL_GROUP[type], {
        body: data,
        method: 'POST',
        headers: {
          'content-type': 'application/json; charset=utf-8',
        },
      });
    } else {
      let XHR = null
      if (window.XMLHttpRequest) {
        XHR = new XMLHttpRequest()
      }
      XHR.withCredentials = true
      XHR.open('POST', URL_GROUP[type], false)
      XHR.setRequestHeader('Content-Type', 'application/json; charset=utf-8')
      XHR.send(data)
    }
  }, 30)
};
