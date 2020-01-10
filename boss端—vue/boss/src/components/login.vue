<template>
  <div id="login">
    <div class="tittle login_title">登录</div>
    <div class="login-wrap" v-show="showLogin">
      <h3><img class="logo" src="../assets/static/img/logo.png" alt=""></h3>
      <div class="login_big">
        <input class="input" type="text" placeholder="请输入用户名" v-model.trim="username">
        <input class="input" type="password" placeholder="请输入密码" v-model.trim="password">
        <p class="tishi" v-show="showTishi">{{tishi}}</p>
        <button class="login_btn" @click="login">登&nbsp录</button>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import '../assets/css/login.css'
  import {root,login} from  '../assets/api/api'
  export default{
    data() {
      return{
        showLogin: true,
        showRegister: false,
        showTishi: false,
        tishi: '',
        username: '',
        password: '',
      }
    },

    beforeCreate() {

      // console.log(localStorage['username'])
      // if(localStorage.username == 'admin' && localStorage.password == 'admin123') {
      //   this.$router.replace({path:'/login'});
      // } else {
      //   return
      // }
    },
    created() {
      if(this.username == '' && this.password == '') {
        this.username = localStorage['username']
        this.password = localStorage['password']
      }
    },
    methods:{
      login(){
        if(this.username == "" || this.password == ""){
          this.tishi = "请输入用户名或密码";
          this.showTishi= true;
          setTimeout(() => {
            this.showTishi= false;
          },2000)
        } else {
          let that = this;
          let url = root+login;
          axios({
            method: 'post',
            url:url,
            params: {
              username:that.username,
              password:that.password
            }
          }).then((res)=>{
            if (res.data.code != 2000) {
              that.showTishi = true;
              setTimeout(() => {
                that.showTishi = false
              },2000);
              that.tishi  = res.data.message
            } else {
              localStorage.setItem('username',this.username)
              localStorage.setItem('password',this.password)
              this.$router.replace({path:'/index'});
            }
          })
        }
      }
    },
  }
</script>

<style scoped>
  .logo {
    margin-bottom: 40px;
  }
  .login_btn {
    cursor:pointer;
  }
</style>
