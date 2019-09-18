<template>
  <div class="login">
      <el-card class="login-card">
          <div class="title">
              <img src="../../assets/img/logo_index.png" alt="">
          </div>
          <el-form style="margin-top:20px">
              <el-form-item>
                  <!-- 手机号 -->
                  <el-input></el-input>
              </el-form-item>

              <el-form-item>
                  <!-- 验证码 -->
                  <el-input style="width:65%"></el-input>
                  <el-button style="float:right">发送验证码</el-button>
              </el-form-item>
              <el-form-item>
                  <el-checkbox>我已阅读还同意条款了</el-checkbox>
              </el-form-item>
              <el-form-item>
                  <el-button type="primary" style="width:100%">登录</el-button>
              </el-form-item>
          </el-form>
      </el-card>
  </div>
</template>

<script>
export default {

}
</script>

<style lang='less' scoped> //要在组件中引入less所以在标签中加lang属性，要只在当前页生效所以加scoped属性
.login {
    background-image: url('../../assets/img/login_bg.jpg');
    height: 100vh;
    background-size: cover;
    //设置居中
    display: flex;
    justify-content: center;
    align-items: center;
    .login-card {
        width: 440px;
        height: 350px;
        .title {
            text-align: center;
            img {
                height: 45px;
            }
        }

    }
}
</style>
