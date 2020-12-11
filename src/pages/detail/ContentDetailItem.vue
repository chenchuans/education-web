<template>
    <li class="item">
        <img class="item-img" :src="`${imageUrl}${item.courseCoverImageUrl}`" alt=""/>
        <section class="item-content">
            <div class="item-content-name">
                <h3 class="item-content-name-title">{{item.courseName}}</h3>
                <p  class="item-content-name-tips">{{item.catalogLength}}章</p>
            </div>
            <p class="item-content-teacher">{{item.teacherName}}</p>
            <div class="item-content-desc">{{item.teacherDesc}}</div>
            <div class="item-content-bottom">
                <div class="item-content-bottom-price">
                    <ed-button @click="handlePayment(item.id)" type="dark">¥{{item.specialPrice}}购买</ed-button>
                    <span class="item-content-bottom-price-origin">原价 ¥{{item.coursePrice}}</span>
                </div>
            </div>
        </section>
    </li>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import url from '@/api/baseUrl.ts';
import EdButton from '@/components/button/Index.vue';
import { payOrder } from '@/api';

@Options({
    name: 'ContentDetailItem',
    components: { EdButton },
    props: {
        item: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            imageUrl: url.imageUrl
        }
    },
    methods: {
        handlePayment(courseId) {
            // courseId 发请求生成订单后，跳转到支付页面
            payOrder({courseId}).then((res: any) => {
                if (res.code === 200) {
                    let orderInfo = res.data;
                    const { businessName, goodName, orderId, orderTime, price } = res.data;
                    // let codeUrl = res.data.codeUrl.replace('?', '!@#');
                    // codeUrl = codeUrl.replace('=', '^*');
                    // codeUrl = codeUrl.replace('&', '^^');
                    // codeUrl = codeUrl.replace('=', '^*');
                    // codeUrl = codeUrl.replace('&', '^^');
                    // codeUrl = codeUrl.replace('=', '^*');
                     this.$router.push(`/payment?businessName=${businessName}&goodName=${goodName}&orderId=${orderId}&orderTime=${orderTime}&price=${price}`);
                }
            });
        }
    }
})

export default class ContentDetailItem extends Vue {};
</script>
<style lang="scss" scoped>
@import '@/styles/variables.scss';
@import '@/styles/global.scss';
.item {
    display: flex;
    justify-content: space-between;
    height: 240px;
    box-sizing: border-box;
    &-img {
        width: 150px;
        height: 180px;
        border-radius: 8px;
        margin: 30px 0;
        cursor: pointer;
    }
    &-content {
        width: 600px;
        padding: 30px 0;
        height: 240px;
        &-name {
            display: flex;
            justify-content: space-between;
            margin-bottom: 10px;
            &-title {
                font: 500 20px/24px '';
                color: $formColor;
            }
            &-tips {
                font: 300 14px/24px '';
                color: $tipsColor;
                white-space: nowrap;
                letter-spacing: 1px;
            }
        }
        &-teacher {
            font: 400 14px/24px '';
            text-indent: 5px;
            max-width: 100%;
            color: $formColor;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
            margin-bottom: 10px;
        }
        &-desc {
            font: 400 14px/24px '';
            height: 76px;
            text-indent: 20px;
            overflow: hidden;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 3;
        }
        &-bottom {
            height: 36px;
            margin-top: 8px;
            display: flex;
            justify-content: space-between;
            &-price {
                &-origin {
                    font: 400 12px/3 '';
                    color: $tipsColor;
                    text-decoration: line-through;
                    margin-left: 10px;
                }
            }
        }
    }
}
</style>
