<template>
    <div style="background: #f7f7f7;min-height: 100vh;overflow: hidden;">
        <Header :title="title" :show="show" :backpage="backpage"></Header>

        <div class="active_box" ref="opBottomEcharts">
            <div class="active">
                <div class="act_main" @click="to_detail(1)" v-for="(item,index) in active_list">
                    <div class="act_main_left">
                        <img :src="act_img" alt="">
                        <div class="act_time"></div>
                        <div class="act_time_tip">距离活动倒计时</div>
                    </div>
                    <div class="act_main_right">
                        <div class="act_main_right1">{{item.name}}</div>
                        <div class="act_main_right2">地点:富山滑雪场停车场西侧</div>
                        <div class="act_main_right3">
                            <span>时间：2019-11-20 </span>
                            <span>16:00-18:00</span>
                        </div>
                        <div class="act_main_right4">已报名:20人</div>
                        <div class="act_main_right5">
                            <span>报名费：￥30 </span>
                            <span>保证金：￥3000</span>
                        </div>
                    </div>
                </div>

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
                title: '即将签到的活动',
                show: true,
                backpage: '',
                club_img:'./static/img/03index_37.png',
                act_img:'./static/img/03index_29.png',
                act_selece:0,
                page:1,
                clientHeight:'',
                scrollHeight:'',
                active_list:[
                    {'id':1,'name':'富山雪场友谊赛','djs':'2019-12-14 29:28:20'},{'id':2,'name':'富山雪场友谊赛','djs':'2019-12-14 29:28:20'},{'id':3,'name':'富山雪场友谊赛','djs':'2019-12-14 29:28:20'},
                ]
            }
        },
        created() {
            let _this=this;
            var active_list=_this.active_list;

            _this.active_list=active_list;
            this.getpagedata()
        },
        mounted() {

            this.clientHeight = this.$refs.opBottomEcharts.clientHeight;
            this.scrollHeight=this.$refs.opBottomEcharts.scrollHeight;
            window.addEventListener('scroll',this.gotoScroll)
        },
        methods: {

            countTime:  function  (ss) {
                //获取当前时间
                var date = new Date();
                var now = date.getTime();
                //设置截止时间
                var endDate = new Date(ss);
                var end = endDate.getTime();
                //时间差
                var leftTime = end - now;
                //定义变量 d,h,m,s保存倒计时的时间
              var sad=''
                if (leftTime >= 0) {
//                    var d = Math.floor(leftTime / 1000 / 60 / 60 / 24);
                    var h = Math.floor(leftTime / 1000 / 60 / 60);
                    var m = Math.floor(leftTime / 1000 / 60 % 60);
                    var s = Math.floor(leftTime / 1000 % 60);
                    sad=h+''+m+''+s
                }

                return sad;

                //递归每秒调用countTime方法，显示动态时间效果

                setTimeout(this.countTime, 1000);   //1毫秒执行一次，不需要显示毫秒时改为1000
            },

            to_detail(type){
                if(type==1){
                    this.$router.push({path:'./activedetailshort'})
                }else if(type==2){
                    this.$router.push({path:'./activedetail'})
                }
            },
            getpagedata(){
                console.log(this.page)
            },
            gotoScroll(){

                console.log("ppp")
                console.log(this.$refs.opBottomEcharts)
                let scrollTop=this.$refs.opBottomEcharts.scrollTop;

                //滚动条到底部的条件:div 到头部的距离 + 屏幕高度 = 可滚动的总高度
                console.log(scrollTop+"+"+this.clientHeight+"+"+this.scrollHeight)
                if(scrollTop+this.clientHeight >= this.scrollHeight){
                    this.page=2
                    console.log("bbb")
                    console.log("cccc")
                    this.getpagedata()
                }
            },

            select(tap){
                this.act_selece=tap
            }
        },
        destroyed(){
            console.log(this.$refs.opBottomEcharts)
            window.removeEventListener('scroll', this.gotoScroll);
        }
    }
