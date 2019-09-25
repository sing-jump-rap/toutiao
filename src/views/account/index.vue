<template>
    <el-card>
        <bread-crumb slot='header'>
          <template slot='title'>账户信息</template>
        </bread-crumb>
        <!-- 表单 -->
        <el-form ref="accountForm" :rules="accountRules" :model="formData" style='margin-left:60px' label-width="100px">
            <el-form-item prop="name" label="用户名">
                <el-input v-model="formData.name" style="width:300px"></el-input>
            </el-form-item>
            <el-form-item label="简介">
                <el-input v-model="formData.intro" style="width:300px"></el-input>
            </el-form-item>
            <el-form-item prop="email" label="邮箱">
                <el-input v-model="formData.email" style="width:300px"></el-input>
            </el-form-item>
            <el-form-item label="手机号">
                <el-input v-model="formData.mobile" style="width:300px"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button @click="saveUser" type='primary'>保存信息</el-button>
            </el-form-item>
        </el-form>
        <img class='head-img' :src="formData.photo?formData.photo:defaultImg" alt="">
    </el-card>
</template>

<script>
export default {
  data () {
    return {
      defaultImg: require('../../assets/img/abb.jpg'),
      formData: {}
    }
  },
  // 校验规则
  accountRules: {
    name: [
      { require: true, message: '用户名不能为空' },
      { min: 1, max: 7, message: '用户名要控制在1到7个字符之内' }
    ],
    email: [{ require: true, message: '邮箱不能为空' }, { pattern: /^\w+((.\w+)|(-\w+))@[A-Za-z0-9]+((.|-)[A-Za-z0-9]+).[A-Za-z0-9]+$/, message: '邮箱格式不正确' }]
  },
  methods: {
    // 保存个人信息
    saveUser () {
      this.$refs.accountForm.validate((isOK) => {
        if (isOK) {
          // 调用修改资料接口
          this.$axios({
            url: '/user/profile',
            method: 'patch',
            data: this.formData
          }).then(() => {
            this.$message({ message: '保存成功', type: 'success' })
          })
        }
      })
    },
    // 获取用户个人信息
    getUserInfo () {
      this.$axios({
        url: '/user/profile'
      }).then((result) => {
        this.formData = result.data
      })
    }
  },
  created () {
    this.getUserInfo()
  }
}
</script>

<style scoped>
  .head-img {
      width: 200px;
      height: 200px;
      border-radius: 50%;
      position: absolute;
      top:150px;
      right:400px;
  }
</style>
