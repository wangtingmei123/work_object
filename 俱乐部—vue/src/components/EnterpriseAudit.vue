<template>
    <div class="apply_bg" style="background:#f7f7f7;min-height: 100vh">
        <Header :title="title" :show="show" :backpage="backpage"></Header>

        <div class="apply_all_box" v-show="audit_list.length>0">
            <div class="apply_all" @click="select_all($event)">
                <div class="apply_all_span">全选</div>
                <img v-show="select_all_but==false" class="apply_all_img" :src="apply_all_img" alt="">
                <img v-show="select_all_but" class="apply_all_img" :src="apply_all_img_select" alt="">
            </div>
        </div>

        <div class="apply_list_box" v-show="audit_list.length>0" ref="opBottomEcharts2"  @scroll="gotoScroll()" >
            <div class="apply_list" v-for="(item,index) in audit_list" :key="index"> 
                <div class="apply_user">
                    <div class="apply_name">{{item.real_name}}</div>
                    <div class="apply_menber">{{item.department}}</div>
                </div>
                <div class="apply_time">申请时间：<span>{{item.created_at}}</span></div>
                <div class="apply_but" :id="item.id"   @click="select(item.id,$event)">
                    <img class="apply_buta apply_but1 apply_but_block" :src="apply_all_img" alt="">
                    <img  class="apply_buta apply_but2" :src="apply_all_img_select" alt="">
                </div>
            </div>
   
        </div>

          <div class="empty_box" v-show="audit_list.length==0">
                <img :src="empty_img" alt="">
                <!--<div class="empty_tip"></div>-->
            </div>

            <div class="creat_club_box" v-show="audit_list.length>0" @click="to_apply">
                <div class="creat_club">确定</div>
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
        components: { Header,
                    Eject
             },
        name: '',
        data() {
            return {
                empty_img:'./static/img/empty_img.png',
                hide_tip:'',
                hidea:false,
                showa:false,
                show_tip:'',
                title: '申请加入',
                show: true,
                backpage: '',
                apply_all_img:'./static/img/09apply_03.png',
                apply_all_img_select:'./static/img/09apply_06.png',
                select_all_but:false,
                select_but:false,
                select_list:[],
                clientHeight:'',
                scrollHeight:'',
                scrollTop:'',
                 audit_list:[],
                page:0,
                page_end:true,
                loadFlag:true
                // select:[1,2,3,4,5]
            }
        },
        created() {
              this.requesta()

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
                        _this.requesta()
                    }


                }
            },
            requesta(){
                let _this=this;

                if(_this.loadFlag){
                _this.$axios.get("/invitation-users/0",{
                    headers: {
                        'Authorization': localStorage.getItem('token_type') + ' '+localStorage.getItem('access_token'),
                    },
                    params: {
                         "last_id":_this.page
                    }
                }).then(res=>{
                    console.log(res)
                    if(res.status==200){
                        if(res.data.data.length<_this.GLOBAL.page_total){
                            _this.page_end=false
                        }
                        let audit_list=_this.audit_list;
                        if(audit_list.length==0){
                            audit_list=res.data.data
                        }else{
                            audit_list.push.apply(audit_list,res.data.data);
                        }
                        _this.audit_list=audit_list;
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

                this.select_list=select_list;
                console.log(this.select_list)

            },
            select_all(event){
                let _this=this
                let select_list=[]
                let list=_this.audit_list;
                this.select_all_but=!this.select_all_but;
                if(this.select_all_but){
                    $(event.currentTarget).parents(".apply_bg").find(".apply_list_box").find(".apply_buta").removeClass('apply_but_block')
                    $(event.currentTarget).parents(".apply_bg").find(".apply_list_box").find(".apply_but2").addClass('apply_but_block')
                    for(let a=0;a<list.length;a++){
                        select_list.push(list[a].id)
                    }
                }else{
                    $(event.currentTarget).parents(".apply_bg").find(".apply_list_box").find(".apply_buta").removeClass('apply_but_block')
                    $(event.currentTarget).parents(".apply_bg").find(".apply_list_box").find(".apply_but1").addClass('apply_but_block')
                    select_list=[]
                }

                _this.select_list=select_list;
                console.log(_this.select_list)
            },

               to_apply(){
                let _this=this;
                let select_lista=_this.select_list.join(",");
                this.$axios.patch("invitation-users",{
                    "uid":select_lista
                }, {headers: {
                    'Authorization': localStorage.getItem('token_type') + localStorage.getItem('access_token'),
                }})
                    .then(res=>{

                        if(res.status==201){
                            _this.hidea=true;
                            _this.hide_tip='加入成功';
                        
                            setTimeout(function(){
                                _this.hidea=false;
                                _this.audit_list=[];
                                _this.page=0;
                                _this.loadFlag=true
                                _this.requesta()
                               
                            },1500)
                        }else{
                            _this.showa=true;
                            _this.show_tip=res.data.message;
                            return
                        }
                    })
                    .catch(err=>{
                    })
            },

              okfall(){
                this.showa=false;
            },
       
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
        width:4.38rem;
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