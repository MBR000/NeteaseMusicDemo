<template>
    <!-- 搜索框 -->
    <div class="searchTop">
      <svg class="icon" aria-hidden="true" @click="$router.go(-1)">
        <use xlink:href="#icon-zuojiantou"></use>
      </svg>
      <input type="text" :placeholder="placeholder" v-model="searchKey" @keydown.enter="enterKey">
      <span @click="enterKey">搜索</span>
    </div>
    <div class="searchBottom">
      <!-- 搜索历史 -->
      <div class="searchHistory">
        <span class="history">历史</span>
        <div class="hisbox">
            <span v-for="item in keyWordList" :key="item" class="spanKey" @click="searchHistory(item)">
              {{ item }}
            </span>
        </div>
        <svg class="icon" aria-hidden="true" @click="delHistory">
          <use xlink:href="#icon-shanchu"></use>
        </svg>
      </div>
      <!-- 歌曲列表 -->
      <div class="listBottom">
        <ul>
          <li v-for="(item, index, id) in searchList" :key="id">
            <div class="song" @click="updateIndex(item, index)">
                <div class="index">{{ index + 1 }}</div>
                <div>
                    <div class="songName">{{ item.name }}</div>
                    <div class="songAuthor" v-for="(author, id) in item.artists" :key="id">
                        {{ author.name }}
                    </div>
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
import {getSearchMusic} from '@/request/api/home'
export default {
    data(){
        return{
            keyWordList: [],
            searchKey: '',
            searchList: [],
        }
    },
    mounted(){
        this.keyWordList = JSON.parse(localStorage.getItem('keyWordList')) || []
    },
    methods: {
        enterKey: async function(){
            if(this.searchKey != ''){

                this.keyWordList.unshift(this.searchKey)
                this.keyWordList = [...new Set(this.keyWordList)]
                if(this.keyWordList.length > 5)
                    this.keyWordList.pop()
                localStorage.setItem('keyWordList',JSON.stringify(this.keyWordList))
                let res = await getSearchMusic(this.searchKey)
                console.log(res)
                this.searchList = res.data.result.songs
                
                this.searchKey = ''
            }    
        },
        delHistory:function(){
            localStorage.removeItem('keyWordList')
            this.keyWordList = []
        },
        searchHistory: async function(item){
            let res = await getSearchMusic(item)
            this.searchList = res.data.result.songs
            console.log(res.data.result.songs)
        },
        updateIndex:function(item){
            item.al = item.album
            item.al.picUrl = item.album.artist.img1v1Url
            this.$store.commit('pushPlayList',item)
            this.$store.commit('updatePlayListIndex',this.$store.state.playList.length - 1)
        }
    }
}
</script>


<style lang="less" scoped>
.searchTop {
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  padding: 0 .2rem;
  width: 100%;
  height: 1rem;


  input {
    margin-left: .4rem;
    padding: .1rem;
    border: none;
    border-bottom: .02rem solid #999;
    width: 5rem;
  }

  span {
    margin-left: .3rem;
    font-size: .32rem;
  }
}

.searchBottom {
  margin-top: 1rem;
  width: 100%;
  padding: .1rem;
  height: 12rem;
    box-sizing: border-box;
  .searchHistory {
    position: relative;
    width: 1;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    .history {
      font-size: .3rem;
      font-weight: 700;
      
    }
    .hisbox{
        width: 6rem;
        .spanKey {
            display: inline-block;
            margin: .1rem;
            padding: .1rem .2rem;
            background-color: rgb(172, 172, 172);
            border-radius: .5rem;
            color: #fff;
        }
      }
    

    .icon {
      width: .4rem;
      height: .4rem;
    }
  }

  //歌曲列表
  .listBottom {
    // margin-bottom: 55px;
    width: 100%;
    padding: .2rem;

    ul {
   
      li {
        margin: .1rem 0;
        width: 7rem;
        height: 50px;
        border-bottom: .02rem solid #e9e9ea;
        display: flex;
        justify-content: space-between;
        box-sizing: border-box;
        .song {
            
          display: flex;
          justify-content: flex-start;
          padding-top: .24rem;
          width: 70%;
          height: 100%;
          text-overflow: ellipsis;
          white-space: nowrap;
          overflow: hidden;
            span{
                text-align:center;
            }
            .index{
                width: .4rem;
            }
          .songName {
            display: block;
            line-height: .28rem;
            font-size: .28rem;
            margin-left: .2rem;
          }

          .songAuthor {
            margin-left: .2rem;
            font-size: .2rem;
            color: #999;
          }
        }

        .listBottom-right {
          display: flex;
          align-items: center;
            justify-content: flex-end;
          height: 100%;
          line-height: 1rem;
          fill: #999;
        }
      }
    }
  }
}
</style>