const api = require('../../utils/api.js')//引入可拼接的url
var count = 0;
Page({
  data: {
    showAll: false,
    _num: '',
    _nums: '',
    orderall:[],
    current_page:1,
    total_page:'',
    load: false,
    over: true,
    notext:false,
    isshow:true,
    nonet:false,
    stars: [0, 1, 2, 3, 4],
    normalSrc: '../img/index/xinxin0.png',
    selectedSrc: '../img/index/xinxin1.png',
    // halfSrc: '../img/index/wjx1.png',
    key: 5,//评分
    score_see:false,
    order_id:'',
    id_index:''
  },

onLoad: function(options){



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


    console.log("订单类型"+ options.num)
  
      let pay_status = '';
      let order_status='';
     let shippingType = '';
      let orderType=""
      _this.setData({
        _num: options.num,
      })
      if(options.num ==0){
        _this.selectOrder();
      }

      else if(options.num==1){//代付款
        pay_status='0'
        _this.statusOrder(pay_status, '','');
      
      }else if (options.num == 2){//待拼团
         pay_status = '1'
         order_status = '0';
        _this.statusGroopOrder(pay_status,order_status,'')
      }
      else if (options.num == 3) {//待自提
        pay_status = '1'
        order_status = '2';
        orderType = "1",
          shippingType="1"
          
        _this.statusOrder(pay_status, order_status, shippingType);
      }

      else if (options.num == 4 ){//待发货
        pay_status = '1'
        order_status = '2';
        orderType="1"
        shippingType="0"
        _this.statusOrder(pay_status, order_status, shippingType);
      }


      else if (options.num == 6) {//配送中
        pay_status = '1'
        order_status = '6';
        orderType = "1"
        shippingType = "0"
        _this.statusOrder(pay_status, order_status, shippingType);
      }


      else if (options.num == 5) {//已完成
        _this.setData({
          load: true,
          over: false
        })
        pay_status = '1';
        order_status='3';
        _this.statusOrder(pay_status, order_status,"");
      }
  },








    
  // 上拉加载
onReachBottom: function () {
    let _this = this;
    let pay_status = '';
    let order_status = '';
  let shippingType =""
     let num = _this.data._num;
  
    if (num == 0) {
      _this.selectOrderBottom();
    }
    else if (num == 1) {//代付款
      pay_status = '0'
      _this.statusOrderBottom(pay_status,"","")

    } else if (num == 2) {//待拼团
      pay_status = '1'
      order_status = '0';
      _this.statusOrderGroupBottom(pay_status,order_status,"")
    }
    else if (num == 3) {//待自提
      pay_status = '1'
      order_status = '2';
      shippingType="1"
      _this.statusOrderBottom(pay_status, order_status, shippingType)
    }

    else if (num == 4) {//待自提
      pay_status = '1'
      order_status = '2';
      shippingType = "0"
      _this.statusOrderBottom(pay_status, order_status, shippingType)
    }
    else if (num == 5) {//已完成
      pay_status = '1';
      order_status = '3';

      _this.statusOrderBottom(pay_status, order_status, "")
    }

  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (res) {
    let uid = wx.getStorageSync("uid");
    if (res.from === 'view') {
    }
    let gbid = res.target.dataset.info.order_id;
    return {
      title: '邀请好友来参团',
      path: '/pages/imgroup/imgroup?tgid=' + gbid + '&uid=' + uid,
    }
  },
menuClick: function (e) {
  let _this = this;
  let pay_status = '';
  let order_status = '';
  let shippingType = '';
  this.setData({
    showAll: false,
    _num: e.target.dataset.num,
    _nums: e.target.dataset.num,
    orderall: [],
    load: false,
    over: true,
    current_page: 1,
    notext:false
  
  })
  console.log(e.target.dataset.num)
  let num = e.target.dataset.num;
  if (num == 0) {
    _this.selectOrder();
  }
  else if (num == 1) {//代付款
    pay_status = '0'
    _this.statusOrder(pay_status,'','');

  } else if (num == 2) {//待拼团
     pay_status = '1'
    order_status = '0';
    _this.statusGroopOrder(pay_status, order_status,'')
  }
  else if (num == 3) {//待自提
    pay_status = '1'
    order_status = '2';
    shippingType="1"
    _this.statusOrder(pay_status, order_status, shippingType)
  }

  else if (num == 4) {//待发货
    pay_status = '1'
    order_status = '2';
    shippingType="0"
    _this.statusOrder(pay_status, order_status, shippingType)

  }



  else if (num ==6) {//配送中
    pay_status = '1'
    order_status = '6';
    shippingType = "0"
    _this.statusOrder(pay_status, order_status, shippingType);
  }

  else if (num == 5) {//已完成
    pay_status = '1';
    order_status = '3';
    _this.statusOrder(pay_status, order_status,"")
  }
},
  selectOrder: function(){
    let _this = this
    let uid = wx.getStorageSync("uid");
    wx.request({
      url: api.root + 'v1/order/order.list.get',
      method: 'POST',
      dataType: 'json',
      data: {
        "data": {
          "user_id": uid + "",
          "page_size": "10",
          "page_no": "1",
          "order_status": "",
          "pay_status": "",
          "statusOrder":''
        }
      },
      success: function (res) {
        console.log("全部订单"+JSON.stringify(res.data))
        console.log( res.data.data)
        _this.setData({
          orderall: res.data.data.order_list,
          total_page: res.data.data.page_info.total_page,
        })
        if (res.data.data.page_info.total_page==1){
          _this.setData({
            load: true,
            over: false
          })
        }
        if (res.data.data.page_info.total_record == 0) {
          _this.setData({
            load: true,
            over: true,
            notext: true
          })
        }
      }
    })
  },
  selectOrderBottom: function () {
    let _this = this
    let uid = wx.getStorageSync("uid");
    if (_this.data.current_page == _this.data.total_page) {
      _this.setData({
        load: true,
        over: false
      })
    } else {
      _this.data.current_page++;
       wx.request({
      url: api.root + 'v1/order/order.list.get',
      method: 'POST',
      dataType: 'json',
      data: {
        "data": {
          "user_id": uid + "",
          "page_size": "10",
          "page_no": _this.data.current_page+"",
          "order_status": "",
          "pay_status": "",
          "shippingType":''
        }
      },
      success: function (res) {
        _this.setData({
          orderall: _this.data.orderall.concat(res.data.data.order_list),
        })
      }
    })
    }
  },
  statusOrder: function (pay_status, order_status, shippingType,) {
    let _this =this;
    let uid = wx.getStorageSync("uid");
    wx.request({
      url: api.root + 'v1/order/order.list.get',
      method: 'POST',
      dataType: 'json',
      data: {
        "data": {
          "user_id": uid + "",
          "page_size": "10",
          "page_no": _this.data.current_page + "",
          "pay_status": pay_status + '',
          "order_status": order_status + '',
          "shippingType": shippingType + '',
        
        }
      },
      success: function (res) {
        _this.setData({
          orderall: res.data.data.order_list,
          total_page: res.data.data.page_info.total_page,
        })
        if (res.data.data.page_info.total_page == 1) {
          _this.setData({
            load: true,
            over: false
          })
        }
        if (res.data.data.page_info.total_record == 0) {
          _this.setData({
            load: true,
            over: true,
            notext:true
          })
        }
      }
    })
  },
  statusOrderBottom: function (pay_status, order_status, shippingType) {
    let _this = this;
    let uid = wx.getStorageSync("uid");
    if (_this.data.current_page == _this.data.total_page) {
      _this.setData({
        load: true,
        over: false
      })
    } else {
    _this.data.current_page++;
    wx.request({
      url: api.root + 'v1/order/order.list.get',
      method: 'POST',
      dataType: 'json',
      data: {
        "data": {
          "user_id": uid + "",
          "page_size": "10",
          "page_no": _this.data.current_page + "",
          "pay_status": pay_status + '',
          "order_status": order_status + '',
          "orderType": "8000",
          "shippingType": shippingType+''
        }
      },
      success: function (res) {
        _this.setData({
          orderall: _this.data.orderall.concat(res.data.data.order_list),
        })
        if (res.data.data.page_info.total_page == 1) {
          _this.setData({
            load: true,
            over: false
          })
        }
      }
    })
    }
  },
  statusGroopOrder: function (pay_status, order_status, shippingType) {
    let _this = this;
    let uid = wx.getStorageSync("uid");
    wx.request({
      url: api.root + 'v1/order/order.list.get',
      method: 'POST',
      dataType: 'json',
      data: {
        "data": {
          "user_id": uid + "",
          "page_size": "10",
          "page_no": _this.data.current_page + "",
          "pay_status": pay_status + '',
          "order_status": order_status + '',
          "orderType": "8121",
          "shippingType": shippingType+""
        }
      },
      success: function (res) {
        _this.setData({
          orderall: res.data.data.order_list,
          total_page: res.data.data.page_info.total_page,
        })
        if (res.data.data.page_info.total_page == 1) {
          _this.setData({
            load: true,
            over: false
          })
        }
        if (res.data.data.page_info.total_record == 0) {
          _this.setData({
            load: true,
            over: true,
            notext: true
          })
        }
      }
    })
  },
  statusOrderGroupBottom: function (pay_status, order_status, shippingType) {
    let _this = this;
    let uid = wx.getStorageSync("uid");
    if (_this.data.current_page == _this.data.total_page) {
      _this.setData({
        load: true,
        over: false
      })
    } else {
      _this.data.current_page++;
      wx.request({
        url: api.root + 'v1/order/order.list.get',
        method: 'POST',
        dataType: 'json',
        data: {
          "data": {
            "user_id": uid + "",
            "page_size": "10",
            "page_no": _this.data.current_page + "",
            "pay_status": pay_status + '',
            "order_status": order_status + '',
            "orderType":"8121",
            "shippingType": shippingType+""
          }
        },
        success: function (res) {
          _this.setData({
            orderall: _this.data.orderall.concat(res.data.data.order_list),
          })
          if (res.data.data.page_info.total_page == 1) {
            _this.setData({
              load: true,
              over: false
            })
          }

        }
      })
    }
  },
  orderDetail:function(even){
    let info = even.currentTarget.dataset.info;
    let pay_status = even.currentTarget.dataset.info.pay_status;
    let order_type = even.currentTarget.dataset.info.order_type;
    let order_status = even.currentTarget.dataset.info.order_status;
    let statusOrder = even.currentTarget.dataset.info.statusOrder;
    console.log("查看订单详情pay_status" + pay_status + "order_type" + order_type + "order_status" + order_status)

    if (pay_status == 0 && order_status == 0) {//待付款订单
      console.log("待付款订单")
      wx.navigateTo({
        url: '../waitPay/waitPay?oid=' + even.currentTarget.dataset.info.order_id,
      })
    }

    if (pay_status == 0 && order_status == 4) {//已取消订单
      console.log("已取消订单")
      wx.navigateTo({
        url: '../waitPay/waitPay?oid=' + even.currentTarget.dataset.info.order_id,
      })
    }
    // if (pay_status == 0 && order_status == 0&& order_type == 8121) {//已完成订单
    //   console.log("待付款拼团订单")
    //   wx.navigateTo({
    //     url: '../alrPay/alrPay?oid=' + even.currentTarget.dataset.info.order_id,
    //   })
    // }
    if (pay_status == 1 && order_status == 2 && order_type != 8121){//待自提和待发货
      console.log("待自提和待发货")
      wx.navigateTo({
        url: '../groupSuc/groupSuc?oid=' + even.currentTarget.dataset.info.order_id,
      })
    }


    if (pay_status == 1 && order_status == 6 && order_type != 8121) {//配送中
      console.log("配送中")
      wx.navigateTo({
        url: '../groupSuc/groupSuc?oid=' + even.currentTarget.dataset.info.order_id,
      })
    }



    if (pay_status == 1 && order_status == 6 && order_type == 8121) {//拼团配送中
      console.log("拼团配送中")
      wx.navigateTo({
        url: '../waitGroup/waitGroup?oid=' + even.currentTarget.dataset.info.order_id,
      })
    }


    if (pay_status == 1 && order_type == 8121 && order_status == 2) {//拼团待自提和待发货
      console.log("拼团待自提")
      wx.navigateTo({
        url: '../waitGroup/waitGroup?oid=' + even.currentTarget.dataset.info.order_id,
      })
    }


    if (pay_status == 1 && order_status == 3){//已完成
      console.log("已完成")
      wx.navigateTo({
        url: '../groupSuc/groupSuc?oid=' + even.currentTarget.dataset.info.order_id,
      })
    }

    if (pay_status == 4 && order_status == 4) {//已退款
      console.log("待付款订单")
      wx.navigateTo({
        url: '../waitPay/waitPay?oid=' + even.currentTarget.dataset.info.order_id,
      })
    }

    if (pay_status == 1 && order_type == 8121 && order_status == 0){//待成团
      console.log("待成团")
      wx.navigateTo({
        url: '../waitGroup/waitGroup?oid=' + even.currentTarget.dataset.info.order_id,
      })
    }    

  },

  paytoo:function(even){
    let info = even.currentTarget.dataset.info;
    console.log("再来一单"+JSON.stringify(info))
    let toid = even.currentTarget.dataset.info.order_id;
    let uid  = wx.getStorageSync("uid");
    wx.request({
      url: api.root + 'v1/cart/addFinishedOrderSkusToUsercart',
      method: 'POST',
      dataType: 'json',
      data: {
        "data": {
          "oid": toid+"",
          "uid": uid+""
        }
      },
      success: function (res) {
        console.log("再来一单返回信息" + JSON.stringify(res.data))
        if (res.data.message ='"再来一单成功"'){
            wx.switchTab({
              url: '../cart/cart',
            })
        }
      }
    })  
  },
  //确认收货
  // receiving:function(even){
  //   let info = even.currentTarget.dataset.info;
  //   console.log("确认收货" + JSON.stringify(info))
  //   let toid = even.currentTarget.dataset.info.order_id;
  //   wx.request({
  //     url: api.root + 'v1/cart/addFinishedOrderSkusToUsercart',
  //     method: 'POST',
  //     dataType: 'json',
  //     data: {
  //       "data": {
  //         "oid": toid + "",
  //         "uid": uid + ""
  //       }
  //     },
  //     success: function (res) {
  //       console.log("确认收货" + JSON.stringify(res.data))
  //     }
  //   })  
  // },
  receiving: function (even) {
    const index = even.currentTarget.dataset.index;    // 获取data- 传进来的index
    let _this = this;
    let id_index = even.currentTarget.dataset.index; 
    _this.setData({
      id_index: id_index
    })

    let item = even.currentTarget.dataset.info;

    let info = even.currentTarget.dataset.info;
    console.log("确认收货" + JSON.stringify(info))
    let uid = wx.getStorageSync("uid");
    wx.request({
      url: api.root + 'groupBuying/checkTake',
      method: 'POST',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      dataType: 'json',
      data: {
        "userId": uid,
        "orderId": info.order_id,
      },
      success: function (res) {
        console.log(res.data)
        let code = res.data.code;
          if (code == 200) {
            wx.showToast({
              title: '确认收货成功',
              icon: 'none'
            })
            let orderall = _this.data.orderall;
            if (_this.data._num==6){
              _this.data.orderall.splice(even.currentTarget.dataset.index, 1)   //移除元素
            }     
           
            if (_this.data._num == 0) {
              for (let i = 0; i < orderall.length;i++){
                if (i == id_index){
                  orderall[i].order_status=3
                  orderall[i].comment_star = 0
                }
              }
              _this.setData({
                orderall: orderall
              })
              
            }   



            _this.setData({
              orderall: orderall
            });
        } 
      }
    })

    this.setData({
      isshow:false
    })
  },
  toWaitPay() {
    wx.navigateTo({
      url: '../waitPay/waitPay',
    })
  },
  toPintuan(even) {
    let info = even.currentTarget.dataset.info;
    // console.log("邀请好友参团"+JSON.stringify(info))
    // console.log("邀请好友参团" + even.currentTarget.dataset.info.gbid)
    wx.navigateTo({
      url: '../imgroup/imgroup?tgid=' + even.currentTarget.dataset.info.order_id,
    })
  },











// 评分
  score(even){
    let info = even.currentTarget.dataset.info;
    let id_index = even.currentTarget.dataset.index;
    console.log("ppppppp")
    console.log(id_index)

    this.setData({
      score_see:true,
      order_id: info.order_id,
      id_index: id_index

    })
  },

  //点击整颗星
  selectRight (e) {
    var key = e.currentTarget.dataset.key
    console.log("得" + key + "分")
    this.setData({
      key: key
    })
    console.log(this.data.key)
  },

// 提交
  dianjistate:function(){
  console.log("aaaaaaaaaaaa")
    // console.log("确认收货" + JSON.stringify(info))
    let uid = wx.getStorageSync("uid");
    let starNum=this.data.key;
    let order_id = this.data.order_id
    let _this=this
    console.log(uid)
    console.log(starNum)
    console.log(order_id)
    wx.request({
      url: api.star_root+'vd1/orderInfo/saveCommentStar4Delivery',
      method: 'POST',
      dataType: 'json',
      data: {
   
            "uid": uid+'',
            "oid":order_id+'',
            "starNum": starNum+''
 
      },
      success: function (res) {
        console.log("评分")
        console.log(res)

        if(res.data.code==200){
  


          let orderall = _this.data.orderall
          for (let i = 0; i < orderall.length; i++) {
            if (i == _this.data.id_index) {
              orderall[i].comment_star = 1

            }
          }

          _this.setData({
            score_see: false,
            key: 5,
            orderall: orderall
          })

          wx.showToast({
            title: '打分成功',
            icon: 'success',
            duration: 2000
          })
    
        }else{
    
          wx.showToast({
            title: res.data.message,
            icon: 'none',
            duration: 2000
          })

          _this.setData({
            score_see: false,
            key: 5,
          })
 
        


        }
    
   
      }
    })



  },

  outbtn: function () {
    this.setData({
      score_see: false,
      key: 5
   

    })
  },







  // 下拉刷新
  onPullDownRefresh: function () {
    // 显示顶部刷新图标
    wx.showNavigationBarLoading();


    let _this=this

    let pay_status = '';
    let order_status = '';
    let shippingType = '';
    let orderType = ""
    let _num = _this.data._num
    if (_num == 0) {
      _this.selectOrder();
    }

    else if (_num == 1) {//代付款
      pay_status = '0'
      _this.statusOrder(pay_status, '', '');

    } else if (_num == 2) {//待拼团
      pay_status = '1'
      order_status = '0';
      _this.statusGroopOrder(pay_status, order_status, '')
    }
    else if (_num == 3) {//待自提
      pay_status = '1'
      order_status = '2';
      orderType = "1",
        shippingType = "1"

      _this.statusOrder(pay_status, order_status, shippingType);
    }

    else if (_num == 4) {//待发货
      pay_status = '1'
      order_status = '2';
      orderType = "1"
      shippingType = "0"
      _this.statusOrder(pay_status, order_status, shippingType);
    }


    else if (_num == 6) {//配送中
      pay_status = '1'
      order_status = '6';
      orderType = "1"
      shippingType = "0"
      _this.statusOrder(pay_status, order_status, shippingType);
    }


    else if (_num == 5) {//已完成
      _this.setData({
        load: true,
        over: false
      })
      pay_status = '1';
      order_status = '3';
      _this.statusOrder(pay_status, order_status, "");
    }







    setTimeout(function () {
      // 隐藏导航栏加载框
      wx.hideNavigationBarLoading();
      // 停止下拉动作
      wx.stopPullDownRefresh();

    }, 1000) 

  }

 


    })

