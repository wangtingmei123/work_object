const api = require('../../utils/api.js')//引入可拼接的url
const app = getApp()
Page({

  web_url: "",
  data: {
    banner_url: '',
    url: '',
    web_src: '',
    nonet: false,
    uid: '',
    wid: '',
    carnum: '',
    falg:false,
    unionid:'',
    openid:''

  },
  onLoad: function (options) {

    let _this = this;
    wx.getNetworkType({
      success: function (res) {
        if (res.networkType == 'none') {
          _this.setData({
            nonet: true,
            load: true,
          })
          // wx.hideToast();
        }
      }
    })



    wx.getSetting({
      success: function (res) {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success: function (res) {
              console.log(res.userInfo)
              _this.setData({
                falg:true
              })
            }
          })
        } else {
          wx.navigateTo({
            url: '../login/login?site=9'
          })

        }
      }
    })

    if (options.wid != undefined) {
      wx.setStorageSync("wid", options.wid)
    } else {
      wx.setStorageSync("wid", 4)
    }

    let uid = wx.getStorageSync('uid')
    let wid = wx.getStorageSync('wid')
    let unionid = wx.getStorageSync('unionid')
    let openid = wx.getStorageSync('openid')


    //显示购物车数量

      wx.request({
        url: api.root + 'v1/cart/usercart.sku.count.get',
        method: 'POST',
        dataType: 'json',
        data: {
          "data": {
            "wid": wid + "",
            "uid": uid + "",
            "platform": "Fresh",
          }
        },
        success: function (res) {
          console.log("qqqqq")
          console.log(res)
          _this.setData({
            carnum: res.data.data.count
          })
          

        }
      })





    console.log(options)

    this.setData({
      uid: uid,
      wid: wx.getStorageSync('wid'),
      unionid: unionid,
      openid: openid
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
  onShareAppMessage: function (options) {

    var that = this
    wx.showShareMenu({
      withShareTicket: true
    })
    var return_url = options.webViewUrl
    console.log("__________")
    console.log(return_url)
    var path = 'pages/action/action?banner_url=' + return_url + '&uid=' + that.data.uid + '&wid=' + that.data.wid + '&carnum=' + that.data.carnum
    return {
      title: '赶快点击领取红包',
      imageUrl: 'https://static.bf-fresh.com/img/index/fenxianga2.png',
      path: 'pages/index/index',
      success: function (res) {
        that.web_url = return_url
        // 转发成功
        wx.showToast({
          title: "转发成功",
          icon: 'success',

          duration: 2000
        })

        // that.setData({
        //   banner_url: return_url     //再次赋值分享内嵌网页的路径
        // })

      },
      fail: function (res) {
        // 转发失败
      },

    }


  },

  jiazai: function () {
    wx.reLaunch({
      url: '../index/index',
    })
  }
})