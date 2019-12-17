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
                                <div class="info-content">{{expert.name}}    ID：{{expert.expertId}}</div>
                                <div class="info-content">{{expert.workplace}} {{expert.title}}</div>
                                <div class="info-content">{{expert.expertEmail}}</div>
                                <div class="info-content">
                                    论文数：{{expert.num_paper}}
                                    <el-divider direction="vertical"></el-divider>
                                    专利数：{{expert.num_patent}}
                                </div>
                            <div class="info-content">
                                标签：
                                <el-row v-for="(tag) in expert.tags"
                                        :key="tag.key"
                                        :gutter="1"
                                        >
                                    <el-col>
                                    <el-link @click="toTag">{{tag.value}}</el-link>
                                        </el-col>
                                </el-row>
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

            <div class="fruit" >
                <el-tabs v-model="activeName_Tab" @tab-click="handleClick">
                    <el-tab-pane label="论文成果" name="first"></el-tab-pane>
                    <el-tab-pane label="专利成果" name="second"></el-tab-pane>
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

                expert:{
                    name:'稼轩',
                    num_patent:'0000',
                    num_paper:'0000',
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
                    paperList: [],
                    patentList: []
                },
                expertTemp:{}

            }
        },
        created(){
            //alert('sdfffqffqfqw');
            this.getExpertInfo();
        },
        methods:{
            handleClick(tab, event) {
                alert(tab, event);
            },
            toTag() {
                this.$router.push("Tag");//标签页面
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
    .info{
        margin-top: 50px;
    }
    .info-content{
        text-align: left;
        margin-top: 12px;
        margin-left: 10px;
    }
    .fruit{
        margin-top: 30px;
    }
</style>