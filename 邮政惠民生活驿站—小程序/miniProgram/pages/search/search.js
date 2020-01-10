Page({
  data: {
    falg:true,
    showView: true,
    group:[],
    wid:''
  },
  onLoad: function (options) {
    showView: (options.showView == "true" ? true : false)
    let group = wx.getStorageSync("group");
    this.setData({
      wid: options.wid,
      group:group
    })

  },
  change:function() {
    var that = this;
    that.setData({
      group:null
    })

    wx.removeStorageSync('group')
  },

  toDetail:function(even) {
    let _this =this;
    let p = even.currentTarget.dataset.info;
    var g = [];
    if (_this.data.group != null && _this.data.group.length > 0) {
      g = _this.data.group;
    }
    for (var i = 0; i < g.length; i++) {
      if (p == g[i]) {
        g.splice(i, 1);
      }
    }
    if (g.length == 6) {
      g.splice(5, 1);
    }
    g.splice(0, 0, p);
    wx.setStorageSync("group", g);
    _this.setData({
      group: g
    })
    wx.navigateTo({
      url: '../search_list/search_list?p=' + p + '&wid=' + _this.data.wid,
    })
  },

  
  search:function(e){
    let _this =this;
    var  g = [];
    let ps = e.detail.value;
    let b = 0;
    if (_this.data.group != null && _this.data.group.length > 0 ){
      g = _this.data.group;
    }

    let p = ps.replace(/\s+/g, "")
    if (p == ""){
        wx.showToast({
          title: '请输入商品名称',
          icon: 'none'
        })
        return
    }
    for (var i = 0; i < g.length; i++) {
      if (p == g[i]) {
        g.splice(i, 1);
      }
    }
    if (g.length==6){
      g.splice(5, 1);
    }
    g.splice(0, 0, p);
    wx.setStorageSync("group", g);
    _this.setData({
      group:g
    })
    wx.navigateTo({
      url: '../search_list/search_list?p=' + p + '&wid=' + _this.data.wid,
    })
  } 
})