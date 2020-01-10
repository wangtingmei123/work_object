<template>
    <div>
        <header>
            <div v-if="show" @click="goback" class="goback"><img :src="back" alt=""> </div>
            <div class="title">{{title}}</div>
        </header>
    </div>
</template>


<script>
    export default {
        name: '',
        props:{
            title:'',
            show:true
        },
        data() {
            return {
                back:'./static/img/03index_03.png'
            }
        },
        created() {


        },
        mounted() {

        },
        methods: {
            goback(){
                this.$router.go(-1);

            }
        }

    }
</script>

<style scoped>

    header{
        width:7.5rem;
        height:0.88rem;
        position: fixed;
        top:0;
        left:0;
        right:0;
        margin:auto;
        background: #fff;
        z-index: 99;



    }
    header>.title{
        width:100%;
        height:100%;
        font-size:0.32rem;
        line-height:0.88rem;
        text-align: center;
        color: #000;
        letter-spacing:0.01rem;
        font-weight: bold;
    }
    header>.goback{
        position: absolute;
        width:0.18rem;
        height:0.3rem;
        top:0;
        bottom:0;
        margin:auto;
        left:0.3rem;
    }
    header>.goback>img{
        display: block;
        width:100%;
    }
</style>
