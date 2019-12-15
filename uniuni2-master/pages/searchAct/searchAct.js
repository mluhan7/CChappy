const app = getApp();
const utils = require('../../utils/util.js');
Page({
  data: {
    inputValue: '',
    cards: [
      {}
      // {
      //   avatar: 'http://www.triple2.xyz:8088/3.jpg',
      //   name: '华农男生女生墙',
      //   date: '2019年12月3日',
      //   title: '欢喜',
      //   content: 'think about it',
      //   image: '',
      //   viewNum: 28,
      //   appNum: 14,
      //   favorNum: 2
      // },
      // {
      //   avatar: 'http://www.triple2.xyz:8088/3.jpg',
      //   name: '华农男生女生墙',
      //   date: '2019年12月3日',
      //   title: '欢喜',
      //   content: 'think about it',
      //   image: '',
      //   viewNum: 28,
      //   appNum: 14,
      //   favorNum: 2
      // },
      // {
      //   avatar: 'http://www.triple2.xyz:8088/3.jpg',
      //   name: '华农男生女生墙',
      //   date: '今天13:58',
      //   title: '如初',
      //   content: '人生最好的三个词\n久别重逢，失而复得，虚惊一场\n却唯独没有一个词\n叫和好如初\n和好容易，如初多难啊\n——《你会怎么回忆我们》',
      //   image: 'http://www.triple2.xyz:8088/3.jpg',
      //   viewNum: 19,
      //   appNum: 10,
      //   favorNum: 4
      // },
      // {
      //   avatar: 'http://www.triple2.xyz:8088/3.jpg',
      //   name: '华农男生女生墙',
      //   date: '2019年12月3日',
      //   title: '欢喜',
      //   content: 'think about it',
      //   image: '',
      //   viewNum: 28,
      //   appNum: 14,
      //   favorNum: 2
      // }
    ]
  },
  // 事件处理函数
  bindKeyInput(e) {
    this.setData({
      inputValue: e.detail.value
    })
  },
  cleanInput(e) {
    this.setData({
      inputValue: ''
    })
  },
  doSearch(e) {
    let that = this;
    if (!that.inputValue) {
      wx.showLoading({
        title: '搜索中...',
        icon: 'Loading'
      });

      wx.request({
        url: 'https://www.triple2.xyz:8082/activity/find', //仅为示例，并非真实的接口地址
        data: {
          keyword: that.data.inputValue
        },
        success (res) {
          wx.hideLoading();
          that.setRes(res.data);
        },
        fail(res) {
          console.log('fail');
        }
      })
    }
    else {
      wx.showToast({
        title: '输入不能为空',
        icon: 'none'
      })
    }
  },
  navToActDetail(e) {
    wx.navigateTo({
      url: '/pages/actDetail/actDetail'
    });
  },
  // 普通函数
  setRes(resdata) {
    let newCards = [];
    newCards = resdata.map(obj => {
      let newObj = {};
      newObj['name'] = obj['organization_name'];
      newObj['date'] = utils.dateDiff(Date.parse(obj.time));
      newObj['title'] = obj['title'];
      newObj['content'] = obj['text'];
      return newObj;
    });
    this.setData({
      cards: newCards
    })
  },
  // 生命周期函数
  onUnload(){
   wx.reLaunch({
     url: '/pages/index/index'
   })
  }
});