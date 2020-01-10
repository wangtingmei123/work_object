const api = require('../../utils/api.js')//引入可拼接的url
// import drawQrcode from '../../utils/weapp.qrcode.esm.js'

var QRCode = require('../../utils/weapp-qrcode.js')
var qrcode;
const W = wx.getSystemInfoSync().windowWidth;
const rate = 750.0 / W;

// 300rpx 在6s上为 150px
const code_w = 280 / rate;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    jindu: true,
    jindu1: true,
    jindu2: true,
    jindu3: false,
    jindu4: false,
    toid: '',
    order: null,
    orderPayTime: "",
    time: null,
    returnOrder:true,
    longitude: 106.49626,
    dimension: 29.59921,
    chuxian:0,
    reasons:[],
    state:'',
    consume:'',
    // colorDark: "#000",
    code_w: code_w
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _this=this

    wx.showToast({
      title: '努力加载中~',
      icon: 'loading',
      duration: 100000//loading时间
    });

      console.log("详情页面" + options.oid)
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
  //订单详情
  orderDetail: function (toid) {
    let uid = wx.getStorageSync('uid')
    let _this = this;
    wx.request({
      url: api.root + 'v1/order/order.detail.get',
      method: 'POST',
      dataType: 'json',
      data: {
        "data": {
          "order_id": toid + "",
          "user_id": uid + ""
        }
      },
      success: function (res) {
        _this.setData({
          order: res.data.data
        })

        console.log(res.data.data)
        
    


        if (res.data.data.order_status>=2){
          var consume = "consume" + "_" + uid + "_" + res.data.data.order_id
          _this.setData({
            consume: consume
          })


          var colorDark = "#000"
          if (res.data.data.order_status == 3) {
            colorDark = "#ccc"
          }


          qrcode = new QRCode('canvas', {
            // usingIn: this,
            text: consume,
            // image: '/images/bg.jpg',
            width: code_w,
            height: code_w,
            colorDark: colorDark,
            colorLight: "white",
            correctLevel: QRCode.CorrectLevel.H,

          });



          qrcode.makeCode(consume)
          wx.hideToast();

        }
    


      }
    })
  },
  
  // code:function(text){
  //   drawQrcode({
  //     width: 140,
  //     height: 140,
  //     canvasId: 'canvas',
  //     text: text,
      
  //   })
  // },
  returnOrder:function(even){
    let info = even.currentTarget.dataset.info;
    let uid =  wx.getStorageSync("uid");
    let _this = this;
    console.log("申请退款"+JSON.stringify(info))
    wx.request({
      url: api.root + 'v1/pay/order.refund.doRefundByUserId',
      method: 'POST',
      dataType: 'json',
      data: {
        "data": {
          "merger_id": info.merger_id+"",
          "order_id": info.order_id+"",
           "userId": uid+""
        }
      },
      success: function (res) {
        console.log("订单退款详情" + JSON.stringify(res.data))
        if (JSON.stringify(res.data.data.message).indexOf("退款成功")){
          console.log("订单退款详情")
          _this.setData({
            returnOrder:false
          })
          wx.showToast({
            title: res.data.message,
            icon: 'none'
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

  to_refund: function (even){

    let toid = this.data.toid
    let sku_count = even.currentTarget.dataset.info.sku_count;
    wx.navigateTo({
      url: '../to_refund/to_refund?toid=' + toid + '&&index=' + even.currentTarget.dataset.index + '&&sku_count=' + sku_count,
    })
  },


  to_shnegq: function () {

    wx.showModal({
      title: '无法申请退款',
      content: '您已错过了申请退款时间段 (交易成功后七天内), 如果您有退货需求建议您联系客服,',
      showCancel: false,
      confirmText: '知道了',
      success(res) {
        if (res.confirm) {
          console.log('用户点击确定')
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })

  },


  view_refund: function (e) {

    let order_sku_id = e.currentTarget.dataset.info.order_sku_id;
    let sku_count = e.currentTarget.dataset.info.sku_count;
    console.log(sku_count)

    console.log(order_sku_id)
    wx.navigateTo({
      url: '../view_refund/view_refund?order_sku_id=' + order_sku_id + '&&sku_count=' + sku_count
    })
  },









  to_quxiao: function (e){
   let _this=this
    this.setData({
      chuxian:1
    })

    wx.request({
      url: api.root + '/va1/appOrder/cancelReasons',
      method: 'POST',
      dataType: 'json',
      data: {
  
      },
      success: function (res) {
          console.log(res)
        _this.setData({
          reasons: res.data.data.reasons
        })
      }
    })
  },

  shijian:function(e){
    let id = e.currentTarget.dataset.text
    this.setData({
      state: id
    })
  },

  guanbi:function(){
    this.setData({
      chuxian: 0
    })
  },

  queren:function(){
  let _this=this

    wx.showToast({
      title: '加载中~',
      icon: 'loading',
      duration: 100000//loading时间
    });
    let order_id = this.data.order.order_id
    let reasons = this.data.reasons
    var cancel_reason=''
    for (let i = 0; i < reasons.length;i++){
      if(reasons[i].id == _this.state){
        cancel_reason = reasons[i].reason
      }
    }


  

    wx.request({
      url: api.root + '/va1/appOrder/cancel',
      method: 'POST',
      dataType: 'json',
      data: {

        "data": {
          "order_id": order_id+'',
          "cancel_reason": cancel_reason+''
        }

      },
      success: function (res) {
        console.log(res)
        if(res.data.code==200){
          wx.redirectTo({
            url: '../waitPay/waitPay?oid=' + order_id,
          })

          wx.hideToast();
        }else{

          wx.hideToast();
          wx.showToast({
            title: res.data.message,
            icon: 'none',
            duration: 2000
          })
        }
      
      }
    })



  }



})