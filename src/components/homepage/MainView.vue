<script setup>
import { ref, onMounted, onUnmounted, watchEffect } from 'vue'
import { RouterLink, RouterView } from 'vue-router'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SwiperView from '../homepage/SwiperView.vue'
import SwiperView375 from '../homepage/SwiperView375.vue'
import flag from '@/assets/homepage/main/flag.svg'
import flagbg2 from '@/assets/homepage/main/flagbg2.svg'
import linedot from '@/assets/homepage/main/linedot.svg'
import road from '@/assets/homepage/main/road.svg'
import roadbus from '@/assets/homepage/main/roadbus.svg'
import city01 from '@/assets/homepage/main/city01.svg'
import city02 from '@/assets/homepage/main/city02.svg'
import stop1 from '@/assets/homepage/main/stop1.svg'
import stop2 from '@/assets/homepage/main/stop2.svg'
import stop3 from '@/assets/homepage/main/stop3.svg'
import stop4 from '@/assets/homepage/main/stop4.svg'

import { useButtonStore } from '@/stores/store.js'
const buttonStore = useButtonStore()
const updateState = (btn) => {
  buttonStore.updateSelectedState(btn)
}
gsap.registerPlugin(ScrollTrigger)

const scrollAnimate1400 = () => {
  let tl = gsap.timeline({
    scrollTrigger: {
      trigger: '.road',
      start: '20% 80%',
      end: '60% center',
      scrub: 3,
      // markers: true,
      toggleActions: 'restart pause reverse pause'
    }
  })
  tl.to('.roadbus', { x: 0, y: 400, scale: 2, duration: 2, opacity: 1 }).to('.roadbus', {
    x: 0,
    y: 595,
    scale: 2,
    duration: 3,
    opacity: 0
  })
}

