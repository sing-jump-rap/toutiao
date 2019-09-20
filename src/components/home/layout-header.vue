<template>
  <el-row align="middle" class="layout-header" type="flex" justify="space-between">
    <el-col :span="6">
      <!-- 左侧 -->
      <i class="el-icon-s-unfold"></i>
      <span class="title">马氏网络科技股份有限公司</span>
    </el-col>
    <el-col :span="4">
      <!-- 右侧 -->
      <img class="head-img" :src="userInfo.photo?userInfo.photo:defaultImg" alt="" style="margin-right:5px">
      <el-dropdown>
        <span class="el-dropdown-link">
          {{ userInfo.name }}<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>个人信息</el-dropdown-item>
          <el-dropdown-item>git地址</el-dropdown-item>
          <el-dropdown-item>退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-col>
  </el-row>
</template>

<script>
export default {
  data () {
    return {
      userInfo: {}, // 个人信息对象
      defaultImg: require('../../assets/img/avatar.jpg') // 转换base64
    }
  },
  methods: {
    getUserInfo () {
      var token = window.localStorage.getItem('user-token')
      this.$axios({
        url: '/user/profile',
        headers: { 'Authorization': `Bearer ${token}` } // 请求参数
      }).then(result => {
        this.userInfo = result.data.data// 接收数据对象
      })
    }
  },
  // 钩子函数，实例创建前后前
  created () {
    this.getUserInfo()
  }

}
</script>

<style lang="less" scoped>
  .layout-header{
    height: 50px;
    .el-icon-s-unfold {
      font-size: 22px;
    }
    .title {
      vertical-align: top;
      margin-left: 4px;
    }
    .head-img {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      vertical-align: middle;
      margin-top: 4px;
    }
  }
</style>
