<template>
<div>
    <div class="goods-list">
        <!--        商品列表-->
        <!--        <router-link :to="'/home/goodsinfo/' + item.id" class="goods-item" v-for="item in goodsList" :key="item.id" tab="div">-->
        <!--            <img :src="item.img_src" alt="">-->
        <!--            <h1 class="title">{{item.title}}</h1>-->
        <!--            <div class="info">-->
        <!--                <p class="price">-->
        <!--                    <span class="now">￥{{item.sell_price}}</span>-->
        <!--                    <span class="old">￥{{item.market_price}}</span>-->
        <!--                </p>-->
        <!--                <p class="sell">-->
        <!--                    <span>热卖中</span>-->
        <!--                    <span>剩{{item.stock_quantity}}件</span>-->
        <!--                </p>-->
        <!--            </div>-->
        <!--        </router-link>-->
        <!--        在网页中有两种跳转方式 方式1 使用a标签的形式跳转   标签跳转-->
        <!--        方式2 使用 window.location.href 的形式跳转 编程式导航 -->

        <div class="goods-item" v-for="item in goodsList" :key="item.id" @click="goDetil(item.id)">
            <img :src="item.img_src" alt="">
            <h1 class="title">{{item.title}}</h1>
            <div class="info">
                <p class="price">
                    <span class="now">￥{{item.sell_price}}</span>
                    <span class="old">￥{{item.market_price}}</span>
                </p>
                <p class="sell">
                    <span>热卖中</span>
                    <span>剩{{item.stock_quantity}}件</span>
                </p>
            </div>
        </div>
    </div>
    <!--    加载跟多-->
    <mt-button v-if="isShowBtn" type="danger" size="large" @click="loadMore" :disabled="flag">加载更多</mt-button>
</div>
</template>
<script>
  import {Toast} from 'mint-ui'
    export default {
      data() {
        return {
          goodsList: [],
          pageIndex: 1,
          flag: false,
            isShowBtn: false
        }
      },
      created() {
        this.getGoodsList()
      },
      methods: {
        getGoodsList () {
          // 发起ajax 请求 goodsList 获取列表

          this.axios.get('api/getgoods?pageindex=' + this.pageIndex).then(res => {
              this.isShowBtn = true
            if (res.data.status === 0){
              this.goodsList = this.goodsList.concat(res.data.message)
            }else if(res.data.status === 2){
              this.flag = true
              Toast('没有更多商品')
            }else {
              Toast('获取商品列表失败')
            }
          })
        },
        loadMore() {
          this.pageIndex ++
          this.getGoodsList()
        },
        goDetil(id){
          // 注意 一定要区分 this.$route 和 this.$router 这两个对象
          // 其中 this.$route 是路由参数对象 所有路由中的参数 params ,query 都属于他
          // this.$router 是路由导航对象 使用他可以方便的使用js代码 实现路由的跳转到新的URL地址中
          // 1. 最简单的方式
          // this.$router.push( '/home/goodsinfo/' + id)
          //   2. 传递对象
          // this.$router.push({path: '/home/goodsinfo/' + id})
          //   3. 传递命名的路由  这里是路由中的路由表 的name 属性值   不是路由的路径
          this.$router.push({name: 'goodsinfo', params: { id }})




        }
      }
    }
</script>
<style lang="less" scoped>
    .velmld-parent {
        width: 100%;
    }
.goods-list {
    display: flex;
    /*弹式布局*/
    /* 子容器 轴线上 排列 自动换行*/
    flex-wrap: wrap;
    /* 左右 给个padding*/
    padding: 6px;
    /* 子容器贴边对齐 */
    justify-content: space-between;
    /*给*/
    .goods-item {
        width: 49%;
        border: 1px solid #ccc;
        box-shadow: 0 0 8px #ccc;
        margin: 3px 0;
        padding: 2px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        img{
            width: 100%;
        }
        .title{
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            font-size: 14px;
        }
        .info{
            background-color: #eee;

            p {
                margin: 0;
                padding: 5px;
            }
            .price{
                .now{
                    color: red;
                    font-weight: bold;
                    font-size: 16px;
                }
                .old{
                    text-decoration: line-through;
                    font-size: 12px;
                    margin-left: 10px;
                }
            }
            .sell{
                display: flex;
                justify-content: space-between;
            }
        }
    }
}
</style>
