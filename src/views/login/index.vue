<template>
  <div class="login">
    <div class="login-content">
      <div class="right-section">
        <login-form v-if="isLogin" @changeSection="changeSection" />
        <change-password v-else @changeSection="changeSection" />
      </div>
    </div>
    <div class="footer">
      <span>&copy; 2019 南京龙猫商业智能科技股份有限公司版权所有</span>
      <span>联系我们</span>
      <span>法律声明</span>
    </div>
  </div>
</template>

<script>
import LoginForm from './module/loginForm'
import ChangePassword from './module/changePassword'
export default {
  name: 'Login',
  components: {
    LoginForm,
    ChangePassword
  },
  data() {
    return {
      isLogin: true
    }
  },
  mounted() {
    // this.$store.dispatch('user/login', {
    //   username: 'admin,null',
    //   password: '123456'
    // }).then(() => {
    //   this.$store.dispatch('user/postsByAccountId', {
    //     accountId: this.$store.getters.userId
    //   }).then(() => {
    //     this.$router.push({
    //       name: 'Home'
    //     })
    //   })
    // })
  },
  methods: {
    changeSection() {
      this.isLogin = !this.isLogin
    }
  }
}
</script>

<style lang="scss" scoped>
.login {
  position: absolute;
  left: 0;
  top: 0;
  min-width: 1280px;
  min-height: 600px;
  width: 100%;
  height: 100%;
  background-color: rgba($color: #000000, $alpha: 0.4);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .login-content {
    width: 600px;
    height: 450px;
    background-color: red;
    display: flex;
    // .left-section {
    //   width: 300px;
    //   height: 100%;
    //   background-color: white;
    //   position: relative;
    //   .logo {
    //     width: 60px;
    //     height: 78px;
    //     transform: translateY(-45px);
    //   }
    //   .bigLogo {
    //     margin-top: 100px;
    //     margin-left: 20px;
    //     width: 260px;
    //     height: 70px;
    //   }
    // }
    .right-section {
      flex: 1;
      height: 100%;
      background-color: rgb(3, 110, 184);;
    }
  }
  .footer {
    margin-top: 10px;
    border-top: 1px solid rgba(255,255,255,0.6);
    padding-top: 5px;
    width: 900px;
    text-align: left;
    span {
      display: inline-block;
      color: rgba(255,255,255,0.8);
      font-size: 13px;
      margin-right: 14px;
      letter-spacing: 1px;
    }
  }
}
</style>
