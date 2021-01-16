<template>
    <div class="order">
        <h2 class="order-title">我的订单</h2>
        <ul class="order-list">
            <nav class="order-list-nav">
                <span>商品名称</span>
                <span>支付方式</span>
                <span>状态</span>
                <span>实付金额</span>
            </nav>
            <li v-for="(item, index) in orderList" :key="index" class="order-list-item">
                <header class="order-list-item-header">
                    <span class="order-list-item-header-num">订单编号：{{item.orderId}}</span>
                    <span class="order-list-item-header-time">{{handleTime(item.orderTime)}}</span>
                </header>
                <section class="order-list-item-content">
                    <div class="order-list-item-content-con" @click="handleDetail(item.id)">
                        <img :src="`${imageUrl}${item.courseCoverImageUrl}`" class="order-list-item-content-con-img" alt=""/>
                        <p class="order-list-item-content-con-name">{{item.courseName}}</p>
                    </div>
                    <span class="order-list-item-content-text">{{item.payType}}</span>
                    <span class="order-list-item-content-text">{{item.isPay ? '已完成' : '未完成'}}</span>
                    <span class="order-list-item-content-price">￥{{item.orderPrice}}</span>
                </section>
            </li>
        </ul>
    </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { getMyOrderInfo } from '@/api';
import url from '@/api/baseUrl.ts';
import EdButton from '@/components/button/Index.vue';
import { formatterTime } from '@/libs/utils';

@Options({
    components: { EdButton },
    data() {
        return {
            imageUrl: url.imageUrl,
            orderList: []
        }
    },
    created() {
        this.getInfo();
    },
    methods: {
        getInfo() {
            getMyOrderInfo({}).then((res: any) => {
                if (res.code === 200) {
                    this.orderList = res.data.orderInfoList;
                }
            });
        },
        handleDetail(courseId) {
            // this.$router.push(`/catalog-list?courseId=${courseId}`);
        },
        handleTime(time) {
            return formatterTime(time);
        }
    }
})
export default class OrderMy extends Vue {};
</script>
<style lang="scss" scoped>
@import '@/styles/variables.scss';
@import '@/styles/global.scss';
.order {
    width: 1000px;
    margin: 0 auto;
    margin-top: 110px;
    box-sizing: border-box;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 0 14px 2px $shadowColor;
    min-height: 300px;
    &-title {
        margin-bottom: 20px;
    }
    &-list {
        &-nav {
            font-size: 14px;
            line-height: 24px;
            padding: 0 20px;
            display: flex;
            justify-content: space-between;
            color: $tipsColor;
            margin-bottom: 10px;
            span {
            }
        }
        &-item {
            margin-bottom: 20px;
            width: 100%;
            height: 180px;
            border: 2px solid #f6f7fb;
            border-radius: 5px;
            &-header {
                height: 50px;
                padding: 0 20px;
                font-size: 14px;
                line-height: 50px;
                color: #888;
                background: #f6f7fb;
                &-num {
                    margin-right: 20px;
                }
                &-time {

                }
            }
            &-content {
                padding: 20px;
                box-sizing: border-box;
                width: 100%;
                display: flex;
                &-con {
                    cursor: pointer;
                    display: flex;
                    &-img {
                        height: 80px;
                        width: 80px;
                        border-radius: 5px;
                        margin-right: 10px;
                    }
                    &-name {
                        width: 200px;
                        box-sizing: border-box;
                        padding-right: 20px;
                        font-size: 16px;
                        line-height: 24px;
                        color: $fontColor;
                    }
                }
                &-text {
                    font-size: 16px;
                    line-height: 80px;
                }
                &-text:nth-of-type(1) {
                    width: 300px;
                }
                &-text:nth-of-type(2) {
                    width: 200px;
                }
                &-price {
                    width: 150px;
                    text-align: right;
                    font-weight: 500;
                    font-size: 16px;
                    line-height: 80px;
                    color: $orangeFontColor;
                }
            }
        }
    }
}
</style>
