<template>
    <div style="background:#fff;min-height: 100vh;overflow: hidden">
        <div class="login">
            <Header :title="title" :show="show" :backpage="backpage"></Header>

            <div class="form-login">

                <div class="form_title">
                    <div class="form_title2" @click="to_codelogin">手机登录</div>
                    <div class="form_title_tip"></div>
                    <div class="form_title1">密码登录</div>
                </div>
                <form class="form-login">

                    <div class="form-item user">
                        <img :src="logon2" alt="">
                        <input name="phone" type="number" placeholder="请填写手机号"    @input="userMobileInput" v-model="phone" @blur="blurEvent" />
                        <span class="phone_tip">{{phone_tip}}</span>

                    </div>
                    <div class="form-item psw">
                        <img style="width:0.24rem" :src="logon1" alt="">
                        <input name="password" placeholder="请填写密码" type="password"  @input="passwordinput" v-model="password" @blur="blurEvent" />
                        <span class="phone_tip">{{password_tip}}</span>

                    </div>
                    <div class="submit-btn">
                        <div class="log_btn" @click="submit">登录</div>
                    </div>

                </form>
            </div>

        </div>

        <Eject  type='alert'  @took='okfall' :showstate='showa' >
            <div slot='text'>{{show_tip}}</div>
        </Eject>
        <div class="hide_tip_box" v-show="hidea">
            <div class="hide_tip">{{hide_tip}}</div>
        </div>

    </div>
</template>


<script>
    import { setCookie,getCookie,delCookie} from '../assets/public/cookie'
    import Eject from './eject'
    import Header from './Header'
    export default {
        components: {
            Header,
            Eject
        },
        name: '',
        data() {
            return {
                hide_tip:'',
                hidea:false,
                showa:false,
                show_tip:'',
                title:'登录',
                show:false,
                backpage:'/login',
                logon2:'./static/img/02log_03.png',
                logon1:'./static/img/02log_06.png',
                phone:'',
                password:'',
                phone_tip:'',
                password_tip:'',
                sendCodeButtonTxt: '获取验证码',
                time_limit: 60,
                timer_number: 0,
                is_sending_code : 0,

            }
        },
        created() {

               if(localStorage.getItem('access_token')!=null){
                  this.$router.push({ path: '/'}) // -> /user

                    return
             }

        },
        mounted() {

        },
        methods: {
            okfall(){
                this.showa=false
            },
            blurEvent () {
                // 将滚动拉到底
                setTimeout(() => {
                    let scrollHeight = document.documentElement.scrollTop || document.body.scrollTop || 0
                    window.scrollTo(0, Math.max(scrollHeight - 1, 0))
                }, 100)
            },
            to_codelogin(){
                this.$router.push({ path: '/codelog'}) // -> /user
            },

            //判断手机号
            userMobileInput(e){
                let phone = this.phone;
                console.log(phone)
                if (phone==''){
                    this.phone_tip=''
                } else if (phone.length !=11){
                    this.phone_tip= '手机号错误'
                }else{
                    this.phone_tip=''
                }


            },
            //判断验证码
            passwordinput(e){
  
                if (this.password != '') {
                    this.password_tip= ""
                    return
                }
            },
            submit(){
                let _this=this
                //手机号校验
                if (this.phone == '') {
                    this.phone_tip= "手机号不能为空"
                    return
                }
                if (this.phone.length != 11) {
                    this.phone_tip= "手机号错误"
                    return
                }

                //密码不能为空
                if (this.password == '') {
                    this.password_tip= "密码不能为空"
                    return
                }



                this.$axios.post("/authorizations",{
                    "mobile": _this.phone,
                    "password": _this.password
                })
                    .then(res=>{
                        if(res.status==200){
                            _this.hidea=true;
                            _this.hide_tip='登录成功';
                    
                            localStorage.setItem('access_token',res.data.access_token);
                            localStorage.setItem('expires_in',res.data.expires_in);
                            localStorage.setItem('token_type',res.data.token_type)

                            setTimeout(function(){
                                _this.hidea=false;
                                _this.$router.push({ path: '/'}) // -> /user
                            },1500)
                        }else{
                            _this.showa=true;
                            _this.show_tip=res.data.message;
                        }

                    })
                    .catch(err=>{
                        _this.showa=true;
                        _this.show_tip='手机号或密码错误'
                    })



            }


        }

    }
</script>

