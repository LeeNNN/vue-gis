<template>
  <div class="passwod-section">
    <el-form ref="pwdForm" :model="pwdForm" label-width="100px" :rules="pwdFormRules" :inline="true">
      <el-form-item label="已绑手机号：" prop="phone">
        <el-input v-model.number="pwdForm.phone" placeholder="已绑手机号" auto-complete="new-password" />
      </el-form-item>
      <el-form-item label="验证码：" prop="code">
        <el-input v-model="pwdForm.code" class="code" placeholder="验证码" auto-complete="new-password">
          <el-button slot="append" @click="getVerificationCode">{{ verificationCodeText }}</el-button>
        </el-input>
      </el-form-item>
      <el-form-item label="新密码：" prop="newPwd">
        <el-input v-model="pwdForm.newPwd" placeholder="新密码" type="password" auto-complete="new-password" show-password />
      </el-form-item>
      <el-form-item label="确认密码：" prop="confirmPassword">
        <el-input v-model="pwdForm.confirmPassword" placeholder="旧密码" type="password" auto-complete="new-password" show-password />
      </el-form-item>
    </el-form>
    <el-button class="fixPwd" plain @click="clickChangePassword">修改密码</el-button>
    <div class="back-login" @click="clickBackLogin">返回登录?</div>
  </div>
</template>
<script>
import { getVerificationCode, resetPasswordByPhone } from '@/api/user'
import { isMobile } from '@/utils/validate.js'
export default {
  name: 'ChangePassword',
  data() {
    const validateMobile = (rule, value, cb) => {
      console.log(isMobile(value))
      debugger
      if (!value || value === '') {
        cb(new Error('请输入手机号'))
      } else if (!isMobile(value)) {
        cb(new Error('只能输入以1开头的11位数字'))
      } else {
        cb()
      }
    }
    const validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.pwdForm.newPwd) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      pwdForm: {
        phone: '',
        code: '',
        newPwd: '',
        confirmPassword: ''
      },
      pwdFormRules: {
        phone: [
          { required: true, message: '请输入手机号!', trigger: 'blur' },
          { validator: validateMobile, trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入验证码!', trigger: 'blur' }
        ],
        newPwd: [
          { required: true, message: '请输入密码!', trigger: 'blur' },
          { min: 6, message: '密码至少六位！', trigger: 'blur' }
        ],
        confirmPassword: [
          { required: true, message: '请确认密码!', trigger: 'blur' },
          { validator: validatePass2, trigger: 'blur' }
        ]
      },
      timer: null,
      count: 60
    }
  },
  computed: {
    verificationCodeText() {
      if (this.count <= 0 || !this.timer) {
        return '获取验证码'
      } else {
        return `${this.count} 秒后重新获取`
      }
    }
  },
  destroyed() {
    if (this.timer) {
      clearInterval(this.timer)
      this.timer = null
    }
  },
  methods: {
    clickBackLogin() {
      // 返回登录
      this.$emit('changeSection')
    },
    getVerificationCode() {
      // 18226351321
      const { phone } = this.pwdForm
      if (phone && phone.length === 11) {
        getVerificationCode({
          phone
        }).then(res => {
          console.log(res)
          setInterval(() => {
            this.$nextTick(() => {
              this.count--
              if (this.count <= 0) {
                clearInterval(this.timer)
                this.timer = null
              }
            })
          })
        })
      } else {
        this.$message({
          message: '手机号不能为空/格式不正确',
          type: 'error'
        })
      }
    },
    clickChangePassword() {
      this.$refs.pwdForm.validate((valid) => {
        if (valid) {
          resetPasswordByPhone(this.pwdForm).then(res => {
            this.$emit('changeSection')
          })
        } else {
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.passwod-section {
  height: 100%;
  text-align: center;
  padding: 70px 50px 0;
  position: relative;
  /deep/.el-form-item.is-required:not(.is-no-asterisk)>.el-form-item__label:before{
    content: '';
  }
  /deep/.el-form-item__content{
    display: inline-block;
  }
  /deep/.el-form-item {
    margin-bottom: 24px;
    .el-form-item__label {
      color: white;
    }
  }
  /deep/ .el-input {
    width: 350px;
    text-align: left;
    border: none;
    &.code {
      .el-input__inner {
        width: 220px;
        border-radius: 3px;
      }
      .el-input-group__append {
        width: 130px;
        text-align: center;
        background-color: rgba($color: #000000, $alpha: 0);
        border: none;
        color: #f55;
      }
    }
    // .el-input__inner {
      // height: 44px;
      // line-height: 44px;
      // background-color: rgba($color: #000000, $alpha: 0);
      // text-align: center;
      // outline: none;
      // border: none;
      // border-radius: 0;
      // border-bottom: 1px solid rgba(255,255,255,0.6);
      // font-size: 18px;
      // color: rgba(255,255,255,0.6);
      // color: #66CCFF;
    // }
  }
  .fixPwd {
    margin-top: 15px;
    color: white;
    border-color: white;
    border-width: 1px;
    background-color: rgba($color: #000000, $alpha: 0);
    width: 100px;
    font-size: 16px;
    border-radius: 5px;
  }
  .back-login {
    position: absolute;
    bottom: 15px;
    left: 100px;
    width: 100%;
    color: #66CCFF;
    font-size: 12px;
    cursor: pointer;
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
