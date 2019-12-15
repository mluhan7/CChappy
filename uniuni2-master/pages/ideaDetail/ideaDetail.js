const utils = require('../../utils/util.js');
Page({
  data: {
    colors: ['red', 'orange', 'yellow', 'olive', 'green', 'cyan', 'blue', 'purple', 'mauve'],
    title: '',
    content: '',
    orgs: [],
    images: [],
  },

  // 事件处理函数
  ViewImage(e) {
    wx.previewImage({
      urls: this.data.images,
      current: e.currentTarget.dataset.url
    });
  },
  // 生命周期函数
  onLoad(option){
    let that = this;
    that.setData({
      idea_id: option.ideaid,
      title: option.title,
      content: option.content,
      orgs: JSON.parse(option.orgs),
    });
    wx.request({
      url: 'https://www.triple2.xyz:8082/idea/getImage',
      data: {
        idea_id: that.data.idea_id
      },
      success(res) {
        that.setData({
          images: res.data,
          colNum: utils.getcolNum(res.data.length)
        })
        console.log('ideagetImages',res.data);
        console.log('colNum', that.data.colNum);
      }
    })
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