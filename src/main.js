import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

//导入 vue-resource //发起请求
import VueResource from 'vue-resource'
//安装 vue-resource
Vue.use(VueResource)

// 设置请求地址和请求格式
Vue.http.options.root = 'http://192.168.1.107/'
Vue.http.options.emulateJSON = true


// 全局是使用mint-ui 因为在使用懒加载 组件是  没有样式 需要 全局使用
import MintUi from 'mint-ui'
import 'mint-ui/lib/style.css'
Vue.use(MintUi)

import monent from 'moment'

import VuePreview from 'vue-preview'
//过载到vue中
Vue.use(VuePreview, {
  fullscreenEl: false, // 关闭全屏按钮
  shareEl: false,// 分享小图标打开或者关闭
  tapToClose: true, //点击关闭功能
   bgOpacity: 1, //设置设置背景 的透明度
})

// 使用 vue-element-loading 加载效果
import VueElementLoading from 'vue-element-loading'
Vue.component('VueElementLoading', VueElementLoading)





//定义全局的过滤器
Vue.filter('dateFormat', function (dateStr, pattern = "YYYY-MM-DD HH:mm:ss") {
  // dataStr
  return monent(dateStr).format(pattern)
})


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
