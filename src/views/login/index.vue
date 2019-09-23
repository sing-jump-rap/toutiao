<template>
  <div class="login">
      <el-card class="login-card">
          <div class="title">
              <img src="../../assets/img/logo_index.png" alt="">
          </div>
          <!-- 数据校验 el-from绑定model，绑定rules规则 -->
          <el-form status-icon  ref="myForm" :model="loginFrom" :rules="loginRules" style="margin-top:20px">
              <el-form-item prop="mobile">
                  <!-- 手机号 -->
                  <el-input v-model="loginFrom.mobile" placeholder="输入手机号！！"></el-input>
              </el-form-item>

              <el-form-item prop="code">
                  <!-- 验证码 -->
                  <el-input v-model="loginFrom.code" style="width:65%" placeholder="输入验证码！！"></el-input>
                  <el-button  style="float:right">发送验证码</el-button>
              </el-form-item>
              <el-form-item prop="agree">
                  <el-checkbox v-model="loginFrom.agree">我已阅读还同意条款了</el-checkbox>
              </el-form-item>
              <el-form-item>
                  <el-button @click="login" type="primary" style="width:100%">登录</el-button>
              </el-form-item>
          </el-form>
      </el-card>
  </div>
</template>

<script>
export default {
  data () {
    let validator = function (rules, value, callBack) {
      value ? callBack() : callBack(new Error('你必须勾选用户协议'))
    }
    return {
      // 数据对象
      loginFrom: {
        mobile: '', // 手机号
        code: '', // 验证码
        agree: false// 是否同意协议
      },
      // 校验规则  key(字段名)：value（对象数组）=> 一个对象就是一个校验规则
      // required为true表示为必填项，如不填就会提示message的消息
      loginRules: {
        mobile: [{ required: true, message: '请输入宁的手机号' },
          { pattern: /^1[3456789]\d{9}$/, message: '输入的手机号不正确' }],
        code: [{ required: true, message: '请输入宁的验证码' },
          { pattern: /^\d{6}$/, message: '你输入的验证码不正确' }],
        agree: [{ validator }]
      }
    }
  },
  methods: {
    login () {
      // validate方法，方法中传入一个函数 俩个校验参数 是否校验成功/为校验成功的子段
      this.$refs.myForm.validate((isOK) => {
        if (isOK) {
          this.$axios({
            method: 'post',
            url: '/authorizations',
            data: this.loginFrom
          }).then(result => {
            // 成功
            // 将后台返回的令牌暂存到缓存中
            window.localStorage.setItem('user-token', result.data.token)
            // 编程式导航跳转
            this.$router.push('/home')
          })
        }
      })
    }
  }
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
