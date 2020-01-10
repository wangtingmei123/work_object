<template>
    <div style="background: #f7f7f7;min-height: 100vh;overflow: hidden;">
        <Header :title="title" :show="show" :backpage="backpage"></Header>
        <div class="activedetail_box_big" style="margin-bottom:1.3rem;">
            <div class="detail1_box">
                <img :src="detail_banner" alt="">
                <div class="detail1">
                    <div class="detail1a">{{active_info.name}}</div>
                    <div class="detail1b">活动开始时间：<span>{{active_info.start_date}}</span></div>
                    <div class="detail1c">活动结束时间：<span>{{active_info.end_date}}</span></div>
                    <div class="detail1d">活动地点：{{active_info.address}}</div>
                    <div class="detail1d">俱乐部：{{club_name}}</div>
                </div>
            </div>
            <!--活动收费-->
            <div class="detail2_box">
                <div class="detail2a">
                    <img :src="detail2" alt="">
                    <div class="detail2a_title">活动收费</div>
                </div>
                <div class="detail2b">
                    <div class="detail2b1">
                        <div class="detail2b2_left">报名费:</div>
                        <div class="detail2b2_right" style="color: #000;font-family:DINCondensedC;font-size: 0.32rem">￥{{active_info.entry_fees/100}}</div>
                    </div>
                    <div class="detail2b1">
                        <div class="detail2b2_left">保证金:</div>
                        <div class="detail2b2_right" style="color: #000;font-family:DINCondensedC;font-size: 0.32rem">￥{{active_info.cash_pledges/100}}</div>
                    </div>
                    <div class="detail2b1" style="align-items: normal;height:auto;line-height: 0.62rem">
                        <div class="detail2b2_left">退费规则:</div>
                        <div class="detail2b2_right" style="width:5.28rem">报名费不退,未签到一次扣除保证金{{active_info.not_sign/100}}元</div>
                    </div>
                </div>
            </div>
            <!--活动成员-->
            <div class="detail2_box">
                <div class="detail2a">
                    <img style="width:0.35rem;height:0.34rem" :src="detail3" alt="">
                    <div class="detail2a_title">已报名成员</div>
                </div>
                <div class="detail2b" @click="menbersactive">
                    <div class="detail2b1" style="justify-content: space-between;">
                        <div>5人报名</div>
                        <img style="display: block;width:0.11rem;height:0.19rem" :src="right_tip" alt="">
                    </div>

                </div>
            </div>
            <!--活动规则-->
            <div class="detail2_box">
                <div class="detail2a">
                    <img  style="width:0.38rem;height:0.38rem" :src="detail4" alt="">
                    <div class="detail2a_title">活动规则</div>
                </div>
                <div class="detail2b">
                    <div class="detail2b1">
                        <div class="detail2b2_left">报名截止日期:</div>
                        <div class="detail2b2_right">{{active_info.apply_stoped}}</div>
                    </div>
                    <div class="detail2b1">
                        <div class="detail2b2_left">参与人数上限:</div>
                        <div class="detail2b2_right">{{active_info.num_max}}人</div>
                    </div>
                    <div class="detail2b1">
                        <div class="detail2b2_left">打卡有效距离:</div>
                        <div class="detail2b2_right">{{active_info.sign_range}}米</div>
                    </div>
                </div>
            </div>
            <!--活动详情-->
            <div class="detail2_box">
                <div class="detail2a">
                    <img style="display: block;width:0.36rem;height:0.36rem" :src="detail6" alt="">
                    <div class="detail2a_title">活动详情</div>
                </div>
                <div class="detail2b">
                    <div class="detail2b1" style="font-weight: bold">
                        <div class="detail2b2_left">{{active_info.name}}</div>
                    </div>
                    <div class="detail2b1" style="height:auto;line-height: 0.62rem;width:100%">
                        {{active_info.explanation}}
                    </div>


                </div>
            </div>
            <!--活动评价-->
            <div class="detail2_box">
                <div class="detail2a" style="justify-content: space-between;border:none" @click="to_comment">
                    <div style="height:100%;display: flex;align-items: center" >
                        <img style="display: block;width:0.4rem;height:0.4rem" :src="detail7" alt="">
                        <div class="detail2a_title">活动评价</div>
                    </div>
                    <img style="display: block;width:0.11rem;height:0.19rem" :src="right_tip" alt="">

                </div>
            </div>
        </div>

        <!--<div class="detail_but">-->
            <!--<div class="detail_but1"><span>￥</span>1100.00</div>-->
            <!--<div class="detail_but2">报名缴费</div>-->
        <!--</div>-->
        <div class="creat_club_box" v-if="active_info.status==1" @click="">
            <div class="creat_club">取消报名</div>
        </div>
        <div class="creat_club_box" v-if="is_authorized==0&&active_info.status==1" @click="to_editactive(active_info.id,active_info.issue_nums)">
            <div class="creat_club">编辑</div>
        </div>
        <div class="creat_club_box" v-show="active_info.status==3" @click="to_commentfb">
            <div class="creat_club">发表评价</div>
        </div>
        <div class="creat_club_box" v-show="active_info.status==1" @click="to_hitcard">
            <div class="creat_club">签到打卡</div>
        </div>

        <!--<div class="creat_clubbut" style="display:flex;justify-content: space-around;align-items: center;">-->
            <!--<div class="but1">取消报名</div>-->
            <!--<div class="but2" @click="to_launchedshort">编辑</div>-->
        <!--</div>-->


    </div>
