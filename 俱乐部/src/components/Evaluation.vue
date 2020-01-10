<template>
    <div style="background: #f7f7f7;min-height:100vh;overflow: hidden">
        <Header :title="title" :show="show" :backpage="backpage"></Header>


        <div class="evaluation_box" ref="opBottomEcharts1">
            <div class="evaluation">
                <div class="eval_right">好评100%</div>
                <div class="eval_left">
                    <div class="evalr1" @click="evaluation_select('')" :class="{eval_select:eval_select==''}">全部 </div>
                    <div class="evalr1" @click="evaluation_select(1)" :class="{eval_select:eval_select==1}">好评<span></span></div>
                    <div class="evalr1" @click="evaluation_select(2)" :class="{eval_select:eval_select==2}">中评<span></span></div>
                    <div class="evalr1" @click="evaluation_select(3)" :class="{eval_select:eval_select==3}">差评<span></span></div>
                </div>
            </div>

            <div class="evaluat" >
                <div class="evaluat_con" v-for="(item,index) in coment_list" >
                    <div class="evaluatcon_title">
                        <div class="evaluation_img">
                            <img v-show="item.user.avatar!=''" :src="item.user.avatar" alt="">
                            <img v-show="item.user.avatar==''" :src="evalu_photo" alt="">
                        </div>
                        <div class="evaluation_user">
                            <div class="evalu_phone">
                                <div class="evalu_phone_left">{{item.user.real_name}}</div>
                            </div>
                            <div class="evalu_score">
                                <div class="evalu_score_left">
                                    <div class="evalu_score_left_xin"  >

                                        <img class="score_select"  :src="evalu_img_select" alt="" >
                                        <img class="score_select"  :src="evalu_img_select" alt="" >
                                        <img class="score_select"  :src="evalu_img_select" alt="" >

                                    </div>
                                </div>
                                <div class="evalu_score_right">
                                    {{item.created_at}}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="evaluatcon_main">{{item.content}}</div>
                </div>
                <div class="evaluat_con" >
                    <div class="evaluatcon_title">
                        <div class="evaluation_img"><img :src="evalu_photo" alt=""></div>
                        <div class="evaluation_user">
                            <div class="evalu_phone">
                                <div class="evalu_phone_left">王丽坤</div>
                            </div>
                            <div class="evalu_score">
                                <div class="evalu_score_left">
                                    <div class="evalu_score_left_xin"  >

                                        <img class="score_select"  :src="evalu_img_select" alt="" >
                                        <img class="score_select"  :src="evalu_img_select" alt="" >
                                        <img class="score_select"  :src="evalu_img_select" alt="" >

                                    </div>
                                </div>
                                <div class="evalu_score_right">
                                    2019-10-19
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="evaluatcon_main">啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊</div>
                </div>

            </div>


            <!--<div class="eval_emty" >-->
                <!--<img :src="no_evaluationa" alt="">-->
                <!--<div class="eval_tip">暂时还没有评价哦</div>-->
            <!--</div>-->

        </div>
    </div>
</template>


<script>
    import Header from './Header'
    export default {
        components:{
            Header
        },
        name: '',
        data() {
            return {
                title: '全部评价',
                show: true,
                backpage: '',
                eval_select:4,
                evalu_img:'./static/img/30evalu_05.png',
                evalu_img_select:'./static/img/30evalu_03.png',
                evalu_photo:'./static/img/07club_32.png',
                no_evaluationa:'./static/img/no_evaluationa.png',
                clientHeight:'',
                scrollHeight:'',
                page_end:true,
                page:0,
                coment_list:[],
                global_eval:'',
                rank_list:[1,2,3,4,5]
            }
        },
        created() {
            this.real_show()
        },
        mounted() {
            this.clientHeight = this.$refs.opBottomEcharts1.clientHeight;
            this.scrollHeight=this.$refs.opBottomEcharts1.scrollHeight;
            this.$refs.opBottomEcharts1.addEventListener('scroll',this.gotoScroll)
        },
        methods: {
            gotoScroll(){
                let _this=this
                console.log("ppp")
                let scrollTop=_this.$refs.opBottomEcharts1.scrollTop;
                //滚动条到底部的条件:div 到头部的距离 + 屏幕高度 = 可滚动的总高度
                console.log(scrollTop+"+"+_this.clientHeight+"+"+_this.scrollHeight)
                if(scrollTop+_this.clientHeight >= _this.scrollHeight){

                    if(_this.page_end){
                        let page = _this.page+1;
                        _this.page=page;
                        console.log(_this.page)
                        _this.real_show()
                    }

                }
            },
            real_show(){
                let _this=this;

                this.$axios.get("/activity-comments",{
                    headers: {
                        'Authorization': localStorage.getItem('token_type') + ' '+localStorage.getItem('access_token'),
                    },
                    params: {
                        "act_id":localStorage.getItem('active_id'),
                        "global_eval":_this.global_eval,
                        "last_id":_this.page
                    }
                }).then(res=>{
                    console.log(res)
                    if(res.status==200){
                        console.log(res)

                        if(res.data.length<15){
                            _this.page_end=false
                        }
                        let coment_list=_this.coment_list;
                        if(coment_list.length==0){
                            coment_list=res.data
                        }else{
                            coment_list.concat(res.data);
                        }

                        _this.coment_list=coment_list;
                    }else {

                    }
                })
                    .catch(err=>{
                        console.log(err)
                    })
            },
            evaluation_select(e){
                this.eval_select=e;
                this.page=0;
                this.global_eval=e;
                this.coment_list=[];
                this.real_show()
            }
        }

    }
