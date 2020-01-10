<template>
  <div id="maoriStoreCrn">
    <!--顶部 start-->
    <div class="title maoriStoreCrn_title">
      <h3 @click="$router.history.go(-1)"><img class="titile_img" src="../assets/static/img/left.png" alt="">历史门店销售</h3>
      <div class="maoriStoreCrn_title">{{this.name}}</div>
      <div class="search" @click="toogle"><img class="maoriStoreCrn_search" src="../assets/static/img/search.png"
                                               alt=""></div>
      <div class="serch_hidden" v-show="isShow">
        <input class="serch_bor" type="text" placeholder="请输入关键字搜索" v-model.trim="searchCtn">
        <img class="serch_icon" src="../assets/static/img/search.png" alt="">
      </div>
    </div>
    <!--顶部 end-->
    <!--选项卡-->
    <van-tabs class="actbox maoriStoreCtn_tabs" v-model="active" swipeable @change="change">
      <van-tab :title="'按金额排名'">
        <!--列表 start-->
        <ul class="maori_sale">
          <li class="maori_store_ctn_li" v-for="(item,index) in byMoney">
            <div class="maori_sale_title">
              <div class="maori_sale_title_left text_left" v-if="index == 0">
                <img src="../assets/static/img/1-min.png" alt="">
                {{item.name}}
              </div>
              <div class="maori_sale_title_left text_left" v-else-if="index == 1">
                <img src="../assets/static/img/2-min.png" alt="">
                {{item.name}}
              </div>
              <div class="maori_sale_title_left text_left" v-else-if="index == 2">
                <img src="../assets/static/img/3-min.png" alt="">
                {{item.name}}
              </div>
              <div class="maori_sale_title_left text_left" v-else>
                <div class="num_circle">{{index+1}}</div>
                {{item.name}}
              </div>
              <div class="maori_sale_title_right">编号：{{item.id}}</div>
            </div>
            <div class="maori_sale_ctn maori_store_ctn_ctn">
              <div class="maori_sale_ctn_left">
                <p>销售金额：<span class="sale_color">￥{{item.money/100 | formatMoney}}</span></p>
                <p>销售毛利：<span>￥{{item.profit/100 | formatMoney}}</span></p>
              </div>
              <div class="maori_sale_ctn_right maori_store_ctn_right">
                <p>销售数量：<span>{{item.ifStandard == 1 ? item.num + '份' : item.num/1000 + '公斤'  }}</span></p>
                <p>毛利率：<span>{{item.profitRate}}</span></p>
              </div>
            </div>
          </li>
        </ul>
        <!--列表 end-->
      </van-tab>
      <!--<van-tab :title="'按数量排名'">-->
        <!--&lt;!&ndash;列表 start&ndash;&gt;-->
        <!--<ul class="maori_sale">-->
          <!--<li class="maori_store_ctn_li" v-for="(item,index) in byNum">-->
            <!--<div class="maori_sale_title">-->
              <!--<div class="maori_sale_title_left text_left" v-if="index == 0">-->
                <!--<img src="../assets/static/img/1-min.png" alt="">-->
                <!--{{item.name}}-->
              <!--</div>-->
              <!--<div class="maori_sale_title_left text_left" v-else-if="index == 1">-->
                <!--<img src="../assets/static/img/2-min.png" alt="">-->
                <!--{{item.name}}-->
              <!--</div>-->
              <!--<div class="maori_sale_title_left text_left" v-else-if="index == 2">-->
                <!--<img src="../assets/static/img/3-min.png" alt="">-->
                <!--{{item.name}}-->
              <!--</div>-->
              <!--<div class="maori_sale_title_left text_left" v-else>-->
                <!--<div class="num_circle">{{index+1}}</div>-->
                <!--{{item.name}}-->
              <!--</div>-->
              <!--<div class="maori_sale_title_right">编号：{{item.id}}</div>-->
            <!--</div>-->
            <!--<div class="maori_sale_ctn maori_store_ctn_ctn">-->
              <!--<div class="maori_sale_ctn_left">-->
                <!--<p>销售金额：<span class="sale_color">￥{{item.money/100 | formatMoney}}</span></p>-->
                <!--<p>销售毛利：<span>￥{{item.profit/100 | formatMoney}}</span></p>-->
              <!--</div>-->
              <!--<div class="maori_sale_ctn_right maori_store_ctn_right">-->
                <!--<p>销售数量：<span>{{item.ifStandard == 1 ? item.num + '份' : item.num/1000 + '公斤'  }}</span></p>-->
                <!--<p>毛利率：<span>{{item.profitRate}}</span></p>-->
              <!--</div>-->
            <!--</div>-->
          <!--</li>-->
        <!--</ul>-->
        <!--&lt;!&ndash;列表 end&ndash;&gt;-->
      <!--</van-tab>-->
      <van-tab>
        <div slot="title" class="van_date">
          <img class="date_icon" src="../assets/static/img/date_color.png" alt=""><span class="date_font">日期搜索</span>
        </div>
        <div class="stock_date maoriStoreCrn_date" @click="dateShowList"><p>日期选择: <span>{{dateSearch}}</span></p></div>
        <!--列表 start-->
        <ul class="maori_sale">
          <li class="maori_store_ctn_li" v-for="(item,index) in bySearch">
            <div class="maori_sale_title">
              <div class="maori_sale_title_left text_left" v-if="index == 0">
                <img src="../assets/static/img/1-min.png" alt="">
                {{item.name}}
              </div>
              <div class="maori_sale_title_left text_left" v-else-if="index == 1">
                <img src="../assets/static/img/2-min.png" alt="">
                {{item.name}}
              </div>
              <div class="maori_sale_title_left text_left" v-else-if="index == 2">
                <img src="../assets/static/img/3-min.png" alt="">
                {{item.name}}
              </div>
              <div class="maori_sale_title_left text_left" v-else>
                <div class="num_circle">{{index+1}}</div>
                {{item.name}}
              </div>
              <div class="maori_sale_title_right">编号：{{item.id}}</div>
            </div>
            <div class="maori_sale_ctn maori_store_ctn_ctn">
              <div class="maori_sale_ctn_left">
                <p>销售金额：<span class="sale_color">￥{{item.money/100 | formatMoney}}</span></p>
                <p>销售毛利：<span>￥{{item.profit/100 | formatMoney}}</span></p>
              </div>
              <div class="maori_sale_ctn_right maori_store_ctn_right">
                <p>销售数量：<span>{{item.ifStandard == 1 ? item.num + '份' : item.num/1000 + '公斤'  }}</span></p>
                <p>毛利率：<span>{{item.profitRate}}</span></p>
              </div>
            </div>
          </li>
        </ul>
        <!--列表 end-->
      </van-tab>
    </van-tabs>
    <van-popup v-model="dateShow" position="bottom" :overlay="false">
      <van-datetime-picker
        type="date"
        @cancel="cancel"
        @confirm="confirm"
        v-model="date"
        :min-date="minDate"
        :max-date="maxDate"
      />
    </van-popup>
  </div>
