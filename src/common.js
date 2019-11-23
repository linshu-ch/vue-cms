//  这个共享的函数管理

// 判断是否登录


var obj = {}

// 是否登录
obj.isLogin = function (status) {
  if (status === -1) {
    return false
  } else {
    return true
  }
}

// 没有登录的提示宽
obj.noLoginShowMB = function (MB, _this) {
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

// 没有登录的处理
obj.noLogin = function (status, MB, _this) {
  if (!this.isLogin(status)) {
    this.noLoginShowMB(MB, _this)
  }
}

//数据修改提示框
obj.updateCarMsg = function (result, MB, Toast) {
  var isLogin = this.isLogin(result.data.static)
  !isLogin && this.noLoginShowMB(MB)
  isLogin && Toast(result.data.message)
}

// 获取 cookie
obj.getCookie = function () {
  var str = document.cookie
  var cookieArr = str.split('; ')
  var obj = {}
  cookieArr.forEach(item => {
    var temp = item.split('=')
    obj[temp[0]] = temp[1]
  })
  return obj
}

// class Fun {
//   static isLogin(status) {
//     if (status === -1) {
//       return false
//     } else {
//       return true
//     }
//   }
//
//   //为登录显示消息框
//   static noLoginShowMB(MB,_this) {
//     MB({
//       title: '您尚未登录',
//       message: '是否前往登录?',
//       showCancelButton: true,
//       cancelButtonText: '返回上一页'
//     }).then(active => {
//       if (active === 'cancel') {
//         _this.$router.go(-1)
//       } else {
//         _this.$router.push('/user/login')
//       }
//     })
//   }
//
//   static noLogin(status,MB,_this) {
//     if (!this.isLogin(status)) {
//       this.noLoginShowMB(MB,_this)
//     }
//   }
//
//   // 修改数据
//   static updateCarMsg(result, MB, Toast) {
//     var isLogin = this.isLogin(result.data.static)
//     !isLogin && this.noLoginShowMB(MB)
//     isLogin && Toast(result.data.message)
//   }
//
// //获取 Cookie
//    static getCookie(){
//    var str =  document.cookie
//      var cookieArr= str.split(';')
//      var obj = {}
//      cookieArr.forEach(item=>{
//        var temp =item.split('=')
//        obj[temp[0]]=temp[1]
//      })
//      return obj
//    }
//
//
// }


export default obj
