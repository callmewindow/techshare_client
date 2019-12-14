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
          <div v-for="item in items" :key="item.ID">
            <div class="eachItem">
              <el-card shadow="always" class="box-card">
                <div slot="header" class="clearfix">
                  <span id="titleText" @click="toDetail(item.id)">{{item.Title | titleEllipsis}}</span>
                </div>
                <div class="textItem" id="informationText">{{item.Information | informationEllipsis}}</div>
                <div class="textItem" id="authorText">作者：{{item.Author | authorEllipsis}}</div>
                <div class="textItem" id="quoteNumText">被引量：{{item.QuoteNum}}</div>
                <div class="textItem" id="resourceText">来源：{{item.Resource | resourceEllipsis}}</div>
              </el-card>
              <el-divider></el-divider>
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

export default {
  name: "test",
  components: {
    Navigator
  },
  data() {
    return {
      typeid: 2,
      select: "论文",
      searchInput: "",
      selectorData: [
        {
          id: 1,
          label: "一级 1",
          children: [
            {
              id: 4,
              label: "二级 1-1",
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
        },
      ],
      items: [
        {
          id: '111',
          Title:
            "Multiple, distinct forms of bovine and human protein kinase C suggest diversity in cellular signaling pathways",
          Information:
            "Science , 233 , 859 – 866 .Coussens L, Parker PJ, Rhee L, Yang-Feng TL, Chen E, Waterfield MD, Francke U, Ullrich A (1986) Multiple, distinct forms of bovine and human protein kinase C suggest diversity in cellular",
          Author: "L Coussens ， PJ Parker ， L Rhee ， ... -  《Science》 ",
          QuoteNum: 1712,
          Resource:
            "Taylor & Francis  /  Europe PMC  /  NCBI  /  ganino.com  /  electronicsandbook..."
        },
        {
          id: '222',
          Title: "The neurobiology of learning and memory",
          Information:
            'Science , 233 , 941 – 947 .R. F. Thompson, "The Neurobiology of learning and memory," Science, vol. 233, pp. 941-947, 1986.Thompson, R. F. ( 1986 ): The neurobiology of learning and memory . Science , 233 : 941 –...',
          Author: "RF Thompson  -  《Science》",
          QuoteNum: 1385,
          Resource: "Europe PMC  /  NCBI  /  Cell Press  /  JSTOR  /  ERIC"
        },
        {
          id: '333',
          Title:
            "Replication of the B19 parvovirus in human bone marrow cell cultures",
          Information:
            "Science 233 (4766), 883-886.OZAWA,K., KURTZMAN,G. & YOUNG,N. (1986). Replication of the B19 parvovirus in human bone marrow cell cultures. Science 233, 883-886.Ozawa K, Kurtzman G, Young N. 1986. Replication of the B19 ...",
          Author: "K Ozawa ， G Kurtzman ， N Young  -  《Science》",
          QuoteNum: 600,
          Resource:
            "BMJ  /  JSTOR  /  Oxford Univ Press  /  Europe PMC  /  NCBI"
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
    initialSearch() {
      //搜索类型
      this.typeid = globalAPI.getUrlKey('typeid');
      //搜索内容
      this.searchInput = globalAPI.getUrlKey('content');
      if(this.searchInput == null){
        //没有搜索内容或者类型不标准直接返回
        return ;
      }
      switch (this.typeid) {
        case '1':
          this.select = "专家";
          //调用搜索专家的函数
          break;
        case '2':
          this.select = "论文";
          //调用搜索论文的函数
          break;
        case '4':
          this.select = "专利";
          //调用搜索专利的函数
          break;
        default:
          //类型不标准，不进行搜索即可
          window.console.log('不进行搜索');
          break;
      }
      //调试用
      window.console.log(this.searchInput);
      window.console.log(this.select);
      window.console.log(this.typeid);
    },
    getCheckedNodes() {
      // eslint-disable-next-line no-console
      console.log(this.$refs.tree.getCheckedNodes(true, false));
    },
    searchContent() {
      //搜索就相当于跳转到当前页面，借助created方法内容进行搜索
      //百度貌似就是用的这种方法
      switch (this.select) {
        case '专家':
          this.typeid = '1';
          break;
        case '论文':
          this.typeid = '2';
          break;
        case '专利':
          this.typeid = '4';
          break;
      }
      //产生新的链接地址，可通过点击搜索了解工作原理
      let searchPath = "/Search/?typeid="+this.typeid+"&content="+this.searchInput;
      try{
        this.$router.push({path:searchPath});
        this.initialSearch();
      }catch (e) {
        this.$message('123');
      }
    },
    toDetail(id) {
      this.$router.push("Detail/"+id);
    }
  },
  filters: {
    titleEllipsis(value) {
      if (!value) return "";
      if (value.length > 100) {
        return value.slice(0, 100) + "...";
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
    authorEllipsis(value) {
      if (!value) return "";
      if (value.length > 50) {
        return value.slice(0, 50) + "...";
      }
      return value;
    },
    resourceEllipsis(value) {
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

.searchFilter{
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

#resourceText {
  margin-bottom: 0px;
  color: #909399;
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
