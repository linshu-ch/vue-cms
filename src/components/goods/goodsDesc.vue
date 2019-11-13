<template>
    <div class="goodsDesc-container">
        <h3>{{info.title}}</h3>
        <hr>
        <div class="content" v-html="info.content"></div>
    </div>
</template>

<script>
  export default {
   data () {
     return {
       info: {} ,//图文数据
       id: this.$route.params.id
     }
   },
    created() {
     this.getGoodInfo()
    },
    methods: {
     getGoodInfo () {
       this.axios.get('api/goods/getdesc/' + this.id).then( res => {
         if (res.data.status === 0){
           this.info = res.data.message
         }
       })
     }
    }
  }
</script>

<style lang="less">
.goodsDesc-container{
    padding: 0 3px;
    h3 {
        font-size: 16px;
        color: #226aff;
        text-align: center;
        line-height: 32px;
    }
    hr {
        padding: 0;
        margin: 0;
       border-top: 1px solid #26a2ff;

    }
    .content {
        width: 100%;
        .title{
            font-size: 14px;
            color: #ccc;
            text-indent: 2em;
            margin: 10px 0;
        }
        img {
            width: 100%;
        }

    }
}

</style>
