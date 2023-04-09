<template>
    <div class="FootMusic">
       <div class="FootMusic-top">
        <div class="footLeft" @click="updatedetailShow">
          <img :src="playList[playListIndex].al.picUrl">
          <div class="content">
            <p>{{ playList[playListIndex].name }}</p>
            <p class="detail">点击查看详情</p>
          </div>
        </div>
        <div class="footRight">
          <svg class="icon" aria-hidden="true" v-if="IsbtnShow" @click="play" >
            <use xlink:href="#icon-bofang"></use>
          </svg>
          <svg class="icon" aria-hidden="true" v-else @click="play">
            <use xlink:href="#icon-weibiaoti--"></use>
          </svg>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-zu"></use>
          </svg>
        </div>
      </div>
      <!-- <div class="FootMusic-bottom" >
        <van-tabbar active-color="#ee0a24" inactive-color="#000" >
          <van-tabbar-item icon="search" @click="$router.push('/')">发现</van-tabbar-item>
          <van-tabbar-item icon="music-o" @click="$router.push('/infoUser')">我的</van-tabbar-item>
          <van-tabbar-item icon="friends-o">关注</van-tabbar-item>
        </van-tabbar>
      </div> -->
      
    </div>
    <van-popup 
      v-model:show="detailShow"
      position="right"
      :style="{ height: '100%',width:'100%' }"
    >
      <MusicDetail 
      :musicList="playList[playListIndex]" 
      :play="play" 
      :IsbtnShow="IsbtnShow" 
      :addDuration="addDuration"
      />
    </van-popup>
    <audio ref="audio" controls :src="`https://music.163.com/song/media/outer/url?id=${playList[playListIndex].id}.mp3 `"></audio>
</template>

<script>
import {mapState, mapMutations} from "vuex"
import MusicDetail from "../item/MusicDetail"
export default {
  data(){
    return{
      interVal:0
    }
  },
    computed:{
        ...mapState(['playList','playListIndex','IsbtnShow','detailShow','duration'])
    },
    mounted(){
        this.$store.dispatch('getLyric',this.playList[this.playListIndex].id)
        this.updateTime()
    },
    methods:{
        play : function(){
            if(this.$refs.audio.paused){
                this.$refs.audio.play()
                this.updateIsbtnShow(false)
                this.updateTime()
            }
            else{
                this.$refs.audio.pause()
                this.updateIsbtnShow(true)
                clearInterval(this.interVal)
            } 
        },
        addDuration:function(){
          this.updateDuration(this.$refs.audio.duration)
        },
        updateTime:function(){
          this.interVal = setInterval(()=>{
            this.updateCurrentTime(this.$refs.audio.currentTime)
          },1000)
        },
        ...mapMutations(['updateIsbtnShow','updatedetailShow','updateCurrentTime','updateDuration'])
    },
    watch:{
      playListIndex:function(){
        this.$refs.audio.autoplay = true;
        if(this.$refs.audio.paused){
            this.updateIsbtnShow(false)
        }

      },
      IsbtnShow:function(){
        if(!this.IsbtnShow){
          this.$refs.audio.autoplay = true
        }
      }
    },
    updated(){
      this.$store.dispatch('getLyric', this.playList[this.playListIndex].id)
      this.addDuration()
    },
    components:{
      MusicDetail,
    }
}
</script>

<style lang="less" scoped>
audio{
  display: none;
}
.FootMusic {
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 1.4rem;
  background-color: #fff;
  .FootMusic-top {
    display: flex;
    justify-content: space-between;
    height: 0.8rem;
    border-top: 0.02rem solid #999;
    padding: .1rem;

    .footLeft {
      display: flex;
      // justify-content: space-between;
      align-items: center;
      
      img {
        width: .8rem;
        height: .8rem;
        border-radius: 50%;
      }
      .content{
        width: 4.5rem;
        padding-left: .1rem;
        p{
            font-weight: 600;  
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
        .detail{
            font-size: .2rem;
            color: gray;
        }
      }
    }
    .footRight{
        display: flex;
        justify-content: flex-end;
        align-items: center;
        padding-right: .2rem;
        .icon{
            height: .6rem;
            width: .6rem;
            padding-right: .1rem;
        }
    }
  }

}
</style>