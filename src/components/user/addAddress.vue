<template>
  <div class="addAddress-container">
    <address-form v-on:post="post" v-bind:id="0"></address-form>
  </div>
</template>

<script>
import addressForm from "../subcomponents/address_form.vue";
import {Toast,MessageBox} from  'mint-ui'
  export default {
    name: "addAddress",
    data() {
      return {

      }
    },
    components: {
      addressForm
    },
    methods: {
      post(body,callback) {
          this.axios.post('api/addAddress', body).then(result => {
            if (result.data.status === -1) {
              //  请登录
              MessageBox({
                title: '您尚未登录',
                message: '是否前往登录?',
                showCancelButton: true,
                cancelButtonText: '返回上一页'
              })
                .then(active => {
                  if (active === 'cancel') {
                    this.$router.go(-1)
                  } else {
                    this.$router.push('/user/login')
                  }
                })
            } else if (result.data.status === 1 || result.data.status === 2) {
              Toast(result.data.message)
            } else {
              //   添加成功
              MessageBox({
                title: '添加成功',
                message: '返回上一页?',
                showCancelButton: true,
                cancelButtonText: '继续添加收货地址'
              })
                .then(active => {
                  if (active === 'cancel') {
                    callback && callback()
                  } else {
                    this.$router.go(-1)
                  }
                })
            }
          })

      }
    }
  }
</script>

<style lang="scss">
.addAddress-container {
  height: 100%;
}
</style>
