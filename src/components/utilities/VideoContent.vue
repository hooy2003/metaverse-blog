
<template>
  <div v-if="videoSrc">
    <video ref="myVideo" class="video-js vjs-big-play-centered"></video>
  </div>
  <div v-else="">
    video url is unknow
  </div>
</template>
<script>
import { ref,onMounted, onBeforeUnmount } from 'vue'
import videojs from 'video.js';

export default {
  props:['videoSrc'],
  setup(props) {
    let myPlayer = ref(null)
    let myVideo = ref(null)
    let videoTimer = ref(null)

    onMounted(() => {
      // 影片處理
      // 可視範圍內才播放
      // 是否要加入「播放過」後就清除setInterval，提高效能？
      function isOverTheScreen(container) {
        const { top, bottom, height } = container.getBoundingClientRect()
        return top < (- height / 2) || top > (window.innerHeight - (height / 2))
      }
      // 解決手機自動播放問題 => playsinline, controls
      // 影片的預覽圖有跨域的問題???
      if(props.videoSrc) {
        myPlayer.value = videojs(myVideo.value,{
          sources:[{ src: props.videoSrc}],
          loop:true,
          muted:true,
          poster:'https://fakeimg.pl/480x854/?text=Loading',
          playsinline: true,
          width:"240px",
          height:"426px",
          controls:true
        });
        myPlayer.value.ready(function() {

          videoTimer.value = setInterval(function () {
            if (isOverTheScreen(myVideo.value))
              myPlayer.value.pause()
            else
              myPlayer.value.play()
          }, 500)
          
          // 如果要處理影片播放後的事件
          // let promise = myPlayer.value.play();
          // if (promise !== undefined) {
          //   promise.then(function() {
          //     // Autoplay started!
          //   }).catch(function(error) {
          //     // Autoplay was prevented.
          //   });
          // }
        });
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
    
    return {myVideo, myPlayer}
  }
}
</script>
