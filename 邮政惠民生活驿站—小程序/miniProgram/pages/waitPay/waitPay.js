const api = require('../../utils/api.js')//引入可拼接的url
var interval=null;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    toid:'',
    order:null,
    orderPayTime:"",
    time:null,
    orderStatus:'待付款',
    payBtn:true,
    longitude: 106.49626,
    dimension: 29.59921,
    
  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {


 
    
    this.setData({
      toid: options.oid
    })
    this.orderDetail(options.oid);



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
    clearInterval(interval);
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
  orderDetail:function(toid){
    let uid = wx.getStorageSync('uid')
    let _this = this;
    wx.request({
      url: api.root + 'v1/order/order.detail.get',
      method: 'POST',
      dataType: 'json',
      data: {
        "data": {
          "order_id":toid+"",
          "user_id": uid+""
        }
      },
      success: function (res) {
        _this.setData({
          order:res.data.data
        })

        console.log(_this.data.order)
        _this.orderlife(res.data.data.pay_time_limit)

      }

     
    })
  },

  orderlife: function (pay_time_limit){
    var hdtimemm = parseInt(pay_time_limit/1000);
    var totalSecond = hdtimemm;
     interval = setInterval(function () {
      // 秒数
      var second = totalSecond;
      // 天数位
      var day = Math.floor(second / 3600 / 24);
      var dayStr = day.toString();
      if (dayStr.length == 1) dayStr = '0' + dayStr;
      // 小时位
      var hr = Math.floor((second - day * 3600 * 24) / 3600);
      var hrStr = hr.toString();
      if (hrStr.length == 1) hrStr = '0' + hrStr;
      // 分钟位
      var min = Math.floor((second - day * 3600 * 24 - hr * 3600) / 60);
      var minStr = min.toString();
      if (minStr.length == 1) minStr = '0' + minStr;
      // 秒位
      var sec = second - day * 3600 * 24 - hr * 3600 - min * 60;
      var secStr = sec.toString();
      if (secStr.length == 1) secStr = '0' + secStr;
      var orderPayTime = dayStr + "天" + hrStr + "小时" + minStr + "分" + secStr+"秒关闭"
      this.setData({
        orderPayTime: orderPayTime,
      });
      totalSecond--;
      if (totalSecond < 0) {
        clearInterval(interval);
        this.setData({
          orderPayTime: '订单支付超时',
          orderStatus: '订单已取消',
          payBtn: false
          
        });
      }
    }.bind(this), 1000);
  },
  timeformat: function (time){
    var date = time.substr(0, 10)//2017-02-27
    var hour = time.substr(11, 2) == '00' ? 0 : time.substr(11, 2).replace(/\b(0+)/gi, "")
    var minute = time.substr(14, 2) == '00' ? 0 : time.substr(14, 2).replace(/\b(0+)/gi, "")
    var second = time.substr(17, 2) == '00' ? 0 : time.substr(17, 2).replace(/\b(0+)/gi, "") 
    var getGoodsTime = parseInt(new Date(date).getTime() / 1000) + parseInt(hour) * 3600 + parseInt(minute) * 60 + parseInt(second)- 28800//别问我为什么-28800，只能告诉你实践出真知   
    return getGoodsTime;
  },

  paytoo: function (even) {
    let info = even.currentTarget.dataset.info;
    console.log("再来一单" + JSON.stringify(info))
    let toid = even.currentTarget.dataset.info.order_id;
    let uid = wx.getStorageSync("uid");
    wx.request({
      url: api.root + 'v1/cart/addFinishedOrderSkusToUsercart',
      method: 'POST',
      dataType: 'json',
      data: {
        "data": {
          "oid": toid + "",
          "uid": uid + ""
        }
      },
      success: function (res) {
        if (res.data.message = '"再来一单成功"') {
          wx.switchTab({
            url: '../cart/cart',
          })
        }

      }
    })
  },

  toPay:function(even) {
    let info = even.currentTarget.dataset.info;
    let toid = even.currentTarget.dataset.info.order_id;
    let uid = wx.getStorageSync("uid");
    wx.request({
      url: api.root + 'groupBuying/orderSelectPay',
      method: 'POST',
      dataType: 'json',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: {
        "orderId": toid,
        "userId": uid,
      },
      success: function (res) {
        var json = JSON.parse(res.data.data.payInfo);
        if (res.data.data.result_code == 'SUCCESS'){
          wx.requestPayment({
            'timeStamp': json.timeStamp,
            'nonceStr': json.nonceStr,
            'package': json.package,
            'signType': 'MD5',
            'paySign': json.paySign,
            'success': function (res) {
              wx.navigateTo({
                url: '../order_status/order_status?num=0'
              })
            },
            'fail': function (res) {
              
            }
          })
        }
      }
    })
  },
  address: function () {
    var that = this;
    wx.openLocation({
      latitude: parseFloat(that.data.dimension),
      longitude: parseFloat(that.data.longitude)
    })
  },

  

})