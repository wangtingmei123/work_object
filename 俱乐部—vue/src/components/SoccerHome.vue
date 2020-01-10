<template>
    <div style="background: #f7f7f7;min-height: 100vh;overflow: hidden">
        <Header :title="title" :show="show" :backpage="backpage"></Header>
        <div class="player_box1">
            <img :src="player_banner" alt="">
            <div class="player_banner">
                <img class="player_banner1" :src="player_logo" alt="">
                <div class="player_banner2">鑫动国际足球俱乐部</div>
                <div class="player_banner3"> <span>5胜</span>   <span>10平</span>   <span>3负</span> </div>
                <div class="player_banner4">历史战绩</div>
            </div>

        </div>
        <div class="soccer_box">
            <div class="soccer_title">
                <div class="soccer_title1" :class="{soccer_title_select:soccer_title_select==1}" @click="soccer_select(1)">战绩</div>
                <div class="soccer_title1" :class="{soccer_title_select:soccer_title_select==2}" @click="soccer_select(2)">球员</div>
                <div class="soccer_title1" :class="{soccer_title_select:soccer_title_select==3}" @click="soccer_select(3)">资料</div>
            </div>
            <div class="soccer_con" v-show="soccer_title_select==1">
                <div class="soccer_list_box">
                    <div class="soccer_con_box">
                        <div class="soccer_data">2019年8月</div>
                        <div class="soccer_list">
                            <div class="soccer_list1">火特竞赛第2轮</div>
                            <div class="soccer_list2">鑫动国际足球俱乐部</div>
                            <div class="soccer_list3">3:1</div>
                            <div class="soccer_list4">奥林体育</div>
                        </div>
                        <div class="soccer_list">
                            <div class="soccer_list1">火特竞赛第2轮</div>
                            <div class="soccer_list2">鑫动国际足球俱乐部</div>
                            <div class="soccer_list3">3:1</div>
                            <div class="soccer_list4">奥林体育</div>
                        </div>
                        <div class="soccer_list">
                            <div class="soccer_list1">火特竞赛第2轮</div>
                            <div class="soccer_list2">鑫动国际足球俱乐部</div>
                            <div class="soccer_list3">3:1</div>
                            <div class="soccer_list4">奥林体育</div>
                        </div>
                    </div>
                </div>
                <div class="soccer_list_box">
                    <div class="soccer_con_box">
                        <div class="soccer_data">2019年8月</div>
                        <div class="soccer_list">
                            <div class="soccer_list1">火特竞赛第2轮</div>
                            <div class="soccer_list2">鑫动国际足球俱乐部</div>
                            <div class="soccer_list3">3:1</div>
                            <div class="soccer_list4">奥林体育</div>
                        </div>
                        <div class="soccer_list">
                            <div class="soccer_list1">火特竞赛第2轮</div>
                            <div class="soccer_list2">鑫动国际足球俱乐部</div>
                            <div class="soccer_list3">3:1</div>
                            <div class="soccer_list4">奥林体育</div>
                        </div>
                        <div class="soccer_list">
                            <div class="soccer_list1">火特竞赛第2轮</div>
                            <div class="soccer_list2">鑫动国际足球俱乐部</div>
                            <div class="soccer_list3">3:1</div>
                            <div class="soccer_list4">奥林体育</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="soccer_con" v-show="soccer_title_select==2">
                <div class="soccer_list_box">
                    <div class="soccer_con_box">
                         <div class="players_box1">
                            <div class="players_box1_tit">  <div class="players_box1_tit1">教练</div></div>
                            <div class="players_box1_xinxi" @click="to_players">
                                <div class="players_box1_xinxi1">
                                    <div class="players_name">左胜</div>
                                    <div class="players_age">47岁-教练</div>
                                </div>
                            </div>
                        </div>
                     </div>
                </div>
                <div class="soccer_list_box">
                    <div class="soccer_con_box">
                        <div class="players_box1">
                            <div class="players_box1_tit">
                                <div class="players_box1_tit1">前锋</div>
                                <div class="players_box1_tit2">
                                    <div class="players1">出场</div>
                                    <div class="players1">进球</div>
                                    <div class="players1">助攻</div>
                                </div>
                            </div>
                            <div class="players_box1_xinxi" @click="to_players">
                                <div class="players_box1_xinxi1">
                                    <div class="players_name">左胜</div>
                                    <div class="players_age">47岁-教练</div>
                                </div>
                                <div class="players_box1_xinxi2">
                                    <div class="players_cj">6</div>
                                    <div class="players_cj">6</div>
                                    <div class="players_cj">6</div>
                                </div>
                            </div>
                            <div class="players_box1_xinxi" @click="to_players">
                                <div class="players_box1_xinxi1">
                                    <div class="players_name">左胜</div>
                                    <div class="players_age">47岁-教练</div>
                                </div>
                                <div class="players_box1_xinxi2">
                                    <div class="players_cj">6</div>
                                    <div class="players_cj">6</div>
                                    <div class="players_cj">6</div>
                                </div>
                            </div>
                            <div class="players_box1_xinxi" @click="to_players">
                                <div class="players_box1_xinxi1">
                                    <div class="players_name">左胜</div>
                                    <div class="players_age">47岁-教练</div>
                                </div>
                                <div class="players_box1_xinxi2">
                                    <div class="players_cj">6</div>
                                    <div class="players_cj">6</div>
                                    <div class="players_cj">6</div>
                                </div>
                            </div>
                            <div class="players_box1_xinxi" @click="to_players">
                                <div class="players_box1_xinxi1">
                                    <div class="players_name">左胜</div>
                                    <div class="players_age">47岁-教练</div>
                                </div>
                                <div class="players_box1_xinxi2">
                                    <div class="players_cj">6</div>
                                    <div class="players_cj">6</div>
                                    <div class="players_cj">6</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="soccer_list_box">
                    <div class="soccer_con_box">
                        <div class="players_box1">
                            <div class="players_box1_tit">
                                <div class="players_box1_tit1">中场</div>
                                <div class="players_box1_tit2">
                                    <div class="players1">出场</div>
                                    <div class="players1">进球</div>
                                    <div class="players1">助攻</div>
                                </div>
                            </div>
                            <div class="players_box1_xinxi">
                                <div class="players_box1_xinxi1">
                                    <div class="players_name">左胜</div>
                                    <div class="players_age">47岁-教练</div>
                                </div>
                                <div class="players_box1_xinxi2">
                                    <div class="players_cj">6</div>
                                    <div class="players_cj">6</div>
                                    <div class="players_cj">6</div>
                                </div>
                            </div>
                            <div class="players_box1_xinxi">
                                <div class="players_box1_xinxi1">
                                    <div class="players_name">左胜</div>
                                    <div class="players_age">47岁-教练</div>
                                </div>
                                <div class="players_box1_xinxi2">
                                    <div class="players_cj">6</div>
                                    <div class="players_cj">6</div>
                                    <div class="players_cj">6</div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
                <div class="soccer_list_box">
                    <div class="soccer_con_box">
                        <div class="players_box1">
                            <div class="players_box1_tit">
                                <div class="players_box1_tit1">后卫</div>
                                <div class="players_box1_tit2">
                                    <div class="players1">出场</div>
                                    <div class="players1">进球</div>
                                    <div class="players1">助攻</div>
                                </div>
                            </div>
                            <div class="players_box1_xinxi">
                                <div class="players_box1_xinxi1">
                                    <div class="players_name">左胜</div>
                                    <div class="players_age">47岁-教练</div>
                                </div>
                                <div class="players_box1_xinxi2">
                                    <div class="players_cj">6</div>
                                    <div class="players_cj">6</div>
                                    <div class="players_cj">6</div>
                                </div>
                            </div>
                            <div class="players_box1_xinxi">
                                <div class="players_box1_xinxi1">
                                    <div class="players_name">左胜</div>
                                    <div class="players_age">47岁-教练</div>
                                </div>
                                <div class="players_box1_xinxi2">
                                    <div class="players_cj">6</div>
                                    <div class="players_cj">6</div>
                                    <div class="players_cj">6</div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
                <div class="soccer_list_box">
                    <div class="soccer_con_box">
                        <div class="players_box1">
                            <div class="players_box1_tit">
                                <div class="players_box1_tit1">守门员</div>
                                <div class="players_box1_tit2">
                                    <div class="players1">出场</div>
                                    <div class="players1">扑救</div>
                                    <div class="players1">解围</div>
                                </div>
                            </div>
                            <div class="players_box1_xinxi">
                                <div class="players_box1_xinxi1">
                                    <div class="players_name">左胜</div>
                                    <div class="players_age">47岁-教练</div>
                                </div>
                                <div class="players_box1_xinxi2">
                                    <div class="players_cj">6</div>
                                    <div class="players_cj">6</div>
                                    <div class="players_cj">6</div>
                                </div>
                            </div>
                            <div class="players_box1_xinxi">
                                <div class="players_box1_xinxi1">
                                    <div class="players_name">左胜</div>
                                    <div class="players_age">47岁-教练</div>
                                </div>
                                <div class="players_box1_xinxi2">
                                    <div class="players_cj">6</div>
                                    <div class="players_cj">6</div>
                                    <div class="players_cj">6</div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

            </div>
            <div class="soccer_con" v-show="soccer_title_select==3">
                <div class="soccer_list_box">
                    <div class="soccer_con_box">
                        <div class="data_title">
                            <img :src="data_tit1" alt="">
                            <div style="margin-left:0.05rem">基本资料</div>
                        </div>
                        <div class="data_con">
                            <div class="data_con1">成立时间：<span>2015-16-18</span></div>
                            <div class="data_con1">所在城市：<span>北京</span></div>
                            <div class="data_con1">主要球场：<span>北京工人体育场</span></div>
                            <div class="data_con1">所属企业：<span>2北京xxx企业</span></div>

                        </div>
                    </div>
                </div>
                <div class="soccer_list_box">
                    <div class="soccer_con_box">
                        <div class="data_title">
                            <img style="width:0.4rem;height:0.42rem" :src="data_tit2" alt="">
                            <div style="margin-left:0.05rem">主要荣誉</div>
                        </div>
                        <div class="data_con" style="padding:0;padding-bottom:0.46rem;overflow: hidden">
                            <div class="ry_con">
                                <img :src="ry_jb" alt="">
                                <div class="ry_tit">2016国海杯2016国海杯</div>
                            </div>
                            <div class="ry_con">
                                <img :src="ry_jb" alt="">
                                <div class="ry_tit">2016国海杯</div>
                            </div>
                            <div class="ry_con">
                                <img :src="ry_jb" alt="">
                                <div class="ry_tit">2016国海杯</div>
                            </div>
                            <div class="ry_con">
                                <img :src="ry_jb" alt="">
                                <div class="ry_tit">2016国海杯</div>
                            </div>
                            <div class="ry_con">
                                <img :src="ry_jb" alt="">
                                <div class="ry_tit">2016国海杯</div>
                            </div>


                        </div>
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
                title: '球队首页',
                show: true,
                backpage: '',
                player_banner:'./static/img/39zqmember_03.png',
                player_logo:'./static/img/35zq_06.png',
                soccer_title_select:1,
                data_tit1:'./static/img/38scores_03.png',
                data_tit2:'./static/img/38scores_07.png',
                ry_jb:'./static/img/38scores_11.png'

            }
        },
        created() {

        },
        mounted() {

        },
        methods: {
            to_players(){
                this.$router.push({path:'./playerspage'})
            },
            soccer_select(type){
                this.soccer_title_select=type
            }
        }

    }
