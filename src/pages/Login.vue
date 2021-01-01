<template>
    <div class="login" style="">
        <section class="login-card">
            <h1 class="login-card-title">手机号登录</h1>
            <form class="login-card-form">
                <div class="login-card-form-item">
                    <input @blur="handlePhonefocus" class="login-card-form-item-input" type="text" v-model="userInfo.phone" placeholder="手机号"/>
                    <p v-show="isPhoneValidate" class="login-card-form-item-error">请输入正确的手机号</p>
                </div>
                 <div class="login-card-form-item login-card-form-code">
                    <input @blur="handleCodefocus" type="text" class="login-card-form-item-input" v-model="userInfo.code" placeholder="验证码"/>
                    <div :class="['code', { disabled: disabled}]" @click="handleCode">{{disabled ? disabledText : initText }}</div>
                    <p v-show="isCodeValidate" class="login-card-form-item-error">{{errorText}}</p>
                </div>
            </form>
            <ed-button @click="handleLogin" width="100%" height="46px" type="dark" class="login-card-button">登录</ed-button>
            <p v-show="isCodeError" class="login-card-error">{{errorText}}</p>
            <footer class="login-card-footer">
                <ul class="login-card-footer-list">
                    <img src="./../assets/img/wx-icon.png" class="login-card-footer-list-item"/>
                </ul>
                <p class="login-card-footer-tips">登录即表示同意
                    <span>《用户协议》</span> 和
                    <span>《隐私政策》</span>
                    </p>
            </footer>
        </section>
    </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import EdButton from '@/components/button/Index.vue';
import { isPhone, isPhoneCode } from '@/libs/validate.ts';
import { login, getCode } from '@/api';
import { setUsername, setUid, setToken } from '@/libs/session';

@Options({
    components: { EdButton },
    data() {
        return {
            userInfo: {
                phone: '',
                code: ''
            },
            timer: null,
            isPhoneValidate: false,
            isCodeValidate: false,
            isCodeError: false,
            disabled: false,
            loginDisabled: false,
            disabledText: '重新发送(60s)',
            initText: '获取验证码',
            errorText: '请输入正确的验证码'
        };
    },
    beforeUnmount() {
        clearInterval(this.timer);
    },
    methods: {
        handleLogin() {
            this.handlePhonefocus();
            this.handleCodefocus();
            this.isCodeError = false;
            const { isPhoneValidate, isCodeValidate }  = this;
            if (isPhoneValidate || isCodeValidate) {
                return;
            }
            const { phone, code } = this.userInfo;
            login({userName: phone, verificationCode: code}).then((res: any) => {
                if (res.code === 200) {
                    const { token, id, userName } = res.data;
                    setUsername(userName);
                    setUid(id);
                    setToken(token);
                    this.$toast('登录成功');
                    this.$router.replace('/home');
                } else if (res.code === 201) {
                    this.errorText = res.message;
                }
            });

        },
        handleCode() {
            if (!this.disabled) {
                this.handlePhonefocus();
                const { isPhoneValidate, isCodeValidate }  = this;
                if (isPhoneValidate || isCodeValidate) {
                    return;
                }
                this.handleCountdown();
                getCode({userName: this.userInfo.phone}).then((res: any) => {
                    if (res.code === 200) {
                        this.$toast('验证码发送成功');
                    }
                });
            }
        },
        handleCountdown() {
            let count = 60;
            this.timer = setInterval(() => {
                this.disabled = true;
                if (--count > 0) {
                    this.disabledText = `重新发送(${count}s)`;
                } else {
                    this.disabled = false;
                    this.initText = '重新发送';
                    clearInterval(this.timer);
                }
            }, 1000);
        },
        handlePhonefocus() {
            this.isPhoneValidate = !isPhone(this.userInfo.phone);
        },
        handleCodefocus() {
            this.isCodeValidate = !isPhoneCode(this.userInfo.code);
        }
    }
})

export default class Login extends Vue {};
</script>
<style lang="scss" scoped>
@import '@/styles/variables.scss';
@import '@/styles/global.scss';
.login {
    background-color: #FFF0CB;
    width: 100vw;
    height: 100vh;
    position: relative;
    overflow: hidden;
    &-card {
        box-sizing: border-box;
        width: 420px;
        min-height: 400px;
        padding: 30px 40px;
        margin: 100px auto 0;
        background: $white;
        border-radius: 8px;
        box-shadow: 0 0 14px 2px $shadowColor;
        &-form {
            padding-top: 20px;
            &-item {
                margin-bottom: 10px;
                &-input {
                    box-sizing: border-box;
                    width: 100%;
                    height: 50px;
                    background-color: transparent;
                    border: 0;
                    outline: none;
                    color: $formColor;
                    font: 500 18px/50px '';
                    -webkit-appearance: textfield;
                    border-bottom: 1px solid $inputBorderColor;
                }
                &-error {
                    color: $errorColor;
                    margin-top: 10px;
                    font: 400 14px/1 '';
                    word-break: keep-all;
                    white-space: nowrap;
                }
            }
            &-code {
                position: relative;
                .code {
                    position: absolute;
                    right: 0px;
                    top: 10px;
                    color: $orangeFontColor;
                    font: 400 16px/2 '';
                    text-align: right;
                    width: 160px;
                    height: 32px;
                    border: none;
                    padding: 0;
                    cursor: pointer;
                }
                .disabled {
                    cursor: not-allowed;
                    color: $tipsColor;
                }
            }
        }
        &-button {
            font: 500 18px/46px '';
            margin: 20px 0;
        }
        &-error {
            color: $errorColor;
            margin-bottom: 20px;
            text-align: center;
            font: 400 14px/1 '';
            word-break: keep-all;
            white-space: nowrap;
        }
        &-footer {
            &-list {
                display: flex;
                justify-content: center;
                height: 40px;
                &-item {
                    height: 40px;
                    width: 40px;
                    border-radius: 50%;
                    cursor: pointer;
                }
            }
            &-tips {
                padding-top: 23px;
                text-align: center;
                font: 400 12px/1 '';
                color: $tipsColor;
                span {
                    cursor: pointer;
                }
            }
        }
    }
}
::-webkit-input-placeholder { /* WebKit browsers */
  color: #999;
  font-size: 16px;
  font-weight: 400;
}
</style>
<style>
    body {
        margin: 0 !important;
        width: 100vw;
        height: 100vh;
    }
</style>
