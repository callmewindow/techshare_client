<template>
  <div id="navigator">

    <el-menu id="menu" :default-active="activeIndex" class="el-menu-demo" mode="horizontal">
      <el-menu-item @click="toHome" index="Home">
        <el-image
          style="height: 25px;width: 95px;margin: auto;"
          :src="wel"/>
      </el-menu-item>
      <el-menu-item @click="toSearch" index="Search">
        <i class="el-icon-search"></i>
      </el-menu-item>

      <el-menu-item style="float:right;" @click="toUser" index="User">
        <el-badge :is-dot="this.$store.state.noticeNum !== 0" :hidden="this.$store.state.noticeNum === 0" class="item">
          <i class="el-icon-user"></i>
        </el-badge>
      </el-menu-item>
      <el-menu-item style="float:right;" @click="toExpert" index="Expert">
        <i class="el-icon-s-custom"></i>
      </el-menu-item>
<!--      <el-menu-item style="float:right;" @click="toSetting" index="Setting">-->
<!--        <i class="el-icon-setting"></i>-->
<!--      </el-menu-item>-->
    </el-menu>

    <el-card shadow="never" id="loginWin" v-if="loginShow === 'yes'">
      <Login />
    </el-card>

  </div>
</template>

<script>
  import Login from "@/components/Login";
  import { siteTitle } from '../strings'
  export default {
    name: 'Navigator',
    components: {
      Login,
    },
    props: {
      activeFunc: String,
      login: String
    },
    data() {
      return {
        wel:require("@/images/techshare.png"),
        siteTitle,
        activeIndex: this.activeFunc,
        now: this.activeFunc,
        loginShow: this.login,
      }
    },
    methods: {
      toHome() {
        this.$router.push({path: '/Home'});
      },
      toSearch() {
        this.$router.push({path: '/Search'});
      },
      toUser() {
        if(this.$store.state.userId === 'null')
        {
          this.$message('请先登录');
          this.$router.push({path: '/Login'});
          return ;
        }
        else
        {
          this.$router.push({path: '/User'});
        }
      },
      toSetting() {
        this.$router.push({path: '/Setting'});
      },
      toExpert() {
        this.$router.push({path: '/Expert'});
      },
    }
  }
</script>


<style scoped>
  #menu{
    width: 100%;
    float: left;
  }
  #loginWin{
    margin: auto;
    max-width: 500px;
  }
</style>
