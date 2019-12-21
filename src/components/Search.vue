<template>
  <el-card>
    <Navigator active-func="Search" />

    <el-card shadow="never" style="width:90%; margin: auto;">
      <el-row :gutter="20" type="flex" class="row-bg" justify="end">
        <el-col :sm="24" :md="6" v-if="typeid == 2">
          <el-card class="searchFilter">
            <div class="selectorItem">
              <div class="selectorHeader">
                <div class="selectorHeaderPoint"></div>
                <div class="selectorHeaderText">标签筛选</div>
                <el-button size="medium" type="text" @click="getCheckedNodes" class="selectorBtn">过滤</el-button>
                <el-button
                  size="medium"
                  type="text"
                  style="color: #F56C6C"
                  @click="resetCheckedNodes"
                  class="selectorBtn"
                >清空</el-button>
              </div>
              <div class="selector">
                <el-tree
                  :data="selectorData"
                  show-checkbox
                  node-key="id"
                  ref="tree"
                  highlight-current
                  :props="defaultProps"
                ></el-tree>
              </div>
            </div>
          </el-card>
        </el-col>

        <el-col :sm="24" :md="18" id="searchList">
          <el-input placeholder="请输入内容" v-model="searchInput" class="input-with-select">
            <el-select v-model="select" style="width: 80px" slot="prepend">
              <el-option label="论文" value="论文"></el-option>
              <el-option label="专利" value="专利"></el-option>
              <el-option label="专家" value="专家"></el-option>
            </el-select>
            <el-button slot="append" icon="el-icon-search" @click="searchContent"></el-button>
          </el-input>

          <div v-if="typeid == 1" class="typeBox">
            <div v-for="(expert,index) in expertList" :key="index">
              <div class="eachItem">
                <el-card shadow="always" class="box-card">
                  <!--姓名-->
                  <div slot="header" class="clearfix">
                    <span class="titleText" @click="toExpert(expert._id)">{{expert.expertName}}</span>
                  </div>
                  <div class="textItem">
                    <span>
                      职称：{{expert.expertTitle}}
                    </span>
                  </div>
                  <div class="textItem">
                    <span>
                      机构：{{expert.workplace}}
                    </span>
                  </div>
                  <!--领域-->
                  <div class="textItem">
                    <span>
                      标签：
                      <span v-for="(tag,index) in expert.expertTags" :key="index">
                        <span v-if="index == 0">{{tag}}</span>
                        <span v-else>,{{tag}}</span>
                      </span>
                      <span v-if="expert.expertTags.length === 0">
                        该专家暂无标签
                      </span>
                    </span>
                  </div>
                  <!--论文专利数-->
                  <div class="textItem">论文数：{{expert.paperNum}} 专利数：{{expert.patentNum}}</div>
                </el-card>
                <el-divider></el-divider>
              </div>
            </div>
          </div>

          <div v-else-if="typeid == 2" class="typeBox">
            <div
              v-for="(paper,index) in paperList.slice((currentPage - 1) * pagesize , currentPage * pagesize)"
              :key="index"
            >
              <div class="eachItem" v-if="selectedList.indexOf(paper.paperTags[0]) != -1">
                <el-card shadow="always" class="box-card">
                  <!--标题-->
                  <div slot="header" class="clearfix">
                    <span class="titleText" @click="toPaperDetail(paper._id)">{{paper.paperTitle}}</span>
                  </div>

                  <!--摘要-->
                  <div class="textItem">
                    <span>摘要：{{paper.paperAbstract == undefined ? '(暂无)' : paper.paperAbstract | paperAbstractEllipsis}}</span>
                  </div>
                  <!--作者-->
                  <div class="textItem">
                    <span>
                      作者：
                      <span v-for="(author,index) in paper.author" :key="index">
                        <span v-if="index == 0">{{author}}</span>
                        <span v-else>,{{author}}</span>
                      </span>
                    </span>
                  </div>
                  <!--来源-->
                  <div
                    class="textItem"
                  >来源：{{paper.paperPublication == undefined ? '(暂无)' : paper.paperPublication}}</div>
                  <!--标签-->
                  <div class="textItem">
                    <span>
                      标签：
                      <span v-for="(tag,index) in paper.paperTags" :key="index">
                        <span v-if="index == 0">{{tag}}</span>
                        <span v-else>,{{tag}}</span>
                      </span>
                    </span>
                  </div>
                  <!--时间-->
                  <!--被引量-->
                  <div
                    class="textItem"
                  >时间：{{paper.paperTime == undefined ? '(暂无)' : paper.paperTime.split(" ")[0]}} 被引量：{{paper.quoteNum == undefined ? '(暂无)' : paper.quoteNum}}</div>
                </el-card>
                <el-divider></el-divider>
              </div>
            </div>
          </div>

          <div v-else-if="typeid == 4" class="typeBox">
            <div
              v-for="(patent,index) in patentList.slice((currentPage - 1) * pagesize , currentPage * pagesize)"
              :key="index"
            >
              <div class="eachItem">
                <el-card shadow="always" class="box-card">
                  <!--专利名字-->
                  <div slot="header" class="clearfix">
                    <span
                      class="titleText"
                      @click="toPatentDetail(patent._id)"
                    >{{patent.patentName == undefined ? '(暂无)': patent.patentName}}</span>
                  </div>

                  <!--摘要-->
                  <div
                    class="textItem"
                  >摘要：{{patent.patentAbstract == undefined ? '(暂无)': patent.patentAbstract}}</div>
                  <!--作者-->
                  <div class="textItem">
                    <span>
                      作者：
                      <span v-if=" patent.patentAuthors.length == 0 ">(暂无)</span>
                      <span v-for="(author,index) in patent.patentAuthors" :key="index">
                        <span v-if="index == 0">{{author}}</span>
                        <span v-else>,{{author}}</span>
                      </span>
                    </span>
                  </div>
                  <!--标签-->
                  <div class="textItem">
                    <span>
                      标签：
                      <span
                        v-if="patent.patentTags.length == 0 || patent.patentTags[0] == ''"
                      >(暂无)</span>
                      <span v-for="(tag,index) in patent.patentTags" :key="index">
                        <span v-if="index == 0">{{tag}}</span>
                        <span v-else>,{{tag}}</span>
                      </span>
                    </span>
                  </div>
                  <!--机构-->
                  <div
                    class="textItem"
                  >机构：{{patent.patentAgency == undefined ? '(暂无)': patent.patentAgency}}</div>
                  <!--时间-->
                  <div
                    class="textItem"
                  >时间：{{patent.patentTime == undefined ? '(暂无)': patent.patentTime.split(" ")[0]}}</div>
                </el-card>
                <el-divider></el-divider>
              </div>
            </div>
          </div>

          <div v-else-if="typeid == 0" class="typeBox">
            <el-card shadow="always" class="box-card">
              <div class="emptyRes">
                <div class="emptyResText">
                  <div>搜索结果为空</div>
                </div>
              </div>
            </el-card>
          </div>

          <div v-else-if="typeid == -1" class="typeBox">
            <el-card shadow="always" class="box-card">
              <div class="emptyRes">
                <div class="emptyResText">筛选结果为空</div>
              </div>
            </el-card>
          </div>

          <el-pagination
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            layout="prev, pager, next"
            :total="expertList.length"
            v-if="typeid == 1"
          ></el-pagination>
          <el-pagination
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            layout="prev, pager, next"
            :total="paperList.length"
            v-else-if="typeid == 2"
          ></el-pagination>
          <el-pagination
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            layout="prev, pager, next"
            :total="patentList.length"
            v-else-if="typeid == 4"
          ></el-pagination>
        </el-col>
      </el-row>
    </el-card>
    <Footer />
  </el-card>
