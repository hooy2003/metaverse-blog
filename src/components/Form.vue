<template>
  <div class="dark:bg-black dark:text-white">
    <div 
      class="sm:px-24 px-2 py-20 m-auto lg:max-w-[1440px] max-w-[660px"
    >
      <div class="grid lg:grid-cols-3 pb-10 px-8">
        <InputModule
          type="input"
          title="輸入你的名字"
          text="你就會得到一篇姓名分析文啦！"
        />
        <InputModule
          type="radio"
          title="選擇你的血型"
          text="你就會得到一篇血型分析文啦！"
        />
        <InputModule
          type="select"
          title="選擇你的星座"
          text="你就會得到一篇星座分析文啦！"
        />
      </div>
      <div class="mt-4 mb-4 text-center w-full flex justify-center">
        <button 
          class="border border-black dark:border-white py-2 px-16 cursor-pointer"
          @click="changeTheme"
        >
          Change theme
        </button>
      </div>
    </div>
  </div>
</template>
<script>
import InputModule from './utilities/InputModule'
export default {
  name: 'Form',
  components: {
    InputModule
  },
  setup() {
    // 僅實現兩種切換，看出主題差異
    let changeTheme = ()=> {
      document.documentElement.classList.toggle('dark')
    }
    return {changeTheme}
  }
}
</script>