<template>
    <div class="apply_bg" style="background: #f7f7f7;min-height: 100vh;overflow: hidden">
        <Header :title="title" :show="show" :backpage="backpage"></Header>
        <div class="member_list_box">
            <div class="member_list">
                <div class="member1">
                    <img :src="photo" alt="">
                </div>
                <div class="member2">
                    <div class="member2_name">王丽坤</div>
                    <div class="member2_bumen">技术部</div>
                </div>

                <div class="member5">
                    1分钟前
                </div>
            </div>
            <div class="member_list">
                <div class="member1">
                    <img :src="photo" alt="">
                </div>
                <div class="member2">
                    <div class="member2_name">王丽坤</div>
                    <div class="member2_bumen">技术部</div>
                </div>

                <div class="member5">
                    1分钟前
                </div>
            </div>
            <div class="member_list">
                <div class="member1">
                    <img :src="photo" alt="">
                </div>
                <div class="member2">
                    <div class="member2_name">王丽坤</div>
                    <div class="member2_bumen">技术部</div>
                </div>

                <div class="member5">
                    1分钟前
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
                title: '点赞详情',
                show: true,
                backpage: '',
                photo:'./static/img/07club_32.png'
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
    .member_list_box{
        width:7.1rem;
        height:auto;
        margin:auto;
        background: #fff;
        margin-top:0.98rem;
    }
    .member_list{
        width:6.84rem;
        height:1.46rem;
        padding:0.32rem 0 0.36rem 0;
        display: flex;
        align-items: center;
        justify-content: space-between;
        box-sizing: border-box;
        margin:auto;
        border-bottom:1px solid #f7f7f7;
    }

    .member_list>.member1{
        width:0.78rem;
        height:0.78rem;
        border-radius: 0.78rem;

    }
    .member_list>.member1>img{
        display: block;
        width:100%;
        height:100%;

    }
    .member_list>.member2{
        width:4.74rem;
        height:100%;

    }

    .member_list>.member2>.member2_name{
        font-size: 0.3rem;
        color: #191919;
        height:0.3rem;
        line-height:0.3rem;
        margin-top:0.08rem;
    }
    .member_list>.member2>.member2_bumen{
        font-size: 0.24rem;
        color: #a6a6a6;
        height:0.24rem;
        line-height:0.24rem;
        margin-top:0.18rem;
    }
    .member_list>.member3{
        width:1.46rem;
        height:100%;
        font-size: 0.26rem;
        color: #a6a6a6;
    }

    .member_list>.member3>.member31{
        font-size: 0.26rem;
        color: #a6a6a6;
        height:0.28rem;
        line-height:0.26rem;
        margin-top:0.08rem;
    }

    .member_list span{
        color: #191919;
    }

    .member_list>.member3>.member32{
        margin-top:0.18rem;
    }

    .member_list>.member4{
        width:1.73rem;
        height:100%;
        font-size: 0.26rem;
        line-height:0.78rem;
    }

    .member_list>.member5{
        width:1.2rem;
        height:100%;
        font-size: 0.26rem;
        text-align: right;
        color: #a6a6a6;
    }
</style>
