<template>
  <div class="hello" style="min-height: 100vh">
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
<!--最新活动-->
      <div class="active_box" style="padding-bottom:0">
          <div class="active">
              <div class="active_title" @click="to_newactive">
                  <!--<img class="active_title1" :src="active_title1" alt="">-->
                  <div class="title_center">最新活动</div>
                  <img class="right_tip" :src="right_tip" alt="">
              </div>
              <div class="act_new_main_box" v-if="act_list_new.length>0">
                  <div class="act_new_main_float" >
                      <div class="act_new_main"  :class="{act_main_a1:index==0}" @click="to_detail(item.issue_nums,item.id)" v-for="(item,index) in act_list_new" :key="index">
                          <div class="act_new_main_img">
                              <img :src="item.logo_url" alt="">
                          </div>

                          <div class="act_new_main_tit">{{item.name}}</div>
                          <div class="act_new_main_tap">
                              <!--<div class="club_main_right2_tap1">lv18</div>-->
                              <div class="club_main_right2_tap1">类型</div>
                              <div class="club_main_right2_peoper">{{item.members}}人</div>
                          </div>

                      </div>

                  </div>
              </div>

          </div>
      </div>
<!--即将减到的活动-->
      <div class="active_box">
          <div class="active">
              <div class="active_title" @click="to_siginactive">
                  <!--<img class="active_title1" :src="active_title1" alt="">-->
                  <div class="title_center">即将签到的活动 <span>3天内开始的活动会在这里</span></div>
                  <img class="right_tip" :src="right_tip" alt="">
              </div>
              <div style="padding-bottom: 0.5rem" v-if="act_list.length>0">
                <div class="act_main" :class="{act_main_a1:index==0}" @click="to_detail(item.issue_nums,item.id)" v-for="(item,index) in act_list" :key="index">
                  <div class="act_main_left">
                      <img :src="item.logo_url" alt="">
                      <!--<div  class="act_time">29:28:40</div>-->
                      <!--<div class="act_time_tip">距离活动开始</div>-->
                      <!--<div v-show="item.status==0" class="act_buta">报名中</div>-->
                      <!--<div v-show="item.status==1" class="act_buta">即将开始</div>-->
                      <!--<div v-show="item.status==2" class="act_buta">签到中</div>-->
                      <!--<div v-show="item.status==3" class="act_buta">已结束</div>-->
                  </div>
                  <div class="act_main_right">
                      <div class="act_main_right1">{{item.name}}</div>
                      <div class="act_main_right2">地点:
                          <span v-if="item.address!=''&&item.address!=undefined">{{item.address}}</span>
                          <span v-if="item.address==''||item.address==undefined">长期活动详情可见</span>
                      </div>
                      <div class="act_main_right3">开始时间:
                          <span v-if="item.start_date!=''&&item.start_date!=undefined">{{item.start_date}}</span>
                          <span v-if="item.start_date==''||item.start_date==undefined">长期活动详情可见</span>
                          <!--<span>16:00-18:00</span>-->
                      </div>
                      <!--<div class="act_main_right4">已报名:20人</div>-->
                      <div class="act_main_right5">
                          <span>已报名:{{item.members}}人</span>
                          <span>报名费:￥{{item.entry_fees/100}} </span>
                          <span>保证金:￥{{item.cash_pledges/100}}</span>
                      </div>
                  </div>
              </div>
            </div>
          </div>
      </div>
<!--我加入的俱乐部-->
      <div class="club_box">
          <div class="club">
              <div class="active_title" @click="myclub">
                  <!--<img class="active_title1 active_title2" :src="active_title2" alt="">-->
                  <div class="title_center" style="margin-right:4.5rem">我的俱乐部</div>
                  <img class="right_tip" :src="right_tip" alt="">
              </div>
              <div style="padding-bottom: 0.5rem" v-if="club_list.length>0">
                   <div class="club_main" :class="{club_main_a1:index==0}"  v-for="(item,index) in club_list" :key="index">
                        <div class="club_main_left" @click="to_clubindex(item.club.id,item.club.name)">
                            <img :src="item.club.logo" alt="">
                        </div>
                        <div class="club_main_right">
                            <div class="club_main_right1" @click="to_clubindex(item.club.id,item.club.name)">{{item.club.name}}</div>
                            <div class="club_main_right2" @click="to_clubindex(item.club.id,item.club.name)">
                                <!--<div class="club_main_right2_tap1">lv18</div>-->
                                <div class="club_main_right2_tap1">{{item.club.type_name}}</div>
                                <div class="club_main_right2_peoper">{{item.club.members}}人</div>
                            </div>
                            <div class="club_main_right3" @click="to_clubindex(item.club.id,item.club.name)">{{item.club.explanation}}</div>
                        </div>
                    </div>
             </div>
          </div>
      </div>
