<template>
  <div id="app">
    <!--顶部 start-->
    <div class="title maoriStoreCrn_title">
      <h3 @click="$router.history.go(-1)"><img class="titile_img" src="../assets/static/img/left.png" alt="">实时门店销售</h3>
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
      <div class="search" @click="toogle" v-show="searchShow">
        <img class="maoriStoreCrn_search" src="../assets/static/img/search.png" alt="">
      </div>
      <div class="serch_hidden realSale_search_big" v-show="isShow">
        <input class="serch_bor" type="text" placeholder="请输入关键字搜索" v-model.trim="searchCtn">
        <img class="serch_icon" src="../assets/static/img/search.png" alt="">
      </div>
    </div>
    <!--顶部 end-->
    <!--选项卡-->
    <van-tabs class="actbox"  v-model="active" swipeable @change="change">
      <van-tab :title="'实时商品销售'" class="realSale">
        <div v-show="totalMoney != 0 && realTimeSale !=0">
        <!--总价start-->
        <div class="total_big">
          <div class="total">
            <h1>￥{{totalMoney/100 | formatMoney}}</h1>
            <p>总金额</p>
          </div>
        </div>
        <!--总价end-->
        <div class="sale_list_title">销售排行榜</div>
        <!--排行榜 start-->
        <van-row class="top_title">
          <van-col span="3">排名</van-col>
          <van-col span="8">名称</van-col>
          <van-col span="8">数量</van-col>
          <van-col span="5">金额(元)</van-col>
        </van-row>
        <div class="top realTimeSale_top" style="background: #fff;margin-top:10px;height:105px;padding-top:10px"   v-for="(item,index) of realTimeSale" :key="index">
          <van-row class="top_item">
            <van-col span="3" v-if="index == 0"><img src="../assets/static/img/1-min.png" alt=""></van-col>
            <van-col span="3" v-else-if="index == 1"><img src="../assets/static/img/2-min.png" alt=""></van-col>
            <van-col span="3" v-else-if="index == 2"><img src="../assets/static/img/3-min.png" alt=""></van-col>
            <van-col span="3" v-else><div class="num_circle">{{index+1}}</div></van-col>
            <van-col span="8" class="text_left">{{item.goods_name}}</van-col>
            <van-col span="8" class="text_none">{{item.ifStandard == 1 ? item.totalSkuNum + '份' : item.totalSkuNum/1000 + '公斤'  }}</van-col>
            <van-col span="5" class="text_none">{{item.totalSkuMoney/100}}</van-col>
          </van-row>
          <van-row class="top_item_bottom">
            <van-col class="bianma text_none" span="12">编码：{{item.sku_id}}</van-col>
            <van-col class="bianmaTime text_none" span="12">{{item.dateStr}}</van-col>
          </van-row>
        </div>
        <!--排行榜 end-->
        </div>
        <div class="no-data-container" v-show="totalMoney == 0 && realTimeSale ==0">
          <no-data></no-data>
        </div>
      </van-tab>
      <van-tab :title="'实时分类销售'">
        <!--总价start-->
        <div class="total_big">
          <div class="total">
            <h1>￥{{totalMoney/100 | formatMoney}}</h1>
            <p>总金额</p>
          </div>
        </div>
        <!--总价end-->
        <div class="sale_list_title">销售排行榜</div>
        <!--销售排行 start-->
        <van-row class="sale_item_1 sale_item_num1">
          <van-col span="4">排行</van-col>
          <van-col span="6">种类</van-col>
          <van-col span="12">销售金额(元)</van-col>
          <van-col span="2"></van-col>
        </van-row>
        <div class="saleBig">
          <van-row class="sale_item" v-for="(item,index) in realCotegorySale" :key="index">
            <router-link :to="{path:'/realTimeCotegoryDetail',query:{cid:item.id,wid:addressCode,name:item.name}}">
              <van-col span="2" v-if="index == 0"><img src="../assets/static/img/1-min.png" alt=""></van-col>
              <van-col span="2" v-else-if="index == 1"><img src="../assets/static/img/2-min.png" alt=""></van-col>
              <van-col span="2" v-else-if="index == 2"><img src="../assets/static/img/3-min.png" alt=""></van-col>
              <van-col span="2" v-else><div class="num_circle">{{index+1}}</div></van-col>
              <van-col span="11" class="text_left_padding">{{item.name}}</van-col>
              <van-col span="9">{{item.money/100}}</van-col>
              <van-col span="2" class="realTimeSale_item_last"><img class="rightImg" src="../assets/static/img/right.png" alt=""></van-col>
            </router-link>
          </van-row>
        </div>
        <!--销售排行 end-->
        <h3 class="top" v-show="echartsArrSer != 0">分类数据</h3>
        <!--echarts start-->
        <div id="myChart_circle" style="width: 100%;height: 220px;background: #fff;"></div>
        <div class="biaoshi" v-show="echartsArrSer != 0">
          <div class="biaoshi1" v-for="(item,index) in echartsArrSer" :key="index">
            <div class="bss" :style="{background:echartsColor[index]}"></div>
            <span>{{item.name}}</span>
          </div>
        </div>
        <div class="gap" v-show="echartsArrSer != 0"></div>
        <!--echarts end-->
        <!--饼状图 start-->
        <!--<div id="myChart_circle" style="width: 100%;height: 220px;background: #fff;" v-show="echartsArrSer != 0"></div>-->
        <!--<div class="gap" style="height: 20px;" v-show="echartsArrSer != 0"></div>-->
        <!--<div class="biaoshi" v-show="echartsArrSer != 0">-->
          <!--<div class="biaoshi1" v-for="(item,index) in echartsArrSer">-->
            <!--<div class="bss" :style="{background:echartsColor[index]}"></div>-->
            <!--<span>{{item.name}}</span>-->
          <!--</div>-->
        <!--</div>-->
        <!--<div class="gap" v-show="echartsArrSer != 0"></div>-->
        <!--饼状图 end-->
      </van-tab>
    </van-tabs>
    <!--底部固定 start-->
    <van-row class="btm">
      <router-link to="/index" class="btm_tab"><img src="../assets/static/img/now.png" alt="">
        <p>实时销售</p></router-link>
      <router-link to="/history" class="btm_tab btm_tab2"><img class="btm_tab_img2"
                                                               src="../assets/static/img/history.png" alt="">
        <p>历史销售</p></router-link>
    </van-row>
    <!--底部固定 end-->
    <van-row class="line realSale_line" v-show="realTimeSale.length != 0"></van-row>
  </div>
