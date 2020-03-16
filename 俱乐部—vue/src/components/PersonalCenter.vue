<template>
    <div style="min-height: 100vh;overflow: hidden">
        <header>
            <div @click="goback" class="goback"><img :src="back" alt=""> </div>
            <div class="title">我的</div>
        </header> 
        <div class="personal_box">
            <div class="personal_top">
                <div class="personal_user">
                    <img :src="user_img" alt="">
                    <div class="personal_user_xinxi">
                        <div class="personal_user_xinxi1">{{name}}</div>
                        <div class="personal_user_xinxi2">{{department}}</div>
                    </div>
                </div>
                <div class="personal_my">
                    <div class="my" @click="myclub">
                        <div class="my_club_num">{{club_count}}</div>
                        <div class="my_club">我加入的俱乐部</div>
                    </div>
                    <div class="my my1" @click="myactive">
                        <div class="my_club_num">{{activity_count}}</div>
                        <div class="my_club">我报名的活动</div>
                    </div>
                </div>
                <div class="invited_posit">
                    <img @click="to_businessinvitation" :src="invited_posit1" class="invited_posit1" alt="">
                    <img @click="to_editinformation" :src="invited_posit2" class="invited_posit2" alt="">
                </div>
            </div>
            <div class="personal_center">
                <div class="percen" @click="to_enterpriseaudit">
                    <div class="percen_left">
                        <img :src="percen_left1" alt="">
                        <div class="percen_left_title">待审核</div>
                    </div>
                    <img :src="percen_right" alt="">
                </div>
                <!-- <div class="percen" @click="to_applyrefund">
                    <div class="percen_left">
                        <img style="width: 0.39rem;height:0.33rem;" :src="percen_left2" alt="">
                        <div class="percen_left_title">申请退款</div>
                    </div>
                    <img :src="percen_right" alt="">
                </div> -->
                <div class="percen">
                    <div class="percen_left">
                        <img style="width: 0.33rem;height:0.36rem;" :src="percen_left3" alt="">
                        <div class="percen_left_title">客服热线：<span style="color: #a6a6a6;font-weight: normal">工作日 早9:00 - 晚6:00</span></div>
                    </div>
                    <!--<img :src="percen_right" alt="">-->
                </div>
            </div>
        </div>

        <div class='share_box' v-show="show_share" @click='hide_share'>
            <img :src="share_a" alt="">
            <div class='share'>点击右上角邀请好友加入企业</div>
        </div>

        <div class="creat_club_box">
            <div class="creat_club" @click="signout()">退出登录</div>
        </div>
        <div class="vscon">v 2.0.0</div>
        <Eject  type='alert'  @took='okfall' :showstate='showa' >
            <div slot='text'>{{show_tip}}</div>
        </Eject>
    </div>
</template>


