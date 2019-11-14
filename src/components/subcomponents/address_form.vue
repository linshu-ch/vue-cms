<template>
  <div class="form-container">
    <input type="text" v-model="user" placeholder="收货人">
    <input type="text" v-model="tel" placeholder="手机号码">
    <input type="text" placeholder="所在地区" readonly @click="isShowDistpicker = true" :value="sheng+city+qu">
    <!--    选择框-->
    <div class="address-selector" :class="isShowDistpicker?'show': 'hide'" @click="close">
      <span class="mui-icon mui-icon-closeempty close-address-selector" @click="isShowDistpicker=false"></span>
      <v-distpicker type="mobile" :province="sheng" :city="city" :area="qu" @selected="onSelected">
      </v-distpicker>
    </div>

    <!--   详细信息-->
    <textarea name="" rows="5" placeholder="详细地址：如街道，门牌号、小区、楼层、单元等" v-model="info"></textarea>
    <div class="btn">
      <mt-button type="danger" @click="reset">重置</mt-button>
      <mt-button type="primary" @click="handleSubmit">保存</mt-button>
    </div>
  </div>
</template>

<script>
  import vDistpicker from 'v-distpicker'
  import {Toast, MessageBox} from 'mint-ui'

  export default {
    name: "user-form",
    data() {
      return {
        user: '',
        tel: '',
        info: '',
        isShowDistpicker: false,
        sheng: '',
        city: '',
        qu: ''
      }
    },
    components: {
      'v-distpicker': vDistpicker
    },
    methods: {
      getAddress() {
        if (this.id) {
          // 如果传过来的id 为0 执行
          this.axios.get('api/getAddressById', {
            params: {
              id: this.id
            }
          })
            .then(result => {
              if (result.data.status === -1) {
                //  请登录
                MessageBox({
                  title: '您尚未登录',
                  message: '是否前往登录?',
                  showCancelButton: true,
                  cancelButtonText: '返回上一页'
                })
                  .then(active => {
                    if (active === 'cancel') {
                      this.$router.go(-1)
                    } else {
                      this.$router.push('/user/login')
                    }
                  })
                return
              }
              if(result.data.status === -2) {
                return Toast(result.data.message)
              }
              var data = result.data.message[0]
              this.user = data.a_name
              this.tel = data.a_tel
              this.info = data.info
              this.sheng = data.sheng
              this.city = data.city
              this.qu = data.qu
            })
        }
      },
      close(e) {
        // 判断tagName  如果是UL LI  之间返回
        if (e.target.tagName === 'UL' || e.target.tagName === 'LI') return false
        e.stopPropagation()

        this.isShowDistpicker = false
      },
      onSelected(e) {
        this.sheng = e.province.value
        this.city = e.city.value
        this.qu = e.area.value
        this.isShowDistpicker = false
      },
      reset() {
        this.user = ''
        this.tel = ''
        this.info = ''
        this.sheng = ''
        this.city = ''
        this.qu = ''
      },
      handleSubmit() {
        // 分析差别 差别 可以只是传递过来的参数（add/ update） 在组件内自行判断 是否需要做什么操作 或者传递过来方法 在组件内调用
        //  判断数据合法性
        if (!this.user) {
          return Toast('请输入收货人')
        }
        if (!/^[0-9]{11}$/.test(this.tel)) {
          return Toast('请输入11位手机号码')
        }
        if (!this.info) {
          return Toast('请输入详细信息')
        }
        if (!this.sheng || !this.city || !this.qu) {
          return Toast('请选择所在地区')
        }

        // 将数据组成一个对象 传递给父组
        var body = {
          a_name: this.user,
          a_tel: this.tel,
          info: this.info,
          sheng: this.sheng,
          city: this.city,
          qu: this.qu
        }
        this.$emit('post', body,function () {
          this.user = ''
          this.tel = ''
          this.info = ''
          this.sheng = ''
          this.city = ''
          this.qu = ''
        }.bind(this))
      }
    },
    props: ['id'],
    created() {
      this.getAddress()
    }
  }
</script>

<style lang="scss">
  .form-container {
    padding-top: 10px;
    position: relative;
    width: 100%;
    height: 100%;

    .address-selector {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      background-color: rgba(0, 0, 0, .3);
      transition: all .5s ease;
      z-index: 11;
    }

    .show {
      display: block;
      height: 100%;
      opacity: 1;
    }

    .hide {
      display: none;
      height: 0;
      opacity: 0;
    }

    .close-address-selector {
      position: absolute;
      bottom: 40vh;
      line-height: 40px;
      right: 10px;
      color: #6d6d72;
      z-index: 9999999;
    }

    .distpicker-address-wrapper {
      position: absolute;
      bottom: 0;
      width: 100%;
    }

    .address-container {
      width: 100%;
      height: 40vh;
    }

    .btn {
      display: flex;
      justify-content: center;

      button:first-of-type {
        margin-right: 20px;
      }
    }
  }
</style>
