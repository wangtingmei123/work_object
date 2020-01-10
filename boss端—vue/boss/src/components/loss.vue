<template>
  <div id="loss">
    <!--顶部 start-->
    <div class="title">
      <h3 @click="$router.history.go(-1)"><img class="titile_img" src="../assets/static/img/left.png" alt="">门店损耗</h3>
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
        <total-money :data="lossMoney1" :color="'#e85f0d'" :title="'损耗总金额'"></total-money>
        <!--总价end-->
        <!--列表 starat-->
        <loss-list :data="loss1"></loss-list>
        <!--列表 end-->
      </van-tab>
      <van-tab :title="'近7天'">
        <!--总价start-->
        <total-money :data="lossMoney2" :color="'#e85f0d'" :title="'损耗总金额'"></total-money>
        <!--总价end-->
        <!--列表 start-->
        <loss-list :data="loss2"></loss-list>
        <!--列表 end-->
      </van-tab>
      <van-tab :title="'近30天'">
        <!--总价start-->
        <total-money :data="lossMoney3" :color="'#e85f0d'" :title="'损耗总金额'"></total-money>
        <!--总价end-->
        <!--列表 start-->
        <loss-list :data="loss3"></loss-list>
        <!--列表 end-->
      </van-tab>
      <van-tab>
        <div slot="title" class="date_vant">
        <img class="date_icon" src="../assets/static/img/date_color.png" alt=""><span>日期搜索</span>
        </div>
        <div class="stock_date" @click="dateShowList"><p>日期选择: <span>{{dateSearch}}</span></p></div>
        <!--总价start-->
        <total-money :data="lossMoney4" :color="'#e85f0d'" :title="'损耗总金额'"></total-money>
        <!--总价end-->
        <!--列表 start-->
        <loss-list :data="loss4"></loss-list>
        <!--列表 end-->
      </van-tab>

    </van-tabs>
    <div class="nodata" v-show="!lossMoney1 || !lossMoney2 || !lossMoney3 || !lossMoney4">暂无数据...</div>
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
  import axios from 'axios'
  import {root, address, lossMoney, loss} from '../assets/api/api'
  import '../assets/css/loss.css'
  import {padDate, formatDate} from "../assets/js/date";
  import totalMoney from './totalMoney/totalMoney'
  import lossList from './lossList/lossList'

  export default {
    name: "loss",
    components: {
      totalMoney,
      lossList,
    },
    data() {
      return {
        show: false,
        active: '',
        addressName: '总部',
        activeNames: ['1'],
        finished: false,
        address: '',
        addressCode: 2,  //wid
        addressList: [],  //门店地址列表
        lossMoney1: '',  //历史总销售额昨天
        lossMoney2: '',  //历史总销售额近7天
        lossMoney3: '',  //历史总销售额近30天
        lossMoney4: '',  //历史总销售额日期选择
        loss1: [],  //损耗昨天
        loss2: [],  //损耗近7天
        loss3: [],  //损耗近30天
        loss4: [], //损耗日期选择
        dateShow: false,
        date: new Date(new Date().getTime() - 24 * 3600 * 1000),
        dateSearch: formatDate(new Date(new Date().getTime() - 24 * 3600 * 1000), 'yyyy-MM-dd'),
        dateYesterday: formatDate(new Date(new Date().getTime() - 24 * 3600 * 1000), 'yyyy-MM-dd'),
        dateSevenday: formatDate(new Date(new Date().getTime() - 7 * 24 * 3600 * 1000), 'yyyy-MM-dd'),
        dateThirtyday: formatDate(new Date(new Date().getTime() - 30 * 24 * 3600 * 1000), 'yyyy-MM-dd'),
        minDate: new Date(2018, 8, 18),
        maxDate: new Date(new Date().getTime() - 24 * 3600 * 1000),
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
      if (sessionStorage['wid'] != null) {
        let a = sessionStorage['wid'];
        this.addressCode = a;
      } else {
        this.addressCode = -1;
      }
      if (sessionStorage['name'] != null) {
        let b = sessionStorage['name'];
        this.addressName = b;
      } else {
        this.addressName = '所有门店'
      }
    },
    mounted() {
      this.historyLossMoney(this.dateYesterday, 1);
      this.historyLoss(this.dateYesterday, 1);
    },
    methods: {
      toggle() {
        this.show = !this.show
      },
      //显示日期选择器
      dateShowList() {
        this.dateShow = !this.dateShow;
      },
      confirm(time) {
        this.dateSearch = time;
        let from = this.dateSearch;
        let fromFormat = `${from.getFullYear()}-${padDate(from.getMonth() + 1)}-${padDate(from.getDate())}`;
        this.dateSearch = fromFormat;
        this.dateShow = false;
        this.historyLossMoney(this.dateSearch, 4, this.dateSearch);
        this.historyLoss(this.dateSearch, 4, this.dateSearch);
      },
      cancel() {
        this.dateShow = false;
      },
      change(index, title) {
        switch (index) {
          case 0 :
            this.historyLossMoney(this.dateYesterday, 1);
            this.historyLoss(this.dateYesterday, 1);
            break;
          case 1 :
            this.historyLossMoney(this.dateSevenday, 2);
            this.historyLoss(this.dateSevenday, 2);
            break;
          case 2 :
            this.historyLossMoney(this.dateThirtyday, 3);
            this.historyLoss(this.dateThirtyday, 3);
            break;
          case 3 :
            this.historyLossMoney(this.dateSearch, 4, this.dateSearch);
            this.historyLoss(this.dateSearch, 4, this.dateSearch);
            break;
        }
      },
      //获取历史销售总额
      historyLossMoney(dateFrom, list, dateTo = this.dateYesterday) {
        axios.get(`${root + lossMoney}?wid=${this.addressCode}&startDate=${dateFrom}&endDate=${dateTo}&mid=1`).then(res => {
          if (res.data.code == 2000) {
            switch (list) {
              case 1 :
                this.lossMoney1 = res.data.data;
                break;
              case 2 :
                this.lossMoney2 = res.data.data;
                break;
              case 3 :
                this.lossMoney3 = res.data.data;
                break;
              case 4 :
                this.lossMoney4 = res.data.data;
                break;
            }
          }
        })
      },
      //获取损耗
      historyLoss(dateFrom, list, dateTo = this.dateYesterday) {
        axios.get(`${root + loss}?wid=${this.addressCode}&startDate=${dateFrom}&endDate=${dateTo}&mid=1`).then(res => {
          if (res.data.code == 2000) {
            switch (list) {
              case 1 :
                this.loss1 = res.data.data;
                break;
              case 2 :
                this.loss2 = res.data.data;
                break;
              case 3 :
                this.loss3 = res.data.data;
                break;
              case 4 :
                this.loss4 = res.data.data;
                break;
            }
          }
        })
      },
      addressItem(item) {
        this.addressName = item.name;
        let that = this;
        this.show = false;
        that._data.addressCode = item.code;
        sessionStorage.setItem('wid', that._data.addressCode);
        sessionStorage.setItem('name', this.addressName);
        this.historyLossMoney(this.dateYesterday, 1);
        this.historyLoss(this.dateYesterday, 1);
        this.historyLossMoney(this.dateSevenday, 2);
        this.historyLoss(this.dateSevenday, 2);
        this.historyLossMoney(this.dateThirtyday, 3);
        this.historyLoss(this.dateThirtyday, 3);
        this.historyLossMoney(this.dateSearch, 4, this.dateSearch);
        this.historyLoss(this.dateSearch, 4, this.dateSearch);
      },
    }
  }
</script>

<style scoped>
  .date_vant {
    display: flex;
    align-items: center;
  }
</style>
