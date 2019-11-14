<template>
  <div class="user-container">
    <ul class="mui-table-view">
      <li class="mui-table-view-cell">
        <a class="mui-navigate-right user-info">
          <div class="user-pic-box">
            <img :src="data.pic?URL +data.pic: URL + '/images/user/defaultpic.jfif'" alt="">
          </div>
          <div class="user-msg">
            <p class="mui-ellipsis">用户名：{{data.uname}}</p>
            <p class="mui-ellipsis">昵称：{{data.nicheng}}</p>
            <p class="mui-ellipsis">绑定的手机号码: {{data.tel}}</p>
          </div>
        </a>
      </li>
      <li class="mui-table-view-cell">
        <router-link to="/user/address" class="mui-navigate-right">
          收货地址管理
        </router-link>
      </li>
      <li class="mui-table-view-cell">
        <router-link class="mui-navigate-right" to="#">
          订单管理
        </router-link>
      </li>
      <li class="mui-table-view-cell">
        <router-link class="mui-navigate-right" to="/shopcar">
          我的购物车
        </router-link>
      </li>
      <li class="mui-table-view-cell">
        <mt-button type="danger" size="large" @click="logout">退出登录</mt-button>
      </li>
    </ul>
  </div>
</template>
<script>
  import {MessageBox} from 'mint-ui'

  export default {
    data() {
      return {
        data: {}
      }
    },
    methods: {
      getUserInfo() {
        this.axios.get('api/userInfo').then(result => {
          if (result.data.status === -1) {
            MessageBox({
              title: '您尚未登录',
              message: '是否前往登录?',
              showCancelButton: true,
              cancelButtonText: '返回上一页'
            }).then(active => {
              if (active === 'cancel') {
                this.$router.go(-1)
              } else {
                this.$router.push('/user/login')
              }
            })
          } else {
            this.data = result.data.message
          }
        })
      },
      logout() {
        //  发送请求 退出登录
        this.axios.post('api/vue/logout').then(result => {
          if (result.data.status === 0) {
            MessageBox({
              title: '您以成功退出登录',
              message: '是否前往登录?',
              showCancelButton: true,
              cancelButtonText: '返回上一页'
            }).then(active => {
              if (active === 'cancel') {
                this.$router.go(-1)
              } else {
                this.$router.push('/user/login')
              }
            })
          }
        })
      }
    },
    created() {
      this.getUserInfo()
    }
  }

</script>
<style lang="scss" scoped>
  .user-container {
    .user-info {
      display: flex;
      align-items: center;

      .user-pic-box {
        box-sizing: border-box;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        margin-right: 10px;
        overflow: hidden; // 如果图片过长 只显示上部分
        img {
          width: 100%;
          height: auto;
        }
      }

      .user-msg {
        box-sizing: border-box;
        flex-grow: 1;
        margin-right: 20px;
      }
    }
  }
</style>
