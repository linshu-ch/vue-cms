<template>
  <div class="register-container">
    <input class="uname" type="text" name="uname" v-model="uname" placeholder="请填入3~8位的用户名英文或数字的用户名"/>
    <input class="nicheng" type="text" name="nicheng" v-model="nicheng" placeholder="请输入您的昵称"/>

    <user-password-input
      v-on:handleChange="handleChangePwd"
      v-bind:placeholder="'请输入密码'"
      v-bind:isDangerBorder="false"
    ></user-password-input>
    <user-password-input
      v-on:handleChange="handleChangeRePwd"
      v-bind:placeholder="'请再次输入密码'"
      v-bind:isDangerBorder="isDengyu"
    ></user-password-input>


    <div class="tel-box">
      <input class="tel" type="number" name="tel" v-model="tel" placeholder="请输入您的手机号码"/>
      <mt-button type="primary" size="small" @click="handleGetTelCode" :disabled="isDisabled">{{text}}</mt-button>
    </div>
    <input type="number" name="telCaptcha" v-model="telCaptcha" placeholder="请输入6位数的验证码">
    <div class="captcha">
      <input type="text" v-model="captchaVal" placeholder="请输入验证码">
      <span v-html="captchaData" @click="getCaptcha"></span>
    </div>

    <mt-button type="primary" size="large" @click="handleRegister">注册</mt-button>
  </div>
</template>

<script>
  import {Toast, MessageBox} from 'mint-ui'
  import fun from '@/common'
  import userPasswordInput from '@/components/subcomponents/user-passwordInput.vue'

  export default {
    data() {
      return {
        tel: '',
        uname: '',
        nicheng: '',
        upwd: '',
        reupwd: '',
        isDengyu: false,
        captchaData: '',
        captchaVal: '',
        text: '获取验证码',
        timeId: null,
        i: 60,
        isDisabled: false,
        telCaptcha: '',
      }
    },
    methods: {
      // 获取验证码操作
      handleChangePwd(now){
        this.upwd = now
      },
      handleChangeRePwd(now){
        this.reupwd = now
      },
      handleGetTelCode() {
        if (!/^[0-9]{11}$/.test(this.tel)) {
          return Toast('请输入真确的手机号码')
        }
        this.axios.get('api/getTelCaptcha', {
          params: {
            tel: this.tel
          }
        })
          .then(result => {
            console.log('验证码：' + fun.getCookie().telCaptcha + ',有效时间5分钟');
            if (result.data.status === 0) {
              this.isDisabled = true
              Toast('获取成功')
              this.timeId = window.setInterval(() => {
                this.i--
                if (this.i < 0) {
                  this.isDisabled = false
                  window.clearInterval(this.timeId)
                  this.timeId = null
                  this.text = '获取手机验证码'
                } else {
                  this.text = `重新获取(${this.i})`
                }


              }, 1000)
            }
          })
      },
      handleRegister() {
        //   验证表单信息
        if (this.upwd !== this.reupwd) {
          return Toast('您输入的两次密码不相同')
        }
        if (!/^[0-9A-Za-z]{3,8}$/.test(this.uname)) {
          return Toast('请输入3~8位数字或字母的用户名')
        }
        if (!/^[0-9]{11}$/.test(this.tel)) {
          return Toast('请输入真确的手机号码')
        }
        if (!/^[a-zA-Z0-9./,;'\\]{3,18}$/.test(this.upwd)) {
          return Toast('密码必须由是英文、数字和.，/;\ 等符号组成的3到18位的字符')
        }
        if (!this.nicheng) {
          return Toast('昵称不能为空')
        }
        //  验证码验证
        if (this.captchaVal.toLowerCase() !== fun.getCookie().captcha) {
          return Toast('验证码错误')
        }
        //  手机验证码验证
        if (this.telCaptcha !== fun.getCookie().telCaptcha) {
          return Toast('手机验证码错误')
        }

        //   发送请求
        this.axios.post('api/register', {
          uname: this.uname,
          password: this.upwd,
          tel: this.tel,
          nicheng: this.nicheng,
          captcha: this.captchaVal.toLowerCase(),
          telCaptcha: this.telCaptcha

        }).then(result => {
          Toast(result.data.message)
          if (result.data.status === 0) {
            //   显示消息提示框 跳转到 个人中心
            MessageBox({
              title: '注册成功',
              message: '是否跳转到个人中心',
              showCancelButton: true,
              cancelButtonText: '留在当前页面'
            }).then(active => {
              if (active === 'confirm') {
                this.$router.push('/user')
              }
            })
          }
        })
      },
      getCaptcha() {
        this.axios('api/getCaptcha')
          .then(result => {
            this.captchaData = result.data
          })
      }
    },
    created() {
      this.getCaptcha()
    },
    watch: {
      //   验证表单的一致性
      reupwd(now, old) {
        if (now !== this.upwd) {
          this.isDengyu = true
        } else {
          this.isDengyu = false
        }
      }
    },
    components: {
      'userPasswordInput': userPasswordInput
    }
  }
</script>

<style scoped lang="scss">
  .register-container {
    .uname {
      margin-top: 20px;
    }
    .margin-b-15 {
      margin-bottom: 15px;
    }

    /*.password-show {*/
    /*  position: relative;*/

    /*  .is-show-pwd {*/
    /*    color: #8F8F94;*/
    /*    position: absolute;*/
    /*    right: 15px;*/
    /*    top: 8px;*/

    /*    &.active {*/
    /*      color: #007aff;*/
    /*    }*/
    /*  }*/
    /*}*/

    .tel-box,
    .captcha {
      display: flex;

      input {
        flex: 1;
        margin-right: 10px;
      }
    }
  }

</style>
