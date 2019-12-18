<template>
    <div>
    <el-card>
        <Navigator active-func="Expert" />

        <div id="main">
            <!--个人信息-->
                <el-row :gutter="20" id="info">
                    <!--头像-->
                    <el-col :xs="{span:12,offset:0}" :sm="{span:9,offset:0}" :md="{span:7,offset:0}" :lg="{span:5,offset:0}" :xl="{span:5,offset:0}">
                        <div>
                            <el-avatar :size="160" :src="wel" id="head_img"></el-avatar>
                        </div>
                        <el-button  icon="el-icon-star-off" round >关注</el-button>
                    </el-col>

                    <el-col :xs="{span:12,offset:0}" :sm="{span:9,offset:0}" :md="{span:7,offset:0}"  :lg="{span:6,offset:0}" :xl="{span:6,offset:0}">
                        <div class="info">
                            <div class="info-content" id="name">{{expert.name}}</div>
                            <div class="info-content">ID：{{expert.expertId}}</div>
                                <div class="info-content">{{expert.workplace}} {{expert.title}}</div>
                                <div class="info-content">{{expert.expertEmail}}</div>
                                <div class="info-content">
                                    论文数：{{expert.num_paper}}
                                    <el-divider direction="vertical"></el-divider>
                                    专利数：{{expert.num_patent}}
                                </div>
                            <div class="info-content">
                                标签：
                                 <el-link
                                         v-for="(tag) in expert.tags"
                                         :key="tag.key"
                                         @click="toTag(tag.value)" >' {{tag.value}} '
                                 </el-link>
                            </div>

                        </div>
                    </el-col>

                    <el-col :xs="{span:0,offset:0}"  :sm="{span:6,offset:0}" :md="{span:9,offset:0}"  :lg="{span:13,offset:0}" :xl="{span:13,offset:0}">
                        <div></div>
                    </el-col>
                </el-row>

            </div>
            <!--论文专利数量-->
        <el-divider content-position="center" >信息展示</el-divider>
        <div>

        </div>

        <el-divider content-position="center" >研究成果</el-divider>
            <!--成果展示-->
            <div class="fruit" >
                <el-tabs v-model="activeName_Tab" @tab-click="handleClick">
                    <el-tab-pane label="论文成果" name="first" @click="setSelectPaper" value="论文">
                    <div v-for="item in expert.paperList" :key="item.ID">
                        <div class="eachItem">
                            <el-card shadow="always" class="box-card">
                                <div slot="header" class="clearfix">
                                    <el-link id="titleText_paper" @click="toDetail(item.id)">{{item.Title | titleEllipsis}}</el-link>
                                </div>
                                <div
                                        class="textItem"
                                        id="informationText_paper"
                                >{{item.Information | informationEllipsis}}</div>
                                <div class="textItem" id="authorText_paper">作者：{{item.Author | authorEllipsis}}</div>
                                <div class="textItem" id="quoteNumText_paper">被引量：{{item.QuoteNum}}</div>
                                <div class="textItem" id="resourceText_paper">来源：{{item.Resource | resourceEllipsis}}</div>
                            </el-card>
                            <el-divider></el-divider>
                        </div>
                    </div>
                    </el-tab-pane>

                    <el-tab-pane label="专利成果" name="second" @click="setSelectPatent" value="专利">

                    <div v-for="item in expert.patentList" :key="item.ID">
                        <div class="eachItem">
                            <el-card shadow="always" class="box-card">
                                <div slot="header" class="clearfix">
                                    <el-link id="titleText_patent" @click="toDetail(item.id)">{{item.Title | titleEllipsis}}</el-link>
                                </div>
                                <div
                                        class="textItem"
                                        id="informationText_patent"
                                >{{item.Information | informationEllipsis}}</div>
                                <div class="textItem" id="authorText_patent">作者：{{item.Author | authorEllipsis}}</div>
                                <div class="textItem" id="quoteNumText_patent">被引量：{{item.QuoteNum}}</div>
                                <div class="textItem" id="resourceText_patent">来源：{{item.Resource | resourceEllipsis}}</div>
                            </el-card>
                            <el-divider></el-divider>
                        </div>
                    </div>
                    </el-tab-pane>
                </el-tabs>
            </div>

    </el-card>
    </div>
</template>