<script>
    // import wx from 'weixin-js-sdk'
    import Eject from './eject'
    import {setCookie,getCookie,delCookie} from '../assets/public/cookie'
    import Header from './Header'
    export default {
        components: { Header , Eject },
        name: '',
        data() {
            return {
                show_share:false,
                back:'./static/img/03back_03.png',
                activity_count:0,
                club_count:0,
                hide_tip:'',
                hidea:false,
                showa:false,
                show_tip:'',
                title: '我的',
                show: true,
                backpage: '',
                name:'',
                department:'',
                user_img:'./static/img/07club_32.png',
                percen_left1:'./static/img/40my_10.png',
                percen_left2:'./static/img/40my_14.png',
                percen_left3:'./static/img/40my_22.png',
                percen_right:'./static/img/40my_17.png',
                invited_posit1:'./static/img/40my_fenxiang.png',
                invited_posit2:'./static/img/40my_05.png',
                share_a:'./static/img/share_ap.png',
                company_name:''
            }
        },
        created() {
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
                        _this.name=res.data.data.user_name;
                        _this.department=res.data.data.department;
                        _this.company_name=res.data.data.company.name;
                        if(res.data.data.avatar!=''){
                            _this.user_img=res.data.data.avatar
                        }
                        _this.activity_count=res.data.data.activity_count;
                        _this.club_count=res.data.data.club_count;

                    }else {
                        _this.showa=true;
                        _this.show_tip=res.data.message;
                    }
                })
                .catch(err=>{
                   console.log(err)
                })

        },
        mounted() {
            let _this=this;
               var company_id= localStorage.getItem('company_id');
            
               var link='https://club.xindongguoji.com/'+'?#/businessinvitation?company_id='+company_id
              this.$axios.post("wx-share",{
                  url:'https://club.xindongguoji.com/'
              },{headers: {
                'Authorization': localStorage.getItem('token_type') + localStorage.getItem('access_token'),
            }})
                .then(res=>{
                    if(res.status==200){
                            console.log(res)
                            // console.log(Base64.decode(res.data.data))
                            wx.config({
                                debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                                appId: res.data.appId, // 必填，公众号的唯一标识
                                timestamp:res.data.timestamp, // 必填，生成签名的时间戳
                                nonceStr: res.data.nonceStr, // 必填，生成签名的随机串
                                signature: res.data.signature,// 必填，签名
                                jsApiList: ['onMenuShareAppMessage','onMenuShareTimeline','onMenuShareQQ','onMenuShareQZone','onMenuShareWeibo'] // 必填，需要使用的JS接口列表
                            });

                        wx.ready(function(){
                                wx.onMenuShareAppMessage({
                                    title: '邀请加入', // 分享标题
                                    desc:'邀请您加入'+_this.company_name, // 分享描述
                                    link: link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                                    imgUrl: '', // 分享图标
                                    success: function () {
                                        // 设置成功
                                    }

                                })
                                // 自定义“分享到朋友圈”及“分享到QQ空间”按钮的分享内容（1.4.0）最新接口
                                wx.onMenuShareTimeline({
                                    title: '邀请加入', // 分享标题
                                    link: link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                                    imgUrl: '', // 分享图标
                                    success: function () {
                                        // 设置成功
                                    }

                                })
                        })


                        //通过error接口处理失败验证
                        wx.error(function(res){
                            console.log(res)
                            // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
                        });
                  }else{
                  }
            
                })
                .catch(err=>{
                    console.log(err)
                })

    
                            


        },
        methods: {
            goback(){
                    this.$router.push({ path: '/'}) // -> /user
             
            },
          
            okfall(){
                this.showa=false
            },
            signout(){
                let _this=this;

                this.$axios.delete("/authorizations/refresh ",{
                    headers: {
                        'Authorization': localStorage.getItem('token_type') + localStorage.getItem('access_token'),
                    },
                    data: {

                    }
                })
                    .then(res=>{
                        console.log()
                        if(res.status==204){
                            localStorage.clear()
                        
                            _this.$router.push({ path: '/codelog'}) // -> /user
                        }else {
                            _this.showa=true;
                            _this.show_tip=res.data.message;
                        }

                    })
                    .catch(err=>{
                        console.log(err)
                        _this.showa=true;
                        _this.show_tip='退出失败'
                    })
            },
            hide_share(){
              this.show_share=false
            },
            to_enterpriseaudit(){
                this.$router.push({ path: '/enterpriseaudit'}) // -> /user
            },
            to_businessinvitation(){
                this.show_share=true
          
            // this.$router.push({ path: '/businessinvitation',query:{company_id:company_id}}) // -> /user

            },
            to_applyrefund(){
                this.$router.push({ path: '/applyrefund'}) //
            },
            myclub(){
                this.$router.push({ path: '/myclub'}) // 
            },
            myactive(){
                this.$router.push({ path: '/myactive'}) // 
            },
            to_editinformation(){
                this.$router.push({ path: '/editinformation'}) //
            }
        }

    }
</script>

