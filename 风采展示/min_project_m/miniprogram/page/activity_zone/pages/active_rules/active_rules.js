// pages/active_passage/active_passage.js
var api = require("../../../../utils/api.js");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    activity_con:'',
    activity:''

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   this.activityInfo()
   this.request()

  },



  request:function(){
    let _this = this

    wx.request({
      url: api.activityInfostatic,
      data: {
        company_id: wx.getStorageSync('company_id'),
        activity_id: wx.getStorageSync('activity_id'),
        user_id: wx.getStorageSync('user_id'),

      },
      dataType: 'json',
      success: function (res) {
        console.log(res)
     


        _this.setData({
          activity: res.data.data
        
        })

      }
    })
  },

  activityInfo:function(){
    let _this = this

    wx.request({
      url: api.activityInfo,
      data: {
        company_id: wx.getStorageSync('company_id'),
        activity_id: wx.getStorageSync('activity_id'),
        user_id: wx.getStorageSync('user_id'),

      },
      dataType: 'json',
      success: function (res) {
        console.log(res)
    

        _this.setData({
          activity_con: res.data.data
        
        })

      }
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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

  },
  launchAppError: function (e) {
  }

})