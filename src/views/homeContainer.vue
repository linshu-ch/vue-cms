<template>
  <div>
    <vue-element-loading :active="isActive" :is-full-screen="true" spinner="spinner" color="#FF6700"
                         background-color="rgba(255,255,255,0)"/>
    <!--        轮播图区域-->
    <swiper :lunbotuList="lunbotuList" :isfull="true"></swiper>
    <!--        九宫格到 六宫格的改造 6宫格-->
    <ul class="mui-table-view mui-grid-view mui-grid-9">
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4">
        <router-link to="/home/newList">
          <img src="../../public/images/menu1.png" alt="">
          <div class="mui-media-body">新闻资讯</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4">
        <router-link to="/home/photoList">
          <img src="../../public/images/menu2.png" alt="">
          <div class="mui-media-body">图片分享</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4">
        <router-link to="/home/goodslist">
          <img src="../../public/images/menu3.png" alt="">
          <div class="mui-media-body">商品购买</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4">
        <router-link to="#">
          <img src="../../public/images/menu4.png" alt="">
          <div class="mui-media-body">留言反馈</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4">
        <router-link to="/home/videolist">
          <img src="../../public/images/menu5.png" alt="">
          <div class="mui-media-body">视频专区</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4">
        <a href="#">
          <img src="../../public/images/menu6.png" alt="">
          <div class="mui-media-body">联系我们</div>
        </a>
      </li>
    </ul>
  </div>

</template>
<script>
  import {Toast} from 'mint-ui'

  //导入轮播图组件
  import swiper from "@/components/subcomponents/swiper.vue"

  export default {
    data() {
      return {
        lunbotuList: [],
        height: 200,
        isActive: false
      }
    },
    methods: {
      getLunbotu() {//获取轮播图的方法
        this.isActive = true
        this.$http.get('api/getlunbo').then(result => {
          this.isActive = false
          if (result.body.status === 0) {
            this.lunbotuList = result.body.message
          } else {
            Toast('加载轮播图失败')
          }
        })

      }
    },
    created() {
      this.getLunbotu()
    },
    components: {
      swiper
    }
  }
</script>
<style lang="less" scoped>

  .mui-grid-view.mui-grid-9 {

    border: 0;
    background-color: #fff;

    img {
      width: 60px;
      height: 60px;
    }

    .mui-media-body {
      font-size: 14px;
    }
  }

  .mui-grid-view.mui-grid-9 .mui-table-view-cell {
    border: 0;

  }
</style>
