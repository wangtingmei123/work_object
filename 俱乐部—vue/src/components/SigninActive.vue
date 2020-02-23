<template>
    <div style="min-height: 100vh;overflow: hidden;">
        <Header :title="title" :show="show" :backpage="backpage"></Header>

        <div class="active_box" ref="opBottomEcharts" @scroll="gotoScroll()">
            <div class="active">
                <div class="act_main" @click="to_detail(item.issue_nums,item.id,item.club_id)" v-for="(item,index) in act_list" :key="index">
                    <div class="act_main_left">
                        <img :src="item.logo_url" alt="">
                        <!--<div  class="act_time">29:28:40</div>-->
                        <!--<div class="act_time_tip">距离活动开始</div>-->
                        <!--<div v-show="item.status==0" class="act_buta">报名中</div>-->
                        <!--<div v-show="item.status==1" class="act_buta">即将开始</div>-->
                        <!--<div v-show="item.status==2" class="act_buta">签到中</div>-->
                        <!--<div v-show="item.status==3" class="act_buta">已结束</div>-->
                    </div>
                    <div class="act_main_right">
                        <div class="act_main_right1">{{item.name}}</div>
                        <div class="act_main_right2">地点:
                            <span v-if="item.address!=''&&item.address!=undefined">{{item.address}}</span>
                            <span v-if="item.address==''||item.address==undefined">长期活动详情可见</span>
                        </div>
                        <div class="act_main_right3">开始时间:
                            <span v-if="item.start_date!=''&&item.start_date!=undefined">{{item.start_date}}</span>
                            <span v-if="item.start_date==''||item.start_date==undefined">长期活动详情可见</span>
                            <!--<span>16:00-18:00</span>-->
                        </div>
                        <!--<div class="act_main_right4">已报名:20人</div>-->
                        <div class="act_main_right5">
                            <span>已报名:{{item.members}}人</span>
                            <span>报名费:￥{{item.entry_fees/100}} </span>
                            <span>保证金:￥{{item.cash_pledges/100}}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="empty_box" v-show="act_list.length==0">
            <img :src="empty_img" alt="">
            <!--<div class="empty_tip">目前还没有俱乐部哦</div>-->
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
                empty_img:'./static/img/empty_img.png',
                title: '即将签到的活动',
                show: true,
                backpage: '',
                club_img:'./static/img/03index_37.png',
                act_img:'./static/img/03index_29.png',
                act_selece:0,
                page:0,
                clientHeight:'',
                scrollHeight:'',
                scrollTop:'',
                page_end:true,
                loadFlag:true,
                act_list:[],
                stare:'',
                is_apply:0,
                is_signee:0,
                is_ended:0


            }
        },
        created() {
            this.active_list()
        },
        mounted() {

        },
        methods: {
            to_detail(issue_nums,id,club_id){

                localStorage.setItem('active_id',id)
                localStorage.setItem('active_name',name)
                localStorage.setItem('issue_nums',issue_nums)
                localStorage.setItem('club_id',club_id)

                if(issue_nums==0){
                    this.$router.push({ path: '/activedetailshort',query:{id:id}}) // -> /user
                }else{
                    this.$router.push({ path: '/activedetail',query:{id:id}}) // -> /user
                }
            },
            active_list(){
                console.log(this.page)
                let _this=this;
                if(_this.loadFlag){

                    this.$axios.get("/activities",{
                        headers: {
                            'Authorization': localStorage.getItem('token_type') + ' '+localStorage.getItem('access_token'),
                        },
                        params: {
                            "near_days":3,
                            "user_id":localStorage.getItem('user_id'),
                            "is_apply":0,
                            "is_signee":1,
                            "is_ended":0,
                            "last_id":_this.page
                        }
                    }).then(res=>{
                        console.log(res)
                        if(res.status==200){
                            if(res.data.data.length<_this.GLOBAL.page_total){
                                _this.page_end=false
                            }
                            let act_list=_this.act_list;
                            if(act_list.length==0){
                                act_list=res.data.data
                            }else{
                                act_list.push.apply(act_list,res.data.data);
                            }
                            _this.act_list=act_list;
                            _this.loadFlag=false;

                        }else {
                            _this.showa=true;
                            _this.show_tip=res.data.message;
                        }
                    })
                        .catch(err=>{
                            console.log(err)
                        })

                }
            },
            gotoScroll(){
                console.log("ppp")
                let _this=this
                console.log(this.$refs.opBottomEcharts)
                this.scrollTop=this.$refs.opBottomEcharts.scrollTop;
                this.clientHeight = this.$refs.opBottomEcharts.clientHeight;
                this.scrollHeight=this.$refs.opBottomEcharts.scrollHeight;
                //滚动条到底部的条件:div 到头部的距离 + 屏幕高度 = 可滚动的总高度
                console.log(this.scrollTop+"+"+this.clientHeight+"+"+this.scrollHeight)
                if(this.scrollTop+this.clientHeight >= this.scrollHeight-10){
                    if(_this.page_end&&_this.loadFlag==false){
                        _this.loadFlag=true
                        let page = _this.page+1;
                        _this.page=page;
                        console.log(_this.page)
                        _this.active_list()
                    }

                }
            },

        },
        destroyed(){
            console.log(this.$refs.opBottomEcharts)
            window.removeEventListener('scroll', this.gotoScroll);
        }
    }
