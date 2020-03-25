<template>
  <div id="app"  style="">



    <keep-alive>
        <router-view v-if="$route.meta.keepAlive">
            <!-- 这里是会被缓存的视图组件，比如 page1,page2 -->
        </router-view>
    </keep-alive>
    
    <router-view v-if="!$route.meta.keepAlive">
        <!-- 这里是不被缓存的视图组件，比如 page3 -->
    </router-view>


  </div>
</template>

<script>
    import { setCookie,getCookie,delCookie} from './assets/public/cookie'
  export default {
  name: 'App',
    data(){
      return{

      }
    },

    created() {

    },

    mounted() {
      
    console.log("app.vue")
    
    },

    methods: {
     
    },
 

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
  ::-webkit-scrollbar {
    width: 0rem;
  }
  ::-webkit-scrollbar:horizontal {
    height: 0rem;
  }



  body{
    overflow:auto;   /* 用于 android4+，或其他设备 */
    -webkit-overflow-scrolling:touch;    /* 用于 ios5+ */
    background: #faf7f7 !important;

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

  .creat_club_box{
    background: #f0f0f0 !important;
     box-shadow: 0 0 0.08rem #ccc !important;

  }

 .creat_club{
          border-radius: 0.9rem !important;
          height:1rem !important;
          margin-top:0.15rem !important;
          line-height:1rem !important;
          background: #ff5a57 !important;
  }



  
</style>
