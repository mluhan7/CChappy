// pages/indHome/indHome.js
const app = getApp();
const utils = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    windowHeight: 0,
    scrollViewHeight: 0,
    scrollLeft: 0,
    visitTotal: 0,
    starCount: 0,
    watchCount: 0,
    followed: false,
    org: {
      // name: '华农男生女生墙',
      // avatar: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg',
      // motto: '一个有趣的组织。'
    },

    cards: [
      // {
      //   avatar: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg',
      //   name: '华农男生女生墙',
      //   date: '今天13:58',
      //   title: '如初',
      //   content: '人生最好的三个词\n久别重逢，失而复得，虚惊一场\n却唯独没有一个词\n叫和好如初\n和好容易，如初多难啊\n——《你会怎么回忆我们》',
      //   image: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg',
      //   viewNum: 19,
      //   appNum: 10,
      //   favorNum: 4
      // },
      // {
      //   avatar: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg',
      //   name: '华农男生女生墙',
      //   date: '今天13:58',
      //   title: '如初',
      //   content: '人生最好的三个词\n久别重逢，失而复得，虚惊一场\n却唯独没有一个词\n叫和好如初\n和好容易，如初多难啊\n——《你会怎么回忆我们》',
      //   image: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg',
      //   viewNum: 19,
      //   appNum: 10,
      //   favorNum: 4
      // }
    ],
  },
  // 事件处理函数
  navToActDetail(e) {
    console.log('e:', e);
    let actid = e.currentTarget.dataset.actid;
    let orgname = e.currentTarget.dataset.orgname;
    let avatar = e.currentTarget.dataset.avatar;
    let date = e.currentTarget.dataset.date;
    let title = e.currentTarget.dataset.title;
    let content = e.currentTarget.dataset.content;
    let images = e.currentTarget.dataset.images;
    let viewNum = e.currentTarget.dataset.viewnum;
    let appNum = e.currentTarget.dataset.appnum;
    let favorNum = e.currentTarget.dataset.favornum;
    let isgood = e.currentTarget.dataset.isgood;
    let iscollection = e.currentTarget.dataset.iscollection;
    let index = e.currentTarget.dataset.index;
    wx.navigateTo({
      url: '/pages/actDetail/actDetail?actid=' + actid + '&orgname=' + orgname + '&avatar=' + avatar + '&date=' + date
          + '&title=' + title + '&content=' + content + '&images=' + images + '&viewNum=' + viewNum + '&appNum='
          + appNum + '&favorNum=' + favorNum + '&isgood=' + isgood + '&iscollection=' + iscollection + '&index=' + index
    });
  },
  addGood(e) {
    let that = this;
    let isgood = e.currentTarget.dataset.isgood;
    let actid = e.currentTarget.dataset.actid;
    let index = e.currentTarget.dataset.index;
    let appNum = e.currentTarget.dataset.appnum;
    let target1 = 'cards[' + index + '].isgood';
    let target2 = 'cards[' + index + '].appNum';
    let user_id = app.globalData.userid;
    if (isgood === null) {
      wx.request({
        url: 'https://www.triple2.xyz:8082/good/add',
        data: {
          user_id: user_id,
          activity_id: actid,
        },
        success(res) {
          that.setData({
            [target1]: 1,
            [target2]: appNum + 1
          });
        }
      })
    }

  },
  addColl(e) {
    // console.log(e);
    let that = this;
    let iscollection = e.currentTarget.dataset.iscollection;
    // console.log(iscollection);
    let actid = e.currentTarget.dataset.actid;
    let index = e.currentTarget.dataset.index;
    let favorNum = e.currentTarget.dataset.favornum;
    // console.log('favorNum:', favorNum);
    let target1 = 'cards[' + index + '].iscollection';
    let target2 = 'cards[' + index + '].favorNum';
    let user_id = app.globalData.userid;
    if (iscollection === null) {
      wx.request({
        url: 'https://www.triple2.xyz:8082/collection/add',
        data: {
          user_id: user_id,
          activity_id: actid,
        },
        success(res) {
          that.setData({
            [target1]: 1,
            [target2]: favorNum + 1
          });
        }
      })
    }
    else {
      wx.request({
        url: 'https://www.triple2.xyz:8082/collection/cancel',
        data: {
          user_id: user_id,
          activity_id: actid,
        },
        success(res) {
          that.setData({
            [target1]: null,
            [target2]: favorNum - 1
          });
        }
      })
    }

  },
  setFollow(e) {
    let that = this;
    console.log(this.data.followed);
    if(this.data.followed === true) {
      console.log('cancel');
      this.setData({
        followed: false,
        watchCount: this.data.watchCount-1
      });
      wx.request({
        url: 'https://www.triple2.xyz:8082/attention/cancel',
        data: {
          user_id: app.globalData.userid,
          organization_id: that.data.orgid
        }
      })
      // 再wx.request把关注数加一
    }
    else {
      console.log('nocancel');
      this.setData({
        followed: true,
        watchCount: this.data.watchCount+1
      });
      wx.request({
        url: 'https://www.triple2.xyz:8082/attention/add',
        data: {
          user_id: app.globalData.userid,
          organization_id: that.data.orgid
        }
      })
    }
  },
  //普通函数
  setAct(resdata) {
    let that = this;
    let newCards = [];
    if (resdata instanceof Array) {
      // console.log(resdata);
      newCards = resdata.map(obj => {
        let newObj = {};
        newObj['id'] = obj['id'];
        newObj['organization_id'] = obj['organization_id'];
        newObj['name'] = obj['organization_name'];
        newObj['date'] = utils.dateDiff(Date.parse(obj.time));
        newObj['title'] = obj['title'];
        newObj['content'] = obj['text'];
        newObj['viewNum'] = obj['page_view'];
        newObj['appNum'] = obj['good'];
        newObj['favorNum'] = obj['collection'];
        // newObj['apped'] = false;
        newObj['isgood'] = obj['isgood'];
        newObj['iscollection'] = obj['iscollection'];
        return newObj;
      });

      let target = 'cards';
      let myData = {};
      myData[target] = newCards;
      this.setData(myData)
    }
    that.getActImages();

  },
  getActImages() {
    // console.log('hhh');
    let that = this;
    let cards = that.data.cards;
    let idarr = [];
    if (cards instanceof Array) {
      idarr = cards.map(obj => {
        let idobj = {};
        idobj['organization_id'] = obj['organization_id'];
        idobj['activity_id'] = obj['id'];
        return idobj;
      });
      // console.log('idarr:', idarr);
    }
    wx.request({
      url: 'https://www.triple2.xyz:8082/activity/getAllImage/',
      data: {
        id_list: idarr
      },
      success(res) {
        // console.log(res.data);
        if (cards instanceof Array) {
          for (let i = 0; i < cards.length; i++) {
            cards[i]['avatar'] = res.data[i]['organization_url'][0];
            cards[i]['images'] = res.data[i]['activity_url'];
            cards[i]['colNum'] = utils.getcolNum(res.data[i]['activity_url'].length);
          }
          let target = 'cards';
          that.setData({
            [target]: cards
          })
        }
      },
      fail(res) {
        console.log('getActImages fail');
      }
    })
  },


  // 组织信息及头像
  setOrgInfo(){
    let that = this;
    wx.request({
      url: 'https://www.triple2.xyz:8082/organization/getorganization',
      data: {
        organization_id: that.data.orgid
      },
      success(res) {
        // console.log(res.data);
        that.setData({
          ['org.name']: res.data.name,
          // avatar: res.data.avatar,
          ['org.motto']: res.data.motto,
          visitTotal: res.data.page_view,
          starCount: res.data.collection,
          watchCount: res.data.attention,
        })
      }
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (option) {
    let that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          windowHeight: res.windowHeight
        });
        console.log('winheight', that.data.windowHeight);
      }
    });


    let query = wx.createSelectorQuery().in(this);
    query.select('#topBar').boundingClientRect();
    query.exec((res) => {
      // 分别取出navbar和header的高度
      let topBarHeight = res[0].height;
      console.log('topBarHeight',topBarHeight);
      // 然后就是做个减法
      let scrollViewHeight = that.data.windowHeight - topBarHeight;
      console.log('scrollViewHeight', scrollViewHeight);
      // 算出来之后存到data对象里面
      that.setData({
        scrollViewHeight: scrollViewHeight-30
      });
      console.log(that.data.scrollViewHeight);
    });
    console.log(option);
    that.setData({
      orgid: option.orgid,
      ['org.avatar']: option.avatar
    });
    // console.log('orgid:', that.data.orgid);
    // console.log('avatar:', that.data.avatar);
    that.setOrgInfo();
    //组织发布的所有活动
    // console.log('orgid:', that.data.orgid);
    wx.request({
      url: 'https://www.triple2.xyz:8082/activity/findid',
      data: {
        organization_id: that.data.orgid,
        user_id: app.globalData.userid
      },
      success(res) {
        // console.log(res.data);
        that.setAct(res.data)
      }
    });
    wx.request({
      url: 'https://www.triple2.xyz:8082/attention/isattention',
      data: {
        user_id: app.globalData.userid,
        organization_id: that.data.orgid
      },
      success(res) {
        if(res.data == 1) {
          that.setData({
            followed: true
          })
        }else {
          that.setData({
            followed: false
          })
        }
      }
    })

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
    // console.log(this.data)
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