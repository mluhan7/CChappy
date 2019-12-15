// pages/login/login.js
Page({
  data: {
    is_show: false,
    email_right: true,
    show: true,
    user_email: "",
    user_password: "",
    cf_user_password: '',
    cf_right: true,
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
  pwdInput(e) {
    this.setData({
      user_password: e.detail.value
    })
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
      console.log('false')
    }
    else {
      this.setData({
        cf_right: true
      });
    }
  },
  rember:function(e){
    var isrember=e.detail.value;
    console.log("记住密码了吗")
    if(isrember){
      console.log("我已经记住密码了")
      wx.setStorage({
        key: "key1",
        data: this.data.user_email,
        success(res){
          console.log("邮箱缓存成功");
        }
      })
      try {
        wx.setStorageSync('key1', this.data.user_email)
      } catch(e){}
      wx.setStorage({
        key: "key2",
        data: this.data.user_password,
        success(res){
          console.log("密码缓存成功");
        }
      })
      try {
        wx.setStorageSync('key2', this.data.user_password)
      } catch(e){}
    }
  },
  formSubmit:function(e){
    console.log("您点击了登录!!!\n");
    let{user_email,user_password}=e.detail.value;
    if(!user_email || !user_password){
      console.log("邮箱或者密码为空");
      wx.showToast({
        title: '邮箱或密码为空',
        icon: 'none',
        image:'../../images/fail.png',
        duration: 1000,
        mask: true,
      })
    }
    else{
      wx.showLoading({
        title: '登录中',
        icon: 'Loading'
      });
      wx.request({
        data: {
          account: this.data.user_email,
          password: this.data.user_password,
        },
        url: 'https://www.triple2.xyz:8082/organization/login',
        success(res) {
          // console.log('login-', res.data);
          wx.hideLoading();
          if(res.data > 0) {
            let orgid = res.data;
            wx.showToast({
              title: '登录成功',
              icon: 'success',
              duration: 1000,
              mask: true,
            });
            wx.navigateTo({
              url: '/pages/orgMag/orgMag?orgid=' + orgid
            })
          }
          else {
            wx.showToast({
              title: '账号或密码错误，登录失败',
              icon: 'none',
              duration: 1000,
              mask: true,
            });
          }

        }
      })
      // console.log("1----邮箱：" + this.data.user_email);
      // console.log("2----密码：" + this.data.user_password);
    }
  },
  applyAdmin:function(){
    wx.navigateTo({
      url: '/pages/loginAdmin/loginAdmin',
    })
  },
  onLoad: function () {

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
    var that = this;
    wx.getStorage({
      key: 'key1',
      success(res) {
        // console.log(res.data)
        that.setData({
          user_email:res.data
        })
      }
    });
    try {
      var value = wx.getStorageSync('key1')
      if (value) {
        console.log("拿到邮箱数据")
      }
    } catch (e) {
      console.log("1失败")
    }
    wx.getStorage({
      key: 'key2',
      success(res) {
        // console.log(res.data)
        that.setData({
          user_password: res.data
        })
      }
    });
    try {
      var value = wx.getStorageSync('key2')
      if (value) {
        console.log("拿到密码数据")
      }
    } catch (e) {
      console.log("2失败")
    }
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