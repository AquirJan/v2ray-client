<template>
  <div>
    <form >
      <div class="form-group">
        <div class="input-group mb-3">
          <div class="input-group-prepend">
            <span class="input-group-text" >day price</span>
          </div>
          <input type="text" class="form-control" v-model="form.price"/>
        </div>
      </div>
      <div class="form-group">
        <div class="input-group mb-3">
          <div class="input-group-prepend">
            <span class="input-group-text" >total</span>
          </div>
          <input type="text" class="form-control" v-model="form.total" @blur="calcDate"/>
        </div>
      </div>
      <div class="form-group">
        <div class="input-group mb-3">
          <div class="input-group-prepend">
            <span class="input-group-text" >from</span>
          </div>
          <input type="text" class="form-control" v-model="form.fromDate"/>
        </div>
      </div>
      <div class="form-group">
        <div class="input-group mb-3">
          <div class="input-group-prepend">
            <span class="input-group-text" >to</span>
          </div>
          <input type="text" class="form-control" disabled :value="form.toDate"/>
        </div>
      </div>

      <div class="form-group text-right">
        <div class="btn-group " role="group" aria-label="Basic example">
          <button type="button" class="btn btn-secondary" @click="resetForm">reset</button>
          <button type="button" class="btn btn-success" @click="calcDate">calc</button>
        </div>
      </div>
    </form>
  </div>
</template>
<script>
export default {
  name: 'calcOffDate',
  data() {
    return {
      oneDay: 86400000,
      form: {
        price: 0.3,
        total: 0,
        fromDate: (new Date()).format('yyyy-MM-dd'),
        toDate: ''
      }
    }
  },
  methods: {
    resetForm() {
      this.$set(this, 'form', {
        price: 0.3,
        total: 0,
        fromDate: (new Date()).format('yyyy-MM-dd'),
        toDate: ''
      })
    },
    calcDate() {
      let _offDate = Math.floor(this.form.total/this.form.price) - 1
      _offDate = _offDate * this.oneDay
      _offDate = new Date(this.form.fromDate).getTime() + _offDate;
      _offDate = (new Date(_offDate)).format('yyyy-MM-dd')
      this.form.toDate = _offDate
    }
  }
}
</script>