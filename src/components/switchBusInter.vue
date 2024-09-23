<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useButtonStore } from '@/stores/store.js'
const props = defineProps({
  switchBtnFun: {
    type: Function,
    required: true
  }
})
const router = useRouter()
const buttonStore = useButtonStore()
const switchBtn = (btn) => {
  buttonStore.updateSelectedBtn(btn)
  props.switchBtnFun(btn)
  if (btn === 'taipei') {
    router.push('/businfo')
  }
}
const selectedBtn = computed(() => buttonStore.selectedBtn)
</script>
<template>
  <div class="flex bg-white">
    <button
      @click="switchBtn('bus')"
      :class="
        selectedBtn === 'bus'
          ? ' border-b-[5px] border-[#108313] text-[#108313]'
          : ' border-b-[2px] border-[#818181] text-[#818181]'
      "
      class="w-1/2 md:w-[246px] p-[10px]"
    >
      <p class="text-center text-2xl font-SansTC font-medium leading-[150%]">市區公車</p>
    </button>
    <button
      @click="switchBtn('taipei')"
      :class="
        selectedBtn === 'taipei'
          ? ' border-b-[5px] border-[#108313] text-[#108313]'
          : ' border-b-[2px] border-[#818181] text-[#818181]'
      "
      class="w-1/2 md:w-[246px] p-[10px]"
    >
      <p class="text-center text-2xl font-SansTC font-medium leading-[150%]">豐原-臺北</p>
    </button>
    <div class="bg-white flex-grow p-[10px] border-b-[2px] border-[#818181] hidden md:block"></div>
  </div>
</template>
