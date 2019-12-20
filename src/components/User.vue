<template>
  <el-card>
    <Navigator active-func="User"/>
    .
    <div id="main">
      <el-tabs v-model="userFunc" tab-position="left" style="height: auto;">
        <el-tab-pane label="用户信息" name="用户信息">
          <el-card class="infor">
            <div class="user_title">
              基本信息
              <el-link :underline="false" type="warning" @click="logoutShow = true">
                注销
              </el-link>
              <span v-show="logoutShow">
                <el-link :underline="false" type="danger" @click="logout">
                  确认退出
                </el-link>
                <el-link :underline="false" type="info" @click="logoutShow = false">
                  取消
                </el-link>
              </span>
            </div>
            <div class="user_infor">
              <div class="infor_title">昵称<i class="el-icon-edit edit" @click="editNick ^= true"></i></div>
              <div class="infor_content" v-show="!editNick">{{user.nickname}}</div>
              <div v-show="editNick">
                <label>
                  <input v-model="newNickname"/>
                </label>
                <span>
                  <el-link :underline="false" type="primary" @click="changeNick">
                    保存
                  </el-link>
                  <el-link :underline="false" type="info" @click="editNick = false">
                    取消
                  </el-link>
                </span>
              </div>
            </div>
            <div class="user_infor">
              <div class="infor_title">简介<i class="el-icon-edit edit" @click="editUserIntro ^= true"></i></div>
              <div class="infor_content" v-show="!editUserIntro">{{user.userIntro?user.userIntro:noIntro}}</div>
              <div v-show="editUserIntro">
                <label>
                  <textarea style="width: 60%" v-model="newUserIntro"/>
                </label>
                <span>
                  <el-link :underline="false" type="primary" @click="changeUserIntro">
                    保存
                  </el-link>
                  <el-link :underline="false" type="info" @click="editUserIntro = false">
                    取消
                  </el-link>
                </span>
              </div>
            </div>
            <div class="user_infor">
              <div class="infor_title">专家身份</div>
              <div class="infor_content" v-if="!expert" @click="toApply">
                <span style="color: #409EFF;cursor: pointer">前往申请</span>
              </div>
              <div class="infor_content" v-if="expert">
                <!--                <div style="color: #409EFF;cursor: pointer" @click="toExpert">-->
                <!--                  {{expert.expertName}}-{{expert.workplace}}-->
                <!--                </div>-->
                <el-link type="primary" style="margin-left: 0;font-size: 16px" @click="toExpert">{{expert.workplace}}：{{expert.expertName}}</el-link>
                <el-link :underline="false" type="success" @click="toUpload">上传文献</el-link>
              </div>
            </div>
            <el-divider></el-divider>

            <div class="user_title">注册信息</div>
            <div class="user_infor">
              <div class="infor_title">用户名</div>
              <div class="infor_content">{{user.username}}</div>
            </div>
            <div class="user_infor">
              <div class="infor_title">注册邮箱<i class="el-icon-edit edit" @click="nope"></i></div>
              <div class="infor_content">{{user.userEmail}}</div>
            </div>
            <div class="user_infor">
              <div class="infor_title">密码修改<i class="el-icon-edit edit" @click="editPwd ^= true"></i></div>
              <div v-show="editPwd">
                <el-input style="width: 50%;line-height: 1.3" placeholder="输入新密码" v-model="newPwd" show-password></el-input>
                <span>
                  <el-link :underline="false" type="primary" @click="changePwd">
                    保存
                  </el-link>
                  <el-link :underline="false" type="info" @click="editPwd = false">
                    取消
                  </el-link>
                </span>
              </div>
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
        <el-tab-pane name="消息中心">
          <template slot="label">
            <el-badge :value="this.$store.state.messageNum" :hidden="this.$store.state.messageNum === 0" class="item">
              消息中心
            </el-badge>
          </template>

          <el-tabs type="border-card" class="infor" v-model="activeName">
            <el-tab-pane label="未读消息" name="未读">
              <div style="text-align:left" v-show="this.$store.state.messageNum === 0">暂无新消息</div>

              <div v-show="this.$store.state.messageNum !== 0">
                <div style="text-align: left">
                  <el-link style="margin-left: 0" type="success" @click="readAllNotice()">全部已读</el-link>
                </div>
                <div style="text-align: left;">
                  <div v-for="(notice,index) in this.$store.state.messages" :key="index">
                    <div class="noticeInfo" v-if="notice.noticeRead !== 'yes'">
                      <div class="noticeType">
                        类型：{{notice.noticeType}} 时间：{{notice.noticeBuildTime.slice(0,19)}}
                      </div>
                      <div class="noticeCon">
                        {{notice.noticeContent}}
                      </div>
                      <el-link v-if="notice.noticeType !== '论文认领'" class="noticeBtn" type="primary"
                               @click="readNotice(index)">
                        已读
                      </el-link>
                      <el-link v-if="notice.noticeType === '新论文'" class="noticeBtn" type="primary"
                               @click="toPaper(notice.noticePlusContent)">
                        前往论文
                      </el-link>
                      <el-link v-if="notice.noticeType === '新专利'" class="noticeBtn" type="primary"
                               @click="toPatent(notice.noticePlusContent)">
                        前往专利
                      </el-link>
                      <template v-if="notice.noticeType === '论文认领'">
                        <el-link class="noticeBtn" type="primary" @click="toPaper(notice.noticePlusContent)">
                          前往论文
                        </el-link>
                        <el-link class="noticeBtn" type="primary" @click="passClaim(notice,index)">
                          通过
                        </el-link>
                        <el-link class="noticeBtn" type="primary" @click="declClaim(notice,index)">
                          拒绝
                        </el-link>
                      </template>
                    </div>
                  </div>
                </div>
              </div>

            </el-tab-pane>
            <el-tab-pane label="已读消息" name="已读">
              <div style="text-align: left;color:gray">这里是已读消息</div>
              <div style="text-align: left;">
                <div v-for="(notice,index) in this.$store.state.messages" :key="index">
                  <div class="noticeInfo" v-if="notice.noticeRead === 'yes'">
                    <div class="noticeType">
                      类型：{{notice.noticeType}} 时间：{{notice.noticeBuildTime.slice(0,19)}}
                    </div>
                    <div class="noticeCon">
                      {{notice.noticeContent}}
                    </div>
                  </div>
                </div>
              </div>
            </el-tab-pane>
          </el-tabs>

        </el-tab-pane>

        <!--        <el-tab-pane label="使用记录" name="使用记录">-->
        <!--          <el-card class="infor">-->
        <!--            <div class="user_title">使用记录</div>-->
        <!--          </el-card>-->
        <!--        </el-tab-pane>-->

      </el-tabs>
    </div>
    <Footer />
  </el-card>
