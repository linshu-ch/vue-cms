<template>
  <div class="user-info">
    <ul class="mui-table-view">
      <li class="mui-table-view-cell">
        <label for="pic">
          <span class="mui-navigate-right">
          头像
          <span><img :src="newPic? newPic: URL + data.pic" alt=""></span>
        </span>
        </label>
        <input type="file" name="pic" id="pic" accept="image/*" @change="handlePicChange">
      </li>
      <li class="mui-table-view-cell">
        <a class="mui-navigate-right">
          昵称 <span>{{data.nicheng}}</span>
        </a>
      </li>
      <li class="mui-table-view-cell">
        <a class="uname">
          用户名 <span>{{data.uname}}</span>
        </a>
      </li>
      <li class="mui-table-view-cell">
        <a class="mui-navigate-right">
          性别 <span>{{data.gender | genderFrame}}</span>
        </a>
      </li>
      <li class="mui-table-view-cell">
        <a class="mui-navigate-right">
          手机 <span>{{data.tel}}</span>
        </a>
      </li>
      <li class="mui-table-view-cell">
        <a class="mui-navigate-right">
          地址 <span>{{data.address}}</span>
        </a>
      </li>
      <li class="mui-table-view-cell">
        <a class="mui-navigate-right">
          修改密码
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
  import {Toast,MessageBox} from 'mint-ui'
  import common from '@/common.js'
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
          nicheng: '正在获取中'
        },
        newPic: undefined
      }
    },
    methods: {
      getUserInfo() {
        this.axios.get('api/getUserInfo')
          .then(result => {
            common.noLogin(result.data.status,MessageBox,this)
            if(result.data.status === 0) {
              result.data.message.pic = result.data.message.pic? result.data.message.pic: '/images/user/defaultpic.jfif'
              this.data = result.data.message
            }
          })
      },
      handlePicChange(e){
        var picFiles = e.target.files[0]
        if(picFiles.type.indexOf('image') === -1){
        //  类型错误
          Toast('请上传图片类型的文件')
        }
        if(picFiles.size>= 3*1024*1024){
        //  图片过大
          Toast('请上传图片过大，请选择3MB以内的图片')
        }
      //   上传服务器操作
        var pic = new FormData()
        pic.append('pic',picFiles)
      //  发送请求
        this.axios.post('api/setUserPic',pic,{
         headers:{
           'Content-Type': 'multipart/form-data'
         }
        })
          .then(result=>{
            common.noLogin(result.data.status,MessageBox,this)
             if(result.data.status === 0) {
              this.newPic=window.URL.createObjectURL(picFiles)
            }else if(result.data.status !== -1){
              Toast(result.data.message)
            }
          })

      }
    },
    created() {
      this.getUserInfo()
    },
    filters: {
      genderFrame(data){
        switch (data) {
          case 0: return '男';
          case 1: return '女';
          case undefined: return  '尚未选择你的性别';
        }
      }
    }

  }
</script>

<style scoped lang="scss">
  .user-info {
    .uname,
    .mui-navigate-right {
      display: flex;
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

  }

</style>
