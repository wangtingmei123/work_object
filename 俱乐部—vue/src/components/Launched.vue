<template>
    <div style="min-height: 100vh;overflow: hidden">
        <Header :title="title" :show="show" :backpage="backpage"></Header>
        <div class="launched_box">
            <img :src="launched_bg" alt="">
            <div class="launched_title">请选择本次活动类型</div>
            <div class="launched">
                <div class="launched1 " :class="{launched_select:select==1}" @click="launched_select(1)">短期活动</div>
                <div class="launched2" :class="{launched_select:select==2}" @click="launched_select(2)">长期活动</div>
                <div class="launched_but" @click="launched_active">下一步</div>
            </div>
        </div>
    </div>
</template>


<script>
    import Header from './Header'
    export default {
        components: { Header },
        name: '',
        data() {
            return {
                title: '发起活动',
                show: true,
                backpage: '',
                launched_bg:'./static/img/12active_02.jpg',
                select:1
            }
        },
        created() {

        },
        mounted() {

        },
        methods: {
            launched_select(e){
                this.select=e
            },
            launched_active(){
                if(this.select==1){
                    this.$router.push({ path: '/launchedshort',query:{id:0}}) // -> /user
                }
                if(this.select==2){
                    this.$router.push({ path: '/launchedlong',query:{id:0}}) // -> /user
                }
            }
        }

    }
</script>

<style scoped>
  .launched_box{
      width:100%;
      height:calc(100vh - 0.88rem);
      margin-top:0.88rem;
      overflow: hidden;
      position: relative;

  }
  .launched_box>img{
      display: block;
      width:100%;
      height:4.5rem;

  }
    .launched_title{
        width:100%;
        height:0.42rem;
        line-height:0.42rem;
        font-size: 0.4rem;
        color: #fff;
        text-align: center;
        position: absolute;
        top:8vh;
        left:0;
        letter-spacing: 0.02rem;

    }
  .launched{
      width:6.54rem;
      height:8.88rem;
      background: #fff;
      border-radius: 0.15rem;
      margin:auto;
      position: absolute;
      top:18vh;
      left:0;
      right:0;
      box-shadow: 0 0 0.06rem #dfdfdf;
  }
    .launched>.launched1{
        width:4.5rem;
        height:1.7rem;
        margin:auto;
        margin-top:2.1rem;
        font-size: 0.42rem;
        color: #a5a5a5;
        line-height: 1.7rem;
        text-align: center;

    }
  .launched>.launched2{
      width:4.5rem;
      height:1.7rem;
      margin:auto;
      font-size: 0.42rem;
      color: #a5a5a5;
      line-height: 1.7rem;
      text-align: center;

  }

  .launched>.launched_select{
     border-top:1px solid #e6e6e6;
      border-bottom:1px solid #e6e6e6;
      color: #1a1a1a;
      font-weight: bold;

  }

    .launched_but{
        width:5.68rem;
        height:0.9rem;
        background: #fe5857;
        color: #fff;
        border-radius: 0.1rem;
        text-align: center;
        line-height:0.9rem;
        margin:auto;
        margin-top:1.22rem;
        font-size: 0.32rem;

    }
</style>
