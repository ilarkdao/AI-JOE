<template>
  <div class="loading"></div>
</template>

<script>
    export default {
        name: "SmallLoading"
    }
</script>

<style scoped>
  .loading {
    margin: 0 auto;
    background: url('../../static/images/smallloading.gif') center center no-repeat #fff;
    /*width: 20%;*/
    width: 8vw;
    /*height: 20%;*/
    height: 8vh;
    z-index: 1000;
  }
</style>
