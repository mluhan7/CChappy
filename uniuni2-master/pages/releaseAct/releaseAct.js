// pages/releaseDynamics/releaseDynamics.js
Page({
  data: {
    imgList: [],
    isHidePlaceholder: false,
    title:'',
    text:'',
    my_select:[],
    test: '',
    // select_type:[{
    //   orgid: 0,
    //   orgname: 'test'
    // }],
    select_type:[],
    colors: ['red', 'orange', 'yellow', 'olive', 'green', 'cyan', 'blue', 'purple', 'mauve']
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
  get_title:function(e){
    // console.log(e.detail.value);
    this.setData({
      title:e.detail.value
    })
  },

  //提交
  submit: function (e) {
    let that = this;

    if(that.data.title === '' || that.data.text === '')
    {
      wx.showToast({
        icon: 'none',
        title: '标题和内容均不能为空',
        duration: 1000
      })
    }
    else{
      // console.log('else');
      wx.showLoading({
        title: '发布中',
        icon: 'Loading'
      });
      wx.request({
        url: 'https://www.triple2.xyz:8082/activity/add',
        data: {
          title: that.data.title,
          text: that.data.text,
          organization_id: that.data.organization_id,
        },
        success: function (res) {
          let activity_id = res.data;
          // console.log(idea_id);
          // console.log('@', that.data.select_type);
          console.log('activity_id:', activity_id);
          wx.hideLoading();
          that.submitImages(activity_id);
          wx.navigateBack();
          // wx.request({
          //   url: 'https://www.triple2.xyz:8082/idea/addat',
          //   data: {
          //
          //   }
          // });


        },
        fail: function (res) {
          console.log('发布活动fail');
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
  submitImages(activity_id) {
    let that = this;
    console.log(that.data.imgList);
    for (let i = 0; i < that.data.imgList.length; i++) {
      console.log('that.data.imgList[i]that.data.imgList[i]', that.data.imgList[i]);
      wx.uploadFile({
        url: 'https://www.triple2.xyz:8082/activity/addImage',
        filePath: that.data.imgList[i],
        name: 'imagefile',
        formData: {
          activity_id: activity_id,
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
    this.setData({
      organization_id: options.orgid
    });
    console.log('发布动态的组织是：', this.data.organization_id)
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
