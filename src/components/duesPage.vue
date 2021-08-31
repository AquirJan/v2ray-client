<template>
  <div class="wrap">
    <h2>网站维护费用</h2>
    <p style="color:red;">*&nbsp;请提供Email地址</p>
    <ul class="price-list">
      <li class="price-cell" v-for="item in priceList" :key="item.price">
        <div class="price-cell-item" >
          <h4 class="pci-title">{{item.price}}</h4>
          <p class="pci-traffic">
            <svg class="icom icom-lock" viewBox="0 0 32 32">
            <path d="M16 20v-4h4v8h-16v-8h4v4h8zM12 8v8h4v-4h8v4h4v-8h-16z"></path>
            </svg>
            {{item.traffic}}
          </p>
        </div>
      </li>
    </ul>
    <!--
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
    -->
    <hr />
    <div>
      <p>具体请联系微信号</p>
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
  max-width: 200px;
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
.price-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
}
.price-cell-item {
  display: grid;
  padding: 1rem;
  border-radius: 4px;
  border: 1px solid #909399;
  background-color: #efefef;
  transition: all 300ms;
  color: #333;
}
.price-cell-item:hover {
  color: #efefef;
  background-color: #425df8;
  border: 1px solid #425df8;
}
.pci-title {
  font-size: 1.5rem;
  text-align: center;
}
.pci-traffic {
  font-size: 1rem;
}
</style>
<script>
export default {
  name: 'duesPage',
  data() {
    return {
      publicPath: process.env.BASE_URL,
      showClients: false,
      priceList: [
        {
          price: `5元`,
          traffic: '500m/月'
        },
        {
          price: `10元`,
          traffic: '3g/月'
        },
        {
          price: `15元`,
          traffic: '8g/月'
        },
        {
          price: '自定义',
          traffic: '1g/元'
        },
      ]
    }
  },
  mounted() {
    
  }
}
</script>