<template>
  <div class="hello" style="min-height: 100vh;background:#fff" >
      <!-- <Header :title="title" :show="show" :backpage="backpage"></Header> -->
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
                  <div class="tap_span_ele">Club</div>
              </div>
              <a class="tab_select" style="display: block;text-decoration: none" href="http://shop.xindongguoji.com/h5/">
                  <img :src="tap2" alt="">
                  <div class="tap_span">商城</div>
                  <div class="tap_span_ele">Shopping</div>
              </a>
              <div class="tab_select" @click="to_ranklist">
                  <img :src="tap3" alt="">
                  <div class="tap_span">排行</div>
                  <div class="tap_span_ele">Ranking</div>
              </div>
              <div class="tab_select" @click="to_my">
                  <img :src="tap4" alt="">
                  <div class="tap_span">我的</div>
                  <div class="tap_span_ele">My</div>
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
                      <div class="act_new_main"  @click="to_detail(item.issue_nums,item.id,item.club_id,item.name,item.club.name)" v-for="(item,index) in act_list_new" :key="index">
                          <div class="act_new_main_img">
                              <img v-show="item.logo_url!=''" v-lazy="item.logo_url" :src="lazyimg" alt="">
                              <img v-show="item.logo_url==''"  :src="lazyimg" alt="">

                          </div>

                          <div class="act_new_main_tap">
                              <!--<div class="club_main_right2_tap1">lv18</div>-->
                              <div class="club_main_right2_tap1">{{item.club.type_name}}</div>
                              <div class="act_new_main_tit">{{item.name}}</div>

                              <div class="club_main_right2_peoper">{{item.members}}人</div>
                          </div>

                      </div>

                  </div>
              </div>

          </div>
      </div>
<!--即将减到的活动-->
      <div class="active_box" style="margin-top:0.92rem">
          <div class="active">
              <div class="active_title" @click="to_siginactive">
                  <!--<img class="active_title1" :src="active_title1" alt="">-->
                  <div class="title_center">即将签到的活动 <span>3天内开始的活动会在这里</span></div>
                  <img class="right_tip" :src="right_tip" alt="">
              </div>
              <div v-if="act_list.length>0">
                <div class="act_main act_main_am" @click="to_detail(item.issue_nums,item.id,item.club_id,item.name,item.club.name)" v-for="(item,index) in act_list" :key="index">
                  <div class="act_main_left">
                       <img v-show="item.logo_url!=''" v-lazy="item.logo_url" :src="lazyimg" alt="">
                       <img v-show="item.logo_url==''"  :src="lazyimg" alt="">
                  </div>
                  <div class="act_main_right">
                      <div class="act_main_right1">{{item.name}}</div>
                      <div class="act_main_right4"> {{item.members}}人</div>
                      <div class="act_main_right6">立即进入</div>
                  </div>
                </div>

              

            </div>
          </div>
      </div>
<!--我加入的俱乐部-->
      <div class="club_box" style="margin-top:0.92rem">
          <div class="club">
              <div class="active_title" @click="myclub">
                  <!--<img class="active_title1 active_title2" :src="active_title2" alt="">-->
                  <div class="title_center" style="margin-right:4.5rem">我的俱乐部</div>
                  <img class="right_tip" :src="right_tip" alt="">
              </div>
              <div style="padding-bottom: 0.5rem" v-if="club_list.length>0">
                   <div class="club_main"  >
                       <div class="club_new_main_float">

                            <div class="club_main_left"  v-for="(item,index) in club_list" :key="index" @click="to_clubindex(item.club.id,item.club.name)" >
                                <div class="img_box">
                            
                                    <img v-show="item.club.logo!=''" v-lazy="item.club.logo" :src="lazyimg" alt="">
                                    <img v-show="item.club.logo==''" :src="lazyimg" alt="">
                                </div>
                                <div class="club_main_left_fl">
                                        <div class="club_main_right2_tap1">{{item.club.type_name}}</div>
                                </div>
                                <div class="club_main_right">
                                    <div class="club_main_right1" @click="to_clubindex(item.club.id,item.club.name)">{{item.club.name}}</div>
                                    <div class="club_main_right2" @click="to_clubindex(item.club.id,item.club.name)">
                                        {{item.club.members}}人
                                    </div>
                                </div>
                            </div>

                           
                       </div>
                    </div>
             </div>
          </div>
      </div>
