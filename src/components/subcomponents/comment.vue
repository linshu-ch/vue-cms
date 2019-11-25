<template>

  <div class="cmt-container">
        <textarea placeholder="请输入评论的内容（最多发表120个字符）" maxlength="120" v-model="msg">

        </textarea>
    <mt-button type="primary" size="large" @click="postComments">发表评论</mt-button>
    <div class="cmt-inner">
      <mt-loadmore :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore" :auto-fill="false">
        <div class="cmt-list">

          <div class="cmt-item" v-for="(item, index) in commentList" :key="item.id">
            <div class="cmt-title">
              第{{index +1 }}楼&nbsp;&nbsp;用户: {{ item.user_name }}&nbsp;&nbsp;发表时间: {{ item.add_time |
              dateFormat }}
            </div>
            <div class="cmt-body">
              {{ item.content === 'undefined' ? '此用户很懒': item.content }}
            </div>
          </div>
        </div>
        <mt-button type="danger" :disabled="allLoaded" size="large" plain @click="!allLoaded && getMore()">加载更多
        </mt-button>
      </mt-loadmore>
    </div>
  </div>
</template>
<script>
  import {Toast} from 'mint-ui'

  export default {
    data() {
      return {
        commentList: [],
        pageIndex: 1,//默认显示第一
        msg: '',
        allLoaded: false,
      }
    },
    created() {
      this.getComments()
    },
    props: ['artid'],
    methods: {
      getComments() {//获取评论
        this.axios.get('api/getcomments/' + this.artid + '?pageindex=' + this.pageIndex).then(data => {
          this.$refs.loadmore.onBottomLoaded();
          if (data.data.status === 0) {
            //  使用数组凭借的方法
            this.commentList = this.commentList.concat(data.data.message)
          } else if (data.data.status === 2) {
            Toast('没有更多评论')
            this.allLoaded = true
          } else {
            Toast('读取信息失败')
          }
        })
      },
      postComments() {
        /*
        * 参数1 请求的url地址
        * 参数2 提交给服务器的对象
        * */
        if (this.msg) {
          this.axios.post('api/getcomments/' + this.artid, {content: this.msg}).then(res => {

            if (res.data.status === 0) {
              this.commentList.unshift({
                content: this.msg,
                user_name: '匿名',
                add_time: new Date(),
                id: res.data.id
              })
              this.msg = ''
              Toast('评论成功')
            } else {
              Toast('评论失败，请重试')
            }
          })

        } else {
          Toast('请输入评论内容')
        }

      },
      getMore() {//加载更多
        this.pageIndex++
        this.getComments()
      },
      loadBottom() {
        this.getMore()
      }
    }
  }
</script>
<style lang="less">
  .mui-progressbar {
    margin: 4px 0;
  }

  .cmt-container {
    display: flex;
    flex-direction: column;

    h3 {
      font-size: 18px;
    }

    textarea {
      font-size: 14px;
      height: 85px;
      margin: 0;
    }

    .cmt-inner {
      padding-bottom: 10px;

      .cmt-list {
        margin: 5px 0;

        .cmt-item {
          font-size: 14px;

          .cmt-title {
            font-size: 12px;
            line-height: 30px;
            background-color: #ccc;

          }

          .cmt-body {
            line-height: 35px;
            text-indent: 2em;
          }
        }
      }
    }

  }
</style>
