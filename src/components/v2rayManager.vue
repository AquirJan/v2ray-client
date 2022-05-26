<template>
  <div >
    <div class="container">
    <h2>xray manager</h2>
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
              <button type="button" class="btn btn-primary btn-sm" @click="generateUUID">generate</button>
            </div>
          </div>
        </div>
        <div class="form-group">
          <div class="input-group mb-3">
            <div class="input-group-prepend">
              <span class="input-group-text" >offDate</span>
            </div>
            <input type="datetime" class="form-control" v-model="form.off_date"/>
          </div>
        </div>
        <div class="form-group dis-grid grid-2-cols grid-gap-small">
          <div class="input-group mb-3">
            <div class="input-group-prepend">
              <span class="input-group-text" >price</span>
            </div>
            <input type="number" step="0.01" class="form-control" v-model="form.price"/>
          </div>
          <div class="input-group mb-3">
            <div class="input-group-prepend">
              <span class="input-group-text" >traffic</span>
            </div>
            <input type="number" step="1" class="form-control" v-model="form.traffic"/>
          </div>
        </div>
        <div class="form-group text-right">
          <div class="btn-group " role="group" aria-label="Basic example">
            <button type="button" class="btn btn-secondary" @click="resetForm">reset</button>
            <button type="button" class="btn btn-primary" @click="submitForm">submit</button>
          </div>
        </div>
      </form>
    </div>
    <!-- <clacOffDate /> -->
    <div class="cntr-mb search-wrap">
      <h3>search list</h3>
      <div class="search-content cntr-mb">
        <input type="text" style="height: auto;" class="form-control inline-form-control" v-model="filterContent" />
        <div class="btn-group " role="group" aria-label="Basic example">
          <button type="button" class="btn btn-secondary btn-sm" @click="resetAction">reset</button>
          <button type="button" class="btn btn-primary btn-sm" @click="filterAction">search</button>
        </div>
      </div>
      <div class="cntr-flex justify-between">
        <button type="button" class="btn btn-dark btn-sm" @click="restartService">restart service</button>
        <button type="button" class="btn btn-primary btn-sm" @click="updateTrafficAction">update traffic</button>
      </div>
    </div>
    <ul class="list-group list-group-flush">
      <li class="text-center cntr-p" v-if="loadingList">Loading...</li>
      <li class="text-center cntr-p" v-if="!loadingList && listData.length <= 0">没有相关数据</li>
      <li class="list-group-item" v-for="(item, index) in listData" :key="index">
        <div class="list-title cntr-flex justify-between aligni-center cntr-mb">
          <span class="cntr-grid cntr-gaf-column aligni-center cntr-gg-xsm" v-if="!item.needUpdate">
            Email: {{item.email}} [{{item.remark}}]
            <span class="price-bage">
              <svg class="icom icom-coin-yen" viewBox="0 0 32 32">
                <path d="M15 2c-8.284 0-15 6.716-15 15s6.716 15 15 15c8.284 0 15-6.716 15-15s-6.716-15-15-15zM15 29c-6.627 0-12-5.373-12-12s5.373-12 12-12c6.627 0 12 5.373 12 12s-5.373 12-12 12z"></path>
                <path d="M19 18c0.552 0 1-0.448 1-1s-0.448-1-1-1h-2.131l2.963-4.445c0.306-0.46 0.182-1.080-0.277-1.387s-1.080-0.182-1.387 0.277l-3.168 4.752-3.168-4.752c-0.306-0.46-0.927-0.584-1.387-0.277s-0.584 0.927-0.277 1.387l2.964 4.445h-2.132c-0.552 0-1 0.448-1 1s0.448 1 1 1h3v2h-3c-0.552 0-1 0.448-1 1s0.448 1 1 1h3v3c0 0.552 0.448 1 1 1s1-0.448 1-1v-3h3c0.552 0 1-0.448 1-1s-0.448-1-1-1h-3v-2h3z"></path>
              </svg>{{item.price}}
            </span>
          </span>
          <template v-else>
            <div class="cntr-flex justify-between">
              <div>Email: <input class="form-control form-control-sm" v-model="item.email" /></div>
              <div>Price: <input type="number" step="0.01" class="form-control form-control-sm" v-model="item.price"/></div>
            </div>
            <div>Remark: <input class="form-control form-control-sm" v-model="item.remark" /></div>
          </template>
          <span class="badge badge-dark" v-if="calcOverDue(item) && !item.needUpdate">overdue</span>
        </div>
        <!-- <div>Port: {{item.port}}</div> -->
        <div class="cntr-mb" v-if="!item.needUpdate">uuid: {{item.uuid}}</div>
        <div class="cntr-mb uuid-modify" v-else><span>uuid: </span><input class="form-control form-control-sm inline-form-control full-width" v-model="item.uuid" /></div>
        <div class="list-info">
          <span>up：{{formatSize(item.up)}}</span>
          <span>down：{{formatSize(item.down)}}</span>
          <span>total：{{formatSize(item.up+item.down)}}</span>
          <span>remain: {{formatSize(item.remainTraffic)}}</span>
          <button type="button" class="btn btn-primary btn-sm" @click="resetTraffic($event, item, index)">reset</button>
        </div>
        <div class="change-date-wrap">
          <span>Off Date :</span>
          <input type="datetime" placeholder="yyyy/MM/dd hh:mm:ss" class="form-control form-control-sm inline-form-control" v-model="item.offDateFormat" @change="changeOffDateFromDate($event, item, index)"/>
          <input type="number" class="form-control form-control-sm inline-form-control" @blur="addMonth($event, item, index)" value="0" min=0 max=99 maxlength="1"/>
        </div>
        <div class="change-date-wrap">
          <span>Traffic :</span>
          <span v-if="item.needUpdate"><input  type="number" class="form-control form-control-sm inline-form-control" v-model="item.traffic" value="0" min=0 max=99 maxlength="1"/>GB</span>
          <span v-else>{{item.traffic}} GB</span>
          <span>
            <button type="button" class="btn btn-primary btn-sm" @click="genQrcode($event, item, index)">qrcode</button>
          </span>
        </div>
        <div class="addon-btns">
          <div class="btn-group" role="group" aria-label="Basic example" >
            <button type="button" class="btn btn-primary btn-sm" @click="changeOffDate($event, item, index)">change date</button>
            <button type="button" class="btn btn-secondary btn-sm" :disabled="item.noChanged" @click="resetOffDate($event, item, index)">reset date</button>
          </div>
          <div class="btn-group" role="group" aria-label="Basic example" v-if="!item.needUpdate">
            <button type="button" class="btn btn-secondary btn-sm"  @click="changeNeedUpdate($event, item, index)">modify</button>
            <button type="button" class="btn btn-danger btn-sm"  @click="deleteAction($event, item, index)">delete</button>
          </div>
          <div class="btn-group" role="group" aria-label="Basic example" v-else>
            <button type="button" class="btn btn-primary btn-sm"  @click="updateClient($event, item, index)">update</button>
            <button type="button" class="btn btn-danger btn-sm" @click="cancelUpdate($event, item, index)">cancel</button>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import cloneDeep from '../assets/lodash.clonedeep.js'
