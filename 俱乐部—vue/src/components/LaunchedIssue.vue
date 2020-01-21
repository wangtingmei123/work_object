<template>
    <div style="background:#f7f7f7;min-height: 100vh;overflow: hidden">
        <Header :title="title" :show="show" :backpage="backpage"></Header>
        <div class="rank_list_box">
            <div class="rank_list">

                <div class="rank_item">
                    <div class="rank_item_tit">开始时间</div>
                    <input style="background: none;width:3.5rem" type="datetime-local" placeholder="请选择本次活动的开始时间" v-model="statre_time" @blur="blurEvent">
                    <!--<div class="rank_item_con">-->
                    <!--<span class="club_name">请选择本次活动的开始时间</span>-->
                    <!--<img class="right_tip" :src="right_tip" alt="" >-->
                    <!--</div>-->
                </div>
                <div class="rank_item">
                    <div class="rank_item_tit">结束时间</div>
                    <input style="background: none;width:3.5rem" type="datetime-local" placeholder="请选择本次活动的开始时间" v-model="end_time" @blur="blurEvent">
                    <!--<div class="rank_item_con">-->
                    <!--<span class="club_name">请选择本次活动的结束时间</span>-->
                    <!--<img class="right_tip" :src="right_tip" alt="" >-->
                    <!--</div>-->
                </div>
                <div class="rank_item">
                    <div class="rank_item_tit">活动地点</div>
                    <div class="rank_item_con" @click="searcher">
                        <span class="club_name" v-show="active_address==''">请设置本次活动的场地</span>
                        <span class="club_name" v-show="active_address!=''" style="color: #4d4d4d;">{{active_address}}</span>
                        <img class="right_tip" :src="right_tip" alt="" >
                    </div>
                </div>
                <div class="rank_item">
                    <div class="rank_item_tit">设置打卡范围</div>
                    <input style="width:5.1rem;" type="number" placeholder="请设置打卡范围" v-model="clock_scope" @blur="blurEvent">
                </div>
                <div class="rank_item" style="height:3.2rem;align-items: normal;border:none;">
                    <div class="rank_item_tit" style="margin-top:0.34rem;">活动详情</div>
                    <textarea class="rank_item_textarea" name="" id="" cols="30" rows="10" placeholder="请输入活动详情，最多150个字" maxlength="150" v-model="active_details" @blur="blurEvent"></textarea>
                </div>

            </div>
        </div>
        <div class="creat_club_box">
            <div class="creat_club" @click="to_creat_club">确定</div>
        </div>

        <Eject  type='alert' @took='okfall' :showstate='showa'>
            <span slot='tlt'>提示</span>
            <div slot='text'>{{show_tip}}</div>
        </Eject>

        <div class="address_box_search" v-show="show_search">
            <header>
                <div @click="close" class="goback"><img :src="back" alt=""> </div>
                <div class="title">活动地点</div>
            </header>
            <label><input placeholder="请输入地点关键字" v-model="keyword"></label>
            <!--<label>地区：<input placeholder="请输入省份" v-model="location"></label>-->
            <baidu-map >
                <bm-view class="map" style="width: 100%;height:5rem;" :zoom="15"></bm-view>
                <bm-local-search style="height:0;overflow: hidden" :keyword="keyword" :auto-viewport="true" :location="location" :page-capacity="30" @searchcomplete="searchcomplete"></bm-local-search>
            </baidu-map>

            <div class="data_br">
                <div class="data_br_li" v-for="(item,index) in data_br" @click="to_address(item.title,item.marker.point)" :key="index">
                    <div class="title">{{item.title}}  </div>
                    <div class="addr-box">
                        <div class="address_icona">
                            <img  class='address_icon'  :src="dingwei" alt="">
                        </div>
                        <div class="addresscon"> {{item.address}}</div>
                    </div>
                </div>
            </div>
        </div>


        <div class="hide_tip_box" v-show="hidea">
            <div class="hide_tip">{{hide_tip}}</div>
        </div>
    </div>
</template>


