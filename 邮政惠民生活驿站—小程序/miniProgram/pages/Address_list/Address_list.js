// pages/return/return.js
const api = require('../../utils/api.js')//引入可拼接的url
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dataList:null,
    is_default:'',
    to_back:1,
    total_page: '',//总页数
    current_page: 1,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this=this;
    let uid = wx.getStorageSync("uid");
    let wid = wx.getStorageSync("wid");
    console.log(wid)
    wx.request({
      url: api.root + '/v1/userAddress/get.user.address.page',
      method: 'POST',
      dataType: 'json',
      data: {
        "data": {
          "uid": uid + '',
          "wid": wid + '',
          "page_size": "10",
          "page_no": "1"
        }
      },
      success: function (res) {
        console.log(res.data.data)
        _this.setData({
          dataList: res.data.data.address_list.dataList,
          total_page: res.data.data.address_list.totalPage,
    
        })
      }

    })

  },



  onReachBottom: function () {
    console.log("aaaaaaaaaaa")
    var that = this.data;
    var _this = this;
    let uid = wx.getStorageSync("uid");
    let wid = wx.getStorageSync("wid");


    if (that.current_page == that.total_page) {

    } else {
    that.current_page++;

    wx.request({
      url: api.root + '/v1/userAddress/get.user.address.page',
      method: 'POST',
      dataType: 'json',
      data: {
        "data": {
          "page_no": that.current_page+'',
          "uid": uid + '',
          "wid": wid + '',
          "page_size": "10",
  

        }
      },
      success: function (res) {

        _this.setData({
          dataList: _this.data.dataList.concat(res.data.data.address_list.dataList),

        })

      }
    })

    }

  },




  addadress:function(){

 
    wx.redirectTo({
      url: '../add_address/add_address?statres=1'
    })
  },

  editres:function(e){

    let address_id = e.currentTarget.dataset.id
    let itemPage = e.currentTarget.dataset.text
   
    let receiver_name = itemPage.receiver_name
    let phone = itemPage.phone
    let area_name = itemPage.area_name
    let detail = itemPage.detail
    let checked_id = itemPage.tag
    let amap_latitude = itemPage.amap_latitude
    let amap_longitude = itemPage.amap_longitude
    let town_code = itemPage.town_code
    console.log("xxxxxxxxxxxxx")
    console.log(itemPage)
    // let address_id = itemPage.address_id
    wx.redirectTo({
      url: '../add_address/add_address?town_code=' + town_code + '&amap_latitude=' + amap_latitude + '&amap_longitude=' + amap_longitude +'&receiver_name=' + receiver_name + '&phone=' + phone + '&area_name=' + area_name + '&detail=' + detail + '&checked_id=' + checked_id + '&address_id=' + address_id +'&statres=1' 
    })
  },

  delres:function(e){
    var _this=this;
    let address_id = e.currentTarget.dataset.id
    const index = e.currentTarget.dataset.index; 

    console.log(address_id)
    wx.request({
      url: api.root + '/v1/userAddress/user.address.delete',
      method: 'POST',
      dataType: 'json',
      data: {
        "data": {
          "address_ids": address_id+''
        }
      },
      success: function (res) {
        console.log(res.data)
        let dataList = _this.data.dataList;
        _this.data.dataList.splice(e.currentTarget.dataset.index, 1)   //移除元素
        _this.setData({
          dataList: dataList
        });
      }

    })
  },

  to_confirm:function(e){
    let itemPage = e.currentTarget.dataset.text
    var pages = getCurrentPages();
    var currPage = pages[pages.length - 1];   //当前页面
    var prevPage = pages[pages.length - 2];  //上一个页面
    prevPage.setData({
      itemPage: itemPage,
    })

      wx.navigateBack()

  },

  to_deafe:function(e){

    var _this = this;
    let uid = wx.getStorageSync("uid");
    let address_id = e.currentTarget.dataset.id
    let is_default = e.currentTarget.dataset.info.is_default
    const indexa = e.currentTarget.dataset.index; 
    console.log(is_default)
    console.log(indexa)

    if (is_default==0){

      wx.request({
        url: api.root + '/v1/userAddress/set.address.default',
        method: 'POST',
        dataType: 'json',
        data: {
          "data": {
            "user_id": uid+'',
            "is_default": '1',
            "address_id": address_id + ''
          }
        },
        success: function (res) {
          console.log(res.data)

          wx.showToast({
            title: '设置为默认地址',
            icon: 'success'
          })

          let dataList = _this.data.dataList
          for (var i = 0; i <dataList.length;i++){
            dataList[i].is_default=0
          }
          dataList[indexa].is_default = 1
          _this.setData({
            dataList: dataList
          });

        }
      })

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

  },

})