<template>
  <div class="container">
    <h2>v2ray manager</h2>
    <form >
      <div class="form-group">
        <div class="input-group mb-3">
          <div class="input-group-prepend">
            <span class="input-group-text" >email</span>
          </div>
          <input type="text" class="form-control" v-model="form.email"/>
        </div>
      </div>
      <div class="form-group">
        <div class="input-group mb-3">
          <div class="input-group-prepend">
            <span class="input-group-text" >remark</span>
          </div>
          <input type="text" class="form-control" v-model="form.remark"/>
        </div>
      </div>
      <div class="form-group">
        <div class="input-group mb-3">
          <div class="input-group-prepend">
            <span class="input-group-text" >uuid</span>
          </div>
          <input type="text" class="form-control" v-model="form.uuid"/>
          <div class="input-group-append">
            <button type="button" class="btn btn-primary" @click="generateUUID">generate</button>
          </div>
        </div>
      </div>
      <div class="form-group">
        <div class="input-group mb-3">
          <div class="input-group-prepend">
            <span class="input-group-text" >offDate</span>
          </div>
          <input type="date" class="form-control" v-model="form.offDate"/>
        </div>
      </div>
      <div class="form-group text-right">
        <div class="btn-group " role="group" aria-label="Basic example">
          <button type="button" class="btn btn-secondary" @click="resetForm">reset</button>
          <button type="button" class="btn btn-success" @click="submitForm">submit</button>
        </div>
      </div>
    </form>
    <!-- <clacOffDate /> -->
    <div class="cntr-mb search-wrap">
      <h3>search list</h3>
      <div class="search-content cntr-mb">
        <input type="text" style="height: auto;" class="form-control inline-form-control" v-model="filterContent" @keydown.enter="filterAction"/>
        <div class="btn-group " role="group" aria-label="Basic example">
          <button type="button" class="btn btn-secondary" @click="resetAction">reset</button>
          <button type="button" class="btn btn-primary" @click="filterAction">search</button>
        </div>
      </div>
      <button type="button" class="btn btn-dark" @click="restartService">restart service</button>
    </div>
    <ul class="list-group list-group-flush">
      <li class="text-center cntr-p" v-if="loadingList">Loading...</li>
      <li class="text-center cntr-p" v-if="!loadingList && listData.length <= 0">NoData</li>
      <li class="list-group-item" v-for="(item, index) in listData" :key="index">
        <div class="list-title cntr-mb">
          <span v-if="!item.needUpdate">Email: {{item.email}} [{{item.remark}}]</span>
          <template v-else>
            <div>Email: <input class="form-control inline-form-control" v-model="item.email" /></div>
            <div>Remark: <input class="form-control inline-form-control" v-model="item.remark" /></div>
          </template>
          <span class="badge badge-dark" v-if="calcOverDue(item) && !item.needUpdate">overdue</span>
        </div>
        <!-- <div>Port: {{item.port}}</div> -->
        <div class="cntr-mb">uuid: {{item.uuid}}</div>
        <div class="list-info">
          <span>上行：{{formatSize(item.up)}}</span>
          <span>下行：{{formatSize(item.down)}}</span>
          <span>total：{{formatSize(item.up+item.down)}}</span>
          <button type="button" class="btn btn-info" @click="resetBandWidth($event, item)">reset</button>
        </div>
        <div class="change-date-wrap">
          <span>Off Date :</span>
          <input type="date" class="form-control inline-form-control" v-model="item.offDateFormat"/>
          <!-- <input type="number" class="form-control inline-form-control" @blur="addMonth($event, item, index)" value="0" min=0 max=99 maxlength="2"/> -->
        </div>
        <div class="addon-btns">
          <button type="button" class="btn btn-info" @click="changeOffDate($event, item)">change date</button>
          <button type="button" class="btn btn-secondary" v-if="!item.needUpdate" @click="changeNeedUpdate($event, item, index)">modify</button>
          <div class="btn-group" role="group" aria-label="Basic example" v-else>
            <button type="button" class="btn btn-success"  @click="updateClient($event, item, index)">update</button>
            <button type="button" class="btn btn-danger" @click="cancelUpdate($event, item, index)">cancel</button>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import cloneDeep from '../assets/lodash.clonedeep.js'
