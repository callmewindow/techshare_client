<template>
    <div>
        <keep-alive>
            <router-view>
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
                                <div class="info-content">{{expert.email}}</div>
                                <div class="info-content">
                                    论文数：{{expert.num_paper}}
                                    <el-divider direction="vertical"></el-divider>
                                    专利数：{{expert.num_patent}}
                                </div>
                            <div class="info-content">
                                标签：
                                <el-row v-for="(tag) in expert.tags"
                                        :key="tag.key"
                                        gutter="1"
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

                <!--el-collapse v-model="activeNames" @change="handleChange" >
                    <el-collapse-item title="一致性 Consistency" name="1">
                        <div>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</div>
                        <div>在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。</div>
                    </el-collapse-item>
                    <el-collapse-item title="反馈 Feedback" name="2">
                        <div>控制反馈：通过界面样式和交互动效让用户可以清晰的感知自己的操作；</div>
                        <div>页面反馈：操作后，通过页面元素的变化清晰地展现当前状态。</div>
                    </el-collapse-item>
                    <el-collapse-item title="效率 Efficiency" name="3">
                        <div>简化流程：设计简洁直观的操作流程；</div>
                        <div>清晰明确：语言表达清晰且表意明确，让用户快速理解进而作出决策；</div>
                        <div>帮助用户识别：界面简单直白，让用户快速识别而非回忆，减少用户记忆负担。</div>
                    </el-collapse-item>
                    <el-collapse-item title="可控 Controllability" name="4">
                        <div>用户决策：根据场景可给予用户操作建议或安全提示，但不能代替用户进行决策；</div>
                        <div>结果可控：用户可以自由的进行操作，包括撤销、回退和终止当前操作等。</div>
                    </el-collapse-item>

                    <el-collapse-item>

                    </el-collapse-item>
                </el-collapse-->
            </div>

    </el-card>
                </router-view>
            </keep-alive>
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
                    email:'affa@buaa.edu.cn',
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
                    }]
                },
                expertTemp:{}

            }
        },
        activated(){
            alert('sdfffqffqfqw');
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
                    const expertInfo = await expertAPI.getExpertInfo(this.expertId);
                    //直接整个返回值转移
                    this.expertTemp = expertInfo;
                    //或者从中提取部分内容
                    //（具体能提取那些值建议先用console输出然后再调试窗口进行查看）
                    this.expertTemp = expertInfo.data;
                } catch (e) {
                    //出错就利用el的消息提示输出错误
                    this.$message.error('错误');
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