<template>
    <div style="background: #f0f0f0;min-height: 100vh">
        <Header :title="title" :show="show" :backpage="backpage"></Header>
        <div class="rank_list_box" v-show="club_list.length>0"  ref="opBottomEcharts1"  @scroll="gotoScroll()" >
            <div class="rank_list" >
                <div class="club_main"  v-for="(item,index) in club_list" :key="index">
                    <div class="club_main_left" @click="to_clubindex(item.is_joined,item.id,item.is_admin,item.name)">
                        <img v-show="item.logo!=''" v-lazy="item.logo" :src="lazyimg" alt="">
                        <img v-show="item.logo==''" :src="lazyimg" alt="">

                    </div>
                    <div class="club_main_right">
                        <div class="club_main_right1" @click="to_clubindex(item.is_joined,item.id,item.is_admin,item.name)">{{item.name}}</div>
                        <div class="club_main_right2" @click="to_clubindex(item.is_joined,item.id,item.is_admin,item.name)">
                            <!--<div class="club_main_right2_tap1">lv18</div>-->
                            <div class="club_main_right2_tap1">{{item.type_name}}</div>
                            <div class="club_main_right2_peoper">{{item.num_max}}</div>
                        </div>
                        <div class="club_main_right3" @click="to_clubindex(item.is_joined,item.id,item.is_admin,item.name)">{{item.explanation}}</div>
                        <div v-if="item.is_joined==0" class="to_join" @click="to_apply(item.id,index)">申请加入</div>
                    </div>
                </div>
            </div>
        </div>

        <div class="empty_box" v-show="club_list.length==0">
            <img :src="empty_img" alt="">
            <!--<div class="empty_tip">目前还没有俱乐部哦</div>-->
        </div>
        <!--<div class="creat_club" @click="creat_club">创建俱乐部</div>-->
        <div class="creat_club_box" v-show="is_root===true">
            <div class="creat_club" @click="creat_club">创建俱乐部</div>
        </div>
        <Eject  type='alert' @tocancel="nofall" @took='okfall' :showstate='showa'  :cancel='cancel'>
            <div slot='text'>{{show_tip}}</div>
        </Eject>
        <div class="hide_tip_box" v-show="hidea">
            <div class="hide_tip">{{hide_tip}}</div>
        </div>


    </div>
</template>


