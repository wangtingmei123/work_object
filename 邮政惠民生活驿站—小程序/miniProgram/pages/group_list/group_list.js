const api = require('../../utils/api.js')//引入可拼接的url
var dateTimePicker = require('../../utils/dateTimePicker.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    flag:0,
    groupList:[],
    tgid:'',
    tg_group: null,
    group_c:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      tgid: options.gid
    })
    this.getGroupList(options.gid)
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
  
  },
  //获取拼团活动团购列表
  getGroupList:function(gid){
    let _this = this;
    let uid = wx.getStorageSync("uid");
    let wid = wx.getStorageSync("wid")
    //console.log("uid" + uid + 'wid' + wid + "tgid" + gid)
    wx.request({
      url: api.root + 'groupBuying/groupUser',
      method: 'POST',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: {
        "id": gid,
      },
      success: function (res) {
        console.log(res.data)
        for (var index in res.data.data) {
          res.data.data[index].days = "00";
          res.data.data[index].hours = "00";
          res.data.data[index].minutes = "00";
          res.data.data[index].seconds = "00";
        }
        _this.setData({
          groupList: res.data.data
        });
        _this.formatdata(_this.data.groupList);
      }
    })

   
  },
  //参与已成团的团购
  toOrderGroupConfirm: function (even) {
    let _this = this;
    //console.log(JSON.stringify(even))
    wx.getSetting({
      success: function (res) {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success: function (res) {
              //console.log(res.userInfo)
              let uid = wx.getStorageSync("uid");
              let wid = wx.getStorageSync("wid")

              //console.log("uid" + JSON.stringify(even.currentTarget.dataset.info))
              let id = _this.data.tgid;
              let groupId = even.currentTarget.dataset.info.gbid;
              let t = 0
              wx.navigateTo({
                url: '../order_group_confirm/order_group_confirm?toid=' + id + '&t=' + t + "&groupId=" + groupId
              })     
            }
          })
        } else {
          wx.navigateTo({
            url: '../phone/phone'
          })
        }
      }
    })
  },
  show: function (even) {
    let _this = this;
    //console.log("查看订单" +JSON.stringify(even.currentTarget.dataset.info))
    let g = even.currentTarget.dataset.info.gbid;
    //console.log("拼团组的ID" + g)
    wx.request({
      url: api.root + 'groupBuying/waitGroup',
      method: 'POST',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: {
        "id": g + ""
      },
      success: function (res) {
        //console.log(res.data)
        _this.setData({
          tg_group: res.data.data,
          hasMask: true,
          group_c: even.currentTarget.dataset.info
        })
      }
    })
  },
  hid: function () {
    this.setData({
      hasMask: false
    })
  }, 
  formatdata: function (res){
    let _this = this;
    var d = Date.parse(new Date());//获得当前市价戳
    // var days = parseInt(new Date() / 1000 / 60 / 60 / 24, 10); //计算剩余的天数 
    // 开始时间戳减去当前时间戳调用leftTimer计算数据
      setTimeout(function () {//递归计算时间
        for (var index in res) {
          var minus = res[index].endTime - d;
          if (minus>=0){
            var endtime = _this.leftTimer(minus);
            res[index].days = endtime.days;
            res[index].hours = endtime.hours;
            res[index].minutes = endtime.minutes;
            res[index].seconds = endtime.seconds;
          }
        }
        _this.formatdata(res);
        _this.setData({//计算完时间赋值
          groupList: res
        })
      }, 1000) //延迟时间 这里是1秒

  },
  leftTimer:function(timeout){//倒计时
      //var leftTime = (new Date(year, month - 1, day, hour, minute, second)) - (new Date()); //计算剩余的毫秒数 
    var leftTime = timeout;

      var days = parseInt(leftTime / 1000 / 60 / 60 / 24, 10); //计算剩余的天数 
      var hours = parseInt(leftTime / 1000 / 60 / 60 % 24, 10); //计算剩余的小时 
      var minutes = parseInt(leftTime / 1000 / 60 % 60, 10);//计算剩余的分钟 
      var seconds = parseInt(leftTime / 1000 % 60, 10);//计算剩余的秒数 

      days = this.checkTime(days);
      hours = this.checkTime(hours);
      minutes = this.checkTime(minutes);
      seconds = this.checkTime(seconds); 
      return {
        days: days,
        hours: hours,
        minutes: minutes,
        seconds: seconds
      }
  },checkTime:function(i){//时分秒如果为一位数补零
    if (i < 10) {
      i = "0" + i;
    }
    return i;
  }
})