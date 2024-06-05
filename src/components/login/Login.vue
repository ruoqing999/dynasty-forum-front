<template>
  <div>
    <a-modal v-model:visible="$store.state.loginVisible" @ok="handleOk" :footer="null" :width="'320px'">
      <a-form id="login-form-content"
              :model="ruleForm"
              class="login-form"
              @submit="handleSubmit"
              ref="form"
              :rules="rules"
      >
        <h1 class="title">{{ $t("common.accountPasswordLogin") }}</h1>
        <a-form-item name="name">
          <a-input
            :placeholder="$t('common.username')" size="large" v-model:value="ruleForm.name">
            <!-- <a-icon slot="prefix" type="user" style="color: rgba(0,0,0,.25)"/> -->
            <template #prefix>
              <UserOutlined style="color: rgba(0,0,0,.25)" />
            </template>
          </a-input>
        </a-form-item>
        <a-form-item name="password">
          <a-input
            type="password" :placeholder="$t('common.password')" size="large" v-model:value="ruleForm.password">
            <!-- <a-icon slot="prefix" type="lock" style="color: rgba(0,0,0,.25)"/> -->
            <template #prefix>
              <LockOutlined style="color: rgba(0,0,0,.25)" />
            </template>
          </a-input>
        </a-form-item>
        <a-form-item>
          <a-checkbox v-decorator="[ 'remember', { valuePropName: 'checked', initialValue: true, }, ]"
                      v-model:checked="ruleForm.remember">
            {{ $t("common.rememberMe") }}
          </a-checkbox>
<!--          <A class="login-form-forgot" @click="mobileResetPassword">-->
<!--            {{ $t("common.forgotPassword") }}-->
<!--          </A>-->
          <a-button type="primary" html-type="submit" class="login-form-button" size="large">
            {{ $t("common.login") }}
          </a-button>
          <a class="qq-login" href="#" @click='qqLogin'><img src="../../assets/img/qqLogin.png" alt=""></a>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script>
import loginService from "@/service/loginService";
import thirdLoginService from "@/service/ThirdLoginService";
import { UserOutlined, LockOutlined } from "@ant-design/icons-vue";

export default {
  beforeCreate() {
  },
  data() {
    return {
      ruleForm: {
        name: "",
        password: "",
        remember: true
      },
      rules: {
        name: [{ required: true, message: this.$t("common.pleaseInputYourUsername") }],
        password: [{ required: true, message: this.$t("common.pleaseInputYourPassword") }]
      }
    };
  },
  components: {
    UserOutlined,
    LockOutlined
  },
  methods: {
    // 隐藏登录框
    handleOk() {
      this.$store.state.loginVisible = false;
    },

    async handleSubmit(e) {
      this.$message.error("请使用qq快捷登录");
      // e.preventDefault();
      //
      // try {
      //   await this.$refs.form.validate();
      // } catch (error) {
      //   console.log("error", error);
      // }
      // loginService.login(this.ruleForm)
      //   .then(res => {
      //     // 刷新当前页面
      //     this.$router.go(0);
      //   })
      //   .catch(err => {
      //     this.$message.error(err.msg);
      //   });
    },

    qqLogin() {
      thirdLoginService.qqLogin()
        .then(res => {

          this.$store.state.setToken(res.data)
          this.$router.go(0);

          // if (res.code === 200) {
          //   //获得窗口的垂直位置
          //   const iTop = (window.screen.availHeight - 30 - 600) / 2;
          //   //获得窗口的水平位置
          //   const iLeft = (window.screen.availWidth - 10 - 600) / 2;
          //   window.open(res.data, "_blank", "height=600, width=600, top=" + iTop + ", left=" + iLeft + ", toolbar=no, menubar=no, scrollbars=no, resizable=no, location=no, status=no")
          //   addEventListener('message', e => {
          //     if (e.origin === 'https://wcby.ruoqing.club') {
          //       this.$store.state.setToken(e.data)
          //       this.$router.go(0);
          //     }
          //   })
          // }
        })
        .catch(err => {
          console.log("error", err);
          this.$message.error(err.msg);
        });
    },

    register() {
      this.$store.state.loginVisible = false;
      this.$store.state.registerVisible = true;
    },

    mobileResetPassword() {
      this.$store.state.loginVisible = false;
      this.$store.state.mobileResetPasswordVisible = true;
    }

  }
};
</script>

<style>

.qq-login {
  margin-left: 110px;
}

#login-form-content .title {
  font-size: 20px;
  font-weight: bold;
  padding-bottom: 15px;
}

#login-form-content .ant-input-affix-wrapper .ant-input {
  font-size: 14px;
}

#login-form-content .login-form-forgot {
  float: right;
}

#login-form-content .login-form-button {
  width: 100%;
}

#login-form-content .ant-form-item {
  margin-bottom: 10px;
  line-height: 40px;
}
</style>