<template>
    <div style="background:#fff;min-height: 100vh;overflow: hidden">

        <div class="login">
            <Header :title="title" :show="show" :backpage="backpage"></Header>

            <div class="form-login">

                <div class="form_title">
                    <div class="form_title2" :class="{'form_title1':go_tit==1}" @click="to_login(1)">验证码</div>
                    <div class="form_title_tip"></div>
                    <div class="form_title2" :class="{'form_title1':go_tit==2}" @click="to_login(2)">密码</div>
                </div>
                <form class="form-login" v-show="go_tit==1">

                    <div class="form-item user">
                        <img :src="logon2" alt="">
                        <div class="abpho"> {{phone}}</div>
                    </div>
                    <div class="form-item psw">
                        <img style="width:0.24rem" :src="logon1" alt="">
                        <input name="code" placeholder="请输入验证码" type="password"  @input="codeinput" v-model="code" @blur="blurEvent"  />
                        <div class="code_tip" @click="sendCode">{{sendCodeButtonTxt}}</div>
                        <span class="phone_tip">{{code_tip}}</span>

                    </div>

                    <div class="form-item psw">
                        <img style="width:0.4rem;height:0.4rem;margin-left:0.06rem" :src="logon3" alt="">
                        <input name="password" placeholder="请输入密码" type="password"  @input="passwordinput" v-model="password" @blur="blurEvent" />
                        <span class="phone_tip">{{password_tip}}</span>
                    </div>

                    <div class="form-item psw">
                        <img style="width:0.4rem;height:0.4rem;margin-left:0.06rem" :src="logon3" alt="">
                        <input name="password1" placeholder="再次输入密码" type="password"  @input="passwordinput1" v-model="password1" @blur="blurEvent" />
                        <span class="phone_tip">{{password1_tip}}</span>
                    </div>

                    <div class="submit-btn">
                        <div class="log_btn" @click="submit">保存</div>
                    </div>


                </form>



                <form class="form-login" v-show="go_tit==2">

                    <!-- <div class="form-item user">
                        <img :src="logon2" alt="">
                        <input name="phonea" type="number" placeholder="请输入手机号"    @input="userMobileInputa" v-model="phonea" @blur="blurEvent" />
                        <span class="phone_tip">{{phone_tipa}}</span>

                    </div> -->


                    <div class="form-item psw">
                        <img style="width:0.24rem"   :src="logon1" alt="">
                        <input name="password" placeholder="请输入旧密码" type="password"  @input="passwordinputa_lod" v-model="passworda_lod" @blur="blurEvent" />
                        <span class="phone_tip">{{password_tipa_lod}}</span>

                    </div>

                    <div class="form-item psw">
                        <img style="width:0.4rem;height:0.4rem;margin-left:0.06rem" :src="logon3" alt="">
                        <input name="password" placeholder="请输入新密码" type="password"  @input="passwordinputa" v-model="passworda" @blur="blurEvent" />
                        <span class="phone_tip">{{password_tipa}}</span>

                    </div>

                     <div class="form-item psw">
                        <img style="width:0.4rem;height:0.4rem;margin-left:0.06rem" :src="logon3" alt="">
                        <input name="password" placeholder="再次输入新密码" type="password"  @input="passwordinput1a" v-model="password1a" @blur="blurEvent" />
                        <span class="phone_tip">{{password1_tipa}}</span>

                    </div>
                    <div class="submit-btn">
                        <div class="log_btn" @click="submit1">保存</div>
                    </div>

                </form>



            </div>
            <!-- <div class="to_tip">
                <div style="text-align: center;font-size: 0.24rem;">收不到验证码？</div>
                <div style="float: left;margin-top:0.3rem;font-size: 0.24rem;">1.请检查是否输入正确的手机号码</div>
                <div style="float: left;margin-top:0.08rem;font-size: 0.24rem;">2.检查手机是否停机</div>

            </div> -->
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
                title:'修改密码',
                show:true,
                backpage:'/login',
                logon2:'./static/img/02log_03.png',
                logon1:'./static/img/02log_06.png',
                logon3:'./static/img/02_login_08.png',
                phone:'',
                code:'',
                phone_tip:'',
                code_tip:'',
                sendCodeButtonTxt: '获取验证码',
                time_limit: 60,
                timer_number: 0,
                is_sending_code : 0,
                verify_key:"verification_code_AkGft5ad8X8F07E",
                verify_code:'123456',
                zhuc:false,
                password:'',
                password_tip:'',
                password1:'',
                 password1_tip:'',
                phonea:'',
                 phone_tipa:'',
                passworda:'',
                password_tipa:'',
                password1a:'',
                 password1_tipa:'',
                 go_tit:1,
                 passworda_lod:'',
                 password_tipa_lod:''
            }
        },
        created() {

            let phone=localStorage.getItem('mobile')
            this.phone=phone.substr(0,3) + "****" + phone.substr(7);

      

        },
        mounted() {

        },
        methods: {
            to_zhuc(){
                let _this=this
              _this.$router.push({ path: '/businessinvitation',query:{company_id:_this.$route.query.company_id}}) // -> /user
            },
            okfall(){
                this.showa=false
            },
            nofall(){
                this.showa=false
            },

            blurEvent () {
                // 将滚动拉到底
                setTimeout(() => {
                    let scrollHeight = document.documentElement.scrollTop || document.body.scrollTop || 0
                    window.scrollTo(0, Math.max(scrollHeight - 1, 0))
                }, 100)
            },



            to_login(e){
                this.go_tit=e

            },
            //获取验证码
            sendCode(){
                let _this=this;
             
                //避免按钮双击
                if (this.is_sending_code === 1) {
                    return false;
                }

   
                if (this.timer_number > 0) {
                    return
                }


                //请求接口
                this.$axios.post("/verificationCodes/me",{
                    // "mobile": this.phone,
                },
                {headers: {
                        'Authorization': localStorage.getItem('token_type') + localStorage.getItem('access_token'),
                    }}
                
                )
                    .then(res=>{

                        if(res.status==200){
                            _this.verify_key=res.data.verify_key;
                            // _this.verify_code=res.data.verify_code;
                            console.log(res)
                            //验证码倒计时
                            var timer_number = this.time_limit;
                            _this.is_sending_code = 1;
                            var timer = setInterval(function () {

                                timer_number -= 1;

                                if (timer_number <= 0) {
                                    _this.sendCodeButtonTxt='获取验证码';
                                    _this.timer_number=0;
                                    _this.is_sending_code = 0;
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
            //判断手机号
            userMobileInput(e){
                let phone = this.phone;
                if (phone==''){
                    this.phone_tip=''
                } else if (phone.length !=11){
                        this.phone_tip= '手机号错误'
                }else{
                    this.phone_tip=''
                }
            },
            //判断验证码
            codeinput(e){
                var code = this.code;
                if (code == '') {
                        this.code_tip=''
                } else if (code.length != 6) {
                        this.code_tip='验证码错误'
                } else {
                    this.code_tip=''

                }
            },


            passwordinput(e){

               if (this.password != '') {
                    this.password_tip= ""
                }
                
                if(this.password.length<6){
                      this.password_tip= "密码不得少于6位"
                } 
  
                if(this.password1!=''&&this.password!=''&&this.password1==this.password){
                     this.password1_tip= ""

                }else{
                     this.password1_tip= "两次密码输入不一致"

                }

                  if (this.password == '') {
                    this.password_tip= ""
                } 

                 if (this.password1 == '') {
                    this.password1_tip= ""
                } 

               
            },

            passwordinput1(e){
  
                if(this.password1!=''&&this.password!=''&&this.password1==this.password){
                     this.password1_tip= ""

                }else{
                     this.password1_tip= "两次密码输入不一致"

                }

                 if (this.password1 == '') {
                    this.password1_tip= ""
                } 

                if (this.password1 != '' && this.password =='') {
                    this.password_tip= "请输入密码"
                } 

            },

            submit(){
                let _this=this;
             
                //密码不能为空
                if (this.code == '') {
                    this.code_tip= "验证码不能为空"
                    return
                } else if (this.code.length !=6) {
                    this.code_tip="验证码错误"
                    return
                }

             //密码不能为空
                if (this.password == '') {
                    this.password_tip= "密码不能为空"
                    return
                }else if(this.password.length<6){
                        this.password_tip= "密码不得少于6位"
                    return
                }
             //密码不能为空
                if (this.password1 == '') {
                    this.password1_tip= "确认密码不能为空"
                    return
                }else if(this.password1!=this.password){
                    this.password1_tip= "两次密码输入不一致2"
                    return
                }

                this.$axios.patch("/passports/reset/1",{
                  //请求参数
                            // "mobile": _this.phone,
                            "verify_code": _this.code,
                            "verify_key": _this.verify_key,
                             "password": _this.password,
                              "password_confirmation": _this.password1,

                   },
                   
                   {headers: {
                        'Authorization': localStorage.getItem('token_type') + localStorage.getItem('access_token'),
                    }})
                    .then(res=>{
                        console.log(res)
                        if(res.status==201){
                            _this.hidea=true;
                            _this.hide_tip='修改成功';
                    
                            setTimeout(function(){
                                _this.hidea=false;
                                 _this.$router.go(-1);
                            },1500)
                        }else{
                            _this.showa=true;
                            _this.show_tip=res.data.message;
                        }
                    })
                    .catch(err=>{
                        _this.showa=true;
                        _this.show_tip='手机号或验证码错误'
                    })



            },
















                passwordinputa_lod(){

                },
               passwordinputa(e){
               if (this.passworda != '') {
                    this.password_tipa= ""
                } 
                 if(this.passworda.length<6){
                      this.password_tipa= "密码不得少于6位"
                } 

                if(this.password1a!=''&&this.passworda!=''&&this.password1a==this.passworda){
                     this.password1_tipa= ""

                }else{
                     this.password1_tipa= "两次密码输入不一致"

                }


                if (this.passworda == '') {
                    this.password_tipa= ""
                } 

                  if (this.password1a == '') {
                    this.password1_tipa= ""
                } 

              


            },

            passwordinput1a(e){
  
                if(this.password1a!=''&&this.passworda!=''&&this.password1a==this.passworda){
                     this.password1_tipa= ""

                }else{
                     this.password1_tipa= "两次密码输入不一致"

                }

                 if (this.password1a == '') {
                    this.password1_tipa= ""
                } 

                   if (this.password1a != '' && this.passworda =='') {
                    this.password_tipa= "请输入密码"
                } 


            },


            submit1(){
                let _this=this;
              

        //密码不能为空
                if (this.passworda_lod == '') {
                    this.password_tipa_lod= "旧密码不能为空"
                    return
                }

             //密码不能为空
                if (this.passworda == '') {
                    this.password_tipa= "新密码不能为空"
                    return
                }

                if(this.passworda.length<6){
                      this.password_tipa= "密码不得少于6位"
                } 
             //密码不能为空
                if (this.password1a == '') {
                    this.password1_tipa= "确认密码不能为空"
                    return
                }
                
                if(this.password1a==this.passworda){
                  
                }else{
                    this.password1_tipa= "两次密码输入不一致"
                    return
                }

                this.$axios.patch("/passports/reset",{
                  //请求参数
                            "password": _this.passworda,
                            "old_password": _this.passworda_lod,
                            "password_confirmation": _this.password1a

                   },
                   {headers: {
                        'Authorization': localStorage.getItem('token_type') + localStorage.getItem('access_token'),
                    }})
                    .then(res=>{
                        console.log(res)
                        if(res.status==201){
                            _this.hidea=true;
                            _this.hide_tip='修改成功';
                         setTimeout(function(){
                                _this.hidea=false;
                                 _this.$router.go(-1);
                            },1500)
                 
                        }else{
                            _this.showa=true;
                            _this.show_tip='原始登录密码错误';
                        }
                    })
                    .catch(err=>{
                        console.log(err)
                        _this.showa=true;
                        _this.show_tip='原始登录密码错误'
                    })



            },



        }

    }
</script>

<style scoped>

    .zhuc{
        width:auto;
        font-size: 0.26rem;
        color: #4d4d4d;
        line-height: 0.3rem;
        margin:auto;
        margin-top:0.3rem;
        text-align: center;

    }

    .zhuc>span{
     font-size: 0.26rem;
      text-decoration: underline;
    }


    input:focus{
        outline: none;
    }

    .login{
        height:auto;
        overflow: hidden;
    }
   .form_title{
       width:5.45rem;
       height:0.94rem;
       margin:auto;
       display: flex;
       justify-content: space-between;
      align-items: center;
      margin-top:0.6rem;
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

    .form-login{
        width:6.12rem;
        height:auto;
        margin:auto;
        margin-top:1rem;
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
        height:0.50rem;
        font-size: 0.3rem;
        line-height:0.50rem;
        border:none;
    }

    .form-item>.abpho{
         display: block;
        width:5.06rem;
        height:0.50rem;
        font-size: 0.3rem;
        line-height:0.50rem;
        border:none;
    }

    .form-item>input::placeholder{
        color: #c8c8c8;
    }

   .form-item>input[name='code']{
       width:3.36rem;
       margin-left:0.7rem;
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
        width:3.8rem;
        height:auto;
        font-size: 0.24rem;
        color: #b3b3b3;
        margin:auto;
        margin-top:12vh;
        margin-bottom:0.5rem;
        overflow: hidden;


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
