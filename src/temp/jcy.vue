<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span><b>{{ yourname }}</b>的报告</span>
    </div>
    <div>
      <el-steps direction="vertical" :active="5">
        <el-step>
          <div slot="title">
            <span class="el-notification__title">林老生平与我的观点</span>
          </div>
          <div slot="description">
            <el-image
              style="width: 300px;height: 420px"
              :src="img1"
              :fit="fit"></el-image>
          </div>
        </el-step>
        <el-step style="margin-top: 30px">
          <div slot="title">
            <span class="el-notification__title">林士谔法与题目解算</span>
          </div>
          <div slot="description">
            <div class="el-notification__title" style="color: gray">
              介绍：
            </div>
            <div class="el-notification__content">
              <p style="text-indent: 4ch">
                在当时计算机科学尚不发达的情况下，要解四阶以上的高阶代数方程，非常困难，林士谔利用求实系数代数方程的复根时，找出其一个二次因子来求得方程的复根，之后不断重复修正，直至达到要求精度为止。这种求实系数代数方程的复很方法，避免了复数运算。在1940年8月、1943年8月和1947年7月，林士谔先后在麻省理工学院出版的《数学及物理》杂志上接连发表了3篇关于解算高阶方程式复根方法的论文，获得了当时国际数学界相当高的评价。
              </p>
            </div>
            <br />
            <div class="el-notification__title" style="color: gray">
              题目演算：<br />
              <el-image
                style="width: 300px;height: 450px"
                :src="img2"
                :fit="fit"></el-image>
            </div>
          </div>
        </el-step>
        <el-step style="margin-top: 30px">
          <div slot="title">
            <span class="el-notification__title">热水器原理与电路</span>
          </div>
          <div slot="description">
            <div class="el-notification__title" style="color: gray">
              原理介绍：
            </div>
            <div class="el-notification__content">
              <p style="text-indent: 4ch">
                速热式电开水器是区别于储水式和即热式的一种独立品类的电开水器产品，介于两者之间或者是两者的结合体。采用速热引擎发热技术，使低功率快速出热水成为可能。
              </p>
              <p style="text-indent: 4ch">
                速热式电开水器是第三代电开水器，要理解速热式电开水器，首先要理解它的前辈们——储水式电开水器和即热式电开水器。第一代的储水式电开水器容量在40L-100L不等，有的甚至达到100L以上，采用低功率加热管，预热时间长，给用户带来诸多不便。第二代的即热式电开水器针对储水式电开水器低功率、长时间加热的缺点设计而成，利用高功率加热管，对流经加热杯的冷水进行快速加热；但由于采用了高功率加热，产品必须使用4平方毫米以上的专线才能安装使用，而且对进水温度要求也较高。
              </p>
              <p style="text-indent: 4ch">
                2005年，格林姆斯率先提出了“速热式电开水器”的产品概念，世界电开水器历史上第一台“速热式电开水器”就是由格林姆斯研发和生产的。第三代速热式电开水器不仅彻底摒弃了前辈们的功能缺陷，融合和提升了他们的优点，充分满足了用户在沐浴过程中的舒适度和满意度。速热式的体积小、容量小（20L以内）、安装条件低（普通家庭2.5平方线路即可安装）、出水量大、加热迅速、使用过程中不受天气影响，而且无使用人数的限制。
              </p>
              <br/>
              <p style="text-indent: 4ch">
                速热式电开水器大致有以下两种结构：
              </p>
              <p style="text-indent: 4ch">
                一，胆中胆的结构。开水器内部有两个双模内胆。内胆上的进水口和出水口分别设于内胆的下部和上部的两端,内胆中的冷水充分与电热管接触，电热管可将进入小内胆内的冷水迅速加热，提高水的加热效率。速热式电开水器导管一端与出水口相连通，另一端伸向内胆腔内上部，热水管可将小内胆内的热水导向内胆腔上部，而内胆下部的冷水通过内胆下部的小孔进入另一个内胆，在电开水器内形成一个动态循环储系统，加快了水的热传递速度。
              </p>
              <p style="text-indent: 4ch">
                二、双胆并行结构。双胆并行结构的速热式速电开水器，包括相互串联的两个立式内胆，两个内胆内分别设有加热管，处于上游的内胆设有一进水管，处于下游的内胆设有一出水管，出水管的入口位于内胆上部，两个内胆之间通过一联接管导通，联接管的入口位于上游内胆的底部，联接管的出口位于下游内胆的底部。在联接管上设有可控制加热管工作的温度传感器。当流经联接管的水的温度降到设定的温度时，联接管上的温度传感器控制上游内胆的加热管停止加热，而下游内胆的加热管以高功率工作。
              </p>
              <br />
              <p style="text-indent: 4ch">
                这样的双内胆结构有以下两点好处：
              </p>
              <p style="text-indent: 4ch">
                一、加热速度快。每个内胆都配备有相同功率的加热管，实行交替加热，由于每个内胆容量很小，加热速度非常快，所以洗澡无人数限制，可满足人口多的家庭的洗澡需求。
              </p>
              <p style="text-indent: 4ch">
                二、充分利用能源。由于采用竖立活塞式结构，内胆无热水死区，进水胆里的热水会全部被顶到出水胆中，确保内胆里的热水得到充分利用，热水产率得到大大提升，真正做到“用尽其热”。
              </p>
            </div>
            <br />
            <div class="el-notification__title" style="color: gray">
              电路图：<br />
            </div>
            <div class="el-notification__content">
              （图片来自网络）<br />
              <el-image
                style="width: 300px;height: 170px"
                :src="img4"
                :fit="fit"></el-image>
              <br />
              <el-image
                style="width: 300px;height: 150px"
                :src="img42"
                :fit="fit"></el-image>
            </div>
          </div>
        </el-step>
        <el-step style="margin-top: 30px">
          <div slot="title">
            <span class="el-notification__title">二维码</span>
          </div>
          <div slot="description">
            <div class="el-notification__title" style="color: gray">
              二维码简介：
            </div>
            <div class="el-notification__content">
              <p style="text-indent: 4ch">
                二维码又称二维条码，二维码全称为Quick Response Code，是前些年开始出现，最近已经被人们广泛使用的一种编码方式。在内容上，二维码比传统的的条形码能存储更多的信息，例如图片、网址、视频等等。
              </p>
              <p style="text-indent: 4ch">
                关于二维码的实现，在表面上：它通过将一些特殊的几何图形按照一定规律在平面分布组成黑白相间，且能记录数据符号信息的图形；在代码编制上：则是利用构成计算机内部逻辑基础比特流的概念，和几何图形结合后便可使用这种对应关系来表示文字数值信息。进而通过图像输入设备或光电扫描设备自动识读这个图片，便可可以实现信息的自动处理。
              </p>
              <p style="text-indent: 4ch">
                除此之外，它还具有条码技术的一些共性：例如每种码制有其特定的字符集；每个字符都占有一定的宽度；具有一定的校验功能等。同时还具有对不同行的信息自动识别功能、及处理图形旋转变化点。
              </p>
            </div>
            <br />
            <div class="el-notification__title" style="color: gray">
              在视频相关上：
            </div>
            <div class="el-notification__content">
              <p style="text-indent: 4ch">
                二维码的确能够存储视频，不过实际上也是通过将一整个视频放置于某个ip地址上，从而可通过这个二维码访问ip地址，然后获取到对应的视频。
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
        yourname:"姜春阳",
        img1:"http://i2.tiimg.com/705001/68928ede46e619e6.jpg",
        img2:"http://i2.tiimg.com/705001/edd6d32b34a2053f.jpg",
        img3:"http://i2.tiimg.com/704904/27e9da5f5c090ac6.jpg",
        img4:"http://i2.tiimg.com/705001/a1cc62d00ef364d6.png",
        img42:"http://i2.tiimg.com/705001/358bd08f5dbb1863.png",
        img5:"http://i2.tiimg.com/704904/a566e5cf4e96e5df.png",
      }
    },
    created() {
      UIAPI.updateTitleTo("姜春阳的报告");
    }
  }
</script>

<style scoped>

</style>
