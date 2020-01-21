<template>
    <div class="invited_box_bg" style="background: #fe5857;height:100vh">
        <Header :title="title" :show="show" :backpage="backpage"></Header>
        <div class="invited_box">
            <div class="invited1">
                <!--<div class="invited1a"><img :src="invited1a" alt=""></div>-->
                <div class="invited1b" style="margin:auto;margin-top:1.2rem">
                    {{club_name}}
                </div>
                <!--<div class="invited1c">-->
                    <!--<div class="invited1c1">lv18</div>-->
                    <!--<div class="invited1c1">足球</div>-->
                <!--</div>-->
                <div class="invited1d" style="margin:auto;margin-top:0.1rem">
                    <!--俱乐部ID：<span>LK313222</span>-->
                </div>
            </div>
            <div class="invited2" style="margin-top:0.6rem">
                <form class="form-login">

                    <div class="form-item user">
                        <img style="height:0.34rem" :src="invited21" alt="">
                        <input name="phone" type="text" placeholder="请输入姓名"    v-model="name" @blur="blurEvent" />
                    </div>
                    <div class="form-item user">
                        <img style="height:0.32rem" :src="invited22" alt="">
                        <input name="phone" type="text" placeholder="请输入部门名称"   v-model="member" @blur="blurEvent" />
                    </div>
                    <div class="form-item user">
                        <img style="height:0.36rem" :src="invited23" alt="">
                        <input name="phone" type="number" placeholder="请输入手机号"   v-model="phone" @blur="blurEvent" />
                    </div>
                    <div class="form-item psw">
                        <img style="height:0.35rem"  :src="invited24" alt="">
                        <input name="code" placeholder="请输入验证码" type="number"   v-model="code" @blur="blurEvent"  />
                        <div class="code_tip" @click="sendCode">{{sendCodeButtonTxt}}</div>

                    </div>


                </form>
            </div>
            <div class="invited3" style="margin-top:0.5rem">
                <img :src="invited3_ewm" alt="">
                <p>1、加入后您可长按识别左侧二维码或在微信中
                    搜索“鑫福利”公众号，点击“关注公众号”。
                    <br>
                    2、关注成功后点击“文体活动”→“俱乐部”。
                    <br>
                    3、使用您刚填写的手机号登录即可。
                </p>
            </div>

            <div class="invited4" @click="submit">
                确定加入
            </div>
            <!--<div class="invited_posit">-->
                <!--<img :src="invited_posit1" class="invited_posit1" alt="">-->
                <!--<img :src="invited_posit2" class="invited_posit2" alt="">-->
            <!--</div>-->
        </div>
        <Eject  type='alert' @took='okfall' :showstate='showa'>
            <span slot='tlt'>提示</span>
            <div slot='text'>{{show_tip}}</div>
        </Eject>
        <div class="hide_tip_box" v-show="hidea">
            <div class="hide_tip">{{hide_tip}}</div>
        </div>
    </div>
</template>


