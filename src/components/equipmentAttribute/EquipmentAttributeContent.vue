<template>
  <div id="equipment-attribute-content" :style="$store.state.collapsed ? 'margin: 0 10px;' : ''">
    <!-- 搜索框 -->
    <div class="label-search">
      <a-space direction="vertical">
        <a-input-search
          v-model:value="searchContentTemp"
          placeholder="请输入名称搜索"
          style="min-width: 100px; width: 100%"
          @search="onLabelSearch"
        />
      </a-space>
    </div>
    <a-empty v-if="data.length === 0"/>
    <div>
      <div class="tag">
        <div
          class="info-box"
          :class="[$store.state.collapsed ? 'badge_style2' : 'badge_style1']"
          v-for="item of data"
          :key="item.equipmentId"
        >
          <div class="title">{{ item.equipmentName }}</div>
          <div class="image-wrap" v-if="item.img">
            <div
              class="image-item"
              v-for="(data, dataIndex) in item.img.split(',')"
              :key="dataIndex"
            >
              <a-image :src="data"/>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LabelCreate from "@/components/label/LabelCreate";
import labelService from "@/service/labelService";
import { EllipsisOutlined } from '@ant-design/icons-vue';
export default {
  name: "EquipmentAttributeContent",

  components: {LabelCreate,EllipsisOutlined},

  props: {
    data: {type: Array, default: []},
    searchContent: {type: String, default: ''},
  },

  data() {
    return {
      searchContentTemp: this.searchContent,
      labelAddVisible: false,
      labelEditVisible: {},
    }
  },

  methods: {
    // 搜索
    onLabelSearch(value) {
      this.$emit("refresh", value)
    },

    // 关闭气泡框
    hideLabelVisibleFn(labelId) {
      this.labelAddVisible = false;
      // $set(this.labelEditVisible, labelId, false)
      this.labelEditVisible.labelId = false;
    },

    refresh() {
      this.$emit("refresh");
    },

    // 路由到标签文章页面
    routerLabelToArticle(labelId) {
      let routeData = this.$router.resolve("/label/" + labelId);
      window.open(routeData.href, '_blank');
    },

    updateLabelEditVisible() {
      const labelEditVisibleNew = {};
      this.data.forEach(value => {
        labelEditVisibleNew[value.id] = false
      });

      this.labelEditVisible = labelEditVisibleNew;
    },
  },

  mounted() {
    this.updateLabelEditVisible();
  },

  watch: {
    // data值改变时触发
    data: {
      handler(newVal, oldVal) {
        this.updateLabelEditVisible();
      }
    },
    // searchContent值改变时触发
    searchContent: {
      handler(newVal, oldVal) {
        this.searchContentTemp = newVal;
      }
    }
  }
}
</script>

<style lang="less" scoped>
#equipment-attribute-content .label-search {
  display: flex;
  justify-content: space-between;
  padding: 30px 0;
}

#equipment-attribute-content .tag {
  display: flex;
  flex-wrap: wrap;
}

#equipment-attribute-content .info-box {
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #fff;
  border-bottom: 20px solid #f0f2f5;
  .title {
    font-size: 20px;
    line-height: 40px;
    color: #333;
    padding-bottom: 10px;
    font-weight: bold;
  }
  .image-wrap {
    display: flex;
  }
}

.badge_style1{
  width:100%;
}
.badge_style2{
  width:100%;
}
.image-wrap {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
}
.image-item {
  width: 100%;
  height: auto;
}
/deep/ .ant-image {
  width: 100%;
  height: 100%;
}
/deep/ .ant-image-img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}
</style>
