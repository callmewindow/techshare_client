<template>
  <el-card class="All">
    <Navigator/>
    <el-card>
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
          <el-step title="基础信息填写" icon="el-icon-edit"></el-step>
          <el-step title="完整信息填写" icon="el-icon-edit-outline"></el-step>
          <el-step title="上传完成" icon="el-icon-document-checked"></el-step>
        </el-steps>
      </el-row>
      <el-row>
        <el-col :span="12" :offset="6">
          <div class="grid-content bg-white">
            <el-tabs type="border-card">
              <el-form :model="Form" :rules="rules" label-width="80px" ref="basicForm">
                <el-form-item label="文献类型" prop="type" v-if="page===0">
                  <el-radio-group v-model="Form.type" size="medium" name="type">
                    <el-radio-button label="paper" value="paper"
                                     @click.native="resetForm('basicForm')">
                      论文
                    </el-radio-button>
                    <el-radio-button label="patent" value="patent"
                                     @click.native="resetForm('basicForm')">专利
                    </el-radio-button>
                  </el-radio-group>
                </el-form-item>
                <el-form-item label="论文标题" prop="paperTitle" v-if="Form.type==='paper'&&page===0">
                  <el-input v-model="Form.paperTitle" placeholder="在此处填写论文标题" clearable></el-input>
                </el-form-item>
                <el-form-item label="论文DOI" prop="DOI" v-if="Form.type==='paper'&&page===0">
                  <el-input v-model="Form.DOI" placeholder="在此处填写论文DOI" clearable></el-input>
                </el-form-item>
                <el-form-item label="专利名称" prop="patentName" v-if="Form.type==='patent'&&page===0">
                  <el-input v-model="Form.patentName" placeholder="在此处填写专利名称" clearable></el-input>
                </el-form-item>
                <el-form-item label="专利号" prop="patentNo" v-if="Form.type==='patent'&&page===0">
                  <el-input v-model="Form.patentNo" placeholder="在此处填写专利号" clearable></el-input>
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

                <el-form-item label="出版社" prop="publication" v-if="Form.type==='paper'">
                  <el-input v-model="Form.publication"></el-input>
                </el-form-item>

                <el-form-item label="发表日期" v-if="Form.type==='paper'" prop="paperTime" required>
                  <el-col :span="12">
                    <el-form-item prop="paperTime">
                      <el-date-picker type="date"
                                      placeholder="请选择日期" v-model="Form.paperTime"
                                      style="width: 100%;"></el-date-picker>
                    </el-form-item>
                  </el-col>
                </el-form-item>

                <el-form-item label="注册日期" v-if="Form.type==='patent'" prop="patentTime" required>
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
                  <el-button class="button-new-tag" size="small" @click="showInput"
                             v-if="this.Form.Tags.length<3">+ 新标签
                  </el-button>
                </el-form-item>


                <el-form-item
                  v-for="(author, index) in AuthorsForm.authors"
                  :label="'第'+toChi(index+1)+'作者'"
                  :key="index"
                  prop="authors"
                >
                  <el-input placeholder="请输入内容" v-model="tempName[index]" clearable>
                    <el-button slot="append" icon="el-icon-search"
                               @click="getExpert(tempName[index],index)"></el-button>
                  </el-input>

                  <el-dialog title="搜索到的专家信息" :visible.sync="dialogTableVisible">
                    <el-table :data="gridData">
                      <el-table-column property="expertName" label="专家名"
                                       width="100"></el-table-column>
                      <el-table-column property="workplace" label="工作单位"
                                       width="180"></el-table-column>
                      <el-table-column property="expertEmail" label="邮箱"
                                       width="180"></el-table-column>
                      <el-table-column property="_id" label="专家ID" width="120"></el-table-column>
                      <el-table-column
                        fixed="right"
                        label="操作"
                        width="60">
                        <template slot-scope="scope">
                          <el-button
                            @click="addAuthorId(scope.row._id,scope.row.expertName)"
                            type="text" size="small">确认
                          </el-button>
                        </template>
                      </el-table-column>
                    </el-table>
                  </el-dialog>
                </el-form-item>

                <el-form-item>
                  <el-button @click="addAuthor">添加作者</el-button>

                  <el-button @click.prevent="removeAuthor">删除作者</el-button>
                </el-form-item>


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
    </el-card>
    <Footer/>
  </el-card>
</template>

