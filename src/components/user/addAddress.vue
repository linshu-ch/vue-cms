<template>
  <div class="addAddress-container">
    <address-form v-on:post="post" v-bind:id="0"></address-form>
  </div>
</template>

<script>
import addressForm from "../subcomponents/address_form.vue";
import {Toast,MessageBox} from  'mint-ui'
import common from '@/common'
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
            common.noLogin(result.data.status,MessageBox,this)
            if (result.data.status === 1 || result.data.status === 2) {
              Toast(result.data.message)
            } else if(result.data.status === 0) {
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