</template>

<script>
  import Navigator from "@/components/Navigator";
  //首先引用所需的api过来
  import * as userAPI from "../APIs/user";
  import * as noticeAPI from "../APIs/notice";
  import * as claimAPI from "../APIs/claim";
  import Footer from "@/components/Footer";

  export default {
    name: "user",
    components: {
      Navigator,
      Footer,
    },
    data() {
      return {
        editNick: false,
        editUserIntro: false,
        editPwd: false,
        newNickname: '',
        newUserIntro: '',
        newPwd: '',

        activeName: '未读',
        userFunc: "用户信息",
        logoutShow: false,

        noIntro: '介绍下自己吧~以后会有大用哦',
        user: {
          userIntro: "userIntro",
          username: "username",
          nickname: "nickname",
          userEmail: "userEmail",
        },
        expert: null,
      }
    },
    mounted() {
      this.getUserInfo();
    },
    methods: {
      getImage(index) {
        return require("@/images/齐木楠雄" + index + ".png");
      },
      async changeNick() {
        if (this.newNickname.length > 30) {
          this.$message.error('内容过长，应小于30');
          return;
        }
        try {
          const change = await userAPI.editNick(this.$store.state.userId, this.newNickname);
          if (change.data.msg === 'ok') {
            this.user.nickname = this.newNickname;
            this.editNick = false;
            this.$message.success('修改成功');
          } else {
            this.$message.error('修改失败，请稍后再试');
          }
        } catch (e) {
          this.$message.error(e.toString());
        }
      },
      async changeUserIntro() {
        if (this.newUserIntro.length > 200) {
          this.$message.error('内容过长，应小于200');
          return;
        }
        try {
          const change = await userAPI.editUserIntro(this.$store.state.userId, this.newUserIntro);
          if (change.data.msg === 'ok') {
            this.user.userIntro = this.newUserIntro;
            this.editUserIntro = false;
            this.$message.success('修改成功');
          } else {
            this.$message.error('修改失败，请稍后再试');
          }
        } catch (e) {
          this.$message.error(e.toString());
        }
      },
      async changePwd() {
        let value = this.newPwd;
        if ((value.length < 6) || (/[A-Za-z].*[0-9]|[0-9].*[A-Za-z]/.test(value) == false)) {
          this.$message.error('密码应大于6位且同时包含数字字母');
          return;
        }
        try {
          const change = await userAPI.editPassword(this.$store.state.userId, this.newPwd);
          if (change.data.msg === 'ok') {
            this.editPwd = false;
            this.$message.success('修改成功');
          } else {
            this.$message.error('修改失败，请稍后再试');
          }
        } catch (e) {
          this.$message.error(e.toString());
        }
      },
      nope() {
        this.$message('编辑功能暂未开放');
      },
      logout() {
        this.$store.state.userId = 'null';
        this.$store.state.expertId = 'null';
        this.$store.state.messageNum = 0;
        this.$store.state.messages = [];
        this.$store.state.identity = 'null';
        this.$message.success('注销成功');
        this.$router.push({path: '/Home'});
      },
      toApply() {
        this.$router.push({path: "/ExpertApp"});
      },
      toExpert() {
        this.$router.push({path: "/Expert/" + this.$store.state.expertId});
      },
      toUpload() {
        this.$router.push({path: "/AddInfo"});
      },
      toPaper(paperid) {
        this.$router.push({path: "/paperdetail/" + paperid});
      },
      toPatent(patentid) {
        this.$router.push({path: "/patentdetail/" + patentid});
      },
      async readAllNotice() {
        try {
          await noticeAPI.setAllNoticesRead(this.$store.state.userId);
          await this.getUserInfo();
        } catch (e) {
          this.$message.error(e.toString());
        }
      },
      async readNotice(index) {
        try {
          window.console.log(index);
          await noticeAPI.setOneNoticeRead(this.$store.state.userId,index);
          await this.getUserInfo();
        } catch (e) {
          this.$message.error(e.toString());
        }
      },
      async passClaim(notice,index) {
        try {
          const temp = await claimAPI.passClaim(notice.noticePlusContent,notice.noticeContent.split("邮箱为 ")[1]);
          window.console.log(temp);
		  await this.readNotice(index);
        } catch (e) {
          this.$message.error(e.toString());
        }
      },
      async declClaim(notice,index) {
        try {
          const temp = await claimAPI.refuseClaim(notice.noticePlusContent,notice.noticeContent.split("邮箱为 ")[1]);
          window.console.log(temp);
		  await this.readNotice(index);
          await this.getUserInfo();
        } catch (e) {
          this.$message.error(e.toString());
        }
      },
      //定义异步方法
      async getUserInfo() {
        //在异常获取中进行
        try {
          //传的值需要按照接口的定义来
          //利用const类型变量接受返回值（这里的返回值就是后端的返回值）
          const userInfo = await userAPI.getUserInfo(this.$store.state.userId);
          //直接整个返回值转移
          //或者从中提取部分内容
          //（具体能提取那些值建议先用console输出然后再调试窗口进行查看）
          window.console.log(userInfo.data);
          let userInfoNow = userInfo.data.user_info;
          this.user = userInfoNow;
          this.newNickname = userInfoNow.nickname;
          if (this.user.userIntro) {
            this.newUserIntro = this.user.userIntro;
          }
          if (this.user.expert) {
            this.expert = this.user.expert;
          }
          this.$store.state.messages = userInfoNow.messages;
          let msg = this.$store.state.messages;
          let cnt = 0;
          for (let i = 0; i < msg.length; i++) {
            if (msg[i].noticeRead !== 'yes') {
              cnt++;
            }
          }
          this.$store.state.messageNum = cnt;
        } catch (e) {
          //出错就利用el的消息提示输出错误
          this.$message.error(e.toString());
        }
      }
    }
  }
