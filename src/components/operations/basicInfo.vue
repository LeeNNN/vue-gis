<template>
  <transition name="fade">
    <div
      class="v-alert g-center"
      :style="{zIndex}"
    >
      <div
        class="v-cont"
        :class="{shadow:!hideCont}"
        :style="[innerWidth]"
      >
        <div
          v-if="title.trim()"
          :style="[{backgroundColor:bgColorTit,color:cancelCol},titleStyle]"
          class="title g-font18"
        >
          {{ title }}
          <span class="title-data">{{ titleData }}</span>
        </div>
        <div
          v-if="isCancel"
          class="v-cancel"
        >
          <div
            class="cancel-icon"
            :style="{color:cancelCol}"
            @click="cancel"
          >
            &#xe656;
          </div>
        </div>
        <slot name="slot3" />
        <div
          v-if="!hideCont"
          :style="styles"
          class="content"
        >
          <slot />
        </div>
        <slot name="slot2" />
      </div>
      <div
        class="g-fixed alert-wrap"
        :style="{backgroundColor:bgWrapColor}"
        @click="$emit('cancel')"
      />
    </div>
  </transition>
</template>
<script>
export default {
  name: 'VAlert',
  components: {},
  props: {
    title: { default: '' },
    // titFontSize:{default: '16'},
    bgColorTit: { default: '#40404C' },
    bgColor: { default: '#fff' }, // 背景色
    bgWrapColor: { default: 'rgba(42, 47, 59, 0.6)' }, // 外套背景色
    cancelCol: { default: '#fff' }, // 按钮颜色
    width: { required: true, type: Number }, // 宽度
    minWidth: { type: Number, default: 0 },
    isCancel: { type: Boolean, default: true }, // 是否显示关闭按钮
    titleData: { default: '' },
    hideCont: { type: Boolean, default: false }, // 是否隐藏cont
    zIndex: { default: 2000 },
    styles: {
      default() {
        return {}
      },
      type: Object
    },
    titleStyle: {
      default() {
        return {}
      },
      type: Object
    }
  },
  computed: {
    innerWidth() {
      const dfu = {
        backgroundColor: this.bgColor
      }
      this.minWidth > 0
        ? dfu.minWidth = `${this.minWidth}px`
        : dfu.width = `${this.width}px`
      return dfu
    }
  },
  mounted() {
    document.addEventListener(
      'keydown',
      event => {
        const keyCode = this.$_lib.getKeycode(event)
        if (keyCode === 'Escape' || keyCode === 27) this.$emit('cancel')
      },
      false
    )
  },
  methods: {
    cancel() {
      this.$emit('cancel')
    }
  }
}
</script>
<style lang="scss"
       rel="stylesheet/scss"
       scoped>
    .v-alert {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 2000;
        .alert-wrap {
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            /*z-index: 2000;*/
        }
        .v-cont {
            min-width: 100px;
            min-height: 100px;
            background-color: #ffffff;
            position: relative;
            border-radius: 2px;
            .shadow {
                box-shadow: 0 2px 30px rgba(42, 47, 59, 0.2);
            }
            z-index: 2001;
            .title {
                width: 100%;
                line-height: 70px;
                color: #ffffff;
                padding-left: 30px;
            }
            .title-data {
                color: #f8e19a;
            }
            .content {
                padding: 40px;
                /*padding: 60px 40px 50px 40px;*/
                word-wrap: break-word;
                text-align: left;
            }
        }

        .v-cancel {
            position: absolute;
            top: 0;
            right: 0;
            width: 100%;
            height: 70px;
        }
        .cancel-icon {
            position: absolute;
            text-align: center;
            width: 20px;
            height: 20px;
            line-height: 20px;
            right: 20px;
            top: 50%;
            margin-top: -10px;
            color: #ffffff;
            cursor: pointer;
            transition: 200ms;
            &:hover {
                -webkit-transform: rotate(90deg);
                -moz-transform: rotate(90deg);
                -ms-transform: rotate(90deg);
                -o-transform: rotate(90deg);
                transform: rotate(90deg);
            }
        }
    }
</style>
