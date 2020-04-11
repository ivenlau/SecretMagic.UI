<template>
  <div class="container-main">
    <h1>Secret Magic Admin</h1>
    <el-row type="flex" justify="center">
      <el-form ref="loginForm" class="login-form" :model="user" :rules="rules" status-icon label-width="80px">
        <el-form-item :label="$t('login.account')" prop="name">
          <el-input v-model="user.name" @keyup.enter.native="login" />
        </el-form-item>
        <el-form-item :label="$t('login.password')" prop="pass">
          <el-input v-model="user.pass" type="password" @keyup.enter.native="login" />
        </el-form-item>
      </el-form>
    </el-row>
    <el-row type="flex" justify="center">
      <el-col :span="3">
        <el-button size="large" @click="login">{{ $t('login.login') }}</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { login } from '@/api/user'
import Cookies from 'js-cookie'

export default {
  name: 'Login',
  components: {

  },
  data() {
    return {
      user: { name: '', pass: '' },
      rules: {
        name: [{ required: true, message: 'User cannot be empty', trigger: 'blur' }],
        pass: [{ required: true, message: 'Password cannot be empty', trigger: 'blur' }]
      }
    }
  },
  methods: {
    login() {
      this.$refs['loginForm'].validate((valid) => {
        if (valid) {
          const formData = new FormData()
          formData.append('userName', this.user.name)
          formData.append('password', this.user.pass)
          login(formData).then((data) => {
            const profile = data.data
            this.$store.dispatch('saveProfile', profile)
            Cookies.set('profile', profile)
            console.log(this.$store.state.sideBar)
            this.$router.push('/admin')
          })
          this.$refs['loginForm'].resetFields()
        }
      })
    }
  }
}
</script>

<style scoped>
  .container-main{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-60%);
    width: 400px;
    padding:40px;
    /* background: rgba(0,0,0,.8); */
    box-sizing: border-box;
    /* box-shadow: 0 15px  25px rgba(0,0,0,.5); */
    border-radius: 10px;
    border:#DCDFE6 solid 1px;
    /* color:white; */
  }
</style>
