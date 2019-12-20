<template>
  <el-card>
    <Navigator need-search="true"/>
    <el-row :gutter="15">
      <el-col :xs="24" :sm="24" :md="16" :lg="16" style="margin-top: 18px;">
        <el-card>
          <div style="color: rgb(0,102,204);margin-top: 20px">
            <h2>
              {{mainTitle}}
            </h2>
          </div>
          <el-row style="font-size: 15px; margin-bottom: 20px;">
            <el-col :span="20">
              <div class="factor">
                来源：{{mainFrom}}
              </div>
            </el-col>
            <el-col :span="4">
              <div class="factor">
                阅读量：{{readTimes}}
              </div>
            </el-col>
          </el-row>

          <el-row class="col-row">
            <el-col :xs="5" :sm="3" :md="3" :lg="2">
              <div class="factor">
                作者
              </div>
            </el-col>
            <el-col :xs="19" :sm="21" :md="21" :lg="22">
              <el-link :underline="false" type="primary" @click="searchAuthor($event)"
                       style="font-size: 16px; float: left; margin-right: 10px;"
                       v-for="(author,i) in authors" :key="i">{{author}}
              </el-link>
            </el-col>
          </el-row>

          <el-row class="col-row">
            <el-col :xs="5" :sm="3" :md="3" :lg="2">
              <div class="factor">
                摘要
              </div>
            </el-col>
            <el-col :xs="19" :sm="21" :md="21" :lg="22">
              <div class="factor-text" style="text-align: left; line-height: 1.6;">
                {{mainAbstract}}
              </div>
            </el-col>
          </el-row>

          <el-row class="col-row">
            <el-col :xs="5" :sm="3" :md="3" :lg="2">
              <div class="factor">
                关键词
              </div>
            </el-col>
            <el-col :xs="19" :sm="21" :md="21" :lg="22">
              <div class="factor-text">
                <el-link :underline="false" type="primary"
                         style="font-size: 16px; float: left; margin-right: 10px;"
                         v-for="(keyword,i) in keywords" :key="i">{{keyword}}
                </el-link>
              </div>
            </el-col>
          </el-row>

          <el-row class="col-row">
            <el-col :xs="5" :sm="3" :md="3" :lg="2">
              <div class="factor">
                DOI
              </div>
            </el-col>
            <el-col :xs="19" :sm="21" :md="21" :lg="22">
              <div class="factor-text">
                {{DOI}}
              </div>
            </el-col>
          </el-row>

          <el-row class="col-row">
            <el-col :xs="5" :sm="3" :md="3" :lg="2">
              <div class="factor">
                被引量
              </div>
            </el-col>
            <el-col :xs="4" :sm="2" :md="2" :lg="2">
              <div class="factor-text">
                {{referredTimes}}
              </div>
            </el-col>
            <el-col :xs="4" :sm="4" :md="2" :lg="2">
              <el-link type="primary" @click="change()">
                我引用了
              </el-link>
            </el-col>
            <el-col :xs="10" :sm="10" :md="9" :lg="7" v-if="display">
              <input placeholder="请输入引用方论文ID">
              <el-link type="primary" @click="addQuote()">
                确认
              </el-link>
            </el-col>
          </el-row>

          <el-row class="col-row">
            <el-col :xs="5" :sm="3" :md="3" :lg="2">
              <div class="factor">
                时间
              </div>
            </el-col>
            <el-col :xs="19" :sm="21" :md="21" :lg="22">
              <div class="factor-text">
                {{year}}
              </div>
            </el-col>
          </el-row>

          <el-row style="margin-top: 30px; margin-bottom: 30px;">
            <el-col :xs="10" :sm="10" :md="7" :lg="7">
              <el-button type="primary" plain @click="report()">报错</el-button>
            </el-col>
            <el-col :xs="4" :sm="4" :md="2" :lg="2" v-if="isExpert">
              <el-button type="primary" plain v-if="hasUp" @click="yesUp()">认领</el-button>
              <el-button type="primary" plain v-if="!hasUp" @click="noUp()">认领</el-button>
            </el-col>
          </el-row>

          <el-row style="margin-bottom: 30px;">
            <el-tabs type="border-card">
              <el-tab-pane label="求助原文">
                <el-row>
                  <el-col :span="6">
                    <el-link :underline="false" :href="url" type="primary" style="float: left; margin-left: 20px;">
                      {{urlName}}
                    </el-link>
                  </el-col>
                </el-row>
              </el-tab-pane>
            </el-tabs>
          </el-row>

        </el-card>
      </el-col>

      <el-col :xs="24" :sm="24" :md="8" :lg="8" style="margin-top: 18px;">
        <el-card>
          <el-tabs v-model="activeName">
            <el-tab-pane label="相似文献" name="first">

              <div v-for="(document,i) in similarDocuments" :key="i">
                <el-row style="margin-top:10px; margin-bottom: 10px;">
                  <el-col :span="24">
                    <el-link type="primary" style="float: left; font-size: 20px;" @click="toPaper(i)">
                      {{document.paperTitle}}
                    </el-link>
                  </el-col>
                </el-row>

                <el-row class="col-row">
                  <el-col :span="24">
                    <div class="factor-text" style="text-align: left; line-height: 1.6;">
                      {{document.paperAbstract|paperTitleEllipsis}}
                    </div>
                  </el-col>
                </el-row>

                <el-row class="col-row">
                  <el-col>
                    <el-link @click="searchAuthor($event)" type="primary" style="float: left;">{{document.author[0]}}</el-link>
                  </el-col>
                </el-row>

                <el-divider></el-divider>
              </div>

            </el-tab-pane>
          </el-tabs>
        </el-card>
      </el-col>
    </el-row>
  </el-card>
