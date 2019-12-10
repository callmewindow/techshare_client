<template>
  <div id="app">
    <router-view keep-alive/>
  </div>
</template>

<script>
import { siteTitle } from './strings'

export default {
  name: 'app',
  data: () => ({ siteTitle }),
}
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 0;
  }
</style>
