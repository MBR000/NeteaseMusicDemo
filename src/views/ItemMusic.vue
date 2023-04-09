<template>
    <div>
        <ItemMusicTop :playlist="state.playlist"/>
        <ItemMusicList :itemlist="state.itemlist" :subscribedCount="state.playlist.subscribedCount"/>
    </div>
</template>

<script>
import {useRoute} from "vue-router";
import {onMounted,reactive} from "vue";
import {getMusicItemList,getItemList} from "@/request/api/item.js";
import ItemMusicTop from '@/components/item/ItemMusicTop'
import ItemMusicList from '@/components/item/ItemMusicList'
export default{
    setup(){
        const state = reactive({
            playlist:{},
            itemlist:[]
        });
        onMounted(async ()=>{
            let id = useRoute().query.id;
            // console.log(id);
            let res = await getMusicItemList(id);
            // console.log(res);
            state.playlist=res.data.playlist

            let itemres = await getItemList(id);
            // console.log(itemres);
            state.itemlist = itemres.data.songs

            sessionStorage.setItem("itemDetail",JSON.stringify(state));
        });
        return {state}
    },
    components:{
        ItemMusicTop, ItemMusicList
    }
};
</script>