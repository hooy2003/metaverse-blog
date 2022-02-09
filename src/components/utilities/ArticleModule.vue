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
      
      <video v-if="type=='ig'&&videoSrc" ref="myVideo" class="video-js vjs-big-play-centered"></video>
      
      <p v-html="content" class="break-all"></p>
      <div v-html="description"></div>
      <div class="text-right">
        <a class="underline break-all">{{link}}</a>
      </div>
    </div>
  </div>
</template>
<script>
import { ref,onMounted, onBeforeUnmount } from 'vue'
import videojs from 'video.js';

export default {
  props: ['type', 'link', 'title', 'originPub', 'pubTime', 'thumbnail', 'videoSrc', 'content', 'description', 'crossDown'],
  setup(props) {
    let originPubImgID = ref('')
    let crossDownImgSrc =ref('')

    let myPlayer = ref(null)
    let myVideo = ref(null)
    let videoTimer = ref(null)

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

        // ig 影片處理
        // 可視範圍內才播放
        // 是否要加入「播放過」後就清除setInterval，提高效能？
        function isOverTheScreen(container) {
          const { top, bottom, height } = container.getBoundingClientRect()
          return top < (- height / 2) || top > (window.innerHeight - (height / 2))
        }

        // 直接吃iG路徑好像可以
        // 這邊先寫死路徑，先測試滑到後才播放 0208:15
        // let url = props.videoSrc
        // fetch(url)
        // .then(response => {
        //   // if (response.ok) return new Blob([response], { type: 'video/mp4' })
        //   if (response.ok) return response.blob()
        //   throw new Error('Network response was not ok.')
        // })
        // .then(data => {
        //   console.log(URL.createObjectURL(data))
      // 解決手機自動播放問題 => playsinline
      // 影片的預覽圖有跨域的問題＝＝巨北爛
        if(props.videoSrc) {
          myPlayer.value = videojs(myVideo.value,{
            sources:[{ src: props.videoSrc}],
            loop:true,
            muted:true,
            poster:'https://fakeimg.pl/480x854/?text=Loading',
            playsinline: true,
            width:"240px",
            height:"426px",
            controls:false
          });
          myPlayer.value.ready(function() {

            videoTimer.value = setInterval(function () {
              if (isOverTheScreen(myVideo.value))
                myPlayer.value.pause()
              else
                myPlayer.value.play()
            }, 500)

            // let promise = myPlayer.value.play();
            // if (promise !== undefined) {
            //   promise.then(function() {
            //     // Autoplay started!
            //   }).catch(function(error) {
            //     // Autoplay was prevented.
            //   });
            // }
          });
        // });
        }
      }
    })

    onBeforeUnmount(()=>{
      if(myPlayer.value) {
        myPlayer.value.dispose()
      }
      if(videoTimer.value) {
        clearInterval(videoTimer.value)
      }
    })

    return {originPubImgID, crossDownImgSrc, myVideo, myPlayer}
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