<script>
    import {setCookie,getCookie,delCookie} from '../assets/public/cookie'
    import Eject from './eject'
    import Header from './Header'
    export default {
        components: {
            Header:Header,
            Eject
        },
        name: '',
        data() {
            return {
                title: '邀请加入',
                show: false,
                backpage: '/',
                showa:false,
                show_tip:'',
                hide_tip:'',
                hidea:false,
                invited1a:'./static/img/03index_29.png',
                invited21:'./static/img/08share_10.png',
                invited22:'./static/img/08share_13.png',
                invited23:'./static/img/08share_15.png',
                invited24:'./static/img/08share_17.png',
                invited3_ewm:'./static/img/08share_20.png',
                invited_posit1:'./static/img/08share_03.png',
                invited_posit2:'./static/img/08share_05.png',
                name:'',
                member:'',
                phone:'',
                code:'',
                phone_tip:'',
                code_tip:'',
                name_tip:'',
                member_tip:'',
                sendCodeButtonTxt: '获取验证码',
                time_limit: 60,
                timer_number: 0,
                is_sending_code : 0,
                verify_key:"verification_code_AkGft5ad8X8F07E",
                verify_code:'123456',
                invite_code:"",
                club_name:'',
                company_id:''

            }
        },
        created() {
         let _this=this
         _this.company_id=_this.$route.query.company_id

            this.$axios.post("/invitationCodes",{
                "type":"company", // 邀请类型
                "id":_this.company_id// 可选
            },{headers: {
                'Authorization': localStorage.getItem('token_type') + localStorage.getItem('access_token'),
            }})
                .then(res=>{
                    if(res.status==200){
                        _this.club_name=res.data.company_name;
                        _this.invite_code=res.data.invite_code;
                    }else{
                        _this.showa=true;
                        _this.show_tip=res.data.message;
                        return
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
                this.showa=false;
            },
            blurEvent () {
                // 将滚动拉到底
                setTimeout(() => {
                    let scrollHeight = document.documentElement.scrollTop || document.body.scrollTop || 0
                    window.scrollTo(0, Math.max(scrollHeight - 1, 0))
                }, 100)
            },
            //获取验证码
            sendCode(){
                let _this=this;
                console.log("000")
                if (this.phone == '') {
                    this.showa=true;
                    this.show_tip='手机号不能为空'
                    return

                } else if (this.phone.length != 11){
                    this.showa=true;
                    this.show_tip='手机号错误'
                    return
                }
                //避免按钮双击
                if (this.is_sending_code === 1) {
                    return false;
                }

                // var timer = setInterval(function () {
                //     this.is_sending_code=0;
                //     clearInterval(timer);
                // }, 5000);

                if (this.timer_number > 0) {
                    return
                }


                //请求接口
                this.$axios.post("/verificationCodes",{
                    "mobile": this.phone,
                })
                    .then(res=>{

                        if(res.status==200){
                            _this.verify_key=res.data.verify_key;
                            _this.verify_code=res.data.verify_code;
                            console.log(res)
                            //验证码倒计时
                            var timer_number = this.time_limit;
                            this.is_sending_code = 1;
                            var timer = setInterval(function () {

                                timer_number -= 1;

                                if (timer_number <= 0) {
                                    _this.sendCodeButtonTxt='获取验证码';
                                    _this.timer_number=0;
                                    this.is_sending_code = 0;
                                    return clearInterval(timer);
                                }
                                _this.sendCodeButtonTxt=timer_number + '秒';
                                _this.timer_number= timer_number;
                            }, 1000);
                        }


                    })
                    .catch(err=>{
                        console.log(err)
                    })




            },

            //判断验证码
            submit(){
                console.log("++++1")
                console.log("888")
                console.log(getCookie('access_token'))

                let _this=this
                //姓名校验
                if (this.name ==''){
                    this.showa=true;
                    this.show_tip='姓名不能为空'
                    return
                }
                if (this.name.length >5){
                    this.showa=true;
                    this.show_tip='姓名不能超过五个字符'
                    return
                }
                if (this.name.length <2){
                    this.showa=true;
                    this.show_tip='姓名不能少于两个字符'
                    return
                }

                if (this.member ==''){
                    this.showa=true;
                    this.show_tip='部门不能为空'
                    return
                }



                //手机号校验
                if (this.phone == '') {
                    this.showa=true;
                    this.show_tip='手机号不能为空'
                    return
                }
                if (this.phone.length != 11) {
                    this.showa=true;
                    this.show_tip='手机号错误'
                    return
                }

                //密码不能为空
                if (this.code == '') {
                    this.showa=true;
                    this.show_tip='验证码不能为空'
                    return
                }
//                else if (this.code!=this.verify_code) {
//                    this.showa=true;
//                    this.show_tip='验证码错误'
//                    return
//                }

                this.$axios.post("/users ",{
                    "mobile": _this.phone,
                    "real_name": _this.name,
                    "verify_code": _this.code,
                    "verify_key": _this.verify_key,
                    "invite_code": _this.invite_code,
                    "department": _this.member
                }, {headers: {
                  'Authorization': localStorage.getItem('token_type') + localStorage.getItem('access_token'),
                }})
                    .then(res=>{
                        if(res.status==201){
                            _this.hidea=true;
                            _this.hide_tip='加入成功，待审核';
                            setTimeout(function(){
                                _this.hidea=false;
                            },1500)
                        }else{
                            _this.showa=true;
                            _this.show_tip=res.data.message;
                            return
                        }
                        console.log(res)
                    })
                    .catch(err=>{
                        console.log(err)
                    })



            }
        }

    }
</script>

<style scoped>
    input:focus{
        outline: none;
    }

    .invited_posit{
        width:1.10rem;
        height:0.48rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        position: absolute;
        top:0.15rem;
        right:0.56rem;
    }

    .invited_posit>.invited_posit1{
        display: block;
        width:0.44rem;
        height:0.45rem;
    }
    .invited_posit>.invited_posit2{
        display: block;
        width:0.39rem;
        height:0.45rem;
    }

    .invited4{
        width:6.5rem;
        height:0.88rem;
        background: #fe5857;
        font-size: 0.3rem;
        color: #fff;
        text-align: center;
        margin:auto;
        margin-top:0.54rem;
        line-height: 0.88rem;
        border-radius: 0.1rem;

    }

    .invited3{
        width:100%;
        height:auto;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top:0.3rem;
    }

    .invited3>img{
        display: block;
        width:2.13rem;
        height:2.13rem;

    }
    .invited3>p{
        width: 4.8rem;
        font-size: 0.24rem;
        color: #808080;
        line-height:0.46rem;
        letter-spacing: 0;

    }

    .invited2{
        width:100%;
        height:auto;
        margin-top:0.43rem;
    }

    .form-login{
        width:6.12rem;
        height:auto;
        margin:auto;
        overflow: hidden;

    }

    .form-item{
        width:6.12rem;
        height:0.88rem;
        margin:auto;
        border-bottom:1px solid #e5e5e5;
        position: relative;
        display: flex;
        justify-content: space-between;
        align-items: center;

    }

    .phone_tip{
        display: block;
        width:auto;
        height:0.22rem;
        font-size: 0.22rem;
        position: absolute;
        bottom:-0.30rem;
        line-height:0.22rem;
        color: #ff5a57;
        left:1.08rem;
    }

    /*.psw{*/
    /*margin-top:0.60rem;*/
    /*}*/

    .form-item>img{
        display: block;
        width:0.34rem;
        height:0.34rem;

    }

    .form-item>.passimg{
        width:0.24rem;
        margin-left:0.08rem;
    }

    .form-item>input{
        display: block;
        width:5.6rem;
        height:0.30rem;
        font-size: 0.28rem;
        line-height:0.30rem;
        border:none;
    }

    .form-item>input::placeholder{
        color: #1a1a1a;
    }

    .form-item>input[name='code']{
        width:4.1rem;
        margin-left:0.2rem;
    }

    .form-item>.code_tip {
        width: 1.53rem;
        height: 0.5rem;
        /*border: 1px solid #f7282f;*/
        /*border-radius: 0.1rem;*/
        font-size: 0.26rem;
        text-align: center;
        line-height: 0.5rem;
        color: #f7282f;
        /*box-sizing: border-box;*/
        letter-spacing: 0.01rem;

    }
    .invited_box_bg{
        overflow: hidden;
    }
    .invited_box{
        width:7.1rem;
        /*height:auto;*/
        margin:auto;
        /*margin-top:0.18rem;*/
        /*margin-bottom: 0.28rem;*/
        background: #fff;
        border-radius: 0.1rem;
        margin-top:1.06rem;
        padding-bottom:0.4rem;
        box-sizing: border-box;
        position: relative;
        height:calc(100vh - 1.36rem);
        overflow: scroll;
    }

    .invited1{
        width:100%;
        height:auto;
        overflow: hidden;

    }

    .invited1a>img{
        display: block;
        width:100%;
        height:100%;
        border-radius: 0.08rem;
        object-fit: cover;
    }

    .invited1a{
        width:1.5rem;
        height:1.5rem;
        margin:auto;
        margin-top:0.32rem;
        border-radius: 0.08rem;
        border:0.03rem solid #e6e6e6;
    }

    .invited1b{
        width:100%;
        height:0.3rem;
        font-size: 0.3rem;
        line-height:0.3rem;
        font-weight: bold;
        color: #1a1a1a;
        text-align: center;
        margin-top:0.28rem;
    }

    .invited1c{
        width:100%;
        height:0.3rem;
        color: #1a1a1a;
        margin-top:0.28rem;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .invited1c>.invited1c1{
        display: block;
        width:auto;
        height:auto;
        border:1px solid #fe5857;
        border-radius: 0.06rem;
        line-height:0.3rem;
        font-size: 0.22rem;
        padding:0 0.12rem;
        color: #fe5857;
        margin-left:0.08rem;
        margin-right:0.08rem;
    }

    .invited1d{
        width: 100%;
        height:0.24rem;
        font-size: 0.24rem;
        margin:auto;
        margin-top:0.28rem;
        line-height:0.24rem;
        color: #4d4d4d;
        text-align: center;
    }
    .invited1d>span{
        color: #a5a5a5;
    }
</style>
