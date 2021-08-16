<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'app'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #333;
}
.inline-form-control {
  display: unset !important;
  width: auto !important;
}
.clear-mb {
  margin-bottom: 0;
}
.full-width {
  width: 100%;
}
.cntr-grid {
  display: grid;
}
.cntr-gaf-column{
  grid-auto-flow: column;
}
.cntr-gg-medium {
  grid-gap: 1rem;
}
.cntr-gg-xsm {
  grid-gap: .5rem;
}
.icom {
  display: inline-grid;
  width: 1em;
  height: 1em;
  stroke-width: 0;
  stroke: currentColor;
  fill: currentColor;
}

.dis-grid {
  display: grid;
}
.grid-2-cols {
  grid-template-columns: 1fr 1fr;
}
.grid-gap-small {
  grid-gap: 1rem;
}
</style>
