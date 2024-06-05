<template>
  <div id="left-buttons">
    <!-- 点赞 -->
    <div class="like-div">
      <a-badge class="badge" :count="data.approves" :overflow-count="999" :number-style="data.like ? {
        backgroundColor: $store.state.themeColor,
        boxShadow: '0 0 0 1px ' + $store.state.themeColor+ ' inset',
      } : {
        backgroundColor: '#c2c8d1',
        boxShadow: '0 0 0 1px #c2c8d1 inset',
      }">
        <div @click="likeAction" class="like-icon-container" style="background: #fff;">
          <i class="iconfont icon-like"
             :style="data.like ? 'color:' + $store.state.themeColor : 'color: #8a919f;'"></i>
        </div>
      </a-badge>
    </div>

    <!-- 评论 -->
    <div class="comment-div">
      <a-badge class="badge" :count="data.comments" :overflow-count="999" :number-style="{
        backgroundColor: '#c2c8d1',
        boxShadow: '0 0 0 1px #c2c8d1 inset',
      }">
        <a href="#article-comment-all">
          <div class="comment-icon-container" style="background: #fff;">
            <i class="iconfont icon-comment" style="color: #8a919f;"></i>
          </div>
        </a>
      </a-badge>
    </div>

  </div>
</template>

<script>

import postService from "@/service/postService";
import userPostService from "@/service/userPostService";

export default {

  data() {
    return {
      data: {},
    }
  },

  methods: {
    // 获取文章一些统计数据
    getPostCount() {
      console.log("userId", this.$store.state.userId)
      postService.getPostCount({postId: this.$route.params.id, userId: this.$store.state.userId})
          .then((res) => {
            this.data = res.data;
            this.$emit("articleCommentCountFn", res.data.comments);
          })
          .catch(err => {
            // this.$message.error(err.msg);
          });
    },

    // 点赞/取消点赞
    likeAction() {
      userPostService.userPost({postId: this.$route.params.id, type: 2})
          .then(() => {
            this.getPostCount();
          })
          .catch(err => {
            this.$message.error(err.msg);
          });
    },
  },

  mounted() {
    this.getPostCount();
  }
};
</script>

<style lang="less">
#left-buttons {
  position: fixed;
  z-index: 888;

  .like-icon-container {
    border-radius: 50%;
    width: 45px;
    height: 45px;
    text-align: center;
    cursor: pointer;

    i {
      font-size: 20px;
      line-height: 45px;
    }
  }

  .comment-div {
    margin-top: 20px;
  }

  .comment-icon-container {
    border-radius: 50%;
    width: 45px;
    height: 45px;
    text-align: center;
    cursor: pointer;

    i {
      line-height: 45px;
      font-size: 20px;
    }
  }
}
</style>
