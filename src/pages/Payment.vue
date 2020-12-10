<template>
    <div class="payment">
        <h2 class="payment-title">支付金额<span>￥44.22</span>,请使用微信扫描下面二维码完成</h2>
        <section class="payment-section">
            <img class="payment-section-img" src="./../assets/img/weixin.jpeg" alt=""/>
            <ul class="payment-section-info">
                <li v-for="(item, index) in infoList" :key="index" class="payment-section-info-p">
                    <span class="payment-section-info-p-key">{{item.key}}</span>
                    <span class="payment-section-info-p-value">{{item.value}}</span>
                </li>
            </ul>
        </section>
    </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { formatterTime } from '@/libs/utils';
// import { getHomeList } from '@/api';
// import EdButton from '@/components/button/Index.vue';

@Options({
    // components: { EdButton },
    data () {
        return {
            infoList: [
                {key: '商家名称:', value: ''},
                {key: '商品名称:', value: ''},
                {key: '交易单号:', value: ''},
                {key: '创建时间:', value: ''}
                ]
        };
    },
    created() {
        // this.getList();
    },
    methods: {
        handleTime(time) {
            return formatterTime(time);
        }
    }
})
export default class Payment extends Vue {};
</script>
<style lang="scss" scoped>
@import '@/styles/variables.scss';
@import '@/styles/global.scss';
.payment {
    width: 850px;
    height: 550px;
    margin: 100px auto;
    background: $orangeBackground;
    box-sizing: border-box;
    padding: 30px;
    border-radius: 10px;
    &-title {
        font: 400 20px/30px '';
        padding-bottom: 20px;
        text-align: center;
        color: $formColor;
        span {
            font-size: 20px;
            color: $errorColor;
        }
    }
    &-section {
        display: flex;
        justify-content: space-between;
        &-img {
            width: 300px;
            height: 400px;
            // background: url('./../assets/img/weixin.jpeg') 100% 100%; 
        }
        &-info {
            box-sizing: border-box;
            padding-top: 30px;
            width: 460px;
            &-p {
                font: 400 14px/30px '';
                letter-spacing: 1;
                margin-bottom: 30px;
                &-key {
                    color: $tipsColor;
                }
                &-value {
                    margin-left: 20px;
                }
            }
        }
    }
}
</style>
