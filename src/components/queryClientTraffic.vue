<template>
  <div class="query-client-wrap">
    <p>流量查询 (为减轻系统负荷，暂时设定了每2个小时统计一次)</p>
    <div class="query-form">
      <input type="text" class="form-control" placeholder="Email" v-model="form.email"/>
      <button type="button" class="btn btn-primary btn-sm"  @click="queryClient">查询</button>
    </div>
    <ul class="info-list" v-if="result">
      <li>目前使用量：{{result.total}}</li>
      <li>总可用量：{{result.traffic}}GB/月</li>
      <li>剩余可用量：{{result.leavings}} (当使用量太小的时候不予精确显示）</li>
      <li>账号到期日：{{result.humanOffDate}}</li>
    </ul>
  </div>
</template>
<script>
import axios from "axios";
import samoDialog from './dialog.js'
export default {
  name: "test",
  data() {
    return {
      dialogIns: undefined,
      form: {
        email: "",
      },
      result: undefined
    };
  },
  methods: {
    formatSize(size, pointLength, units) {
      let unit;
      units = units || [ 'B', 'KB', 'MB', 'GB', 'TB', 'PB' ];
      while ( (unit = units.shift()) && size > 1024 ) {
        size = size / 1024;
      }
      return (unit === 'B' ? size : size.toFixed( pointLength === undefined ? 2 : pointLength)) + unit;
    },
    queryClient() {
      if (!this.form.email) {
        this.dialogIns = new samoDialog({
          content: '请填写email'
        })
        return;
      }
      this.dialogIns = new samoDialog({
        content: '查询中...'
      })
      axios.post("/xray/queryClientTraffic", this.form).then((res) => {
        const {success, data, message} = res;
        console.log(data)
        if (success) {
          this.result = data;
          this.result['total'] = this.formatSize(data.up+data.down)
          this.result['humanOffDate'] = new Date(data.off_date).utcFormat('yyyy/MM/dd hh:mm:ss')
          
          this.result['leavings'] = this.formatSize(data.traffic * 1024 * 1024 * 1024 - data.up-data.down)
          this.dialogIns.close()
        } else {
          this.dialogIns.setContent(message);
        }
      });
    },
    init() {
    }
  },
  mounted() {
    
  },
};
</script>

<style scoped>
.query-client-wrap {
  padding: 1rem;
  display: grid;
}
.query-form {
  display: grid;
  grid-template-columns: 7fr 3fr;
  gap: 1rem;
}
.info-list {
  padding: 1rem;
}
.info-list li {
  margin-bottom: .5rem;
}
</style>