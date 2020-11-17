<template>
  <div class="login-wrap cntr-flex aligni-center justify-center">
    <form class="login-cell">
      <div class="form-group">
        <!-- <label for="exampleInputEmail1">accout</label> -->
        <input v-model="form.name" type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="account">
        <!-- <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small> -->
      </div>
      <div class="form-group">
        <!-- <label for="exampleInputPassword1">Password</label> -->
        <input v-model="form.password" type="password" class="form-control" id="exampleInputPassword1" placeholder="Password">
      </div>
      <!-- <div class="form-group form-check">
        <input type="checkbox" class="form-check-input" id="exampleCheck1">
        <label class="form-check-label" for="exampleCheck1">Check me out</label>
      </div> -->
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
      axios.post('/v2ray/loginManager', this.form).then(res => {
        this.loading = false;
        if (res.success && res.token) {
          localStorage.setItem('user', res.token)
          this.$router.push({
            name: 'manager'
          })
        } else {
          alert(res.msg)
        }
      })
    }
  }
}
</script>