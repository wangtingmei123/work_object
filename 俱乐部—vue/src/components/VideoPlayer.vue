<template>
    <div  style="min-height: 100vh;  overflow: hidden">
         <Header :title="title" :show="show" :backpage="backpage"></Header>
        
          <video-player
          style="margin-top:1rem"
           class="video-player vjs-custom-skin"
            ref="videoPlayer"
            :playsinline="true"
            :options="playerOptions1"
            @play="onPlayerPlay($event)"
            @pause="onPlayerPause($event)"
            @ended="onPlayerEnded($event)"
            @loadeddata="onPlayerLoadeddata($event)"
            @waiting="onPlayerWaiting($event)"
            @playing="onPlayerPlaying($event)"
            @timeupdate="onPlayerTimeupdate($event)"
            @canplay="onPlayerCanplay($event)"
            @canplaythrough="onPlayerCanplaythrough($event)"
            @ready="playerReadied"
            @statechanged="playerStateChanged($event)">
        </video-player>


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
        import { videoPlayer } from 'vue-video-player'
        import 'video.js/dist/video-js.css'

    export default {
        name: '',
                components: { Header,Eject,videoPlayer },
    
        data() {
            return {
                showa:false,
                show_tip:'',
                hide_tip:'',
                hidea:false,
                title: '视频',
                show: true,
                backpage: '',
                paused: true,
                learningDuration: {
                id: '',
                userId: '',
                type: '0',
                examinationId: '',
                finishFlag: '0',
                durations: ''
              },
                playerOptions1: {
                // playbackRates: [1.0], // 播放速度
                autoplay: false, // 如果true,浏览器准备好时开始回放。
                muted: false, // 默认情况下将会消除任何音频。
                loop: false, // 导致视频一结束就重新开始。
                preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
                language: 'zh-CN',
                aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
                fluid: false, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
                sources: [{
                // src: '../../static/video/test.mp4', // 路径
                src: '../../static/video/7111854a89f45eb3c1ab1f9e67e3447c.mp4'
                // type: 'video/mp4' // 类型
                },
                {
                // src: '../../static/video/test.mp4', // 路径
                src: '../../static/video/7111854a89f45eb3c1ab1f9e67e3447c.mp4'
                // type: 'video/mp4' // 类型
                }],
                // poster: '../../../static/images/home/cnooc.png', // 你的封面地址
                // width: document.documentElement.clientWidth,
                notSupportedMessage: '此视频暂无法播放，请稍后再试', // 允许覆盖Video.js无法播放媒体源时显示的默认信息。
                controlBar: {
                timeDivider: true,
                durationDisplay: true,
                remainingTimeDisplay: false,
                fullscreenToggle: true // 全屏按钮
                }
            }




           
            }
        },
        created() {


            let _this=this;      

    

        },
        mounted() {

            this.putLearningObj()
    setInterval(this.putLearningObj, 3000)



        },
        methods: {



              putLearningObj () {
                if (!this.paused) {
                    putObj(this.learningDuration)
                    console.log('putLearningObj ~~~~~~~~~')
                }
                },
                // onPlayerPlay (player) {
                // this.paused = false
                // // console.log('onPlayerPlay!', player)
                // },
                // onPlayerPause (player) {
                // this.paused = true
                // // console.log('onPlayerPause!', player)
                // },
                // onPlayerEnded (player) {
                // this.paused = false
                // console.log('player ended!', player)
                // },


   //监听播放
            onPlayerPlay (player) {
                console.log(player);
                // this.$refs.videoPlayer.player.play();
            },
            //监听暂停
            onPlayerPause (player) {
                console.log(player);
                // this.$refs.videoPlayer.player.pause();
            },
            //监听播放状态改变
            playerStateChanged (player) {
                // console.log(player);
            },
            //监听媒体是否已到达结尾，播放完
            onPlayerEnded (player) {
                // console.log(player);
            },
            //DOM元素上的readyState更改导致播放停止。
            onPlayerWaiting (player) {
                // console.log(player);
            },
            //媒体不再被禁止播放，并且已开始播放。
            onPlayerPlaying (player) {
                // console.log(player);
            },
            //当播放器在当前播放位置下载数据时触发
            onPlayerLoadeddata (player) {
                // console.log(player);
            },
            //当前播放位置发生变化时触发。
            onPlayerTimeupdate (player) {
                // console.log(player);
            },
            //媒体的readyState为HAVE_FUTURE_DATA或更高
            onPlayerCanplay(player) {
                // console.log('player Canplay!', player)
            },
            //媒体的readyState为HAVE_ENOUGH_DATA或更高。这意味着可以在不缓冲的情况下播放整个媒体文件。
            onPlayerCanplaythrough(player) {
                // console.log('player Canplaythrough!', player)
            },
            //将侦听器绑定到组件的就绪状态。与事件监听器的不同之处在于，如果ready事件已经发生，它将立即触发该函数。。
            playerReadied(player) {
                // seek to 10s
                console.log('example player 1 readied', player);
                // player.currentTime(0)
                // console.log('example 01: the player is readied', player)
            }


           
        
        }

    }
</script>

<style scoped>


</style>


<style >
  .video-js .vjs-big-play-button{
      top:0;bottom:0;left:0;right:0;margin:auto
  }

  .vjs-icon-placeholder{
      
  }



</style>
