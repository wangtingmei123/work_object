<template>
    <div style="min-height: 100vh;overflow: hidden;">
        <Header :title="title" :show="show" :backpage="backpage"></Header>
        <div class="club_dynamic_box" style="margin-bottom: 1.5rem" ref="opBottomEcharts" @scroll="gotoScroll()">
            <div class="club_dynamic_main">
                <div class="dynamic_main1">
                    <div class="dynamic_main1_user" >
                        <img v-if="dynamic_user.avatar!=''" :src="dynamic_user.avatar" alt="">
                        <img v-if="dynamic_user.avatar==''" :src="club_members" alt="">
                    </div>
                    <div class="dynamic_main1_center">
                        <div class="dynamic_m1c1">{{dynamic_user.user_name}}</div>
                        <div class="dynamic_m1c2">{{dynamic_user.department}}</div>
                    </div>
                    <div class="dynamic_main1_right">
                        {{dynamic.time}}
                    </div>
                </div>
                <div class="dynamic_main2">
                   {{dynamic.contents}}
                </div>
                <div class="dynamic_main3">
                    <div class="dynamic_main3_img"  v-for="(items,index) in dynamic.image_data" :key="index">
                        <img :src="items" alt=""  @click="showBigImg(items)">
                    </div>
                </div>

                <div class="dynamic_main4">
                    <div class="dynamic_m4a">
                        <div class="dynamic_m41" @click="touch_like(dynamic.dynamic_praise_id,dynamic.id)">
                            <img v-show="dynamic.dynamic_praise_id!=0" :src="like_img" alt="">
                            <img v-show="dynamic.dynamic_praise_id==0" :src="like_img_false" alt="">
                            <span style="margin-left:0.08rem;">{{dynamic.praise_count}}</span>
                        </div>
                        <div class="dynamic_m42"  @click="comment(dynamic.id)"><img :src="ping_img" alt=""><span style="margin-left:0.08rem;">{{dynamic.reply_count}}</span></div>
                    </div>
                    <div class="dynamic_m4b">
                        <div class="dynamic_m43" v-if="dynamic.is_self_release==1&&dynamic.is_audited==0">审核中</div>
                        <div class="dynamic_m43" v-if="dynamic.is_self_release==1&&dynamic.is_audited==1">已审核</div>
                        <div class="dynamic_m44" v-if="dynamic.is_self_release==1" @click="touch_del(dynamic.id)">删除</div>
                    </div>

                </div>
            </div>
            <div class="club_members_main" @click="to_likelist(dynamic.id)">
                <div class="club_members">
                    <div class="club_members_img" v-for="(item,index) in like_list" :key="index">
                        <img v-if="item.user.avatar==''" :src="club_members" alt="">
                        <img v-if="item.user.avatar!=''" :src="item.user.avatar" alt="">
                    </div>
                </div>
                <div class="club_members_num">{{dynamic.praise_count}}人赞了 <img class="right_tipa" :src="right_tip" alt="" ></div>
            </div>
            <div class="comment_box" v-if="coment_list.length>0">
                <div class="comment_num">{{dynamic.reply_count}}人回复过</div>
                <div>
                    <div class="club_dynamic_main" style="padding-bottom:0;width:6.8rem;padding:0;margin:auto" v-for="(item,index) in coment_list" :key="index">
                        <div class="dynamic_main1">
                            <div class="dynamic_main1_user">
                                <img v-if="item.user.avatar!=''" :src="item.user.avatar" alt="">
                                <img v-if="item.user.avatar==''" :src="club_members" alt="">
                            </div>
                            <div class="dynamic_main1_center">
                                <div class="dynamic_m1c1">{{item.user.user_name}}</div>
                                <div class="dynamic_m1c2">{{item.time}}</div>
                            </div>
                            <div class="dynamic_main1_right">

                            </div>
                        </div>
                        <div class="dynamic_main2">
                            {{item.contents}}
                        </div>
                    </div>
                </div>

            </div>
        </div>
        <div class="but_flex">
            <div v-show="dynamic.dynamic_praise_id==0" class="but_flex1" @click="touch_like(dynamic.dynamic_praise_id,dynamic.id)">点赞</div>
            <div class="but_flex1" v-show="dynamic.dynamic_praise_id!=0" @click="touch_like(dynamic.dynamic_praise_id,dynamic.id)">取消点赞</div>
            <div class="but_flex2" @click="comment(dynamic.id)">回复</div>
        </div>
        <wimg :show="isShowBigImg" :imgs="dynamic_image_data" :currentImg="current" @close="isShowBigImg = false"></wimg>
        <Eject  type='alert' @took='okfall' :showstate='showa' >
            <div slot='text'>{{show_tip}}</div>
        </Eject>
        <Eject  type='alert'  @tocancel="nofall"  @took='okfall1' :showstate='showa1'  :cancel='cancel'>
            <div slot='text'>{{show_tip1}}</div>
        </Eject>
        <div class="hide_tip_box" v-show="hidea">
            <div class="hide_tip">{{hide_tip}}</div>
        </div>
    </div>
