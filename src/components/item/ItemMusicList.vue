<template>
    <div class="itemMusicList">
    <!-- 列表顶部 -->
    <div class="listTop">
        <div class="listSubTop">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-bofang"></use>
            </svg>
            <!-- 播放全部 -->
            <div class="allPlay">
                <span>播放全部</span>
                <div>(共{{ itemlist.length }}首)</div>
            </div>
        </div>
      <!-- 播放图标 -->
      
      <!-- 收藏 -->
      <div class="collect">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-jiahao-copy"></use>
        </svg>
        <span>收藏</span>
        <div>({{ subscribedCount }})</div>
      </div>
    </div>

    <!-- 列表底部 -->
    <div class="listBottom">
      <ul>
        <li v-for="(item, index, id) in itemlist" :key="id">
          <div class="listBottom-left">
            <span class="index">{{ index + 1 }}</span>
            <div class="song" @click="playMusic(index)">
                <span class="songName">{{ item.name }}</span>
                <span class="songAuthor" v-for="(author, id) in item.ar" :key="id">
                {{ author.name }}
                </span>
            </div>
          </div>
          <div class="listBottom-right">
            <svg class="icon MV" aria-hidden="true" v-show="item.mv != 0">
              <use xlink:href="#icon-shipin"></use>
            </svg>
            <svg class="icon list" aria-hidden="true">
              <use xlink:href="#icon-31liebiao"></use>
            </svg>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
    setup(props) {
        console.log(props.itemlist)
    },
    props:['itemlist','subscribedCount'],
    methods:{
      playMusic:function(i){
        this.updateIsbtnShow(false)
        this.updatePlayList(this.itemlist)
        this.updatePlayListIndex(i)
      },
      ...mapMutations(['updateIsbtnShow','updatePlayList','updatePlayListIndex'])
    }
}
</script>

<style lang="less" scoped>
.itemMusicList {
  margin-top: .5rem;
  margin-bottom: .4rem;
  padding: .2rem;
  background-color: #fff;
  border-top-left-radius: .4rem;
  border-top-right-radius: .4rem;
  width: 100%;
  box-sizing: border-box;
  // height: 500px;

  // 顶部
  .listTop {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 1rem;
    .listSubTop{
        display: flex;
        justify-items: flex-start;
        .icon {
            width: 0.4rem;
            height: 0.4rem;
        }
        .allPlay {
            display: flex;
            align-items: center;
            margin-left: 0.2rem;
            font-weight: 600;

        }
    
    }

    .collect {
      display: flex;
      align-items: center;
      padding: .1rem .2rem;
      height: 70%;
      background-color: red;
      color: #fff;
      border-radius: 25px;
      font-size: 14px;
      line-height: 70%;

      .icon {
        padding-right: 5px;
      }
    }
  }

  //底部
  .listBottom {
    width: 100%;

    ul {
      li {
        margin: 0.1rem 0;
        height: 1rem;
        display: flex;
        justify-content: space-between;
        .listBottom-left{
            display: flex;
            justify-content: flex-start;
            .index {
                width: .32rem;
                line-height: 1rem;
            }

            .song {
                margin-left: .2rem;
                padding-top: .24rem;
                width: 4.5rem;

                .songName {
                    display: block;
                    font-weight: 700;
                    line-height: .28rem;
                    font-size: .28rem;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }

                .songAuthor {
                    font-size: 12px;
                    color: #999;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    overflow: hidden;
                }
            }

        }
        
        .listBottom-right {
          display: flex;
          align-items: center;
          
          height: 100%;
          line-height: 1rem;
          fill: #999;

          .list {
            margin-left: .2rem;
          }
        }
      }
    }
  }
}
</style>