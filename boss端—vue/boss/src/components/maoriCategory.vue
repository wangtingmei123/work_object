<template>
  <div id="maroriCategory">
    <!--顶部 start-->
    <div class="title">
      <h3 @click="$router.history.go(-1)"><img class="titile_img" src="../assets/static/img/left.png" alt="">历史分类销售</h3>
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
        <ul class="maori_sale category_sale">
          <li v-for="(item,index) in historyCotegorySale1">
            <router-link
              :to="{path:'/maoriCotegoryDetail',query:{id:item.id,startDate:dateYesterday,endDate:dateYesterday,wid:addressCode,name:item.name}}">
              <div class="maori_sale_title">
                <div class="maori_sale_title_left maori_category_title_left" v-if="index==0">
                  <img src="../assets/static/img/1-min.png" alt="">
                  <div>{{item.name}}</div>
                </div>
                <div class="maori_sale_title_left maori_category_title_left" v-else-if="index==1">
                  <img src="../assets/static/img/2-min.png" alt="">
                  <div>{{item.name}}</div>
                </div>
                <div class="maori_sale_title_left maori_category_title_left" v-else-if="index==2">
                  <img src="../assets/static/img/3-min.png" alt="">
                  <div>{{item.name}}</div>
                </div>
                <div class="maori_sale_title_left maori_category_title_left" v-else>
                  <div class="num_circle">{{index+1}}</div>
                  <div>{{item.name}}</div>
                </div>
                <div class="maori_sale_title_right"><img src="../assets/static/img/right.png" alt=""></div>
              </div>
              <div class="maori_sale_ctn maori_category_ctn">
                <div class="maori_sale_ctn_left maori_cotegory_ctn_left">
                  <p>销售金额：<span class="sale_color">￥{{item.money/100 | formatMoney}}</span></p>
                  <p>毛利：<span>￥{{item.profit/100 | formatMoney}}</span></p>
                </div>
                <div class="maori_sale_ctn_right maori_cotegory_ctn_right">
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
        <total-money :data="historyTotalMoney2"></total-money>
        <!--总价end-->
        <h3 class="top">销售排行榜</h3>
        <!--列表 start-->
        <ul class="maori_sale category_sale">
          <li v-for="(item,index) in historyCotegorySale2">
            <router-link
              :to="{path:'/maoriCotegoryDetail',query:{id:item.id,startDate:dateSevenday,endDate:dateYesterday,wid:addressCode,name:item.name}}">
              <div class="maori_sale_title">
                <div class="maori_sale_title_left maori_category_title_left" v-if="index==0">
                  <img src="../assets/static/img/1-min.png" alt="">
                  <div>{{item.name}}</div>
                </div>
                <div class="maori_sale_title_left maori_category_title_left" v-else-if="index==1">
                  <img src="../assets/static/img/2-min.png" alt="">
                  <div>{{item.name}}</div>
                </div>
                <div class="maori_sale_title_left maori_category_title_left" v-else-if="index==2">
                  <img src="../assets/static/img/3-min.png" alt="">
                  <div>{{item.name}}</div>
                </div>
                <div class="maori_sale_title_left maori_category_title_left" v-else>
                  <div class="num_circle">{{index+1}}</div>
                  <div>{{item.name}}</div>
                </div>
                <div class="maori_sale_title_right"><img src="../assets/static/img/right.png" alt=""></div>
              </div>
              <div class="maori_sale_ctn maori_category_ctn">
                <div class="maori_sale_ctn_left maori_cotegory_ctn_left">
                  <p>销售金额：<span class="sale_color">￥{{item.money/100 | formatMoney}}</span></p>
                  <p>毛利：<span>￥{{item.profit/100 | formatMoney}}</span></p>
                </div>
                <div class="maori_sale_ctn_right maori_cotegory_ctn_right">
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
        <total-money :data="historyTotalMoney3"></total-money>
        <!--总价end-->
        <h3 class="top">销售排行榜</h3>
        <!--列表 start-->
        <ul class="maori_sale category_sale">
          <li v-for="(item,index) in historyCotegorySale3">
            <router-link
              :to="{path:'/maoriCotegoryDetail',query:{id:item.id,startDate:dateThirtyday,endDate:dateYesterday,wid:addressCode,name:item.name}}">
              <div class="maori_sale_title">
                <div class="maori_sale_title_left maori_category_title_left" v-if="index==0">
                  <img src="../assets/static/img/1-min.png" alt="">
                  <div>{{item.name}}</div>
                </div>
                <div class="maori_sale_title_left maori_category_title_left" v-else-if="index==1">
                  <img src="../assets/static/img/2-min.png" alt="">
                  <div>{{item.name}}</div>
                </div>
                <div class="maori_sale_title_left maori_category_title_left" v-else-if="index==2">
                  <img src="../assets/static/img/3-min.png" alt="">
                  <div>{{item.name}}</div>
                </div>
                <div class="maori_sale_title_left maori_category_title_left" v-else>
                  <div class="num_circle">{{index+1}}</div>
                  <div>{{item.name}}</div>
                </div>
                <div class="maori_sale_title_right"><img src="../assets/static/img/right.png" alt=""></div>
              </div>
              <div class="maori_sale_ctn maori_category_ctn">
                <div class="maori_sale_ctn_left maori_cotegory_ctn_left">
                  <p>销售金额：<span class="sale_color">￥{{item.money/100 | formatMoney}}</span></p>
                  <p>毛利：<span>￥{{item.profit/100 | formatMoney}}</span></p>
                </div>
                <div class="maori_sale_ctn_right maori_cotegory_ctn_right">
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
        <div class="stock_date" @click="dateShowList"><p>日期选择: <span>{{dateSearch}}</span></p></div>
        <!--总价start-->
        <total-money :data="historyTotalMoney4"></total-money>
        <!--总价end-->
        <h3 class="top">销售排行榜</h3>
        <!--列表 start-->
        <ul class="maori_sale category_sale">
          <li v-for="(item,index) in historyCotegorySale4">
            <router-link
              :to="{path:'/maoriCotegoryDetail',query:{id:item.id,startDate:dateYesterday,endDate:dateYesterday,wid:addressCode,name:item.name}}">
              <div class="maori_sale_title">
                <div class="maori_sale_title_left maori_category_title_left" v-if="index==0">
                  <img src="../assets/static/img/1-min.png" alt="">
                  <div>{{item.name}}</div>
                </div>
                <div class="maori_sale_title_left maori_category_title_left" v-else-if="index==1">
                  <img src="../assets/static/img/2-min.png" alt="">
                  <div>{{item.name}}</div>
                </div>
                <div class="maori_sale_title_left maori_category_title_left" v-else-if="index==2">
                  <img src="../assets/static/img/3-min.png" alt="">
                  <div>{{item.name}}</div>
                </div>
                <div class="maori_sale_title_left maori_category_title_left" v-else>
                  <div class="num_circle">{{index+1}}</div>
                  <div>{{item.name}}</div>
                </div>
                <div class="maori_sale_title_right"><img src="../assets/static/img/right.png" alt=""></div>
              </div>
              <div class="maori_sale_ctn maori_category_ctn">
                <div class="maori_sale_ctn_left maori_cotegory_ctn_left">
                  <p>销售金额：<span class="sale_color">￥{{item.money/100 | formatMoney}}</span></p>
                  <p>毛利：<span>￥{{item.profit/100 | formatMoney}}</span></p>
                </div>
                <div class="maori_sale_ctn_right maori_cotegory_ctn_right">
                  <p>毛利率：<span>{{item.profitRate}}</span></p>
                </div>
              </div>
            </router-link>
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
    <!--echarts start-->
    <h3 class="top">分类数据</h3>
    <!--饼状图 start-->
    <div>
      <div id="myChart_circle" style="width: 100%;height: 220px;background: #fff;"></div>
    </div>
    <div class="biaoshi">
      <div class="biaoshi1" v-for="(item,index) in echartsArrYes">
        <div class="bss" :style="{background:echartsColor[index]}"></div>
        <span>{{item.name}}</span>
      </div>
    </div>
    <!--饼状图 end-->
  </div>
