<template>
<!-- 大容器 -->
<el-container>
  <el-aside style="width:200px;overflow:hidden;background-color:#323745">
    <!-- 使用左导航组件 -->
    <layout-aside></layout-aside>
  </el-aside>
  <el-container>
    <el-header>
    <!-- 头组件 -->
    <layout-header></layout-header>
    </el-header>
    <el-main style="padding:0">
      <!-- 二级路由的容器 -->
      <router-view></router-view>
    </el-main>
  </el-container>
</el-container>
</template>

<script>

export default {

}
</script>

<style>

</style>