<style scoped>
    input{
        background: none;
    }
    input:focus{
        outline: none;
        background: none;
    }

    .login{
        height:100vh;
    }
    .form_title{
        width:5.45rem;
        height:0.94rem;
        margin:auto;
        margin-top:1.24rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .form_title1{
        width:1.86rem;
        height:100%;
        line-height: 0.94rem;
        border-bottom:0.04rem solid #f7282f;
        color: #f7282f;
        box-sizing: border-box;
        font-size: 0.3rem;
        font-weight: bold;
        letter-spacing: 0.02rem;
        text-align: center;
    }
    .form_title_tip{
        width:1px;
        height:0.57rem;
        background: #e6e6e6;
    }
    .form_title2{
        width:1.86rem;
        line-height: 0.94rem;
        height:100%;
        font-size: 0.3rem;
        color: #545454;
        letter-spacing: 0.02rem;
        text-align: center;
    }



    .form-login{
        width:6.12rem;
        height:auto;
        margin:auto;
        margin-top:1.6rem;
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

    .psw{
        margin-top:0.60rem;
    }

    .form-item>img{
        display: block;
        width:0.22rem;
        height:0.29rem;
        margin-left:0.10rem;

    }

    .form-item>.passimg{
        width:0.24rem;
        margin-left:0.08rem;
    }

    .form-item>input{
        display: block;
        width:5.06rem;
        height:0.30rem;
        font-size: 0.28rem;
        line-height:0.30rem;
        border:none;
    }

    .form-item>input::placeholder{
        color: #c8c8c8;
    }



    .form-item>.code_tip{
        width: 1.6rem;
        height:0.5rem;
        border:1px solid #f7282f;
        border-radius: 0.1rem;
        font-size: 0.22rem;
        text-align: center;
        line-height:0.5rem;
        color: #f7282f;
        /*box-sizing: border-box;*/
        letter-spacing: 0.01rem;


    }

    .submit-btn{
        width:6rem;
        height:0.9rem;
        font-size: 0.32rem;
        margin:auto;
        margin-top:0.92rem;
        position: relative;
    }

    .to_tip{
        width:3.6rem;
        height:auto;
        font-size: 0.24rem;
        color: #b3b3b3;
        margin:auto;
        position: fixed;
        left:0;right:0;bottom:0.7rem;


    }



    .log_btn{
        width:6rem;
        height:0.9rem;
        color: #fff;
        padding:0;
        background: #f7282f;
        box-shadow: 0 0.04rem 0.20rem 0 #ffd3d3;
        border-radius: 0.08rem;
        line-height:0.9rem;
        text-align: center;
        font-size: 0.32rem;
    }

    .to_fangshi{
        width:5.58rem;
        height:0.40rem;
        font-size: 0.24rem;
        line-height:0.40rem;
        color: #b3b3b3;
        margin:auto;
    }

    .to_fangshi>.nl{
        float: left;
    }

    .to_fangshi>.nr{
        float: right;
    }

    button::after{
        border:none;
    }




    .tishi_box{
        width:100%;
        height:100vh;
        position: fixed;
        top:0;
        left:0;
        background: rgba(0, 0, 0, 0.6);
        z-index: 999
    }

    .tishi{
        width:5.80rem;
        height:7.80rem;
        position: absolute;
        top:0;bottom:0;left:0;right:0;
        margin:auto;
        background: #fff;
        border-radius: 0.14rem;
        overflow: hidden;
    }

    .ts_top{
        width:100%;
        height:1rem;
        background: #fec413;
        color: #fff;
        font-size: 0.34rem;
        font-weight: bold;
        text-align: center;
        line-height:1rem;

    }

    .ts_center{
        width:100%;
        height:auto;
        margin:auto;
        margin-top:0.55rem;

    }

    .ts_center>.tsc{
        width:100%;
        height:auto;
        font-size: 0.26rem;
        line-height:0.42rem;

    }




    .tsc_main{
        width:4.50rem;
        margin:auto;
        text-indent:0.02em;
    }



    .tsc_maina{
        text-align: left;
        text-indent:0;
    }

    .ts_but{
        width:2.18rem;
        height:0.70rem;
        font-size: 0.30rem;
        color: #fff;
        text-align: center;
        line-height:0.70rem;
        background: #fec413;
        border-radius: 0.70rem;
        margin:auto;
        /* margin-top: 50rem; */
        position: absolute;
        left:0.50rem;
        bottom:0.50rem;
    }

    .ts_but1{
        width:2.18rem;
        height:0.70rem;
        font-size: 0.30rem;
        color: #fff;
        text-align: center;
        line-height:0.70rem;
        background: #ccc;
        border-radius: 0.70rem;
        margin:auto;
        position: absolute;
        right:0.50rem;
        bottom:0.50rem;
    }





</style>
