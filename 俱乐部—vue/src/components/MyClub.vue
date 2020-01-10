<template>
    <div style="background: #f7f7f7;min-height: 100vh">
        <Header :title="title" :show="show" :backpage="backpage"></Header>
        <div class="rank_list_box">
            <div class="rank_list">
                <div class="club_main" @click="to_clubindex">
                    <div class="club_main_left">
                        <img :src="club_img" alt="">
                    </div>
                    <div class="club_main_right">
                        <div class="club_main_right1">富山足球俱乐部</div>
                        <div class="club_main_right2">
                            <div class="club_main_right2_tap1">lv18</div>
                            <div class="club_main_right2_tap1">滑雪</div>
                            <div class="club_main_right2_peoper">20252人</div>
                        </div>
                        <div class="club_main_right3">富山足球俱乐部成立于2017年6月24日，建队以来共计参加国内比赛34场，荣获金杯6个，银杯12个...</div>

                    </div>
                </div>

                <div class="club_main">
                    <div class="club_main_left">
                        <img :src="club_img" alt="">
                    </div>
                    <div class="club_main_right">
                        <div class="club_main_right1">富山足球俱乐部</div>
                        <div class="club_main_right2">
                            <div class="club_main_right2_tap1">lv18</div>
                            <div class="club_main_right2_tap1">滑雪</div>
                            <div class="club_main_right2_peoper">20252人</div>
                        </div>
                        <div class="club_main_right3">富山足球俱乐部成立于2017年6月24日，建队以来共计参加国内比赛34场，荣获金杯6个，银杯12个...</div>
                    </div>
                </div>
                <div class="club_main">
                    <div class="club_main_left">
                        <img :src="club_img" alt="">
                    </div>
                    <div class="club_main_right">
                        <div class="club_main_right1">富山足球俱乐部</div>
                        <div class="club_main_right2">
                            <div class="club_main_right2_tap1">lv18</div>
                            <div class="club_main_right2_tap1">滑雪</div>
                            <div class="club_main_right2_peoper">20252人</div>
                        </div>
                        <div class="club_main_right3">富山足球俱乐部成立于2017年6月24日，建队以来共计参加国内比赛34场，荣获金杯6个，银杯12个...</div>
                    </div>
                </div>
                <div class="club_main">
                <div class="club_main_left">
                    <img :src="club_img" alt="">
                </div>
                <div class="club_main_right">
                    <div class="club_main_right1">富山足球俱乐部</div>
                    <div class="club_main_right2">
                        <div class="club_main_right2_tap1">lv18</div>
                        <div class="club_main_right2_tap1">滑雪</div>
                        <div class="club_main_right2_peoper">20252人</div>
                    </div>
                    <div class="club_main_right3">富山足球俱乐部成立于2017年6月24日，建队以来共计参加国内比赛34场，荣获金杯6个，银杯12个...</div>
                </div>
            </div>
                <div class="club_main">
                    <div class="club_main_left">
                        <img :src="club_img" alt="">
                    </div>
                    <div class="club_main_right">
                        <div class="club_main_right1">富山足球俱乐部</div>
                        <div class="club_main_right2">
                            <div class="club_main_right2_tap1">lv18</div>
                            <div class="club_main_right2_tap1">滑雪</div>
                            <div class="club_main_right2_peoper">20252人</div>
                        </div>
                        <div class="club_main_right3">富山足球俱乐部成立于2017年6月24日，建队以来共计参加国内比赛34场，荣获金杯6个，银杯12个...</div>
                    </div>
                </div>

            </div>
        </div>
        <!--<div class="creat_club" @click="creat_club">创建俱乐部</div>-->
    </div>
</template>


<script>
    import Header from './Header'
    export default {
        components: { Header },
        name: '',
        data() {
            return {
                title: '加入的俱乐部',
                show: true,
                backpage: '',
                club_img:'./static/img/03index_37.png',
            }
        },
        created() {

        },
        mounted() {

        },
        methods: {
            to_clubindex(){
                this.$router.push({ path: '/clubindex'}) // -> /user
            },
            creat_club(){
                this.$router.push({ path: '/createclub'}) // -> /user
            }
        }

    }
</script>

<style scoped>

    .creat_club{
        width:7.1rem;
        height:0.9rem;
        position: fixed;
        left:0;
        right:0;
        margin:auto;
        bottom:0.2rem;
        background: #ff5757;
        color: #fff;
        text-align: center;
        line-height:0.9rem;
        font-size: 0.3rem;
        /*font-weight: bold;*/
        border-radius: 0.1rem;

    }

    .rank_list_box{
        width:7.1rem;
        height:auto;
        margin:auto;
        /*margin-top:0.88rem;*/
        /*overflow: hidden;*/
        /*padding-bottom:1.3rem;*/
        position: absolute;
        top:0.88rem;
        bottom:0;
        left:0;right:0;
        overflow: scroll;
        padding-bottom:0.2rem;


    }

    .rank_list{
        width:100%;
        height:auto;


    }


    .club_main{
        width:100%;
        height:2.1rem;
        padding:0.27rem 0.12rem 0.33rem 0.12rem;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-top:0.1rem;
        background: #fff;
    }

    .club_main>.club_main_left{
        width:2rem;
        height: 1.5rem;

    }
    .club_main>.club_main_left>img{
        width:2rem;
        height: 1.5rem;
        background: palegoldenrod;
        border:none;
    }
    .club_main>.club_main_right{
        width:4.7rem;
        height: 1.5rem;
        position: relative;
    }

    .club_main>.club_main_right .to_join{
        width:1.2rem;
        height:0.4rem;
        background: #ff5757;
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
        height:0.36rem;
        font-size: 0.26rem;
        line-height:0.36rem;
        font-weight: bold;
        color: #4d4d4d;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
    }

    .club_main>.club_main_right>.club_main_right2{
        width:100%;
        height:0.3rem;
        font-size: 0.22rem;
        line-height:0.3rem;
        color: #999;
        margin-top:0.1rem;
    }

    .club_main>.club_main_right>.club_main_right2>.club_main_right2_tap1{
        width:auto;
        font-size: 0.22rem;
        height:0.26rem;
        line-height:0.28rem;
        border:1px solid #ff5757;
        border-radius: 0.06rem;
        padding:0 0.14rem;
        float: left;
        margin-left:0.14rem;
        color: #ff5757;
        /*margin-top:0.01rem;*/

    }

    .club_main>.club_main_right>.club_main_right2>.club_main_right2_tap1:nth-child(1){
        margin-left:0;
    }

    .club_main>.club_main_right>.club_main_right2>.club_main_right2_peoper{
        width:auto;
        font-size: 0.24rem;
        color: #999;
        margin-left:0.2rem;
        height:100%;
        line-height:0.3rem;
        float: left;
    }

    .club_main>.club_main_right>.club_main_right3{
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

</style>
