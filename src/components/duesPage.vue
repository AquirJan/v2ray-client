<template>
  <div class="wrap">
    <h2>网站维护续费用</h2>
    <p style="color:red;">*&nbsp;维护费用按月计算，每月15元人民币。备注请附上您常用的个人邮箱（新用户凭据会以邮件方式发回给用户，旧用户不予重发）</p>
    <div class="cntr-flex">
      <div class="pay-cell">
        <img :src="`${publicPath}images/ali.JPG`" class="pay-img">
        <p class="text-center">支付宝</p>
      </div>
      <div class="pay-cell">
        <img :src="`${publicPath}images/wechat.JPG`" class="pay-img">
        <p class="text-center">微信</p>
      </div>
    </div>
    <hr />
    <div>
      <p>有疑问请联系微信号</p>
      <img :src="`${publicPath}images/contact.JPG`" class="pay-img"/>
    </div>
    <button type="button" class="btn btn-outline-primary mb-3" @click="showClients = !showClients">客户端下载 ( 联系管理员获取二维码 )</button>
    <ul v-if="showClients" class="list-group list-group-flush">
      <li class="list-group-item">
        <a :href="`${publicPath}clients/app-universal-release.apk`" class="stretched-link block-link" download="app-universal-release.apk">android</a>
      </li>
      <li class="list-group-item">
        <a :href="`${publicPath}clients/vn-complete.zip`" download="vn-complete.zip">windows</a>
        <!-- <a :href="`${publicPath}tutorials/windows.docx`" download="windows-tutorial.docx">教程.docx</a> -->
      </li>
      <li class="list-group-item">
        <a :href="`${publicPath}clients/V2rayU.dmg`" download="V2rayU.dmg">mac os</a>
        <a href="https://www.jianshu.com/p/d2558583872b">安装教程</a>
      </li>
      <li class="list-group-item">
        ios 可以自行搜索 shadowrocket (美区)
      </li>
    </ul>
  </div>
</template>
<style scoped>
.wrap {
  padding: 2rem;
  max-width: 70rem;
  margin: 0 auto;
}
.pay-img {
  width: 90%;
  display: block;
  margin: 0 auto;
  max-width: 300px;
}
.pay-cell {
  width: 50%;
}
.block-link {
  display: block;
}
.list-group-item {
  display:grid;
  grid-gap: 0 1rem;
  grid-auto-flow:column;
}
</style>
<script>
export default {
  name: 'duesPage',
  data() {
    return {
      publicPath: process.env.BASE_URL,
      showClients: false,
    }
  },
  mounted() {
    
  }
}
</script>