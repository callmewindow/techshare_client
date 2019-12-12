<template>
  <div id="navigator">

    <el-menu id="menu" :router="true" :default-active="activeIndex" class="el-menu-demo" mode="horizontal">
      <el-menu-item index="Home">
        <el-image
          style="height: 25px;width: 95px;margin: auto;"
          :src="wel"/>
      </el-menu-item>

      <el-menu-item v-show="needSearch === 'true' ">
        <el-input placeholder="请输入内容" v-model="input" class="input-with-select">
          <el-select v-model="select" style="width: 80px" slot="prepend">
            <el-option label="论文" value="论文"></el-option>
            <el-option label="专利" value="专利"></el-option>
            <el-option label="专家" value="专家"></el-option>
          </el-select>
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
      </el-menu-item>
      <el-menu-item style="float:right;" index="User">
        <i class="el-icon-user"></i>
      </el-menu-item>
      <el-menu-item style="float:right;" index="Expert">
        <i class="el-icon-s-custom"></i>
      </el-menu-item>
      <el-menu-item style="float:right;" index="Setting">
        <i class="el-icon-setting"></i>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
  import store from '../store'
  import { siteTitle } from '../strings'
  export default {
    name: 'Navigator',
    props: {
      needSearch: String,
      activeFunc: String
    },
    computed: {
      title: () => store.state.title,
      checkLoginIn: () => {
        return store.state.jwkToken
      },
    },
    data() {
      return {
        wel:require("@/images/techshare.png"),
        siteTitle,
        activeIndex: this.activeFunc,
        input: '',
        select: "论文",
      }
    },
    methods: {

    },
  }
</script>


<style scoped>
  #menu{
    width: 100%;
    float: left;
  }
</style>
