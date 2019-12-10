<template>
  <div class="friends-container">
    <div class="new-friend">
      <a class="icon-box"><span class="mui-icon-extra mui-icon-extra-addpeople"></span>新的好友</a>
    </div>
    <div v-if="friendsList.length===0" class="not-friend">
      <!--      暂时没有好友-->
      {{message}}
    </div>
    <ul class="mui-table-view friends-list">
      <li v-for="(item, i) of friendsList" :key="i" class="mui-table-view-cell mui-media">
        <router-link :to="'/friends/friendsChat/'+item.id +'/' +item.nicheng" class="">
          <span v-if="item.count" class="mui-badge mui-badge-danger">{{item.count}}</span>
          <img class="mui-media-object mui-pull-left" :src="URL + item.pic">
          <div class="mui-media-body">
            {{item.nicheng}}
            <p class="mui-ellipsis">{{item.message || ''}}</p>
          </div>
        </router-link>
      </li>
    </ul>

  </div>
</template>
<script>
  import common from '@/common'
  import {MessageBox} from 'mint-ui'

  export default {
    data() {
      return {
        message: '正在获取中，请您稍等',
        friendsList: []
      }
    },
    methods: {
      //   获取好友列表
      getFriendsList() {
        this.axios.get('api/getFriendsLst')
          .then(result => {
            // 没有登陆操作
            common.noLogin(result.data.status, MessageBox, this)
            if (result.data.status === 0) {
              this.friendsList = result.data.message
              this.message = '占时没有好友,赶快去添加吧'
            }
          })
      }
    },
    created() {
      this.getFriendsList()
    }
  }
</script>
<style lang="less" scoped>
  .friends-container {
    .not-friend {
      background-color: #fff;
      line-height: 50px;
      font-size: 14px;
      text-align: center;
    }

    .new-friend {
      padding: 11px 20px;
      background-color: #fff;
      border-bottom: 1px solid #ccc;

      .icon-box {
        display: block;
        height: 40px;
        color: #333;
        line-height: 40px;

        .mui-icon-extra {
          display: inline-block;
          background-color: #007aff;

          font-size: 40px;
          color: #fafafa;
          margin-right: 10px;
          vertical-align: middle;
        }
      }
    }

    .friends-list {
      .mui-media-body {
        margin-right: 20px;
      }
    }
  }
</style>
