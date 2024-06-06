<template>
  <a-layout id="label-index">
    <IndexHeader class="header"/>
    <a-layout-content>
      <main class="content">
        <UnifyStrategyContent
          v-if="finish"
          :data="data"
        />
      </main>
    </a-layout-content>
    <FooterButtons v-if="!$store.state.collapsed"/>
  </a-layout>
</template>

<script>
import IndexHeader from "@/components/index/head/IndexHeader";
import FooterButtons from "@/components/utils/FooterButtons";
import CustomEmpty from "@/components/utils/CustomEmpty";
import UnifyStrategyContent from "@/components/unifyStrategy/UnifyStrategyContent.vue";
import unifyStrategy from "@/service/unifyStrategy";

export default {
  components: {IndexHeader, UnifyStrategyContent, FooterButtons, CustomEmpty},
  data() {
    return {
      data: '',
      finish: false
    };
  },

  methods: {
    // 一统攻略
    getTips() {
      if (this.finish) return
      unifyStrategy.getTips()
        .then(res => {
          console.log(res);
          this.finish = true
          this.data = res.data.tipsContent
        })
        .catch(err => {
          console.log("err",err)
        });
    },
  },

  mounted() {
    this.getTips(this.params);
  },

};
</script>


<style>
#label-index .header {
  position: fixed;
  z-index: 999;
  width: 100%;
  background: #fff;
  border-bottom: 1px solid #00000021;
}

#label-index .content {
  margin-top: 64px;
  width: 900px;
}

#label-index .ant-layout-header, .ant-layout-content {
  display: flex;
  align-items: center;
  justify-content: center;
}

#label-index .ant-layout-header {
  background: #fff;
  height: auto;
  line-height: 2.3;
}

.index-drawer-wrap .ant-drawer-content-wrapper {
  width: 250px !important;
}

#components-layout-demo-custom-trigger .trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}

#components-layout-demo-custom-trigger .trigger:hover {
  color: #1890ff;
}

#components-layout-demo-custom-trigger .logo {
  height: 64px;
  background: rgba(255, 255, 255, 0.2);
  margin: 0;
}
</style>