</script>

<style scoped>
  .infor {
    margin: 10px;
    margin-top: 0;
  }

  .user_title {
    text-align: left;
    font-weight: bold;
    line-height: 20px;
  }

  .user_infor {
    margin-top: 10px;
    text-align: left;
  }
  .noticeCenter {
    margin-top: 10px;
    padding-bottom: 20px;
  }

  .edit {
    margin-left: 5px;
    cursor: pointer;
  }

  .infor_title {
    height: 30px;
    line-height: 30px;
    color: gray;
  }

  .infor_content {
    width: auto;
  }

  #hot {
    margin-top: 20px;
  }

  .el-link {
    margin-left: 10px;
  }

  .noticeInfo {
    padding-bottom: 5px;
    border-bottom: 1px solid black;
  }

  .noticeType {
    margin-top: 5px;
    font-size: 12px;
  }

  .noticeCon {
    margin-top: 5px;
    text-indent: 2em;
  }

  .noticeBtn {
    margin-top: 5px;
  }

  input {
    border: none;
    border-bottom: 1px solid black;
    font-size: 16px;
    line-height: 1.3;
    font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  }

  input:focus {
    outline: 0;
    border-bottom: 1px solid #409EFF;
  }

  textarea {
    border: none;
    border-bottom: 1px solid black;
    font-size: 16px;
    line-height: 1.3;
    font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  }

  textarea:focus {
    outline: 0;
    border-bottom: 1px solid #409EFF;
  }

  .el-carousel__item:nth-child(n) {
    background-color: #d3dce6;
  }
</style>
