<template>
    <div class='kz-cont' v-show='showstate'>
        <div class='kz-wrapper' >
            <div class='kz-text-box'>
                <div class="kz-text">
                   <strong><slot name='text' ></slot></strong>
                </div>
            </div>
            <div class='footer'>
                <div v-show="cancel" @click='tocancel' class='kz-btn'>取消</div>
                <div class='kz-btn' @click='took'>确定</div>
            </div>
        </div>
    </div>
</template>
<script>
    export default{
        name:'eject',
//        props:['type','showstate'],
        props:{
            type:'',
            showstate:'',
            cancel:false
        },
        methods:{
            tocancel:function(){
                this.$emit('tocancel');
            },
            took:function(){
                this.$emit('took');
            }
        }
    }
</script>
<style scoped>
    .kz-cont{position:fixed;left:0;right: 0;top:0;bottom: 0;margin:auto;width:100%;height:100vh;z-index: 9999;background:rgba(0,0,0,0.5);text-align:center;overflow: hidden;}
    .kz-wrapper{display:block;background:#fff;color:#333333;border-radius: 5px;width:80%;position: absolute;left:0;right: 0;top:0;bottom: 0;margin:auto;height:100px}
    .kz-text-box{width:100%;
    height:60px;padding:20px 10px;box-sizing: border-box;display: flex;align-items: center}
    .kz-text{text-align:center;width:100%;height:auto;line-height: 16px;}
    .footer{display:flex;border-top:1px solid #E5E5E5;color:#488BF1;position: absolute;bottom:0;left:0;width:100%;}
    .kz-btn{flex:1;padding: 12px;}
    .kz-btn +.kz-btn{border-left:1px solid #E5E5E5;}
</style>
