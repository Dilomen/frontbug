/**
 * 获取设备信息
 * @param ctx
 * @returns {{os: String, browser: String, version: String, platform: String}}
 */
function getDeviceInfo (ctx) {
    const { platform, os, browser, version } = ctx.userAgent
    return { platform, os, browser, version }
}

module.exports = {
    getDeviceInfo
}