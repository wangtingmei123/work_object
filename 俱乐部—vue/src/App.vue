<template>
  <div id="app"  style="">
    <router-view/>

  </div>
</template>

<script>
    import { setCookie,getCookie,delCookie} from './assets/public/cookie'
export default {
  name: 'App',
    data(){
      return{
          authorizations:null
      }
    },

    created() {

    },

    mounted() {
        console.log("app.vue")
        var url=window.location.href;
        console.log(url)
        var access_token = localStorage.getItem("access_token")
        var expires_in = localStorage.getItem("expires_in")
        if (access_token == null || expires_in == null) {
            this.$router.push({path: '/codelogin'}) // -> /user
        }else{
            this.authtion()
        }
    },

    methods: {
        authtion(){
            let _this=this
            var  authorizations = setInterval(function () {

            if (localStorage.getItem("access_token") == null || localStorage.getItem("expires_in") == null) {
                this.$router.push({path: '/codelogin'}) // -> /user
                return
            }else{
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

            }

            },600000)

            _this.authorizations=authorizations;
        }
    },
    destroyed(){
        if (this.authorizations) {
            clearInterval(this.authorizations);
        }
    }

}
</script>

<style>
  @import "./assets/font/stylesheet.css";
  *{
    padding: 0;
    margin:0;
    font-size:0.28rem;
    letter-spacing: 0.01rem;
  }

  body{
    overflow:auto;   /* 用于 android4+，或其他设备 */
    -webkit-overflow-scrolling:touch;    /* 用于 ios5+ */

  }

  .hello{
    overflow: hidden;
  }
  .to_home{
    width:100%;
    height:1rem;
    background: #ccc;
    text-align: center;
    line-height:1rem;
  }

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /*text-align: center;*/
  color: #1a1a1a;
  font-size: 0.28rem;
  width: 7.5rem;margin:auto
}

  .hemm{
    width:7.5rem;
    height:1rem;
    background: #ccc;
    line-height:1rem;
    font-size:0.3rem;
    text-align: center;
    border-bottom:1px solid #fff;
  }

  .hide_tip_box{
    width:100%;height:100vh;
    z-index: 999;
    position: fixed;
    background:rgba(0,0,0,0.7);text-align:center;overflow: hidden;
    top:0;
    left:0;
  }

  .hide_tip_box>.hide_tip{
    width:70%;
    height:0.8rem;
    font-size: 0.28rem;
    font-weight: bold;
    color: #505050;
    text-align: center;
    background: #fff;
    border-radius: 0.1rem;
    position: absolute;
    top:0;left:0;right:0;bottom:0;margin:auto;
    line-height: 0.8rem;
    /*color: #fff;*/
  }
  
  .empty_box{
    display: block;
    width:3.12rem;
    height:4rem;
    position: fixed;
    top:0;
    left:0;
    right:0;
    bottom:0;
    margin:auto;
    
  }
  .empty_box>img{
    display: block;
    width:3.12rem;
    height:3rem;
  }
  .empty_box>.empty_tip{
    width:100%;
    height:auto;
    font-size: 0.28rem;
    color: #ababab;
    margin-top:0.4rem;
    text-align: center;
  }

  .lode_img{
    width:100%;
    height:100vh;
    position: fixed;
    top:0;
    left:0;
    z-index: 9;
    /*background: rgba(0,0,0,0.1);*/
  }

  .lode_img>img{
    display: block;
    width:0.5rem;
    height:0.5rem;
    position: absolute;
    top:0;
    left:0;
    right:0;
    bottom:0;
    margin:auto;
  }
  
</style>
