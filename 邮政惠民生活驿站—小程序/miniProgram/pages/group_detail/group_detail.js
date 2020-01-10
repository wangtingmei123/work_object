const api = require('../../utils/api.js')//引入可拼接的url
const datetimepicker = require('../../utils/dateTimePicker.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    flag:0,
    imgUrls: [],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 500,
    circular: true,
    swiperCurrent:0,

    countDownDay: 0,
    countDownHour: 0,
    countDownMinute: 0,
    countDownSecond: 0,
    countDownDay1: 0,
    countDownHour1: 0,
    countDownMinute1: 0,
    countDownSecond1: 0,
    remain:'00:00:00',
    tg:null,
    group:[],
    tg_group:null,
    group_c:null,
    tgid:'',
    groupshow:true,
    activeend:true,
    activemm:'',
    actasend:false,
    nonet: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _this = this;

  

    wx.showToast({
      title: '努力加载中~',
      icon: 'loading',
      duration: 100000//loading时间
    });

    wx.getNetworkType({
      success: function (res) {
        if (res.networkType == 'none') {
          _this.setData({
            nonet: true,
          })
          wx.hideToast();
        }
      }
    })



    if (options.uid) {
      // 转发存储unionid
      let uid_s = options.uid
      wx.setStorageSync("uid_s", uid_s);
      // 绑定推广人
      let token = wx.getStorageSync('token')
      api.qued1(token, uid_s)
    }



    console.log("aaaaaaaaaaaaaaa")
    console.log(options.wid)
    
    if (options.wid != undefined) {
      wx.setStorageSync("wid", options.wid)
    }

    let tgid = options.tgid;
   console.log("qqqqqqqqqqqqqqqq")
    console.log(tgid)

    this.setData({
      tgid: tgid
    })
    this.getdetail(tgid)
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
    clearInterval(this.interval);
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    clearInterval(this.interval);
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    clearInterval(this.interval);
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
    let _this = this
    let sku_id=_this.data.tg.sku_id
    let wid = wx.getStorageSync("wid");
    let uid = wx.getStorageSync("uid");
    return {
      imageUrl: 'https://static.bf-fresh.com/img/index/share' + sku_id+'.png',
      path: 'pages/group_detail/group_detail?tgid=' + _this.data.tgid + '&wid=' + wid + '&uid=' + uid,
      // imageUrl: '../img/index/aaaa.jpg',
      success: function (res) {
        // 转发成功
        wx.showToast({
          title: "转发成功",
          icon: 'success',
          duration: 2000
        })
      },
      fail: function (res) {
        // 转发失败
      },

    }
  },
  //查看详情
  getdetail:function(tgid){
    let _this = this;
    let uid = wx.getStorageSync("uid");
    let wid = wx.getStorageSync("wid")
    console.log("uid"+uid+'wid'+wid+"tgid"+tgid)
    wx.request({
      url: api.root + 'groupBuying/groupGoodsDetail',
      method: 'POST',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: {
        "id": tgid,
        "wid": 666,
        "userId": uid,
        "mid": 1
      },
      success: function (res) {
        console.log(res.data)
        _this.setData({
          tg:res.data,
          imgUrls: JSON.parse(res.data.imgData)[0].t,
        })


        if (res.data.groupList!=null){
          _this.setData({
            group: res.data.groupList.groupList
          })
          for (var index in res.data.groupList.groupList) {//新加默认时间
            res.data.groupList.groupList[index].remainTime = "00:00:00";
          }
        }else{
          _this.setData({
            groupshow:false
          })
        }
        let countdown = res.data.countdown;
        console.log("+++++++++++")
        console.log(res.data.countdown)
        console.log(countdown)

        
        if (res.data.isLastSale==0){
          _this.activity(res.data.countdown,"活动已结束")
        
        } else if (res.data.isLastSale == 1){
          _this.activity(res.data.countdown, "活动已开始")
        }

    

        _this.setData({
          countDownDay: '00',
        });
        _this.formatdata(_this.data.group);
      }
    })
  },
  //购买拼团商品
  toOrderConfirm:function(even) {
    let _this = this;
    wx.getSetting({
      success: function (res) {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success: function (res) {
              let id = even.currentTarget.dataset.info.id;
              let t = even.currentTarget.dataset.type
              console.log( "tgid" + id + "t" + t)
              wx.navigateTo({
                url: '../order_group_confirm/order_group_confirm?toid='+ id+'&t='+t
              })
            }
          })
        } else {
           wx.navigateTo({
            url: '../phone/phone?site=2&info='+_this.data.tgid
          })
        }
      }
    })
  },
  //参与已成团的团购
  toOrderGroupConfirm: function (even) {
    let _this = this;
    wx.getSetting({
      success: function (res) {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success: function (res) {
              console.log(res.userInfo)
              let id = _this.data.tg.id;
              let groupId = even.currentTarget.dataset.info.id;
              console.log("tgid" + id + "groupId" + groupId)
              let t = 0
              wx.navigateTo({
                url: '../order_group_confirm/order_group_confirm?toid=' + id + '&t=' + t + "&groupId=" + groupId
              })     
            }
          })
        } else {
          wx.navigateTo({
            url: '../phone/phone?site=2&info='+_this.data.tgid
          })
        }
      }
    })
  }, 
  useractivity: function () {
    let _this = this;
    let group = _this.data.group;
    for (var i = 0; i < group.length; i++) {
      let second = group[i].lastTime;
      // console.log(second);
      // 天数位
      var day = Math.floor(second / 3600 / 24);
      var dayStr = day.toString();
      console.log(datetimepicker.secondsToTime(second));
      if (dayStr.length == 1) dayStr = '0' + dayStr;
      // 小时位
      var hr = Math.floor((second - day * 3600 * 24) / 3600);
      var hrStr = hr.toString();
      hrStr = datetimepicker.secondsToTime(second).h+"";
      if (hrStr.length == 1) hrStr = '0' + hrStr;
      // 分钟位
      var min = Math.floor((second - day * 3600 * 24 - hr * 3600) / 60);
      var minStr = min.toString();
      minStr = datetimepicker.secondsToTime(second).m;
      console.log(minStr.length);
      if (minStr.length == 1) minStr = '0' + minStr;
      // 秒位
      var sec = second - day * 3600 * 24 - hr * 3600 - min * 60;
      var secStr = sec.toString();
      secStr = datetimepicker.secondsToTime(second).s;
      if (secStr.length == 1) secStr = '0' + secStr;
      let remain = hrStr + ":" + minStr + ":" + secStr
      console.log("倒计时" + remain + "当前数组位置" + i)
      _this.data.group[i].remainTime = remain
      second --;
    if (second < 0) {
        clearInterval(interval1);
        this.setData({
          remain: '00:00:00'
        });
      }
    }
    this.setData({
      group: group,
    }); 
  },

  time:function(){
    this.interval = setInterval(this.useractivity, 1000);
  },
 
 
  activity: function (hdtimemm,hdtip){
    console.log("当前时间" + Date.parse(new Date()) + "结束时间" + hdtimemm);
    var totalSecond = hdtimemm
    var interval = setInterval(function () {
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

      this.setData({
        countDownDay: dayStr,
        countDownHour: hrStr,
        countDownMinute: minStr,
        countDownSecond: secStr,
      });
      totalSecond--;
 
      if (totalSecond < 0) {
        clearInterval(interval);
        this.setData({
          countDownDay: '00',
          countDownHour: '00',
          countDownMinute: '00',
          countDownSecond: '00',
        });
        if (this.data.activemm == 0) {
          this.setData({
            activeend: false,
          });

          wx.hideToast();


        }

      }

      this.setData({
        actasend: true
      })

      wx.hideToast();
    }.bind(this), 1000);
  },
  show: function (even){
    let _this = this;
    let g = even.currentTarget.dataset.info.id;
    console.log("拼团组的ID"+g)
    wx.request({
      url: api.root + 'groupBuying/waitGroup',
      method: 'POST',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: {
        "id":g+""
      },
      success: function (res) {
        console.log(res.data)
        _this.setData({
          tg_group:res.data.data,
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
  groupJoinDetail() {
    wx.navigateTo({
      url: '../groupJoin_detail/groupJoin_detail',
    })
  },
  groupList:function(even) {
    let id = even.currentTarget.dataset.info.id;
    wx.navigateTo({
      url: '../group_list/group_list?gid='+id,
    })
  },
  Toindex () {
    wx.switchTab({
      url: '../index/index',
    })
  },

  swiperChange: function (e) {
    let g = this.data.group[e.detail.current]
  },
  formatdata: function (res) {
    let _this = this;
    setTimeout(function () {//递归计算时间
      for (var index in res) {
        res[index].lastTime = (res[index].lastTime/1000-1)*1000;
        if (res[index].lastTime >= 0) {
          var endtime = _this.leftTimer(res[index].lastTime);
          res[index].remainTime = endtime.hours + ":" + endtime.minutes + ":" + endtime.seconds;
        }
      }

      _this.setData({
        group: res
      });
      _this.formatdata(res);
    }, 1000) //延迟时间 这里是1秒
  },
  leftTimer: function (timeout) {//倒计时
    var leftTime = timeout;

    var hours = parseInt(leftTime / 1000 / 60 / 60 % 24, 10);
     //计算剩余的小时 
    var minutes = parseInt(leftTime / 1000 / 60 % 60, 10);
    //计算剩余的分钟 
    var seconds = parseInt(leftTime / 1000 % 60, 10);
    //计算剩余的秒数 
    hours = this.checkTime(hours);
    minutes = this.checkTime(minutes);
    seconds = this.checkTime(seconds);
    return {
      hours: hours,
      minutes: minutes,
      seconds: seconds
    }
  }, checkTime: function (i) {//时分秒如果为一位数补零
    if (i < 10) {
      i = "0" + i;
    }
    return i;
  },
  jiazai: function () {
    wx.reLaunch({
      url: '../group/group',
    })
  }
})