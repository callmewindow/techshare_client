<template>
  <div>
    <Navigator need-search="true" />

    <div>
      <el-col :span="1">.</el-col>
      <el-col :span="5">
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
      <el-col :span="1">.</el-col>
      <el-col :span="16" id="searchList">
        <div v-for="item in items" :key="item.ID">
          <div class="item">
            <el-card shadow="always" class="box-card">
              <div slot="header" class="clearfix">
                <span id="titleText" @click="toDetail">{{item.Title | titleEllipsis}}</span>
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
      <el-col :span="1">.</el-col>
    </div>

  </div>
</template>

<script>
import Navigator from "@/components/Navigator";

export default {
  name: "test",
  components: {
    Navigator,
  },
  data() {
    return {
      searchInput: "",
      selectorData: [
        {
          id: 1,
          label: "一级 1",
          children: [
            {
              id: 4,
              label: "二级 1-1",
              children: [
                {
                  id: 9,
                  label: "三级 1-1-1"
                },
                {
                  id: 10,
                  label: "三级 1-1-2"
                }
              ]
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
        {
          id: 3,
          label: "一级 3",
          children: [
            {
              id: 7,
              label: "二级 3-1"
            },
            {
              id: 8,
              label: "二级 3-2"
            }
          ]
        }
      ],
      items: [
        {
          ID: 1,
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
          ID: 2,
          Title: "The neurobiology of learning and memory",
          Information:
            'Science , 233 , 941 – 947 .R. F. Thompson, "The Neurobiology of learning and memory," Science, vol. 233, pp. 941-947, 1986.Thompson, R. F. ( 1986 ): The neurobiology of learning and memory . Science , 233 : 941 –...',
          Author: "RF Thompson  -  《Science》",
          QuoteNum: 1385,
          Resource: "Europe PMC  /  NCBI  /  Cell Press  /  JSTOR  /  ERIC"
        },
        {
          ID: 3,
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
  methods: {
    getCheckedNodes() {
      // eslint-disable-next-line no-console
      console.log(this.$refs.tree.getCheckedNodes(true, false));
    },
    viewSearchInput() {
      // eslint-disable-next-line no-console
      console.log(this.$data.searchInput);
    },
    toDetail() {
      this.$router.push("Detail");
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
  },
};
</script>

<style>
.searchFilter {
  margin-top: 20px;
}

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

#searchList {
  margin-top: 20px;
}

.selectorBtn {
  margin-left: 50px;
}

.item {
  margin-bottom: 20px;
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
