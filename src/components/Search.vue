<template>
  <el-card>
    <Navigator active-func="Search" />

    <el-card shadow="never" style="width:90%; margin: auto;">
      <el-row :gutter="20">
        <el-col :sm="24" :md="6">
          <el-card class="searchFilter">
            <div class="selectorItem">
              <div class="selectorHeader">
                <div class="selectorHeaderPoint"></div>
                <div class="selectorHeaderText">分类</div>
                <el-button
                  size="small"
                  type="primary"
                  round
                  @click="getCheckedNodes"
                  class="selectorBtn"
                >过滤</el-button>
              </div>
              <div class="selector">
                <el-tree
                  :data="selectorData"
                  show-checkbox
                  default-expand-all
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

          <div v-if="typeid == 1">
            <div v-for="expert in expertList" :key="expert._id">
              <div class="eachItem">
                <el-card shadow="always" class="box-card">
                  <!--姓名-->
                  <div slot="header" class="clearfix">
                    <span id="titleText" @click="toDetail(expert._id)">{{expert.expertName}}</span>
                  </div>
                  <!--领域-->
                  <div class="textItem">
                    <span>
                      所属领域：
                      <span v-for="(tag,index) in expert.expertTags" :key="index">
                        <span v-if="index == 0">{{tag}}</span>
                        <span v-else>,{{tag}}</span>
                      </span>
                    </span>
                  </div>
                  <!--论文数-->
                  <div class="textItem">{{expert.paperNum}}</div>
                  <!--专利数-->
                  <div class="textItem">{{expert.patentNum}}</div>
                </el-card>
                <el-divider></el-divider>
              </div>
            </div>
          </div>

          <div v-else-if="typeid == 2">
            <div v-for="paper in paperList" :key="paper._id">
              <div class="eachItem">
                <el-card shadow="always" class="box-card">
                  <!--标题-->
                  <div slot="header" class="clearfix">
                    <span
                      id="titleText"
                      @click="toDetail(paper._id)"
                    >{{paper.paperTitle | paperTitleEllipsis}}</span>
                  </div>
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
                  <!--摘要-->
                  <div class="textItem">摘要：{{paper.paperAbstract | paperAbstractEllipsis}}</div>
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
                  <!--被引量-->
                  <div class="textItem">被引量：{{paper.quoteNum}}</div>
                  <!--时间-->
                  <div class="textItem">时间：{{paper.paperTime.split(" ")[0]}}</div>
                </el-card>
                <el-divider></el-divider>
              </div>
            </div>
          </div>

          <div v-else-if="typeid == 4">
            <div v-for="patent in patentList" :key="patent._id">
              <div class="eachItem">
                <el-card shadow="always" class="box-card">
                  <!--专利名字-->
                  <div slot="header" class="clearfix">
                    <span id="titleText" @click="toDetail(patent._id)">{{patent.patentName}}</span>
                  </div>
                  <!--标签-->
                  <div class="textItem">
                    <span>
                      标签：
                      <span v-for="(tag,index) in patent.patentTags" :key="index">
                        <span v-if="index == 0">{{tag}}</span>
                        <span v-else>,{{tag}}</span>
                      </span>
                    </span>
                  </div>
                  <!--摘要-->
                  <div class="textItem">摘要：{{patent.patentAbstract}}</div>
                  <!--作者-->
                  <div class="textItem">
                    <span>
                      作者：
                      <span v-for="(author,index) in patent.patentAuthors" :key="index">
                        <span v-if="index == 0">{{author}}</span>
                        <span v-else>,{{author}}</span>
                      </span>
                    </span>
                  </div>
                  <!--机构-->
                  <div class="textItem">机构：{{patent.patentAgency}}</div>
                  <!--时间-->
                  <div class="textItem">时间：{{patent.patentTime.split(" ")[0]}}</div>
                </el-card>
                <el-divider></el-divider>
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
    </el-card>
  </el-card>
</template>

<script>
import Navigator from "@/components/Navigator";
import * as globalAPI from "../APIs/global";
import * as searchAPI from "../APIs/search";

export default {
  components: {
    Navigator
  },
  data() {
    return {
      typeid: 2,
      select: "论文",
      searchInput: "",
      resList: [],
      selectorData: [
        {
          id: 1,
          label: "一级 1",
          children: [
            {
              id: 4,
              label: "二级 1-1"
            }
          ]
        },
        {
          id: 2,
          label: "一级 2",
          children: [
            {
              id: 5,
              label: "二级 2-1"
            },
            {
              id: 6,
              label: "二级 2-2"
            }
          ]
        }
      ],
      expertList: [
        {
          _id: "",
          user: "",
          expertTags: ["", "", ""],
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
          _id: "5df774e390a5db2132601a8a",
          uploadExpert: "5df48bc4c2df6a4bf5e94681",
          paperTags: ["3214", "3241", "1234"], //
          DOI: "2342",
          paperTitle: "1234", //
          paperTime: "2019-12-09 16:00:00", //
          paperUrl: "63456",
          paperAbstract: "4536", //
          quoteNum: 0, //
          readNum: 0,
          starNum: 0,
          starUser: [],
          author: ["2314", "456", "643"] //
        }
      ],
      patentList: [
        {
          _id: "5df77a3821c71750263a2c71",
          uploadExpert: "5df48bc4c2df6a4bf5e94681",
          patentTags: ["2131", "123", "1231"], //
          patentName: "231412", //
          patentNo: "2",
          patentTime: "2019-12-17 16:00:00", //
          patentAgency: "buaa", //
          patentAbstract: "3213", //
          readNum: 0,
          starNum: 0,
          starUser: [],
          patentAuthors: ["32131", "123123", "1231232"] //
        }
      ],
      defaultProps: {
        children: "children",
        label: "label"
      }
    };
  },
  created() {
    this.initialSearch();
  },
  methods: {
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
        if (this.typeid == 1) {
          this.expertList = this.resList;
        } else if (this.typeid == 2) {
          this.paperList = this.resList;
        } else if (this.typeid == 4) {
          this.patentList = this.resList;
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
    getCheckedNodes() {
      // 此处获得所选的分类值
      window.console.log(this.$refs.tree.getCheckedNodes(true, false));
    },
    searchContent() {
      //搜索就相当于跳转到当前页面，借助created方法内容进行搜索
      //百度貌似就是用的这种方法
      switch (this.select) {
        case "专家":
          this.typeid = "1";
          break;
        case "论文":
          this.typeid = "2";
          break;
        case "专利":
          this.typeid = "4";
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
    toDetail(id) {
      this.$router.push({ path: "/Detail/" + id });
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
  margin-left: 50px;
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

#titleText {
  color: #409eff;
  display: flex;
  text-align: left;
  cursor: pointer;
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
