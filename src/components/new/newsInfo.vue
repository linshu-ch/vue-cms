<template>
    <div class="newsinfo-container">
<!--        大标题-->
        <h3 class="title">{{ newsinfo.title }}</h3>
<!--        子标题-->
        <p class="subtitle">
            <span>发表时间:{{ newsinfo.add_time | dateFormat }} </span>
            <span>点击: {{ newsinfo.click }}次</span>
        </p>
        <hr>
<!--        内容区域-->
        <div class="content" v-html="newsinfo.content"></div>
<!--        评论子组件-->
        <comment-box :artid="id"></comment-box>
    </div>
</template>

<script>
    import { Toast } from 'mint-ui'
    import comment from '../subcomponents/comment.vue'
  export default {
    data() {
      return {
        id: this.$route.params.id,//将URL地址中传递过来的id挂载到data 上 方便调用
        newsinfo: {}
      }
    },
    created() {
      this.getNewsInfoById()
    },
    methods: {
      getNewsInfoById() {
        this.axios.get('api/getnew/' + this.id).then(data => {
         if (data.data.status === 0){
           this.newsinfo = data.data.message
         }else {
           Toast('读取信息失败')
         }

        })
      }

    },
    components: {//用来注册子组件的
      'comment-box': comment

    }
  }

</script>
<style lang="less">
    .newsinfo-container{
        padding: 0 4px;
        .title{
            font-size: 16px;
            text-align: center;
            margin: 15px 0;
            color: red;
        }
        .subtitle{
            font-size: 13px;
            color: #226aff;
            display: flex;
            justify-content: space-between;
        }
        .content{
            img{
                width: 100%;
            }
        }
    }
</style>
