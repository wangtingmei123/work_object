<template>
    <div style="min-height: 100vh">
        <Header :title="title" :show="show" :backpage="backpage"></Header>
        <div class="rank_list">
            <div class="rank_list_title">
                <div class="list_tap "  @click="tap_bind(1)">
                    <span v-show="tap_selece!=1">同城榜</span>
                    <img v-show="tap_selece==1" :src="tcb" alt="">
                    <div class="list_tap_bottom" v-show="tap_selece==1"></div>
                </div>
                <div class="list_tap"  @click="tap_bind(2)">
                    <span  v-show="tap_selece!=2">全国榜</span>
                     <img v-show="tap_selece==2" :src="cgb" alt="">
                    <div class="list_tap_bottom" v-show="tap_selece==2"></div>
                </div>
            </div>
        </div>
        <div class="rank_list_box">
                <div class="rank_main_box">
                    <div class="rank_main">
                        <div class="rank_main_img">
                            <img :src="rank_img" alt="">
                        </div>
                        <div class="rank_main_center">
                            <div class="rank_mc1">
                                <div class="rank_mc1_left">缤纷飞雪冰雪俱乐部</div>
                            </div>
                            <div class="rank_mc2">
                                    <div class="club_main_right2_tap1">lv18</div>
                                    <div class="club_main_right2_tap1">滑雪</div>
                                    <div class="club_main_right2_peoper">20252人</div>
                            </div>
                        </div>
                        <div class="rank_mc1_right">5051.2<span>分</span>  </div>
                    </div>

                     <div class="rank_main">
                        <div class="rank_main_img">
                            <img :src="rank_img" alt="">
                        </div>
                        <div class="rank_main_center">
                            <div class="rank_mc1">
                                <div class="rank_mc1_left">缤纷飞雪冰雪俱乐部</div>
                            </div>
                            <div class="rank_mc2">
                                    <div class="club_main_right2_tap1">lv18</div>
                                    <div class="club_main_right2_tap1">滑雪</div>
                                    <div class="club_main_right2_peoper">20252人</div>
                            </div>
                        </div>
                        <div class="rank_mc1_right">5051.2<span>分</span>  </div>
                    </div>

                     <div class="rank_main">
                        <div class="rank_main_img">
                            <img :src="rank_img" alt="">
                        </div>
                        <div class="rank_main_center">
                            <div class="rank_mc1">
                                <div class="rank_mc1_left">缤纷飞雪冰雪俱乐部</div>
                            </div>
                            <div class="rank_mc2">
                                    <div class="club_main_right2_tap1">lv18</div>
                                    <div class="club_main_right2_tap1">滑雪</div>
                                    <div class="club_main_right2_peoper">20252人</div>
                            </div>
                        </div>
                        <div class="rank_mc1_right">5051.2<span>分</span>  </div>
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
                title: '排行',
                show: true,
                backpage: '/index',
                tap_selece:1,
                rank_img:'./static/img/41yaoqing_07.jpg',
                cgb:'./static/img/04qgb_03.png',
                tcb:'./static/img/04tcb_03.png',

            }
        },
        created() {

        },
        mounted() {

        },
        methods: {

            tap_bind(tap){
                this.tap_selece=tap
            }
        }

    }
</script>

<style scoped>

    .rank_main_box{
        width:100%;
        height:auto;
        background: #fff;

    }
    .rank_main{
        width:6.8rem;
        margin:auto;
        padding:0.3rem 0;
        box-sizing: border-box;
        display: flex;
        justify-content: space-between;
        border-top:1px solid #f7f7f7;
        align-items: center;
    }

    .rank_main>.rank_main_img{
        width:0.88rem;
        height:0.88rem;
        background:salmon;
        border-radius: 0.88rem;
        overflow: hidden;
    }

    .rank_main_img>img{
        display: block;
        width:100%;
        height:100%;
    }
    .rank_main>.rank_main_center{
        width:3.5rem;
        height:100%;

    }
    .rank_main>.rank_main_center>.rank_mc1{
        width:100%;
        height:0.4rem;
        display: flex;
        align-items: center;
        justify-content: space-between;

    }
    .rank_main>.rank_main_center>.rank_mc1>.rank_mc1_left{
        font-size: 0.32rem;
        color: #1a1a1a;
        width:4.2rem;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;

    }
    .rank_main .rank_mc1_right{
        width:2.1rem;
        font-size: 0.42rem;
        color: #333;
        /* font-weight: bold; */
        font-family: DINCondensedC;
        height:auto;
        text-align: right;


    }
    .rank_main .rank_mc1_right>span{
        font-size: 0.22rem;
        color: #545454;
        font-weight: normal;
    }
    .rank_main>.rank_main_center>.rank_mc2{
        width:100%;
        height:0.3rem;
        margin-top:0.15rem;

    }

    .rank_main>.rank_main_center>.rank_mc2>.club_main_right2_tap1{
        width:auto;
        font-size: 0.22rem;
        height:0.3rem;
        line-height:0.3rem;
        background:  #ff5a57;
        border-radius: 0.06rem;
        padding:0 0.14rem;
        float: left;
        margin-left:0.14rem;
        color: #fff;
        margin-top:0.01rem;

    }

    .rank_main>.rank_main_center>.rank_mc2>.club_main_right2_tap1:nth-child(1){
        margin-left:0;
    }

    .rank_main>.rank_main_center>.rank_mc2>.club_main_right2_peoper{
        width:auto;
        font-size: 0.24rem;
        color: #999;
        margin-left:0.2rem;
        height:100%;
        line-height:0.3rem;
        float: left;
    }


.rank_list_box{
    width:7.1rem;
    margin:auto;
    position: absolute;
    left:0;right:0;
    top:2.02rem;
    bottom:0.2rem;
    height:calc(100vh - 2.22rem);
    overflow: scroll;
    

}

    .rank_list{
        width:7.1rem;
        height:auto;
        background: #fff;
        margin:auto;
        top:1.03rem;
        left:0;
        right:0;
        position: fixed;

    }
    .rank_list_title{
        width:6.8rem;
        margin:auto;
        /* border-bottom:1px solid #e6e6e6; */
        height:1rem;
        padding:0 0.15rem;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        justify-content: center;
        /* margin-top:0.15rem; */
        background: #fff;

    }


    .rank_list>.rank_list_title>.list_tap{
    width:3.3rem;
    height:100%;
    line-height:1rem;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    position:relative;
}

    .rank_list>.rank_list_title>.list_tap>img{
        display: block;
        width:1.25rem;
        height:0.44rem;
    }
.rank_list>.rank_list_title>.list_tap_select{
    border-bottom:0.02rem solid #ff5a57;
    color: #ff5a57;
    box-sizing: border-box;
    font-weight: bold;
}
.list_tap_bottom{
    width:0.4rem;
    height:2px;
    position: absolute;
    left:0;right:0;margin:auto;
    bottom:0;
    background: #ff5a57
}

</style>
