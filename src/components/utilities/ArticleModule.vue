<template>
  <div class="px-2 mb-4 border-2 border-black relative cursor-pointer">
    <div>
      <h3 
        class="text-xl"
      >
        {{title}}
      </h3>
      <p><span class="font-bold">{{type}} -</span>{{pubTime}}</p>
    </div>
    <div class="p-1 border-l border-b border-black border-solid">
      <div v-if="thumbnail">
        <img v-if="crossDown" :id="originPubImgID" class="w-64" :src="crossDownImgSrc" alt="">
        <img v-else class="w-64" :src="thumbnail" alt="">
      </div>
      <!-- <div v-if="videoSrc">
        <img :src="crossDownVideoSrc" alt="">
        <video v-if="crossDown" :src="crossDownVideoSrc" width="360" height="426" autoplay controls type="video/mp4">
        </video>
        <video v-else :src="videoSrc" width="240" height="426"></video>
      </div> -->
      <p v-html="content" class="break-all"></p>
      <div v-html="description"></div>
      <hr class="w-16">
      <div class="text-right">
        <a class="underline break-all">{{link}}</a>
      </div>
    </div>
  </div>
</template>
<script>
import { ref,onMounted } from 'vue'

export default {
  props: ['type', 'link', 'title', 'originPub', 'pubTime', 'thumbnail', 'videoSrc', 'content', 'description', 'crossDown'],
  setup(props) {
    let originPubImgID = ref('')
    let originPubVideoID = ref('')
    let crossDownImgSrc = props.thumbnail
    // let crossDownVideoSrc = ref('nonnn')

    // let crossDownVideoSrc = ref('none?')
    // let crossDownVideoSrc = `https://scontent-yyz1-1.cdninstagram.com/v/t50.12441-16/273412281_492824035793747_860359110436096429_n.mp4?_nc_ht=scontent-yyz1-1.cdninstagram.com&_nc_cat=111&_nc_ohc=Ho2fs3hgB80AX8atMms&edm=AHlfZHwBAAAA&ccb=7-4&oe=6200898E&oh=00_AT-QvscnptUof2F4vSxpWWHLVV9oankgkI57_ud6_tYnAw&_nc_sid=21929d`
    // https://images.unsplash.com/photo-1513313778780-9ae4807465f0?auto=format&fit=crop&w=634&q=80
    // if(props.crossDown) {
    //   onMounted(() => {
    //     // let url = `https://static.pexels.com/lib/videos/free-videos.mp4`
    //     // 直接吃iG路徑好像可以
    //     let url = `https://scontent.cdninstagram.com/o1/v/t16/f1/m51/1644C335645E1F92172D3E0AEDBEEC8B_video_dashinit.mp4?efg=eyJxZV9ncm91cHMiOiJbXCJpZ193ZWJfZGVsaXZlcnlfdnRzX290ZlwiXSIsInZlbmNvZGVfdGFnIjoidnRzX3ZvZF91cmxnZW4uNDgwLnN0b3J5LmJhc2VsaW5lIn0&_nc_ht=instagram.ftpe8-4.fna.fbcdn.net&_nc_cat=110&vs=1257434988073304_2223644956&_nc_vs=HBkcFQIYRGlnX3hwdl9wZXJtYW5lbnQvMTY0NEMzMzU2NDVFMUY5MjE3MkQzRTBBRURCRUVDOEJfdmlkZW9fZGFzaGluaXQubXA0FQACyAEAKAAYABsBiAd1c2Vfb2lsATEVAAAmsrvJ3JOV4D8VAigCQzMsF0AuAAAAAAAAGBJkYXNoX2Jhc2VsaW5lXzJfdjERAHXoBwA%3D&ccb=9-4&oe=6200EAD5&oh=00_AT-pKvPCedzOzFhmO6HVfguSKkQ1-W4UugTUk6Dh6zKuig&_nc_sid=643ae9`
    //     // let url = `https://api.allorigins.win/get?url=${encodeURIComponent('https://www.picuki.com/hosted-by-instagram/url=https%3A%7C%7C%7C%7Cscontent-yyz1-1.cdninstagram.com%7C%7Cv%7C%7Ct50.12441-16%7C%7C273412281_492824035793747_860359110436096429_n.mp4%3F_nc_ht%3Dscontent-yyz1-1.cdninstagram.com%26_nc_cat%3D111%26_nc_ohc%3DHo2fs3hgB80AX8atMms%26edm%3DAHlfZHwBAAAA%26ccb%3D7-4%26oe%3D6200898E%26oh%3D00_AT-QvscnptUof2F4vSxpWWHLVV9oankgkI57_ud6_tYnAw%26_nc_sid%3D21929d')}`
    //     fetch(url)
    //     .then(response => {
    //       // if (response.ok) return new Blob([response], { type: 'video/mp4' })
    //       if (response.ok) return response.blob()
    //       throw new Error('Network response was not ok.')
    //     })
    //     .then(data => {
    //       console.log(data)
    //       console.log('-------2,')
    //       crossDownVideoSrc.value = URL.createObjectURL(data)
    //     });
    //   });
    // }

    if(props.crossDown) {
      originPubImgID = props.originPub+`img`
      originPubVideoID = props.originPub+`Video`
      // mounted 之後去拿新ＵＲＬ替換掉
      onMounted(() => {
        crossDownImgSrc = new cDg(originPubImgID).view()
        // crossDownVideoSrc = new cDg(originPubVideoID).view()
        // console.log('mounted! crossDownVideoSrc', crossDownVideoSrc)
      })
    }

    return {originPubImgID, originPubVideoID, crossDownImgSrc}
  }
}
</script>
<style>
pre {
    white-space: pre-wrap;       /* Since CSS 2.1 */
    white-space: -moz-pre-wrap;  /* Mozilla, since 1999 */
    white-space: -pre-wrap;      /* Opera 4-6 */
    white-space: -o-pre-wrap;    /* Opera 7 */
    word-wrap: break-word;       /* Internet Explorer 5.5+ */
}
</style>