</script>

<style scoped>

    .loading-more{
        font-size: 0.26rem;
    }
    .evaluation_box{
        width:100%;
        height:auto;

    }

    .evaluation{
        width:100%;

        height:2rem;
        background: #fff;
        position: fixed;
        top:0.88rem;
        border-top:1px solid #f7f7f7;
        box-sizing: border-box;
        left:0;
        z-index: 999;
    }

    .evaluation>.eval_right{
        width:100%;
        height:0.9rem;
        text-align: right;
        line-height: 0.9rem;
        border-bottom:1px solid #f7f7f7;
        box-sizing: border-box;
        padding:0 0.15rem;

    }

    .eval_left{
        display: flex;
        justify-content: space-around;
        align-items: center;
        width:100%;
        height:1.1rem;

    }

    .eval_left>.evalr1{
        display: block;
        width:1.58rem;
        height:0.56rem;
        border-radius: 0.56rem;

        text-align: center;
        line-height:0.56rem;
        font-size: 0.28rem;
        color: #545454;
        background: #fcf0f0;
    }

    .eval_left>.evalr1>span{
        font-size: 0.26rem;
        color: #1a1a1a;
    }

    .eval_right{
        height:100%;
        line-height: 44px;
        font-size: 0.28rem;
        padding-right:0.35rem;
        float: right;
    }

    .eval_left> .eval_select{
        outline: none;
        background: #fe5857;
        box-sizing: border-box;
        line-height:0.56rem;
        color: #fff;
    }
    .eval_left> .eval_select>span{
        color: #fff;
    }

    .evaluat{
        width:100%;
        margin-top:2.98rem;
        height:calc(100vh - 2.98rem);
        overflow: scroll;

    }

    .evaluat_con:nth-child(1){
        margin-top:0
    }

    .evaluat_con{
        width:100%;
        height:auto;
        padding:0.28rem 0.35rem;
        box-sizing: border-box;
        margin:auto;
        background: #fff;
        margin-top:0.1rem;
    }

    .evaluatcon_title{
        width:100%;
        height:1rem;
        overflow: hidden;
    }
    .evaluatcon_title>.evaluation_img{
        width:1rem;
        height:1rem;
        border-radius: 1rem;
        background: #ccc;
        float: left;

    }
    .evaluatcon_title>.evaluation_img>img{
        display: block;
        width:100%;
        height:100%;


    }

    .evaluatcon_title>.evaluation_user{
        width:5.6rem;
        height:0.6rem;
        float: right;
    }

    .evaluatcon_title>.evaluation_user>.evalu_phone{
        width:100%;
        height:0.6rem;
        font-size: 0.28rem;
        color: #1a1a1a;

    }
    .evaluatcon_title>.evaluation_user>.evalu_phone>.evalu_phone_left{
        width:auto;
        height: 0.6rem;
        line-height:0.6rem;
        font-size: 0.28rem;
    }


    .evaluatcon_title>.evaluation_user>.evalu_score{
        width:100%;
        height:0.28rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .evaluatcon_title>.evaluation_user>.evalu_score>.evalu_score_left{
        width:1.4rem;
        height:100%;

    }

    .evaluatcon_title>.evaluation_user>.evalu_score>.evalu_score_left>.evalu_score_left_xin{
        width:100%;
        height:0.23rem;
        /*display: flex;*/
        /*align-items: center;*/
        /*justify-content: space-between;*/

    }
    .evaluatcon_title>.evaluation_user>.evalu_score>.evalu_score_left>.evalu_score_left_xin>img{
        display: block;
        width:0.24rem;
        height:0.23rem;
        float:left;
        margin-left:0.04rem;
    }

    .evaluatcon_title>.evaluation_user>.evalu_score>.evalu_score_right{
        float: right;
        width:3.45rem;
        height:0.28rem;
        line-height:0.28rem;
        font-size: 0.24rem;
        color: #bfbfbf;
        margin-right:0.1rem;
        text-align: right;

    }

    .evaluatcon_main{
        width:100%;
        height:auto;
        font-size: 0.28rem;
        line-height:0.42rem;
        color: #4d4d4d;
        padding: 0 0.15rem;
        box-sizing: border-box;
        margin-top:0.14rem;

    }

    .eval_emty{
        width:100%;
        height:auto;
        margin-top:1rem;
        background: #f5f5f5;

    }

    .eval_emty>img{
        display: block;
        width:3rem;
        height:3rem;
        margin:auto;
        margin-top:32vh;

    }

    .eval_emty>.eval_tip{
        width:100%;
        /*margin-top:0.2rem;*/
        text-align: center;
        font-size: 0.3rem;

    }
</style>
