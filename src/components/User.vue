<template>
  <el-card>
    <Navigator active-func="User" />
    .
    <div id="main">
      <el-tabs v-model="userFunc" tab-position="left" style="height: auto;">
        <el-tab-pane label="用户信息" name="用户信息">
          <el-card class="infor">
            <div class="user_title">基本信息</div>
            <div class="user_infor">
              <div class="infor_title">昵称<i class="el-icon-edit edit" @click="nope"></i></div>
              <div class="infor_content">{{user.nickname}}</div>
            </div>
            <div class="user_infor">
              <div class="infor_title">简介<i class="el-icon-edit edit" @click="nope"></i></div>
              <div class="infor_content">{{user.userIntro}}</div>
            </div>
            <div class="user_infor">
              <div class="infor_title">专家身份</div>
              <div class="infor_content" v-if="user.expertId !== ''" @click="toExpert">
                <span style="color: #409EFF;cursor: pointer">前往申请</span>
              </div>
              <div class="infor_content" v-if="user.expertId === ''" @click="toExpert">
                <span style="color: #409EFF;cursor: pointer">{{user.expert.expertName}}</span>
              </div>
            </div>
            <div class="user_infor">
              <div class="infor_title">专家身份</div>
              <div class="infor_content" v-if="user.expertId === ''" @click="toExpert">
                <span style="color: #409EFF;cursor: pointer">前往申请</span>
              </div>
              <div class="infor_content" v-if="user.expertId !== ''" @click="toExpert">
                <span style="color: #409EFF;cursor: pointer">
                  {{user.expert.expertName}}-{{user.expert.expertTitle}}-{{user.expert.workplace}}
                </span>
              </div>
            </div>
            <el-divider></el-divider>
            <div class="user_title">注册信息</div>
            <div class="user_infor">
              <div class="infor_title">用户名</div>
              <div class="infor_content">{{user.username}}</div>
            </div>
            <div class="user_infor">
              <div class="infor_title">注册邮箱</div>
              <div class="infor_content">{{user.userEmail}}</div>
            </div>
            <div class="user_infor">
              <div class="infor_title">密码修改<i class="el-icon-edit edit" @click="nope"></i></div>
            </div>
            <el-carousel id="hot" :interval="4000" height="200px" direction="vertical">
              <el-carousel-item v-for="item in 4" :key="item">
                <div id="hotImage">
                  <el-image
                    style="height: 200px"
                    :src="getImage(item)"
                    fit="contain"/>
                </div>
              </el-carousel-item>
            </el-carousel>
          </el-card>

        </el-tab-pane>
        <el-tab-pane label="使用记录" name="使用记录">
          <el-card class="infor">
            <div class="user_title">使用记录</div>
          </el-card>
        </el-tab-pane>
        <el-tab-pane  label="？？？？" name="？？？？">
          <el-card class="infor">
            ？？？？
          </el-card>
        </el-tab-pane>
      </el-tabs>
    </div>
    .
  </el-card>
</template>

<script>
  import Navigator from "@/components/Navigator";
  export default {
    name: "user",
    components: {
      Navigator,
    },
    data() {
      return {
        userFunc: "用户信息",
        user: {
          userId:"123",
          expertId:"234",
          expert:{
            expertName:"王宇轩",
            expertTitle:"码农",
            workplace:"BUAA_Soft",
          },
          userIntro:"When the sky is dark, it means just the beginning",
          username:"wyx847590417",
          nickname:"稼轩",
          userEmail:"847590417@qq.com",
        }
      }
    },
    methods: {
      getImage( index ) {
        return require("@/images/齐木楠雄"+index+".png");
      },
      nope() {
        this.$message('编辑功能暂未开放');
      },
      toExpert() {

      }
    }
  }
</script>

<style scoped>
  .infor{
    margin: 10px;
    margin-top: 0;
  }
  .user_title{
    text-align: left;
    font-weight: bold;
  }
  .user_infor{
    margin-top: 10px;
    text-align: left;
  }
  .edit{
    margin-left: 5px;
    cursor: pointer;
  }
  .infor_title{
    height: 30px;
    line-height: 30px;
    color: gray;
  }
  .infor_content{
    width: auto;
  }
  #hot{
    margin-top: 20px;
  }
  .el-carousel__item:nth-child(n) {
    background-color: #d3dce6;
  }
</style>
