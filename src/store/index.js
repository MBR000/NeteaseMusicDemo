import { getPhoneLogin } from '@/request/api/home'
import { getMusicLyric} from '@/request/api/item'
import { createStore } from 'vuex'

export default createStore({
  state: {
    playList:[{
      al:{
        id:128577126,
        name:"O SA BE KHONG LAK",
        pic:109951165929038828,
        picUrl:"https://p1.music.126.net/gtzaOYEY6WN24zai2JG5ww==/109951165929038814.jpg",
        pic_str:"109951165929038814",
      },
      name:'暂未选择',
      id:316654
    }],
    playListIndex:0,
    IsbtnShow:true,
    detailShow:false,//控制弹出层
    lyricList:{},
    currentTime:0,
    duration:0,
    changeTime: 0,//改变后的时间
  },
  getters: {
  },
  mutations: {
    updateIsbtnShow:function(state,value){
      state.IsbtnShow = value
    },
    //更新歌单
    updatePlayList:function(state,value){
      state.playList = value
    },
    updatePlayListIndex:function(state,value){
      state.playListIndex = value
    },
    updatedetailShow:function(state){
      state.detailShow = !state.detailShow 
    },
    updateLyricList: function(state, value){
      state.lyricList = value
    },
    updateCurrentTime: function(state, value){
      state.currentTime = value
      // console.log(value)
    },
    updateDuration: function(state, value){
      state.duration = value
      // console.log(value)
    },
    //更新歌曲改变后的时间
    updateChangeTime(state, value) {
      state.changeTime = value
    },
    pushPlayList(state, value){
      state.playList.push(value)
    }
  },
  actions: {
    getLyric:async function(context,value){
      let res = await getMusicLyric(value)
      // console.log(res)
      context.commit('updateLyricList',res.data.lrc)
    },

  },  
  modules: {
  }
})
