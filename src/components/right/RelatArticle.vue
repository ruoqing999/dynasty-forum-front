<template>
  <div id="relat-article" v-if="data.length !== 0">
    <header class="article-block-header">
      <i class="iconfont icon-relat-article" :style="{ color: $store.state.themeColor}"></i>
      {{ $t("common.relatArtilce") }}
    </header>
    <a-divider style="margin: 10px 0 0 0;"/>
    <a-list item-layout="horizontal" :data-source="data" :split="false">
      <template #renderItem="{ item, index }">
        <a-list-item slot="renderItem" slot-scope="item, index" @click="routerArticleDetail(item.postId)">
          <a-list-item-meta
              :description="item.approves + ' ' + $t('common.like') +
              ' · ' + item.comments + ' ' + $t('common.comment')">
            <template #title>
              <span slot="title">{{ item.postTitle }}</span>
            </template>
          </a-list-item-meta>
        </a-list-item>
      </template>
    </a-list>
  </div>
</template>

<script>
import articleService from "@/service/articleService";
import postService from "@/service/postService";

export default {
  props: {
    labelIds: {type: Array, default: []},
  },

  data() {
    return {
      data: [],
      params: {pageNum: 1, pageSize: 4},
      finish: false,
    };
  },

  methods: {
    // 获取相关文章列表信息
    getRelatArticleList(params) {
      this.finish = false;
      params.labelIds = this.labelIds.join(',');
      postService.pagePost(params)
          .then(res => {
            this.data = res.data.list;
            this.finish = true;
          })
          .catch(err => {
            this.finish = true;
            this.$message.error(err.msg);
          });
    },

    // 路由到文章详情页面
    routerArticleDetail(articleId) {
      let routeData = this.$router.resolve("/detail/" + articleId);
      window.open(routeData.href, '_blank');
    },
  },

  mounted() {
    this.getRelatArticleList(this.params);
  },

};
</script>

<style scoped>
#relat-article {
  padding-bottom: 10px;
}

#relat-article .article-block-header {
  padding: 15px 10px 0 15px;
}

#relat-article .ant-list-item {
  padding: 12px 0 6px 0;
}

#relat-article .ant-list-item-meta {
  display: flex;
  align-items: center;
  padding: 0 15px;
}

#relat-article .ant-list-item-meta-title > a, .ant-list-item-meta-description {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
}

#relat-article .ant-list-item-meta-title {
  line-height: 22px;
  font-size: 14px;
  font-weight: 400;
  color: #252933;
}

#relat-article .ant-list-item-meta-description {
  font-size: 12px;
  color: #909090;
  line-height: 22px;
}

#relat-article .ant-list-item, .full-list {
  cursor: pointer;
}

#relat-article .ant-list-item:hover {
  background: #8b87870a;
}

#relat-article .full-list:hover {
  background: #8b87870a;
}
</style>
