<template>
  <div>
    <el-card>
      <Navigator active-func="Expert"/>

      <div id="main">
        <el-row :gutter="20" class="info">
          <!--头像-->
          <el-col :xs="{span:12,offset:0}" :sm="{span:9,offset:0}" :md="{span:7,offset:0}" :lg="{span:5,offset:0}"
                  :xl="{span:5,offset:0}">
            <div class="expertImg">
              <i class="el-icon-s-custom expertIcon" style="color: #409EFF"></i>
            </div>
            <div v-if="this.expertIdNow !== this.$store.state.expertId">
              <el-button icon="el-icon-star-off" @click="follow" round v-if="isfollow===false">关注</el-button>
              <el-button icon="el-icon-star-off" @click="unfollow" round v-else-if="isfollow===true">已关注</el-button>
            </div>
            <div v-if="this.expertIdNow === this.$store.state.expertId">
              <el-button @click="toSelf" round>学者本人</el-button>
            </div>

          </el-col>

          <el-col :xs="{span:12,offset:0}" :sm="{span:9,offset:0}" :md="{span:7,offset:0}" :lg="{span:6,offset:0}"
                  :xl="{span:6,offset:0}">
            <div class="info">
              <div class="info-content" id="name">专家名：{{expert.expertName}}</div>
              <div class="info-content">ID：{{expert._id}}</div>
              <div class="info-content">
                专家身份：{{expert.expertTitle}}-{{expert.workplace}}
              </div>
              <div class="info-content">
                专家邮箱：{{expert.expertEmail}}
              </div>
              <div class="info-content">
                论文数：{{expert.paperNum}}
                <el-divider direction="vertical"></el-divider>
                专利数：{{expert.patentNum}}
              </div>
              <div class="info-content">
                研究标签:
                <el-link
                  v-for="(tag,index) in expert.expertTags"
                  :key="index"
                  @click="toTag(tag)"
                  type="primary"
                  style="margin-left:5px"
                >
                  {{tag}}
                </el-link>
                <span v-if="expert.expertTags.length === 0">
                  该专家暂无标签
                </span>
              </div>

            </div>
          </el-col>

        </el-row>

      </div>
      <!--论文专利数量-->
      <el-divider content-position="left">
        成果简介
        <i style="cursor: pointer" v-if="expertIdNow === this.$store.state.expertId" class="el-icon-edit edit"
           @click="isedit ^= true"></i>
      </el-divider>
      <div class="expertIntro" v-show="!isedit">
        {{expert.achieveIntro?expert.achieveIntro:noIntro}}
        <div v-if="expertIdNow === this.$store.state.expertId" style="font-size: 12px;color: darkgray">点击编辑按钮可编辑你的成果简介
        </div>
      </div>
      <div v-show="isedit">
        <el-input
          type="textarea"
          :rows="3"
          :autosize="{minRows: 3, maxRows: 6}"
          placeholder="请输入内容"
          v-model="newExpertIntro"
        >
        </el-input>
        <span>
          <el-button type="text" @click="editExpertIntro">
            保存
          </el-button>
          <el-button type="text" @click="isedit = false">
            取消
          </el-button>
        </span>
      </div>

      <!--成果展示-->
      <div class="fruit">
        <el-tabs v-model="activeName_Tab">
          <el-tab-pane label="论文成果" name="first" value="论文">
            <div v-if="paperList.length === 0">
              该专家暂无上传的论文
            </div>
            <div v-for="item in paperList" :key="item._id">
              <div class="eachItem">
                <el-card shadow="always" class="box-card">
                  <div slot="header">
                    <el-link :underline="false" type="primary" @click="toPaperDetail(item._id)" style="float: left;text-align: left;font-size: 20px">{{item.paperTitle|titleEllipsis}}
                    </el-link>
                  </div>

                  <el-divider></el-divider>

                  <div class="textItem">
                    摘要：{{item.paperAbstract | informationEllipsis}}
                  </div>
                  <div class="textItem">
                    <span>标签：
                      <span v-for="(tag,index) in item.paperTags" :key="index">
                        <el-link type="primary" @click="toPaperTag(tag)">{{tag}} </el-link>
                      </span>
                    </span>
                  </div>

                  <div class="textItem">被引量：{{item.quoteNum}} 阅读量：{{item.readNum}}</div>
                  <div class="textItem">发布时间：{{item.paperTime}}</div>
                </el-card>
                <el-divider></el-divider>
              </div>
            </div>
          </el-tab-pane>

          <el-tab-pane label="专利成果" name="second" value="专利">
            <div v-if="patentList.length === 0">
              该专家暂无上传的专利
            </div>
            <div v-for="item in patentList" :key="item._id">
              <div class="eachItem">
                <el-card shadow="always" class="box-card">
                  <div slot="header">
                    <el-link :underline="false" type="primary" @click="toPatentDetail(item._id)" style="float: left;text-align: left;font-size: 20px">{{item.patentName|titleEllipsis}}
                    </el-link>
                  </div>
                  <el-divider></el-divider>
                  <div class="textItem">
                    <span>
                      摘要：{{item.patentAbstract?(item.patentAbstract|informationEllipsis):'暂无摘要'}}
                    </span>
                  </div>
                  <div class="textItem">
                    <span>
                      标签：
                      <span v-for="(tag,index) in item.patentTags" :key="index">
                        <el-link type="primary" @click="toPatentTag(tag)">{{tag}} </el-link>
                      </span>
                    </span>
                  </div>
                  <div class="textItem">被引量：{{item.quoteNum}} 阅读量：{{item.readNum}}</div>
                </el-card>
                <el-divider></el-divider>
              </div>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>

      <Footer/>

    </el-card>
  </div>
