<template>
  <div class="cover-image">
      <!-- 生成封面图片 -->
      <div class="cover-item" v-for="(item,index) in images" :key="index">
          <img :src="item?item:defaultImg" alt="">
      </div>
  </div>
</template>

<script>
export default {
  props: ['images'],
  data () {
    return {
      //   require一个路劲
      defaultImg: require('../../assets/img/pic_bg.png')
    }
  }
}
</script>

<style lang='less' scoped>
.cover-image{
    display: flex;
    margin: 10px 0;
    margin-left: 100px;
    .cover-item{
        border: 1px solid #000;
        padding: 10px;
        margin-right: 5px;
    }
}
</style>
