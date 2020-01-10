const api = require('../../utils/api.js')//引入可拼接的url
// pages/object/object.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },



  togoumai: function (even) {
    let skuid = even.currentTarget.dataset.info;
    console.log(skuid)
    let _this = this;
    wx.getSetting({
      success: function (res) {
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: function (res) {
              _this.createOrder(skuid)
            }
          })
        } else {
          wx.navigateTo({
            url: '../phone/phone?site=8'
          })
        }
      }
    })
  },


  createOrder: function (skuids) {
    let _this = this;
    let uid = wx.getStorageSync("uid");

    let wid = wx.getStorageSync("wid");
    console.log(uid)
    console.log(wid)
    wx.request({
      url: api.root + 'pay/once.torder.create',
      method: 'POST',
      dataType: 'json',
      data: {
        "data": {
          "uid": uid + "",
          "wid": wid + "",
          "sku_id": skuids + "",
          "sku_count": "1",
          "latitude": 39.896918,
          "longitude": 116.34227,
          "aid": "",
          "platform": "Fresh",
        }
      },
      success: function (res) {
        console.log(res.data)
        wx.navigateTo({
          url: '../order_confirm/order_confirm?toid=' + res.data.data.toid + '&skuIds=' + skuids + '&source=detail'
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