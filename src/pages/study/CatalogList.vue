<template>
    <div class="catalog">
        <h2 class="catalog-title">
            <img class="catalog-title-img" :src="`${imageUrl}${courseInfo.courseCoverImageUrl}`"/>
            <h4>{{courseInfo.courseName}}</h4>
        </h2>
        <template v-if="catalogList.filter(item => item.isExperienceClass).length > 0">
            <h3 class="catalog-type">体验课</h3>
            <ul class="catalog-list">
                <li :class="['catalog-list-item', item.isHaveAuth ? '' : 'catalog-list-item_min']" v-for="(item, index) in catalogList.filter(item => item.isExperienceClass)" :key="index" @click="handleStudy(index, item)">
                    <h3 class="catalog-list-item-title">第{{index + 1}}章 {{item.catalogName}}</h3>
                    <!-- <p v-if="item.isHaveAuth" class="catalog-list-item-time">2020年11月2日</p> -->
                    <footer v-if="item.isHaveAuth" class="catalog-list-item-footer">
                        <span class="catalog-list-item-footer-status">已完成{{item.rateOLearn}}%</span>
                        <ed-button type="dark" class="catalog-list-item-footer-button">{{item.rateOLearn === 100 ? '复习' : '继续学习'}}</ed-button>
                    </footer>
                </li>
            </ul>
        </template>
        <template v-if="catalogList.filter(item => !item.isExperienceClass).length > 0">
            <h3 class="catalog-type">进阶课</h3>
            <ul class="catalog-list">
                <li :class="['catalog-list-item', item.isHaveAuth ? '' : 'catalog-list-item_min']" v-for="(item, index) in catalogList.filter(item => !item.isExperienceClass)" :key="index" @click="handleStudy(index, item)">
                    <h3 class="catalog-list-item-title">第{{index + 1}}章 {{item.catalogName}}</h3>
                    <!-- <p v-if="item.isHaveAuth" class="catalog-list-item-time">2020年11月2日</p> -->
                    <footer v-if="item.isHaveAuth" class="catalog-list-item-footer">
                        <span class="catalog-list-item-footer-status">已完成{{item.rateOLearn}}%</span>
                        <ed-button type="dark" v-if="!item.isNeedPay" class="catalog-list-item-footer-button">{{item.rateOLearn === 100 ? '复习' : '继续学习'}}</ed-button>
                        <ed-button type="dark" v-else class="catalog-list-item-footer-button">立即购买</ed-button>
                    </footer>
                </li>
            </ul>
        </template>
        <!-- 选择课程的弹窗 -->
        <van-overlay :show="isOverlay">
            <div class="wrapper">
                <h4>请先选择课程版本</h4>
                <van-radio-group class="wrapper-radio" v-model="currentVersionId">
                    <van-radio class="wrapper-radio-item" v-for="(item, index) in versionList" :key="index" :name="item.id">{{item.versionName}}</van-radio>
                </van-radio-group>
                <ed-button @click="selectVersion" type="dark" class="bottom">确定</ed-button>
            </div>
        </van-overlay>
        <!-- 进阶课购买 -->
        <van-overlay :show="payPopup">
            <section class="payment">
                <h2 class="payment-title">支付金额<span>￥{{orderInfo.price}}</span>,请使用微信扫描下面二维码完成付款</h2>
                <div class="payment-section">
                    <canvas id="code"></canvas>
                    <ul class="payment-section-info">
                        <li class="payment-section-info-p">
                            <span class="payment-section-info-p-key">商家名称:</span>
                            <span class="payment-section-info-p-value">{{orderInfo.businessName}}</span>
                        </li>
                        <li class="payment-section-info-p">
                            <span class="payment-section-info-p-key">课程名称:</span>
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
                        <ed-button @click="confirmOrder" height="40px" width="100px" type="dark">确认完成</ed-button>
                    </ul>
                </div>
            </section>
        </van-overlay>
    </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { getCatalogList, submitVersion, paySecondOrder, getSecondOrderStatus } from '@/api';
import { formatterTime } from '@/libs/utils';
import EdButton from '@/components/button/Index.vue';
import url from '@/api/baseUrl.ts';
import QRCode from 'qrcode';