</template>

<script>
  import {root,historyStoreSaleCtn} from '../assets/api/api.js'
  import axios from 'axios'
  import '../assets/css/maoriStoreCtn.css'
  import {formatDate,padDate} from "../assets/js/date";

  const delay = (function() {
    let timer = 0;
    return function(callback, ms) {
      clearTimeout(timer);
      timer = setTimeout(callback, ms);
    };
  })();
  export default {
    name: "maoriStoreCtn",

    data() {
      return {
        byMoney:[],  //按照金额排名
        byNum:[],  //按照数量排名
        searchCtn:'',  //搜索model
        search:[],  //搜索列表
        bySearch:[],  //
        dateShow:false,  //搜索弹出
        isShow: false,
        date:new Date(new Date().getTime() - 24 * 3600 * 1000),
        gao: '',
        active: '',
        name:'',
        dateFrom:formatDate(new Date(new Date().getTime() - 24 * 3600 * 1000),'yyyy-MM-dd'),
        dateTo:formatDate(new Date(new Date().getTime() - 24 * 3600 * 1000),'yyyy-MM-dd'),
        dateSearch:formatDate(new Date(new Date().getTime() - 24 * 3600 * 1000),'yyyy-MM-dd'),
        minDate:new Date(2018, 8, 18),
        maxDate:new Date(new Date().getTime() - 24 * 3600 * 1000),
      }
    },
    created() {
      this.fetchDate();
    },
    watch: {
      '$route':'fetchDate',
      //watch title change
      searchCtn() {
        delay(() => {
          this.fetchData();
        }, 300);
      },
    },
    mounted() {
      // let that = this;
      // that.addressCode = that.$route.query.addressCode;  //获取上个页面传递的id,在下面获取数据的时候先提交id
      // that.address = that.$route.query.address;
      // that.dateFrom = that.$route.query.startDate;
      // that.dateTo = that.$route.query.endDate;
      // this.byMoneyMethod();
    },
    methods: {
      fetchDate() {
        this.name = this.$route.query.address;
        this.byMoneyMethod();
        this.byNumMethod();
      },
      change(index,title) {
        if(index == 0) {
          this.byMoneyMethod();
        }else if (index == 1) {
          this.bySearchMethod();
        }
      },
      toogle() {
        this.isShow = !this.isShow
      },
      dateShowList() {
        this.dateShow = !this.dateShow;
      },
      confirm(time) {
        this.dateSearch = time;
        let from = this.dateSearch;
        let fromFormat = from.getFullYear() + '-' + padDate(from.getMonth() + 1) + '-' + padDate(from.getDate());
        this.dateSearch = fromFormat;
        this.dateShow=false;
        this.bySearchMethod();
      },
      cancel() {
        this.dateShow=false;
      },
      //按金额排名
      byMoneyMethod() {
        axios.get(root+historyStoreSaleCtn+'?wid='+this.$route.query.wid + '&startDate='+this.$route.query.endDate+'&endDate='+this.$route.query.startDate+'&orderRule=byMoney').then(res => {
          if (res.data.code == 2000) {
            this.byMoney = res.data.data;
          }
        })
      },
      //按数量排名
      byNumMethod() {
        axios.get(root+historyStoreSaleCtn+'?wid='+this.$route.query.wid + '&startDate='+this.$route.query.endDate+'&endDate='+this.$route.query.startDate+'&orderRule=byNum').then(res => {
          if (res.data.code == 2000) {
            this.byNum = res.data.data
          }
        })
      },
      //搜索
      bySearchMethod() {
        axios.get(root+historyStoreSaleCtn+'?wid='+this.$route.query.wid + '&startDate='+this.dateSearch+'&endDate='+this.dateSearch+'&orderRule=byMoney').then(res => {
          if (res.data.code == 2000) {
            this.bySearch = res.data.data
          }
        })
      },
      async fetchData(val) {
        axios({
          method: 'get',
          url: root+historyStoreSaleCtn+'?wid='+this.$route.query.wid + '&startDate='+this.dateFrom+'&endDate='+this.dateTo+'&orderRule=byMoney'+'&key='+this.searchCtn
        }).then(res => {
          this.byMoney = res.data.data
        })
        axios({
          method: 'get',
          url: root+historyStoreSaleCtn+'?wid='+this.$route.query.wid + '&startDate='+this.dateFrom+'&endDate='+this.dateTo+'&orderRule=byNum'+'&key='+this.searchCtn
        }).then(res => {
          this.byNum = res.data.data
        })
        axios.get(root+historyStoreSaleCtn+'?wid='+this.$route.query.wid + '&startDate='+this.dateFrom+'&endDate='+this.dateTo+'&orderRule=byMoney'+'&key='+this.searchCtn).then(res => {
          if (res.data.code == 2000) {
            this.bySearch = res.data.data
          }
        })
      },
    },
  }
</script>

<style scoped>

</style>
