<template>
    <div class="MusicBody">
      <!-- 背景 -->
      <div class="bgcimg">
        <img :src="musicList.al.picUrl" alt="" class="bgimg">
      </div>
      <!-- 顶部 -->
      <div class="detailTop">
        <!-- 背景 -->
        <!-- 退出and歌曲详情 -->
        <div class="detailTopLeft">
          <svg class="icon" aria-hidden="true" @click="updatedetailShow">
            <use xlink:href="#icon-zuojiantou"></use>
          </svg>
          <div class="authorDetail">
            <!-- 歌名跑马灯效果 -->
            <Vue3Marquee class="leftMarquee">
              <p>
                {{ musicList.name }}
              </p>
            </Vue3Marquee>
            <div class="author">
              <span v-for="(author, id) in musicList.ar" :key="id">{{ author.name }}
              </span>
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-youjiantou"></use>
              </svg>
            </div>
          </div>
        </div>
        <!-- 分享 -->
        <div class="detailTopRight">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-fenxiang"></use>
          </svg>
        </div>
      </div>
      <!-- 中间圆盘与指针部分 -->
      <div class="datailContent" v-show="isLyricShow ">
        <img src="@/assets/指针.png" alt="" class="img_needle" :class="{img_needle_active:!IsbtnShow}"/>
        <img src="@/assets/圆盘.png" alt="" class="img_cd" >
        <img :src="musicList.al.picUrl" alt="" class="img_ar" :class="{img_ar_active:!IsbtnShow,img_ar_paused:IsbtnShow}" @click="isLyricShow = false"/>
      </div>

      <div class="musicLyric-box" ref="musicLyric" v-show="!isLyricShow" @click="isLyricShow = true">
        <div class="musicLyric" >
          <p v-for="item in lyric" :key="item" :data-time="item.pre"
          :class="{ active: (currentTime >= item.time && currentTime < item.pre) }">
            {{ item.lyric }}
          </p> 
          <!-- <p v-for="item in lyric" :key="item">
            {{ item.lyric }}
          </p> -->
          
        </div>
      </div>

      <div class="dataillFooer">

        <!-- <img :src="musicList.al.picUrl" alt="" class="bgimg"> -->
        <div class="footerTop">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-aixin"></use>
          </svg>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-iconfontzhizuobiaozhun023146"></use>
          </svg>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-yinlechangpian"></use>
          </svg>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-xiaoxi"></use>
          </svg>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-liebiao-"></use>
          </svg>
        </div>

        <div class="pmgressbar">
          <van-slider @change="change" min="0" :max="duration" v-model="schedule" :step="0.05" bar-height="2px"
            inactive-color="#b7b9b9" active-color="#ffffffe4" button-size="5px" />
        </div>

        <div class="switchButton">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-xunhuan"></use>
          </svg>
          <svg class="icon" aria-hidden="true" @click="goPlay(-1)">
            <use xlink:href="#icon-shangyishoushangyige"></use>
          </svg>
          <svg class="icon play" aria-hidden="true" v-if="IsbtnShow" @click="play" >
            <use xlink:href="#icon-bofang"></use>
          </svg>
          <svg class="icon play" aria-hidden="true" v-else @click="play">
            <use xlink:href="#icon-zanting"></use>
          </svg>
          <svg class="icon" aria-hidden="true" @click="goPlay(1)">
            <use xlink:href="#icon-xiayigexiayishou" ></use>
          </svg>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-zu"></use>
          </svg>
        </div>
      </div>
    </div>
  </template>

<script>
import {mapState, mapMutations} from "vuex"
import {Vue3Marquee}from'vue3-marquee'
import 'vue3-marquee/dist/style.css'
export default {
    data(){
        return{
            isLyricShow:false,
            schedule: 0
        }
    },
    computed:{
        ...mapState(['lyricList','currentTime','playListIndex','playList','duration']),
        lyric:function(){
            let arr
            const reg = /^\[(\d+):(\d+)\.(\d+)\](.*)$/
            // console.log(this.lyricList)
            if(this.lyricList.lyric){
                arr = this.lyricList.lyric.split('\n').map((item)=>{
                    let temp = reg.exec(item)
                    const obj = {}
                    if(temp){
                      obj.min = temp[1]
                      obj.sec = temp[2]

                      obj.lyric = temp[4]
                      obj.time = parseInt(temp[1]) * 60 + parseInt(temp[2])  
                    }
                    return obj
                })
                arr.forEach((item,i)=>{
                  if(i === arr.length - 1 || isNaN(arr[i+1].time)){
                    item.pre = Infinity
                  }else{
                    item.pre = arr[i+1].time
                  }
                })
            }
            // console.log(arr)
            return arr
        }
    },
    mounted(){
        // console.log(this.musicList)
        this.addDuration()
    },
    methods:{
        ...mapMutations(['updatedetailShow','updatePlayListIndex','updateChangeTime']),
        goPlay:function(num){
          this.updatePlayListIndex((this.playListIndex + num + this.playList.length)%this.playList.length)
          this.updateChangeTime(this.schedule)
        },
        change() {
          this.updateChangeTime(this.schedule)
        },
    },
    watch:{
      currentTime:function(newvalue){
        this.schedule = newvalue
        let time
        let p = document.querySelector('p.active') 
        if(p){
          time = p.getAttribute('data-time')
          // console.log(time)
          if(time < newvalue + 1){
            if(p.offsetTop > 300 - p.offsetHeight){
              // this.$refs.musicLyric.scrollTop = p.offsetTop - 300;
              setTimeout(() => {
                this.$refs.musicLyric.scrollTop = p.offsetTop - 300;
              }, 1000); // 延迟1秒执行
            }
          }
        }
        if(newvalue === this.duration){
          this.updatePlayListIndex((this.playListIndex + 1 + this.playList.length)%this.playList.length)
        }
        
       
      }
    },
    props:['musicList','IsbtnShow','play','addDuration'],
    components:{
        Vue3Marquee
    },
}
</script>

