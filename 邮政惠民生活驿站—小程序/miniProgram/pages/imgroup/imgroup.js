const api = require('../../utils/api.js')//引入可拼接的url
var interval = null;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    detail:null,
    time:"",
    info:'',
    status:'',
    grouplenm:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("参团ID"+JSON.stringify(options))
    let tgid = options.tgid;

    wx.showToast({
      title: '努力加载中~',
      icon: 'loading',
      duration: 100000//loading时间
    });

    var _this = this

    wx.getNetworkType({
      success: function (res) {
        if (res.networkType == 'none') {
          _this.setData({
            nonet: true,
            load: true,
          })
          wx.hideToast();
        }
      }
    })

    this.setData({
      info: options.tgid
    })
    this.showTgG(tgid)




    if (options.uid) {
      // 转发存储unionid
      let uid_s = options.uid
      wx.setStorageSync("uid_s", uid_s);
      // 绑定推广人
      let token = wx.getStorageSync('token')
      api.qued1(token, uid_s)
      
    }




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
    console.log("页面卸载")
    clearInterval(interval);
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
  onShareAppMessage: function (res) {
    let gbid = this.data.info
    console.log("++++++++=")
    console.log(gbid)
    return {
      title: '邀请好友来参团',
      path: 'pages/imgroup/imgroup?tgid=' + gbid
    }
  },


  showTgG:function(tgid){
    let _this =this;
    console.log("邀请好友参团ID"+tgid)
    wx.request({
      url: api.root + 'groupBuying/shareGroupDetail',
      method: 'POST',
      dataType: 'json',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: {
        "orderId": tgid,
      },
      success: function (res) {
        console.log("邀请好友参团" + JSON.stringify(res.data))
        _this.setData({
          detail: res.data.data,
          status:res.data.data.status
        })
        let gtime = res.data.data.endTime;
        _this.orderlife(gtime)



        let grouplength = parseInt(res.data.data.limitNum) - res.data.data.ycGroupBuyUserList.length
        var grouplen=[]
        for (var i = 0; i < grouplength;i++){
          console.log("PPPP"+i)
          grouplen.push(i)
        }

        _this.setData({
          grouplenm: grouplen
        })

        console.log("++++++++++++___________")
        console.log(res.data.data.limitNum)
        console.log(parseInt(res.data.data.limitNum))
        console.log(grouplength)
        console.log(grouplen)

        console.log(_this.data.grouplenm)
        console.log(_this.data.grouplenm.length)

        wx.hideToast();


      }
    })
  },
  orderlife: function (ordertime) {
    var hdtimemm = new Date(ordertime).getTime() / 1000;
    console.log("当前时间" + Date.parse(new Date()) + "结束时间" + hdtimemm);
    var totalSecond = hdtimemm - (Date.parse(new Date())) / 1000

    interval = setInterval(function () {
      // 秒数
      var second = totalSecond;
      // 天数位
      var day = Math.floor(second / 3600 / 24);
      var dayStr = day.toString();
      if (dayStr.length == 1) dayStr = '0' + dayStr;
      // 小时位
      var hr = Math.floor((second - day * 3600 * 24) / 3600);
      var hrStr = hr.toString();
      if (hrStr.length == 1) hrStr = '0' + hrStr;
      // 分钟位
      var min = Math.floor((second - day * 3600 * 24 - hr * 3600) / 60);
      var minStr = min.toString();
      if (minStr.length == 1) minStr = '0' + minStr;
      // 秒位
      var sec = second - day * 3600 * 24 - hr * 3600 - min * 60;
      var secStr = sec.toString();
      if (secStr.length == 1) secStr = '0' + secStr;
      var orderPayTime = dayStr + "天" + hrStr + "小时" + minStr + "分" + secStr + "秒"
      this.setData({
        time: orderPayTime,

      });
      totalSecond--;
      if (totalSecond < 0) {
        clearInterval(interval);
        this.setData({
          orderPayTime: '拼团已经'
        });
      }
    }.bind(this), 1000);
  },
  Lpt:function(even){
    let _this = this;
    let wid = _this.data.detail.wid;
    wx.setStorageSync("wid", wid)
    wx.getSetting({
      success: function (res) {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success: function (res) {
              let id = _this.data.detail.gbSkuId;
              let groupId = _this.data.detail.gbid;
              let uid = wx.getStorageSync("uid");
              console.log("uid" + JSON.stringify(even.currentTarget.dataset.info))
              let t = 0
              console.log("uid" + uid + 'wid' + wid + "tgid" + id + "groupId" + groupId)
              wx.navigateTo({
                url: '../order_group_confirm/order_group_confirm?toid=' + id + '&t=' + t + "&groupId=" + groupId
              })    
            }
          })
        } else {
          wx.navigateTo({
            url: '../phone/phone?site=5&info='+_this.data.info
          })
        }
      }
    })
  },


  groupList:function(even){
    let wid = this.data.detail.wid;
    wx.setStorageSync("wid", wid)
    wx.switchTab({
      url: '../group/group?wid='+wid,
    })
  }
})