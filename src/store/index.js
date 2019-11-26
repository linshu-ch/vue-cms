import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
// 获取本地存储上的car 数据  每次打开网址的时候  肯定会掉用 main.js 在调用的时候  读取car 数据
var car = JSON.parse(localStorage.getItem('car') || '[]')
car.forEach(item => { //做数据上的处理
  item.id = parseInt(item.id)
  item.count = parseInt(item.count)
})


export default new Vuex.Store({
  state: {//用于存放数据 this.$store.state.***
    car,
    isLogin: false,
    uidPic: localStorage.getItem('uidPic') || '',
    unicheng2: ''
    //件购物车中商品的数据用一个数组存储起来 在car数组中存放商品的对象 {id : 商品的id, count: 要购买的数量,price: 商品的单价, selected: 是否打开开关 布尔值}
  },
  mutations: {//用于挂载处理数据的方法  this.$store.commit('方法名称', 按需传入唯一的参数)
    //  加入购物车 将商品信息保存到car上
    addToCar(state, goodsinfo) {
      //  分析
      //  1. 如果购物车有对应的商品  只需要更新数量
      //  2. 如果没有  直接 push
      // 假设没有找到对应的商品
      goodsinfo.ctime = new Date().getTime()
      var flag = false
      state.car.some(item => { //
        if (item.id === goodsinfo.id) {
          item.count += parseInt(goodsinfo.count)
          flag = true
          return true
        }
      })
      // 如果循环完毕 还是false
      if (!flag) {
        state.car.push(goodsinfo)
      }

      // 当 更新car 之后将 car数组存储到本地的localStorage 中
      localStorage.setItem('car', JSON.stringify(state.car))
    },
    updateCar(state, goodsinfo) {
      goodsinfo.ctime = new Date().getTime()
      //  修改购物车中商品的购物值
      //  分析  修改对应商品的id 的 count
      state.car.some(item => {
        if (item.id === goodsinfo.id) {
          item.count = parseInt(goodsinfo.count)
          return true
        }
      })

      localStorage.setItem('car', JSON.stringify(state.car))
    },
    removeFormCar(state, id) {
      state.car.some((item, index) => {
        if (item.id === id) {
          state.car.splice(index, 1)
          return true
        }
      })
      localStorage.setItem('car', JSON.stringify(state.car))
    },
    updateCarSelected(state, goodsinfo) {
      state.car.some(item => {
        if (item.id === goodsinfo.id) {
          item.selected = goodsinfo.selected
          return true
        }
      })
      localStorage.setItem('car', JSON.stringify(car))
    },
    initCar(state,car){
      state.car = car
      localStorage.setItem('car', JSON.stringify(car))
    },
    //登录操作
    login(state) {
      state.isLogin = true
    },
    //  退出操作
    logout(state) {
      state.isLogin = false
    },

  //  userPic 设置
    setUserPic (state,pic) {
      state.uidPic = pic
    //   将路径保存在本地
      localStorage.setItem('uidPic',state.uidPic)
    },
    setUnicheng2(state,nicheng){
      state.unicheng2 = nicheng
    }
  },
  getters: { // 用于挂载输出包装后的数据的方法  过滤器 或计算属性 this.$store.getters.***
    getAllCount(state) {
      var c = 0;
      state.car.forEach(item => {
        c += item.count
      })
      return c
    },
    getGoodsCount(state) {//将所有商品上的id作为对象的键 跟count 做成对象的值
      var obj = {}
      state.car.forEach(item => {
        obj[item.id] = item.count
      })
      return obj
    },
    getGoodsSelected(state) {//将 car上的选中的状态 以 id为键 selected为值的方式返回给需要调用的组件
      var obj = {}
      state.car.forEach(item => {
        obj[item.id] = item.selected
      })
      return obj
    },
    getAllSelectedCount(state) {
      var sum = 0
      state.car.forEach(item => {
        if (item.selected === true) {
          sum += item.count
        }
      })
      return sum
    },
    getAllPrice(state) {
      var allPrice = 0
      state.car.forEach(item => {

        if (item.selected) {
          allPrice += item.price * item.count
        }
      })
      return allPrice
    }
  }
})
