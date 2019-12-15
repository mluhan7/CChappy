/*后续：左侧tab不要写死，数据从后台获得 */
const app = getApp()
Page({
  data: {
    windowHeight: 0,
    TabCur: 0,
    MainCur: 0,
    VerticalNavTop: 0,
    list: [{
      name: '校部',
      orgs: []
    },
      {
        name: '信息学院',
      },
      {
        name: '植科院',
      },
      {
        name: '动科动医学院',
      },
      {
        name: '资环院',
      },
      {
        name: '生科院',
      },
      {
        name: '园艺林学学院',
      },
      {
        name: '水产学院',
      },
      {
        name: '经管院',
      },
      {
        name: '公管院',
      },
      {
        name: '食科院',
      },
      {
        name: '理学院',
      },
      {
        name: '文法院',
      },
      {
        name: '外国语学院',
      },
      {
        name: '马克思主义院',
      }
    ],
    load: true
  },
  navToOrg(e) {
    console.log('me!');
    console.log(e);
    let orgid = e.currentTarget.dataset.orgid;
    let avatar = e.currentTarget.dataset.avatar;
    if (orgid) {
      wx.navigateTo({
        url: '/pages/orgHome/orgHome?orgid=' + orgid + '&avatar=' + avatar
      });
    }
  },
  // 普通函数
  setRes(resdata) {
    let that = this;
    let newlist = [];
    if(resdata instanceof Array) {
      newlist = resdata.map((obj) => {
        let newobj = {};
        newobj['name'] = obj['name'];
        if(obj.list && obj.list instanceof Array) {
          let neworgs = [];
          neworgs = obj.list.map(org => {
            let neworg = {};
            neworg['orgid'] = org['id'];
            neworg['name'] = org['name'];
            neworg['motto'] = org['motto'];
            return neworg
          });
          newobj['orgs'] = neworgs;
        }
        return newobj;
      });
      // console.log(newlist);
      that.setData({
        list: newlist
      })
    }
  },
  setResImages(resdata){
    let that = this;
    let newlist = that.data.list;
    for(let i=0; i<newlist.length; i++) {
      for(let j=0; j<resdata[i]['orgs'].length; j++) {
        if(newlist[i]['orgs'] instanceof Array)
        {
          // console.log(newlist[i]['orgs']);
          console.log(resdata[i]['orgs'][j]);
          newlist[i]['orgs'][j]['avatar'] = resdata[i]['orgs'][j]['avatar'];
        }
      }
    }
    that.setData({
      list: newlist
    })
  },
  onLoad() {
    let that = this;
    wx.showLoading({
      title: '数据加载中',
      icon: 'Loading'
    });
    wx.request({
      url: 'https://www.triple2.xyz:8082/organization/get', //仅为示例，并非真实的接口地址
      data: {

      },
      success(res) {
        wx.hideLoading();
        that.setRes(res.data);
        wx.request({
          url: 'https://www.triple2.xyz:8082/organization/getallImage',
          success(res) {
            console.log('allImage:', res.data);
            that.setResImages(res.data);
            // that.setData({
            //   list: res.data
            // });
          },
          fail(res) {
            console.log('allImage失败');
          }
        })
        // console.log(res.data)
      },
      fail(res) {
        console.log('fail');
      }
    });

  },
  onReady() {
    wx.hideLoading()
  },
  tabSelect(e) {
    this.setData({
      TabCur: e.currentTarget.dataset.id,
      MainCur: e.currentTarget.dataset.id,
      VerticalNavTop: (e.currentTarget.dataset.id - 1) * 50
    })
  },
  VerticalMain(e) {
    let that = this;
    let list = this.data.list;
    let tabHeight = 0;
    if (this.data.load) {
      for (let i = 0; i < list.length; i++) {
        let view = wx.createSelectorQuery().select("#main-" + list[i].id);
        view.fields({
          size: true
        }, data => {
          // console.log('data:', data);
          list[i].top = tabHeight;
          // tabHeight = tabHeight + data.height;
          list[i].bottom = tabHeight;
        }).exec();
      }
      that.setData({
        load: false,
        list: list
      })
    }
    let scrollTop = e.detail.scrollTop + 20;
    for (let i = 0; i < list.length; i++) {
      if (scrollTop > list[i].top && scrollTop < list[i].bottom) {
        that.setData({
          VerticalNavTop: (list[i].id - 1) * 50,
          TabCur: list[i].id
        })
        return false
      }
    }
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