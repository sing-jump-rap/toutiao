<template>
<!-- 大容器 -->
<el-container>
  <el-aside>
    <!-- 使用左导航组件 -->
    <layout-aside></layout-aside>
  </el-aside>
  <el-container>
    <el-header>头</el-header>
    <el-main>
      <!-- 二级路由的容器 -->
      <router-view></router-view>
    </el-main>
  </el-container>
</el-container>
</template>

<script>
import layoutAside from '../../components/home/layout-aside'
export default {
  components: {
    'layout-aside': layoutAside
  }
}
</script>

<style>

</style>
