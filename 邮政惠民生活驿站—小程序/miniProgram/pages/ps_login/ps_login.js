// pages/ps_login/ps_login.js

const api = require('../../utils/api.js')//引入可拼接的url
const hmd5 = require('../../utils/md5.js')//引入可拼接的url
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone:"",
    shanchu: true,
    pass:"password",
    mima:'',
    tip_fail:'aaaaaaaaa',
    tip_show:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },


  btn_phone:function(e){
    console.log(e)
    let phone = e.detail.value
    this.setData({
      phone: phone
    })

  },

  shanchu:function(){


    this.setData({
      phone: '',
      shanchu:false
    })
  },

  btn_mima:function(e){
    console.log(e)
    let mima = e.detail.value
    this.setData({
      mima: mima
    })
  },

  yingcang:function(){
    if (this.data.mima!=''){
      this.setData({
        pass: "text"
      })
    }

  },

  xianshi:function(){
    if (this.data.mima != '') {
    this.setData({
      pass: "password"
    })

    }
  },

  ps_login:function(){

    let _this=this
    let phone = this.data.phone
    let mima = this.data.mima
    let mimas = hmd5.hexMD5(mima)
    console.log(mimas)


    if (phone==''){
      this.setData({
        tip_fail: "请输入手机号",
        tip_show:true
      })
      return
    } else if (mima==''){
      this.setData({
        tip_fail: "请输入密码",
        tip_show: true
      })
      return
    }else{
      this.setData({
        tip_show: false
      })
    }

    console.log(mimas)
    console.log(phone)

    wx.request({
      url: api.star_root + 'vs1/user/login4ShopAdmin',
      method: 'POST',
      dataType: 'json',
      data: {
          password: mimas+'',
          username: phone+''
      
      },
      success: function (res) {
         console.log(res)
        if(res.data.code==400){
       
          _this.setData({
            tip_fail: res.data.message,
            tip_show: true
          })
        } else if (res.data.code == 200){
          let token = res.data.data.token
           wx.navigateTo({
             url: '../ps_list/ps_list?token=' + token,
           })
        }


      }
   
    })












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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})