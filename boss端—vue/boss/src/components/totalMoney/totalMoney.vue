<template>
  <!--<div class="total_big">-->
    <!--<div class="total">-->
      <!--<h1 :style="{color:color}">￥{{data/100 | formatMoney}}</h1>-->
      <!--<p>{{title}}</p>-->
    <!--</div>-->
  <!--</div>-->
  <div class="total_big" v-show="data">
    <div class="total maori_store_total">
      <div>
        <h1 :style="{color:color}">￥{{data/100 | formatMoney}}</h1>
        <p>{{title}}</p>
      </div>
      <div class="maori_store_line" v-show="show"></div>
      <div v-show="show">
        <h1>{{passengerNum}}</h1>
        <p>{{passenger}}</p>
      </div>
    </div>
    <div class="maori_store_line"></div>
  </div>
</template>

<script>
  export default {
    name: "totalMoney",
    props: {
      data: {},
      title: {
        type: String,
        default: '总金额'
      },
      color: {
        type: String,
        default: 'rgb(221,182,116)'
        //rgb(221,182,116)
      },
      show: {
        type: Boolean,
        default: false
      },
      passengerNum: {
        type: Number,
        default: 0
      },
      passenger: {
        type: String,
        default: '客流量'
      },
    }
  }
</script>

<style scoped>

</style>
