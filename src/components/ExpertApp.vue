<template>
  <el-card class="All">
    <Navigator active-func="Expert" />
    <el-card>
      <el-row>
        <el-col :span="22" :offset="1">
          <div class="bg-top font-top">
            专家认证
            <el-divider></el-divider>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-steps :active="page" finish-status="success" align-center>
          <el-step title="专家认证信息填写" icon="el-icon-edit"></el-step>
          <el-step title="认证信息提交" icon="el-icon-upload2"></el-step>
        </el-steps>
      </el-row>
      <el-row>
        <el-col :span="18" :offset="3">
          <div class="grid-content bg-white">
            <el-tabs type="border-card">
              <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" v-if="page===0">
                <el-form-item>
                </el-form-item>
                <el-form-item label="姓名" prop="expertName">
                  <el-input v-model="ruleForm.expertName"></el-input>
                </el-form-item>
                <el-form-item label="职称" prop="expertTitle">
                  <el-input v-model="ruleForm.expertTitle"></el-input>
                </el-form-item>
                <el-form-item label="工作单位" prop="workplace">
                  <el-input v-model="ruleForm.workplace"></el-input>
                </el-form-item>
                <el-form-item label="联系邮箱" prop="expertEmail">
                  <el-input v-model="ruleForm.expertEmail"></el-input>
                </el-form-item>
                <el-form-item label="身份证明图片" prop="identityImage">
                  <el-upload
                    class="upload-demo"
                    ref="upload"
                    drag
                    :on-success="imgSuccess"
                    :on-remove="handleRemove"
                    :action="imgUrl"
                    :before-upload="beforeUpload"
                    :limit="1"
                    :on-exceed="handleExceed"
                    :auto-upload="false"
                    :file-list="identityImage"
                    v-bind:name="expertApply.userId"
                  >
                    <i class="el-icon-upload"></i>
                    <div class="el-upload__text">将png或jpg格式图片拖到此处，或<em>点击上传</em></div>
                  </el-upload>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="submitPic">提交认证</el-button>
                </el-form-item>
              </el-form>

              <transition name="el-zoom-in-top">//动态效果
                <div style="text-align: center; margin-top:80px;" v-show="show">
                            <span style="font-size: 40px; color: #409EFF;">
                                {{showMsg}}<br/>
                            </span>
                  <i class="el-icon-circle-check"
                     style="margin-top:15px; margin-bottom:100px;font-size: 40px; color: #409EFF;"></i>
                </div>
              </transition>

            </el-tabs>
          </div>
        </el-col>
      </el-row>
    </el-card>
    <Footer />
  </el-card>
</template>

<script>
  import * as applyAPI from "../APIs/apply";
  import Navigator from "@/components/Navigator";
  import Footer from "@/components/Footer";

  export default {
    name: "apply_expert",
    components: {
      Navigator,
      Footer,
    },
    data() {
      const checkEmail = (rule, value, callback) => {
        const mailReg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
        setTimeout(() => {
          if (mailReg.test(value)) {
            callback()
          } else {
            callback(new Error('请输入正确的邮箱地址'))
          }
        }, 100)
      };

      const checkPic = (rule, value, callback) => {
        if (this.ifIdentityImage) {
          callback()
        } else {
          callback(new Error('请上传身份证明图片'));
        }
      };

      return {
        imgUrl: 'http://101.200.219.50:8000/api/expert/uploadImage',
        page: -1,
        showMsg: "认证消息已提交",
        show: false,
        identityImage: [],
        ifIdentityImage: false,
        expertApply: {
          userId: this.$store.state.userId,
          expertName: '',
          expertTitle: '',
          workplace: '',
          expertEmail: ''
        },
        ruleForm: {
          expertName: '',
          expertTitle: '',
          workplace: '',
          expertEmail: ''
        },
        rules: {
          expertName: [
            {required: true, message: '请输入您的姓名', trigger: 'blur'},
          ],
          expertTitle: [
            {required: true, message: '请输入您的职称', trigger: 'blur'},
          ],
          workplace: [
            {required: true, message: '请输入您的工作单位', trigger: 'blur'},
          ],
          expertEmail: [
            {required: true, message: '请输入您的邮箱', trigger: 'blur'},
            {validator: checkEmail, trigger: 'blur'}
          ],
          identityImage: [
            {required: true, validator: checkPic, trigger: 'blur'}
          ],
        }
      };
    },
    created() {
      this.getApplyState();
    },

    methods: {
      beforeUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isPNG = file.type === 'image/png';
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isJPG && !isPNG) {
          this.$message.error('上传图片只能是 JPG 或 PNG 格式！');
        }
        if (!isLt2M) {
          this.$message.error('上传图片大小不能超过 2MB!');
        }
        if ((isJPG || isPNG) && isLt2M) {
          this.ifIdentityImage = true;
        }
        return (isJPG || isPNG) && isLt2M;
      },

      handleExceed() {
        this.$message.warning(`只可上传一张身份证明图片！`);
      },

      imgSuccess(res) {//, file, fileList
        window.console.log(res);  // 这里可以获得上传成功的相关信息
        if (res === 'ok') {
          this.submitForm('ruleForm');
        }
      },

      handleRemove() {
        this.ifIdentityImage = false;
      },

      submitPic() {
        this.$refs.upload.submit();
      },

      async submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.expertApply.expertEmail = this.ruleForm.expertEmail;
            this.expertApply.expertName = this.ruleForm.expertName;
            this.expertApply.expertTitle = this.ruleForm.expertTitle;
            this.expertApply.workplace = this.ruleForm.workplace;
            this.uploadApply();
          } else {
            window.console.log('error submit!!');
            return false;
          }
        });
      },

      next() {//负责切换状态栏状态
        this.page = 2;
        this.show = true;
      },

      async getApplyState() {
        //在异常获取中进行
        try {
          //传的值需要按照接口的定义来
          //利用const类型变量接受返回值（这里的返回值就是后端的返回值）
          window.console.log(this.expertApply.userId);
          const ApplyState = await applyAPI.getApplyState(this.expertApply.userId);
          window.console.log(ApplyState.data.applyState);
          //直接整个返回值转移
          if (ApplyState.data.applyState === 0) {
            this.show = true;
            this.page = 1;
            this.showMsg = "认证消息正在审核中";
          } else if (ApplyState.data.applyState === 1) {
            this.page = 0;
          }
        } catch (e) {
          //出错就利用el的消息提示输出错误
          this.$message.error('获取用户信息失败，请联系管理员');
        }
      },

      async uploadApply() {
        try {
          window.console.log(this.expertApply.userId);
          window.console.log(this.expertApply);
          const temp = await applyAPI.uploadApply(this.expertApply);
          window.console.log(temp.data['msg']);
          if (temp.data['msg'] === 'ok') {
            this.next();
          } else {
            this.$message.error('上传失败，请联系管理员');
          }
        } catch
          (e) {
          this.$message.error('上传失败，请联系管理员');
        }
      },
    }
  }
</script>

<style scoped>
  .All {
    text-align: left;
  }

  .el-row {
    margin-bottom: 10px;
  }

  .el-col {
    border-radius: 4px;
  }

  .bg-top {
    background: rgba(255, 255, 255, 0.7);
  }

  .bg-white {
    background: rgba(255, 255, 255, 0.7);
  }

  .font-top {
    font-size: 25px;
    font-family: "微软雅黑", serif;
    text-align: left;
  }


</style>
