<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span><b>{{ yourname }}</b>“士谔星云”评选必答题</span>
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
            <br />
            <el-image
              style="width: 300px;height: 420px"
              :src="img12"
              :fit="fit"></el-image>
            <br />
            <el-image
              style="width: 300px;height: 420px"
              :src="img13"
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
                林士谔法是林士谔教授在其博士论文中创造性提出的高阶方程劈因解根法。当时的计算机科学尚不发达，求解高阶代数方程非常困难，林士谔教授通过不断修正的方式计算得到精度满足要求的多项式方程二次因子，进而可以得到方程的复根。这样的方法避免的复杂的复数运算，且计算步骤相对简单，特别是结合现代计算机，可以高效求得高阶方程的复根。这一发明也获得了当时国际社会数学界极高的评价。
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
            <span class="el-notification__title">速热式电热水器原理与电路</span>
          </div>
          <div slot="description">
            <div class="el-notification__title" style="color: gray">
              发热原理：
            </div>
            <div class="el-notification__content">
              <p style="text-indent: 4ch">
                速热式电热水器体积比储水式电热水器小，更加安全，特别是隔电方面性能更加优越；其对于电压和电线的要求也没有即热式电热水器那么高，用2.5平方毫米的常规电线即可满足供电需求。
              </p>
              <p style="text-indent: 4ch">
                首先，速热式电热水器采用了胆中胆结构，通过两个双模内胆使得冷水充分与电热管接触，从而提高加热效率。
              </p>
              <p style="text-indent: 4ch">
                其次，速热式电热水器还采用了双胆并行的结构。通过双胆并行加热，且上游内胆处设置温度传感器的方式，控制整个电热水器加热和保温状态的自动切换
                最后，速热式电热水器也应用了立式双胆活塞式加热的方式。两个立式内胆内的加热管交替加热，由于内胆容积很小，加热速度非常快，基本可以满足无人数限制且即开即用。而且这样的加热方式也使得内胆中没有热水死区，也就是说内胆内所有的热水都会被充分使用，从而使得热水的利用率大幅提升，进而也提升了整个热水器的工作效率。
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
            </div>
          </div>
        </el-step>
        <el-step style="margin-top: 30px">
          <div slot="title">
            <span class="el-notification__title">关于二维码</span>
          </div>
          <div slot="description">
            <div class="el-notification__title" style="color: gray">
              二维码简介：
            </div>
            <div class="el-notification__content">
              <p style="text-indent: 4ch">
                二维码，又称二维条码，全称为Quick Response Code，是前些年开始出现，最近已经被人们广泛使用的一种编码方式。在内容上，二维码比传统的条形码能存储更多的信息，例如图片、网址、视频……
              </p>
              <p style="text-indent: 4ch">
                关于二维码的实现，表面上，它通过将一些特殊的几何图形按照一定规律在平面分布组成黑白相间，且能记录数据符号信息的图形；而在代码编制上，则是利用构成计算机内部逻辑基础比特流的概念，和几何图形结合后便可使用这种对应关系来表示文字数值信息。进而通过图像输入设备或光电扫描设备自动识读这个图片，便可以实现信息的自动处理。
              </p>
              <p style="text-indent: 4ch">
                除此之外，它还具有条码技术的一些共性。例如每种码制有其特定的字符集，每个字符都占有一定的宽度，具有一定的校验功能等。同时还具有对不同行的信息自动识别功能、及处理图形旋转变化点。
              </p>
            </div>
            <br />
            <div class="el-notification__title" style="color: gray">
              关于视频：
            </div>
            <div class="el-notification__content">
              <p style="text-indent: 4ch">
                二维码的确能够存储视频，不过实际上也是通过将一整个视频放置于某个IP地址上，从而可通过这个二维码访问IP地址，然后获取到对应的视频。
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
        yourname:"士谔书院学生会文艺部",
        img1:"http://i1.fuimg.com/705038/ba8fe4247a7b8d96.jpg",
        img12:"http://i1.fuimg.com/705038/ad2fbb62afdedacb.jpg",
        img13:"http://i1.fuimg.com/705038/9faf149cae836f4b.jpg",
        img2:"http://i1.fuimg.com/705038/e5d2c21b460e4191.jpg",
        img3:"http://i2.tiimg.com/704904/27e9da5f5c090ac6.jpg",
        img4:"http://i1.fuimg.com/705038/2dbd8b6744c29299.png",
        img42:"http://i2.tiimg.com/705001/358bd08f5dbb1863.png",
        img5:"http://i2.tiimg.com/704904/b369c0ccf75db0f0.png",
      }
    },
    created() {
      UIAPI.updateTitleTo("文艺部的报告");
    }
  }
</script>
<style scoped>

</style>
