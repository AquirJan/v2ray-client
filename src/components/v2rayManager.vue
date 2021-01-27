<template>
  <div >
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
              <button type="button" class="btn btn-primary btn-sm" @click="generateUUID">generate</button>
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
        <div class="form-group">
          <div class="input-group mb-3">
            <div class="input-group-prepend">
              <span class="input-group-text" >price</span>
            </div>
            <input type="number" step="0.01" class="form-control" v-model="form.price"/>
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
        <input type="text" style="height: auto;" class="form-control inline-form-control" v-model="filterContent" @keydown.enter="filterAction"/>
        <div class="btn-group " role="group" aria-label="Basic example">
          <button type="button" class="btn btn-secondary btn-sm" @click="resetAction">reset</button>
          <button type="button" class="btn btn-primary btn-sm" @click="filterAction">search</button>
        </div>
      </div>
      <div class="cntr-flex justify-between">
        <button type="button" class="btn btn-dark btn-sm" @click="restartService">restart service</button>
        <button type="button" class="btn btn-primary btn-sm" @click="updateDataTrafficAction">update traffic</button>
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
          <span>上行：{{formatSize(item.up)}}</span>
          <span>下行：{{formatSize(item.down)}}</span>
          <span>total：{{formatSize(item.up+item.down)}}</span>
          <button type="button" class="btn btn-primary btn-sm" @click="resetBandWidth($event, item, index)">reset</button>
        </div>
        <div class="change-date-wrap">
          <span>Off Date :</span>
          <input type="date" class="form-control form-control-sm inline-form-control" v-model="item.offDateFormat" @change="changeOffDateFromDate($event, item, index)"/>
          <input type="number" class="form-control form-control-sm inline-form-control" @blur="addMonth($event, item, index)" value="0" min=0 max=99 maxlength="1"/>
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
// import dialogPop from './dialog.js'
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
        port: 443,
        remark: '',
        price: 15.00
      },
      filterContent: '',
      loadingList: false,
      listData: [],
      listDataOrigin: []
    }
  },
  methods: {
    renewMonth(offDate, mth){
      const _dateObj = new Date(offDate)
      let _year = _dateObj.getFullYear();
      let _month = Number(_dateObj.getMonth()+1)
      let _day = _dateObj.getDate();
      const renew = mth
      let _tmpSumMonths = Number(renew)+Number(_month);
      let _plusYears = Math.floor(_tmpSumMonths/12);
      if (_month === 12 && _tmpSumMonths >= 24) {
        _plusYears = _plusYears - 1;
      }
      if (_tmpSumMonths === 12) {
        _plusYears = 0
      }
      let _newMonth = _tmpSumMonths%12;
      _newMonth = _newMonth === 0 ? 12 : _newMonth;
      let _newYear = _year+_plusYears
      const newMonthDays = new Date(_newYear, _newMonth, 0).getDate();
      const _newDay = (_day - newMonthDays) >= 0 ? newMonthDays : _day;
      _newMonth = _newMonth === 0 ? 12 : _newMonth;
      const _finalDate = new Date(`${_newYear}-${_newMonth}-${_newDay}`)
      return _finalDate.format('yyyy-MM-dd')
    },
    changeOffDateFromDate($event, item, index) {
      const _value = $event.target.value;
      const _newOffDate = _value+' 00:00:00'
      
      this.$set(this.listData[index], 'offDate', _newOffDate)
      this.$set(this.listData[index], 'noChanged', false)
    },
    resetOffDate($event, item, index) {
      this.$set(this.listData[index], 'offDate', this.listDataOrigin[index].offDate)
      this.$set(this.listData[index], 'offDateFormat', new Date(this.listDataOrigin[index].offDate).format('yyyy-MM-dd'))
      this.$set(this.listData[index], 'noChanged', true)
    },
    resetBandWidth($event, item) {
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
    addMonth($event, item, index) {
      const _value = $event.target.value;
      let _offDate = item.offDate
      const _newOffDate = this.renewMonth(_offDate, _value);

      this.$set(this.listData[index], 'offDateFormat', _newOffDate)
      this.$set(this.listData[index], 'offDate', _newOffDate+' 00:00:00')
      this.$set(this.listData[index], 'noChanged', false)
    },
    cancelUpdate($event, item, index) {
      let _listData = cloneDeep(this.listData);
      _listData[index]['needUpdate'] = false;
      this.$set(this,'listData', _listData)
      
    },
    resetAction(){
      this.filterContent = ''
      this.listData = cloneDeep(this.listDataOrigin);
    },
    deleteAction($event, item) {
      const _confirm = confirm('删除账号?')
      if (_confirm) {
        axios.post('/v2ray/deleteClient', {id:item.id}).then(res => {
          this.getList()
          alert(res.msg)
        })
      }
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
        this.listData = cloneDeep(this.listDataOrigin);
      } else {
        const _reg = new RegExp(this.filterContent, 'gi')
        this.listData = this.listData.filter(val => {
          return val.email.match(_reg) || val.remark.match(_reg)
        })
      }
    },
    restartService() {
      axios.post('/v2ray/restartService').then(res => {
        this.getList()
        alert(res.msg)
      })
    },
    changeOffDate($event, item) {
      axios.post('/v2ray/changeOffDate', item).then(res => {
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
    updateDataTrafficAction(){
      axios.post('/v2ray/updateDataTraffic').then(res => {
        alert(res.msg)
        this.getList()
      })
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
      axios.post('/v2ray/addClient', this.form).then(res => {
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
        port: 443,
        price: 15.00,
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
            val['noChanged'] = true;
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
