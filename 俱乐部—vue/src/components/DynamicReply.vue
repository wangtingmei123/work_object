<template>
    <div style="min-height: 100vh;overflow: hidden">
        <Header :title="title" :show="show" :backpage="backpage"></Header>
        <div class="image-item space" @click="showActionSheet()">
            <div class="image-up"></div>
        </div>
        <input id="upload_file" type="file" style="display: none;" multiple="multiple" accept='image/*' name="file" @change="fileChange($event)"/>

        <div class="write_box">
            <textarea class="textarea"  maxlength="150"  placeholder='请输入回复内容，最多150个字'  @input="write_tribal" v-model="text_tribal" @blur="blurEvent" ></textarea>
            <div class="area_tip"><span :class="{color:num_text==150}">{{num_text}} </span>/ 150</div>

        </div>
        <div class="creat_club" @click="to_reply()">回复</div>
        <Eject  type='alert'  @took='okfall' :showstate='showa' >
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
    export default {
        components: { Header,Eject },
        name: '',
        data() {
            return {
                cancel:true,
                showa:false,
                show_tip:'',
                hide_tip:'',
                hidea:false,
                title: '回复动态',
                show: true,
                backpage: '',
                launched_bg:'./static/img/12active_02.jpg',
                select:1,
                jia_img:'./static/img/24write_03.jpg',
                del_img:'./static/img/del_write.png',
                imgList: [],
                datas: new FormData(),
                files:0,
                size:0,
                file_src:[],
                text_tribal:'',
                num_text:0,
                dynamic_id:''

            }
        },
        created() {
            this.dynamic_id=this.$route.query.dynamic_id

        },
        mounted() {

        },
        methods: {
            write_tribal(){
                console.log(this.text_tribal)
                this.num_text=this.text_tribal.length
            },
            to_reply(){
                let _this=this;
                if(this.text_tribal.length==0){
                    _this.showa=true;
                    _this.show_tip='不能回复空内容哦!';
                    return
                }
                _this.$axios.post("/dynamic-replies", {
                        "dynamic_id": this.dynamic_id,
                        "contents": this.text_tribal
                },
                {headers: {
                        'Authorization': localStorage.getItem('token_type') + ' '+localStorage.getItem('access_token'),
                    },
                }).then(res=>{
                    _this.can_show=true
                    if(res.status==201){
                        _this.hidea=true;
                        _this.hide_tip='回复成功';
                        setTimeout(function(){
                            _this.hidea=false;
                            _this.$router.go(-1);
                        },1500)
                    }else {
                        _this.showa=true;
                        _this.show_tip=res.data.message;
                    }
                })
                    .catch(err=>{
                        _this.can_show=true
                        console.log(err)
                    })
            },
            blurEvent () {
                // 将滚动拉到底
                setTimeout(() => {
                    let scrollHeight = document.documentElement.scrollTop || document.body.scrollTop || 0
                    window.scrollTo(0, Math.max(scrollHeight - 1, 0))
                }, 100)
            },

            okfall(){
                let _this=this;
                this.showa=false;
            },
            nofall(){
                this.showa=false;
                  this.showa=false;
            },

        }


    }
</script>

<style scoped>
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
    .write_box{
        width:6.50rem;
        height:auto;
        margin:auto;
        padding-bottom:0.50rem;
        margin-top:0.88rem;
    }

    .textarea{
        width:100%;
        height:2.46rem;
        margin:auto;
        background: #fff;
        padding:0.20rem;
        font-size: 0.30rem;
        box-sizing: border-box;
        margin-top:0.16rem;
        border:none;
        resize: none;
        /* border:1rem solid #999; */
    }
    .textarea:focus{
        outline: none;
    }

    .area_tip{
        width:auto;
        height:0.44rem;
        font-size: 0.22rem;
        float: right;
        line-height:0.44rem;
        margin-right:0.20rem;
        color: #c8c8c8;
    }
    .area_tip>span{
        font-size: 0.22rem;
    }

    .area_tip>.color{
        color: #f7282f;
    }

    .submit{
        width:1.50rem;
        height:0.64rem;
        font-size: 0.32rem;
        line-height:0.64rem;
        border-radius: 0.10rem;
        text-align: center;

        background: #ff5a57;
        margin:auto;
        margin-top:0.60rem;
        color: #fff;
        float: right;
        margin-right:0.50rem;


    }


    .ylimg>img{
        display: block;
        width:100%;
        height:100%;
    }


    .torefund_box2{
        width:100%;
        height:auto;
        font-size: 0.28rem;
        box-sizing: border-box;
        overflow: hidden;
    }



    .tfright{
        width:100%;
        height:auto;

    }

    .tfright2{
        width:100%;
        height:auto;
    }



    .tfrboxsc{
        width:1.94rem;
        height:1.94rem;
        float: left;
        margin-left:0.12rem;
        margin-top:0.12rem;
        font-size: 0.66rem;
        font-weight: bold;
        text-align: center;
        line-height:1.94rem;
        background: #ededed;
        border:none;
        position: relative;

    }



    .del_img{
        display: block;
        width: 0.50rem;
        height:0.50rem;
        position: absolute;
        top:0;
        right:0;

    }

    .del_img>img{
        display: block;
        width:100%;
        height:100%;
    }


    .jia{
        width:0.66rem;
        height:0.66rem;
        vertical-align: middle;
        line-height:1.94rem;
    }
    .tfrboxsca{

        background: #ededed;
        color: #9d9e9d;
        border:none;
        position: relative;
    }

    .tfrboxsca>input{
        display: block;
        width:1.94rem;
        height:1.94rem;
        position: absolute;
        top:0;
        left:0;
        opacity: 0;
    }



    .tfrboxscimg{
        display: block;
        width:100%;
        height:100%;
        object-fit: cover;
    }





</style>
