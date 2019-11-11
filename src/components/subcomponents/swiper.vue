<template>
    <mt-swipe :auto="4000">
        <!--            使用v-for  一定要使用key-->
        <!--            谁使用 谁传值 来设置-->
        <mt-swipe-item v-for="item in lunbotuList" :key="item.src">
            <a href="javascript:void(0)">
                <img :src="item.src" alt="" :class="{full: isfull}">
            </a>
        </mt-swipe-item>
    </mt-swipe>
    <!--    分析 商品评论中的轮播图宽高 比例失调 -->
    <!--    宽高都使用了100% 一商品详情页中的 高度为100% 宽度自适应 -->
    <!--    原因 分歧点 宽度是否是100% 还是自适应-->
    <!--    这两个轮播图在其他方面没有冲突 但是只有在宽度上有分歧
    -->
    <!--    可以定义一个属性 让在使用轮播图的调用者手动指定是否为100% 宽度-->
</template>

<script>

    export default {
        props: ['lunbotuList', 'isfull'],
        mounted() {
            var lunbutu = document.getElementsByClassName('mint-swipe')[0]
            var start = 0
            lunbutu.addEventListener('touchstart', function (e) {
                start = e.changedTouches[0].clientX
            })
            lunbutu.addEventListener('touchmove', function (e) {
                var x = Math.abs(start - e.changedTouches[0].clientX)
                if (x  >= 20) {
                    e.preventDefault()
                }
            })
        }

    }

</script>

<style scoped lang="less">
    @media screen and (max-width: 768px) and (min-width: 320px) {
        .mint-swipe {
            height: 205px;
        }
    }

    @media screen and (max-width: 992px) and (min-width: 768px) {
        .mint-swipe {
            height: 450px;
        }
    }

    @media screen and (max-width: 1200px) and (min-width: 992px) {
        .mint-swipe {
            height: 600px;
        }
    }

    @media screen and (min-width: 1200px) {
        .mint-swipe {
            height: 600px;
        }
    }

    .mint-swipe {
        .mint-swipe-item {
            /*交集选择器*/
            /*&:nth-child(1) {*/
            /*    background-color: red;*/
            /*}*/

            a {
                display: block;
                width: 100%;
                height: 100%;
                text-align: center;
                /*text-align: center;*/

                img {
                    /*width: 100%;*/
                    height: 100%;
                }
            }

        }
    }

    .full {
        width: 100%;
    }
</style>
