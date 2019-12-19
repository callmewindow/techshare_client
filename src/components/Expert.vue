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
                        <el-button  icon="el-icon-star-off" @click="follow" round v-if="isfollow==false">关注</el-button>
                        <el-button  icon="el-icon-star-off" @click="unfollow" round v-else-if="isfollow==true">已关注</el-button>

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
                                         @click="toTag(tag.value)"
                                         class="link">' {{tag.value}} '
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
        <el-divider content-position="center" >专家简介</el-divider>
        <div  class="expertIntro" :span="10">{{expert.Intro}}
        </div>
        <div>
            <i class="el-icon-edit edit" style="float: right; padding: 3px 0;size: 50px" @click="toDetail"></i>
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
                                    <el-link id="titleText_paper" @click="toDetail(item._id)" class="link">{{item.paperTitle | titleEllipsis}}</el-link>
                                </div>
                                <div class="textItem">
                                    <span>标签：<span v-for="(tag,index) in item.paperTags" :key="index">
                                    <span v-if="index == 0">{{tag}}</span>
                                    <span v-else>,{{tag}}</span>
                                    </span>
                                    </span>
                                </div>

                                <div
                                        class="textItem"
                                        id="informationText_paper"
                                >摘要：{{item.paperAbstract | informationEllipsis}}</div>
                                <div class="textItem">
                                    <span>作者：
                                    <span v-for="(author,index) in item.author" :key="index">
                                    <span v-if="index == 0">{{author}}</span>
                                    <span v-else>,{{author}}</span>
                                    </span>
                                    </span>
                                </div>
                                <div class="textItem" id="quoteNumText_paper">被引量：{{item.quoteNum}}</div>
                                <div class="textItem" id="timeText_paper">时间：{{item.timeNum}}</div>
                                <!--div class="textItem" id="resourceText_paper">来源：{{item.Resource | resourceEllipsis}}</div-->
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
                                    <el-link id="titleText_patent" @click="toDetail(item._id)" class="link">{{item.patentTitle | titleEllipsis}}</el-link>
                                </div>
                                <div class="textItem">
                                    <span>标签：<span v-for="(tag,index) in item.patentTags" :key="index">
                                    <span v-if="index == 0">{{tag}}</span>
                                    <span v-else>,{{tag}}</span>
                                    </span>
                                    </span>
                                </div>
                                <div
                                        class="textItem"
                                        id="informationText_patent"
                                ><span>摘要：{{item.patentAbstract | informationEllipsis}}</span></div>
                                <div class="textItem">
                                    <span>作者：
                                    <span v-for="(author,index) in item.author" :key="index">
                                    <span v-if="index == 0">{{author}}</span>
                                    <span v-else>,{{author}}</span>
                                    </span>
                                    </span>
                                </div>
                                <div class="textItem" id="quoteNumText_patent">被引量：{{item.quoteNum}}</div>
                                <div class="textItem" id="timeText_patent">时间：{{item.timeNum}}</div>
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

                isfollow:false,

                expert:{
                    name:'稼轩',
                    num_patent:'0',
                    num_paper:'0',
                    title:'教授',
                    expertId:this.$store.state.expertId,
                    expertEmail:'affa@buaa.edu.cn',
                    workplace: 'BUAA',
                    Intro:"林士谔（1913-1987）自动控制学家。广东平远人，1935年毕业于上海交通大学电机系。1939年获美国马萨诸塞理工学院航空系航空工程博士学位。曾任成都航空机械学校高级教官，成都航空研究院研究员，厦门大学教授、系主任。北京航空航天大学以及我国航空自动控制学科和陀螺惯导学科的奠基人。在航空陀螺仪表与惯性导航方面有较深研究。" +
                        "林士谔（1913-1987）自动控制学家。广东平远人，1935年毕业于上海交通大学电机系。1939年获美国马萨诸塞理工学院航空系航空工程博士学位。曾任成都航空机械学校高级教官，成都航空研究院研究员，厦门大学教授、系主任。北京航空航天大学以及我国航空自动控制学科和陀螺惯导学科的奠基人。在航空陀螺仪表与惯性导航方面有较深研究。",
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
                        _id: "111",
                        paperTitle:
                            "Multiple, distinct forms of bovine and human protein kinase C suggest diversity in cellular signaling pathways",
                        paperTags: [
                            "3214",
                            "3241",
                            "1234"
                        ],
                        paperAbstract:
                            "Science , 233 , 859 – 866 .Coussens L, Parker PJ, Rhee L, Yang-Feng TL, Chen E, Waterfield MD, Francke U, Ullrich A (1986) Multiple, distinct forms of bovine and human protein kinase C suggest diversity in cellular",
                        author: [
                            "4",
                            "5",
                            "1"
                        ],
                        quoteNum: 1712,
                        timeNum: "2019-12-10 16:00:00"
                        },
                        {
                            _id: "111",
                            paperTitle:
                                "Multiple, distinct forms of bovine and human protein kinase C suggest diversity in cellular signaling pathways",
                            paperTags: [
                                "3214",
                                "3241",
                                "1234"
                            ],
                            paperAbstract:
                                "Science , 233 , 859 – 866 .Coussens L, Parker PJ, Rhee L, Yang-Feng TL, Chen E, Waterfield MD, Francke U, Ullrich A (1986) Multiple, distinct forms of bovine and human protein kinase C suggest diversity in cellular",
                            author: [
                                "4",
                                "5",
                                "1"
                            ],
                            quoteNum: 1712,
                            timeNum: "2019-12-10 16:00:00"

                        },
                        {
                            _id: "111",
                            paperTitle:
                                "Multiple, distinct forms of bovine and human protein kinase C suggest diversity in cellular signaling pathways",
                            paperTags: [
                                "3214",
                                "3241",
                                "1234"
                            ],
                            paperAbstract:
                                "Science , 233 , 859 – 866 .Coussens L, Parker PJ, Rhee L, Yang-Feng TL, Chen E, Waterfield MD, Francke U, Ullrich A (1986) Multiple, distinct forms of bovine and human protein kinase C suggest diversity in cellular",
                            author: [
                                "4",
                                "5",
                                "1"
                            ],
                            quoteNum: 1712,
                            timeNum: "2019-12-10 16:00:00"

                        }],
                    patentList:[{
                        _id: "111",
                        patentTitle:
                            "Multiple, distinct forms of bovine and human protein kinase C suggest diversity in cellular signaling pathways",
                        patentTags: [
                            "3214",
                            "3241",
                            "1234"
                        ],
                        patentAbstract:
                            "Science , 233 , 859 – 866 .Coussens L, Parker PJ, Rhee L, Yang-Feng TL, Chen E, Waterfield MD, Francke U, Ullrich A (1986) Multiple, distinct forms of bovine and human protein kinase C suggest diversity in cellular",
                        author: [
                            "4",
                            "5",
                            "1"
                        ],
                        quoteNum: 1712,
                        timeNum: "2019-12-10 16:00:00"

                    }],
                },
                expertTemp:{},

                searchInput: "",
                // 暂存，后端完善后分析data
                searchRes: "",

            }
        },
        created(){
            //alert('sdfffqffqfqw');
            this.getExpertInfo();
            this.getFruit();
            this.checkIsFollow();
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
            async follow(){
                try{
                    const res = await expertAPI.followExpert(this.$store.state.userId,this.$store.state.expertId);
                    let resInfo = res.data;
                    if(resInfo=="yes") {
                        this.isfollow = true;
                        this.$message.success("关注成功");
                    }
                    else
                        this.$message.error("关注失败");
                }
                catch(e){
                    this.$message.error(e.toString());
                }
            },
            async unfollow(){
                try{
                    const res = await expertAPI.cancelExpert(this.$store.state.userId,this.$store.state.expertId);
                    let resInfo = res.data;
                    if(resInfo=="yes") {
                        this.isfollow = false;
                        this.$message.success("取消关注成功");

                    }
                    else
                        this.$message.error("取消关注失败");
                }
                catch(e){
                    this.$message.error(e.toString());
                }
            },
            async checkIsFollow(){
                try{
                    const follow = await expertAPI.checkExpert(this.$store.state.userId,this.$store.state.expertId);

                    let followInfo = follow.data;
                    if(followInfo=="yes")
                        this.isfollow = true;
                    else if(followInfo=="no")
                        this.isfollow = false;
                }catch(e){
                    this.$message.error(e.toString());
                }
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
                    //this.expert.paperList = expertInfoNow.paperList;
                    //this.expert.patentList = expertInfoNow.patentList;


                } catch (e) {
                    //出错就利用el的消息提示输出错误
                    //window.console.log('asd');
                    this.$message.error(e.toString());
                }
            },
            async getFruit() {
                try {
                    //传的值需要按照接口的定义来
                    //利用const类型变量接受返回值（这里的返回值就是后端的返回值）
                    const res_paper = await expertAPI.getExpertPaper(this.$store.state.expertId);
                    //直接整个返回值转移
                    //或者从中提取部分内容
                    //（具体能提取那些值建议先用console输出然后再调试窗口进行查看）
                    let temp_paper = res_paper.data;
                    this.expert.paperList = temp_paper.paperList;
                    //this.searchRes = temp_paper;

                    const res_patent = await expertAPI.getExpertPatent(this.$store.state.expertId);
                    //直接整个返回值转移
                    //或者从中提取部分内容
                    //（具体能提取那些值建议先用console输出然后再调试窗口进行查看）
                    let temp_patent = res_patent.data;
                    //this.searchRes = temp_patent;
                    this.expert.patentList = temp_patent.patentList;


                } catch (e) {
                    //出错就利用el的消息提示输出错误
                    this.$message.error(e.toString());
                }
            },
            getCheckedNodes() {
                // eslint-disable-next-line no-console
                console.log(this.$refs.tree.getCheckedNodes(true, false));
            },
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
    .expertIntro{
        text-align: center;
    }
    .link{
        font-size: 15px;
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