import samoDialog from './dialog.js'
const uuidv1 = require('uuid/v1');
import axios from 'axios'
export default {
  name: 'v2rayManager',
  components: {
  },
  data() {
    return {
      dialogIns: undefined,
      form: {},
      filterContent: '',
      loadingList: false,
      listData: [],
      defaultFormData: {
        traffic: 20,
        uuid: '',
        email: '',
        port: 443,
        price: 15.00,
        remark: '',
        off_date: (new Date(new Date().setDate(new Date().getDate()+1)).format('yyyy/MM/dd hh:mm:ss')),
      },
      listDataOrigin: []
    }
  },
  computed: {
    calcListData() {
      if (this.filterContent) {
        const _reg = new RegExp(this.filterContent, 'gi')
        const _list = this.listData.filter(val => {
          return val.email.match(_reg) || val.remark.match(_reg)
        })
        return _list
      } else {
        return this.listData
      }
    }
  },
  methods: {
    renewMonth(offDate, mth){
      let _od = new Date(offDate)
      let _off_date = new Date(_od.setMonth(_od.getMonth()+Number(mth)))
      return _off_date
    },
    changeOffDateFromDate($event, item, index) {
      const _value = $event.target.value;
      const _newOffDate = _value
      
      this.$set(this.listData[index], 'off_date', _newOffDate)
      this.$set(this.listData[index], 'noChanged', false)
    },
    resetOffDate($event, item, index) {
      this.$set(this.listData[index], 'off_date', this.listDataOrigin[index].off_date)
      this.$set(this.listData[index], 'offDateFormat', new Date(this.listDataOrigin[index].off_date).format('yyyy-MM-dd hh:mm:ss'))
      this.$set(this.listData[index], 'noChanged', true)
    },
    resetTraffic($event, item) {
      this.dialogIns = new samoDialog({
        content: 'reseting...'
      })
      axios.post('/xray/resetTraffic', item).then(res => {
        this.dialogIns.setContent(res.message)
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
    addMonth($event, item, index) {
      const _value = $event.target.value;
      let _off_date = item.off_date
      let _newOffDate = this.renewMonth(_off_date, _value);
      _newOffDate = new Date(_newOffDate).format('yyyy/MM/dd hh:mm:ss')
      this.$set(this.listData[index], 'offDateFormat', _newOffDate)
      this.$set(this.listData[index], 'off_date', _newOffDate)
      this.$set(this.listData[index], 'noChanged', false)
    },
    cancelUpdate($event, item, index) {
      let _listData = cloneDeep(this.listData);
      _listData[index]['needUpdate'] = false;
      this.$set(this,'listData', _listData)
      
    },
    resetAction(){
      this.filterContent = ''
      this.getList()
    },
    deleteAction($event, item) {
      const _confirm = confirm('删除账号?')
      if (_confirm) {
        this.dialogIns = new samoDialog({
          content: 'deleting...'
        })
        axios.post('/xray/deleteClient', item).then(res => {
          this.dialogIns.setContent(res.message)
          this.getList()
        })
      }
    },
    calcOverDue(item) {
      // console.log(item)
      if (new Date().getTime() > new Date(item.off_date).getTime()) {
        return true;
      } else {
        return false;
      }
    },
    filterAction() {
      this.getList({
        conditions: {
          email: this.filterContent,
          remark: this.filterContent
        }
      })
      // if (!this.filterContent) {
      //   this.listData = cloneDeep(this.listDataOrigin);
      // } else {
      //   const _reg = new RegExp(this.filterContent, 'gi')
      //   this.listData = this.listData.filter(val => {
      //     return val.email.match(_reg) || val.remark.match(_reg)
      //   })
      // }
    },
    getTimeZone() {
      const date = new Date().getTimezoneOffset();
      let timezone = -date / 60;
      return timezone;
    },
    restartService() {
      this.dialogIns = new samoDialog({
        content: 'restarting...'
      })
      axios.post('/xray/restartService').then(res => {
        this.dialogIns.setContent(res.message)
        this.getList()
      })
    },
    changeOffDate($event, item) {
      this.updateClient($event, item)
    },
    changeNeedUpdate($event, item, index) {
      let _listData = cloneDeep(this.listData);
      _listData[index]['needUpdate'] = true;
      this.$set(this,'listData', _listData)
    },
    updateClient($event, item) {
      this.dialogIns = new samoDialog({
        content: 'updating...'
      })
      let _params = {
        ...item
      }
      // this.dialogIns.setContent(_params.offDateFormat)
      _params['off_date'] = _params.offDateFormat
      _params['timezone'] = this.getTimeZone()
      axios.post('/xray/updateClient', _params).then(res => {
        const {success, message} = res;
        this.dialogIns.setContent(message)
        this.dialogIns.setDialogStyle({
          'background-color': success ? '#efefef' : '#F56C6C',
          'color': success ? '#333' : '#fff',
        })
        this.getList()
      })
    },
    generateUUID() {
      this.form.uuid = uuidv1()
    },
    updateTrafficAction(){
      this.dialogIns = new samoDialog({
        content: 'updating...'
      })
      axios.post('/xray/updateTraffic').then(res => {
        this.dialogIns.setContent(res.message)
        this.getList()
      })
    },
    submitForm() {
      if (!this.form.email) {
        this.dialogIns = new samoDialog({
          content: 'email not avaliable'
        })
        return;
      }
      if (!this.form.uuid) {
        this.dialogIns = new samoDialog({
          content: 'uuid not avaliable'
        })
        return;
      }
      this.dialogIns = new samoDialog({
        content: 'loading...'
      })
      this.form['timezone'] = this.getTimeZone()
      axios.post('/xray/addClient', this.form).then(res => {
        this.dialogIns.setContent(res.message)
        if (res.success) {
          this.getList();
          this.resetForm()
        }
      })
    },
    resetForm() {
      this.$set(this, 'form', cloneDeep(this.defaultFormData));
    },
    genQrcode($even, item){
      this.dialogIns = new samoDialog({
        content: 'generating...'
      })
      axios.post('/xray/genQrcode', item).then(res => {
        const {success, data, message} = res;
        if (success) {
          this.dialogIns.setContent(`<div class="qrcode-wrap"><img src="${data.url}" class="qrcode-img"/><p class="qrcode-config">${data.config}</p></div>`)
        } else {
          this.dialogIns.setContent(message)
        }
      })
    },
    getList(params={}) {
      this.loadingList = true;
      this.listData = []
      axios.post('/xray/listClients', params).then(res => {
        this.loadingList = false;
        this.listData = []
        const {success, data} = res;
        if (success && data) {
          this.listData = data;
          this.listData.forEach((val) => {
            // console.log(val.off_date_utc)
            val['offDateFormat'] = new Date(val.off_date_utc+' UTC').format('yyyy/MM/dd hh:mm:ss')
            val['needUpdate'] = false;
            val['noChanged'] = true;
            if (val.down<0) {
              val['remainTraffic'] = Math.abs(val.down)
              val.down = 0;
            } else {
              val['remainTraffic'] = 0;
            }
          })
          this.listDataOrigin = cloneDeep(this.listData);
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
  padding: 0 1rem;
  /* display: grid;
  grid-template-columns: auto 1fr auto;
  grid-gap: 0 1rem; */
}
.uuid-modify {
  display: grid;
  grid-template-columns: auto 1fr;
  grid-gap: 0 1rem;
  align-items: center;
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
  /* display: grid;
  grid-template-columns: 1fr auto auto;
  grid-gap: 0 1rem;
  align-items: center; */
}
.list-info {
  display: grid;
  grid-auto-flow: column;
  grid-gap: 0 1rem;
  align-items: center;
  margin-bottom: 1rem;
}

.price-bage {
  display: inline-grid;
  align-items: center;
  grid-gap: .2rem;
  background-color: #ffc107;
  grid-template-columns: 1fr 1fr;
  border-radius: 4px;
  overflow: hidden;
  padding: 0 .5rem;
  font-size: 1.2rem;
}

</style>
