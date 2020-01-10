<template>
    <div style="background: #f7f7f7;min-height: 100vh;overflow: hidden;">
        <Header :title="title" :show="show" :backpage="backpage"></Header>
        <div class="rank_list">
            <div class="rank_list_title">
                <div class="list_tap " :class="{list_tap_select:tap_selece==0}" @click="tap_bind(0)">全部</div>
                <div class="list_tap" :class="{list_tap_select:tap_selece==1}" @click="tap_bind(1)">我的动态</div>
            </div>
        </div>
        <div class="club_dynamic_box" ref="opBottomEcharts4" @scroll="gotoScroll()">
            <div>


            <div  class="club_dynamic_main" v-for="(item,index) in dynamic_list" >
                <div class="dynamic_main1" @click="to_dynamicdetail(item.id)">
                    <div class="dynamic_main1_user">
                        <img v-show="item.user.avatar!=''" :src="item.user.avatar" alt="">
                        <img v-show="item.user.avatar==''" :src="club_members" alt="">
                    </div>
                    <div class="dynamic_main1_center">
                        <div class="dynamic_m1c1" v-if="item.is_self_release==1">{{item.user.user_name}}</div>
                        <div class="dynamic_m1c1" v-if="item.is_self_release==0">{{item.user.user_name}}</div>
                        <div class="dynamic_m1c2">{{item.user.department}}</div>
                    </div>
                    <div class="dynamic_main1_right">
                        {{item.time}}
                    </div>
                </div>
                <div class="dynamic_main2" @click="to_dynamicdetail(item.id)">
                    {{item.contents}}
                </div>
                <div class="dynamic_main3" @click="to_dynamicdetail(item.id)" >
                    <div class="dynamic_main3_img"  v-for="(items,index) in item.image_data">
                        <img :src="items" alt="">
                    </div>

                </div>

                <div class="dynamic_main4">
                    <div class="dynamic_m4a">
                        <div class="dynamic_m41" @click="touch_like(index,item.is_like,item.id)">
                            <img v-show="item.is_praise==1" :src="like_img" alt="">
                            <img v-show="item.is_praise==0" :src="like_img_false" alt="">
                            <span style="margin-left:0.08rem;">{{item.praise_count}}</span>
                        </div>
                        <div class="dynamic_m42"  @click="comment(item.id)">
                            <img :src="ping_img" alt="">
                            <span style="margin-left:0.08rem;">{{item.reply_count}}</span>
                        </div>
                    </div>
                    <div class="dynamic_m4b">
                        <div class="dynamic_m43" v-if="tap_selece==1">审核中</div>
                        <div class="dynamic_m44" v-if="item.is_self_release==1" @click="touch_del(index,item.id)">删除</div>
                    </div>
                </div>
                <!--<div class="dynamic_main5">-->

                <!--</div>-->
            </div>
            </div>
        </div>
        <wimg :show="isShowBigImg" :imgs="imgs" :currentImg="current" @close="isShowBigImg = false"></wimg>
        <!--<div class="creat_club" @click="to_tribal">发布动态</div>-->
        <div class="creat_club_box">
            <div class="creat_club" @click="to_tribal">发布动态</div>
        </div>
    </div>
</template>


