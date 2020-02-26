<template>
    <div style="background:#f7f7f7;min-height: 100vh;overflow: hidden;">
        <Header :title="title" :show="show" :backpage="backpage"></Header>
        <div class="activedetail_box_big" style="margin-bottom:1.3rem;">
            <div class="detail1_box">
                <img :src="detail_banner" alt="">
                <div class="detail1">
                    <div class="detail1a">{{active_info.name}}</div>
                    <div class="detail1b">俱乐部：{{club_name}}</div>
                    <!--<div class="detail1c">活动地点：{{}}</div>-->
                </div>
                <div class="but_top" v-if="is_authorized==1&&(active_info.status==0 ||active_info.status==1)" @click="to_editactive(active_info.id,active_info.issue_nums)">
                     <img class="but_top2" :src="but_top2" alt="">
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
                <div class="detail2b"  @click="menbersactive">
                    <div class="detail2b1" style="justify-content: space-between;">
                        <div>5人报名</div>
                        <img style="display: block;width:0.11rem;height:0.19rem" :src="right_tip" alt="">
                    </div>

                </div>
            </div>
            <!--活动规则-->
            <div class="detail2_box">
                <div class="detail2a">
                    <img style="width:0.38rem;height:0.38rem" :src="detail4" alt="">
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
                    <!--<div class="detail2b1">-->
                        <!--<div class="detail2b2_left">打卡有效距离:</div>-->
                        <!--<div class="detail2b2_right">{{active_info.sign_range}}米</div>-->
                    <!--</div>-->
                </div>
            </div>
            <!--活动时间-->
            <div class="detail2_box">
                <div class="detail2a">
                    <img :src="detail5" alt="">
                    <div class="detail2a_title">活动时间</div>
                </div>
                <div class="detail2b">
                    <div class="detail2b1" style="font-weight: bold">
                        <div class="detail2b2_left">期数:</div>
                        <div class="detail2b2_right" style="color: #000;">共{{active_info.issue_nums}}期</div>
                    </div>
                    <div class="detail2b1 detail2b15" v-show="issuesactive.length>0"  v-for="(itema,index) in issuesactive" @click="to_issueactive(itema.id)" :key="index">
                        <div class="detail2b1_1">第{{itema.cur_issue}}期:</div>
                        <div class="detail2b1_2">{{itema.start_date}}</div>
                        <div v-show="itema.status==0" class="detail2b1_3">未签到</div>
                        <div v-show="itema.status==1" class="detail2b1_3">已签到</div>
                        <img :src="righta" alt="">
                    </div>


                    <div class="detail2b1 detail2b15" v-show="(issuesactive.length<active_info_issue||issuesactive.length==undefined)&&is_authorized==1" @click="to_launched(active_info.id,active_info.name,issuesactive.length)">
                        <div class="detail2b1_1">添加活动</div>
                        <div class="detail2b1_2"></div>
                        <div class="detail2b1_3"></div>
                        <img :src="righta" alt="">
                    </div>



                </div>
            </div>
            <!--活动详情-->
            <div class="detail2_box">
                <div class="detail2a">
                    <img style="width:0.36rem;height:0.36rem" :src="detail6" alt="">
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
        </div>


        <div class="creat_club_box" v-if="(active_info.status==0 ||active_info.status==1)&&is_applyed" @click="notosing()">
            <div class="creat_club">取消报名</div>
        </div>
        <div class="detail_but" v-if="active_info.status==0&&is_applyed==false">
            <div class="detail_but1"><span>￥</span>{{active_info.entry_fees/100}}</div>
            <div class="detail_but2" @click="tosing()">报名缴费</div>
        </div>
        <div class="creat_club_box" v-if="is_authorized==1&&(active_info.status==0 ||active_info.status==1)" @click="to_editactive(active_info.id,active_info.issue_nums)">
            <div class="creat_club">编辑</div>
        </div>

        <Eject  type='alert' @took='okfall' :showstate='showa'  >
            <div slot='text'>{{show_tip}}</div>
        </Eject>
        <Eject  type='alert'  @tocancel="nofall"  @took='okfall1' :showstate='showa1' :cancel='cancel' >
            <div slot='text'>{{show_tip1}}</div>
        </Eject>
        <div class="hide_tip_box" v-show="hidea">
            <div class="hide_tip">{{hide_tip}}</div>
        </div>


    </div>
</template>


