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
              <p class="info-footer">
                <span class="price">￥{{item.sell_price}}</span>
                <numbox :initcount="$store.getters.getGoodsCount[item.id]" :id="item.id"></numbox>
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
            <p>已勾选商 <span class="red">{{$store.getters.getAllSelectedCount}}</span>件 总计 ￥<span class="red">{{$store.getters.getAllPrice}}</span>
            </p>
          </div>
          <mt-button type="danger">去结算</mt-button>
        </div>
      </div>
    </div>
  </div>

</template>
<script>
  import {MessageBox, Toast} from 'mint-ui'
  import numbox from "@/components/subcomponents/shopcar_numbox.vue";
  import common from '@/common'

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
        console.log(1)
        this.axios.get('api/goods/getshopcarlist/' + idArr.join(',')).then(res => {

          if (res.data.status === 0) {
            this.goodsList = res.data.message
          }
        })
      },
      //  删除商品对象
      remove(id, i) {
        this.goodsList.splice(i, 1)
        ;this.$store.commit('removeFormCar', parseInt(id))
        if(this.$store.state.isLogin){
          this.axios.post('api/delCarByGid', {g_id: parseInt(id)})
            .then(result => {
              common.updateCarMsg(result, MessageBox, Toast)
            })
        }
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
        flex-grow: 1; // 放大
        flex-direction: column; //排列为垂直
        justify-content: space-around; //贴边
        h1 {
          padding-left: 10px;
        }

        .price {
          color: red;
          font-weight: bold;
        }

        .info-footer {

          margin: 0;
          display: flex;
          justify-content: space-around;
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
