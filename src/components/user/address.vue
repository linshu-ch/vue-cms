<template>
  <div class="address-container">
    <ul class="mui-table-view address-list" v-if="data.length>0">
      <li v-for="(item,index) of data" :key="item.id" class="mui-table-view-cell mui-transitioning address-item">
        <div class="mui-slider-right mui-disabled">
          <button class="mui-btn mui-btn-danger" style="transform: translate(0px, 0px);" @click="del($event,item.id,index)"> 删除</button>
          <button class="mui-btn mui-btn-yellow" style="transform: translate(-90px, 0px);" @click="update($event,item.id)">编辑</button>
        </div>
        <div class="mui-slider-handle" style="transform: translate(0px, 0px);">
          <div class="mui-table-cell">
            <p class="mui-ellipsis name-and-tel"><span class="a_name">{{item.a_name}}</span> &nbsp;{{item.a_tel}}</p>
            <p class="mui-ellipsis-2">{{item.sheng}}&nbsp;{{item.city}}&nbsp;{{item.qu}}&nbsp;{{item.info}}</p>
          </div>
        </div>
      </li>
    </ul>
    <div v-else class="mui-card not-address">
      <div class="mui-card-content">
        占时没有收货地址信息,快去添加收货地址信息吧
      </div>
    </div>
  </div>
</template>

<script>
  // 引用 mui
  import mui from '@/assets/js/mui.min.js'
  import {Toast,MessageBox} from 'mint-ui'

  export default {
    name: "Address",
    data() {
      return {
        data: [],
        isShow: true
      }
    },
    methods: {
      getAddress() {
        this.axios.get('api/getAddress').then(result => {
          // 如果没有登录 跳转到登录页
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
            return false
          }
          this.data = result.data.message
        })
      },
      del(e,id,i){
      //  弹出提示框
        MessageBox({
          title: '',
          message: '请确认是否删除收货?',
          showCancelButton: true,
          cancelButtonText: '取消',
          confirmButtonText: '删除',
          confirmButtonClass: 'danger'
        })
          .then(active => {
            if (active === 'confirm') {
              this.axios.post('/api/delAddress',{
                id
              }).then(result=> {
                if(result.data.status === -1){
                  MessageBox({
                    title: '',
                    message: '您尚未登录，是否前往登录?',
                    showCancelButton: true,
                    cancelButtonText: '取消',
                    confirmButtonText: '确认',
                  })
                    .then(active=> {
                      if(active === 'confirm'){
                        this.$router.push('/user/login')
                      }
                    })
                  return
                }
                Toast(result.data.message)
                if(result.data.status === 0) {
                //  删除数据
                  this.data.splice(i,1)
                }
              })
            }
          })




      },
      update(e, id){
        this.$router.push('/user/updateAddress/' + id)
      }
    },
    created() {
      this.getAddress()
    }
  }
</script>

<style scoped lang="scss">
  .address-container {
    .danger {
      color: #ff5053;
    }
    .not-address {
      padding-top: 20px;
      .mui-card-content {
        height: 100px;
        text-align: center;
        padding-top: 30px;
      }
    }
    .address-list {
      .address-item {
        padding: 20px;
        .name-and-tel{
          font-size: 15px;
          .a_name {
            color: #333;
            font-size: 19px;
          }
        }

      }
    }
  }
</style>
