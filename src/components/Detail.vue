<template>
  <el-card>
    <Navigator need-search="true"/>
    .
    <el-card id="detail">
      <div style="color: rgb(0,102,204);margin-top: 20px">
        <h2>
          {{mainTitle}}
        </h2>
      </div>
      <el-row style="font-size: 15px; margin-bottom: 20px;">
        <el-col :span="4">
          <div class="factor">
            来自：{{mainFrom}}
          </div>
        </el-col>
        <el-col :span="20">
          <div class="factor-text">
            阅读量：{{readTimes}}
          </div>
        </el-col>
      </el-row>

      <el-row class="col-row">
        <el-col :span="2">
          <div class="factor">
            作者：
          </div>
        </el-col>
        <el-col :span="22">
          <el-link href="#" type="primary" style="font-size: 16px; float: left; margin-right: 10px;">
            {{mainAuthor}}
          </el-link>
        </el-col>
      </el-row>

      <el-row class="col-row">
        <el-col :span="2">
          <div class="factor">
            摘要：
          </div>
        </el-col>
        <el-col :span="22">
          <div class="factor-text" style="text-align: left; line-height: 1.6;">
            {{mainAbstract}}
          </div>
        </el-col>
      </el-row>

      <el-row class="col-row">
        <el-col :span="2">
          <div class="factor">
            关键词：
          </div>
        </el-col>
        <el-col :span="22">
          <div class="factor-text">
            <el-link href="#" type="primary" style="font-size: 16px; float: left; margin-right: 10px;"
                     v-for="keyword in keywords" :key="keyword.name">{{keyword.name}}
            </el-link>
          </div>
        </el-col>
      </el-row>

      <el-row class="col-row">
        <el-col :span="2">
          <div class="factor">
            DOI：
          </div>
        </el-col>
        <el-col :span="22">
          <div class="factor-text">
            {{DOI}}
          </div>
        </el-col>
      </el-row>

      <el-row class="col-row">
        <el-col :span="2">
          <div class="factor">
            被引量：
          </div>
        </el-col>
        <el-col :span="22">
          <div class="factor-text">
            {{referredTimes}}
          </div>
        </el-col>
      </el-row>

      <el-row class="col-row">
        <el-col :span="2">
          <div class="factor">
            年份：
          </div>
        </el-col>
        <el-col :span="22">
          <div class="factor-text">
            {{year}}
          </div>
        </el-col>
      </el-row>

      <el-row style="margin-top: 30px; margin-bottom: 30px;">
        <el-col :span="2" :offset="9">
          <el-button type="primary" plain>分 享</el-button>
        </el-col>
        <el-col :span="2" :offset="2">
          <el-button type="primary" plain>报 错</el-button>
        </el-col>
      </el-row>

      <el-row style="margin-bottom: 30px;">
        <el-tabs type="border-card">
          <el-tab-pane label="全部来源">
            <el-row>
              <el-col :span="6">
                <el-link href="#" type="primary" style="float: left; margin-left: 20px;">{{mainFrom}}
                </el-link>
              </el-col>
            </el-row>
          </el-tab-pane>
        </el-tabs>
      </el-row>

      <el-row>
        <el-tabs v-model="activeName">
          <el-tab-pane label="相似文献" name="first">

            <div v-for="document in similarDocuments" :key="document.name">
              <el-row style="margin-top:10px; margin-bottom: 10px;">
                <el-col :span="24">
                  <el-link href="#" type="primary" style="float: left; font-size: 20px;">
                    {{document.name}}
                  </el-link>
                </el-col>
              </el-row>

              <el-row class="col-row">
                <el-col :span="24">
                  <div class="factor-text" style="text-align: left; line-height: 1.6;">
                    {{document.abstract}}
                  </div>
                </el-col>
              </el-row>

              <el-row class="col-row">
                <el-col :span="2">
                  <el-link href="#" type="primary" style="float: left;">{{document.author}}</el-link>
                </el-col>
                <el-col :span="20">
                  <el-link href="#" type="primary" style="float: left;">{{document.from}}</el-link>
                </el-col>
              </el-row>

              <el-divider></el-divider>
            </div>

          </el-tab-pane>
        </el-tabs>
      </el-row>
    </el-card>

  </el-card>
</template>

<script>
  import Navigator from "@/components/Navigator";

  export default {
    name: "Detail",
    components: {
      Navigator,
    },
    data() {
      return {
        activeName: "first",
        mainTitle: "此处文献标题",
        mainFrom: "此处来源",
        readTimes: "此处阅读次数",
        mainAuthor: "此处作者",
        mainAbstract: "此处摘要",
        keywords: [
          {name: "此处关键词1"},
          {name: "此处关键词2"},
        ],
        DOI: "此处DOI（啥玩意儿）",
        referredTimes: "此处被引次数",
        year: "此处年份",
        similarDocuments: [
          {name: "此处相关文献标题1", abstract: "此处相关文献摘要1", author: "此处作者1", from: "此处来源1"},
          {name: "此处相关文献标题2", abstract: "此处相关文献摘要2", author: "此处作者2", from: "此处来源2"},
        ],
      };
    },
    methods: {}
  };
</script>

<style scoped>
  #detail{
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
</style>
