
const app=getApp()
Page({

  web_url: "",
  data: {
    banner_url: '',
      url: '',
      web_src: '',
      nonet:false,
      uid:'',
      wid:'',
      carnum:''

  },
  onLoad: function (options) {

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


    console.log(options)
    this.setData({
      banner_url: options.banner_url,
      uid: options.uid,
      wid: options.wid,
      carnum: options.carnum
    });
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
  onShareAppMessage: function (options) {
    var rand = Math.floor(Math.random () * 9000);
    var that = this;
    let uid = wx.getStorageSync("uid");
    wx.showShareMenu({
      withShareTicket: true
    })
    var return_url =options.webViewUrl
    console.log("__________")
    console.log(return_url)
    var path = 'pages/action/action?banner_url=' + return_url + '&uid=' + that.data.uid + '&wid=' + that.data.wid + '&carnum=' + that.data.carnum
    return {
      title: '赶快点击领取红包',
      imageUrl: 'https://static.bf-fresh.com/img/index/fenxianga2.png?' + rand,
      path: 'pages/index/index?uid=' + uid,
      success: function (res) {
        that.web_url = return_url
        // 转发成功
        wx.showToast({
          title: "转发成功",
          icon: 'success',
   
          duration: 2000
        })

        // that.setData({
        //   banner_url: return_url     //再次赋值分享内嵌网页的路径
        // })
        
      },
      fail: function (res) {
        // 转发失败
      },

    }


  },

  jiazai: function () {
    wx.reLaunch({
      url: '../index/index',
    })
  }
})