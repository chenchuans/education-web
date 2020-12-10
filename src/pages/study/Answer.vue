<template>
    <div class="answer">
        <h3 class="answer-title">切片器的使用掌握了吗？我们来做个测试：请你使用切片器查看，广东的古典抱枕的销量是多少？</h3>
        <section class="answer-card">
            <p class="answer-card-name">输入销量（数字） ：</p>
            <div class="answer-card-content">
                <input type="text" class="answer-card-content-input"/>
                <span @click="submitAnswer" :class="['answer-card-content-button', submitText === '重新作答' ?'no-click' : '']">{{submitText}}</span>
            </div>
            <p v-if="submitText === '重新作答'" :class="['answer-card-tips', isErrorText ? 'error-text' : '']">输入销量错误！建议你根据课程内容，再同步操作一遍，相信你下一次一定能做对的</p>
            <div v-if="submitText === '重新作答'" class="answer-card-bottom">
                <ed-button class="answer-card-bottom-button" height="30px" @click="resetInput" type="dark">重新作答</ed-button>
                <span class="answer-card-bottom-span" @click="breakQuestion">点击跳过此题</span>
            </div>
        </section>
    </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { getCatalogDetail } from '@/api';
import url from '@/api/baseUrl.ts';
import EdButton from '@/components/button/Index.vue';
@Options({
    components: { EdButton },
    props: {
        answerItem: {
            type: Object,
            default: () => {}
        }
    },
    data () {
        return {
            answerValue: '',
            submitText: '提交答案',
            isErrorText: false
        };
    },
    created() {
        this.getInfo();
    },
    methods: {
        getInfo() {
            
        },
        submitAnswer() {
            // 提交答案
            this.submitText = '重新作答';
        },
        resetInput() {
            // 重新作答
            this.answerValue = '';
            this.submitText = '提交答案';
        },
        breakQuestion() {
            // 跳过此题
        }
    }
})
export default class Answer extends Vue {};
</script>
<style lang="scss" scoped>
@import '@/styles/variables.scss';
@import '@/styles/global.scss';
.answer {
    width: 100%;
    &-title {
        font-size: 18px;
        color: $formColor;
        position: relative;
        width: 100%;
    }
    &-title::before {
        content: '';
        width: 2px;
        height: 100%;
        position: absolute;
        left: -20px;
        top: 0;
        display: inline-block;
        background: $orangeFontColor;
    }
    &-card {
        width: 600px;
        margin: 20px 0;
        padding: 20px;
        box-sizing: border-box;
        border-radius: 5px;
        min-height: 100px;
        background: $orangeBackground;
        &-name {
            font: 400 16px/22px '';
            color: $tipsColor;
        }
        &-content {
            display: flex;
            justify-content: space-between;
            margin: 10px 0;
            &-input {
                box-sizing: border-box;
                width: 440px;
                height: 40px;
                background-color: transparent;
                border: 0;
                outline: none;
                color: $fontColor;
                font: 500 16px/40px '';
                text-indent: 10px;
                border-radius: 5px;
                -webkit-appearance: textfield;
                border: 1px solid $inputBorderColor;
            }
            &-button {
                width: 100px;
                height: 40px;
                background: #5DB756;
                color: #fff;
                text-align: center;
                font: 16px/40px '';
                border-radius: 4px;
                cursor: pointer;
            }
        }
        &-tips {
            font: 400 14px/20px '';
            color: #5DB756;
            margin-bottom: 10px;
        }
        &-bottom {
            display: flex;
            &-button {
                margin-right: 20px;
            }
            &-span {
                font: 16px/30px '';
                text-decoration: underline;
                cursor: pointer;
            }
        }
    }
    .error-text {
        color: $errorColor;
    }
    .no-click {
        background: rgba(222,222,222);
        cursor: not-allowed;
    }
}
</style>
