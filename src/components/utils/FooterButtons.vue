<template>
  <div class="footer-buttons">
    <BackTop/>
  </div>
</template>

<script>
import BackTop from "@/components/utils/BackTop";

export default {
  components: {BackTop},
  methods: {
    // 点击底部按钮跳转到创建反馈的页面
    createFeedback() {
      if (this.$store.state.isLogin) {
        window.open(this.$store.state.manageDomain + '/createFeedback', '_blank');
      } else {
        this.$store.state.loginVisible = true;
      }
    },

    // 点击底部按钮跳转到闲聊页面
    routerChat() {
      window.open('http://chat.nanshengbbs.top', '_blank');
    },

    // 点击底部按钮跳转到源码页面
    routerGithub() {
      window.open('https://github.com/maliangnansheng/bbs-springboot', '_blank');
    },

    // 点击底部按钮跳转到源码页面
    routerGitee() {
      window.open('https://gitee.com/maliangnansheng/bbs-springboot', '_blank');
    }
  }
};
</script>

<style lang="less">
.footer-buttons {
  position: fixed;
  bottom: 3.6rem;
  right: 6.6rem;
  z-index: 888;

  .feedback-icon-container, .github-icon-container, .chat-icon-container, .gitee-icon-container {
    border-radius: 50%;
    width: 34px;
    height: 34px;
    text-align: center;
    cursor: pointer;

    i {
      line-height: 34px;
      color: white;
    }
  }

  .chat-icon-container, .github-icon-container, .gitee-icon-container {
    margin-top: 10px;
  }
}
</style>