</template>

<script>
  import {root,address,totalMoney,realGoodsSlae,realCotegorySale} from '../assets/api/api'
  import '../assets/css/realTimeSale.css';
  import axios from 'axios';
  import noData from '../components/noData/noData';
  import {mapState,mapMutations} from 'vuex'

  const delay = (function() {
    let timer = 0;
    return function(callback, ms) {
      clearTimeout(timer);
      timer = setTimeout(callback, ms);
    };
  })();
  export default {
    name: "realTimeSale",
    components:{
      noData,
    },
    data() {
      return {
        show: false,
        active: '',
        searchCtn:'',
        search:[],
        isShow: false,
        addressList: [],
        searchShow:true,
        address:'',
        addressName: '',
        loading: false,
        totalMoney: '',
        finished: false,
        addressCode: 1,
        cid:'1',
        realTimeSale:[],
        realCotegorySale:[],
        echartsColor: [ '#ffb70d','#3321b4','#ace'],
        echartsArrSer:[]
      }
    },
    computed:{
      ...mapState([
        'address_name'
      ])
    },
    beforeCreate() {
      axios.get(root + address + '?mid=1').then(res => {
        if (res.data.code == 2000) {
          this.addressList = res.data.data;
          this.addressList.shift();
        }
      })
    },
    created() {
      if(this.address_name[1] != undefined && this.address_name[1] != '-1') {
        this.addressCode = this.address_name[1];
      } else {
        this.addressCode = 1
      }
      if(this.address_name[0] != undefined && this.address_name[0] != '所有门店') {
        this.addressName = this.address_name[0];
      } else {
        this.addressName = '永安路店'
      }
    },
    mounted() {
      //获取总销售额
      this.total();
      //实时销售
      this.realSale();
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
      async fetchData(val) {
        axios({
          method: 'get',
          url: root+realGoodsSlae+'?wid='+this._data.addressCode+'&key='+this.searchCtn
        }).then(res => {
          this.realTimeSale = res.data.data
        })
      },
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
        let myChart = this.$echarts.init(document.getElementById('myChart_circle'));             // 绘制图表
        myChart.setOption({
          tooltip: {
            trigger: 'item',
            textStyle:{
              align:'left',
            },
            confine:true,
            extraCssText:'width:200px;height:120px;',
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
      toggle() {
        this.show = !this.show;
      },
      toogle() {
        this.isShow = !this.isShow;
      },
      change(index,title) {
        //echarts绘制
        if (index == 0) {
          this.total();
          this.realSale();
          this.searchShow = true;
        } else if(index == 1) {
          this.realCotegory();
          this.searchShow = false;
          this.echartsArrSer = [];
          this.echarsDate(this.echartsArrSer, this.realCotegorySale);
          this.drawLine(this.echartsArrSer);
        }
      },
      //点击选择门店
      addressItem(item) {
        this.show = false;
        this.addressName = item.name;
        let that = this;
        that._data.addressCode = item.code;
        this.set_address([item.name,item.code])
        this.total();
        this.realSale();
        this.realCotegory();
      },
      //总价
      total() {
        axios.get(root + totalMoney + '?wid=' + this.addressCode).then(res => {
          if (res.data.code == 2000) {
            this.totalMoney = res.data.data;
          }
        });
      },
      allstore() {

      },
      //实时销售
      realSale() {
        //获取实时销售数据
        axios.get(root+realGoodsSlae+'?wid='+this.addressCode).then(res => {
          if(res.data.code == 2000) {
            this.realTimeSale = res.data.data;
            // this.realSale.filter(res => res>0)
          }
        });
      },
      //实时分类
      realCotegory() {
        //获取分类数据
        axios.get(root+realCotegorySale+'?wid='+this.addressCode).then(res => {
          if(res.data.code == 2000) {
            this.realCotegorySale = res.data.data;
            for(let i in this.realCotegorySale) {

            }
            this.echartsArrSer = [];
            this.echarsDate(this.echartsArrSer, this.realCotegorySale);
            this.drawLine(this.echartsArrSer);
          }
        });
      },
      ...mapMutations({
        set_address:'SET_ADDRESS'
      })
    },
  }
</script>

<style scoped>
  canvas {
    height: 800px;
  }
</style>
