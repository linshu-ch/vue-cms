<template>
    <div>
       <cmtBox :artid="$route.params.id"></cmtBox>
    </div>
</template>

<script>
  import cmtBox from '../subcomponents/comment.vue'

  export default {
    components: {
      cmtBox
    }
  }
</script>

<style lang="less">

</style>