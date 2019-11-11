<template>
  <div class="app-container">
    <!--        header -->
    <mt-header fixed title="vue个人项目">
      <!--            返回-->
      <span v-show="isShowBack" slot="left" @click="back">
                <mt-button icon="back">返回</mt-button>
            </span>
    </mt-header>
    <!--        路由router-view区域-->
    <div class="main">
      <transition>
        <router-view></router-view>
      </transition>
    </div>
<!--     网页版才需要的-->
<!--    <div class="download" v-if="isShowDownload">-->
<!--      <mt-button @click="handleDownload">下载安卓app</mt-button>-->
<!--      <button class="mui-icon mui-icon-closeempty" @click="isShowDownload = false"></button>-->
<!--    </div>-->
<!--            底部tabber区域-->
    <nav class="mui-bar mui-bar-tab">
      <router-link class="mui-tab-itemBug" to="/home">
        <span class="mui-icon mui-icon-home"></span>
        <span class="mui-tab-label">首页</span>
      </router-link>
      <router-link class="mui-tab-itemBug" to="/member">
        <span class="mui-icon mui-icon-contact"></span>
        <span class="mui-tab-label">会员</span>
      </router-link>
      <router-link class="mui-tab-itemBug" to="/shopcar">
        <span class="mui-icon mui-icon-extra mui-icon-extra-cart"><span class="mui-badge" id="badge">{{$store.getters.getAllCount}}</span></span>
        <span class="mui-tab-label">购物车</span>
      </router-link>
      <router-link class="mui-tab-itemBug" to="/search">
        <span class="mui-icon mui-icon-search"></span>
        <span class="mui-tab-label">搜索</span>
      </router-link>
    </nav>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        isShowBack: false,
        isShowDownload: true
      }
    },
    created() {
      this.isShowBack = this.$route.path === '/home' ? false : true
    },
    methods: {
      back() {
        this.$router.go(-1)
      },
      handleDownload () {
        window.location.href = 'http://gdlinshu.club/download/vue/and.apk'
      }
    },
    watch: {
      '$route.path': function (newVal) {
        if (newVal === '/home' || newVal === '/') {
          this.isShowBack = false
        } else {
          this.isShowBack = true
        }

      }
    }
  }
</script>
<style lang="scss">
/*网页版才需要的*/
/*  .download {*/
/*    width: 100%;*/
/*    position: fixed;*/
/*    background-color: #fafafa;*/
/*    bottom: 40px;*/
/*    display: flex;*/
/*    justify-content: flex-end;*/
/*    padding: 10px;*/
/*    .mui-icon {*/
/*      padding: 0;*/
/*      border: none;*/
/*    }*/
/*  }*/
  * {
    box-sizing: border-box;
    touch-action: pan-y;
  }

  html, body {
    height: 100%;
  }

  .app-container {
    height: 100%;
    position: relative;
    /*横向溢出隐藏*/
    padding-top: 40px;
    padding-bottom: 50px;
    overflow-x: hidden;

  }
  /*.mint-header {*/
  /*  width: 100%;*/
  /*  position: absolute;*/
  /*  top: 0;*/
  /*  left: 0;*/
  /*}*/
  .v-enter {
    /*这是进入动画之前的的状态*/
    opacity: 0;
transform: translateX(100%);
  }

  .v-leave-to {
    opacity: 0;
    position: absolute;
    height: 0;
    transform: translateX(-100%);
    //设置离开的时候不占位
    /*    这个设置的是离开动画的位置  离开的位置在左边 所有需要 设置为 -100%*/
  }

  .v-enter-active,
  .v-leave-active {
    transition: all .5s ease-out;
  }
  .mint-header.is-fixed {
    z-index: 9;
  }

  .main {
    min-height: 100%;
  }

  /*使用固定定位在ios 中不友好 最好是使用 上下固定 使用是 滚动的*/
  .mui-bar {
    position: fixed;
    bottom: 0;
  }

  // 修改类名解决 不能点击的切换的bug
  .mui-bar-tab .mui-tab-itemBug.mui-active {
    color: #007aff;
  }

  .mui-bar-tab .mui-tab-itemBug {
    display: table-cell;
    overflow: hidden;
    width: 1%;
    height: 50px;
    text-align: center;
    vertical-align: middle;
    white-space: nowrap;
    text-overflow: ellipsis;
    color: #929292;
  }

  .mui-bar-tab .mui-tab-itemBug .mui-icon {
    top: 3px;
    width: 24px;
    height: 24px;
    padding-top: 0;
    padding-bottom: 0;
  }

  .mui-bar-tab .mui-tab-itemBug.mui-active {
    color: #007aff;
  }

  .mui-bar-tab .mui-tab-itemBug .mui-icon {
    top: 3px;
    width: 24px;
    height: 24px;
    padding-top: 0;
    padding-bottom: 0;
  }

  .mui-bar-tab .mui-tab-itemBug {
    display: table-cell;
    overflow: hidden;
    width: 1%;
    height: 50px;
    text-align: center;
    vertical-align: middle;
    white-space: nowrap;
    text-overflow: ellipsis;
    color: #929292;
  }

  .mui-bar-tab .mui-tab-itemBug .mui-icon ~ .mui-tab-label {
    font-size: 11px;
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .mui-bar-tab .mui-tab-itemBug {
    display: table-cell;
    overflow: hidden;
    width: 1%;
    height: 50px;
    text-align: center;
    vertical-align: middle;
    white-space: nowrap;
    text-overflow: ellipsis;
    color: #929292;
  }

  .mui-bar-tab .mui-tab-itemBug.mui-active {
    color: #007aff;
  }
</style>