const uuidv1 = require('uuid/v1');
import axios from 'axios'
export default {
  name: 'v2rayManager',
  components: {
  },
  data() {
    return {
      oneDay: 86400000, 
      form: {
        email: '',
        offDate: '',
        uuid: '',
        port: 80,
        remark: ''
      },
      filterContent: '',
      loadingList: false,
      listData: [],
      listDataOrigin: []
    }
  },
  methods: {
    resetBandWidth($event, item, index) {
      axios.post('/v2ray/resetBandWidth', item).then(res => {
        alert(res.msg)
        this.getList()
      })
    },
    formatSize(size, pointLength, units) {
      let unit;
      units = units || [ 'B', 'KB', 'MB', 'GB', 'TB', 'PB' ];
      while ( (unit = units.shift()) && size > 1024 ) {
        size = size / 1024;
      }
      return (unit === 'B' ? size : size.toFixed( pointLength === undefined ? 2 : pointLength)) + unit;
    },
    addMonths(date, months) {
      let d = date.getDate();
      date.setMonth(date.getMonth() + +months);
      if (date.getDate() != d) {
        date.setDate(0);
      }
      return date;
    },
    addMonth($event, item, index) {
      const _value = $event.target.value;
      console.log(_value)
      let _offDate = new Date(item.offDate)
      console.log(this.addMonths(_offDate, _value).toString())
      const _newOffDate = new Date(this.addMonths(_offDate, _value).toString()).format('yyyy-MM-dd');
      let _listData = cloneDeep(this.listData);
      _listData[index]['offDateFormat'] = _newOffDate;
      this.$set(this,'listData', _listData)
      console.log(_newOffDate)
    },
    cancelUpdate($event, item, index) {
      let _listData = cloneDeep(this.listData);
      _listData[index]['needUpdate'] = false;
      this.$set(this,'listData', _listData)
    },
    resetAction(){
      this.filterContent = ''
      this.listData = this.listDataOrigin;
    },
    calcOverDue(item) {
      // console.log(item)
      if (new Date().getTime() > new Date(item.offDate).getTime()) {
        return true;
      } else {
        return false;
      }
    },
    filterAction() {
      if (!this.filterContent) {
        this.listData = this.listDataOrigin;
      } else {
        const _reg = new RegExp(this.filterContent, 'gi')
        this.listData = this.listData.filter(val => {
          return val.email.match(_reg) || val.remark.match(_reg)
        })
      }
    },
    restartService() {
      axios.post('/v2ray/restartService').then(res => {
        alert(res.msg)
      })
    },
    changeOffDate($event, item) {
      axios.post('/v2ray/changeOffDate', {
        id: item.id,
        offDate: item.offDateFormat
      }).then(res => {
        alert(res.msg)
        this.getList()
      })
    },
    changeNeedUpdate($event, item, index) {
      let _listData = cloneDeep(this.listData);
      _listData[index]['needUpdate'] = true;
      this.$set(this,'listData', _listData)
    },
    updateClient($event, item) {
      axios.post('/v2ray/updateClient', item).then(res => {
        alert(res.msg)
        this.getList()
      })
    },
    generateUUID() {
      this.form.uuid = uuidv1()
    },
    submitForm() {
      if (!this.form.email) {
        alert('email not avaliable')
        return;
      }
      if (!this.form.uuid) {
        alert('uuid not avaliable')
        return;
      }
      axios.post('/v2ray/add', this.form).then(res => {
        alert(res.msg)
        if (res.success) {
          this.getList();
          this.resetForm()
        }
      })
    },
    resetForm() {
      this.$set(this, 'form', {
        uuid: '',
        email: '',
        port: 80,
        offDate: (new Date((new Date()).getTime() + this.oneDay)).format('yyyy-MM-dd')
      });
    },
    getList() {
      this.loadingList = true;
      this.listData = []
      axios.post('/v2ray/list').then(res => {
        this.loadingList = false;
        this.listData = []
        if (res.success && res.data) {
          this.listData = res.data;
          this.listData.forEach((val) => {
            val['offDateFormat'] = new Date(val.offDate).format('yyyy-MM-dd')
            val['needUpdate'] = false;
          })
          this.listDataOrigin = this.listData;
        }
      })
    }
  },
  mounted() {
    this.getList();
    this.resetForm()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.search-wrap {
  /* display: grid;
  grid-template-columns: auto 1fr auto;
  grid-gap: 0 1rem; */
}
.addon-btns {
  display: grid;
  justify-content: space-between;
  grid-auto-flow: column;
}
.search-content {
  display: grid;
  grid-template-columns: 1fr auto;
  grid-gap: 0 1rem;
}
.change-date-wrap {
  margin-bottom: 1rem;
  display: grid;
  grid-template-columns: auto 1fr auto;
  grid-template-rows: auto auto;
  align-items: center;
  grid-gap: 0 1rem;
}
.list-title {
  display: grid;
  grid-template-columns: 1fr auto;
  grid-gap: 0 1rem;
  align-items: center;
}
.list-info {
  display: grid;
  grid-auto-flow: column;
  grid-gap: 0 1rem;
  align-items: center;
  margin-bottom: 1rem;
}
</style>
