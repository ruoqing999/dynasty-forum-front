<template>
  <div id="main-article-content">
    <a-list item-layout="vertical" size="large" :data-source="tempData">
      <template #renderItem="{ item, index }">
        <a-list-item slot="renderItem" key="item.title" slot-scope="item, index" style="cursor: pointer;"
                     @click="routerArticleDetail(item.postId)">
          <template #actions>
            <!-- 浏览量/点赞/评论 -->
            <div v-for="(type,cindex) in actions" slot="actions" :key="cindex">
            <span class="collectLikeComment" :key="type">
                  <span v-if="type.type==='eye'">
                      <!-- <a-icon :type="type" style="margin-right: 6px;"/> -->
                      <EyeOutlined style="margin-right: 6px;" />
                      <span v-text="item.views"></span>
                  </span>
                  <span v-if="type.type==='like-o'" @click.stop="pageViewsLikeComment(type, item.postId, index)">
                      <span v-if="item.like" :style="{color: $store.state.themeColor}">
                          <!-- <a-icon :type="type" style="margin-right: 6px"/> -->
                          <LikeOutlined style="margin-right: 6px" />
                          <span v-text="item.approves"></span>
                      </span>
                      <span v-if="!item.like">
                          <!-- <a-icon :type="type" style="margin-right: 8px"/> -->
                          <LikeOutlined style="margin-right: 8px" />
                          <span v-text="item.approves"></span>
                      </span>
                  </span>
                  <span v-if="type.type==='message'" @click.stop="routerArticleDetailToComment(item.postId)">
                      <!-- <a-icon :type="type" style="margin-right: 6px;"/> -->
                      <MessageOutlined style="margin-right: 6px;" />
                      <span v-text="item.comments"></span>
                  </span>
                  <span
                    v-if="(($store.state.isManage && isAdminAudit) || $store.state.userId === item.userId) && type.type==='ellipsis'"
                    @click.stop>
                    <a-dropdown :placement="'bottomCenter'" :trigger="['click']">
                      <template #overlay>
                        <a-menu>
                          <!-- 审核通过 -->
<!--                          <a-menu-item key="articlePass"-->
<!--                                       v-if="($store.state.isManage && isAdminAudit) && (item.state === -1 || item.state !== 1)"-->
<!--                                       @click="updateState(item.id, item.state, 1)">-->
<!--                            {{ " " + $t("common.pass") }}-->
<!--                          </a-menu-item>-->
                          <!-- 审核拒绝 -->
