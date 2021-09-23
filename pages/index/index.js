Page({
  data: {
    url: '' // todo 记得删 
  },
  onLoad(query) {
    // 页面加载    
    const { webViewUrl = '' } = query || {};
    console.log('query  ', query);
    // 需要登录 的话，调用 静默登录authCode
    // 请求 千岛接口 入参为authCode，
    // 千岛登录接口如果 不包含手机号 那就再需要调用 getPhone
    // 如果用户同意授权 调用千岛接口 入参为手机号的密文
    // 如果用户拒绝授权 走原来逻辑 不带token 

    // 
    my.getAuthCode({
      scopes: ['auth_user'],
      success: (res) => {
        // 用户授权支付宝信息 
        
        // 绑定过千岛账号 

        // 没绑定过千岛账号
        console.log('res', res);
      },
      fail: (err) => {
        // 用户不同意 获取昵称头像性别地区 直接不带token跳转
        console.log('err', err);
        this.setData({url})
      }
    });

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
      title: 'My App',
      desc: 'My App description',
      path: 'pages/index/index',
    };
  },
});