<script>
    import Eject from './eject'
    import Header from './Header'
    export default {
        components: { Header,Eject },
        name: '',
        data() {
            return {
                cancel:true,
                showa:false,
                showa1:false,
                show_tip:'',
                show_tip1:'',
                hide_tip:'',
                hidea:false,
                title: '活动详情',
                show: true,
                backpage: '',
                detail_banner:'./static/img/22active_detail_03.png',
                detail2:'./static/img/22active_detail_07.png',
                detail3:'./static/img/22active_detail_11.png',
                detail4:'./static/img/22active_detail_14.png',
                detail5:'./static/img/22active_detail_17.png',
                detail6:'./static/img/22active_detail_20.png',
                right_tip:'./static/img/22right_15.png',
                righta:'./static/img/22righta_23.png',
                but_top2:'./static/img/07club_index_05.png',
                active_info:[],
                active_info_issue:'',
                issuesactive:[],
                is_authorized:'',
                is_joined:'',
                is_signed:'',
                is_verified:'',
                 is_applyed:'',
                need_signee:'',
                is_hide:'',
                order_id:''

            }
        },
        created() {
            let _this=this
            _this.club_name=localStorage.getItem('club_name')
            _this.active_id=_this.$route.query.id;
            _this.authis();
            this.active_detail()
            this.to_issuesactive()
            this.authentication()
        },
        mounted() {

        },
        methods: {
            authentication(){
                 let _this=this;
                this.$axios.get("/activity-authentication",{
                    headers: {
                        'Authorization': localStorage.getItem('token_type') + ' '+localStorage.getItem('access_token'),
                    },
                    params: {
                         "act_id": localStorage.getItem('active_id')
                    }
                }).then(res=>{
                    console.log(res)
                    if(res.status==200){
                        console.log(res)
                        _this.is_applyed=res.data.data.is_applyed;
                        _this.is_hide=res.data.data.is_signed;
                        _this.need_signee=res.data.data.need_signee;

                    }else {

                    }
                })
                    .catch(err=>{
                        console.log(err)
                    })

            },


            authis(){
                let _this=this;
                this.$axios.get("/club-users/auth",{
                    headers: {
                        'Authorization': localStorage.getItem('token_type') + ' '+localStorage.getItem('access_token'),
                    },
                    params: {
                        "club_id":localStorage.getItem('club_id'),
                    }
                }).then(res=>{
                    console.log(res)
                    if(res.status==200){
                        console.log(res)
                        _this.is_authorized=res.data.data.is_authorized;
                        _this.is_joined=res.data.data.is_joined;
                        _this.is_signed=res.data.data.is_signed;
                        _this.is_verified=res.data.data.is_verified;

                    }else {

                    }
                })
                    .catch(err=>{
                        console.log(err)
                    })
            },
            tosing(){
                let _this=this
                if(_this.is_joined==true && _this.is_verified==true){
                if(_this.active_info.entry_fees==0){

                    _this.$axios.post("/activity-users",
                        {
                            "act_id": localStorage.getItem('active_id')
                        },{
                            headers: {
                                'Authorization': localStorage.getItem('token_type') + localStorage.getItem('access_token'),
                            }
                        }).then(res=>{
                        if(res.status==200){
                           _this.order_id=res.data.data.order_id
                                    _this.order_get()


                        }else{
                            _this.showa=true;
                            _this.show_tip=res.data.message;
                            return
                        }
                    })
                        .catch(err=>{
                        })

                }else{
                  _this.getUserCode()

                }

                }else{
                    _this.showa=true;
                    _this.show_tip='您还不是该俱乐部成员，没有权限';
                    return
                }

            },

            order_get(){
                let _this=this
                _this.$axios.get("/paid-orders/"+ _this.order_id,{
                    headers: {
                        'Authorization': localStorage.getItem('token_type') + localStorage.getItem('access_token'),
                    },
                    params:{
                    }
                }).then(res=>{
                    if(res.status==200){
                        console.log(res)
                        _this.hidea=true;
                        _this.hide_tip='报名成功';
                        setTimeout(function(){
                            _this.hidea=false;
                            _this.$router.push({path: '/myactive'})
                        },1500)
                    }else{
                        _this.showa=true;
                        _this.show_tip=res.data.message;
                        return
                    }
                })
                    .catch(err=>{

                    })
            },


            getUserCode() {
                    const baseurl = "https://front.club.xindongguoji.com/wechats/#/paypage"
                    const  redirectURL = encodeURIComponent(baseurl);//获取地址
//                    const  redirectURL = encodeURI((baseurl + window.location.pathname + window.location.search).split('&code')[0]);//获取地址
                    const base = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx1831b622b7904e1a';
                    let state;
                    let surl;
                    let reserveUrl;
                    let appid ="wx1831b622b7904e1a";
                    let scope = "1";
                    window.location.href =base +'&redirect_uri='+ redirectURL +'&response_type=code&scope=snsapi_base&state=123#wechat_redirect';
                },


            notosing(){
                let _this=this
                if(_this.is_joined==true && _this.is_verified==true){
                      _this.showa1=true;
                    _this.show_tip1='您确定要取消报名吗？'
                }else {
                    _this.showa=true;
                    _this.show_tip='您还不是该俱乐部成员，没有权限';
                    return
                }

            },

            to_issuesactive(){
                let _this=this
                _this.$axios.get("/activity-issues",{
                    headers: {
                        'Authorization': localStorage.getItem('token_type') + localStorage.getItem('access_token'),
                    },
                    params:{
                        "act_id": _this.active_id
                    }
                }).then(res=>{

                    if(res.status==200){
                        _this.issuesactive=res.data;
                    }else{
                        _this.showa=true;
                        _this.show_tip=res.data.message;
                        return
                    }
                })
                    .catch(err=>{
                    })
            },
            to_editactive(id,issue_nums){
                if(issue_nums==0){
                    this.$router.push({path:'./launchedshort',query:{id:id}})
                }else{
                    this.$router.push({path:'./launchedlong',query:{id:id}})
                }

            },
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
                        _this.active_info_issue=res.data.data.issue_nums;
                        console.log(_this.active_info_issue)
                        console.log(_this.active_info.length)

                    }else{
                        _this.showa=true;
                        _this.show_tip=res.data.message;
                        return
                    }
                })
                    .catch(err=>{
                    })
            },
            to_hide(){
               let _this=this
               this.hidea=true;
               this.hide_tip='取消报名成功'
                setTimeout(function(){
                    _this.hidea=false;
                },2000)
            },
            to_launched(id,name,issue_id){
                this.$router.push({path:'./launchedissue',query:{active_id:id,active_name:name,issue_id:issue_id}})
                
            },
            menbersactive(){
                this.$router.push({path:'./membersactive'})
            },
            to_issueactive(id){
                this.$router.push({path:'./issueactivedetail',query:{id:id}})
            },
            okfall(){
                this.showa=false;
            },
           okfall1(){
                let _this=this;
                   this.showa1=false;
                _this.$axios.delete("/activity-users", {
                        headers: {
                            'Authorization': localStorage.getItem('token_type') + localStorage.getItem('access_token'),
                        },
                        params: {
                            'act_id': localStorage.getItem('active_id')
                        }

                    }).then(res => {
                        if (res.status == 200) {
                            _this.hidea=true;
                            _this.hide_tip='取消报名成功';
                            setTimeout(function(){
                                _this.hidea=false;
                                _this.authentication()
                            },1500)
                        } else {
                            _this.showa = true;
                            _this.show_tip = res.data.message;
                            return
                        }
                    })
                        .catch(err => {
                        })
             
            },
            nofall(){
                this.showa=false;
                  this.showa1=false;
            },

        }

    }
</script>

<style scoped>
  .detail1_box .but_top{
        width:0.48rem;
        height:0.46rem;
        position: absolute;
        right:0.46rem;
        top:0.25rem;
        
    }


    .detail1_box .but_top .but_top2{
        display: block;
        width:0.48rem;
        height:0.46rem;
    }

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
    .creat_club{
        width:7.1rem;
        height:0.9rem;
        margin:auto;
        margin-top:0.2rem;
        background: #f7282f;
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

        box-shadow: 0 0 0.08rem #ccc;
    }
    .detail_but>.detail_but1{
        background: #fff;
        color: #f7282f;
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
        background: #f7282f;
        color: #fff;
        font-size: 0.3rem;

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

    .detail2a>.detail2a_title{
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
       left:0;
       right:0;
       width:5.5rem;
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
       height:0.28rem;
       text-align:left;
       line-height:0.28rem;
       font-size:0.28rem;
       margin-top:0.68rem;
       /*font-weight: bold;*/
   }
   .detail1_box>.detail1>.detail1c{
       width: 100%;
       height:auto;
       text-align:left;
       line-height:0.4rem;
       font-size:0.28rem;
       margin-top:0.2rem;
       /*font-weight: bold;*/
   }

</style>
