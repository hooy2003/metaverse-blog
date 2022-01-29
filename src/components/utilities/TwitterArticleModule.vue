<template>
  <div class="px-1 pt-1 pb-2 mx-4 lg:my-4 my-2 relative cursor-pointer hover:shadow-normal dark:hover:shadow-white-normal">
    <h3 
      class="text-xl min-h-[60px]"
    >
      {{title}}
    </h3>
    <p>{{pubDate}}</p>
    <div>
      <div 
        class="border-2 border-black rounded dark:text-black"
        type="text" 
      />
      <div
        class="bg-black dark:bg-white my-4 h-[2px] w-[25px]"
      />
      <div v-if="content">
        <img :src="content._url">
      </div>
      <hr>
      <p>{{link}}</p>
    </div>

    <div class="absolute bottom-8 right-6">
      <div class="bg-black dark:bg-white h-[1px] w-[25px]">
      </div>
      <div
        class="bg-black dark:bg-white h-[1px] w-[6px]"
        style="transform: rotate(45deg) translate(11px, -16px);">
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ['title', 'link', 'pubDate', 'description', 'content']
}
</script>