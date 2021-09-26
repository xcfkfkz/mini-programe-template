import { getWholeUrl } from '../../apis/http/index.js';
Page({
  data: {},
  onLoad(query) {
    // 页面加载
  },
  scan() {
    my.scan({
      scanType: ['qrCode'],
      success: async (res) => {
        const { qrCode } = res || {};
        if (!qrCode) return;
        const wholeUrl = await getWholeUrl(qrCode);
        const { query = '' } = this.parseQueryString(wholeUrl.split('?')[1]);
        const webViewUrl = `https://pay.qiandaoapp.com/collect-pay/?${decodeURIComponent(query)}`;
        const nativePath = '../welcome/welcome?webViewUrl=' + encodeURIComponent(webViewUrl);
        my.navigateTo({ url: nativePath })
      }
    });
  },
  parseQueryString(qs) {
    return qs
        ? qs.split('&').reduce((acc, s) => {
          const tokens = s.split('=')
          return {
            ...acc,
            [tokens[0]]: tokens[1]
          }
        }, {})
        : {}
  },
  onReady() {
    // 页面加载完成
  },
  onShow() {
    // 页面显示
  },
  onHide() {
    // 页面隐藏
  },
  onUnload() {
    // 页面被关闭
  },
  onTitleClick() {
    // 标题被点击
  },
  onPullDownRefresh() {
    // 页面被下拉
  },
  onReachBottom() {
    // 页面被拉到底部
  },
  onShareAppMessage() {
    // 返回自定义分享信息
    return {
      title: '',
      desc: '',
      path: '',
    };
  },
});
