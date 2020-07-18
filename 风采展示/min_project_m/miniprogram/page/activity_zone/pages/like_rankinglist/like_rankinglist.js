// pages/activity/icbc/ranking_list/ranking_list.js
var api = require("../../../../utils/api.js");
const W = wx.getSystemInfoSync().windowWidth;
const rate = 750 / W;
const code_w = 260 / rate;
const code_h = 260 / rate;
const rnum = 130 / rate;
const rbanjin = 120 / rate;
const code_w1 = 690 / rate;
const code_h1 = 120 / rate;


var ctx = ''
const createRecycleContext = require('miniprogram-recycle-view')

Page({

  /**
   * 页面的初始数据
   * 
   */
  data: {
    ranking_type: '', //department_member all
    request_list : [],   //列表数据

    user_info: [],            //个人排行用户数据
    page_index: 1,            //当前页码
    page_size: 50,            //当前每页返回数据条数
    page_is_end: false,       //页面是否到底的标示
    width_c: code_w,
    height_c: code_h,
    activity_id:'',  
    lodeing:true,
    height_g:0,
    falg:true,
    tabbar:{},
    us_name:'',
    can_list:[],
    tap_m:1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  let _this=this;
  wx.showLoading({
    title: '加载中...',
  })
   _this.setData({
     activity_id: wx.getStorageSync('activity_id'),
     page_is_end:false,
     page_index:1,
     request_list:[]
   })

   _this.request_list()
   _this.getCanList()

    // console.log(_this.data.ranking_list)

 

  },

  chage_tap: function(e){
    let _this = this
  
    wx.pageScrollTo({
      scrollTop: 0,
      duration: 0
    })
    let tap_m = e.currentTarget.dataset.info
    this.setData({
      tap_m: tap_m,
     
    })
    if(tap_m==1){
      wx.showLoading({
        title: '加载中...',
      })
      _this.setData({
        us_name:'',
        page_is_end:false,
        page_index:1,
        request_list:[]
  
      })
      _this.request_list()

    }else if(2){
      
      _this.getCanList()


    }
  

  },



  input_name:function(e){
    this.setData({
      us_name:e.detail.value
    })
    if(e.detail.value==''){
      this.setData({

        page_is_end:false,
        page_index:1,
        request_list:[]
  
      })
      this.request_list()
  
  
    }

  },



  search_us:function(){
    console.log(this.data.us_name)
    this.setData({

      page_is_end:true,
      page_index:1,
      request_list:[]

    })
    this.request_list()


  },


  to_detail: function (e) {
    let id = e.currentTarget.dataset.info
    let tap_show = 'all'
    wx.navigateTo({
      url: '../tribe_detil/tribe_detil?tap_show=' + tap_show + '&&id=' + id,
    })
  },




  getCanList(){
    let _this=this
    wx.request({
      url: api.getCanList,
      dataType: 'json',
      data: {
        activity_id: wx.getStorageSync('activity_id'),
        company_id: wx.getStorageSync('company_id'),
       
      },
      success: function (res) {
        wx.hideLoading()

        if (res.data.code ==200) {

          _this.setData({
            can_list: res.data.data
           
          })


        }

      }

    })



  },


  request_list(){
    let _this=this


    wx.request({
      url: api.getPraiseList,
      dataType: 'json',
      data: {
        activity_id: wx.getStorageSync('activity_id'),
        company_id: wx.getStorageSync('company_id'),
        user_id: wx.getStorageSync('user_id'),
        page: _this.data.page_index,
        per_page:_this.data.page_size,
        keywords:_this.data.us_name,
      },
      success: function (res) {
       

        //根据页码做排重
        wx.hideLoading()
        // if (res.data.data.page_index + 1 == _this.data.page_index) {
        //   return false;
        // }

        console.log()



        if (res.data.data.data.length >= 0) {

          let request_list = _this.data.request_list;
          let comm_all = res.data.data.data
          request_list = request_list.concat(comm_all);

          _this.setData({
            request_list: request_list,
            page_index: _this.data.page_index + 1,
            page_is_end: res.data.data.data.length < _this.data.page_size ? true : false,

          })


        }

      }

    })




  },



  likea:function(e){
    let _this=this


    if (_this.data.falg == true) {
      _this.setData({
        falg: false
      })

      let is_praise = e.currentTarget.dataset.info;
      let article_id = e.currentTarget.dataset.id;
      let index = e.currentTarget.dataset.index;
      let request_list = this.data.request_list

      wx.request({
        url: api.getPraise,
        dataType: 'json',
        data: {
          activity_id: wx.getStorageSync('activity_id'),
          article_id: article_id,
          user_id: wx.getStorageSync('user_id'),
          praise_status: is_praise,

        },
        success: function (res) {

        
          
            if (res.data.code == 200) {


                if (is_praise == 1) {

                  request_list[index].is_praise = 2
                  request_list[index].praise_count = parseInt(request_list[index].praise_count) + 1

                } else if (is_praise == 2) {
                  request_list[index].is_praise = 1
                  request_list[index].praise_count = parseInt(request_list[index].praise_count) - 1
                }
                _this.setData({
                  request_list: request_list
                })
          }else if (res.data.code == 300) {
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



  onReady: function() {
   
    // ctx.update(beginIndex, list)
    // ctx.destroy()
},


  // 上拉加载
  onReachBottom: function () {
    let _this = this
    console.log(11)
    if (_this.data.page_is_end == true) {
      wx.hideLoading()
      return
    }
    this.request_list()

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    let _this = this
    wx.showNavigationBarLoading();
    this.setData({
      page_index: 1,
      request_list: [],
      page_is_end: false,
    })

    _this.request_list()

    setTimeout(function () {
      wx.hideNavigationBarLoading();
      wx.stopPullDownRefresh();
    }, 1500)

  },



})