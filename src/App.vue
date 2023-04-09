<template>
  <router-view/>
  <FooterMusic/>
</template>

<script>
import FooterMusic from "@/components/item/FooterMusic"
export default {
  setup() {
    
  },
  components:{
    FooterMusic
  }
}
</script>

<style lang="less">
// body{
//   height: 100%;
// }
*{
  margin: 0;
  padding: 0;
  box-sizing: 0;
}
.icon {
  width: .5rem;
  height: .5rem;
}

a {
  color: black;
}
</style>