</template>


<script>

    import Header from './Header'
    export default {
        components: { Header },
        name: '',
        data() {
            return {
                title: '活动详情',
                show: true,
                backpage: '',
                detail_banner:'./static/img/22active_detail_03.png',
                detail2:'./static/img/22active_detail_07.png',
                detail3:'./static/img/22active_detail_11.png',
                detail4:'./static/img/22active_detail_14.png',
                detail5:'./static/img/22active_detail_17.png',
                detail6:'./static/img/22active_detail_20.png',
                detail7:'./static/img/22active_detail_33.png',
                right_tip:'./static/img/22right_15.png',
                righta:'./static/img/22righta_23.png',
                active_id:'',
                active_info:[]

            }
        },
        created() {
            let _this=this;
            _this.is_authorized=localStorage.getItem('is_authorized')
            _this.club_name=localStorage.getItem('club_name')
            _this.active_id=localStorage.getItem('active_id');
            this.active_detail()

        },
        mounted() {

        },
        methods: {

            active_detail(){
                let _this=this
                _this.$axios.get("/activities/"+ _this.active_id,{
                    headers: {
                        'Authorization': localStorage.getItem('token_type') + localStorage.getItem('access_token'),
                    },
                    params:{
                    }
                }).then(res=>{
                    if(res.status==200){
                        _this.active_info=res.data.data;

                    }else{
                        _this.showa=true;
                        _this.show_tip=res.data.message;
                        return
                    }
                })
                    .catch(err=>{
                    })
            },


            to_hitcard(){
                this.$router.push({path:'./hitcard',query:{issue_id:0}})
            },
            to_editactive(id,issue_nums){
                if(issue_nums==0){
                    this.$router.push({path:'./launchedshort',query:{id:id}})
                }else{
                    this.$router.push({path:'./launchedlong',query:{id:id}})
                }

            },
            to_commentfb(){
                this.$router.push({path:'./comment'})
            },
            menbersactive(){
                this.$router.push({path:'./membersactive'})
            },
            to_launchedshort(){
                this.$router.push({path:'./launchedshort'})
            },
            to_comment(){
                this.$router.push({path:'./evaluation'})
            }
        }

    }
</script>

