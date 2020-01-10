<template>
  <ul class="maori_sale">
    <li v-for="(item,index) in data">
      <div class="maori_sale_title">
        <div class="maori_sale_title_left" v-if="index==0">
          <img src="../../assets/static/img/1-min.png" alt="">
          {{item.goods_name}}
        </div>
        <div class="maori_sale_title_left" v-else-if="index==1">
          <img src="../../assets/static/img/2-min.png" alt="">
          {{item.goods_name}}
        </div>
        <div class="maori_sale_title_left" v-else-if="index==2">
          <img src="../../assets/static/img/3-min.png" alt="">
          {{item.goods_name}}
        </div>
        <div class="maori_sale_title_left" v-else>
          <div class="num_circle">{{index+1}}</div>
          {{item.goods_name}}
        </div>
        <div class="maori_sale_title_right">编号：{{item.sku_id}}</div>
      </div>
      <div class="maori_sale_ctn maoriSale_item2">
        <div class="maori_sale_ctn_left">
          <p>销售金额：<span class="sale_color">￥{{item.totalSkuMoney/100 | formatMoney}}</span></p>
          <p>销售数量：<span>{{item.ifStandard == 1 ? item.totalSkuNum + '份' : item.totalSkuNum/1000 + '公斤'  }}</span></p>
        </div>
        <div class="maori_sale_ctn_right">
          <p>同比：<span>{{item.moneyIncreRateFromLastYear}}</span></p>
          <p>环比：<span>{{item.moneyIncreRateFromCycle}}</span></p>
        </div>
      </div>
      <div class="maori_sale_bottom maoriSale_item3">
        <span>{{item.dateStr}}</span>
      </div>
    </li>
  </ul>
</template>

<script>
  export default {
    name: "maoriSaleList",
    props:{
      data:{}
    }
  }
</script>

<style scoped>

</style>
