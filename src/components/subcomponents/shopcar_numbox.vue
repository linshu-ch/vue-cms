<template>
  <div class="mui-numbox" data-numbox-min="1" style="height: 25px">
    <button class="mui-btn mui-btn-numbox-minus" type="button" disabled="">-</button>
    <input id="test" class="mui-input-numbox" type="number" :value="initcount" ref="numbox" @change="countChanged">
    <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
  </div>
</template>

<script>
  import mui from '@/assets/js/mui.min.js'
import common from '@/common'
  import {MessageBox, Toast} from  'mint-ui'
  export default {
    data() {
      return {}
    },
    mounted() {
      //初始化数字选择框
      mui('.mui-numbox').numbox()

    },
    methods: {
      countChanged() {
        var id = parseInt(this.id)
        var count = parseInt(this.$refs.numbox.value)
        this.$store.commit('updateCar', {id, count})
       if(this.$store.state.islogin){
         this.axios.post('api/updateCar', {
           g_id: id,
           count,selected:true
         })
           .then((result) => {
             common.updateCarMsg(result, MessageBox, Toast)
           })
       }


      }
    },
    props: ['initcount', 'id']
  }
</script>

<style scoped lang="less">

</style>
