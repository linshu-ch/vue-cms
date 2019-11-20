//  这个共享的函数管理

// 判断是否登录
class Fun {
  static isLogin(status) {
    if (status === -1) {
      return false
    } else {
      return true
    }
  }

  //为登录显示消息框
  static noLoginShowMB(MB,_this) {
    MB({
      title: '您尚未登录',
      message: '是否前往登录?',
      showCancelButton: true,
      cancelButtonText: '返回上一页'
    }).then(active => {
      if (active === 'cancel') {
        _this.$router.go(-1)
      } else {
        _this.$router.push('/user/login')
      }
    })
  }

  static noLogin(status,MB,_this) {
    if (!this.isLogin(status)) {
      this.noLoginShowMB(MB,_this)
    }
  }

  // 修改数据
  static updateCarMsg(result, MB, Toast) {
    var isLogin = this.isLogin(result.data.static)
    !isLogin && this.noLoginShowMB(MB)
    isLogin && Toast(result.data.message)
  }

//


}


export default Fun
