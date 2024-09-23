<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { computed } from 'vue'
import NavBar from '@/components/homepage/NavBar.vue'
import FooterView from '@/components/homepage/FooterView.vue'
import allNews from '@/components/allNews.vue'
import busNews from '@/components/busNews.vue'
import interbusNews from '@/components/interbusNews.vue'
import home from '@/assets/businfo/home.svg'
import bannerComponent from '@/components/bannerComponent.vue'
import { useButtonStore } from '@/stores/store.js'
const props = defineProps({
  switchStateFun: {
    type: Function,
    required: false
  }
})
const buttonStore = useButtonStore()
const switchState = (btn) => {
  buttonStore.updateSelectedState(btn)
  if (props.switchStateFun) {
    props.switchStateFun(btn)
  }
}
const selectedState = computed(() => buttonStore.selectedState)
</script>
<template>
  <NavBar />
  <div class="w-full lg:w-[989px] mx-auto mb-72 lg:pt-[100px] pt-[57px]">
    <bannerComponent title="最新消息" mdPl="66px" dxlPl="109px" />
    <div
      class="w-full breadcrumbs text-base font-medium leading-[150%] mx-auto px-[30px] py-[15px]"
    >
      <ul class="text-[#818181] gap-3">
        <li>
          <RouterLink to="/" class="gap-2">
            <img :src="home" alt="" />
            首頁
          </RouterLink>
        </li>
        <li class="flex gap-3">
          <a> 最新消息 </a>
        </li>
        <li class="flex gap-3">
          <span class="inline-flex items-center gap-2 text-[#108313]">
            {{
              selectedState === 'all'
                ? '全部消息'
                : selectedState === 'bus'
                  ? '市區公車'
                  : '國道客運'
            }}
          </span>
        </li>
      </ul>
    </div>
    <div class="flex flex-col lg:flex-row">
      <div class="w-full lg:w-[210px] flex lg:block">
        <button
          @click="switchState('all')"
          :class="selectedState === 'all' ? 'bg-[#FFF7D3] text-black' : 'bg-white text-[#818181]'"
          type="button"
          class="w-1/3 lg:w-full h-[60px] text-lg font-medium leading-[150%] flex items-center justify-center"
        >
          全部消息
        </button>
        <button
          @click="switchState('bus')"
          :class="selectedState === 'bus' ? 'bg-[#D2E3D3] text-black' : 'bg-white text-[#818181]'"
          type="button"
          class="w-1/3 lg:w-full h-[60px] text-lg font-medium leading-[150%] flex items-center justify-center"
        >
          市區公車
        </button>
        <button
          @click="switchState('interbus')"
          :class="
            selectedState === 'interbus' ? 'bg-[#DDE1FF] text-black' : 'bg-white text-[#818181]'
          "
          type="button"
          class="w-1/3 lg:w-full h-[60px] text-lg font-medium leading-[150%] flex items-center justify-center"
        >
          國道客運
        </button>
      </div>
      <allNews v-if="selectedState === 'all'" />
      <busNews v-else-if="selectedState === 'bus'" />
      <interbusNews v-else />
    </div>
  </div>
  <FooterView />
  <RouterView />
</template>
<style scoped>
.breadcrumbs > ul > li + *:before {
  width: 10.63px;
  height: 10.63px;
  padding: 0px;
  margin: 2px 5px;
  color: #818181;
  opacity: 1;
  border-top: 2px solid;
  border-right: 2px solid;
}
</style>
