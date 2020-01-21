<template>
    <div style="background: #f0f0f0;min-height: 100vh;overflow:hidden;">
        <Header :title="title" :show="show" :backpage="backpage"></Header>
        <div style="" class="club_big_box" >
            <!--俱乐部banner-->
            <div class="club_banner_box">
                    <div class="banner_img_a">
                        <img class="banner_img" :src="club_info.logo" alt="">
                    </div>
                   
                    <div class="banner_box">
                        <div class="club_main">
                            <div class="club_main_left">
                                <img :src="club_info.logo" alt="">
                            </div>
                            <div class="club_main_right">
                                <div class="club_main_right1">{{club_info.name}}</div>
                                <div class="club_main_right2">
                                    <!--<div class="club_main_right2_tap1">lv18</div>-->
                                    <div class="club_main_right2_tap1">{{club_info.type_name}}</div>
                                </div>
                                <div class="club_main_right3"><img :src="address" alt=""><span>{{club_info.full_areas}}</span></div>
                                <div class="club_main_right4">{{club_info.created_at}}创建</div>
                            </div>
                        </div>
                        <div class="but_top">
                            <img v-if="is_authorized==1" @click="to_invited" class="but_top3" :src="but_top3" alt="">
                            <img v-if="is_authorized==1" @click="to_clubaudit" class="but_top1" :src="but_top1" alt="">
                            <img v-if="is_authorized==1" @click="to_createclub" class="but_top2" :src="but_top2" alt="">
                        </div>
                        <div class="sign_box">
                           <div class="active_title" style="justify-content: left">
                            <!-- <img style="width:0.38rem;height:0.4rem;" class="active_title1 active_title2" :src="active_title2" alt=""> -->
                                <div class="title_center" style="margin-left:0.2rem;padding-top:0.08rem">每日签到</div>
                            <!--<img class="right_tip" :src="right_tip" alt="">-->
                           </div>
                            <div class="sign_left">
                                <img :src="sign_left_img" alt="">
                            </div>
                            <div class="sign_but">通过每日签到为俱乐部积攒积分</div>
                          
                            <div class="sign_right" v-if="is_joined&&is_signed==false" @click="sign()">签到</div>
                            <div class="sign_right1" v-if="is_joined&&is_signed" >已签到</div>
                            <div class="sign_right1" v-if="is_joined==false"></div>
                        </div>
                    </div>
            </div>
            <!--俱乐部公告-->
            <div class="club_announ_box"  v-if="club_info.explanation!=''">
                <div class="club_announ" >
                    <div class="active_title" style="justify-content: left">
                        <!-- <img style="width:0.38rem;height:0.4rem;" class="active_title1 active_title2" :src="active_title2" alt=""> -->
                        <div class="title_center" style="margin-left:0.1rem">俱乐部公告</div>
                        <!--<img class="right_tip" :src="right_tip" alt="">-->
                    </div>
                    <div class="club_announ_main" style=" padding-bottom:0.35rem;">
                        {{club_info.explanation}}

                    </div>


                </div>
            </div>
            <!--球队首页-->
            <div v-if="club_info.type_id==1" class="club_announ_box" >
                <div class="club_announ">
                    <div class="active_title" style="border-bottom:1px solid #e6e6e6;justify-content: left;">
                        <!-- <img style="width:0.38rem;height:0.4rem;" class="active_title1 active_title2" :src="active_title2" alt=""> -->
                        <div class="title_center" style="margin-left:0.1rem">球队首页:</div>
                        <!--<img class="right_tip" :src="right_tip" alt="">-->
                    </div>
                    <div class="club_announ_mainzq" @click="to_soccer">
                        <img class="zq_logo" :src="zq_logo" alt="">
                        <div class="zq_center">鑫动国际足球俱乐部</div>
                        <img class="zq_jiant" :src="right_tipa" alt="">
                        
                    </div>


                </div>
            </div>
            <!--俱乐部成员-->
            <div v-if="club_info.type_id==0" class="club_announ_box">
                <div class="club_announ" @click="to_members">
                    <div class="active_title" >
                        <!-- <img style="width:0.41rem;height:0.34rem;" class="active_title1 active_title3" :src="active_title3" alt=""> -->
                        <div class="title_center" style="margin-right:4.3rem">俱乐部成员</div>
                        <img class="right_tip" :src="right_tip" alt="">
                    </div>
                    <div class="club_members_main" v-if="audit_list.length>0">
                        <div class="club_members">
                            <div class="club_members_img" v-for="(item,index) in audit_list" :key="index">
                                <img v-if="item.user.avatar==''" :src="club_members" alt="">
                                <img v-if="item.user.avatar!=''" :src="item.user.avatar" alt="">
                            </div>

                        </div>
                        <div class="club_members_num">共<span> 24232 </span>人 <img class="right_tipa" :src="right_tip" alt="" ></div>
                    </div>

                </div>
            </div>
            <!--俱乐部活动-->
            <div class="active_box" >
                <div class="active">
                    <div class="active_title" @click="to_allactive()">
                        <!-- <img class="active_title1" style="width:0.38rem;height:0.38rem" :src="active_title4" alt=""> -->
                        <div class="title_center" style="margin-right:4.5rem;">俱乐部活动</div>
                        <img class="right_tip" :src="right_tip" alt="">
                    </div>
                    <div class="act_main" style="padding-bottom: 0.5rem" :class="{act_main_a1:index==0}" v-for="(item,index) in active_info" :key="index" v-show="active_info.length>=1"   @click="to_activedetail(item.issue_nums,item.id,item.name)">
                        <div class="act_main_left">
                            <img :src="item.logo_url" alt="">
                            <!--<div class="act_time">{{item.apply_stoped}}</div>-->
                            <!--<div class="act_time_tip">距离活动结束</div>-->
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

                            <div class="act_main_right5">
                                <span>已报名:{{item.members}}人</span>
                                <span>报名费：￥{{item.entry_fees/100}}</span>
                                <span>保证金：￥{{item.cash_pledges/100}}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!--俱乐部动态-->
            <div class="club_announ_box" >
                <div class="club_announ">
                    <div class="active_title"  @click="to_alldynamic">
                        <!-- <img style="width:0.4rem;height:0.41rem;" class="active_title1 active_title5" :src="active_title5" alt=""> -->
                        <div class="title_center" style="margin-right:4.3rem">俱乐部动态</div>
                        <img class="right_tip" :src="right_tip" alt="">
                    </div>
                    <div class="club_dynamic_main"  v-for="(item,index) in dynamic_info" :key="index">
                        <div class="dynamic_main1"  @click="to_dynamicdetail(item.id)">
                             <div class="dynamic_main1_user">
                                 <img :src="club_members" alt="">
                             </div>
                             <div class="dynamic_main1_center">
                                 <div class="dynamic_m1c1">{{item.user.real_name}}</div>
                                 <div class="dynamic_m1c2">{{item.user.department}}</div>
                             </div>
                             <div class="dynamic_main1_right">
                                {{item.time}}
                             </div>
                         </div>
                        <div class="dynamic_main2"  @click="to_dynamicdetail(item.id)">
                            {{item.contents}}
                        </div>
                        <div class="dynamic_main3" @click="to_dynamicdetail(item.id)">
                            <div class="dynamic_main3_img"  v-for="(items,index) in item.image_data" :key="index">
                                <img :src="items" alt="" >
                            </div>

                        </div>
                        <div class="dynamic_main4">
                            <div class="dynamic_m4a">
                                <div class="dynamic_m41" @click="touch_like(index,item.dynamic_praise_id,item.id)">
                                    <img v-show="item.dynamic_praise_id!=0" :src="like_img" alt="">
                                    <img v-show="item.dynamic_praise_id==0" :src="like_img_false" alt="">
                                    <span style="margin-left:0.08rem;">{{item.praise_count}}</span>
                                </div>
                                <div class="dynamic_m42"  @click="comment(item.id)">
                                    <img :src="ping_img" alt="">
                                    <span style="margin-left:0.08rem;">{{item.reply_count}}</span>
                                </div>
                            </div>
                            <div class="dynamic_m4b">
                                <div class="dynamic_m43" v-if="item.is_self_release==1&&item.is_audited==0">审核中</div>
                                <div class="dynamic_m43" v-if="item.is_self_release==1&&item.is_audited==1">已审核</div>
                                <div class="dynamic_m44" v-if="item.is_self_release==1" @click="touch_del(index,item.id)">删除</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <wimg :show="isShowBigImg" :imgs="imgs" :currentImg="current" @close="isShowBigImg = false"></wimg>
        </div>
        <div class="creat_club_box" v-if="is_authorized==1">
            <div class="creat_club" @click="launched">发起活动</div>
        </div>
        <div class="creat_club_box" v-if="is_joined==false">
            <div class="creat_club" @click="to_apply">申请加入</div>
        </div>
        <div class="creat_club_box creat_club_box1" v-if="is_verified==false">
            <div class="creat_club">申请审核中</div>
        </div>
        <Eject  type='alert' @took='okfall' :showstate='showa' >
            <div slot='text'>{{show_tip}}</div>
        </Eject>
        <Eject  type='alert'  @tocancel="nofall" @took='okfall1' :showstate='showa1'  :cancel='cancel'>
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
    import wimg from 'w-previewimg'
    export default {
        components: { Header,wimg,Eject},
        name: '',
        data() {
            return {
                cancel:true,
                showa:false,
                show_tip:'',
                showa1:false,
                show_tip1:'',
                hide_tip:'',
                hidea:false,
                club_id:'',
                is_admin:'',
                club_info:[],
                audit_list:[],
                title: '俱乐部首页',
                show: true,
                backpage: '',
                active_info:[],
                but_top1:'./static/img/07club_index_03.png',
                but_top2:'./static/img/07club_index_05.png',
                but_top3:'./static/img/40my_fenxiang.png',
                club_banner:'./static/img/07clubbanner_02.jpg',
                club_img:'./static/img/03index_37.png',
                address:'./static/img/07club_11.png',
                sign_left_img:'./static/img/07club_index_10.png',
                active_title2:'./static/img/07club_19.png',
                active_title3:'./static/img/07club_22.png',
                active_title4:'./static/img/07club_26.png',
                active_title5:'./static/img/07club_29.png',
                active_title6:'./static/img/35zq_03.png',
                right_tip:'./static/img/03index_25.png',
                right_tipa:'./static/img/04_right_tip_03.png',
                club_members:'./static/img/07club_32.png',
                act_img:'./static/img/03index_29.png',
                dynamic_img:'./static/img/07club_36.png',
                like_img:'./static/img/07club_40.png',
                like_img_false:'./static/img/07clunindexlike_29.png',
                ping_img:'./static/img/07club_42.png',
                zq_logo:'./static/img/35zq_06.png',
                isShowBigImg: false,
                current: '',
                imgs: ["./static/img/03index_29.png",
                    "./static/img/03index_06.png",
                    "./static/img/07club_36.png",
                    "./static/img/03index_37.png",
                ],
                is_authorized:'',
                is_joined:'',
                is_signed:'',
                is_verified:'',
                dynamic_info:[],
                can_show:true,
                apply:0

            }
        },
        created() {



            let _this=this;
             _this.club_id=_this.$route.query.id;
             if(_this.$route.query.id!=undefined){
                localStorage.setItem('club_id',_this.$route.query.id) 
             }

             if(_this.$route.query.company_id!=undefined){
                 localStorage.setItem('company_id',_this.$route.query.company_id) 
             }


             if(localStorage.getItem('access_token')==null){
                    _this.showa1=true;
                    _this.show_tip1='您还没有登录,是否去登录？'
                    _this.apply=2;
                    return
             }
          
            _this.authis()
            _this.club_detail()
            _this.members()
            _this.active_list()
            _this.dynamic_list()


        },
        mounted() {

        },
        methods: {
            to_apply(){

            // if(){
                    this.showa1=true;
                    this.show_tip1='确定加入俱乐部吗？'
                    this.apply=1;
                // }
               
            },
            sign(){
                let _this=this;
                this.$axios.post("/club-users/sign",{
                    "club_id":_this.club_id,
                },
                { headers: {
                        'Authorization': localStorage.getItem('token_type') + ' '+localStorage.getItem('access_token'),
                    }
                }).then(res=>{
                    console.log(res)
                    if(res.status==200){
                        _this.hidea=true;
                        _this.hide_tip='签到成功';
                        setTimeout(function(){
                            _this.hidea=false;
                            _this.is_signed=true
                        },1500)
                    }else {
                        _this.showa=true;
                        _this.show_tip=res.data.message;
                    }
                })
                    .catch(err=>{
                        console.log(err)
                    })
            },
            okfall(){
                this.showa=false;
            },
            okfall1(){
                let _this=this;
                this.showa1=false;
                if(this.apply==1){
                    this.apply=0;
                    this.$axios.post("/club-users ",{
                        "club_id": _this.club_id,
                    },{headers: {
                        'Authorization': localStorage.getItem('token_type') + ' '+localStorage.getItem('access_token'),
                    }}).then(res=>{
                        console.log(res)
                        if(res.status==200){
                            _this.hidea=true;
                            _this.hide_tip='申请成功，待审核';
                            setTimeout(function(){
                                _this.hidea=false;
                                _this.is_joined=true;
                                _this.is_verified=false

                            },1500)

                        }else {
                            _this.showa=true;
                            _this.show_tip=res.data.message;
                        }
                    })
                        .catch(err=>{
                            console.log(err)
                        })
                }

                if(this.apply==2){
                    this.$router.push({ path: '/codelog',query:{company_id:_this.$route.query.company_id}}) // -> /user
                }
            },
            nofall(){
                this.showa=false;
                this.showa1=false;
                if(this.apply==2){
                      this.$router.go(-1);
                }
            },
            touch_like(index,dynamic_praise_id,id){
                let _this=this;
                if(_this.is_joined==true && _this.is_verified==true){
                    if(dynamic_praise_id==0&&_this.can_show){
                        _this.can_show=false;
                        _this.$axios.post("/dynamic-praise",{
                                "id":id,
                            },
                            {headers: {
                                'Authorization': localStorage.getItem('token_type') + ' '+localStorage.getItem('access_token'),
                            },
                            }).then(res=>{
                            _this.can_show=true
                            if(res.status==201){
                                _this.dynamic_info[index].praise_count+=1
                                _this.dynamic_info[index].dynamic_praise_id=res.data.data.id;
                            }else {
                                _this.showa=true;
                                _this.show_tip=res.data.message;
                            }
                        })
                            .catch(err=>{
                                _this.can_show=true
                                console.log(err)
                            })
                    }else if(dynamic_praise_id!=0&&_this.can_show){
                        _this.can_show=false;
                        _this.$axios.delete("dynamic-praise",{
                            headers: {
                                'Authorization': localStorage.getItem('token_type') + ' '+localStorage.getItem('access_token'),
                            },
                            params: {
                                "id":dynamic_praise_id,
                            }
                        }).then(res=>{
                            _this.can_show=true
                            if(res.status==200){
                                _this.dynamic_info[index].praise_count-=1
                                _this.dynamic_info[index].dynamic_praise_id=0;
                            }else {
                                _this.showa=true;
                                _this.show_tip=res.data.message;
                            }
                        })
                            .catch(err=>{
                                _this.can_show=true
                                console.log(err)
                            })
                    }

                }else{
                    _this.showa=true;
                    _this.show_tip='您还不是该俱乐部成员，没有权限';
                    return
                }


            },
            touch_del(index,id){
                let _this=this;
                _this.$axios.delete("dynamics",{
                    headers: {
                        'Authorization': localStorage.getItem('token_type') + ' '+localStorage.getItem('access_token'),
                    },
                    params: {
                        "id":id,
                    }
                }).then(res=>{
                    _this.can_show=true
                    if(res.status==200){
                        _this.hidea=true;
                        _this.hide_tip='删除成功';
                        setTimeout(function(){
                            _this.hidea=false;
                            _this.dynamic_list()
                        },1500)

                    }else {
                        _this.showa=true;
                        _this.show_tip=res.data.message;
                    }
                })
                    .catch(err=>{
                        _this.can_show=true
                        console.log(err)
                    })


            },
            comment(id){
                let _this=this;
                if(_this.is_joined==true && _this.is_verified==true){
                    _this.$router.push({ path: '/dynamicreply',query:{dynamic_id:id}}) // -> /user
                }else{
                    _this.showa=true;
                    _this.show_tip='您还不是该俱乐部成员，没有权限';
                    return
                }

            },
            authis(){
                let _this=this;
                this.$axios.get("/club-users/auth",{
                    headers: {
                        'Authorization': localStorage.getItem('token_type') + ' '+localStorage.getItem('access_token'),
                    },
                    params: {
                        "club_id":_this.club_id,
                    }
                }).then(res=>{
                    console.log(res)
                    if(res.status==200){
                        console.log(res)
                        _this.is_authorized=res.data.data.is_authorized;
                        _this.is_joined=res.data.data.is_joined;
                        _this.is_signed=res.data.data.is_signed;
                        _this.is_verified=res.data.data.is_verified;
                        localStorage.setItem('is_authorized',res.data.data.is_authorized)
                        localStorage.setItem('is_joined',res.data.data.is_joined)
                        localStorage.setItem('is_signed',res.data.data.is_signed)
                        localStorage.setItem('is_verified',res.data.data.is_verified)

                    }else {

                    }
                })
                    .catch(err=>{
                        console.log(err)
                    })
            },
            dynamic_list(){

                let _this=this;
                this.$axios.get("dynamics",{
                    headers: {
                        'Authorization': localStorage.getItem('token_type') + ' '+localStorage.getItem('access_token'),
                    },
                    params: {
                        "club_id":localStorage.getItem('club_id'),
                        "is_self":0

                    }
                }).then(res=>{
                    console.log(res)
                    if(res.status==200){
                        _this.dynamic_info=res.data.data.slice(0,1);
                        console.log("+++++")
                        console.log(_this.dynamic_info)
                    }else {
                    }
                })
                    .catch(err=>{
                        console.log(err)
                    })
            },

            active_list(){
                let _this=this;
                this.$axios.get("/activities",{
                    headers: {
                        'Authorization': localStorage.getItem('token_type') + ' '+localStorage.getItem('access_token'),
                    },
                    params: {
                        "club_id":_this.club_id,
                        "last_id":0
                    }
                }).then(res=>{
                    console.log(res)
                    if(res.status==200){
                        _this.active_info=res.data.data.slice(0,1);
                    }else {

                    }
                })
                    .catch(err=>{
                        console.log(err)
                    })
            },
            members(){
                let _this=this;
                this.$axios.get("/club-users",{
                    headers: {
                        'Authorization': localStorage.getItem('token_type') + ' '+localStorage.getItem('access_token'),
                    },
                    params: {
                        "club_id":_this.club_id,
                        "is_verified":1,
                        "last_id":0
                    }
                }).then(res=>{
                    console.log(res)
                    if(res.status==200){
                        _this.audit_list=res.data.data.slice(0,10);
                    }else {

                    }
                })
                    .catch(err=>{
                        console.log(err)
                    })
            },
            club_detail(){
                let _this=this
                _this.$axios.get("/clubs/"+ _this.club_id,{
                    headers: {
                        'Authorization': localStorage.getItem('token_type') + localStorage.getItem('access_token'),
                    },
                    params:{
                    }
                }).then(res=>{
                    if(res.status==200){
                        _this.club_info=res.data.data;

                    }else{
                        _this.showa=true;
                        _this.show_tip=res.data.message;
                        return
                    }
                })
                    .catch(err=>{
                    })
            },

            to_activedetail(issue_nums,id,name){
                localStorage.setItem('active_id',id)
                localStorage.setItem('active_name',name)
                localStorage.setItem('issue_nums',issue_nums)
                if(issue_nums==0){
                    this.$router.push({ path: '/activedetailshort',query:{id:id}}) // -> /user
                }else{
                    this.$router.push({ path: '/activedetail',query:{id:id}}) // -> /user
                }
            },

            to_createclub(){
                this.$router.push({ path: '/createclub',query:{club_id:this.club_id,type_l:1}}) // -> /user

            },
            to_soccer(){
                this.$router.push({ path: '/soccerhome'}) // -> /user
            },
            to_members(){

                this.$router.push({ path: '/members',query:{club_id:this.club_id}}) // -> /user
            },
            showBigImg (i) {
                this.current = i;
                this.isShowBigImg = true
            },
            to_invited(){
                let company_id=localStorage.getItem('company_id')
                this.$router.push({ path: '/clubshare',query:{company_id:company_id,club_id:this.club_id}}) // -> /user
            },
            to_clubaudit(){
                this.$router.push({ path: '/clubaudit',query:{club_id:this.club_id}}) // -> /user
            },
            launched(){
                this.$router.push({ path: '/launched'}) // -> /user
            },

            to_alldynamic(){
                this.$router.push({ path: '/alldynamic'}) // -> /user
            },
            to_allactive(){
                this.$router.push({ path: '/allactive'}) // -> /user
            },
            to_dynamicdetail(id){
                this.$router.push({ path: '/dynamicdetail',query:{dynamic_id:id}}) // -> /user
            },
        }

    }
