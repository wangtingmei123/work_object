// tabBarComponent/tabBar.js
const app = getApp();
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    tabbar: {
      type: Object,
      value: {
        "backgroundColor": "#ffffff",
        "color": "#808080",
        "selectedColor": "#ff5a57",
        "list": [
          {
            "pagePath": "../active_passage/active_passage",
            "iconPath": "../../../tabBar/images/03index_2.png",
            "selectedIconPath": "../../../tabBar/images/03index_2_select.png",
            "text": "活动详情"
          },
   
          {
            "pagePath": "../../activity_zone/pages/tribal/tribal",
            "iconPath": "../../../tabBar/images/22_write.png",
            "isSpecial": true,
            "text": ""
          },
       
          {
            "pagePath": "../like_rankinglist/like_rankinglist",
            "iconPath": "../../../tabBar/images/03index_3.png",
            "selectedIconPath": "../../../tabBar/images/03index_3_select_03.png",
            "text": "活动排行"
          }
        ]
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    isIphoneX: app.globalData.systemInfo.model.search('iPhone X') != -1 ? true : false
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})

