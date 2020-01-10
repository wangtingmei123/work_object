// pages/binding/binding.js
const api = require('../../utils/api.js')//引入可拼接的url
Page({

  /**
   * 页面的初始数据
   */
  data: {
      tip_see:false,
      tip_con:0,
 
      tip_see2:false,
       tip_con2: 0,
       message:'',
      userInput: '',
      phoneInput:'',
      fen_gs_show:false,
      fen_zj_show:false,
      fen_bz_show:false,
      fen_bz_show1: false,
    
    // fen_gs: [{ "id": "1",
    //       "name": "东城", 
    //       "fen_zj": 
    //         [{ "id": "1", "name": "建内大街邮政支局", "fen_bz": "营业", "fen_zj":"东城区建内大街甲18号"},
    //           { "id": "2", "name": "王府井邮政支局", "fen_bz": "营销", "fen_zj": "东城区王府井大街74号"},
    //           { "id": "3", "name": "东四邮政支局", "fen_bz": "集邮", "fen_zj": "东城区东四北大街553号"},
    //           { "id": "4", "name": "安外邮政支局", "fen_bz": "发行", "fen_zj": "东城区安外大街181号" }, 
    //           { "id": "5", "name": "和平里邮政支局", "fen_bz": "大宗", "fen_zj": "东城区和平里中街6区6号楼"},
    //           { "id": "6", "name": "光明楼邮政支局", "fen_bz": "后勤", "fen_zj": "东城区光明中街1号" },
    //           { "id": "7", "name": "东花市南里邮政支局", "fen_bz": "投递", "fen_zj": "东城区东花市南里三区7号楼"},
    //             ]
    //   },
          
    //       { "id": "2",
    //       "name": "西城",
    //         "fen_zj":
    //           [{ "id": "1", "name": "中南海邮政支局", "fen_bz": "速递", "fen_zj": "西城区府右街乙27号" },
    //             { "id": "2", "name": "西长安街邮政支局", "fen_bz": "支行", "fen_zj": "西城区北新华街29号昌盛大厦一层" },
    //             { "id": "3", "name": "百万庄邮政支局", "fen_bz": "其他", "fen_zj": "西城区百万庄大街18号" },
    //             { "id": "4", "name": "西外大街邮政支局", "fen_bz": "其他", "fen_zj": "西城区西直门外德宝新园甲22号" },
    //             { "id": "5", "name": "三里河邮政支局", "fen_bz": "其他", "fen_zj": "西城区月坛南街65号" },
    //             { "id": "6", "name": "阜成门邮政支局", "fen_bz": "其他", "fen_zj": "西城区阜成门北大街19号" },
    //             { "id": "7", "name": "牛街邮政支局", "fen_bz": "其他", "fen_zj": "西城区牛街4号" },
    //             { "id": "8", "name": "马连道邮政支局", "fen_bz": "其他", "fen_zj": "西城区广外大街411号" },
    //             { "id": "9", "name": "永安路邮政支局", "fen_bz": "其他", "fen_zj": "西城区永安路173号" },
    //             { "id": "10", "name": "西单邮政支局", "fen_bz": "其他", "fen_zj": "西城区西单北大街109号" },
    //             { "id": "11", "name": "地安门邮政支局", "fen_bz": "其他", "fen_zj": "西城区地安门外大街81号" },
    //             { "id": "12", "name": "西四邮政支局", "fen_bz": "其他", "fen_zj": "西城区西四南大街16号" },
    //           ]
            
            
    //     }, 

    //         { "id": "3", 
    //         "name":
    //         "朝阳",
    //           "fen_zj":
    //             [{ "id": "1", "name": "北苑邮政支局", "fen_bz": "其他", "fen_zj": "朝阳区朝来绿色家园赢秋苑底商" },
    //               { "id": "2", "name": "酒仙桥邮政支局", "fen_bz": "其他", "fen_zj": "朝阳区酒仙桥路43号" },
    //               { "id": "3", "name": "农光里邮政支局", "fen_bz": "其他", "fen_zj": "朝阳区农光里102楼" },
    //               { "id": "4", "name": "垡头邮政支局", "fen_bz": "其他", "fen_zj": "朝阳区垡头西里2号楼" },
    //               { "id": "5", "name": "三间房邮政支局", "fen_bz": "其他", "fen_zj": "朝阳区三间房村223号" },
    //               { "id": "6", "name": "慈云寺邮政支局", "fen_bz": "其他", "fen_zj": "朝阳区八里庄东里3号" },
    //               { "id": "7", "name": "三源里邮政支局", "fen_bz": "其他", "fen_zj": "朝阳区三源里街27楼" },
    //               { "id": "8", "name": "安贞邮政支局", "fen_bz": "其他", "fen_zj": "朝阳区安贞西里五区1号楼" },
    //               { "id": "9", "name": "亚运村邮政支局", "fen_bz": "其他", "fen_zj": "朝阳区安慧北里2区11楼" },
    //               { "id": "10", "name": "望京邮政支局", "fen_bz": "其他", "fen_zj": "朝阳区望京西园一区120楼" },
    //               { "id": "11", "name": "水碓子邮政支局", "fen_bz": "其他", "fen_zj": "朝阳区金台北街6号" },
    //               { "id": "12", "name": "呼家楼邮政支局", "fen_bz": "其他", "fen_zj": "朝阳区关东店大街9号" },
    //               { "id": "13", "name": "双井邮政支局", "fen_bz": "其他", "fen_zj": "朝阳区广渠路48号" },
    //             ]
            
    //         },

    //       {
    //         "id": "4",
    //         "name":
    //           "海淀",
    //         "fen_zj":
    //           [{ "id": "1", "name": "魏公村邮政支局", "fen_bz": "其他", "fen_zj": "海淀区中关村南大街17号" },
    //             { "id": "2", "name": "学院路邮政支局", "fen_bz": "其他", "fen_zj": "海淀区成府路17号" },
    //             { "id": "3", "name": "清华大学邮政支局", "fen_bz": "其他", "fen_zj": "海淀区清华大学院内" },
    //             { "id": "4", "name": "清河邮政支局", "fen_bz": "其他", "fen_zj": "朝阳区垡头西里2号楼" },
    //             { "id": "5", "name": "苏州街邮政支局", "fen_bz": "其他", "fen_zj": "朝阳区三间房村223号" },
    //             { "id": "6", "name": "颐和园邮政支局", "fen_bz": "其他", "fen_zj": "朝阳区八里庄东里3号" },
    //             { "id": "7", "name": "西北旺邮政支局", "fen_bz": "其他", "fen_zj": "朝阳区三源里街27楼" },
    //             { "id": "8", "name": "温泉邮政支局", "fen_bz": "其他", "fen_zj": "朝阳区安贞西里五区1号楼" },
    //             { "id": "9", "name": "育新花园邮政支局", "fen_bz": "其他", "fen_zj": "朝阳区安慧北里2区11楼" },
    //             { "id": "10", "name": "世纪城邮政支局", "fen_bz": "其他", "fen_zj": "朝阳区望京西园一区120楼" },
    //             { "id": "11", "name": "会城门邮政支局", "fen_bz": "其他", "fen_zj": "朝阳区金台北街6号" },
    //             { "id": "12", "name": "万寿路邮政支局", "fen_bz": "其他", "fen_zj": "朝阳区关东店大街9号" },
    //             { "id": "13", "name": "永定路邮政支局", "fen_bz": "其他", "fen_zj": "朝阳区广渠路48号" },
    //             { "id": "14", "name": "紫竹院邮政支局", "fen_bz": "其他", "fen_zj": "朝阳区望京西园一区120楼" },
    //             { "id": "15", "name": "中关村大街邮政支局", "fen_bz": "其他", "fen_zj": "朝阳区金台北街6号" },
    //             { "id": "16", "name": "双榆树邮政支局", "fen_bz": "其他", "fen_zj": "朝阳区关东店大街9号" },
    //             { "id": "17", "name": "北太平庄邮政支局", "fen_bz": "其他", "fen_zj": "朝阳区广渠路48号" },
    //           ]

    //       }

      
    //      ],


    
    
    fen_gs:[],
    fen_gs2: [],
    fen_zj: [],
    fen_bz: [],

    fen_item_name: '',
    zj_item_name:'',
    bz_item_name:'',

    fen_item_code: '',
    zj_item_code: '',
    bz_item_code: '',

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.gs_list(),
      this.bz_list()
  },



  gs_list:function(){
    let _this=this
    wx.request({
      url: api.root + 'va1/codeJson/listPostCompany',
      method: 'POST',
      dataType: 'json',
      // header: { 'token': token + '' },
      data: {
       
      },

      success:function(res){
        console.log("00000000000")
        console.log(res.data)
        _this.setData({
          fen_gs: res.data.data,
          fen_gs2: res.data.data,

        })
      }

    })
  },


  bz_list: function () {
    let _this = this
    wx.request({
      url: api.root + 'va1/codeJson/listPostTeam',
      method: 'POST',
      dataType: 'json',
      // header: { 'token': token + '' },
      data: {

      },

      success: function (res) {
        console.log("00000000000")
        console.log(res.data)
        _this.setData({
          fen_bz: res.data.data,
        })
      }

    })
  },

// 搜索
  seachInput:function(e){
     let _this=this
     let seachInput= e.detail.value
   
      let fen_gs2 =[]
    for (let i = 0; i < _this.data.fen_gs.length; i++) {
      if (_this.data.fen_gs[i].name.indexOf(seachInput) != -1){
        console.log(_this.data.fen_gs[i].name.indexOf(seachInput))
        fen_gs2.push(_this.data.fen_gs[i])
        }
      }
      _this.setData({
        fen_gs2: fen_gs2
      })

    if (seachInput==''){
      _this.setData({
        fen_gs2: _this.data.fen_gs
      })
    }



 
    // stringObject.indexOf(seachInput)
  
    console.log(e.detail.value)
  },


  bing_fen_gs:function(){
    let fen_gs_show = this.data.fen_gs_show
    this.setData({
      fen_gs_show: !fen_gs_show
    })
  },

  bind_fen_item:function(e){
    let _this = this
    let fen_item = e.target.dataset.info;
    this.setData({
      fen_item_name: fen_item.name,
      fen_item_code: fen_item.code,
      fen_gs_show:false
    })   

    let companyId = fen_item.code
    wx.request({
      url: api.root + 'va1/codeJson/listPostSubBureau',
      method: 'POST',
      dataType: 'json',
      // header: { 'token': token + '' },
      data: {
        "data": {
          "companyId": companyId+''
        }
      },
      success: function (res) {
        console.log("00000000000")
        console.log(res.data)

        _this.setData({
          fen_zj: res.data.data,
        })   
      
      }

    })



  },

  bing_fen_zj:function(){
    let fen_zj_show = this.data.fen_zj_show
    if (this.data.fen_zj.length<=0){
      wx.showToast({
        title: '请选择分公司',
        icon: 'none',
        duration: 2000,
      })

      return
    }
    this.setData({
      fen_zj_show: !fen_zj_show
    })
  },


  bind_zj_item:function(e){
    let _this = this
    let zj_item = e.target.dataset.info;
    this.setData({
      zj_item_name: zj_item.name,
      zj_item_code: zj_item.code,
      // fen_zj_show: false
    })

  },

  bing_fen_bz:function(){
    let fen_bz_show = this.data.fen_bz_show
    let fen_bz_show1 = this.data.fen_bz_show1
    this.setData({
      fen_bz_show: !fen_bz_show,
      // fen_bz_show1: !fen_bz_show1
    })
  },

  bind_bz_item:function(e){
    let _this = this
    let fen_bz_show = this.data.fen_bz_show
    console.log(fen_bz_show)
    let bz_item = e.target.dataset.info;
    this.setData({
      bz_item_name: bz_item.name,
      bz_item_code: bz_item.code,
      // fen_bz_show1: false,
          // fen_bz_show: false
    })

    console.log(this.data.fen_bz_show)
  },


  phoneInput:function(e){
    this.setData({
      phoneInput: e.detail.value
    })
    console.log(e.detail.value)
  },


  userInput:function(e){
    this.setData({
      userInput: e.detail.value
    })
    console.log(e.detail.value)
  },

  // guanbi:function(){
  //   this.setData({
  //     tip_see: false
  //   })
  // },


  chaxun:function(){
    let _this = this
    let fen_item_code = this.data.fen_item_code;
    let zj_item_code = this.data.zj_item_code;
    let bz_item_code = this.data.bz_item_code;
    let phoneInput = this.data.phoneInput;
    let userInput = this.data.userInput


    console.log(fen_item_code + "___" + zj_item_code + "___" + bz_item_code + "___" + phoneInput + "____" + userInput)



    if (!(/^1[34578]\d{9}$/.test(phoneInput))) {
      wx.showToast({
        title: '请输入正确的手机号',
        icon: 'none',
        duration: 2000,
      })
      return;
    }


    let token = wx.getStorageSync('token')

    wx.request({
      url: api.root + 'va1/appUser/bindYzCode',
      method: 'POST',
      dataType: 'json',
      header: { 'token': token + '' },
      data: {
        "data": {
          "yz_com_code": fen_item_code+'',
          "yz_sub_com_code": zj_item_code+'',
          "yz_team_code": bz_item_code+'',
          "yz_phone": phoneInput+'',
          "yz_code": userInput+''
        }
      },

      success: function (res) {
        console.log(res)

        if (res.data.code == 200) {
          
          var pages = getCurrentPages();
          var currPage = pages[pages.length - 1];   //当前页面
          var prevPage = pages[pages.length - 2];  //上一个页面
          prevPage.setData({
            bindStatus: 1,
          })
          _this.setData({
            tip_see:true,
            tip_con: 0,
            tip_con2: 1,
            // userInput: ''
          })


        } else {

          console.log("xxxxxxxxxxxx")
          _this.setData({
            tip_see: true,
            tip_con: 0,
            tip_con2: 2,
            // userInput: '',
            message: res.data.message
          })
        }
      
      }

    })

  },


  // quxiao:function(){
  //   this.setData({
  //     tip_see: false,
  //     tip_con:0
  //   })
  // },

  // qued: function () {
  
  // },

  // queding: function () {
  //   this.setData({
  //     tip_see: false,
  //     tip_con: 0,
      
  //   })
  // },



  outbtn:function()
{
    this.setData({
      tip_see: false,
      tip_con: 0,
      tip_con2: 0,

    })
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

  }
})