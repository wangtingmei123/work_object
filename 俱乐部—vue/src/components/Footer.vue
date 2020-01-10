<template>
    <div>
       <div class="footer">
           <router-link to="/select1" :class="{'select':select==1}">1</router-link>
           <router-link to="/select2" :class="{'select':select==2}">2</router-link>
           <router-link to="/select3" :class="{'select':select==3}">3</router-link>
       </div>

        <div class="sendMsg" @click="sendMsg">点击显示子组件传送给父组件的值</div>
    </div>
</template>


<script>
    export default {
        name: '',
        props:{
            select:''
        },
        data() {
            return {
                msg: "我是子组件的msg",
            }
        },
        created() {

        },
        mounted() {

        },
        methods: {
            sendMsg(){
                this.$emit('func',this.msg)
            }
        }

    }
</script>

<style scoped>

    .sendMsg{
        border:1px solid #f5f5f5;
        width:100%;
        height:1rem;
        position: fixed;
        bottom:1rem;
        font-size:0.3rem;
        text-align: center;
        line-height:1rem;

    }
    .footer{
        width:100%;
        height:1rem;
        position: fixed;
        bottom:0;
        display: flex;
        justify-content: space-around;
        border:1px solid #f5f5f5;
    }
    .footer>a{
        display: block;
        width:33.33%;
        height:100%;
        font-size:0.3rem;
        text-align: center;
        line-height:1rem;
        font-weight: bold;
        color: #000;
        border-right:1px solid #f5f5f5;
    }
    .footer>a:last-child{
        border:none
    }

    .footer .select{
        color: #ff6700;
    }


</style>
