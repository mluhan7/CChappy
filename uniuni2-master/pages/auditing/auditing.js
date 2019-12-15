
const app = getApp();

Page({
  data: {
    toptab: ['搜课程', '搜专业', '搜老师'],
    currentTab: 0,
    results: [],
    reshow: 3,
    empty: 1,

  },
  // 提交课程名搜索
  course_formSubmit: function (e) {
    let that = this;
    let formData = e.detail.value.keyword;// 关键词
    console.log(formData);

    if (formData == '') {
      wx.showToast({
        title: '输入不能为空',
        icon: 'none'
      })
    } else {
      wx.showLoading({
        title: '搜索中...',
        icon: 'Loading'
      });

      wx.request({
        url: 'https://www.triple2.xyz:8082/schedule/cname',
        data: {
          cname: formData
        },
        success: function (res) {
          console.log(res.data);
          if (res.data.length == 0) {
            console.log("无结果")
            that.setData({
              reshow: 2
            })
          } else {
            console.log("有结果")
            that.getcourseTime(res.data)
            that.setData({
              reshow: 1
            })
            console.log("reshow:")
            console.log(that.data.reshow)
          }
          wx.hideLoading();
        }
      })
    }
  },
  // 按专业搜索
  major_formSubmit: function(e) {
    let that = this;
    let formData = e.detail.value.keyword;// 关键词
    console.log(formData);

    if (formData == '') {
      wx.showToast({
        title: '输入不能为空',
        icon: 'none'
      })
    } else {
      wx.showLoading({
        title: '搜索中...',
        icon: 'Loading'
      });

      wx.request({
        url: 'https://www.triple2.xyz:8082/schedule/major',
        data: {
          major: formData
        },
        success: function (res) {
          console.log(res.data);
          if (res.data.length == 0) {
            console.log("无结果")
            that.setData({
              reshow: 2
            })
          } else {
            console.log("有结果")
            that.getcourseTime(res.data)
            that.setData({
              reshow: 1
            })
            console.log("reshow:")
            console.log(that.data.reshow)
          }
          wx.hideLoading();
        }
      })
    }
  },
  // 按老师搜索
  teacher_formSubmit: function (e) {
    let that = this;
    let formData = e.detail.value.keyword;// 关键词
    console.log(formData);

    if (formData == '') {
      wx.showToast({
        title: '输入不能为空',
        icon: 'none'
      })
    } else {
      wx.showLoading({
        title: '搜索中...',
        icon: 'Loading'
      });

      wx.request({
        url: 'https://www.triple2.xyz:8082/schedule/teacher',
        data: {
          tname: formData
        },
        success: function (res) {
          console.log(res.data);
          if (res.data.length == 0) {
            console.log("无结果")
            that.setData({
              reshow: 2
            })
          } else {
            console.log("有结果")
            that.getcourseTime(res.data)
            that.setData({
              reshow: 1
            })
            console.log("reshow:")
            console.log(that.data.reshow)
          }
          wx.hideLoading();
        }
      })
    }
  },
  // 点击改变标签页
  changetab: function (e) {
    this.setData({
      currentTab: e.currentTarget.dataset.id,
      s1_inputs: '',
      s2_inputs: '',
      s3_inputs: ''
    })
  },
  // 滑动改变标签页
  switchTab: function (e) {
    this.setData({
      currentTab: e.detail.current,
      s1_inputs: '',
      s2_inputs: '',
      s3_inputs: ''
    });
  },
  
  /*发送到resultss并改变time_detail和site_detail*/
  getcourseTime: function (resdata) {
    let cpy_re = resdata && resdata.map(item => {
      item.class_time_detail = item.class_time_detail && item.class_time_detail.split(';')
      item.site_name_detail = item.site_name_detail && item.site_name_detail.split(';')
      item.major === null ? (item.major='其他') : null
      return item
    })
    this.setData({
      results: cpy_re
    })
  },
  // 下拉刷新不知道做好了没呢
  scroll(event) {
    console.log(event)
  },
  reactBottom() {
    console.log('触底-加载更多')
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;

    // 获取系统信息
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          winWidth: res.windowWidth,
          winHeight: res.windowHeight
        });
      }
    });
    console.log(that.data.winHeight)
    console.log(that.data.winWidth)
    wx.stopPullDownRefresh() //刷新完成后停止下拉刷新动效
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    /*let that = this;
    let tbodyHeight = app.globalData.windowHeight;
    that.setData({
      tbodyHeight: tbodyHeight.toFixed(0)
    })*/
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.setData({
      s1_inputs: ''
    })
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
    var that = this;
    that.setData({
      currentTab: 0 //当前页的一些初始数据，视业务需求而定
    })
    this.onLoad(); //重新加载onLoad()
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