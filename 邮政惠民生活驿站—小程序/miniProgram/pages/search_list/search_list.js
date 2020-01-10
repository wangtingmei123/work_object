const api = require('../../utils/api.js')//引入可拼接的url
var count = 0;
Page({
  data: {
    longitude: '', //经度
    latitude: '', //纬度
    address: '', //地址
    imgUrls: [
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 200,
    circular: true,
    shopName:"",
    category:[] ,
    wids:'',
    uid:'',
    p:'',
    total_page:'',//总页数
    current_page:1,
    hide_good_box:true,
    load:false,
    over:true,
    carnum:0,
    martop:36,
    sj:'',
    sjLength:false,
    nonet:false
  },
  //加载事件
  onLoad: function (options) {
    
    let _this = this;


    wx.getNetworkType({
      success: function (res) {
        if (res.networkType == 'none') {
          _this.setData({
            nonet: true,
            load: true,
          })
          // wx.hideToast();
        }
      }
    })

    let wid = options.wid;
    let p = options.p;
    let uid = wx.getStorageSync('uid');
    console.log("uid"+uid)
   
    wx.request({
      url: api.root+'v1/goods/get.goods.search.list',
      method: 'POST',
      dataType: 'json',
      data: {
        "data": {
          "wids":wid + "",
          "key_word": p,
          "online": "1",
          "page_no": "1",
          "page_size": "10",
          "appType": "WECHAT" 
        }
      },
      success: function (res) {

        if (res.data.data.sku_list.length==0){
          _this.setData({
            sjLength:true,
            load:true
          })
        }

        console.log(res.data.data);
        if (res.data.data.page_info.total_page == 1) {
          _this.setData({
            load: true,
            over: false
          })
        }
        _this.setData({
          sj: res.data.data.sku_list,
          total_page: res.data.data.page_info.total_page,
          p:p,
          wids:wid,
          uid: uid
        })

        console.log("+++++++++")
        console.log(res.data.data.sku_list)

        // if (_this.data.sj.length == 1) {
        //   _this.setData({
        //     martop: 850
        //   })
        // } else if (_this.data.sj.length == 2) {
        //   _this.setData({
        //     martop: 640
        //   })
        // }
        // else if (_this.data.sj.length == 3) {
        //   _this.setData({
        //     martop: 430
        //   })
        // }
        // else if (_this.data.sj.length == 4) {
        //   _this.setData({
        //     martop: 220
        //   })
        // }
   

        wx.request({
          url: api.root+'v1/cart/usercart.sku.count.get',
          method: 'POST',
          dataType: 'json',
          data: {
            "data": {
              "wid": wid + "",
              "uid": uid + "",
              "platform": "Fresh",
            }
          },
          success: function (res) {
            _this.setData({
              carnum: res.data.data.count,
            })
          }
        })

      }
    })




  },
  onShow: function () {


    console.log("+++++++++=")
    console.log(this.data.sj.length)
    if (this.data.sj.length == 1) {

    }
 
  },
  // 上拉加载
  onReachBottom: function() {
    var that = this.data;
    var _this = this;
    if (that.current_page == that.total_page){
      _this.setData({
          load:true,
          over:false
      })
    }else{
      that.current_page++;
      wx.request({
        url: api.root+'v1/goods/get.goods.search.list',
        method: 'POST',
        dataType: 'json',
        data: {
          "data": {
            "wids": that.wids + "",
            "key_word": that.p,
            "online": "1",
            "page_no": that.current_page+"",
            "page_size": "10"
          }
        },
        success: function (res) {
          console.log(res.data)
          _this.setData({
            sj: _this.data.sj.concat(res.data.data.sku_list),
          })
        }
      })
    }
  },
  cart: function (even) {
    let _this = this;
    wx.request({
      url: api.root+'v1/cart/usercart.update',
      method: 'POST',
      dataType: 'json',
      data: {
        "data": {
          "wid": _this.data.wids +"",
          "uid": _this.data.uid+"",
          "sku_id": even.currentTarget.dataset.info.sku_id+"",
          "num": "1",
          "mid": "1",
          "is_online": "1",
          "goods_type": "1",
          "platform": "Fresh",
          "check": "1"
        }
      },
      success: function (res) {
        if (JSON.stringify(res.data.message).indexOf("加入购物车成功")){
          _this.data.carnum++
          _this.setData({
            carnum: _this.data.carnum + ''
          })
        }
      }
    })
  },
  toCart() {
    wx.switchTab({
      url: '../cart/cart',
    })
  },

  jiazai: function () {
    wx.reLaunch({
      url: '../index/index',
    })
  }
})