const root = "https://api.test.bf-fresh.com/";
const star_root ="https://delivery.test.bf-fresh.com/";

module.exports = {
  root: root,
  
  qued1: function (token, uid_s) {
    console.log("=====================")
    console.log(uid_s)
    console.log(token)
    wx.request({
      url: 'https://api.test.bf-fresh.com/va1/appUser/bindUpUser',
      method: 'POST',
      dataType: 'json',
      header: { 'token': token + '' },
      data: {
        "data": {
          "up_user_id": uid_s + ''
        }
      },
      success: function (res) {
        console.log("=====================()()()")
        console.log(res)
      }
    })
  },





  star_root: star_root,
  //---------------------------首页-----------------------------------------
  category_banner: "v1/xxc/category/getBanner",//加载广告图-完成
  getWarehouseLately: "v1/warehouse/getWarehouseLately",//获取最近的门店-完成
  category: "v1/category/getCategory",//根据门店的wid获取分类-完成
  
  getThirdCategory: "v1/category/getThirdCategory",//根据分类查询三级分类-完成
  
  goods_search_list: "v1/goods/get.goods.search.list",//根据门店的wid和关键字[key_word]获取搜索列表-完成
  usercart_sku_count: "v1/cart/usercart.sku.count.get",//获取购物车的总数-完成  
  //---------------------------首页-----------------------------------------
  //---------------------------拼团-----------------------------------------
  //拼团列表-未完成
  //拼团详情页-未完成
  //详情介绍-未完成
  //查看更多
  //去参
  //单买
  //开团
  //---------------------------拼团-----------------------------------------
  //---------------------------购物车-----------------------------------------
  cart_usercart:"cart/usercart",//购物车列表-完成
  //购物车删除-未完成
  usercart_update: "cart/usercart.update",//加入购物车-完成,购物车单品添加数量完成-;购物车单品删除数量完成
  //购物车去结算-未完成
  //---------------------------购物车-----------------------------------------
  //---------------------------我的-----------------------------------------
  //会员专属优惠码-未完成
  //查看所有订单-未完成
  //待付款-未完成
  //待拼团-未完成
  //待收货-未完成
  //已完成-未完成
  //优惠卷-未完成
  //---------------------------我的-----------------------------------------




}