<template>
    <div style="background:#f7f7f7;min-height: 100vh;overflow: hidden">
        <Header :title="title" :show="show" :backpage="backpage"></Header>
        <div class="image-item space" @click="showActionSheet()">
            <div class="image-up"></div>
        </div>
        <input id="upload_file" type="file" style="display: none;" multiple="multiple"  accept='image/*' name="file" @change="fileChange($event)"/>

        <div class="write_box">
            <textarea class="textarea"  maxlength="150"  placeholder='请输入动态内容，最多150个字'  @input="write_tribal" v-model="text_tribal" @blur="blurEvent" ></textarea>
            <div class="area_tip"><span :class="{color:num_text==150}">{{num_text}} </span>/ 150</div>
        

            <div class="upload_warp torefund_box2">
                <div class="upload_warp_img tfright2">
                    <div class="upload_warp_img_div tfrboxsc" v-for="(item,index) in imgList" :key="index">
                        <div class="upload_warp_img_div_top del_img">
                            <img  :src="del_img" class="upload_warp_img_div_del" @click="fileDel(index)">
                        </div>
                        <img class="tfrboxscimg" :src="item" >
                    </div>
                    <div class="upload_warp_left tfrboxsc tfrboxsca" id="upload_warp_left" @click="fileClick()" v-if="imgList.length < 9">
                        <img  class="jia" :src="jia_img" alt="">
                    </div>
                </div>
            </div>


             <!-- <div class="torefund_box2">
                <div class="tfright2">
                    <div class="tfrboxsc" v-for="(item,index) in images" :key="index">
                        <div class="del_img">
                            <img :src="del_img" class="upload_warp_img_div_del" @click="remove(index)">
                        </div>
                        <img class="tfrboxscimg" :src="item" >
                    </div>
                    <div class="upload_warp_left tfrboxsc tfrboxsca" id="upload_warp_left" @click="add($event)" v-if="images.length < 9">
                        <img  class="jia" :src="jia_img" alt="">
                    </div>
                </div>
            </div> -->



         

        </div>




        <div class="creat_club" @click="to_uplode()">发布</div>
        <Eject  type='alert'  @took='okfall' :showstate='showa'  >
            <div slot='text'>{{show_tip}}</div>
        </Eject>
        <div class="hide_tip_box" v-show="hidea">
            <div class="hide_tip">{{hide_tip}}</div>
        </div>
        <div class="lode_img" v-show="lode_end">
            <img :src="lode_img" alt="">
        </div>





    </div>
</template>


