<template>
  <div id="app">
  <h3 class="top">销售排行榜</h3>
  <ul class="maori_sale category_sale">
    <li v-for="(item,index) in data">
      <router-link
        :to="{path:'/maoriCotegoryDetail',query:{id:item.id,startDate:startDate,endDate:endDate,wid:wid,name:item.name}}">
        <div class="maori_sale_title">
          <div class="maori_sale_title_left maori_category_title_left" v-if="index==0">
            <img src="../../assets/static/img/1-min.png" alt="">
            <div>{{item.name}}</div>
          </div>
          <div class="maori_sale_title_left maori_category_title_left" v-else-if="index==1">
            <img src="../../assets/static/img/2-min.png" alt="">
            <div>{{item.name}}</div>
          </div>
          <div class="maori_sale_title_left maori_category_title_left" v-else-if="index==2">
            <img src="../../assets/static/img/3-min.png" alt="">
            <div>{{item.name}}</div>
          </div>
          <div class="maori_sale_title_left maori_category_title_left" v-else>
            <div class="num_circle">{{index+1}}</div>
            <div>{{item.name}}</div>
          </div>
          <div class="maori_sale_title_right"><img src="../../assets/static/img/right.png" alt=""></div>
        </div>
        <div class="maori_sale_ctn maori_category_ctn">
          <div class="maori_sale_ctn_left">
            <p>销售金额：<span class="sale_color">￥{{item.money/100 | formatMoney}}</span></p>
            <p>销售数量：<span>{{item.ifStandard == 1 ? item.num + '份' : item.num/1000 + '公斤'  }}</span></p>
          </div>
          <div class="maori_sale_ctn_right maori_cotegory_ctn_right">
            <p>&nbsp<span></span></p>
            <p>毛利率：<span>{{item.profitRate}}</span></p>
          </div>
        </div>
      </router-link>
    </li>
  </ul>
  </div>
</template>

<script>
  export default {
    name: "maoriCategoryList",
    props:{
      data:{},
      startDate:{
        type:String,
      },
      endDate:{
        type:String,
      },
      wid:{
        type:String
      },
    },
    mounted() {

    },
  }
</script>

<style scoped>

</style>
