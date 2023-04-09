<template>
    <div class="TopNav">
        <div class="topLeft">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-31liebiao"></use>
            </svg>
        </div>
        
        <div class="topContent">
            <span >我的</span>
            <span class="active">发现</span>
            <span>云村</span>
            <span>视频</span>
        </div>
        
        <div class="TopRight">
            <svg class="icon" aria-hidden="true" @click="$router.push('/search')">
                <use xlink:href="#icon-sousuo"></use>
            </svg>
        </div>
       
    </div> 
</template>
<style lang="less" scoped>
    .TopNav{
        width: 100%;
        padding: .2rem;
        height: 1rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        box-sizing: border-box;
        .topContent{
            width: 65%;
            display: flex;
            height: 1rem;
            justify-content: space-around;
            align-items: center;
            font-size: .36rem;
            .active{
                font-weight: 900;
            }
        }
    }
</style>