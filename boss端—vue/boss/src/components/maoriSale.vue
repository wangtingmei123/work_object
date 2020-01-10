<template>
  <div id="maoriSale">
    <!--顶部 start-->
    <div class="title">
      <h3 @click="$router.history.go(-1)"><img class="titile_img" src="../assets/static/img/left.png" alt="">历史商品销售</h3>
      <div class="time" @click="toggle()">{{addressName}} <img src="../assets/static/img/bottom_block.png" alt=""></div>
      <!--地址列表 start-->
      <van-list
        class="address_list"
        :finished="finished"
        v-show="show"
      >
        <van-cell @click="addressItem(item)" v-for="(item,index) in addressList" :key="index" :title="item.name"/>
      </van-list>
      <!--地址列表 end-->
    </div>
    <!--顶部 end-->
    <!--选项卡-->
    <van-tabs v-model="active" swipeable id="aaa" @change="change">
      <van-tab :title="'昨日'">
        <!--总价start-->
        <total-money :data="historyTotalMoney1"></total-money>
        <!--总价end-->
        <h3 class="top">销售排行榜</h3>
        <!--列表 start-->
        <maori-sale-list :data="historyMaoriSale1"></maori-sale-list>
        <!--列表 end-->
      </van-tab>
      <van-tab :title="'近7天'">
        <!--总价start-->
        <total-money :data="historyTotalMoney2"></total-money>
        <!--总价end-->
        <h3 class="top">销售排行榜</h3>
        <!--列表 start-->
        <maori-sale-list :data="historyMaoriSale2"></maori-sale-list>
        <!--列表 end-->
      </van-tab>
      <van-tab :title="'近30天'">
        <!--总价start-->
        <total-money :data="historyTotalMoney3"></total-money>
        <!--总价end-->
        <h3 class="top">销售排行榜</h3>
        <!--列表 start-->
        <maori-sale-list :data="historyMaoriSale3"></maori-sale-list>
        <!--列表 end-->
      </van-tab>
      <van-tab>
        <div slot="title" class="van_date">
          <img class="date_icon" src="../assets/static/img/date_color.png" alt=""><span>日期搜索</span>
        </div>
        <div class="stock_date" @click="clickDateFrom"><p>当前日期: <span>{{dateFrom}}</span></p></div>
        <div class="stock_date every_stock_bottom" @click="clickDateTo"><p>对比日期: <span>{{dateTo}}</span></p></div>
        <!--总价start-->
        <total-money :data="historyTotalMoney4"></total-money>
        <!--总价end-->
        <h3 class="top">销售排行榜</h3>
        <!--列表 start-->
        <maori-sale-list :data="historyMaoriSale4"></maori-sale-list>
        <!--列表 end-->
      </van-tab>
    </van-tabs>
    <van-popup v-model="dateShow" position="bottom" :overlay="false">
      <van-datetime-picker
        type="date"
        @confirm="confirm"
        v-model="date"
        @cancel="cancel"
        :min-date="minDate"
        :max-date="maxDate"
      />
    </van-popup>
    <van-popup v-model="dateShow2" position="bottom" :overlay="false">
      <van-datetime-picker
        type="date"
        @confirm="confirm2"
        v-model="date"
        @cancel="cancel2"
        :min-date="minDate"
        :max-date="maxDate"
      />
    </van-popup>
  </div>
</template>

