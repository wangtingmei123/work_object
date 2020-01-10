<template>
    <div style="background: #f7f7f7;min-height: 100vh;overflow: hidden">
        <Header :title="title" :show="show" :backpage="backpage"></Header>
        <div class="player_box1">
            <img :src="player_banner" alt="">
            <div class="player_banner">
                <div class="player_user">
                    <img class="player_user_left" :src="player_user" alt="">
                    <div class="player_user_right">
                        <div class="right_name">梅楚力</div>
                        <div class="right_xinxi">188cm/89kg/湖北</div>
                    </div>
                </div>
                <div class="player_xinxi">
                    <div class="xinxi">32岁</div>
                    <div class="xinxi">鑫动国际足球俱乐部/7号</div>
                    <div class="xinxi">前锋/右脚</div>
                </div>
            </div>
        </div>
        <!--基本资料-->
        <div class="player_box2">
            <div class="player2">
                <div class="player2_title">
                    <div class="player2_title_left">基本资料</div>
                </div>
                <div class="player2_con">
                    <div class="player2_con1">
                        <div class="player2_con1_left">身高：<span>188cm</span></div>
                        <div class="player2_con1_right">年龄：<span>32岁</span></div>
                    </div>
                    <div class="player2_con1">
                        <div class="player2_con1_left">体重：<span>89kg</span></div>
                        <div class="player2_con1_right">位置：<span>前锋</span></div>
                    </div>
                    <div class="player2_con1">
                        <div class="player2_con1_left">加入时间：<span>2019-12-21</span></div>
                        <div class="player2_con1_right">惯用脚：<span>右脚</span></div>
                    </div>
                </div>

            </div>
        </div>
        <!--个人数据-->
        <div class="player_box2">
            <div class="player2">
                <div class="player2_title">
                    <div class="player2_title_left">个人数据</div>
                    <div class="player2_title_left" style="color: #a6a6a6;font-weight: normal">鑫动国际足球俱乐部</div>
                </div>
                <div class="player3_con">
                    <div class="player3_center">
                        <div class="player31">
                            <div class="player31_top">出场/首发</div>
                            <div class="player31_bottom">7/7</div>
                        </div>
                        <div class="player31">
                            <div class="player31_top">场均'</div>
                            <div class="player31_bottom">90'</div>
                        </div>
                        <div class="player31">
                            <div class="player31_top">进球</div>
                            <div class="player31_bottom">1</div>
                        </div>
                        <div class="player31">
                            <div class="player31_top">助攻</div>
                            <div class="player31_bottom">3</div>
                        </div>

                    </div>
                    <div class="player3_center" style="margin-top:0.4rem">
                        <div class="player31">
                            <div class="player31_top">犯规</div>
                            <div class="player31_bottom">3</div>
                        </div>
                        <div class="player31">
                            <div class="player31_top">红牌</div>
                            <div class="player31_bottom">1</div>
                        </div>
                        <div class="player31">
                            <div class="player31_top">黄牌</div>
                            <div class="player31_bottom">0</div>
                        </div>
                        <div class="player31">

                        </div>
                    </div>
                </div>

            </div>
        </div>
        <!--所在球队-->
        <div class="player_box2" style="margin-bottom:0.2rem">
            <div class="player2">
                <div class="player2_title">
                    <div class="player2_title_left">所在球队</div>
                </div>
                <div class="player2_con">
                    <div class="player2_con1">
                        <div class="player2_con1_left" style="width:auto">鑫动国际足球俱乐部</div>
                        <div class="player2_con1_right" style="width:auto;color: #a6a6a6;">2016-12-17 - 2014-12-12</div>
                    </div>
                    <div class="player2_con1">
                        <div class="player2_con1_left" style="width:auto">鑫动国际足球俱乐部</div>
                        <div class="player2_con1_right" style="width:auto;color: #a6a6a6;">2016-12-17 - 2014-12-12</div>
                    </div>
                    <div class="player2_con1">
                        <div class="player2_con1_left" style="width:auto">鑫动国际足球俱乐部</div>
                        <div class="player2_con1_right" style="width:auto;color: #a6a6a6;">2016-12-17 - 2014-12-12</div>
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
                title: '球员',
                show: true,
                backpage: '',
                player_banner:'./static/img/39zqmember_03.png',
                player_user:'./static/img/07club_32.png'
            }
        },
        created() {

        },
        mounted() {

        },
        methods: {}

    }
