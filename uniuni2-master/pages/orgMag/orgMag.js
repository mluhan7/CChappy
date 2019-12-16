// pages/indHome/indHome.js
const utils = require('../../utils/util.js');
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    avatar: '',
    windowHeight: 0,
    scrollViewHeight: 0,
    organization_id: 0,
    TabCur: 0,
    scrollLeft: 0,
    visitTotal: 0,
    starCount: 0,
    watchCount: 0,
    modalName: null,
    confirmDelete: false,
    actid: -1,
    avatarImgList: [],
    org: {
    },
    colors: ['red', 'orange', 'yellow', 'olive', 'green', 'cyan', 'blue', 'purple', 'mauve'],

    list: [
      {
        title: '我的发布',
        cards: [

        ]
      },
      {
        title: '收到私信',
        cards: []
      }
    ]
  },
  // 普通函数
  tabAct() {
    let that = this;
    let organization_id = that.data.organization_id;
    wx.request({
      // url: 'https://www.triple2.xyz:8082/activity/findid',
      url: 'https://www.triple2.xyz:8082/activity/findid?organization_id=1&user_id=1',
      data: {
        organization_id: organization_id,
        user_id: app.globalData.userid
      },
      success(res) {
        console.log(res.data);
        that.setRes(res.data);
      },
      fail(res) {
        console.log('fail')
      }
    })
  },
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

      let target = 'list[' + this.data.TabCur + '].cards';
      let myData = {};
      myData[target] = newCards;
      this.setData(myData)
    }
    that.getActImages();

  },
  getActImages() {
    // console.log('hhh');
    let that = this;
    let cards = that.data.list[that.data.TabCur].cards;
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
        console.log(res.data);
        if (cards instanceof Array) {
          for (let i = 0; i < cards.length; i++) {
            cards[i]['avatar'] = res.data[i]['organization_url'][0];
            cards[i]['images'] = res.data[i]['activity_url'];
            cards[i]['colNum'] = utils.getcolNum(res.data[i]['activity_url'].length);
          }
          let target = 'list[' + that.data.TabCur + '].cards';
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
  tabIdea() {
    let that = this;
    let organization_id = that.data.organization_id;
    wx.request({
      url: 'https://www.triple2.xyz:8082/idea/get',
      data: {
        organization_id: organization_id
      },
      success(res) {
        console.log(res.data);

        if (res.data instanceof Array) {
          let ideaCards = [];
          ideaCards = res.data.map(function (obj) {
            let robj = {};
            robj['id'] = obj.id;
            robj['title'] = obj.title;
            robj['content'] = obj.idea_text;
            robj['orgs'] = obj['name'];
            // robj['id'] = obj.id; 没有orgs和image
            return robj;
          });
          that.setData({
            'list[1].cards': ideaCards
          });
          that.setIdeaImages();
        }


      },
      fail(res) {
        console.log('fail')
      }
    })
  },
  setIdeaImages() {
    let that = this;
    // 设置图片
    let cards = that.data.list[that.data.TabCur].cards;
    console.log(cards);
    let target = 'list[' + this.data.TabCur + '].cards';
    // console.log(cards);
    let idea_id = [];
    if (cards instanceof Array) {
      idea_id = cards.map(obj => {
        // console.log('obj:', obj);
        let value = obj['id'];
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
        for (let i = 0; i < res.data.length; i++) {
          if (res.data[i].length > 0) {
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
  // 事件处理函数
  editName(e) {
    let that = this;
    let newName = e.detail.value;
    that.setData({
      ['org.name']: newName
    });
    wx.request({
      url: 'https://www.triple2.xyz:8082/organization/editname/',
      data:{
        organization_id: that.data.organization_id,
        name: newName
      },
      success(res) {
        console.log('名字修改成功')
      },
      fail(res) {
        console.log('名字修改失败')
      }
    })
  },
  editMotto(e) {
    let that = this;
    let newMotto = e.detail.value;
    that.setData({
      ['org.motto']: newMotto
    });
    wx.request({
      url: 'https://www.triple2.xyz:8082/organization/editmotto/',
      data:{
        organization_id: that.data.organization_id,
        motto: newMotto
      },
      success(res) {
        console.log('签名修改成功')
      },
      fail(res) {
        console.log('签名修改失败')
      }
    })
  },
  tabSelect(e) {
    console.log(e.currentTarget.dataset.id);
    this.setData({
      TabCur: e.currentTarget.dataset.id,
      scrollLeft: (e.currentTarget.dataset.id - 1) * 60
    });
    if (this.data.TabCur === 1) {
      this.tabIdea();
    } else if (this.data.TabCur === 0) {
      this.tabAct();
    }
  },

  showModal(e) {
    console.log("我已经点击了model");
    console.log(e);
    let actid = e.currentTarget.dataset.actid;
    let cardindex = e.currentTarget.dataset.cardindex;
    console.log('这个actid:', actid);
    // console.log('getModel');
    if (actid != -1) {
      this.setData({
        modalName: e.currentTarget.dataset.target,
        actid: actid,
        cardindex: cardindex
      })
    }
    console.log('data:', this.data.actid, this.data.cardindex);
  },

  hideModal(e) {
    console.log('hideModal');
    this.setData({
      modalName: null,
    })
  },
  editAct(e) {
    console.log('here!');
    let that = this;
    console.log(that.data.cardindex);
    let title = that.data.list[that.data.TabCur].cards[that.data.cardindex].title;
    let content = that.data.list[that.data.TabCur].cards[that.data.cardindex].content;
    console.log(title, content);
    that.hideModal();
    if (that.data.actid != -1) {
      wx.navigateTo({
        url: '/pages/editAct/editAct?' + 'actid=' + that.data.actid + '&title=' + title + '&content=' + content
      })
    }
  },
  confirmDelete(e) {
    this.hideModal();
    this.setData({
      confirmDelete: true
    })
  },
  cancelDelete(e) {
    this.setData({
      confirmDelete: false
    })

  },
  //删除动态
  deleteD(e) {
    let that = this;
    that.setData({
      confirmDelete: false
    });
    console.log("删除");
    console.log('actid:', that.data.actid);
    wx.request({
      data: {
        activity_id: that.data.actid,
      },
      url: 'https://www.triple2.xyz:8082/activity/delete',
      success(res) {
        // console.log("成功:", res.data);
        that.tabAct();
        wx.showToast({
          title: '删除成功',
          icon: 'success',
          duration: 1000,
          mask: true,
        });
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
    console.log(e);
    let actid = e.currentTarget.dataset.actid;
    console.log('actid:', actid);
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
      url: '/pages/actDetail/actDetail?actid=' + actid
          + '&orgname=' + orgname + '&avatar=' + avatar + '&date=' + date
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
  addAct(e) {
    wx.navigateTo({
      url: '/pages/releaseAct/releaseAct?orgid=' + this.data.organization_id
    })
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
  ChooseImage() {
    let that = this;
    wx.chooseImage({
      count: 1, //默认9
      sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], //从相册选择
      success: (res) => {
        this.setData({
          avatarImgList: res.tempFilePaths
        });
        wx.uploadFile({
          url: 'https://www.triple2.xyz:8082/organization/addImage',
          filePath: that.data.avatarImgList[0],
          name: 'imagefile',
          formData: {
            organization_id: that.data.organization_id,
            count: 1,
          },
          success(res) {
            console.log('头像发布成功，头像更新需要时间请耐心等待');
            wx.showToast({
              icon: 'success',
              title: '头像更新需要时间请耐心等待'
            });
            that.setData({
              ['org.avatar']: that.data.avatarImgList[0]
            })
          },
          fail() {
            console.log('头像图片失败');
          }
        })
      }
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options);
    let that = this;
    that.setData({
      organization_id: parseInt(options.orgid)
    });

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
        scrollViewHeight: scrollViewHeight
      });
      console.log(that.data.scrollViewHeight);
    });
    wx.request({
      url: 'https://www.triple2.xyz:8082/organization/getorganization',
      data: {
        organization_id: this.data.organization_id
      },
      success(res) {
        that.setData({
          ['org.name']: res.data.name,
          // avatar: res.data.avatar,
          ['org.motto']: res.data.motto,
          visitTotal: res.data.page_view,
          starCount: res.data.collection,
          watchCount: res.data.attention,
        })
      },
      fail() {
        console.log("获取组织信息失败");
      }
    });
    wx.request({
      url: 'https://www.triple2.xyz:8082/organization/getImage',
      data: {
        organization_id: this.data.organization_id
      },
      success(res) {
        // console.log('头像', res.data);
        that.setData({
          ['org.avatar']: res.data[0]
        })
      }
    });
    this.tabAct()
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
    this.tabAct();
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
    wx.navigateBack({
      delta: 1
    })
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