const api = require('../../utils/api.js')//引入可拼接的url
var count = 0;
Page({
  data: {
    imgUrls: [],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 200,
    circular: true,
    sku_id:'',
    wid:'',
    uid:'',
    sku_detail:'',
    carnum:'',
    detail_img:[],
    sku_id:'',
    nonet:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _this = this;


    wx.showToast({
      title: '努力加载中~',
      icon: 'loading',
      duration: 100000//loading时间
    });
    
    wx.getNetworkType({
      success: function (res) {
        if (res.networkType == 'none') {
          _this.setData({
            nonet: true,
          })
          wx.hideToast();
        }
      }
    })


    if (options.uid) {
    // 转发存储unionid
    let uid_s = options.uid
    wx.setStorageSync("uid_s", uid_s);
// 绑定推广人
    let token = wx.getStorageSync('token')
    api.qued1(token, uid_s)
    }

console.log("aaaaaaaaaaaaaaa")
    console.log(options.wid)
    if (options.wid!=undefined){
      wx.setStorageSync("wid", options.wid)
    }


    this.setData({
      sku_id: options.sku_id
    })
    this.showDetail(options.sku_id)
  },
  onShow: function () {
    this.showCarNum()
  },


  showDetail: function (sku_id){
    let _this = this;
    let uid = wx.getStorageSync("uid");
    let wid = wx.getStorageSync("wid");
    console.log("wid"+wid+"uid"+uid)
    wx.request({
      url: api.root + 'v1/goods/sku.detail.get?sku_id=' + sku_id,
      method: 'POST',
      dataType: 'json',
      data: {
        "data": {
          "wid": wid+'',
          "uid": uid+'',
          "sku_id":sku_id+''
        }
      },
      success: function (res) {
        console.log("xxxxxxxxxxxx")
        console.log(res.data.data)
        let imgs = res.data.data.sku_detail.t_pic.split(',')
        let detailimg = res.data.data.sku_detail.content.split(',')
        _this.setData({
          sku_detail: res.data.data.sku_detail,
          imgUrls: imgs,
          detail_img: detailimg
        })

        wx.hideToast();
      }
    })
  },
  showCarNum: function () {
    let _this = this;
    let uid = wx.getStorageSync('uid')
    let wid = wx.getStorageSync('wid')
    wx.request({
      url: api.root + 'v1/cart/usercart.sku.count.get',
      method: 'POST',
      dataType: 'json',
      data: {
        "data": {
          "wid": _this.data.wids + "",
          "uid": uid + "",
          "platform": "Fresh",
        }
      },
      success: function (res) {
        _this.setData({
          uid: uid,
          carnum: res.data.data.count
        })
      }
    })
  },
  cart: function (even) {
    let _this = this;

    let sku_id = even.currentTarget.dataset.info.sku_id;

    let product_num = even.currentTarget.dataset.info.product_num;

    if (product_num <= 0) {
      wx.showToast({
        title: "此商品已售罄",
        duration: 1500
      })
      return
    }
    let wid = wx.getStorageSync("wid");
    let uid = wx.getStorageSync('uid')
    wx.request({
      url: api.root +'v1/cart/usercart.update',
      method: 'POST',
      dataType: 'json',
      data: {
        "data": {
          "wid": wid + "",
          "uid": uid + "",
          "sku_id": sku_id + "",
          "num": "1",
          "mid": "1",
          "is_online": "1",
          "goods_type": "1",
          "platform": "Fresh",
          "check": "1"
        }
      },
      success: function (res) {
        console.log(res.data)
        if (JSON.stringify(res.data.message).indexOf("加入购物车成功")) {

          wx.showToast({
            title: "加入购物车成功",
            duration: 1000
          })
          _this.data.carnum++
          _this.setData({
            carnum: _this.data.carnum
          })
        }
      }
    })
  },
  toBuy: function (even){
    let _this = this;

    if (_this.data.product_num <= 0) {
      wx.showToast({
        title: "此商品已售罄",
        duration: 1500
      })
      return
    }

    wx.getSetting({
      success: function (res) {
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: function (res) {
              let orderarr= even.currentTarget.dataset.info.sku_id


             _this.createOrder(orderarr)
            }
          })
        } else {
          wx.navigateTo({
            url: '../phone/phone?site=3&info='+_this.data.sku_id
          })
        }
      }
    })
  },
  //创建订单
  createOrder: function (skuids) {
    let _this = this;
    let uid = wx.getStorageSync("uid");
    
    let wid =wx.getStorageSync("wid");
    console.log(uid)
    console.log(wid)
    wx.request({
      url: api.root +'pay/once.torder.create',
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

        if (res.data.code=='500'){
          wx.showToast({
            title: '此商品限购一件, 不可重复购买',
            icon: 'none',
            duration:2000
          })
          return
        }
        wx.navigateTo({
          url: '../order_confirm/order_confirm?toid=' + res.data.data.toid + '&skuIds=' + skuids +'&source=detail'
        })
      }
    })
  },

  onShareAppMessage: function () {
    let _this=this
    let wid = wx.getStorageSync("wid");
    let uid = wx.getStorageSync("uid");
    return {
      path: 'pages/detail/detail?sku_id=' + _this.data.sku_detail.sku_id + '&wid=' + wid + '&uid=' + uid,
      // imageUrl: '../img/index/aaaa.jpg',
      success: function (res) {
        // 转发成功
        wx.showToast({
          title: "转发成功",
          icon: 'success',
          duration: 2000
        })
      },
      fail: function (res) {
        // 转发失败
      },

    }

  },

  jiazai: function () {
    let _this=this
    wx.reLaunch({
      url: '../index/index',
    })
  }

})