<style scoped>
 header{
        width:7.5rem;
        height:0.88rem;
        position: fixed;
        top:0;
        left:0;
        right:0;
        margin:auto;
        background: #fff;
        z-index: 99;



    }
    header>.title{
        width:100%;
        height:100%;
        font-size:0.32rem;
        line-height:0.88rem;
        text-align: center;
        color: #000;
        letter-spacing:0.01rem;
        font-weight: bold;
    }
    header>.goback{
        position: absolute;
        width:0.18rem;
        height:0.3rem;
        top:0;
        bottom:0;
        margin:auto;
        left:0.3rem;
    }
    header>.goback>img{
        display: block;
        width:100%;
    }


    .share_box{
        width:100%;
        height:100vh;
        background: rgba(0, 0, 0, 0.7);
        z-index: 999999;
        position:fixed;
        top:0;
        left:0;
        
    }

    .share_box>img{
        width:2rem;
        height:2rem;
        position: absolute;
        top:0.2rem;
        right:0.2rem;

    }

     .share_box>.share{
         width:90%;
         text-align: right;
         color: #fff;
         font-size: 0.3rem;
         margin-top:2.5rem;

    }

    .vscon{
        width:100%;
        height:0.2rem;
        background: #f7f7f7;
        position: fixed;
        left:0;
        right:0;
        bottom:0.2rem;
        margin:auto;
        font-size: 0.22rem;
        text-align: center;
        color: #a6a6a6;
        line-height: 0.2rem;

    }

    .creat_club_box{
        width:100%;
        height:1.3rem;
        background: #f7f7f7;
        position: fixed;
        left:0;
        right:0;
        bottom:0.4rem;
        margin:auto;

    }
    .creat_club{
        width:7.1rem;
        height:0.9rem;
        margin:auto;
        margin-top:0.2rem;
        background: #f7282f;
        color: #fff;
        text-align: center;
        line-height:0.9rem;
        font-size: 0.3rem;

        border-radius: 0.1rem;

    }
    .invited_posit{
        width:1.35rem;
        height:0.54rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        position: absolute;
        top:0.3rem;
        right:0.32rem;
    }

    .invited_posit>.invited_posit1{
        display: block;
        width:0.5rem;
        height:0.5rem;
    }
    .invited_posit>.invited_posit2{
        display: block;
        width:0.44rem;
        height:0.44rem;
    }
    .personal_center{
        width:100%;
        height:auto;
    }

    .percen_left{
        width:auto;
        color: #1a1a1a;
        font-size:0.28rem;
        display: flex;
        justify-content: flex-start;

    }
    .percen_left>img{
        display: block;
        width: 0.36rem;
        height:0.37rem;
    }

    .percen_left>.percen_left_title{
        margin-left:0.1rem;
        font-weight: bold;
    }

    .percen{
        width:7.1rem;
        height:1.1rem;
        background: #fff;
        border-radius: 0.1rem;
        padding:0 0.15rem;
        box-sizing: border-box;
        margin:auto;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top:0.2rem;
    }
    .percen>img{
        display: block;
        width:0.11rem;
        height:0.19rem;
    }

    .personal_my>.my{
        width:1.98rem;
        height:100%;
        /*display: flex;*/
        /*align-content: space-between;*/


    }
    .personal_my>.my1{
        width:1.65rem;

    }

    .personal_my>.my>.my_club_num{
        width:100%;
        height:0.44rem;
        font-size: 0.54rem;
        line-height: 0.44rem;
        color: #fff;
        font-family: DINCondensedC;
        text-align: center;
    }

    .personal_my>.my>.my_club{
        width:100%;
        height:0.26rem;
        font-size: 0.24rem;
        line-height: 0.26rem;
        color: #fff;
        text-align: center;
        margin-top:0.14rem;
    }
    .personal_my{
        width:4.38rem;
        height:0.8rem;
        margin:auto;
        margin-top:0.38rem;
        display: flex;
        justify-content: space-between;


    }

    .personal_user{
        width:6.82rem;
        height: 1.22rem;
        margin:auto;
        margin-top:0.56rem;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        color: #fff;
        margin-top:0.56rem;
    }

    .personal_user>img{
        display: block;
        width:1.22rem;
        height:1.22rem;
        border-radius: 1.2rem;
        background: papayawhip;
    }
    .personal_user>.personal_user_xinxi{
        width:auto;
        height:1.22rem;
        margin-left:0.1rem;
    }
    .personal_user>.personal_user_xinxi>.personal_user_xinxi1{
        width:auto;
        height:0.38rem;
        margin-top:0.30rem;
        font-size: 0.38rem;
        line-height:0.38rem;

    }
    .personal_user>.personal_user_xinxi>.personal_user_xinxi2{
        width:auto;
        height:0.26rem;
        margin-top:0.14rem;
        font-size: 0.24rem;
        line-height:0.26rem;

    }

 .personal_box{
     width:100%;
     height:auto;

 }
 .personal_box>.personal_top{
     width:100%;
     height:3.7rem;
     background:linear-gradient(135deg, #ff5a55 0%, #ff7f42 100%);
     margin: auto;
     margin-top:0.88rem;
     overflow: hidden;
     position: relative;
 }


</style>
