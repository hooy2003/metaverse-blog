<template>
  <router-view name="header"/>
  <router-view/>
</template>
<script>
export default {
  setup() {
    if(customconfig.theme==='moon') {
      document.documentElement.classList.add('dark')
    }
    if(customconfig.theme==='sun') {
      document.documentElement.classList.remove('dark')
    }
  }
}
</script>