// pages/active_passage/active_passage.js
var api = require("../../../../utils/api.js");
const CryptoJS = require('../../../../library/aes_util.js');  //引用AES源码js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    activity:'',
    activity_con:'',
    active_but1:false,
    active_but2: false,
    active_but3: false,
    active_but4: false,
    active_but5:false,
    cover_logo:'',
    index_logo:'',
    act_lebgth:'',
    is_show:1,
    activity_id:'',
    current_step:0,
    is_standard:0,
    pize:false,
    to_app:false,
    act_id:25,  //中信的活动id
    actcs_id: 72,  //中信的测试活动id
    ghact_id: 26,     //工行的活动id
    ghactcs_id: 73,     //工行的测试活动id
    shanghcs_id: 76, //上海的测试活动id
    shangh_id: 79, //上海的活动id,
    hx_activity_id:'',
    tishi:false,
    getPrizeDetails:[],
    isIphoneX: (app.globalData.systemInfo.model.search('iPhone X') != -1|| app.globalData.systemInfo.model.search('iPhone11') != -1  || app.globalData.systemInfo.model.search('iPhone12') != -1 || app.globalData.systemInfo.model.search('iPhone13') != -1)? true : false

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中...',
    })


   let _this=this


  },

  //检查用户的鑫动账号登录



  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let _this=this
    _this.requestact()
    _this.is_praise()
  },



  is_praise:function(){
    let _this = this

    wx.request({
      url: api.ispraise,
      data: {
        activity_id: wx.getStorageSync('activity_id'),

      },
      dataType: 'json',
      success: function (res) {

        if(res.data.code==200){
          wx.setStorageSync('cancel_denied',res.data.data.cancel_denied)
        }

      }
    })
  },






  requestact:function(){
    let _this = this

    wx.request({
      url: api.activityInfo,
      data: {
        company_id: wx.getStorageSync('company_id'),
        activity_id: wx.getStorageSync('activity_id'),
        user_id: wx.getStorageSync('user_id'),

      },
      dataType: 'json',
      success: function (res) {
        wx.hideLoading()

        console.log(res)
        _this.setData({
          activity_con: res.data.data,

        })

        let fun=res.data.data.fun
        for (var i = 0; i < fun.length; i++) {
          
          if (fun[i] == '积分抽奖') {
           
            _this.setData({
              active_but5: true
            })
          }
        }
       
       

      }
    })
  },





  to_rules: function(){
    wx.navigateTo({
      url: '../active_rules/active_rules',
    })
  },


  to_tribe:function(){

    if(this.data.activity_con.circle_enabled==1){
      wx.navigateTo({
        url: '../tribal/tribal',
      })
    }else{
      wx.showModal({
        title: '提示',
        content: '发表动态时间未到哦',
        showCancel: false,
        success(res) {
          if (res.confirm) {
          }
        }
      })
    }

  },

  to_luck:function(){
    if(this.data.active_but5==true){
      wx.navigateTo({
        url: '../luck_draw1/luck_draw1',
      })
    }else{
      wx.showModal({
        title: '提示',
        content: '该活动不能抽奖哦',
        showCancel: false,
        success(res) {
          if (res.confirm) {
          }
        }
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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


  to_video:function(){
    wx.navigateTo({
      url: '../active_video/active_video',
    })
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    wx.showNavigationBarLoading();
    let _this=this
    _this.requestact()
    _this.is_praise()
    setTimeout(function () {
      wx.hideNavigationBarLoading();
      wx.stopPullDownRefresh();
    }, 1500)

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

  },
  launchAppError:function(e){
    console.log(e)
  }

})