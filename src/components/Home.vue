<template>
  <el-card>
    <Navigator active-func="Home" />
    <div id="main">
      <div id="logo">
        <el-image
          style="height: auto;width: 300px"
          :src="wel"/>
      </div>
      <div id="input">
        <el-input placeholder="请输入内容" v-model="input" class="input-with-select">
          <el-select v-model="select" style="width: 80px" slot="prepend">
            <el-option label="论文" value="论文"></el-option>
            <el-option label="专利" value="专利"></el-option>
            <el-option label="专家" value="专家"></el-option>
          </el-select>
          <el-button slot="append" icon="el-icon-search" @click="toSearch"></el-button>
        </el-input>
      </div>
      <div id="hot">
        <el-carousel :interval="4000" type="card" height="200px">
          <el-carousel-item v-for="item in 4" :key="item">
            <div id="hotImage">
              <el-image
                style="height: 200px"
                :src="getImage(item)"
                fit="contain"/>
            </div>
          </el-carousel-item>
        </el-carousel>
      </div>
      <div id="link">
        <el-row :gutter="20">
          <el-col :xs="12" :sm="6" :md="4" v-for="(li,index) in links" :key="index">
            <div id="linkImg">
              <el-image
                style="height: 80px"
                :src="li.img"
                fit="contain"></el-image>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
  </el-card>
</template>

<script>
  import Navigator from "@/components/Navigator";

  export default {
    name: "Home",
    components: {
      Navigator,
    },
    data() {
      return {
        wel: require("@/images/techshare.png"),
        input: '',
        select: "论文",
        links:[
          {
            img:require("@/images/techshare.png"),
            url:"",
          },
          {
            img:require("@/images/techshare.png"),
            url:"",
          },
          {
            img:require("@/images/techshare.png"),
            url:"",
          },
          {
            img:require("@/images/齐木楠雄2.png"),
            url:"",
          },
          {
            img:require("@/images/techshare.png"),
            url:"",
          },
          {
            img:require("@/images/techshare.png"),
            url:"",
          },
          {
            img:require("@/images/齐木楠雄2.png"),
            url:"",
          },
          {
            img:require("@/images/techshare.png"),
            url:"",
          },
          {
            img:require("@/images/techshare.png"),
            url:"",
          },
          {
            img:require("@/images/齐木楠雄2.png"),
            url:"",
          },
          {
            img:require("@/images/techshare.png"),
            url:"",
          },
          {
            img:require("@/images/techshare.png"),
            url:"",
          },
        ]
      }
    },
    methods: {
      getImage( index ) {
        return require("@/images/齐木楠雄"+index+".png");
      },
      toSearch() {
        this.$router.push("Search");
      }
    }
  }
</script>

<style scoped>
  #main{
    height: auto;
    clear: both;
  }
  #logo{
    padding-top: 10px;
  }
  #input{
    width: 60vw;
    margin: auto;
    margin-top: 5px;
  }
  #hot{
    width: 80vw;
    margin: auto;
    margin-top: 30px;
  }
  #hotImage{
    cursor: pointer;
  }
  .el-select .el-input {
    width: 130px;
  }
  #link{
    width: 60vw;
    margin: auto;
    margin-top: 10px;
  }
  #linkImg{
    border-radius: 4px;
    min-height: 80px;
    box-shadow: 2px 2px 5px rgba(0,0,0,0.3);
  }
  .el-col{
    margin-bottom: 20px;
  }
</style>