<script>
    import Navigator from "@/components/Navigator";
    import * as expertAPI from "../APIs/expert";
    import * as searchAPI from "../APIs/search";
    //import * as globalAPI from "../APIs/global";

    export default {
        name: "Expert",
        components:{
            Navigator
        },
        data(){
            return{
                wel: require("@/images/齐木楠雄1.png"),
                activeIndex: this.activeFunc,
                activeNames: ['1','2','3'],
                activeName_Tab:'first',

                expert:{
                    name:'稼轩',
                    num_patent:'0',
                    num_paper:'0',
                    title:'教授',
                    expertId:'2424',
                    expertEmail:'affa@buaa.edu.cn',
                    workplace: 'BUAA',
                    tags:[{
                        key: 1,
                        value: '计算机科学'
                        },
                        {
                            key: 2,
                            value: '软件工程'
                        },
                        {
                            key: 3,
                            value: '工程'
                        },],
                    contents:[{
                        key: 1,
                        value: ''
                    }],
                    paperList: [{
                        id: "111",
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
                            id: "222",
                            Title: "The neurobiology of learning and memory",
                            Information:
                                'Science , 233 , 941 – 947 .R. F. Thompson, "The Neurobiology of learning and memory," Science, vol. 233, pp. 941-947, 1986.Thompson, R. F. ( 1986 ): The neurobiology of learning and memory . Science , 233 : 941 –...',
                            Author: "RF Thompson  -  《Science》",
                            QuoteNum: 1385,
                            Resource: "Europe PMC  /  NCBI  /  Cell Press  /  JSTOR  /  ERIC"
                        },
                        {
                            id: "333",
                            Title:
                                "Replication of the B19 parvovirus in human bone marrow cell cultures",
                            Information:
                                "Science 233 (4766), 883-886.OZAWA,K., KURTZMAN,G. & YOUNG,N. (1986). Replication of the B19 parvovirus in human bone marrow cell cultures. Science 233, 883-886.Ozawa K, Kurtzman G, Young N. 1986. Replication of the B19 ...",
                            Author: "K Ozawa ， G Kurtzman ， N Young  -  《Science》",
                            QuoteNum: 600,
                            Resource:
                                "BMJ  /  JSTOR  /  Oxford Univ Press  /  Europe PMC  /  NCBI"
                        }],
                    patentList: []
                },
                expertTemp:{},

                typeid: 2,
                select: "",
                searchInput: "",
                // 暂存，后端完善后分析data
                searchRes: "",

            }
        },
        created(){
            //alert('sdfffqffqfqw');
            this.getExpertInfo();
            this.initialSearch();
        },
        methods:{
            setSelectPaper(){
                this.select="论文";
            },
            setSelectPatent(){
                this.select="专家";
            },
            handleClick(tab, event) {
                window.console.log(tab, event);
            },
            toTag() {
                //this.$router.push("Tag");//标签页面
            },
            async getExpertInfo() {
                //在异常获取中进行
                try {
                    //传的值需要按照接口的定义来
                    //利用const类型变量接受返回值（这里的返回值就是后端的返回值）
                    //window.console.log(this.$store.state.expertId);
                    const expertInfo = await expertAPI.getExpertInfo(this.$store.state.expertId);
                    //直接整个返回值转移
                    let expertInfoNow = expertInfo.data.expert_info;
                     //或者从中提取部分内容
                    //（具体能提取那些值建议先用console输出然后再调试窗口进行查看）
                    //window.console.log('wrwr');
                    this.expert.name = expertInfoNow.expertName;
                    this.expert.expertEmail = expertInfoNow.expertEmail;
                    this.expert.num_paper = expertInfoNow.paperNum;
                    this.expert.num_paper = expertInfoNow.patentNum;
                    this.expert.tags = expertInfoNow.expertTags;
                    this.expert.workplace = expertInfoNow.workplace;
                    this.expert.paperList = expertInfoNow.paperList;
                    this.expert.patentList = expertInfoNow.patentList;


                } catch (e) {
                    //出错就利用el的消息提示输出错误
                    window.console.log('asd');
                    this.$message.error(e.toString());
                }
            },
            async searchByKeyword(typeid,keyword) {
                //在异常获取中进行
                try {
                    //传的值需要按照接口的定义来
                    //利用const类型变量接受返回值（这里的返回值就是后端的返回值）
                    const res = await searchAPI.searchByKeyword(typeid,keyword);
                    //直接整个返回值转移
                    //或者从中提取部分内容
                    //（具体能提取那些值建议先用console输出然后再调试窗口进行查看）
                    let temp = res.data;
                    this.searchRes = temp;
                } catch (e) {
                    //出错就利用el的消息提示输出错误
                    this.$message.error(e.toString());
                }
            },
            async initialSearch() {
                //搜索类型
                //this.typeid = globalAPI.getUrlKey("typeid");
                //搜索内容
                //this.searchInput = globalAPI.getUrlKey("content");
                //if (this.searchInput == null) {
                    //没有搜索内容或者类型不标准直接返回
                //    return;
                //}
                this.searchByKeyword(2,this.name);
                this.searchByKeyword(4,this.name);

                /*this.searchByKeyword();
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
                    default:
                        //类型不标准，不进行搜索即可
                        window.console.log("不进行搜索");
                        break;
                }*/
                //调试用
                // window.console.log(this.searchInput);
                // window.console.log(this.select);
                // window.console.log(this.typeid);
            },
            getCheckedNodes() {
                // eslint-disable-next-line no-console
                console.log(this.$refs.tree.getCheckedNodes(true, false));
            },
            /*searchContent() {
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
                    this.$message(e.toString());
                }
            },*/
            toDetail(id) {
                this.$router.push("Detail/" + id);
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
    }
</script>

<style scoped>
    #main{
        height: auto;
        clear: both;
    }
    #info{
        margin-top: 70px;
    }
    #head_img{
        margin-top: 30px;
        margin-bottom: 20px;
    }
    #name{
        font-weight:bold;
        font-size:20px;
    }
    .info{
        margin-top: 35px;
    }
    .info-content{
        text-align: left;
        margin-top: 12px;
        margin-left: 10px;
    }
    .fruit{
        margin-top: 30px;
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
</style>