<script>
    import Eject from './eject'
    import Header from './Header'
    export default {
        components: { Header,Eject },
        name: '',
        data() {
            return {
                lode_img:'./static/img/loding.gif',
                empty_img:'./static/img/empty_img.png',
                cancel:true,
                showa:false,
                show_tip:'',
                hide_tip:'',
                hidea:false,
                title: '全部俱乐部',
                show: true,
                backpage: '',
                club_img:'./static/img/03index_37.png',
                clientHeight:'',
                scrollHeight:'',
                scrollTop:'',
                page_end:true,
                loadFlag:true,
                page:0,
                club_list:[],
                apply:0,
                club_id:'',
                is_joined:'',
                club_index:'',
                no_empty:false,
                is_root:false,
                lazyimg:'./static/img/lazyimg.png',

            }
        },
        created() {
         
            this.real_show()
            this.user_get()

        },
        mounted() {
            //    this.is_root=localStorage.getItem('is_root')
            console.log(this.is_root)

            this.$refs.opBottomEcharts1.addEventListener('scroll',this.gotoScroll)
        },
        methods: {
           user_get(){
                let _this=this;
                this.$axios.get("/user",{
                    headers: {
                        'Authorization': localStorage.getItem('token_type') + ' '+localStorage.getItem('access_token'),
                    },
                    params: {
                    }
                }).then(res=>{
                    console.log(res)
                    if(res.status==200){
                        _this.is_root=res.data.data.is_root;
                    
                    }else {
                    }
                })
                    .catch(err=>{
                        console.log(err)
                    })
            },

            real_show(){
                console.log(this.page)
                let _this=this;
                if(_this.loadFlag){
                this.$axios.get("/clubs",{
                    headers: {
                        'Authorization': localStorage.getItem('token_type') + ' '+localStorage.getItem('access_token'),
                    },
                    params: {
                        last_id:_this.page
                    }
                }).then(res=>{
                    console.log(res)
                    if(res.status==200){
                        if(res.data.data.length<_this.GLOBAL.page_total){
                            _this.page_end=false
                        }
                        let club_list=_this.club_list;
                        if(club_list.length==0){
                            club_list=res.data.data
                        }else{
                            club_list.push.apply(club_list,res.data.data);
                        }
                        _this.club_list=club_list;
                        _this.loadFlag=false
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
                let _this=this
                console.log("ppp")
                this.scrollTop=_this.$refs.opBottomEcharts1.scrollTop;
                this.clientHeight = this.$refs.opBottomEcharts1.clientHeight;
                this.scrollHeight=this.$refs.opBottomEcharts1.scrollHeight;
                //滚动条到底部的条件:div 到头部的距离 + 屏幕高度 = 可滚动的总高度
                console.log(this.scrollTop+"+"+_this.clientHeight+"+"+_this.scrollHeight)
                if(this.scrollTop+_this.clientHeight >= _this.scrollHeight-10){
                    if(_this.page_end&&_this.loadFlag==false){
                        _this.loadFlag=true
                        let page = _this.page+1;
                        _this.page=page;
                        console.log(_this.page)
                        _this.real_show()
                    }

                }
            },
            okfall(){
                let _this=this;
                this.showa=false;
                if(this.apply==1){
                    this.apply=0;
                    this.$axios.post("/club-users ",{
                        "club_id": _this.club_id,

                    },{headers: {
                        'Authorization': localStorage.getItem('token_type') + ' '+localStorage.getItem('access_token'),
                    }}).then(res=>{
                        console.log(res)
                        if(res.status==200){
                            _this.hidea=true;
                            _this.hide_tip='申请成功，待审核';
                            setTimeout(function(){
                                _this.hidea=false;
                            },1500)
                            _this.club_list[_this.club_index].is_joined=1
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
            nofall(){
                this.showa=false;
            },
            to_clubindex(is_joined,id,is_admin,name){
                localStorage.setItem('club_id',id)
                localStorage.setItem('club_name',name)
                this.$router.push({ path: '/clubindex',query:{id:id,is_admin:is_admin}}) // -> /user

            },
            creat_club(){
                this.$router.push({ path: '/createclub',query:{type_l:0}}) // -> /user
            },
            to_apply(club_id,index){
                this.club_id=club_id;
                this.club_index=index;
                this.showa=true;
                this.show_tip='确定加入俱乐部吗？'
                this.apply=1;
            }

        }

    }
</script>

<style scoped>



    .creat_club_box{
        width:100%;
        height:1.3rem;
        background: #f0f0f0;
        position: fixed;
        left:0;
        right:0;
        bottom:0;
        margin:auto;
        box-shadow: 0 0 0.08rem #ccc;
    }
    .creat_club{
        width:7.2rem;
        height:0.9rem;
        margin:auto;
        margin-top:0.2rem;
        background: #f7282f;
        color: #fff;
        text-align: center;
        line-height:0.9rem;
        font-size: 0.3rem;
        border-radius: 0.1rem;

    }
    .rank_list_box{
        width:7.2rem;
        /* height:calc(100vh - 2.08rem); */
        margin:auto;
        /*margin-top:0.88rem;*/
        /*overflow: hidden;*/
        padding-bottom:1.3rem;
        /* position: absolute; */
        margin-top:0.88rem;
        /* bottom:1.2rem; */
        left:0;right:0;
        overflow: scroll;

    }

    .rank_list_box_root{
        height:calc(100vh - 0.88rem);
        bottom:0;
    }

    .rank_list{
        width:100%;
        height:100%;
    }


    .club_main{
        width:100%;
        height:2.6rem;
        padding:0.3rem 0.17rem;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-top:0.2rem;
        background: #fff;
        border-radius: 0.1rem;
    }

   .club_main>.club_main_left{
        width:2.2rem;
        height: 2rem;

    }
   .club_main>.club_main_left>img{
        width:100%;
        height: 100%;
       object-fit: cover;
       background: palegoldenrod;
       border:none;
       border-radius: 0.1rem;
    }
    .club_main>.club_main_right{
        width:4.56rem;
        height: 2rem;
        position: relative;
    }

    .club_main>.club_main_right .to_join{
        width:1.3rem;
        height:0.5rem;
        background: #f7282f;
        color: #fff;
        text-align: center;
        line-height:0.5rem;
        border-radius: 0.1rem;
        position: absolute;
        font-size: 0.26rem;
        top:0.12rem;
        right:0;

    }
   .club_main>.club_main_right>.club_main_right1{
        width:100%;
        height:0.36rem;
        font-size: 0.3rem;
        line-height:0.36rem;
        font-weight: bold;
        margin-top:0.08rem;
        color: #1a1a1a;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
    }

   .club_main>.club_main_right>.club_main_right2{
        width:100%;
        height:0.32rem;
        font-size: 0.22rem;
        line-height:0.32rem;
        color: #999;
        margin-top:0.1rem;
    }

    .club_main>.club_main_right>.club_main_right2>.club_main_right2_tap1{
        width:auto;
        font-size: 0.22rem;
        height:0.32rem;
        line-height:0.32rem;
        background:#f7282f;
        border-radius: 0.06rem;
        padding:0 0.1rem;
        float: left;
        margin-left:0.14rem;
        color: #fff;
        /*margin-top:0.01rem;*/

    }

     .club_main>.club_main_right>.club_main_right2>.club_main_right2_tap1:nth-child(1){
        margin-left:0;
    }

     .club_main>.club_main_right>.club_main_right2>.club_main_right2_peoper{
        width:auto;
        font-size: 0.22rem;
        color: #999;
        margin-left:0.2rem;
        height:100%;
        line-height:0.32rem;
        float: left;
    }

    .club_main>.club_main_right>.club_main_right3{
        height:auto;
        width:100%;
        margin-top:0.3rem;
        line-height:0.4rem;
        font-size: 0.22rem;
        color: #4d4d4d;
        overflow: hidden;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;


    }

</style>
