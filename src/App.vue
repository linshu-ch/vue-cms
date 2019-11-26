<template>
  <div class="app-container">
    <!--        header -->
    <mt-header fixed :title="setTitle">
      <!--            返回-->
      <span v-show="isShowBack" slot="left" @click="back">
          <mt-button icon="back">返回</mt-button>
      </span>
      <router-link v-if="$route.path === '/user/address'" slot="right" to="/user/AddAddress" tag="span">
          添加收货地址
      </router-link>
    </mt-header>
    <!--        路由router-view区域-->
    <div class="main">
      <transition
        name="custom-classes-transition"
        enter-active-class="animated fadeInRight time"
        leave-active-class="animated fadeOutLeft p-absolute time">
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
      <router-link class="mui-tab-itemBug" to="/user">
        <span class="mui-icon mui-icon-contact"></span>
        <span class="mui-tab-label">用户中心</span>
      </router-link>
      <router-link class="mui-tab-itemBug" to="/shopcar">
        <span class="mui-icon mui-icon-extra mui-icon-extra-cart"><span class="mui-badge" id="badge">{{$store.getters.getAllCount}}</span></span>
        <span class="mui-tab-label">购物车</span>
      </router-link>
      <router-link class="mui-tab-itemBug" to="/friends">
        <span class="mui-icon mui-icon-person-filled"></span>
        <span class="mui-tab-label">好友</span>
      </router-link>
    </nav>
  </div>
