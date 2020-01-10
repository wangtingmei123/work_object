<template>
  <div id="maoriCotegoryDetail">
    <!--顶部 start-->
    <div class="title">
      <h3 @click="$router.history.go(-1)"><img class="titile_img" src="../assets/static/img/left.png" alt=""></h3>
      <div class="realTimeCotegoryDetail_top_tittle">{{this.name}}</div>
      <div></div>
    </div>
    <!--顶部 end-->
    <!--table列表 start-->
    <div class="table_big" v-for="(item,index) in maoriCotegoryDetail">
      <van-row>
        <van-col class="table_item_tittle">{{item.name}}</van-col>
      </van-row>
      <van-row class="table_item table_item1">
        <van-col>销售金额(元)</van-col>
        <van-col>销售毛利(元)</van-col>
        <van-col>销售毛利率</van-col>
      </van-row>
      <van-row class="table_item table_item2">
        <van-col>{{item.money/100}}</van-col>
        <van-col>{{item.profit/100}}</van-col>
        <van-col>{{item.profitRate}}</van-col>
      </van-row>
    </div>
    <!--table列表 end-->
    <h3 class="top">分类数据</h3>
    <!--echarts start-->
    <!--饼状图 start-->
    <div>
      <div id="myChart_circle" style="width: 100%;height: 220px;background: #fff;"></div>
    </div>
    <div class="biaoshi">
      <div class="biaoshi1" v-for="(item,index) in echartsArrSer">
        <div class="bss" :style="{background:echartsColor[index]}"></div>
        <span>{{item.name}}</span>
      </div>
    </div>
    <!--饼状图 end-->
    <div class="gap"></div>
    <!--echarts end-->
  </div>
</template>

<script>
  import axios from 'axios'
  import {root,maoriCotegoryDetail} from '../assets/api/api'
  import '../assets/css/maoriCotegoryDetail.css'
  export default {
    name: "maoriCotegoryDetail",
    data() {
      return{
        active:'',
        maoriCotegoryDetail:[],
        echartsColor: ['#e85f0d', '#3321b4', '#ffb70d'],
        echartsArrSer:[]
      }
    },
    created() {
      this.fetchDate();
    },
    //监听url变化
    watch:{
      '$route':'fetchDate'
    },
    methods: {
      //饼状图数据遍历
      echarsDate(chartsArr, dateArr) {
        for (let [index, val] of dateArr.entries()) {
          if (val.money > 0) {
            chartsArr.push({value: val.money, name: val.name})
          }
        }
      },
      drawLine(yes) {
        // 基于准备好的dom，初始化echarts实例
        let myChart = this.$echarts.init(document.getElementById('myChart_circle'))              // 绘制图表
        myChart.setOption({
          tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b}: {c} ({d}%)"
          },
          color: this.echartsColor,
          series: [
            {
              // name:'',
              type: 'pie',
              radius: ['40%', '75%'],
              avoidLabelOverlap: false,
              label: {
                normal: {
                  show: true,
                  formatter: '{d}%',

                  textStyle: {
                    fontWeight: 900,
                    fontSize: 16,    //文字的字体大小
                  },
                },

              },
              labelLine: {    //指示线状态
                show: true,
                normal: {
                  length: 5,
                  width: 2
                }
              },
              data: yes,
            }
          ]
        });
      },
      fetchDate() {
        this.name = this.$route.query.name;
        let that = this;
        axios.get(`${root+maoriCotegoryDetail}?wid=${this.$route.query.wid}&cid1=${this.$route.query.id}&startDate=${this.$route.query.startDate}&endDate=${this.$route.query.endDate}&mid=1`).then(res => {
          if(res.data.code == 2000) {
            that.maoriCotegoryDetail = res.data.data;
            that.echartsArrSer = [];
            that.echarsDate(that.echartsArrSer, that.maoriCotegoryDetail);
            that.drawLine(that.echartsArrSer);
          }
        })
      },
    }
  }
</script>

<style scoped>

</style>
