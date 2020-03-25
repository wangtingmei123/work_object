<template>
    <div class="invited_box_bg" style="background: #f7282f;height:100vh; overflow: hidden">
        <Header :title="title" :show="show" :backpage="backpage"></Header>
        <div class="share_box">
             <div class="share_top_box">
        
                    <div class="share2">
                        {{company_name}}
                    </div>
              </div>

             <div class="share_but">
                 <div id="QRCodeNone"  class="share_erweim_a" style="display:none;"></div>
                  <div class="share_erweim" id="qrcode" ref="qrcode"></div>
             </div>

             <div class="share_tip">长按扫码加入企业</div>
        </div>

        
        <Eject  type='alert' @took='okfall' :showstate='showa'>
            <span slot='tlt'>提示</span>
            <div slot='text'>{{show_tip}}</div>
        </Eject>
    </div>
</template>


<script>
    import Eject from './eject'
    import Header from './Header'
    import QRCode from 'qrcodejs2'
    export default {
        components: {
            Header:Header,
            Eject
        },
        name: '',
        data() {
            return {
                title: '邀请加入企业',
                show: false,
                backpage: '/',
                showa:false,
                show_tip:'',
                share_logo:'./static/img/41yaoqing_07.jpg',
                share_address:'./static/img/41yaoqing_11.png',
                club_id:"",
                company_id:"",
                company_name:''
            

            }
          
        },
        created() {
            this.company_id=this.$route.query.company_id;
            this.commany()
             this.$nextTick(() => {

                this.qrcode();

         });



        },
        mounted() {
             let _this=this
               var link='https://club.xindongguoji.com/'+'?#/commpanyshare?company_id='+_this.$route.query.company_id
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
                                jsApiList: ['onMenuShareAppMessage','onMenuShareTimeline','onMenuShareQQ','onMenuShareQZone','onMenuShareWeibo'] // 必填，需要使用的JS接口列表
                            });

                        wx.ready(function(){
                                wx.onMenuShareAppMessage({
                                    title: '邀请加入', // 分享标题
                                    desc: '邀请您加入'+_this.company_name, // 分享描述
                                    link: link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                                    imgUrl: '', // 分享图标
                                    success: function () {
                                        // 设置成功
                                    }

                                })
                                // 自定义“分享到朋友圈”及“分享到QQ空间”按钮的分享内容（1.4.0）最新接口
                                wx.onMenuShareTimeline({
                                    title: '邀请加入', // 分享标题
                                    link: link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                                    imgUrl: '', // 分享图标
                                    success: function () {
                                        // 设置成功
                                    }

                                })
                        })


                        //通过error接口处理失败验证
                        wx.error(function(res){
                            console.log(res)
                            // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
                        });
                  }else{
                  }
            
                })
                .catch(err=>{
                    console.log(err)
                })

    
                            
        },
        methods: {

            commany(){
                let _this=this
                _this.company_id=_this.$route.query.company_id

            this.$axios.post("/invitationCodes",{
                "type":"company", // 邀请类型
                "id":_this.company_id// 可选
            })
                .then(res=>{
                    if(res.status==200){
                        _this.company_name=res.data.company_name;
                    }else{
                        _this.showa=true;
                        _this.show_tip=res.data.message;
                        return
                    }
                })
                .catch(err=>{
                    console.log(err)
                })
            },




            qrcode () {
                let _this=this;
                const W = document.documentElement.clientWidth; 
                const rate = 750 / W;
                const code_w = 248 / rate;
                const code_h = 248 / rate;

                let qrcode = new QRCode(document.getElementById("QRCodeNone"), {
                          width: code_w, // 二维码宽度，单位像素
                          height: code_h, // 二维码高度，单位像素
                          text: "https://club.xindongguoji.com/#/businessinvitation?company_id="+_this.company_id// 生成二维码的链接
                    });
                var myCanvas = document.getElementsByTagName('canvas')[0];
                var img = _this.convertCanvasToImage(myCanvas);
  
                $("#qrcode").append(img);

            },

            convertCanvasToImage(canvas){
                var image = new Image();
                image.src = canvas.toDataURL("image/png");
                return image;
            },


         
            okfall(){
                this.showa=false;
            },
        },
     
    }
</script>

<style scoped>

   .share_tip{
       width:100%;
       height:0.9rem;
       background: #f6f5f5;
       color: #a6a6a6;
       font-size: 0.3rem;
       line-height:0.9rem;
       text-align: center;
       position: absolute;
       bottom:0;
       left:0;
       right:0;
       margin:auto;
   }

    .share_but{
        width:5.2rem;
        height:3.66rem;
        margin:auto;
        margin-top:1.35rem;
        border-top:1px solid #f0f0f0;
    }

    .share_erweim_a{
        width: 2.48rem;
        height:2.48rem;
        margin:auto;
        margin-top:1.38rem;
         overflow: hidden;
    }

    .share_erweim{
        width: 2.48rem;
        height:2.48rem;
        margin:auto;
        margin-top:1.38rem;
        overflow: hidden;
    }




    .share_box{
        width:5.98rem;
        height:10.02rem;
        background: #fff;
        border-radius: 0.12rem;
        margin:auto;
        margin-top:1.5rem;
        margin-bottom:0.4rem;
        overflow: hidden;
        position: relative;
       
    }

    .share_top_box{
        width:100%;
        height:auto;
        margin:auto;
        margin-top:1.95rem;

    }
    .share_top_box>.share1{
        width: 1.8rem;
        height:1.8rem;
        border-radius: 0.1rem;
        margin:auto;

    }
      .share_top_box>.share1>img{
          width:100%;
          height:100%;
          object-fit: cover;
      }
      .share_top_box>.share2{
          width:100%;
          height:0.32rem;
          text-align: center;
          font-size: 0.32rem;
          color: #4d4d4d;
          font-weight: bold;
          margin-top:0.23rem;
      }

      .share_top_box>.share3{
          width:100%;
          height:0.4rem;
          text-align: center;
          font-size: 0.32rem;
          color: #4d4d4d;

          margin-top:0.2rem;
          display: flex;
          justify-content: center;
          
      }
       .share_top_box>.share3>.share31{
           width:auto;
           height:0.4rem;
           border-radius: 0.4rem;
           background: #f7282f;
           color: #fff;
           padding:0 0.22rem;
           font-size: 0.24rem;
           line-height: 0.4rem;

       }

         .share_top_box>.share3>.share32{
           width:auto;
           height:0.4rem;
           color: #acacac;
                font-size: 0.24rem;
           line-height: 0.4rem;
           margin-left:0.1rem;
           
       }

         .share_top_box>.share4{
              width:100%;
          height:0.28rem;
          text-align: center;
          font-size: 0.26rem;
          color: #a6a6a6;
          margin-top:0.24rem;
          display: flex;
          align-items: center;
          justify-content: center
     
         }
      .share_top_box>.share4>img{
          width:0.19rem;
          height:0.27rem;
      }

     .share_top_box>.share4>span{
         font-size: 0.26rem;
         margin-left:0.06rem;

      }



  
</style>
