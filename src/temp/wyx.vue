<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span><b>{{ yourname }}</b>和<b>权益部</b>的士谔志士报告</span>
    </div>
    <div>
      <el-steps direction="vertical" :active="5" finish-status="finish">
        <el-step>
          <div slot="title">
            <span class="el-notification__title">林老生平与我的观点</span>
          </div>
          <div slot="description">
            <el-image
              style="width: 300px;height: 350px"
              :src="img1"
              :fit="fit"></el-image>
            <br />
            <el-image
              style="width: 300px;height: 100px"
              :src="img12"
              :fit="fit"></el-image>
          </div>
        </el-step>
        <el-step style="margin-top: 30px">
          <div slot="title">
            <span class="el-notification__title">林士谔法与题目解算</span>
          </div>
          <div slot="description">
            <div class="el-notification__title" style="color: gray">
              林士谔法介绍：
            </div>
            <div class="el-notification__content">
              <p style="text-indent: 4ch">
                林士谔法，又称为劈因子法
              </p>
              <p style="text-indent: 4ch">
                是在当时计算机科学尚不发达的情况下，求解四阶以上的高阶代数方程非常困难。于是林老提出了这样的一个方法：求实系数代数方程的复根时，首先找出其一个二次因子来求得方程的复根，之后不断重复修正，直至达到要求精度为止。
              </p>
              <p style="text-indent: 4ch">
                这种求实系数代数方程的方法很巧妙的避免了复数运算，不过还是有一个程序比较复杂的缺点。后来在1940年8月、1943年8月和1947年7月，林士谔先后在麻省理工学院出版的《数学及物理》杂志上接连发表了3篇关于解算高阶方程式复根方法的论文，均获得了当时国际数学界相当高的评价。
              </p>
            </div>
            <br />
            <div class="el-notification__title" style="color: gray">
              题目演算：<br />
              <el-image
                style="width: 300px;height: 360px"
                :src="img2"
                :fit="fit"></el-image>
            </div>
          </div>
        </el-step>
        <el-step style="margin-top: 30px">
          <div slot="title">
            <span class="el-notification__title">速热式电热水器原理与电路</span>
          </div>
          <div slot="description">
            <div class="el-notification__title" style="color: gray">
              原理介绍：
            </div>
            <div class="el-notification__content">
              <p style="text-indent: 4ch">
                这部分就来介绍下速热式电开水器的发热原理
              </p>
              <p style="text-indent: 4ch">
                <b>核心原理：</b>
              </p>
              <p style="text-indent: 4ch">
                采用速热引擎发热技术，使低功率快速出热水成为可能。
              </p>
              <p style="text-indent: 4ch">
                <b>具体实现：</b>
              </p>
              <p style="text-indent: 4ch">
                作为第三代电开水器，他不仅彻底摒弃了前辈们的功能缺陷，还融合和提升了他们的优点。例如第一代由于低功率导致的加热时间过长，第二代由于高功率而必须配置好专线和进水温度。
              </p>
              <p style="text-indent: 4ch">
                <b>两种内部组成结构：</b>
              </p>
              <div style="text-indent: 4ch">
               <p>一，胆中胆</p>
                <p>开水器内部安装有两个双模内胆：内胆的进水口和出水口分别设于下部和上部的两端,从而可以保证冷水与电热管充分接触，直接在内胆加热，提高加热效率。</p>
                <p>速热式电开水器也是基于这个结构，将导管一端与出水口相连通，另一端伸向内胆腔内上部，从而热水管将小内胆内的热水导向内胆腔上部，下部的冷水则通过下部的小孔进入另一个内胆，在内部形成一个动态循环储系统，存储温度，也加快了热传递的速度。</p>
                <br />
                <p>二、双胆并行</p>
                <p>并行的是相互串联的两个立式内胆，内部分别设有加热管，位于上游的内胆设有一进水管，下游的内胆设有一出水管，两个内胆之间通过联接管导通，联接管入口位于上游内胆的底部，出口位于下游内胆的底部。</p>
                <p>并且在联接管上设有可控制加热管工作的温度传感器。当流经其中水的温度过低时，管上的温度传感器便会控制上游内胆的加热管停止加热，而下游内胆的加热管以高功率工作，从而在节能的同时保证加热的速度。</p>
                <br />
                <p>双胆并行的好处：</p>
                <p>1.加热速度快。由于每个内胆都配备有相同功率的加热管，能够实行交替加热，且内胆容量小，也不会太过浪费。</p>
                <p>2.充分利用能源。由于采用了竖立活塞式结构，可以保证内胆内无热水死区，确保内胆里的热水得到充分利用。</p>
              </div>
            </div>
            <br />
            <div class="el-notification__title" style="color: gray">
              双胆并行结构电路图：<br />
            </div>
            <div class="el-notification__content">
              （图片来自网络）<br />
              <el-image
                style="width: 300px;height: 130px"
                :src="img4"
                :fit="fit"></el-image>
            </div>
          </div>
        </el-step>
        <el-step style="margin-top: 30px">
          <div slot="title">
            <span class="el-notification__title">二维码有关</span>
          </div>
          <div slot="description">
            <div class="el-notification__title" style="color: gray">
              二维码简介：
            </div>
            <div class="el-notification__content">
              <p style="text-indent: 4ch">
                二维码，又称为二维条码（二维的条形码），它全称为Quick Response Code，是早些年开始出现，现在经过磨砺，已经被人们广泛使用了。在内容的储存上，二维码的优势很大，能存储比传统的的条形码更多的信息，例如图片、网址、视频等等均可。
              </p>
            </div>
            <br />
            <div class="el-notification__title" style="color: gray">
              二维码的实现：
            </div>
            <div class="el-notification__content">
              <p style="text-indent: 4ch">
                表面上看来：它其实就是几何图形的拼接，通过将一些特殊的几何图形按照一定规律在平面分布组成黑白相间，且能记录数据符号信息的图形。
              </p>
              <p style="text-indent: 4ch">
                而在代码编制上：它其实是利用了计算机内部逻辑基础中比特流的概念，通过和几何图形结合，利用这种对应关系来表示各类文字数值的信息。进而只需要利用图像输入设备或光电扫描设备获取图片并识读内容，便可获取到二维码代表的真正信息。
              </p>
              <p style="text-indent: 4ch">
                除此之外，它还有条码技术的一些共性：有其特定的字符集；每个字符都占有一定的宽度；有一定的校验功能，有对不同行的信息自动识别功能、及处理图形旋转变化点。
              </p>
            </div>
            <br />
            <div class="el-notification__title" style="color: gray">
              二维码与视频：
            </div>
            <div class="el-notification__content">
              <p style="text-indent: 4ch">
                通过简介可知，二维码的确能存储视频信息，不过存储的实际，也只是将一整个视频上传到了某个ip地址上，进而通过这个二维码便可访问ip地址，就相当于是访问视频了。
              </p>
            </div>
            <br />
            <div class="el-notification__title" style="color: gray">
              本页面二维码：<br />
              <el-image
                style="width: 100px;height: 100px"
                :src="img5"
                :fit="fit"></el-image>
            </div>
          </div>
        </el-step>

        <el-step icon="el-icon-end"></el-step>

      </el-steps>
    </div>
  </el-card>
</template>

<script>
  import * as UIAPI from '../APIs/ui'
  export default {
    name: "Introduction",
    data() {
      return {
        yourname:"王宇轩",
        img1:"http://i2.tiimg.com/704904/5f9da17d6f1a4d01.jpg",
        img12:"http://i2.tiimg.com/704904/8218cb782007d203.jpg",
        img2:"http://i1.fuimg.com/704904/aa5997635a0f746c.jpg",
        img4:"http://i2.tiimg.com/704904/817274467cac1c44.png",
        img5:"http://i2.tiimg.com/704904/c946b1d0e57b225e.png",
      }
    },
    created() {
      UIAPI.updateTitleTo("王宇轩和权益部的报告");
    }
  }
</script>

<style scoped>

</style>
