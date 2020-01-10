<template>
  <div id="app">
    <h3 class="top loss_top" v-show="data != 0">损耗排行榜</h3>
    <div class="loss_list" v-for="(item,index) of data">
      <van-row class="loss_list_item1">
        <van-col span="3">排名</van-col>
        <van-col span="7">名称</van-col>
        <van-col span="7">数量</van-col>
        <van-col span="7">金额(元)</van-col>
      </van-row>
      <van-row class="loss_list_item2">
        <van-col span="3">
          <div :class="{'num_one':index==0,'num_two':index==1,'num_three':index==2}" class="num_circle">
            {{index+1}}
          </div>
        </van-col>
        <van-col span="7">{{item.goods_name}}</van-col>
        <van-col span="7">{{item.ifStandard == 1 ? item.totalSkuNum + '份' : item.totalSkuNum/1000 + '公斤' }}
        </van-col>
        <van-col span="7">￥{{item.totalSkuMoney/100 | formatMoney}}</van-col>
      </van-row>
      <van-row class="loss_list_item3">
        <van-col span="12">编码:{{item.sku_id}}</van-col>
        <van-col span="12">{{item.dateStr}}</van-col>
      </van-row>
    </div>
  </div>
</template>

<script>
  export default {
    name: "lossList",
    props: {
      data: {}
    }
  }
</script>

<style scoped>

</style>
