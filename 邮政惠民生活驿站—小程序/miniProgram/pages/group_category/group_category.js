//获取应用实例
const app = getApp()
const api = require('../../utils/api.js')//引入可拼接的ur

var count = 0
Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    navData: [
    ],
    currentTab: 0,
    navScrollLeft: 0,
    imgUrls: [
      'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1533019779469&di=4390d6d0489213b1e3f932d08fba46c7&imgtype=0&src=http%3A%2F%2Fpic.58pic.com%2F58pic%2F15%2F41%2F46%2F58PIC1X58PICHiz_1024.jpg'
    ],
    goods:[],
    record:false,
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 200,
    circular: true,
    cids:'',
    wids:'',
    carnum:'',
    sjLength: false,
    nonet: false,
    netWorkType:'',
    load: true,
    over: true,
    height: '', // 获取当前页面的可视高度
    nameb:'1',
    current_page: 1,
  },
  //事件处理函数
  onLoad: function (options) {

    let _this = this;
    wx.showToast({
      title: '努力加载中~',
      icon: 'loading',
      duration: 1000000//loading时间
    });

    wx.getNetworkType({
      success:function (res) {
        if (res.networkType =='none'){
          _this.setData({
            nonet: true,
            load:true,
          })
          wx.hideToast();
        }
      }
    })

  
    console.log(options)
    let wids = options.wid;
    let cids = options.cids;

    _this.setData({
      cids: cids

    })

 
    wx.request({
      url: api.root+'v1/category/getThirdCategory',
      method: 'POST',
      dataType: 'json',
      data: {
        "data": {
          "wid": wids + "",
          "cid2": cids + "",
        }
      },
      success: function (res) {
        console.log("分类商品返回数据" + JSON.stringify(res.data))
          _this.setData({
            navData: res.data.data,
            wids: wids
          })


        _this.searchResult(wids, cids, _this);
      }
    })
  },
  switchNav(event) {
    wx.showToast({
      title: '努力加载中~',
      icon: 'loading',
      duration: 1000000//loading时间
    });
  
    var cur = event.currentTarget.dataset.current;
    if (this.data.currentTab == cur) {
      return false;
    } else {
      console.log(cur);
      this.setData({
        currentTab: cur
      })
    }
    console.log(event.currentTarget.dataset.info);
    let name = event.currentTarget.dataset.info.name;

    let _this = this;

    _this.setData({
      cids: event.currentTarget.dataset.info.cid,
        nameb: '2'
  
    })

    console.log("+++++++++++++++")
    console.log(this.data.cids)
    if (name == '全部') {
      console.log("全部");
      _this.setData({
        nameb: '1'
      })

      _this.searchResult(_this.data.wids, event.currentTarget.dataset.info.cid, _this);
      return;
    }
    wx.request({
      url: api.root+'v1/goods/getSecondGood',
      method: 'POST',
      dataType: 'json',
      data: {
        "data": {
          "wid": _this.data.wids + "",
          "cid2":'',
          "cid3": event.currentTarget.dataset.info.cid + '',
          "page_no": "1",
          "page_size": "9999",
          "appType": "WECHAT" 
        }
      },
      success: function (res) {
        let group = res.data.data  // 获取原数据
        _this.setData({
          goods: group,

        })
        if (res.data.data == null || res.data.data.length == 0){
          _this.setData({
            sjLength: true,      
            load: true,
          })
          wx.hideToast();
        }else{


          _this.setData({
            sjLength: false,    
          })
          wx.hideToast();
          // for (let i in res.data.data) {

          //   wx.createIntersectionObserver().relativeToViewport({ bottom: 20 }).observe('.item-' + i, (ret) => {
          //     if (ret.intersectionRatio > 0) {
          //       group[i].show = true
          //     }
          //     _this.setData({
          //       goods: group,
          //       load: true,
          //     })
          //   })
          // }
        // console.log("分类子集商品返回数据" + JSON.stringify(res.data))
  

        }
        console.log("___________")
        console.log(res.data.data)
      }
    })

  },
  switchTab(event) {
    var cur = event.detail.current;
    var singleNavWidth = this.data.windowWidth / 5;
    this.setData({
      currentTab: cur,
      navScrollLeft: (cur - 2) * singleNavWidth
    });
  },
  searchResult: function (wids,cids,_this) {
    console.log(cids)
    wx.request({
      url: api.root+'v1/goods/getSecondGood',
      method: 'POST',
      dataType: 'json',
      data: {
        "data": {
          "wid": wids + "",
          "cid2": cids + "",
          "cid3": '',
          "page_no": "1",
          "page_size": "9999",
          "appType": "WECHAT"
        }
      },
      success: function (res) {
        // console.log("分类全部商品返回数据" + JSON.stringify(res.data))
        let group = res.data.data  
        // wx.hideToast();
        console.log(res.data)

        _this.setData({
          goods: group,
    
        })
        if (res.data.data == null || res.data.data.length==0){
          _this.setData({
            sjLength: true,
            load:true,
        
          })
          wx.hideToast();
        }else{

        // 获取原数据
    
          _this.setData({
            sjLength: false,
          })

          // for (let i in res.data.data) {
          //   wx.createIntersectionObserver().relativeToViewport({ bottom: 20 }).observe('.item-' + i, (ret) => {
          //     if (ret.intersectionRatio > 0) {
          //       group[i].lazy = true
          //     }
          //   })
          // }

          wx.hideToast();
        }

   
      }
    })
  },


  showImg() {  // 判断高度是否需要加载
    wx.createSelectorQuery().selectAll('.item').boundingClientRect((ret) => {
      const group = this.data.goods
      const height = this.data.height
      ret.forEach((item, index) => {
        if (item.top < height) {
          group[index].lazy = true
        }
      })
      this.setData({
        goods: group,
        load: true,
      })
    }).exec()
  },