<style lang="less" scoped>
.MusicBody{
    .bgcimg{
        width: 100%;
        height: 100%;
        position: absolute;
        filter: blur(1.5rem);
        z-index: -1;
    }
    .detailTop {
    position: fixed;
    left: 0;
    top: 0;
    padding: .2rem;
    z-index: 99999;
    width: 100%;
    height: 1rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-sizing: border-box;
    .detailTopLeft {
      display: flex;
      align-items: center;
      justify-content: space-between;

      .icon {
        fill: #fff;
      }

      .authorDetail {
        width: 3rem;
        height: 100%;
        margin-left: .3rem;
        .leftMarquee{
            width: 2rem;
        }
        p {
          z-index: -1;
          text-align: center;
          color: #fff;
        }

        .author {
          margin-top: .1rem;
          width: 3rem;
          height: .24rem;
          font-size: .24rem;
          display: flex;
          align-items: center;

          span {
            float: left;
            margin-right: .1rem;
            font-size: .24rem;
            height: .24rem;
            line-height: .24rem;
            color: #555;
          }

          .icon {
            width: .24rem;
            height: .24rem;
            fill: #999;
          }
        }
      }
    }

    .detailTopRight {
      .icon {
        fill: #fff;
        width: .5rem;
        height: .5rem;
        padding: .1rem;
      }
    }
  }
  .datailContent {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    width: 100%;
    height: 9rem;

    .img_needle {
      position: absolute;
      top: 1.3rem;
      left: 46%;
      transform-origin: 0 0;
      transform: rotate(-15deg);
      transition: all 2s;
      width: 2rem;
      height: 3rem;
    }

    .img_needle_active {
      position: absolute;
      top: 1.3rem;
      left: 46%;
      transform-origin: 0 0;
      transform: rotate(0deg);
      transition: all 2s;
      width: 2rem;
      height: 3rem;
    }

    .img_cd {
      position: absolute;
      top: 3rem;
      width: 5rem;
      height: 5rem;
      z-index: -1;
    }

    .img_ar {
      position: absolute;
      top: 3.9rem;
      width: 3.2rem;
      height: 3.2rem;
      border-radius: 50%;
      animation: rotate_ar 10s linear infinite;
    }

    //为中间圆盘添加旋转动画
    .img_ar_active {
      animation-play-state: running;
    }

    .img_ar_paused {
      animation-play-state: paused;
    }

    @keyframes rotate_ar {
      0% {
        transform: rotateZ(0deg);
      }

      100% {
        transform: rotateZ(360deg);
      }
    }

    //为中间圆盘添加旋转动画
  }

  .musicLyric-box {
    margin-top: 55px;
    width: 100%;
    height: 9.2rem;
    z-index: -1;
    overflow: scroll;
    scroll-behavior: smooth;
    .musicLyric {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-top: 1.5rem;
      width: 100%;
      // height: 9rem;
      transition: all .3s linear;
      z-index: -1;

      p {
        padding: .5rem;
        padding-top: 0;
        color: rgb(179, 175, 175);
        transition: all .1s linear;
      }

      .active {
        color: #fff;
        font-size: .32rem;
        // transform: translateY(90px);
        transition: all .1s linear;
      }
    }
  }
  .dataillFooer {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 3rem;
    box-sizing: border-box;
    .footerTop {
      width: 90%;
      display: flex;
      justify-content: space-around;

      .icon {
        width: .5rem;
        height: .5rem;
        fill: #fff;
      }
    }

    .pmgressbar {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 1.1rem;
      width: 90%;

    }

    .switchButton {
      width: 90%;
      display: flex;
      justify-content: space-around;
      align-items: center;

      .icon {
        width: .5rem;
        height: .5rem;
        fill: #fff;
      }

      .play {
        width: .8rem;
        height: .8rem;
      }
    }
  }
}
</style>