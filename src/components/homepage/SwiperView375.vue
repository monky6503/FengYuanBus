<script setup>
import { reactive, onMounted } from 'vue'
import AOS from 'aos'
import 'aos/dist/aos.css'
import { Swiper, SwiperSlide } from 'swiper/vue'

import 'swiper/css'
import 'swiper/css/navigation'
import { Navigation } from 'swiper/modules'

import travel1 from '@/assets/homepage/main/travel1.png'
import travel2 from '@/assets/homepage/main/travel2.png'
import travel3 from '@/assets/homepage/main/travel3.png'
import travel4 from '@/assets/homepage/main/travel4.svg'
import travel5 from '@/assets/homepage/main/travel5.svg'
const modules = [Navigation]

const slides = reactive([
  {
    image: travel1,
    title: '東勢林場',
    buses: [209]
  },
  {
    image: travel2,
    title: '谷關溫泉',
    buses: [153, 207]
  },
  {
    image: travel3,
    title: '新社花海',
    buses: ['91繞1', 265]
  },
  {
    image: travel4,
    title: '后豐鐵馬道',
    buses: [155, '155副']
  },
  {
    image: travel5,
    title: '廟東夜市',
    buses: [51, 55, 56, 86]
  }
])
onMounted(() => {
  AOS.init()
})
</script>
<template>
  <div
    class="relative w-[375px] -mt-16 mx-auto pb-24 flex flex-col gap-[47px]"
    data-aos="fade-up"
    data-aos-easing="linear"
    data-aos-duration="1000"
  >
    <swiper
      :slidesPerView="1"
      :navigation="{
        prevEl: '.swiper-button-prev',
        nextEl: '.swiper-button-next'
      }"
      :loop="true"
      :modules="modules"
      class="relative z-30"
    >
      <SwiperSlide v-for="(slide, index) in slides" :key="index">
        <div class="w-full text-center transition-transform duration-300 ease-linear">
          <div class="relative flex justify-center">
            <img :src="slide.image" alt="slide.title" class="h-[184.24px]" />
            <div
              class="absolute left-6 -bottom-[8%] w-[125.68px] 2xl:w-[191px] h-[37.51px] 2xl:h-[57px] bg-white flex items-center justify-center gap-3 z-[999]"
            >
              <h3 class="text-base font-medium tracking-[18%] leading-[26px] flex-shrink-0">
                {{ slide.title }}
              </h3>
              <img src="@/assets/homepage/main/arrow(375px).svg" alt="" />
            </div>
          </div>
          <div class="flex justify-start items-start gap-[15px] px-[23px] pt-4">
            <div class="pt-[9px]">
              <div
                class="w-[68px] h-[28px] bg-[#108313] rounded-l-full flex justify-center items-center px-[10px] py-[2px]"
              >
                <span class="text-xs text-white text-center font-bold leading-6">市區公車</span>
              </div>
            </div>
            <div class="flex flex-wrap gap-4">
              <div
                v-for="bus in slide.buses"
                :key="bus"
                class="flex items-center justify-center gap-1 pt-[9px] pb-[7px] flex-shrink-0"
              >
                <div class="w-4 h-4 bg-[#108313] rounded-full"></div>
                <span
                  class="busNumber text-[#108313] text-xs 2xl:text-2xl font-regular leading-6"
                  >{{ bus }}</span
                >
              </div>
            </div>
          </div>
        </div>
      </SwiperSlide>
      <div ref="prevButton" class="swiper-button-prev"></div>
      <div ref="nextButton" class="swiper-button-next"></div>
    </swiper>
  </div>
</template>

<style scoped>
.swiper {
  width: 310.82px;
  height: 249.38px;
}

.swiper-slide {
  text-align: center;
  font-size: 18px;
  width: 282.94px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  position: relative;
}
.swiper-button-next,
.swiper-button-prev {
  position: absolute;
  width: 44px;
  height: 44px;
  background-color: #ffffff;
  border-radius: 25px;
  color: #818181;
  z-index: 99;
  box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.25);
}
.swiper-button-prev {
  left: 9%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.swiper-button-next {
  right: 1%;
  top: 50%;
  transform: translate(0, -50%);
}
.swiper-button-next::after,
.swiper-button-prev::after {
  font-size: 15px;
  margin: auto;
  left: 0%;
}
.swiper-button-disabled {
  opacity: 0.5;
  pointer-events: none;
}
</style>