</script>

<style scoped>

    .player3_con{
        width:100%;
        padding:0 0.05rem;
        box-sizing: border-box;
        padding-bottom:0.12rem;

    }

    .player3_con .player3_center{
        display: flex;
        justify-content: space-between;
        height:0.72rem;
        margin-top:0.2rem;
        margin-bottom:0.2rem;
    }
    .player31{
        width: 1.3rem;
        text-align: center;
        font-size: 0.28rem;
    }
    .player31>.player31_top{
        color: #a6a6a6;
    }
    .player31>.player31_bottom{
        color: #1a1a1a;
        margin-top:0.12rem;
    }
    .player_box2{
        width:7.1rem;
        height:auto;
        margin:auto;
        margin-top:0.15rem;
        background: #fff;
    }

    .player_box2>.player2{
        width:6.8rem;
        height:auto;
        margin:auto;
    }
    .player_box2>.player2>.player2_title{
        width:100%;
        height:0.8rem;
        font-size: 0.3rem;
        color: #ff5757;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom:1px solid #e6e6e6;
        font-weight: bold;
    }
    .player_box2>.player2>.player2_con{
        width:100%;
        height:auto;
        padding:0.1rem 0.05rem 0.2rem 0.05rem;
        box-sizing: border-box;
    }
    .player_box2>.player2>.player2_con>.player2_con1{
        width:100%;
        height:0.66rem;
        font-size: 0.28rem;
        color: #1a1a1a;
        line-height: 0.66rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .player_box2>.player2>.player2_con>.player2_con1>.player2_con1_left{
       width:3.33rem;
    }
    .player2_con1_left>span,.player2_con1_right>span{
        color: #a6a6a6;
    }

    .player_box2>.player2>.player2_con>.player2_con1>.player2_con1_right{
        width:2.52rem;
    }

    .player_banner{
        width:100%;
        height:100%;
        position: absolute;
        left:0;
        top:0;
    }

    .player_banner .player_user{
        width:5.07rem;
        height:1rem;
        margin:auto;
        margin-top:0.7rem;
        display: flex;
        justify-content: space-between;
    }

    .player_banner .player_user .player_user_left{
        display: block;
        width:1rem;
        height:1rem;
        border-radius: 1rem;
    }

    .player_banner .player_user .player_user_right{
        width: 3.93rem;
        height:1rem;
        color: #fff;
    }
    .player_banner .player_user .player_user_right .right_name{
        font-size:0.34rem;
        line-height:0.34rem;
        margin-top:0.2rem;
        height:0.34rem;

    }

    .player_banner .player_user .player_user_right .right_xinxi{
        font-size:0.26rem;
        line-height:0.26rem;
        margin-top:0.22rem;

    }

    .player_banner .player_xinxi{
        width:100%;
        margin-top:0.48rem;
        height:0.26rem;
        font-size: 0.26rem;
        line-height: 0.26rem;
        color: #fff;
        display: flex;
        justify-content: center;

    }
    .player_banner .player_xinxi .xinxi{
        margin-left:0.15rem;
        margin-right:0.15rem;
    }


   .player_box1{
       width:7.1rem;
       height:3.2rem;
       margin:auto;
       margin-top:1.03rem;
       position: relative;
   }
   .player_box1>img{
       display: block;
       width:100%;
       height:100%;

   }



</style>