<script>
    import {BaiduMap ,BmView ,BmLocalSearch } from 'vue-baidu-map'
    import Header from './Header'
    import Eject from './eject'
    import Clipic from 'clipic'
    const clipic = new Clipic()
    export default {
        components: {
            Header,
            Eject,
            BaiduMap,
            BmView,
            BmLocalSearch
        },
        name: '',
        data() {
            return {
                hide_tip:'',
                hidea:false,
                back:'./static/img/03index_03.png',
                dingwei:'./static/img/dingwei1.png',
                showa:false,
                show_tip:'',
                msg:"",
                active_name:'',
                statre_time:'',
                end_time:'2019-12-17 20:20:00',
                registration:'',
                margin:'',
                refund_rules:'',
                active_num:'',
                active_address:'',
                clock_scope:'',
                active_details:'',
                club_tip:'',
                choos_lx_data:'鑫动国际滑雪俱乐部',
                title: '长期活动',
                show: true,
                backpage: '',
                right_tip:'./static/img/04_right_tip_03.png',
                lxlist:[
                    {'name':'社交'},
                    {'name':'社交'},
                    {'name':'社交'},
                    {'name':'社交'},
                    {'name':'社交'},
                    {'name':'社交'}
                ],
                show_lx:false,
                base64_logo: '',
                location: '',
                keyword: '',
                data_br:[],
                show_search:false,
                active_point:{},
                active_id:'',
                issue:'',
                is_edit:'',
                issue_id:''

            }
        },
        created() {
            this.active_name=localStorage.getItem('active_name');
            this.active_id=localStorage.getItem('active_id');
            this.issue=localStorage.getItem('issue');
            this.issue_id=this.$route.query.issue_id;
            console.log( this.active_id)
            this.is_edit=this.$route.query.is_edit;
            if(this.is_edit==1){

                let _this=this;
                _this.$axios.get("/activity-issues/"+this.issue_id,{
                    headers: {
                        'Authorization': localStorage.getItem('token_type') + localStorage.getItem('access_token'),
                    },
                    params:{

                    }
                }).then(res=>{

                    if(res.status==200){

                        _this.active_name=res.data.name;
                        _this.statre_time=res.data.start_date.substring(0,16).replace(' ','T');
                        _this.end_time=res.data.end_date.substring(0,16).replace(' ','T');
                        _this.active_address=res.data.address;
                        _this.clock_scope=res.data.sign_range;
                        _this.active_point.lat=res.data.latitude;
                        _this.active_point.lng=res.data.longitude;
                        _this.active_details=res.data.explanation;

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
        mounted() {

        },
        methods: {
            searcher(){
                this.show_search=true
            },
            close(){
                this.show_search=false;
                this.keyword='';
            },

            to_address(title,point){
                console.log(point)
                this.active_address=title;
                this.active_point=point;
                this.show_search=false;
                this.keyword='';


            },
            searchcomplete(e){
                console.log(e)

                if(e!=undefined){
                    if(e.Br.length>=0 && e.Br!=undefined){
                        this.data_br=e.Br
                    }
                }
                if(this.keyword==''){
                    this.data_br=[]
                }


            },
            blurEvent () {
                // 将滚动拉到底
                setTimeout(() => {
                    let scrollHeight = document.documentElement.scrollTop || document.body.scrollTop || 0
                    window.scrollTo(0, Math.max(scrollHeight - 1, 0))
                }, 100)
            },

            uploadImg(event) {
                const files = this.$refs.files1.files;
                const reader = new FileReader();
                reader.readAsDataURL(files[0]);
                reader.onload = img => {
                    console.log('***')
                    clipic.getImage({
                        width: 400,
                        height: 300,
                        src: img.target.result,
                        onDone: base64 => {
                            console.log("***")
                            this.base64_logo = base64;
                            console.log(base64)
                        }
                    })
                }
                event.value = ''
                this.$refs.files1.value='';
            },

            show_lx_data(){
                this.show_lx=!this.show_lx
            },
            choos_lx(data){
                this.show_lx=false;
                this.choos_lx_data=data
            },


            to_creat_club(){
                let _this=this
                var data_all={};

                if(this.statre_time==''){
                    this.showa=true;
                    this.show_tip='请选择活动开始时间'
                    return
                }

                if(this.end_time==''){
                    this.showa=true;
                    this.show_tip='请选择活动结束时间'
                    return
                }

                var timestamp=new Date().getTime();
                var statre_time_c=new Date(_this.statre_time).getTime();
                if(statre_time_c<=timestamp){
                    this.showa=true;
                    this.show_tip='开始时间不得小于当前时间'
                    return
                }

                if(this.statre_time>=this.end_time){
                    this.showa=true;
                    this.show_tip='开始时间必须早于结束时间'
                    return
                }

                if(this.address==''){
                    this.showa=true;
                    this.show_tip='请选择活动地点'
                    return
                }


                if(this.clock_scope==''){
                    this.clock_scope=500
                }

                //日期转时间戳





                data_all.name=this.active_name;
                data_all.act_id=this.active_id;
                data_all.cur_issue=this.issue_id;
                data_all.start_date=this.statre_time.replace('T',' ')+':00';
                data_all.end_date=this.end_time.replace('T',' ')+':00';
                data_all.sign_range=this.clock_scope;
                data_all.explanation=this.active_details;
                data_all.address=this.active_address;
                data_all.longitude=this.active_point.lng;
                data_all.latitude=this.active_point.lat;


                if(_this.is_edit==1){
                    data_all.id=this.issue_id;
                    _this.$axios.patch("activity-issues",data_all, {headers: {
                        'Authorization': localStorage.getItem('token_type') + localStorage.getItem('access_token'),
                    }})
                        .then(res=>{
                            if(res.status==200){
                                _this.hidea=true;
                                _this.hide_tip='修改成功';
                                setTimeout(function(){
                                    _this.hidea=false;
                                    _this.$router.go(-1);

                                },1500)
                            }else{
                                _this.showa=true;
                                _this.show_tip=res.data.message;
                                return
                            }
                        })
                        .catch(err=>{
                        })
                }else{

                    _this.$axios.post("activity-issues",data_all, {headers: {
                        'Authorization': localStorage.getItem('token_type') + localStorage.getItem('access_token'),
                    }})
                        .then(res=>{
                            if(res.status==200){
                                _this.hidea=true;
                                _this.hide_tip='创建成功';
                                setTimeout(function(){
                                    _this.hidea=false;
                                    _this.$router.go(-1);

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

    .address_box_search header{
        width:100%;
        height:0.88rem;
        position: fixed;
        top:0;
        left:0;
        background: #fff;
        z-index: 9999;



    }
    .address_box_search header>.title{
        width:100%;
        height:100%;
        font-size:0.32rem;
        line-height:0.88rem;
        text-align: center;
        color: #000;
        letter-spacing:0.01rem;
        font-weight: bold;
    }
    .address_box_search header>.goback{
        position: absolute;
        width:0.24rem;
        height:0.44rem;
        top:0;
        bottom:0;
        margin:auto;
        left:0.3rem;
    }
    .address_box_search header>.goback>img{
        display: block;
        width:100%;
        height:100%;
    }
    .addr-box{
        display: block;
        width:100%;
        height:auto;
        /*margin-top:0.30rem;*/
        overflow: hidden;
        margin-top:0.14rem;


    }


    .address_icona{
        display: block;
        width: 0.22rem;
        height: 0.28rem;
        float: left;
        /* vertical-align: middle; */

    }

    .address_icon {
        display: block;
        width: 100%;
        height: 100%;
    }

    .addresscon{
        width:6.30rem;
        font-size: 0.28rem;
        /*font-weight: bold;*/
        height: auto;
        margin-left:0.10rem;
        float: left;
        line-height:0.36rem;

    }

    .title{
        width:100%;
        height:auto;

        font-size: 0.26rem;
        float: none;
        font-weight: bold;
    }


    .data_br{
        width:100%;
        height:calc(100vh - 5.9rem);
        padding:0.2rem;
        box-sizing: border-box;
        overflow: scroll;
        list-style: none;
        /*margin-top:0.2rem;*/

    }
    .data_br .data_br_li{
        padding:0.20rem 0.2rem;
        width:7.1rem;
        margin:auto;
        border-bottom:1px solid #f5f5f5;
        font-size: 0.28rem;
        background: #fff;
        box-sizing: border-box;

    }
    .data_br .data_br_li span{
        display: block;
        width: 100%;
        height:auto;
        text-align: center;
        line-height:0.4rem;
    }

    .address_box_search{
        width:100%;
        height:100vh;
        position: fixed;
        top:0.88rem;
        background: #f7f7f7;
        z-index: 999999;

    }

    .address_box_search label{
        width:6.82rem;
        height:0.8rem;
        position: fixed;
        top:1.2rem;
        left:0;right:0;
        margin:auto;
        background: #fff;
        border:none;
        z-index: 99999;
        border-radius: 0.1rem;
    }
    .address_box_search label input{
        width:100%;
        height:100%;
        font-size: 0.28rem;
        color: #1a1a1a;
        padding:0 0.2rem;
        box-sizing: border-box;
        border:none;
        border-radius: 0.1rem;
    }
    .address_box_search label input::placeholder{
        color: #a6a6a6;

    }
    .address_box_search label input:focus{
        outline: none;
    }

    .address_box_search .map{
        width:100%;
        height:5.53rem;
    }


    .address_box{
        width:100%;
        height:100vh;
        background: rgba(0,0,0,0.5);
        position: fixed;
        top:0;
        left:0;
        z-index: 99999;
    }

    .address-container{
        height:4.2rem;
        overflow: scroll !important;
    }

    .distpicker-address-wrapper .address-header{
        height:0.8rem;
    }



    .rank_item input[name='file']{
        opacity: 0;
        width:100%;
        height:100%;
        position: absolute;
        top:0;
        right:0;
    }

    .creat_club_box{
        width:100%;
        height:1.3rem;
        background: #f7f7f7;
        position: fixed;
        left:0;
        right:0;
        bottom:0;
        margin:auto;
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
        /*font-weight: bold;*/
        border-radius: 0.1rem;

    }
    .float_choos{
        position: absolute;
        right:0.1rem;
        top:1rem;
        width:3.7rem;
        height:auto;
        padding:0.2rem 0;
        border-radius: 0.1rem;
        box-shadow: 0 0 8px #ccc;
        z-index: 9;
        background: #fff;
        display: block;
    }

    .float_choos>.choos{
        width:1.2rem;
        height:0.7rem;
        font-size: 0.26rem;
        text-align: center;
        line-height: 0.7rem;
        float: left;

    }

    .rank_item_con{
        width:auto;
        height:0.36rem;
        text-align: right;
        display: table-cell;
        vertical-align: middle;
        line-height:0.36rem;
        color: #4d4d4d;

    }



    .club_name{
        color: #a6a6a6;
    }

    .rank_item_con .club_name_tip{
        display: inline-block;
        width: 0;
        height: 0;
        border-width: 0.08rem;
        border-style: solid;
        border-color: #c0c0c0 transparent  transparent transparent;
        /* float: right; */
        margin-top:0.14rem;
        margin-left:0.1rem;
        border-radius: 0.02rem;
    }

    .right_tip{
        display: inline-block;
        width:0.11rem;
        height:0.19rem;
        vertical-align: middle;
        margin-left:0.1rem;


    }
    .rank_list_box{
        width:7.1rem;
        margin:auto;
        height:calc(100vh - 4.35rem);
        margin-top:0.88rem;
        overflow: scroll;
    }

    .rank_list{
        width:100%;
        height:auto;
        background: #fff;
        margin-top:0.1rem;
        padding-bottom: 0.2rem;
    }

    .rank_item{
        width:6.8rem;
        height:1rem;
        margin:auto;
        /*box-sizing: border-box;*/
        border-bottom:1px solid #e6e6e6;
        display: flex;
        justify-content: space-between;
        align-items: center;
        position: relative;

    }

    .rank_item:last-child{
        border:none
    }

    .rank_item>.rank_item_tit{
        width:auto;
        font-size: 0.26rem;
        color: #4d4d4d;
    }

    .rank_item>.rank_item_textarea{
        width: 5.45rem;
        height:2.44rem;
        border:none;
        background: #f7f7f7f7;
        margin-top:0.34rem;
        padding:0.2rem;
        box-sizing: border-box;
        border-radius: 0.1rem;
        color: #4d4d4d;
        resize: none;

    }

    .rank_item>.rank_item_textarea::placeholder{
        color: #a6a6a6;

    }
    .rank_item>.rank_item_textarea:focus{
        outline: none;
    }

    .rank_item>input{
        width:5.6rem;
        font-size: 0.26rem;
        text-align: right;
        border:none;
        color: #4d4d4d;
        height:0.6rem;
    }
    .rank_item>input:focus{
        border:none;
        outline: none;
    }
    .rank_item>input::placeholder{
        color: #a6a6a6;
    }


</style>
