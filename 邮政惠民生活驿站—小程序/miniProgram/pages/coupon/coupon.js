
const api = require('../../utils/api.js')//引入可拼接的url
Page({
  data: {
    couponList:[],
    toid:'',
    tz:'',
    source:'',
    nocoupon:false,
    couponM:'',
    couponS: '',
  },
  onLoad: function (options) {

    wx.showToast({
      title: '努力加载中~',
      icon: 'loading',
      duration: 100000//loading时间
    });
    let tz = options.tz;
    let source = options.source;

    let couponM = options.couponM
    let couponS= options.couponS



   
    this.setData({
      tz:tz,
      source: source,
      couponM: couponM,
      couponS: couponS
    })
    if (tz == 'me'){
      this.couponList();

    }else{
      this.setData({
        toid: options.toid,
        skuIds: options.skuIds,
      })
      this.useConponList(options.toid, options.skuIds)
    }
  },  
  couponList:function(){
    let _this = this;
    let uid = wx.getStorageSync("uid");
    let wid = wx.getStorageSync("wid")
    wx.request({
      url: api.root+'v1/coupon/user.mycoupons',
      method: 'POST',
      dataType: 'json',
      data: {
        "data": {
          "user_id": uid,
          "status": 1,
          "platform": "Fresh",
          "source": "8000"
        }
      },
      success: function (res) {

        wx.hideToast();
        _this.setData({
          couponList: res.data.data.coupons
        })
        if (res.data.data.coupons.length == 0) {
          _this.setData({
            nocoupon: true
          })

        }
      }
    })
  },
  useConponList:function(toid,skuIds){
    let _this = this;
    let uid = wx.getStorageSync("uid");
    let wid = wx.getStorageSync("wid")
    wx.request({
      url: api.root+'v1/coupon/user.availablecoupons',
      method: 'POST',
      dataType: 'json',
      data: {
        "data": {
          "user_id": uid,
          "platform": "Fresh",
          "mid": "1",
          "toid": toid+"",
          "longitude": 116.3529,
          "latitude": 39.844207,
          "type": "1",
          "wid": wid,
          "skuIds": skuIds+""
        }
      },
      success: function (res) {
        wx.hideToast();
      
        _this.setData({
          couponList: res.data.data.coupons
        })
        if (res.data.data.coupons.length == 0) {
          _this.setData({
            nocoupon: true
          })
        }
        console.log("+++++++")
        console.log(res.data.data.coupons)
      }
    })
  },
  useCoupon:function(even){
     let _this = this;
     let tz = _this.data.tz;
     let toid = _this.data.toid;
    let source=_this.data.source;
      if (tz == 'me'){
        wx.switchTab({
          url: '../index/index'
      })
     }else{
        let item = even.currentTarget.dataset.info;
        // item = JSON.stringify(item)

        // let skuIds = _this.data.skuIds;
        // wx.redirectTo({
        //   url: '../order_confirm/order_confirm?coupon=' + item + '&toid=' + toid + '&skuIds=' + skuIds + "&source=" + source
        // })
  
        let m = parseFloat(_this.data.couponM) - item.amount;
        let s = parseFloat(_this.data.couponS) - item.amount;

        console.log(_this.data.couponM)

        console.log(item.amount)

        m = m.toFixed(2)
        s = s.toFixed(2)
        _this.setData({
          couponM: m,
          couponS: s,
        })

        var pages = getCurrentPages();
        var currPage = pages[pages.length - 1];   //当前页面
        var prevPage = pages[pages.length - 2];  //上一个页面
        prevPage.setData({
          couponM: _this.data.couponM,
          couponS: _this.data.couponS,
          coupon: item,

        })
        wx.navigateBack()


     }
  }
})