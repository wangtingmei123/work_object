const root = "http://api.bf-fresh.com/"; //测试地址 http://api.test.bf-fresh.com/       正式地址 http://api.bf-fresh.com/

module.exports = {
  root,
  index:'v1/bossStatistics/getBossIndex',  //首页
  login:'v1/bossStatistics/loginForBoss',  //登陆
  address:'v1/bossStatistics/listWarehouseBymid',  //门店地址
  totalMoney:'v1/bossStatistics/getSaleTotalMoneyNow',  //实时总销售额
  realGoodsSlae:'v1/bossStatistics/listSkuSaleDataNow',  //实时商品销售
  realCotegorySale:'v1/bossStatistics/listCategorySaleDataNow',  //实时分类销售
  realCotegorySaleCtn:'v1/bossStatistics/listCategorySaleDataDetailNow',  //实时分类销售详情
  everyReport:'v1/bossStatistics/compareSaleDataByDate',  //门店日营业报表
  stock:'v1/bossStatistics/getInventoryMoneyChange',  //库存台账
  historyTotalMoney: 'v1/bossStatistics/getSaleTotalMoneyByDate',  //历史总销售额
  historyStoreSale: 'v1/bossStatistics/listWarehouseSaleDataByDate',  //历史门店销售
  historyStoreSaleCtn:'v1/bossStatistics/listSkuSaleDataByDate',  //历史门店销售详情
  historyCotegorySale:'v1/bossStatistics/listCategorySaleDataByDate',  //历史分类销售
  historyMaoriSale:'v1/bossStatistics/listSkuSaleMoneyIncreRate',  //历史商品销售
  lossMoney:'v1/bossStatistics/getBadLossTotalMoney',  //门店损耗总金额
  loss:'v1/bossStatistics/listSkuBadLoss',  //门店损耗
  maoriCotegoryDetail:'v1/bossStatistics/listCategorySaleDataDetailByDate',  //历史分类详情
}
