<template>
    <div style="background: #f0f0f0;min-height: 100vh">
        <Header :title="title" :show="show" :backpage="backpage"></Header>
        <div class="rank_list_box" v-show="club_list.length>0" ref="opBottomEcharts1"  @scroll="gotoScroll()" >
            <div class="rank_list" >
                <div class="club_main"  v-for="(item,index) in club_list" :key="index">
                    <div class="club_main_left" @click="to_clubindex(item.club.id,item.club.name)">
                        <img :src="item.club.logo" alt="">
                    </div>
                    <div class="club_main_right">
                        <div class="club_main_right1" @click="to_clubindex(item.club.id,item.club.name)">{{item.club.name}}</div>
                        <div class="club_main_right2" @click="to_clubindex(item.club.id,item.club.name)">
                            <!--<div class="club_main_right2_tap1">lv18</div>-->
                            <div class="club_main_right2_tap1">{{item.club.type_name}}</div>
                            <div class="club_main_right2_peoper">{{item.club.members}}</div>
                        </div>
                        <div class="club_main_right3" @click="to_clubindex(item.club.id,item.club.name)">{{item.club.explanation}}</div>

                    </div>
                </div>
            </div>
        </div>

        <div class="empty_box" v-show="club_list.length==0&&no_empty">
            <img :src="empty_img" alt="">
            <!--<div class="empty_tip">目前还没有俱乐部哦</div>-->
        </div>

        <Eject  type='alert' @tocancel="nofall" @took='okfall' :showstate='showa'  :cancel='cancel'>
            <div slot='text'>{{show_tip}}</div>
        </Eject>
        <div class="hide_tip_box" v-show="hidea">
            <div class="hide_tip">{{hide_tip}}</div>
        </div>
        <div class="empty_box" v-show="club_list.length==0">
            <img :src="empty_img" alt="">
            <!--<div class="empty_tip">目前还没有俱乐部哦</div>-->
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
                title: '加入的俱乐部',
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
                lazyimg:'./static/img/lazyimg.png',
               isFirstEnter:false

            }
        },
        created() {
                 this.isFirstEnter=false;


        },
        mounted() {

        },
        methods: {

            real_show(){
                let user_id=localStorage.getItem('user_id')
                console.log(this.page)
                let _this=this;
                if(_this.loadFlag){
                    this.$axios.get("/user-clubs/"+user_id,{
                        headers: {
                            'Authorization': localStorage.getItem('token_type') + ' '+localStorage.getItem('access_token'),
                        },
                        params: {
//                            last_id:_this.page
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
            },
            nofall(){
                this.showa=false;
            },
            to_clubindex(id,name){
                localStorage.setItem('club_id',id)
                localStorage.setItem('club_name',name)
                this.$router.push({ path: '/clubindex',query:{id:id}}) // -> /user

            },



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
                  _this.is_root=localStorage.getItem('is_root')

                 _this.clientHeight=''
                _this.scrollHeight=''
                _this.scrollTop=''
                _this.page_end=true
                _this.loadFlag=true
                _this.page=0
        

                let user_id=localStorage.getItem('user_id')

                 if(_this.loadFlag){
                    _this.$axios.get("/user-clubs/"+user_id,{
                        headers: {
                            'Authorization': localStorage.getItem('token_type') + ' '+localStorage.getItem('access_token'),
                        },
                        params: {
//                            last_id:_this.page
                        }
                    }).then(res=>{
                        console.log(res)
                        if(res.status==200){
                            if(res.data.data.length<_this.GLOBAL.page_total){
                                _this.page_end=false
                            }
                            let club_list=_this.club_list;
                             club_list=res.data.data

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

     }
     // 恢复成默认的false，避免isBack一直是true，导致下次无法获取数据
     this.$route.meta.isBack=false
     // 恢复成默认的false，避免isBack一直是true，导致每次都获取新数据
     this.isFirstEnter=false;

        
        },



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
        height:calc(100vh - 1.08rem);
        margin:auto;
        /*margin-top:0.88rem;*/
        /*overflow: hidden;*/
        /*padding-bottom:1.3rem;*/
        position: absolute;
        top:0.88rem;
        bottom:0.2rem;
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
        background:#ff5a57;
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
        color: #a6a6a6;
        overflow: hidden;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;


    }

</style>
