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
        <img v-if="type=='ig'" :id="originPubImgID" class="w-64" :src="crossDownImgSrc" alt="">
        <img v-else class="w-64" :src="thumbnail" alt="">
      </div>
      
        <p v-if="type=='ig'">video-test-1</p>
        <video v-if="type=='ig'" ref="myVideo" class="video-js vjs-big-play-centered"></video>
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
        crossDownImgSrc.value = new cDg(originPubImgID.value).view()

        // ig 影片處理
        // 可視範圍內才播放
        // 是否要加入「播放過」後就清除setInterval，提高效能？
        function isOverTheScreen(container) {
          const { top, bottom, height } = container.getBoundingClientRect()
          return top < (- height / 2) || top > (window.innerHeight - (height / 2))
        }

        // 直接吃iG路徑好像可以
        // 這邊先寫死路徑，先測試滑到後才播放 0208:15
        let url = `https://instagram.ftpe7-1.fna.fbcdn.net/o1/v/t16/f1/m38/6B4AA51061A21D1FF076C02B2CD9BEB6_video_dashinit.mp4?efg=eyJxZV9ncm91cHMiOiJbXCJpZ193ZWJfZGVsaXZlcnlfdnRzX290ZlwiXSIsInZlbmNvZGVfdGFnIjoidnRzX3ZvZF91cmxnZW4uNzIwLnN0b3J5LmJhc2VsaW5lb2lsIn0&_nc_ht=instagram.ftpe7-1.fna.fbcdn.net&_nc_cat=110&vs=357364252899835_2458987290&_nc_vs=HBksFQIYRGlnX3hwdl9lcGhlbWVyYWwvNkI0QUE1MTA2MUEyMUQxRkYwNzZDMDJCMkNEOUJFQjZfdmlkZW9fZGFzaGluaXQubXA0FQACyAEAFQAYJEdFbzVUQkRYZzFBcDBRc0JBRkc4aXA2NnhWSVBicGt3QUFBRhUCAsgBACgAGAAbAYgHdXNlX29pbAExFQAAJoznmvriktc%2FFQIoAkMzLBdALgAAAAAAABgVZGFzaF9iYXNlbGluZW9pbF8xX3YxEQB16AcA&ccb=9-4&oe=62033183&oh=00_AT8DBd6KfgKSVK21_e0rMcfrfJUZdzE__a7eqzWdNQfCfg&_nc_sid=643ae9`
        fetch(url)
        .then(response => {
          // if (response.ok) return new Blob([response], { type: 'video/mp4' })
          if (response.ok) return response.blob()
          throw new Error('Network response was not ok.')
        })
        .then(data => {
          console.log(URL.createObjectURL(data))
      // 解決手機自動播放問題 => playsinline
          myPlayer.value = videojs(myVideo.value,{
            sources:[{ src: 'https://instagram.ftpe7-1.fna.fbcdn.net/o1/v/t16/f1/m38/6B4AA51061A21D1FF076C02B2CD9BEB6_video_dashinit.mp4?efg=eyJxZV9ncm91cHMiOiJbXCJpZ193ZWJfZGVsaXZlcnlfdnRzX290ZlwiXSIsInZlbmNvZGVfdGFnIjoidnRzX3ZvZF91cmxnZW4uNzIwLnN0b3J5LmJhc2VsaW5lb2lsIn0&_nc_ht=instagram.ftpe7-1.fna.fbcdn.net&_nc_cat=110&vs=357364252899835_2458987290&_nc_vs=HBksFQIYRGlnX3hwdl9lcGhlbWVyYWwvNkI0QUE1MTA2MUEyMUQxRkYwNzZDMDJCMkNEOUJFQjZfdmlkZW9fZGFzaGluaXQubXA0FQACyAEAFQAYJEdFbzVUQkRYZzFBcDBRc0JBRkc4aXA2NnhWSVBicGt3QUFBRhUCAsgBACgAGAAbAYgHdXNlX29pbAExFQAAJoznmvriktc%2FFQIoAkMzLBdALgAAAAAAABgVZGFzaF9iYXNlbGluZW9pbF8xX3YxEQB16AcA&ccb=9-4&oe=62033183&oh=00_AT8DBd6KfgKSVK21_e0rMcfrfJUZdzE__a7eqzWdNQfCfg&_nc_sid=643ae9'}],
            loop:true,
            muted:true,
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

            // let promise = myPlayer.value.play();
            // if (promise !== undefined) {
            //   promise.then(function() {
            //     // Autoplay started!
            //   }).catch(function(error) {
            //     // Autoplay was prevented.
            //   });
            // }
          });
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