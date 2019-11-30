<template>
  <div id="app">
    <!-- 全局展示的组件 -->
    <Navigator />
    <!-- 初始内容，利用msg可以进行传值操作 -->
<!--    <HelloWorld msg="Welcome to Your Vue.js App"/>-->
    <!-- 进行内容的替换，路径代表的组件在router.js中查看 -->
    <keep-alive>
      <router-view :key="$route.path" />
    </keep-alive>
  </div>
</template>

<script>
import Navigator from "@/components/Navigator";
import { siteTitle } from './strings'

export default {
  name: 'app',
  components: {
    Navigator
  },
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
  margin-top: 60px;
}
</style>
