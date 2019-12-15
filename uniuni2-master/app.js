//app.js
App({
  onLoad() {
    // 先取出页面高度 windowHeight

  },
  globalData: {
    userInfo: null,
    domain: 'http://www.triple2.xyz:8082',
    userid: null
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (res) {
    return {
      title: 'uni有你',
      path: 'pages/home/home',
      success: function (shareTickets) {
        console.info(shareTickets + '成功');
        // 转发成功
      },
      fail: function (res) {
        console.log(res + '失败');
        // 转发失败
      },
      complete: function (res) {
        // 不管成功失败都会执行
      }
    }
  }
});