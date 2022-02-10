<template>
  <div class="px-2 mb-4 border-2 border-black relative cursor-pointer">
    <div>
      <h3 
        class="text-xl"
      >
        {{title}}
      </h3>
      <p>
        <span 
          class="font-bold"
          :class="{ 
            'text-rose-500': type == 'ig',
          }"
        >{{type}} -</span>
        {{pubTime}}
      </p>
    </div>
    <div class="p-1 border-l border-b border-black border-solid">
      <div>
        <img v-if="type=='ig'" :id="originPubImgID" class="w-64" :src="crossDownImgSrc" alt="">
        <img v-else class="w-64" :src="thumbnail" alt="">
      </div>
      <VideoContent 
        v-if="type=='ig'"
        :videoSrc=videoSrc
      />
      <p v-html="content" class="break-all"></p>
      <div v-html="description"></div>
      <div class="text-right">
        <a class="underline break-all">{{link}}</a>
      </div>
    </div>
  </div>
</template>
<script>
import { ref,onMounted } from 'vue'
import VideoContent from './VideoContent'

export default {
  props: ['type', 'link', 'title', 'originPub', 'pubTime', 'thumbnail', 'videoSrc', 'content', 'description', 'crossDown'],
  components: {
    VideoContent
  },
  setup(props) {
    let originPubImgID = ref('')
    let crossDownImgSrc =ref('')

    if(props.type=='ig') {
      originPubImgID.value = props.originPub+`img`||''
      crossDownImgSrc.value = props.thumbnail||''
    }

    onMounted(() => {
      if(props.type=='ig') {
        // ig 圖片跨域
        if(originPubImgID.value) {
          crossDownImgSrc.value = new cDg(originPubImgID.value).view()
        }
      }
    })

    return {originPubImgID, crossDownImgSrc}
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