</template>
<script>
  import common from './common.js'

  export default {
    data() {
      return {
        isShowBack: false,
        isShowDownload: true
      }
    },
    created() {
      // 初始化默认值
      this.isShowBack = this.$route.path === '/home' ? false : true
      this.getShopCar()
    },
    methods: {
      back() {
        this.$router.go(-1)
      },
      handleDownload() {
        window.location.href = 'http://gdlinshu.club/download/vue/and.apk'
      },
    //  购物车的数据   如果登录 需要设置
      //异步方法
       getShopCar() {
    this.axios.get('api/getShopCar')
      .then(result => {
        //  设置共享数据中 isLogin 是否登录 ，如果没有登录
        var isLogin = common.isLogin(result.data.status)
        //  设置car中的值，
        if(isLogin){
          this.$store.commit('login')
          //  登录状态 在app 中 是app 是整个的父组件
          result.data.message.forEach(item => {
            item.id = item.g_id
            item.selected = true
          })
          this.$store.commit('initCar', result.data.message)
        }

      })
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
    },
    computed: {
      setTitle(){
        var route = this.$route.path
        var title = ''
        var lowerRoute = route.toLowerCase()
        switch (lowerRoute) {
          case '/':
            title = 'vue项目-首页';
            break;
          case '/home':
            title = 'vue项目-首页';
            break;
          case '/user':
            title = 'vue项目-用户中心';
            break;
          case '/shopcar':
            title = 'vue项目-购物车';
            break;
          case '/friends':
            title = 'vue项目-我的好友';
            break;
          case '/home/newlist':
            title = 'vue项目-新闻列表';
            break;
          case '/home/photolist':
            title = 'vue项目-图片列表';
            break;
          case '/home/goodslist':
            title = 'vue项目-商品列表';
            break;
          case '/user/login':
            title = 'vue项目-登陆';
            break;
          case '/home/videolist':
            title = 'vue项目-视频列表';
            break;
          case '/user/address':
            title = 'vue项目-我的收货地址';
            break;
          case '/user/addaddress':
            title = 'vue项目-我的收货地址';
            break;
          case '/user/userinfo':
            title = 'vue项目-我的个人信息';
            break;
          case '/user/register':
            title = 'vue项目-注册账号';
            break;
        }
        if (lowerRoute.indexOf('/home/newsinfo/') === 0) {
          title = 'vue项目-新闻详情'
        }
        if (lowerRoute.indexOf('/home/photoinfo/') === 0) {
          title = 'vue项目-图片详情'
        }
        if (lowerRoute.indexOf('/home/goodsinfo') === 0) {
          title = 'vue项目-商品详情'
        }
        if (lowerRoute.indexOf('/home/goodsdesc/') === 0) {
          title = 'vue项目-商品图文'
        }
        if (lowerRoute.indexOf('/home/goodscomment/') === 0) {
          title = 'vue项目-商品评论'
        }
        if (lowerRoute.indexOf('/home/videoinfo/') === 0) {
          title = 'vue项目-视频详情'
        }
        if (lowerRoute.indexOf('/user/updateaddress/') === 0) {
          title = 'vue项目-我的收货地址'
        }
        if (lowerRoute.indexOf('/user/userinfoupdateinput/') === 0) {
          title = 'vue项目-修改我的个人信息'
        }
        if (lowerRoute.indexOf('/friends/friendschat/') === 0) {
          // console.log(this)
          title = this.$store.state.unicheng2
        }
        return title
      }
    },
    filters: {
      // formatRoute:(route)=> {
      //   //  获取当前的 路由
      //   var title = ''
      //   var lowerRoute = route.toLowerCase()
      //   switch (lowerRoute) {
      //     case '/':
      //       title = 'vue项目-首页';
      //       break;
      //     case '/home':
      //       title = 'vue项目-首页';
      //       break;
      //     case '/user':
      //       title = 'vue项目-用户中心';
      //       break;
      //     case '/shopcar':
      //       title = 'vue项目-购物车';
      //       break;
      //     case '/friends':
      //       title = 'vue项目-我的好友';
      //       break;
      //     case '/home/newlist':
      //       title = 'vue项目-新闻列表';
      //       break;
      //     case '/home/photolist':
      //       title = 'vue项目-图片列表';
      //       break;
      //     case '/home/goodslist':
      //       title = 'vue项目-商品列表';
      //       break;
      //     case '/user/login':
      //       title = 'vue项目-登陆';
      //       break;
      //     case '/home/videolist':
      //       title = 'vue项目-视频列表';
      //       break;
      //     case '/user/address':
      //       title = 'vue项目-我的收货地址';
      //       break;
      //       case '/user/addaddress':
      //       title = 'vue项目-我的收货地址';
      //       break;
      //     case '/user/userinfo':
      //       title = 'vue项目-我的个人信息';
      //       break;
      //     case '/user/register':
      //       title = 'vue项目-注册账号';
      //       break;
      //   }
      //   if (lowerRoute.indexOf('/home/newsinfo/') === 0) {
      //     title = 'vue项目-新闻详情'
      //   }
      //   if (lowerRoute.indexOf('/home/photoinfo/') === 0) {
      //     title = 'vue项目-图片详情'
      //   }
      //   if (lowerRoute.indexOf('/home/goodsinfo') === 0) {
      //     title = 'vue项目-商品详情'
      //   }
      //   if (lowerRoute.indexOf('/home/goodsdesc/') === 0) {
      //     title = 'vue项目-商品图文'
      //   }
      //   if (lowerRoute.indexOf('/home/goodscomment/') === 0) {
      //     title = 'vue项目-商品评论'
      //   }
      //   if (lowerRoute.indexOf('/home/videoinfo/') === 0) {
      //     title = 'vue项目-视频详情'
      //   }
      //   if (lowerRoute.indexOf('/user/updateaddress/') === 0) {
      //     title = 'vue项目-我的收货地址'
      //   }
      //   if (lowerRoute.indexOf('/user/userinfoupdateinput/') === 0) {
      //     title = 'vue项目-修改我的个人信息'
      //   }
      //   if (lowerRoute.indexOf('/friends/friendschat/') === 0) {
      //     // console.log(this)
      //     title = this.$store.state.unicheng2
      //   }
      //
      //   return title
      // }
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

.time {
/*  设置动画时间*/
  animation-duration: .3s;
}
  /*.v-enter {*/
  /*  !*这是进入动画之前的的状态*!*/
  /*  opacity: 0;*/
  /*  transform: translateY(100%);*/
  /*}*/

  /*.v-leave-to {*/
  /*  opacity: 0;*/

  /*  !*transform: translateY(-100%);*!*/
  /*  //设置离开的时候不占位*/
  /*  !*    这个设置的是离开动画的位置  离开的位置在左边 所有需要 设置为 -100%*!*/
  /*}*/

  /*.v-enter-active,*/
  /*.v-leave-active {*/
  /*  opacity: 1;*/
  /*  transition: all .5s ease;*/
  /*}*/
  /*.v-leave-active {*/

  /*}*/

.p-absolute{
  position: absolute;
}

  .mint-header.is-fixed {
    z-index: 9;
  }

  .main {
    min-height: 100%;
    &>div{
      width: 100%;
    }
  }

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
