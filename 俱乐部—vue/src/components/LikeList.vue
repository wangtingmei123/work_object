<template>
    <div class="apply_bg" style="background: #f7f7f7;min-height: 100vh;overflow: hidden">
        <Header :title="title" :show="show" :backpage="backpage"></Header>
        <div class="member_list_box" ref="opBottomEcharts" @scroll="gotoScroll()">
            <div class="member_list" v-for="(item,index) in like_list">
                <div class="member1">
                    <img v-if="item.user.avatar==''" :src="photo" alt="">
                    <img v-if="item.user.avatar!=''"  :src="item.user.avatar" alt="">
                </div>
                <div class="member2">
                    <div class="member2_name">{{item.user.user_name}}</div>
                    <div class="member2_bumen">{{item.user.department}}</div>
                </div>

                <div class="member5">
                    {{item.time}}
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
                photo:'./static/img/07club_32.png',
                page:0,
                clientHeight:'',
                scrollHeight:'',
                scrollTop:'',
                page_end:true,
                loadFlag:true,
                dynamic_id:'',
                like_list:[]
            }
        },
        created() {
            this.dynamic_id=this.$route.query.dynamic_id;
            this.like()

        },
        mounted() {

        },
        methods: {
            like(){
                let _this=this;
                this.$axios.get("dynamic-praise",{
                    headers: {
                        'Authorization': localStorage.getItem('token_type') + ' '+localStorage.getItem('access_token'),
                    },
                    params: {
                        "dynamic":_this.dynamic_id,
                        "page":_this.page
                    }
                }).then(res=>{
                    console.log(res)
                    if(res.status==200){
                        console.log(res)
                        if(res.data.data.length<999){
                            _this.page_end=false
                        }
                        let like_list=_this.like_list;
                        if(like_list.length==0){
                            like_list=res.data.data
                        }else{
                            like_list.push.apply(like_list,res.data.data);
                        }
                        _this.like_list=like_list;
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
                        _this.like()
                    }

                }
            },

        }

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
        border-radius: 0.78rem;
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
