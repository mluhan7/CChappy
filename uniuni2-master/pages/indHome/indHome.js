// pages/indHome/indHome.js
const app = getApp();
const utils = require('../../utils/util.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    avatar: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg',
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    Custom: app.globalData.Custom,
    TabCur: 0,
    scrollLeft: 0,
    picker: ['工学院', "校部","社团", "信息学院", "植科院", "动科动医学院", "资环院", "生科院", "园艺林学学院", "水产学院",  "经管院", "公管院", "食科院", "理学院", "文法院", "外国语学院", "马克思主义院","其他组织"],
    select_picker: '',
    colors: ['red', 'orange', 'yellow', 'olive', 'green', 'cyan', 'blue', 'purple', 'mauve'],
    ind: {


    },
    list: [
      {
        title: '收藏',
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
        ]
      },
      {
        title: '私信',
        cards: [
        //     {
        //   title: '秋游活动哪个部门有举办啊？',
        //   content: '秋天到啦，有没有部门组织秋游活动可以让我蹭一蹭啊！',
        //   orgs: ['华农男生女生墙', '校舞蹈团'],
        //   image: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg'
        // },
        //   {
        //     title: '秋游活动哪个部门有举办啊？',
        //     content: '秋天到啦，有没有部门组织秋游活动可以让我蹭一蹭啊！',
        //     orgs: ['华农男生女生墙', '校舞蹈团'],
        //     image: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg'
        //   }
          ]
      },
      {
        title: '关注',
        cards: [
        //     {
        //   name: '华农男生女生墙',
        //   motto: '啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦',
        //   avatar: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg'
        // },
        //   {
        //     name: '华农男生女生墙',
        //     motto: '啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦',
        //     avatar: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg'
        //   }
          ]
      }
    ]
  },
  PickerChange: function (e) {
    // console.log(e);
    let that = this;
    let index = e.detail.value;
    that.setData({
      index: index

    });
    let select_picker = that.data.picker[index];
    that.setData({
      select_picker: select_picker
    });
    app.globalData.college = that.data.select_picker;
    wx.request({
      url: 'https://www.triple2.xyz:8082/user/updatacollege',
      data: {
        user_id: app.globalData.userid,
        college: app.globalData.college
      },
      success(res) {
        console.log('succ更新学院成功');
      },fail(res) {
        console.log('fail更新学院失败');
      }
    });
    console.log('学院为' + app.globalData.college);
  },
  addGood(e) {
    let that = this;
    let isgood = e.currentTarget.dataset.isgood;
    let actid = e.currentTarget.dataset.actid;
    let index = e.currentTarget.dataset.index;
    let appNum = e.currentTarget.dataset.appnum;
    let target1 = 'list[' + that.data.TabCur + '].cards[' + index + '].isgood';
    let target2 = 'list[' + that.data.TabCur + '].cards[' + index + '].appNum';
    let user_id = app.globalData.userid;
    // console.log('activity_id:', actid);
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
        },
        fail(res) {
          console.log('..fail')
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
    let target1 = 'list[' + that.data.TabCur + '].cards[' + index + '].iscollection';
    let target2 = 'list[' + that.data.TabCur + '].cards[' + index + '].favorNum';
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
  //普通函数
  getCollection() {
    let that = this;
    wx.showLoading({
      title: '数据加载中',
      icon: 'Loading'
    });
    wx.request({
      url: 'https://www.triple2.xyz:8082/activity/collection', //仅为示例，并非真实的接口地址
      data: {
        user_id: app.globalData.userid
      },
      success(res) {
        wx.hideLoading();
        console.log('get1', res.data);
        that.setResCollection(res.data);
      },
      fail(res) {
        console.log('fail');
      }
    })
  },
  getIdeas() {
    let that = this;
    wx.showLoading({
      title: '数据加载中',
      icon: 'Loading'
    });
    wx.request({
      url: 'https://www.triple2.xyz:8082/idea/getUseridea', //仅为示例，并非真实的接口地址
      data: {
        user_id: app.globalData.userid
      },
      success(res) {
        wx.hideLoading();
        that.setResIdeas(res.data);
        // that.setRes(res.data);
        // console.log(res.data)
      },
      fail(res) {
        console.log('fail');
      }
    })
  },
  getWatchorgs() {
    let that = this;
    wx.showLoading({
      title: '数据加载中',
      icon: 'Loading'
    });
    wx.request({
      url: 'https://www.triple2.xyz:8082/organization/getattention', //仅为示例，并非真实的接口地址
      data: {
        user_id: app.globalData.userid
      },
      success(res) {
        wx.hideLoading();
        console.log('here!');
        that.setResWatches(res.data);
        // console.log(res.data)

      },
      fail(res) {
        console.log('fail');
      }
    })
  },
  setResCollection(resdata) {
    let that = this;
    let newCards = [];
    if(resdata instanceof Array) {
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

      let target = 'list[' + this.data.TabCur + '].cards';
      let myData = {};
      myData[target] = newCards;
      this.setData(myData);

      // 获取组织活动头像
      wx.request({
        url: 'https://www.triple2.xyz:8082/collection/getImage',
        data: {
          user_id: app.globalData.userid
        },
        success(res) {
          console.log('get2', res.data);
          for(let i=0; i<newCards.length; i++){
            newCards[i]['avatar'] = res.data[i].organizaiton_id[0];
            newCards[i]['images'] = res.data[i].activity_id;
            newCards[i]['colNum'] = utils.getcolNum(res.data[i].activity_id.length);
          }
          let myData = {};
          myData[target] = newCards;
          that.setData(myData)
        }
      })
    }
  },
  // 事件处理函数
  tabSelect(e) {
    let that = this;
    console.log(e.currentTarget.dataset.id);
    this.setData({
      TabCur: e.currentTarget.dataset.id,
      scrollLeft: (e.currentTarget.dataset.id - 1) * 60
    });
    if(that.data.TabCur === 0) {
      that.getCollection();
      // console.log(that.data.list[that.data.TabCur].cards.length !== 0);
    }

  else if(that.data.TabCur === 1) {
      that.getIdeas();
    }
    else if(that.data.TabCur === 2) {
      that.getWatchorgs()
    }
  },
  setResIdeas(resdata) {
    let newCards = [];
    let target = 'list[' + this.data.TabCur + '].cards';
    let that = this;
    // console.log(resdata);
    if(resdata instanceof Array) {
      newCards = resdata.map(obj => {
        let newObj = {};
        newObj['idea_id'] = obj['id'];
        newObj['title'] = obj['title'];
        newObj['content'] = obj['idea_text'];
        newObj['orgs'] = obj['name'];
        return newObj;
      });
      // console.log(newCards);
      let myData = {};
      myData[target] = newCards;
      that.setData(myData)
    }

    // 设置图片
    let cards = that.data.list[that.data.TabCur].cards;
    // console.log(cards);
    let idea_id = [];
    if (cards instanceof Array) {
      idea_id = cards.map(obj => {
        // console.log('obj:', obj);
        let value = obj['idea_id'];
        return value;
      })
    }
    console.log('idea_id', idea_id);
    wx.request({
      url: 'https://www.triple2.xyz:8082/idea/getallImage',
      data: {
        idea_id_list: idea_id.join(',')
      },
      success(res) {
        // console.log(res.data);
        for(let i=0; i<res.data.length; i++){
          if(res.data[i].length > 0) {
            cards[i]['image'] = res.data[i][0];
          }
        }
        that.setData({
          [target]: cards
        })
      },
      fail(res) {
        console.log('fail///')
      }
    })
  },
  setResWatches(resdata) {
    let newCards = [];
    let target = 'list[' + this.data.TabCur + '].cards';
    let that = this;
    // console.log(resdata);
    if(resdata instanceof Array) {
      newCards = resdata.map(obj => {
        let newObj = {};
        newObj['organization_id'] = obj['id'];
        newObj['name'] = obj['name'];
        newObj['motto'] = obj['motto'];
        return newObj;
      });
      console.log(newCards);

      let myData = {};
      myData[target] = newCards;
      that.setData(myData)
    }
    // 获取头像
    wx.request({
      url: 'https://www.triple2.xyz:8082/attention/getImage',
      data: {
        user_id: app.globalData.userid
      },
      success(res) {
        console.log(res);
        for(let i=0; i<newCards.length; i++){
          newCards[i]['avatar'] = res.data[i];
        }
        let myData = {};
        myData[target] = newCards;
        that.setData(myData)
      }
    })
  },
  navToIdeaDetail(e) {
    let ideaid = e.currentTarget.dataset.ideaid;
    let title = e.currentTarget.dataset.title;
    let content = e.currentTarget.dataset.content;
    let orgs = e.currentTarget.dataset.orgs;
    orgs = JSON.stringify(orgs);
    // console.log('navTo, orgs:', orgs);
    let index = e.currentTarget.dataset.index;
    wx.navigateTo({
      url: '/pages/ideaDetail/ideaDetail?ideaid=' + ideaid +
          '&title=' + title + '&content=' + content + '&orgs=' + orgs + '&index=' + index,
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

  navToOrg(e) {
    let orgid = e.currentTarget.dataset.orgid;
    let avatar = e.currentTarget.dataset.avatar;
    if (orgid) {
      wx.navigateTo({
        url: '/pages/orgHome/orgHome?orgid=' + orgid + '&avatar=' + avatar
      });
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log('indHome-id:', app.globalData.userid);
    let that = this;
    console.log('appData:', app.globalData);
    that.setData({
      ['ind.name']: app.globalData.nickName,
      ['ind.avatar']: app.globalData.avatarUrl,
      select_picker: app.globalData.college
    });
    that.getCollection();
    wx.getSystemInfo({
      success: function(res) {
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
    });
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
    console.log('indid:', app.globalData.userid);
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
    console.log('indHome onUnload');
    // //获取页面栈
    // let pages = getCurrentPages();
    // if (pages[1].route === 'pages/index/index') {
    //   wx.navigateBack({delta: 1});
    // }
    // else {
    //   console.log('进入三级返回', pages);
    //   wx.setStorageSync('goBack', true);
    //   wx.navigateBack({delta: 3});
    // }
    // wx.navigateBack({delta: 3});
    // wx.reLaunch({
    //   url: '/pages/index/index'
    // })
    // wx.navigateBack()
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