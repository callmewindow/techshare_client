<template>
  <el-card>
    <div class="titlePart">
      <div class="typeChoose">
        <div class="typeChooseContent">
          <span>类型分类：</span>
          <el-radio-group v-model="radio" @change="flushList()">
            <el-radio :label="'unhandled'">未定</el-radio>
            <el-radio :label="'applyPassed'">已拒绝</el-radio>
            <el-radio :label="'applyRefused'">已通过</el-radio>
          </el-radio-group>
        </div>
      </div>
    </div>
    <div class="tablePart">
      <div class="table">
        <el-table :data="visibleList" fit style="width: 100%" :default-sort="{prop: 'date'}">
          <el-table-column prop="applyTime" label="时间"></el-table-column>
          <el-table-column prop="applicantName" label="姓名"></el-table-column>
          <el-table-column prop="applicantEmail" label="邮箱地址"></el-table-column>
          <el-table-column prop="applicantTitle" label="职位"></el-table-column>
          <el-table-column prop="applicantWorkplace" label="工作地址"></el-table-column>
          <el-table-column label="操作" width="100">
            <template slot-scope="scope">
              <el-button
                @click="handleApprove(scope.row)"
                size="small"
                icon="el-icon-edit"
                circle
                type="primary"
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <div class="dialogPart">
      <el-dialog title="审批申请" :visible.sync="dialogVisible" width="50%">
        <div style="font-size:1.20em">证明图片资料</div>
        <div style="font-size:1.05em; color:#777">（点击查看大图）</div>
        <div class="demo-image__preview">
          <el-image
            style="width: 80%; height: 80%"
            :src="applicantImage"
            :fit="'contain'"
            :preview-src-list="applicantImageList"
          ></el-image>
        </div>
        <br />
        <el-input
          type="textarea"
          :rows="3"
          placeholder="请输入通过或拒绝的原因"
          v-model="resultReason"
          style="width: 80%"
        ></el-input>

        <span slot="footer" class="dialog-footer">
          <el-button
            type="primary"
            @click="dialogVisible = false, resultReason = ''"
            round
            size="medium"
            style="font-size:1.03em"
          >取 消</el-button>
          <el-button
            type="danger"
            @click="refuseApply()"
            round
            size="medium"
            style="font-size:1.03em"
          >拒 绝</el-button>
          <el-button
            type="success"
            @click="passApply()"
            round
            size="medium"
            style="font-size:1.03em"
          >通 过</el-button>
        </span>
      </el-dialog>
    </div>
  </el-card>
</template>

<script>
import * as applyAPI from "../APIs/apply";
export default {
  name: "Approve",
  methods: {
    //定义异步方法
    async getAllApplyInfo() {
      //在异常获取中进行
      try {
        //传的值需要按照接口的定义来
        //利用const类型变量接受返回值（这里的返回值就是后端的返回值）
        const res = await applyAPI.getAllApplyInfo();
        //直接整个返回值转移
        //或者从中提取部分内容
        //（具体能提取那些值建议先用console输出然后再调试窗口进行查看）
        let allApplyList = res.data.apply;
        this.applyList = allApplyList;
        this.flushList();
      } catch (e) {
        //出错就利用el的消息提示输出错误
        this.$message.error(e.toString());
      }
    },
    flushList() {
      // 清空展示数组
      this.visibleList.splice(0, this.visibleList.length);
      var i;
      // 选择未定
      if (this.radio == "unhandled") {
        // 遍历原始数组
        for (i = 0; i < this.applyList.length; i++) {
          // 若种类为待定，则加入展示数组
          if (this.applyList[i].resultType == "unhandled") {
            this.visibleList.push(this.applyList[i]);
          }
        }
      } else if (this.radio == "applyRefused") {
        // 遍历原始数组
        for (i = 0; i < this.applyList.length; i++) {
          // 若种类为已拒绝，则加入展示数组
          if (this.applyList[i].resultType == "applyRefused") {
            this.visibleList.push(this.applyList[i]);
          }
        }
      } else {
        // 遍历原始数组
        for (i = 0; i < this.applyList.length; i++) {
          // 若种类为已通过，则加入展示数组
          if (this.applyList[i].resultType == "applyPassed") {
            this.visibleList.push(this.applyList[i]);
          }
        }
      }
    },
    handleApprove(row) {
      this.dialogVisible = true;
      this.applyId = row._id;
      // 这里根据后面的接口，根据row来决定后续图片的url
      this.applicantImage = row.applicantImage;
      this.applicantImageList.splice(0, this.applicantImageList.length);
      this.applicantImageList.push(this.applicantImage);
    },
    refuseApply() {
      applyAPI.applyRefused(this.applyId, this.resultReason);
      this.dialogVisible = false;
    },
    passApply() {
      applyAPI.applyPassed(this.applyId, this.resultReason);
      this.dialogVisible = false;
    }
  },
  created: function() {
    // 获得applyList
    this.getAllApplyInfo();
  },
  data() {
    return {
      radio: "unhandled",
      dialogVisible: false,
      applicantImage: "",
      applicantImageList: [],
      applyId: "",
      resultReason: "",
      applyList: [],
      visibleList: []
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.titlePart {
  width: 100%;
  display: flex;
  justify-content: center;
}
.typeChoose {
  width: 79%;
  display: flex;
  justify-content: flex-start;
}

.tablePart {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.table {
  width: 80%;
}
</style>
