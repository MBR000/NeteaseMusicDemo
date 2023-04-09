<template>
    <div class="musicList">
        <div class="musicTop">
            <div class="title">发现好歌单</div>
            <div class="more">查看更多</div>
        </div>
        <div class="musicContent">
            <van-swipe :loop="false" :width="150" :show-indicators="false" class="mySwiper">
                <van-swipe-item v-for="item in musicList" :key="item" class="item">
                    <router-link :to="{path:'/itemMusic',query:{id:item.id}}">
                    <!-- to里面是一个对象，而不是vue引用 -->
                    <img :src="item.picUrl" alt="" class="img">
                    <span class="pCount">
                        <svg class="icon" aria-hidden="true" >
                            <use xlink:href="#icon-24gl-play"></use>
                        </svg>
                        {{ changeCount(item.playCount) }}
                    </span>
                    <div class="name">{{ item.name }}</div>
                    </router-link>
                </van-swipe-item>
            </van-swipe>
        </div>
    </div>
    
</template>

<script>
import { getMusicList } from '@/request/api/home';
export default {
    data(){
        return{
            musicList:[]
        }
    },
    methods:{
        async getGedan(){
            let res = await getMusicList()
            // console.log(res)
            this.musicList = res.data.result
        },
        changeCount: function(num){
            if(num >= 100000000)
                return (num/100000000).toFixed(1) + '亿'
            else if(num >= 10000)
                return (num/10000).toFixed(1) + '万'
        }
    },
    mounted(){
        this.getGedan()
    }
}
</script>

<style lang="less" scoped>
.musicList {
  margin-top: .3rem;
  padding: .2rem;
  width: 100%;
  height: 5rem;
  box-sizing: border-box;

  .musicTop {
    display: flex;
    justify-content: space-between;
    margin-bottom: .3rem;
    width: 100%;
    height: .5rem;

    .title {
      font-size: .35rem;
      font-weight: 900;
      line-height: .6rem;
    }

    .more {
      padding: 0 .2rem;
      border: 1px solid #ccc;
      text-align: center;
      line-height: .5rem;
      border-radius: .4rem;
      font-size: .28rem;
    }
  }
  .MusicContent {
    width: 100%;
    height: 4rem;

    .mySwiper {
      position: relative;
      height: 100%;
      

      .item {
        // margin: 5px;
        text-align: center;
        
      }
    }
  }
  
}
</style>
<style lang="less">
.item{
    font-size: .28rem;
    .pCount {
        position: absolute;
        top: 5%;
        right: 10%;
        color: gray;
        display: flex;
        justify-content: center;
        align-items: center;
        .icon {
            
            width: .28rem;
            height: .28rem;
        }    
    }
    .img {
        border-radius: 5%;
        // margin: 5px;
        width: 95%;
        height: 95%;
    }
    .name {
        width: 95%;
    }   
}
 



</style>