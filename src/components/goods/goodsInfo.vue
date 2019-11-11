<template>
    <div class="goodsinfo-container">
<!--       动画小球区域-->
     <transition
     @before-enter="beforeEnter"
     @enter="enter"
     @after-enter="afterEnter"
     >
         <div  v-show="ballFlag" class="ball" ref="ball"></div>
     </transition>

        <!--        商品轮播图区域-->
        <div class="mui-card">
            <div class="mui-card-content-inner">
                <swiper :lunbotuList="imagesList" :isfull="false"></swiper>
            </div>
        </div>

        <!--        商品购买区域-->
        <div class="mui-card">
            <div class="mui-card-header">{{goodsInfo.title}}</div>
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <p class="price">
                        市场价：
                        <del>￥{{goodsInfo.market_price}}</del> &nbsp;&nbsp; 销售价 <span class="now_price">￥{{goodsInfo.sell_price}}</span>
                    </p>
                    <p>购买数量：<numbox @getcount="getSelectedCount" :stock_quantity="goodsInfo.stock_quantity"></numbox>
                    </p>
                    <p>
                        <mt-button type="primary" size="small">立即购买</mt-button>
                        <mt-button type="danger" size="small" @click="addToShopCar">加入购物车</mt-button>
                    </p>

<!--                    分析  在加入购物车的时候如何拿到数量-->
<!--                    经过分析发现 按钮属于goodsinfo页面 数字属于numberbox 组件
                            由于涉及到父子组件的嵌套问题 无法直接 在goiodsinfo 页面中获取到选中商品 的数量值
                            怎么解决  涉及到子组件想父组件传值  （事件调用机制）
                            事件调用的本质
                             父向子传达方法  子调用这个方法  同时吧数据当成参数传递给这个方法
-->
                </div>
            </div>
        </div>

        <!--        产品参数区域-->
        <div class="mui-card">
            <div class="mui-card-header">商品参数</div>
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <p>商品货号：{{goodsInfo.goods_no}}</p>
                    <p>库存情况：{{goodsInfo.stock_quantity}}件</p>
                    <p>上架时间：{{goodsInfo.add_time | dateFormat}}</p>
                </div>
            </div>
            <div class="mui-card-footer">
                <mt-button type="primary" size="large" plain @click="godesc(id)">图文介绍</mt-button>
                <mt-button type="danger" size="large" plain @click="goComment(id)">商品评论</mt-button>

            </div>
        </div>

    </div>
</template>

<script>
  import {Toast} from 'mint-ui'
  import swiper from "../subcomponents/swiper.vue";
  import numbox from "../subcomponents/goosinfo_numbox.vue";

  export default {
    data() {
      return {
        imagesList: [],
        id: this.$route.params.id,// 将路由对象中的id挂载到data上 方便后期调用
        goodsInfo: {},
        ballFlag: false,//控制小球显示和隐藏的标书费
        selectedCount: 1 //购物车上的徽标的默认数量 默认用户买一件
      }
    },
    created() {
      this.getImagesList()
      this.getGoodsInfo()
    },
    methods: {
      getImagesList() { // 获取轮播图上的
        this.$http.get('api/getthumimages1/' + this.id).then(res => {
          if (res.body.status === 0) {
            res.body.message.forEach(item => {
              item.img = item.src
            })
            this.imagesList = res.body.message
          } else {
            Toast('获取图片失败')
          }
        })
      },
      //  获取商品详情参数
      getGoodsInfo() {
        this.$http.get('api/goods/getinfo/' + this.id).then(res => {
          if (res.body.status === 0){
            this.goodsInfo = res.body.message
          }
        })
      },
      godesc(id) {
      //  点击使用编程式导航 跳转到图文介绍页面
        this.$router.push({name: 'goodsdesc', params: { id }})
      },
      goComment(id) {
      //  点击跳转到 商品评论区域
        this.$router.push({name: 'goodscomment', params: { id }})

      },
      //加入购物车操作
      addToShopCar() {//控制小球的显示和隐藏
        this.ballFlag = !this.ballFlag
        //拼接处一个要保存到 store 中car 数组的购物 商品信息对象
        var goodsinfo = {
          id: this.id,
          count: this.selectedCount,
          price: this.goodsInfo.sell_price,
          selected: true
        }
        //调用 store 中的 mutations  的addToCar
        this.$store.commit('addToCar', goodsinfo)
      },
      // 动画的钩子函数
      beforeEnter(el) {
        el.style.opacity = 1
        el.style.transform = 'translate(0,0)'
      },
      enter(el, done) {
        el.offsetWidth
        el.style.opacity = 1
        // 小球动画 优化思路
        // 不准确的原因 我们把球位移的位置 是写死的  不会受页面的滚动 改变而改变 也不ui随着页面 宽度的大小改变而改变
        // 只要是分辨率改了 或者滚动了之后问题就出现的  、
        // 需要根据不同情况 动态计算这个坐标值
        // 得到徽标的横纵坐标  在得到小球的横纵坐标 然后 分别为横纵坐标求差  的到就是需要位移的距离
        // 如何获取徽标跟小球的位置
        // 使用dom的方法   getBoundingClientRect() 就能获取元素到页面最顶部的真实距离
        // 获取小球在页面中的位置
        const ballPosition = this.$refs.ball.getBoundingClientRect()

        // 徽标是属于app如果使用$ref  这个对象在App组件中 在app中将这个对象传过来 这个方式在这里使用不方便
        const badgePosition = document.getElementById('badge').getBoundingClientRect()
         var y = badgePosition.top - ballPosition.top
         var x = badgePosition.left - ballPosition.left



        el.style.transform = `translate(${x}px, ${y}px)`
        el.style.transition = 'all 0.5s cubic-bezier(.4,-0.3,1,.68)'
        done()

      },
      afterEnter(el) {
        this.ballFlag = !this.ballFlag

      },

      // 定义向子组件传递方法  通过这个方法  在input文本框改变的使用 给父组件传值
      getSelectedCount(count) {
        this.selectedCount = count
        // console.log(this.selectedCount)
      }
    },
    components: {
      swiper,
      numbox
    }
  }
</script>

<style scoped lang="less">
    .goodsinfo-container {
        background-color: #eee;
        overflow: hidden;
        position: relative;
    }

    .now_price {
        color: red;
        font-size: 16px;
        font-weight: bold;
    }

    .mui-card-footer {
        display: block;

        button {
            margin: 15px 0;
        }
    }
    .ball {
        width: 15px;
        height: 15px;
        border-radius: 50%;
        background-color: red;
        position: absolute;
        z-index: 99;
        top: 360px;
        left: 140px;
    }

    @media screen and (max-width: 992px) and (min-width: 768px){
        .ball{
            top: 605px;
        }
    }
    @media screen and (max-width: 1200px) and (min-width: 992px){
        .ball{
            top: 750px;
        }
    }
    @media screen and (min-width: 1200px){
        .ball{
            top: 750px;
        }
    }

</style>