<template>
    <div  style="background: #f0f0f0;min-height: 100vh">
         <Header :title="title" :show="show" :backpage="backpage"></Header>
        
        
         <div class='jine'> <span>￥</span> {{active_info.need_pays/100}}</div>
         <div class='zhifu' @click="to_pay()">确认支付</div>


        <Eject  type='alert'  @took='okfall' :showstate='showa'  >
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
        name: '',
                components: { Header,Eject },
    
        data() {
            return {
                showa:false,
                show_tip:'',
                hide_tip:'',
                hidea:false,
                title: '确认支付',
                show: true,
                backpage: '',
                issue_id:'',
                active_id:'',
                active_info:[],
                order_id:10
            }
        },
        created() {
            let _this=this;      
            _this. active_id=localStorage.getItem('active_id')
                _this.active_detail()
    

        },
        mounted() {

            const baseurl = "https://front.club.xindongguoji.com/wechats/#/paypage"
            const  redirectURL = encodeURIComponent(baseurl);//获取地址
            console.log(redirectURL)
            console.log(this.getUrlParam().code)


        },
        methods: {
             getUrlParam () {
                  var url = location.search
                this.winUrl = url
                var theRequest = new Object()
                if (url.indexOf("?") != -1) {
                    var str = url.substr(1)
                    var strs = str.split("&")
                    for(var i = 0; i < strs.length; i ++) {
                        theRequest[strs[i].split("=")[0]]=(strs[i].split("=")[1])
                    }
                }
                return theRequest
        



             },
             getUserCode() {
                    const baseurl = "https://front.club.xindongguoji.com/wechats/#/paypage"
                    const  redirectURL = encodeURIComponent(baseurl);//获取地址
//                    const  redirectURL = encodeURI((baseurl + window.location.pathname + window.location.search).split('&code')[0]);//获取地址
                    const base = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx1831b622b7904e1a';
                    let state;
                    let surl;
                    let reserveUrl;
                    let appid ="wx1831b622b7904e1a";
                    let scope = "1";
                    window.location.href =base +'&redirect_uri='+ redirectURL +'&response_type=code&scope=snsapi_base&state=123#wechat_redirect';
                },

            to_pay(){
                let _this=this
                //  let issue_nums=localStorage.getItem('issue_nums');
                // let id=localStorage.getItem('active_id');
                // if(issue_nums==0){
                //     _this.$router.push({ path: '/activedetailshort',query:{id:id}}) // -> /user
                // }else{
                //     _this.$router.push({ path: '/activedetail',query:{id:id}}) // -> /user
                // }
           
               var code= this.getUrlParam().code
               console.log(code)
               if(!code){
                   this. getUserCode();
               }

               if(code){
                   this.tosing(code)
               }
            
            },

            tosing(code){
                let _this=this
               
                            _this.$axios.post("/activity-users",
                                {
                                    "act_id": localStorage.getItem('active_id'),
                                      "code":code
                                },{
                                    headers: {
                                        'Authorization': localStorage.getItem('token_type') + localStorage.getItem('access_token'),
                                    }
                                }).then(res=>{
                                if(res.status==200){
                                    _this.order_id=res.data.data.order_id
                                if (typeof WeixinJSBridge == "undefined"){
                                    console.log(res)
                                        if( document.addEventListener ){
                                            document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
                                        }else if (document.attachEvent){
                                            document.attachEvent('WeixinJSBridgeReady', onBridgeReady); 
                                            document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
                                        }
                                    }else{
                                              console.log(res.data.data.appId)
                                       WeixinJSBridge.invoke(
                                            'getBrandWCPayRequest', {
                                                "appId":res.data.data.appId,    //公众号名称，由商户传入     
                                                "timeStamp":res.data.data.timeStamp,         //时间戳，自1970年以来的秒数     
                                                "nonceStr":res.data.data.nonceStr, //随机串     
                                                "package":res.data.data.package,     
                                                "signType":res.data.data.signType,         //微信签名方式：     
                                                "paySign":res.data.data.paySign //微信签名 
                                            },
                                            function(res){
                                                console.log("ccc")
                                            if(res.err_msg == "get_brand_wcpay_request:ok" ){
                                                    //res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
                                                   _this.order_get()

                                                  
                                            } 
                                        }); 
                                    }

                                   
                                }else{
                                    _this.showa=true;
                                    _this.show_tip=res.data.message;
                                    return
                                }
                            })
                                .catch(err=>{
                                })  


            },


            order_get(){
                let _this=this
                _this.$axios.get("/paid-orders/"+ _this.order_id,{
                    headers: {
                        'Authorization': localStorage.getItem('token_type') + localStorage.getItem('access_token'),
                    },
                    params:{
                    }
                }).then(res=>{
                    if(res.status==201){
                        console.log(res)
                        _this.hidea=true;
                        _this.hide_tip='报名成功';
                        setTimeout(function(){
                            _this.hidea=false;
                            _this.$router.push({path: '/myactive'})
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



            

            active_detail(){
                let _this=this
                _this.$axios.get("/activities/"+ _this.active_id,{
                    headers: {
                        'Authorization': localStorage.getItem('token_type') + localStorage.getItem('access_token'),
                    },
                    params:{
                    }
                }).then(res=>{
                    if(res.status==200){
                        _this.active_info=res.data.data;

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
                this.showa=false
            },

        
        }

    }
</script>

<style scoped>

  .jine{
      width:100%;
      height:0.8rem;
      font-size: 0.8rem;
      color: #1a1a1a;
      text-align: center;
      margin-top:30vh;
      font-weight: bold;

  }

  .zhifu{
      width:5rem;
      height:1rem;
      background: #f7282f;
      border-radius: 0.1rem;
      margin:auto;
      margin-top:15vh;
      color: #fff;
      font-weight: bold;
      text-align: center;
      line-height: 1rem;
      font-size: 0.36rem;

  }

  .jine>span{
      font-size: 0.5rem;
  }


</style>
