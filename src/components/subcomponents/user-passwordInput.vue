<template>
  <div class="password password-show">
    <input :type="isShowPwd? 'text': 'password'" name="upwd" v-model="upwd" :placeholder="placeholder"
           :class="{'border-danger':isDangerBorder}"/>
    <a class="is-show-pwd"
       :class="[
       {'active': isShowPwd},{'is-show-pwd': true}
       ]"
       href="javascript:void(0);"
       @click="isShowPwd = !isShowPwd"><span
      class="mui-icon mui-icon-eye"></span></a>
  </div>
</template>

<script>
  export default {
    name: "user-passwordInput",
    data() {
      return {
        upwd: '',
        isShowPwd: false
      }
    },
    props: ['placeholder', 'isDangerBorder'],
    watch: {
      'upwd'(now) {
        this.$emit('handleChange', now)
      }
    }
  }
</script>

<style scoped lang="scss">
  .password-show {
    position: relative;

    .is-show-pwd {
      color: #8F8F94;
      position: absolute;
      right: 15px;
      top: 8px;

      &.active {
        color: #007aff;
      }
    }

    .border-danger {
      border-color: #ef4f4f;
    }
  }
</style>