<script>


    import Header from './Header'
    import Eject from './eject'
    export default {
        components: { Header,Eject,
          
        
        },
        name: '',
        data() {
            return {
                url:'https://club.xindongguoji.com/api/dynamics',
                lode_img:'./static/img/loding.gif',
                lode_end:false,
                showa:false,
                show_tip:'',
                hide_tip:'',
                hidea:false,
                title: '发布动态',
                show: true,
                backpage: '',
                launched_bg:'./static/img/12active_02.jpg',
                select:1,
                jia_img:'./static/img/24write_03.jpg',
                del_img:'./static/img/del_write.png',
                imgList: [],
                imgLista:[],
                datas: new FormData(),
                files:0,
                size:0,
                file_src:[],
                text_tribal:'',
                num_text:0,
                ready:false,
                images:[],
                maxSize:9,
                jia_imgs:''
       
            }
        },


         computed:{
 
       },
        created() {
        
            
                 
        },
        mounted() {


   



            // wx.config({
            //         debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            //         appId: 'wx1831b622b7904e1a', // 必填，公众号的唯一标识
            //         timestamp:'1584090087', // 必填，生成签名的时间戳
            //         nonceStr: 'KNG631yKxN', // 必填，生成签名的随机串
            //         signature: '0538c4686261278c8c643ffbb880c14c2cc0cfd1',// 必填，签名
            //             jsApiList: ['chooseImage','uploadImage','getLocalImgData','downloadImage'],
            // });

            //     wx.ready(function () {
            //     // 在这里调用 API
            //     wx.checkJsApi({
            //     jsApiList: [
            //         'chooseImage',
            //         'uploadImage',
            //         'getLocalImgData',
            //         'downloadImage'
            //     ],
            //     success: function (res) {
            //         console.log(JSON.stringify(res));
            //     }

            //     })




               
     

            this.$axios.post("wx-share",{
                  url:'https://club.xindongguoji.com/'
              },{headers: {
                'Authorization': localStorage.getItem('token_type') + localStorage.getItem('access_token'),
            }})
                .then(res=>{
                    if(res.status==200){
                            console.log(res)
                            // console.log(Base64.decode(res.data.data))
                            wx.config({
                                debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                                appId: res.data.appId, // 必填，公众号的唯一标识
                                timestamp:res.data.timestamp, // 必填，生成签名的时间戳
                                nonceStr: res.data.nonceStr, // 必填，生成签名的随机串
                                signature: res.data.signature,// 必填，签名
                                 jsApiList: ['chooseImage','uploadImage','getLocalImgData','downloadImage'],
                        });

                          wx.ready(function () {
                            // 在这里调用 API
                            wx.checkJsApi({
                            jsApiList: [
                                'chooseImage',
                                'uploadImage',
                                'getLocalImgData',
                                'downloadImage'
                            ],
                            success: function (res) {
                                console.log(JSON.stringify(res));
                            }

                          })
                      });
                            
                
                            


                  }else{
                  }
            
                })
                .catch(err=>{
                    console.log(err)
                      this.ready = false
                })

        
                     

        },
        methods: {
           


           // 通过localId读取对应的图片数据，同时通过【window.__wxjs_is_wkwebview】判断是否IOS微信6.5.3以上的版本，然后把localId转为Base64图片格式。另外通过$emit把读到的文件数据传给画面组件。
            add (e) {

                let _this=this
                  let count = 9-_this.images.length
                  wx.chooseImage({  
                    count: count,  
                    needResult: 1,  
                    sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有  
                    sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有  
                    success: function (data) { 
                        let localIds=data.localIds
                        if(window.__wxjs_is_wkwebview) {    //判断ios是不是用的 wkwebview 内核
                         _this.iosPreview(localIds);       
                        // ios 转为 base 64
                        } else {
                            localIds.forEach((item,index) => {
                                _this.images.push(item);
                                _this.uploadImg(item,index);
                            })
                         }
                },  
                fail: function (res) {            
                    alterShowMessage("操作提示", JSON.stringify(res), "1", "确定", "", "", "");  
                    }    
                });  
       
               

            },


            iosPreview(localIds){
                let _this=this
                for(let i = 0; i < localIds.length; i++) {
                      _this.uploadImg(localIds[i],i);
                       wx.getLocalImgData({
                        localId: localIds[i],
                        success: function(res) {
                            let localData = res.localData;
                            localData = localData.replace('jgp', 'jpeg');
                            _this.images.push(localData);
                        
                        },
                        fail: function() {
                            // 这个是ui组件的弹出框，不用管
                            Toast.text({duration: 700, message: '选择多张失败'});
                        }
                    })
                    // _this.readImage(localIds[i]);
                }
            },


            uploadImg(e,i) {
                let _this=this
                wx.uploadImage({  
                    localId: e, // 需要上传的图片的本地ID，由chooseImage接口获得  
                    isShowProgressTips: 0, // 默认为1，显示进度提示  
                    success: function (res) {                                        
                        let mediaId = res.serverId;     
                        _this.imgList.push(mediaId)     
                        alert(mediaId)
                              
                    
                    },  
                    fail: function (error) {  
                        picPath = '';  
                        localIds = '';  
                        alert(Json.stringify(error));          
                    }          
                });  
            },  



           remove(index){
               this.images.splice(index, 1);
               this.imgList.splice(index, 1);


           },

          
            




            okfall() {
                this.showa = false;
            },
            write_tribal(){
                console.log(this.text_tribal)
                this.num_text=this.text_tribal.length
            },
            blurEvent () {
                // 将滚动拉到底
                setTimeout(() => {
                    let scrollHeight = document.documentElement.scrollTop || document.body.scrollTop || 0
                    window.scrollTo(0, Math.max(scrollHeight - 1, 0))
                }, 100)
            },
            to_uplode(){
                let _this=this;
                // _this.lode_end=true;
                let imgList=this.imgList;
                if(imgList.length==0&&_this.text_tribal==''){
                    _this.showa=true;
                    _this.show_tip='不能发表空内容哦！'
                    return
                }

                this.$axios.post("dynamics", {
                    "club_id": localStorage.getItem('club_id'),
                    "contents": _this.text_tribal,
                    "image_tmps": imgList,
                    // "media_ids":imgList
                },{
                    headers: {
                        'Authorization': localStorage.getItem('token_type') + ' '+localStorage.getItem('access_token'),
                 }}
                ).then(res=>{
                    _this.lode_end=false;
                    console.log(res)
                    if(res.status==201){
         
                        _this.hidea=true;
                        _this.hide_tip='发表成功';
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
                        _this.lode_end=false;
                        _this.showa=true;
                        _this.show_tip=err;
                    })


            },
            go_home(){
                this.$router.push({ path: '/'}) // -> /user
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
            //从相册选择照片
            galleryImgs() {
                plus.gallery.pick(function(e) {
                    let name = e.substr(e.lastIndexOf('/') + 1);
                    compressImage(e,name);
                }, function(e) {
                }, {
                    filter: "image"
                });

            },
            //点击事件，弹出选择摄像头和相册的选项
            showActionSheet() {
                let bts = [{
                    title: "拍照"
                }, {
                    title: "从相册选择"
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
                let _this=this
                this.files=$("#upload_file").get(0).files;
                console.log(this.files.length);
                if(this.files.length > 9 - this.imgList.length){
                           _this.hidea=true;
                        _this.hide_tip='最多能选择9张图片哦';
                        setTimeout(function(){
                            _this.hidea=false;
                        },1500)
                }


                for(let i=0;i<this.files.length;i++){
                    this.datas.append("file",this.files[i]);
                }
                this.show1=false;
              
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
                        quality: 0.7    //自定义使用压缩方式
                    }).then(function(rst) {
                            //成功时执行
                            _this.imgList.push(rst.base64);
                            var imgsl=_this.imgList
                            _this.imgList=imgsl.slice(0,9);

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
                            quality: 0.7    //自定义使用压缩方式
                        }).then(function(rst) {
                                //成功时执行
                                _this.imgList.push(rst.base64);
                            var imgsl=_this.imgList
                            _this.imgList=imgsl.slice(0,9);
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


             fileDela(index) {
//                this.size = this.size - this.imgList[index].file.size;//总大小
                this.images.splice(index, 1);
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
