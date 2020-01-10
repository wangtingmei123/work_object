<template>
  <ul class="stock_ul">
    <li>
      <div class="stock_status" v-show="data.cycleBegin || data.cycleBegin == 0">期初库存：<span>{{data.cycleBegin/100 | formatMoney}}</span></div>
      <div class="line"></div>
      <div class="stock_status" v-show="data.cycleEnd || data.cycleEnd == 0">期末库存：<span>{{data.cycleEnd/100 | formatMoney}}</span></div>
    </li>
    <li>
      <van-row>
        <van-col span="8">
          <div class="stock_status stock_status_left" v-show="data.sale || data.sale == 0">销售：<span>{{parseInt(data.sale/100) | formatMoney}}</span></div>
        </van-col>
        <van-col span="6">
          <div class="stock_status">&nbsp;<span></span></div>
        </van-col>
        <van-col span="10">
          <div class="stock_status stock_status_right" v-show="data.sale || data.sale == 0">
            金额：<span>{{(0 - data.sale)/100 | formatMoney}}</span></div>
        </van-col>
      </van-row>
    </li>
    <li>
      <van-row>
        <van-col span="8">
          <div class="stock_status stock_status_left" v-show="data.instock || data.instock == 0">进货：<span>{{data.instock/100 | formatMoney}}</span></div>
        </van-col>
        <van-col span="6">
          <div class="stock_status" v-show="data.backstock || data.backstock == 0">退货：<span>{{data.backstock/100 | formatMoney}}</span></div>
        </van-col>
        <van-col span="10">
          <div class="stock_status stock_status_right" v-show="data.instock || data.backstock || data.instock == 0 || data.backstock == 0">
            金额：<span>{{(data.instock + data.backstock)/100 | formatMoney}}</span></div>
        </van-col>
      </van-row>
    </li>
    <li>
      <van-row>
        <van-col span="8">
          <div class="stock_status stock_status_left" v-show="data.badLoss || data.badLoss == 0">报损：<span>{{data.badLoss/100 | formatMoney}}</span></div>
        </van-col>
        <van-col span="6">
          <div class="stock_status" v-show="data.gain || data.gain == 0">报溢：<span>{{data.gain/100 | formatMoney}}</span></div>
        </van-col>
        <van-col span="10">
          <div class="stock_status stock_status_right" v-show="data.gain || data.badLoss || data.gain == 0 || data.badLoss == 0">金额：<span>{{(data.gain - data.badLoss)/100 | formatMoney}}</span>
          </div>
        </van-col>
      </van-row>
    </li>
    <li>
      <van-row>
        <van-col span="8">
          <div class="stock_status stock_status_left" v-show="data.outstock || data.outstock == 0">出库：<span>{{data.outstock/100 | formatMoney}}</span></div>
        </van-col>
        <van-col span="6">
          <div class="stock_status"><span>&nbsp;</span></div>
        </van-col>
        <van-col span="10">
          <div class="stock_status stock_status_right" v-show="data.outstock || data.outstock == 0">金额：<span>{{(0 - data.outstock)/100 | formatMoney}}</span>
          </div>
        </van-col>
      </van-row>
    </li>
  </ul>
</template>

<script>
  export default {
    name: "stockList",
    props: {
      data: {}
    },
  }
</script>

<style scoped>

</style>
