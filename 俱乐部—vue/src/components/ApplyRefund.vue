<template>
    <div style="background: #f0f0f0;min-height: 100vh;overflow: hidden;">
        <Header :title="title" :show="show" :backpage="backpage"></Header>
        <div class="active_tap">
            <div class="act" :class="{'act_selece':act_selece==0}" @click="select(0)">全部</div>
            <div class="act" :class="{'act_selece':act_selece==1}" @click="select(1)">已退款</div>
            <div class="act" :class="{'act_selece':act_selece==2}" @click="select(2)">已关闭</div>
        </div>
        <div class="active_box" ref="opBottomEcharts" @scroll="gotoScroll()">
            <div class="active">
                <div class="act_main" @click="to_detail(item.tradable.issue_nums,item.tradable.id)" v-for="(item,index) in act_list" :key="index">
                    <div class="act_main_left">
                        <img v-show="item.tradable.logo_url!=''" v-lazy="item.tradable.logo_url" :src="lazyimg" alt="">
                        <img v-show="item.tradable.logo_url==''"  :src="lazyimg" alt="">
                        <div class="act_static">{{item.state_name}}</div>
                    </div>
                    <div class="act_main_right">
                        <div class="act_main_right1">{{item.tradable.name}}</div>
                        <div class="act_main_right2">退款时间:
                            <span >{{item.updated_at}}</span>
                        </div>
                        <div class="act_main_right3">退款金额:
                            <span >￥{{item.refund_fee/100}}</span>
                            <!--<span>16:00-18:00</span>-->
                        </div>
                        <!--<div class="act_main_right4">已报名:20人</div>-->
                        <div class="act_main_right5">
                            <span>已报名:{{item.tradable.members}}人</span>
                            <span>报名费:{{item.tradable.entry_fees/100}} </span>
                            <span>保证金:{{item.tradable.cash_pledges/100}}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="empty_box" v-show="act_list.length==0">
            <img :src="empty_img" alt="">
            <!--<div class="empty_tip">目前还没有俱乐部哦</div>-->
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
                empty_img:'./static/img/empty_img.png',
                title: '查看退款',
                show: true,
                backpage: '',
                club_img:'./static/img/03index_37.png',
                act_img:'./static/img/03index_29.png',
                act_selece:0,
                page:0,
                clientHeight:'',
                scrollHeight:'',
                scrollTop:'',
                page_end:true,
                loadFlag:true,
                act_list:[],
                stare:'',
                is_apply:0,
                is_signee:0,
                is_ended:0,
                lazyimg:'./static/img/lazyimg.png',
                isFirstEnter:false



            }
        },
        created() {
               this.isFirstEnter=true;

        },
        mounted() {

        },
        methods: {
            to_detail(issue_nums,id){

                localStorage.setItem('active_id',id)
                localStorage.setItem('active_name',name)
                localStorage.setItem('issue_nums',issue_nums)
                if(issue_nums==0){
                    this.$router.push({ path: '/activedetailshort',query:{id:id}}) // -> /user
                }else{
                    this.$router.push({ path: '/activedetail',query:{id:id}}) // -> /user
                }
            },
            active_list(){
                console.log(this.page)
                let _this=this;
                if(_this.loadFlag){
                this.$axios.get("/refund-orders",{
                    headers: {
                        'Authorization': localStorage.getItem('token_type') + ' '+localStorage.getItem('access_token'),
                    },
                    params: {
                    
                        "state":_this.act_selece,
                        "last_id":_this.page
                    }
                }).then(res=>{
                    console.log(res)
                    if(res.status==200){
                        if(res.data.data.length<_this.GLOBAL.page_total){
                            _this.page_end=false
                        }
                        let act_list=_this.act_list;
                        if(act_list.length==0){
                            act_list=res.data.data
                        }else{
                            act_list.push.apply(act_list,res.data.data);
                        }
                        _this.act_list=act_list;
                        _this.loadFlag=false;

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
                console.log(this.$refs.opBottomEcharts)
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
                            _this.active_list()
                        }

                    }
            },

            select(tap){
                this.act_selece=tap;
                this.page=0;

                  this.loadFlag=true;
                    this.page_end=true;
                    this.act_list=[];
                    this.active_list()
              

            }
        },

 beforeRouteEnter(to, from, next) {
 

      next();
    },

    activated() {
              let _this=this;
                          console.log("888")
      if(!this.$route.meta.isBack || this.isFirstEnter){
         // 如果isBack是false，表明需要获取新数据，否则就不再请求，直接使用缓存的数据
         // 如果isFirstEnter是true，表明是第一次进入此页面或用户刷新了页面，需获取新数据
        // 把数据清空，可以稍微避免让用户看到之前缓存的数据
      
                 _this.clientHeight=''
                _this.scrollHeight=''
                _this.scrollTop=''
                _this.page_end=true
                _this.loadFlag=true
                _this.page=0
        


              if(_this.loadFlag){
                _this.$axios.get("/refund-orders",{
                    headers: {
                        'Authorization': localStorage.getItem('token_type') + ' '+localStorage.getItem('access_token'),
                    },
                    params: {
                    
                        "state":_this.act_selece,
                        "last_id":_this.page
                    }
                }).then(res=>{
                    console.log(res)
                    if(res.status==200){
                        if(res.data.data.length<_this.GLOBAL.page_total){
                            _this.page_end=false
                        }
                        let act_list=_this.act_list;
                       act_list=res.data.data

                        _this.act_list=act_list;
                        _this.loadFlag=false;

                    }else {
                        _this.showa=true;
                        _this.show_tip=res.data.message;
                    }
                })
                    .catch(err=>{
                        console.log(err)
                    })

                }

     }
     // 恢复成默认的false，避免isBack一直是true，导致下次无法获取数据
     this.$route.meta.isBack=false
     // 恢复成默认的false，避免isBack一直是true，导致每次都获取新数据
     this.isFirstEnter=false;

        
        },






        destroyed(){
            console.log(this.$refs.opBottomEcharts)
            window.removeEventListener('scroll', this.gotoScroll);
        }
    }
</script>

<style scoped>

    .active_tap{
        width:7.2rem;
        margin:auto;
        height:1.1rem;
        padding:0 0.24rem;
        box-sizing: border-box;
        display: flex;
        justify-content: space-between;
        align-items: center;
        color: #999;
        font-size: 0.32rem;
        background: #fff;
        position: fixed;
        top:1.08rem;left:0;right:0;
        border-radius: 0.1rem;
    }

    .act{
        width:1.3rem;
        height:100%;
        line-height: 1.1rem;
        color: #999;
        font-size: 0.32rem;
        text-align: center;

    }
    
    .act_selece{
        color: #ff5a57;
        border-bottom:0.02rem solid #ff5a57;
        font-weight: bold;

    }
    .active_box{
        width:7.2rem;
        height:calc(100vh - 2.59rem);
        margin:auto;
        margin-top:2.39rem;
        padding-bottom:0.2rem;
        overflow: scroll;
        /*padding-bottom:0.2rem;*/
        /*margin-top:1.03rem;*/
        /*overflow: hidden;*/
        /*margin-bottom:0.2rem;*/

    }
    .active{
        width:100%;
        box-sizing: border-box;
        height:auto;
        margin:auto;


    }

    .active_title .title_center{
        color: #1a1a1a;
        margin-right:0.56rem;
        font-size: 0.28rem;
        font-weight: bold;

    }
    .active_title .title_center>span{
        color: #a6a6a6;
        font-size: 0.28rem;
        font-weight: normal;
    }

    .active_title{
        width:100%;
        height:0.9rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding:0 0.1rem;
        box-sizing: border-box;


    }

    .active_title>.active_title1{
        display: block;
        width:0.34rem;
        height:0.34rem;

    }
    .active_title>.active_title2{
        display: block;
        width:0.36rem;
        height:0.33rem;

    }
    .right_tip{
        display: block;
        width:0.17rem;
        height:0.29rem;
    }
    .act_main:nth-child(1){
        margin-top:0
    }
    .act_main{
        width:100%;
        padding:0.3rem 0.2rem;
        height:2.6rem;
        margin-top:0.2rem;
        box-sizing: border-box;
        display: flex;
        justify-content: space-between;
        background: #fff;
        border-radius: 0.1rem;
    }
    .act_main>.act_main_left{
        width:2.2rem;
        height:2rem;
        border-radius: 0.1rem;
        overflow: hidden;
        position: relative;


    }
    .act_main>.act_main_left>.act_static{
        width:100%;
        height:0.45rem;
        background: rgba(0,0,0,0.6);
        color: #fff;
        text-align: center;
        line-height:0.45rem;
        font-size: 0.28rem;
        position:absolute;
        bottom:0;
        left:0;right:0;margin:auto;
    }


    .act_main>.act_main_left>img{
        width:100%;
        height:100%;
        object-fit: cover;
        background: antiquewhite;

    }

    .act_main>.act_main_left>.act_buta{
        width:1.5rem;
        height:0.48rem;
        background: #f7282f;
        color: #fff;
        font-size: 0.28rem;
        text-align: center;
        line-height:0.48rem;
        margin:auto;
        margin-top:0.2rem;
        border-radius: 0.1rem;
    }

    .act_main>.act_main_left>.act_time{
        width:100%;
        height:0.38rem;
        margin-top:0.1rem;
        text-align: center;
        line-height:0.42rem;
        font-size: 0.48rem;
        color: #f7282f;
        font-weight: bold;
        font-family: 'DINCondensedC';
    }
    .act_main>.act_main_left>.act_time_tip{
        width:100%;
        height:0.24rem;
        margin-top:0.08rem;
        text-align: center;
        line-height:0.24rem;
        font-size: 0.24rem;
        color: #f7282f;
    }
    .act_main>.act_main_right{
        width:4.5rem;
        height:100%;

    }
    .act_main>.act_main_right>.act_main_right1{
        width:100%;
        height:0.36rem;
        font-size: 0.3rem;
        line-height:0.36rem;
        font-weight: bold;
        color: #333333;
        margin-top:0.08rem;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;

    }

    .act_main>.act_main_right>.act_main_right2{
        width:100%;
        height:0.36rem;
        font-size: 0.24rem;
        line-height:0.36rem;
        color: #a6a6a6;
        margin-top:0.18rem;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
    }

    .act_main>.act_main_right>.act_main_right2>span{
        font-size: 0.24rem;
    }
    .act_main>.act_main_right>.act_main_right3{
        width:100%;
        height:0.36rem;
        font-size: 0.24rem;
        line-height:0.36rem;
        color: #a6a6a6;
        margin-top:0.05rem;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;

        /*justify-content: space-between;*/
    }
    .act_main>.act_main_right>.act_main_right3>span{
        font-size: 0.24rem;
    }

    .act_main>.act_main_right>.act_main_right4{
        width:100%;
        height:0.36rem;
        font-size: 0.24rem;
        line-height:0.36rem;
        color: #a6a6a6;
        margin-top:0.16rem;

    }
    .act_main>.act_main_right>.act_main_right5{
        width:100%;
        height:0.36rem;
        font-size: 0.2rem;
        line-height:0.36rem;
        color: #a6a6a6;
        margin-top:0.26rem;
        /*overflow: hidden;*/
        /*text-overflow:ellipsis;*/
        /*white-space: nowrap;*/
        display: flex;
        justify-content: space-between;
    }

    .act_main>.act_main_right>.act_main_right5>span{
        display: block;
        font-size: 0.24rem;
        color: #a6a6a6;
    }





</style>