</template>

<script>
  import Navigator from "@/components/Navigator";
  import * as userAPI from "../APIs/entity";
  import * as claimAPI from "../APIs/claim";

  export default {
    name: "PaperDetail",
    components: {
      Navigator,
    },
    data() {
      return {
        display: false,
        isExpert: true,
        hasUp: true,
        uploadExpertId: "",
        paperId: "",
        activeName: "first",
        mainTitle: "",
        mainFrom: "暂无",
        url: "http://xueshu.baidu.com/s?wd=",
        urlName: "百度学术",
        readTimes: "暂无",
        mainAbstract: "暂无",
        authors: [],
        keywords: [],
        DOI: "暂无",
        referredTimes: "",
        year: "暂无",
        similarId: [],
        similarDocuments: [],
      };
    },
    created() {
      this.getPaperInfo();
      this.getRelatedPaper();
      this.addReading();
    },
    filters: {
      paperTitleEllipsis(value) {
        if (!value) return "";
        if (value.length > 100) {
          return value.slice(0, 100) + "...";
        }
        return value;
      },
    },
    methods: {
      toPaper(i){
        this.$router.push({path: '/paperdetail/' + this.similarDocuments[i]._id});
        location.reload();
      },
      searchAuthor(e) {
        this.$router.push({path: '/Search/?typeid=1&content=' + e.target.innerHTML});
      },
      report() {
        this.$alert('请将错误描述发送至123@123.com', '错误反馈', {confirmButtonText: '确定'});
      },
      noUp() {
        this.$alert('这篇论文为自动获取，需要认领请发送申请至123@123.com', '认领论文', {confirmButtonText: '确定'});
      },
      change() {
        if (this.display == false)
          this.display = true;
        else
          this.display = false;
      },
      async yesUp() {
        try {
          const result = await claimAPI.claimPaper(this.$store.state.expertId, this.uploadExpertId, this.paperId);
          window.console.log(result);
          if (result.data.msg == "ok") {
            this.$message({
              message: '已生成认领申请，请等待审核',
              type: 'success'
            });
          } else {
            this.$message.error('正在进行认领审核');
          }
        } catch (e) {
          this.$message.error('请求超时');
        }
      },
      async addQuote() {
        try {
          const result = await userAPI.addPaperQuote(this.paperId);
          window.console.log(result);
          if (result.data == "ok") {
            this.$message({
              message: '已增加引用量',
              type: 'success'
            });
            setTimeout(() => {
              location.reload();
            }, 1000);
          }
        } catch (e) {
          this.$message.error('请求超时');
        }
      },
      async getPaperInfo() {
        try {
          const paperInfo = await userAPI.getPaperInfo(this.$route.params.id);
          //window.console.log(paperInfo);
          this.paperId = paperInfo.data.paper_info._id;
          this.mainTitle = paperInfo.data.paper_info.paperTitle;
          this.readTimes = paperInfo.data.paper_info.readNum;
          this.mainAbstract = paperInfo.data.paper_info.paperAbstract;
          this.referredTimes = paperInfo.data.paper_info.quoteNum;
          this.year = paperInfo.data.paper_info.paperTime;
          this.authors = paperInfo.data.paper_info.author;
          this.keywords = paperInfo.data.paper_info.paperTags;
          this.mainFrom = paperInfo.data.paper_info.paperPublication;

          if ("DOI" in paperInfo.data.paper_info)
            this.DOI = paperInfo.data.paper_info.DOI;
          if ("url" in paperInfo.data.paper_info) {
            this.url = paperInfo.data.paper_info.paperPublication;
            this.urlName = this.url;
          } else
            this.url = this.url + this.mainTitle;
          if ("uploadExpert" in paperInfo.data.paper_info)
            this.uploadExpertId = paperInfo.data.paper_info.uploadExpert;
          else
            this.hasUp = false;
          if (this.$store.state.expertId != "null")
            this.isExpert = true;
        } catch (e) {
          this.$message.error('请求超时');
        }
      },
      async getRelatedPaper() {
        try {
          const paperInfo = await userAPI.getRelatedPaper(this.$route.params.id);
          this.similarDocuments = paperInfo.data;
        } catch (e) {
          this.$message.error('请求超时');
        }
      },
      async addReading() {
        try {
          await userAPI.addPaperReading(this.$route.params.id);
        } catch (e) {
          this.$message.error('请求超时');
        }
      },
    }
  };
</script>

<style scoped>
  #detail {
    width: 62%;
    margin-left: 3%;
  }

  .factor {
    float: left;
    color: rgb(153, 153, 153);
  }

  .factor-text {
    float: left;
    color: rgb(102, 102, 102);
  }

  .col-row {
    margin-bottom: 15px;
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
</style>
