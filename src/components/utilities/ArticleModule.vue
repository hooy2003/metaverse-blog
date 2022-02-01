<template>
  <div class="px-2 mb-4 border-2 border-black relative cursor-pointer hover:shadow-normal">
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
        <img v-if="crossDown" :id="originPub" class="w-64" :src="crossDownImgSrc" alt="">
        <img v-else class="w-64" :src="thumbnail" alt="">
      </div>
      <p v-if="content" class="break-all">{{content}}</p>
      <div v-html="description"></div>
      <hr class="w-16">
      <div class="text-right">
        <a class="underline break-all">{{link}}</a>
      </div>
    </div>
  </div>
</template>
<script>
import { onMounted } from 'vue'

export default {
  props: ['type', 'link', 'title', 'originPub', 'pubTime', 'thumbnail', 'content', 'description', 'crossDown'],
  setup(props) {
    let crossDownImgSrc = props.thumbnail

    if(props.crossDown) {
      // mounted 之後去拿新ＵＲＬ替換掉
      onMounted(() => {
        crossDownImgSrc = new cDg(props.originPub).view()
        console.log('mounted! crossDownImgSrc', crossDownImgSrc)
      })
    }

    return {crossDownImgSrc}
  }
}
</script>