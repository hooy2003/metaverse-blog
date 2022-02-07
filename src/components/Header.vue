<template>
  <nav 
    class="absolute w-full flex h-16 verflow-hidden"
    :class="{
      'bg-white':route.path==='/page',
    }"
  >
    <div 
      class="flex items-center flex-1 justify-start pl-6 pr-0 font-bold cursor-pointer w-6 my-2"
      :class="{
        'text-white':route.path!='/page',
      }"
    >
      <router-link
        to="/"
      >
        <div
          class="relative text-5xl before:content-[''] before:absolute before:h-[3px] before:top-[-1px] before:w-[80%] before:left-[10%]"
          :class="{
            'before:bg-black':route.path==='/page',
            'before:bg-white':route.path!='/page',
          }"
        >
          <span>T</span>
        </div>
      </router-link>
    </div>

    <!-- <div 
      class="flex justify-center items-center w-16 h-full z-50"
      :class="{
        'bg-transparent':menuIsShow,
        'bg-mask-3/4':!menuIsShow,
        'text-white':route.path!='/page',
      }"
    > -->
      <!-- menuToggle -->
      <!-- <div 
        class="__menuToggle"
        :class="{'__show':menuIsShow}"
        @click="changeMenuShow"
      >
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div> -->
    
    <!-- menu -->
    <!-- <div 
      class="absolute w-full h-screen text-white overflow-hidden"
      :class="{'pointer-events-auto':menuIsShow, 'pointer-events-none':!menuIsShow}"
    >
      <div 
        class="__menu__mask"
        :class="{'__show':menuIsShow}"
        @click="changeMenuShow"
      />

      <div 
        class="__menu"
        :class="{'__show':menuIsShow}"
      >
        <div class="h-full">
           <ul class="relative text-xl pl-6 top-[32vh]">
            <router-link
              to="/"
            >
              <li class="mt-12">Index</li>
            </router-link>
            <router-link
              to="/page"
            >
              <li class="mt-12">Page</li>
            </router-link>
          </ul>
        </div>
      </div>
    </div> -->
  </nav>
</template>
<script>
import { ref } from 'vue'
import { onBeforeRouteLeave, useRoute } from 'vue-router'
export default {
  name: 'Header',
  setup() {
    let menuIsShow = ref(false)
    let changeMenuShow = ()=> {
      menuIsShow.value = !menuIsShow.value;
    }

    const route = useRoute()

    onBeforeRouteLeave((to, from)=>{
      menuIsShow.value = false;
    })

    return {menuIsShow, changeMenuShow, route}
  }
}
</script>