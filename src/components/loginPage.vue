<template>
  <div class="login-wrap cntr-flex aligni-center justify-center">
    <form class="login-cell">
      <div class="form-group">
        <input v-model="form.name" type="text" class="form-control" aria-describedby="Account" placeholder="Account">
      </div>
      <div class="form-group">
        <input v-model="form.password" type="password" class="form-control" aria-describedby="Password" placeholder="Password">
      </div>
      <div class="text-right cntr-mb">
        <button type="submit" class="btn btn-success" :disabled="loading" @click="loginAction">Sign In</button>
      </div>
      <div class="text-center" v-if="false">
        <!-- <a href="https://gitlab.com/oauth/authorize?client_id=c1b6cc0c127e721a912d0f90b84d7cfb53c7438359a8bb1eacd71a53312c01eb&redirect_uri=http://localhost:8686/xray/createUser&response_type=code&scope=profile">gitlab</a> -->
        <a href="https://github.com/login/oauth/authorize?client_id=4654197a939c1a27bd9e&redirect_uri=http://localhost/user/info">github</a>
        <!-- <button type="submit" class="btn btn-primary" style="width:100%;" @click="gitlabSignIn">gitlab</button> -->
      </div>
    </form>
  </div>
</template>
<style scoped>
.login-wrap{
  position: absolute;
  top:0;
  left:0;
  width: 100%;
  height: 100%;
}
.login-cell {
  max-width: 320px;
  display: block;
  box-shadow: 0 5px 20px -2px rgba(0,0,0,.3);
  border-radius: 4px;
  padding: 1rem;
  background: #efefef;
  border: 1px solid rgba(0,0,0,.1);
}
</style>
<script>
import axios from 'axios'
import * as md5 from 'md5'
import samoDialog from './dialog.js'
export default {
  name: 'loginPage',
  data() {
    return {
      form: {
        name: '',
        password: ''
      },
      loading: false,
      dialogIns: undefined
    }
  },
  methods: {
    gitlabSignIn() {
      location.href = 'www.google.com'
    },
    loginAction() {
      if (!this.form.name) {
        return new samoDialog({
          content: '请输入账号'
        })
      }
      if (!this.form.password) {
        return new samoDialog({
          content: '请填写密码'
        })
      }
      this.loading = true;
      const _postData = {
        name: this.form.name,
        password: md5(this.form.password)
      }
      this.dialogIns = new samoDialog({
        content: '登录中。。。'
      })
      axios.post('/xray/login', _postData).then(res => {
        this.dialogIns.setContent(res.message)
        this.dialogIns.setDialogStyle({
          'background-color': res.success ? '#efefef' : '#F56C6C',
          'color': res.success ? '#333' : '#fff',
        })
        this.loading = false;
        if (res.success && res.token) {
          localStorage.setItem('user', res.token)
          this.$router.push({
            name: 'manager'
          })
        }
      })
    }
  }
}
</script>