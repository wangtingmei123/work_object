<template>
    <div style="background:#f7f7f7;min-height: 100vh;overflow: hidden">
        <Header :title="title" :show="show" :backpage="backpage"></Header>
        <div class="rank_list_box">
            <div class="rank_list">

                <div class="rank_item">
                    <div class="rank_item_tit">活动名称</div>
                    <input type="text" placeholder="请填写俱乐部名称,最多18个字" maxlength="18" v-model="active_name" @blur="blurEvent">
                </div>
                <div class="rank_item">
                    <div class="rank_item_tit">俱乐部</div>
                    <div class="rank_item_con" @click="show_lx_data">
                        <!--<span class="club_name"  v-show="choos_lx_data==''">请选择俱乐部</span>-->
                        <span class="club_name_select"  style="color:#212121" >{{choos_lx_data}}</span>
                        <!--<span class="club_name_tip"></span>-->
                    </div>
                    <!--<div class="float_choos float_choos_time" v-show="show_lx">-->
                        <!--<div class="choos" v-for="(item, i) in lxlist"  @click="choos_lx(item.name)">{{item.name}}</div>-->
                    <!--</div>-->
                </div>

                <div class="rank_item">
                    <div class="rank_item_tit">活动logo</div>

                    <div class="rank_item_con">
                        <span class="club_name" v-show="base64_logo==''">请选择并上传活动logo</span>
                        <span class="club_name" style="color:#212121" v-show="base64_logo!=''">已上传</span>
                        <img class="right_tip" :src="right_tip" alt="" >
                    </div>
                    <input type="file" name="file" ref="files1" accept="image/*" @change="uploadImg3" />
                </div>
                <div class="rank_item  time_sty">
                    <div class="rank_item_tit">开始时间</div>
                    <div class="rank_item_con statre_times" :class="{'color' :color1}" >{{statre_time}}</div>
                    <input class="statre_times" style="background: none;width:4rem" type="datetime-local" placeholder="请选择活动的开始时间"   v-model="statre_times"  value="statre_time"  @blur="blurEvent">
                </div>
                <div class="rank_item  time_sty" >
                    <div class="rank_item_tit">结束时间</div>
                    <div class="rank_item_con end_times"  :class="{'color' :color2}" >{{end_time}}</div>
                    <input class="end_times" style="background: none;width:4rem; " type="datetime-local" placeholder="选择活动的开始时间" v-model="end_times" value="end_time" @blur="blurEvent">
                </div>

                <div class="rank_item  time_sty">
                    <div class="rank_item_tit">报名截止时间</div>
                    <div class="rank_item_con jie_times"   :class="{'color' :color3}" >{{jiezhi_time}}</div>
                    <input class="jie_times" style="background: none;width:4rem"   type="datetime-local" placeholder="选择活动的截止时间" v-model="jie_times" @blur="blurEvent">
                </div>

                <div class="rank_item">
                    <div class="rank_item_tit">报名费用</div>
                    <input type="number" placeholder="填写活动报名费用,最多9999元,不退费" v-model="registration" @blur="blurEvent">
                </div>
                <div class="rank_item">
                    <div class="rank_item_tit">保证金</div>
                    <input type="number" placeholder="填写活动保证金,最多9999元,不退费" v-model="margin" @blur="blurEvent">
                </div>
                <div class="rank_item">
                    <div class="rank_item_tit">退费规则</div>
                    <input type="number" placeholder="填写未签到一次时扣除多少保证金费用" v-model="refund_rules" @blur="blurEvent">
                </div>
                <div class="rank_item">
                    <div class="rank_item_tit">活动人数</div>
                    <input type="number" placeholder="设置活动的最多参与人数,最多9999人" v-model="active_num" @blur="blurEvent">
                </div>
                <div class="rank_item" style="border:none">
                    <div class="rank_item_tit">活动地点</div>
                    <div class="rank_item_con" @click="searcher">
                        <span class="club_name" v-show="active_address==''">设置本次活动的场地</span>
                        <span class="club_name" v-show="active_address!=''" style="color: #212121;">{{active_address}}</span>
                        <img class="right_tip" :src="right_tip" alt="" >
                    </div>
                </div>


                <baidu-map style="width:100%;height:3rem" class="map" :center="center" :zoom="15">
                    <bm-marker :position="center" :dragging="true" animation="BMAP_ANIMATION_BOUNCE">
                    <bm-label content="" :labelStyle="{color: 'red', fontSize : '24px'}" :offset="{width: -35, height: 30}"/>
                    </bm-marker>
                </baidu-map>

                 <!-- <baidu-map style="width:100%;height:3rem" class="map" :center="center" :zoom="15"></baidu-map> -->



                <div class="rank_item" style="border:none">
                    <div class="rank_item_tit">设置打卡范围</div>
                    <input style="width:4.5rem;" type="number" placeholder="设置打卡范围,建议不低于400米" v-model="clock_scope" @blur="blurEvent">
                </div>

                <div class="rank_item" style="height:3.2rem;align-items: normal;border:none;">
                    <div class="rank_item_tit" style="margin-top:0.34rem;">活动详情</div>
                    <textarea class="rank_item_textarea" name="" id="" cols="30" rows="10" placeholder="输入活动详情，最多150个字" maxlength="150" v-model="active_details" @blur="blurEvent"></textarea>
                </div>



            </div>
        </div>
        <div class="creat_club_box">
             <div class="creat_club" @click="to_creat_club">确定</div>
        </div>



        <div class="address_box_search" v-show="show_search">
            <header>
                <div @click="close" class="goback"><img :src="back" alt=""> </div>
                <div class="title">活动地点</div>
            </header>
            <label><input placeholder="输入地点关键字" v-model="keyword"></label>
            <!--<label>地区：<input placeholder="请输入省份" v-model="location"></label>-->


            
                <baidu-map class="map" :center="center" :zoom="15"  style="width:100%;height:4rem">
                                    <bm-marker :position="center" :dragging="true" animation="BMAP_ANIMATION_BOUNCE">
                                    <bm-label content="" :labelStyle="{color: 'red', fontSize : '24px'}" :offset="{width: -35, height: 30}"/>
                                    </bm-marker>
                                    <bm-local-search style="height:0;overflow: hidden" :keyword="keyword" :auto-viewport="true" :location="location" :page-capacity="30" @searchcomplete="searchcomplete"></bm-local-search>

            </baidu-map>

       

            <div class="data_br">
                <div class="data_br_li" v-for="(item,index) in data_br" @click="to_address(item.title,item.marker.point)" :key="index">
                    <div class="title">{{item.title}}  </div>
                    <div class="addr-box">
                        <div class="address_icona">
                            <img  class='address_icon'  :src="dingwei" alt="">
                        </div>
                        <div class="addresscon" > {{item.address}}</div>
                    </div>
                </div>
            </div>
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
    var x_PI = 3.14159265358979324 * 3000.0 / 180.0
    var PI = 3.1415926535897932384626
    var a = 6378245.0
    var ee = 0.00669342162296594323
    import {BaiduMap ,BmView ,BmLocalSearch,BmMarker,BmLabel } from 'vue-baidu-map'
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
            BmLocalSearch,
            BmMarker,
            BmLabel
        },
        name: '',
        data() {
            return {
                hide_tip:'',
                hidea:false,
                back:'./static/img/03back_03.png',
                dingwei:'./static/img/dingwei1.png',
                showa:false,
                show_tip:'',
                msg:"",
                active_name:'',
                statre_time:'',
                end_time:"",
                statre_times:'',
                end_times:'',
                jie_times:'',
                jiezhi_time:'',
                registration:'',
                margin:'',
                refund_rules:'',
                active_num:'',
                active_address:'',
                clock_scope:'',
                active_details:'',
                club_tip:'',
                choos_lx_data:'鑫动国际滑雪俱乐部',
                title: '短期活动',
                show: true,
                backpage: '',
                right_tip:'./static/img/04_right_tip_03.png',
                lxlist:[

                ],
                show_lx:false,
                base64_logo: '',
                location: {
                    lng: 116.404,
                    lat: 39.915
                },
                keyword: '',
                data_br:[],
                show_search:false,
                active_point:{},
                active_id:'',
                center:{lng: 116.404, lat: 39.915},
                showq:true,
                color1:false,
                  color2:false,
                    color3:false

            }
        },


        watch: {
            statre_times(curVal, oldVal) {
                console.log(curVal)
                // 实现input连续输入，只发一次请求
               this.statre_time=curVal.substring(0,16).replace('T',' ');
                this.color1=true
     
            },

             end_times(curVal, oldVal) {
                console.log(curVal)
                // 实现input连续输入，只发一次请求
               this.end_time=curVal.substring(0,16).replace('T',' ');
                this.color2=true
            },

            jie_times(curVal, oldVal) {
                console.log(curVal)
                // 实现input连续输入，只发一次请求
               this.jiezhi_time=curVal.substring(0,16).replace('T',' ');
                this.color3=true
            }
        },
        created() {
            this.choos_lx_data=localStorage.getItem('club_name')
            let _this=this;
            this.active_id=this.$route.query.id;
          
         let timestamp = new Date().getTime();
              let timestamp1 = timestamp + 3 * 60 * 60 * 1000;
              let myDate1 = new Date(timestamp1);
            let month1=myDate1.getMonth()+1;
            if(month1>0&&month1<10){
                month1='0'+month1
            }
             let day1=myDate1.getDate();
            if(day1>0&&day1<10){
                day1='0'+day1
            }
            let hours1=myDate1.getHours();
            if(hours1>0&&hours1<10){
                hours1='0'+hours1
            }
            let minutes1=myDate1.getMinutes();
            if(minutes1>0&&minutes1<10){
                minutes1='0'+minutes1
            }


             let timestamp2 = timestamp + 15 * 60 * 60 * 1000;
              let myDate2 = new Date(timestamp2);
            let month2=myDate2.getMonth()+1;
            if(month2>0&&month2<10){
                month2='0'+month2
            }

          let day2=myDate2.getDate();
            if(day2>0&&day2<10){
                day2='0'+day2
            }
            let hours2=myDate2.getHours();
            if(hours2>0&&hours2<10){
                hours2='0'+hours2
            }
            let minutes2=myDate2.getMinutes();
            if(minutes2>0&&minutes2<10){
                minutes2='0'+minutes2
            }

                 let timestamp3 = timestamp + 1 * 60 * 60 * 1000;
              let myDate3 = new Date(timestamp3);
            let month3=myDate3.getMonth()+1;
            if(month3>0&&month3<10){
                month3='0'+month3
            }

            
          let day3=myDate3.getDate();
            if(day3>0&&day3<10){
                day3='0'+day3
            }
            let hours3=myDate3.getHours();
            if(hours3>0&&hours3<10){
                hours3='0'+hours3
            }
            let minutes3=myDate3.getMinutes();
            if(minutes3>0&&minutes3<10){
                minutes3='0'+minutes3
            }

         
            this.statre_time=myDate1.getFullYear()+'-'+month1+'-'+day1+' '+hours1+':'+minutes1;
            this.end_time=myDate2.getFullYear()+'-'+month2+'-'+day2+' '+hours2+':'+minutes2;
            this.jiezhi_time=myDate3.getFullYear()+'-'+month3+'-'+day3+' '+hours3+':'+minutes3;

            if(this.active_id!=0){
 
                    // $(".statre_times").css("color","#212121")
                    // $(".end_times").css("color","#212121")
                    // $(".jie_times").css("color","#212121")

                _this.$axios.get("/activities/"+ _this.active_id,{
                    headers: {
                        'Authorization': localStorage.getItem('token_type') + localStorage.getItem('access_token'),
                    },
                    params:{
                    }
                }).then(res=>{
                    if(res.status==200){
                        _this.active_name=res.data.data.name;
                        _this.statre_time=res.data.data.start_date.substring(0,16).replace('T',' ');
                        _this.end_time=res.data.data.end_date.substring(0,16).replace('T',' ');
                        _this.jiezhi_time=res.data.data.apply_stoped.substring(0,16).replace('T',' ');
                        _this.registration=res.data.data.entry_fees/100;
                        _this.margin=res.data.data.cash_pledges/100;
                        _this.refund_rules=res.data.data.not_sign/100;
                        _this.active_address=res.data.data.address;
                        _this.active_num=res.data.data.num_max;
                        _this.clock_scope=res.data.data.sign_range;
                        _this.active_point.lat=res.data.data.latitude;
                        _this.active_point.lng=res.data.data.longitude;
                        _this.active_details=res.data.data.explanation;
                        _this.base64_logo=res.data.data.logo_url;
                        console.log(res.data.data.start_date.substring(0,16))
                        _this.color1=true
                        _this.color2=true
                            _this.color3=true
                    }else{
                        _this.showa=true;
                        _this.show_tip=res.data.message;
                        return
                    }
                })
                    .catch(err=>{
                    })
            }
            this.get_position()
        },
        mounted() {

        },
        methods: {

            changeInput1(e){
                console.log(e)
                console.log("++==")
                

            },

             infoWindowClose () {
                this.showq = false
                },
                infoWindowOpen () {
                this.showq = true
                },


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
                this.center=point


            },
            searchcomplete(e){
                console.log(e)

                if(e!=undefined){
                    if(e.Ir.length>=0 && e.Ir!=undefined){
                        this.data_br=e.Ir
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

            uploadImg3(event) {
                const files = this.$refs.files1.files;
                const reader = new FileReader();
                reader.readAsDataURL(files[0]);
                reader.onload = img => {
                    console.log('***')
                    clipic.getImage({
                        width: 440,
                        height: 400,
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
                //日期转时间戳


                var data_all={};
                if(this.active_name==''){
                    this.showa=true;
                    this.show_tip='请输入活动名称'
                    return
                }

                 if(this.active_name.length<5){
                    this.showa=true;
                    this.show_tip='活动名称不得少于5个字符'
                    return
                }

                
                 if(this.active_name.length>18){
                    this.showa=true;
                    this.show_tip='活动名称不超过18个字符'
                    return
                }

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

                if(this.jiezhi_time==''){
                    this.showa=true;
                    this.show_tip='请选择活动截止时间'
                    return
                }

                var myDate = new Date();
                var month=myDate.getMonth()+1;
                if(month>0&&month<10){
                    month='0'+month
                }
                var timestamp=myDate.getFullYear()+'-'+month+'-'+myDate.getDate()+'T'+myDate.getHours()+':'+myDate.getMinutes();
                var statre_time_c=this.statre_time.substring(0,16).replace(' ','T');
                var jiezhi_time_c=this.jiezhi_time.substring(0,16).replace(' ','T');
                var end_time_c=this.end_time.substring(0,16).replace(' ','T');
                console.log(timestamp)
                console.log(statre_time_c)



  if(_this.active_id==''){
                if(statre_time_c<=timestamp){
                    this.showa=true;
                    this.show_tip='开始时间不得小于当前时间'
                    return
                }
                if(jiezhi_time_c<=timestamp){
                    this.showa=true;
                    this.show_tip='截止时间不得小于当前时间'
                    return
                }
     }
                if(statre_time_c>=end_time_c){
                    this.showa=true;
                    this.show_tip='开始时间必须早于结束时间'
                    return
                }

                if(jiezhi_time_c>=statre_time_c){
                    this.showa=true;
                    this.show_tip='截止时间必须早于开始时间'
                    return
                }



                if(this.base64_logo==''){
                    this.showa=true;
                    this.show_tip='请上传活动logo'
                    return
                }

                if(this.address==''){
                    this.showa=true;
                    this.show_tip='请选择活动地点'
                    return
                }
                if(this.active_num==''){
                    this.showa=true;
                    this.show_tip='请填写活动人数'
                    return
                }
                if(parseInt(this.active_num)<=0){
                    this.showa=true;
                    this.show_tip='活动人数必须大于0'
                    return
                }




                if(this.registration==''){
                    this.registration=0
                }
                if(this.margin==''){
                    this.margin=0
                }

                if(this.refund_rules==''){
                    this.refund_rules=0
                }
                if(this.clock_scope==''){
                    this.clock_scope=500
                }



                data_all.name=this.active_name;
                data_all.club_id=parseInt(localStorage.getItem('club_id'));
                data_all.issue_nums=0;
                data_all.num_max=this.active_num;
                data_all.choos_lx_data=this.choos_lx_data;
                data_all.start_date=this.statre_time.substring(0,16).replace('T',' ');
                data_all.end_date=this.end_time.substring(0,16).replace('T',' ');
                data_all.apply_stoped=this.jiezhi_time.substring(0,16).replace('T',' ');
                data_all.entry_fees=parseFloat(this.registration)*100;
                data_all.cash_pledges=parseFloat(this.margin)*100;
                data_all.not_sign=parseFloat(this.refund_rules)*100;
                data_all.logo_tmp=this.base64_logo;
                data_all.sign_range=this.clock_scope;
                data_all.explanation=this.active_details;
                data_all.address=this.active_address;
                data_all.longitude=this.active_point.lng;
                data_all.latitude=this.active_point.lat;
                console.log(data_all)
                console.log(this.active_point.lat,this.active_point.lng)

                if(_this.active_id!=''&&_this.active_id!=0){
                    data_all.id=this.active_id;
                    _this.$axios.patch("/activities ",data_all, {headers: {
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
    
                    _this.$axios.post("/activities",data_all, {headers: {
                        'Authorization': localStorage.getItem('token_type') + localStorage.getItem('access_token'),
                    }})
                        .then(res=>{
                            if(res.status==201){
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

             gcj02_to_bd09(lng, lat) {

                var lat = +lat
                var lng = +lng
                var z = Math.sqrt(lng * lng + lat * lat) + 0.00002 * Math.sin(lat * x_PI)
                var theta = Math.atan2(lat, lng) + 0.000003 * Math.cos(lng * x_PI)
                var bd_lng = z * Math.cos(theta) + 0.0065
                var bd_lat = z * Math.sin(theta) + 0.006
                return [bd_lng, bd_lat]
            },


             get_position(){
                 let  _this=this
                   if (navigator.geolocation) {
                        navigator.geolocation.getCurrentPosition(
                            //locationSuccess 获取成功的话
                            function (position) {
                                  let getitude=_this.gcj02_to_bd09(position.coords.longitude,position.coords.latitude)      
                                _this.center={lng: getitude[0], lat: getitude[1]}
                            },
                            //locationError  获取失败的话
                            function (error) {
                                var errorType = ['您拒绝共享位置信息', '获取不到位置信息', '获取位置信息超时'];
                                // _this.card_message = errorType[error.code - 1]
//                                alert(errorType[error.code - 1]);

                            }
                        );
                    }else{
                        // _this.card_message ='获取不到位置信息'
                    }
             },


        }

    }
</script>



<style scoped>

 .time_sty{
     position: relative
 }

    .time_sty>input{
        opacity: 0;
        position: absolute;
        top:0;
        bottom:0;
        margin:auto;
        right:0
    }

      .time_sty> .rank_item_con{
         width:4rem;
         height:0.6rem;
         color: #c0c0c0;
         line-height:0.6rem;
         text-align: right;
         font-size: 0.3rem;
      }

        .time_sty>.color{
          color:#212121;
      }

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
        width:0.18rem;
        height:0.3rem;
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
        height:calc(100vh - 4.9rem);
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
       width:7.5rem;
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
        color: #212121;
        font-size: 0.3rem

    }

    .rank_item_con>span{
        font-size: 0.3rem;
        color: #c0c0c0;
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
        height:calc(100vh - 2.35rem);
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
        font-size: 0.3rem;
        color: #212121;
        font-weight: bold;
    }

    .rank_item>.rank_item_textarea{
        width: 5.45rem;
        height:2.44rem;
        border:none;
        background: #f7f7f7f7;
        margin-top:0.24rem;
        padding:0.2rem;
        box-sizing: border-box;
        border-radius: 0.1rem;
        color: #212121;
        resize: none;
        font-size: 0.3rem;

    }

    .rank_item>.rank_item_textarea::placeholder{
        color: #c0c0c0;

    }
    .rank_item>.rank_item_textarea:focus{
        outline: none;
    }

    .rank_item>input{
        width:5.4rem;
        font-size: 0.3rem;
        text-align: right;
        border:none;
        color: #212121;
        height:0.6rem;
    }
    .rank_item>input:focus{
        border:none;
        outline: none;
    }
    .rank_item>input::placeholder{
        color: #c0c0c0;
    }


</style>
