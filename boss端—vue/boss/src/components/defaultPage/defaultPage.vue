<template>
  <div class="default-page">
    <img src="../../assets/static/img/loading.gif" alt="">
  </div>
</template>

<script>
    export default {
        name: "defaultPage"
    }
</script>

<style scoped>
  .default-page {
    position: absolute;
    top: 50%;
    right: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    transform: translate(0,-50%);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  img {
    width: 50px;
    height: 50px;
  }
</style>