<style scoped>
    .activedetail_box_big{
        width:100%;
        height:auto;
        margin-top:1.03rem;
        overflow: scroll;
        padding-bottom:0.2rem;
    }
    .creat_club_box{
        width:100%;
        height:1.3rem;
        background: #f7f7f7;
        position: fixed;
        left:0;
        right:0;
        bottom:0;
        margin:auto;
        box-shadow: 0 0 0.08rem #ccc;
    }
    .creat_clubbut{
        width:100%;
        padding:0 0.2rem;
        box-sizing: border-box;
        height:1.3rem;
        background: #f7f7f7;
        position: fixed;
        left:0;
        right:0;
        bottom:0;
        margin:auto;
        display:flex;justify-content: space-around;align-items: center;
        box-shadow: 0 0 0.08rem #ccc;
    }
    .creat_clubbut>.but1{
        border:1px solid #fe5857;
        width:3.44rem;
        height:0.88rem;
        box-sizing: border-box;
        border-radius: 0.1rem;
        color: #fe5857;
        font-size: 0.3rem;
        text-align: center;
        line-height: 0.88rem;
    }
    .creat_clubbut>.but2{
        border:1px solid #fe5857;
        background: #fe5857;
        width:3.44rem;
        height:0.88rem;
        border-radius: 0.1rem;
        color: #fff;
        font-size: 0.3rem;
        text-align: center;
        line-height: 0.88rem;
    }
    .creat_club{
        width:7.1rem;
        height:0.9rem;
        margin:auto;
        margin-top:0.2rem;
        background: #ff5757;
        color: #fff;
        text-align: center;
        line-height:0.9rem;
        font-size: 0.3rem;
        /*font-weight: bold;*/
        border-radius: 0.1rem;

    }

    .detail_but{
        width:100%;
        height:1rem;
        position: fixed;
        left:0;
        bottom:0;
        display: flex;
        justify-content: space-between;
        align-items: center;
        background: #fff;
        border-top:1px solid #e6e6e6;
        font-weight: bold;
    }
    .detail_but>.detail_but1{
        background: #fff;
        color: #ff5757;
        font-size: 0.55rem;
        display: flex;align-items: end;
        justify-content: center;
        width:50%;
        height:100%;
        line-height: 1rem;
        font-family: DINCondensedC;

    }
    .detail_but>.detail_but1>span{
        font-size: 0.3rem;
        line-height: 1.16rem;
    }
    .detail_but>.detail_but2{
        background: #ff5757;
        color: #fff;
        font-size: 0.3rem;
        font-weight: bold;
        width:50%;
        text-align: center;
        height:100%;
        line-height: 1rem;
    }

    .detail2_box{
        width:7.1rem;
        height:auto;
        padding:0 0.15rem;
        box-sizing: border-box;
        background: #fff;
        margin:auto;
        margin-top:0.15rem;
        border-radius: 0.1rem;

    }

    .detail2a{
        width:100%;
        height:1rem;
        display: flex;
        justify-content: left;
        align-items: center;
        font-size: 0.3rem;
        color: #1a1a1a;
        border-bottom:1px solid #e6e6e6;
    }

    .detail2a>img{
        display: block;
        width:0.4rem;
        height:0.4rem;
        margin-left:0.05rem;
    }

    .detail2a .detail2a_title{
        font-size: 0.3rem;
        color: #1a1a1a;
        margin-left:0.1rem;
        font-weight: bold;
    }

    .detail2b{
        width: 100%;
        height:auto;
        padding:0.08rem 0.05rem 0.2rem 0.05rem;
        box-sizing: border-box;
    }
    .detail2b>.detail2b1{
        width:100%;
        height:0.62rem;
        display: flex;
        align-items: center;
        justify-content: left;
        color: #1a1a1a;
    }
    .detail2b>.detail2b15:nth-child(1){
        margin-top:0.1rem;
    }

    .detail2b>.detail2b15{
        margin-top:0.3rem;
        justify-content: space-between;
    }
    .detail2b>.detail2b15>.detail2b1_1{
        width:1.2rem;
    }
    .detail2b>.detail2b15>.detail2b1_2{
        width:3.52rem;
        color: #989898;
        margin-right: 0.4rem;
    }
    .detail2b>.detail2b15>.detail2b1_3{
        width:1.44rem;
        color: #989898;
        text-align: right;

    }
    .detail2b>.detail2b15>img{
        display: block;
        width:0.11rem;
        height:0.19rem;
        margin-left:0.1rem;

    }

    .detail2b>.detail2b1 .detail2b2_left{
        color: #1a1a1a;
    }
    .detail2b>.detail2b1 .detail2b2_right{
        color: #a6a6a6;
        margin-left:0.16rem;
    }



    .detail1_box{
        width:6.8rem;
        height:3.5rem;
        margin:auto;
        position: relative;
        color: #fff;
    }
    .detail1_box>img{
        display: block;
        width:100%;
        height:100%;

    }
    .detail1_box>.detail1{
        position: absolute;
        top:0;
        left:0.5rem;
        right:0;
        width:6.5rem;
        height:100%;
        margin:auto;
    }
    .detail1_box>.detail1>.detail1a{
        width: 100%;
        height:0.46rem;
        text-align:left;
        line-height:0.46rem;
        font-size: 0.32rem;
        margin-top:0.6rem;
        /*font-weight: bold;*/
    }
    .detail1_box>.detail1>.detail1b{
        width: 100%;
        height:auto;
        text-align:left;
        line-height:0.28rem;
        font-size:0.28rem;
        margin-top:0.34rem;
        /*font-weight: bold;*/
    }
    .detail1_box>.detail1>.detail1c{
        width: 100%;
        height:auto;
        text-align:left;
        line-height:0.4rem;
        font-size:0.28rem;
        margin-top:0.14rem;
        /*font-weight: bold;*/
    }
    .detail1_box>.detail1>.detail1d{
        width: 100%;
        height:auto;
        text-align:left;
        line-height:0.4rem;
        font-size:0.28rem;
        margin-top:0.06rem;
        /*font-weight: bold;*/
    }

</style>
