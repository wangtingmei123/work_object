<template>
    <div class="apply_bg" style="min-height: 100vh;overflow: hidden">
        <Header :title="title" :show="show" :backpage="backpage"></Header>
        <div class="member_list_boxs" ref="opBottomEcharts3" v-show="audit_list.length>0" @scroll="gotoScroll()">
             <div class="member_list_box" >
                <div class="member_list" v-for="(item,index) in audit_list" :key="index">
                    <div class="member1">
                        <img v-if="item.user.avatar==''" :src="photo" alt="">
                        <img v-if="item.user.avatar!=''" :src="item.user.avatar" alt="">
                        <div class="member2">
                            <div class="member2_name">
                                <div class="member2_name1">{{item.user.user_name}}</div>
                                <div class="member2_name2" v-show="item.is_authorized==1">管理员</div>
                                 
                            </div>
                            <div class="member2_bumen">{{item.user.department}}</div>
                        </div>
                    </div>

                    <div class="member3">
                        <div class="member31">报名：<span>{{item.activities}}</span></div>
                        <div class="member32 member32" >签到：<span>{{item.signatures}}</span></div>
                    </div>
                    <!--<div class="member4">-->
                        <!--参与率：<span>90%</span>-->
                    <!--</div>-->
                    <!--<div class="member5">-->
                         <!--<span>455</span>分-->
                    <!--</div>-->
                    <div class="member6" v-show="authorized==1"  @click="to_guan(item.id,item.is_authorized,index,item.user.id)">
                        <span v-show="item.is_authorized==0&&authorized==1">设置管理员</span>
                        <span v-show="item.is_authorized==1&&authorized==1">取消管理员</span>
                    </div>
                </div>

            </div>
        </div>
        <div class="empty_box" v-show="audit_list.length==0">
            <img :src="empty_img" alt="">
            <!--<div class="empty_tip"></div>-->
        </div>
        <Eject  type='alert' @took='okfall' :showstate='showa'>
            <span slot='tlt'>提示</span>
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
        components: {
            Header,
            Eject
        },
        name: '',
        data() {
            return {
                hide_tip:'',
                hidea:false,
                showa:false,
                show_tip:'',
                empty_img:'./static/img/empty_img.png',
                title: '成员列表',
                show: true,
                backpage: '',
                photo:'./static/img/07club_32.png',
                audit_list:[],
                clientHeight:'',
                scrollHeight:'',
                scrollTop:'',
                club_id:'',
                page:0,
                page_end:true,
                loadFlag:true,
                no_empty:false,
                authorized:''
            }
        },
        created() {
            this.club_id=this.$route.query.club_id;
            this.authorized=localStorage.getItem('is_authorized')
            this.request()
        },
        mounted() {
        },
        methods: {
            gotoScroll(){
                let _this=this
                console.log("ppp")
                this.scrollTop=this.$refs.opBottomEcharts3.scrollTop;
                this.clientHeight = this.$refs.opBottomEcharts3.clientHeight;
                this.scrollHeight=this.$refs.opBottomEcharts3.scrollHeight;
                //滚动条到底部的条件:div 到头部的距离 + 屏幕高度 = 可滚动的总高度
                console.log(this.scrollTop+"+"+_this.clientHeight+"+"+_this.scrollHeight)
                if(this.scrollTop+_this.clientHeight >= _this.scrollHeight-10){
                    if(_this.page_end && _this.loadFlag==false){
                        _this.loadFlag=true
                        let page = _this.page+1;
                        _this.page=page;
                        console.log(_this.page)
                        _this.request()
                    }


                }
            },
            request(){
                let _this=this;
                if(_this.loadFlag) {
                    _this.$axios.get("/club-users", {
                        headers: {
                            'Authorization': localStorage.getItem('token_type') + ' ' + localStorage.getItem('access_token'),
                        },
                        params: {
                            "club_id": _this.club_id,
                            "is_verified": 1,
                            "last_id": _this.page
                        }
                    }).then(res => {
                        console.log(res)
                        if (res.status == 200) {
                            if (res.data.data.length < _this.GLOBAL.page_total) {
                                _this.page_end = false
                            }
                            let audit_list = _this.audit_list;
                            if (audit_list.length == 0) {
                                audit_list = res.data.data
                            } else {
                                audit_list.push.apply(audit_list, res.data.data);
                            }
                            _this.audit_list = audit_list;
                            _this.loadFlag = false;
                        } else {
                            _this.showa = true;
                            _this.show_tip = res.data.message;
                        }
                    })
                        .catch(err => {
                            console.log(err)
                        })
                }
            },
            to_guan(id,is_authorized,index,user_id){
                let _this=this;
                if(is_authorized==0){
                    _this.$axios.patch("club-users/auth",{
                        id:id
                    }, {headers: {
                        'Authorization': localStorage.getItem('token_type') + localStorage.getItem('access_token'),
                    }})
                        .then(res=>{
                            if(res.status==200){
                                _this.hidea=true;
                                _this.hide_tip='设置成功';

                                setTimeout(function(){
                                    _this.hidea=false;
                                    _this.audit_list[index].is_authorized=1
                                },1500)
                            }else{
                                _this.showa=true;
                                _this.show_tip=res.data.message;
                                return
                            }
                        })
                        .catch(err=>{
                        })
                }else if(is_authorized==1){
                    _this.$axios.delete("club-users/auth", {
                            headers: {
                                'Authorization': localStorage.getItem('token_type') + localStorage.getItem('access_token'),
                            },
                            params:{
                                    id: id
                                },
                        }
                    )
                        .then(res=>{
                            if(res.status==200){
                                _this.hidea=true;
                                _this.hide_tip='取消成功';
                                setTimeout(function(){
                                    _this.hidea=false;
                                    _this.audit_list[index].is_authorized=0;
                                    if(localStorage.getItem('user_id')==user_id){
                                        localStorage.setItem('is_authorized',0);
                                        _this.authorized=0;
                                    }

                                },1500)
                            }else{
                                _this.showa=true;
                                _this.show_tip=res.data.message;
                                return
                            }
                        })
                        .catch(err=>{
                        })
                }


            },
            okfall(){
                this.showa=false;
            },
        }

    }
