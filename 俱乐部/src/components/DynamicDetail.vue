<template>
    <div style="background: #f7f7f7;min-height: 100vh;overflow: hidden;">
        <Header :title="title" :show="show" :backpage="backpage"></Header>
        <div class="club_dynamic_box" style="margin-bottom: 1.3rem">
            <div class="club_dynamic_main">
                <div class="dynamic_main1">
                    <div class="dynamic_main1_user">
                        <img :src="dynamic.img" alt="">
                    </div>
                    <div class="dynamic_main1_center">
                        <div class="dynamic_m1c1">{{dynamic.name}}</div>
                        <div class="dynamic_m1c2">{{dynamic.bumne}}</div>
                    </div>
                    <div class="dynamic_main1_right">
                        1小时前
                    </div>
                </div>
                <div class="dynamic_main2">
                   {{dynamic.con}}
                </div>
                <div class="dynamic_main3">
                    <div class="dynamic_main3_img"  v-for="i in imgs">
                        <img :src="i" alt=""  @click="showBigImg(i)">
                    </div>

                </div>

                <div class="dynamic_main4">
                    <div class="dynamic_m4a">
                        <div class="dynamic_m41" @click="touch_like(dynamic.is_like,dynamic.id)">
                            <img v-show="dynamic.is_like" :src="like_img" alt="">
                            <img v-show="dynamic.is_like==false" :src="like_img_false" alt="">
                            <span style="margin-left:0.08rem;">{{dynamic.like}}</span>
                        </div>
                        <div class="dynamic_m42"  @click="comment(dynamic.id)"><img :src="ping_img" alt=""><span style="margin-left:0.08rem;">{{dynamic.comment}}</span></div>
                    </div>
                    <div class="dynamic_m4b">
                        <div class="dynamic_m43">审核中</div>
                        <div class="dynamic_m44" @click="touch_del(dynamic.id)">删除</div>
                    </div>

                </div>
            </div>
            <div class="club_members_main">
                <div class="club_members">
                    <img :src="club_members" alt="">
                    <img :src="club_members" alt="">
                    <img :src="club_members" alt="">
                    <img :src="club_members" alt="">
                    <img :src="club_members" alt="">
                    <img :src="club_members" alt="">
                </div>
                <div class="club_members_num">{{dynamic.like}}人赞了 <img class="right_tipa" :src="right_tip" alt="" ></div>
            </div>
            <div class="comment_box">
                <div class="comment_num">{{dynamic.comment}}人回复过</div>
                <div class="club_dynamic_main" style="padding-bottom:0">
                    <div class="dynamic_main1">
                        <div class="dynamic_main1_user">
                            <img :src="club_members" alt="">
                        </div>
                        <div class="dynamic_main1_center">
                            <div class="dynamic_m1c1">林夏美</div>
                            <div class="dynamic_m1c2">5分钟前</div>
                        </div>
                        <div class="dynamic_main1_right">

                        </div>
                    </div>
                    <div class="dynamic_main2">
                        日升，日落，人海浮沉
                    </div>
                </div>
                <div class="club_dynamic_main" style="padding-bottom:0">
                    <div class="dynamic_main1">
                        <div class="dynamic_main1_user">
                            <img :src="club_members" alt="">
                        </div>
                        <div class="dynamic_main1_center">
                            <div class="dynamic_m1c1">林夏美</div>
                            <div class="dynamic_m1c2">5分钟前</div>
                        </div>
                        <div class="dynamic_main1_right">

                        </div>
                    </div>
                    <div class="dynamic_main2">
                        日升，日落，人海浮沉
                    </div>
                </div>
                <div class="club_dynamic_main" style="padding-bottom:0">
                    <div class="dynamic_main1">
                        <div class="dynamic_main1_user">
                            <img :src="club_members" alt="">
                        </div>
                        <div class="dynamic_main1_center">
                            <div class="dynamic_m1c1">林夏美</div>
                            <div class="dynamic_m1c2">5分钟前</div>
                        </div>
                        <div class="dynamic_main1_right">

                        </div>
                    </div>
                    <div class="dynamic_main2">
                        日升，日落，人海浮沉
                    </div>
                </div>
            </div>
        </div>
        <div class="but_flex">
            <div v-show="dynamic.is_like==false" class="but_flex1" @click="touch_love(dynamic.is_like,dynamic.id)">点赞</div>
            <div class="but_flex1" v-show="dynamic.is_like" @click="touch_love(dynamic.is_like,dynamic.id)">取消点赞</div>
            <div class="but_flex2" @click="comment(dynamic.id)">回复</div>
        </div>
        <wimg :show="isShowBigImg" :imgs="imgs" :currentImg="current" @close="isShowBigImg = false"></wimg>
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
                 dynamic:  {'id':1,'name':'王哈哈','img':'./static/img/07club_32.png','bumne':'技术部','time':'1小时前','con':'日升，日落, 人海浮沉','like':123,'comment':'24','is_like':false},
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
                current :''
            }
        },
        created() {

        },
        mounted() {

        },
        methods: {
            touch_del(id){
                // var comm=this.dynamic;
                // comm=[];
                // this.dynamic=comm
            },
            touch_like(is_like,id){
                var comm=this.dynamic;
                if(is_like){
                    comm.like-=1
                }else{
                    comm.like+=1
                }
                comm.is_like=!is_like;
                this.dynamic=comm
            },
            touch_love(is_like,id){
                var comm=this.dynamic;
                if(is_like){
                    comm.like-=1
                }else{
                    comm.like+=1
                }
                comm.is_like=!is_like;
                this.dynamic=comm
            },
            tap_bind(tap){
                this.tap_selece=tap
            },
              showBigImg (i) {
                this.current = i
                this.isShowBigImg = true
            },
            comment(){
                this.$router.push({ path: '/dynamicreply'}) // -> /user
            }
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
        border-bottom:1px solid #e6e6e6;
        font-size: 0.24rem;
        color: #989898;
        text-align: right;
        line-height:0.7rem;
    }
    .club_members_main{
        width:7.1rem;
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
    .club_members_main>.club_members>img{
        display: block;
        width:0.5rem;
        height:0.5rem;
        border-radius: 0.5rem;
        float: left;
        margin-left:-0.08rem;
    }
    .club_members_main>.club_members>img:nth-child(1){
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
        width:7.1rem;
        height:auto;
        margin:auto;
        margin-top:1.03rem;
        margin-bottom:0.2rem;

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