<script>
  import * as entityAPI from "../APIs/entity";
  import * as expertAPI from "../APIs/expert";
  import Navigator from "@/components/Navigator";
  import Footer from "@/components/Footer";

  export default {
    name: "AddInfo",
    components: {
      Navigator,
      Footer,
    },
    data() {
      const checkTags = (rule, value, callback) => {
        if (this.Form.Tags.length === 0) {
          callback(new Error('请填写标签'));
        } else {
          callback();
        }
      };

      const checkAuthors = (rule, value, callback) => {
        for (let i = 0; i < this.AuthorsForm.authors.length; i++) {
          if (typeof (this.AuthorsForm.authors[i].name) == "undefined" || this.AuthorsForm.authors[i].name === '') {
            callback(new Error('请搜索确认所有专家姓名后点击确认上传'));
          }
        }
        callback();
      };

      return {
        tempName: [],
        authorIndex: '',
        gridData: [{
          name: '',
          workplace: '',
          email: '',
          expertId: ''
        }, {
          date: '',
          name: '',
          address: ''
        }, {
          name: '',
          workplace: '',
          email: '',
          expertId: ''
        }, {
          name: '',
          workplace: '',
          email: '',
          expertId: ''
        },],
        dialogTableVisible: false,

        paperEntity: {
          type: '',
          expertId: '',
          paperTitle: '',
          DOI: '',
          paperTime: '',
          paperUrl: '',
          paperAbstract: '',
          paperTags: [],
          authors: [],
          authors_id: [],
          paperId: '',
          publication: ''
        },
        patentEntity: {
          type: '',
          expertId: '',
          patentName: '',
          patentNo: '',
          patentTime: '',
          patentAbstract: '',
          patentTags: [],
          patentAuthors: [],
          patentAuthors_id: [],
          patentId: ''
        },
        page: 0,
        show: false,
        userId: this.$store.state.userId,
        expertId: "",
        AuthorsForm: {
          authors: [{name: ''}],
          authors_id: [{ID: ''}]
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
          publication: ''
        },

        rules: {
          authors: [
            {required: true, validator: checkAuthors, trigger: "change"}
          ],
          publication: [
            {required: true, message: '请输入出版社', trigger: 'blur'}
          ],
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
            {type: 'date', required: true, message: '请选择日期', trigger: 'blur'}
          ],
          patentTime: [
            {type: 'date', required: true, message: '请选择日期', trigger: 'blur'}
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
    created() {
      this.getUserInfo();
    },
    methods: {
      async getExpert(name, index) {
        try {
          const res = await expertAPI.getAllExpert(name);

          window.console.log(res.data);
          if (res.data.err_msg === "该专家不存在") {
            this.$message.error("您所搜索的专家不存在，请检查专家姓名是否有误");
            this.dialogTableVisible = false;
          } else {
            this.gridData = res.data;
            this.dialogTableVisible = true;
            this.authorIndex = index;
          }

        } catch (e) {
          this.$message.error(e.toString());
        }
      },
      addAuthorId(id, name) {
        let i = this.authorIndex;
        this.AuthorsForm.authors[i].name = name;
        this.AuthorsForm.authors_id[i].ID = id;
        this.tempName[i] = name + "  ID：" + id;
        this.dialogTableVisible = false;

      },
      handleClick(row) {
        window.console.log(row);
      },
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
      },

      success() {
        if (this.page === 1) {
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
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if (this.Form.type === 'paper') {
              this.paperEntity.type = this.Form.type;
              this.paperEntity.expertId = this.expertId;
              this.paperEntity.DOI = this.Form.DOI;
              this.paperEntity.paperAbstract = this.Form.paperAbstract;
              this.paperEntity.authors = this.AuthorsForm.authors;
              this.paperEntity.authors_id = this.AuthorsForm.authors_id;
              this.paperEntity.paperTags = this.Form.Tags;
              this.paperEntity.paperTime = this.Form.paperTime;
              this.paperEntity.paperUrl = this.Form.paperUrl;
              this.paperEntity.paperTitle = this.Form.paperTitle;
              //新添加的publication
              this.paperEntity.publication = this.Form.publication;
              this.uploadPaper();
            } else if (this.Form.type === 'patent') {
              this.patentEntity.type = this.Form.type;
              this.patentEntity.expertId = this.expertId;
              this.patentEntity.patentAuthors = this.AuthorsForm.authors;
              this.patentEntity.patentAuthors_id = this.AuthorsForm.authors_id;
              this.patentEntity.patentName = this.Form.patentName;
              this.patentEntity.patentNo = this.Form.patentNo;
              this.patentEntity.patentTags = this.Form.Tags;
              this.patentEntity.patentTime = this.Form.patentTime;
              this.patentEntity.patentAbstract = this.Form.patentAbstract;
              this.uploadPatent();
            }
          } else {
            // eslint-disable-next-line no-console
            console.log('error submit!!');
            return false;
          }
        });
      },

      removeAuthor() {
        // eslint-disable-next-line no-constant-condition
        if (this.AuthorsForm.authors.length > 1) {
          this.tempName.pop();
          this.AuthorsForm.authors.pop();
          this.AuthorsForm.authors_id.pop();
        }
      },


      addAuthor() {
        if (this.AuthorsForm.authors.length < 3) {
          this.tempName.push();
          this.AuthorsForm.authors.push({
            key: 'name',
            value: ''
          });
          this.AuthorsForm.authors_id.push({
            key: 'ID',
            value: ''
          });
        }
      },

      async getUserInfo() {
        this.expertId = this.$store.state.expertId;
      },

      async uploadPaper() {
        try {
          window.console.log(this.expertId);
          window.console.log(this.paperEntity);
          const temp = await entityAPI.uploadPaper(this.paperEntity);
          window.console.log(temp);
          const ifOk = temp.data.substring(9, 11);
          this.paperEntity.paperId = temp.data.substring(25, 49);
          window.console.log(this.paperEntity.paperId);
          if (ifOk === 'ok') {
            this.success();
          } else {
            this.$message.error('请检查论文标题与DOI是否与已上传论文重复或未搜索确认专家姓名');
          }
        } catch (e) {
          this.$message.error('请检查论文标题与DOI是否与已上传论文重复或未搜索确认专家姓名');
        }
      },

      async uploadPatent() {
        //在异常获取中进行
        try {
          window.console.log(this.expertId);
          window.console.log(this.patentEntity);
          const temp = await entityAPI.uploadPatent(this.patentEntity);
          window.console.log(temp);
          const ifOk = temp.data.substring(9, 11);
          this.patentEntity.patentId = temp.data.substring(26, 50);
          window.console.log(this.patentEntity.patentId);
          if (ifOk === 'ok') {
            this.success();
          } else {
            this.$message.error('上传失败，请检查专利标题是否与已上传专利重复或联系管理员！');
          }
        } catch (e) {
          this.$message.error('上传失败，请检查专利标题是否与已上传专利重复或联系管理员！');
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
    font-size: 25px;
    font-family: "微软雅黑", serif;
    text-align: left;
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
