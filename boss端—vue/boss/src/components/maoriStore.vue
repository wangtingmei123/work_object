<template>
  <div id="maoriStore">
    <!--顶部 start-->
    <div class="title">
      <h3 @click="$router.history.go(-1)"><img class="titile_img" src="../assets/static/img/left.png" alt="">历史门店销售</h3>
      <div class="search" @click="toogle" v-show="searchShow"><img class="maoriStoreCrn_search" src="../assets/static/img/search.png"
                                                                   alt=""></div>
      <div class="serch_hidden realSale_search_big" v-show="isShow">
        <input class="serch_bor" type="text" placeholder="请输入关键字搜索" v-model.trim="searchCtn">
        <img class="serch_icon" src="../assets/static/img/search.png" alt="">
      </div>
    </div>
    <!--顶部 end-->
    <!--选项卡-->
    <van-tabs v-model="active" swipeable id="aaa" @change="change">
      <van-tab :title="'昨日'">
        <!--总价start-->
        <total-money
          :data="historyStoreSaleYestoday.totalMoney"
          :show="true"
          :passengerNum="historyStoreSaleYestoday.totalOrderNum"
          :passenger="'客流量'"
        ></total-money>
        <!--总价end-->
        <h3 class="top">销售排行榜</h3>
        <!--列表 start-->
        <ul class="maori_sale category_sale" v-for="(item,index) in historyStoreSaleYestoday.widSalesInfoList">
          <li>
            <router-link :to="{path:'/maoriStoreCtn',query:{wid:item.wid,address:item.wname,startDate:dateYesterday,endDate:dateYesterday}}">
            <div class="maori_sale_title">
              <div class="maori_sale_title_left maori_category_title_left" v-if="index == 0">
                <img src="../assets/static/img/1-min.png" alt="">
                <div class="text_left">{{item.wname}}</div>
              </div>
              <div class="maori_sale_title_left maori_category_title_left" v-else-if="index == 1">
                <img src="../assets/static/img/2-min.png" alt="">
                <div class="text_left">{{item.wname}}</div>
              </div>
              <div class="maori_sale_title_left maori_category_title_left" v-else-if="index == 2">
                <img src="../assets/static/img/3-min.png" alt="">
                <div class="text_left">{{item.wname}}</div>
              </div>
              <div class="maori_sale_title_left maori_category_title_left" v-else>
                <div class="num_circle">{{index+1}}</div>
                <div>{{item.wname}}</div>
              </div>
              <div class="maori_sale_title_right"><img src="../assets/static/img/right.png" alt=""></div>
            </div>
            <div class="sale_money"><p>销售金额：<span>￥{{item.saleMoney/100 | formatMoney}}</span></p></div>
            <div class="maori_sale_ctn maori_store_ctn">
              <div class="maori_sale_ctn_left">
                <p>客单价：<span>￥{{item.moneyDividedByOrder}}</span></p>
                <p>坪&nbsp&nbsp&nbsp效:<span> &nbsp&nbsp￥{{item.moneyDividedByArea}}</span></p>
                <p>毛利额：<span>￥{{item.profit/100 | formatMoney}}</span></p>
              </div>
              <div class="maori_sale_ctn_right">
                <p>客流量：<span>{{item.orderNum}}</span></p>
                <p>人&nbsp&nbsp&nbsp效:<span> &nbsp&nbsp￥{{item.moneyDividedByEmployee}}</span></p>
                <p>毛利率：<span>{{item.profitRate}}</span></p>
              </div>
            </div>
            </router-link>
          </li>
        </ul>
        <!--列表 end-->
      </van-tab>
      <van-tab :title="'近7天'">
        <!--总价start-->
        <total-money
          :data="historyStoreSaleSeven.totalMoney"
          :show="true"
          :passengerNum="historyStoreSaleSeven.totalOrderNum"
          :passenger="'客流量'"
        ></total-money>
        <!--总价end-->
        <h3 class="top">销售排行榜</h3>
        <!--列表 start-->
        <ul class="maori_sale category_sale" v-for="(item,index) in historyStoreSaleSeven.widSalesInfoList">
          <li>
            <router-link :to="{path:'/maoriStoreCtn',query:{wid:item.wid,address:item.wname,startDate:dateYesterday,endDate:dateSevenday}}">
              <div class="maori_sale_title">
                <div class="maori_sale_title_left maori_category_title_left " v-if="index == 0">
                  <img src="../assets/static/img/1-min.png" alt="">
                  <div class="text_left">{{item.wname}}</div>
                </div>
                <div class="maori_sale_title_left maori_category_title_left" v-else-if="index == 1">
                  <img src="../assets/static/img/2-min.png" alt="">
                  <div class="text_left">{{item.wname}}</div>
                </div>
                <div class="maori_sale_title_left maori_category_title_left" v-else-if="index == 2">
                  <img src="../assets/static/img/3-min.png" alt="">
                  <div class="text_left">{{item.wname}}</div>
                </div>
                <div class="maori_sale_title_left maori_category_title_left" v-else>
                  <div class="num_circle">{{index+1}}</div>
                  <div class="text_left">{{item.wname}}</div>
                </div>
                <div class="maori_sale_title_right"><img src="../assets/static/img/right.png" alt=""></div>
              </div>
              <div class="sale_money"><p>销售金额：<span>￥{{item.saleMoney/100 | formatMoney}}</span></p></div>
              <div class="maori_sale_ctn maori_store_ctn">
                <div class="maori_sale_ctn_left">
                  <p>客单价：<span>￥{{item.moneyDividedByOrder}}</span></p>
                  <p>坪&nbsp&nbsp&nbsp效:<span> &nbsp&nbsp￥{{item.moneyDividedByArea}}</span></p>
                  <p>毛利额：<span>￥{{item.profit/100 | formatMoney}}</span></p>
                </div>
                <div class="maori_sale_ctn_right">
                  <p>客流量：<span>{{item.orderNum}}</span></p>
                  <p>人&nbsp&nbsp&nbsp效:<span> &nbsp&nbsp￥{{item.moneyDividedByEmployee}}</span></p>
                  <p>毛利率：<span>{{item.profitRate}}</span></p>
                </div>
              </div>
            </router-link>
          </li>
        </ul>
        <!--列表 end-->
      </van-tab>
      <van-tab :title="'近30天'">
        <!--总价start-->
        <total-money
          :data="historyStoreSaleMonth.totalMoney"
          :show="true"
          :passengerNum="historyStoreSaleMonth.totalOrderNum"
          :passenger="'客流量'"
        ></total-money>
        <!--总价end-->
        <h3 class="top">销售排行榜</h3>
        <!--列表 start-->
        <ul class="maori_sale category_sale" v-for="(item,index) in historyStoreSaleMonth.widSalesInfoList">
          <li>
            <router-link :to="{path:'/maoriStoreCtn',query:{wid:item.wid,address:item.wname,startDate:dateYesterday,endDate:dateThirtyday}}">
              <div class="maori_sale_title">
                <div class="maori_sale_title_left maori_category_title_left" v-if="index == 0">
                  <img src="../assets/static/img/1-min.png" alt="">
                  <div class="text_left">{{item.wname}}</div>
                </div>
                <div class="maori_sale_title_left maori_category_title_left" v-else-if="index == 1">
                  <img src="../assets/static/img/2-min.png" alt="">
                  <div class="text_left">{{item.wname}}</div>
                </div>
                <div class="maori_sale_title_left maori_category_title_left" v-else-if="index == 2">
                  <img src="../assets/static/img/3-min.png" alt="">
                  <div class="text_left">{{item.wname}}</div>
                </div>
                <div class="maori_sale_title_left maori_category_title_left" v-else>
                  <div class="num_circle">{{index+1}}</div>
                  <div class="text_left">{{item.wname}}</div>
                </div>
                <div class="maori_sale_title_right"><img src="../assets/static/img/right.png" alt=""></div>
              </div>
              <div class="sale_money"><p>销售金额：<span>￥{{item.saleMoney/100 | formatMoney}}</span></p></div>
              <div class="maori_sale_ctn maori_store_ctn">
                <div class="maori_sale_ctn_left">
                  <p>客单价：<span>￥{{item.moneyDividedByOrder}}</span></p>
                  <p>坪&nbsp&nbsp&nbsp效:<span> &nbsp&nbsp￥{{item.moneyDividedByArea}}</span></p>
                  <p>毛利额：<span>￥{{item.profit/100 | formatMoney}}</span></p>
                </div>
                <div class="maori_sale_ctn_right">
                  <p>客流量：<span>{{item.orderNum}}</span></p>
                  <p>人&nbsp&nbsp&nbsp效:<span> &nbsp&nbsp￥{{item.moneyDividedByEmployee}}</span></p>
                  <p>毛利率：<span>{{item.profitRate}}</span></p>
                </div>
              </div>
            </router-link>
          </li>
        </ul>
        <!--列表 end-->
      </van-tab>
      <van-tab>
        <div slot="title" class="van_date">
          <img class="date_icon" src="../assets/static/img/date_color.png" alt=""><span>日期搜索</span>
        </div>
        <div class="stock_date" @click="dateShowList"><p>日期选择: <span>{{dateNow}}</span></p></div>
        <!--总价start-->
        <total-money
          :data="historyStoreSaleDay.totalMoney"
          :show="true"
          :passengerNum="historyStoreSaleDay.totalOrderNum"
          :passenger="'客流量'"
        ></total-money>
        <!--总价end-->
        <h3 class="top">销售排行榜</h3>
        <!--列表 start-->
        <ul class="maori_sale category_sale" v-for="(item,index) in historyStoreSaleDay.widSalesInfoList">
          <li>
            <router-link :to="{path:'/maoriStoreCtn',query:{addressCode:item.wid,address:item.wname,startDate:dateNow,endDate:dateNow}}">
              <div class="maori_sale_title">
                <div class="maori_sale_title_left maori_category_title_left" v-if="index == 0">
                  <img src="../assets/static/img/1-min.png" alt="">
                  <div class="text_left">{{item.wname}}</div>
                </div>
                <div class="maori_sale_title_left maori_category_title_left" v-else-if="index == 1">
                  <img src="../assets/static/img/2-min.png" alt="">
                  <div class="text_left">{{item.wname}}</div>
                </div>
                <div class="maori_sale_title_left maori_category_title_left" v-else-if="index == 2">
                  <img src="../assets/static/img/3-min.png" alt="">
                  <div class="text_left">{{item.wname}}</div>
                </div>
                <div class="maori_sale_title_left maori_category_title_left" v-else>
                  <div class="num_circle">{{index+1}}</div>
                  <div class="text_left">{{item.wname}}</div>
                </div>
                <div class="maori_sale_title_right"><img src="../assets/static/img/right.png" alt=""></div>
              </div>
              <div class="sale_money"><p>销售金额：<span>￥{{item.saleMoney/100 | formatMoney}}</span></p></div>
              <div class="maori_sale_ctn maori_store_ctn">
                <div class="maori_sale_ctn_left">
                  <p>客单价：<span>￥{{item.moneyDividedByOrder}}</span></p>
                  <p>坪&nbsp&nbsp&nbsp效:<span> &nbsp&nbsp￥{{item.moneyDividedByArea}}</span></p>
                  <p>毛利额：<span>￥{{item.profit/100 | formatMoney}}</span></p>
                </div>
                <div class="maori_sale_ctn_right">
                  <p>客流量：<span>{{item.orderNum}}</span></p>
                  <p>人&nbsp&nbsp&nbsp效:<span> &nbsp&nbsp￥{{item.moneyDividedByEmployee}}</span></p>
                  <p>毛利率：<span>{{item.profitRate}}</span></p>
                </div>
              </div>
            </router-link>
          </li>
        </ul>
        <!--列表 end-->
        <div></div>
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
  import {root,address,historyStoreSale} from '../assets/api/api'
  import {formatDate,padDate} from "../assets/js/date";
  //import {toMoney} from "../assets/js/formatMoney";
  import axios from 'axios'
  import '../assets/css/maoriStore.css'
  import totalMoney from './totalMoney/totalMoney'
  const delay = (function() {
    let timer = 0;
    return function(callback, ms) {
      clearTimeout(timer);
      timer = setTimeout(callback, ms);
    };
  })();
  export default {
    components:{
      totalMoney,
    },
    name: "maoriStore",
    data() {
      return {
        addressName:'总部',
        addressList: [],  //门店地址列表
        addressCode:2,  //wid
        date:new Date(new Date().getTime() - 24 * 3600 * 1000),
        dateNow:formatDate(new Date(new Date().getTime() - 24 * 3600 * 1000),'yyyy-MM-dd'),  //昨天
        searchShow:true,
        historyStoreSaleYestoday:[],
        historyStoreSaleSeven:[],
        historyStoreSaleMonth:[],
        historyStoreSaleDay:[],
        dateShow:false,
        show: false,
        isShow:false,
        active: '',
        activeNames: ['1'],
        finished: false,
        address: '',
        searchCtn:'',
        dateYesterday:formatDate(new Date(new Date().getTime() - 24 * 3600 * 1000),'yyyy-MM-dd'),
        dateSevenday: formatDate(new Date(new Date().getTime() - 7 * 24 * 3600 * 1000),'yyyy-MM-dd'),
        dateThirtyday: formatDate(new Date(new Date().getTime() - 30 * 24 * 3600 * 1000),'yyyy-MM-dd'),
        minDate:new Date(2018, 8, 18),
        maxDate:new Date(new Date().getTime() - 24 * 3600 * 1000),
      }
    },
    mounted() {
      let that = this;
      //获取门店列表
      axios.get(root + address + '?mid=1').then(res => {
        if (res.data.code == 2000) {
          that.addressList = res.data.data
        }
      });
      this.historyStoreYesterday();
    },
    watch: {
      //watch title change
      searchCtn() {
        delay(() => {
          this.fetchData();
        }, 300);
      },
    },
    methods: {
      change(index,title) {
        if (index == 0) {
          this.historyStoreYesterday();
        } else if (index == 1) {
          this.historyStoreSevenday();
        } else if (index == 2) {
          this.historyStoreThirtyday();
        } else if(index == 3) {
          this.historyStoreSearch();
        }
      },
      toogle() {
        this.isShow = !this.isShow
      },
      //历史门店销售昨天
      historyStoreYesterday() {
        let that = this;
        axios.get(root+historyStoreSale+'?mid='+1+'&startDate='+that.dateYesterday+'&endDate='+that.dateYesterday).then(res => {
          if(res.data.code == 2000) {
            that.historyStoreSaleYestoday = res.data.data;
          }
        });
      },
      //历史门店销售近7天
      historyStoreSevenday() {
        let that = this;
        axios.get(root+historyStoreSale+'?mid='+1+'&startDate='+that.dateSevenday+'&endDate='+that.dateYesterday).then(res => {
          if(res.data.code == 2000) {
            that.historyStoreSaleSeven = res.data.data;
          }
        });
      },
      //历史门店销售近30天
      historyStoreThirtyday() {
        let that = this;
        axios.get(root+historyStoreSale+'?mid='+1+'&startDate='+that.dateThirtyday+'&endDate='+that.dateYesterday).then(res => {
          if(res.data.code == 2000) {
            that.historyStoreSaleMonth = res.data.data;
          }
        });
      },
      //搜索的默认昨日
      historyStoreSearch() {
        let that = this;
        axios.get(root+historyStoreSale+'?mid='+1+'&startDate='+that.dateNow+'&endDate='+that.dateNow).then(res => {
          if(res.data.code == 2000) {
            that.historyStoreSaleDay = res.data.data;
          }
        });
      },
      addressItem(item) {
        this.addressName = item.name
        let that = this;
        this.show = false;
        that._data.addressCode = item.code
        this.historyStoreSevenday();
        this.historyStoreThirtyday();
        this.historyStoreYesterday();
        this.historyStoreSearch();
      },
      //搜索
      async fetchData(val) {
        axios({
          method: 'get',
          url: root+historyStoreSale+'?mid='+1+'&startDate='+this.dateYesterday+'&endDate='+this.dateYesterday+'&key='+this.searchCtn
        }).then(res => {
          this.historyStoreSaleYestoday = res.data.data
        })
        axios({
          method: 'get',
          url: root+historyStoreSale+'?mid='+1+'&startDate='+this.dateSevenday+'&endDate='+this.dateYesterday+'&key='+this.searchCtn
        }).then(res => {
          this.historyStoreSaleSeven = res.data.data
        })
        axios({
          method: 'get',
          url: root+historyStoreSale+'?mid='+1+'&startDate='+this.dateThirtyday+'&endDate='+this.dateYesterday+'&key='+this.searchCtn
        }).then(res => {
          this.historyStoreSaleMonth = res.data.data
        })
        axios.get(root+historyStoreSale+'?mid='+1+'&startDate='+this.dateNow+'&endDate='+this.dateNow+'&key='+this.searchCtn).then(res => {
          if(res.data.code == 2000) {
            this.historyStoreSaleDay = res.data.data;
          }
        });
      },
      dateShowList() {
        this.dateShow = !this.dateShow;
      },
      confirm(time) {
        let that = this;
        this.dateNow = time;
        let from = this.dateNow;
        let fromFormat = from.getFullYear() + '-' + padDate(from.getMonth() + 1) + '-' + padDate(from.getDate());
        this.dateNow = fromFormat;
        this.dateShow=false;
        this.historyStoreSearch();
      },
      cancel() {
        this.dateShow = false;
      },
    }
  }
</script>

<style scoped>

</style>