<!--                          <a-menu-item key="articleReject"-->
<!--                                       v-if="($store.state.isManage && isAdminAudit) && (item.state === -1 || item.state !== 0)"-->
<!--                                       @click="updateState(item.id, item.state, 0)">-->
<!--                            <span style="color: red">{{ " " + $t("common.reject") }}</span>-->
<!--                          </a-menu-item>-->
                          <!-- 文章置顶 -->
                          <a-menu-item key="articleNotTop" v-if="$store.state.userId === 1 && isAdminAudit && !item.top"
                                       @click="articleTop(item.postId)">
                            <span style="color: #1869ff">{{ " " + $t("common.isTop") }}</span>
                          </a-menu-item>
                          <!-- 文章取消置顶 -->
                          <a-menu-item key="articleTop" v-if="$store.state.userId === 1 && isAdminAudit && item.top"
                                       @click="articleNotTop(item.postId)">
                            <span style="color: #eb2f96">{{ " " + $t("common.isNotTop") }}</span>
                          </a-menu-item>
                          <!-- 文章编辑 -->
                          <a-menu-item key="articleEdit" v-if="$store.state.userId === item.userId"
                                       @click="routerArticleEdit(item.postId)">
                            <span style="color: #722ed1">{{ " " + $t("common.edit") }}</span>
                          </a-menu-item>
                          <!-- 文章删除 -->
                          <a-menu-item key="articleDel" v-if="$store.state.userId === item.userId"
                                       @click="articleDelete(item.postId, index)">
                            <span style="color: red">{{ " " + $t("common.delete") }}</span>
                          </a-menu-item>
                        </a-menu>
                      </template>
                      <div class="options">
                      <!-- <a-icon :type="type"/> -->
                      <EllipsisOutlined />
                      </div>
                    </a-dropdown>
                  </span>
              </span>
            </div>
          </template>
          <!--           标签/题图-->
          <template #extra>
            <div slot="extra" class="label-titleMap">
              <div slot="title">
                <a v-for="(category, index) in item.categoryVOS" :key="item.categoryName" style="float: right"
                   @click.stop="routerLabelToArticle(category.categoryId)">
                  <span class="label-name">{{ category.categoryName }}</span>
                  <a-divider v-if="index !== 0" type="vertical" />
                </a>
              </div>
              <div>
                <img style="padding-top: 10px" :width="$store.state.collapsed ? 80 : 150" alt="logo" v-if="item.postImg"
                     :src="item.postImg" />
              </div>
            </div>
          </template>
          <!--           用户/标题-->
          <a-list-item-meta :description="item.postTitle">
            <template #title>
              <a slot="title" class="username" @click.stop="routerUserCenter(item.userId)">
                <div class="left">
                  <span slot="title" style="padding-right: 2px;"> {{ item.nickName + " " }} </span>
                  <img :src="require('@/assets/img/level/' + item.level + '.svg')" alt="" @click.stop="routerBook" />
                  <small style="color: #b5b9b9; padding-left: 10px" v-text="$utils.showtime(item.createTime)"></small>
                  <!-- 用户中心 -->
                  <div v-if="isUserCenter && ($store.state.userId === userId || $store.state.isManage)">
                    <small style="color: #faad14; padding-left: 10px" v-if="item.state === -1">{{
                        $t("common.pendingReview")
                      }}</small>
                    <small style="color: red; padding-left: 10px" v-if="item.state === 0">{{
                        $t("common.auditReviewRejected")
                      }}</small>
                    <small style="color: #3eaf7c; padding-left: 10px" v-if="item.state === 1">{{
                        $t("common.auditApproved")
                      }}</small>
                  </div>
                </div>
                <!-- 置顶图标 -->
                <a-tooltip placement="left">
                  <template #title>
                    {{ $t("common.top") }}
                  </template>
                  <a-icon type="fire" :style="{color: $store.state.themeColor}" v-if="item.top" />
                  <FireOutlined :style="{color: $store.state.themeColor}" v-if="item.top" />
                  <a-icon type="thunderbolt" :style="{color: $store.state.themeColor}" v-if="item.top" />
                  <!--                                <i class="iconfont icon-right-triangle" :style="{color: $store.state.themeColor}" v-if="item.top"></i>-->
                </a-tooltip>
              </a>
            </template>
            <template #avatar>
              <a-avatar slot="avatar" :src="item.avatar ? item.avatar : require('@/assets/img/default_avatar.png')"
                        @click.stop="routerUserCenter(item.userId)" />
            </template>
          </a-list-item-meta>
          <div class="article-content">
            {{ item.content }}
          </div>
        </a-list-item>
      </template>

    </a-list>
    <div style="text-align: center; padding-bottom: 20px;" v-if="!hasNext && finish">
      <a-divider />
      {{ $t("common.noAgain") }}
    </div>
  </div>
</template>
<script>
import userService from "@/service/userService";
import articleService from "@/service/articleService";
import postService from "@/service/postService";
import { EyeOutlined, LikeOutlined, MessageOutlined, EllipsisOutlined, FireOutlined } from "@ant-design/icons-vue";
import userPostService from "@/service/userPostService";
import { Modal } from "ant-design-vue";
import { nextTick } from "vue";

