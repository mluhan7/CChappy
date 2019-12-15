// pages/loginAdmin/loginAdmin.js
Page({
  data: {
    is_show: false,
    cf_is_show: false,
    email_right: true,
    show: true,
    cf_show: true,
    pwd_hint: '',
    imgList: [],
    user_email: "",
    user_password: "",
    cf_user_password: '',
    pwd_right: true,
    cf_right: true,
    picker: [ "校部","社团", '工学院', "信息学院", "植科院", "动科动医学院", "资环院", "生科院", "园艺林学学院", "水产学院", "经管院", "公管院", "食科院", "理学院", "文法院", "外国语学院", "马克思主义院","其他组织"],
    index: null,
    select_picker: '',
    text: '',
    type_right:true,
    user_type:"",
  },
  ChooseImage() {
    wx.chooseImage({
      count: 9, //默认9
      sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album'], //从相册选择
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
  showPassword: function (e) {
    console.log("点击了眼睛");
    if (!this.data.is_show) {
      console.log("眼睛改成可以看见");
      this.setData({
        is_show: true,
        show: false
      })
    } else {
      console.log("眼睛改成可以闭着");
      this.setData({
        is_show: false,
        show: true
      })
    }
  },
  cf_showPassword: function (e) {
    console.log("点击了眼睛");
    if (!this.data.cf_is_show) {
      console.log("眼睛改成可以看见");
      this.setData({
        cf_is_show: true,
        cf_show: false
      })
    } else {
      console.log("眼睛改成可以闭着");
      this.setData({
        cf_is_show: false,
        cf_show: true
      })
    }
  },

  PickerChange: function (e) {
    console.log(e);
    var index = e.detail.value;
    this.setData({
      index: index

    });
    var select_picker = this.data.picker[index];
    this.setData({
      select_picker: select_picker
    })
    console.log('学院为' + this.data.picker[index]);
  },
  textareaAInput(e) {
    var text = e.detail.value
    this.setData({
      text: text
    });
    // console.log("文本内容:" + this.data.text);
  },
  pwdInput(e) {
    this.setData({
      user_password: e.detail.value
    });

    // if (this.data.user_password.length < 6 || this.data.user_password.length >20) {
    //   this.setData({
    //     pwd_right: false,
    //     pwd_hint: '密码长度需为6~20位'
    //   })
    // } else {
    //   let reg = /^(?!([a-zA-Z]+|\d+)$)[a-zA-Z\d]{6,20}$/;
    //   if (reg.test(this.data.user_password)) {
    //     // console.log('验证通过');
    //     this.setData({
    //       email_right: true,
    //       pwd_hint: ''
    //     })
    //   } else {
    //     // console.log('验证失败');
    //     this.setData({
    //       pwd_right: false,
    //       pwd_hint: '密码需同时包含数字和字母，可以有符号'
    //     })
    //   }
    // }
  },
  emailInput(e) {
    // console.log('hh');
    this.setData({
      user_email: e.detail.value
    });
    let reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
    if (reg.test(this.data.user_email)) {
      // console.log('验证通过');
      this.setData({
        email_right: true
      })
    } else {
      // console.log('验证失败');
      this.setData({
        email_right: false
      })
    }
  },
  cf_pwdInput(e) {
    this.setData({
      cf_user_password: e.detail.value
    });
    if (this.data.user_password !== this.data.cf_user_password) {
      this.setData({
        cf_right: false
      });
      // console.log('false')
    } else {
      this.setData({
        cf_right: true
      });
    }
  },
  typeInput(e){
    this.setData({
      user_type: e.detail.value
    });
    let reg = (/[^u4e00-u9fa5w]/g);
    if (reg.test(this.data.user_type)) {
      // console.log('验证通过');
      this.setData({
        type_right: true
      })
    } else {
      // console.log('验证失败');
      this.setData({
        type_right: false
      })
    }
  },
  formSubmit: function (e) {
    let that =  this;
    let {user_email, user_password} = e.detail.value;
    if (!user_email || !user_password) {
      console.log("邮箱或者密码为空");
      wx.showToast({
        title: '邮箱或密码为空',
        icon: 'none',
        duration: 1000,
        mask: true,
      });
      // return
    }
    else if(that.data.imgList.length === 0){
      wx.showToast({
        title: '至少需上传一张图片',
        icon: 'none',
        duration: 1000,
        mask: true,
      });
    }else{
      // console.log("这是邮箱：：：" + this.data.user_email + "\n" + "这是密码：：：" + this.data.user_password);
      wx.showLoading({
        title: '发布中',
        icon: 'Loading'
      });
      wx.request({
        data: {
          name: that.data.user_type,
          type: that.data.select_picker,
          email: that.data.user_email,
          password: that.data.user_password,
          text: that.data.text,
        },
        url: 'https://www.triple2.xyz:8082/application/add',
        success(res) {
          wx.hideLoading();
          that.uploadImages()
        }
      });

      // console.log("1----邮箱：" + this.data.user_email);
      // console.log("2----密码：" + this.data.user_password);
      // console.log("3----文本：" + this.data.text);
      // console.log("4----属性：" + this.data.select_picker)
    }
  },
  uploadImages(){
    for (let i = 0; i < this.data.imgList.length; i++) {
      wx.uploadFile({
        url: 'https://www.triple2.xyz:8082/application/addImage',
        filePath: this.data.imgList[i],
        name: 'imagefile',
        formData: {
          email: this.data.user_email,
        },
        success() {
          console.log('上传图片成功');
          console.log("您成功提交了");
          wx.showToast({
            title: '提交成功，我们将在1个工作日内发送邮件至申请邮箱告知审核结果',
            icon: 'success',
            duration: 2000,
            mask: true,
            success(res) {
            }
          });
          wx.navigateBack();
        },
        fail() {
          console.log('长传图片失败');
        }
      })
    }
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
