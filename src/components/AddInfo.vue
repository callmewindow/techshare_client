<template>
  <div class="All">
    <el-row>
      <el-col :span="22" :offset="1">
        <div class="bg-top font-top">
          文献上传
          <el-divider></el-divider>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-steps :active="page" finish-status="success" space="500px" align-center>
        <el-step title="基础信息填写"></el-step>
        <el-step title="完整信息填写"></el-step>
        <el-step title="上传完成"></el-step>
      </el-steps>
    </el-row>
    <el-row>
      <el-col :span="12" :offset="6">
        <div class="grid-content bg-white">
          <el-tabs type="border-card">
            <el-form :model="Form" :rules="rules" label-width="80px" ref="basicForm">
              <el-form-item label="文献类型" prop="type" v-if="page===0">
                <el-radio-group v-model="Form.type" size="medium" name="type">
                  <el-radio-button label="paper" value="paper" @click.native="resetForm('basicForm')">
                    论文
                  </el-radio-button>
                  <el-radio-button label="patent" value="patent"
                                   @click.native="resetForm('basicForm')">专利
                  </el-radio-button>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="论文标题" prop="paperTitle" v-if="Form.type==='paper'&&page===0">
                <el-input v-model="Form.paperTitle" placeholder="在此处填写论文标题"></el-input>
              </el-form-item>
              <el-form-item label="论文DOI" prop="DOI" v-if="Form.type==='paper'&&page===0">
                <el-input v-model="Form.DOI" placeholder="在此处填写论文DOI"></el-input>
              </el-form-item>
              <el-form-item label="专利名称" prop="patentName" v-if="Form.type==='patent'&&page===0">
                <el-input v-model="Form.patentName" placeholder="在此处填写专利名称"></el-input>
              </el-form-item>
              <el-form-item label="专利号" prop="patentNo" v-if="Form.type==='patent'&&page===0">
                <el-input v-model="Form.patentNo" placeholder="在此处填写专利号"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="submitFormBasic('basicForm')" v-if="page===0">下一步
                </el-button>
              </el-form-item>
            </el-form>

            <el-form :model="Form" :rules="rules" ref="Form" label-width="120px" v-if="page===1">

              <el-form-item label="论文标题" prop="paperTitle" v-if="Form.type==='paper'">
                <el-input v-model="Form.paperTitle"></el-input>
              </el-form-item>

              <el-form-item label="专利名" prop="patentName" v-if="Form.type==='patent'">
                <el-input v-model="Form.patentName"></el-input>
              </el-form-item>

              <el-form-item label="论文DOI" prop="DOI" v-if="Form.type==='paper'">
                <el-input v-model="Form.DOI"></el-input>
              </el-form-item>

              <el-form-item label="专利号" prop="patentNo" v-if="Form.type==='patent'">
                <el-input v-model="Form.patentNo"></el-input>
              </el-form-item>

            </el-form>
            <el-form :model="Form" :rules="rules" ref="Form" label-width="120px" v-if="page===1">

              <el-form-item label="发表日期" v-if="Form.type==='paper'" required>
                <el-col :span="12">
                  <el-form-item prop="paperTime">
                    <el-date-picker type="date" placeholder="请选择日期" v-model="Form.paperTime"
                                    style="width: 100%;"></el-date-picker>
                  </el-form-item>
                </el-col>
              </el-form-item>

              <el-form-item label="注册日期" v-if="Form.type==='patent'" required>
                <el-col :span="12">
                  <el-form-item prop="patentTime">
                    <el-date-picker type="date" placeholder="请选择日期" v-model="Form.patentTime"
                                    style="width: 100%;"></el-date-picker>
                  </el-form-item>
                </el-col>
              </el-form-item>

              <el-form-item label="标签" prop="tags">
                <el-tag
                  :key="tag"
                  v-for="tag in Form.Tags"
                  closable
                  :disable-transitions="false"
                  @close="handleClose(tag)">
                  {{tag}}
                </el-tag>
                <el-input
                  class="input-new-tag"
                  v-if="Form.inputVisible"
                  v-model="Form.inputValue"
                  ref="saveTagInput"
                  size="small"
                  @keyup.enter.native="handleInputConfirm"
                  @blur="handleInputConfirm"
                >
                </el-input>
                <el-button class="button-new-tag" size="small" @click="showInput" v-if="this.Form.Tags.length<3">+ 新标签
                </el-button>
              </el-form-item>


              <el-form :model="AuthorsForm" ref="AuthorsForm" label-width="120px" class="demo-dynamic">

                <el-form-item
                  v-for="(author, index) in AuthorsForm.authors"
                  :label="'第'+toChi(index+1)+'作者'"
                  :key="author.key"
                  :prop="'authors[' + index + '].value'"
                  :rules="[{required: true, message: '作者栏不能为空', trigger: 'blur'}]"
                >
                  <el-input v-model="author.value" clearable=""></el-input>
                </el-form-item>

                <el-form-item>
                  <el-button @click="addAuthor">添加作者</el-button>
                  <el-button @click.prevent="removeAuthor">删除作者</el-button>
                </el-form-item>
              </el-form>


              <el-form-item label="论文摘要" prop="paperAbstract" v-if="Form.type==='paper'">
                <el-input type="textarea" v-model="Form.paperAbstract"></el-input>
              </el-form-item>

              <el-form-item label="专利摘要" prop="patentAbstract" v-if="Form.type==='patent'">
                <el-input type="textarea" v-model="Form.patentAbstract"></el-input>
              </el-form-item>

              <el-form-item label="URL" prop="paperUrl" v-if="Form.type==='paper'">
                <el-input v-model="Form.paperUrl" clearable=""></el-input>
              </el-form-item>

              <el-form-item>
                <el-button type="info" @click="back()"
                           v-if="page===1">上一步
                </el-button>
                <el-button type="primary" @click="submitFormWhole('Form')" v-if="page===1">确认上传
                </el-button>

              </el-form-item>

            </el-form>

            <transition name="el-zoom-in-top">//动态效果
              <div style="text-align: center; margin-top:80px;" v-show="show">
                            <span style="font-size: 40px; color: #409EFF;">
                                上传完成 <br/>
                            </span>
                <i class="el-icon-circle-check"
                   style="margin-top:15px; margin-bottom:100px;font-size: 40px; color: #409EFF;"></i>
              </div>
            </transition>

          </el-tabs>
        </div>

      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    name: "AddInfo",
    data() {

      const checkTags = (rule, value, callback) => {
        if (this.Form.Tags.length === 0) {
          callback(new Error('请填写标签'));
        } else {
          callback();
        }
      };

      return {
        page: 0,
        show: false,

        AuthorsForm: {
          authors: [{
            key: 1,
            value: ''
          }],
        },
        Form: {
          type: '',
          paperTitle: '',
          DOI: '',
          patentName: '',
          patentNo: '',

          inputVisible: false,
          inputValue: '',

          paperUrl: '',
          patentTime: '',
          paperTime: '',
          paperAbstract: '',
          patentAbstract: '',
          Tags: [],
        },

        rules: {
          type: [
            {required: true, message: '请选择文献类型', trigger: 'blur'}
          ],
          paperTitle: [
            {required: true, message: '论文标题不得为空', trigger: 'blur'}
          ],
          DOI: [
            {required: true, message: '论文DOI不得为空', trigger: 'blur'}
          ],
          patentName: [
            {required: true, message: '专利名称不得为空', trigger: 'blur'}
          ],
          patentNo: [
            {required: true, message: '专利号不得为空', trigger: 'blur'}
          ],
          paperUrl: [
            {required: true, message: '请输入论文的URL', trigger: 'blur'}
          ],
          tags: [
            {required: true, validator: checkTags, trigger: "blur"}
          ],
          paperTime: [
            {type: 'date', required: true, message: '请选择日期', trigger: 'change'}
          ],
          patentTime: [
            {type: 'date', required: true, message: '请选择日期', trigger: 'change'}
          ],
          paperAbstract: [
            {required: true, message: '请输入摘要', trigger: 'blur'}
          ],
          patentAbstract: [
            {required: true, message: '请输入摘要', trigger: 'blur'}
          ],
        }
      };
    },
    methods: {
      submitFormBasic(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.next();
            return true;
          } else {
            // eslint-disable-next-line no-console
            console.log('error submit!');
            return false;
          }
        });
      },

      resetForm(formName) {
        this.$refs[formName].resetFields();
      },

      next() {
        if (this.page === 0) this.page = 1;//负责切换状态栏状态
        else if (this.page === 1) {
          this.page = 3;
          this.show = true;
        }
      },

      back() {
        if (this.page-- < 1) this.page = 0;//负责切换状态栏状态
      },

      toChi(index) {
        switch (index) {
          case 1:
            return '一';
          case 2:
            return '二';
          case 3:
            return '三';
        }
      },
      handleClose(tag) {
        this.Form.Tags.splice(this.Form.Tags.indexOf(tag), 1);
      },

      showInput() {
        this.Form.inputVisible = true;
        // eslint-disable-next-line no-unused-vars
        this.$nextTick(_ => {
          this.$refs.saveTagInput.$refs.input.focus();
        });
      },

      handleInputConfirm() {
        let inputValue = this.Form.inputValue;
        if (inputValue) {
          this.Form.Tags.push(inputValue);
        }
        this.Form.inputVisible = false;
        this.Form.inputValue = '';
      },

      submitFormWhole(formName) {
        const entity = [{
          type: '',
          paperTitle: '',
          DOI: '',
          patentName: '',
          patentNo: '',
          paperUrl: '',
          paperTime: '',
          patentTime: '',
          paperAbstract: '',
          patentAbstract: '',
          paperTags: [],
          patentTags: [],
          authors: [],
          patentAuthors: []
        }];
        this.$refs[formName].validate((valid) => {

          this.submitFormBasic('AuthorsForm');
          if (valid) {
            entity.type = this.Form.type;
            entity.paperTitle = this.Form.paperTitle;
            entity.DOI = this.Form.DOI;
            entity.patentName = this.Form.patentName;
            entity.patentNo = this.Form.patentNo;
            entity.paperUrl = this.Form.paperUrl;
            entity.patentTime = this.Form.patentTime;
            entity.paperTime = this.Form.paperTime;
            entity.paperAbstract = this.Form.paperAbstract;
            entity.patentAbstract = this.Form.patentAbstract;
            entity.paperTags = this.Form.Tags;
            entity.patentTags = this.Form.Tags;
            entity.authors = this.AuthorsForm.authors;
            entity.patentAuthors = this.AuthorsForm.authors;
            /*let i;
            if(entity.type === 'paper'){
                alert(entity.paperTitle);
                alert(entity.DOI);
                alert(entity.paperUrl);
                alert(entity.paperTime);
                alert(entity.paperAbstract);
                for(i = 0; i<entity.authors.length; i++) {
                    alert(entity.authors[i].value);
                }
                for(i=0;i<entity.paperTags.length;i++) {
                    alert(entity.paperTags[i]);
                }
            }
            else {
                alert(entity.patentName);
                alert(entity.patentNo);
                alert(entity.patentTime);
                alert(entity.patentAbstract);
                for (i = 0; i < entity.patentAuthors.length; i++) {
                    alert(entity.patentAuthors[i].value);
                }
                for (i = 0; i < entity.paperTags.length; i++) {
                    alert(entity.patentTags[i]);
                }
            }*/
          } else {
            // eslint-disable-next-line no-console
            console.log('error submit!!');
            return false;
          }
        });
      },

      removeAuthor() {
        //var index = this.AuthorsForm.domains.indexOf(item);
        // eslint-disable-next-line no-constant-condition
        if (this.AuthorsForm.authors.length > 1) {
          this.AuthorsForm.authors.pop();
          //this.AuthorsForm.authors.splice(index, 1);
        }
      },


      addAuthor() {
        if (this.AuthorsForm.authors.length < 3) {
          this.AuthorsForm.authors.push({
            key: Date.now(),
            value: ''
          });
        }
      }
    }
  };
</script>

<style>
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
    padding-left: 100px;
    font-size: 35px;
    font-family: "微软雅黑", serif;
  }

  .el-tag + .el-tag {
    margin-left: 10px;
  }

  .button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }

  .input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
  }
</style>
