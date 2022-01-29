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
        <img class="w-64" :src="thumbnail" alt="">
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
export default {
  props: ['type', 'link', 'title', 'pubTime', 'thumbnail', 'content', 'description']
}
</script>