</template>

<script>
  import Navigator from "@/components/Navigator";
  import * as expertAPI from "../APIs/expert";
  import Footer from "@/components/Footer";

  export default {
    name: "Expert",
    components: {
      Navigator,
      Footer,
    },
    data() {
      return {
        newExpertIntro: '',
        expertIdNow: '',
        wel: require("@/images/齐木楠雄1.png"),
        activeName_Tab: 'first',
        noIntro: '该专家暂无成果简介',
        isfollow: false,
        isedit: false,

        expert: {
          "_id": "5dfb710af91085db2d0bfbe4",
          "user": "5dfb6f6fa227d8d43693ca43",
          "expertTags": ['Build','BUAA'],
          "achieveIntro": "",
          "expertEmail": "jym@buaa.edu.cn",
          "emailPublicity": false,
          "paperNum": 0,
          "patentNum": 0,
          "identityImage": "/root/getpicture/5dfb6f6fa227d8d43693ca43_application.jpg",
          "workplace": "buaa",
          "expertTitle": "heihei",
          "expertName": "jym"
        },
        patentList: [],
        paperList: [
          {
            "_id": "5dfbb32c59eecd624e4f6d47",
            "paperTags": [
              "digital system"
            ],
            "paperTitle": "Automatic test-generation and test-verification of digital systems",
            "paperTime": "1974-01-01 00:00:00",
            "paperPublication": "Proceedings of the 11th Design Automation Workshop",
            "paperAbstract": "The widespread use of large scale and medium scale integrated circuits, coupled with the trend towards larger boards, made manual generation of test patterns very expensive, somewhat ineffective, and rather difficult to update for design changes. The advent of MOS LSI's with extremely large gate density made manual test-verification, the process of finding failures detected by a given test pattern, an impossibility. Therefore, a series of programs was developed, over the years, to completely automate the test cycle&mdash;using logic description files as input, the final output for test generation is a test deck compiled in the language of card test equipment and, in the case of test-verification, lists of detected and undetected failures. All this is accomplished within the global constraint of complete (nearly 100%) coverage and prevailing test floor practices.",
            "quoteNum": 0,
            "readNum": 0,
            "starNum": 0,
            "starUser": [],
            "author": [
              "J. P. Verma",
              "D. M. Selove",
              "J. N. Tessier"
            ]
          },
        ],
        // patentList: [
        //   {
        //     "_id": "5dfc6ff4c73bd993f31e97e7",
        //     "patentTags": [
        //       "collector layer,conduction type,base zone"
        //     ],
        //     "patentName": "Bipolar transistor which can be controlled by field effect and method for producing the same",
        //     "patentNo": "6309920",
        //     "patentAgency": "Siemens Aktiengesellschaft(Munich, DE)",
        //     "readNum": 0,
        //     "starNum": 0,
        //     "starUser": [],
        //     "patentAuthors": [
        //       "Thomas Laska",
        //       "Franz Auerbach",
        //       "Heinrich Brunner",
        //       "Alfred Porst",
        //       "Jenoe Tihanyi",
        //       "Gerhard Miller"
        //     ]
        //   },
        // ],
      }
    },
    created() {
      this.getExpertInfo();
      this.getFruit();
      this.checkIsFollow();
    },
    methods: {
      async follow() {
        try {
          const res = await expertAPI.followExpert(this.$store.state.userId, this.$store.state.expertId);
          let resInfo = res.data;
          if (resInfo.msg === "ok") {
            this.isfollow = true;
            this.$message.success("关注成功");
          } else
            this.$message.error("关注失败");
        } catch (e) {
          this.$message.error(e.toString());
        }
      },
      async unfollow() {
        try {
          const res = await expertAPI.cancelExpert(this.$store.state.userId, this.$store.state.expertId);
          let resInfo = res.data;
          if (resInfo.msg === "ok") {
            this.isfollow = false;
            this.$message.success("取消关注成功");

          } else
            this.$message.error("取消关注失败");
        } catch (e) {
          this.$message.error(e.toString());
        }
      },
      async checkIsFollow() {
        try {
          const follow = await expertAPI.checkExpert(this.$store.state.userId, this.expertIdNow);
          this.isfollow = follow.data.msg === "ok";
        } catch (e) {
          this.$message.error(e.toString());
        }
      },
      async editExpertIntro() {
        if (this.newExpertIntro.length > 300) {
          this.$message.error('内容过长，应小于300');
          return;
        }
        try {
          const res = await expertAPI.editExpertIntro(this.$store.state.expertId, this.newExpertIntro);
          if (res.data.msg === "ok") {
            this.expert.achieveIntro = this.newExpertIntro;
            this.isedit = false;
            this.$message.success('修改成功');
          } else {
            this.$message.error('修改失败，请稍后再试');
          }
        } catch (e) {
          this.$message.error(e.toString());
        }
      },
      async getExpertInfo() {
        this.expertIdNow = this.$route.params.id;
        try {
          const expertInfo = await expertAPI.getExpertInfo(this.expertIdNow);
          //直接整个返回值转移
          window.console.log(expertInfo);
          this.expert = expertInfo.data.expert_info;
          this.newExpertIntro = this.expert.achieveIntro;
        } catch (e) {
          this.$message.error(e.toString());
        }
      },
      async getFruit() {
        // try {
        //
        //   const res_patent = await expertAPI.getExpertPatent(this.expertIdNow);
        //   window.console.log(res_patent);
        //   let temp_patent = res_patent.data;
        //   this.expert.patentList = temp_patent.patentList;
        //   const res_paper = await expertAPI.getExpertPaper(this.expertIdNow);
        //   window.console.log(res_paper);
        //   let temp_paper = res_paper.data;
        //   this.expert.paperList = temp_paper.paperList;
        //
        // } catch (e) {
        //   //出错就利用el的消息提示输出错误
        //   this.$message.error(e.toString());
        // }
      },
      toSelf() {
        location.reload();
      },
      toPaperTag(tag) {
        this.$router.push({path: '/Search?typeid=2&content='+tag});
      },
      toPatentTag(tag) {
        this.$router.push({path: '/Search?typeid=4&content='+tag});
      },
      toPaperDetail(id) {
        this.$router.push({path:'/paperdetail/'+id});
      },
      toPatentDetail(id) {
        this.$router.push({path:'/patentdetail/'+id});
      }
    },
    filters: {
      titleEllipsis(value) {
        if (!value) return "";
        if (value.length > 60) {
          return value.slice(0, 60) + "...";
        }
        return value;
      },
      informationEllipsis(value) {
        if (!value) return "";
        if (value.length > 200) {
          return value.slice(0, 200) + "...";
        }
        return value;
      },
    }
  }
</script>

<style scoped>
  #main {
    height: auto;
    clear: both;
  }

  #name {
    font-weight: bold;
    font-size: 20px;
  }

  .expertImg {
    height: 100px;
    width: 100px;
    margin: 20px auto;
    box-shadow: 0 0 5px darkgray;
    border-radius: 50%;
    line-height: 100px;
    text-align: center;
  }

  .expertIcon {
    font-size: 55px;
    line-height: 55px;
    margin-top: 20px;
    text-align: center;
  }

  .info {
    margin-top: 10px;
  }

  .info-content {
    text-align: left;
    margin-top: 12px;
    margin-left: 10px;
  }

  .fruit {
    margin-top: 20px;
  }

  .eachItem {
    margin-top: 10px;
    margin-bottom: 10px;
  }

  .textItem {
    display: flex;
    text-align: left;
    margin-bottom: 20px;
  }

  .expertIntro {
    text-align: left;
    text-indent: 2em;
  }

  .el-input{
    font-size: 16px;
    line-height: 1.3;
    font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  }
</style>