<script>
    import Header from './Header'
    import wimg from 'w-previewimg'
    export default {
        components: { Header,wimg },
        name: '',
        data() {
            return {
                dynamic_list:[],
                tap_selece:0,
                title: '全部动态',
                show: true,
                backpage: '',
                like_img:'./static/img/07club_40.png',
                like_img_false:'./static/img/07clunindexlike_29.png',
                ping_img:'./static/img/07club_42.png',
                imgs: ["./static/img/03index_29.png",
                    "./static/img/03index_06.png",
                ],
                club_members:'./static/img/07club_32.png',
                isShowBigImg: false,
                current :'',
                page:0,
                clientHeight:'',
                scrollHeight:'',
                page_end:true,
                act_list:[],
                stare:'',
                loadFlag:true
            }
        },
        created() {

            this.active_list()

        },
        mounted() {

//            this.$refs.opBottomEcharts4.addEventListener('scroll',this.gotoScroll)
        },
        methods: {
            to_tribal(){
                this.$router.push({ path: '/tribal'}) // -> /user
            },
            touch_del(index,id){
                var comm=this.dynamic_list;
                comm.splice(index,1);
                this.dynamic_list=comm
            },
            touch_like(index,is_like,id){
                 var comm=this.dynamic_list;
                if(is_like){
                    comm[index].like-=1
                }else{
                    comm[index].like+=1
                }
                comm[index].is_like=!is_like;
                this.dynamic_list=comm
            },
            tap_bind(tap){
                this.tap_selece=tap;
                this.page=0;
                this.dynamic_list=[];
                this.active_list()
            },
            to_dynamicdetail(){
                this.$router.push({ path: '/dynamicdetail'}) // -> /user
            },
            showBigImg (i) {
                this.current = i
                this.isShowBigImg = true
            },
            comment(){
                this.$router.push({ path: '/dynamicreply'}) // -> /user
            },
            active_list(){
                console.log(this.page)
                let _this=this;
                if(_this.loadFlag){
                _this.$axios.get("dynamics",{
                    headers: {
                        'Authorization': localStorage.getItem('token_type') + ' '+localStorage.getItem('access_token'),
                    },
                    params: {
                        "club_id":localStorage.getItem('club_id'),
                        "is_self":_this.tap_selece,
                        "page":_this.page
                    }
                }).then(res=>{
                    console.log(res)
                    if(res.status==200){
                        console.log(res)
                        if(res.data.data.length<4){
                            _this.page_end=false
                        }
                        let dynamic_list=_this.dynamic_list;
                        if(dynamic_list.length==0){
                            dynamic_list=res.data.data
                        }else{
                            dynamic_list.push.apply(dynamic_list,res.data.data);
                        }
                        console.log(dynamic_list)
                        _this.dynamic_list=dynamic_list;
                        _this.loadFlag=false
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
                this.clientHeight = this.$refs.opBottomEcharts4.clientHeight;
                this.scrollHeight =this.$refs.opBottomEcharts4.scrollHeight;
                let scrollTop=_this.$refs.opBottomEcharts4.scrollTop;

                //滚动条到底部的条件:div 到头部的距离 + 屏幕高度 = 可滚动的总高度
                console.log(scrollTop+"+"+this.clientHeight+"+"+this.scrollHeight)
                if(scrollTop+_this.clientHeight >= _this.scrollHeight){
                    console.log(_this.page_end)

                    if(_this.page_end&&_this.loadFlag==false){
                        _this.loadFlag=true
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
                this.dynamic_list=[];
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
        background: #ff5757;
        color: #fff;
        text-align: center;
        line-height:0.9rem;
        font-size: 0.3rem;
        font-weight: bold;
        border-radius: 0.1rem;

    }
    .rank_list{
        width:7.1rem;
        height:auto;
        background: #f7f7f7;
        margin:auto;
        top:0.88rem;
        left:0;
        right:0;
        position: fixed;

    }
    .rank_list_title{
        width:6.8rem;
        margin:auto;
        border-bottom:1px solid #e6e6e6;
        height:1rem;
        padding:0 0.15rem;

        display: flex;
        align-items: center;
        justify-content: space-around;
        margin-top:0.15rem;
        background: #fff;

    }


    .rank_list_title>.list_tap{
        width:3rem;
        height:100%;
        line-height:1rem;
        text-align: center;
        font-weight: bold;
    }
    .rank_list_title>.list_tap_select{
        border-bottom:0.02rem solid #ff5a57;
        color: #ff5a57;
        box-sizing: border-box;
    }


    .club_dynamic_box{
        width:7.1rem;
        margin:auto;
        margin-top:2.04rem;
        margin-bottom:1.3rem;
        height:calc(100vh - 3.34rem);
        overflow: scroll;

    }
    .club_dynamic_main:nth-child(1){
        margin-top:0
    }

    .club_dynamic_main{
        width:7.1rem;
        margin:auto;
        height:auto;
        background: #fff;
        padding:0 0.15rem;
        color: #4d4d4d;
        line-height: 0.48rem;
        font-size: 0.26rem;
        overflow: hidden;
        box-sizing: border-box;
        padding-bottom:0.32rem;
        margin-top:0.1rem;

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




</style>
