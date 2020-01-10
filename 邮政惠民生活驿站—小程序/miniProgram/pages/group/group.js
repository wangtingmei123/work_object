var count = 0;
const api = require('../../utils/api.js')//引入可拼接的url
Page({

  /**
   * 页面的初始数据
   */
  data: {
    wids: '',
    uid: '',
    total_page: '',//总页数
    current_page: 1,
    hide_good_box: true,
    load: false,
    over: true,
    items:[],
    show:false,
    martop:36,
    autoplay: true,
    indicatorDots: true,
    interval: 5000,
    duration: 200,
    circular: true,
    imgUrls: [
      "https://static.bf-fresh.com/img/index/groupimg.png?12345" 
      ],
    latitude:'',
    longitude:'',
    wstate:'',
    shops:[],
    nonet: false,
    sjLength:'',
    wstates:11,
    rand:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var rand = Math.floor(Math.random () * 9000);
    this.setData({
      rand: rand
    })
    
    var _this=this

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


    if (options.uid) {
      // 转发存储unionid
      let uid_s = options.uid
      wx.setStorageSync("uid_s", uid_s);
      // 绑定推广人
      let token = wx.getStorageSync('token')
      api.qued1(token, uid_s)
    }



    if (options.wid != undefined) {
      wx.setStorageSync("wid", options.wid)
    }
    
    let wstate = wx.getStorageSync("wstate");
    this.setData({
      wstate: wstate
    })
    console.log("++++++++++++++++++++++++++++++++")
    if (wstate == 1) {
      wx.getLocation({
        // type: 'wgs84', //返回可以用于wx.openLocation的经纬度
        success: function (res) {
          var latitude = res.latitude + 0.001276
          var longitude = res.longitude + 0.006256

          _this.setData({
            latitude: latitude,
            longitude: longitude
          })

        }
      })
    }
    _this.getAddress()
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
    this.showTg(1);

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
    var that = this.data;
    var _this = this;
    let wid = wx.getStorageSync("wid");
    if (_this.data.current_page == _this.data.total_page) {
      _this.setData({
        load: true,
        over: false
      })
    } else {
      _this.data.current_page++;
      wx.request({
        url: api.root + 'groupBuying/list',
        method: 'GET',
        data: {
          "wid": 666,
          "key_word": "",
          "online": "1",
          "page_no": _this.data.current_page+'',
          "page_size": '10'
        },
        success: function (res) {
          _this.setData({
            items: _this.data.items.concat(res.data.data.list),
          })
        }
      })
    }


  },
  
  showTg: function (current_page){
    var that = this.data;
    var _this = this;
    let wid =  wx.getStorageSync("wid")    
    wx.request({
      url: api.root+'groupBuying/list',
      method: 'GET',
      data: {
          "wid": 666,
          "page_no":'1',
          "page_size":'10'
      },
      success: function (res) {
        _this.setData({
          load: true,
     
        })
         console.log("aaaaaaaaaa")
        console.log(res.data.data.list)
        if (res.data.data.list == null){
          
          _this.setData({
        
            sjLength: true
          })
        }else{
          _this.setData({
            items: res.data.data.list,
            total_page: res.data.data.pages,
            load: true,
            over: false
          })
          console.log(res.data.data)
        }


        if (res.data.data.pages==1){
          _this.setData({
            load:true,
            over:false
          })
        }
      }
    }) 
  },
  toGroupDetail(even) {
    console.log("跳转团购详情"+JSON.stringify(even.currentTarget.dataset.info))
    let tgid = even.currentTarget.dataset.info.id;
    console.log(tgid)
    wx.navigateTo({
      url: '../group_detail/group_detail?tgid=' + tgid,
    })
   },


  getAddress: function (lnt, lat) {

    let _this = this;
    wx.getLocation({
      // type: 'wgs84', //返回可以用于wx.openLocation的经纬度
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
            wx.hideToast();
            var json = JSON.stringify(res.data)
            _this.setData({
              shops: res.data.data
            })
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

  },



  jump: function (even) {
    wx.setStorageSync("selfGet", even.currentTarget.dataset.info.selfGet)
    wx.reLaunch({
      url: '../index/index?wid=' + even.currentTarget.dataset.info.wid + "&wname=" + even.currentTarget.dataset.info.wname
    })

    wx.setStorageSync("wstate", 2)
  },


  jiazai: function () {
    wx.reLaunch({
      url: '../group/group',
    })
  },




  onShareAppMessage: function () {
    var rand = Math.floor(Math.random () * 9000);
    let wid = wx.getStorageSync("wid");
    let uid = wx.getStorageSync("uid");
    return {
      path: 'pages/group/group?wid=' + wid + '&uid=' + uid,
      imageUrl: 'https://static.bf-fresh.com/img/index/groupshare.png?' + rand,
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
          // wx.hideToast();
        }
      }
    })

    wx.getLocation({
      // type: 'wgs84', //返回可以用于wx.openLocation的经纬度
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

            wx.hideToast();
            var json = JSON.stringify(res.data)
            console.log(json)
            _this.setData({
              shops: res.data.data
            })

            // 隐藏导航栏加载框
            wx.hideNavigationBarLoading();
            // 停止下拉动作
            wx.stopPullDownRefresh();


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



      }
    })

