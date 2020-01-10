<template>
  <div id="app">
    <!--顶部 start-->
    <div class="title">
      <h3 @click="$router.history.go(-1)"><img class="titile_img" src="../assets/static/img/left.png" alt="">历史销售</h3>
      <div></div>
      <!--地址列表 end-->
    </div>
    <!--顶部 end-->
    <!--列表 start-->
    <ul class="histoty_list">
      <li>
        <router-link to="/everyReport" class="ripper">
          <div class="history_list_item_left">
            <img class="history_list_item_left_icon" src="../assets/static/img/11.png" alt="">门店日常营业报表
          </div>
          <img class="rightImg" src="../assets/static/img/right.png" alt="">
        </router-link>
      </li>
      <li>
        <router-link to="/stock" class="ripper">
          <div class="history_list_item_left">
            <img class="history_list_item_left_icon" src="../assets/static/img/22.png" alt="">库存台账
          </div>
          <img class="rightImg" src="../assets/static/img/right.png" alt="">
        </router-link>
      </li>
      <li>
        <router-link to="/maoriStore" class="ripper">
          <div class="history_list_item_left">
            <img class="history_list_item_left_icon" src="../assets/static/img/33.png" alt="">历史门店销售
          </div>
          <img class="rightImg" src="../assets/static/img/right.png" alt="">
        </router-link>
      </li>
      <li>
        <router-link to="/maoriCategory" class="ripper">
          <div class="history_list_item_left">
            <img class="history_list_item_left_icon" src="../assets/static/img/44.png" alt="">历史分类销售
          </div>
          <img class="rightImg" src="../assets/static/img/right.png" alt="">
        </router-link>
      </li>
      <li>
        <router-link to="/maoriSale" class="ripper">
          <div class="history_list_item_left">
            <img class="history_list_item_left_icon" src="../assets/static/img/55.png" alt="">历史商品销售
          </div>
          <img class="rightImg" src="../assets/static/img/right.png" alt="">
        </router-link>
      </li>
      <li>
        <router-link to="/loss" class="ripper">
          <div class="history_list_item_left">
            <img class="history_list_item_left_icon" src="../assets/static/img/66.png" alt="">门店损耗
          </div>
          <img class="rightImg" src="../assets/static/img/right.png" alt="">
        </router-link>
      </li>
    </ul>
    <!--列表 end-->
  </div>
</template>

<script>
  import '../assets/css/history.css'
  export default {
    name: "history",
    data() {
      return {
        list:[
          {
            title:'门店日常营业报表',img:'../assets/static/img/history.png',icon:'../assets/static/img/right.png'
          },
          {
            title:'门店报表',img:'../assets/static/img/history.png',icon:'../assets/static/img/right.png'
          },
        ]
      }
    }
  }
</script>

<style scoped>
.histoty_list {
  border-radius: 0;
}
</style>
