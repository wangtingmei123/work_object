// pages/waitPay/waitPay.js

const api = require('../../utils/api.js')//引入可拼接的url
// import drawQrcode from '../../utils/weapp.qrcode.esm.js'

var QRCode = require('../../utils/weapp-qrcode.js')
var qrcode;
const W = wx.getSystemInfoSync().windowWidth;
const rate = 750.0 / W;
// 300rpx 在6s上为 150px
const code_w = 280 / rate;
var interval = null;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    jindu: true,
    jindu1: true,
    jindu2: false,
    jindu3: false,
    jindu4: false,
    order: null,
    orderPayTime: "",
    toPintuan:true,
    returnOrder:true,
    returnOrdermm:true,
    groupUserImgm:null,
    groupUserImgms:null,
    grouplenm:null,
    longitude: 106.49626,
    dimension: 29.59921,
    refund_state:'',
    code_w: code_w
    
  },

  /**
   * 生命周期函数--监听页面加载
   */

  onLoad: function (options) {
    console.log("待成团" + options.oid)
    let _this=this

    wx.showToast({
      title: '努力加载中~',
      icon: 'loading',
      duration: 100000//loading时间
    });

    this.setData({
      toid: options.oid
    })


    qrcode = new QRCode('canvas', {
      // usingIn: this,
      text: _this.data.consume,
      // image: '/images/bg.jpg',
      width: code_w,
      height: code_w,
      colorDark: '#000',
      colorLight: "white",
      correctLevel: QRCode.CorrectLevel.H,

    });
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


  onShareAppMessage: function (res) {
    let uid = wx.getStorageSync("uid");
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    let gbid = res.target.dataset.info.order_id;
    console.log("++++++++=")
    console.log(gbid)
    return {
      title: '邀请好友来参团',
      path: '/pages/imgroup/imgroup?tgid=' + gbid + '&uid=' + uid,
    }
  },


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
        console.log("555555555555555555555555")
        console.log(res.data.data)
        _this.setData({
          order: res.data.data,
          groupUserImgm: res.data.data.groupUserImg,
          refund_state: res.data.data.sku_list[0].refund_state
       
        })



        console.log("=========")
        console.log(res.data.data.sku_list[0].refund_state)
        console.log(_this.data.order)
        console.log(res.data)
       _this.data.groupUserImgm.shift()

        _this.setData({
          groupUserImgms: _this.data.groupUserImgm

        })



        let grouplength = parseInt(res.data.data.groupUserCount) - _this.data.groupUserImgms.length
        var grouplen = []
        for (var i = 0; i < grouplength; i++) {
          console.log("PPPP" + i)
          grouplen.push(i)
        }

        _this.setData({
          grouplenm: grouplen
        })




        if (res.data.data.order_status == 2 && res.data.data.order_type == 8121) {
          _this.setData({
            jindu2: true,
            jindu3: true,
          })
          let consume = "consume" + "_" + uid + "_" + res.data.data.order_id
          console.log("+++++++++++")
          console.log(consume)

          _this.setData({
            consume: consume
          })

          qrcode.makeCode(consume)
          wx.hideToast();

        }
        console.log("订单详情" + JSON.stringify(res.data))

        _this.orderlife(res.data.data.groupUserImg[0].img)
        console.log(_this.data.order)
      }
    })
  },




  orderlife: function (pay_time_limit) {
    // let otime = this.timeformat(ordertime);
    // var hdtimemm = otime + pay_time_limit;
    var totalSecond=parseInt(pay_time_limit/1000)
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
      var orderPayTime = dayStr + "天" + hrStr + "小时" + minStr + "分" + secStr + "秒关闭"
      this.setData({
        orderPayTime: orderPayTime,
      });
      totalSecond--;
      if (totalSecond < 0) {
        clearInterval(interval);
        this.setData({
           orderPayTime: '拼团超时',
          orderStatus: '订单已取消',
          payBtn: false

        });
      }
    }.bind(this), 1000);
  },
  timeformat: function (time) {
    var date = time.substr(0, 10)//2017-02-27
    var hour = time.substr(11, 2) == '00' ? 0 : time.substr(11, 2).replace(/\b(0+)/gi, "")
    var minute = time.substr(14, 2) == '00' ? 0 : time.substr(14, 2).replace(/\b(0+)/gi, "")
    var second = time.substr(17, 2) == '00' ? 0 : time.substr(17, 2).replace(/\b(0+)/gi, "")
    var getGoodsTime = parseInt(new Date(date).getTime() / 1000) + parseInt(hour) * 3600 + parseInt(minute) * 60 + parseInt(second) - 28800
    //别问我为什么-28800，只能告诉你实践出真知   
    return getGoodsTime;
  },

  toPintuan(even) {
    let info = even.currentTarget.dataset.info;
    wx.navigateTo({
      url: '../imgroup/imgroup?tgid=' + even.currentTarget.dataset.info.gbid,
    })
  },

  returnOrder: function (even) {
    let info = even.currentTarget.dataset.info;
    let uid = wx.getStorageSync("uid");
    let _this = this;
    console.log("申请退款" + JSON.stringify(info))
    wx.request({
      url: api.root + 'v1/pay/order.refund.doRefundByUserId',
      method: 'POST',
      dataType: 'json',
      data: {
        "data": {
          "merger_id": info.merger_id + "",
          "order_id": info.order_id + "",
          "userId": uid + ""
        }
      },
      success: function (res) {
        console.log("订单退款详情" + JSON.stringify(res.data))
        if (JSON.stringify(res.data.data.message).indexOf("退款成功")) {
          console.log("订单退款详情")
          _this.setData({
            returnOrder: false,
             returnOrdermm: false
          })
          wx.showToast({
            title: res.data.message,
            icon: 'none'
          })
        }

 

      }
    })
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
  
  address: function () {
    var that = this;
    wx.openLocation({
      latitude: parseFloat(that.data.dimension),
      longitude: parseFloat(that.data.longitude)
    })
  },


  to_refund: function (even) {

    let toid = this.data.toid

    wx.navigateTo({
      url: '../to_refund/to_refund?toid=' + toid + '&index=' + even.currentTarget.dataset.index,
    })
  },

  to_shnegq:function(){

    wx.showModal({
      title: '无法申请退款',
      content: '您已错过了申请退款时间段 (交易成功后七天内), 如果您有退货需求建议您联系客服,',
      showCancel:false,
      confirmText:'知道了',
      success(res) {
        if (res.confirm) {
          console.log('用户点击确定')
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })

  },


  view_refund:function(e){

    let order_sku_id = e.currentTarget.dataset.info.order_sku_id;
    let sku_count = e.currentTarget.dataset.info.sku_count;
    console.log(sku_count)

    console.log(order_sku_id)
    wx.navigateTo({
      url: '../view_refund/view_refund?order_sku_id=' + order_sku_id + '&&sku_count=' + sku_count
    })
  },







  to_quxiao: function (e) {
    let _this = this
    this.setData({
      chuxian: 1
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

  shijian: function (e) {
    let id = e.currentTarget.dataset.text
    this.setData({
      state: id
    })
  },

  guanbi: function () {
    this.setData({
      chuxian: 0
    })
  },

  queren: function () {
    let _this = this

    wx.showToast({
      title: '加载中~',
      icon: 'loading',
      duration: 100000//loading时间
    });

    let order_id = this.data.order.order_id
    let reasons = this.data.reasons
    var cancel_reason = ''
    for (let i = 0; i < reasons.length; i++) {
      if (reasons[i].id == _this.state) {
        cancel_reason = reasons[i].reason
      }
    }




    wx.request({
      url: api.root + '/va1/appOrder/cancel',
      method: 'POST',
      dataType: 'json',
      data: {

        "data": {
          "order_id": order_id + '',
          "cancel_reason": cancel_reason + ''
        }

      },
      success: function (res) {
        console.log(res)
        if (res.data.code == 200) {
          wx.redirectTo({
            url: '../waitPay/waitPay?oid=' + order_id,
          })
          wx.hideToast();
        } else {
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


  /**
   * 用户点击右上角分享
   */

})