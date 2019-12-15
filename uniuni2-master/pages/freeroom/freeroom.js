// pages/freeroom/freeroom.js
var util = require('../../utils/util.js');
var app = getApp()
Page({
  data: {
    // 计算
    start: "2019-09-02",
    end: "2020-01-10",
    date: ''
  },

  getweek_detail: function() {
    let str0 = new Date(this.data.start); //第一周第一天为9.2
    let str = new Date(this.data.date); //待计算的时间
    let distance = Math.round((str.valueOf() - str0.valueOf()) / 86400000);
    let w = Math.ceil(distance / 7);
    w === 0 ? w = 1 : null;
    return w;
  },
  getweekday: function() {
    let d = new Date(this.data.date).getDay();
    return d;
  },

  changeB1: function(event) {
    let that = this;
    let msg = event.currentTarget.dataset.msg;
    let id = event.currentTarget.dataset.id;
    console.log(msg);
    that.data.msglist[0] = msg;
    // 更改样式
    that.setData({
      id1: id
    });
    console.log(that.data.msglist);
    // 如果教学楼是二教，禁止ABC
    if (id == 0) {
      that.setData({
        B2selectable: false,
      })
    } else {
      that.setData({
        B2selectable: true,
      })
    }
    // 如果教学楼是四教或二教，禁止F5
    if (id == 2 || id == 0) {
      that.setData({
        f5selectable: false
      })
    } else {
      that.setData({
        f5selectable: true
      })
    }
  },
  changeB2: function(event) {
    let that = this;
    let msg = event.currentTarget.dataset.msg;
    let id = event.currentTarget.dataset.id;
    console.log(msg);
    that.data.msglist[1] = msg;
    console.log(that.data.msglist);
    // 更改样式
    that.setData({
      id2: id
    })
  },
  changeB3: function(event) {
    let that = this;
    let msg = event.currentTarget.dataset.msg;
    let id = event.currentTarget.dataset.id;
    console.log(msg);
    that.data.msglist[2] = msg;
    console.log(that.data.msglist);
    that.setData({
      id3: id
    })
  },

  access: function() {
    let that = this;
    let a = that.data.msglist[0];
    console.log(a);
    let b = that.data.msglist[1];
    let c = that.data.msglist[2];
    let qstr = '';
    if (a == "二教") {
      console.log("here");
      qstr = a + c[1];
    } else {
      qstr = a + b[0] + c[1];
      console.log("there");
    }
    let week_detail = that.getweek_detail();
    let weekday = that.getweekday();
    console.log(qstr, week_detail, weekday);

    wx.showLoading({
      title: '加载中...',
    })

    wx.request({
      url: 'https://www.triple2.xyz:8082/schedule/floortoday',
      data: {
        site_name: qstr,
        week_detail: week_detail,
        weekday: weekday
      },
      success(res) {
        wx.hideLoading()
        console.log(res.data);
        let newroomli = [];
        for (let i = 0; i < res.data.length; ++i) {
          newroomli.push(i + c[1] * 100 + 1);
        }
        that.setData({
          courseli: res.data,
          roomli: newroomli
        })
      }
    });
  },
  bindDateChange: function(event) {
    this.setData({
      date: event.detail.value
    });
    this.access();
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function() {
    var date = util.formatDate(new Date());
    this.setData({
      date: date,
      id1: 2,
      id2: 1,
      id3: 0,
      B2selectable: true,
      f5selectable: false,
      roomli: [101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113],
      b1list: ['二教', '三教', '四教'],
      b2list: ['A座', 'B座', 'C座'],
      b3list: ['F1', 'F2', 'F3', 'F4', 'F5'],
      msglist: ['四教', 'B座', 'F1'],
      courseli: [
        // [1, 0, 0, 0, 0],
        // [0, 0, 1, 0, 0],
        // [0, 0, 0, 0, 0],
        // [0, 1, 0, 0, 0],
        // [0, 0, 0, 0, 0],
        // [1, 1, 1, 0, 0],
        // [0, 1, 0, 0, 0],
        // [1, 1, 0, 0, 0],
        // [1, 1, 0, 0, 0],
        // [1, 0, 0, 0, 0],
        // [0, 0, 0, 0, 0],
        // [1, 0, 0, 0, 0],
        // [0, 1, 0, 0, 0]
      ]
    });
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    //调用函数时，传入new Date()参数，返回值是日期和时间
    var time = util.formatTime(new Date());
    // 再通过setData更改Page()里面的data，动态更新页面的数据
    this.setData({
      time: time
    });
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
});