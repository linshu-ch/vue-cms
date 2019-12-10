<template>
  <div class="chat">
    <div class="message">
      <mt-loadmore :top-method="loadTop" :auto-fill="false" ref="loadmore">
        <ul class="message-list">
          <!--        判断通过 uid1 与 id 是相等判断 是谁发送过来的   -->
          <li v-for="(item,i) of chatList" :key="i" :class="{
        'message-item': true,
        'res': item.uid1 != uid
        }">
            <div class="ctime">{{item.ctime|dateFormat}}</div>
            <img :src=" item.uid1 != uid? URL + $store.state.uidPic :URL + item.pic" alt="">
            <div class="message-info">
              {{item.message}}
            </div>
          </li>
        </ul>
      </mt-loadmore>

    </div>
    <div class="input-box">
      <input type="text" placeholder="请输入发送内容" v-model="val">
      <mt-button @click="handleWsSend"> 发送</mt-button>
    </div>
  </div>
</template>

<script>
  /*
  * 思路
  * 先通过ajax 请求获取之前的，聊天记录，
  * 在第一次发送时通过 WebSocket 请求连接数据库，之后的每次发送都是直接send 发送  通过 事件接受服务端返回的数据，当离开组件时，断开连接
  *
  *
  *
  *
  * */
  import common from '@/common'
  import {MessageBox, Toast} from 'mint-ui'

  export default {
    name: "chat",
    data() {
      return {
        chatList: [],
        page: 1,
        count: 7,
        ws: undefined,
        uid1: undefined,
        uid2: undefined,
        val: '',
        isShow: true,
        allLoaded: false
      }
    },
    methods: {

      // 上拉加载更多数据
      loadTop() {
        //   上拉加载跟多
        if (this.allLoaded) return this.$refs.loadmore.onTopLoaded();
        this.page++
        this.getChatMessage()
      },

      //设置自动回到底部
      setScrollTop() {
        var timeId = setTimeout(() => {
          // 这里使用定时器的原因是 因为手机代码执行的快，但是上面的渲染操作并没有完成 可能会有失效的情况
          var container = document.querySelector('.app-container')
          var scroll = container.scrollHeight - container.clientHeight

          container.scrollTop = scroll + 200
          clearTimeout(timeId)
        }, 10)
      },

      //   获取聊天记录操作 获取之前的
      getChatMessage() {
        this.axios.get('api/getChat', {
          params: {
            page: this.page,
            count: this.count,
            uid2: this.uid,
          }
        })
          .then(result => {
            this.$refs.loadmore.onTopLoaded();
            common.noLogin(result.data.status, MessageBox, this)
            if (result.data.status === 0) {
              if (result.data.message.data.length === 0) {
                if (this.page !== 1) Toast('没有早的聊天记录')
                return this.allLoaded = true
              }
              this.chatList.push(...result.data.message.data)
              this.uid1 = result.data.message.uid1
              this.uid2 = result.data.message.uid2
            } else {
              Toast(result.data.message)
            }
            if (this.page === 1) this.setScrollTop()
          })
      },
      //   设置store 操作
      setStoreUnicheng() {

        this.$store.commit('setUnicheng2', this.nicheng)
      },
      //   使用 webSocket
      createWs() {
        /*
        * 创建连接webSocket 连接
        * 监听服务端发送过来的消息，start 为 1 时，表示发送成功 start 为0 时表示接受到服务端的消息
        * 将消息呈现在页面中
        * */
        this.ws = new WebSocket(this.WSURL + '/ws/chat?uid=' + this.uid)
        this.ws.onmessage = (msg) => {
          var data = JSON.parse(msg.data)
          // 发送的
          if (data.status === 1) {
            //   发送成功
            //  使用 find 查找，复制一个对象  是发送的对象
            var obj = {
              uid1: this.uid1,
              uid2: this.uid2,
              message: this.val,
              ctime: data.ctime
            }
            this.chatList.unshift(obj)
            this.val = ''

          }
          if (data.status === 0) {
            this.chatList.unshift(...data.message.data)
          }
          //   将页面滚动到最底端 滚动元素是app-con
          this.setScrollTop()

        }
      },
      // 发送数据
      handleWsSend() {

        if (this.val.trim() === '') return Toast('请输入内容')
        if (this.ws) {
          this.ws.send(this.val)
        } else {
          Toast('服务器断开连接请刷新后重试')
        }
      },
      //  意外与服务器断开连接
      onCloseYiwai() {
        if (this.ws) {
          this.ws.onclose = function (e) {
            if (!this.isShow) return false
            Toast('您与服务器断开连接，如需重新连接，请刷新重新连接')
          }
        }
      },

      //  关闭与服务器的连接
      closeWs() {
        this.ws.close()
        this.isShow = false
      }

    },
    created() {
      this.setStoreUnicheng()
      this.getChatMessage()
      this.createWs()
      this.onCloseYiwai()
    },
    beforeDestroy() {
      this.closeWs()
    },
    props: ['uid', 'nicheng']
  }
</script>

<style lang="scss">
  .main {
    display: flex;
    flex-direction: column;
  }

  .chat {
    flex: 1;
    height: 100%;
    display: flex;
    flex-direction: column;

    .message {
      flex: 1;
      background-color: #fff;
      padding-bottom: 40px;

      .message-list {
        list-style: none;
        display: flex;
        flex-direction: column-reverse;
        padding: 0 10px;


        .message-item {
          margin-bottom: 5px;
          display: flex;
          justify-content: flex-start;
          flex-direction: row;
          flex-wrap: wrap;

          &.res {
            flex-direction: row-reverse;
          }

          .ctime {
            width: 100%;
            text-align: center;
            font-size: 12px;
            color: #8f8f94;
          }

          img {
            width: 40px;
            height: 40px;
            vertical-align: middle;
            margin: 0 10px;
          }

          .message-info {
            padding: 10px;
            display: inline-block;
            border-radius: 4px;
            border: 1px solid #26a2ff;
            background: #26a2ff;
            max-width: 60%;
            overflow-wrap: break-word; /* 当文本内容类似连续的英文字母 数组时 会有不能换号的情况出现 需要使用 overflow-wrap:break-word 强制换行*/
          ;
          }
        }

      }
    }

    .input-box {
      position: fixed;
      left: 0;
      right: 0;
      bottom: 50px;
      display: flex;
      z-index: 10000;

      input {
        width: auto;
        flex: 1;
        margin: 0;
      }
    }
  }
</style>
