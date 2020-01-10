  const api = require('../../utils/api.js')//引入可拼接的ur
Page({
  data: {
    totalPrice: 0,           // 总价，初始为0
    selectAllStatus: true,    // 全选状态，默认全选
    startX: 0, //开始坐标
    startY: 0,
    items: [],   // 购物车列表
    wid: '',
    carnum: '',
    jiesuantrue:true,
    latitude: '',
    longitude: '',
    wstate: '',
    shops: [],
    sjLength:'',
    load:false,
    over:true,
    nonet:false
  },

  onLoad: function (options) {

    var _this = this

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


    let wstate = wx.getStorageSync("wstate");
    this.setData({
      wstate: wstate
    })


    if (options.wid != undefined) {
      wx.setStorageSync("wid", options.wid)
    }
    
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




   this.setData({
     totalPrice:0
   })
     
  },

  onReady: function () {

  },
  onShow: function () {
    this.setData({
      carnum:''
    })
    this.showCarList();
    this.showCarNum();


  },





  //显示购物车
  showCarList: function () {
    let _this = this;
    let uid = wx.getStorageSync('uid')
    let wid = wx.getStorageSync("wid")
    _this.setData({
      wid: wid
    })
    wx.request({
      url: api.root+'v1/cart/usercart',
      method: 'POST',
      dataType: 'json',
      data: {
        "data": {
          "latitude": 39.839544,
          "longitude": 116.379163,
          "wid": wid + "",
          "online": 1,
          "user_id": uid + "",
          "platform": "Fresh",
        }
      },
      success: function (res) {
        console.log(res.data)

  
        if (res.data.data.mids[0] === undefined) {
          _this.setData({
            items: null,
            sjLength:true,
            load: true
          });
        } else {
          _this.setData({
            items: res.data.data.mids[0].list,
            load:true
          });
          _this.selectAllm();
        }

        if (res.data.data.mids[0].list.length == 0) {
          _this.setData({
            items: null,
            sjLength: true,
            load: true
          });
        }


      }
    })
  },
  //显示购物车数量
  showCarNum: function () {
    console.log("显示购物车数量")
    let _this = this;
    let uid = wx.getStorageSync('uid')
    wx.request({
      url: api.root +'v1/cart/usercart.sku.count.get',
      method: 'POST',
      dataType: 'json',
      data: {
        "data": {
          "wid": _this.data.wid + "",
          "uid": uid + "",
          "platform": "Fresh",
        }
      },
      success: function (res) {
        console.log("显示购物车数量"+JSON.stringify(res.data))
        _this.setData({
          carnum: res.data.data.count
        })
        if (res.data.data.count>0){
          wx.setTabBarBadge({
            index: 2,
            text: res.data.data.count + ''
          })
        }else{
          wx.removeTabBarBadge({
            index: 2
          })
        }
        console.log(_this.data)
      }
    })
  },

  //默认全选
  selectAll(even) {
    let selectAllStatus = this.data.selectAllStatus;    // 是否全选状态
    console.log(even)
    if (even != undefined) {
      selectAllStatus = !selectAllStatus;
    }
    let items = this.data.items;
    for (let i = 0; i < items.length; i++) {
      if (items[i].goods_num>0){
        items[i].selected = selectAllStatus; // 改变所有商品状态
        let selectedi = this.data.items[i].selected;
      }
  
    }
    this.setData({
      selectAllStatus: selectAllStatus,
      items: items
    });
    this.getTotalPrice();
    if (selectAllStatus == false) {         //判断能否结算
      this.setData({
        jiesuantrue: false,
      });
    }else{
      this.setData({
        jiesuantrue: true,
      });
    }



  },



  selectAllm(even) {
    let selectAllStatus = this.data.selectAllStatus;    // 是否全选状态
    console.log(even)
  

    if (selectAllStatus==false){
      selectAllStatus = !selectAllStatus;
    }else{
      
    }


    let items = this.data.items;
    for (let i = 0; i < items.length; i++) {
      if (items[i].goods_num > 0) {
        items[i].selected = selectAllStatus; // 改变所有商品状态
        let selectedi = this.data.items[i].selected;
      }

    }
    this.setData({
      selectAllStatus: selectAllStatus,
      items: items
    });
    this.getTotalPrice();
    if (selectAllStatus == false) {         //判断能否结算
      this.setData({
        jiesuantrue: false,
      });
    } else {
      this.setData({
        jiesuantrue: true,
      });
    }



  },





  //获取总价格
  getTotalPrice() {
    let items = this.data.items;
    let total = 0;
    for (let i = 0; i < items.length; i++) {// 循环列表得到每个数据
      if (items[i].selected) {
        let m = 0;
        if (items[i].act_price>0){
          m = items[i].act_price;
        }else{
          m = items[i].sale_price;
        }
        total += items[i].num * m; // 所有价格加起来
      }
    }
    this.setData({
      items: items,
      totalPrice: total.toFixed(2)
    });
  },

  selectList(e) {
    const index = e.currentTarget.dataset.index;    // 获取data- 传进来的index
    let items = this.data.items;                    // 获取购物车列表
    const selected = items[index].selected;         // 获取当前商品的选中状态
    items[index].selected = !selected;              // 改变状态
    this.setData({
      items: items
    });
    this.getTotalPrice();                           // 重新获取总价
    let selectArr = [];
    let selectAss=[];

    for (let i = 0; i < items.length; i++) {
      selectArr.push(items[i].selected);
      if (items[i].selected){           
        selectAss.push(items[i].selected);
      }
    }

    if (selectAss.length == 0) {               //判断能否结算
      this.setData({
        jiesuantrue: false
      })
    } else {
      this.setData({
        jiesuantrue: true
      })
    }

    for (let i = 0; i < selectArr.length; i++) {
      if (!selectArr[i]) {
        this.setData({
          selectAllStatus: false
        })
        return;
      }
      this.setData({
        selectAllStatus: true
      })
    }
  },



  //加入购物车
  addCount(e) {
    let _this = this;
    let wid = _this.data.wid;

    const index = e.currentTarget.dataset.index;    // 获取data- 传进来的index
    let items = this.data.items;                    // 获取购物车列表
    const selected = items[index].selected;         // 获取当前商品的选中状态
    if (items[index].selected==false){
          items[index].selected = !selected;              // 改变状态
          _this.setData({
            items: items
          });
          _this.getTotalPrice();                           // 重新获取总价
          let selectArr = [];
          let selectAss = [];

          for (let i = 0; i < items.length; i++) {
            selectArr.push(items[i].selected);
            if (items[i].selected) {
              selectAss.push(items[i].selected);
            }
          }

          if (selectAss.length == 0) {               //判断能否结算
            _this.setData({
              jiesuantrue: false
            })
          } else {
            _this.setData({
              jiesuantrue: true
            })
          }

      if (selectAss.length == selectArr.length) {
        _this.setData({
          selectAllStatus: true
        })
      }

          for (let i = 0; i < selectArr.length; i++) {
            if (!selectArr[i]) {
              _this.setData({
                selectAllStatus: false
              })
        
            }
       
          }

    }


    let item = e.currentTarget.dataset.info;

    _this.updatecart(wid, item.sku_id, 1);

    let num = items[index].num;
    num = num + 1;
    items[index].num = num;
    this.setData({
      items: items
    });
    this.getTotalPrice();
  },


  // 减少数量
  minusCount(e) {
    let  _this = this;
    let wid = _this.data.wid;



    const index = e.currentTarget.dataset.index;    // 获取data- 传进来的index
    let items = this.data.items;                    // 获取购物车列表
    const selected = items[index].selected;         // 获取当前商品的选中状态
    if (items[index].selected==false){
          items[index].selected = !selected;              // 改变状态
          _this.setData({
            items: items
          });
          _this.getTotalPrice();                           // 重新获取总价
          let selectArr = [];
          let selectAss = [];

          for (let i = 0; i < items.length; i++) {
            selectArr.push(items[i].selected);
            if (items[i].selected) {
              selectAss.push(items[i].selected);
            }
          }

          if (selectAss.length == 0) {               //判断能否结算
            _this.setData({
              jiesuantrue: false
            })
          } else {
            _this.setData({
              jiesuantrue: true
            })
          }

      if (selectAss.length == selectArr.length){
        _this.setData({
          selectAllStatus: true
        })
      }

          for (let i = 0; i < selectArr.length; i++) {
            if (!selectArr[i]) {
              _this.setData({
                selectAllStatus: false
              })
            }
          }
    }


    let item = e.currentTarget.dataset.info;

    let num = items[index].num;
    if (num <= 1) {
      wx.showModal({
        // title:'确定要删除该商品吗?',
        content:'确定要删除该商品吗?',
        cancelText:'再想想',
        confirmText:'确定',
        success:function(res){
          if (res.confirm==true){
            _this.data.items.splice(e.currentTarget.dataset.index, 1)         //移除元素
            // _this.getTotalPrice();
            _this.updatecart(wid, item.sku_id, -1);
            num = num - 1;
      
            // _this.setData({
            //   items: items
            // });
            _this.getTotalPrice();
            return;
          }
          
        }
      })
      return;
    }

    _this.updatecart(wid, item.sku_id, -1);
    num = num - 1;
    items[index].num = num;
    this.setData({
      items: items
    });
    this.getTotalPrice();
  },

  //删除商品事件
  del: function (e) {
    const index = e.currentTarget.dataset.index;    // 获取data- 传进来的index
    let _this = this;
    let wid = _this.data.wid;
    let item = e.currentTarget.dataset.info;
    let items = this.data.items;                    // 获取购物车列表
    this.setData({
      items: items
    });
    let rtnum = item.num;
    _this.updatecart(wid, item.sku_id, -rtnum);
    _this.data.items.splice(e.currentTarget.dataset.index, 1)   //移除元素
    this.getTotalPrice();         // 重新获取总价
    let selectArr = [];
    for (let i = 0; i < items.length; i++) {
      selectArr.push(items[i].selected);
    }
    for (let i = 0; i < selectArr.length; i++) {
      if (!selectArr[i]) {
        this.setData({
          selectAllStatus: false
        })
        return;
      }
      this.setData({
        selectAllStatus: true
      })
    }
  },
  //更新购物车
  updatecart: function (wid, sku_id, num) {
    let _this = this;
    let uid = wx.getStorageSync("uid");
    wx.request({
      url: api.root +'v1/cart/usercart.update',
      method: 'POST',
      dataType: 'json',
      data: {
        "data": {
          "wid": wid + "",
          "uid": uid + "",
          "sku_id": sku_id + "",
          "num": num + "",
          "mid": "1",
          "is_online": "1",
          "goods_type": "1",
          "platform": "Fresh",
          "check": "1"
        }
      },
      success: function (res) {
        let m = JSON.stringify(res.data);
        _this.data.carnum = _this.data.carnum + num;
        if(_this.data.carnum==0){
          wx.removeTabBarBadge({
            index:2
          })
        }else{
          wx.setTabBarBadge({
            index: 2,
            text: _this.data.carnum + ''
          })
        }
      }
    })
  },



  //结算
  toOrderConfirm() {
    let _this = this;
    if (_this.data.jiesuantrue == false) {       //判断能否结算
      return
    }



    var pronum = []
    for (let i = 0; i < _this.data.items.length; i++) {
      let goods_num = _this.data.items[i].goods_num;
      if (goods_num > 0) {
        pronum.push(goods_num)
      }
    }

    if (pronum.length == 0) {
      wx.showToast({
        title: "请添加商品",
        icon:'none',
        duration: 1000
      })

      return
    }





    wx.getSetting({
      success: function (res) {
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: function (res) {
              var orderarr='';
              let items = _this.data.items;
              for (let i = 0; i < items.length; i++) {
                let sku_id = _this.data.items[i].sku_id;
                let selectedi = _this.data.items[i].selected;
                let goods_num = _this.data.items[i].goods_num;
                if (selectedi === true && goods_num>0) {
                  orderarr = orderarr + sku_id+","
                }
              }
              _this.createOrder(orderarr)
            }
          })
        } else {
          wx.navigateTo({
            url: '../phone/phone?site=4'
          })
        }
      }
    })
  },
  //创建订单
  createOrder:function(skuids){
    let _this = this;
    let uid = wx.getStorageSync("uid");
    console.log("skuids"+skuids+"uid"+uid)
    wx.request({
      url: api.root +'v1/order/torder.create',
      method: 'POST',
      dataType: 'json',
      data: {
        "data": {
          "latitude": 39.896918,
          "longitude": 116.34227,
          "mid": "1",
          "platform": "Fresh",
          "user_id": uid + "",
          "skuIds": skuids+""
        }
      },
      success: function (res) {
        console.log(res.data)
        wx.navigateTo({
          url: '../order_confirm/order_confirm?toid=' + res.data.data.toid + '&skuIds=' + res.data.data.skuIds +"&source=car"
        })
      }
    })
  },

  //手指触摸动作开始 记录起点X坐标
  touchstart: function (e) {
    this.data.items.forEach(function (v, i) {
      if (v.isTouchMove)//只操作为true的
        v.isTouchMove = false;
    })
    this.setData({
      startX: e.changedTouches[0].clientX,
      startY: e.changedTouches[0].clientY,
      items: this.data.items
    })
  },

  //滑动事件处理
  touchmove: function (e) {
    var that = this,
      index = e.currentTarget.dataset.index,//当前索引
      startX = that.data.startX,//开始X坐标
      startY = that.data.startY,//开始Y坐标
      touchMoveX = e.changedTouches[0].clientX,//滑动变化坐标
      touchMoveY = e.changedTouches[0].clientY,//滑动变化坐标
      angle = that.angle({ X: startX, Y: startY }, { X: touchMoveX, Y: touchMoveY });
    that.data.items.forEach(function (v, i) {
      v.isTouchMove = false
      if (Math.abs(angle) > 30) return;
      if (i == index) {
        if (touchMoveX > startX) //右滑
          v.isTouchMove = false
        else //左滑
          v.isTouchMove = true
      }
    })
    that.setData({//更新数据
      items: that.data.items
    })
  },

  angle: function (start, end) {
    var _X = end.X - start.X,
      _Y = end.Y - start.Y
    return 360 * Math.atan(_Y / _X) / (2 * Math.PI);
  },










  jiesuanno: function () {
    var _this = this;
    var pronum = []
    for (let i = 0; i < _this.data.items.length; i++) {
      let goods_num = _this.data.items[i].goods_num;
      if (goods_num > 0) {
        pronum.push(goods_num)
      }
    }

    if (pronum.length == 0) {
      _this.setData({
        jiesuantrue: false,
        selectAllStatus:false
      })
    }
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
      url: '../cart/cart',
    })
  }
})