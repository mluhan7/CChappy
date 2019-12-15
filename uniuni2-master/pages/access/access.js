let app = getApp();
let util = require('../../utils/util.js');
const urltmp = 'http://192.168.43.154:8082/user/login';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    isHide: false
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    wx.getSetting({
      success: function (res) {
        // 如果用户已经授权过，此时global里已存有userid，只需GET到用户的所有信息
        if (res.authSetting['scope.userInfo'] && app.globalData.userid) {
          console.log("已得到userid，userid为" + app.globalData.userid);
          wx.navigateTo({
            url: '/pages/login/login',
          })
        }
        //跳转
        else {
          console.log("尚未得到userid")
        }
      }
    })
  },
  bindGetUserInfo: function (e) {
    if (e.detail.userInfo) {
      let that = this;
      /*user_name*/
      console.log(e.detail.userInfo)
      console.log("nickName: " + e.detail.userInfo.nickName);
      /*userid*/
      wx.login({
        success: res => {
          console.log("用户的code: " + res.code)
          wx.request({
            url: urltmp,
            // data: util.json2Form({
            //   code:res.code,
            //   name: e.detail.userInfo.nickName
            // }),
            data: {
              code: res.code,
              name: e.detail.userInfo.nickName

            },
            method: 'GET',
            header: {
              'content-type': 'application/json'
            },
            // method: 'POST',
            // header: { "content-Type": "application/x-www-form-urlencoded" },
            success: res => {
              console.log("success")
              console.log(res)
              console.log("用户的userid: " + res.data);
              if (res.statusCode == 200) {
                console.log(res)
                app.globalData.userid = res.data;//格式
                wx.navigateTo({
                  url: '/pages/login/login',
                })
              }
            },
            fail(){
              console.log("出错")
            }
          })
        }
      })
    } else { // 用户拒绝授权
      wx.showModal({
        title: '警告',
        content: '您点击了拒绝授权，将无法进入小程序，请授权之后再进入!!!',
        showCancel: false,
        confirmText: '返回授权',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击了返回授权')
          }
        }
      })
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})