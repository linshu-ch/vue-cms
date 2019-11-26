<template>
  <div class="app-login">
    <input class="uname" type="text" name="uname" v-model="uname" placeholder="用户名或手机号"/>
    <div class="password">
      <input :type="isShowPwd? 'text': 'password'" name="upwd" v-model="upwd" placeholder="请输入密码"/>
      <a class="is-show-pwd" :class="isShowPwd?'active': ''" href="javascript:void(0);" @click="isShowPwd = !isShowPwd"><span
        class="mui-icon mui-icon-eye"></span></a>
    </div>
    <mt-button type="primary" size="large" class="margin-b-15" @click="btnLogin">登录</mt-button>
    <mt-button type="danger" size="large" @click="goRegister">前往注册</mt-button>
  </div>
</template>


<script>
  import {Toast, MessageBox} from 'mint-ui'

  export default {
    name: "login",
    data() {
      return {
        uname: '',
        upwd: '',
        isShowPwd: false
      }
    },
    methods: {
      btnLogin() {
        // 表单验证
        var uname = this.uname
        var upwd = this.upwd
        if (!(/^[0-9A-Za-z]{3,8}$/.test(uname) || /^[0-9]{11}$/.test(uname))) {
          return Toast('请填入3~8位的用户名英文或数字的用户名或手机号码')
        }
        if (!/^[a-zA-Z0-9./,;'\\]{3,18}$/.test(upwd)) {
          return Toast('密码必须由是英文、数字和.，/;\ 等符号组成的3到18位的字符')
        }
        //  发送ajax 验证登录 掉用加载组件
        this.axios.post('/api/login', {
          uname, password: upwd, car: this.$store.state.car
        })
          .then(result => {
            if (result.data.status !== 0) {
              Toast(result.data.message)
            }
            if (result.data.status === 0) {
              //  登录成功 回跳或返回主页操作
              // 设置状态
              // 登录成功显示框
              this.$store.commit('login')
              MessageBox({
                title: '登录成功',
                message: '是否跳转到上一个页面？',
                showCancelButton: true,
                confirmButtonText: '确定',
                cancelButtonText: '返回用户中心'
              })
                .then((active) => {
                  if (active === 'confirm') {
                    //  路由跳转
                    this.$router.go(-1)
                  } else {
                    this.$router.push('/user')
                  }
                })
              //  在登录的时候获取购物车数据
              return this.axios.get('api/getShopCar')

            }
          })
          // 重新获取数据
          .then(result => {
            if (result && result.data.status === 0) {
              result.data.message.forEach(item => {
                item.id = item.g_id
              })
              this.$store.commit('initCar', result.data.message)
            }
          })
      },
      goRegister() {
        this.$router.push({name: 'register'})
      },
      showPwd() {
        this.isShowPwd = !this.isShowPwd
      }

    },
  }
</script>

<style scoped lang="scss">
  .app-login {
    .uname {
      margin-top: 20px;
    }

    .margin-b-15 {
      margin-bottom: 15px;
    }

    .password {
      position: relative;

      .is-show-pwd {
        color: #8F8F94;
        position: absolute;
        right: 15px;
        top: 8px;

        &.active {
          color: #007aff;
        }
      }
    }
  }
</style>