</script>

<style scoped>

    .active_tap{
        width:7.1rem;
        margin:auto;
        height:0.9rem;
        padding:0 0.38rem;
        box-sizing: border-box;
        display: flex;
        justify-content: space-between;
        align-items: center;
        color: #999;
        font-size: 0.32rem;
        background: #fff;
        position: fixed;
        top:1.03rem;left:0;right:0
    }

    .act{
        width:1.3rem;
        height:100%;
        line-height: 0.96rem;
        color: #999;
        font-size: 0.32rem;
        text-align: center;

    }

    .act_selece{
        color: #ff5a57;
        border-bottom:0.02rem solid #ff5a57;
        font-weight: bold;

    }
    .active_box{
        width:7.1rem;
        height:calc(100vh - 1.2rem);
        margin:auto;

        top:1rem;
        position: absolute;
        bottom:0.2rem;
        left:0;
        right:0;
        overflow: scroll;
        /*padding-bottom:0.2rem;*/
        /*margin-top:1.03rem;*/
        /*overflow: hidden;*/
        /*margin-bottom:0.2rem;*/

    }
    .active{
        width:100%;
        box-sizing: border-box;
        height:auto;
        margin:auto;


    }

    .active_title .title_center{
        color: #1a1a1a;
        margin-right:0.56rem;
        font-size: 0.28rem;
        font-weight: bold;

    }
    .active_title .title_center>span{
        color: #a6a6a6;
        font-size: 0.28rem;
        font-weight: normal;
    }

    .active_title{
        width:100%;
        height:0.9rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding:0 0.1rem;
        box-sizing: border-box;


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
    .act_main:nth-child(1){
        margin-top:0
    }
    .act_main{
        width:100%;
        padding:0.22rem 0.34rem;
        height:2.8rem;
        margin-top:0.1rem;
        box-sizing: border-box;
        display: flex;
        justify-content: space-between;
        background: #fff;
    }
    .act_main>.act_main_left{
        width:2rem;
        height:100%;

    }

    .act_main>.act_main_left>img{
        width:100%;
        height:1.5rem;
        background: antiquewhite;

    }

    .act_main>.act_main_left>.act_buta{
        width:1.5rem;
        height:0.48rem;
        background: #ff5757;
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
        color: #ff5757;
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
        color: #ff5757;
    }
    .act_main>.act_main_right{
        width:4.28rem;
        height:100%;

    }
    .act_main>.act_main_right>.act_main_right1{
        width:100%;
        height:0.36rem;
        font-size: 0.26rem;
        line-height:0.36rem;
        font-weight: bold;
        color: #333333;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;

    }

    .act_main>.act_main_right>.act_main_right2{
        width:100%;
        height:0.36rem;
        font-size: 0.26rem;
        line-height:0.36rem;
        color: #545454;
        margin-top:0.16rem;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
    }
    .act_main>.act_main_right>.act_main_right3{
        width:100%;
        height:0.36rem;
        font-size: 0.26rem;
        line-height:0.36rem;
        color: #545454;
        margin-top:0.16rem;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
        display: flex;
        justify-content: space-between;
    }
    .act_main>.act_main_right>.act_main_right3>span{
        display: block;
        font-size: 0.26rem;
        color: #545454;
    }

    .act_main>.act_main_right>.act_main_right4{
        width:100%;
        height:0.36rem;
        font-size: 0.24rem;
        line-height:0.36rem;
        color: #a6a6a6;
        margin-top:0.16rem;

    }
    .act_main>.act_main_right>.act_main_right5{
        width:100%;
        height:0.36rem;
        font-size: 0.24rem;
        line-height:0.36rem;
        color: #a6a6a6;
        margin-top:0.14rem;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
        display: flex;
        justify-content: space-between;
    }

    .act_main>.act_main_right>.act_main_right5>span{
        display: block;
        font-size: 0.24rem;
        color: #a6a6a6;
    }





</style>
