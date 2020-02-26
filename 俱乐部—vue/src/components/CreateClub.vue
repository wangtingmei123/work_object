<template>
    <div style="min-height: 100vh;overflow: hidden">
        <Header :title="title" :show="show" :backpage="backpage"></Header>
        <div class="rank_list_box">
            <div class="rank_list">
                <div class="rank_item">
                    <div class="rank_item_tit">俱乐部名称</div>
                    <input type="text" placeholder="请填写俱乐部名称，最多18个字" maxlength="18" v-model="club_name" @blur="blurEvent">
                </div>
                <div class="rank_item">
                    <div class="rank_item_tit">俱乐部类型</div>
                    <div class="rank_item_con" @click="show_lx_data">
                        <span class="club_name"  v-show="choos_lx_data==''">请选择俱乐部类型</span>
                        <span class="club_name_select" v-show="choos_lx_data!=''">{{choos_lx_data}}</span>
                        <span class="club_name_tip"></span>
                    </div>
                    <div class="float_choos float_choos_time" v-show="show_lx">
                        <div class="choos" v-for="(item, i) in lxlist"  @click="choos_lx(item)" :key="i">{{item.name}}</div>
                    </div>
                </div>

                <div class="rank_item">
                    <div class="rank_item_tit">俱乐部logo</div>

                    <div class="rank_item_con">
                        <span class="club_name" v-if="base64_logo==''">请选择并上传俱乐部logo</span>
                        <span class="club_name" v-if="base64_logo!=''">已上传</span>
                        <img class="right_tip" :src="right_tip" alt="" >
                    </div>
                    <input type="file" name="file" ref="files1" accept="image/*" @change="uploadImg1" />
                </div>
                <!-- <div class="rank_item">
                    <div class="rank_item_tit">俱乐部banner</div>
                    <div class="rank_item_con">
                        <span class="club_name" v-if="base64_banner==''">请选择并上传俱乐部banner</span>
                        <span class="club_name" v-if="base64_banner!=''">已上传</span>
                        <img class="right_tip" :src="right_tip" alt="" >
                    </div>
                    <input type="file" name="file" ref="files2" accept="image/*" @change="uploadImgbanner1"/>
                </div> -->

                <div class="rank_item">
                    <div class="rank_item_tit">所在地区</div>
                    <div class="rank_item_con" @click="choos_adress">
                        <span class="club_name" v-show="agentArea==''">请选择俱乐部所在地区</span>
                        <span class="club_name_select" v-show="agentArea!=''">{{agentArea}}</span>
                        <span class="club_name_tip"></span>
                    </div>
                </div>

                <div class="address_box" v-show="popupVisible">
                    <div class="address"  style="height:8rem;position: fixed;width:100%;bottom:0;left:0">
                        <v-distpicker class="picker" type="mobile" @selected='selected' style="height:100%;">
                        </v-distpicker>
                    </div>
                </div>

                <div class="rank_item">
                    <div class="rank_item_tit">加入人数上限</div>
                    <input type="number" placeholder="请设置俱乐部加入人数上限" v-model="club_num" @blur="blurEvent">
                </div>

                <div class="rank_item" style="height:3.2rem;align-items: normal;border:none">
                    <div class="rank_item_tit" style="margin-top:0.34rem;">俱乐部公告</div>
                    <textarea class="rank_item_textarea" name="" id="" cols="30" rows="10" placeholder="请输入俱乐部公告，最多150个字" maxlength="150" v-model="club_tip" @blur="blurEvent"></textarea>
                </div>

            </div>
        </div>

        <div v-if="type_l==0" class="creat_club" @click="to_creat_club">创建俱乐部</div>
        <div v-if="type_l==1" class="creat_club" @click="to_creat_club">保存</div>

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
    import Header from './Header'
    import Eject from './eject'
    import Clipic from 'clipic'
    const clipic = new Clipic()
    import vDistpicker from 'v-distpicker';
    export default {
        components: { Header,vDistpicker,Eject},
        name: '',
        data() {
            return {
                club_id:'',
                type_l:0,
                hide_tip:'',
                hidea:false,
                showa:false,
                show_tip:'',
                msg:"",
                club_name:'',
                club_num:'',
                club_tip:'',
                choos_lx_data:'',
                choos_lx_id:'',
                title: '创建俱乐部',
                show: true,
                backpage: '',
                right_tip:'./static/img/04_right_tip_03.png',
                lxlist:[
                    {'id':0,'name':'普通'},
                    {'id':1,'name':'足球'},

                ],
                show_lx:false,
                base64_logo: '',
                base64_banner: '',
                agentArea:'',
                popupVisible:false,
                avatar_logo:'',
                avatar_banner:'',
                province:'',
                city:'',
                area:'',


            }
        },
        created() {
            let _this=this
            this.club_id=this.$route.query.club_id;
            this.type_l=this.$route.query.type_l;
            if(this.type_l==1){
                _this.$axios.get("/clubs/"+this.club_id,{
                    headers: {
                        'Authorization': localStorage.getItem('token_type') + localStorage.getItem('access_token'),
                    },
                    params:{

                    }
                })
                    .then(res=>{
                        if(res.status==200){
                            _this.club_id=res.data.data.id;
                            _this.club_name=res.data.data.name;
                            _this.choos_lx_data=res.data.data.type_name;
                            _this.choos_lx_id=res.data.data.type_id;
                            _this.base64_logo=res.data.data.logo;
                            _this.base64_banner=res.data.data.back_image;
                            _this.agentArea=$.trim(res.data.data.full_areas);
                            _this.province=res.data.data.prov_id;
                            _this.city=res.data.data.city_id;
                            _this.area=res.data.data.dist_id;
                            _this.club_num=res.data.data.num_max;
                            _this.club_tip=res.data.data.explanation;

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
            let _this=this
            $(".address_box").click(function(){
                _this.popupVisible=false
            })

            $(".distpicker-address-wrapper").click(function(event){
                event.stopPropagation();
            })
        },
        methods: {

            blurEvent () {
                // 将滚动拉到底
                setTimeout(() => {
                    let scrollHeight = document.documentElement.scrollTop || document.body.scrollTop || 0
                    window.scrollTo(0, Math.max(scrollHeight - 1, 0))
                }, 100)
            },

            uploadImg1(event) {
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

                        }
                    })
                }
                event.value = ''
                this.$refs.files1.value='';
            },

            uploadImgbanner1(){
                const files = this.$refs.files2.files;
                const reader = new FileReader();
                reader.readAsDataURL(files[0]);
                reader.onload = img => {
                    clipic.getImage({
                        width: 750,
                        height: 332,
                        src: img.target.result,
                        onDone: base64 => {
                            this.base64_banner = base64

                        }
                    })
                }
                event.value = ''
                this.$refs.files2.value='';
            },
            show_lx_data(){
                this.show_lx=!this.show_lx
            },
            choos_lx(data){
                this.show_lx=false;
                this.choos_lx_data=data.name;
                this.choos_lx_id=data.id;
            },
            choos_adress(){
                this.popupVisible=true
            },
            selected(data){
                console.log(data);
                this.popupVisible = false;
                this.agentArea = data.province.value + data.city.value + data.area.value;
                this.province=data.province.code;
                this.city=data.city.code;
                this.area=data.area.code;
            },

            to_creat_club(){
                let _this=this;
                var data_all={};
                if(this.club_name==''){
                    this.showa=true;
                    this.show_tip='请输入俱乐部名称'
                    return
                }
                if(this.choos_lx_data==''){
                    this.showa=true;
                    this.show_tip='请选择俱乐部类型'
                    return
                }
                if(this.base64_logo==''){
                    this.showa=true;
                    this.show_tip='请上传俱乐部logo'
                    return
                }
                // if(this.base64_banner==''){
                //     this.showa=true;
                //     this.show_tip='请上传俱乐部banner'
                //     return
                // }
                if(this.agentArea==''){
                    this.showa=true;
                    this.show_tip='请选择俱乐部所在地区'
                    return
                }
                if(this.club_num==''){
                    this.showa=true;
                    this.show_tip='请设置俱乐部加入人数上限'
                    return
                }
                if(parseInt(this.club_num)<=0){
                    this.showa=true;
                    this.show_tip='俱乐部加入人数上限必须大于0'
                    return
                }
               if(this.club_tip==''){
                   this.showa=true;
                   this.show_tip='请填写俱乐部公告'
                   return
               }


                if(_this.type_l==0){
                    data_all.name=_this.club_name;
                    data_all.num_max=_this.club_num;
                    data_all.explanation=_this.club_tip;
                    data_all.type_id=_this.choos_lx_id;
                    data_all.logo_tmp=_this.base64_logo;
                    // data_all.back_tmp=_this.base64_banner;
                    data_all.prov_id=_this.province;
                    data_all.city_id=_this.city;
                    data_all.dist_id=_this.area;

                    this.$axios.post("/clubs ",data_all, {headers: {
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
                }else if(_this.type_l==1){
                    data_all.id=_this.club_id;
                    data_all.name=_this.club_name;
                    data_all.num_max=_this.club_num;
                    data_all.explanation=_this.club_tip;
                    data_all.type_id=_this.choos_lx_id;
                    data_all.logo_tmp=_this.base64_logo;
                    // data_all.back_tmp=_this.base64_banner;
                    data_all.prov_id=_this.province;
                    data_all.city_id=_this.city;
                    data_all.dist_id=_this.area;

                    this.$axios.patch("/clubs ",data_all, {headers: {
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
                }






                console.log(data_all)
            },
            okfall(){
                this.showa=false;
            },
        }

    }
</script>


<style>

    .distpicker-address-wrapper .address-container{
        height:7.2rem;overflow: scroll;
        text-align: center;
        color:#545454;
    }

    .distpicker-address-wrapper .address-header{
        height:0.8rem;

    }

    .distpicker-address-wrapper .address-header ul li.active{
        border-bottom: #545454 solid 3px;
        color: #545454;
    }

    .distpicker-address-wrapper .address-header ul li{
        color: #545454;
        font-weight: bold;
    }

</style>

<style scoped>


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



    input[name='file']{
        opacity: 0;
        width:100%;
        height:100%;
        position: absolute;
        top:0;
        right:0;
    }

    .creat_club{
        width:7.1rem;
        height:0.9rem;
        position: fixed;
        left:0;
        right:0;
        margin:auto;
        bottom:0.2rem;
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
        width:2.5rem;
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
        height:auto;
        margin:auto;
        margin-top:0.88rem;
        overflow: hidden;
    }

    .rank_list{
        width:100%;
        height:auto;
        background: #fff;
        margin-top:0.1rem;
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

    .rank_item>.rank_item_tit{
        width:auto;
        font-size: 0.26rem;
        color: #4d4d4d;
    }

    .rank_item>.rank_item_textarea{
        width: 5.15rem;
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
        width:5.1rem;
        font-size: 0.26rem;
        text-align: right;
        border:none;
        color: #4d4d4d;
    }
    .rank_item>input:focus{
        border:none;
        outline: none;
    }
    .rank_item>input::placeholder{
        color: #a6a6a6;
    }


</style>
