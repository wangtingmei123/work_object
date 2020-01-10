<template>
    <div style="background: #f7f7f7;min-height: 100vh;overflow: hidden;">
        <Header :title="title" :show="show" :backpage="backpage"></Header>
        <div class="active_tap">
            <div class="act" :class="{'act_selece':act_selece==''}" @click="select('')">全部</div>
            <div class="act" :class="{'act_selece':act_selece==1}" @click="select(1)">报名中</div>
            <div class="act" :class="{'act_selece':act_selece==2}" @click="select(2)">待签到</div>
            <div class="act" :class="{'act_selece':act_selece==3}" @click="select(3)">已结束</div>
        </div>
        <div class="active_box" ref="opBottomEcharts">
            <div class="active">
                <div class="act_main" @click="to_detail(item.issue_nums)" v-for="(item,index) in act_list">
                    <div class="act_main_left">
                        <img :src="item.logo_url" alt="">
                        <!--<div  class="act_time">29:28:40</div>-->
                        <!--<div class="act_time_tip">距离活动开始</div>-->
                        <div v-show="item.status==0" class="act_buta">报名中</div>
                        <div v-show="item.status==1" class="act_buta">即将开始</div>
                        <div v-show="item.status==2" class="act_buta">待签到</div>
                        <div v-show="item.status==3" class="act_buta">已结束</div>
                    </div>
                    <div class="act_main_right">
                        <div class="act_main_right1">{{item.name}}</div>
                        <div class="act_main_right2">地点:
                            <span v-if="item.address!=''&&item.address!=undefined">{{item.address}}</span>
                            <span v-if="item.address==''||item.address==undefined">长期活动详情可见</span>
                        </div>
                        <div class="act_main_right2">开始时间:
                            <span v-if="item.start_date!=''&&item.start_date!=undefined">{{item.start_date}}</span>
                            <span v-if="item.start_date==''||item.start_date==undefined">长期活动详情可见</span>
                            <!--<span>16:00-18:00</span>-->
                        </div>
                        <div class="act_main_right4">已报名:20人</div>
                        <div class="act_main_right5">
                            <span>报名费：￥{{item.entry_fees/100}} </span>
                            <span>保证金：￥{{item.cash_pledges/100}}</span>
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
                title: '全部活动',
                show: true,
                backpage: '',
                club_img:'./static/img/03index_37.png',
                act_img:'./static/img/03index_29.png',
                act_selece:0,
                page:0,
                clientHeight:'',
                scrollHeight:'',
                page_end:true,
                act_list:[],
                stare:''

            }
        },
        created() {
            this.active_list()
        },
        mounted() {

            this.clientHeight = this.$refs.opBottomEcharts.clientHeight;
            this.scrollHeight=this.$refs.opBottomEcharts.scrollHeight;
            this.$refs.opBottomEcharts.addEventListener('scroll',this.gotoScroll)
        },
        methods: {
            to_detail(issue_nums){

                localStorage.setItem('active_id',id)
                localStorage.setItem('active_name',name)
                localStorage.setItem('issue_nums',issue_nums)
                if(issue_nums==0){
                    this.$router.push({ path: '/activedetailshort',query:{id:id}}) // -> /user
                }else{
                    this.$router.push({ path: '/activedetail',query:{id:id}}) // -> /user
                }
            },
            active_list(){
                console.log(this.page)
                let _this=this;
                this.$axios.get("/activities",{
                    headers: {
                        'Authorization': localStorage.getItem('token_type') + ' '+localStorage.getItem('access_token'),
                    },
                    params: {
                        "club_id":localStorage.getItem('club_id'),
                        "stare":_this.stare,
                        "last_id":_this.page
                    }
                }).then(res=>{
                    console.log(res)
                    if(res.status==200){
                        if(res.data.data.length<15){
                            _this.page_end=false
                        }
                        let act_list=_this.act_list;
                        if(act_list.length==0){
                            act_list=res.data.data
                        }else{
                            act_list.concat(res.data.data);
                        }
                        _this.act_list=act_list;

                    }else {
                        _this.showa=true;
                        _this.show_tip=res.data.message;
                    }
                })
                    .catch(err=>{
                        console.log(err)
                    })
            },
            gotoScroll(){
                console.log("ppp")
                let _this=this
                console.log(this.$refs.opBottomEcharts)
                    let scrollTop=this.$refs.opBottomEcharts.scrollTop;

                    //滚动条到底部的条件:div 到头部的距离 + 屏幕高度 = 可滚动的总高度
                    console.log(scrollTop+"+"+this.clientHeight+"+"+this.scrollHeight)
                    if(scrollTop+this.clientHeight >= this.scrollHeight){
                        if(_this.page_end){
                            let page = _this.page+1;
                            _this.page=page;
                            console.log(_this.page)
                            _this.active_list()
                        }

                    }
            },

            select(tap){
                this.act_selece=tap;
                this.page=0;
                this.status=tap;
                this.act_list=[];
                this.active_list()
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
        height:calc(100vh - 2.15rem);
        margin:auto;

        top:1.95rem;
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

    .act_main>.act_main_right>.act_main_right2>span{
        font-size: 0.26rem;
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
