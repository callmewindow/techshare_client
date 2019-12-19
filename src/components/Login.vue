<template>
  <el-card>
    <el-tabs :stretch="true">
      <el-tab-pane label="登录">
        <el-form class="login-container" ref="login" :model="login">
          <h1 class="title"></h1>
          <el-form-item label="">
            <el-input v-model="login.username" placeholder="用户名" clearable></el-input>
          </el-form-item>
          <el-form-item label="">
            <el-input v-model="login.password" placeholder="密码" show-password></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" style="width: 100%;" @click="doSubmitLogin()">登录</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="注册">
        <el-form class="register-container" ref="register" :model="register" :rules="rules"
                 label-width="80px">
          <h1 class="title"></h1>
          <el-form-item label="用户名" prop="username">
            <el-input v-model="register.username" clearable></el-input>
          </el-form-item>
          <el-form-item label="昵称" prop="nickname">
            <el-input v-model="register.nickname" clearable></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="userEmail">
            <el-input v-model="register.userEmail" clearable>
            </el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="register.password" show-password></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="checkPass">
            <el-input v-model="register.checkPass" show-password></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="doSubmitRegister('register')">立即注册</el-button>
            <el-button @click="resetForm('register')">清空</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
    </el-tabs>
  </el-card>

</template>

<script>
  import * as userAPI from "../APIs/user";

  export default {
    name: "Login",
    data() {
      var checkEmail = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('邮箱不能为空'));
        } else if (/([a-zA-Z]|[0-9])(\w|-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})/.test(value) == false) {
          return callback(new Error('邮箱格式错误'));
        } else {
          callback();
        }
      };
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else if (value.length < 6) {
          return callback(new Error('密码格式错误：长度须大于6位'));
        } else {
          if(/[A-Za-z].*[0-9]|[0-9].*[A-Za-z]/.test(value) == false){
            return callback(new Error('密码格式错误：必须同时包含字母和数字'));
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.register.password) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };

      return {
        login: {
          username: "",
          password: ""
        },
        register: {
          username: "",
          password: "",
          checkPass: "",
          nickname: "",
          userEmail: ""
        },

        rules: {
          username: [
            {required: true, message: '请输入用户名', trigger: 'blur'}
          ],
          nickname: [
            {required: true, message: '请输入昵称', trigger: 'blur'}
          ],
          userEmail: [
            {required: true, validator: checkEmail, trigger: 'blur'}
          ],
          password: [
            {required: true, validator: validatePass, trigger: 'blur'}
          ],
          checkPass: [
            {required: true, validator: validatePass2, trigger: 'blur'}
          ]
        }

      }
    },

    methods: {
      async doSubmitLogin() {
        try {
          const userInfo = await userAPI.login(this.login.username, this.login.password);
          const res = userInfo.data.msg;
          window.console.log(userInfo);
          if (res == "error") {
            this.$message.error('用户名或密码错误');
          } else {
            this.$message({
              message: '登录成功，2秒后跳转至主页',
              type: 'success'
            });
            this.$store.state.userId = userInfo.data.user._id;
            this.$store.state.identity = userInfo.data.user.identity;
            this.$store.state.messages = userInfo.data.user.messages;
            if(this.$store.state.messages){
              let msg = this.$store.state.messages;
              let cnt = 0;
              for(let i = 0;i<msg.length;i++){
                if(msg[i].noticeRead !== 'yes'){
                  cnt++;
                }
              }
              this.$store.state.messageNum = cnt;
            }
            // this.$store.state.nickname = userInfo.data.user.nickname;
            // this.$store.state.userEmail = userInfo.data.user.userEmail;
            // this.$store.state.userIntro = userInfo.data.user.userIntro;
            // this.$store.state.username = userInfo.data.user.username;
            if(userInfo.data.user.expertId){
              this.$store.state.expertId = userInfo.data.user.expert._id;
            }
            setTimeout(() => {
              this.$router.push({path: '/Home'});
            }, 2000);
          }
        } catch (e) {
          this.$message.error(e.toString());
        }
      },
      async doSubmitRegister(formName) {
        this.$refs[formName].validate(async (valid) => {
          if (valid) {
            try {
              const userInfo = await userAPI.register(this.register.username, this.register.nickname, this.register.password, this.register.userEmail);
              const res = userInfo.msg;
              if (res == "existUsername") {
                this.$message.error('用户名已被注册');
              } else if (res == "existUserEmail") {
                this.$message.error('邮箱已被注册');
              } else if (res == "databaseError") {
                this.$message.error('哦豁，数据库错误');
              } else {
                this.$message({
                  message: '注册成功，3秒后跳转至主页',
                  type: 'success'
                });
                this.$store.state.userId = userInfo.data.user._id;
                setTimeout(() => {
                  this.$router.push({path: '/Home'});
                }, 3000);
              }
            } catch (e) {
              this.$message.error('哦豁');
            }
          } else {
            return false;
          }
        });
      },

      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>

<style scoped>
  .login-container {
    width: 300px;
    margin: 0 auto;
  }
  .register-container {
    margin: 0 auto;
  }
</style>
