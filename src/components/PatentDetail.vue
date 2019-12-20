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
                专利号
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
          </el-row>

          <el-row style="margin-bottom: 30px;">
            <el-tabs type="border-card">
              <el-tab-pane label="求助来源">
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

    </el-row>
  </el-card>
</template>

<script>
  import Navigator from "@/components/Navigator";
  import * as userAPI from "../APIs/entity";

  export default {
    name: "PatentDetail",
    components: {
      Navigator,
    },
    data() {
      return {
        uploadExpertId: "",
        paperId: "",
        activeName: "first",
        mainTitle: "",
        mainFrom: "暂无",
        url: "http://xueshu.baidu.com/s?wd=",
        urlName: "百度学术",
        readTimes: "",
        mainAbstract: "暂无",
        authors: [],
        keywords: [],
        DOI: "暂无",
        year: "暂无",
      };
    },
    created() {
      this.getPaperInfo();
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
      searchAuthor(e) {
        this.$router.push({path: '/Search/?typeid=1&content=' + e.target.innerHTML});
      },
      report() {
        this.$alert('请将错误描述发送至123@123.com', '错误反馈', {confirmButtonText: '确定'});
      },
      async getPaperInfo() {
        try {
          const paperInfo = await userAPI.getPatentInfo(this.$route.params.id);
          window.console.log(paperInfo);
          this.paperId = paperInfo.data.patent_info._id;
          this.mainTitle = paperInfo.data.patent_info.patentName;
          this.mainFrom = paperInfo.data.patent_info.patentAgency;
          this.readTimes = paperInfo.data.patent_info.readNum;
          this.authors = paperInfo.data.patent_info.patentAuthors;
          this.keywords = paperInfo.data.patent_info.patentTags;
          this.DOI = paperInfo.data.patent_info.patentNo;

          if ("url" in paperInfo.data.patent_info) {
            this.url = paperInfo.data.patent_info.paperPublication;
            this.urlName = this.url;
          } else
            this.url = this.url + this.mainTitle;

        } catch (e) {
          this.$message.error('请求超时');
        }
      },
      async addReading() {
        try {
          await userAPI.addPatentReading(this.$route.params.id);
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
