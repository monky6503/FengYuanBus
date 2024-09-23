<script setup>
import AOS from 'aos'
import 'aos/dist/aos.css'
import { onMounted } from 'vue'
import { RouterView } from 'vue-router'
import { gsap } from 'gsap'
import NavBar from '../components/homepage/NavBar.vue'
import FooterView from '../components/homepage/FooterView.vue'
import banner from '@/assets/recruitment/banner.svg'
import bustoleft from '@/assets/recruitment/bustoleft.svg'
import windowicon from '@/assets/businfo/window.svg'
import flag from '@/assets/recruitment/flag.svg'
const busanimate = () => {
  let tl = gsap.timeline({ delay: 1 })
  tl.from('.busanimate', { x: 1500, autoAlpha: 1, duration: 3 })
  tl.play()
}

onMounted(() => {
  busanimate()
  AOS.init({
    delay: 1,
    duration: 1000 // 動畫持續時間 (ms)
  })
})
</script>
<template>
  <NavBar />
  <div class="w-full xl:w-[1200px] 2xl:w-[1400px] mx-auto mb-72 lg:pt-[100px] pt-[57px]">
    <div class="w-full h-auto relative">
      <img :src="banner" alt="" class="w-full h-full" />
      <p
        class="absolute left-[15%] bottom-[2%] sm:bottom-[10%] text-3xl sm:text-[46px] font-SerifTC font-semibold tracking-[2px] leading-[60px]"
      >
        人才招募
      </p>
    </div>
    <div class="flex flex-col gap-[34px] overflow-hidden">
      <div
        class="w-full lg:w-[990px] flex flex-col-reverse lg:flex-row items-center justify-center lg:justify-start gap-5 lg:gap-10 xl:gap-20 mx-auto mt-12 px-5 lg:pr-[60px] pb-[85px] busanimate"
      >
        <img :src="bustoleft" alt="" class="w-[400px] lg:w-full" />
        <div class="wave-text mx-auto">
          <span>駕</span><span>馭</span><span>每</span><span>一</span><span>程</span><span>，</span
          ><span>服</span><span>務</span><span>每</span><span>一</span><span>刻</span
          ><span>。</span>
        </div>
      </div>
      <div class="w-4/5 lg:w-[990px] mx-auto mb-10">
        <div class="w-[280px] sm:w-[458px] flex items-center gap-[17px] py-[17px] mx-auto xl:mx-0">
          <img :src="flag" alt="" />
          <p class="text-2xl font-semibold font-SerifTC tracking-[2px] leading-6">誠徵</p>
        </div>
        <div class="grid grid-cols-1 xl:grid-cols-2 gap-[70px]">
          <div
            class="w-[280px] sm:w-[458px] h-[220px] border-t border-l border-[#108313] rounded-tl-[80px] px-[50px] pt-[45px] justify-self-center"
            data-aos="fade-up"
          >
            <div class="w-60 sm:w-[408px]">
              <p
                class="text-xl sm:text-2xl font-medium leading-[150%] tracking-[4px] pl-0 sm:px-[15px] pb-[10px]"
              >
                儲備幹部
              </p>
              <div
                class="flex flex-col gap-10 pl-0 sm:pl-[15px] pr-[25px] pb-[29px] rounded-br-[50px] shadow-[2px_3px_4px_0px_rgba(0,0,0,0.1)]"
              >
                <p
                  class="text-xs sm:text-base text-[#818181] font-light sm:font-medium leading-[150%]"
                >
                  台中市東勢區｜月薪 27,470 至 32,470元
                </p>
                <div class="self-end">
                  <button
                    type="button"
                    class="bg-white border border-[#108313] rounded-[20px] text-[#108313] flex items-center gap-[7px] px-5 py-[6px]"
                  >
                    我要應徵
                    <img :src="windowicon" alt="" />
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div
            class="w-[280px] sm:w-[458px] h-[220px] border-t border-l border-[#108313] rounded-tl-[80px] px-[50px] pt-[45px] justify-self-center"
            data-aos="fade-up"
          >
            <div class="w-60 sm:w-[408px]">
              <p
                class="text-xl sm:text-2xl font-medium leading-[150%] tracking-[4px] pl-0 sm:px-[15px] pb-[10px]"
              >
                儲備幹部
              </p>
              <div
                class="flex flex-col gap-10 pl-0 sm:pl-[15px] pr-[25px] pb-[29px] rounded-br-[50px] shadow-[2px_3px_4px_0px_rgba(0,0,0,0.1)]"
              >
                <p
                  class="text-xs sm:text-base text-[#818181] font-light sm:font-medium leading-[150%]"
                >
                  台中市東勢區｜月薪 27,470 至 32,470元
                </p>
                <div class="self-end">
                  <button
                    type="button"
                    class="bg-white border border-[#108313] rounded-[20px] text-[#108313] flex items-center gap-[7px] px-5 py-[6px]"
                  >
                    我要應徵
                    <img :src="windowicon" alt="" />
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div
            class="w-[280px] sm:w-[458px] h-[220px] border-t border-l border-[#108313] rounded-tl-[80px] px-[50px] pt-[45px] justify-self-center"
            data-aos="fade-up"
          >
            <div class="w-60 sm:w-[408px]">
              <p
                class="text-xl sm:text-2xl font-medium leading-[150%] tracking-[4px] pl-0 sm:px-[15px] pb-[10px]"
              >
                儲備幹部
              </p>
              <div
                class="flex flex-col gap-10 pl-0 sm:pl-[15px] pr-[25px] pb-[29px] rounded-br-[50px] shadow-[2px_3px_4px_0px_rgba(0,0,0,0.1)]"
              >
                <p
                  class="text-xs sm:text-base text-[#818181] font-light sm:font-medium leading-[150%]"
                >
                  台中市東勢區｜月薪 27,470 至 32,470元
                </p>
                <div class="self-end">
                  <button
                    type="button"
                    class="bg-white border border-[#108313] rounded-[20px] text-[#108313] flex items-center gap-[7px] px-5 py-[6px]"
                  >
                    我要應徵
                    <img :src="windowicon" alt="" />
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div
            class="w-[280px] sm:w-[458px] h-[220px] border-t border-l border-[#108313] rounded-tl-[80px] px-[50px] pt-[45px] justify-self-center"
            data-aos="fade-up"
          >
            <div class="w-60 sm:w-[408px]">
              <p
                class="text-xl sm:text-2xl font-medium leading-[150%] tracking-[4px] pl-0 sm:px-[15px] pb-[10px]"
              >
                儲備幹部
              </p>
              <div
                class="flex flex-col gap-10 pl-0 sm:pl-[15px] pr-[25px] pb-[29px] rounded-br-[50px] shadow-[2px_3px_4px_0px_rgba(0,0,0,0.1)]"
              >
                <p
                  class="text-xs sm:text-base text-[#818181] font-light sm:font-medium leading-[150%]"
                >
                  台中市東勢區｜月薪 27,470 至 32,470元
                </p>
                <div class="self-end">
                  <button
                    type="button"
                    class="bg-white border border-[#108313] rounded-[20px] text-[#108313] flex items-center gap-[7px] px-5 py-[6px]"
                  >
                    我要應徵
                    <img :src="windowicon" alt="" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <FooterView />
  <RouterView />
