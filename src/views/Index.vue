<template>
  <div 
    class="w-full h-40 bg-cover bg-center text-white flex items-center flex-1 justify-center"
    style="background-image: url(./image/keyvision.jpg);"
  >
  </div>
  <div class="dark:bg-black dark:text-white">
    <div 
      class="sm:px-4 px-2 py-2 m-auto"
    >
      <div class="pb-4 px-2">
        <Suspense>
          <template #default>
            <ExchangeRate />
          </template>
          <template #fallback>
            <div>Rates Loading...</div>
          </template>
        </Suspense>
        <Suspense>
          <template #default>
            <Article />
          </template>
          <template #fallback>
            <div>Loading...</div>
          </template>
        </Suspense>
      </div>
    </div>
  </div>
</template>

<script>
import { onErrorCaptured } from 'vue'
import ExchangeRate from '../components/ExchangeRate'
import Article from '../components/Article'

export default {
  name: 'Index',
  components: {
    ExchangeRate,
    Article
  },
  setup(){
    onErrorCaptured((error)=> {
      console.log("其他的錯誤處理：", error);
    })
    return {}
  }
}
</script>
