<template>
    <div style="background: #f7f7f7;min-height: 100vh">
        <Header :title="title" :show="show" :backpage="backpage"></Header>
        <div class="image-item space" @click="showActionSheet()">
            <div class="image-up"></div>
        </div>
        <input id="upload_file" type="file" style="display: none;" accept='image/*' name="file" capture="camera"  @change="fileChange($event)"/>
        <baidu-map class="map" :center="center" :zoom="zoom">
            <bm-marker :position="center" :dragging="true" animation="BMAP_ANIMATION_BOUNCE">
                <bm-label :content="address_name" :labelStyle="{color: 'red', fontSize : '12px'}" :offset="{width: -35, height: 30}"/>
            </bm-marker>
        </baidu-map>

        <div class="sign">
            <img :src="daka_bg">
            <div class="sign__box">
                <div class="sign__btn" @click="hit_now()">
                    <div class="word">打卡</div>
                    <!-- <div class="timeout">{{time_counter_txt}}</div> -->
                </div>

                <div class="note">{{card_message}}</div>

                <div class="dakad">
                    <img :src="daka_adress" style='display:block;width:0.24rem;height:0.26rem;'>
                    <div class="daka_tip">请前往打卡地点</div>
                    <div class="didian"  @click="to_hitcardaddress()"> {{'<'}}{{address_name}}{{'>'}} </div>
                </div>
            </div>
        </div>


        <div class='torefund_box2' v-if="hit_nn">
            <div class='tfright2' >
                <div class="tfrboxsc" v-if="imgList.length >=1">
                    <img class="tfrboxscimg" :src="imgList[0]" style='width:100%;height:auto' >
                    <img  class="del_img"  :src="del"  style='width:0.50rem;height:0.50rem;' @click="fileDel(0)">
                </div>
                <div class="tfrboxsc tfrboxsca" @click="fileClick()" v-if="imgList.length < 1">
                    <img class="jia" :src="paizhao" style="width:0.90rem;height:0.90rem">
                </div>

                <div class='submit' @click="signes()">提交</div>
                <div class='totijiao'>请提交照片完成打卡</div>

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
    import Eject from './eject'
    import Header from './Header'
    import {BaiduMap ,BmMarker, BLabel} from 'vue-baidu-map'
    var x_PI = 3.14159265358979324 * 3000.0 / 180.0
    var PI = 3.1415926535897932384626
    var a = 6378245.0
    var ee = 0.00669342162296594323
    export default {
        components: {
            Header,
            Eject,
            BaiduMap,
            BmMarker,
            BLabel
        },
        name: '',
        data() {
            return {
                title: '打卡',
                show: true,
                backpage: '/',
                showa:false,
                show_tip:'',
                hide_tip:'',
                hidea:false,
                center: {lng: 116.404, lat: 39.915},
                zoom: 15,
                daka_bg:'./static/img/08daka_oo_02.png',
                daka_adress:'./static/img/08daka1_03.png',
                card_message:'',
               address_name:'北京天安门',
                is_hit_card_end:false,
                enable_card_distance:0.4,
                distance_timer:null,
                paizhao:'./static/img/paizhao.png',
                del:'./static/img/del_write.png',
                avatar:'',
                imgList: [],
                datas: new FormData(),
                files:0,
                size:0,
                file_src:[],
                hit_nn:false,
                getLongitude:0,
                getLatitude:0,
                is_chha:true,
                issue_id:''

            }
        },
        created() {
            let _this=this
            if(localStorage.getItem('issue_nums')==0){
                _this.$axios.get("/activities/"+ localStorage.getItem('active_id'),{
                    headers: {
                        'Authorization': localStorage.getItem('token_type') + localStorage.getItem('access_token'),
                    },
                    params:{
                    }
                }).then(res=>{
                    if(res.status==200){
                        _this.address_name=res.data.data.address;
                        _this.enable_card_distance=res.data.data.sign_range/1000;
                        _this.center.lng=res.data.data.longitude;
                        _this.center.lat=res.data.data.latitude;

                    }else{
                        _this.showa=true;
                        _this.show_tip=res.data.message;
                        return
                    }
                })
                    .catch(err=>{
                    })
            }else{
                _this.issue_id=_this.$route.query.issue_id;
                _this.$axios.get("/activity-issues/"+_this.issue_id,{
                    headers: {
                        'Authorization': localStorage.getItem('token_type') + localStorage.getItem('access_token'),
                    },
                    params:{

                    }
                }).then(res=>{

                    if(res.status==200){
                        _this.address_name=res.data.data.address;
                        _this.enable_card_distance=res.data.data.sign_range/1000;
                        _this.center.lng=res.data.data.longitude;
                        _this.center.lat=res.data.data.latitude;

                    }else{

                    }
                })
                    .catch(err=>{
                    })
            }

        },
        mounted() {
         this.to_hitcard()
        },
        methods: {

            signes(){
                let _this=this
                if(_this.imgList.length<1){
                    _this.showa=true;
                    _this.show_tip='请提交照片完成打卡';
                    return
                }

                _this.$axios.post("activity-signes", {

                    "act_id":localStorage.getItem('active_id'),
                    "issue_id":_this.issue_id,
                    "longitude":_this.getLongitude,
                    "latitude":_this.getLatitude,
                    "image_tmp":_this.imgList[0]
                },
                { headers: {
                        'Authorization': localStorage.getItem('token_type') + localStorage.getItem('access_token'),
                    }}).then(res=>{

                    if(res.status==200){
                        _this.hidea=true;
                        _this.hide_tip='打卡成功';
                        _this.hit_nn=false;
                        setTimeout(function(){
                            _this.hidea=false;

                        },1500)

                    }else{
                        _this.hit_nn=false;
                        _this.showa=true;
                        _this.show_tip='打卡失败！如有疑问，请联系客服';
                        return
                    }
                })
                    .catch(err=>{
                        _this.hit_nn=false;
                        _this.showa=true;
                        _this.show_tip='打卡失败！如有疑问，请联系客服';
                        return

                    })


            },

            hit_now(){
                console.log("------")
                let _this=this;
                if(_this.is_hit_card_end){
                    _this.showa=true;
                    _this.show_tip='您已完成打卡';
                    return
                }
                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(
                        //locationSuccess 获取成功的话
                        function (position) {
                            console.log("--3---")
                            var enable_card_distance = _this.enable_card_distance;
                           enable_card_distance = enable_card_distance <= 0 ? 0.5 : enable_card_distance;
                            let getitude=_this.gcj02_to_bd09(position.coords.longitude,position.coords.latitude)
//                            let getitude = _this.gcj02_to_bd09(39.8381360800, 116.2796287400)
                            _this.getLongitude = getitude[0];  //position就是我们通过api获取的信息，而我们想获取的经纬度就在coords下，随后将经纬度分别赋值给外部data设定好的变量
                            _this.getLatitude = getitude[1];    //记住如果这里直接写this可能会导致找不到外部的变量而报错，所以提前设置一下this的指向
//                            alert(_this.getLongitude)
//                            alert(_this.getLongitude)
                            var real_distanct = _this.getDistance(getitude[1], getitude[0], _this.center.lat, _this.center.lng);
                            var arr_real_distanct=real_distanct-0.6;
                            arr_real_distanct=arr_real_distanct<=0 ? 0 : arr_real_distanct;
                            if(arr_real_distanct <= enable_card_distance){
                                _this.hit_nn=true
                            }else{
                                _this.showa=true;
                                _this.show_tip='请在'+ enable_card_distance * 1000 + '米范围内打卡';
                            }
                        },
                        //locationError  获取失败的话
                        function (error) {
                            console.log("--2--")
                            var errorType = ['您拒绝共享位置信息', '获取不到位置信息', '获取位置信息超时'];
                            _this.showa=true;
                            _this.show_tip=errorType[error.code - 1];
                            _this.is_chha=false

                        }
                    );
                }else{
                    console.log("--1---")
                    var errorType = ['您拒绝共享位置信息', '获取不到位置信息', '获取位置信息超时'];
                    _this.showa=true;
                    _this.show_tip=errorType[error.code - 1];
                    _this.is_chha=false
                }
            },
            //计算两点间的距离 千米
            getDistance: function (la1, lo1, la2, lo2) {
                var La1 = la1 * Math.PI / 180.0;
                var La2 = la2 * Math.PI / 180.0;
                var La3 = La1 - La2;
                var Lb3 = lo1 * Math.PI / 180.0 - lo2 * Math.PI / 180.0;
                var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(La3 / 2), 2) + Math.cos(La1) * Math.cos(La2) * Math.pow(Math.sin(Lb3 / 2), 2)));
                s = s * 6378.137;
                s = Math.round(s * 10000) / 10000;
                s = s.toFixed(4);
                return s;
            },
           to_hitcard(){
               let _this = this;
                var distance_clock = setInterval(function () {
//                    console.log("000")
//                    let getitude = _this.gcj02_to_bd09(39.8381360800, 116.2796287400)
//                    console.log(getitude)
                    if (navigator.geolocation) {
                        navigator.geolocation.getCurrentPosition(
                            //locationSuccess 获取成功的话
                            function (position) {
                                var enable_card_distance = _this.enable_card_distance;
                                 enable_card_distance = enable_card_distance <= 0 ? 0.5 : enable_card_distance;
                                  let getitude=_this.gcj02_to_bd09(position.coords.longitude,position.coords.latitude)
//                                let getitude = _this.gcj02_to_bd09(39.8381360800, 116.2796287400)
                                _this.getLongitude = getitude[0];  //position就是我们通过api获取的信息，而我们想获取的经纬度就在coords下，随后将经纬度分别赋值给外部data设定好的变量
                                _this.getLatitude = getitude[1];    //记住如果这里直接写this可能会导致找不到外部的变量而报错，所以提前设置一下this的指向
//                          alert(_this.getLongitude)　　　　　　　　　　　　　　 //弹出经度测试
//                          alert(_this.getLatitude)
                                var real_distanct = _this.getDistance(getitude[1], getitude[0], _this.center.lat, _this.center.lng);
                                var arr_real_distanct=real_distanct-0.6;
                                arr_real_distanct=arr_real_distanct<=0 ? 0 : arr_real_distanct;
                                if (_this.is_hit_card_end == false) {
                                    console.log("aaaa")

                                    _this.card_message = '当前位置距离' + _this.address_name + '【' + parseInt(arr_real_distanct * 1000) + '】米' + (arr_real_distanct <= enable_card_distance ? '，您可以打卡了' : '，请再走近些')

                                } else {
                                    _this.card_message = '您已完成打卡'
                                }
                            },
                            //locationError  获取失败的话
                            function (error) {
                                var errorType = ['您拒绝共享位置信息', '获取不到位置信息', '获取位置信息超时'];
                                _this.card_message = errorType[error.code - 1]
//                                alert(errorType[error.code - 1]);

                            }
                        );
                    }else{
                        _this.card_message ='获取不到位置信息'
                    }
                },3000)
             this.distance_timer=distance_clock;
            },
           to_hitcardaddress(){
                this.$router.push({ path: '/hitcardaddress',query:{lng:this.center.lng,lat:this.center.lat,address_name:this.address_name}}) // -> /user
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
           okfall(){
                this.showa=false;
                if(this.is_chha==false){
                    this.is_chha=true;
                    this.hit_nn=true
                }

            },



            //调用相册&相机
            fileClick() {
                $('#upload_file').click();

            },
            //调用手机摄像头并拍照
            getImage() {
                let cmr = plus.camera.getCamera();
                cmr.captureImage(function(p) {
                    plus.io.resolveLocalFileSystemURL(p, function(entry) {
                        compressImage(entry.toLocalURL(),entry.name);
                    }, function(e) {
                        plus.nativeUI.toast("读取拍照文件错误：" + e.message);
                    });
                }, function(e) {
                }, {
                    filter: 'image'
                });
            },

            //点击事件，弹出选择摄像头和相册的选项
            showActionSheet() {
                let bts = [{
                    title: "拍照"
                }];
                plus.nativeUI.actionSheet({
                        cancel: "取消",
                        buttons: bts
                    },
                    function(e) {
                        if (e.index == 1) {
                            this.getImage();
                        } else if (e.index == 2) {
                            this.galleryImgs();
                        }
                    }
                );
            },
            fileChange(el) {

                this.files=$("#upload_file").get(0).files;
                console.log(el)
                console.log(this.files.length);

                for(let i=0;i<this.files.length;i++){
                    this.datas.append("file",this.files[i]);
                }
                this.show1=false;

                // if()
                if (!el.target.files[0].size) return;
                this.fileList(el.target);
                el.target.value = ''
            },
            fileList(fileList) {
                let files = fileList.files;
                for (let i = 0; i < files.length; i++) {
                    //判断是否为文件夹
                    if (files[i].type != '') {
                        if(i>5){
                            return
                        }
                        this.fileAdd(files[i]);
                    } else {
                        if(i>5){
                            return
                        }
                        //文件夹处理
                        this.folders(fileList.items[i]);
                    }
                }
            },
            //文件夹处理
            folders(files) {
                let _this = this;
                //判断是否为原生file
                if (files.kind) {
                    files = files.webkitGetAsEntry();
                }
                files.createReader().readEntries(function (file) {
                    for (let i = 0; i < file.length; i++) {
                        if (file[i].isFile) {
                            _this.foldersAdd(file[i]);
                        } else {
                            _this.folders(file[i]);
                        }
                    }
                })
            },
            fileAdd(file) {
               var _this=this
                //总大小
                this.size = this.size + file.size;
                //判断是否为图片文件
                if (file.type.indexOf('image') == -1) {
                    file.src = 'wenjian.png';
                    lrz( file.src, {
                        quality: 0.5    //自定义使用压缩方式
                    }).then(function(rst) {
                        //成功时执行
                        _this.imgList.push(rst.base64);
                    }).catch(function(error) {
                        //失败时执行
                        _this.imgList.push(file.src);
                    }).always(function() {
                        //不管成功或失败，都会执行
                    })
                } else {
                    let reader = new FileReader();
                    reader.vue = this;
                    reader.readAsDataURL(file);
                    reader.onload = function () {
                        file.src = this.result;
                        lrz( file.src, {
                            quality: 0.5    //自定义使用压缩方式
                        }).then(function(rst) {
                            //成功时执行
                            _this.imgList.push(rst.base64);
                        }).catch(function(error) {
                            //失败时执行
                            _this.imgList.push(file.src);
                        }).always(function() {
                            //不管成功或失败，都会执行
                        })
                        // this.file_src.push(file.src)

                    }
                }


            },
            fileDel(index) {
//                this.size = this.size - this.imgList[index].file.size;//总大小
                this.imgList.splice(index, 1);
            },
            bytesToSize(bytes) {
                if (bytes === 0){
                    return '0 B';
                }
                let k = 1000, // or 1024
                    sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
                    i = Math.floor(Math.log(bytes) / Math.log(k));
                return (bytes / Math.pow(k, i)).toPrecision(3) + ' ' + sizes[i];
            },
            dragenter(el) {
                el.stopPropagation();
                el.preventDefault();
            },
            dragover(el) {
                el.stopPropagation();
                el.preventDefault();
            },
            drop(el) {
                el.stopPropagation();
                el.preventDefault();
                this.fileList(el.dataTransfer);
            },
            shows(et,tx){
                this.strut=et;
                this.txt=tx;
            },
            handleClick(){
                this.$store.commit('add')
            },
        },
        destroyed(){
            if (this.distance_timer) {
                clearInterval(this.distance_timer);
            }
        }

    }
