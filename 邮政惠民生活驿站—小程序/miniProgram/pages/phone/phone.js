Page({
  data: {
    site:'',
    info:''
  },
  onLoad: function (options) {
    console.log("获取手机号site"+JSON.stringify(options))
    this.setData({
      site: options.site,
      info:options.info
    })
  },

  getPhoneNumber: function (e) {
    let _this = this;
    console.log(e.detail)

    //  if  (e.detail.errMsg  ==  'getPhoneNumber:fail user deny') {
    //         wx.showModal({
    //           title: '提示',
    //           showCancel: false,
    //           content: '同意授权',
    //           success: function (res) { }
    //         })
    //     }  else  {

    //         wx.showModal({
    //           title: '提示',
    //           showCancel: false,
    //           content: '未授权',
    //           success: function (res) { }
    //         })

    //         return
    //      
    //     }
      
    let encryptedData = e.detail.encryptedData;
    let iv = e.detail.iv;
    wx.redirectTo({
      url: '../login/login?encryptedData=' + encryptedData + "&iv=" + iv + "&site=" + _this.data.site + "&info=" + _this.data.info
    })

    // if (e.detail.errMsg.indexOf("ok")){

    // }else{
    //   //TODO提示层
    // }
  } ,
})