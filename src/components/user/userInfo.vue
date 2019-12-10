<template>
  <div class="user-info">
    <ul class="mui-table-view">
      <li class="mui-table-view-cell">
        <label for="pic">
          <span class="mui-navigate-right">
          头像
          <span><img :src="URL +$store.state.uidPic" alt=""></span>
        </span>
        </label>
        <input type="file" name="pic" id="pic" accept="image/*" @change="handlePicChange">
      </li>
      <li class="mui-table-view-cell">
        <a class="mui-navigate-right" @click="handleUpdateNichengOrTel('nicheng',data.nicheng,$event)">
          昵称 <span>{{data.nicheng}}</span>
        </a>
      </li>
      <li class="mui-table-view-cell">
        <a class="uname">
          用户名 <span>{{data.uname}}</span>
        </a>
      </li>
      <li class="mui-table-view-cell">
        <a class="mui-navigate-right" @click="handleUpdateGanger">
          性别 <span>{{data.gender | genderFrame}}</span>
        </a>
      </li>
      <li class="mui-table-view-cell">
        <a class="mui-navigate-right" @click="handleUpdateNichengOrTel('tel',data.tel,$event)">
          手机 <span>{{data.tel}}</span>
        </a>
      </li>
      <li class="mui-table-view-cell">
        <a class="mui-navigate-right" @click="isShowDistpicker = true">
          地址 <span>{{data.address}}</span>
        </a>
      </li>
      <li class="mui-table-view-cell">
        <a class="mui-navigate-right" @click="showUpdatePassword">
          修改密码
        </a>
      </li>
    </ul>

    <!--    显示的地址-->
    <user-address-selector
      @selected="onSelected"
      v-bind:city1="city"
      v-bind:sheng1="sheng"
      v-bind:qu1="qu"
      v-bind:isShowDistpicker="isShowDistpicker"
      @update="updateisShowDistpicker"
    ></user-address-selector>

<!--    修改密码框-->
    <div v-if="isShowUpdatePwd" class="updatePassword-box">

      <div class="mint-msgbox-wrapper" style="position: absolute; z-index: 2003;">
        <div class="mint-msgbox" :class="startClass? 'none': 'show'">
          <div class="mint-msgbox-header">
            <div class="mint-msgbox-title">修改密码</div>
          </div>
          <div class="mint-msgbox-content">
            <div class="mint-msgbox-message">
              <user-password-input
                v-on:handleChange="handleChangeOldPwd"
                v-bind:placeholder="'请输入原密码'"
                v-bind:isDangerBorder="false"
              ></user-password-input>
              <user-password-input
                v-on:handleChange="handleChangePwd"
                v-bind:placeholder="'请输入新密码'"
                v-bind:isDangerBorder="false"
              ></user-password-input>
              <user-password-input
                v-on:handleChange="handleChangerePwd"
                v-bind:placeholder="'请再次输入新密码'"
                v-bind:isDangerBorder="isDangerBorder"
              ></user-password-input>

            </div>
          </div>
          <div class="mint-msgbox-btns">
            <button class="mint-msgbox-btn mint-msgbox-cancel " @click="closeUpdatePassword" style="">取消</button>
            <button class="mint-msgbox-btn mint-msgbox-confirm " @click="handleUpdatePwd">确定</button>
          </div>
        </div>
      </div>

      <div class="v-modal" style="z-index: 2000;" @click="closeUpdatePassword"></div>
    </div>

  </div>

</template>

