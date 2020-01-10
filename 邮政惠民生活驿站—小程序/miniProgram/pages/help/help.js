// pages/help/help.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    img:'../img/index/xia.png',
    uhide: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var data = {
      'datas': [ {
        'id': 1, title: '1、商品不想要了怎么退款？', ctn: '*生鲜商品具有新鲜度、易腐性等特点限制，目前不支持无理由退货。订单状态为“待自提”时，可以申请取消订单，退款金额和使用的优惠券将在1~5个工作日内原路返回到原支付账户中。若您收到的商品有问题，请在提货后48小时内即时拍照留证并联系邮政惠民生活驿站客服反馈处理，或进入邮政惠民生活驿站小程序商城【我的】--【已完成订单】--【查看详情】--【申请退款】来进行售后操作。'
      },{
        'id': 2, title: '2、优惠券不可用原因。', ctn: '*部分商品（低价商品、带有不可使用优惠券标识）不可使用优惠券。优惠券有使用规则限制，需购物车中选择实际可使用的优惠券。' }]
    }
    that.setData({
      arr:data.datas
    })
    console.log(data.datas);
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
  
  },
  toggleBtn: function (event) {
    var that = this;
    var toggleBtnVal = that.data.uhide;
    var itemId = event.currentTarget.id;
    
    if (toggleBtnVal == itemId) {
      that.setData({
        uhide: 0,
        img: '../img/index/xia.png',
      })
    } else {
      that.setData({
        uhide: itemId,
        img:'../img/index/shang.png'
      })
    }
  }
})