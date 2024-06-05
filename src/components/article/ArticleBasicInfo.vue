<template>
  <div id="article-basic-info">
    <a-form :model="form" ref="form" :rules="rules" :label-col="{ span: 5 }" :wrapper-col="{ span: 17 }">
      <!-- 添加标签 -->
      <a-form-item :label="$t('common.addLabel')" name="categoryId">
        <a-select mode="multiple"
                  v-model:value="form.categoryId"
                  :placeholder="$t('common.selectLabel')"
                  @change="handleSelectChange">
          <a-select-option v-for="item of listData" :key="item.categoryId">
            {{ item.categoryName }}
          </a-select-option>
        </a-select>
      </a-form-item>
      <!-- 文章封面 -->
      <a-form-item :label="$t('common.articleCover')">
        <UploadImage
          :articleTitleMap="articleTitleMap"
          @titleMap="titleMap" />
      </a-form-item>
      <a-divider style="margin: 10px 0;"></a-divider>
      <a-form-item class="form-item-submit">
        <a-button type="primary" @click="handleSubmit">
          {{ $route.params.id ? $t("common.sureAndUpdate") : $t("common.sureAndRelease") }}
        </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
import labelService from "@/service/labelService";
import articleService from "@/service/articleService";
import categoryService from "@/service/categoryService";
import UploadImage from "@/components/article/UploadImage";
import postService from "@/service/postService";

export default {
  components: { UploadImage },

  props: {
    // 文章创建者
    articleUser: { type: Number, default: 0 },
    // 文章标签
    articleLabel: { type: Array, default: [] },
    // 题图
    articleTitleMap: { type: String, default: "" },
    // 文章标题
    articleTitle: { type: String, default: "" },
    // 文章内容
    markdownCode: { type: String, default: "" },
    htmlCode: { type: String, default: "" }
  },

  data() {
    return {
      // 题图
      articleFile: null,
      // 标签
      listData: [],
      params: { currentPage: 1, pageSize: 10 },
      form: {},
      // 表单验证
      // validatorRules: {
      //   label: {
      //     // 检验规则
      //     rules: [
      //         // 是否必须填写
      //         { required: true, message: this.$t('common.selectLabel') }
      //     ]
      //   }
      // },
      rules: {
        categoryId: [{ required: true, message: this.$t("common.selectLabel") }]
      }
    };
  },

  methods: {
    handleSubmit(e) {
      e.preventDefault();

      if (this.articleTitle.length === 0) {
        this.$message.warning("标题不能为空");
        return;
      }

      if (this.htmlCode.length === 0 || this.markdownCode.length === 0) {
        this.$message.warning("内容不能为空");
        return;
      }

      // 校验图片大小（不能超过5M）
      if (this.articleFile !== null && this.articleFile.size > 5 * 1024 * 1024) {
        this.$message.warning(this.$t("common.avatarSizeTip"));
        return;
      }

      this.$refs.form.validateFields().then(values => {
        // Do something with value
        const data = new FormData();
        data.append("file", this.articleFile);
        data.append("postTitle", this.articleTitle);
        data.append("rawContent", this.markdownCode);
        data.append("postContent", this.htmlCode);
        data.append("categoryIds", this.form.categoryId);
        // 地址栏有值（更新文章）才调用
        let articleId = this.$route.params.id;
        if (articleId) {
          data.append("postId", articleId);
        }
        this.post(data);
      });
    },

    handleSelectChange(value) {
      if (value.length > 3) {
        this.$message.warning("最多只能添加3个标签");
        value.splice(-1);
      }
    },

    getLabelList(params) {
      categoryService.getCategoryList(params)
        .then(res => {
          this.listData = res.data;
        })
        .catch(err => {
          this.$message.error(err.msg);
        });
    },

    post(data) {
      postService.post(data)
        .then(res => {
          this.$router.push("/user/" + this.$store.state.userId + "/article");
        })
        .catch(err => {
          console.log("post-err", err)
          this.$message.error(err.msg);
        });
    },

    titleMap(file) {
      this.articleFile = file;
    }
  },

  mounted() {
    this.getLabelList();
    // v-mode和v-decorator冲突问题解决方案
    // this.form.setFieldsValue({
    //   lableId: this.articleLabel,
    // })

    this.form = {
      categoryId: this.articleLabel
    };
  }
};
</script>

<style>
/* 提交按钮样式 */
#article-basic-info .form-item-submit {
  display: flex;
  text-align: right;
  justify-content: right;
  margin-bottom: 0;
}
</style>