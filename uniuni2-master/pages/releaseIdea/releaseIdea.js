// pages/releaseDynamics/releaseDynamics.js
const app = getApp();
Page({
  data: {
    imgList: [],
    isHidePlaceholder: false,
    title: '',
    text: '',
    my_select: [],
    test: '',
    // select_type: [{
    //   orgid: 1,
    //   orgname: '测试用'
    // }],
    select_type: [],
    colors: ['red', 'orange', 'yellow', 'olive', 'green', 'cyan', 'blue', 'purple', 'mauve']
  },
  deleteAt(e){
    let atindex = e.currentTarget.dataset.atindex;
    let newtype = this.data.select_type;
    console.log(newtype)
    newtype.splice(atindex, 1);
    this.setData({
      select_type: newtype
    })
    console.log(this.data.select_type)
  },
  ChooseImage() {
    wx.chooseImage({
      count: 9, //默认9
      sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], //从相册选择
      success: (res) => {
        if (this.data.imgList.length != 0) {
          this.setData({
            imgList: this.data.imgList.concat(res.tempFilePaths)
          })
        } else {
          this.setData({
            imgList: res.tempFilePaths
          })
        }
        /*wx.getFileSystemManager().readFile({
          filePath: res.tempFilePaths[0],
          encoding: 'base64',
          success: res => {
            console.log("data:image/png;base64," + res.data)
          }
        })*/
      }
    });
  },
  ViewImage(e) {
    wx.previewImage({
      urls: this.data.imgList,
      current: e.currentTarget.dataset.url
    });
  },
  DelImg(e) {
    this.data.imgList.splice(e.currentTarget.dataset.index, 1);
    this.setData({
      imgList: this.data.imgList
    })
  },
  // textarea 输入时触发
  getTextareaInput: function (e) {
    // console.log(e.detail.value);
    this.setData({
      text: e.detail.value
    })
  },
  //获取标题内容
  get_title: function (e) {
    // console.log(e.detail.value);
    this.setData({
      title: e.detail.value
    })
  },
  //@组织
  select: function () {
    wx.navigateTo({
      url: '/pages/mark/mark'
    });

  },
  //提交
  submit: function (e) {
    let that = this;
    let orglist = [];

    orglist = that.data.select_type.map(obj => {
      let value = parseInt(obj['orgid']);
      return value;
    });
    orglist = orglist.join(',');
    console.log('orglist:', orglist);
    if (orglist === '') {
      wx.showToast({
        icon: 'none',
        title: '想法必须至少@一个组织',
        duration: 1000
      })
    } else if(that.data.title === '' || that.data.text === '')
    {
      wx.showToast({
        icon: 'none',
        title: '标题和内容均不能为空',
        duration: 1000
      })
    }
    else{
      console.log('else');
      wx.showLoading({
        title: '传送中',
        icon: 'Loading'
      });
      wx.request({
        data: {
          title: that.data.title,
          idea_text: that.data.text,
          user_id: app.globalData.userid,
          organizationid_list: orglist
        },
        url: 'https://www.triple2.xyz:8082/idea/add',
        success: function (res) {
          let idea_id = res.data;
          // console.log(idea_id);
          // console.log('@', that.data.select_type);
          console.log('idea_id:', idea_id);
          wx.hideLoading();
          that.submitImages(idea_id);
          wx.navigateBack();
          // wx.request({
          //   url: 'https://www.triple2.xyz:8082/idea/addat',
          //   data: {
          //
          //   }
          // });


        },
        fail: function (res) {
          console.log('添加想法fail');
          // wx.showToast({
          //   title: '失败，内容可能为空',
          //   icon: 'none',
          //   duration: 1000,
          //   mask: true,
          // });
        },
      });
      // console.log("你的标题是：" + this.data.title);
      // console.log("你的正文是：" + this.data.text);
    }
  },
  submitImages(idea_id) {
    let that = this;
    console.log(that.data.imgList);
    for (let i = 0; i < that.data.imgList.length; i++) {
      wx.uploadFile({
        url: 'https://www.triple2.xyz:8082/idea/addImage',
        filePath: that.data.imgList[i],
        name: 'imagefile',
        formData: {
          idea_id: idea_id,
          count: i,
        },
        success(res) {
          console.log('图片发布成功')
        },
        fail() {
          console.log('上传图片失败');
        }
      })
    }
    wx.showToast({
      title: '发布成功',
      icon: 'success',
      duration: 1000,
      mask: true,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    // console.log('test:', this.data.test);
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
})
