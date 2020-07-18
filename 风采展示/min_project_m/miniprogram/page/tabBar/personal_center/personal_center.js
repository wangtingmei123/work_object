
var api = require("../../../utils/api.js");// pages/me/me.js
var Charts = require('../../../library/wxcharts.js');
var numRead = require("../../../library/myNumRead.js");
const W = wx.getSystemInfoSync().windowWidth;
const rate = 750.0 / W;


// 300rpx 在6s上为 150px
const code_w = 680 / rate;
const code_h = 300 / rate;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    code_w: code_w,
    code_h: code_h,
    ch_data:[5,5,5,5,5,5],
    dang:4,
    user:null,
    now_num:2,
    all_num:0,
    frist:false,
    week:0,
    name_week:'',
    max:15000,
    main_data:[],
    nums:[],
    data_time:[],
    is_prize:'',
    user_id:0,
  },

  to_login:function(){
    wx.navigateTo({
      url: '../../personal_center/pages/userinfo/userinfo?ftype=1',
    })
  },



  to_login_l:function(){
    wx.navigateTo({
      url: '../../personal_center/pages/loginBycode/loginBycode',
    })
  },
  to_luck: function () {
    wx.navigateTo({
      url: '../../activity_zone/pages/luck_draw1/luck_draw1',
    })
  },

  to_index:function(){


    wx.request({
      url: api.get_rundata,
      dataType: 'json',
      data: {
        user_id: wx.getStorageSync('user_id'),
        // sessionKey: encodeURIComponent(wx.getStorageSync('session_key')),
        // encryptedData: encodeURIComponent(res.encryptedData),
        // iv: encodeURIComponent(res.iv),
        is_encode : 1,
     
      },
      success: function (res) {
        // console.log('调用微信解密接口',res);
        console.log("pppp")

        wx.hideLoading()
        if (res.data.code == 200) {
        
          wx.setStorageSync('activity_id', res.data.data.activity_id);
          wx.setStorageSync('company_id', res.data.data.company_id);
          wx.setStorageSync('department_id', res.data.data.department_id);
          wx.setStorageSync('department_name', res.data.data.department_name);
        
        } else {
         
        }  
      }
    })



    wx.switchTab({
      url: '../activity_zone/activity_zone',
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */


  sports_tribe:function(){
    wx.navigateTo({
      url: '../../activity_zone/pages/user_detil/user_detil?user_id='+wx.getStorageSync('user_id'),
    })
  },
  luck_list:function(){
    wx.navigateTo({
      url: '../../activity_zone/pages/luck_list/luck_list',
    })
  },

  getSetting:function(){
    let that = this
    wx.getSetting({
      success: function (res) {
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: function (res) {
    
              that.setData({
                user: res.userInfo
              })
            }
          })
        }
      }
    })

  },



  onLoad: function (options) {




  },


 request:function(){
   let _this = this

   wx.request({
     url: api.personalCenter,
     dataType: 'json',
     data: {
       company_id: wx.getStorageSync('company_id'),
       user_id: wx.getStorageSync('user_id'),
       week: _this.data.week,
       activity_id: wx.getStorageSync('activity_id'),
     },
     success: function (res) {

      if(res.data.code==200){
        // if()
   

        _this.setData({
        
          is_prize: res.data.data[0].is_prize,


        })


      }else{
      
      }
      
     

     }

   })
 },



  //下拉刷新
  onPullDownRefresh: function () {
    // this.request()
    // // 隐藏导航栏加载框
    // setTimeout(function () {
    //   wx.hideNavigationBarLoading();
    //   wx.stopPullDownRefresh();
    // }, 1500)


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
    this.request()

    let _this = this
    if (wx.getStorageSync('user_id') == '' || wx.getStorageSync('user_id') == undefined) {
      _this.setData({
        user_id: 1
      })
    } else {
      _this.setData({
        user_id: 0
      })
    }


    _this.getSetting()


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