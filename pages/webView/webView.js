Page({
  data: {
    url: ''
  },
  onLoad(query) {
    const { webViewUrl = '' } = query || {};
    let url;
    try {
      url = decodeURIComponent(webViewUrl)
    } catch (e) {
      url = webViewUrl
    }
    this.setData({
      url
    })
  },
});