<!--精选好物-->
      <div class="selection_tit">
          <div class="active_title" @click="to_siginactive">
              <!--<img class="active_title1" :src="active_title1" alt="">-->
              <div class="title_center">精选好物</div>
          </div>
      </div>

      <div class="selection_box">
          <div class="selection">
              <div class="select_img">
                  <img :src="select_img" alt="">
              </div>
              <div class="select_tit">Nike 耐克男帽子C13200-129</div>
              <div class="select_price"><span class="span1">￥</span>245.00 <span class="span2">￥248.00</span>    </div>
          </div>
          <div class="selection">
              <div class="select_img">
                  <img :src="select_img" alt="">
              </div>
              <div class="select_tit">Nike 耐克男帽子C13200-129</div>
              <div class="select_price"><span class="span1">￥</span>245.00 <span class="span2">￥248.00</span>    </div>
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
                tap1:'./static/img/03index_07.png',
                tap2:'./static/img/03index_09.png',
                tap3:'./static/img/03index_11.png',
                tap4:'./static/img/03index_13.png',
                active_title1:'./static/img/03index_22.png',
                active_title2:'./static/img/03index_33.png',
                right_tip:'./static/img/03index_25.png',
                act_img:'./static/img/03index_29.png',
                club_img:'./static/img/03index_37.png',
                select_img:'./static/img/03selectw_03.png',
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
                swiperList: ['./static/img/03index_03.png', './static/img/03index_03.png', './static/img/03index_03.png'], // 轮播图数组对象
                user_id:'',
                club_list:[],
                act_list:[],
                act_list_new:[],
                banners:[],
                authorizations:null
            }
        },

    created() {

        
        var access_token = localStorage.getItem("access_token")
        var expires_in = localStorage.getItem("expires_in")

          if (access_token == null || expires_in == null) {
                this.$router.push({path: '/codelog'}) // -> /user
            }else{
                    this.user_get()
                    this.active_list_new()
                    this.banner()
                    this.authtion()
            }

    },


    mounted() {

    },


    methods: {

       authtion(){
            let _this=this
                    _this.$axios.put("authorizations/refresh",{},
                        { headers: {
                            'Authorization': localStorage.getItem('token_type') + localStorage.getItem('access_token'),
                        }}).then(res=>{
                        console.log(res)
                        if(res.status==200){
                            localStorage.setItem('access_token',res.data.access_token);
                            localStorage.setItem('expires_in',res.data.expires_in);
                            localStorage.setItem('token_type',res.data.token_type)
                        }else {

                        }
                    })
                        .catch(err=>{
                            console.log(err)
                        })

      

        },

       banner(){
               let _this=this;
                this.$axios.get("/banners",{
                    headers: {
                        'Authorization': localStorage.getItem('token_type') + ' '+localStorage.getItem('access_token'),
                    },
                    params: {
                  
                    }
                }).then(res=>{
                    console.log(res)
                    if(res.status==200){
                        _this.banners=res.data.data;
                    }else {
                        _this.showa=true;
                        _this.show_tip=res.data.message;
                    }
                })
                    .catch(err=>{
                        console.log(err)
                    })
         },

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
                        _this.user_id=res.data.data.id;
                        _this.real_show();
                        _this.active_list();
                        localStorage.setItem('is_root',res.data.data.is_root);
                        localStorage.setItem('user_id',res.data.data.id);
                        localStorage.setItem('company_id',res.data.data.company_id);
                    }else {
                    }
                })
                    .catch(err=>{
                        console.log(err)
                    })
            },
        active_list(){
        
            let _this=this;
                this.$axios.get("/activities",{
                    headers: {
                        'Authorization': localStorage.getItem('token_type') + ' '+localStorage.getItem('access_token'),
                    },
                    params: {
                        "near_days":3,
                        "user_id":_this.user_id,
                        "is_apply":0,
                        "is_signee":1,
                        "is_ended":0,
                        "last_id":0
                    }
                }).then(res=>{
                    console.log(res)
                    if(res.status==200){
                        _this.act_list=res.data.data.slice(0,3);
                    }else {
                        _this.showa=true;
                        _this.show_tip=res.data.message;
                    }
                })
                    .catch(err=>{
                        console.log(err)
                    })

        },
        active_list_new(){
            console.log(this.page)
            let _this=this;
            this.$axios.get("/activities",{
                headers: {
                    'Authorization': localStorage.getItem('token_type') + ' '+localStorage.getItem('access_token'),
                },
                params: {

                }
            }).then(res=>{
                console.log(res)
                if(res.status==200){
                    _this.act_list_new=res.data.data.slice(0,5);
                }else {
                    _this.showa=true;
                    _this.show_tip=res.data.message;
                }
            })
                .catch(err=>{
                    console.log(err)
                })

        },
        real_show(){
            console.log("0000")
            let _this=this;
                this.$axios.get("/user-clubs/"+_this.user_id,{
                    headers: {
                        'Authorization': localStorage.getItem('token_type') + ' '+localStorage.getItem('access_token'),
                    },
                    params: {
//                            last_id:_this.page
                    }
                }).then(res=>{
                    console.log(res)
                    if(res.status==200){
                        _this.club_list=res.data.data.slice(0,3);
                    }else {
                        _this.showa=true;
                        _this.show_tip=res.data.message;
                    }
                })
                    .catch(err=>{
                        console.log(err)
                    })

        },
        to_clubindex(id,name){
            localStorage.setItem('club_id',id)
            localStorage.setItem('club_name',name)
            this.$router.push({ path: '/clubindex',query:{id:id}}) // -> /user

        },
        to_detail(issue_nums,id){

            localStorage.setItem('active_id',id)
            localStorage.setItem('active_name',name)
            localStorage.setItem('issue_nums',issue_nums)
            if(issue_nums==0){
                this.$router.push({ path: '/activedetailshort',query:{id:id}}) // -> /user
            }else{
                this.$router.push({ path: '/activedetail',query:{id:id}}) // -> /user
            }
        },
        to_siginactive(){
            this.$router.push({ path: '/signinactive'}) // -> /user
        },
        to_newactive(){
            this.$router.push({ path: '/newactive'}) // -> /user
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

        to_clubindex(id,name){
            localStorage.setItem('club_id',id)
            localStorage.setItem('club_name',name)
            this.$router.push({ path: '/clubindex',query:{id:id}}) // -> /user

        },

        to_foot(){
            this.$router.push({ path: '/select1'}) // -> /user
        },

        to_test2(){
//            this.$router.push({ path: '/test2',query:{name:'router跳转',tip:this.tip}}) // -> /user
            this.$router.push('/test2') // -> /user

        }
    },
       destroyed(){
        if (this.authorizations) {
            clearInterval(this.authorizations);
        }
    }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

    .selection_box{
        width:7.2rem;
        height:auto;
        margin:auto;
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        margin-top:0.1rem;
        margin-bottom:0.2rem;
    }
    .selection_box>.selection{
        width:3.52rem;
        height:6.1rem;
        background: #fff;
        border-radius: 0.2rem;
        overflow: hidden;
    }

    .selection>.select_img{
        width:3.52rem;
        height:3.52rem;
        margin-top:0.42rem;

    }
    .selection>.select_img>img{
        display: block;
        width:100%;
        height: 100%;
    }

    .selection>.select_tit{
        width:3.12rem;
        height:0.75rem;
        line-height: 0.38rem;
        font-size: 0.26rem;
        color: #222;
        margin:auto;
        margin-top:0.54rem;
    }
    .selection>.select_price{
        width:3.12rem;
        font-size: 0.32rem;
        font-family: DINCondensedC;
        height:0.38rem;
        margin:auto;
        color: #ca0001;
        display: flex;
        align-items: flex-end;
        margin-top:0.06rem

    }
    .selection>.select_price>.span1{
        font-size:0.22rem;
    }
    .selection>.select_price>.span2{
        font-size:0.22rem;
        color: #aaaaaa;
        margin-left:0.54rem;
    }

    .selection_tit{
        width:7.2rem;
        height:1.1rem;
        background: #fff;
        border-radius: 0.1rem;
        margin:auto;
        margin-top:0.2rem;
        padding:0 0.15rem;
        box-sizing: border-box;
    }

    .act_new_main_box{
        width:100%;
        height:3.5rem;
        overflow: scroll;
    }


    .act_new_main_box>.act_new_main_float{
        width:14rem;
        display: flex;
        justify-content: space-between;
    }

    .act_new_main_box .act_new_main{
        width:2.6rem;
        height:3.5rem;
        /*float: left;*/
    }

    .act_new_main_img{
        display: block;
        width:2.6rem;
        height:2rem;
        border-radius: 0.1rem;
    }
    .act_new_main_box .act_new_main_img>img{
        display: block;
        width:100%;
        height:100%;
        object-fit:cover;
        border-radius: 0.1rem;
    }

    .act_new_main_box .act_new_main .act_new_main_tit{
        width:2.6rem;
        height:0.7rem;
        font-size: 0.3rem;
        color: #222;
        line-height: 0.75rem;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
    }


    .act_new_main_box .act_new_main .act_new_main_tap{
        width:100%;
        height:0.32rem;
        font-size: 0.22rem;
        line-height:0.32rem;
        color: #999;
    }



    .act_new_main_box .act_new_main>.act_new_main_tap .club_main_right2_tap1{
        width:auto;
        font-size: 0.22rem;
        height:0.32rem;
        line-height:0.32rem;
        background:#f7282f;
        border-radius: 0.06rem;
        padding:0 0.1rem;
        float: left;
        margin-left:0.14rem;
        color: #fff;
        /*margin-top:0.01rem;*/

    }

    .act_new_main_box .act_new_main>.act_new_main_tap .club_main_right2_tap1:nth-child(1){
        margin-left:0;
    }

    .act_new_main_box .act_new_main>.act_new_main_tap .club_main_right2_peoper{
        width:auto;
        font-size: 0.22rem;
        color: #999;
        margin-left:0.2rem;
        height:100%;
        line-height:0.32rem;
        float: left;
    }


    .club_box{
        width:7.2rem;
        margin:auto;
        margin-top:0.2rem;
        margin-bottom:0.2rem;
        background: #fff;
        border-radius: 0.1rem;

    }
    .club{
        width:6.9rem;
        height:auto;
        margin:auto;
    }

    .club .club_main{
        width:100%;
        height:2rem;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-top:0.5rem;
    }
    .club .club_main_a1{
        margin-top:0;
    }

    .club_main>.club_main_left{
        width:2.2rem;
        height: 2rem;

    }
    .club_main>.club_main_left>img{
        width:2.2rem;
        height: 2rem;
        background: palegoldenrod;
        border:none;
        border-radius: 0.1rem;
    }
    .club_main>.club_main_right{
        width:4.56rem;
        height: 2rem;
        position: relative;
    }

    .club_main>.club_main_right .to_join{
        width:1.3rem;
        height:0.5rem;
        background: #f7282f;
        color: #fff;
        text-align: center;
        line-height:0.5rem;
        border-radius: 0.1rem;
        position: absolute;
        font-size: 0.26rem;
        top:0.12rem;
        right:0;

    }
    .club_main>.club_main_right>.club_main_right1{
        width:100%;
        height:0.36rem;
        font-size: 0.3rem;
        line-height:0.36rem;
        font-weight: bold;
        margin-top:0.08rem;
        color: #1a1a1a;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
    }

    .club_main>.club_main_right>.club_main_right2{
        width:100%;
        height:0.32rem;
        font-size: 0.22rem;
        line-height:0.32rem;
        color: #999;
        margin-top:0.1rem;
    }

    .club_main>.club_main_right>.club_main_right2>.club_main_right2_tap1{
        width:auto;
        font-size: 0.22rem;
        height:0.32rem;
        line-height:0.32rem;
        background:#f7282f;
        border-radius: 0.06rem;
        padding:0 0.1rem;
        float: left;
        margin-left:0.14rem;
        color: #fff;
        /*margin-top:0.01rem;*/

    }

    .club_main>.club_main_right>.club_main_right2>.club_main_right2_tap1:nth-child(1){
        margin-left:0;
    }

    .club_main>.club_main_right>.club_main_right2>.club_main_right2_peoper{
        width:auto;
        font-size: 0.22rem;
        color: #999;
        margin-left:0.2rem;
        height:100%;
        line-height:0.32rem;
        float: left;
    }

    .club_main>.club_main_right>.club_main_right3{
        height:auto;
        width:100%;
        margin-top:0.3rem;
        line-height:0.4rem;
        font-size: 0.22rem;
        color: #4d4d4d;
        overflow: hidden;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;


    }

    .active_box{
        width:7.2rem;
        height:auto;
        margin:auto;
        margin-top:0.2rem;
        background: #fff;
        border-radius: 0.1rem;

    }
    .active{
       width:6.9rem;
        height:auto;
        margin:auto;
    }

    .active_title .title_center{
        color: #1a1a1a;
        margin-right:0.56rem;
        font-size: 0.32rem;
        font-weight: bold;

    }
    .active_title .title_center>span{
        color: #aaaaaa;
        font-size: 0.24rem;
        font-weight: normal;
    }

  .active_title{
        width:100%;
        height:1.1rem;
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
        height:2rem;
        box-sizing: border-box;
        display: flex;
        justify-content: space-between;
        margin-top:0.5rem;
    }
    .act_main_a1{
        margin-top:0;
    }

    .act_main>.act_main_left{
        width:2.2rem;
        height:2rem;

    }

    .act_main>.act_main_left>img{
        width:100%;
        height:100%;
        object-fit: cover;
        background: antiquewhite;
        border-radius: 0.1rem;

    }

    .act_main>.act_main_left>.act_buta{
        width:1.5rem;
        height:0.48rem;
        background: #f7282f;
        color: #fff;
        font-size: 0.28rem;
        text-align: center;
        line-height:0.48rem;
        margin:auto;
        margin-top:0.2rem;
        border-radius: 0.1rem;
    }

    .act_main>.act_main_left>.act_time{
        width:100%;
        height:0.38rem;
        margin-top:0.1rem;
        text-align: center;
        line-height:0.42rem;
        font-size: 0.48rem;
        color: #f7282f;
        font-weight: bold;
        font-family: 'DINCondensedC';
    }
    .act_main>.act_main_left>.act_time_tip{
        width:100%;
        height:0.24rem;
        margin-top:0.08rem;
        text-align: center;
        line-height:0.24rem;
        font-size: 0.24rem;
        color: #f7282f;
    }
    .act_main>.act_main_right{
        width:4.6rem;
        height:100%;

    }
    .act_main>.act_main_right>.act_main_right1{
        width:100%;
        height:0.36rem;
        font-size: 0.3rem;
        line-height:0.36rem;
        font-weight: bold;
        color: #333333;
        margin-top:0.08rem;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;

    }

    .act_main>.act_main_right>.act_main_right2{
        width:100%;
        height:0.36rem;
        font-size: 0.24rem;
        line-height:0.36rem;
        color: #4d4d4d;
        margin-top:0.18rem;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
    }

    .act_main>.act_main_right>.act_main_right2>span{
        font-size: 0.24rem;
    }
    .act_main>.act_main_right>.act_main_right3{
        width:100%;
        height:0.36rem;
        font-size: 0.24rem;
        line-height:0.36rem;
        color: #4d4d4d;
        margin-top:0.05rem;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;

        /*justify-content: space-between;*/
    }
    .act_main>.act_main_right>.act_main_right3>span{
        font-size: 0.24rem;
    }

    .act_main>.act_main_right>.act_main_right4{
        width:100%;
        height:0.36rem;
        font-size: 0.24rem;
        line-height:0.36rem;
        color: #a6a6a6;
        margin-top:0.16rem;

    }
    .act_main>.act_main_right>.act_main_right5{
        width:100%;
        height:0.36rem;
        font-size: 0.2rem;
        line-height:0.36rem;
        color: #a6a6a6;
        margin-top:0.26rem;
        /*overflow: hidden;*/
        /*text-overflow:ellipsis;*/
        /*white-space: nowrap;*/
        display: flex;
        justify-content: space-between;
    }

    .act_main>.act_main_right>.act_main_right5>span{
        display: block;
        font-size: 0.24rem;
        color: #a6a6a6;
    }




    .tab_box{
        width:7.2rem;
        height:2rem;
        background: #fff;
        border-radius: 0.2rem;
        margin:auto;
        margin-top:0.2rem;
    }
    .tab{
        width:7.2rem;
        height:100%;
        margin:auto;
        padding:0.28rem 0.28rem;
        box-sizing: border-box;
        display: flex;
        justify-content: space-between;
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
        margin-top:0.22rem;
    }


    .banner{
        width:7.2rem;
        height:3.5rem;
        position: relative;
        margin:auto;
        margin-top:1.08rem;
    }

    .my-swiper{
        width:100%;
        height:100%;
    }
    .swiper-container{
        height:3.5rem;
    }
    .swiper-slide{
        width:100%;
        height:3.5rem;
    }

    .swiper-slide>img{
        display: block;
        width:100%;
        height:3.5rem;

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
