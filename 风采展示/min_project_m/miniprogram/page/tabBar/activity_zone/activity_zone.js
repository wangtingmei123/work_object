//index.js
//获取应用实例
var api = require("../../../utils/api.js");

Page({
  data: {
    // activity_id: 11,
    activity_id: wx.getStorageSync('activity_id'),
    user_id: wx.getStorageSync('user_id'),
    rank:[],

  },
  //事件处理函数
  bindViewTap: function() {
    
  },

  onLoad: function () {
    // app.editTabbar();
    wx.showLoading({
      title: '加载中...',
    })

  },

  onShow : function () {

    let _this = this



    var user_id = wx.getStorageSync('user_id');
    if (!user_id || user_id == '' || user_id == 'undefined' || user_id == undefined) {
      wx.redirectTo({
        url: '../../personal_center/pages/loginBycode/loginBycode',
      })

      return false;
    }
    wx.request({
      url: api.get_rundata,
      dataType: 'json',
      data: {
        user_id: wx.getStorageSync('user_id'),
        is_encode : 1,
     
      },
      success: function (res) {

        if (res.data.code == 200) {
          wx.hideLoading()

          if(wx.getStorageSync('company_id'!=res.data.data.company_id)){
            wx.setStorageSync('company_id',res.data.data.company_id)
          }


            wx.request({
              url: api.rank_list,
              dataType: 'json',
              data: {
                user_id: wx.getStorageSync('user_id'),
                company_id: wx.getStorageSync('company_id')
              },
              success: function (res) {
                wx.hideLoading()

                if(res.data.data.length<=1){
                  wx.redirectTo({
                   url: '../../activity_zone/pages/active_passage/active_passage',
                })
                }else{
                  _this.setData({
                    rank: res.data.data
                  })
                }
        
              },
              fail: function (res) { },
            })
            
        
       
       
        } 
      }
    })


    
  },





  toIcbcACtivityPage: function (e) {
    let _this=this

    |torageSync('activity_id', e.currentTarget.dataset.info.activity_id);
    wx.setStorageSync('company_id', e.currentTarget.dataset.info.company_id);

    wx.navigateTo({
      url: '../../activity_zone/pages/active_passage/active_passage',
    })
  },


    /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

    let _this=this

    wx.showNavigationBarLoading();



   wx.request({
      url: api.rank_list,
      dataType: 'json',
      data: {
        user_id: wx.getStorageSync('user_id'),
        company_id: wx.getStorageSync('company_id')
      },
      success: function (res) {

       
          _this.setData({
            rank: res.data.data
          })
      

      },
      fail: function (res) { },
    })

    setTimeout(function () {
      wx.hideNavigationBarLoading();
      wx.stopPullDownRefresh();
    }, 1500)
  },



})
