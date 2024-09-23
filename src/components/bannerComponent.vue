<script setup>
import { computed } from 'vue'
const props = defineProps({
  title: {
    type: String,
    required: true
  },
  mdPl: {
    type: String,
    required: true
  },
  dxlPl: {
    type: String,
    required: true
  }
})
const spanPaddingClass = computed(() => {
  return `pl-[29px] md:pl-[${props.mdPl}] 2xl:pl-[${props.dxlPl}]`
})
</script>

<template>
  <div
    class="w-full lg:w-[989px] h-[65.95px] md:h-[143.95px] 2xl:h-[173px] bg-[#EFEFEF] flex items-center justify-start bg-[url('@/assets/businfo/infobg(375px).svg')] md:bg-[url('@/assets/businfo/infobg(768px).svg')] 2xl:bg-[url('@/assets/businfo/infobg.svg')] bg-no-repeat bg-right-bottom"
  >
    <span
      class="text-2xl md:text-4xl 2xl:text-5xl font-semibold font-SerifTC leading-9 md:leading-[150%] whitespace-nowrap"
      :class="[spanPaddingClass]"
      >{{ title }}
    </span>
  </div>
  <div class="hidden pl-[80px]"></div>
  <div class="hidden pl-[85px]"></div>
  <div class="hidden pl-[29px] md:pl-[66px] 2xl:pl-[109px]"></div>
</template>
