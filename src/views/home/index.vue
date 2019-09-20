<template>
<!-- 大容器 -->
<el-container>
  <el-aside style="width:200px">
    <!-- 使用左导航组件 -->
    <layout-aside></layout-aside>
  </el-aside>
  <el-container>
    <el-header>
    <!-- 头组件 -->
    <layout-header></layout-header>
    </el-header>
    <el-main>
      <!-- 二级路由的容器 -->
      <router-view></router-view>
    </el-main>
  </el-container>
</el-container>
</template>

<script>
import layoutAside from '../../components/home/layout-aside'
import layoutHeader from '../../components/home/layout-header'
export default {
  components: {
    'layout-aside': layoutAside,
    'layout-header': layoutHeader
  }
}
</script>

<style>

</style>
