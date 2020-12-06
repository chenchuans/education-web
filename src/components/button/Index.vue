<template>
    <span :style="{width, height, lineHeight: height}" :class="[type, 'button']" @click="handleClick"><slot/></span>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";

@Options({
    name: 'Button',
    props: {
        width: {
            type: String,
            default: '90px'
        },
        height: {
            type: String,
            default: '30px'
        },
        type: {
            type: String,
            default: 'light'
        }, 
        params: {
            type: Object,
            default: () => {}
        }
    },
    methods: {
        handleClick() {
            this.$emit('click', this.params);
        }
    }
})
export default class Button extends Vue {};
</script>
<style lang="scss" scoped>
$fontColor: #fa8919;
.button {
    font-size: 14px;
    font-weight: 400;
    display: inline-block;
    text-align: center;
    border-radius: 5px;
    cursor: pointer;
}
.light {
    color: $fontColor;
    border: 1px solid $fontColor;
}
.dark {
    background-color: $fontColor;
    color: #fff;
}
</style>