</script>

<style scoped>

    /**index.wxss**/



    .torefund_box2{
        width:100%;
        height:100vh;
        font-size: 0.28rem;
        box-sizing: border-box;
        overflow: hidden;
        position: fixed;
        top:0;
        left:0;
        z-index: 99999999;
        background: rgba(0, 0, 0, 0.6)

    }

    .tfleft{
        width:100%;
        height:0.28rem;
        line-height:0.28rem;
        float: left;
        font-size: 0.28rem;
        color: #000;
        font-weight: bold;
        margin-top:0.40rem;

    }

    .tfleft2{
        width:100%;
        height:0.28rem;
        line-height:0.28rem;
        float: left;
        color: #000;
        font-weight: bold;
        margin-top:0.40rem;
        font-size: 0.28rem;
        padding-left:0.20rem;
        padding-right:0.20rem;
        box-sizing: border-box;
    }

    .tfright{
        width:100%;
        height:auto;

    }

    .tfright2{
        width:4.50rem;
        height:5.00rem;
        position: absolute;
        top:0;left:0;right:0;bottom:0;
        margin:auto;
        background: #fff;
        border-radius: 0.20rem;

    }



    .tfrboxsc{
        width:2.44rem;
        height:2.44rem;
        margin:auto;
        position: absolute;
        left:0;right:0;
        font-size: 0.66rem;
        font-weight: bold;
        text-align: center;
        line-height:2.44rem;
        background: #ededed;
        border:none;
        margin-top:0.60rem;
        border-radius: 0.15rem;
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;


    }

    .del_img{
        display: block;
        width: 0.50rem;
        height:0.50rem;
        position: absolute;
        top:0;
        right:0;
        z-index: 9999;

    }


    .jia{
        margin:auto;
        margin-top:0.77rem;
    }
    .tfrboxsca{
        background: #ededed;
        color: #9d9e9d;
        border:none;
        border-radius: 2.44rem;
        position: relative;
    }
    .tfrboxsca>input{
        display: block;
        width:100%;
        height:100%;
        position: absolute;
        top:0;
        left:0;
        right:0;
        bottom:0;
        margin:auto;
        opacity: 0;
    }


    .tfrboxscimg{
        display: block;
        width:100%;
        height:100%;
        object-fit:cover;

    }



    .submit{
        width:1.50rem;
        height:0.64rem;
        font-size: 0.32rem;
        line-height:0.64rem;
        border-radius: 0.10rem;
        text-align: center;

        background: #ff5a57;
        margin-top:0.60rem;
        color: #fff;
        margin-right:0.50rem;
        position: absolute;
        bottom:0.40rem;
        left:0;
        right:0;
        margin:auto;


    }

    .totijiao{
        width:100%;
        height:0.34rem;
        font-size: 0.24rem;
        line-height:0.34rem;
        border-radius: 0.10rem;
        text-align: center;
        position: absolute;
        bottom:1.20rem;
        left:0;
        right:0;
        margin:auto;
        color: #666;
    }





    .sign{
        position:absolute;
        top:0.88rem;
        width:100%;
        height:5.20rem;
        left:0;right:0;
        margin:auto;
        z-index: 100;


    }

    .sign>img{
        display: block;
        width:100%;
        height:100%;
    }

    .sign__box{
        width:100%;
        height:4.80rem;
        position: absolute;
        top:0;
        left:0;
    }
    .sign__btn{
        width:2.28rem;
        height:2.28rem;
        margin:auto;
        margin-top:0.50rem;
        background: #ff5a57;
        border:0.22rem solid #f8d0ce;
        border-radius: 2.28rem;
    }

    .sign__btn .word{
        font-size:0.50rem;
        font-family:PingFangSC-Semibold;
        color:#fff;
        line-height:2.28rem;
        width:100%;
        height:100%;
        text-align: center;
        font-weight: bold;
    }
    .sign__btn .timeout{
        font-size:0.28rem;
        font-family:PingFangSC-Semibold;
        color:#fff;
        line-height:0.28rem;
        width:100%;
        height:0.28rem;
        text-align: center;
        margin-top:0.26rem;
    }
    .note{
        width:100%;
        height:0.30rem;
        line-height:0.30rem;
        text-align:center;
        font-size:0.24rem;
        font-family:PingFangSC-Medium;
        color:#666;
        margin-top:0.35rem;

    }


    .dakad{
        width:100%;
        height:0.42rem;
        text-align: center;
        line-height:0.42rem;
        font-size: 0.28rem;
        margin-top:0.23rem;
        display: flex;
        justify-content: center;
        align-items: center;

    }

    .dakad>img{
        width:0.24rem;
        height:0.26rem;


    }

    .daka_tip{
        margin-left:0.14rem;
    }

    .didian{
        color: #ff5a57;
    }

    .suc_daka{
        width:100%;
        height:100vh;
        position: fixed;
        z-index: 99999;
        top:0;left:0;
        background: rgba(0,0,0,0.7)
    }

    .suc_box{
        width:5.49rem;
        height:5.80rem;
        position: absolute;
        top:0;left:0;right:0;bottom:0;margin:auto;

    }


    .suc_boxa{
        display: block;
        width:100%;
        height:5.50rem;
        border-radius: 0.24rem;
    }
    .suc_boxa>img{
        display: block;
        width:100%;
        height:5.50rem;
    }


    .close{
        width:0.52rem;
        height:0.52rem;
        background: #fff;
        border-radius: 0.52rem;
        border:1px solid #f8f8f8;
        color: #3a3a3a;
        font-size: 0.48rem;
        text-align: center;
        line-height:0.62rem;
        position: absolute;
        bottom:0rem;
        left:0;
        right:0;
        margin:auto;
        z-index: 999;
    }

    .map {
        width: 100%;
        height: 100vh;
        padding:0;margin:0;
        font-size: 0;
    }

    .float{
        position: fixed;bottom:0.2rem;right:0.2rem;width:0.8rem;height:auto;z-index: 9999;
    }

    .float a{
        display: block;height:0.8rem;width:0.8rem;margin-top:0.2rem;background: #2c3e50;
        text-align: center;
        line-height:0.8rem;
        border-radius: 0.8rem;
        color: #fff;
        font-size: 0.28rem;
        text-decoration: none;

    }
</style>
