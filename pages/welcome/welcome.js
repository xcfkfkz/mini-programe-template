import 
Page({
  data: {
    avatar: '',
    nickname: '',
    url: ''
  },
  onLoad(query) {
    const { webViewUrl:url = '' } = query || {};
    this.setData({url});

  },

  pay(e) {
    const url = e.target.dataset.url;
    my.getAuthCode({
      scopes: ['auth_user'],
      success: res => {
        // 获取到authCode
        console.log('this ', this);
        
      },
      fail: () => {
        // 没获取到authCode
        my.navigateTo({ url: '../webView/webView?webViewUrl=' + encodeURIComponent(url) })
      }
    })
  },
  onGetAuthorize() {
    console.log('成功回调')
  },
  onAuthError() {
    console.log('失败回调')
  },
  loginWithAliAuthCode() {

  }
});
