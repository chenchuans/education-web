<template>
    <div class="answer">
        <h3 class="answer-title">{{answerItem.content}}</h3>
        <section class="answer-card">
            <p class="answer-card-name">输入答案 ：</p>
            <div class="answer-card-content">
                <input v-model="answerValue" type="text" class="answer-card-content-input"/>
                <span @click="submitAnswer" :class="['answer-card-content-button', submitStatus ?'no-click' : '']">提交答案</span>
            </div>
            <p v-if="submitStatus" :class="['answer-card-tips', isErrorText ? 'error-text' : '']">{{answerTip}}</p>
            <div v-if="submitStatus" class="answer-card-bottom">
                <ed-button class="answer-card-bottom-button" height="30px" @click="resetInput" type="dark">重新作答</ed-button>
                <!-- <span class="answer-card-bottom-span" @click="breakQuestion">点击跳过此题</span> -->
            </div>
        </section>
    </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { answer } from '@/api';
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
            answerTip: '',
            submitStatus: false,
            isErrorText: false
        };
    },
    methods: {
        submitAnswer() {
            const { contentId, chapterId } = this.answerItem;
            const { courseId, catalogId } = this.$route.query;
            const { answerValue } = this;
            answer({answerValue, catalogId, chapterId, contentId, courseId}).then((res: any) => {
                if (res.code === 200) {
                    this.isErrorText = !res.data.isTrueAnswer;
                    this.submitStatus = true;
                    this.answerTip = res.data.answerTip;
                }
            });
        },
        resetInput() {
            // 重新作答
            this.answerValue = '';
            this.submitStatus = false;
        }
        // breakQuestion() {
            // 跳过此题
        // }
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
            font-size: 16px;
            line-height: 22px;
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
                font-size: 16px;
                line-height: 40px;
                font-weight: 500;
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
                font-size: 16px;
                line-height: 40px;
                border-radius: 4px;
                cursor: pointer;
            }
        }
        &-tips {
            font-size: 14px;
            line-height: 20px;
            color: #5DB756;
            margin-bottom: 10px;
        }
        &-bottom {
            display: flex;
            &-button {
                margin-right: 20px;
            }
            &-span {
                font-size: 16px;
                line-height: 30px;
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
