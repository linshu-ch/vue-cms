<template>
    <div class="content">
        <vue-element-loading :active="isActive" :is-full-screen="true" spinner="spinner" color="#FF6700"
                             background-color="rgba(255,255,255,0)"/>
        <!--        顶部活动 删除类  mui-fullscreen 这个是全局覆盖的类-->
        <div id="slider" class="mui-slider">
            <div id="sliderSegmentedControl"
                 class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
                <div class="mui-scroll">
                    <!--                这里选中的时候 scroll 插件会自动的为我们加上切换的样式-->
                    <a
                            :class="['mui-control-item' ,item.id === 0 ? ' mui-active': '']"
                            v-for="item in cates" :key="item.id" @click="tabCate(item.id)"
                    >
                        {{ item.title }}
                    </a>

                </div>
            </div>
        </div>
        <!--            图片列表区域-->
        <ul class="photo-list">
            <router-link v-for="item in list" :key="item.id" :to="'/home/photoinfo/' + item.id" tag="li">
                <img v-lazy="item.img_url">
                <div class="info">
                    <h1 class="title">{{ item.title }}</h1>
                    <h1 class="zhaiyao">{{ item.zhaiyao }}</h1>
                </div>
            </router-link>
        </ul>
    </div>
</template>
<script>
  // 导入
    import mui from '@/assets/js/mui.min.js'
  import {Toast} from 'mint-ui'
  export default {
    data() {
      return {
        cates: [],
        list: [],
        cateId: 0,
          isActive: false
      }
    },
    created() {
      this.getAllCategory()
      this.getImagesById()
    },
    mounted() {
      //当组件中dom结构被渲染好并放到页面上中后，会执行这个钩子函数
      //如果要操作dom元素 最要是在页面加载完之后  确保操作的dom元素是最新的
      //确保能正确的操作到dom元素
      //    初始化控件
      mui('.mui-scroll-wrapper').scroll({
        deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
      });
    },
    methods: {
      getAllCategory() {
        //  获取所有图片分类
          this.isActive = true
        this.axios.get('api/getimgcategory').then(res => {
            this.isActive = false
          if (res.data.status === 0) {
            //手动拼接处 ‘全部’ 分类
            res.data.message.unshift({title: '全部', id: 0})
            this.cates = res.data.message
          } else {
            Toast('获取数据失败')
          }
        })
      },

      getImagesById() {
          this.isActive = true
        this.axios.get('api/getimages/' + this.cateId).then(res => {
            this.isActive = false

          if (res.data.status === 0) {
            this.list = res.data.message
          } else {
            Toast('获取数据失败')
          }
        })
      },
      tabCate(id) {
        this.cateId = id
        this.getImagesById()
      }
    }
  }
</script>
<style lang="less" scoped>
    * {
        /*解决谷歌滑动警告*/
        touch-action: pan-y;
    }

    .photo-list {
        list-style: none;
        margin: 0;
        padding: 10px;

        li {

            position: relative;
            /*font-size: 0;*/
            padding-bottom: 0;
            margin-bottom: 10px;
            background-color: #ccc;
            text-align: center;
            box-shadow: 0 0 4px #999;

            img[lazy="loading"] {
                width: 40px;
                height: 300px;
                margin: auto;
            }

            img {
                width: 100%;
                /*取消3像素*/
                vertical-align: middle;
            }

            .info {
                text-align: left;
                background-color: rgba(0, 0, 0, .3);
                color: #fafafa;
                position: absolute;
                bottom: 0;
                left: 0;
                width: 100%;
                padding: 10px;
                max-height: 84px;

                .title {
                    font-size: 14px;
                }

                .zhaiyao {
                    font-size: 12px;
                    font-weight: 400;
                    text-indent: 2em;
                }
            }

        }
    }
</style>
