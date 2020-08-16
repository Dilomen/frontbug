function perforPage() {
  if (!window || !window.performance) {
    console.error('当前浏览器版本过低不支持performance')
    return
  }
  let timing = performance.timing
  return {
     // DNS解析时间
     dnsTime: timing.domainLookupEnd - timing.domainLookupStart || '-',
     //TCP建立时间
     tcpTime: timing.connectEnd - timing.connectStart || '-',
     // 白屏时间  
     emptyTime: timing.responseStart - timing.navigationStart || '-',
     //dom渲染完成时间
     domTime: timing.domContentLoadedEventEnd - timing.navigationStart || '-',
     //页面onload时间
     lodTime: timing.loadEventEnd - timing.navigationStart || '-',
     // 页面准备时间 
     readtTime: timing.fetchStart - timing.navigationStart || '-',
     // 页面重定向时间
     redirectTime: timing.redirectEnd - timing.redirectStart || '-',
     // unload时间
     unloadTime: timing.unloadEventEnd - timing.unloadEventStart || '-',
     //request请求耗时
     requsetTime: timing.responseEnd - timing.requestStart || '-',
     //页面解析dom耗时
     analysisTime: timing.domComplete - timing.domInteractive || '-'
  }
}