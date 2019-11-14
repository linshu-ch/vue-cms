<template>
<!--    在设置最大值的使用  如果使用父组件向子组件传值的方法 结果可能是undefined 因为父组件获取数据的操作是一个异步的操作  在初始化构造函数中之后使用了这个异步的操作  而这一个操作不确定在什么时候完成 可能是在页面构建好之后才完成  传过来的是一个值 此时还没有过载到这个对象中  所有是undefined，
可以使用watch 属性监听 来监听父组件传过来的值， 不管watch会被触发几次， 但是最后一次 ，肯定会是一个合法的 最大数值
-->
    <div class="mui-numbox" data-numbox-min="1">
        <button class="mui-btn mui-btn-numbox-minus" type="button" disabled="">-</button>
        <input id="test" class="mui-input-numbox" type="number" value="1" @change="postcount" ref="count">
        <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
    </div>
</template>

<script>
      import mui from '@/assets/js/mui.min.js'
  export default {
      data() {
        return {

        }
      },
    mounted() {
      //初始化数字选择框
      mui('.mui-numbox').numbox()

    },
    methods: {
      postcount() {
        // console.log(this.$refs.count.value);
        //每当文本框发发生改变时 给这个父组件 传值
        this.$emit('getcount', parseInt(this.$refs.count.value))
      }
    },
    props:['stock_quantity'],
    watch: {
      //    属性监听
      'stock_quantity': function (newVal, oldVal) {
        mui('.mui-numbox').numbox().setOption('max', newVal)
      }
    }
  }
</script>

<style scoped lang="less">

</style>
