<template>
  <div>
    <a-modal v-model:visible="$store.state.mobileResetPasswordVisible" @ok="handleOk" :footer="null" :width="'320px'">
      <a-form ref="ruleForm" :model="ruleForm" :rules="rules" v-bind="layout" id="mobileResetPassword-form-content">
        <h1 class="title">{{ $t("common.mobileResetPassword") }}</h1>
        <a-form-item has-feedback name="phone">
          <a-input v-model:value="ruleForm.phone"
                   :placeholder="$t('common.phone')"
                   size="large">
            <!-- <a-icon slot="prefix" type="phone" style="color: rgba(0,0,0,.25)"/> -->
            <template #prefix>
              <PhoneOutlined style="color: rgba(0,0,0,.25)"/>
            </template>
          </a-input>
        </a-form-item>
        <a-form-item name="code">
          <a-input-search v-model:value="ruleForm.code" :placeholder="$t('common.validateCode')" size="large" @search="onSearch">
            <template #enterButton>
              <a-button slot="enterButton">
                {{ $t('common.getValidateCode') }}
              </a-button>
            </template>
            <template #prefix>
              <SafetyCertificateOutlined style="color: rgba(0,0,0,.25)"/>
            </template>
            <!-- <a-icon slot="prefix" type="safety-certificate" style="color: rgba(0,0,0,.25)"/> -->
          </a-input-search>
        </a-form-item>
        <a-form-item has-feedback name="newPassword">
          <a-input v-model:value="ruleForm.newPassword" type="password"
                   :placeholder="$t('common.newPassword')" size="large">
            <template #prefix>
              <LockOutlined style="color: rgba(0,0,0,.25)"/>
            </template>
            <!-- <a-icon slot="prefix" type="lock" style="color: rgba(0,0,0,.25)"/> -->
          </a-input>
        </a-form-item>
        <a-form-item style="padding-top: 5px;">
          <a-button type="primary" html-type="submit" class="login-form-button" size="large" @click="submitForm('ruleForm')">
            {{ $t("common.saveChanges") }}
          </a-button>
          <a @click="emailResetPassword">
            {{ $t("common.emailResetPassword") }}
          </a>
          <a @click="login" style="float: right;">
            {{ $t("common.loginNow") }}
          </a>
        </a-form-item>
      </a-form>

    </a-modal>
  </div>
</template>

<script>
  import userService from "@/service/userService";
  import { LockOutlined,SafetyCertificateOutlined,PhoneOutlined } from '@ant-design/icons-vue';

  export default {
    data() {
      // 验证手机号
      let validatePhone = async (rule, value, callback) => {
        if (value === '') {
          // callback(new Error(this.$t('common.pleaseInputYourPhone')));
          return Promise.reject(this.$t('common.pleaseInputYourPhone'));
        } else {
          if (!this.phoneReg.test(value)) {
            // callback(this.$t("common.phoneInvalid"));
            return Promise.reject(this.$t('common.phoneInvalid'));
          } else {
            callback();
            return Promise.resolve();
          }
        }
      };

      // 验证验证码
      let validateCode = async (rule, value, callback) => {
        if (value === '') {
          // callback(new Error(this.$t('common.needVerifyCode')));
          return Promise.reject(this.$t('common.needVerifyCode'));
        } else {
          callback();
          return Promise.resolve();
        }
      };

      // 验证密码
      let validateNewPassword = async (rule, value, callback) => {
        if (value === '') {
          // callback(new Error(this.$t('common.pleaseInputYourNewPassword')));
          return Promise.reject(this.$t('common.pleaseInputYourNewPassword'));
        } else {
          // callback();
          return Promise.resolve();
        }
      };

      return {
        phoneReg: /^((13[0-9])|(15[^4,\D])|(14[57])|(17[0])|(17[7])|(18[0,0-9]))\d{8}$/,
        ruleForm: {
          phone: '',
          code: '',
          newPassword: '',
        },
        rules: {
          phone: [{validator: validatePhone, trigger: 'change'}],
          code: [{validator: validateCode, trigger: 'change'}],
          newPassword: [{validator: validateNewPassword, trigger: 'change'}],
        },
        layout: {
          labelCol: {span: 0},
          wrapperCol: {span: 24},
        },
      };
    },
    components: {
      LockOutlined,
      SafetyCertificateOutlined,
      PhoneOutlined,
    },
    methods: {
      onSearch(value) {
        if (this.phoneReg.test(this.ruleForm.phone)) {
          this.isPhoneExist(this.ruleForm.phone);
        } else {
          this.$message.warning(this.$t("common.phoneInvalid"));
        }
      },

      // 判断手机是否已经绑定
      isPhoneExist(phone) {
        return userService.isPhoneExist(phone)
            .then((res) => {
              if (res.data) {
                // 发送验证码
                this.sendSmsVerifyCode(phone);
              } else {
                this.$message.warning(this.$t("common.mobileNumberNotBound"));
              }
            })
            .catch(err => {
              this.$message.error(err.msg);
            });
      },

      // 发送验证码
      sendSmsVerifyCode(phone) {
        userService.sendSmsVerifyCode({ phone: phone })
            .then(() => {
              this.$message.success(this.$t("common.verifyCodeSendSuccessed"));
            })
            .catch(err => {
              this.$message.error(err.msg);
            });
      },

      // 隐藏登录框
      handleOk() {
        this.$store.state.mobileResetPasswordVisible = false;
      },

      submitForm(formName) {
        console.log("form", this.$refs[formName]);
        this.$refs[formName].validate().then(valid => {
          if (valid) {
            userService.phoneResetPassword({phone:this.ruleForm.phone, code: this.ruleForm.code, newPassword: this.ruleForm.newPassword})
                .then(res => {
                  if (res.data) {
                    // 密码重置成功，请重新登录
                    this.$message.success(this.$t("common.pleaseLoginAgain"));
                    this.login();
                  } else {
                    this.$message.warning(err.msg);
                  }
                })
                .catch(err => {
                  this.$message.error(err.msg);
                });
          } else {
            return false;
          }
        });
      },

      // 邮箱重置密码
      emailResetPassword() {
        this.$store.state.emailResetPasswordVisible = true;
        this.$store.state.mobileResetPasswordVisible = false;
        this.$store.state.loginVisible = false;
      },

      // 直接登录
      login() {
        this.$store.state.emailResetPasswordVisible = false;
        this.$store.state.mobileResetPasswordVisible = false;
        this.$store.state.loginVisible = true;
      },
    },

  }
</script>

<style>
  #mobileResetPassword-form-content .title {
    font-size: 20px;
    font-weight: bold;
    padding-bottom: 15px;
  }

  #mobileResetPassword-form-content .ant-input-affix-wrapper .ant-input {
    font-size: 14px;
  }

  #mobileResetPassword-form-content .login-form-forgot {
    float: right;
  }

  #mobileResetPassword-form-content .login-form-button {
    width: 100%;
  }

  #mobileResetPassword-form-content .ant-form-item {
    margin-bottom: 10px;
  }
</style>