</script>

<style scoped>
    .ry_con{
        width:1.7rem;
        height:1.37rem;
        margin-top:0.3rem;
        float: left;

    }

    .ry_con>img{
        display: block;
        width:0.82rem;
        height:1rem;
        margin:auto;

    }

    .ry_con>.ry_tit{
        height:0.3rem;
        font-size: 0.26rem;
        line-height: 0.3rem;
        margin-top:0.1rem;
        text-align: center;
        width:100%;
        color: #a6a6a6;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;

    }


    .data_title{
        width:100%;
        height:0.88rem;
        border-bottom:1px solid #eee;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        color: #1a1a1a;
        font-weight: bold;
        font-size:0.3rem;

    }
    .data_title>img{
        display: block;
        width:0.4rem;
        height:0.4rem
    }

    .data_con{
        width:100%;
        height:auto;
        padding:0.12rem 0 0.22rem 0;
        box-sizing: border-box;
    }
    .data_con>.data_con1{
        width:100%;
        height:0.68rem;
        font-size: 0.28rem;
        line-height:0.68rem;
        color: #4d4d4d;
    }

    .data_con>.data_con1>span{
        color: #a6a6a6;
    }

    .players_box1{
        width:100%;
        height:auto;

    }

    .players_box1_tit{
        width:100%;
        height:0.65rem;
        color: #a6a6a6;
        text-align: left;
        line-height:0.65rem;
        border-bottom:1px solid #eeeeee;
        font-size: 0.28rem;
        display: flex;
        justify-content: space-between;
        align-content: center;
    }

    .players_box1_tit1{
        width:2.49rem;
        height:100%;
    }

    .players_box1_tit2{
        width:4.3rem;
        height:100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .players_box1_tit2 .players1{
        width:0.6rem;
        text-align: center;
    }

    .players_box1_xinxi{
        width:100%;
        height:1.1rem;
        color: #1a1a1a;
        text-align: left;
        overflow: hidden;
        display: flex;
        justify-content: space-between;
        align-items: center;

    }

    .players_box1_xinxi1{
        width:2.49rem;
        height:1.1rem;
        color: #1a1a1a;
        text-align: left;
        overflow: hidden;

    }

   .players_box1_xinxi1 .players_name{
        font-size:0.3rem;
       margin-top:0.2rem;
       height:0.3rem;
       line-height: 0.3rem;
       font-weight: bold;
    }
    .players_box1_xinxi1 .players_age{
        font-size:0.24rem;
        color: #a6a6a6;
        margin-top:0.16rem;
        height:0.24rem;
        line-height: 0.24rem;
    }

    .players_box1_xinxi2{
        width:4.3rem;
        height:100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 0.24rem;
    }

    .players_box1_xinxi2>.players_cj{
        width:0.6rem;
        text-align: center;
    }

    .soccer_list_box:nth-child(1){
        margin-top:0;
    }

    .soccer_list_box{
        width:7.1rem;
        height:auto;
        margin:auto;
        background: #fff;
        margin-top:0.1rem;
        /*padding-bottom:0.2rem;*/
    }

    .soccer_list_box>.soccer_con_box{
        width:6.8rem;
        height:auto;
        margin:auto;

    }
    .soccer_con_box>.soccer_data{
        width:100%;
        height:0.65rem;
        color: #a6a6a6;
        text-align: center;
        line-height:0.65rem;
    }


    .soccer_con_box> .soccer_list{
        width:100%;
        height:1rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 0.26rem;
        color: #1a1a1a;
        border-top: 1px solid #EEEEEE;
    }
    .soccer_con_box> .soccer_list>.soccer_list1{
        color: #1a1a1a;
        font-weight: bold;
        width:1.94rem;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;

    }
    .soccer_con_box> .soccer_list>.soccer_list2{
        width:2.65rem;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
    }
    .soccer_con_box> .soccer_list>.soccer_list4{
        width:1.25rem;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
    }
    .soccer_con_box> .soccer_list>.soccer_list3{
        color: #fff;
        width:0.66rem;
        height:0.28rem;
        font-size: 0.22rem;
        background: #ff5757;
        text-align: center;
        line-height:0.28rem;
        border-radius: 0.04rem;
    }

    .soccer_box{
        width:7.1rem;
        margin:auto;
        height:auto;
        margin-top:0.15rem;


    }

    .soccer_con{
        width:7.1rem;
        margin:auto;
        height:calc(100vh - 5.6rem);
        margin-bottom:0.2rem;
        overflow: scroll;

    }

    .soccer_box>.soccer_title{
        width:7.1rem;
        height:1rem;
        margin:auto;
        padding:0 0.58rem;
        box-sizing: border-box;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid #f7f7f7;
        background: #fff;
    }
    .soccer_box>.soccer_title>.soccer_title1{
        width:1.6rem;
        height:100%;
        font-size:0.3rem;
        text-align: center;
        line-height: 1rem;
        color: #999999;

        
    }
    .soccer_box>.soccer_title>.soccer_title_select{
        color: #ff5a57;
        font-weight: bold;
        border-bottom:0.02rem solid #ff5a57;
    }

    .player_banner{
        width:100%;
        height:100%;
        position: absolute;
        left:0;
        top:0;
    }

    .player_banner1{
        display: block;
        width:1rem;
        height:1rem;
        border-radius: 1rem;
        margin:auto;
        margin-top:0.25rem;
        color: #fff;
    }
    .player_banner1{
        display: block;
        width:1rem;
        height:1rem;
        border-radius: 1rem;
        margin:auto;
        margin-top:0.25rem;
        color: #fff;
    }

    .player_banner2{
        width:100%;
        height:0.32rem;
        margin-top:0.1rem;
        font-size:0.32rem;
        line-height:0.32rem;
        text-align: center;
        color: #fff;
    }

    .player_banner3{
        width:100%;
        height:0.28rem;
        margin-top:0.5rem;
        text-align: center;
        line-height:0.28rem;
        color: #fff;
    }

    .player_banner3>span{
        margin-left:0.2rem;
        margin-right:0.2rem;
    }

    .player_banner4{
        width:100%;
        height:0.28rem;
        margin-top:0.2rem;
        text-align: center;
        line-height:0.28rem;
        color: #fff;
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
