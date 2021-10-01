import { loginWithAliAuth, loadCollectCodeInfo } from '../../apis/http/index.js';
Page({
  data: {
    avatar: '',
    nickname: '',
    url: '',
    needApprovePhone: false
  },
  onLoad(query) {
    const { webViewUrl:url = '' } = query || {};
    this.setData({url});
    const { u = '' } = this.parseQueryString(url.split('?')[1]);
    loadCollectCodeInfo(u)
      .then(res => {
        const { avatar = '', userName:nickname = '' } = (res && res.info) || {};
        this.setData({avatar, nickname})
      })
  },
  goWithToken(t) {
    my.navigateTo({ url: '../webView/webView?webViewUrl=' + encodeURIComponent(`${this.data.url}&token=${t || ''}`) });
  },
  pay() {
    my.getAuthCode({
      scopes: ['auth_user'],
      success: async (res) => {
        // 获取到authCode
        const auth_code = res.authCode || '';
        const { token = '' } = (await loginWithAliAuth({ auth_code })) || {};
        if (token) return this.goWithToken(token);
        this.setData({needApprovePhone: true})
      },
      fail: () => {
        // 没获取到authCode
        this.goWithToken()
      }
    })
  },
  cancel() {
    this.goWithToken()
  },
  popApprovePhone() {
    this.setData({needApprovePhone: false})
  },
  onGetAuthorize() {
    my.getPhoneNumber({
      success: (res) => {
        const encryptedData = res.response;
        my.getAuthCode({
          scopes: ['auth_user'],
          success: async (authInfo) => {
            const { token = '' } = (await loginWithAliAuth({
              auth_code: authInfo.authCode || '',
              phone: encryptedData
            })) || {};
            if (token) return this.goWithToken(token);
            this.goWithToken()
          }
        })
      },
      fail: (res) => {
        this.goWithToken()
      },
    });

  },
  onAuthError() {
    this.goWithToken()
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
});