<!--精选好物-->
      <div class="selection_tit">
          <div class="active_title">
              <!--<img class="active_title1" :src="active_title1" alt="">-->
              <div class="title_center">精选好物</div>
          </div>
      </div>

      <div class="selection_box">
          <div class="selection">
              <div class="selection_fl"></div>
              <div class="select_img">
                  <img :src="select_img" alt="">
              </div>
              <div class="select_tit">Nike 耐克男帽子C13200-129</div>
              <div class="select_price"><span class="span1">￥</span>245.00 <span class="span2">￥248.00</span>    </div>
          </div>
          <div class="selection">
              <div class="selection_fl"></div>
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
                tap1:'./static/img/home_img/mhomea_07.png',
                tap2:'./static/img/home_img/mhomea_09.png',
                tap3:'./static/img/home_img/mhomea_11.png',
                tap4:'./static/img/home_img/mhomea_13.png',
                active_title1:'./static/img/03index_22.png',
                active_title2:'./static/img/03index_33.png',
                right_tip:'./static/img/03index_25.png',
                act_img:'./static/img/03index_29.png',
                club_img:'./static/img/03index_37.png',
                select_img:'./static/img/03selectw_03.png',
                lazyimg:'./static/img/lazyimg.png',
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
                swiperList: ['./static/img/home_img/mhomea_03.jpg', './static/img/bannerb.png'], // 轮播图数组对象
                user_id:'',
                club_list:[],
                act_list:[],
                act_list_new:[],
                banners:[],
                authorizations:null,


                   top: 0,
                state: 0,
                startY: 0,  //保存开始滑动时，y轴位置
                touching: false,
                infiniteLoading: false,
                refreshShow: true,
                infiniteState: true,
                showLoad: false,
                  isFirstEnter:false // 是否第一次进入，默认false
            }
        },

    created() {
         this.isFirstEnter=true;
        
       
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
                            localStorage.setItem('token_type',res.data.token_type);
                            _this.user_get()
                            _this.active_list_new()
                            _this.banner()
                        }else {
                             localStorage.clear()
                          _this.$router.push({path: '/codelog'}) // -> /user

                        }
                    })
                        .catch(err=>{
                             localStorage.clear()
                          _this.$router.push({path: '/codelog'}) // -> /user
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
                        localStorage.setItem('mobile',res.data.data.mobile);

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
                        "is_signee":0,
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

                         "is_apply":1,
                        "is_signee":0,
                        "is_ended":0,
                        "last_id":0

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
        to_detail(issue_nums,id,club_id,name,club_name){

            localStorage.setItem('active_id',id)
            localStorage.setItem('active_name',name)
            localStorage.setItem('issue_nums',issue_nums)
            localStorage.setItem('club_id',club_id)
            localStorage.setItem('club_name',club_name)

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

        },


          touchStart(e) {
            // console.log(1)
            //记录手指触摸位置y轴位置
            this.startY = e.targetTouches[0].pageY
            this.startScroll = this.$el.scrollTop || 0
            //开启滑动记录
            this.touching = true
            },
            touchMove(e) {
            // console.log(2)
            // console.log(e.preventDefault)
            // this.$el.scrollTop = 0 时代表复原在顶部
            // 这里控制是否可以上下拉    代表正在滑动 
            if (this.$el.scrollTop > 0 || !this.touching) {
                return
            }
            //  获取拉取的间隔差   当前移动的y点      初始的y点        初始顶部距离
            let diff = e.targetTouches[0].pageY - this.startY - this.startScroll
            //如果是往上滑的话，就取消事件
            if (diff > 0) e.preventDefault()
            // 对状态进行处理，看是否处于刷新中
            this.top = Math.pow(diff, 0.8) + (this.state === 2 ? this.offset : 0)
            if (this.state === 2) { // in refreshing
                return
            }
            if (this.top >= this.offset) {
                this.state = 1
            } else {
                this.state = 0
            }
            },
            touchEnd(e) {
            // console.log(e)
       
            this.touching = false
            if (this.state === 2) { // in refreshing
                this.state = 2
                this.top = this.offset
                return
            }
            if (this.top >= this.offset) { // do refresh
                this.authtion()
            } else { // cancel refresh
                this.state = 0
                this.top = 0
            }
            },





        
    },
       destroyed(){
        if (this.authorizations) {
            clearInterval(this.authorizations);
        }
    },

        beforeRouteEnter(to, from, next) {
      // 路由导航钩子，此时还不能获取组件实例 `this`，所以无法在data中定义变量（利用vm除外）
      // 参考 https://router.vuejs.org/zh-cn/advanced/navigation-guards.html
      // 所以，利用路由元信息中的meta字段设置变量，方便在各个位置获取。这就是为什么在meta中定义isBack
      // 参考 https://router.vuejs.org/zh-cn/advanced/meta.html
    //   if(from.name=='AllClub'){
    //       to.meta.isBack=true;
    //       //判断是从哪个路由过来的，
    //       //如果是page2过来的，表明当前页面不需要刷新获取新数据，直接用之前缓存的数据即可
    //   }
    // if(from.name=='PersonalCenter'){
    //       to.meta.keepAlive=true;
    //       to.meta.isBack=false;
    //       //判断是从哪个路由过来的，
    //       //如果是page2过来的，表明当前页面不需要刷新获取新数据，直接用之前缓存的数据即可
    //   }

      next();
    },

    activated() {
        let  _this=this
      if(!this.$route.meta.isBack || this.isFirstEnter){
         // 如果isBack是false，表明需要获取新数据，否则就不再请求，直接使用缓存的数据
         // 如果isFirstEnter是true，表明是第一次进入此页面或用户刷新了页面，需获取新数据
        // 把数据清空，可以稍微避免让用户看到之前缓存的数据
        var access_token = localStorage.getItem("access_token")
        var expires_in = localStorage.getItem("expires_in")

          if (access_token == null || expires_in == null) {
                _this.$router.push({path: '/codelog'}) // -> /user
            }else{
                    _this.authtion()
            }
       
     }
     // 恢复成默认的false，避免isBack一直是true，导致下次无法获取数据
     this.$route.meta.isBack=false
     // 恢复成默认的false，避免isBack一直是true，导致每次都获取新数据
     this.isFirstEnter=false;

        
        },

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
        margin-bottom:0.2rem;
    }
    .selection_box>.selection{
        width:3.52rem;
        height:6.1rem;
        background: #fff;
        border-radius: 0.2rem;
        overflow: hidden;
        position: relative;
        margin-bottom: 0.2rem;
    }

    .selection_fl{
        position:absolute;
        top:0;
        left:0;
        width:100%;
        height:100%;
        background: rgba(0,0,0,0.02);

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
        height:0.98rem;
        background: #fff;
        border-radius: 0.1rem;
        margin:auto;
        margin-top:0.2rem;
        padding:0 0.15rem;
        box-sizing: border-box;
    }

    .act_new_main_box{
        width:7.2rem;
        height:4.2rem;
        overflow-x: scroll;
        overflow-y: hidden;
    }


    .act_new_main_box>.act_new_main_float{
        width:auto;
        height:100%;
        white-space:nowrap;
        /* display: flex;
        justify-content: flex-start; */
    }

    .act_new_main_box .act_new_main{
        width:5.67rem;
        height:4.2rem;
        display: inline-block;
        margin-left:0.3rem;
        position: relative;

    }

      .act_new_main_box .act_new_main:nth-child(1){
                  margin-left:0;

      }
       .act_new_main_box .act_new_main:last-child{
                  margin-right:0.3rem;

      }


    .act_new_main_img{
        display: block;
          width:5.67rem;
        height:4.2rem;
        border-radius: 0.2rem;
    }
    .act_new_main_box .act_new_main_img>img{
        display: block;
        width:100%;
        height:100%;
        object-fit:cover;
        border-radius: 0.2rem;
    }

  


    .act_new_main_box .act_new_main .act_new_main_tap{
        width:100%;
        height:4.2rem !important;
        position: absolute;
        top:0;
        left:0;
        border-radius: 0.2rem;
        background: rgba(0,0,0,0.0.05);
        overflow: hidden;

    }

  .act_new_main_box .act_new_main .act_new_main_tap .act_new_main_tit{
        width:5rem;
        height:0.44rem;
        font-size: 0.34rem;
        color: #fff;
        line-height: 0.44rem;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
        margin-left:0.28rem;
        margin-top:0.1rem;
        display: block;
        float:unset;
        margin-top:0.18rem;
        font-weight: bold;
    }

    .act_new_main_box .act_new_main>.act_new_main_tap .club_main_right2_tap1{
        width:0.78rem;
        font-size: 0.26rem;
        height:0.4rem;
        line-height:0.42rem;
        background:#ff5a57;
        border-radius: 0.04rem;
        margin-left:0.28rem;
        margin-top:2.4rem;
        color: #fff;
        text-align: center;

        /*margin-top:0.01rem;*/

    }



    .act_new_main_box .act_new_main>.act_new_main_tap .club_main_right2_peoper{
        width:auto;
        font-size: 0.3rem;
        color: #fff;
        margin-left:0.28rem;
        height:auto;
        line-height:0.32rem;
        margin-top:0.18rem;
        font-weight: bold;

    }


    .club_box{
        width:6.9rem;
        margin:auto;
        background: #fff;

    }
    .club{
        width:6.9rem;
        height:auto;
        margin:auto;
    }

    .club .club_main{
        width:7.2rem;
        height:5rem;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        justify-content: space-between;
        overflow-x: scroll;
        overflow-y:hidden;
    }


    .club .club_main .club_new_main_float{
        width:auto;
        height:100%;
        white-space:nowrap;



    }

    
    .club_main .club_main_left:nth-child(1){
        margin-left:0;
    }
    .club_main .club_main_left:last-child{
        margin-right:0.3rem;
    }

    .club_main .club_main_left{
        width:5.64rem;
        height: 4.64rem;
        border:1px solid #f0f0f0;
        border-radius: 0.1rem;
        position: relative;
        margin-left:0.28rem;
        display: inline-block;


    }
    .club_main .club_main_left>.img_box{
        width:100%;
        height: 3.8rem;
        background: palegoldenrod;
        border:none;
        border-radius: 0.1rem;
    }
    .club_main .club_main_left>.img_box>img{
        display: block;
        width:100%;
        height:100%;
        object-fit: cover;
        border-radius: 0.1rem;

    }


     .club .club_main .club_main_left .club_main_left_fl{
         width:100%;
        height: 3.8rem;
         position:absolute;
         top:0;
         left:0;
         border-radius: 0.1rem;
         background: rgba(0,0,0,0.05);
     }

     .club .club_main .club_main_left_fl .club_main_right2_tap1{
            width: 0.78rem;
            font-size: 0.26rem;
            height: 0.4rem;
            line-height: 0.42rem;
            background: #ff5a57;
            border-radius: 0.04rem;
            margin-left: 0.25rem;
            margin-top: 0.28rem;
            color: #fff;
            text-align: center;
     }


    .club_main .club_main_right{
        width:5.64rem;
        height: 0.84rem;
        display: flex;
        padding:0 0.28rem 0.16rem 0.28rem;
        box-sizing: border-box;
        display: flex;
        justify-content: space-between;


    }

    .club_main .club_main_right .to_join{
        width:1.3rem;
        height:0.5rem;
        background: #ff5a57;
        color: #fff;
        text-align: center;
        line-height:0.5rem;
        border-radius: 0.1rem;
        position: absolute;
        font-size: 0.26rem;
        top:0.12rem;
        right:0;

    }
    .club_main .club_main_right>.club_main_right1{
        width:4rem;
        font-size: 0.32rem;
        color: #1a1a1a;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
        margin-top:0.05rem;
    }

    .club_main .club_main_right>.club_main_right2{
        width:auto;
        font-size: 0.3rem;
        color: #bcbcbc;
        margin-top:0.05rem;

    }

    .club_main .club_main_right>.club_main_right2>.club_main_right2_tap1{
        width:auto;
        font-size: 0.22rem;
        height:0.32rem;
        line-height:0.32rem;
        background:#ff5a57;
        border-radius: 0.06rem;
        padding:0 0.1rem;
        float: left;
        margin-left:0.14rem;
        color: #fff;
        /*margin-top:0.01rem;*/

    }

    .club_main .club_main_right>.club_main_right2>.club_main_right2_tap1:nth-child(1){
        margin-left:0;
    }

    .club_main .club_main_right>.club_main_right2>.club_main_right2_peoper{
        width:auto;
        font-size: 0.22rem;
        color: #999;
        margin-left:0.2rem;
        height:100%;
        line-height:0.32rem;
        float: left;
    }

    .club_main .club_main_right>.club_main_right3{
        height:auto;
        width:100%;
        margin-top:0.3rem;
        line-height:0.4rem;
        font-size: 0.22rem;
        color: #a6a6a6;
        overflow: hidden;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;


    }

    .active_box{
        width:6.9rem;
        height:auto;
        margin:auto;
        margin-top:0.54rem;
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
        font-size: 0.36rem;
        font-weight: bold;

    }
    .active_title .title_center>span{
        color: #aaaaaa;
        font-size: 0.24rem;
        font-weight: normal;
    }

  .active_title{
        width:100%;
        height:0.98rem;
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
        height:4rem;
        box-sizing: border-box;
        border-radius: 0.1rem;
        overflow: hidden;
        position: relative;
        margin-top:0.1rem;
    
    }
    .act_main:nth-child(1){
        margin-top:0;
    }
  

    .act_main>.act_main_left{
        width:100%;
        height:100%;

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
        background: #ff5a57;
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
        color: #ff5a57;
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
        color: #ff5a57;
    }
    .act_main>.act_main_right{
        width:100%;
        height:100%;
        position:absolute;
        top:0;left:0;
        background: rgba(0,0,0,0.0.05);

    }
    .act_main>.act_main_right>.act_main_right1{
        width:80%;
        height:0.78rem;
        font-size: 0.52rem;
        line-height:0.78rem;
        font-weight: bold;
        color: #fff;
        margin:auto;
        margin-top:1.3rem;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
        font-weight: bold;
        text-align: center;


    }

    .act_main>.act_main_right>.act_main_right2{
        width:100%;
        height:0.36rem;
        font-size: 0.24rem;
        line-height:0.36rem;
        color: #a6a6a6;
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
        color: #a6a6a6;
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
        height:0.7rem;
        font-size: 0.32rem;
        line-height:0.7rem;
        color: #fff;
        text-align: center;
        font-weight: bold;

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

    .act_main>.act_main_right>.act_main_right6{

        width:1.76rem;
        height:0.62rem;
        border-radius: 0.62rem;
        background: #fff;
        font-size: 0.26rem;
        color: #1a1a1a;
        text-align: center;
        line-height:0.64rem;
        margin:auto;
        margin-top:0.22rem;
        font-weight: bold;



    }


    .tab_box{
        width:100%;
        height:2.24rem;
        background: #fff;
        border-radius: 0.2rem;
        margin:auto;
        margin-top:0.78rem;
    }
    .tab{
        width:6.58rem;
        height:100%;
        margin:auto;
        box-sizing: border-box;
        display: flex;
        justify-content: space-between;
    }
    .tab_select{
        width:1.3rem;
        height:100%;

    }
    .tab_select>img{
        display: block;
        width:1.3rem;
        height:1.3rem;
        background: palegoldenrod;
        border-radius: 1.3rem;

    }
    .tab_select>.tap_span{
        width:100%;
        height:auto;
        font-size: 0.3rem;
        color: #1a1a1a;
        text-align: center;
        margin-top:0.22rem;
    }

    .tab_select>.tap_span_ele{
        width:100%;
        height:auto;
        font-size: 0.26rem;
        color: #a6a6a6;
        text-align: center;
    }


    .banner{
        width:6.8rem;
        height:4rem;
        position: relative;
        margin:auto;
        margin-top:0.48rem;
        border-radius: 0.1rem;
        overflow: hidden;
    }

    .my-swiper{
        width:100%;
        height:100%;
    }
    .swiper-container{
        height:4rem;
    }
    .swiper-slide{
        width:100%;
        height:4rem;
    }

    .swiper-slide>img{
        display: block;
        width:100%;
        height:4rem;

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



<style>

 .swiper-pagination-bullet{
     width:0.5rem !important;
     height:2px !important;
     margin:0 0 !important;
     border-radius: 2px !important;

 }

 .swiper-pagination-bullet-active{
   background: #fff !important;
   opacity: 0.8 !important;
 }


</style>