// pages/releaseDynamics/releaseDynamics.js
Page({
  data: {
    imgList: [],
    isHidePlaceholder: false,
    title:'',
    text:'',
    my_select:[],
    test: '',
    select_type:[],
    colors: ['red', 'orange', 'yellow', 'olive', 'green', 'cyan', 'blue', 'purple', 'mauve']
  },
  ChooseImage() {
    let that = this;
    wx.chooseImage({
      count: 9, //默认9
      sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], //从相册选择
      success: (res) => {
        if (res.tempFilePaths.length != 0) {
          that.submitImages(res.tempFilePaths);

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
    let that = this;
    wx.request({
      url: 'https://www.triple2.xyz:8082/activity/deleteImage',
      data: {
        activity_id: that.data.activity_id,
        count: e.currentTarget.dataset.index + 1
      },
      success(res) {
        console.log('actid:', that.data.activity_id);
        that.data.imgList.splice(e.currentTarget.dataset.index, 1);
        that.setData({
          imgList: that.data.imgList
        });
        console.log('succ删除图片成功, count：', e.currentTarget.dataset.index + 1);
        wx.showToast({
          icon: 'success',
          title: '删除成功'
        })
        // console.
      },
      fail(res) {
        console.log('fail删除图片失败');
        wx.showToast({
          // icon: 'success',
          title: '删除失败，请重新删除'
        })
      }
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
        title: '更新中',
        icon: 'Loading'
      });
      wx.request({
        url: 'https://www.triple2.xyz:8082/activity/edit',
        data: {
          title: that.data.title,
          text: that.data.text,
          activity_id: that.data.activity_id,
        },
        success: function (res) {
          // let activity_id = res.data;
          // console.log(idea_id);
          // console.log('@', that.data.select_type);
          // console.log('activity_id:', that.data.activity_id);
          // that.submitImages(that.data.activity_id);
          wx.hideLoading();
          wx.showToast({
            title: '编辑成功',
            icon: 'success',
            duration: 1000,
            mask: true,
          });
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
  submitImages(imglist) {
    let that = this;
    console.log('待添加的图片：', imglist);
    for (let i = 0; i < imglist.length; i++) {
      wx.uploadFile({
        url: 'https://www.triple2.xyz:8082/activity/addImage',
        filePath: imglist[i],
        name: 'imagefile',
        formData: {
          activity_id: that.data.activity_id,
          count: that.data.imgList.length,
        },
        success(res) {
          console.log(that.data)
          that.data.imgList.push(imglist[i]);
          that.setData({
            imgList: that.data.imgList
          });
          console.log('图片发布成功，imgList为:', that.data.imgList);

        },
        fail() {
          console.log('上传图片失败');
        }
      })
    }

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    console.log(options);
    // console.log('editAct:', actid);
    that.setData({
      activity_id: options.actid,
      title: options.title,
      text: options.content
    });
    wx.request({
      url: 'https://www.triple2.xyz:8082/activity/getImage',
      data: {
        activity_id: that.data.activity_id
      },
      success(res) {
        that.setData({
          imgList: res.data
        })
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