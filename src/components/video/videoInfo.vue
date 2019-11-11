<template>
  <div class="videoInfo-container">
    <div class="mui-card">
      <div class="mui-card-header mui-card-media">
        <div class="mui-media-body">
          <img :src="videoInfo.img_url || ''" alt="">
          <div class="info">
            <h3 class="title">{{videoInfo.title || ''}}</h3>
            <p class="zhaiyao">{{videoInfo.zhaiyao || ''}}</p>
          </div>
        </div>
      </div>
      <div class="mui-card-content">
        <video
          :src="videoInfo.video_url || ''"
          controls
          loop
          preload="auto"
          webkit-playsinline
          playsinline
        >
          您的浏览器版本太低
        </video>
      </div>
      <div class="mui-card-footer">
        <span>观看量{{videoInfo.watched_count || 0}}</span>
        <a href="javascript:void(0);" @click="handleClickZan"> <span
          class="icon mui-icon-extra mui-icon-extra-heart-filled"></span> 赞:{{videoInfo.zan_count}}</a>
      </div>
    </div>
  </div>
</template>

<script>
  import {Toast} from 'mint-ui'
  export default {
    name: "videoInfo",
    data() {
      return {
        videoInfo: {}
      }
    },
    props: ['id'],
    methods: {
      //获取数据
      getVideoInfo() {
        this.$http.get('api/videoInfo/' + this.id).then(res => {
          if (res.body.status === 0) {
            this.videoInfo = res.body.message
          }
        })
      },

      // 点击赞事件
      handleClickZan() {
        this.$http.post('api/video/addzan', {id: this.id}).then(res => {
          if (res.body.status === 0) {
              this.videoInfo.zan_count ++
          }else {
            Toast('服务器正在开小差，请稍后重试')
          }
        })
      }
    },
    created() {
      this.getVideoInfo()
    }
  }
</script>

<style scoped lang="scss">
  .videoInfo-container {
    .mui-card-header.mui-card-media {
      .mui-media-body {
        margin: 0;
        display: flex;

        img {
          width: 100px;
          height: 100px;
          vertical-align: top;
          margin-right: 20px;
        }

        .info {
          padding-top: 2px;

          .title {
            font-weight: normal;
            margin-bottom: 10px;
          }
        }
      }
    }
    .mui-card-content{
      video {
        width: 100%;
        height: 56vw;
      }
    }
    .mui-card-footer {
      .icon {
        color: orangered;
      }
    }
  }
</style>
