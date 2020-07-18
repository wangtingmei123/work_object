const api = require('../../../../utils/api.js')//引入可拼接的url

Page({
  data: {
    encryptedData: '',
    iv: '',
    site: '',
    info: '',
    radio_show: false,
    ftype:''
  },
  onLoad: function (options) {
    console.log(options.ftype)

    if (options.ftype){
      this.setData({
        ftype: options.ftype

      })
    }
    
  },

  to_radio:function(){
    this.setData({
      radio_show : !this.data.radio_show

    })

  },

  to_active_passage:function(){
      wx.switchTab({
        url: '../../../tabBar/activity_zone/activity_zone',
      })

  },


  bindGetUserInfo: function (e) {
    console.log(e)
    let _this=this
    if (e.detail.errMsg == "getUserInfo:ok"){
      wx.request({
        url: api.getWeiHeader,
        dataType: 'json',
        data: {
          user_id: wx.getStorageSync('user_id'),
          openid: wx.getStorageSync('openid'),
          head_img: e.detail.userInfo.avatarUrl,
          wei_name: e.detail.userInfo.nickName
        },
        success: function (res) {


            if (_this.data.ftype==1){
              wx.switchTab({
                  url: '../../../tabBar/personal_center/personal_center',
                })
            }else{

              var app = getApp()
              if(app.globalData.page_login==true){
                wx.redirectTo({
                  url: '../../../activity_zone/pages/tribe_detil/tribe_detil?tap_show=all&&id='+wx.getStorageSync('article_id'),
                })
              }else{
                wx.switchTab({
                  url: '../../../tabBar/activity_zone/activity_zone',
                })
              }
               
            }
        }
   
      })


    }else{


      if (_this.data.ftype == 1) {
        return
       
      } else {
       
        var app = getApp()
        if(app.globalData.page_login==true){
          wx.redirectTo({
            url: '../../../activity_zone/pages/tribe_detil/tribe_detil?tap_show=all&&id='+wx.getStorageSync('article_id'),
          })
        }else{
          wx.switchTab({
            url: '../../../tabBar/activity_zone/activity_zone',
          })
        }
      }

  


  }



}

})