const scrollAnimate375 = () => {
  let tl = gsap.timeline({
    scrollTrigger: {
      trigger: '.road',
      start: 'top 70%',
      end: 'bottom center',
      // markers: true,
      scrub: 3,
      toggleActions: 'restart pause reverse pause'
    }
  })
  tl.to('.roadbus', {
    x: 0,
    y: 300,
    scale: 2,
    duration: 1.5,
    opacity: 0
  })
}
const screenWidth = ref(window.innerWidth)
const applyAnimation = () => {
  if (screenWidth.value >= 1400) {
    scrollAnimate1400()
  } else {
    scrollAnimate375()
  }
}
onMounted(() => {
  applyAnimation()
  const handleResize = () => {
    screenWidth.value = window.innerWidth
  }
  window.addEventListener('resize', handleResize)
  onUnmounted(() => {
    window.removeEventListener('resize', handleResize)
  })
  watchEffect(() => {
    applyAnimation()
  })
})
</script>
<template>
  <main class="relative w-[375px] 2xl:w-[1400px] mx-auto mb-44">
    <div
      class="w-[940px] h-[104.76] mx-auto mt-32 items-start justify-center gap-[68px] mb-24 hidden 2xl:flex"
    >
      <div>
        <div class="flex items-center justify-center py-[17px] gap-[17px]">
          <img :src="flag" alt="" />
          <h3 class="text-2xl font-semibold font-SerifTC tracking-[2px] leading-6">最新消息</h3>
        </div>
      </div>
      <div class="flex flex-col gap-[37px]">
        <div class="w-[567px] h-[446px] flex flex-col gap-1">
          <RouterLink
            to="/newestannounce"
            @click="updateState('all')"
            class="flex flex-col gap-5 px-[30px] pt-[20px] pb-[18px] border-b border-black hover:bg-[#EFEFEF]"
          >
            <div class="flex items-center gap-5">
              <div
                class="badge bg-[#F5D32F] gap-2 text-base text-black font-medium leading-6 rounded-xl px-3 py-4"
              >
                期間變動
              </div>
              <span class="text-base font-medium">路線停駛公告</span>
              <span class="text-sm font-normal leading-[22px] text-gray-400">25, Nov 2025</span>
            </div>
            <div class="flex items-center gap-5">
              <span class="text-gray-500 flex-1 text-base font-medium leading-6">
                本公司170路公車，自113年7月15日起，改由睿奕交通接駛服務（變更為679路公車），不便之處，敬請見諒。
              </span>
              <div
                class="w-7 h-7 border-2 border-[#108313] flex justify-center items-center rounded-full hover:border-none hover:bg-[#108313] text-[#108313] hover:text-white"
              >
                <i class="fa-solid fa-arrow-right"></i>
              </div>
            </div>
          </RouterLink>
          <RouterLink
            to="/newestannounce"
            @click="updateState('interbus')"
            class="flex flex-col gap-5 px-[30px] pt-[20px] pb-[18px] border-b border-black hover:bg-[#EFEFEF]"
          >
            <div class="flex items-center gap-5">
              <div
                class="badge bg-blue-700 gap-2 text-base font-medium leading-6 text-white rounded-xl px-3 py-4"
              >
                國道客運
              </div>
              <span class="text-base font-medium">暑假期間7/1-8/29行駛公告</span>
              <span class="text-sm font-normal leading-[22px] text-gray-400">25, Nov 2025</span>
            </div>
            <div class="flex items-center gap-5">
              <span class="text-gray-500 flex-1 text-base font-medium leading-6">
                暑假期間（7月1日～8月29日）停駛路線如下：208繞、211區1、211區2、219、258繞、232、278、279、900跳蛙
              </span>
              <div
                class="w-7 h-7 border-2 border-[#108313] flex justify-center items-center rounded-full hover:border-none hover:bg-[#108313] text-[#108313] hover:text-white"
              >
                <i class="fa-solid fa-arrow-right"></i>
              </div>
            </div>
          </RouterLink>
          <RouterLink
            to="/newestannounce"
            @click="updateState('bus')"
            class="flex flex-col gap-5 px-[30px] pt-[20px] pb-[18px] border-b border-black hover:bg-[#EFEFEF]"
          >
            <div class="flex items-center gap-5">
              <div
                class="badge bg-[#108313] gap-2 text-base font-medium leading-6 text-white rounded-xl px-3 py-4"
              >
                市區公車
              </div>
              <span class="text-base font-medium">路線停駛公告</span>
              <span class="text-sm font-normal leading-[22px] text-gray-400">25, Nov 2025</span>
            </div>
            <div class="flex items-center gap-5">
              <span class="text-gray-500 flex-1 text-base font-medium leading-6">
                本公司170路公車，自113年7月15日起，改由睿奕交通接駛服務(變更為679路公車)，不便之處，敬請見諒。
              </span>
              <div
                class="w-7 h-7 border-2 border-[#108313] flex justify-center items-center rounded-full hover:border-none hover:bg-[#108313] text-[#108313] hover:text-white"
              >
                <i class="fa-solid fa-arrow-right"></i>
              </div>
            </div>
          </RouterLink>
        </div>
        <div class="ml-auto">
          <RouterLink
            to="/newestannounce"
            @click="updateState('all')"
            class="flex justify-end items-center gap-[15px] pr-[35px]"
          >
            <p class="text-[#108313] text-2xl font-medium leading-[26px]">查看更多</p>
            <i class="fa-solid fa-arrow-right text-[#108313] text-2xl"></i>
          </RouterLink>
        </div>
      </div>
    </div>
    <div class="w-[372px] h-[261px] block 2xl:hidden">
      <p
        class="w-[88px] mx-auto text-[22px] font-medium font-SerifTC leading-[150%] py-[14px] border-b-2 border-[#108313]"
      >
        最新消息
      </p>
      <div class="w-full h-[196px]">
        <div class="py-[10px]">
          <div
            class="flex items-center justify-center gap-[10px] px-[30px] py-2 hover:bg-[#EFEFEF]"
          >
            <div class="w-[278px] flex items-center gap-[10px]">
              <div
                class="badge bg-[#F5D32F] gap-2 text-xs text-black font-medium leading-6 rounded-xl px-[10px] py-[3px]"
              >
                期間變動
              </div>
              <span class="text-sm leading-[26px] font-medium">路線停駛公告</span>
            </div>
            <RouterLink
              to="/newestannounce"
              @click="updateState('all')"
              class="w-6 h-6 border-2 border-[#108313] flex justify-center items-center rounded-full hover:border-none hover:bg-[#108313] text-[#108313] hover:text-white"
            >
              <i class="fa-solid fa-arrow-right"></i>
            </RouterLink>
          </div>
          <div
            class="flex items-center justify-center gap-[10px] px-[30px] py-2 hover:bg-[#EFEFEF]"
          >
            <div class="w-[278px] flex items-center gap-[10px]">
              <div
                class="badge bg-[#108313] gap-2 text-xs text-white font-medium leading-6 rounded-xl px-[10px] py-[3px]"
              >
                市區公車
              </div>
              <span class="text-sm leading-[26px] font-medium">路線停駛公告</span>
            </div>
            <RouterLink
              to="/newestannounce"
              @click="updateState('bus')"
              class="w-6 h-6 border-2 border-[#108313] flex justify-center items-center rounded-full hover:border-none hover:bg-[#108313] text-[#108313] hover:text-white"
            >
              <i class="fa-solid fa-arrow-right"></i>
            </RouterLink>
          </div>
          <div
            class="flex items-center justify-center gap-[10px] px-[30px] py-2 hover:bg-[#EFEFEF]"
          >
            <div class="w-[278px] flex items-center gap-[10px]">
              <div
                class="badge bg-[#F5D32F] gap-2 text-xs text-black font-medium leading-6 rounded-xl px-[10px] py-[3px]"
              >
                期間變動
              </div>
              <span class="text-sm leading-[26px] font-medium">路線停駛公告</span>
            </div>
            <RouterLink
              to="/newestannounce"
              @click="updateState('all')"
              class="w-6 h-6 border-2 border-[#108313] flex justify-center items-center rounded-full hover:border-none hover:bg-[#108313] text-[#108313] hover:text-white"
            >
              <i class="fa-solid fa-arrow-right"></i>
            </RouterLink>
          </div>
        </div>
        <div class="ml-auto">
          <RouterLink
            to="/newestannounce"
            @click="updateState('all')"
            class="flex justify-end items-center gap-[15px] pr-[35px]"
          >
            <p class="text-[#108313] text-xs font-medium leading-[26px]">查看更多</p>
            <i class="fa-solid fa-arrow-right text-[#108313] text-sm"></i>
          </RouterLink>
        </div>
      </div>
    </div>
    <div class="relative w-full h-[85.35px] 2xl:h-[234px] overflow-hidden">
      <div
        class="absolute w-full h-full bg-gradient-to-r from-[#FFFFFF] via-transparent to-[#FFFFFF] z-30"
      ></div>
      <div class="absolute flex top-0 w-[200%] z-20 animate-marqueeCity1">
        <img :src="city01" alt="Green buildings" class="w-1/2 h-auto hidden 2xl:block" />
        <img :src="city01" alt="Green buildings" class="w-1/2 h-auto hidden 2xl:block" />
        <img
          src="@/assets/homepage/main/city01(375px).svg"
          alt="Green buildings"
          class="w-1/2 h-auto block 2xl:hidden"
        />
        <img
          src="@/assets/homepage/main/city01(375px).svg"
          alt="Green buildings"
          class="w-1/2 h-auto block 2xl:hidden"
        />
      </div>
      <div class="absolute flex top-0 w-[200%] z-10 animate-marqueeCity2">
        <img :src="city02" alt="Yellow buildings" class="w-1/2 h-auto" />
        <img :src="city02" alt="Yellow buildings" class="w-1/2 h-auto" />
        <img
          src="@/assets/homepage/main/city02(375px).svg"
          alt="Green buildings"
          class="w-1/2 h-auto block 2xl:hidden"
        />
        <img
          src="@/assets/homepage/main/city02(375px).svg"
          alt="Green buildings"
          class="w-1/2 h-auto block 2xl:hidden"
        />
      </div>
    </div>
    <div class="relative w-full flex z-30">
      <img :src="road" alt="" class="road hidden 2xl:block" />
      <img src="@/assets/homepage/main/road(375px).png" alt="" class="road block 2xl:hidden" />
      <img
        :src="roadbus"
        alt=""
        class="absolute left-[50.5%] -translate-x-1/2 -top-[14%] roadbus z-30 hidden 2xl:block"
      />
      <img
        src="@/assets/homepage/main/roadbus(375px).svg"
        alt=""
        class="absolute left-[49%] -translate-x-1/2 -top-[15%] roadbus z-30 block 2xl:hidden"
      />
      <img
        :src="stop1"
        alt=""
        class="absolute left-[33%] top-0 w-[45.87px] z-30 hidden 2xl:block"
      />
      <img :src="stop2" alt="" class="absolute left-[70%] top-[10%] w-[61.82px] hidden 2xl:block" />
      <img :src="stop3" alt="" class="absolute left-[15%] top-[17%] w-[81.95px] hidden 2xl:block" />
      <img :src="stop4" alt="" class="absolute left-[80%] top-[37%] w-[85.55px] hidden 2xl:block" />
    </div>
    <SwiperView class="z-40 hidden 2xl:block" />
    <SwiperView375 class="z-40 block 2xl:hidden" />
    <RouterLink
      to="/aboutus"
      class="relative w-[375px] 2xl:w-[1400px] h-[345.97px] 2xl:h-[648.62px] mb-40"
    >
      <div
        class="absolute left-[0%] -top-[9.5%] w-full flex items-center justify-between 2xl:gap-[229px] z-10"
      >
        <img :src="flagbg2" alt="" class="hidden 2xl:block" />
        <img src="@/assets/homepage/main/flagbg2(375px).svg" alt="" class="block 2xl:hidden" />
        <p
          class="text-lg 2xl:text-[58px] text-[#108313] font-normal font-Metrophobic tracking-[4.16px] whitespace-nowrap mr-[130px] 2xl:tracking-[10px] leading-[10px] 2xl:leading-6"
        >
          ABOUT US
        </p>
      </div>
      <img src="@/assets/homepage/main/aboutUs.png" alt="" class="relative z-20 hidden 2xl:block" />
      <img
        src="@/assets/homepage/main/手機版about us 1.svg"
        alt=""
        class="relative z-20 block 2xl:hidden"
      />
    </RouterLink>
    <RouterLink
      to="/aboutus"
      class="absolute left-1/2 -translate-x-[50%] -bottom-[6%] 2xl:bottom-0 h-[135px] flex flex-col items-center justify-center gap-[6px] 2xl:gap-[15px] z-40"
    >
      <img :src="linedot" alt="" class="h-[40px]" />
      <div
        class="text-[#108313] text-xs 2xl:text-2xl font-light 2xl:font-medium leading-[150%] 2xl:leading-[26px]"
      >
        認識豐客
      </div>
    </RouterLink>
  </main>
  <RouterView />
</template>
