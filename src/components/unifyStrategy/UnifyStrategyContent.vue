<template>
  <div id="unify-strategy-content" :class="[$store.state.collapsed ? 'unify-strategy-content1' : 'badge_style1']" :style="$store.state.collapsed ? 'margin: 0 10px;' : ''">
    <a-empty v-if="!data"/>
    <div v-html="data"></div>
  </div>
</template>

<script>
export default {
  name: "UnifyStrategyContent",
  props: {
    data: {type: String, default: ''},
  },
}
</script>

<style lang="less" scoped>
#unify-strategy-content {
  background-color: #ffffff;
  padding: 20px 40px;
}
.unify-strategy-content1 {
  padding: 20px !important;
}
/deep/ p {
  margin-bottom: 0 !important;
}
</style>
