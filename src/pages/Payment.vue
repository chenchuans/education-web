<template>
    <div class="payment">
        <h2 class="payment-title">支付金额<span>￥{{orderInfo.price}}</span>,请使用微信扫描下面二维码完成</h2>
        <section class="payment-section">
            <canvas id="code" style="width: 300px; height: 300px" width="300" height="300"></canvas>
            <ul class="payment-section-info">
                <li class="payment-section-info-p">
                    <span class="payment-section-info-p-key">商家名称:</span>
                    <span class="payment-section-info-p-value">{{orderInfo.businessName}}</span>
                </li>
                <li class="payment-section-info-p">
                    <span class="payment-section-info-p-key">商品名称:</span>
                    <span class="payment-section-info-p-value">{{orderInfo.goodName}}</span>
                </li>
                <li class="payment-section-info-p">
                    <span class="payment-section-info-p-key">交易单号:</span>
                    <span class="payment-section-info-p-value">{{orderInfo.orderId}}</span>
                </li>
                <li class="payment-section-info-p">
                    <span class="payment-section-info-p-key">创建时间:</span>
                    <span class="payment-section-info-p-value">{{handleTime(+orderInfo.orderTime)}}</span>
                </li>
                <li class="payment-section-info-p">
                    <span class="payment-section-info-p-key">支付完成请点击确认完成</span>
                </li>
                <ed-button @click="handleOrder" height="40px" width="100px" type="dark">确认完成</ed-button>
            </ul>
        </section>
    </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { formatterTime } from '@/libs/utils';
import { getOrderStatus } from '@/api';
import EdButton from '@/components/button/Index.vue';
import QRCode from 'qrcode';

@Options({
    components: { EdButton },
    data () {
        return {
            orderInfo: {}
        };
    },
    mounted() {
        this.orderInfo = this.$route.query;
        console.log(111, this.orderInfo.orderTime, this.handleTime(+this.orderInfo.orderTime))
        // this.orderInfo = JSON.parse(this.$route.query.orderInfo);
        // this.orderInfo.codeUrl.replace('!@#', '?');
        let codeUrl = 'weixin://wxpay/bizpayurl/up?pr=NwY5Mz9&groupid=00';
        // this.orderInfo = {...this.$route.query};
        console.log(11,  this.orderInfo, this.$route.query);
        // console.log(111, this.orderInfo, JSON.parse(this.$route.query.orderInfo));
        // const { codeUrl } = this.orderInfo;
        QRCode.toCanvas(document.getElementById('code'), codeUrl, error => {});
    },
    methods: {
        handleTime(time) {
            return formatterTime(time);
        },
        handleOrder() {
            // 点击确认订单，查询订单是否完成
            const { orderId } = this.orderInfo;
            getOrderStatus({orderId}).then((res: any) => {
                if (res.code === 200) {
                    this.$router.replace('/order-my');
                }
            });
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
    height: 450px;
    margin: 100px auto;
    background: $orangeBackground;
    box-sizing: border-box;
    padding: 30px;
    border-radius: 10px;
    &-title {
        font: 400 20px/30px '';
        padding-bottom: 10px;
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
        &-info {
            box-sizing: border-box;
            padding-top: 20px;
            width: 460px;
            &-p {
                font: 400 14px/30px '';
                letter-spacing: 1;
                margin-bottom: 20px;
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
