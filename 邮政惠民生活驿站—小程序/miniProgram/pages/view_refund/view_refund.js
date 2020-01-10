// pages/view_refund/view_refund.js
const api = require('../../utils/api.js')//引入可拼接的url
Page({

  /**
   * 页面的初始数据
   */
  data: {
    status:[],
    sku_count:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    let _this=this
    let order_sku_id = options.order_sku_id
   
    let sku_count = options.sku_count

  

    this.setData({
      sku_count:sku_count
    })

    wx.request({
      url: api.root +'/va1/refund/detail',
      method: 'POST',
      dataType: 'json',
      data:{
        "data": {
          "order_sku_id": order_sku_id + "",

        }
      },

      success:function(res){
         console.log(res)
        _this.setData({
          status:res.data.data
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