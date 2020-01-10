const api = require('../../utils/api.js')//引入可拼接的url
Page({
  data: {
    shopName: '',
    shops: [],
    nonet: false
  },
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
          that.setData({
            nonet: true,
            // load: true,
          })
          wx.hideToast();
        }
      }
    })


    this.setData({
      shopName: options.shopName,
    });
    this.getAddress();

  },
  //切换店铺
  jump: function (e) {


    let wname = e.currentTarget.dataset.info.wname
    let address = e.currentTarget.dataset.info.address
    let wid = e.currentTarget.dataset.info.wid
    var pages = getCurrentPages();
    var currPage = pages[pages.length - 1];   //当前页面
    var prevPage = pages[pages.length - 2];  //上一个页面
    prevPage.setData({
      wname: wname,
      address: address,
      wid: wid
    })

    wx.navigateBack()

  },
  //获取门店地址


  getAddress: function (lnt, lat) {
    let _this = this;

    wx.getLocation({
      // type: 'wgs84', //返回可以用于wx.openLocation的经纬度
      success: function (res) {

        let latitude = res.latitude + 0.001276
        let longitude = res.longitude + 0.006256

    wx.request({
      url: api.root + 'v1/warehouse/getWarehouseDistance',
      method: 'POST',
      dataType: 'json',
      data: {
        "data": {
          "mid": "1",
          "longitude": longitude + "",
          "latitude": latitude + ""
        }
      },
      success: function (res) {
        var json = JSON.stringify(res.data)
        _this.setData({
          shops: res.data.data
        })

        wx.hideToast();
      }
    })
    }
  })

  },

  jiazai: function () {
    wx.reLaunch({
      url: '../group_address/group_address',
    })
  },
})
