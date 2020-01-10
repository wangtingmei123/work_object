<template>
  <div id="index">
    <!--顶部 start-->
    <div class="title index" v-show="date">
      <h3>营收统计</h3>
      <!--显示日期选择 @click="toggle()"-->
      <div class="time">{{date}}</div>
      <div class="dateShow index_dateShow" v-show="isShow">
        <div class="date_big">
          <div class="from_date" @click="clickDateFrom()"><p>当前日期：</p><div class="date_input" ref="dateFrom">{{ currentDateFrom}}</div></div>
          <div class="to_date" @click="clickDateTo()"><p>对比日期：</p><div class="date_input" ref="dateTo">{{ currentDateTo }}</div></div>
          <button class="search_btn" @click="dateFalse()">查&nbsp&nbsp询</button>
        </div>
      </div>
    </div>
    <!--顶部 end-->
    <!--金额 start-->
    <van-row class="money" v-show="indexInfoList">
      <van-row class="money_top">
        <van-col class="money_top_num" v-show="indexInfoList.totalMoneyNow">￥{{indexInfoList.totalMoneyNow/100 | formatMoney}}</van-col>
        <van-col class="money_top_ctn">销售金额(元)</van-col>
        <div class="index_heng"></div>
      </van-row>
      <van-row class="money_bottom">
        <div class="column_line"></div>
        <van-col span="12" class="column">
          <van-col class="money_bottom_num" v-show="indexInfoList.profitNow">￥{{indexInfoList.profitNow/100 | formatMoney}}</van-col>
          <van-col class="money_bottom_ctn">毛利润</van-col>
        </van-col>
        <van-col span="12" class="column">
          <van-col class="money_bottom_num">{{indexInfoList.orderNumNow}}</van-col>
          <van-col class="money_bottom_ctn">客流量</van-col>
        </van-col>
        <div class="index_shu"></div>
      </van-row>
    </van-row>
    <!--金额 end-->
    <!--图表 start-->
    <van-row class="echart_title" v-show="indexInfoList">
      <van-col class="today" v-show="indexInfoList.totalMoneyNow">
        <div class="fang"></div>
        今日：{{indexInfoList.totalMoneyNow/100 | formatMoney}}元
      </van-col>
      <van-col class="tomorrow" v-show="indexInfoList.totalMoneyYesterday">
        <div class="fang fang2"></div>
        昨日：{{indexInfoList.totalMoneyYesterday/100 | formatMoney}}元
      </van-col>
    </van-row>
    <div id="myChart" style="width: 100%;height: 292px;background: #fff;" v-show="indexInfoList"></div>
    <!--图表 end-->
    <!--选项 start-->
    <van-col class="nh_big" v-show="indexInfoList">
      <router-link to="/realTimeSale" type="flex" justify="space-between" class="nh_ctn bor ripper">
        <div class="nh"><div class="ch_img"><img class="nowImg" src="../assets/static/img/now.png" alt=""></div><p>实时销售</p></div>
        <img class="rightImg" src="../assets/static/img/right.png" alt=""></router-link>
      <router-link to="/history" type="flex" justify="space-between" class="nh_ctn ripper">
        <div class="nh"><div class="ch_img"><img class="historyImg" src="../assets/static/img/history.png" alt=""></div><p>历史销售</p></div>
        <img class="rightImg" src="../assets/static/img/right.png" alt=""></router-link>
    </van-col>
    <!--选项 end-->
    <!--当前日期-->
    <van-popup v-model="show" position="bottom" :overlay="false">
      <van-datetime-picker
        v-model="currentDate"
        type="date"
        @confirm="confirm"
      />
    </van-popup>
    <!--对比日期-->
    <van-popup v-model="show2" position="bottom" :overlay="false">
      <van-datetime-picker
        v-model="currentDate"
        type="date"
        @confirm="confirm2"
      />
    </van-popup>
  </div>
</template>

<script>
  import {root,index} from '../assets/api/api'
  import axios from 'axios'
  import {formatDate} from '../assets/js/date.js';
  import '../assets/css/index.css'
  import Loading from '../common/loading/loading'

  export default {
    name: 'index',
    components:{
      Loading
    },
    filters: {
      formatDate(time) {
        var date = new Date(time);
        return formatDate(date, "yyyy-MM-dd hh:mm");
      }
    },
    data() {
      return {
        indexInfoList:[],  //首页数据
        indexEchartsHeng:[],  //横轴
        indexEchartsShuNow:[],  //竖轴今日
        indexEchartsShuYestoday:[],  //竖轴昨日
        isShow: false,
        show:false,
        show2:false,
        value:'',
        currentDate:new Date(),
        currentDateFrom: new Date(),
        currentDateTo: new Date(),
        date:formatDate(new Date(new Date()),'yyyy-MM-dd'),
      }
    },
    created() {
      let that = this;
      console.log(localStorage['username'])
      axios.get(root+index+'?mid=1'+'&today='+that.date).then(res => {
        if(res.data.code == 2000) {
          that.indexInfoList = res.data.data;
          //今日
          for(let i of that.indexInfoList.timePointDataNow) {
            that.indexEchartsShuNow.push(i.totalMoney/100);
          }
          //昨日
          for(let i of that.indexInfoList.timePointDataYesterday) {
            that.indexEchartsHeng.push(i.timePoint);
            that.indexEchartsShuYestoday.push(i.totalMoney/100);
          }
          this.drawLine();
        }
      })
    },
    methods: {
      toggle: function () {
        this.isShow = !this.isShow;
      },
      dateFalse() {
        this.show = false;
        this.isShow = false;
      },
      clickDateFrom() {
        this.show = !this.show;
      },
      clickDateTo() {
        this.show2 = !this.show2;
      },
      confirm(time) {
        this.currentDateFrom = time;
        let from = this.currentDateFrom;
        let fromFormat = from.getFullYear() + '-' + (from.getMonth() + 1) + '-' + from.getDate();
        this.currentDateFrom = fromFormat;
        this.show=false;
      },
      confirm2(time) {
        this.currentDateTo = time;
        let to = this.currentDateTo;
        let toFormat = to.getFullYear() + '-' + (to.getMonth() + 1) + '-' + to.getDate();
        this.currentDateTo = toFormat;
        this.show2=false;
      },
      cancel() {
        this.show=false;
      },
      drawLine() {
        let that = this;
        // 基于准备好的dom，初始化echarts实例
        let myChart = this.$echarts.init(document.getElementById('myChart'));
        // 绘制图表
        myChart.setOption({
          tooltip: {
            trigger: 'axis',
            textStyle:{
              align:'left',
            },
            confine:true,
            extraCssText:'width:100px;height:80px;'
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: that.indexEchartsHeng
          },
          yAxis: {
            type: 'value'
          },
          series: [
            {
              type: 'line',
              stack: '今日销售额',
              data: that.indexEchartsShuNow,
              color:'#ffb70d'
            },
            {
              type: 'line',
              stack: '昨日销售额',
              data:that.indexEchartsShuYestoday,
              color:'#3321b4'
            }
          ]
        });
      }
    },
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
