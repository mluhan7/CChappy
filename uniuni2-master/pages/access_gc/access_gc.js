let app = getApp();
let util = require('../../utils/util.js');
const urltmp = 'https://www.triple2.xyz:8082/user/login';
Page({

    /**
     * 页面的初始数据
     */
    data: {
        canIUse: wx.canIUse('button.open-type.getUserInfo'),
        isHide: false,
        show: false
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
                    wx.navigateTo({
                        url: '/pages/index/index',
                    })
                }
                //否则显示登陆
                else {
                    that.setData({
                        show: true
                    })
                }
            }
        })
    },
    bindGetUserInfo: function (e) {
        if (e.detail.userInfo) {
            let that = this;
            /*userid*/
            wx.login({
                success: res => {
                    console.log("用户的code: " + res.code);
                    wx.request({
                        url: urltmp,
                        data: {
                            code: res.code,
                            name: e.detail.userInfo.nickName
                        },
                        method: 'GET',
                        header: {
                            'content-type': 'application/json'
                        },
                        success: res => {
                            if (res.statusCode == 200) {
                                if(res.data > 0)
                                {
                                    app.globalData.userid = res.data;//格式
                                    wx.navigateTo({
                                        url: '/pages/index/index',
                                    })
                                }
                                else {
                                    console.log('用户授权登录失败');
                                }
                            }
                        },
                        fail(){
                            console.log("出错")
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
    onShareAppMessage: function () {

    }
});