</script>

<style scoped>

    .active_box{
        width:7.2rem;
        height:calc(100vh - 1.28rem);
        margin:auto;
        margin-top:1.08rem;
        padding-bottom:0.2rem;
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
        padding:0.3rem 0.2rem;
        height:2.6rem;
        margin-top:0.2rem;
        box-sizing: border-box;
        display: flex;
        justify-content: space-between;
        background: #fff;
        border-radius: 0.1rem;
    }
    .act_main>.act_main_left{
        width:2.2rem;
        height:2rem;

    }

    .act_main>.act_main_left>img{
        width:100%;
        height:100%;
        background: antiquewhite;
        border-radius: 0.1rem;

    }

    .act_main>.act_main_left>.act_buta{
        width:1.5rem;
        height:0.48rem;
        background: #f7282f;
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
        color: #f7282f;
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
        color: #f7282f;
    }
    .act_main>.act_main_right{
        width:4.5rem;
        height:100%;

    }
    .act_main>.act_main_right>.act_main_right1{
        width:100%;
        height:0.36rem;
        font-size: 0.3rem;
        line-height:0.36rem;
        font-weight: bold;
        color: #333333;
        margin-top:0.08rem;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;

    }

    .act_main>.act_main_right>.act_main_right2{
        width:100%;
        height:0.36rem;
        font-size: 0.24rem;
        line-height:0.36rem;
        color: #4d4d4d;
        margin-top:0.18rem;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
    }

    .act_main>.act_main_right>.act_main_right2>span{
        font-size: 0.24rem;
    }
    .act_main>.act_main_right>.act_main_right3{
        width:100%;
        height:0.36rem;
        font-size: 0.24rem;
        line-height:0.36rem;
        color: #4d4d4d;
        margin-top:0.05rem;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;

        /*justify-content: space-between;*/
    }
    .act_main>.act_main_right>.act_main_right3>span{
        font-size: 0.24rem;
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
        font-size: 0.2rem;
        line-height:0.36rem;
        color: #a6a6a6;
        margin-top:0.26rem;
        /*overflow: hidden;*/
        /*text-overflow:ellipsis;*/
        /*white-space: nowrap;*/
        display: flex;
        justify-content: space-between;
    }

    .act_main>.act_main_right>.act_main_right5>span{
        display: block;
        font-size: 0.24rem;
        color: #a6a6a6;
    }





</style>
