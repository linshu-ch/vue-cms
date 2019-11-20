<template>
  <div class="new-list-container">
    <mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore"
                 :auto-fill="false">
      <!--            在使用上拉加载的插件的时候  注意点
          如果出现连续下拉自动载的问题  可以设置属性 :auto-fill="false" 这个功能是自动填充功能
      -->
      <ul class="mui-table-view">
        <li class="mui-table-view-cell mui-media new-item" v-for="item in newsList" :key="item.id">
          <router-link :to="'/home/newsinfo/' + item.id">
            <img class="mui-media-object"
                 :src="URL + item.img_url">
            <div class="mui-media-body">
              <h1 class="mui-ellipsis">{{ item.title}}</h1>
              <p class="ctime">
                <span>发表时间: {{item.add_time  | dateFormat }}</span>
                <span>点击：{{item.click}} 次</span>
              </p>
            </div>
          </router-link>
        </li>
      </ul>
    </mt-loadmore>
  </div>
</template>

<script>
  import {Toast} from 'mint-ui'

  export default {
    data() {
      return {
        newsList: [],
        pageIndex: 1,
        allLoaded: false,
        isLoading: false
      }
    },
    created() {
      this.getNewsList()
    },
    methods: {
      getNewsList() {
        this.axios.get('api/getnewslist?pageindex=' + this.pageIndex).then(result => {
          if (result.data.status === 0) {
            this.newsList = this.newsList.concat(result.data.message)
          } else if (result.data.status === 2) {
            Toast('没有更多数据')
            this.allLoaded = true
          } else {
            Toast('获取列表失败')
          }
        })
      },
      loadTop() {

        this.newsList = []
        this.pageIndex = 1
        this.getNewsList()
        this.allLoaded = false
        this.$refs.loadmore.onTopLoaded();
      },
      loadBottom() {
        this.pageIndex += 1
        this.getNewsList()
        // this.allLoaded = true;// 若数据已全部获取完毕
        this.$refs.loadmore.onBottomLoaded();
      }
    },


  }
</script>

<style lang="less">
  .new-list-container {
    display: flex;
    flex-direction: column;
    min-height: 100%;
    .mui-table-view {

      .new-item {
       a{
         display: flex;
         width: 100%;
         margin: 0;
         padding: 0;
         img {
            margin-right: 10px;
         }
         .mui-media-body{
           flex-grow: 1;
         }

         h1 {
           font-size: 14px;
         }

         .ctime {
           font-size: 12px;
           color: #226aff;
           display: flex;
           justify-content: space-between;
         }
       }

      }
    }

  }



</style>
