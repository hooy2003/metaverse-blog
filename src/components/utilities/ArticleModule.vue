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
      <div v-if="videoSrc">
        <img :src="crossDownVideoSrc" alt="">
        <video v-if="crossDown" :src="crossDownVideoSrc" width="360" height="426" autoplay controls type="video/mp4">
        </video>
        <video v-else :src="videoSrc" width="240" height="426"></video>
      </div>
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

    let crossDownVideoSrc = ref('none?')
    if(props.crossDown) {
      onMounted(() => {
        // 直接吃iG路徑好像可以
        let url = `https://instagram.ftpe7-1.fna.fbcdn.net/o1/v/t16/f1/m38/6B4AA51061A21D1FF076C02B2CD9BEB6_video_dashinit.mp4?efg=eyJxZV9ncm91cHMiOiJbXCJpZ193ZWJfZGVsaXZlcnlfdnRzX290ZlwiXSIsInZlbmNvZGVfdGFnIjoidnRzX3ZvZF91cmxnZW4uNzIwLnN0b3J5LmJhc2VsaW5lb2lsIn0&_nc_ht=instagram.ftpe7-1.fna.fbcdn.net&_nc_cat=110&vs=357364252899835_2458987290&_nc_vs=HBksFQIYRGlnX3hwdl9lcGhlbWVyYWwvNkI0QUE1MTA2MUEyMUQxRkYwNzZDMDJCMkNEOUJFQjZfdmlkZW9fZGFzaGluaXQubXA0FQACyAEAFQAYJEdFbzVUQkRYZzFBcDBRc0JBRkc4aXA2NnhWSVBicGt3QUFBRhUCAsgBACgAGAAbAYgHdXNlX29pbAExFQAAJoznmvriktc%2FFQIoAkMzLBdALgAAAAAAABgVZGFzaF9iYXNlbGluZW9pbF8xX3YxEQB16AcA&ccb=9-4&oe=62033183&oh=00_AT8DBd6KfgKSVK21_e0rMcfrfJUZdzE__a7eqzWdNQfCfg&_nc_sid=643ae9`
        fetch(url)
        .then(response => {
          // if (response.ok) return new Blob([response], { type: 'video/mp4' })
          if (response.ok) return response.blob()
          throw new Error('Network response was not ok.')
        })
        .then(data => {
          console.log(URL.createObjectURL(data))
          console.log('-------2,')
          crossDownVideoSrc.value = URL.createObjectURL(data)
        });
      });
    }

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

    return {originPubImgID, originPubVideoID, crossDownImgSrc, crossDownVideoSrc}
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