<template>
  <div class="user-container">
    <ul class="mui-table-view">
      <li class="mui-table-view-cell">
        <router-link class="mui-navigate-right user-info" to="/user/userInfo">
          <div class="user-pic-box">
            <img :src="$store.state.uidPic?URL +$store.state.uidPic: URL + '/images/user/defaultpic.jfif'" alt="">
          </div>
          <div class="user-msg">
            <p class="mui-ellipsis">用户名：{{data.uname}}</p>
            <p class="mui-ellipsis">昵称：{{data.nicheng}}</p>
            <p class="mui-ellipsis">绑定的手机号码: {{data.tel}}</p>
          </div>
        </router-link>
      </li>
      <li class="mui-table-view-cell">
        <router-link to="/user/address" class="mui-navigate-right">
          收货地址管理
        </router-link>
      </li>
      <li class="mui-table-view-cell user-order">
        <div class="mui-card">
          <div class="mui-card-header">
            <router-link class="order-link mui-navigate-right" to="#">
              <span>我的订单</span> <span class="order-link-right">查看所有订单</span>
            </router-link>
          </div>
          <div class="mui-card-content">
            <div class="mui-card-content-inner">
              <ul class="user-order-nav">
                <li>
                  <router-link class="order-nav-link" to="#">
                    <span class="iconfont icon-daifukuan">
                       <span class="mui-badge badge">37</span>
                    </span>
                    <span>待付款</span>
                  </router-link>
                </li>
                <li>
                  <router-link class="mui-ellipsis order-nav-link" to="#">
                    <span class="iconfont icon-daifahuo">
                       <span class="mui-badge badge">37</span>
                    </span>
                    <span>待发货</span>
                  </router-link>
                </li>
                <li>
                  <router-link class="mui-ellipsis order-nav-link" to="#">
                    <span class="iconfont icon-daishouhuo">
                       <span class="mui-badge badge">37</span>
                    </span>
                    <span>待收货</span>
                  </router-link>
                </li>
                <li>
                  <router-link class="mui-ellipsis order-nav-link" to="#">
                    <span class="iconfont icon-pingjia">
                       <span class="mui-badge badge">37</span>
                    </span>
                    <span>评价</span>
                  </router-link>
                </li>
                <li>
                  <router-link class="mui-ellipsis order-nav-link" to="#">
                    <span class="iconfont icon-tuihuo">
                       <span class="mui-badge badge">37</span>
                    </span>
                    <span>退货/售后</span>
                  </router-link>
                </li>
              </ul>
            </div>
          </div>
        </div>

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
  import common from '@/common'

  export default {
    data() {
      return {
        data: {}
      }
    },
    methods: {
      getUserInfo() {
        this.axios.get('api/userInfo').then(result => {
          common.noLogin(result.data.status, MessageBox, this)
          if (result.data.status === 0) {
            this.data = result.data.message
            this.$store.commit('setUserPic', this.data.pic)
          }
        })
      },
      logout() {
        //  发送请求 退出登录
        this.axios.post('api/vue/logout').then(result => {
          if (result.data.status === 0) {
            this.$store.commit('logout')
            this.$store.commit('setUserPic','')
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

    .user-order {
      padding: 0;

      .mui-card {
        /*margin: 0;*/

        .order-link {
          width: 100%;
          display: flex;
          justify-content: space-between;
          color: #000;

          .order-link-right {
            color: #6d6d72;
            font-size: 12px;
            margin-right: 20px;
          }
        }

        .mui-card-content-inner {
          padding: 0;

          .user-order-nav {
            display: flex;
            flex-direction: row;
            list-style: none;
            color: #007aff;
            font-size: 12px;

            padding: 0;

            li {
              flex: 1;
              padding-top: 5px;

              .order-nav-link {
                height: 50px;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                text-align: center;

                .iconfont {
                  font-size: 24px;
                  position: relative;

                  .badge {
                    padding: 2px;
                    position: absolute;
                    background-color: #007aff;
                    color: #fafafa;
                    font-size: 12px;
                    top: -5px;
                    right: -10px;
                  }
                }
              }

            }
          }
        }
      }
    }
  }
</style>
