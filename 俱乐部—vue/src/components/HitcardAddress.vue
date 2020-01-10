<template>
    <div style="background: #f7f7f7;min-height: 100vh">
        <Header :title="title" :show="show" :backpage="backpage"></Header>

        <baidu-map class="map" :center="center" :zoom="zoom">
            <bm-marker :position="center" :dragging="true" animation="BMAP_ANIMATION_BOUNCE">
                <bm-label :content="address_name" :labelStyle="{color: 'red', fontSize : '12px'}" :offset="{width: -35, height: 30}"/>
            </bm-marker>
        </baidu-map>

        <div class="float" >
            <a href="http://uri.amap.com/marker?position=116.404,39.915&name=北京天安门&coordinate=gaode&callnative=1">高德</a>
            <a  href="http://api.map.baidu.com/marker?location=116.404,39.915&title=北京天安门&content=北京天安门广场&output=html">百度</a>
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
                center: {lng: this.$route.query.lng, lat: this.$route.query.lat},
                zoom: 15,
                address_name:this.$route.query.address_name
            }
        },
        created() {
//            this.center.lng=this.$route.query.lng;
//            console.log(this.center.lng)


        },
        mounted() {

        },
        methods: {
            okfall(){
                this.showa=false;
            },
        }

    }
</script>

<style scoped>

    /**index.wxss**/



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
