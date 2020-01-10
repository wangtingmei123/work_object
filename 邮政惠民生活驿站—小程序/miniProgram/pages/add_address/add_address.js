const api = require('../../utils/api.js')//引入可拼接的url
Page({
  data: {
    parameter: [{ id: 1, name: '家' }, { id: 2, name: '公司' }, { id: 3, name: '学校' }, { id: 4, name: '其他' }],
    //模拟商品参数数据，如果是线上版本需要自行发起request请求
    dizhi:'',
    phone:'',
    checked_id:"1",
    receiver_name:'',
    detail:'',
    address_id:'',
    lat:"",
    lng:"",
    statres:"1",
    town_id:''
    
  },
  onLoad: function (options) {
    console.log("aaaaaaaaa")
    console.log(options.amap_latitude)
    console.log(options.checked_id)
    console.log(options.address_id)


    if (options.checked_id != undefined) {
      this.setData({
        parameter: this.data.parameter,
        receiver_name: options.receiver_name,
        phone: options.phone,
        detail: options.detail,
        dizhi: options.area_name,
        checked_id: options.checked_id,
        address_id: options.address_id,
        lat: options.amap_latitude,
        lng: options.amap_longitude,
        town_id: options.town_code,
      })
    }
     
    var _this=this;
    if (options.checked_id) {
      let checked_idint = _this.data.checked_id-1
      if (options.checked_id==undefined){
        _this.data.parameter[0].checked = true;
      }
      _this.data.parameter[checked_idint].checked = true;
    } else {
      _this.data.parameter[0].checked = true;
    }

    this.setData({
      parameter: this.data.parameter,
      statres: options.statres
    })
    
    //默认parameter数组的第一个对象是选中的

   console.log("____________")
    console.log(options.checked_id)




  },
  // 参数点击响应事件
  parameterTap: function (e) {//e是获取e.currentTarget.dataset.id所以是必备的，跟前端的data-id获取的方式差不多
    var that = this
    let this_checkedname = e.currentTarget.dataset.text
    var this_checked = e.currentTarget.dataset.id
    var parameterList = this.data.parameter//获取Json数组
    for (var i = 0; i < parameterList.length; i++) {
      if (parameterList[i].id == this_checked) {
        parameterList[i].checked = true;//当前点击的位置为true即选中
      }
      else {
        parameterList[i].checked = false;//其他的位置为false
      }
    }
    that.setData({
      parameter: parameterList,
      checked_name: this_checkedname,
      checked_id: this_checked
    })

    console.log(this_checked)
  },



  phoneInput1(e) {
    this.setData({
      receiver_name: e.detail.value,
    })
  },
  phoneInput2(e) {
    this.setData({
      phone: e.detail.value,
    })
  },

  phoneInput3(e) {
    this.setData({
      dizhi: e.detail.value,
    })
  },

  phoneInput4(e) {
    this.setData({
      detail: e.detail.value
    })
  },

  toAddre: function () {

    wx.navigateTo({
      url: '../address_page/address_page'
    })


  },


  addadresscun:function(){
    let _this = this
    console.log(_this.data.lat)
    console.log(_this.data.lng)
 
    console.log(_this.data.phone)
    let uid = wx.getStorageSync("uid");
    let address_id = _this.data.address_id
    let receiver_namea = _this.data.receiver_name
    let detaila = _this.data.detail
    let receiver_name =receiver_namea.replace(/\s+/g, "")
    let detail = detaila.replace(/\s+/g, "")

    if (receiver_name == '' || _this.data.receiver_name ==undefined){
      wx.showToast({
        title: '请输入收货人',
        icon: 'none'
      })
      return;
    }

    if (_this.data.phone == '') {
      wx.showToast({
        title: '请输入手机号',
        icon: 'none'
      })
      return;
    }

    if (!(/^1[34578]\d{9}$/.test(_this.data.phone))) {
      wx.showToast({
        title: '请输入正确的手机号',
        icon: 'none'
      })
      return;
    }

    if (_this.data.dizhi == '') {
      wx.showToast({
        title: '请选择所在地区',
        icon: 'none'
      })
      return;
    }

    if (detail == '') {
      wx.showToast({
        title: '请输入详细地址',
        icon: 'none'
      })
      return;
    }

    if (_this.data.address_id==''){

    wx.request({
      url: api.root + '/v1/userAddress/user.address.add',
      method: 'POST',
      dataType: 'json',
      data: {
        "data": {
          "user_id": uid+'',
          "receiver": receiver_name+'',
          "phone": _this.data.phone+'',
          "area": _this.data.dizhi+'',
          "detail": detail+'',
          "tag": _this.data.checked_id+'',
          "is_default":"0",
          "latitude": _this.data.lat+'',
          "longitude": _this.data.lng+'',
          "town_code": _this.data.town_id+'',
        }
      },
      success: function (res) {
        console.log(res.data)

        if (_this.data.statres == "1") {
          wx.redirectTo({
            url: '../Address_list/Address_list'
          })
        }

        if (_this.data.statres == "2") {
          wx.redirectTo({
            url: '../Address_list_me/Address_list_me'
          })
        }

        if (_this.data.statres == "3") {
          wx.redirectTo({
            url: '../address/address'
          })
        }
      }
    })

    }

    if (_this.data.address_id!=""){
     console.log("编辑")

      console.log(_this.data.lat)
      console.log(_this.data.town_id)

      wx.request({
        url: api.root + '/v1/userAddress/user.address.modify',
        method: 'POST',
        dataType: 'json',
        data: {
          "data": {
            "user_id": uid + '',
            "address_id": _this.data.address_id+'',
            "receiver": receiver_name + '',
            "phone": _this.data.phone + '',
            "area": _this.data.dizhi + '',
            "detail": detail + '',
            "tag": _this.data.checked_id + '',
            "is_default": "0",
            "latitude": _this.data.lat+'',
            "longitude": _this.data.lng+'',
            "town_code": _this.data.town_id + '',

          }
        },
        success: function (res) {
          if (_this.data.statres=="1"){
            wx.redirectTo({
              url: '../Address_list/Address_list'
            })
          }

          if (_this.data.statres =="2") {
            wx.redirectTo({
              url: '../Address_list_me/Address_list_me'
            })
          }
        
        }
      })
    }

  },


  delres: function (e) {
    let _this=this

    wx.showModal({
      title: '删除地址',
      content:'确定删除该收货地址?',
      success: function (res) {
        if (res.confirm) {
          wx.request({
            url: api.root + '/v1/userAddress/user.address.delete',
            method: 'POST',
            dataType: 'json',
            data: {
              "data": {
                "address_ids": _this.data.address_id + '',
              }
            },
            success: function (res) {
              console.log(res.data)
              if (_this.data.statres == "1") {
                wx.redirectTo({
                  url: '../Address_list/Address_list'
                })
              }

              if (_this.data.statres == "2") {
                wx.redirectTo({
                  url: '../Address_list_me/Address_list_me'
                })
              }
            }
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })

  },

})