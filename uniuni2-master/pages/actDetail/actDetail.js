const app = getApp();
Page({
  data: {
    colNum: 3
  },
  ViewImage(e) {
    wx.previewImage({
      urls: this.data.imgList,
      current: e.currentTarget.dataset.url
    });
  },
  onLoad(options) {
    console.log('options:', options);
    let that = this;
    wx.request({
      url: 'https://www.triple2.xyz:8082/activity/pageview',
      data: {
        activity_id: options.actid,
      },
      success() {
        if(options['orgid']){
          console.log('请求组织头像');
          wx.request({
            url: 'https://www.triple2.xyz:8082/organization/getImage',
            data: {
              organization_id: options['orgid']
            },
            success(res) {
              console.log('响应', res.data);
              that.setData({
                avatar: res.data[0]
              })
            }
          });
        }

        console.log('访问');
        console.log('opts:', options);
        that.setData({
          avatar: options.avatar,
          name: options.orgname,
          date: options.date
        });
        let newdata = {};
        newdata['index'] = options['index'];
        newdata['id'] = options['actid'];
        newdata['title'] = options['title'];
        newdata['content'] = options['content'];
        newdata['viewNum'] = parseInt(options['viewNum']) + 1;
        newdata['appNum'] = parseInt(options['appNum']);
        newdata['favorNum'] = parseInt(options['favorNum']);
        // newdata['avatar'] = options['avatar'];
        // newdata['name'] = options['orgname'];
        // newdata['date'] = options['date'];
        newdata['isgood'] = options['isgood'];
        newdata['iscollection'] = options['iscollection'];
        that.setData(newdata);
        console.log('data:', that.data);
        wx.request({
          url: 'https://www.triple2.xyz:8082/activity/getImage',
          data: {
            activity_id: options['actid']
          },
          success(res) {
            let colNum = that.getcolNum(res.data.length);
            that.setData({
              imgList: res.data,
              colNum: colNum
            })
          }
        })
      },
      fail() {
        console.log('访问失败');
      }

    })

  },
  getcolNum(imgNum) {
    let colNum = 3;
    if(imgNum === 1) {
      colNum = 1;
    }else if(imgNum === 2 || imgNum === 4) {
      colNum = 2;
    }else{
      colNum = 3;
    }
    return colNum;
  },
  addGood(e) {
    let that = this;
    let isgood = e.currentTarget.dataset.isgood;
    let actid = e.currentTarget.dataset.actid;
    let appNum = e.currentTarget.dataset.appnum;
    let target1 = 'isgood';
    let target2 = 'appNum';
    let user_id = app.globalData.userid;
    if (isgood === null || isgood === 'null' || isgood === undefined || isgood === 'undefined') {
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
    console.log('iscoll', iscollection);
    let actid = e.currentTarget.dataset.actid;
    let favorNum = e.currentTarget.dataset.favornum;
    // console.log('favorNum:', favorNum);
    let target1 = 'iscollection';
    let target2 = 'favorNum';
    let user_id = app.globalData.userid;
    if (iscollection === null || iscollection === 'null' || iscollection === undefined || iscollection === 'undefined') {
      console.log('here..');
      wx.request({
        url: 'https://www.triple2.xyz:8082/collection/add',
        data: {
          user_id: user_id,
          activity_id: actid,
        },
        success(res) {
          console.log('succ');
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
  onUnload: function () {
    // let that = this;
    // let pages = getCurrentPages();
    // let prevPage = pages[ pages.length - 2 ];
    // console.log('here, onUnload, index:', that.data.index);
    // prevPage.setData({
    //   refreshindex: that.data.index
    // });
    // wx.navigateBack({
    //   delta: 1
    // })
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