</template>

<script>
  import {root, historyCotegorySale, address, historyTotalMoney} from '../assets/api/api'
  import axios from 'axios'
  import '../assets/css/maoriCotegory.css'
  import {padDate, formatDate} from "../assets/js/date"
  import totalMoney from './totalMoney/totalMoney'
  import maoriCategoryList from './maoriCategoryList/maoriCategoryList'
  import {mapState,mapMutations} from 'vuex'

  export default {
    name: "maoriCategory",
    components: {
      totalMoney,
      maoriCategoryList
    },
    data() {
      return {
        show: false,
        active: '',
        blue: '',
        addressName: '总部',
        addressList: [],
        activeNames: ['1'],
        finished: false,
        address: '',
        addressCode: 2,  //wid
        historyCotegorySale1: [],  //历史分类销售昨天
        historyCotegorySale2: [],  //历史分类销售近7天
        historyCotegorySale3: [],  //历史分类销售近30天
        historyCotegorySale4: [],  //历史分类销售搜索
        historyTotalMoney1: '',  //历史总销售额昨天
        historyTotalMoney2: '',  //历史总销售额近7天
        historyTotalMoney3: '',  //历史总销售额近30天
        historyTotalMoney4: [],  //历史总销售额搜索
        echartsArrYes: [],  //饼状图数据昨天
        echartsArrSev: [],  //饼状图数据近7天
        echartsArrThi: [],  //饼状图数据近30天
        echartsArrSer: [],  //饼状图数据搜索
        echartsColor: ['#e85f0d', '#3321b4', '#ffb70d'],
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
      axios.get(`${root + address}?mid=1`).then(res => {
        if (res.data.code == 2000) {
          that.addressList = res.data.data
        }
      })
    },
    created() {
      console.log(this.address_name[0]);
      if (this.address_name[1] != undefined) {
        let a = this.address_name[1];
        this.addressCode = a;
      } else {
        this.addressCode = -1;
      }
      if (this.address_name[0] != undefined) {
        let b = this.address_name[0]
        this.addressName = b;
      } else {
        this.addressName = '所有门店'
      }
    },
    mounted() {
      this.historyMoney(this.dateYesterday, 1);
      this.historyCotegory(this.dateYesterday, 1);
    },
    computed:{
      ...mapState([
        'address_name'
      ])
    },
    methods: {
      //门店地址显瘾
      toggle() {
        this.show = !this.show
      },
      //显示日期选择器
      dateShowList() {
        this.dateShow = !this.dateShow;
      },
      //饼状图数据遍历
      echarsDate(chartsArr, dateArr) {
        for (let [index, val] of dateArr.entries()) {
          if (val.money > 0) {
            chartsArr.push({value: val.money, name: val.name})
          }
        }
      },
      //echarts图表
      drawLine(yes) {
        // 基于准备好的dom，初始化echarts实例
        let myChart = this.$echarts.init(document.getElementById('myChart_circle'));             // 绘制图表
        myChart.setOption({
          tooltip: {
            trigger: 'item',
            textStyle: {
              align: 'left',
            },
            confine: true,
            extraCssText: 'width:200px;height:120px;',
          },
          color: this.echartsColor,
          series: [
            {
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
      //选择地址
      addressItem(item) {
        this.show = false;
        this.addressName = item.name;
        let that = this;
        that._data.addressCode = item.code;
        this.historyCotegory(this.dateSearch, 4, this.dateSearch);
        this.historyMoney(this.dateSearch, 4, this.dateSearch);
        this.historyMoney(this.dateYesterday, 1);
        this.historyCotegory(this.dateYesterday, 1);
        this.historyMoney(this.dateSevenday, 2);
        this.historyCotegory(this.dateSevenday, 2);
        this.historyMoney(this.dateThirtyday, 3);
        this.historyCotegory(this.dateThirtyday, 3);
      },
      cancel() {
        this.dateShow = false;
      },
      //页面滑动
      change(index, title) {
        switch (index) {
          case 0 :
            this.historyMoney(this.dateYesterday, 1);
            this.historyCotegory(this.dateYesterday, 1);
            this.echartsArrYes = [];
            this.echarsDate(this.echartsArrYes, this.historyCotegorySale1);
            this.drawLine(this.echartsArrYes);
            break;
          case 1 :
            this.historyMoney(this.dateSevenday, 2);
            this.historyCotegory(this.dateSevenday, 2);
            this.echartsArrSev = [];
            this.echarsDate(this.echartsArrSev, this.historyCotegorySale2);
            this.drawLine(this.echartsArrSev);
            break;
          case 2 :
            this.historyMoney(this.dateThirtyday, 3);
            this.historyCotegory(this.dateThirtyday, 3);
            this.echartsArrThi = [];
            this.echarsDate(this.echartsArrThi, this.historyCotegorySale3);
            this.drawLine(this.echartsArrThi);
            break;
          case 3 :
            this.historyMoney(this.dateSearch, 4, this.dateSearch);
            this.historyCotegory(this.dateSearch, 4, this.dateSearch);
            this.echartsArrSer = [];
            this.echarsDate(this.echartsArrSer, this.historyCotegorySale4);
            this.drawLine(this.echartsArrSer);
            break;
        }
      },
      //确认时间选择
      confirm(time) {
        this.dateSearch = time;
        let from = this.dateSearch;
        let fromFormat = `${from.getFullYear()}-${padDate(from.getMonth() + 1)}-${padDate(from.getDate())}`;
        this.dateSearch = fromFormat;
        this.dateShow = false;
        this.historyMoney(this.dateSearch, 4, this.dateSearch);
        this.historyCotegory(this.dateSearch, 4, this.dateSearch);
      },
      //获取历史销售总额
      historyMoney(dateFrom, list, dateTo = this.dateYesterday) {
        axios.get(`${root + historyTotalMoney}?wid=${this.addressCode}&startDate=${dateFrom}&endDate=${dateTo}&mid=1`).then(res => {
          if (res.data.code == 2000) {
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
            this.drawLine();
          }
        })
      },
      //获取历史分类
      historyCotegory(dateFrom, list, dateTo = this.dateYesterday) {
        axios.get(`${root + historyCotegorySale}?wid=${this.addressCode}&startDate=${dateFrom}&endDate=${dateTo}&mid=1`).then(res => {
          if (res.data.code == 2000) {
            this.list = res.data.data;
            switch (list) {
              case 1 :
                this.historyCotegorySale1 = res.data.data;
                this.echartsArrYes = [];
                this.echarsDate(this.echartsArrYes, this.historyCotegorySale1);
                this.drawLine(this.echartsArrYes);
                break;
              case 2 :
                this.historyCotegorySale2 = res.data.data;
                this.echartsArrSev = [];
                this.echarsDate(this.echartsArrSev, this.historyCotegorySale2);
                this.drawLine(this.echartsArrSev);
                break;
              case 3 :
                this.historyCotegorySale3 = res.data.data;
                this.echartsArrThi = [];
                this.echarsDate(this.echartsArrThi, this.historyCotegorySale3);
                this.drawLine(this.echartsArrThi);
                break;
              case 4 :
                this.historyCotegorySale4 = res.data.data;
                this.echartsArrSer = [];
                this.echarsDate(this.echartsArrSer, this.historyCotegorySale4);
                this.drawLine(this.echartsArrSer);
                break;
            }
          }
        })
      },
      ...mapMutations[{
        set_address:'SET_ADDRESS'
      }]
    }
  }
</script>

<style scoped>
  .maori_category_title_left {
    justify-content: start;
  }

  .top {
    background: #f5f5f5;
  }

  .category_sale {
    margin-bottom: 0;
  }
</style>
