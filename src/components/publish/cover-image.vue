<template>
  <div class="cover-image">
      <!-- 生成封面图片 -->
      <div @click="openLayer(index)" class="cover-item" v-for="(item,index) in images" :key="index">
          <img :src="item?item:defaultImg" alt="">
      </div>
      <!-- 弹层组件 内有visible参数 参数为true时弹层显示 close为组件的关闭事件-->
      <el-dialog @close="dialogVisible=false" :visible="dialogVisible">
          <!-- 监听谁接在谁的标签上写监听(监听子传递的数据) -->
          <select-image @seletcOneImg="receiveImg"></select-image>
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
      dialogVisible: false, // 弹层参数
      selectIndex: -1 // 定义点击图片默认索引
    }
  },
  methods: {
    // 弹层
    openLayer (index) {
      this.dialogVisible = true
      this.selectIndex = index // 将当前点击的索引给data中的一个属性
    },
    // 接收
    receiveImg (url) {
      // 自定义事件传出
      this.$emit('selectImg', url, this.selectIndex)
      this.dialogVisible = false
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
