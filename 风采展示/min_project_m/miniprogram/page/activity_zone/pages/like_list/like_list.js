// pages/like_list/like_list.js
var api = require("../../../../utils/api.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    like_list:[],
    article_id:'',
    page_index:1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _this=this
    let article_id = options.article_id
   _this.setData({
     article_id: article_id
   })

    _this.getPraiseDetails()
  },


  getPraiseDetails:function(){
    let _this=this
    if (_this.data.page_is_end == true) {
      return
    }
    wx.request({
      url: api.getPraiseDetails,
      dataType: 'json',
      data: {
        article_id: _this.data.article_id,
        company_id:wx.getStorageSync('company_id'),

        page_index: _this.data.page_index
      },
      success: function (res) {

        //根据页码做排重
        if (res.data.data[0].page_index + 1 == _this.data.page_index) {
          return false;
        }

        if (res.data.data[0].praise.length>=0){
          let like_list = _this.data.like_list
          let like_list2=res.data.data[0].praise
          like_list.push(...like_list2)
          _this.setData({
            like_list: like_list,
            page_index: _this.data.page_index+1,
            page_is_end: res.data.data[0].praise.length < res.data.data[0].page_size ? true : false
  
          })
        }

        console.log()

        
      }
    })
  },

  user_detil:function(e){
    let user_id=e.currentTarget.dataset.info;
    wx.navigateTo({
      url: '../user_detil/user_detil?user_id='+user_id,
    })
  },
  /**
 * 页面上拉触底事件的处理函数
 */
  onReachBottom: function () {
    this.getPraiseDetails()
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
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})