</script>

<style scoped>

    .member_list_boxs{
        width:100%;
        /*padding:0 0.2rem;*/
        height:calc(100vh - 0.98rem);
        margin:auto;
        margin-top:0.98rem;
        overflow: scroll;
    }
  .member_list_box{
      width:7.2rem;
      height:auto;
      margin:auto;
      background: #fff;
      border-radius: 0.1rem;
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
      width:3.28rem;
      height:0.78rem;
      border-radius: 0.78rem;
      display: flex;
      align-items: center;
      justify-content: flex-start;

  }
  .member_list>.member1>img{
      display: block;
      width:0.78rem;
      height:100%;
      border-radius: 0.78rem;

  }
  .member_list .member2{
      width:auto;
      height:100%;
      margin-left:0.1rem;
  }

  .member_list .member2>.member2_name{
      font-size: 0.3rem;
      color: #191919;
      height:0.3rem;
      line-height:0.3rem;
      margin-top:0.08rem;
  }

    .member_list .member2>.member2_name>.member2_name1{
        width:auto;
        float: left;

    }

    .member_list .member2>.member2_name>.member2_name2{
        width:0.9rem;
        float: left;
        height:100%;
        font-size: 0.22rem;
        color: #fff;
        background: #ff5a57;
        border-radius: 0.06rem;
        margin-left:0.1rem;
        line-height:0.3rem;
        text-align: center
        
    }
  .member_list .member2>.member2_bumen{
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
      font-size: 0.26rem;
      height:0.28rem;
      line-height:0.26rem;
      color: #a6a6a6;
  }

  .member_list>.member4{
      width:1.73rem;
      height:100%;
      font-size: 0.26rem;
      line-height:0.78rem;
  }

  .member_list>.member5{
      width:1.45rem;
      height:100%;
      font-size: 0.26rem;
      line-height:0.78rem;
      text-align:right;
  }

    .member_list>.member6{
        width:1.85rem;
        height:0.6rem;
        font-size: 0.26rem;
        line-height:0.6rem;
        text-align:center;
        background: #ff5a57;
        color: #fff;
        border-radius: 0.1rem;

    }

    .member_list>.member6>span{
        color: #fff;
    }
</style>
