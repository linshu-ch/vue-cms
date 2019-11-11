<template>
  <div class="container">
    <mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore"
                 :auto-fill="false">
      <!--            在使用上拉加载的插件的时候  注意点
          如果出现连续下拉自动载的问题  可以设置属性 :auto-fill="false" 这个功能是自动填充功能
      -->
      <ul class="mui-table-view">
        <li class="mui-table-view-cell mui-media" v-for="item in newsList" :key="item.id">
          <router-link :to="'/home/newsinfo/' + item.id" class="">
            <img class="mui-media-object mui-pull-left"
                 :src="item.img_url">
            <div class="mui-media-body">
              <h1>{{ item.title}}</h1>
              <p class="mui-ellipsis">
                <span>发表时间: {{item.add_time  | dateFormat }}</span>
                <span>点击：{{item.click}} 次</span>
              </p>
            </div>
          </router-link>
        </li>
      </ul>
      </ul>
      <div v-if="isActive" class="velmld-parent">
        <vue-element-loading :active="true" :is-full-screen="pageIndex === 1 ? true: false" spinner="spinner" color="#FF6700" background-color="rgba(255,255,255,0)" />
      </div>
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
        isActive: false,
        isLoading: false
      }
    },
    created() {
      this.getNewsList()
    },
    methods: {
      getNewsList() {
        this.isActive = true
        this.$http.get('api/getnewslist?pageindex=' + this.pageIndex).then(result => {
          this.isActive = false
          if (result.body.status === 0) {
          
            this.newsList = this.newsList.concat(result.body.message)

          } else if (result.body.status === 2) {
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
  .velmld-parent {
      flex: 1;
        min-height: 42px;
  }
  .container {
    display: flex;
    flex-direction: column;
    min-height: 100%;

  }

  .mui-table-view {

    li {
      h1 {
        font-size: 14px;
      }

      .mui-ellipsis {
        font-size: 12px;
        color: #226aff;
        display: flex;
        justify-content: space-between;
      }
    }
  }

</style>
