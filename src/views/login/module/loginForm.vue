<template>
  <div class="login-section">
    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" :inline="true">
      <el-form-item prop="username">
        <el-input v-model.trim="loginForm.username" placeholder="用户名" auto-complete="new-password" />
      </el-form-item>
      <el-form-item prop="password">
        <el-input v-model.trim="loginForm.password" placeholder="密码" type="password" auto-complete="new-password" />
      </el-form-item>
    </el-form>
    <el-button plain @click="clickLogin">登&nbsp;录</el-button>

    <div class="forget-password" @click="clickForgetPassword">忘记密码？</div>
    <div class="third-login" @click="clickThirdLogin">
      <div class="alipay">
        <i class="iconfont icon-icon-test" />
      </div>
    </div>
  </div>
</template>

<script>
import '@/assets/iconfont/iconfont.css'
export default {
  name: 'Login',
  props: {},
  data() {
    return {
      loginForm: {
        username: '',
        password: ''
      },
      loginRules: {
        username: [
          { required: true, message: '请输入用户名!', trigger: 'blur' },
          { min: 1, message: '登录名长度不能小于1', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码!', trigger: 'blur' },
          { min: 6, message: '密码不能小于6位', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {

    clickLogin() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          // this.$store.dispatch('user/login', this.loginForm).then(() => {
          //   this.$store.dispatch('user/postsByAccountId', {
          //     accountId: this.$store.getters.userId
          //   }).then(() => {
          //     this.$router.push({
          //       name: 'Home'
          //     })
          //   })
          // })
          this.$router.push({
            name: 'Home'
          })
        } else {
          this.$message({
            message: '警告哦，这是一条警告消息',
            type: 'warning'
          })
          return false
        }
      })
    },
    clickForgetPassword() {
      this.$emit('changeSection')
    },
    clickThirdLogin() {

    }
  }
}
</script>

<style lang="scss" scoped>
.login-section {
  height: 100%;
  text-align: center;
  padding-top: 100px;
  position: relative;
  .el-form-item {
    margin-bottom: 24px;
  }
  /deep/ .el-input {
    width: 300px;
    .el-input__inner {
      height: 44px;
      line-height: 44px;
      background-color: rgba($color: #000000, $alpha: 0);
      text-align: center;
      outline: none;
      border: none;
      border-radius: 0;
      border-bottom: 1px solid rgba(255,255,255,0.6);
      font-size: 18px;
      color: rgba(255,255,255,0.6);
      // color: #66CCFF;
    }
  }
  /deep/ .el-button {
    margin-top: 15px;
    color: white;
    border-color: white;
    border-width: 1px;
    background-color: rgba($color: #000000, $alpha: 0);
    width: 100px;
    font-size: 16px;
    border-radius: 5px;
  }
  .forget-password {
    position: absolute;
    bottom: 15px;
    left: 100px;
    width: 100%;
    color: #66CCFF;
    font-size: 12px;
    cursor: pointer;
  }
  .third-login {
    cursor: pointer;
    position: absolute;
    bottom: 0;
    right: 0;
    width: 100px;
    height: 100px;
    &::before {
      content: '';
      position: absolute;
      bottom: 0;
      right: 0;
      width: 0;
      height: 0;
      border-right: 50px solid #fff;
      border-bottom: 50px solid #fff;
      border-top: 50px solid transparent;
      border-left: 50px solid transparent;
    }
    .alipay {
      position: absolute;
      bottom: 0;
      right: 0;
      width: 50px;
      height: 50px;
      .iconfont {
        font-size: 40px;
        color: rgb(3, 110, 184);
      }
    }
  }
}
</style>
<style lang="scss">
// 关闭浏览器的自动填充
input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus,
input:-webkit-autofill:active {
  -webkit-transition-delay: 99999s;
  -webkit-transition: color 99999s ease-out, background-color 99999s ease-out,  font-size 99999s ease-out;
}
</style>
