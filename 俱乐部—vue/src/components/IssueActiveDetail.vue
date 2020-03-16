<template>
    <div style="background:#f7f7f7;min-height: 100vh;overflow: hidden;">

        <div class="but_top" v-if="is_authorized==1" @click="to_issoue(issuesactive.id)">
            <img class="but_top2" :src="but_top2" alt="">
        </div>
        <Header :title="title" :show="show" :backpage="backpage"></Header>
        <div class="scoll_box">
            <!--活动时间-->
            <div class="detail2_box">
                <div class="detail2a">
                    <img  style="width:0.4rem;height:0.4rem" :src="detail5" alt="">
                    <div class="detail2a_title">活动时间</div>
                </div>
                <div class="detail2b">
                    <div class="detail2b1">
                        <div class="detail2b2_left">第{{issuesactive.cur_issue}}期:</div>
                        <div class="detail2b2_right" style="font-size: 0.26rem;line-height: 0.62rem">{{issuesactive.start_date}} - {{issuesactive.end_date}}</div>
                    </div>
                </div>

              
            </div>
            <!--活动地点-->
            <div class="detail2_box">
                <div class="detail2a">
                    <img  style="width:0.36rem;height:0.39rem" :src="detail8" alt="">
                    <div class="detail2a_title">活动地点</div>
                </div>
                <div class="detail2b">
                    <div class="detail2b1" style="align-items: normal;height:auto;line-height: 0.62rem">
                        <div class="detail2b2_left">活动地点:</div>
                        <div class="detail2b2_right" style="width:5.1rem;line-height: 0.62rem">{{issuesactive.address}}</div>
                    </div>
                    <div class="detail2b1">
                        <div class="detail2b2_left">打卡有效距离:</div>
                        <div class="detail2b2_right">{{issuesactive.sign_range}}米</div>
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
                        <div class="detail2b2_left">{{issuesactive.name}}</div>
                    </div>
                    <div class="detail2b1" style="height:auto;line-height: 0.62rem;width:100%">
                        {{issuesactive.explanation}}
                    </div>

                </div>
            </div>
            <!--活动评价-->
            <div class="detail2_box">
                <div class="detail2a" style="justify-content: space-between;border:none" @click="to_comment">
                    <div style="height:100%;display: flex;align-items: center"  >
                        <img style="display: block;width:0.4rem;height:0.4rem" :src="detail7" alt="">
                        <div class="detail2a_title">活动评价</div>
                    </div>
                    <img style="display: block;width:0.11rem;height:0.19rem" :src="right_tip" alt="">

                </div>
            </div>
        </div>


        <!-- <div class="creat_club_box" v-if="is_authorized==1" @click="to_issoue(issuesactive.id)">
            <div class="creat_club">编辑</div>
        </div> -->
        <div class="creat_club_box" v-show="is_hide" @click="to_commentfb">
            <div class="creat_club">发表评价</div>
        </div>
        <div class="creat_club_box" v-show="issuesactive.status==2&&is_hide==false&&need_signee" @click="to_hitcard">
            <div class="creat_club">签到打卡</div>
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
                detail8:'./static/img/22active_detail_23.png',
                right_tip:'./static/img/22right_15.png',
                righta:'./static/img/22righta_23.png',
                but_top2:'./static/img/07club_index_05.png',
                issue_id:'',
                issuesactive:'',
                is_authorized:'',
                is_joined:'',
                is_signed:'',
                is_verified:'',
                 is_applyed:'',
                need_signee:'',
                is_hide:''


            }
        },
        created() {

            this.issue_id=this.$route.query.id;
            let _this=this
            _this.is_authorized=localStorage.getItem('is_authorized')

            _this.$axios.get("/activity-issues/"+this.issue_id,{
                headers: {
                    'Authorization': localStorage.getItem('token_type') + localStorage.getItem('access_token'),
                },
                params:{

                }
            }).then(res=>{

                if(res.status==200){
                    _this.issuesactive=res.data.data;

                }else{
                    _this.showa=true;
                    _this.show_tip=res.data.message;
                    return
                }
            })
                .catch(err=>{
                })

            this.authentication()
            this.authis()


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
            to_hitcard(){
                 let  _this=this
                if(_this.is_joined==true && _this.is_verified==true){
                     _this.$router.push({path:'./hitcard',query:{issue_id:this.issue_id}})
                }else{
                    _this.showa=true;
                    _this.show_tip='您还不是该俱乐部成员，没有权限';
                    return
                }
            },
            to_issoue(id){
                console.log(id)
                this.$router.push({path:'./launchedissue',query:{issue_id:id,is_edit:1}})
            },
            to_comment(){
                this.$router.push({path:'./evaluation'})
            },
              to_commentfb(){
                   let  _this=this
                if(_this.is_joined==true && _this.is_verified==true){
                       _this.$router.push({path:'./comment'})
                }else{
                        _this.showa=true;
                        _this.show_tip='您还不是该俱乐部成员，没有权限';
                        return
                }
            },
        }

    }
</script>

<style scoped>

   .but_top{
        width:0.8rem;
        height:0.8rem;
        position: fixed;
        right:0.46rem;
        bottom:1.65rem;
        border-radius: 0.5rem;
        background: #f7282f;

        
    }


   .but_top .but_top2{
        display: block;
        width:0.48rem;
        height:0.46rem;
        margin:auto;
        margin-top:0.17rem;
    }


    .scoll_box{
        width:100%;
        height:auto;
        margin-top:0.88rem;
        overflow: scroll;
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
        font-weight: bold;
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
        margin-top:1.03rem;
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
        height:auto;
        text-align:left;
        line-height:0.28rem;
        font-size:0.28rem;
        margin-top:0.49rem;
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
    .detail1_box>.detail1>.detail1d{
        width: 100%;
        height:auto;
        text-align:left;
        line-height:0.4rem;
        font-size:0.28rem;
        margin-top:0.12rem;
        /*font-weight: bold;*/
    }

</style>
