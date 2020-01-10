const api = require('../../utils/api.js')//引入可拼接的url
var app = getApp()
var count = 0;
Page({
  data: {
    longitude: '', //经度
    latitude: '', //纬度
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
    total_page:'',//总页数
    current_page:1,
    hide_good_box:true,
    load:false,
    over:true,
    carnum:'',
    animationData: {},
    objecturl1:"https://static.bf-fresh.com/action/index.html",
    objecturl2: "https://static.bf-fresh.com/action2/index.html",
    objecturl3:"https://static.bf-fresh.com/object15/index.html",
    round:'',
    shops:[],
    address_tip:true,
    come_within:'',
    nonet:false,
    // couponList:'',
    xiaoshi:true,
    couponListnum:'',
    showFlag:false,
    adress:[],
    dw_title:''
  },
  //加载事件
  onLoad: function (options) {

    let that=this
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
            load: true,
          })
          wx.hideToast();
        }
      }
    })

    if (options.uid){
    let uid_s = options.uid
    wx.setStorageSync("uid_s", uid_s);
    console.log("这是unionid--------------------")
    console.log(uid_s)
    console.log(wx.getStorageSync("uid"))

    let token = wx.getStorageSync('token')
    api.qued1(token,uid_s)
    }


    var rand = Math.floor(Math.random () * 9000) + 10000;
    that.setData({
      round: rand
    })

    that.busPos = {};
    that.busPos['x'] = app.globalData.ww - 145;//购物车的位置
    that.busPos['y'] = app.globalData.hh;
    let _this = that;

    //获取最近的门店
    let wid = options.wid;
    let wname = options.wname;



    if (wid == undefined) {
      _this.getAuthorcc()
    // console.log("xxxxxxxxxxxxxxxxxxxxxx")
    //   console.log(_this.data.longitude, _this.data.latitude)
      _this.getAddress()
      console.log("11111111111111111111111111111111")

      console.log(wid)
    } else {
      let _this = that;
      wx.setStorageSync("wid", wid);
      _this.cleanCar();
      _this.setData({
        wids: wid,
        shopName: wname
      })

      console.log("0000000000000000000000000000")
      console.log(wid)
      wx.getLocation({
        type: 'wgs84', //返回可以用于wx.openLocation的经纬度
        success: function (res) {

          var latitude = res.latitude + 0.001276
          var longitude = res.longitude + 0.006256
          _this.setData({
            latitude: latitude,
            longitude: longitude
          })

          _this.getssy(longitude, latitude);
        },
      })
      _this.getCategory(wid)
      _this.getProductList(wid)
      _this.getbanner();
    }






    //   let _this = this;
    // let couponList = wx.getStorageSync("couponList");

    // console.log("aaaaaaaaaaa")
    // console.log(couponList)

    // _this.setData({
    //   couponList: couponList
    // })
    // let couponListnum = 0
    // for (let i = 0; i < couponList.length; i++) {
    //   couponListnum += couponList[i].amount / 100
    // }

    // _this.setData({
    //   couponListnum: couponListnum
    // })




  },
  onShow: function () {
    this.showCarNum();


  },



  getAuthorcc:function(){
   let _this=this
    wx.getLocation({
      type: 'wgs84', //返回可以用于wx.openLocation的经纬度
      success: function (res) {
        let latitude = res.latitude + 0.001276
        let longitude = res.longitude + 0.006256

        // var latitude = res.latitude
        //  var longitude = res.longitude
        _this.setData({
          latitude: latitude,
          longitude: longitude
        })
        _this.getssy(longitude, latitude);
        wx.request({
          url: api.root + 'v1/warehouse/getWarehouseLately',
          method: 'POST',
          dataType: 'json',
          data: {
            "data": {
              latitude: latitude + "",
              longitude: longitude + "",
              mid: '1'
            }
          },
          success: function (res) {
            _this.setData({
              'shopName': res.data.data.wname,
              'wids': res.data.data.wid,
              // 'come_within': res.data.data.come_within,
            })

            // if (res.data.data.come_within == 2) {
            //   wx.setStorageSync("wstate", 1)
            // } else {
            //   wx.setStorageSync("wstate", 2)
            // }

            wx.setStorageSync("wid", res.data.data.wid)
            _this.getCategory(res.data.data.wid)
            _this.getProductList(res.data.data.wid)
            _this.showCarNum()
            console.log("_____________++++++++++++++__________________")
            console.log(res.data.data)
            wx.setStorageSync("selfGet", res.data.data.selfGet)
            _this.getbanner();
          }
        })
      },
      fail: function () {
        // _this.showRemind()
        wx.hideToast();
        _this.setData({
            showFlag: true
          })

      }
    })


    // wx.getSetting({
    //   success: (res) => {
    //     if (!res.authSetting['scope.userLocation']){
    //       // _this.showRemind()
    //       wx.hideToast();
    //       _this.setData({
    //         showFlag: true
    //       })

    //     }else{

    //     }
        
    //   }
    // })

  },



  handler: function (e) {
    if (e.detail.authSetting["scope.userLocation"]) {//如果打开了地理位置，就会为true
      this.setData({
        showFlag: false
      })
      wx.reLaunch({
              url: '../index/index'
        })
    }

  },


  // showRemind: function () {
  //   let _this=this
  //   wx.showModal({
  //     title: '温馨提醒',
  //     content: '需要获取您的地理位置才能使用小程序',
  //     showCancel: false,
  //     showCancel: false,
  //     confirmText: '获取位置',
  //     success: function (res) {
  //       wx.navigateTo({
  //         url: '../address/address'
  //       })
  //         console.log('用户点击确认')
  //       // _this.getAuthorcc()
      
  //     }
  //   })
  // },


  // clickme: function () {
  //   let that = this;
  //   wx.openSetting({
  //     success: function (osrs) {
  //       // 出发条件是返回的时候
  //       console.log("Aaaa");
    
  //     }
  //   })
  // },




  //显示购物车数量
  showCarNum:function(){
    console.log(this.data.wids)
    let _this = this;
    let uid = wx.getStorageSync('uid')
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

        console.log("22222222222222222222222")
        console.log(res)
        _this.setData({
          uid: uid,
          carnum: res.data.data.count
        })
        if (res.data.data.count>0){
          wx.setTabBarBadge({
            index: 2,
            text: res.data.data.count + ''
          })
        }
      }
    })
  },
  //加载广告图
  getbanner:function(){
    let _this =this;
    let wid = wx.getStorageSync('wid')

   console.log("_____________________________________----")
    console.log(wid)
    wx.request({
      url: api.root + api.category_banner,
      method: 'POST',
      dataType: 'json',
      data: {
        "data": {
          "wid": wid+''
        }
      },
      success: function (res) {
        _this.setData({
          'imgUrls': res.data.data
        })
       
      console.log("__________")
        console.log(res.data.data)
      }
    })
  },
  //获取分类
  getCategory:function(wid){
    let _this =this;
    wx.request({
      url: api.root + 'v1/category/getCategory',
      method: 'POST',
      dataType: 'json',
      data: {
        "data": {
          wid: wid + "",
          category_type: "2",
          is_child: 1
        }
      },
      success: function (res) {
        _this.setData({
          'category': res.data.data
        })
      }
    })
  },
  //获取商品列表
  getProductList:function(wid){
    let _this=this;
    wx.request({
      url: api.root + 'v1/goods/get.goods.search.list',
      method: 'POST',
      dataType: 'json',
      data: {
        "data": {
          "wids": wid + "",
          "key_word": "",
          "online": "1",
          "page_no": "1",
          "page_size": "10",
          "appType": "WECHAT" 
        }
      },
      success: function (res) {
        console.log(res.data.data)
        if (res.data.data.page_info.total_page == 1) {
          _this.setData({
            load: true,
            over: false
          })

       
        }
        _this.setData({
          sj: res.data.data.sku_list,
          total_page: res.data.data.page_info.total_page
        })

        _this.couponList()
      }
    })
  },
  //清除购物车
  cleanCar: function () {
    let uid = wx.getStorageSync('uid')
    let _this = this;
    wx.request({
      url: api.root + 'v1/cart/usercart.clean',
      method: 'POST',
      dataType: 'json',
      data: {
        "data": {
          "uid": uid + "",
        }
      },
      success: function (res) {
        wx.removeTabBarBadge({
          index: 2
        })
      }
    })
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
      console.log("__________")
      console.log(that.current_page)
      console.log(that.wids)
      console.log("__________")
      wx.request({
        url: api.root +'v1/goods/get.goods.search.list',
        method: 'POST',
        dataType: 'json',
        data: {
          "data": {
            "wids": that.wids + "",
            "key_word": "",
            "online": "1",
            "page_no": that.current_page+"",
            "page_size": "10",
              "appType": "WECHAT" 

          }
        },
        success: function (res) {
          _this.setData({
            sj: _this.data.sj.concat(res.data.data.sku_list),
          })
console.log("+++++++++++")
          console.log(res.data.data)
        }
      })
    }
  },


  cartTo:function(){
    wx.getSetting({
      success: function (res) {
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: function (res) {
              _this.cart()
            }
          })
        } else {
          wx.navigateTo({
            url: '../phone/phone?site=7'
          })
        }
      }
    })
  },




  cart: function (even) {
    let _this = this;
    let busPoss = {};
    let finger = {};
    var topPoint = {};

   console.log("00000000000000000000000")
    console.log(_this.data.wids)
    console.log(_this.data.uid)
    console.log(even.currentTarget.dataset.info.sku_id)


    wx.request({
      url: api.root +'v1/cart/usercart.update',
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
        console.log(res.data)
        if (_this.data.carnum > 0){
          wx.getStorage({
            key: 'cartnum',
            success: function (res) {
              _this.data.carnum = res.data;
            },
          })
        }
        if (JSON.stringify(res.data.message).indexOf("加入购物车成功")){
          // _this.touchOnGoods(even);
          wx.showToast({
            title:"加入购物车成功",
            duration:1000
          })
          _this.data.carnum++

          wx.setTabBarBadge({
          index: 2,
          text: _this.data.carnum + ''
        })
        }
      }
    })
  },






  touchOnGoods: function (e) {

    // var animation = wx.createAnimation({
    //   duration: 1000,
    // })

    // this.animation = animation
    // this.animation.opacity(1).step()
    // this.animation.translate(-50, -100).skewX(-30).step({ duration: 500, timingFunction: 'ease-out', }).translate(-100, 100).step({ duration: 500, timingFunction: 'ease-in', })
    // this.animation.opacity(0).step()
    // this.animation.translate(0, 0).step()
    // this.setData({
    //   animationData: animation.export()
    // })



    // this.finger = {}; var topPoint = {};
    // this.finger['x'] = e.touches["0"].clientX;//点击的位置
    // this.finger['y'] = e.touches["0"].clientY;

    // if (this.finger['y'] < this.busPos['y']) {
    //   topPoint['y'] = this.finger['y'] -150;
    // } else {
    //   topPoint['y'] = this.finger['y'] + 150;
    // }
    // topPoint['x'] = Math.abs(this.finger['x'] + this.busPos['x']) *2;

    // if (this.finger['x'] > this.busPos['x']) {
    //   topPoint['x'] = (this.finger['x'] - this.busPos['x']) / 2 + this.busPos['x'];
    // } else {//
    //   topPoint['x'] = (this.finger['x'] + this.busPos['x']) / 2 - this.busPos['x'];
    // }

    // this.linePos = app.bezier([this.busPos, topPoint, this.finger], 30);
    // this.startAnimation(e);
    
  },


  

  startAnimation: function (e) {
    var index = 0, that = this,
    bezier_points = that.linePos['bezier_points'];
    this.setData({
      hide_good_box: false,
    })

    var len = bezier_points.length;
    index = len
    this.timer = setInterval(function () {
      index--;
      that.setData({
        bus_x: bezier_points[index]['x'],
        bus_y: bezier_points[index]['y']
      })
      if (index < 1) {
        clearInterval(that.timer);
        that.data.carnum++
        wx.setTabBarBadge({
          index: 2,
          text: that.data.carnum + ''
        })
        that.setData({
          hide_good_box: true
        })
      }
    },5);
  },




  toAd:function(even){
    let url = even.currentTarget.dataset.info;
    let uid = this.data.uid
    let wids = this.data.wids
    let carnum = this.data.carnum
    if(url!=null&&url!=''&&url!=undefined){
      wx.navigateTo({
        url: '../banner_detail/banner_detail?banner_url=' + url + '&&uid=' + uid + '&&wid=' + wids + '&&carnum=' + carnum
      })
    }
  },


  toAdmm: function (even) {
    let url = even.currentTarget.dataset.info;

    let uid = this.data.uid
    let wids = this.data.wids
    let carnum = this.data.carnum

    if (url != null && url != '' && url != undefined) {
      wx.navigateTo({
        url: '../banner_detail/banner_detail?banner_url=' + url + '&&uid=' + uid + '&&wid=' + wids + '&&carnum=' + carnum
      })
    }
  },

  toAdmm1: function (even) {
    wx.switchTab({
      url: '../group/group'
    })
  },




  onShareAppMessage: function () {
    let _this=this
    let uid = wx.getStorageSync("uid");
    return {
      imageUrl: 'https://static.bf-fresh.com/img/index/fenxianga2.png?'+ _this.data.round,
      path: 'pages/index/index?uid=' + uid,

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
     


  // subject:function(){
  //   wx.navigateTo({
  //     url: 'https://api.bf-fresh.com/action/index.html'
  //   })
  // },


  getAddress: function (lnt,lat) {

    let _this = this;
      wx.getLocation({
        type: 'wgs84', //返回可以用于wx.openLocation的经纬度
        success: function (res) {

          let latitude = res.latitude + 0.001276
          let longitude = res.longitude + 0.006256
          _this.setData({
            latitude: latitude,
            longitude: longitude
          })

          wx.request({
            url: api.root + 'v1/warehouse/getWarehouseDistance',
            method: 'POST',
            dataType: 'json',
            data: {
              "data": {
                "mid": "1",
                "longitude": _this.data.longitude + "",
                "latitude": _this.data.latitude + ""
              }
            },
            success: function (res) {
        
              var json = JSON.stringify(res.data)
              _this.setData({
                shops: res.data.data
              })
            }
          })

        },

        fail: function () {
          // _this.showRemind()
 
          _this.setData({
            showFlag: true
          })
        }
      })

  },


  jump: function (even) {
    wx.setStorageSync("selfGet", even.currentTarget.dataset.info.selfGet)
    wx.reLaunch({
      url: '../index/index?wid=' + even.currentTarget.dataset.info.wid + "&wname=" + even.currentTarget.dataset.info.wname
    })

    wx.setStorageSync("wstate", 2)



  },



  couponList: function () {
    let _this = this;

    let couponList = wx.getStorageSync("couponList");

    console.log("aaaaaaaaaaa")
    console.log(couponList)

    _this.setData({
      couponList: couponList
    })
    let couponListnum=0
    for (let i = 0; i < couponList.length;i++){
      couponListnum += couponList[i].amount / 100
    }

    _this.setData({
      couponListnum: couponListnum
    })

  },




  jiazai:function(){
    wx.reLaunch({
      url: '../index/index',
    })
  },


  xiaoshi: function () {
    this.setData({
      xiaoshi: false
    })

    wx.setStorage({
      key: "couponList",
      data:[]
    })
  },



  getssy: function (lng, lat) {
    var _this = this
    console.log(lng + "," + lat)
    wx.request({
      url: 'https://apis.map.qq.com/ws/geocoder/v1/?location=' + lat + ',' + lng + '&get_poi=1&key=FM7BZ-YI66G-4E5QB-IH6EU-AY3S3-H2FS2&poi_options=address_format=short;radius=300;page_size=20;page_index=1;policy=2',
      method: 'GET',
      success: function (res) {
        var ade = res.data.result.pois;
        console.log(res.data)
        _this.setData({
          adress: ade[0],
          dw_title: ade[0].title
  
        })
        wx.hideToast();
       console.log("++++++++++++++++++++++++")
        console.log(ade)

      }
    })
  },




// 绑定推广人
  qued1: function (up_user_id) {
    let token = wx.getStorageSync('token')
    let _this = this
    wx.request({
      url: api.root + 'va1/appUser/bindYzCode',
      method: 'POST',
      dataType: 'json',
      header: { 'token': token + '' },
      data: {
        "data": {
          "up_user_id": up_user_id+''
        }
      },
      success: function (res) {
        console.log(res)
      }
    })
  },


  // 下拉刷新
  onPullDownRefresh: function () {
    // 显示顶部刷新图标
    wx.showNavigationBarLoading();

    let _this = this;
    wx.getNetworkType({
      success: function (res) {
        if (res.networkType == 'none') {
          _this.setData({
            nonet: true,
            load: true,
          })
          wx.hideToast();
        }
      }
    })


    wx.request({
      url: api.root + 'v1/goods/get.goods.search.list',
      method: 'POST',
      dataType: 'json',
      data: {
        "data": {
          "wids": "666",
          "key_word": "",
          "online": "1",
          "page_no": "1",
          "page_size": "10",
          "appType": "WECHAT"
        }
      },
      success: function (res) {
        console.log(res.data.data)
        if (res.data.data.page_info.total_page == 1) {
          _this.setData({
            load: true,
            over: false
          })

        }
        _this.setData({
          sj: res.data.data.sku_list,
          total_page: res.data.data.page_info.total_page
        })

        _this.couponList()
        // 隐藏导航栏加载框
        wx.hideNavigationBarLoading();
        // 停止下拉动作
        wx.stopPullDownRefresh();
      }
    })

  },

 
})



