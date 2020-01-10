const api = require('../../utils/api.js')//引入可拼接的url
Page({
  data: {
    encryptedData:'',
    iv:'',
    site:'',
    info:''
  },
  onLoad: function (options) {
    console.log("site======"+options.site)
    this.setData({
      // encryptedData: options.encryptedData,
      // iv:options.iv,
      site: options.site,
      info:options.info
    })
  },
  bindGetUserInfo: function (e) {
    let _this= this;
console.log("aaaaaaaaaaaa")
    console.log(e.detail)
 
    console.log("用户信息"+JSON.stringify(e))
    let uid = wx.getStorageSync("uid")
    let encryptedData = e.detail.encryptedData;
    let iv = e.detail.iv;
    let session_key = wx.getStorageSync("session_key");
    console.log("uid---" + uid + "----encryptedData---" + encryptedData + "-----iv----" + iv + "----session_key-----" + session_key)
    console.log(uid)
    
    if (e.detail.userInfo!=undefined) {
      wx.request({
        url: api.root + 'miniProgramLogin.do.postUser',
        method: 'POST',
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        data: {
          "uid": uid,
          "encryptedData": encryptedData + '',
          "img": e.detail.userInfo.avatarUrl + '',
          "userName": e.detail.userInfo.nickName + '',
          "iv": iv+'',
          "sessionKey": session_key
        },
        success: function (res) {
          console.log("aaaaaaaaaaaaaaaaa")
          console.log(res.data)
          _this.site();
        }
      })
    } else {
    }
  },
  site:function(s){
    let _this = this;
    let site = _this.data.site;
    let info = _this.data.info;
    if(site == 1){

    }else if(site==2){//团购详情
      wx.reLaunch({
        url: '../group_detail/group_detail?tgid='+ _this.data.info,
      })
    } else if (site == 3) {//商品详情
      wx.reLaunch({
        url: '../detail/detail?sku_id=' + _this.data.info
      })
    } else if (site == 4) {//购物车
      wx.reLaunch({
        url: '../cart/cart'
      })
    } else if (site == 5) {//邀请
    console.log("邀请好友拼团")
      wx.reLaunch({
        url: '../imgroup/imgroup?tgid=' + _this.data.info
      })
    } else if (site == 6) {//专题
      wx.reLaunch({
        url: '../action/action'
      })
    } else if (site == 7) {//首页
      wx.reLaunch({
        url: '../index/index'
      })
    } else if (site == 8) {//专题
      wx.reLaunch({
        url: '../object/object'
      })
    } else if (site == 9) {//新人专享
      wx.reLaunch({
        url: '../newzx/newzx'
      })
    }else{
      wx.reLaunch({
        url: '../me/me'
      })
    }
  }
})