<script>
  import {root, historyMaoriSale, address, historyTotalMoney} from '../assets/api/api'
  import axios from 'axios'
  import '../assets/css/maoriSale.css'
  import {padDate, formatDate} from "../assets/js/date";
  import totalMoney from './totalMoney/totalMoney'
  import maoriSaleList from './maoriSaleList/maoriSaleList'
  import {mapState,mapMutations} from 'vuex'

  export default {
    name: "maoriSale",
    components:{
      totalMoney,
      maoriSaleList
    },
    data() {
      return {
        addressName:'总部',
        show: false,
        active:'',
        addressList:[],
        activeNames: ['1'],
        finished: false,
        address: '',
        addressCode: 2,  //wid
        dateShow:false,
        dateShow2:false,
        historyMaoriSale1: [],  //历史商品销售昨天
        historyMaoriSale2: [],  //历史商品销售近7天
        historyMaoriSale3: [],  //历史商品销售近30天
        historyMaoriSale4: [],  //历史商品销售搜索
        historyTotalMoney1: '',  //历史总销售额昨天
        historyTotalMoney2: '',  //历史总销售额近7天
        historyTotalMoney3: '',  //历史总销售额搜索
        historyTotalMoney4: '',
        date: new Date(new Date().getTime() - 24 * 3600 * 1000),
        dateSearch: formatDate(new Date(new Date().getTime() - 24 * 3600 * 1000), 'yyyy-MM-dd'),
        dateYesterday: formatDate(new Date(new Date().getTime() - 24 * 3600 * 1000), 'yyyy-MM-dd'),
        dateSevenday: formatDate(new Date(new Date().getTime() - 7 * 24 * 3600 * 1000), 'yyyy-MM-dd'),
        dateThirtyday: formatDate(new Date(new Date().getTime() - 30 * 24 * 3600 * 1000), 'yyyy-MM-dd'),
        dateFrom:formatDate(new Date(new Date().getTime() - 24 * 3600 * 1000),'yyyy-MM-dd'),  //昨天
        dateTo:formatDate(new Date(new Date().getTime() - 24 * 3600 * 1000),'yyyy-MM-dd'),  //昨天
        minDate:new Date(2018, 8, 18),
        maxDate:new Date(new Date().getTime() - 24 * 3600 * 1000),
      }
    },
    beforeCreate() {
      let that = this;
      //获取门店列表
      axios.get(root + address + '?mid=1').then(res => {
        if (res.data.code == 2000) {
          that.addressList = res.data.data
        }
      })
    },
    created() {
      if (this.address_name[1] != undefined) {
        let a = this.address_name[1];
        this.addressCode = a;
      } else {
        this.addressCode = -1;
      }
      if (this.address_name[0] != undefined) {
        let b = this.address_name[0];
        this.addressName = b;
      } else {
        this.addressName = '所有门店'
      }
    },
    mounted() {
      this.historySaleMoney(this.dateYesterday, 1);
      this.historySale(this.dateYesterday,1);
    },
    computed:{
      ...mapState([
        'address_name'
      ])
    },
    methods: {
      toggle() {
        this.show = !this.show
      },
      clickDateFrom() {
        this.dateShow = !this.dateShow
      },
      cancel() {
        this.dateShow = false;
      },
      clickDateTo() {
        this.dateShow2 = !this.dateShow2
        this.dateShow = false
      },
      cancel2() {
        this.dateShow2 = false;
      },
      confirm(time) {
        let that = this;
        this.dateFrom = time;
        let from = this.dateFrom;
        let fromFormat = `${from.getFullYear()}-${padDate(from.getMonth() + 1)}-${padDate(from.getDate())}`;
        this.dateFrom = fromFormat;
        this.dateShow = false;
        this.historySaleMoney(this.dateFrom, 4, this.dateTo);
        this.historySale(this.dateFrom, 4, this.dateTo);
      },
      confirm2(time) {
        this.dateTo = time;
        let from = this.dateTo;
        let fromFormat = `${from.getFullYear()}-${padDate(from.getMonth() + 1)}-${padDate(from.getDate())}`;
        this.dateTo = fromFormat;
        this.dateShow2 = false;
        this.historySaleMoney(this.dateFrom, 4, this.dateTo);
        this.historySale(this.dateFrom, 4, this.dateTo);
      },
      addressItem(item) {
        this.addressName = item.name
        let that = this;
        this.show = false;
        that._data.addressCode = item.code;
        this.set_address([item.name,item.code])
        this.historySaleMoney(this.dateYesterday, 1);
        this.historySale(this.dateYesterday,1);
        this.historySaleMoney(this.dateSevenday, 2);
        this.historySale(this.dateSevenday, 2);
        this.historySaleMoney(this.dateThirtyday, 3);
        this.historySale(this.dateThirtyday, 3);
        this.historySaleMoney(this.dateFrom, 4, this.dateTo);
        this.historySale(this.dateFrom, 4, this.dateTo);
      },
      change(index,title) {
        switch (index) {
          case 0 :
            this.historySaleMoney(this.dateYesterday, 1);
            this.historySale(this.dateYesterday, 1);
            break;
          case 1 :
            this.historySaleMoney(this.dateSevenday, 2);
            this.historySale(this.dateSevenday, 2);
            break;
          case 2 :
            this.historySaleMoney(this.dateThirtyday, 3);
            this.historySale(this.dateThirtyday, 3);
            break;
          case 3 :
            this.historySaleMoney(this.dateFrom, 4, this.dateTo);
            this.historySale(this.dateFrom, 4, this.dateTo);
            break;
        }
      },
      //获取历史销售总额
      historySaleMoney(dateFrom, list, dateTo = this.dateYesterday) {
        axios.get(`${root+historyTotalMoney}?wid=${this.addressCode}&startDate=${dateFrom}&endDate=${dateTo}&mid=1`).then(res => {
          if(res.data.code == 2000) {
            switch (list) {
              case 1 :
                this.historyTotalMoney1 = res.data.data;
                break;
              case 2 :
                this.historyTotalMoney2 = res.data.data;
                break;
              case 3 :
                this.historyTotalMoney3 = res.data.data;
                break;
              case 4 :
                this.historyTotalMoney4 = res.data.data;
                break;
            }
          }
        })
      },
      //获取历史销售额
      historySale(dateFrom,list,dateTo=this.dateYesterday) {
        axios.get(`${root + historyMaoriSale}?wid=${this.addressCode}&startDate=${dateFrom}&endDate=${dateTo}&mid=1`).then(res => {
          if (res.data.code == 2000) {
            switch (list) {
              case 1 :
                this.historyMaoriSale1 = res.data.data;
                break;
              case 2 :
                this.historyMaoriSale2 = res.data.data;
                break;
              case 3 :
                this.historyMaoriSale3 = res.data.data;
                break;
              case 4 :
                this.historyMaoriSale4 = res.data.data;
                break;
            }
          }
        })
      },
      ...mapMutations({
        set_address:'SET_ADDRESS'
      })
    }
  }
</script>

<style scoped>

</style>
