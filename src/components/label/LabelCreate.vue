<template>
  <a-form :model="form" ref="form" :rules="rules" :label-col="{ span: 5 }" :wrapper-col="{ span: 17 }" @submit="handleSubmit">
    <!-- 添加标签 -->
    <a-form-item :label="$t('common.labelName')"  name="labelName">
      <a-input
      v-model:value="form.labelName"
               :placeholder="$t('common.pleaseLabel')"/>
    </a-form-item>
    <!-- 文章封面 -->
    <a-form-item :label="$t('common.labelLogo')" style="height:120px">
      <ImageUpload
          ref="child"
          :labelLogo="labelLogo"
          @labelLogoFn="labelLogoFn"/>
    </a-form-item>
    <a-divider style="margin: 10px 0;"></a-divider>
    <a-form-item class="form-item-submit">
      <a-button type="primary" html-type="submit" @click="handleSubmit">{{ $t('common.sureAndAdd') }}</a-button>
    </a-form-item>
  </a-form>
</template>

<script>
  import labelService from "@/service/labelService";
  import ImageUpload from "@/components/label/ImageUpload";

  export default {
    components: {ImageUpload},

    props: {
      // 标签id
      labelId: {type: Number, default: 0},
      // 标签名称
      labelName: {type: String, default: ''},
      // 标签logo
      labelLogoInit: {type: String, default: null},
    },

    data() {
      return {
        // 标签logo
        labelLogo: this.labelLogoInit,
        form: {},
        // 表单验证
        // validatorRules: {
        //   label: {
        //     // 检验规则
        //     rules: [
        //       // 是否必须填写
        //       {required: true, message: this.$t('common.pleaseLabel')}
        //     ]
        //   }
        // },
        rules: {
          labelName: [{ required: true, message: this.$t('common.pleaseLabel') }],
        },
      }
    },

    methods: {
      handleSubmit(e) {
        e.preventDefault();

        this.$refs.form.validateFields().then(values => {
          const data = {
            "logo": this.labelLogo,
            "labelName": this.form.labelName
          };
          if (this.labelLogo) {
            // 更新
            if (this.labelId) {
              data.id = this.labelId;
              this.labelUpdate(data);
              // 新增
            } else {
              this.labelCreate(data);
            }
          } else {
            this.$message.warning('请上传标签Logo');
          }
        });
      },

      // 新增标签
      labelCreate(data) {
        labelService.labelCreate(data)
            .then(res => {
              // 清空表单
              this.$refs.form.resetFields();
              // 清空logo
              this.$refs.child.clearFileList();
              // 隐藏气泡框
              this.$emit("hideLabelVisibleFn");
              this.refresh();
            })
            .catch(err => {
              this.$message.error(err.msg);
            });
      },

      // 更新标签
      labelUpdate(data) {
        labelService.labelUpdate(data)
            .then(res => {
              this.$emit("hideLabelVisibleFn", data.id);
              this.refresh();
            })
            .catch(err => {
              this.$message.error(err.msg);
            });
      },

      labelLogoFn(logo) {
        this.labelLogo = logo;
      },

      refresh() {
        this.$emit("refresh");
      },
    },

    mounted() {
      // v-mode和v-decorator冲突问题解决方案
      this.form = {
        labelName: this.labelName,
      }
    }

  }
</script>

<style scoped>
  /* 提交按钮样式 */
  .form-item-submit {
    display: flex;
    text-align: right;
    justify-content: right;
    margin-bottom: 0;
  }
</style>
