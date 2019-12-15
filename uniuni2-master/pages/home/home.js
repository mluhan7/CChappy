let app = getApp();
let util = require('../../utils/util.js');
const urltmp = 'https://www.triple2.xyz:8082/user/login';
const urltest = 'https://10.164.14.187:8082/user/login';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    picker: ['工学院', "校部","社团", "信息学院", "植科院", "动科动医学院", "资环院", "生科院", "园艺林学学院", "水产学院", "经管院", "公管院", "食科院", "理学院", "文法院", "外国语学院", "马克思主义院","其他组织"],
    select_picker: "其他组织",
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // app.globalData.userid = 4;
    // app.globalData.nickName = '自渡';
    // app.globalData.avatarUrl = 'https://thirdqq.qlogo.cn/qqapp/1108100302/9F95316D6A48B789225D1C5DFF9010D4/100';
    // wx.reLaunch({
    //   url:'/pages/index/index'
    // });


    let that = this;
    // 获得缓存
    let userData = wx.getStorageSync('userData4');
    // console.log('typeof userData', typeof userData);
    // console.log('userData === 空', userData==='');
    if (userData) {
      console.log('获得缓存成功');
      console.log('typeof userData', typeof userData);
      console.log('userData是：', userData);
      app.globalData.userid = userData.userid;
      app.globalData.nickName = userData.nickName;
      app.globalData.avatarUrl = userData.avatarUrl;
      wx.request({
        url: 'https://www.triple2.xyz:8082/user/getcollege',
        data: {
          user_id: app.globalData.userid
        },
        success(res) {
          console.log(res.data);
          app.globalData.college = res.data;
          console.log('从缓存的userid获得关注college');
        },
        fail(res) {
          console.log('获取college失败');
        }
      });
      // app.globalData.college = userData.college;
      console.log('appdata:', app.globalData);
      wx.reLaunch({
        url: '/pages/index/index',
      })
    } else {
      console.log('获取userid缓存失败');
    }
    // wx.getSetting({
    //   success: function (res) {
    //     // 如果用户已经授权过，此时global里已存有userid，只需GET到用户的所有信息
    //     if (res.authSetting['scope.userInfo'] && app.globalData.userid) {
    //       wx.reLaunch({
    //         url: '/pages/index/index',
    //       })
    //     }
    //     //否则显示登陆
    //     else {
    //
    //     }
    //   }
    // })
  },
  bindGetUserInfo: function (e) {
    let that = this;
    wx.showLoading({
      icon: 'none',
      title: '登陆中'
    });
    // console.log('userInfo:', e.detail.userInfo);
    if (e.detail.userInfo) {
      // 登录拿到code
      wx.login({
        success: res => {
          console.log("用户的code: " + res.code);
          // 向后端发code拿到userid
          wx.request({
            url: urltmp,
            data: {
              code: res.code,
              name: e.detail.userInfo.nickName,
              college: that.data.select_picker
            },
            method: 'GET',
            header: {
              'content-type': 'application/json'
            },
            // 拿到userid
            success: res => {
              wx.hideLoading();
              if (res.data > 0) {
                // userid为正数表示授权成功
                let userobj = {
                  userid: res.data,
                  nickName: e.detail.userInfo.nickName,
                  avatarUrl: e.detail.userInfo.avatarUrl,
                  college: that.data.select_picker
                };
                console.log('userobj', userobj);
                // 设置缓存
                wx.setStorage({
                  key: 'userData4',
                  data: userobj,
                  success(res) {
                    console.log('设置缓存成功，值是：');
                    // console.log(wx.getStorageSync('userData'));
                    wx.getStorage({
                      key: 'userData4',
                      success(res) {
                        console.log('userData', res.data);
                        // 设置到全局并跳转
                        app.globalData.userid = res.data.userid;
                        app.globalData.nickName = res.data.nickName;
                        app.globalData.avatarUrl = res.data.avatarUrl;
                        app.globalData.college = res.data.college;
                        console.log('appdata', app.globalData);
                        wx.reLaunch({
                          url: '/pages/index/index',
                        })
                      },
                      fail(res) {
                        console.log('emm获取userid缓存失败');
                      }
                    })
                  }
                });
              } else {
                console.log('-1，用户授权登录失败');
                wx.showToast({
                  icon: "none",
                  title: '网络原因登录失败，请重新授权',
                  duration: 1000
                })
              }
            },
            fail() {
              console.log("wx.login出错")
            }
          })
        }
      })
    } else { // 用户拒绝授权
      wx.getModel({
        title: '警告',
        content: '授权登录后才可以查看我的页面哦',
        showCancel: false,
        confirmText: '返回授权',
        success: function (res) {
          wx.hideLoading();
          if (res.confirm) {
            console.log('用户点击了返回授权')
          }
        }
      })
    }
  },
  PickerChange: function (e) {
    console.log(e);
    var index = e.detail.value;
    this.setData({
      index: index

    });
    var select_picker = this.data.picker[index];
    this.setData({
      select_picker: select_picker
    })
    console.log('学院为' + this.data.select_picker);
  },
  // bindGetUserInfo: function (e) {
  //   wx.showLoading({
  //     icon: 'none',
  //     title: '登陆中'
  //   });
  //   // console.log('?', e.detail.userInfo);
  //   if (e.detail.userInfo) {
  //     // console.log('userInfo:', e.detail.userInfo);
  //     app.globalData.avatarUrl = e.detail.userInfo.avatarUrl;
  //     app.globalData.nickName = e.detail.userInfo.nickName;
  //     let that = this;
  //     /*userid*/
  //     wx.login({
  //       success: res => {
  //         console.log("用户的code: " + res.code);
  //         wx.request({
  //           url: urltmp,
  //           data: {
  //             code: res.code,
  //             name: e.detail.userInfo.nickName
  //           },
  //           method: 'GET',
  //           header: {
  //             'content-type': 'application/json'
  //           },
  //           success: res => {
  //             wx.hideLoading();
  //             if (res.statusCode == 200) {
  //               if (res.data > 0) {
  //                 app.globalData.userid = res.data;//格式
  //                 wx.reLaunch({
  //                   url: '/pages/index/index',
  //                 })
  //               } else {
  //                 console.log('用户授权登录失败');
  //               }
  //             }
  //           },
  //           fail() {
  //             console.log("出错")
  //           }
  //         })
  //       }
  //     })
  //   }
  //   else { // 用户拒绝授权
  //     wx.getModel({
  //       title: '警告',
  //       content: '授权登录后才可以查看我的页面哦',
  //       showCancel: false,
  //       confirmText: '返回授权',
  //       success: function (res) {
  //         wx.hideLoading();
  //         if (res.confirm) {
  //           console.log('用户点击了返回授权')
  //         }
  //       }
  //     })
  //   }
  // },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    //如果 app.globalData里有userid，不显示
    // if(app.globalData.userid) {
    //     wx.navigateBack();
    // }
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