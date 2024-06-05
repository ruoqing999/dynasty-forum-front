<template>
  <a-layout>
    <a-layout id="about-index">
      <IndexHeader class="header"/>
      <a-layout-content>
        <main class="about_content" :style="$store.state.collapsed ? 'width: 100%;' : 'width: 800px;'">
          <div style="background: #fff; margin-bottom: 10px">
            <section class="mission">
              <div class="inner">
<!--                <div class="mission-content">-->
<!--                  <div class="title">项目说明</div>-->
<!--                  <div class="sub">项目前端借鉴于开源项目&#45;&#45;南生论坛，后端由ben，个人程序人生的点滴记录和时光储备。淡泊明志，宁静致远。珍惜原创，矢志不渝。</div>-->
<!--                </div>-->
                <div class="vision-content">
                  <div class="title">项目说明</div>
                  <div class="sub">
                    王朝霸域论坛由作者利用空闲时间搭建，前端项目借鉴于南生论坛，在此鸣谢！！！<br>
                    作者断断续续出坑进坑游戏接近10年，因为对游戏的热爱，怀念，因此开发了该论坛。<br>
                    希望大家多多支持🌹🌹🌹<br>
                  </div>
                </div>
                <div class="author-content">
                  <div class="title">作者</div>
                  <div class="sub">假痴不癫（三十六计）</div>
                  <div class="sub">投稿/想法 请联系：vx(zbp490) </div>
                </div>
<!--                <div class="code-content">-->
<!--                  <div class="title">源码地址</div>-->
<!--                  <div class="sub">后端源码(GitHub)：<a target="_blank"-->
<!--                                                   href="https://github.com/maliangnansheng/bbs-springboot">bbs-springboot</a>-->
<!--                  </div>-->
<!--                  <div class="sub">前端源码(GitHub)：<a target="_blank" href="https://github.com/maliangnansheng/bbs-vue-ui">bbs-vue-ui</a>-->
<!--                  </div>-->
<!--                  <div class="sub">后端源码(Gitee)：<a target="_blank"-->
<!--                                                  href="https://gitee.com/maliangnansheng/bbs-springboot">bbs-springboot</a>-->
<!--                  </div>-->
<!--                  <div class="sub">前端源码(Gitee)：<a target="_blank" href="https://gitee.com/maliangnansheng/bbs-vue-ui">bbs-vue-ui</a>-->
<!--                  </div>-->
<!--                </div>-->
<!--                <div class="code-content">-->
<!--                  <div class="title">学习路线</div>-->
<!--                  <div class="sub">-->
<!--                    <a target="_blank" href="https://bbs.nanshengbbs.top/detail/158">Java学习路线</a>-->
<!--                    <br>-->
<!--                    <a target="_blank" href="https://bbs.nanshengbbs.top/detail/159">前端学习路线</a>-->
<!--                  </div>-->
<!--                </div>-->
<!--                <div class="code-content">-->
<!--                  <div class="title">信息统一整理</div>-->
<!--                  <div class="sub">-->
<!--                    设计文档(论文)：-->
<!--                    <a target="_blank"-->
<!--                       href="https://76.nanshengbbs.top/doc/%E5%8D%97%E7%94%9F%E8%AE%BA%E5%9D%9B%E7%9A%84%E8%AE%BE%E8%AE%A1%E4%B8%8E%E5%AE%9E%E7%8E%B0.doc">南生论坛设计文档</a>-->
<!--                  </div>-->
<!--                  <div class="sub">-->
<!--                    日常迭代：-->
<!--                    <a target="_blank" href="https://bbs.nanshengbbs.top/detail/122">南生论坛日常迭代</a>-->
<!--                  </div>-->
<!--                  <div class="sub" style="color: #cb2222">-->
<!--                    【商用】需看：-->
<!--                    <a target="_blank" href="https://bbs.nanshengbbs.top/detail/171">南生运营的理念</a>-->
<!--                  </div>-->
<!--                  <div class="sub">-->
<!--                    安装部署教程：-->
<!--                    <br>-->
<!--                    <a target="_blank" href="https://bbs.nanshengbbs.top/detail/44">【后端】安装部署教程</a>-->
<!--                    <br>-->
<!--                    <a target="_blank" href="https://bbs.nanshengbbs.top/detail/45">【前端】安装部署教程</a>-->
<!--                  </div>-->
<!--                  <div class="sub">-->
<!--                    视频教程：-->
<!--                    <br>-->
<!--                    <a target="_blank"-->
<!--                       href="https://www.bilibili.com/video/BV1pK411C7T4/?spm_id_from=333.999.0.0&vd_source=d0a5d07985a7fbbfb889c874632343c6">南生论坛代码讲解视频</a>-->
<!--                    <br>-->
<!--                    <a target="_blank"-->
<!--                       href="https://www.bilibili.com/video/BV1he4y1C7rk/?spm_id_from=333.999.0.0&vd_source=d0a5d07985a7fbbfb889c874632343c6">南生论坛使用指南视频</a>-->
<!--                  </div>-->
<!--                  <div class="sub">-->
<!--                    南生闲聊：-->
<!--                    <br>-->
<!--                    <a target="_blank" href="https://76.nanshengbbs.top/jar/chat/ns-chat.zip">南生闲聊项目源码</a>-->
<!--                    <br>-->
<!--                    <a target="_blank" href="https://bbs.nanshengbbs.top/detail/71">南生闲聊教程</a>-->
<!--                  </div>-->
<!--                </div>-->
              </div>
            </section>
          </div>
        </main>
      </a-layout-content>
      <FooterButtons v-if="!$store.state.collapsed"/>
    </a-layout>
  </a-layout>
</template>

<script>
import IndexHeader from "@/components/index/head/IndexHeader";
import FooterButtons from "@/components/utils/FooterButtons";

export default {
  name: "About",

  components: {IndexHeader, FooterButtons},

  mounted() {
    // 滚动条恢复初始位置的方法
    this.$nextTick(() => {
      let dom = document.querySelector('#app');
      if (dom !== null) {
        dom.scrollTop = 0;
      }
    })
  }
};
</script>


<style lang="less">
#about-index {
  .header {
    position: fixed;
    width: 100%;
    z-index: 999;
    background: #fff;
    border-bottom: 1px solid #00000021;
  }

  .about_content {
    margin-top: 64px;
  }

  .ant-layout-header, .ant-layout-content {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .ant-layout-header {
    background: #fff;
    height: auto;
    line-height: 2.3;
  }

  .mission {
    padding: 30px 30px;
    box-sizing: border-box;

    .title {
      font-size: 32px;
      font-weight: bold;
    }

    .sub {
      margin: 10px 0;
      font-size: 16px;
      color: #999;
    }
  }
}

</style>
