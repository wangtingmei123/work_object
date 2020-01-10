var amapFile = require('../../utils/amap-wx.js');

Page({
  data: {
    adress: null,
    tips: {},
    is_show: true,
    longitude: 113.324520,
    latitude: 23.099994,
    town_ida: '',
    markers: [{
      id: 0,
      // iconPath: "../../images/icon_cur_position.png",
      latitude: 23.099994,
      longitude: 113.324520,
      width: 50,
      height: 50,
     
    }],
    pap_show: true,
  },



  onLoad: function () {
    var that = this;
    wx.getLocation({
      // type: "wgs84",
      success: function (res) {
        var latitude = res.latitude + 0.001276
        var longitude = res.longitude + 0.006256
        //console.log(res.latitude);
        that.setData({
          latitude: res.latitude,
          longitude: res.longitude,
          markers: [{
            latitude: res.latitude,
            longitude: res.longitude
          }]
        })
      }
    })
  },

  onReady: function () {
    var _this = this
    wx.getLocation({
      type: 'wgs84',
      success: function (res) {

        // var latitude = res.latitude
        // var longitude =  res.longitude


        var latitude = res.latitude+0.001276
        var longitude =  res.longitude+0.006256

        // var latitude = 39.8416200000
        // var longitude = 116.3629600000

console.log("_______________________")
        console.log(latitude)
        console.log(longitude)
        _this.getAddress(longitude, latitude);
        // _this.getAddress( res.longitude,res.latitude);
      }
    })

    this.mapCtx = wx.createMapContext('myMap')

  },


  getAddress: function (lng, lat) {
    var _this = this
    console.log(lng + "," + lat)
    wx.request({
      url: 'https://apis.map.qq.com/ws/geocoder/v1/?location=' + lat + ',' + lng + '&get_poi=1&key=FM7BZ-YI66G-4E5QB-IH6EU-AY3S3-H2FS2&poi_options=address_format=short;radius=300;page_size=20;page_index=1;policy=2',
      method: 'GET',
      success: function (res) {
        var adressm = []
        console.log("getAddress" + JSON.stringify(res))
        var town_ida = res.data.result.address_reference.town.id
        console.log(res.data.result.pois)
        var ade = res.data.result.pois;
        console.log(res.data)

        _this.setData({
          adress: ade,
          town_ida: town_ida

        })

      }
    })
  },

  editm: function (e) {
    let dizhi = e.currentTarget.dataset.text;
    var location = e.currentTarget.dataset.info;
    var pages = getCurrentPages();
    var currPage = pages[pages.length - 1];   //当前页面
    var prevPage = pages[pages.length - 2];  //上一个页面

    console.log("aaaaaaa")
    console.log(location)

    let lat = location.lat
    let lng = location.lng
   
    let town_id = this.data.town_ida
    console.log(town_id)
    //直接调用上一个页面的setData()方法，把数据存到上一个页面中去
    prevPage.setData({
      dizhi: dizhi,
      lat: lat,
      lng: lng,
      town_id: town_id
    })

    wx.navigateBack()
  },



  bindInput: function (e) {
    var that = this;
    that.setData({
      is_show: false,
      pap_show: false
    })
    var keywords = e.detail.value;

    console.log(keywords)
 
    wx.request({
      url: 'https://apis.map.qq.com/ws/place/v1/suggestion/?region=全国&keyword=' + keywords + '&key=FM7BZ-YI66G-4E5QB-IH6EU-AY3S3-H2FS2',
      method: 'GET',
      success: function (res) {
      that.setData({
           tips: res.data.data
          });
        console.log("+++++++++=")
      }
    })
  },



  bindSearch: function (e) {
    var dizhi = e.target.dataset.keywords;

    var pages = getCurrentPages();
    var location = e.target.dataset.info;
    var currPage = pages[pages.length - 1];   //当前页面
    var prevPage = pages[pages.length - 2];  //上一个页面
    var lat;
    var lng;
    console.log(location)
    if (location.length == 0) {
      lat = 0,
        lng = 0
    } else {
      // var locationa = eval('(' + location + ')');
      lat = location.lat
      lng = location.lng
    }

    console.log(location)
    console.log(lat)

    wx.request({
      url: 'https://apis.map.qq.com/ws/geocoder/v1/?location=' + lat + ',' + lng + '&get_poi=1&key=RG5BZ-GP6KU-QGBV2-2IJOY-JTGL2-QMFD7&poi_options=address_format=short;radius=300;page_size=20;page_index=1;policy=2',
      method: 'GET',
      success: function (res) {
        var adressm = []
        console.log("getAddress" + JSON.stringify(res))

        console.log(res.data)

        var town_id = res.data.result.address_reference.town.id
        console.log(res.data.result.address_reference.town.id)

    //直接调用上一个页面的setData()方法，把数据存到上一个页面中去
        prevPage.setData({
          dizhi: dizhi,
          lat: lat,
          lng: lng,
          town_id: town_id
        })
        wx.navigateBack()


      }
    })







  },


  getCenterLocation: function () {
    this.mapCtx.getCenterLocation({
      success: function (res) {
        console.log(res.longitude)
        console.log(res.latitude)
      }
    })
  },
  moveToLocation: function () {
    this.mapCtx.moveToLocation()
  },
  translateMarker: function () {
    this.mapCtx.translateMarker({
      markerId: 0,
      autoRotate: true,
      duration: 1000,
      destination: {
        latitude: 23.10229,
        longitude: 113.3345211,
      },
      animationEnd() {
        console.log('animation end')
      }
    })
  },
  includePoints: function () {
    this.mapCtx.includePoints({
      padding: [10],
      points: [{
        latitude: 23.10229,
        longitude: 113.3345211,
      }, {
        latitude: 23.00229,
        longitude: 113.3345211,
      }]
    })
  }


})