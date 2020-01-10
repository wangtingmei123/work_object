<template>
  <div class="hello" style="background:#f7f7f7;">
      <Header :title="title" :show="show" :backpage="backpage"></Header>
      <div class="banner">
          <section class="my-swiper">
              <swiper :options="swiperOption">
                  <swiper-slide  class="my-swp-silde" v-for="(slide, key) in swiperList" :key="key" data-id="slide.id">
                      <img class="my-swp-img" :src="slide" alt="">
                  </swiper-slide>
                  <div class="swiper-pagination" slot="pagination"></div>
              </swiper>
          </section>
      </div>

      <div class="tab_box">
          <div class="tab">
              <div class="tab_select" @click="to_allclub">
                  <img :src="tap1" alt="">
                  <div class="tap_span">俱乐部</div>
              </div>
              <a class="tab_select" style="display: block;text-decoration: none" href="http://shop.xindongguoji.com/h5/">
                  <img :src="tap2" alt="">
                  <div class="tap_span">商城</div>
              </a>
              <div class="tab_select" @click="to_ranklist">
                  <img :src="tap3" alt="">
                  <div class="tap_span">排行</div>
              </div>
              <div class="tab_select" @click="to_my">
                  <img :src="tap4" alt="">
                  <div class="tap_span">我的</div>
              </div>
          </div>
      </div>

      <div class="active_box">
          <div class="active">
              <div class="active_title" @click="to_siginactive">
                  <img class="active_title1" :src="active_title1" alt="">
                  <div class="title_center">即将签到的活动 <span>3天内开始的活动会在这里</span></div>
                  <img class="right_tip" :src="right_tip" alt="">
              </div>
              <div class="act_main" @click="to_detail(1)">
                  <div class="act_main_left">
                      <img :src="act_img" alt="">
                      <div class="act_time">29:28:40</div>
                      <div class="act_time_tip">距离活动倒计时</div>
                  </div>
                  <div class="act_main_right">
                      <div class="act_main_right1">富山雪场线下友谊赛（122期）</div>
                      <div class="act_main_right2">地点:富山滑雪场停车场西侧</div>
                      <div class="act_main_right3">
                          <span>时间：2019-11-20 </span>
                          <span>16:00-18:00</span>
                      </div>
                      <div class="act_main_right4">已报名:20人</div>
                      <div class="act_main_right5">
                          <span>报名费：￥30 </span>
                          <span>保证金：￥3000</span>
                      </div>
                  </div>
              </div>
              <div class="act_main" @click="to_detail(2)">
                  <div class="act_main_left">
                      <img :src="act_img" alt="">
                      <div class="act_time">29:28:40</div>
                      <div class="act_time_tip">距离活动倒计时</div>
                  </div>
                  <div class="act_main_right">
                      <div class="act_main_right1">富山雪场线下友谊赛（122期）</div>
                      <div class="act_main_right2">地点:富山滑雪场停车场西侧</div>
                      <div class="act_main_right3">
                          <span>时间：2019-11-20 </span>
                          <span>16:00-18:00</span>
                      </div>
                      <div class="act_main_right4">已报名:20人</div>
                      <div class="act_main_right5">
                          <span>报名费：￥30 </span>
                          <span>保证金：￥3000</span>
                      </div>
                  </div>
              </div>
          </div>
      </div>

      <div class="club_box">
          <div class="club">
              <div class="active_title" @click="myclub">
                  <img class="active_title1 active_title2" :src="active_title2" alt="">
                  <div class="title_center" style="margin-right:4.5rem">我的俱乐部</div>
                  <img class="right_tip" :src="right_tip" alt="">
              </div>
              <div class="club_main" @click="to_clubindex">
                  <div class="club_main_left">
                      <img :src="club_img" alt="">
                  </div>
                  <div class="club_main_right">
                      <div class="club_main_right1">富山足球俱乐部</div>
                      <div class="club_main_right2">
                          <div class="club_main_right2_tap1">lv18</div>
                          <div class="club_main_right2_tap1">滑雪</div>
                          <div class="club_main_right2_peoper">20252人</div>
                      </div>
                      <div class="club_main_right3">富山足球俱乐部成立于2017年6月24日，建队以来共计参加国内比赛34场，荣获金杯6个，银杯12个...</div>
                  </div>
              </div>
          </div>
      </div>

  </div>
</template>

