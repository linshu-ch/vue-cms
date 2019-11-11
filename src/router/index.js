import Vue from 'vue'
import VueRouter from 'vue-router'

//实现路由懒加载
const homeContainer = () => import('@/views/homeContainer.vue')
const memberContainer = () => import('@/views/memberContainer.vue')
const searchContainer = () => import('@/views/searchContainer.vue')
const shopcarContainer = () => import('@/views/shopcarContainer.vue')
const newListContainer = () => import('@/components/new/newList.vue')
const newsInfo = () => import('@/components/new/newsInfo.vue')
const photoList = () => import('@/components/photos/photoList.vue')
const photoInfo = () => import('@/components/photos/photoInfo.vue')
const goodsList = () => import('@/components/goods/goodsList.vue')
const goodsInfo = () => import('@/components/goods/goodsInfo.vue')
const goodsDesc = () => import('@/components/goods/goodsDesc.vue')
const goodsComment = () => import('@/components/goods/goodsComment.vue')
const videoList = () => import('@/components/video/videoList.vue')
const videoInfo = () => import('@/components/video/videoInfo.vue')

Vue.use(VueRouter)

const routes = [{
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    component: homeContainer
  },
  {
    path: '/member',
    component: memberContainer
  },
  {
    path: '/search',
    component: searchContainer
  },
  {
    path: '/shopcar',
    component: shopcarContainer
  },
  {
    path: '/home/newList',
    component: newListContainer
  },
  {
    path: '/home/newsinfo/:id',
    component: newsInfo
  },
  {
    path: '/home/photoList',
    component: photoList
  },
  {
    path: '/home/photoInfo/:id',
    component: photoInfo
  },
  {
    path: '/home/goodslist',
    component: goodsList
  },
  {
    path: '/home/goodsinfo/:id',
    component: goodsInfo,
    name: 'goodsinfo'
  },
  {
    path: '/home/goodsdesc/:id',
    component: goodsDesc,
    name: 'goodsdesc'
  },
  {
    path: '/home/goodscomment/:id',
    component: goodsComment,
    name: 'goodscomment'
  },
  {
    path: '/home/videolist',
    component: videoList,
    name: 'videolist'
  },
  {
    path: '/home/videoInfo/:id',
    component: videoInfo,
    name: 'videoInfo',
    props: true
  }
]

const router = new VueRouter({
  routes
})

export default router