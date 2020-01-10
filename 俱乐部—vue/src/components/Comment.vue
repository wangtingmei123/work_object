<template>
    <div style="background: #f7f7f7;min-height:100vh;overflow: hidden">
        <Header :title="title" :show="show" :backpage="backpage"></Header>
        <div class="comment_box">
            <div class="comment">
                <div class="comment1">
                    <div class="comm1_tip"></div>
                    <div class="comm1">整体评价</div>
                </div>
                <div class="comment2">
                    <div class="comm2" @click="select(1)">
                        <img v-show="comment_select!=1" class="comm2_img" :src="comm21_img1" alt="">
                        <img v-show="comment_select==1" class="comm2_img" :src="comm21_img2" alt="">
                        <div class="comm21" :class="{'comment_select':comment_select==1}">好评</div>
                    </div>
                    <div class="comm2" @click="select(2)">
                        <img v-show="comment_select!=2" style="width:0.36rem;height:0.39rem" class="comm2_img" :src="comm22_img1" alt="">
                        <img v-show="comment_select==2" style="width:0.36rem;height:0.39rem" class="comm2_img" :src="comm22_img2" alt="">
                        <div class="comm21" :class="{'comment_select':comment_select==2}">中评</div>
                    </div>
                    <div class="comm2" @click="select(3)">
                        <img v-show="comment_select!=3" style="width:0.34rem;height:0.35rem" class="comm2_img" :src="comm23_img1" alt="">
                        <img v-show="comment_select==3" style="width:0.34rem;height:0.35rem" class="comm2_img" :src="comm23_img2" alt="">
                        <div class="comm21" :class="{'comment_select':comment_select==3}">差评</div>
                    </div>
                </div>


            </div>
            <div class="comment_center">
                <div class="comment_c">
                    <div class="commc">活动场地</div>
                    <div class="commx">
                        <div class="img" v-for="score in scores "  @click="tochscore(score,1)">
                            <img v-show="score_select1<score" :src="scorea" alt="" >
                            <img style="width:0.35rem;height:0.33rem" class="score_select" v-show="score_select1>=score" :src="score_select" alt="" >
                        </div>
                    </div>
                </div>
                <div class="comment_c">
                    <div class="commc">活动内容</div>
                    <div class="commx">
                        <div class="img" v-for="score in scores "  @click="tochscore(score,2)">
                            <img v-show="score_select2<score" :src="scorea" alt="" >
                            <img style="width:0.35rem;height:0.33rem" class="score_select" v-show="score_select2>=score" :src="score_select" alt="" >
                        </div>
                    </div>
                </div>
                <div class="comment_c">
                    <div class="commc">组织管理</div>
                    <div class="commx">
                        <div class="img" v-for="score in scores "  @click="tochscore(score,3)">
                            <img v-show="score_select3<score" :src="scorea" alt="" >
                            <img style="width:0.35rem;height:0.33rem" class="score_select" v-show="score_select3>=score" :src="score_select" alt="" >
                        </div>
                    </div>
                </div>
            </div>
            <div class="comment_word">
                <div class="comment1" style="border:none">
                    <div class="comm1_tip"></div>
                    <div class="comm1">文字评价</div>
                </div>
                <div class="comm_word">
                    <textarea maxlength="10" v-model="comment_text"  placeholder="请描述活动的不足之处，不要超过10个字哦" name="" id="" cols="30" rows="10" @blur="blurEvent"></textarea>
                </div>
            </div>
        </div>
        <div class="creat_club" @click="to_comment">发表评价</div>
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
        components:{
            Header,
            Eject
        },
        name: '',
        data() {
            return {
                hide_tip:'',
                hidea:false,
                showa:'',
                show_tip:'',
                title: '发表评价',
                show: true,
                backpage: '',
                comment_select:1,
                comment_text:'',
                scorea:'./static/img/29evalu_18.png',
                score_select:'./static/img/29evalu_15.png',
                comm21_img1:'./static/img/29evalus_06.png',
                comm21_img2:'./static/img/29evalu_06.png',
                comm22_img1:'./static/img/29evalu_03.png',
                comm22_img2:'./static/img/29evalus_03.png',
                comm23_img1:'./static/img/29evalu_09.png',
                comm23_img2:'./static/img/29evalus_09.png',
                scores:[1,2,3,4,5],
                score_select1:5,
                score_select2:5,
                score_select3:5
            }
        },
        created() {

        },
        mounted() {

        },
        methods: {
            blurEvent () {
                // 将滚动拉到底
                setTimeout(() => {
                    let scrollHeight = document.documentElement.scrollTop || document.body.scrollTop || 0
                    window.scrollTo(0, Math.max(scrollHeight - 1, 0))
                }, 100)
            },
            okfall(){
                this.showa=false;
            },
            to_comment(){
                let _this=this
                console.log(this.comment_select)
                console.log(this.score_select1)
                console.log(this.score_select2)
                console.log(this.score_select3)
                console.log(this.comment_text)

                // this.$router.push({ path: '/clubindex'}) // -> /user
                if(this.comment_text==''){
                    this.showa=true;
                    this.show_tip='请输入文字评价'

                }

                _this.$axios.post("/activity-comments  ",{
                    'act_id':localStorage.getItem('active_id'),
                    'global_eval':_this.comment_select,
                    'place_rank':_this.score_select1,
                    'comment_rank':_this.score_select2,
                    'organize_rank':_this.score_select3,
                    'content':_this.comment_text
                }, {headers: {
                    'Authorization': localStorage.getItem('token_type') + localStorage.getItem('access_token'),
                }})
                    .then(res=>{
                        if(res.status==200){
                            _this.hidea=true;
                            _this.hide_tip='评价成功';
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






            },
            select(sele){
                this.comment_select=sele
            },
            tochscore(score,num){
                if(num==1){
                    this.score_select1=score
                }
                if(num==2){
                    this.score_select2=score
                }
                if(num==3){
                    this.score_select3=score
                }
            }
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
        background: #ff5757;
        color: #fff;
        text-align: center;
        line-height:0.9rem;
        font-size: 0.3rem;
        /*font-weight: bold;*/
        border-radius: 0.1rem;

    }
    .comm_word{
        width:6.6rem;
        height:2rem;
        background: #f8f8f8;
        padding:0.25rem;
        box-sizing: border-box;
        margin:auto;
    }
    .comm_word>textarea{
        width:100%;
        height:100%;
        border:none;
        background: #f8f8f8;
        resize:none
    }
    .comm_word>textarea:focus{
        outline: none;
    }
    .comm_word>textarea::placeholder{
        color: #a7a7a7;
        
    }

    .comment_word{
        width:7.1rem;
        height:3.5rem;
        margin:auto;
        margin-top:0.15rem;
        background: #fff;
    }

    .comment_center{
        width:7.1rem;
        height:2.36rem;
        background: #fff;
        margin:auto;
        margin-top:0.15rem;
        padding:0.22rem 0.15rem;
        box-sizing: border-box;


    }

    .comment_c{
        width:4.88rem;
        height:0.64rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .commx{
        width:2.95rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .commx>.img{
        width:0.36rem;
        height:0.36rem;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .commx>.img>img{
        display: block;
        width:0.34rem;
        height:0.34rem;
    }
  .comment_box{
      width:100%;
      height:auto;
      margin-top:1rem;

  }
    .comment{
        width:7.1rem;
        height:2rem;
        margin:auto;
        background: #fff;
    }

    .comment1{
        width:6.8rem;
        height:1rem;
        margin:auto;
        display: flex;
        align-items: center;
        border-bottom:1px solid #e6e6e6;
        box-sizing: border-box;

    }

  .comment1 .comm1_tip{
      width:0.04rem;
      height:0.3rem;
      background: #fe4442;
      border-radius: 0.04rem;
  }
  .comment1 .comm1{
      font-size: 0.28rem;
      color: #1a1a1a;
      margin-left:0.1rem;
      font-weight: bold;
  }

    .comment2{
        width:5.45rem;
        height:1rem;
        margin-left:0.15rem;
        display: flex;
        align-items: center;
        justify-content: space-between;

    }
  .comment2>.comm2{
      width:1.08rem;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;

  }

  .comment2>.comm2>img{
      display: block;
      width:0.32rem;
      height:0.37rem;
  }
  .comment2>.comm2>.comm21{
      font-size: 0.28rem;
      color: #999999;
  }

  .comment2>.comm2>.comment_select{
        color: #fe4442;
    }
</style>
