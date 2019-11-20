<template>
  <div class="updateAddress-container">
    <address-form v-on:post="post" v-bind:id="id"></address-form>
  </div>
</template>

<script>
  import addressForm from "../subcomponents/address_form";
  import {Toast,MessageBox} from  'mint-ui'
  import common from "@/common";
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
            common.noLogin(result.data.status,MessageBox,this)
           if (result.data.status === 1 || result.data.status === 2) {
              Toast(result.data.message)
            } else if(result.data.status === 0){
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