</template>


<script>
    import Header from './Header'
    import wimg from 'w-previewimg'
    import Eject from './eject'
    export default {
        components: { Header,wimg,Eject },
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
                dynamic: [],
                tap_selece:1,
                title: '动态详情',
                show: true,
                backpage: '',
                like_img:'./static/img/07club_40.png',
                like_img_false:'./static/img/07clunindexlike_29.png',
                ping_img:'./static/img/07club_42.png',
                imgs: ["./static/img/03index_29.png",
                    "./static/img/03index_06.png",
                ],
                club_members:'./static/img/07club_32.png',
                right_tip:'./static/img/03index_25.png',
                isShowBigImg: false,
                current :'',
                dynamic_id:'',
                can_show:true,
                page:0,
                clientHeight:'',
                scrollHeight:'',
                scrollTop:'',
                page_end:true,
                loadFlag:true,
                coment_list:[],
                dynamic_user:[],
                dynamic_image_data:[],
                like_list:[],
                is_authorized:'',
                is_joined:'',
                is_signed:'',
                is_verified:'',

            }
        },
        created() {
            let _this=this
            this.dynamic_id=this.$route.query.dynamic_id;
            _this.authis()
            _this.dynamicinfo()
            _this.replies()
            _this.like()


        },
        mounted() {

        },
        methods: {
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
            like(){
                let _this=this;
                this.$axios.get("dynamic-praise",{
                    headers: {
                        'Authorization': localStorage.getItem('token_type') + ' '+localStorage.getItem('access_token'),
                    },
                    params: {
                        "dynamic":_this.dynamic_id,
                        "page":0
                    }
                }).then(res=>{
                    console.log(res)
                    if(res.status==200){
                        _this.like_list=res.data.data.slice(0,10);
                    }else {

                    }
                })
                    .catch(err=>{
                        console.log(err)
                    })
            },
            replies(){
                let _this=this;

                this.$axios.get("/dynamic-replies",{
                    headers: {
                        'Authorization': localStorage.getItem('token_type') + ' '+localStorage.getItem('access_token'),
                    },
                    params: {
                        "dynamic_id":_this.dynamic_id,
                        "page":_this.page
                    }
                }).then(res=>{
                    console.log(res)
                    if(res.status==200){
                        console.log(res)
                        if(res.data.data.length<_this.GLOBAL.page_total){
                            _this.page_end=false
                        }
                        let coment_list=_this.coment_list;
                        if(coment_list.length==0){
                            coment_list=res.data.data
                        }else{
                            coment_list.push.apply(coment_list,res.data.data);
                        }
                        _this.coment_list=coment_list;
                        _this.loadFlag=false;

                    }else {

                    }
                })
                    .catch(err=>{
                        console.log(err)
                    })
            },
            gotoScroll(){
                console.log("ppp")
                let _this=this
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
                        _this.replies()
                    }

                }
            },
            dynamicinfo(){
                let _this=this
                _this.$axios.get("/dynamics/"+_this.dynamic_id,{
                    headers: {
                        'Authorization': localStorage.getItem('token_type') + ' '+localStorage.getItem('access_token'),
                    },
                    params: {
//                    "id":_this.dynamic_id,
                    }
                }).then(res=>{
                    console.log(res.data.data)
                    if(res.status==200){
                        _this.dynamic=res.data.data;
                        _this.dynamic_user=res.data.data.user;
                        _this.dynamic_image_data=res.data.data.image_data;
                        console.log(_this.dynamic.user.avatar)

                    }else {
                        _this.showa=true;
                        _this.show_tip=res.data.message;
                    }
                })
                    .catch(err=>{
                        console.log(err)
                    })
            },
            to_likelist(id){
                this.$router.push({ path: '/likelist',query:{dynamic_id:id}}) // -> /user
            },
            touch_del(id){
                let _this=this;
                _this.$axios.delete("/dynamics",{
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
                            _this.$router.go(-1);
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
            touch_like(dynamic_praise_id,id){
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
                                _this.dynamic.praise_count+=1
                                _this.dynamic.dynamic_praise_id=res.data.data.id;
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
                        _this.$axios.delete("/dynamic-praise",{
                            headers: {
                                'Authorization': localStorage.getItem('token_type') + ' '+localStorage.getItem('access_token'),
                            },
                            params: {
                                "id":dynamic_praise_id,
                            }
                        }).then(res=>{
                            _this.can_show=true
                            if(res.status==200){
                                _this.dynamic.praise_count-=1
                                _this.dynamic.dynamic_praise_id=0;
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
            tap_bind(tap){
                this.tap_selece=tap
            },
            showBigImg (i) {
                this.current = i
                this.isShowBigImg = true
                // let _this=this;
                // console.log(i)
                // wx.previewImage({
                //     current: i, // 当前显示图片的http链接
                //     urls: _this.dynamic.image_data // 需要预览的图片http链接列表
                //     });
            },
            comment(id){
                let _this=this
                if(_this.is_joined==true && _this.is_verified==true){
                    this.$router.push({ path: '/dynamicreply',query:{dynamic_id:id}}) // -> /user
                }else{
                    _this.showa=true;
                    _this.show_tip='您还不是该俱乐部成员，没有权限';
                    return
                }

            },
            okfall(){
                this.showa=false;
            },
            okfall1(){
                this.showa1=false;
            },
            nofall(){
                this.showa=false;
            },
        }

    }
</script>

<style scoped>

    .but_flex{
        width:100%;
        height:1.3rem;
        margin:auto;
        position: fixed;
        left:0;
        right:0;
        bottom:0;
        background: #f7f7f7;
        padding:0 0.2rem;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        justify-content: space-between;
        box-shadow: 0 0 0.08rem #ccc;
    }
    .but_flex>.but_flex1,.but_flex>.but_flex2{
        width:3.44rem;
        height:0.9rem;
        background: #fe5857;
        color: #fff;
        /*font-weight: bold;*/
        text-align: center;
        line-height:0.9rem;
        border-radius: 0.1rem;
        font-size: 0.3rem;
    }
    .but_flex>.but_flex2{
        background: #1a1a1a;
    }
    .comment_box{
        width:7.1rem;
        height:auto;
        margin:auto;
        background: #fff;
        margin-top:0.15rem;
        border-radius: 0.04rem;
    }

    .comment_num{
        width:6.8rem;
        margin:auto;
        height:0.7rem;

        font-size: 0.24rem;
        color: #989898;
        text-align: right;
        line-height:0.7rem;
    }


    .club_members_main{
        width:7.2rem;
        height:1rem;
        margin:auto;
        background: #fff;
        padding:0 0.2rem;
        color: #4d4d4d;
        line-height: 0.48rem;
        font-size: 0.26rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        box-sizing: border-box;
        margin-top:0.15rem;
        border-radius: 0.04rem;


    }
    .club_members_main>.club_members{
        width:4.6rem;
        height:0.5rem;

    }

    .club_members_main>.club_members>.club_members_img{
        display: block;
        width:0.5rem;
        height:0.5rem;
        border-radius: 0.5rem;
        float: left;
        margin-left:-0.12rem;
    }
    .club_members_main>.club_members>.club_members_img>img{
        display: block;
        width:0.5rem;
        height:0.5rem;
        border-radius: 0.5rem;
        float: left;
        margin-left:-0.08rem;
    }
    .club_members_main>.club_members>.club_members_img:nth-child(1){
        margin-left:0;

    }

    .club_members_main>.club_members_num{
        width:auto;
        height:100%;
        display: flex;
        align-items: center;
        font-size: 0.28rem;
        color: #a6a6a6;
    }
    .club_members_main>.club_members_num>span{
        font-size: 0.28rem;

    }

    .club_members_main>.club_members_num>img{
        width:0.11rem;
        height:0.19rem;
        margin-left:0.1rem;
    }



    .club_dynamic_box{
        width:7.2rem;
        height:calc(100vh - 1.23rem);
        margin:auto;
        margin-top:1.03rem;
        padding-bottom:0.2rem;
        overflow: scroll;

    }
    .club_dynamic_main:nth-child(1){
        margin-top:0;

    }

    .comment_box .club_dynamic_main:nth-child(1){
        border-top:1px solid #e6e6e6;
    }

    .club_dynamic_main{
        width:7.2rem;
        margin:auto;
        height:auto;
        background: #fff;
        padding:0 0.1rem;
        color: #4d4d4d;
        line-height: 0.48rem;
        font-size: 0.26rem;
        overflow: hidden;
        box-sizing: border-box;
        padding-bottom:0.32rem;
        margin-top:0.1rem;
        border-radius: 0.04rem;

    }
    .club_dynamic_main>.dynamic_main1{
        width:100%;
        height:1rem;
        display:flex;
        justify-content: space-between;
        margin-top:0.2rem;
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
        margin-top:0.12rem;
        margin-left:0.12rem;
        width:2.18rem;
        height:2.02rem;
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






</style>
