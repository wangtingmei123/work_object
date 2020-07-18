// page/activity_zone//pages/active_video/active_video.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    video_con:[]

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _this=this

    wx.request({
      url: 'https://club.xindongguoji.com/api/courses/1/terms',
      header:{
        'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9hcGkuY2x1Yi54aW5kb25nZ3VvamkuY29tXC9cL2F1dGhvcml6YXRpb25zXC9yZWZyZXNoIiwiaWF0IjoxNTk0MjAyODQzLCJleHAiOjE1OTU0MTI0NDUsIm5iZiI6MTU5NDIwMjg0NSwianRpIjoiVGlrcW5KOGtaNU52bVQ5biIsInN1YiI6MiwicHJ2IjoiMjNiZDVjODk0OWY2MDBhZGIzOWU3MDFjNDAwODcyZGI3YTU5NzZmNyJ9.o3TlarvbE5h65z5IN3rIia-KL5213xzTB0-etTKw8jw'
      },
      data:{
    
      },
      success:function(res){
        _this.setData({
          video_con: res.data.data[0].videos,

        })

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