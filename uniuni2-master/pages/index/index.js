//index.js
//获取应用实例
const app = getApp();
const utils = require('../../utils/util.js');

Page({
  data: {
    TabCur: 0,
    scrollLeft: 0,
    windowHeight: 0,
    myAvatar: '',
    gridCol: 3,
    scrolltop: 0,
    iconList: [{
      icon: 'iconfont icon-jiaoshikebiao',
      color: 'blue',
      name: '查空教室'
    }, {
      icon: 'iconfont icon-cengke',
      color: 'purple',
      name: '蹭一蹭'
    }, {
      icon: 'iconfont icon-dengpao',
      color: 'gray',
      name: '待探索~'
    }],
    tabs: [
      {
        title: '社团',
        // cards: [

        // {
        //   id: 0,
        //   avatar: 'http://www.triple2.xyz:8088/3.jpg',
        //   name: '华农男生女生墙',
        //   date: '今天13:58',
        //   title: '如初',
        //   content: '人生最好的三个词\n久别重逢，失而复得，虚惊一场\n却唯独没有一个词\n叫和好如初\n和好容易，如初多难啊\n——《你会怎么回忆我们》',
        //   images: ['http://www.triple2.xyz:8088/3.jpg'],
        //   viewNum: 19,
        //   appNum: 10,
        //   favorNum: 4
        // },
        // {
        //   id: 1,
        //   avatar: 'http://www.triple2.xyz:8088/3.jpg',
        //   name: '华农表白墙',
        //   date: '2019年12月3日',
        //   title: '欢喜',
        //   content: 'think about it',
        //   image: '',
        //   viewNum: 28,
        //   appNum: 14,
        //   favorNum: 2
        // },
        // {
        //   id: 2,
        //   avatar: 'http://www.triple2.xyz:8088/3.jpg',
        //   name: '华农生保',
        //   date: '2019年12月3日',
        //   title: '欢喜个鬼',
        //   content: 'hhhhh',
        //   image: '',
        //   viewNum: 28,
        //   appNum: 14,
        //   favorNum: 2
        // },
        // {
        //   id: 3,
        //   avatar: 'http://www.triple2.xyz:8088/3.jpg',
        //   name: '华农男生女生墙',
        //   date: '2019年12月3日',
        //   title: '在你身边',
        //   content: '有没有一个沙雕',
        //   image: '',
        //   viewNum: 28,
        //   appNum: 14,
        //   favorNum: 2
        // }
        // ]
      },
      {
        title: '最新',
      },
      {
        title: '最热',
        // cards: [

        // {
        //   id: 1,
        //   avatar: 'http://www.triple2.xyz:8088/3.jpg',
        //   name: '华农表白墙',
        //   date: '2019年12月3日',
        //   title: '欢喜',
        //   content: 'think about it',
        //   image: '',
        //   viewNum: 28,
        //   appNum: 14,
        //   favorNum: 2
        // }
        // ]
      },
      {
        title: '关注',
      },
      {
        title: '关注单位',
      },
      {
        title: '校部',
      },
      {
        title: '工学院',
      },
      {
        title: '信息学院',
      },
      {
        title: '植科院',
      },
      {
        title: '动科动医学院',
      },
      {
        title: '资环院',
      },
      {
        title: '生科院',
      },
      {
        title: '园艺林学学院',
      },
      {
        title: '水产学院',
      },
      {
        title: '经管院',
      },
      {
        title: '公管院',
      },
      {
        title: '食科院',
      },
      {
        title: '理学院',
      },
      {
        title: '文法院',
      },
      {
        title: '外国语学院',
      },
      {
        title: '马克思主义院',
      },
      {
        title: '生物医学与健康院',
      },
      {
        title: '其他组织',
      },]
  },
  //事件处理函数
  viewScroll(e) {
    let that = this;
    // console.log('scrollTop:', e.detail.scrollTop);
    // if()
    that.setData({
      scrolltop: e.detail.scrollTop
    });
  },
  goTop(e) {
    let that = this;
    that.setData({
      scrolltop: 0
    })
  },
  goTab() {
    let that = this;
    wx.showLoading({
      title: '数据加载中'
    });
    if (that.data.TabCur == 0 || that.data.TabCur >= 4) {
      wx.request({
        url: 'https://www.triple2.xyz:8082/activity/findtype', //仅为示例，并非真实的接口地址
        data: {
          type: that.data.tabs[that.data.TabCur].title,
          // type: '信息学院',
          user_id: app.globalData.userid
        },
        success(res) {
          // console.log(res.data);
          wx.hideLoading();
          that.setRes(res.data);
          that.emptyCards();
        },
        fail(res) {
          console.log('fail');
        }
      })
    } else if (that.data.TabCur == 3) {
      if (app.globalData.userid) {
        wx.request({
          url: 'https://www.triple2.xyz:8082/activity/attention',
          data: {
            user_id: app.globalData.userid
          },
          success(res) {
            // console.log(res.data);
            wx.hideLoading();
            // console.log(res.data);
            that.setRes(res.data);
            that.emptyCards();
          }
        })
      } else {
        wx.hideLoading();
      }
    } else if (that.data.TabCur == 2) {
      wx.request({
        url: 'https://www.triple2.xyz:8082/activity/hot', //仅为示例，并非真实的接口地址
        data: {
          user_id: app.globalData.userid
        },
        success(res) {
          wx.hideLoading();
          that.setRes(res.data);
          that.emptyCards();
        },
        fail(res) {
          console.log('fail');
        }
      })
    } else if (that.data.TabCur == 1) {
      console.log('here~');
      wx.request({
        url: 'https://www.triple2.xyz:8082/activity/new', //仅为示例，并非真实的接口地址
        data: {
          user_id: app.globalData.userid
        },
        success(res) {
          wx.hideLoading();
          // console.log(res.data);
          that.setRes(res.data);
          that.emptyCards();
        },
        fail(res) {
          console.log('test fail');
        }
      });

    }
  },
  emptyCards() {
    let that = this;
    if(that.data.tabs[that.data.TabCur].cards instanceof Array
        && that.data.tabs[that.data.TabCur].cards.length >=1) {
      console.log('数组有效');
    }else {
      console.log('数组无效');
      console.log(that.data.tabs[that.data.TabCur].cards);
      setTimeout(()=>{
        console.log('setTimeout');
        // console.log(that.data.tabs);
        that.setData({
          TabCur: 1,
          scrollLeft: 0
        });
        wx.request({
          url: 'https://www.triple2.xyz:8082/activity/new', //仅为示例，并非真实的接口地址
          data: {
            user_id: app.globalData.userid
          },
          success(res) {
            wx.hideLoading();
            // console.log(res.data);
            that.setRes(res.data);
          },
          fail(res) {
            console.log('test fail');
          }
        });
      }, 1000);

    }
  },
  tabSelect(e) {
    let that = this;
    this.setData({
      TabCur: e.currentTarget.dataset.id,
      scrollLeft: (e.currentTarget.dataset.id - 1) * 60
    });
    that.goTab();
  },
  navToAll(e) {
    wx.navigateTo({
      url: '/pages/allorgs/allorgs'
    });
  },
  navToInd(e) {
    console.log('navToInd');
    wx.navigateTo({
      url: '/pages/indHome/indHome'
    });
  },
  navToOrg(e) {
    let orgid = e.currentTarget.dataset.orgid;
    let avatar = e.currentTarget.dataset.avatar;
    if (orgid) {
      wx.navigateTo({
        url: '/pages/orgHome/orgHome?orgid=' + orgid + '&avatar=' + avatar
      });
    }
  },
  releaseIdea(e) {
    console.log('navToreleaseIdea');
    wx.navigateTo({
      url: '/pages/releaseIdea/releaseIdea'
    });
  },
  navToOrgMag(e) {
    wx.navigateTo({
      url: '/pages/login/login'
    });
  },
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
  navToSearchAct(e) {
    wx.navigateTo({
      url: '/pages/searchAct/searchAct'
    });
  },
  getTools(e) {
    this.setData({
      modalName: e.currentTarget.dataset.target
    })
  },
  hideModal(e) {
    this.setData({
      modalName: null
    })
  },

  navToFuns(e) {
    let funid = e.currentTarget.dataset.funid;
    if (funid == 0) {
      this.navToFreeroom()
    } else if (funid == 1) {
      this.navToAuditing()
    }
  },
  addGood(e) {
    let that = this;
    let isgood = e.currentTarget.dataset.isgood;
    let actid = e.currentTarget.dataset.actid;
    let index = e.currentTarget.dataset.index;
    let appNum = e.currentTarget.dataset.appnum;
    let target1 = 'tabs[' + that.data.TabCur + '].cards[' + index + '].isgood';
    let target2 = 'tabs[' + that.data.TabCur + '].cards[' + index + '].appNum';
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
    let target1 = 'tabs[' + that.data.TabCur + '].cards[' + index + '].iscollection';
    let target2 = 'tabs[' + that.data.TabCur + '].cards[' + index + '].favorNum';
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
    } else {
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
  // 普通函数
  setRes(resdata) {
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

      let target = 'tabs[' + this.data.TabCur + '].cards';
      let myData = {};
      myData[target] = newCards;
      this.setData(myData)
    }
    that.getActImages();

  },
  getActImages() {
    // console.log('hhh');
    let that = this;
    let cards = that.data.tabs[that.data.TabCur].cards;
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
          let target = 'tabs[' + that.data.TabCur + '].cards';
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

  navToFreeroom() {
    wx.navigateTo({
      url: '/pages/freeroom/freeroom'
    });
  },
  navToAuditing() {
    wx.navigateTo({
      url: '/pages/auditing/auditing'
    });
  },
  // 生命周期函数
  onLoad: function () {
    console.log('当前用户：', app.globalData.userid);
    let that = this;
    that.setData({
      myAvatar: app.globalData.avatarUrl
    });
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          windowHeight: res.windowHeight
        });
      }
    });

    let query = wx.createSelectorQuery().in(this);
    query.select('#topBar').boundingClientRect();
    query.exec((res) => {
      // 分别取出navbar和header的高度
      let topBarHeight = res[0].height;
      // 然后就是做个减法
      let scrollViewHeight = that.data.windowHeight - topBarHeight;
      // 算出来之后存到data对象里面
      this.setData({
        scrollViewHeight: scrollViewHeight
      });
    })

    wx.showLoading({
      title: '数据加载中',
      icon: 'Loading'
    });

    let delindex;
    let tabs = that.data.tabs;
    console.log('newtab-college', app.globalData.college);
    if (tabs instanceof Array) {
      let newtab = tabs.find(function (value, index) {
        delindex = index;
        return value.title === app.globalData.college;
      });
      console.log('newtab:', newtab);
      if (delindex) {
        tabs.splice(delindex, 1);
      } else {
        console.log('delindex不存在');
      }
      tabs.splice(4, 1, newtab);

      that.setData({
        tabs: tabs
      });
    } else {
      console.log('find失败')
    }

    that.goTab();
    // wx.request({
    //   url: 'https://www.triple2.xyz:8082/activity/findtype', //仅为示例，并非真实的接口地址
    //   data: {
    //     type: that.data.tabs[0].title,
    //     // type: '信息学院',
    //     user_id: app.globalData.userid
    //   },
    //   success(res) {
    //     // console.log(res.data);
    //     wx.hideLoading();
    //     that.setRes(res.data);
    //     // console.log(that.data.tabs[that.data.TabCur].cards);
    //     // console.log(that.data.tabs[that.data.TabCur].cards.length === 0);
    //   },
    //   fail(res) {
    //     console.log('fail');
    //   }
    // })

    // wx.request({
    //   url: 'https://www.triple2.xyz:8082/activity/new', //仅为示例，并非真实的接口地址
    //   data: {
    //     user_id: app.globalData.userid
    //   },
    //   success(res) {
    //     wx.hideLoading();
    //     // console.log(res.data);
    //     that.setRes(res.data);
    //   },
    //   fail(res) {
    //     console.log('test fail');
    //   }
    // });
    that.setData({
      myAvatar: app.globalData.avatarUrl
    })
  },
  onShow() {
    let that = this;
    let tabs = that.data.tabs;
    let swapindex;
    let newtab = tabs.find(function (value, index) {
      swapindex = index;
      return value.title === app.globalData.college;
    });
    if (swapindex) {
      let swaptab = tabs[4];
      tabs[4] = tabs[swapindex];
      tabs[swapindex] = swaptab;
      that.setData({
        tabs: tabs
      });
      that.goTab();
    }
  },
  // 下拉刷新
  // onPullDownRefresh: function () {
  //   var that =this;
  //   // 显示顶部刷新图标
  //   wx.showNavigationBarLoading();
  //   wx.request({
  //     url: 'https://www.triple2.xyz:8082/activity/new', //仅为示例，并非真实的接口地址
  //     data: {
  //       user_id: app.globalData.userid
  //     },
  //     success(res) {
  //       wx.hideLoading();
  //       // console.log(res.data);
  //       that.setRes(res.data);
  //     },
  //     fail(res) {
  //       console.log('test fail');
  //     }
  //   });
  //   console.log(that.data.moment);
  //       // 隐藏导航栏加载框
  //   wx.hideNavigationBarLoading();
  //       // 停止下拉动作
  //   wx.stopPullDownRefresh();
  // },
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
