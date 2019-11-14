<template>
  <div class="app-login">
    <form>

      <input type="text" name="uname" v-model="uname" placeholder="请填入3~8位的用户名英文或数字的用户名"/>
      <br/>
      <input type="password" name="upwd" v-model="upwd" placeholder="请输入密码"/>
      <br/>
      <mt-button type="primary" size="large" @click="btnLogin">登录</mt-button>
    </form>
  </div>
</template>


<script>
  import {Toast ,Indicator,MessageBox } from 'mint-ui'

  export default {
    name: "login",
    data() {
      return {
        uname: '',
        upwd: '',
      }
    },
    methods: {
      btnLogin() {
        // 表单验证
        var uname = this.uname
        var upwd = this.upwd
        if (!/^[0-9A-Za-z]{3,8}$/.test(uname)) {
          return Toast('请填入3~8位的用户名英文或数字的用户名')
        }
        if (!/^[a-zA-Z0-9./,;'\\]{3,18}$/.test(upwd)) {
          return Toast('密码必须由是英文、数字和.，/;\ 等符号组成的3到18位的字符')
        }
        //  发送ajax 验证登录 掉用加载组件
        Indicator.open()
        this.axios.post('/api/login', {
          uname, password: upwd
        }).then(result => {
          Indicator.close();
          Toast(result.data.message)
         if(result.data.status === 0) {
         //  登录成功 回跳或返回主页操作
           MessageBox({
             title: '登录成功',
             message: '是否跳转到上一个页面？',
             showCancelButton: true,
             confirmButtonText: '确定',
             cancelButtonText: '返回用户中心'
           }).then((active)=> {
             if(active === 'confirm') {
             //  路由跳转
               this.$router.go(-1)
             }else {
               this.$router.push('/user')
             }
           })
         }
        })
      }
    }
  }
</script>

<style scoped lang="scss">
.app-login form {
  margin-top: 20px;
  &:before{
    content: '';
    display: table;
    height: 0;
  }
}
</style>