</template>
<style scoped>
.wave-text {
  display: inline-block;
  font-size: 24px;
  font-weight: bold;
  color: #5062cf;
  white-space: nowrap;
}
.wave-text span {
  display: inline-block;
  animation: wave 1s infinite ease-in-out;
}
.wave-text span:nth-child(1) {
  animation-delay: 0s;
}
.wave-text span:nth-child(2) {
  animation-delay: 0.1s;
}
.wave-text span:nth-child(3) {
  animation-delay: 0.2s;
}
.wave-text span:nth-child(4) {
  animation-delay: 0.3s;
}
.wave-text span:nth-child(5) {
  animation-delay: 0.4s;
}
.wave-text span:nth-child(6) {
  animation-delay: 0.5s;
}
.wave-text span:nth-child(7) {
  animation-delay: 0.6s;
}
.wave-text span:nth-child(8) {
  animation-delay: 0.7s;
}
.wave-text span:nth-child(9) {
  animation-delay: 0.8s;
}
.wave-text span:nth-child(10) {
  animation-delay: 0.9s;
}
.wave-text span:nth-child(11) {
  animation-delay: 1s;
}
.wave-text span:nth-child(12) {
  animation-delay: 1.1s;
}

@keyframes wave {
  0%,
  100% {
    transform: translateY(0) rotate(0deg);
  }
  50% {
    transform: translateY(-15px) rotate(0deg);
  }
}

svg {
  width: 458px;
  height: 220px;
}
svg .draw {
  stroke: #108313;
  stroke-width: 1px;
  fill: transparent;
  stroke-dasharray: 800;
  stroke-dashoffset: 800;
  animation: animate 5s;
  animation-fill-mode: forwards;
  animation-delay: 0.1s;
}

@keyframes animate {
  0% {
    stroke-dashoffset: 700;
  }
  100% {
    stroke-dashoffset: 0;
  }
}
</style>
