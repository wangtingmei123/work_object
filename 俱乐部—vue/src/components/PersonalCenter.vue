<template>
    <div style="background: #f7f7f7;min-height: 100vh;overflow: hidden">
        <Header :title="title" :show="show" :backpage="backpage"></Header>
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
                <div class="percen" @click="to_applyrefund">
                    <div class="percen_left">
                        <img style="width: 0.39rem;height:0.33rem;" :src="percen_left2" alt="">
                        <div class="percen_left_title">申请退款</div>
                    </div>
                    <img :src="percen_right" alt="">
                </div>
                <div class="percen">
                    <div class="percen_left">
                        <img style="width: 0.33rem;height:0.36rem;" :src="percen_left3" alt="">
                        <div class="percen_left_title">客服热线：<span style="color: #a6a6a6;font-weight: normal">工作日 早9:00 - 晚6:00</span></div>
                    </div>
                    <!--<img :src="percen_right" alt="">-->
                </div>
            </div>
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
    import Eject from './eject'
    import {setCookie,getCookie,delCookie} from '../assets/public/cookie'
    import Header from './Header'
    export default {
        components: { Header , Eject },
        name: '',
        data() {
            return {
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
                invited_posit2:'./static/img/40my_05.png'
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
                        _this.name=res.data.data.name;
                        _this.department=res.data.data.department;
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

        },
        methods: {
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
                            localStorage.removeItem('access_token')
                            localStorage.removeItem('expires_in')
                            localStorage.removeItem('token_type')
                            _this.$router.push({ path: '/codelogin'}) // -> /user
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
            to_enterpriseaudit(){
                this.$router.push({ path: '/enterpriseaudit'}) // -> /user
            },
            to_businessinvitation(){
                this.$router.push({ path: '/businessinvitation'}) // -> /user
            },
            to_applyrefund(){
                this.$router.push({ path: '/applyrefund'}) // -> /user
            },
            myclub(){
                this.$router.push({ path: '/myclub'}) // -> /user
            },
            myactive(){
                this.$router.push({ path: '/myactive'}) // -> /user
            },
            to_editinformation(){
                this.$router.push({ path: '/editinformation'}) // -> /user
            }
        }

    }
</script>

<style scoped>
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
        background: #ff5757;
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
