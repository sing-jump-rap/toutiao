<template>
  <div class="cover-image">
      <!-- 生成封面图片 -->
      <div @click="openLayer" class="cover-item" v-for="(item,index) in images" :key="index">
          <img :src="item?item:defaultImg" alt="">
      </div>
      <!-- 弹层组件 内有visible参数 参数为true时弹层显示 close为组件的关闭事件-->
      <el-dialog @close="dialogVisible=false" :visible="dialogVisible">
          <select-image></select-image>
      </el-dialog>
  </div>
</template>

<script>
export default {
  props: ['images'],
  data () {
    return {
      //   require一个路劲
      defaultImg: require('../../assets/img/pic_bg.png'),
      dialogVisible: false // 弹层参数
    }
  },
  methods: {
    // 弹层
    openLayer () {
      this.dialogVisible = true
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
        width: 220px;
        height: 220px;
        img{
            width: 100%;
            height: 100%;
        }
    }
}
</style>