</script>

<style scoped>

    .club_big_box{
        width:100%;
        height:calc(100vh - 2.28rem);
        margin-top:0.88rem;
        overflow: scroll;
        padding-bottom:1.4rem;

    }
    .club_big_box_authorized{
        height:calc(100vh - 0.88rem);
        padding-bottom:0;
    }

    .creat_club_box{
        width:100%;
        height:1.3rem;
        background: #f0f0f0;
        position: fixed;
        left:0;
        right:0;
        bottom:0;
        margin:auto;
        box-shadow: 0 0 0.08rem #ccc;
    }



    .creat_club{
        width:6.8rem;
        height:0.9rem;
        margin:auto;
        margin-top:0.2rem;
        background: #f7282f;
        color: #fff;
        text-align: center;
        line-height:0.9rem;
        font-size: 0.3rem;
        border-radius: 0.1rem;

    }

    .creat_club_box1 .creat_club{
        background: #bfbfbf;
    }

    .club_dynamic_main{
        width:100%;
        height:auto;
        /*padding:0 0.1rem;*/
        color: #4d4d4d;
        line-height: 0.48rem;
        font-size: 0.26rem;
        /*padding-top:0.2rem;*/
        box-sizing: border-box;
        padding-bottom:0.1rem;
    }
    .club_dynamic_main>.dynamic_main1{
        width:100%;
        height:1rem;
        display:flex;
        justify-content: space-between;
        /*margin-top:0.2rem;*/
        padding:0 0.1rem;

    }

    .club_dynamic_main>.dynamic_main1>.dynamic_main1_user{
        display: block;
        width:1rem;
        height:1rem;
        border-radius: 1rem;
    }

    .club_dynamic_main>.dynamic_main1>.dynamic_main1_user>img{
        display: block;
        width:1rem;
        height:1rem;
        border-radius: 1rem;
    }
    .club_dynamic_main>.dynamic_main1>.dynamic_main1_center{
        width:4rem;
        height:auto;
        overflow: hidden;
    }
    .club_dynamic_main>.dynamic_main1>.dynamic_main1_center>.dynamic_m1c1{
        width:100%;
        font-size: 0.28rem;
        height:0.28rem;
        line-height: 0.28rem;
        color: #1a1a1a;
        margin-top:0.26rem;
    }
    .club_dynamic_main>.dynamic_main1>.dynamic_main1_center>.dynamic_m1c2{
        width:100%;
        font-size: 0.22rem;
        color: #bfbfbf;
        margin-top:0.1rem;
        height:0.22rem;
        line-height: 0.22rem;
    }

    .club_dynamic_main>.dynamic_main1>.dynamic_main1_right{
        width:1.4rem;
        text-align: right;
        font-size: 0.24rem;
        color: #989898;
        margin-top:0.24rem;
        margin-right:0.24rem;
    }


    .club_dynamic_main>.dynamic_main2{
        padding:0.15rem 0.1rem 0 0.1rem;
        width:100%;
        height:auto;
        box-sizing: border-box;
        font-size: 0.26rem;
        color: #4d4d4d;
        line-height:0.48rem;
    }

    .club_dynamic_main>.dynamic_main3{
       width:100%;
        height:auto;
        overflow: hidden;
    }



    .club_dynamic_main>.dynamic_main3>.dynamic_main3_img{
        display: block;
        float: left;
        margin-top:0.1rem;
        margin-left:0.1rem;
        width:3.26rem;
        height:2.35rem;
    }

    .club_dynamic_main>.dynamic_main3>.dynamic_main3_img>img{
        display: block;
        width:100%;
        height:100%;
        object-fit: cover;
    }

    .club_dynamic_main>.dynamic_main4{
        padding:0 0.1rem;
        display: flex;
        align-items: center;
        width:100%;
        height:0.6rem;
        box-sizing: border-box;
        font-size: 0.26rem;
        color: #4d4d4d;
        justify-content: space-between;
    }

    .club_dynamic_main>.dynamic_main4 .dynamic_m41,.club_dynamic_main .dynamic_main4 .dynamic_m42,.club_dynamic_main>.dynamic_main4 .dynamic_m43,.club_dynamic_main>.dynamic_main4 .dynamic_m44{
        height:100%;
        line-height: 0.6rem;
        vertical-align: middle;
        display: flex;
        align-items: center;
        color: #999;

    }



    .club_dynamic_main>.dynamic_main4 .dynamic_m42{
        margin-left:0.4rem;
    }

    .club_dynamic_main>.dynamic_main4 .dynamic_m4a{
        width:3rem;
        display: flex;
        align-items: center;
    }
    .club_dynamic_main>.dynamic_main4 .dynamic_m4b{
        width:2rem;
        display: flex;
        align-items: center;
        justify-content: flex-end;
    }
    .club_dynamic_main>.dynamic_main4 .dynamic_m43{
        margin-right:0.35rem;
    }

    .club_dynamic_main>.dynamic_main4 .dynamic_m44{

        color: #4d4d4d;

    }

    .club_dynamic_main>.dynamic_main4 .dynamic_m41>img{
        width:0.27rem;
        height:0.25rem;
        margin-top:0.02rem;
    }

    .club_dynamic_main>.dynamic_main4 .dynamic_m42>img{
        width:0.3rem;
        height:0.28rem;
        margin-top:0.04rem;
    }

    .club_members_main{
        width:100%;
        height:1.2rem;
        padding:0 0.1rem;
        color: #4d4d4d;
        line-height: 0.48rem;
        box-sizing: border-box;
        font-size: 0.26rem;
        display: flex;
        justify-content: space-between;
        padding-bottom:0.5rem;

    }
    .club_members_main>.club_members{
        width:6.6rem;
        height:0.7rem;
        /*margin-top:0.2rem;*/

    }
    .club_members_main>.club_members>.club_members_img{
        display: block;
        width:0.7rem;
        height:0.7rem;
        border-radius: 0.7rem;
        float: left;
        margin-left:-0.12rem;
    }
    .club_members_main>.club_members>.club_members_img>img{
        display: block;
        width:100%;
        height:100%;
        border-radius: 0.7rem;
        border:1px solid #f8f8f8;
    }
    .club_members_main>.club_members>.club_members_img:nth-child(1){
        margin-left:0;

    }

    .club_members_main>.club_members_num{
        width:auto;
        height:100%;
        display: flex;
        align-items: center;
        font-size: 0.24rem;
        color: #a6a6a6;
    }
    .club_members_main>.club_members_num>span{
        font-size: 0.4rem;
        /*font-weight: bold;*/
        font-family: "DINCondensedC";
    }

    .club_members_main>.club_members_num>img{
        width:0.11rem;
        height:0.19rem;
        margin-left:0.1rem;
    }
    
    .club_announ_main{
        width:100%;
        height:auto;
        padding:0 0.1rem;
        color: #4d4d4d;
        line-height: 0.48rem;
        font-size: 0.26rem;
        /*padding-top:0.2rem;*/
        box-sizing: border-box;
        
    }

    .club_announ_mainzq{
        width:100%;
        height:1rem;
        padding:0 0.1rem;
        box-sizing: border-box;
        color: #4d4d4d;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .club_announ_mainzq .zq_center{
        width:5.75rem;
    }

    .club_announ_mainzq .zq_logo{
        display: block;
        width:0.5rem;
        height:0.5rem;
    }
    .club_announ_mainzq .zq_jiant{
        display: block;
        width:0.11rem;
        height:0.19rem;
    }

    .club_announ_box{
        width:7.2rem;
        height:auto;
        margin: auto;
        margin-top:0.2rem;
        background: #fff;
        border-radius: 0.1rem;

    }

    .club_announ{
        width:6.9rem;
        height:auto;
        margin:auto;
    }

    .club>.club_main{
        width:100%;
        height:2rem;
        padding:0.25rem 0;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-top:1px solid #e6e6e6;

    }


    .club>.club_main>.club_main_left{
        width:2rem;
        height: 1.5rem;

    }
    .club>.club_main>.club_main_left>img{
        display: block;
        width:100%;
        height:100%;
        object-fit: cover;

    }
    .club>.club_main>.club_main_right{
        width:4.52rem;
        height: 1.5rem;
    }
    .club>.club_main>.club_main_right>.club_main_right1{
        width:100%;
        height:0.36rem;
        font-size: 0.26rem;
        line-height:0.36rem;
        font-weight: bold;
        color: #4d4d4d;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
    }

    .club>.club_main>.club_main_right>.club_main_right2{
        width:100%;
        height:0.3rem;
        font-size: 0.22rem;
        line-height:0.3rem;
        color: #999;
        margin-top:0.1rem;
    }

    .club>.club_main>.club_main_right>.club_main_right2>.club_main_right2_tap1{
        width:auto;
        font-size: 0.22rem;
        height:0.26rem;
        line-height:0.28rem;
        border:1px solid #f7282f;
        border-radius: 0.06rem;
        padding:0 0.14rem;
        float: left;
        margin-left:0.14rem;
        color: #f7282f;
        margin-top:0.01rem;

    }

    .club>.club_main>.club_main_right>.club_main_right2>.club_main_right2_tap1:nth-child(1){
        margin-left:0;
    }

    .club>.club_main>.club_main_right>.club_main_right2>.club_main_right2_peoper{
        width:auto;
        font-size: 0.24rem;
        color: #999;
        margin-left:0.2rem;
        height:100%;
        line-height:0.3rem;
        float: left;
    }

    .club>.club_main>.club_main_right>.club_main_right3{
        height:auto;
        width:100%;
        margin-top:0.1rem;
        line-height:0.34rem;
        font-size: 0.24rem;
        color: #4d4d4d;
        overflow: hidden;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;


    }

    .active_box{
        width:7.2rem;
        height:auto;
        margin:auto;
        margin-top:0.2rem;
        background: #fff;

        border-radius: 0.1rem;

    }
    .active{
        width:6.9rem;
        height:auto;
        margin:auto;
    }

    .active_title .title_center{
        color: #1a1a1a;
        margin-right:0.56rem;
        font-size: 0.3rem;
        font-weight: bold;
        margin-left:0.05rem;

    }
    .active_title .title_center>span{
        color: #aaaaaa;
        font-size: 0.24rem;
        font-weight: normal;
    }

    .active_title{
        width:100%;
        height:1.1rem;
        display: flex;
        justify-content: space-between;
        align-items: center;


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

    .act_main{
        width:100%;
        height:2rem;
        display: flex;
        justify-content: space-between;
        margin-top:0.5rem;
    }
    .act_main_a1{
        margin-top:0;
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
        width:4.6rem;
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




    .sign_box{
        width:7.2rem;
        height:3rem;
        background: #fff;
        border-radius: 0.1rem;
        margin:auto;
        display: flex;
        justify-content: space-between;
        position: relative;
    }

    .sign_box>.sign_left{
        width:3.06rem;
        height:1.2rem;
        position: absolute;
        left:0;
        right:0;
        top:0.67rem;
        margin:auto;
    }
    .sign_box>.sign_left>img{
        display: block;
        width:100%;
        height:100%;
    }
 .sign_box>.sign_but{
        width:100%;
        height:0.28rem;
        position: absolute;
        left:0;
        right:0;
        bottom:0.5rem;
        margin:auto;
        text-align: center;
        font-size: 0.28rem;
        color: #a6a6a6;
    }
    .sign_box>.sign_center{
        width:4.3rem;
        height:auto;
        margin-top:0.3rem;
    }

    .sign_box>.sign_center>.sign_center_tit{
        width:100%;
        font-size: 0.28rem;
        font-weight: bold;
        color: #1a1a1a;
    }

    .sign_box>.sign_center>.sign_center_title{
        width:100%;
        font-size: 0.26rem;
        color: #a6a6a6;
        margin-top:0.1rem;
    }

    .sign_box>.sign_right{
        width:1.3rem;
        height:0.5rem;
        background: #f7282f;
        color: #fff;
        text-align: center;
        line-height: 0.5rem;
        border-radius: 0.1rem;
        margin-right:0.3rem;
        margin-top:0.5rem;
    }

    .sign_box>.sign_right1{
        width:1.3rem;
        height:0.5rem;
        color: #1a1a1a;
        text-align: center;
        line-height: 0.5rem;
        border-radius: 0.1rem;
        margin-right:0.3rem;
        margin-top:0.5rem;
    }

    .club_banner_box{
        width:100%;
        height:5.86rem;
        position: relative;
    }

    .banner_img_a{
        display: block;
        width:100%;
        height:3.78rem;
    }

    .banner_img{
        display: block;
        width:100%;
        height:100%;
        object-fit: cover;
        filter: blur(20px);
	-webkit-filter: blur(20px);  /* chrome, opera */		
	-ms-filter: blur(20px);		
	-moz-filter: blur(20px);
    }

    .banner_box{
        width:100%;
        height:100%;
        position: absolute;
        top:0;
        left:0;
    }

    .banner_box .but_top{
        width:2rem;
        height:0.5rem;
        position: absolute;
        right:0.46rem;
        top:0.25rem;
        display: flex;
        justify-content: flex-end;
        align-items: center;
    }

    .banner_box .but_top .but_top1{
        display: block;
        width:0.46rem;
        height:0.47rem;
        margin-right:0.22rem;
    }
    .banner_box .but_top .but_top2{
        display: block;
        width:0.48rem;
        height:0.46rem;
    }
    .banner_box .but_top .but_top3{
        display: block;
        width:0.48rem;
        height:0.48rem;
        margin-right:0.22rem;
    }


    .club_main{
        width:100%;
        height:2.87rem;
        padding:0.75rem 0.35rem 0.44rem 0.35rem;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .club_main>.club_main_left{
        width:1.7rem;
        height: 1.7rem;
        border:0.04rem solid #fff;
        border-radius: 0.1rem;
    }
    .club_main>.club_main_left>img{
        width:100%;
        height:100%;
        object-fit: cover;
        background: palegoldenrod;
        border:none;
        border-radius: 0.1rem;
    }
    .club_main>.club_main_right{
        width:4.92rem;
        height: 1.7rem;
        position: relative;
    }

    .club_main>.club_main_right .to_join{
        width:1.2rem;
        height:0.4rem;
        background: #f7282f;
        color: #fff;
        text-align: center;
        line-height:0.4rem;
        border-radius: 0.1rem;
        position: absolute;
        font-size: 0.24rem;
        top:0;
        right:0.04rem;

    }
    .club_main>.club_main_right>.club_main_right1{
        width:100%;
        height:0.48rem;
        font-size: 0.32rem;
        line-height:0.48rem;
        /*font-weight: bold;*/
        color: #fff;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
    }

    .club_main>.club_main_right>.club_main_right2{
        width:100%;
        height:0.32rem;
        font-size: 0.22rem;
        line-height:0.32rem;
        color: #fff;
        margin-top:0.1rem;
    }

    .club_main>.club_main_right>.club_main_right2>.club_main_right2_tap1{
        width:auto;
        font-size: 0.22rem;
        height:0.32rem;
        line-height:0.32rem;
        background: #f7282f;
        border-radius: 0.1rem;
        padding:0 0.14rem;
        float: left;
        margin-left:0.14rem;
        color: #fff;
        /*margin-top:0.01rem;*/

    }

    .club_main>.club_main_right>.club_main_right2>.club_main_right2_tap1:nth-child(1){
        margin-left:0;
    }

    .club_main>.club_main_right>.club_main_right2>.club_main_right2_peoper{
        width:auto;
        font-size: 0.24rem;
        color: #fff;
        margin-left:0.2rem;
        height:100%;
        line-height:0.32rem;
        float: left;
    }

    .club_main>.club_main_right>.club_main_right3{
        height:auto;
        width:100%;
        line-height:0.34rem;
        font-size: 0.24rem;
        color: #fcedeb;
        overflow: hidden;
        display: flex;
        align-items: center;
        margin-top:0.2rem;


    }

    .club_main>.club_main_right>.club_main_right3>span{
                font-size: 0.24rem;
    }

    .club_main_right3>img{
        width:0.23rem;
        height:0.25rem;
        /*vertical-align: middle;*/
    }
    .club_main_right3>span{
       margin-left:0.1rem;
    }

    .club_main>.club_main_right>.club_main_right4{
        height:auto;
        width:100%;
        line-height:0.34rem;
        font-size: 0.24rem;
        color: #fcedeb;
        overflow: hidden;

    }


</style>
