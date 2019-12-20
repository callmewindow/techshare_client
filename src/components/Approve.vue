<template>
  <div>
    <Navigator active-func="Approve" />
    <el-card>
      <div class="titlePart">
        <div class="typeChoose">
          <div>
            <span>类型分类：</span>
            <el-radio-group v-model="radio" @change="flushList()">
              <el-radio :label="'unhandled'">未定</el-radio>
              <el-radio :label="'applyRefused'">已拒绝</el-radio>
              <el-radio :label="'applyPassed'">已通过</el-radio>
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
                  circle
                  icon="el-icon-edit"
                  type="primary"
                  v-if="radio == 'unhandled' "
                ></el-button>
                <el-button size="small" circle icon="el-icon-edit" type="primary" v-else disabled></el-button>
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
              v-if="radio == 'unhandled'"
            >拒 绝</el-button>
            <el-button
              type="success"
              @click="passApply()"
              round
              size="medium"
              style="font-size:1.03em"
              v-if="radio == 'unhandled'"
            >通 过</el-button>
          </span>
        </el-dialog>
      </div>
    </el-card>
  </div>
</template>

<script>
import * as applyAPI from "../APIs/apply";
export default {
  name: "Approve",
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
  },
  methods: {
    //定义异步方法
    async getAllApplyInfo() {
      //在异常获取中进行
      try {
        const res = await applyAPI.getAllApplyInfo();
        this.applyList = res.data.apply;
      } catch (e) {
        this.$message.error(e.toString());
      }
    },
    flushList() {
      this.visibleList.splice(0);
      var i;
      // 选择未定
      if (this.radio == "unhandled") {
        for (i = 0; i < this.applyList.length; i++) {
          if (this.applyList[i].resultType == "unhandled") {
            this.visibleList.push(this.applyList[i]);
          }
        }
      }
      // 已拒绝
      else if (this.radio == "applyRefused") {
        for (i = 0; i < this.applyList.length; i++) {
          if (this.applyList[i].resultType == "Refused") {
            this.visibleList.push(this.applyList[i]);
          }
        }
      }
      // 已通过
      else {
        for (i = 0; i < this.applyList.length; i++) {
          if (this.applyList[i].resultType == "Passed") {
            this.visibleList.push(this.applyList[i]);
          }
        }
      }
    },
    handleApprove(row) {
      this.applyId = row._id;
      this.applicantImage =
        this.$store.state.frontIP + row.applicantImage.split("/root")[1];
      this.applicantImageList.splice(0);
      this.applicantImageList.push(this.applicantImage);
      this.dialogVisible = true;
    },
    async refuseApply() {
      await applyAPI.applyRefused(this.applyId, this.resultReason);
      await this.getAllApplyInfo();
      await this.flushList();
      this.resultReason = "";
      this.dialogVisible = false;
    },
    async passApply() {
      await applyAPI.applyPassed(this.applyId, this.resultReason);
      await this.getAllApplyInfo();
      await this.flushList();
      this.resultReason = "";
      this.dialogVisible = false;
    }
  },
  async created() {
    await this.getAllApplyInfo();
    await this.flushList();
  }
};
</script>

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
