// pages/seccess/seccess.js
const api = require('../../utils/api.js')//引入可拼接的url
Page({

  /**
   * 页面的初始数据
   */
  data: {

    toid:"",
    order:null,
    tempFilePaths:[],
    reason_num:1,
    describe:'',
    widths:"",
    bili:'0',
    tuikuan:0.00,
    item:[],
    sku_detail:'',
    index:'',
    orderm:'',
    reasons:'',
    imgs:[],
    sku_count:'',
    actual_price:''

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("详情页面" + options.sku_id)




    let index = parseInt(options.index)
    let sku_count = options.sku_count
    console.log(index)
    this.setData({
      toid: options.toid,
      index: index,
      sku_count: sku_count
    })



    this.orderDetail(options.toid);
    this.reasons()


    // this.orderDetail(options.oid);
  },



//获取退款理由
  reasons:function(){
  let _this=this
   wx.request({
     url: api.root + '/va1/refund/reasons',
     method: 'POST',
     dataType: 'json',
     data: {
      
     },
     success: function (res) {
     console.log("0000000000000")
       console.log(res.data)
    

       let reasonsm = res.data.data.reasons

       for (var i = 0; i < reasonsm.length;i++){
         reasonsm[i].flag=false
         
       }

      _this.setData({
        reasons: reasonsm,
 
       })
       console.log(_this.data.reasons)


     }
   })


 },



// 商品详情
  orderDetail: function (toid) {
    let uid = wx.getStorageSync('uid')
    let _this = this;
    wx.request({
      url: api.root + 'v1/order/order.detail.get',
      method: 'POST',
      dataType: 'json',
      data: {
        "data": {
          "order_id": toid + "",
          "user_id": uid + ""
        }
      },
      success: function (res) {
        let index = _this.data.index
        let actual_price =0

        if (res.data.data.order_type > 8120){
          actual_price = res.data.data.order_money
        } else if (res.data.data.order_type < 8121){
          actual_price = res.data.data.sku_list[index].actual_price * res.data.data.sku_list[index].sku_count
          actual_price = actual_price.toFixed(2)
        }

        _this.setData({
          order: res.data.data,
          orderm: res.data.data.sku_list[index],
          actual_price: actual_price
        })

      let order=_this.data.order
        // for (let i = 0; i < order.length;i++){
        //   if (i == index){
        //     _this.setData({
        //       orderm: order.sku_list[i]
        //     })
        //   }
        // }
      console.log("ppppp")
        console.log(_this.data.order)
        console.log(_this.data.orderm)

        // if (res.data.data.order_status >= 2) {
        //   let consume = "consume" + "_" + uid + "_" + res.data.data.order_id
        //   _this.code(consume)
        // }
      }
    })
  },






  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  //订单详情
  // orderDetail: function (toid) {
  //   let uid = wx.getStorageSync('uid')
  //   let _this = this;
  //   wx.request({
  //     url: api.root + 'v1/order/order.detail.get',
  //     method: 'POST',
  //     dataType: 'json',
  //     data: {
  //       "data": {
  //         "order_id": toid + "",
  //         "user_id": uid + ""
  //       }
  //     },
  //     success: function (res) {
  //       _this.setData({
  //         order: res.data.data
  //       })
  //       console.log("订单详情" + res.data.data)
  //     }
  //   })
  // },

// 选择退货理由
  reason:function(e){
    let _this=this
    console.log(e.target.dataset.num)
    let num = e.target.dataset.num-1
    let reasonas = _this.data.reasons

    
      if (reasonas[num].flag==false){
        reasonas[num].flag = true
      } else if (reasonas[num].flag == true){
        reasonas[num].flag = false
    }



    this.setData({
      reasons: reasonas,
    })

    console.log(_this.data.reasons)
  },

//商品问题描述
  describe:function(e){
    console.log(e.detail.value)
    this.setData({
      describe: e.detail.value,
    })
  },

//上传图片
  chooseimg:function(){
    let _this = this;
    let len=0;
    if (_this.data.tempFilePaths!=null){
      len = _this.data.tempFilePaths.length;
    }
    wx.chooseImage({
      count: 3-len, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths
        let tempFilePathsimg = _this.data.tempFilePaths
        var tempFilePathsimgs=tempFilePathsimg.concat(tempFilePaths)
        _this.setData({
          tempFilePaths: tempFilePathsimgs
        })

        // console.log(tempFilePathsimgs)

      var imgs=[]
        let tems = _this.data.tempFilePaths
        console.log("+++++++++++++")
        wx.showToast({
          title: '正在上传...',
          icon: 'loading',
          mask: true,
          duration: 2000
        })  
        var uploadImgCount = 0;
        for (let i = 0; i < tems .length; i++) {
          var key = Math.random().toString(36).substr(2); 
          console.log(i)



          wx.uploadFile({
            url: api.root + '/va1/file/upload',
            filePath: tems[i]+'',
            name: 'files',
            formData: {
              'key': "1",//这里是为文件设置上传后的文件名
            }, 
            header: {
              "Content-Type": "multipart/form-data"
            },


            success: function (res) {
              // console.log(res)
              uploadImgCount++; 
              let urls = res.data
              // let leturls = eval('(' + res.data.data + ')');
              // let leturls = urls.parseJSON()
              // let leturls= eval('(' + urls + ')');
              let leturls = JSON.parse(urls);
       
  
              let img = leturls.data.urls[0]

              console.log(img)
              var cc = {};
              cc.img = img.url;
   

              imgs.push(cc)

              _this.setData({
                imgs: imgs
              })
              if (uploadImgCount == tems.length) {
                wx.hideToast();
              }
              console.log(_this.data.imgs)

            },


              fail: function (res) {  
            wx.hideToast();  
            wx.showModal({  
              title: '错误提示',  
              content: '上传图片失败',  
              showCancel: false,  
              success: function (res) { }  
            })  
          } 
       
        })



        }
      }
    })
  },



//滑动进度
  viewTouchMove: function (e) {
    let jine = e.currentTarget.dataset.info
    console.log(jine)
    console.log(e.touches[0].clientX * 2)
    let widths = e.touches[0].clientX*2-32
    if (widths>=646){
      return
    }
    if (widths <=-2) {
      return
    }
    let bili = parseInt(widths / 640 * 100) 
    this.setData({
      widths: widths,
      bili: bili,
      tuikuan: jine * bili/100
    })

    let tuikuan = jine * bili / 100
    tuikuan = tuikuan.toFixed(2)
    this.setData({
      tuikuan: tuikuan
    })
  },


//提交退款申请

  to_refund:function(){
    let _this = this

    let unionId = wx.getStorageSync("unionId");
    let openId = wx.getStorageSync("openId");
    console.log(unionId)

    let seas = _this.data.reasons
    let claim_reasons=[]
    for (let i = 0; i < seas.length;i++){
      if (seas[i].flag==true){
        claim_reasons.push(seas[i].reason)  
      }
    }


    if (claim_reasons.length==0){
      wx.showToast({
        title: '请选择退货原因',
        icon: 'none'
      })
      return;
    }


    console.log(_this.data.order.order_type)
    if (_this.data.order.order_type < 8121 && _this.data.imgs.length == 0){
      console.log(8120)

        wx.showToast({
          title: '请上传图片凭证', 
          icon: 'none'
        })
        return;
    
    }


    

    if (_this.data.bili == '0'){

      wx.showModal({
        title: '温馨提示',
        content: '没有为商品选择问题占比，退款金额是0元。',
        success(res) {
          if (res.cancel) {
            console.log('用户点击取消')

          } else if (res.confirm) {
            console.log('用户点击确定')


            let claim_money = _this.data.tuikuan * 100
            console.log(claim_money)
            let token = wx.getStorageSync('token')
            let order_sku_id = _this.data.orderm.order_sku_id
            let sku_count = _this.data.sku_count

            wx.showToast({
              title: '加载中~',
              icon: 'loading',
              duration: 100000//loading时间
            });

            wx.request({
              url: api.root + '/va1/refund/submit',
              method: 'POST',
              dataType: 'json',
              header: { 'token': token + '' },
              data: {
                "data": {
                  "order_id": _this.data.toid + '',
                  "order_sku_id": _this.data.orderm.order_sku_id + '',
                  "sku_id": _this.data.orderm.sku_id + '',
                  "claim_percent": _this.data.bili + '',
                  "claim_desc": _this.data.describe + '',
                  "claim_reasons": claim_reasons,
                  "claim_money": claim_money + '',
                  "imgs": _this.data.imgs,
                }

              },
              success: function (res) {
                console.log("0000000000000")
                console.log(res.data)
                if (res.data.code == 200) {
                  wx.navigateTo({
                    url: '../view_refund/view_refund?order_sku_id=' + order_sku_id + '&&sku_count=' + sku_count
                  })
                  wx.hideToast();

                } else if (res.data.code == 401) {

                  let unionId = wx.getStorageSync("unionid");
                  let openId = wx.getStorageSync("openid");
                  console.log("aaaaaaaaa")
                  console.log(unionId)

                  wx.request({
                    url: api.root + '/va1/appUser/loginByWechat',
                    method: 'POST',
                    dataType: 'json',
                    data: {
                      "data": {
                        "unionId": unionId + '',
                        "openId": openId + '',
                        "wechatName": "",
                        "headPic": ""
                      }
                    },
                    success: function (res) {

                      console.log(res.data)
                      if (res.data.code == 200) {
                        wx.setStorage({
                          key: "token",
                          data: res.data.data.token
                        })

                        _this.to_refund()

                      }
                    }
                  })
                } else {

                  wx.hideToast();
                  wx.showToast({
                    title: res.data.message,
                    icon: 'none',
                    duration: 2000
                  })
                }
              }
            })

          }
        }
      })

    } else {
      console.log("用户继续")
  

      let claim_money = _this.data.tuikuan * 100
      console.log(claim_money)
      let token = wx.getStorageSync('token')
      let order_sku_id = _this.data.orderm.order_sku_id
      let sku_count = _this.data.sku_count

      wx.showToast({
        title: '加载中~',
        icon: 'loading',
        duration: 100000//loading时间
      });

      wx.request({
        url: api.root + '/va1/refund/submit',
        method: 'POST',
        dataType: 'json',
        header: { 'token': token + '' },
        data: {
          "data": {
            "order_id": _this.data.toid + '',
            "order_sku_id": _this.data.orderm.order_sku_id + '',
            "sku_id": _this.data.orderm.sku_id + '',
            "claim_percent": _this.data.bili + '',
            "claim_desc": _this.data.describe + '',
            "claim_reasons": claim_reasons,
            "claim_money": claim_money + '',
            "imgs": _this.data.imgs,
          }

        },
        success: function (res) {
          console.log("0000000000000")
          console.log(res.data)
          if (res.data.code == 200) {
            wx.navigateTo({
              url: '../view_refund/view_refund?order_sku_id=' + order_sku_id + '&&sku_count=' + sku_count
            })
            wx.hideToast();

          } else if (res.data.code == 401) {

            let unionId = wx.getStorageSync("unionid");
            let openId = wx.getStorageSync("openid");
            console.log("aaaaaaaaa")
            console.log(unionId)

            wx.request({
              url: api.root + '/va1/appUser/loginByWechat',
              method: 'POST',
              dataType: 'json',
              data: {
                "data": {
                  "unionId": unionId + '',
                  "openId": openId + '',
                  "wechatName": "",
                  "headPic": ""
                }
              },
              success: function (res) {

                console.log(res.data)
                if (res.data.code == 200) {
                  wx.setStorage({
                    key: "token",
                    data: res.data.data.token
                  })

                  _this.to_refund()

                }
              }
            })
          } else {

            wx.hideToast();
            wx.showToast({
              title: res.data.message,
              icon: 'none',
              duration: 2000
            })
          }
        }
      })



    }





},
  

  // chooseimg1: function (e) {
  //   let _this = this;
  //   var index = e.currentTarget.dataset.index-1
  //   console.log(index)
  //   wx.chooseImage({
  //     count: 1, // 默认9
  //     sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
  //     sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
  //     success: function (res) {
  //       // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
  //       var tempFile = res.tempFilePaths
  //       var tempFilePaths = _this.data.tempFilePaths
  //       tempFilePaths.splice(1, index, tempFile);
  //       _this.setData({
  //         tempFilePaths: tempFilePaths
  //       })
  //     }
  //   })
  // },

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

})