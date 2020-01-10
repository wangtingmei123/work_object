const mtjwxsdk = require('./utils/mtj-wx-sdk.js');

// const WXBizDataCrypt = require('./utils/cryptojs/RdWXBizDataCrypt.js');
const api = require('utils/api.js')//引入可拼接的url

// function GetQueryString(name) {
//   var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
//   var r = window.location.search.substr(1).match(reg);//search,查询？后面的参数，并匹配正则
//   if (r != null) return unescape(r[2]); return null;
// }
App({



  onLaunch: function (e) {


    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    
    let that = this;
    wx.getSystemInfo({//  获取页面的有关信息
      success: function (res) {
        wx.setStorageSync('systemInfo', res)
        var ww = res.windowWidth;
        var hh = res.windowHeight;
        that.globalData.ww = ww;
        that.globalData.hh = hh;
      }
    });



    // 登录
    wx.login({
      success: function (res) {
        console.log("aaaaaaaaaa")
        // alert(GetQueryString("uid"));
        
        if (res.code) {
          console.log("000-code-0000")
          // console.log(res)
          console.log(e.path)
   
          console.log("000-code-0000")

          wx.request({
            url: 'https://api.test.bf-fresh.com/miniProgramLogin.do',
            data: {
              code: res.code
            },

            success: function (res) {

              console.log("111111111111111111")
              console.log(res)
              wx.setStorage({
                key: "uid",
                data: res.data.data.uid
              
              })

              wx.setStorage({
                key: "token",
                data: res.data.data.token
              })
              
              wx.setStorage({
                key: "openid",
                data: res.data.data.openid
              })
              
              wx.setStorage({
                key: "unionid",
                data: res.data.data.unionid
              })


              wx.setStorage({
                key: "session_key",
                data: res.data.data.session_key
              })

              wx.setStorage({
                key: "couponList",
                data: res.data.data.couponList
              })

       
              console.log(res.data.data)
            },

         globalData: {
           couponList: wx.getStorageSync("couponList")

            }, 
          })
        } else {
          console.log('获取用户登录态失败！' + res.errMsg)
        }
      }
    });

    
    const updateManager = wx.getUpdateManager();

    updateManager.onCheckForUpdate(function (res) {
      // 请求完新版本信息的回调
      console.log(res.hasUpdate)
    })

   updateManager.onUpdateReady(function () {
      wx.showModal({
        title: '更新提示',
        content: '新版本已经准备好，是否重启应用？',
        success: function (res) {
          if (res.confirm) {
            // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
            updateManager.applyUpdate()
          }
        }
      })
      
    })

    updateManager.onUpdateFailed(function () {
      // 新版本下载失败
    })

    wx.setEnableDebug({
      enableDebug: false
    })


  },
  bezier: function (pots, amount) {
    var pot;
    var lines;
    var ret = [];
    var points;
    for (var i = 0; i <= amount; i++) {
      points = pots.slice(0);
      lines = [];
      while (pot = points.shift()) {
        
        if (points.length) {
          lines.push(pointLine([pot, points[0]], i / amount));
        } else if (lines.length > 1) {
          points = lines;
          lines = [];
        } else {
          break;
        }
      }
      ret.push(lines[0]);
    }
    function pointLine(points, rate) {
      var pointA, pointB, pointDistance, xDistance, yDistance, tan, radian, tmpPointDistance;
      var ret = [];
      pointA = points[0];//点击
      pointB = points[1];//中间
      xDistance = pointB.x - pointA.x;
      yDistance = pointB.y - pointA.y;
      pointDistance = Math.pow(Math.pow(xDistance, 2) + Math.pow(yDistance, 2), 1 / 2);
      tan = yDistance / xDistance;
      radian = Math.atan(tan);
      tmpPointDistance = pointDistance * rate;
      ret = {
        x: pointA.x + tmpPointDistance * Math.cos(radian),
        y: pointA.y + tmpPointDistance * Math.sin(radian)
      };
      return ret;
    }
    return {
      'bezier_points': ret
    };
  },
  globalData: {
    userInfo: null,
    userphone:"",
    wstates:11
  },
})