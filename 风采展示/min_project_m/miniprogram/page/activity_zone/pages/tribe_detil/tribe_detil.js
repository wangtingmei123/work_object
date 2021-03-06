// pages/sports_tribe/sports_tribe.js
var api = require("../../../../utils/api.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    comm_all: [],
    
    comms: [],
    show_all: '',
    like:"点赞",
    flag:true,
    tap_show: '', 
    id:'',
    page_index:1,
    page_is_end:false,
    activity_id:'',
    hx_activity_id:'',
    falg:true

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _this=this
    wx.showLoading({
      title: '加载中...',
    })

    if(options.to_page==1){
      var app = getApp()
      app.globalData.page_login=true;
      wx.setStorageSync('article_id',options.id)

      var user_id = wx.getStorageSync('user_id');
      if (!user_id || user_id == '' || user_id == 'undefined' || user_id == undefined) {
        wx.hideLoading()

        wx.redirectTo({
          url: '../../../personal_center/pages/loginBycode/loginBycode',
        })
  
        return false;
      }
    }


    _this.setData({
      activity_id: wx.getStorageSync('activity_id'),
       hx_activity_id: api.hx_activity_id

    })

    if (options.tap_show != undefined && options.id != undefined){


      
      let tap_show = options.tap_show
      let id = options.id
      _this.setData({
        tap_show: tap_show,
        id: id
      })
    }

    this.request()

  },


  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },
  request:function(){

    let _this = this
    wx.request({
      url: api.sport_details,
      dataType: 'json',
      data: {
        article_id: _this.data.id,
        company_id:wx.getStorageSync('company_id'),
        user_id: wx.getStorageSync('user_id'),
        page_index: _this.data.page_index
      },
      success: function (res) {

        wx.hideLoading()

        _this.setData({
          comm_all: res.data.data,
          page_index: _this.data.page_index + 1,

        })

      }

    })
  },

  /**
 * 页面上拉触底事件的处理函数
 */
  onReachBottom: function () {
    let _this = this
    if (_this.data.page_is_end == true) {
      return
    }

    wx.request({
      url: api.sport_details,
      dataType: 'json',
      data: {
        article_id: _this.data.id,
        company_id:wx.getStorageSync('company_id'),

        user_id: wx.getStorageSync('user_id'),
        page_index: _this.data.page_index
      },
      success: function (res) {

        //根据页码做排重
        if (res.data.data.page_index + 1 == _this.data.page_index) {
          return false;
        }

        let reply = _this.data.comm_all.reply
        reply = reply.concat(res.data.data.reply)
        let comm_all = _this.data.comm_all
        comm_all.reply = reply
        _this.setData({
          comm_all: comm_all,
          page_index: _this.data.page_index + 1,
          page_is_end: res.data.data.reply.length < res.data.data.page_size ? true : false,
        })

      }

    })
  },








  to_likea:function(e){
    let _this = this

    // if (_this.data.comm_all.is_circle == 0) {
    //   wx.showModal({
    //     title: '提示',
    //     content: '您没有权限',
    //     showCancel: false,
    //     success(res) {
    //       if (res.confirm) {
    //       }
    //     }
    //   })

    //   return
    // }
    let praise_status = e.currentTarget.dataset.info;
    if(praise_status==2 && wx.getStorageSync('cancel_denied')==1){
      return
    }
    if (_this.data.falg == true) {
      _this.setData({
        falg: false
      })
      
      let action=''
      if (praise_status == 2) {
        action='cancel'
      }
      wx.request({
        url: api.getPraise,
        dataType: 'json',
        data: {
          cate:'article',
          activity_id: wx.getStorageSync('activity_id'),
          article_id: _this.data.comm_all.article_id,
          user_id: wx.getStorageSync('user_id'),
          company_id:wx.getStorageSync('company_id'),
          // praise_status: praise_status,
          action:action

        },
       success:function(res){

        if(res.data.code==200){
          _this.setData({
            page_index: 1,
          })
          _this.request()

        }else if (res.data.code == 300){
           wx.showModal({
             title: '提示',
             content: res.data.data,
             showCancel: false,
             success(res) {
               if (res.confirm) {
               }
             }
           })
       
         }else{
          wx.showModal({
            title: '提示',
            content: res.data.data,
            showCancel: false,
            success(res) {
              if (res.confirm) {
              }
            }
          })
         }

         _this.setData({
           falg: true
         })
       }
     })
    }



  },

  like_list:function(){
    let article_id = this.data.comm_all.article_id
    wx.navigateTo({
      url: '../like_list/like_list?article_id='+article_id,
    })
  },

  to_pin:function(e){
     let _this=this
    if (_this.data.comm_all.is_circle == 0) {
      wx.showModal({
        title: '提示',
        content: '您没有权限',
        showCancel: false,
        success(res) {
          if (res.confirm) {
          }
        }
      })

      return
    }

    let article_id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../comments/comments?article_id=' + article_id + '&&tap_show=' + _this.data.tap_show + '&&size=1',
    })
  },


  ylimg: function (e) {

    let img_url = e.currentTarget.dataset.info
    let index = e.currentTarget.dataset.index

    wx.previewImage({
      current: img_url[index] , // 当前显示图片的http链接
      urls: img_url// 需要预览的图片http链接列表
    })
  },

  to_write: function () {
    wx.navigateTo({
      url: '../tribal/tribal',
    })
  },



  to_del: function (e) {
  
        let _this=this

          let article_id = _this.data.comm_all.article_id
          wx.showModal({
            title: '提示',
            content: '确定要删除该条动态吗？',
            success(res) {
              if (res.confirm) {
              wx.request({
                url: api.delArticle,
                dataType:'json',
                data:{
                  company_id:wx.getStorageSync('company_id'),

                  activity_id: wx.getStorageSync('activity_id'),
                  user_id: wx.getStorageSync('user_id'),
                  article_id: article_id
      
                },
                success:function(res){
      
                  if(res.data.code==200){
               
                    wx.showToast({
                      title: '删除成功',
                      icon: 'success',
                      duration: 1500
                    })

                    setTimeout(function () {
                      // 获取当前的页面栈
                      let pages = getCurrentPages();
                      // 获取上一级页面，即pageA的page对象
                      let prevPage = pages[pages.length - 2];
                      // 获取上一级页面，即pageA的data
                      let prevPageData = prevPage.data;
                      wx.navigateBack()
                      //方法2：也可以直接调用上一级页面，即pageA的方法
                      prevPage.onLoad();
                    }, 1500)
      
                  }else{
                    wx.showToast({
                      title: '删除失败',
                      icon: 'none',
                      duration: 1500
                    })
                  }
                }
              })
      
              } 
            }
          })



   
  },

  user_detil:function(){
    wx.navigateTo({
      url: '../user_detil/user_detil?user_id='+this.data.comm_all.user_id,
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    let _this=this
    return {
      title: '鑫福利企业员工风采展示',
      path: 'page/activity_zone/pages/tribe_detil/tribe_detil?tap_show=all&&id=' + _this.data.id+'&&to_page=1',
    }
  }
})