// 上拉加载

  // onReachBottom: function () {
  //  let _this=this
  
  //   if (_this.data.nameb=='1'){
  //     let current_page = _this.data.current_page
  //     current_page++
  //     wx.request({
  //       url: api.root + 'v1/goods/getSecondGood',
  //       method: 'POST',
  //       dataType: 'json',
  //       data: {
  //         "data": {
  //           "wid": _this.data.wids + "",
  //           "cid2": _this.data.cids + "",
  //           "cid3": '',
  //           "page_no": current_page+'',
  //           "page_size": "10",
  //           "appType": "WECHAT"
  //         }
  //       },
  //       success: function (res) {
  //         console.log(res.data)
  //           let group = res.data.data  // 获取原数据
  //           _this.setData({
  //             goods: _this.data.goods.concat(group),
             
  //           })

  //       }
  //     })

  //   }

  //   if (_this.data.nameb == '2'){
  //     let current_page= _this.data.current_page
  //     current_page++

  //     wx.request({
  //       url: api.root + 'v1/goods/getSecondGood',
  //       method: 'POST',
  //       dataType: 'json',
  //       data: {
  //         "data": {
  //           "wid": _this.data.wids + "",
  //           "cid2": '',
  //           "cid3": _this.data.cids + "",
  //           "page_no": current_page + '',
  //           "page_size": "10",
  //           "appType": "WECHAT"
  //         }
  //       },
  //       success: function (res) {

  //           let group = res.data.data  // 获取原数据
  //           _this.setData({
  //             goods: _this.data.goods.concat(group),
            
  //           })

  //       }
  //     })

  //   }

  // },


  detail: function (even){
    let _this = this;
    console.log("查看商品详情" + JSON.stringify(even.currentTarget.dataset.info.sku_id));
    let sku_id = even.currentTarget.dataset.info.sku_id;
    wx.navigateTo({
      url: '../detail/detail?sku_id=' + sku_id + '&wid=' + _this.data.wids,
    })
  },
  cart: function (even) {
    let _this = this;
    let sku_id = even.currentTarget.dataset.info.sku_id;
    let uid = wx.getStorageSync('uid')

    wx.request({
      url: api.root+'v1/cart/usercart.update',
      method: 'POST',
      dataType: 'json',
      data: {
        "data": {
          "wid": _this.data.wids + "",
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
        console.log("返回数据" + JSON.stringify(res.data.message))
        if (JSON.stringify(res.data.message).indexOf("加入购物车成功")) {
          wx.showToast({
            title: "加入购物车成功",
            duration: 1000
          })

          _this.data.carnum++
          console.log("_cartnum:" + _this.data.carnum);
          _this.setData({
            carnum: _this.data.carnum
          })
        }
      }
    })
  },
  onShow: function () {
    let _this = this;
    let uid = wx.getStorageSync('uid')
    wx.request({
        url: api.root+'v1/cart/usercart.sku.count.get',
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
          console.log("购物车数量返回数据" + JSON.stringify(res.data))
          _this.setData({
            carnum: res.data.data.count,
          })
        }
      })
  },
  toCart:function(){
    wx.switchTab({
      url: '../cart/cart',
    })
  },
  jiazai: function () {
    wx.reLaunch({
      url: '../index/index',
    })
  },


})

