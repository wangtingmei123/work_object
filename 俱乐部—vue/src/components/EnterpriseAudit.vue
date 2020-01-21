<template>
    <div class="apply_bg" style="background:#f7f7f7;min-height: 100vh">
        <Header :title="title" :show="show" :backpage="backpage"></Header>

        <div class="apply_all_box">
            <div class="apply_all" @click="select_all($event)">
                <div class="apply_all_span">全选</div>
                <img v-show="select_all_but==false" class="apply_all_img" :src="apply_all_img" alt="">
                <img v-show="select_all_but" class="apply_all_img" :src="apply_all_img_select" alt="">
            </div>
        </div>

        <div class="apply_list_box">
            <div class="apply_list">
                <div class="apply_user">
                    <div class="apply_name">王丽坤</div>
                    <div class="apply_menber">技术部</div>
                </div>
                <div class="apply_time">申请时间：<span>2019-12-04</span></div>
                <div class="apply_but" id="1"   @click="select(1,$event)">
                    <img class="apply_buta apply_but1 apply_but_block" :src="apply_all_img" alt="">
                    <img  class="apply_buta apply_but2" :src="apply_all_img_select" alt="">
                </div>
            </div>
            <div class="apply_list">
                <div class="apply_user">
                    <div class="apply_name ">王丽坤</div>
                    <div class="apply_menber">技术部</div>
                </div>
                <div class="apply_time">申请时间：<span>2019-12-04</span></div>
                <div class="apply_but" id="2"   @click="select(2,$event)">
                    <img class="apply_buta apply_but1 apply_but_block" :src="apply_all_img" alt="">
                    <img  class="apply_buta apply_but2" :src="apply_all_img_select" alt="">
                </div>
            </div>
            <div class="apply_list">
                <div class="apply_user">
                    <div class="apply_name">王丽坤</div>
                    <div class="apply_menber">技术部</div>
                </div>
                <div class="apply_time">申请时间：<span>2019-12-04</span></div>
                <div class="apply_but" id="3"   @click="select(3,$event)">
                    <img class="apply_buta apply_but1 apply_but_block" :src="apply_all_img" alt="">
                    <img  class="apply_buta apply_but2" :src="apply_all_img_select" alt="">
                </div>
            </div>
            <div class="apply_list">
                <div class="apply_user">
                    <div class="apply_name">王丽坤</div>
                    <div class="apply_menber">技术部</div>
                </div>
                <div class="apply_time">申请时间：<span>2019-12-04</span></div>
                <div class="apply_but" id="1"   @click="select(1,$event)">
                    <img class="apply_buta apply_but1 apply_but_block" :src="apply_all_img" alt="">
                    <img  class="apply_buta apply_but2" :src="apply_all_img_select" alt="">
                </div>
            </div>
            <div class="apply_list">
                <div class="apply_user">
                    <div class="apply_name ">王丽坤</div>
                    <div class="apply_menber">技术部</div>
                </div>
                <div class="apply_time">申请时间：<span>2019-12-04</span></div>
                <div class="apply_but" id="2"   @click="select(2,$event)">
                    <img class="apply_buta apply_but1 apply_but_block" :src="apply_all_img" alt="">
                    <img  class="apply_buta apply_but2" :src="apply_all_img_select" alt="">
                </div>
            </div>
            <div class="apply_list">
                <div class="apply_user">
                    <div class="apply_name">王丽坤</div>
                    <div class="apply_menber">技术部</div>
                </div>
                <div class="apply_time">申请时间：<span>2019-12-04</span></div>
                <div class="apply_but" id="3"   @click="select(3,$event)">
                    <img class="apply_buta apply_but1 apply_but_block" :src="apply_all_img" alt="">
                    <img  class="apply_buta apply_but2" :src="apply_all_img_select" alt="">
                </div>
            </div>
            <div class="apply_list">
                <div class="apply_user">
                    <div class="apply_name">王丽坤</div>
                    <div class="apply_menber">技术部</div>
                </div>
                <div class="apply_time">申请时间：<span>2019-12-04</span></div>
                <div class="apply_but" id="1"   @click="select(1,$event)">
                    <img class="apply_buta apply_but1 apply_but_block" :src="apply_all_img" alt="">
                    <img  class="apply_buta apply_but2" :src="apply_all_img_select" alt="">
                </div>
            </div>
            <div class="apply_list">
                <div class="apply_user">
                    <div class="apply_name ">王丽坤</div>
                    <div class="apply_menber">技术部</div>
                </div>
                <div class="apply_time">申请时间：<span>2019-12-04</span></div>
                <div class="apply_but" id="2"   @click="select(2,$event)">
                    <img class="apply_buta apply_but1 apply_but_block" :src="apply_all_img" alt="">
                    <img  class="apply_buta apply_but2" :src="apply_all_img_select" alt="">
                </div>
            </div>
            <div class="apply_list">
                <div class="apply_user">
                    <div class="apply_name">王丽坤</div>
                    <div class="apply_menber">技术部</div>
                </div>
                <div class="apply_time">申请时间：<span>2019-12-04</span></div>
                <div class="apply_but" id="3"   @click="select(3,$event)">
                    <img class="apply_buta apply_but1 apply_but_block" :src="apply_all_img" alt="">
                    <img  class="apply_buta apply_but2" :src="apply_all_img_select" alt="">
                </div>
            </div>
            <div class="apply_list">
                <div class="apply_user">
                    <div class="apply_name">王丽坤</div>
                    <div class="apply_menber">技术部</div>
                </div>
                <div class="apply_time">申请时间：<span>2019-12-04</span></div>
                <div class="apply_but" id="1"   @click="select(1,$event)">
                    <img class="apply_buta apply_but1 apply_but_block" :src="apply_all_img" alt="">
                    <img  class="apply_buta apply_but2" :src="apply_all_img_select" alt="">
                </div>
            </div>
            <div class="apply_list">
                <div class="apply_user">
                    <div class="apply_name ">王丽坤</div>
                    <div class="apply_menber">技术部</div>
                </div>
                <div class="apply_time">申请时间：<span>2019-12-04</span></div>
                <div class="apply_but" id="2"   @click="select(2,$event)">
                    <img class="apply_buta apply_but1 apply_but_block" :src="apply_all_img" alt="">
                    <img  class="apply_buta apply_but2" :src="apply_all_img_select" alt="">
                </div>
            </div>
            <div class="apply_list">
                <div class="apply_user">
                    <div class="apply_name">王丽坤</div>
                    <div class="apply_menber">技术部</div>
                </div>
                <div class="apply_time">申请时间：<span>2019-12-04</span></div>
                <div class="apply_but" id="3"   @click="select(3,$event)">
                    <img class="apply_buta apply_but1 apply_but_block" :src="apply_all_img" alt="">
                    <img  class="apply_buta apply_but2" :src="apply_all_img_select" alt="">
                </div>
            </div>
        </div>

        <div class="creat_club_box">
            <div class="creat_club">确定</div>
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
                title: '申请加入',
                show: true,
                backpage: '',
                apply_all_img:'./static/img/09apply_03.png',
                apply_all_img_select:'./static/img/09apply_06.png',
                select_all_but:false,
                select_but:false,
                select_list:[],
                page:1,
                clientHeight:'',
                scrollHeight:''
                // select:[1,2,3,4,5]
            }
        },
        created() {

        },
        mounted() {
            this.clientHeight = document.documentElement.clientHeight || document.body.clientHeight;
            this.scrollHeight=document.body.scrollHeight || document.documentElement.scrollHeight;
            window.addEventListener('scroll',this.gotoScroll)
        },
        methods: {
            getpagedata(){
                console.log(this.page)
            },
            gotoScroll(){
                console.log("ppp")
                let scrollTop=document.body.scrollTop|| document.documentElement.scrollTop;

                //滚动条到底部的条件:div 到头部的距离 + 屏幕高度 = 可滚动的总高度
                console.log(scrollTop+"+"+this.clientHeight+"+"+this.scrollHeight)
                if(scrollTop+this.clientHeight >= this.scrollHeight+74){
                    this.page=2
                    console.log("bbb")
                    console.log("cccc")
                    this.getpagedata()
                }
            },
            select(e,event){

                var select_list=this.select_list;
                // console.log(event.currentTarget)
                if($(event.currentTarget).find(".apply_but1").hasClass('apply_but_block')){
                    $(event.currentTarget).find(".apply_but1").removeClass('apply_but_block')
                    $(event.currentTarget).find(".apply_but2").addClass('apply_but_block')
                    select_list.push(e);
                }else{
                    $(event.currentTarget).find(".apply_but2").removeClass('apply_but_block')
                    $(event.currentTarget).find(".apply_but1").addClass('apply_but_block')
                    var index= select_list.indexOf(e);
                    console.log(index)
                    select_list.splice(index,1)

                }
                console.log(select_list)

            },
            select_all(event){
                var select_list=[]
                this.select_all_but=!this.select_all_but;
                if(this.select_all_but){
                    $(event.currentTarget).parents(".apply_bg").find(".apply_list_box").find(".apply_buta").removeClass('apply_but_block')
                    $(event.currentTarget).parents(".apply_bg").find(".apply_list_box").find(".apply_but2").addClass('apply_but_block')
                }else{
                    $(event.currentTarget).parents(".apply_bg").find(".apply_list_box").find(".apply_buta").removeClass('apply_but_block')
                    $(event.currentTarget).parents(".apply_bg").find(".apply_list_box").find(".apply_but1").addClass('apply_but_block')
                }
                console.log(select_list)
            }
        },
        destroyed(){
            // console.log(this.$refs.opBottomEcharts)
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
        background: #f7282f;
        color: #fff;
        text-align: center;
        line-height:0.9rem;
        font-size: 0.3rem;
        font-weight: bold;
        border-radius: 0.1rem;

    }

    .apply_list_box{
        width:7.1rem;
        height:auto;
        margin:auto;
        margin-top:1.48rem;
        background: #fff;
        margin-bottom:1.3rem;
        border-radius: 0.1rem;

    }
    .apply_list_box>.apply_list{
        width:6.8rem;
        margin:auto;
        height:1.45rem;

        border-bottom:1px solid #f7f7f7;
        padding: 0.36rem 0;
        box-sizing: border-box;
        display: flex;
        justify-content: space-between;
    }

    .apply_list>.apply_user{
        width:2.47rem;
        height:100%;
    }
    .apply_list>.apply_user>.apply_name{
        width:100%;
        height:0.28rem;
        font-size: 0.28rem;
        line-height:0.28rem;
    }

    .apply_list>.apply_user>.apply_menber{
        width:100%;
        height:0.24rem;
        font-size: 0.24rem;
        line-height:0.24rem;
        margin-top:0.24rem;
        color: #a5a5a5;
        margin-right:0.7rem;
    }

    .apply_list> .apply_time{
        width:3.08rem;
        height:0.28rem;
        font-size: 0.28rem;
        color: #4d4d4d;
    }

    .apply_list> .apply_time>span{
        color: #a6a6a6;
    }

    .apply_list> .apply_but{
        width: 0.3rem;
        height:0.3rem;
    }

    .apply_list> .apply_but>img{
        display: none;
        width: 0.3rem;
        height:0.3rem;
    }

    .apply_list> .apply_but .apply_but_block{
        display: block;
    }

    .apply_all_box{
        width:100%;
        height:0.6rem;
        background: #f7f7f7;
        position: fixed;
        top:0.88rem;
        border-radius: 0.1rem;

    }
    .apply_all_box>.apply_all{
        width:0.95rem;
        height:0.3rem;
        position: absolute;
        top:0.14rem;
        right:0.36rem;
        font-size: 0.24rem;
        color: #191919;
        display: flex;
        justify-content: space-between;
        align-items: center;

    }

    .apply_all_box .apply_all>.apply_all_img{
        display: block;
        width:0.3rem;
        height:0.3rem;
    }

</style>