</template>

<script>
import Navigator from "@/components/Navigator";
import * as globalAPI from "../APIs/global";
import * as searchAPI from "../APIs/search";
import Footer from "@/components/Footer";

export default {
  name: "Search",
  components: {
    Navigator,
    Footer,
  },
  data() {
    return {
      select: "论文",
      typeid: 2,
      searchInput: "",
      resList: [],
      selectorData: [
        {
          id: 1,
          label: "algorithm"
        },
        {
          id: 2,
          label: "artificial intelligence"
        },
        {
          id: 3,
          label: "compiler"
        },
        {
          id: 4,
          label: "computer language"
        },
        {
          id: 5,
          label: "computer graphics"
        },
        {
          id: 6,
          label: "computer network"
        },
        {
          id: 7,
          label: "computer vision"
        },
        {
          id: 8,
          label: "database"
        },
        {
          id: 9,
          label: "fortran"
        },
        {
          id: 10,
          label: "hardware"
        },
        {
          id: 11,
          label: "hierarchical"
        },
        {
          id: 12,
          label: "information security"
        },
        {
          id: 13,
          label: "integrated circuit"
        },
        {
          id: 14,
          label: "microelectronic system"
        },
        {
          id: 15,
          label: "operating system"
        },
        {
          id: 16,
          label: "robot"
        },
        {
          id: 17,
          label: "simulating"
        },
        {
          id: 18,
          label: "simulation"
        },
        {
          id: 19,
          label: "software engineering"
        },
        {
          id: 20,
          label: "web"
        },
      ],
      selectedList: [
        "artificial intelligence",
        "robot",
        "computer vision",
        "hierarchical",
        "software engineering",
        "computer language",
        "simulation",
        "simulating",
        "computer graphics",
        "digital system",
        "integrated circuit",
        "microelectronic system",
        "computer network",
        "information security",
        "database",
        "web",
        "hardware",
        "algorithm",
        "fortran",
        "operating system",
        "compiler"
      ],
      expertList: [
        {
          _id: "",
          user: "",
          expertTags: ["加载中"],
          achieveIntro: "",
          expertEmail: "",
          emailPublicity: "",
          paperNum: "",
          patentNum: "",
          identityImage: "",
          workplace: "",
          expertTitle: "",
          expertName: "",
          paperList: ["", "", ""],
          patentList: ["", "", ""]
        }
      ],
      paperList: [
        {
          _id: "",
          uploadExpert: "",
          paperTags: ["加载中"], //
          DOI: "",
          paperTitle: "加载中", //
          paperTime: "加载中", //
          paperPublication: "加载中", //
          paperAbstract: "加载中", //
          quoteNum: "加载中", //
          readNum: 0,
          starNum: 0,
          starUser: [],
          author: ["加载中"] //
        }
      ],
      patentList: [
        {
          _id: "",
          uploadExpert: "",
          patentTags: ["加载中"], //
          patentName: "加载中", //
          patentNo: "",
          patentTime: "加载中", //
          patentAgency: "加载中", //
          patentAbstract: "加载中", //
          readNum: 0,
          starNum: 0,
          starUser: [],
          patentAuthors: ["加载中"] //
        }
      ],
      defaultProps: {
        children: "children",
        label: "label"
      },
      currentPage: 1,
      pagesize: 10,
      visibelLength: 0
    };
  },
  async created() {
    this.initialSearch();
  },
  methods: {
    toExpert(id){
      this.$router.push({path: '/Expert/'+id});
    },
    async searchByKeyword() {
      //在异常获取中进行
      try {
        //传的值需要按照接口的定义来
        //利用const类型变量接受返回值（这里的返回值就是后端的返回值）
        const res = await searchAPI.searchByKeyword(
          this.typeid,
          this.searchInput
        );
        //直接整个返回值转移
        //或者从中提取部分内容
        //（具体能提取那些值建议先用console输出然后再调试窗口进行查看）
        this.resList = res.data;
        if (this.resList.length == 0) {
          this.typeid = 0;
        } else {
          if (this.typeid == 1) {
            this.expertList = JSON.parse(JSON.stringify(this.resList));
            window.console.log(this.expertList);
          } else if (this.typeid == 2) {
            this.paperList = JSON.parse(JSON.stringify(this.resList));
          } else if (this.typeid == 4) {
            this.patentList = JSON.parse(JSON.stringify(this.resList));
          }
        }
      } catch (e) {
        //出错就利用el的消息提示输出错误
        this.$message.error(e.toString());
      }
    },
    initialSearch() {
      //搜索类型
      this.typeid = globalAPI.getUrlKey("typeid");
      //搜索内容
      this.searchInput = globalAPI.getUrlKey("content");
      if (this.searchInput == null) {
        //没有搜索内容或者类型不标准直接返回
        return;
      }
      switch (this.typeid) {
        case "1":
          this.select = "专家";
          //调用搜索专家的函数
          this.searchByKeyword();
          break;
        case "2":
          this.select = "论文";
          //调用搜索论文的函数
          this.searchByKeyword();
          break;
        case "4":
          this.select = "专利";
          //调用搜索专利的函数
          this.searchByKeyword();
          break;
      }
    },
    async getCheckedNodes() {
      // 此处获得所选的分类
      this.selectedList.splice(0);
      var tempList = await this.$refs.tree.getCheckedNodes(true, false);
      var i;
      for (i = 0; i < tempList.length; i++) {
        this.selectedList.push(tempList[i].label);
      }
      if (this.typeid == 1) {
        this.expertList.splice(0);
        for (i = 0; i < this.resList.length; i++) {
          if (this.selectedList.indexOf(this.resList[i].paperTags[0]) != -1) {
            this.expertList.push(JSON.parse(JSON.stringify(this.resList[i])));
          }
        }
      } else if (this.typeid == 2) {
        this.paperList.splice(0);
        for (i = 0; i < this.resList.length; i++) {
          if (this.selectedList.indexOf(this.resList[i].paperTags[0]) != -1) {
            this.paperList.push(JSON.parse(JSON.stringify(this.resList[i])));
          }
        }
      } else if (this.typeid == 4) {
        this.patentList.splice(0);
        for (i = 0; i < this.resList.length; i++) {
          if (this.selectedList.indexOf(this.resList[i].paperTags[0]) != -1) {
            this.patentList.push(JSON.parse(JSON.stringify(this.resList[i])));
          }
        }
      }
    },
    resetCheckedNodes() {
      location.reload();
      // this.$refs.tree.setCheckedNodes([]);
    },
    handleCurrentChange: function(currentPage) {
      this.currentPage = currentPage;
    },
    searchContent() {
      //搜索就相当于跳转到当前页面，借助created方法内容进行搜索
      //百度貌似就是用的这种方法
      switch (this.select) {
        case "专家":
          this.typeid = 1;
          break;
        case "论文":
          this.typeid = 2;
          break;
        case "专利":
          this.typeid = 4;
          break;
      }
      //产生新的链接地址，可通过点击搜索了解工作原理
      let searchPath =
        "/Search/?typeid=" + this.typeid + "&content=" + this.searchInput;
      try {
        this.$router.push({ path: searchPath });
        this.initialSearch();
      } catch (e) {
        this.$message("123");
      }
    },
    toPaperDetail(id) {
      this.$router.push({ path: "/paperdetail/" + id });
    },
    toPatentDetail(id) {
      this.$router.push({ path: "/patentdetail/" + id });
    }
  },
  filters: {
    paperTitleEllipsis(value) {
      if (!value) return "";
      if (value.length > 100) {
        return value.slice(0, 100) + "...";
      }
      return value;
    },
    paperAbstractEllipsis(value) {
      if (!value) return "";
      if (value.length > 200) {
        return value.slice(0, 200) + "...";
      }
      return value;
    },
    paperUrlEllipsis(value) {
      if (!value) return "";
      if (value.length > 70) {
        return value.slice(0, 70) + "...";
      }
      return value;
    }
  }
};
</script>

<style>
.selectorItem {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
}

.selectorHeader {
  margin-bottom: 10px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.selectorHeaderPoint {
  width: 5px;
  height: 5px;
  border-radius: 2.5px;
  background: #409eff;
}
.selectorHeaderText {
  margin-left: 10px;
  color: #333333;
}

.searchFilter {
  margin-bottom: 20px;
}

.selectorBtn {
  margin-left: 20px;
}
.typeBox {
  margin-top: 20px;
  margin-bottom: 20px;
}

.eachItem {
  margin-top: 10px;
  margin-bottom: 10px;
}

.textItem {
  display: flex;
  text-align: left;
  margin-top: 10px;
  margin-bottom: 10px;
}

.titleText {
  color: #409eff;
  display: flex;
  text-align: left;
  cursor: pointer;
}

.emptyRes {
  display: flex;
  justify-content: center;
  align-items: center;
}

.emptyResText {
  font-size: 1.2em;
  margin-top: 100px;
  margin-bottom: 100px;
}

#emptySearchInput {
  color: #f56c6c;
}

.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 20px;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  line-height: 20px;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  line-height: 20px;
}

body > .el-container {
  margin-bottom: 40px;
}
</style>
