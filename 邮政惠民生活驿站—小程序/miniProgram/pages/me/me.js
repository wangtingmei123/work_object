const api = require('../../utils/api.js')//引入可拼接的url
Page({
  data: {
    user:null,
    latitude: '',
    longitude: '',
    wstate: '',
    shops: [],
    bindStatus:""
  },
  onLoad: function (options) {
    this.bindStatus()
    var _this = this
    let wstate = wx.getStorageSync("wstate");
    console.log("++++++++++++++++++++++++++++++++")
    console.log(wstate)
    this.setData({
      wstate: wstate
    })
 
    if (wstate == 1) {
      wx.getLocation({
        // type: 'wgs84', //返回可以用于wx.openLocation的经纬度
        success: function (res) {
          var latitude = res.latitude + 0.001276
          var longitude = res.longitude + 0.006256

          _this.setData({
            latitude: latitude,
            longitude: longitude
          })

        }
      })

      

      _this.getAddress()
    }






    wx.getSetting({
      success: function (res) {
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: function (res) {
              console.log(res.userInfo)
              _this.setData({
                user: res.userInfo
              })
            }
          })
        }
      }
    })
  },





  // 绑定状态
  bindStatus: function () {
    let _this=this
    let token = wx.getStorageSync('token')
    console.log("*****************88")
    wx.request({
      url: api.root + 'va1/appUser/bindStatus',
      method: 'POST',
      dataType: 'json',
      header: { 'token': token + '' },
      data: {
        "data": {
        }
      },

      success: function (res) {
        _this.setData({
          bindStatus: res.data.data.bindStatus
        })

        console.log(res)
      }
    })
  },

  toOrder(even) {
    wx.getSetting({
      success: function (res) {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success: function (res) {
              console.log(res.userInfo)
              wx.navigateTo({
                url: '../order_status/order_status?num=' + even.currentTarget.dataset.info,
              })
            }
          })
        } else {
          wx.navigateTo({
            url: '../phone/phone'
          })
        }
      }
    })
  },



  toCode() {
    wx.navigateTo({
      url: '../code/code',
    })
  },

  toLogin() {
    wx.navigateTo({
      url: '../login/login',
    })
  },

  toCoupon() {

    wx.getSetting({
      success: function (res) {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success: function (res) {
              console.log(res.userInfo)
              wx.navigateTo({
                url: '../coupon/coupon?tz=me',
              })
            }
          })
        } else {
          wx.navigateTo({
            url: '../phone/phone'
          })
          
        }
      }
    })
  },
  toChangeUserinfo() {
    wx.navigateTo({
      url: '../chang_userinfo/chang_userinfo',
    })
  },

  toLogin(){
    wx.getSetting({
      success: function (res) {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success: function (res) {
              console.log(res.userInfo)
            }
          })
        }else{
          wx.navigateTo({
            url: '../phone/phone'
          })
        }
      }
    })
  },



  toHelp() {
    wx.navigateTo({
      url: '../help/help',
    })
  },





  toAddlist(){
    wx.getSetting({
      success: function (res) {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success: function (res) {
              console.log(res.userInfo)
              wx.navigateTo({
                url: '../Address_list_me/Address_list_me',
              })
            }
          })
        } else {
          wx.navigateTo({
            url: '../phone/phone'
          })

        }
      }
    })


  },





  getAddress: function (lnt, lat) {

    let _this = this;
    wx.getLocation({
      // type: 'wgs84', //返回可以用于wx.openLocation的经纬度
      success: function (res) {

        let latitude = res.latitude + 0.001276
        let longitude = res.longitude + 0.006256
        _this.setData({
          latitude: latitude,
          longitude: longitude
        })

        wx.request({
          url: api.root + 'v1/warehouse/getWarehouseDistance',
          method: 'POST',
          dataType: 'json',
          data: {
            "data": {
              "mid": "1",
              "longitude": _this.data.longitude + "",
              "latitude": _this.data.latitude + ""
            }
          },
          success: function (res) {
            wx.hideToast();
            var json = JSON.stringify(res.data)
            _this.setData({
              shops: res.data.data
            })
          }
        })

      },

      fail: function () {
        // _this.showRemind()
        wx.hideToast();
        _this.setData({
          showFlag: true
        })
      }
    })

  },






  jump: function (even) {
    wx.setStorageSync("selfGet", even.currentTarget.dataset.info.selfGet)
    wx.reLaunch({
      url: '../index/index?wid=' + even.currentTarget.dataset.info.wid + "&wname=" + even.currentTarget.dataset.info.wname
    })

    wx.setStorageSync("wstate", 2)
  },




  jiazai: function () {
    wx.reLaunch({
      url: '../me/me',
    })
  },

  to_bing:function(){
    wx.navigateTo({
      url: '../binding/binding',
    })
  }







})