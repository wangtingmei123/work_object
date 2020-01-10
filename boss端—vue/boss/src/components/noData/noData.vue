<template>
  <div class="no-data">
    <p class="desc">{{title}}</p >
  </div>
</template>

<script>
    export default {
        name: "noData",
      props: {
        title: {
          type: String,
          default: '暂无数据...'
        }
      }
    }
</script>

<style scoped>
  .no-data {
    width: 100%;
    text-align: center;
    font-size: 18px !important;
    color: #999;
  }
</style>
