<template>
  <div class="">
    <p>BTC/USDT: {{BTCRate}}</p>
    <p>ETH/USDT: {{ETHRate}}</p>
  </div>
</template>
<script>
import { ref } from 'vue'
import Request from '../request'


export default {
  name: 'ExchangeRates',
  async setup() {
    let BTCRate = ref('')
    let ETHRate = ref('')

    await Request.getExchangeRates('BTC','USDT')
    .then(success =>{
      BTCRate.value = success
    })
    .catch(fail => {
      console.log('BTC catch wrong')
    })
    await Request.getExchangeRates('ETH','USDT')
    .then(success =>{
      ETHRate.value = success
    })
    .catch(fail => {
      console.log('ETH catch wrong')
    })
    return {BTCRate, ETHRate}
  }
}
</script>