@Options({
    components: { EdButton },
    data() {
        return {
            isOverlay: false,
            payPopup: false,
            currentVersionId: 0,
            catalogList: [],
            imageUrl: url.imageUrl,
            courseInfo: {},
            versionList: [],
            orderInfo: {}
        }
    },
    created() {
        this.getInfo();
    },
    methods: {
        getInfo() {
            const { courseId } = this.$route.query;
            getCatalogList({ courseId }).then((res: any) => {
                if (res.code === 200) {
                    // 已经选择课程版本
                    if (res.data.isChoseVersion) {
                        this.catalogList = res.data.catalogInfoList;
                        this.courseInfo = res.data.courseInfo;
                    } else {
                        this.isOverlay = true;
                        this.versionList = res.data.courseVersionInfos;
                    }
                }
            });
        },
        selectVersion() {
            const {id, courseId} = this.versionList.find(item => item.id === this.currentVersionId);
            submitVersion({ versionId: id, courseId }).then((res: any) => {
                if (res.code === 200) {
                    this.isOverlay = false;
                    this.$toast(res.message);
                    this.getInfo();
                }
            });
        },
        handleTime(time) {
            return formatterTime(time);
        },
        handleStudy(index, {courseId, catalogId, isHaveAuth, catalogName, isNeedPay}) {
            if (isNeedPay) {
                // 需要购买的逻辑
                this.payPopup = true;
                paySecondOrder({ courseId }).then((res: any) => {
                    if (res.code === 200) {
                        this.orderInfo = res.data;
                        this.handleCode(res.data.codeUrl);
                    }
                });
                return;
            }
            if (isHaveAuth) {
                // 直接去详情页面学习
                const { courseName } = this.courseInfo;
                this.$router.push(`/study?courseId=${courseId}&catalogId=${catalogId}&courseName=${courseName}&catalogName=${catalogName}&index=${index + 1}`);
            }
        },
        confirmOrder() {
            // 点击确认订单，查询订单是否完成
            const { orderId } = this.orderInfo;
            getSecondOrderStatus({orderId}).then((res: any) => {
                if (res.code === 200) {
                    if (res.data.isDone) {
                        this.$toast('购买成功');
                        this.getInfo();
                    } else {
                       this.$toast('还没查到订单信息，如果您已经微信支付成功，请稍后再试！');
                    }
                }
            });
        },
        handleCode(codeUrl) {
            this.$nextTick(() => {
                QRCode.toCanvas(document.getElementById('code'), codeUrl, error => {});
            });
        }
    }
})
export default class CatalogList extends Vue {};
</script>
<style lang="scss" scoped>
@import '@/styles/variables.scss';
@import '@/styles/global.scss';
.catalog {
    width: 1200px;
    margin: 0 auto;
    margin-top: 110px;
    box-sizing: border-box;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 0 14px 2px $shadowColor;
    min-height: 300px;
    &-title {
        display: flex;
        justify-content: center;
        height: 70px;
        margin-bottom: 20px;
        &-img {
            width: 70px;
            height: 70px;
            display: inline-block;
            margin-right: 10px;
        }
        h4 {
            font: 500 26px/70px '';
        }
    }
    &-list {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        box-sizing: border-box;
        padding: 20px 10px 0 10px;
        width: 100%;
        &-item {
            min-height: 90px;
            box-sizing: border-box;
            width: 360px;
            padding: 20px;
            border-radius: 5px;
            margin-bottom: 20px;
            transition: all .5s;
            cursor: pointer;
            box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.15);
            &-title {
                font: 400 18px/1.5 '';
                margin-bottom: 10px;
            }
            &-time {
                font: 400 16px/20px '';
                padding: 10px 0;
                color: $tipsColor;
            }
            &-footer {
                display: flex;
                justify-content: space-between;
                &-status {
                    display: inline-block;
                    border: 1px solid $homeBarBorderColor;
                    color: $tipsColor;
                    border-radius: 5px;
                    height: 30px;
                    padding: 0 10px;
                    font: 14px/30px '';
                }
            }
        }
        &-item:hover {
            transform: scale(.95);
        }
        &-item_min {
            height: 70px;
            min-height: 30px;
            cursor: not-allowed;
            .catalog-list-item-title {
                color: $tipsColor;
            }
        }
        &-item_min:hover {
            transform: none;
        }
    }
    &-type {
        font: 20px/1.5 '';
        text-align: center;
    }
    .wrapper {
        width: 400px;
        min-height: 100px;
        box-sizing: border-box;
        padding: 20px;
        background-color: #fff;
        border-radius: 5px;
        position: absolute;
        margin: -50px 0 0 -150px;
        left: 50%;
        top: 50%;
        text-align: center;
        &-radio {
            padding: 20px 60px;
            &-item {
                margin-top: 10px;
            }
        }
        .bottom {
            margin-top: 20px;
        }
    }
    .payment {
        width: 800px;
        height: 400px;
        margin: -200px 0 0 -400px;
        left: 50%;
        top: 50%;
        position: absolute;
        text-align: center;
        background-color: #fff;
        border-radius: 5px;
        box-sizing: border-box;
        padding: 20px;
        &-title {
            font-size: 20px;
            line-height: 30px;
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
            #code {
                width: 300px !important;
                height: 300px !important;
            }
            &-info {
                box-sizing: border-box;
                padding-top: 20px;
                width: 460px;
                text-align: left;
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

}
</style>
