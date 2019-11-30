<template>
  <el-container>
    <el-header>
      <div @click="toHome" style="cursor: pointer">{{ siteTitle }}</div>
    </el-header>
    <el-main>
      <el-button @click="toNavigator"> {{ name1 }} </el-button>
    </el-main>
    <el-footer>
      <el-button @click="toHelloWorld"> {{ name2 }} </el-button>
    </el-footer>
  </el-container>
</template>

<script>
  import store from '../store'
  import { siteTitle } from '../strings'
  import * as UIAPI from '../APIs/ui'
  export default {
    name: 'Navigator',
    computed: {
      title: () => store.state.title,
      checkLoginIn: () => {
        return store.state.jwkToken
      },
    },
    data() {
      return {
        name1:'toNavigator',
        name2:'toHelloWorld',
        siteTitle,
      }
    },
    methods: {
      toHome() {
        UIAPI.updateTitleTo('Home')
        this.$router.push({ name: 'Home' })
      },
      toNavigator() {
        UIAPI.updateTitleTo('Navigator')
        this.$router.push({ name: 'Navigator' })
      },
      toHelloWorld() {
        UIAPI.updateTitleTo('HelloWorld')
        this.$router.push({ name: 'HelloWorld' })
      }
    },
  }
</script>


<style scoped>

</style>
