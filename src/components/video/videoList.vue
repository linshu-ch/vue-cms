<template>
  <div class="videoList-container">
    <ul class="mui-table-view">
      <li class="mui-table-view-cell mui-media" v-for="(item,i) of videoList" :key="i">
        <router-link :to="'/home/videoInfo/'+ item.id">
          <img class="mui-media-object mui-pull-left fengmian" :src="URL + item.img_url">
          <div class="mui-media-body">
            {{item.title}}
            <p class="mui-ellipsis">
              <span>观看数量:{{item.watched_count}}</span>
              <span> <span class="icon mui-icon-extra mui-icon-extra-heart-filled"></span> 赞:{{item.zan_count}}</span>
            </p>
          </div>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: "videoList",
    data() {
      return {
        videoList: []
      }
    },
    methods: {
      getVideoList() {
        this.axios.get('api/videoList').then(res => {
          if (res.data.status === 0) {
            this.videoList = res.data.message
          }
        })
      }
    },
    created() {
      this.getVideoList()
    }
  }
</script>

<style scoped lang="scss">
  .videoList-container {
    .mui-table-view {
      .mui-table-view-cell {

        a {
          width: 100%;
          margin: 0;
        }

        .mui-media-object {
          line-height: 100px;
          max-width: 100px;
          height: 100px;
        }

        .fengmian {
          width: 100px;
        }
        .mui-media-body {
          padding: 10px;
        }
        .mui-ellipsis {
          display: flex;
          justify-content: space-between;
          .icon {
            color: orangered;
          }

        }
      }
    }
  }

</style>
