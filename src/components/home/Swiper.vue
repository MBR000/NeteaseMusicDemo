<template>
    <div  id="swiperTop">
        <van-swipe :autoplay="3000" lazy-render>
            <van-swipe-item v-for="image in state.images" :key="image">
                <img :src="image.pic" />
            </van-swipe-item>
        </van-swipe>
    </div>
    
</template>

<script>
import {onMounted, reactive, toRefs} from 'vue'
import { getBanner } from "@/request/api/home";
export default {  
  setup() {
    const state = reactive({
        images:[]
    });
    onMounted(async ()=>{
        let res = await getBanner()
        // console.log(res,"res")
        state.images = res.data.banners
    })
    
    return { state };
  }
}
</script>
<style lang="less" scoped>
#swiperTop{
    .van-swipe{
        width: 100%;
        .van-swipe__track{
            .van-swipe-item{
                padding: .2rem;
                box-sizing:border-box; 
                img{
                    width: 100%;
                    height: 3rem;
                    border-radius: .2rem;
                }
            }
        }
        .van-swipe__indicators{
            transform: translate(-50%,-0.4rem);
            .van-swipe__indicator{
                background-color: gray
            }
        }
        .van-swipe__indicator--active{
            background-color: pink;
        }
    }
}

</style>
<style lang="less">
#swiperTop{
    .van-swipe{
        .van-swipe__indicators{
            transform: translate(-50%,-0.4rem);
        }
        .van-swipe__indicator--active{
            background-color: pink;
        }
    }
}
</style>