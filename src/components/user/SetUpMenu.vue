<template>
  <div id="setup-menu">
    <a-menu
        style="width: 256px"
        v-model:selectedKeys="defaultSelectedKeys"
        :mode="$store.state.collapsed ? 'horizontal' : 'inline'"
        @click="handleClick"
    >
      <a-menu-item key="profile">
        <!-- <a-icon type="user" /> -->
        <UserOutlined />
        <span>{{ $t('common.personalInformation') }}</span>
      </a-menu-item>
<!--      <a-menu-item key="account">-->
<!--        &lt;!&ndash; <a-icon type="setting" /> &ndash;&gt;-->
<!--        <SettingOutlined />-->
<!--        <span>{{ $t('common.accountSettings') }}</span>-->
<!--      </a-menu-item>-->
    </a-menu>
  </div>
</template>
<script>
  import { UserOutlined,SettingOutlined } from '@ant-design/icons-vue';
  export default {
    name: "SetUpMenu",

    data() {
      return {
        defaultSelectedKeys: [],
      }
    },
    components: {
      UserOutlined,
      SettingOutlined,
    },
    methods: {
      handleClick(e) {
        if (e.key === 'profile') {
          this.routerSetUpToProfile();
        }
        if (e.key === 'account') {
          this.routerSetUpToAccount();
        }
      },

      // 路由到设置页面(个人资料)
      routerSetUpToProfile() {
        this.$router.push("/settings/profile");
      },

      // 路由到设置页面(账号设置)
      routerSetUpToAccount() {
        this.$router.push("/settings/account");
      },
    },

    mounted() {
      this.defaultSelectedKeys.push(this.$route.name);
    },

    watch: {
      // 监听,当路由发生变化的时候执行
      $route: {
        handler(newVal, oldVal) {
          console.log("newVal", newVal);
          this.defaultSelectedKeys.pop();
          this.defaultSelectedKeys.push(newVal.name);
        }
      }
    },
  };
</script>

<style scoped>

</style>