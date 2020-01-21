<template>
    <div style="min-height: 100vh">
        <Header :title="title" :show="show" :backpage="backpage"></Header>
        <div class="rank_list">
            <div class="rank_list_title">
                <div class="list_tap " :class="{list_tap_select:tap_selece==1}" @click="tap_bind(1)">同城榜</div>
                <div class="list_tap" :class="{list_tap_select:tap_selece==2}" @click="tap_bind(2)">全国榜</div>
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
                                <div class="rank_mc1_right">5051.2<span>分</span>  </div>
                            </div>
                            <div class="rank_mc2">
                                    <div class="club_main_right2_tap1">lv18</div>
                                    <div class="club_main_right2_tap1">滑雪</div>
                                    <div class="club_main_right2_peoper">20252人</div>
                            </div>
                        </div>
                    </div>
                    <div class="rank_main">
                        <div class="rank_main_img">
                            <img :src="rank_img" alt="">
                        </div>
                        <div class="rank_main_center">
                            <div class="rank_mc1">
                                <div class="rank_mc1_left">缤纷飞雪冰雪俱乐部</div>
                                <div class="rank_mc1_right">5051.2<span>分</span>  </div>
                            </div>
                            <div class="rank_mc2">
                                <div class="club_main_right2_tap1">lv18</div>
                                <div class="club_main_right2_tap1">滑雪</div>
                                <div class="club_main_right2_peoper">20252人</div>
                            </div>
                        </div>
                    </div>
                    <div class="rank_main">
                        <div class="rank_main_img">
                            <img :src="rank_img" alt="">
                        </div>
                        <div class="rank_main_center">
                            <div class="rank_mc1">
                                <div class="rank_mc1_left">缤纷飞雪冰雪俱乐部</div>
                                <div class="rank_mc1_right">5051.2<span>分</span>  </div>
                            </div>
                            <div class="rank_mc2">
                                <div class="club_main_right2_tap1">lv18</div>
                                <div class="club_main_right2_tap1">滑雪</div>
                                <div class="club_main_right2_peoper">20252人</div>
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
                title: '排行',
                show: true,
                backpage: '/index',
                tap_selece:1,
                rank_img:'./static/img/03index_09.png'
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
    }

    .rank_main>.rank_main_img{
        width:0.88rem;
        height:0.88rem;
        background:salmon;
        border-radius: 0.88rem;
    }

    .rank_main_img>img{
        display: block;
        width:100%;
        height:100%;
    }
    .rank_main>.rank_main_center{
        width:5.7rem;
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
        font-size: 0.28rem;
        color: #1a1a1a;
        font-weight: bold;
        width:4.2rem;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;

    }
    .rank_main>.rank_main_center>.rank_mc1>.rank_mc1_right{
        font-size: 0.32rem;
        color: #1a1a1a;
        font-weight: bold;
    }
    .rank_main>.rank_main_center>.rank_mc1>.rank_mc1_right>span{
        font-size: 0.22rem;
        color: #999;
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
        height:0.26rem;
        line-height:0.28rem;
        background:  #f7282f;
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
    top:2.04rem;
    bottom:0.2rem;
    height:calc(100vh - 2.24rem);
    overflow: scroll;



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


    .rank_list>.rank_list_title>.list_tap{
    width:3rem;
    height:100%;
    line-height:1rem;
    text-align: center;

}
.rank_list>.rank_list_title>.list_tap_select{
    border-bottom:0.02rem solid #ff5a57;
    color: #ff5a57;
    box-sizing: border-box;
    font-weight: bold;
}

</style>
