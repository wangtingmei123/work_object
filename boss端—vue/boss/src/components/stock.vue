<template>
  <div id="stock">
    <!--顶部 start-->
    <div class="title">
      <h3 @click="$router.history.go(-1)"><img class="titile_img" src="../assets/static/img/left.png" alt="">库存台账</h3>
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
        <total-money :data="stock.inventoryChange" :title="'库存变化总金额'"></total-money>
        <!--总价end-->
        <!--列表 start-->
        <stock-list :data="stock"></stock-list>
        <!--列表 end-->
      </van-tab>
      <van-tab :title="'近7天'">
        <!--总价start-->
        <total-money :data="stock2.inventoryChange" :title="'库存变化总金额'"></total-money>
        <!--总价end-->
        <!--列表 start-->
        <stock-list :data="stock2"></stock-list>
        <!--列表 end-->
      </van-tab>
      <van-tab :title="'近30天'">
        <!--总价start-->
        <total-money :data="stock3.inventoryChange" :title="'库存变化总金额'"></total-money>
        <!--总价end-->
        <!--列表 start-->
        <stock-list :data="stock3"></stock-list>
        <!--列表 end-->
      </van-tab>
      <van-tab>
        <div slot="title" class="van_date">
          <img class="date_icon" src="../assets/static/img/date_color.png" alt=""><span>日期搜索</span>
        </div>
        <div class="stock_date" @click="dateShowList"><p>日期选择: <span>{{dateNow}}</span></p></div>
        <!--总价start-->
        <total-money :data="stock.inventoryChange" :title="'库存变化总金额'"></total-money>
        <!--总价end-->
        <!--列表 start-->
        <stock-list :data="stock"></stock-list>
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
  import {root,stock,address,historyTotalMoney} from '../assets/api/api'
  import {formatDate,padDate} from "../assets/js/date";
  import axios from 'axios'
  import '../assets/css/stock.css'
  import date from '../assets/common/resetDate'
  import stockList from './stockList/stockList'
  import totalMoney from './totalMoney/totalMoney'
  import {mapState,mapMutations} from 'vuex'

  export default {
    name: "stock",
    components:{
      stockList,
      totalMoney
    },
    data() {
      return {
        addressName:'总部',
        addressList: [],  //门店地址列表
        addressCode:2,  //wid
        stock:[],  //库存台账昨日
        stock2:[],  //库存台账近七日
        stock3:[],  //库存台账近三十日
        historyTotalMoney:'',  //历史总销售额
        show: false,
        dateShow:false,
        active: '',
        dateNow:formatDate(new Date(new Date().getTime() - 24 * 3600 * 1000),'yyyy-MM-dd'),  //昨天
        date:new Date(new Date().getTime() - 24 * 3600 * 1000),
        loading: false,
        finished: false,
        isShow: true,
        minDate:new Date(2018, 8, 18),
        maxDate:new Date(new Date().getTime() - 24 * 3600 * 1000),
      }
    },
    beforeCreate(){
      let that = this;
      //获取门店列表
      axios.get(root + address + '?mid=1').then(res => {
        if (res.data.code == 2000) {
          that.addressList = res.data.data
        }
      });
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
      this.stockYesterday();
      this.stockYesterdayTotalMoney();
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
      //滑动页面
      change(index,title) {
        if(index == 0) {
          this.stockYesterday();
          this.stockYesterdayTotalMoney();
        } else if(index == 1) {
          this.stockSevenday();
          this.stockSevendayTotalMoney();
        } else if (index == 2) {
          this.stockThirthday();
          this.stockThirthdayTotalMoney();
        } else if(index == 3) {
          this.stockYesterday();
          this.stockYesterdayTotalMoney();
        }
      },
      //库存台账昨日
      stockYesterday() {
        let that = this;
        axios.get(`${root+stock}?wid=${this.addressCode}&startDate=${date.dateYesterday}&endDate=${date.dateYesterday}&mid=1`).then(res => {
          if(res.data.code == 2000) {
            that.stock = res.data.data;
          }
        });
      },
      //库存台账近7日
      stockSevenday() {
        let that = this;
        axios.get(`${root+stock}?wid=${this.addressCode}&startDate=${date.dateSevenday}&endDate=${date.dateYesterday}&mid=1`).then(res => {
          if(res.data.code == 2000) {
            that.stock2 = res.data.data;
          }
        });
      },
      //库存台账近30天
      stockThirthday() {
        let that = this;
        axios.get(`${root+stock}?wid=${this.addressCode}&startDate=${date.dateThirtyday}&endDate=${date.dateYesterday}&mid=1`).then(res => {
          if(res.data.code == 2000) {
            that.stock3 = res.data.data
          }
        });
      },
      //历史销售总金额昨日
      stockYesterdayTotalMoney() {
        let that = this;
        axios.get(`${root+historyTotalMoney}?wid=${this.addressCode}&startDate=${date.dateYesterday}&endDate=${date.dateYesterday}&mid=1`).then(res => {
          if(res.data.code == 2000) {
            that.historyTotalMoney = res.data.data
          }
        });
      },
      //历史销售总金额近7日
      stockSevendayTotalMoney() {
        let that = this;
        axios.get(`${root+historyTotalMoney}?wid=${this.addressCode}&startDate=${date.dateSevenday}&endDate=${date.dateYesterday}&mid=1`).then(res => {
          if(res.data.code == 2000) {
            that.historyTotalMoney = res.data.data
          }
        });
      },
      //历史销售总金额近30日
      stockThirthdayTotalMoney() {
        let that = this;
        axios.get(`${root+historyTotalMoney}?wid=${this.addressCode}&startDate=${date.dateThirtyday}&endDate=${date.dateYesterday}&mid=1`).then(res => {
          if(res.data.code == 2000) {
            that.historyTotalMoney = res.data.data
          }
        });
      },
      //库存台账搜索日期金额
      stockSearchMoney() {
        let that = this;
        axios.get(`${root+historyTotalMoney}?wid=${this.addressCode}&startDate=${this.dateNow}&endDate=${this.dateNow}&mid=1`).then(res => {
          if(res.data.code == 2000) {
            that.historyTotalMoney = res.data.data
          }
        });
      },
      //库存台账搜索日期数据
      stockSearchDate() {
        let that = this;
        axios.get(`${root+stock}?wid=${this.addressCode}&startDate=${this.dateNow}&endDate=${this.dateNow}&mid=1`).then(res => {
          if(res.data.code == 2000) {
            that.stock = res.data.data;
          }
        });
      },
      //选择门店
      addressItem(item) {
        this.addressName = item.name;
        let that = this;
        this.show = false;
        that._data.addressCode = item.code;
        this.set_address([item.name,item.code])
        this.stockYesterday();
        this.stockYesterdayTotalMoney();
        this.stockSevenday();
        this.stockSevendayTotalMoney();
        this.stockThirthday();
        this.stockThirthdayTotalMoney();
        this.stockSearchMoney();
        this.stockSearchDate();
      },
      dateShowList() {
        this.dateShow = !this.dateShow;
      },
      confirm(time) {
        this.dateNow = time
        let from = this.dateNow
        let fromFormat = from.getFullYear() + '-' + padDate(from.getMonth() + 1) + '-' + padDate(from.getDate());
        this.dateNow = fromFormat;
        this.dateShow=false;
        this.stockSearchMoney();
        this.stockSearchDate();
      },
      cancel() {
        this.dateShow = false;
      },
      ...mapMutations({
        set_address:'SET_ADDRESS'
      })
    }
  }
</script>

<style scoped>
  body {
    position: absolute;
    height: 100%;
  }
ul {
  border-radius: 20px;
  width: 96%;
  height: 96%;
  margin: 20px auto;
}
</style>
