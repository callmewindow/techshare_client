<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span><b>{{ yourname }}</b>答题报告</span>
    </div>
    <div>
      <el-steps direction="vertical" :active="5">
        <el-step>
          <div slot="title">
            <span class="el-notification__title">林老生平与我看林老</span>
          </div>
          <div slot="description">
            <el-image
              style="width: 300px;height: 400px"
              :src="img1"
              :fit="fit"></el-image>
          </div>
        </el-step>
        <el-step style="margin-top: 30px">
          <div slot="title">
            <span class="el-notification__title">林氏法解算题目</span>
          </div>
          <div slot="description">
            <div class="el-notification__title" style="color: gray">
              林氏法简介：
            </div>
            <div class="el-notification__content">
              <p style="text-indent: 4ch">
                解算四阶以上的高阶代数方程已被严格证明不可能精确求根，只能用近似法逐次逼近，更无从像一、二、三、四阶代数方程一样用解析式表达。在计算机科学尚不发达的上世纪四十年代，手算满足精度的解是一件十分困难的事情。林士谔先后三次在MIT出版的学术期刊《数学物理》上发表了关于如何解算高阶方程式复根的论文，每次均有改进。林士谔提出，求实系数代数方程的复根时，找出其一个二次因子来求得方程的复根，之后不断重复修正，就可以达到要求精度的解。这种方法避免了复杂的复数运算，简化了计算过程，获得了当时国际数学界相当高的评价。在数字计算机广泛英勇的当今，我们可以借助许多工具，如MATLAB等，来对高阶代数方程求根，而编制这种程序所依据的原理正是林氏法，充分表明了在当今计算机时代林氏法的巨大生命力。
              </p>
            </div>
            <br />
            <div class="el-notification__title" style="color: gray">
              题目演算：<br />
              <el-image
                style="width: 300px;height: 240px"
                :src="img2"
                :fit="fit"></el-image>
            </div>
          </div>
        </el-step>
        <el-step style="margin-top: 30px">
          <div slot="title">
            <span class="el-notification__title">速热式电开水器原理与电路图</span>
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
                1. 胆中胆的结构。开水器内部有两个双模内胆。内胆上的进水口和出水口分别设于内胆的下部和上部的两端,内胆中的冷水充分与电热管接触，电热管可将进入小内胆内的冷水迅速加热，提高水的加热效率。速热式电开水器导管一端与出水口相连通，另一端伸向内胆腔内上部，热水管可将小内胆内的热水导向内胆腔上部，而内胆下部的冷水通过内胆下部的小孔进入另一个内胆，在电开水器内形成一个动态循环储系统，加快了水的热传递速度。
              </p>
              <p style="text-indent: 4ch">
                2. 双胆并行结构。双胆并行结构的速热式速电开水器，包括相互串联的两个立式内胆，两个内胆内分别设有加热管，处于上游的内胆设有一进水管，处于下游的内胆设有一出水管，出水管的入口位于内胆上部，两个内胆之间通过一联接管导通，联接管的入口位于上游内胆的底部，联接管的出口位于下游内胆的底部。在联接管上设有可控制加热管工作的温度传感器。当流经联接管的水的温度降到设定的温度时，联接管上的温度传感器控制上游内胆的加热管停止加热，而下游内胆的加热管以高功率工作。
              </p>
              <br />
              <p style="text-indent: 4ch">
                这样的双内胆结构有以下两点好处：
              </p>
              <p style="text-indent: 4ch">
                1. 加热速度快。每个内胆都配备有相同功率的加热管，实行交替加热，由于每个内胆容量很小，加热速度非常快，所以洗澡无人数限制，可满足人口多的家庭的洗澡需求。
              </p>
              <p style="text-indent: 4ch">
                2. 充分利用能源。由于采用竖立活塞式结构，内胆无热水死区，进水胆里的热水会全部被顶到出水胆中，确保内胆里的热水得到充分利用，热水产率得到大大提升，真正做到“用尽其热”。
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
            <span class="el-notification__title">二维码介绍</span>
          </div>
          <div slot="description">
            <div class="el-notification__title" style="color: gray">
              二维码简介：
            </div>
            <div class="el-notification__content">
              <p style="text-indent: 4ch">
                二维码（Quick Response Code, QR Code），是被人们广泛使用的一种编码方式。
              </p>
              <p style="text-indent: 4ch">
                简单来说，二维码其实是一种开放性的信息存储器。黑白小方块按照一定规律在平面分布，记录数据符号信息；再借助计算机的基础——二进制的概念，黑色与白色对应了1与0，所以可以用来表示数值信息。
              </p>
              <p style="text-indent: 4ch">
                它的工作原理和传统条形码是一样的，故存在一些共同特性：例如每种码制有特定的字符集；每个字符都占有一定的宽度；具有一定的校验功能等。同时还具有对不同行的信息自动识别功能、及处理图形旋转变化点。但由于二维码是二维图形，可以在水平和垂直两个方向存储信息，而条形码是一维图形，只能在水平方向存储信息，所以二维码能存储更多的信息。
              </p>
              <p style="text-indent: 4ch">
                二维码对识别器没有任何要求，任何设备只要带扫一扫的功能，都可以将它所存储的信息读取出来。我们在扫码的过程，其实就是翻译这些编码的过程——将黑块翻译成1，将白块翻译成0。我们注意到，二维码四角中的三个角通常都存在一个大方块，它们的作用是定位，保证我们在扫码时，不管手机怎样放置都能获取到正确的信息。我们扫到的内容可能表示一个网页、一个商品信息、一张个人名片等等，但网站、商品、名片的内容本身并不是存储在二维码中的，二维码相当于一个链接，帮助我们指到了正确的地方，而内容本身是存储在某个ip地址上的。
              </p>
              <br />
              <p style="text-indent: 4ch">
                关于视频存储在二维码上的问题，亦是同理：视频本身可以放在某个ip地址上，二维码存储这个ip地址的信息。当我们扫二维码时，跳转到了视频所在的ip地址上，我们就可以观看视频了。
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
        yourname:"赵梁煊",
        img1:"http://i1.fuimg.com/704995/3607f005b2c03bf7.jpg",
        img2:"http://i1.fuimg.com/704995/bbdbbec0e87f2a14.jpg",
        img3:"http://i2.tiimg.com/704904/27e9da5f5c090ac6.jpg",
        img4:"http://i1.fuimg.com/704995/19d3482d7a9d6db4.jpg",
        img42:"http://i1.fuimg.com/704995/7963472a2ac3bed5.jpg",
        img5:"http://i2.tiimg.com/704904/34f620682a1352d7.png",
      }
    },
    created() {
      UIAPI.updateTitleTo("赵梁煊的报告");
    }
  }
</script>
<style scoped>

</style>
