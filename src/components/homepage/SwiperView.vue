<script>
import AOS from 'aos'
import 'aos/dist/aos.css'
import { Swiper, SwiperSlide } from 'swiper/vue'

import 'swiper/css'

import 'swiper/css/pagination'
import 'swiper/css/navigation'

import { Pagination, Navigation } from 'swiper/modules'
import flag from '@/assets/homepage/main/flag.svg'
import travel1 from '@/assets/homepage/main/travel1.png'
import travel2 from '@/assets/homepage/main/travel2.png'
import travel3 from '@/assets/homepage/main/travel3.png'
import travel4 from '@/assets/homepage/main/travel4.svg'
import travel5 from '@/assets/homepage/main/travel5.svg'
import arrow from '@/assets/homepage/main/arrow.svg'
export default {
  components: {
    Swiper,
    SwiperSlide
  },
  setup() {
    return {
      modules: [Pagination, Navigation]
    }
  },
  mounted() {
    AOS.init({
      delay: 100,
      duration: 1000, // 動畫持續時間 (ms)
      offset: 350, // 偏移量 (px)，元素離可視區多少px時觸發動畫
      once: false
    })
  },
  data() {
    return {
      arrow,
      flag,
      slides: [
        {
          image: travel1,
          title: '東勢林場',
          buses: [209]
        },
        {
          image: travel2,
          title: '谷關溫泉',
          buses: [153, 207, 850]
        },
        {
          image: travel3,
          title: '新社花海',
          buses: ['91繞1', 265, 271]
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
      ],
      currentIndex: 0,
      isMiddle: false
    }
  },
  methods: {
    updateCurrentSlide(swiper) {
      this.currentIndex = (swiper.realIndex + 1) % this.slides.length
    }
  }
}
</script>

<template>
  <div
    class="relative w-[1400px] -mt-80 m-auto pb-72 flex flex-col gap-[47px]"
    data-aos="fade-up"
    data-aos-easing="linear"
  >
    <div class="flex flex-col items-center justify-center py-[17px] gap-[22px]">
      <img :src="flag" alt="" />
      <h3 class="text-2xl font-semibold font-SerifTC tracking-[2px] leading-6">搭乘豐客旅行趣</h3>
    </div>
    <swiper
      :slidesPerView="3"
      :spaceBetween="63"
      :navigation="{
        prevEl: '.swiper-button-prev',
        nextEl: '.swiper-button-next'
      }"
      :loop="true"
      :modules="modules"
      @slideChange="updateCurrentSlide"
      class="relative w-full z-30"
    >
      <SwiperSlide v-for="(slide, index) in slides" :key="index">
        <div
          :class="{
            'transform -translate-y-10': index === currentIndex,
            'transform -translate-y-0': index !== currentIndex
          }"
          class="w-full text-center transition-transform duration-300 ease-linear"
        >
          <div class="relative">
            <img :src="slide.image" alt="slide.title" class="w-full" />
            <div
              class="absolute -left-[1px] -bottom-[10%] w-[191px] h-[57px] bg-white flex items-center justify-center gap-3"
            >
              <h3 class="text-base font-medium tracking-[18%] leading-[26px] flex-shrink-0">
                {{ slide.title }}
              </h3>
              <img :src="arrow" alt="" />
            </div>
          </div>
          <div
            v-show="index === currentIndex"
            class="flex justify-start items-start gap-5 px-[23px] pt-[30px]"
          >
            <div class="pt-[9px]">
              <div
                class="w-[68px] h-[28px] bg-[#108313] rounded-l-full flex justify-center items-center px-[10px] py-[2px]"
              >
                <span class="text-xs text-white text-center font-bold leading-6">市區公車</span>
              </div>
            </div>
            <div class="flex flex-wrap gap-5">
              <div
                v-for="bus in slide.buses"
                :key="bus"
                class="flex items-center justify-center gap-2 pt-[9px] pb-[7px] flex-shrink-0"
              >
                <div class="w-4 h-4 bg-[#108313] rounded-full"></div>
                <span class="busNumber text-[#108313] text-2xl font-regular leading-6">{{
                  bus
                }}</span>
              </div>
            </div>
          </div>
        </div>
      </SwiperSlide>
      <div ref="prevButton" class="swiper-button-prev z-50"></div>
      <div class="absolute top-[91.7%] left-[51%]">|</div>
      <div ref="nextButton" class="swiper-button-next z-50"></div>
    </swiper>
  </div>
</template>
<style scoped>
.swiper {
  width: 100%;
  height: 440px;
}

.swiper-slide {
  text-align: center;
  font-size: 18px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.swiper-button-prev {
  position: absolute;
  top: 95%;
  left: 45%;
}
.swiper-button-next {
  position: absolute;
  top: 95%;
  left: 55%;
}

.swiper-button-next::after,
.swiper-button-prev::after {
  font-size: 20px;
  color: black;
  bottom: 0px;
  left: 50%;
}
</style>