<script>
  import {Toast, MessageBox} from 'mint-ui'
  import common from '@/common.js'
  import UserAddressSelector from '@/components/subcomponents/user-address-selector.vue'
  import userPasswordInput from '@/components/subcomponents/user-passwordInput.vue'
  // 用户详情页面
  export default {
    name: "userInfo",
    data() {
      return {
        data: {
          uname: '正在获取中',
          tel: '正在获取中',
          pic: '/images/user/defaultpic.jfif',
          address: '尚未设置',
          nicheng: '正在获取中',
          gender: undefined,
        },
        sheng: '',
        city: '',
        qu: '',
        isShowDistpicker: false,
        tempVal: '',
        tempGanger: undefined,
        newPic: undefined,
        oldpwd: '',
        upwd: '',
        reupwd: '',
        isShowUpdatePwd: false,
        startClass: true,
        isDangerBorder: false
      }
    },
    methods: {
      // 获取 详细信息
      getUserInfo() {
        this.axios.get('api/getUserInfo')
          .then(result => {
            console.log(result)
            common.noLogin(result.data.status, MessageBox, this)
            if (result.data.status === 0) {
              result.data.message.pic = result.data.message.pic ? result.data.message.pic : '/images/user/defaultpic.jfif'
              this.data = result.data.message
              var tempArr = this.data.address.split(' ')
              this.sheng = tempArr[0]
              this.city = tempArr[1]
              this.qu = tempArr[2]
            }
          })
      },

      // 设置头像
      handlePicChange(e) {
        var picFiles = e.target.files[0]
        if (picFiles.type.indexOf('image') === -1) {
          //  类型错误
          Toast('请上传图片类型的文件')
        }
        if (picFiles.size >= 3 * 1024 * 1024) {
          //  图片过大
          Toast('请上传图片过大，请选择3MB以内的图片')
        }
        //   上传服务器操作
        var pic = new FormData()
        pic.append('pic', picFiles)
        //  发送请求
        this.axios.post('api/setUserPic', pic, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
          .then(result => {
            common.noLogin(result.data.status, MessageBox, this)
            if (result.data.status === 0) {
              this.newPic = window.URL.createObjectURL(picFiles)
              // 公用的图片
              this.$store.commit('setUserPic', result.data.pic)
            } else if (result.data.status !== -1) {
              Toast(result.data.message)
            }
          })

      },

      //  设置昵称 或手机号码
      handleUpdateNichengOrTel(type, val, e) {
        e.preventDefault()
        var str = ''
        //
        switch (type) {
          case 'nicheng':
            str = '请输入昵称';
            break;
          case 'tel':
            str = '请输入手机号码';
            break;
        }
        MessageBox
          .prompt(str, '', {
            showInput: true,
            inputValue: val,
            inputType: 'text',
            inputValidator: (value) => { // 设置 错误的方法
              if (value === null || type !== 'tel') {
                return true;//初始化的值为null，不做处理的话，刚打开MessageBox就会校验出错，影响用户体验
              }
              return (value.length === 11)
            }
            , inputErrorMessage: '手机长度必须是11位'
          })
          .then(({value, action}) => {
            //   数据上的处理
            if (action !== 'confirm') return false
            if (value === val) return false
            if (type === 'tel' && !/^[0-9]{11}$/.test(value)) {
              Toast('手机长度必须是11位')
              return false
            }
            this.tempVal = value
            //  发送请求
            return this.axios.post('api/updateInfo', {
              type, val: value
            })
          })
          .then(result => {
            if (!result) return false
            if (result.data.status === 0) {
              //  修改数据
              this.data[type] = this.tempVal
            } else {
              Toast(result.data.message)
            }
          })
      },

      //  修改其他
      handleUpdateGanger() {
        // 初始化
        this.tempGanger = this.data.gender || 0
        var str = ''
        if (this.data.gender === 1) {
          str = `<ul class="mui-table-view mui-table-view-radio danger-select text-align-left">
          <li class="mui-table-view-cell">
          <a class="mui-navigate-right" data-val="0" >男</a>
          </li>
          <li class="mui-table-view-cell mui-selected">
          <a class="mui-navigate-right" data-val="1" >女</a>
          </li>
          </ul>`
        } else {
          str = `<ul class="mui-table-view mui-table-view-radio danger-select text-align-left">
          <li class="mui-table-view-cell mui-selected">
          <a class="mui-navigate-right" data-val="0"  >男</a>
          </li>
          <li class="mui-table-view-cell">
          <a class="mui-navigate-right" data-val="1" >女</a>
          </li>
          </ul>`
        }
        this.delayQuerySelector()
        MessageBox({
          title: '请选择您的性别',
          message: str,
          showCancelButton: true
        })
          .then(action => {
            if (action === 'cancel') return false
            //   发送请求
            return this.axios.post('api/updateInfo', {
              type: 'gender', val: this.tempGanger
            })
          })
          .then(result => {
            if (!result) return false
            if (result.data.status === 0) {
              //  修改数据
              this.data.gender = this.tempGanger
            } else {
              Toast(result.data.message)
            }

          })
      },

      // 使用定时器等待 创建完成绑定组件
      delayQuerySelector() {
        // 使用定时器查找
        var timeId = window.setInterval(() => {
          var dangerSelector = document.querySelector('.danger-select')
          if (dangerSelector) {
            dangerSelector.onclick = (e) => {
              e.preventDefault()
              var target = e.target
              if (target.tagName.toLowerCase() === 'a') {
                //   获取 值
                var val = parseInt(target.dataset.val)
                var noSelectorIndex = val === 1 ? 0 : 1
                this.tempGanger = val
                // 排他操作
                var list = dangerSelector.querySelectorAll('.mui-table-view-cell')
                list[val].classList.add('mui-selected')
                list[noSelectorIndex].classList.remove('mui-selected')
              }
            }
            window.clearInterval(timeId)
          }
        }, 20)
      },

      // 选择完成后触发
      onSelected(e) {
        this.sheng = e.province.value
        this.city = e.city.value
        this.qu = e.area.value
        this.isShowDistpicker = false
        //  发送请求 上宣传数据
        var tempAddress = `${this.sheng} ${this.city} ${this.qu}`
        this.axios.post('api/updateInfo', {
          type: 'address', val: tempAddress
        }).then(result => {
          if (result.data.status === 0) {
            this.data.address = tempAddress
          } else {
            Toast('更新失败请稍后重试')
          }
        })
      },

      // 传递给zi组件 控制显示隐藏
      updateisShowDistpicker(now) {
        this.isShowDistpicker = now
      },

      //  传递给zi组件 同步密码
      handleChangeOldPwd(now) {
        this.oldpwd = now
      },
      handleChangePwd(now) {
        this.upwd = now
      },
      handleChangerePwd(now) {
        this.reupwd = now
      },

      //  显示密码框
      showUpdatePassword() {
        this.isShowUpdatePwd = true
        var timeId = window.setTimeout(() => {
          this.startClass = false
          window.clearTimeout(timeId)
        }, 10)
      },

      //  隐藏
      closeUpdatePassword() {
        this.startClass = true
        var timeId = window.setTimeout(() => {
          this.isShowUpdatePwd = false
          window.clearTimeout(timeId)
        }, 200)
      },

      //  提交修改密码
      handleUpdatePwd() {
        if (!this.reupwd || !this.upwd || !this.oldpwd) return Toast('请完整提交表单')
        if (this.upwd !== this.reupwd) return Toast('两次密码不一致')
        if (!/^[a-zA-Z0-9./,;'\\]{3,18}$/.test(this.upwd) || !/^[a-zA-Z0-9./,;'\\]{3,18}$/.test(this.oldpwd)) return Toast('密码格式不正确')
        //
        this.axios.post('api/updatePassword', {
          oldPassword: this.oldpwd,
          password: this.upwd,
        })
          .then(result => {
            Toast({
              message: result.data.message,
            })
            if (result.data.status === 0) {
              this.closeUpdatePassword()

            }
          })
      }
    },
    created() {
      this.getUserInfo()
    },
    components: {
      'UserAddressSelector': UserAddressSelector,
      'userPasswordInput': userPasswordInput
    },
    filters: {
      genderFrame(data) {
        if (data === 0) {
          return '男'
        }
        if (data === 1) {
          return '女'
        }
        if (data === null || data === undefined) {
          return '尚未选择你的性别'
        }
      }
    },
    watch: {
      reupwd(now) {
        if (now === this.upwd) {
          this.isDangerBorder = false
        } else {
          this.isDangerBorder = true
        }
      }
    }

  }
</script>

<style lang="scss">
  .user-info {
    .uname,
    .mui-navigate-right {
      display: flex !important;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;

      span {
        margin-right: 20px;
      }
    }

    img {
      width: 50px;
      height: 50px;
    }

    input[name="pic"] {
      display: none;
    }

    .mint-msgbox {
      &.none {
        opacity: 0;
        transform: translate3d(-50%, -50%, 0) scale(0);
      }

      &show {
        opacity: 1;
      }
    }

  }

  .text-align-left {
    text-align: left;
  }

  .mint-toast {
    z-index: 9999999;
  }

</style>
