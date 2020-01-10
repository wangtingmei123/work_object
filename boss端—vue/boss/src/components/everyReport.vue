<template>
  <div id="app">
    <!--顶部 start-->
    <div class="title">
      <h3 @click="$router.history.go(-1)"><img class="titile_img" src="../assets/static/img/left.png" alt="">门店日营业报表</h3>
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
      <!--日期选择 start-->
      <img class="date_icon every_date_icon" src="../assets/static/img/date_black.png" alt="">
      <!--日期选择 end-->
    </div>
    <!--顶部 end-->
    <div class="stock_date" @click="clickDateFrom"><p>当前日期: <span>{{dateFrom}}</span></p></div>
    <div class="stock_date every_stock_bottom" @click="clickDateTo"><p>对比日期: <span>{{dateTo}}</span></p></div>
    <!--列表 start-->
    <van-collapse v-model="activeNames" v-for="(item,index) in everyReport" :key="index">
      <van-collapse-item :name="index">
        <div class="list_item_title text_left" slot="title" v-if="index == 0"><img class="list_num every_num" src="../assets/static/img/1-min.png" alt="">{{item.name}}</div>
        <div class="list_item_title text_left" slot="title" v-else-if="index == 1"><img class="list_num every_num" src="../assets/static/img/2-min.png" alt="">{{item.name}}</div>
        <div class="list_item_title text_left" slot="title" v-else-if="index == 2"><img class="list_num every_num" src="../assets/static/img/3-min.png" alt="">{{item.name}}</div>
        <div class="list_item_title text_left" slot="title" v-else><div class="num_circle eve_num_circle">{{index+1}}</div>{{item.name}}</div>
        <ul class="everyReport_ul">
          <li>
            <div>当前销售额：<span>￥{{item.currentMoney/100 | formatMoney}}</span></div>
            <div>当前毛利率：<span>{{item.currentProfitRate}}</span></div>
          </li>
          <li>
            <div>对比销售额：<span>￥{{item.compareMoney/100 | formatMoney}}</span></div>
            <div>对比毛利率：<span>{{item.compareProfitRate}}</span></div>
          </li>
          <li>
            <div>销售额增幅：<span>{{item.moneyIncrementRate}}</span></div>
            <div>毛利增幅额：<span>{{item.profitIncrementRate}}</span></div>
          </li>
          <li>
            <div>销售额占比：<span>{{item.moneyOccupyRate}}</span></div>
            <div>毛利额占比：<span>{{item.profitOccupyRate}}</span></div>
          </li>
        </ul>
      </van-collapse-item>
    </van-collapse>
    <!--列表 end-->
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
  import {root,address,everyReport} from '../assets/api/api'
  import {formatDate,padDate} from "../assets/js/date";
  import '../assets/css/everyReport.css'
  import axios from 'axios'
  import {mapState,mapMutations} from 'vuex'
    export default {
        name: "everyReport",
      data() {
          return{
            addressName:'所有门店',
            addressList: [],
            addressCode: '',
            everyReport:[],
            dateFrom:formatDate(new Date(new Date().getTime() - 24 * 3600 * 1000),'yyyy-MM-dd'),
            dateTo:formatDate(new Date(new Date().getTime() - 24 * 3600 * 1000),'yyyy-MM-dd'),
            date:new Date(new Date().getTime() - 24 * 3600 * 1000),  //昨天
            dateShow:false,
            dateShow2:false,
            show:false,
            activeNames: ['0'],
            finished: false,
            address:'',
            name:'',
            minDate:new Date(2018, 8, 18),
            maxDate:new Date(new Date().getTime() - 24 * 3600 * 1000),
          }
      },
      beforeCreate() {
        let that = this;
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
        let that = this;
        axios.get(root+everyReport+'?wid='+this.addressCode+'&currentDate='+this.dateFrom+'&compareDate='+this.dateFrom+'&mid=1').then(res => {
          if(res.data.code == 2000) {
            that.everyReport = res.data.data;
          }
        });
      },
      computed:{
        ...mapState([
          'address_name'
        ])
      },
      methods:{
        toggle() {
          this.show = !this.show
        },
        addressItem(item) {
          this.addressName = item.name;
          let that = this;
          this.show = false;
          that._data.addressCode = item.code;
          this.set_address([item.name,item.code])
          axios.get(root+everyReport+'?wid='+this._data.addressCode+'&currentDate='+this.dateFrom+'&compareDate='+this.dateTo+'&mid=1').then(res => {
            if(res.data.code == 2000) {
              that.everyReport = res.data.data;
            }
          });
        },
        clickDateFrom() {
          this.dateShow = !this.dateShow
        },
        clickDateTo() {
          this.dateShow2 = !this.dateShow2
          this.dateShow = false
        },
        cancel() {
          this.dateShow = false;
        },
        cancel2() {
          this.dateShow2 = false;
        },
        confirm(time) {
          this.dateFrom = time;
          let from = this.dateFrom;
          let fromFormat = from.getFullYear() + '-' + padDate(from.getMonth() + 1) + '-' + padDate(from.getDate());
          this.dateFrom = fromFormat;
          this.dateShow = false;
          this.everySearchDate();
        },
        confirm2(time) {
          this.dateTo = time;
          let from = this.dateTo;
          let fromFormat = from.getFullYear() + '-' + padDate(from.getMonth() + 1) + '-' + padDate(from.getDate());
          this.dateTo = fromFormat;
          this.dateShow2 = false;
          this.everySearchDate();
        },
        everySearchDate() {
          let that = this;
          axios.get(root+everyReport+'?wid='+this._data.addressCode+'&currentDate='+this.dateFrom+'&compareDate='+this.dateTo+'&mid=1').then(res => {
            if(res.data.code == 2000) {
              that.everyReport = res.data.data;
            }
          });
        },
        ...mapMutations({
          set_address:'SET_ADDRESS'
        })
      }
    }
</script>

<style scoped>
ul {
  border-radius: 0;
}
</style>
