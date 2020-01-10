// pages/ps_list/ps_list.js

const api = require('../../utils/api.js')//引入可拼接的url
const hmd5 = require('../../utils/md5.js')//引入可拼接的url
Page({

  /**
   * 页面的初始数据
   */
  data: {
    _state:1,
    ps_listInfo:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _this = this
    let token = options.token
    setTimeout(function () {
      _this.ps_list(token)
    }, 1000) 
  },

  ps_list: function (token){

    let _this=this
  console.log("ppppppppppppp")
  console.log(token)

  wx.request({
    url: api.star_root + 'vs1/orderTransport/listByUid',
    method: 'POST',
    dataType: 'json',
    header: { 'token': token + '' },
    data: {
       state: "0",
        sid: "",
        pageNum: "1",
        pageSize: "20"

    },

    success:function(res){
    
     _this.setData({
       ps_listInfo:res.data.data
     })
      console.log(res)
    }


  })

},

  gengduo: function (even){

  let skuList = even.currentTarget.dataset.info;
  
},





  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },




  chage_state:function(e){
     console.log(e)
    let state = e.currentTarget.dataset.num
     this.setData({
       _state: state
     })
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