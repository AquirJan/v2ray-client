<template>
  <div class="login-wrap cntr-flex aligni-center justify-center">
    <form class="login-cell">
      <div class="form-group">
        <input v-model="form.name" type="text" class="form-control" aria-describedby="Account" placeholder="Account">
      </div>
      <div class="form-group">
        <input v-model="form.password" type="password" class="form-control" aria-describedby="Password" placeholder="Password">
      </div>
      <div class="text-right">
        <button type="submit" class="btn btn-success" :disabled="loading" @click="loginAction">Sign In</button>
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
export default {
  name: 'loginPage',
  data() {
    return {
      form: {
        name: '',
        password: ''
      },
      loading: false,
    }
  },
  methods: {
    loginAction() {
      if (!this.form.name) {
        return alert('fill name')
      }
      if (!this.form.password) {
        return alert('fill password')
      }
      this.loading = true;
      const _postData = {
        name: this.form.name,
        password: md5(this.form.password)
      }
      axios.post('/xray/login', _postData).then(res => {
        if (res.success && res.token) {
          localStorage.setItem('user', res.token)
          this.$router.push({
            name: 'manager'
          })
        } else {
          this.loading = false;
          alert(res.msg)
        }
      })
    }
  }
}
</script>