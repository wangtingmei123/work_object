<template>
    <div style="background: #f7f7f7;min-height: 100vh;overflow: hidden;">
        <Header :title="title" :show="show" :backpage="backpage"></Header>
        <div class="editation_box">
            <div class="editation_bt">
                <div class="editation_bt_img">
                    <img :src="base64_logo" alt="">
                    <div class="editation_bt_img_text">上传照片</div>
                    <input type="file" name="file" ref="files1" accept="image/*" @change="uploaduserImg" />
                </div>
                <div class="editation_bt_xinxi">
                    <div class="editation_bt_xinxi_name">姓名： <span>{{edit_name}}</span></div>
                    <div class="editation_bt_xinxi_name"  style="margin-top:0.48rem;">部门： <span>{{edit_bumen}}</span></div>
                </div>
            </div>
            <div class="form_editation">

                <div class="form_edit1">
                    <div class="form_edit1_tit">性别:</div>
                    <label v-for="(item, index) in radioData" :key="index">
                        <input
                                type="radio"
                                v-model="radioVal"
                                :value="item.value"
                                @click="getRadioVal(item.value)"
                                @blur="blurEvent"
                        />
                    {{ item.value }}
                    </label>

                </div>

                <div class="form_edit1">
                    <div class="form_edit1_tit">出生年月:</div>
                    <input style="background: none" type="date" value="edit_data" v-model="edit_data" @blur="blurEvent">
                </div>
                <div class="form_edit1">
                    <div class="form_edit1_tit">身高:</div>
                    <input type="number" placeholder="请输入身高" v-model="edit_height" @blur="blurEvent">
                </div>
                <div class="form_edit1">
                    <div class="form_edit1_tit">体重:</div>
                    <input type="number" placeholder="请输入体重" v-model="edit_width" @blur="blurEvent">
                </div>
                <div class="form_edit1">
                    <div class="form_edit1_tit">紧急联系人:</div>
                    <input type="text" placeholder="请输入紧急联系人" v-model="edit_telname" @blur="blurEvent">
                </div>
                <div class="form_edit1">
                    <div class="form_edit1_tit">联系人电话:</div>
                    <input type="number" placeholder="请输入联系人电话" v-model="edit_tel" @blur="blurEvent">
                </div>
                <div class="form_edit1" style="border:none">
                    <div class="form_edit1_tit">所在城市:</div>
                    <div class="rank_item_con" @click="choos_adress">
                        <span class="club_name" v-show="agentArea==''">请选择所在地区</span>
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
            </div>

        </div>
        <div class="creat_club" @click="to_baocun">保存</div>

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
    import {setCookie,getCookie,delCookie} from '../assets/public/cookie'
    import Eject from './eject'
    import Clipic from 'clipic'
    const clipic = new Clipic()
    import vDistpicker from 'v-distpicker';
    import Header from './Header'
    export default {
        components: { Header,vDistpicker,Eject},
        name: '',
        data() {
            return {
                hide_tip:'',
                hidea:false,
                showa:false,
                show_tip:'',
                radioData: [
                    { value: '男' },
                    { value: '女' },
                ],
                radioVal: '男',
                radioVal_sex:'m',
                title: '编辑个人资料',
                show: true,
                backpage: '',
                user_img:'./static/img/07club_32.png',
                edit_name:'',
                edit_bumen:'',
                edit_data:'',
                edit_height:'',
                edit_width:'',
                edit_telname:'',
                edit_tel:'',
                base64_logo: './static/img/07club_32.png',
                agentArea:'',
                popupVisible:false,
                province:'',
                city:'',
                area:'',
                avatar:''
            }
        },
        created() {
            let _this=this;
            this.$axios.get("/user",{
                headers: {
                    'Authorization': localStorage.getItem('token_type') + localStorage.getItem('access_token'),
                },
                params: {
                }
            }).then(res=>{
                if(res.status==200){
                    console.log(res)
                    _this.edit_name=res.data.data.name;
                    _this.edit_bumen=res.data.data.department;
                    _this.edit_data=res.data.data.birthday;
                    if(res.data.data.profile.weight!=0){
                        _this.edit_width=res.data.data.profile.weight;
                    }
                   if(res.data.data.profile.stature!=0){
                       _this.edit_height=res.data.data.profile.stature;
                   }
                   if(res.data.data.profile.contact_user!=0){
                       _this.edit_telname=res.data.data.profile.contact_user;
                   }
                    if(res.data.data.profile.contact_phone!=0){
                        _this.edit_tel=res.data.data.profile.contact_phone;
                    }
                    if(res.data.data.avatar!=''){
                        _this.base64_logo=res.data.data.avatar;
                    }

                    _this.radioVal=res.data.data.sex_name;
                    _this.radioVal_sex=res.data.data.sex;
                    _this.province=res.data.data.profile.province;
                    _this.city=res.data.data.profile.city;
                    _this.area=res.data.data.profile.district;
                    _this.agentArea=$.trim(res.data.data.profile.full_areas);


                }else {
                    _this.showa=true;
                    _this.show_tip=res.data.message;
                }
            })
                .catch(err=>{
                    console.log(err)
                })
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
            uploaduserImg(event) {
                const files = this.$refs.files1.files;
                const reader = new FileReader();
                reader.readAsDataURL(files[0]);
                reader.onload = img => {
                    console.log('***')
                    clipic.getImage({
                        width: 400,
                        height: 400,
                        src: img.target.result,
                        onDone: base64 => {
                            console.log("***")
                            this.base64_logo = base64;
                            console.log(base64)
                            let _this=this;
                            var fd = new FormData()
                            fd.append('avatar',base64)

                            let config = {
                                headers: {
                                    'Authorization': localStorage.getItem('token_type')+' '+ localStorage.getItem('access_token'),
                                    'Content-Type': 'multipart/form-data'
                                }
                            }
                            this.$axios.post("/avatar",fd, config).then(res=>{
                                if(res.status==200){
                                    _this.avatar=res.data.avatar
                                }
                            }).catch(err=>{

                            })

                        }
                    })
                }
                event.value = ''
                this.$refs.files1.value='';
            },
            getRadioVal(val){
                this.radioVal=val;
                if(val=='男'){
                    this.radioVal_sex='m'
                }else{
                    this.radioVal_sex='f'
                }
            },
            okfall(){
                this.showa=false;
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
            to_baocun(){
                var fd = new FormData()
                fd.append('avatar',this.base64_logo)
                console.log(fd)
                let _this=this

                this.$axios.patch("/user",{
                    'avatar':_this.avatar,
                    "birthday": _this.edit_data,
                    "stature":_this.edit_height,
                    "weight": _this.edit_width,
                    "sex":_this.radioVal_sex,
                    "contact_user":_this.edit_telname,
                    "contact_phone": _this.edit_tel,
                    "province":_this.province,
                    "city":_this.city,
                    "district":_this.area

                }, {headers: {
                    'Authorization': localStorage.getItem('token_type') + localStorage.getItem('access_token'),
                }})
                    .then(res=>{
                        if(res.status==200){
                            _this.hidea=true;
                            _this.hide_tip='修改成功';
                            setTimeout(function(){
                                _this.hidea=false;
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
    .rank_item_con{
        width:4.6rem;
        height:0.36rem;
        text-align: left;
        display: table-cell;
        vertical-align: middle;
        line-height:0.36rem;
        color: #4d4d4d;

    }

    .rank_item_con>img{

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
        float: right;
        margin-top:0.14rem;
        margin-left:0.1rem;
        border-radius: 0.02rem;
    }


    .creat_club{
        width:7.1rem;
        height:0.9rem;
        position: fixed;
        left:0;
        right:0;
        margin:auto;
        bottom:0.2rem;
        background: #ff5757;
        color: #fff;
        text-align: center;
        line-height:0.9rem;
        font-size: 0.3rem;
        /*font-weight: bold;*/
        border-radius: 0.1rem;

    }

    .form_editation{
        width:7.1rem;
        height:auto;
        margin:auto;
        margin-top:0.15rem;
        background: #fff;
    }

    .form_edit1{
        width:6.8rem;
        height:1rem;
        margin:auto;
        border-bottom:1px solid #e6e6e6;
        display: flex;
        justify-content: flex-start;
        align-items: center;

    }
    .form_edit1>.form_edit1_tit{
        width:1.87rem;
        height:auto;
        font-size: 0.28rem;
        color: #1a1a1a;
    }

    .form_edit1>label>input{
        width:0.4rem;
        outline: none;
    }
    .form_edit1>label:last-child{
        margin-left:0.6rem;
    }

    .form_edit1>input{
        width:4.63rem;
        color: #a6a6a6;
        border:none;
        outline: none;
    }
    .form_edit1>input::placeholder{
        color: #a6a6a6;
    }
    .form_edit1>input:focus{
        outline: none;
    }

  .editation_box{
      width:100%;
      height:auto;
      margin-top:1.03rem;
      margin-bottom:1.23rem;
  }

    .editation_bt{
        width:7.1rem;
        height:2.2rem;
        margin:auto;
        margin-top:0.15rem;
        background: #fff;
        padding:0.36rem 0.15rem;
        box-sizing: border-box;
        display: flex;
        justify-content: flex-start;
    }

    .editation_bt_img{
        width:1.2rem;
        position: relative;
        height:auto;
    }

    .editation_bt_img>input{
        position: absolute;
        top:0;
        left:0;
        width:100%;
        height:100%;
        opacity: 0;
        border:none
    }

    .editation_bt_img>img{
        display: block;
        width:1.2rem;
        height:1.2rem;
        border-radius: 1.2rem;
        background: #e9e9e9;

    }
  .editation_bt_img>.editation_bt_img_text{
      width:100%;
      height:0.22rem;
      font-size: 0.22rem;
      color: #a6a6a6;
      margin-top:0.1rem;
      text-align: center;
      line-height:0.22rem;
  }
    .editation_bt_xinxi{
        width:auto;
        height:100%;
        margin-left:0.65rem;
    }

    .editation_bt_xinxi_name{
        width:auto;
        height:0.3rem;
        margin-top:0.15rem;
        font-size:0.3rem;
        color: #1a1a1a;
        line-height: 0.3rem;
    }

    .editation_bt_xinxi_name>span{
        color: #a6a6a6;
    }

    .editation_bt_xinxi_name>input{
        color: #a6a6a6;
        margin-left:0.2rem;
        width:3.4rem;
        border:none;
    }
    .editation_bt_xinxi_name>input::placeholder{
        color: #a6a6a6;
    }
    .editation_bt_xinxi_name>input:focus{
        outline: none;
    }


</style>
