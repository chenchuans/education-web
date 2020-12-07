<template>
    <div class="order">
        <h2 class="order-title">我的订单</h2>
    </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { getMyOrderInfo } from '@/api';
import url from '@/api/baseUrl.ts';
import EdButton from '@/components/button/Index.vue';

@Options({
    components: { EdButton },
    data() {
        return {
            imageUrl: url.imageUrl,
            orderList: [{}]
        }
    },
    created() {
        // this.getInfo();
    },
    methods: {
        getInfo() {
            getMyOrderInfo({}).then((res: any) => {
                if (res.code === 200) {
                    // this.orderList = res.data.;
                }
            });
        }
    }
})
export default class OrderMy extends Vue {};
</script>
<style lang="scss" scoped>
@import '@/styles/variables.scss';
@import '@/styles/global.scss';
.order {
    width: 800px;
    margin: 0 auto;
    margin-top: 130px;
    box-sizing: border-box;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 0 14px 2px $shadowColor;
    min-height: 300px;
}
</style>
