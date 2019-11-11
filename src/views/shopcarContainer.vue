<template>
    <div class="shopcar-container">
        <div class="goods-list">
            <!--        -->
            <div class="mui-card" v-for="(item, i) in goodsList" :key="item.id">
                <div class="mui-card-content">
                    <div class="mui-card-content-inner">
                        <!--
                        这里store不能起到双向数据绑定的作用 这是一个计算的方法  不会修改到原有的属性
                            但是可以通过这个变量 获取到最新的状态
                           这个mintui组件有一个监听状态改变的事件 change
                           -->
                        <mt-switch
                                v-model="$store.getters.getGoodsSelected[item.id]"
                                @change="selectedChanged(item.id,$store.getters.getGoodsSelected[item.id])"></mt-switch>
                        <img :src="item.img_src"
                             alt="">
                        <div class="info">
                            <h1>{{item.title}}</h1>
                            <p>
                                <span class="price">￥{{item.sell_price}}</span>
                                <numbox :initcount="$store.getters.getGoodsCount[item.id]" :id="item.id"></numbox>
                                <!--                                // 如何从购物车中获取 对应的 count 数量-->
                                <!--                                //可以创建一个空对象 循环遍历购物车中的所有商品数据，把循环商品的id 最为对象的键  把count作为值 这样吧所有的商品循环一遍就会得到一个对象-->
                                <a href="#" @click.prevent="remove(item.id,i)">删除</a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!--        结算区域-->
        <div class="mui-card">
            <div class="mui-card-content">
                <div class="mui-card-content-inner jiesuan">
                    <div class="left">
                        <p>总计（不包含运费）</p>
                        <p>已勾选商 <span class="red">{{$store.getters.getAllSelectedCount}}</span>件 总计 ￥<span class="red">{{$store.getters.getAllPrice}}</span></p>
                    </div>
                    <mt-button type="danger">去结算</mt-button>
                </div>
            </div>
        </div>
    </div>

</template>
<script>
  import numbox from "@/components/subcomponents/shopcar_numbox.vue";

  export default {
    data() {
      return {
        goodsList: []//购物车中所有商品的数据
      }
    },
    methods: {
      //  发起ajax 请求 获取数据
      getShopCarList() {
        //获取store 中car 中的 所有的id 用 , 拼接出 , 分割 的字符串
        var idArr = []
        this.$store.state.car.forEach(item => {
          idArr.push(item.id)
        })
        // 如果idArr 是一个空的数组 则没有必要请求拿到数据   直接 跳出函数
        if (idArr.length <= 0) return
        this.$http.get('api/goods/getshopcarlist/' + idArr.join(',')).then(res => {

          if (res.body.status === 0) {
            this.goodsList = res.body.message
          }
        })
      },
      //  删除商品对象
      remove(id, i) {
        this.goodsList.splice(i, 1)
        this.$store.commit('removeFormCar', parseInt(id))
      },

      selectedChanged(id, selected) {//单选框 状态改变事件处理函数
        this.$store.commit('updateCarSelected', {id, selected})
      }

    },
    created() {
      this.getShopCarList()
    },
    components: {
      numbox
    }
  }
</script>
<style lang="less" scoped>
    .shopcar-container {
        background-color: #eeeeee;
        overflow: hidden;

        .goods-list {
            .mui-card-content-inner {
                display: flex;
                align-items: center;
            }

            img {
                width: 60px;
                height: 60px;
            }

            h1 {
                font-size: 13px;
            }

            .info {
                display: flex;
                flex-direction: column; //排列为垂直
                justify-content: space-between; //贴边
                .price {
                    color: red;
                    font-weight: bold;
                }
            }
        }

        .jiesuan {
            display: flex;
            justify-content: space-between;
            align-items: center;

            .red {
                color: red;
            }
        }
    }
</style>