<script>
    import { setCookie,getCookie,delCookie} from '../assets/public/cookie'
    import Header from './Header'
    import 'swiper/css/swiper.css';
    import { swiper, swiperSlide } from 'vue-awesome-swiper';
    export default {
        components: { swiper, swiperSlide,Header },
    data() {
        return {
            title: '首页',
            show: false,
            backpage: '/index',
            tap1:'./static/img/03index_09.png',
            tap2:'./static/img/03index_11.png',
            tap3:'./static/img/03index_13.png',
            tap4:'./static/img/03index_15.png',
            active_title1:'./static/img/03index_22.png',
            active_title2:'./static/img/03index_33.png',
            right_tip:'./static/img/03index_25.png',
            act_img:'./static/img/03index_29.png',
            club_img:'./static/img/03index_37.png',
            swiperOption: {
                initialSlide: 0,
                autoplay: {
                    autoplay: 1500,
                    disableOnInteraction: false,//放置触摸后自动轮播停止
                },
                pagination: {
                    el: '.swiper-pagination'
                },
                paginationClickable: true,
                loop: true,
            },
            swiperList: ['./static/img/03index_06.png', './static/img/03index_06.png', './static/img/03index_06.png'], // 轮播图数组对象
        }
    },

    created() {

        this.user_get()

    },

    methods: {
            user_get(){
                let _this=this;
                this.$axios.get("/user",{
                    headers: {
                        'Authorization': localStorage.getItem('token_type') + ' '+localStorage.getItem('access_token'),
                    },
                    params: {
                    }
                }).then(res=>{
                    console.log(res)
                    if(res.status==200){
                        console.log(res)
                        localStorage.setItem('is_root',res.data.data.is_root)
                        localStorage.setItem('user_id',res.data.data.id)

                    }else {
                    }
                })
                    .catch(err=>{
                        console.log(err)
                    })
            },

        to_clubindex(){
            this.$router.push({ path: '/clubindex'}) // -> /user
        },
        to_detail(type){
            if(type==1){
                this.$router.push({path:'./activedetailshort'})
            }else if(type==2){
                this.$router.push({path:'./activedetail'})
            }
        },
        to_siginactive(){
            this.$router.push({ path: '/signinactive'}) // -> /user
        },
        to_ranklist(){
            this.$router.push({ path: '/ranklist'}) // -> /user
        },
        to_allclub(){
            this.$router.push({ path: '/allclub'}) // -> /user
        },
        to_my(){
            this.$router.push({ path: '/personalcenter'}) // -> /user
        },
        myclub(){
            this.$router.push({ path: '/myclub'}) // -> /user
        },

        to_foot(){
            this.$router.push({ path: '/select1'}) // -> /user
        },

        to_test2(){
//            this.$router.push({ path: '/test2',query:{name:'router跳转',tip:this.tip}}) // -> /user
            this.$router.push('/test2') // -> /user

        }
    }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

    .club_box{
        width:100%;
        margin-top:0.15rem;
        padding-bottom:0.2rem;
        background: #fff;
    }
    .club{
        width:6.7rem;
        height:auto;
        margin:auto;
    }
    .club>.club_main{
        width:100%;
        height:2rem;
        padding:0.25rem 0;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-top:1px solid #e6e6e6;

    }

    .club>.club_main>.club_main_left{
        width:2rem;
        height: 1.5rem;

    }
    .club>.club_main>.club_main_left>img{
        width:2rem;
        height: 1.5rem;

    }
    .club>.club_main>.club_main_right{
        width:4.52rem;
        height: 1.5rem;
    }
    .club>.club_main>.club_main_right>.club_main_right1{
        width:100%;
        height:0.36rem;
        font-size: 0.26rem;
        line-height:0.36rem;
        font-weight: bold;
        color: #4d4d4d;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
    }

    .club>.club_main>.club_main_right>.club_main_right2{
        width:100%;
        height:0.3rem;
        font-size: 0.22rem;
        line-height:0.3rem;
        color: #999;
        margin-top:0.1rem;
    }

    .club>.club_main>.club_main_right>.club_main_right2>.club_main_right2_tap1{
        width:auto;
        font-size: 0.22rem;
        height:0.26rem;
        line-height:0.28rem;
        border:1px solid #ff5757;
        border-radius: 0.06rem;
        padding:0 0.14rem;
        float: left;
        margin-left:0.14rem;
        color: #ff5757;
        margin-top:0.01rem;

    }

    .club>.club_main>.club_main_right>.club_main_right2>.club_main_right2_tap1:nth-child(1){
        margin-left:0;
    }

    .club>.club_main>.club_main_right>.club_main_right2>.club_main_right2_peoper{
        width:auto;
        font-size: 0.24rem;
        color: #999;
        margin-left:0.2rem;
        height:100%;
        line-height:0.3rem;
        float: left;
    }

    .club>.club_main>.club_main_right>.club_main_right3{
        height:auto;
        width:100%;
        margin-top:0.1rem;
        line-height:0.34rem;
        font-size: 0.24rem;
        color: #4d4d4d;
        overflow: hidden;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;


    }

    .active_box{
        width:100%;
        height:auto;
        margin-top:0.15rem;
        background: #fff;
        padding-bottom:0.2rem;

    }
    .active{
       width:6.7rem;
        height:auto;
        margin:auto;
    }

    .active_title .title_center{
        color: #1a1a1a;
        margin-right:0.56rem;
        font-size: 0.28rem;
        font-weight: bold;

    }
    .active_title .title_center>span{
        color: #a6a6a6;
        font-size: 0.26rem;
        font-weight: normal;
    }

  .active_title{
        width:100%;
        height:0.9rem;
        display: flex;
        justify-content: space-between;
        align-items: center;


    }

   .active_title>.active_title1{
        display: block;
        width:0.34rem;
        height:0.34rem;

    }
    .active_title>.active_title2{
        display: block;
        width:0.36rem;
        height:0.33rem;

    }
    .right_tip{
        display: block;
        width:0.17rem;
        height:0.29rem;
    }
    .act_main{
        width:100%;
        height:3.02rem;
        border-top:1px solid #e6e6e6;
        padding:0.3rem 0;
        box-sizing: border-box;
        display: flex;
        justify-content: space-between;
    }
    .act_main>.act_main_left{
        width:2rem;
        height:100%;

    }

    .act_main>.act_main_left>img{
        width:100%;
        height:1.5rem;
        background: antiquewhite;

    }

    .act_main>.act_main_left>.act_time{
        width:100%;
        height:0.38rem;
        margin-top:0.14rem;
        text-align: center;
        line-height:0.42rem;
        font-size: 0.48rem;
        color: #1a1a1a;
        font-weight: bold;
        font-family: 'DINCondensedC';
    }
    .act_main>.act_main_left>.act_time_tip{
        width:100%;
        height:0.24rem;
        margin-top:0.14rem;
        text-align: center;
        line-height:0.24rem;
        font-size: 0.24rem;
        color: #4d4d4d;
    }
    .act_main>.act_main_right{
        width:4.52rem;
        height:100%;

    }
    .act_main>.act_main_right>.act_main_right1{
        width:100%;
        height:0.36rem;
        font-size: 0.26rem;
        line-height:0.36rem;
        font-weight: bold;
        color: #333333;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;

    }

    .act_main>.act_main_right>.act_main_right2{
        width:100%;
        height:0.36rem;
        font-size: 0.26rem;
        line-height:0.36rem;
        color: #545454;
        margin-top:0.2rem;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
    }
    .act_main>.act_main_right>.act_main_right3{
        width:100%;
        height:0.36rem;
        font-size: 0.26rem;
        line-height:0.36rem;
        color: #545454;
        margin-top:0.18rem;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
        display: flex;
        justify-content: space-between;
    }
    .act_main>.act_main_right>.act_main_right3>span{
        display: block;
        font-size: 0.26rem;
        color: #545454;
    }

    .act_main>.act_main_right>.act_main_right4{
        width:100%;
        height:0.36rem;
        font-size: 0.24rem;
        line-height:0.36rem;
        color: #a6a6a6;
        margin-top:0.18rem;

    }
    .act_main>.act_main_right>.act_main_right5{
        width:100%;
        height:0.36rem;
        font-size: 0.24rem;
        line-height:0.36rem;
        color: #a6a6a6;
        margin-top:0.14rem;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
        display: flex;
        justify-content: space-between;
    }

    .act_main>.act_main_right>.act_main_right5>span{
        display: block;
        font-size: 0.24rem;
        color: #a6a6a6;
    }




    .tab_box{
        width:100%;
        height:1.7rem;
        background: #fff;
    }
    .tab{
        width:7.2rem;
        height:100%;
        margin:auto;
        padding:0.22rem 0;
        box-sizing: border-box;
        display: flex;
        justify-content: space-around;
        align-items: center;
    }
    .tab_select{
        width:0.88rem;
        height:100%;

    }
    .tab_select>img{
        display: block;
        width:0.88rem;
        height:0.88rem;
        background: palegoldenrod;
        border-radius: 0.88rem;

    }
    .tab_select>.tap_span{
        width:100%;
        height:auto;
        font-size: 0.26rem;
        color: #545454;
        text-align: center;
        margin-top:0.12rem;
    }


    .banner{
        width:100%;
        height:3.9rem;
        margin-top:0.88rem;
        position: relative;
    }

    .my-swiper{
        width:100%;
        height:100%;
    }
    .swiper-container{
        height:3.9rem;
    }
    .swiper-slide{
        width:100%;
        height:3.9rem;
    }

    .swiper-slide>img{
        display: block;
        width:100%;
        height:3.9rem;
    }

    .swiper-pagination{
        position: absolute;
        left:0;
        right:0;
        bottom:0.2rem;
        margin:auto;

    }

    .to_foot{
      width:100%;
        height:1rem;
        background: #ccc;
        text-align: center;
        line-height:1rem;
     }
    .hemm{
      width:7.5rem;
        height:1rem;
      background: #ccc;
        line-height:1rem;
    }
    .hemm a{
        width:100%;
        height:1rem;
        background: #ccc;
        line-height:1rem;
        font-size:0.3rem;
        text-align: center;
    }
</style>
