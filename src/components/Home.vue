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
        <el-input placeholder="请输入内容" v-model="searchInput" class="input-with-select">
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
            <div id="linkImg" @click="toOut(li.url)">
              <el-image
                style="height: 50px;padding: 5px"
                :src="li.img"
                fit="contain"
              />
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
    <Footer />
  </el-card>
</template>

<script>
  import Navigator from "@/components/Navigator";
  import Footer from "@/components/Footer";

  export default {
    name: "Home",
    components: {
      Navigator,
      Footer,
    },
    data() {
      return {
        wel: require("@/images/techshare.png"),
        searchInput: '',
        select: "论文",
        typeid: '',
        links:[
          {
            img:require("@/images/中国知网.jpg"),
            url:"https://www.cnki.net/",
          },
          {
            img:require("@/images/万方数据.jpg"),
            url:"http://www.wanfangdata.com.cn/",
          },
          {
            img:require("@/images/维普网.jpg"),
            url:"http://www.cqvip.com/",
          },
          {
            img:require("@/images/SpringerLink.png"),
            url:"https://link.springer.com/",
          },
          {
            img:require("@/images/ScienceDirect.png"),
            url:"https://www.sciencedirect.com/",
          },
          {
            img:require("@/images/WileyOnline.png"),
            url:"https://onlinelibrary.wiley.com/",
          },
          {
            img:require("@/images/ScienceWeb.jpg"),
            url:"http://apps.webofknowledge.com/",
          },
          {
            img:require("@/images/EngineeringVillage.png"),
            url:"http://www.engineeringvillage.com/",
          },
          {
            img:require("@/images/sagepub.png"),
            url:"https://journals.sagepub.com/",
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
        //搜索就相当于跳转到当前页面，借助created方法内容进行搜索
        //百度貌似就是用的这种方法
        switch (this.select) {
          case '专家':
            this.typeid = '1';
            break;
          case '论文':
            this.typeid = '2';
            break;
          case '专利':
            this.typeid = '4';
            break;
        }
        this.$router.push({path:"/Search/?typeid="+this.typeid+"&content="+this.searchInput});
      },
      toOut(url){
        if(url === ''){
          location.reload();
          return ;
        }
        window.open(url,'target','')
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
    cursor: pointer;
    border-radius: 4px;
    box-shadow: 2px 2px 5px rgba(0,0,0,0.3);
  }
  .el-col{
    margin-bottom: 20px;
  }
</style>
