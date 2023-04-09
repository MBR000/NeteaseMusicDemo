import service from "..";

export function getMusicItemList(id){
    return service({
        method:'GET',
        url:`/playlist/detail?id=${id}`
    })
}
//获取全部歌曲
export function getItemList(id,limit=20,offset=0){
    return service({
        method:'GET',
        url:`/playlist/track/all?id=${id}&limit=${limit}&offset=${offset}`
    })
}
//获取歌词
export function getMusicLyric(id){
    return service({
        method:'GET',
        url:`/lyric?id=${id}`
    })
}