export default {
  props: {
    data: { type: Array, default: [] },
    pageSize: { type: Number, default: 0 },
    current: { type: Number, default: 1 },
    finish: { type: Boolean, default: false },
    hasNext: { type: Boolean, default: false },
    isUserCenter: { type: Boolean, default: false },
    userId: { type: Number, default: 0 },
    isAdminAudit: { type: Boolean, default: false }
  },
  data() {
    return {
      tempData: this.data,
      actions: [
        { type: "eye", text: "156" },
        { type: "like-o", text: "156" },
        { type: "message", text: "2" },
        { type: "ellipsis", text: "12" }
      ]
    };
  },
  components: {
    EyeOutlined, LikeOutlined, MessageOutlined, EllipsisOutlined, FireOutlined
  },
  methods: {
    // 浏览点赞评论按钮的点击操作
    pageViewsLikeComment(type, articleId, index) {
      console.log("type", type, articleId);
      // 浏览量
      if (type.type === "eye") {
        console.log("浏览量");
      }
      // 点赞
      if (type.type === "like-o") {
        userPostService.userPost({ postId: articleId, type: 2 })
          .then(() => {
            // this.$emit("refresh");
            let isLike = this.tempData[index].like;
            // 取消点赞操作
            if (isLike) {
              this.tempData[index].approves--;
            } else {
              this.tempData[index].approves++;
            }
            this.tempData[index].like = !isLike;
          })
          .catch(err => {
            this.$message.error(err.msg);
          });
      }
      // 评论
      if (type.type === "message") {
        console.log("评论");
      }
    },

    // 修改文章审批状态
    updateState(articleId, state, toState) {
      this.$confirm({
        centered: true,
        title: this.$t("common.confirmReject"),
        onOk: () => {
          articleService.updateState({ id: articleId, state: toState })
            .then(() => {
              this.tempData = this.tempData.filter(article => article.id !== articleId);
              this.$emit("updateData", this.tempData);
              this.$message.success(this.$t("common.approvalSuccessed"));
            })
            .catch(err => {
              this.$message.error(err.msg);
            });
        }
      });
    },

    // 文章置顶
    articleTop(articleId) {
      this.$confirm({
        centered: true,
        title: this.$t("common.confirmTop"),
        onOk: () => {
          const data = {
            postId: articleId,
            top: 1
          };
          postService.put(data)
            .then(() => {
              this.$emit("articleTopCallBack");
              this.$message.success(this.$t("common.topSuccessed"));
            })
            .catch(err => {
              this.$message.error(err.msg);
            });
        }
      });
    },

    // 文章取消置顶
    articleNotTop(articleId) {
      this.$confirm({
        centered: true,
        title: this.$t("common.confirmNotTop"),
        onOk: () => {
          const data = {
            postId: articleId,
            top: 0
          };
          postService.put(data)
            .then(() => {
              this.$emit("articleTopCallBack");
              this.$message.success(this.$t("common.notTopSuccessed"));
            })
            .catch(err => {
              this.$message.error(err.msg);
            });
        }
      });
    },

    // 删除
    articleDelete(articleId, index) {
      this.$confirm({
        centered: true,
        title: this.$t("common.deleteArticleTitle"),
        onOk: async () => {
          await postService.del({ postId: articleId })
            .then(() => {
              this.tempData = this.tempData.filter(article => article.postId !== articleId);
            })
            .catch(err => {
              this.$message.error(err.msg);
            });
        }
      });
    },

    // 路由到文章详情页面
    routerArticleDetail(articleId) {
      let routeData = this.$router.resolve("/detail/" + articleId);
      window.open(routeData.href, "_blank");
    },

    // 路由到文章详情页面（评论处）
    routerArticleDetailToComment(articleId) {
      let routeData = this.$router.resolve("/detail/" + articleId + "#article-comment-all");
      window.open(routeData.href, "_blank");
    },

    // 路由到用户中心页面
    routerUserCenter(userId) {
      let routeData = this.$router.resolve("/user/" + userId);
      window.open(routeData.href, "_blank");
    },

    // 路由到标签文章页面
    routerLabelToArticle(labelId) {
      let routeData = this.$router.resolve("/label/" + labelId);
      window.open(routeData.href, "_blank");
    },

    // 路由到Book说明页面
    routerBook() {
      let routeData = this.$router.resolve("/book");
      window.open(routeData.href, "_blank");
    },

    // 路由到文章编辑页面
    routerArticleEdit(articleId) {
      this.$router.push("/edit/" + articleId);
    }
  },

  mounted() {
  },

  watch: {
    // data值改变时触发
    data: {
      handler(newVal, oldVal) {
        this.tempData = newVal;
      }
    }
  }

};
</script>

<style lang="less">
// 浏览量、点赞、评论取消竖杠
#main-article-content em.ant-list-item-action-split {
  display: none;
}

#main-article-content .ant-list-vertical .ant-list-item-action > li:first-child {
  padding-left: 0;
}

#main-article-content .ant-list-vertical .ant-list-item-action > li {
  padding: 0 12px;
}

#main-article-content .label-titleMap {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;
}

#main-article-content .label-name {
  color: #8a919f;
}

#main-article-content .label-name:hover {
  color: #13c2c2;
}

#main-article-content .username {
  display: flex;
  justify-content: space-between;

  .left {
    display: flex;
    align-items: baseline;
  }
}

#main-article-content .ant-list-item-meta-description {
  font-weight: 700;
  font-size: 16px;
  color: #1d2129;
  line-height: 22px;
}

#main-article-content .ant-list-item-meta-description, .article-content {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
}

#main-article-content .collectLikeComment:hover {
  color: #13c2c2;
}

#main-article-content li.ant-list-item {
  padding: 20px;
  // 防止文章内容过长导致的显示异常
  .ant-list-item-main {
    // 随意设置一个比较小的值即可
    width: 50%;
  }
}

#main-article-content li.ant-list-item:hover {
  background: #f4f5f57a;
}

// 文章题图样式调整
#main-article-content .ant-list-item-extra img {
  max-height: 113px;
  max-width: 150px;
  width: auto;
}

@media screen and (max-width: 576px) {
  .ant-list-vertical .ant-list-item-extra {
    margin: 0 auto 16px;
  }
}
</style>
