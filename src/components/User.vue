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
  //首先引用所需的api过来
  import * as userAPI from "../APIs/user";
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
        },
        userTemp:{}
      }
    },
    activated(){
      this.getUserInfo();
    },
    methods: {
      getImage( index ) {
        return require("@/images/齐木楠雄"+index+".png");
      },
      nope() {
        this.$message('编辑功能暂未开放');
      },
      toExpert() {

      },
      //定义异步方法
      async getUserInfo() {
        //在异常获取中进行
        try {
          //传的值需要按照接口的定义来
          //利用const类型变量接受返回值（这里的返回值就是后端的返回值）
          const userInfo = await userAPI.getUserInfo(this.userId);
          //直接整个返回值转移
          this.userTemp = userInfo;
          //或者从中提取部分内容
          //（具体能提取那些值建议先用console输出然后再调试窗口进行查看）
          this.userTemp = userInfo.data;
        } catch (e) {
          //出错就利用el的消息提示输出错误
          this.$message.error('编辑功能暂未开放');
        }
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
