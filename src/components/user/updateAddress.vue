<template>
  <div class="updateAddress-container">
    <address-form v-on:post="post" v-bind:id="id"></address-form>
  </div>
</template>

<script>
  import addressForm from "../subcomponents/address_form";
  import {Toast,MessageBox} from  'mint-ui'
  export default {
    name: "updateAddress",
    components: {
      addressForm
    },
    methods: {
      post(body) {

          this.axios.post('api/updateAddress', {
            id: this.id,
           ...body
          }).then(result => {
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
                title: result.data.message,
                message: '返回上一页?',
                showCancelButton: true,
                cancelButtonText: '留在当前页面'
              })
                .then(active => {
                  if (active === 'confirm') {
                    this.$router.go(-1)
                  }
                })
            }
          })

      }
    },
    props: ['id']
  }
</script>

<style scoped>

</style>
