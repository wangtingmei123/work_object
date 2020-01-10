var dateTimePicker = require('../../utils/dateTimePicker.js');
const api = require('../../utils/api.js')//引入可拼接的url
Page({
  /**
   * 页面的初始数据
   */
  data: {
    date: '2018-10-01',
    time: '12:00',
    dateTimeArray: null,
    dateTime: null,
    dateTimeArray1: null,
    dateTime1: null,
    startYear: 2000,
    endYear: 2050,
    order:null,
    toid:'',
    coupon:'',
    couponM:0.00,
    goodimg:'',
    type:1,
    phone: '',
    getGoodsTime:'',
    t:'',
    groupId:'',
    longitude: 106.49626,
    dimension: 29.59921,
    btptype3: 'btptypem',
    btptype2: 'btptype1',
    btptype22: '',
    btptype33: 'btptypemm',
    pgtype: 0,
    fashion: false,
    itemPage: '',
    chuxian: '',
    tihuo: 1,
    tihuot: 3,
    shijian: '',
    shijiant: '',
    today: '',
    tomorrow: '',
    todayxs: true,
    jintian: '今天',
    shifen: '',
    shijiantmm:'',
    shops:'',
    wname:'',
    address:'',
    wid:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showToast({
      title: '努力加载中~',
      icon: 'loading',
      duration: 100000//loading时间
    });


//获取提货地址
    let _this = this
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
           
            let shops = res.data.data
            let wid = wx.getStorageSync("wid");
            
            for (let i = 0; i < shops.length;i++){
              if (shops[i].wid == wid){

                _this.setData({
                  shops: shops,
                  wname: res.data.data[i].wname,
                  address: res.data.data[i].address,
                  wid: wid,
                })
              }

            }
            

      
            wx.hideToast();
            
           console.log("xxxxxxxxxxx")
            console.log(res.data.data)

          }
        })

      },

      fail: function () {
        // _this.showRemind()
      
     
      }
    })









    // 获取完整的年月日 时分秒，以及默认显示的数组
    var obj = dateTimePicker.dateTimePicker(this.data.startYear, this.data.endYear);
    var obj1 = dateTimePicker.dateTimePicker(this.data.startYear, this.data.endYear);
    // 精确到分的处理，将数组的秒去掉
    var lastArray = obj1.dateTimeArray.pop();
    var lastTime = obj1.dateTime.pop();
    this.setData({
      dateTime: obj.dateTime,
      dateTimeArray: obj.dateTimeArray,
      dateTimeArray1: obj1.dateTimeArray,
      dateTime1: obj1.dateTime,
    });
    console.log("onLoad"+JSON.stringify(options))
    let groupId = options.groupId;
    if (groupId!=undefined){
      this.setData({
        groupId: groupId
      })    
    }
    this.setData({
      toid:options.toid,
      t:options.t
    })
    
    this.showOrder(options.toid,options.t)

    this.searchaddress()
  },



  searchaddress: function () {
    var _this = this;
    let uid = wx.getStorageSync("uid");
    let wid = wx.getStorageSync("wid");
    wx.request({
      url: api.root + '/v1/userAddress/get.user.address.page',
      method: 'POST',
      dataType: 'json',
      data: {
        "data": {
          "wid": wid + '',
          "uid": uid + '',
          "page_size": "10", 
          "page_no": "1"
        }
      },
      success: function (res) {
        console.log(res.data.data)
        console.log(res.data.data.address_list.dataList)

        let itemPage = res.data.data.address_list.dataList

        if (itemPage.length == 0) {
          _this.setData({
            itemPage: ""
          })
        } else {
          for (var i = 0; i < itemPage.length; i++) {
            if (itemPage[i].is_default == 1) {
              _this.setData({
                itemPage: itemPage[i]
              })
            }
          }
        }
      }
    })
  },


  switchNav2: function () {

    this.setData({
      btptype2: 'btptypem',
      btptype22: 'btptypemm',
      pgtype: 1,
      fashion: true,
      btptype3: 'btptype1',
      btptype33: '',
    })
    console.log(this.data.pgtype)
  },

  switchNav3: function () {

    this.setData({
      btptype3: 'btptypem',
      btptype33: 'btptypemm',
      pgtype: 0,
      fashion: false,
      btptype2: 'btptype1',
      btptype22: '',
    })
    console.log(this.data.pgtype)
  },

  Collect: function () {

    wx.navigateTo({
      url: '../Address_list/Address_list'
    })
  },




  toCoupon() {
    let _this = this;
    wx.navigateTo({
      url: '../coupon/coupon?tz=coupon&toid=' + _this.data.toid+'&skuIds='+_this.data.skuIds,
    })
  }, 
  
  showOrder: function (id,t) {
    console.log("创建团购订单id"+id+"t"+t)
    let _this = this;
    let uid = wx.getStorageSync("uid");
    let wid = wx.getStorageSync("wid")
    let coupon = _this.data.coupon;
    wx.request({
      url: api.root + 'groupBuying/groupOrderDetail',
      method: 'POST',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      dataType: 'json',
      data: {
        "id": id,
        "wid": wid,
        "userId": uid,
        "type": t,
        "mid": 1,
        "groupId": 0
      },
      success: function (res) {
        console.log("创建团购订单" + JSON.stringify(res.data))
        let code = res.data.code;
        if (code == 500) {
          wx.showToast({
            title: res.data.message,
            icon: 'none'
          })
        } if (code == 200) {
          console.log("__________________---")
          console.log(res.data.data)
          _this.setData({
            order:res.data.data,
          })

 
        }
      }
    })  
  }, 
  payOrder:function(e){
    let _this = this;

    if (_this.data.pgtype==1){

      if (_this.data.shijiant == "") {
        wx.showToast({
          title: '请选择自提时间',
          icon: 'none'
        })
        return;
      }
      _this.setData({
        shijiantmm: _this.data.shijiant
      })



    // if (_this.data.type == 1) {
    //   wx.showToast({
    //     title: '请选择提货时间',
    //     icon: 'none'
    //   })
    //   return;
    // }
     if (_this.data.phone == '') {
      wx.showToast({
        title: '请输入提货人手机号',
        icon: 'none',
        duration: 2000,
      })
      return;
    }
    // let ctime = Date.parse(new Date()) / 1000;
    // if (ctime > _this.data.getGoodsTime) {
    //   wx.showToast({
    //     title: '提货时间小于当前时间',
    //     icon: 'none'
    //   })
    //   return;
    // }

    if (!(/^1[34578]\d{9}$/.test(_this.data.phone))) {
      wx.showToast({
        title: '请输入正确的手机号',
        icon: 'none',
        duration: 2000,
      })
      return;
    } 

    } else if (_this.data.pgtype == 0) {

      if (_this.data.itemPage == '') {
        wx.showToast({
          title: '请选择收货地址',
          icon: 'none',
          duration: 2000,
        })
        return;
      }

      if (_this.data.itemPage.come_within == '2') {
        wx.showToast({
          title: '该地址不在配送范围内',
          icon: 'none',
          duration: 2000,
        })
        return;
      }



      if (_this.data.order.total < 20) {
        let chae = 20 - _this.data.order.total
        chae = chae.toFixed(2)
        wx.showToast({
          title: '商品金额满20元可起送，不含所支付的配送费, 还差' + chae + '元起送',
          icon: 'none',
          duration: 3000,
        })
        return;
      }



      if (_this.data.shijian == "") {
        wx.showToast({
          title: '请选择配送时间',
          icon: 'none',
          duration: 2000,
        })
        return;
      }


      _this.setData({
        shijiantmm: _this.data.shijian
      })
    }
      let toid = _this.data.toid;
      let openid = wx.getStorageSync("openid");
      let uid = wx.getStorageSync("uid");
      let wid = wx.getStorageSync("wid");
       let groupId = _this.data.groupId;
      let t = _this.data.t;
     

    let aidm = ""
    if (_this.data.pgtype == 1) {
      aidm = ""
    } else {
      aidm = _this.data.itemPage.address_id
    }

    console.log("________________")
    console.log(toid)
    console.log(openid)
    console.log(uid)
    console.log(wid)
    console.log(groupId)
    console.log(t)
    console.log(_this.data.shijiantmm)
    console.log(_this.data.phone)
    console.log(_this.data.aid)

    // console.log("________________")
      // console.log(_this.data.phone)
      // console.log(_this.data.getGoodsTime)
    // console.log(_this.data.aid)
    // console.log(_this.data.shijiantmm + '#' + _this.data.phone)
    // console.log(uid)
      wx.request({
        url: api.root +'groupBuying/createGroup',
        method: 'POST',
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        data: {
          "id":toid,
          "userId":uid,
          "wid": _this.data.wid,
          "mid": 1,
          "openId":openid,
          "groupId": groupId,
          "type":t,
          "takeTime": _this.data.shijiantmm,
          "phone": _this.data.phone,
          // "notes": _this.data.phone,
          "aid": aidm
          // "aid": _this.data.aid
      
        },
        success: function (res) {
          console.log(res.data)
          let code =  res.data.code;
          console.log("wwwwwwwwww")
          // console.log(res.data.data.result_code)
          if(code==200){
            var json = JSON.parse(res.data.data.payInfo);
            if (res.data.data.result_code == 'SUCCESS') {
              let oid = res.data.data.orderId;
              wx.requestPayment({
                'timeStamp': json.timeStamp,
                'nonceStr': json.nonceStr,
                'package': json.package,
                'signType': 'MD5',
                'paySign': json.paySign,
                'success': function (res) {
                  wx.redirectTo({
                    url: '../order_status/order_status?num=0'
                  })
                },
                'fail': function (res) {
                  wx.redirectTo({
                    url: '../waitPay/waitPay?oid=' + oid
                  })
                }
              })
            }
          }else {
            wx.showToast({
              title: res.data.message,
              icon: 'none',
              duration: 2000,
            })
          }
        }
      })
  },

  phoneInput(e) {
    this.setData({
      phone: e.detail.value
    })
  },
    
  //选择提货时间插件
   bindDateChange: function (e) {
    this.setData({
      dates: e.detail.value
    })
  },
  changeDate(e) {
    this.setData({ date: e.detail.value });
  },
  changeDateTime(e) {
    this.setData({ dateTime: e.detail.value });
  },
  changeDateTime(e) {
    this.setData({ dateTime: e.detail.value });

  },
  changeDateTime1(e) {
    this.setData({ dateTime1: e.detail.value });
    var a = e.detail.value
    let dateTimeArray1 = this.data.dateTimeArray1;
    let time = dateTimeArray1[0][a[0]] + "-" + dateTimeArray1[1][a[1]] + "-" + dateTimeArray1[2][a[2]] + " " + dateTimeArray1[3][a[3]] + ":" + dateTimeArray1[4][a[4]];
    var date = time.substr(0, 10)//2017-02-27
    var hour = time.substr(11, 2) == '00' ? 0 : time.substr(11, 2).replace(/\b(0+)/gi, "")
    var minute = time.substr(14, 2) == '00' ? 0 : time.substr(14, 2).replace(/\b(0+)/gi, "")
    var getGoodsTime = parseInt(new Date(date).getTime() / 1000) + parseInt(hour) * 3600 + parseInt(minute) * 60 - 28800 
    //别问我为什么-28800，只能告诉你实践出真知 
    getGoodsTime = getGoodsTime*1000;
    this.setData({
      getGoodsTime: getGoodsTime,
    })
  },
  changeDateTimeColumn(e) {
    var arr = this.data.dateTime, dateArr = this.data.dateTimeArray;
    arr[e.detail.column] = e.detail.value;
    dateArr[2] = dateTimePicker.getMonthDay(dateArr[0][arr[0]], dateArr[1][arr[1]]);
    this.setData({
      dateTimeArray: dateArr,
      dateTime: arr
    });
  },
  time() {
    this.setData({
      type:2,
    })
  },
  addressto: function () {
    var that = this;
    wx.openLocation({
      latitude: parseFloat(that.data.dimension),
      longitude: parseFloat(that.data.longitude)
    })
  },



  getDay: function (num, str) {
    var today = new Date();
    var nowTime = today.getTime();
    var ms = 24 * 3600 * 1000 * num;
    today.setTime(parseInt(nowTime + ms));
    var oYear = today.getFullYear();
    var oMoth = (today.getMonth() + 1).toString();
    if (oMoth.length <= 1) oMoth = '0' + oMoth;
    var oDay = today.getDate().toString();
    if (oDay.length <= 1) oDay = '0' + oDay;
    return oYear + str + oMoth + str + oDay;
  },


  tihuo: function () {
    let _this = this


    var yesterday = _this.getDay(0, '-');
    console.log("____________________________")
    console.log(yesterday);


    this.setData({
      jintian: yesterday,
    })

    if (_this.data.pgtype == 0) {
      _this.setData({
        chuxian: 1,
      })
    }

    if (_this.data.pgtype == 1) {
      _this.setData({
        chuxian: 2,
      })
    }

    let wid = wx.getStorageSync("wid");
    let pgtype = this.data.pgtype

    wx.request({
      url: api.root + '/va1/appOrder/getShippingTimeRange',
      method: 'POST',
      data: {
        "data": {
          "wid": wid + '',
          "shippingType": pgtype + '',
        }
      },
      success: function (res) {
        console.log("aaaaaaaaaaa")
        console.log(res)
        // var json = JSON.parse(res.data.data.payInfo);
        if (res.data.code == '200') {
          _this.setData({
            today: res.data.data.today,
            tomorrow: res.data.data.tomorrow,
          })

          for (let i = 0; i < res.data.data.today.length; i++) {
            if (res.data.data.today[i].state == 1) {
              _this.setData({
                shifen: res.data.data.today[i].timeRange
              })
            }
          }


        }
      }
    })
  },

  today: function () {
    let _this = this
    this.setData({
      todayxs: true,
    })





  },
  tomorrow: function () {
    let _this = this
    this.setData({
      todayxs: false,
    })

  },


  shijian: function (e) {
    let _this = this


    var yesterday = _this.getDay(0, '-');
    var yesterday1 = _this.getDay(1, '-');

    let index = e.currentTarget.dataset.index
    console.log("xxxxxxxxxxxxxxx")
    console.log(index)

    let shifen = e.currentTarget.dataset.text
    let todayxs = _this.data.todayxs
    let todaya = _this.data.today
    let tomorrowa = _this.data.tomorrow

    if (todayxs == true) {
      _this.setData({
        jintian: yesterday
      })
      let tomorrowas = []
      for (let i = 0; i < tomorrowa.length; i++) {

        if (tomorrowa[i].state == 1) {

          tomorrowa[i].state = 2

        }
      }

      _this.setData({
        tomorrow: tomorrowa,
      })

      for (let i = 0; i < todaya.length; i++) {


        if (todaya[i].state == 0) {
        } else {
          todaya[i].state = 2
        }
      }

      if (todaya[index].state == 0) {
        return;
      } else {
        todaya[index].state = 1
      }


      console.log(todaya[index])
      _this.setData({
        today: todaya,
      })

      let tomorrowam = _this.data.tomorrow
      for (let a = 0; a < tomorrowam.length; a++) {
        if (tomorrowam[a].state == 1) {
          _this.setData({
            jintian: yesterday1
          })

        }
      }

    }


    if (todayxs == false) {
      _this.setData({
        jintian: yesterday1
      })
      let todayas = []
      for (let i = 0; i < todaya.length; i++) {
        if (todaya[i].state == 1) {
          todaya[i].state = 2

        }
      }

      _this.setData({
        today: todaya,
      })

      for (let i = 0; i < tomorrowa.length; i++) {

        if (tomorrowa[i].state == 0) {
        } else {
          tomorrowa[i].state = 2
        }
      }

      if (tomorrowa[index].state == 2) {
        tomorrowa[index].state = 1
      }

      _this.setData({
        tomorrow: tomorrowa,
      })


      let todayam = _this.data.today
      for (let a = 0; a < todayam.length; a++) {
        if (todayam[a].state == 1) {
          _this.setData({
            jintian: yesterday
          })

        }
      }
    }


    _this.setData({
      shifen: shifen,
    })
  },


  queren: function () {

    if (this.data.pgtype == 0) {
      let shijian = this.data.jintian + " " + this.data.shifen
      this.setData({
        shijian: shijian,
        tihuo: 2,
        todayxs: true
      })

      if (this.data.shifen == '') {
        wx.showToast({
          title: '请选择配送时间段',
          icon: 'none'
        })
        return;
      }
    }
    
    if (this.data.pgtype == 1) {
      let shijiant = this.data.jintian + " " + this.data.shifen
      this.setData({
        tihuot: 4,
        shijiant: shijiant,
        todayxs: true
      })

      if (this.data.shifen == '') {
        wx.showToast({
          title: '请选择自提时间段',
          icon: 'none'
        })
        return;
      }
    }


    this.setData({

      chuxian: "",
      // 

    })
  },

  guanbi: function () {
    this.setData({
      chuxian: "",
      // 
    })
  },


//点击选择门店
  mendian:function(){
    let wname = this.data.wname
    wx.navigateTo({
      url: '../group_address/group_address?shopName='+wname,
    })
 
  }

})