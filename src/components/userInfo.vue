<template>
  <div>test user info</div>
</template>
<script>
import axios from 'axios'
export default {
  name: "user-info",
  mounted() {
    // console.log(this.$route);
    if (this.$route.query && this.$route.query.code) {
      axios.post("/xray/createUser", {code: this.$route.query.code}, {timeout: 60*1000}).then(res => {
        console.log(res)
      });
      // axios.post("/xray/listClients", {code: this.$route.query.code}).then(res => {
      //   console.log(res)
      // });
    } else {
      alert(`鉴权异常`)
    }
    
  }
};
</script>