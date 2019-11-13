<template>
  <div class="photoInfo-container">
    <h3>{{photoInfo.title}}</h3>
    <p class="subtitle">
      <span>发表时间: {{photoInfo.add_time | dateFormat }}</span>
      <span>点击了: {{ photoInfo.click }}次</span>
    </p>
    <hr>
    <!--缩略图区域-->
    <div class="preview">
      <vue-preview :slides="slide1" @close="handleClose"></vue-preview>
    </div>
    <!--        图片内容区域 -->
    <div class="content" v-html="photoInfo.content">

    </div>

    <!--        放置一个现成的子组件-->
    <cmt-box :artid="id"></cmt-box>
  </div>
</template>

<script>


  // 导入评论子组件
  import comment from "../subcomponents/comment.vue"
  import {Toast} from 'mint-ui'

  export default {
    data() {
      return {
        id: this.$route.params.id,
        photoInfo: {},
        slide1: [],//缩略图数组
      }
    },
    created() {
      this.getPhotoInfo()
      this.getImagesById()
    },
    mounted() {

    },
    methods: {
      getPhotoInfo() {
        //  获取图片的详情
        this.axios.get('api/getimageInfo/' + this.id).then(res => {
          if (res.data.status === 0) {
            this.photoInfo = res.data.message
          } else {
            Toast('获取失败')
          }
        })
      },
      getImagesById() {
        this.axios.get('api/getthumimages/' + this.id).then(res => {
          this.getImagesSize(res.data.message)
          this.slide1 = res.data.message
        })
      },
      getImagesSize(imagesArr) {
        imagesArr.forEach(item => {
          item.w = 400
          item.h =  600
          item.msrc = item.src
        })
      },

      handleClose() {

      }
    },
    components: {
      'cmt-box': comment
    }
  }
</script>

<style lang="less">
  .photoInfo-container {
    padding: 3px;

    h3 {
      color: #26a2ff;
      font-size: 16px;
      text-align: center;
      margin: 15px 0;
      line-height: 1.5;
    }

    .subtitle {
      display: flex;
      justify-content: space-between;
      font-size: 14px;
    }

    .content {
      font-size: 14px;
      line-height: 30px;
    }
  }

  /*因为是组件的原因 局部设置样式不生效 scoped*/
  .preview {
    width: 100%;
    padding: 10px;

    .pswp__container {
      z-index: 999999;
    }
    div[itemscope=itemscope] {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;

      figure {
        width: 48%;
        padding: 0;
        margin: 10px 0;
        img {
          width: 100%;
          height: auto;
        }
      }
    }
  }
</style>
