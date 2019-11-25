<template>
  <!--    选择框-->
  <div class="address-selector" :class="isShow?'show': 'hide'" @click="close">
    <span class="mui-icon mui-icon-closeempty close-address-selector" @click="close"></span>
    <v-distpicker type="mobile" :province="sheng" :city="city" :area="qu" @selected="onSelected">
    </v-distpicker>
  </div>
</template>

<script>
  import vDistpicker from 'v-distpicker'

  export default {
    name: "user-address-selector",
    data() {
      return {
        sheng: '',
        city: '',
        qu: '',
        isShow: false
      }
    },
    created() {
      this.init()
    },
    methods: {
      init() {
        this.sheng = this.sheng1
        this.city = this.city1
        this.qu = this.qu1
      },

      onSelected(e) {
        this.$emit('selected', e)
      },
      close(e) {
        // 判断tagName  如果是UL LI  之间返回
        if (e.target.tagName === 'UL' || e.target.tagName === 'LI') return false
        e.stopPropagation()

        this.isShow = false
      },
    },
    components: {
      'vDistpicker': vDistpicker
    },
    props: ['sheng1', 'qu1', 'city1', 'isShowDistpicker'],
    watch: {
      'isShowDistpicker': function (now) {
        this.isShow = now
      },
      'isShow': function (now) {
        this.$emit('update', now)
      }
    }
  }

</script>

<style lang="scss">
  .address-selector {
    position: fixed;
    top: 0;
    bottom: 50px;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, .3);
    transition: all .5s ease;
    z-index: 11;

    &.show {
      display: block;
      opacity: 1;
    }

    &.hide {
      display: none;
      height: 0;
      opacity: 0;
    }

    .close-address-selector {
      position: absolute;
      bottom: 40vh;
      line-height: 40px;
      right: 10px;
      color: #6d6d72;
      z-index: 9999999;
    }

    .distpicker-address-wrapper {
      position: absolute;
      bottom: 0;
      width: 100%;
    }

    .address-container {
      width: 100%;
      height: 40vh;
    }
  }
</style>
