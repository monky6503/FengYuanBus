<script setup>
import AOS from 'aos'
import 'aos/dist/aos.css'
import { ref, onMounted, onUnmounted, watchEffect } from 'vue'
import { RouterView } from 'vue-router'
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'
import 'swiper/css/pagination'
import { Pagination, Autoplay } from 'swiper/modules'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { MotionPathPlugin } from 'gsap/MotionPathPlugin'
import NavBar from '../components/homepage/NavBar.vue'
import logo1200 from '@/assets/homepage/navbar/logo(1200px).svg'
import slogan1200 from '@/assets/homepage/footer/slogan(1200px).svg'
import slogan992 from '@/assets/homepage/footer/slogan(992px).svg'

import icon375 from '@/assets/homepage/footer/icon(375px).svg'
import logowi375 from '@/assets/homepage/footer/logowithouticon(375px).svg'
const modules = [Pagination, Autoplay]
const paginationRef1 = ref(null)
const paginationRef2 = ref(null)
const paginationRef3 = ref(null)
gsap.registerPlugin(ScrollTrigger, MotionPathPlugin)

const scrollAnimate1400 = () => {
  let tl = gsap.timeline({
    scrollTrigger: {
      trigger: '.logo',
      start: 'bottom 80%',
      end: '60% 40%',
      // markers: true,
      scrub: 3,
      toggleActions: 'restart pause reverse pause'
    }
  })
  tl.fromTo('.text1', { x: 0, y: 0, scale: 1 }, { x: -100, y: 0, scale: 1, duration: 3 }, 0)
  tl.fromTo('.text2', { x: 0, y: 0, scale: 1 }, { x: 100, y: 0, scale: 1, duration: 3 }, 0)
  tl.fromTo('.frontbus', { x: 0, y: 0, scale: 0 }, { x: 0, y: 0, scale: 1, duration: 3 }, 0)
}

const scrollAnimate375 = () => {
  let tl = gsap.timeline({
    scrollTrigger: {
      trigger: '.logo',
      start: 'top 60%',
      end: '60% 60%',
      // markers: true,
      scrub: 3,
      toggleActions: 'restart pause reverse pause'
    }
  })
  tl.fromTo('.text1', { x: 0, y: 0, scale: 1 }, { x: 0, y: -50, scale: 1, duration: 3 }, 0)
  tl.fromTo('.text2', { x: 0, y: 0, scale: 1 }, { x: 0, y: 50, scale: 1, duration: 3 }, 0)
  tl.fromTo('.frontbus', { x: 0, y: 0, scale: 0 }, { x: 0, y: 0, scale: 1, duration: 3 }, 0)
}

const textAnimation = () => {
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: '.textfadeup',
      start: 'center 60%',
      end: 'center center',
      // markers: true,
      scrub: 3,
      toggleActions: 'restart pause reverse pause'
    }
  })
  tl.fromTo('.text3', { y: 100, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 1.5 })
  tl.fromTo('.text4', { y: 100, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 1.5 })
}

// const busAnimation375 = () => {
//   let tl = gsap.timeline({
//     scrollTrigger: {
//       trigger: '#bgroad',
//       start: '15% 20%',
//       end: '90% bottom',
//       // markers: true,
//       scrub: 3,
//       toggleActions: 'restart pause reverse pause'
//     }
//   })
//   tl.to('#gobus', {
//     motionPath: {
//       path: [
//         { x: 0, y: 150, duration: 1 },
//         { x: -50, y: 250, duration: 1 },
//         { x: -100, y: 275, duration: 1.5 },
//         { x: -150, y: 300, duration: 1.5 },
//         { x: -175, y: 600, duration: 1 },
//         { x: -175, y: 600, duration: 1 },
//         { x: -160, y: 650, duration: 1 },
//         { x: -150, y: 664, duration: 1.5 },
//         { x: -100, y: 720, duration: 1.5 },
//         { x: -25, y: 750, duration: 1.5 },
//         { x: 0, y: 770, duration: 1 },
//         { x: 15, y: 800, duration: 1 },
//         { x: 20, y: 1150, duration: 1.5 },
//         { x: -50, y: 1200, duration: 1.5 },
//         { x: -75, y: 1210, duration: 1.5 },
//         { x: -100, y: 1220, duration: 1 },
//         { x: -120, y: 1230, duration: 1 },
//         { x: -140, y: 1250, duration: 1 },
//         { x: -170, y: 1300, duration: 1 },
//         { x: -180, y: 1450, duration: 1, autoAlpha: 0 }
//       ],
//       autoRotate: -90,
//       alignOrigin: [0.5, 0.5]
//     },
//     duration: 5
//   }).to('#gobus', {
//     x: -180, // 最後一個坐標位置
//     y: 1450,
//     autoAlpha: 0, // 逐漸消失
//     duration: 0.1 // 控制透明度改變的時間
//   })
// }

const horizontalAnimate1400 = () => {
  let firstAnimation = gsap.timeline({
      scrollTrigger: {
        trigger: '.factsContainer',
        start: 'top center',
        scrub: true,
        end: '+=300'
      }
    }),
    facts = gsap.utils.toArray('.fact')
  firstAnimation.to(facts, {
    xPercent: -100 * (facts.length - 1),
    scrollTrigger: {
      trigger: '.factsContainer_sm',
      start: 'center center',
      pin: true,
      scrub: 1,
      snap: 1 / (facts.length - 1),
      end: () => `+=7000`
    }
  })
}

// 創建 gsap.matchMedia() 實例
// const mm = gsap.matchMedia()
// mm.add({
//   '(min-width: 1400px)': function () {
//     let tl = gsap.timeline({
//       scrollTrigger: {
//         trigger: '#bgroad',
//         start: '20% 60%',
//         end: '80% 80%',
//         markers: true,
//         scrub: 3,
//         toggleActions: 'restart pause reverse pause'
//       }
//     })
//     tl.to('#gobus', {
//       motionPath: {
//         path: [
//           { x: 0, y: 150, duration: 1 },
//           { x: -25, y: 220, duration: 1 },
//           { x: -50, y: 260, duration: 1 },
//           { x: -75, y: 300, duration: 1 },
//           { x: -100, y: 340, duration: 1 },
//           { x: -140, y: 360, duration: 1 },
//           { x: -175, y: 380, duration: 1 },
//           { x: -200, y: 380, duration: 1 },
//           { x: -300, y: 420, duration: 1 },
//           { x: -700, y: 420, duration: 1 },
//           { x: -750, y: 460, duration: 1 },
//           { x: -775, y: 500, duration: 1 },
//           { x: -825, y: 600, duration: 1 },
//           { x: -825, y: 950, duration: 1 },
//           { x: -825, y: 950, duration: 1 },
//           { x: -800, y: 1000, duration: 1 },
//           { x: -775, y: 1025, duration: 1 },
//           { x: -750, y: 1050, duration: 1 },
//           { x: -725, y: 1050, duration: 1 },
//           { x: -700, y: 1050, duration: 1 },
//           { x: -150, y: 1050, duration: 1 },
//           { x: -50, y: 1100, duration: 1 },
//           { x: 0, y: 1150, duration: 1 },
//           { x: 25, y: 1200, duration: 1 },
//           { x: 50, y: 1300, duration: 1 },
//           { x: 60, y: 1800, duration: 1 },
//           { x: 40, y: 1850, duration: 1 },
//           { x: 20, y: 1900, duration: 1 },
//           { x: -20, y: 1950, duration: 1 },
//           { x: -100, y: 2000, duration: 1 },
//           { x: -150, y: 2005, duration: 1 },
//           { x: -450, y: 2005, duration: 1 },
//           { x: -500, y: 2020, duration: 1 },
//           { x: -600, y: 2050, duration: 1 },
//           { x: -650, y: 2100, duration: 1 },
//           { x: -650, y: 2100, duration: 1 },
//           { x: -700, y: 2150, duration: 1 },
//           { x: -725, y: 2500, duration: 1 }
//         ],
//         autoRotate: -90,
//         alignOrigin: [0.5, 0.5]
//       },
//       duration: 5
//     }).to('#gobus', {
//       x: -725,
//       y: 2500,
//       autoAlpha: 0,
//       duration: 0.1
//     })
//   },

//   '(max-width: 1399px)': function () {
//     let tl = gsap.timeline({
//       scrollTrigger: {
//         trigger: '#bgroad',
//         start: '15% 20%',
//         end: '90% bottom',
//         // markers: true,
//         scrub: 3,
//         toggleActions: 'restart pause reverse pause'
//       }
//     })
//     tl.to('#gobus', {
//       motionPath: {
//         path: [
//           { x: 0, y: 150, duration: 1 },
//           { x: -50, y: 250, duration: 1 },
//           { x: -100, y: 275, duration: 1.5 },
//           { x: -150, y: 300, duration: 1.5 },
//           { x: -175, y: 600, duration: 1 },
//           { x: -175, y: 600, duration: 1 },
//           { x: -160, y: 650, duration: 1 },
//           { x: -150, y: 664, duration: 1.5 },
//           { x: -100, y: 720, duration: 1.5 },
//           { x: -25, y: 750, duration: 1.5 },
//           { x: 0, y: 770, duration: 1 },
//           { x: 15, y: 800, duration: 1 },
//           { x: 20, y: 1150, duration: 1.5 },
//           { x: -50, y: 1200, duration: 1.5 },
//           { x: -75, y: 1210, duration: 1.5 },
//           { x: -100, y: 1220, duration: 1 },
//           { x: -120, y: 1230, duration: 1 },
//           { x: -140, y: 1250, duration: 1 },
//           { x: -170, y: 1300, duration: 1 },
//           { x: -180, y: 1450, duration: 1, autoAlpha: 0 }
//         ],
//         autoRotate: -90,
//         alignOrigin: [0.5, 0.5]
//       }
//     })
//   }
// })

const screenWidth = ref(window.innerWidth)
const applyAnimation = () => {
  if (screenWidth.value >= 1400) {
    scrollAnimate1400()
  } else {
    scrollAnimate375()
  }
}
onMounted(() => {
  AOS.init({
    delay: 1,
    duration: 1000 // 動畫持續時間 (ms)
  })
  textAnimation()
  applyAnimation()
  horizontalAnimate1400()
  // busAnimation1400()
  const mm = gsap.matchMedia()
  mm.add('(min-width: 1400px)', () => {
    const busAnimation1400 = () => {
      let tl = gsap.timeline({
        scrollTrigger: {
          trigger: '#bgroad',
          start: '20% 70%',
          end: '70% 40%',
          // markers: true,
          scrub: 3,
          toggleActions: 'restart pause reverse pause'
        }
      })
      tl.to('#gobus', {
        motionPath: {
          path: [
            { x: 0, y: 150, duration: 1 },
            { x: -25, y: 220, duration: 1 },
            { x: -50, y: 260, duration: 1 },
            { x: -75, y: 300, duration: 1 },
            { x: -100, y: 330, duration: 1 },
            { x: -140, y: 360, duration: 1 },
            { x: -175, y: 380, duration: 1 },
            { x: -200, y: 400, duration: 1 },
            { x: -300, y: 420, duration: 1 },
            { x: -700, y: 420, duration: 1 },
            { x: -750, y: 460, duration: 1 },
            { x: -775, y: 500, duration: 1 },
            { x: -825, y: 600, duration: 1 },
            { x: -825, y: 950, duration: 1 },
            { x: -825, y: 950, duration: 1 },
            { x: -800, y: 1000, duration: 1 },
            { x: -775, y: 1025, duration: 1 },
            { x: -750, y: 1050, duration: 1 },
            { x: -725, y: 1050, duration: 1 },
            { x: -700, y: 1050, duration: 1 },
            { x: -150, y: 1050, duration: 1 },
            { x: -50, y: 1100, duration: 1 },
            { x: 0, y: 1150, duration: 1 },
            { x: 25, y: 1200, duration: 1 },
            { x: 50, y: 1300, duration: 1 },
            { x: 60, y: 1800, duration: 1 },
            { x: 40, y: 1850, duration: 1 },
            { x: 20, y: 1900, duration: 1 },
            { x: -20, y: 1950, duration: 1 },
            { x: -100, y: 2000, duration: 1 },
            { x: -150, y: 2005, duration: 1 },
            { x: -450, y: 2005, duration: 1 },
            { x: -500, y: 2020, duration: 1 },
            { x: -600, y: 2050, duration: 1 },
            { x: -650, y: 2100, duration: 1 },
            { x: -650, y: 2100, duration: 1 },
            { x: -700, y: 2150, duration: 1 },
            { x: -725, y: 2500, duration: 1 }
          ],
          autoRotate: -90,
          alignOrigin: [0.5, 0.5]
        },
        duration: 5
      }).to('#gobus', {
        x: -725, // 最後一個坐標位置
        y: 2500,
        autoAlpha: 0, // 逐漸消失
        duration: 0.1 // 控制透明度改變的時間
      })
    }
    busAnimation1400()
  })
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
  <NavBar />
  <div class="w-[375px] 2xl:w-[1400px] mx-auto mb-72 pt-[57px] lg:pt-[100px] overflow-hidden">
    <div class="relative w-full">
      <picture>
        <source srcset="@/assets/aboutus/bannerpic1.svg" media="(min-width:1400px)" />
        <img src="@/assets/aboutus/bannerpic1(375px).svg" alt="" />
      </picture>
      <picture class="absolute right-0 2xl:left-[457px] top-[100px] 2xl:top-[140px]">
        <source srcset="@/assets/aboutus/bannerpic2.png" media="(min-width:1400px)" />
        <img src="@/assets/aboutus/bannerpic2(375px).png" alt="" />
      </picture>
    </div>
    <div class="pl-7 2xl:pl-[204px] pt-[100px] 2xl:pt-[90px]">
      <p
        class="text-2xl 2xl:text-[46px] font-medium 2xl:font-semibold font-SerifTC leading-[150%] 2xl:leading-[60px] tracking-[2px]"
      >
        關於豐客
      </p>
    </div>
    <div
      class="w-full h-[465px] bg-[url('@/assets/aboutus/smallroad(375px).svg')] 2xl:bg-[url('@/assets/aboutus/smallroad.svg')] bg-no-repeat pl-7 2xl:pl-[207px] 2xl:pt-[65px] mt-[21px] 2xl:m-0"
    >
      <p class="2xl:w-[659px] text-sm font-normal leading-[30px]">
        豐原汽車客運股份有限公司自1921年起，即以公路交通作為發展經濟和振興文化的關鍵，吸引各地有識之士投資購車，經營小規模客運業。隨著時代演進，於1942年3月28日，在日治時期的管制下，豐原乘合自動車株式會社由近藤、共榮、金豐、明星、老松等五家公司合併成立，這就是本公司的前身。1945年8月，豐原汽車客運股份有限公司於同年10月22日正式改組成立，並沿用至今。
      </p>
      <swiper
        dir="rtl"
        :slidesPerView="1"
        :spaceBetween="28"
        :centeredSlides="true"
        :loop="true"
        :autoplay="{
          delay: 0,
          disableOnInteraction: false,
          pauseOnMouseEnter: true
        }"
        :speed="5000"
        :modules="modules"
        :breakpoints="{
          1400: {
            slidesPerView: 3,
            spaceBetween: 33
          }
        }"
        class="mySwiper w-[344px] 2xl:w-[1194px] h-[200px] 2xl:h-[238px] mt-[55px] 2xl:mt-[95px]"
      >
        <swiper-slide class="w-[207px] 2xl:w-[336px] h-[200px] 2xl:h-[238px]"
          ><img src="@/assets/aboutus/swiper1.svg" alt="" class=""
        /></swiper-slide>
        <swiper-slide class="w-[207px] 2xl:w-[336px] h-[200px] 2xl:h-[238px]"
          ><img src="@/assets/aboutus/swiper2.svg" alt="" /></swiper-slide
        ><swiper-slide class="w-[207px] 2xl:w-[336px] h-[200px] 2xl:h-[238px]"
          ><img src="@/assets/aboutus/swiper3.svg" alt=""
        /></swiper-slide>
        <swiper-slide class="w-[207px] 2xl:w-[336px] h-[200px] 2xl:h-[238px]">
          <img src="@/assets/aboutus/swiper4.svg" alt=""
        /></swiper-slide>
      </swiper>
    </div>
    <div class="pl-[111px] 2xl:pl-[554px] mt-10 2xl:mt-36">
      <p class="w-[234px] 2xl:w-[567px] text-sm font-medium 2xl:font-normal leading-[30px]">
        各大站大多分佈於台中市境內，共有十處豐原客運站和三處修車廠。此外，於豐原區翁子設有佔地二千餘坪的現代化保養場。公司內外員工總數接近四百人。
        豐客以服務為宗旨，誠摯歡迎各界提供建議和回饋，讓我們能持續改進，追求卓越，為每一位乘客提供更佳的服務體驗。
      </p>
    </div>
    <div
      class="w-full h-[202.06px] relative bg-[url('@/assets/aboutus/yellowflag(375px).svg')] 2xl:bg-[url('@/assets/aboutus/yellowflag.svg')] bg-no-repeat bg-center bg-contain mx-auto mt-[72px] logo z-[99]"
    >
      <p
        class="absolute left-[16%] 2xl:left-[23.5%] bottom-[50%] 2xl:-bottom-[17%] text-[#55A257] text-5xl 2xl:text-7xl font-light leading-[150%] tracking-[29px] z-[1] text1"
      >
        真心陪伴
      </p>
      <picture
        class="absolute left-[40%] 2xl:left-[45.5%] bottom-[30%] 2xl:-bottom-[17%] -translate-x-1/2 z-[5] frontbus"
      >
        <source srcset="@/assets/aboutus/frontbus.svg" media="(min-width:1400px)" />
        <img src="@/assets/aboutus/frontbus(375px).svg" alt="" />
      </picture>
      <p
        class="absolute left-[16%] 2xl:left-[51%] bottom-[23%] 2xl:-bottom-[17%] text-[#55A257] text-5xl 2xl:text-7xl font-light leading-[150%] tracking-[29px] z-[1] text2"
      >
        暖心相伴
      </p>
    </div>
    <div
      class="2xl:relative w-full h-[1516px] 2xl:h-[1659px] bg-[url('@/assets/aboutus/intersection(375px).svg')] 2xl:bg-[url('@/assets/aboutus/intersection.svg')] bg-no-repeat bg-center bg-contain mx-auto z-10 flex flex-col items-center gap-[67px] 2xl:block mt-40 2xl:mt-0"
    >
      <div class="indicator 2xl:absolute 2xl:left-[822px] 2xl:top-[476px]" data-aos="fade-up">
        <span
          class="indicator-item w-[82px] left-[30%] 2xl:left-auto translate-x-[40%] 2xl:-translate-x-[17%]"
        >
          <img src="@/assets/aboutus/securitycheck.svg" alt="" />
        </span>
        <div
          class="bg-white w-[336px] h-[285px] rounded-[15px] shadow-[0px_30px_50px_rgba(0,0,0,0.1)] px-9 py-[30px] flex items-end"
        >
          <div class="flex flex-col gap-[27px]">
            <div class="flex flex-col gap-[15px]">
              <p class="text-2xl font-medium leadning-[150%]">大小型車輛檢驗</p>
              <p class="text-[#818181] text-sm font-medium leadning-[150%]">
                提供專業車輛代檢服務，確保車輛安全與性能，並提供全方位維修保養，讓車主安心上路。
              </p>
            </div>
            <div class="self-end">
              <button
                type="button"
                class="border border-[#108313] rounded-[20px] px-5 py-[6px] text-[#108313] text-base font-medium leading-[150%] hover:bg-[#108313] hover:text-white"
              >
                了解更多
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="indicator 2xl:absolute 2xl:left-[324px] 2xl:top-[185px]" data-aos="fade-up">
        <span
          class="indicator-item w-[82px] left-[30%] 2xl:left-0 translate-x-[40%] 2xl:translate-x-[22px]"
        >
          <img src="@/assets/aboutus/transport.svg" alt="" />
        </span>
        <div
          class="bg-white w-[336px] h-[285px] rounded-[15px] shadow-[0px_30px_50px_rgba(0,0,0,0.1)] px-9 py-[30px] flex items-end"
        >
          <div class="flex flex-col gap-[27px]">
            <div class="flex flex-col gap-[15px]">
              <p class="text-2xl font-medium leadning-[150%]">市區國道客運運輸</p>
              <p class="text-[#818181] text-sm font-medium leadning-[150%]">
                涵蓋台中市內主要區域及周邊地區，以便捷、安全及舒適的交通體驗滿足乘客需求。
              </p>
            </div>
            <div class="self-end">
              <button
                type="button"
                class="border border-[#108313] rounded-[20px] px-5 py-[6px] text-[#108313] text-base font-medium leading-[150%] hover:bg-[#108313] hover:text-white"
              >
                了解更多
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="indicator 2xl:absolute 2xl:left-[242px] 2xl:top-[759px]" data-aos="fade-up">
        <span
          class="indicator-item w-[82px] left-[30%] 2xl:left-auto translate-x-[40%] 2xl:-translate-x-[17%]"
        >
          <img src="@/assets/aboutus/rent.svg" alt="" />
        </span>
        <div
          class="bg-white w-[336px] h-[285px] rounded-[15px] shadow-[0px_30px_50px_rgba(0,0,0,0.1)] px-9 py-[30px] flex items-end"
        >
          <div class="flex flex-col gap-[27px]">
            <div class="flex flex-col gap-[15px]">
              <p class="text-2xl font-medium leadning-[150%]">遊覽車出租服務</p>
              <p class="text-[#818181] text-sm font-medium leadning-[150%]">
                提供遊覽車出租服務，適用於團體旅遊、企業活動及學校出遊，專業司機及舒適車輛確保安全與便利。
              </p>
            </div>
            <div class="self-end">
              <button
                type="button"
                class="border border-[#108313] rounded-[20px] px-5 py-[6px] text-[#108313] text-base font-medium leading-[150%] hover:bg-[#108313] hover:text-white"
              >
                了解更多
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="indicator 2xl:absolute 2xl:left-[713px] 2xl:top-[1096px]" data-aos="fade-up">
        <span
          class="indicator-item w-[82px] left-[30%] 2xl:left-0 translate-x-[40%] 2xl:translate-x-[22px]"
        >
          <img src="@/assets/aboutus/plan.svg" alt="" />
        </span>
        <div
          class="bg-white w-[336px] h-[285px] rounded-[15px] shadow-[0px_30px_50px_rgba(0,0,0,0.1)] px-9 py-[30px] flex items-end"
        >
          <div class="flex flex-col gap-[27px]">
            <div class="flex flex-col gap-[15px]">
              <p class="text-2xl font-medium leadning-[150%]">國內外旅遊規劃</p>
              <p class="text-[#818181] text-sm font-medium leadning-[150%]">
                提供各類旅遊服務，包括國內外旅遊、遊覽車租賃、團體旅遊安排，致力於打造愉快且難忘的旅遊體驗。
              </p>
            </div>
            <div class="self-end">
              <button
                type="button"
                class="border border-[#108313] rounded-[20px] px-5 py-[6px] text-[#108313] text-base font-medium leading-[150%] hover:bg-[#108313] hover:text-white"
              >
                了解更多
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      class="textfadeup text-4xl font-medium font-SerifTC leading-[150%] flex flex-col items-start 2xl:items-center justify-center self-end 2xl:self-center mb-[107px]"
    >
      <p class="text3">豐客前行，</p>
      <p class="text4">隨時代變遷而進。</p>
    </div>
    <div class="wrapper mx-auto w-[375px] 2xl:w-[1400px] flex justify-center">
      <div class="factsContainer">
        <div class="factsContainer_sm relative">
          <div class="fact">
            <section
              class="w-[375px] 2xl:w-[1400px] flex flex-col items-center justify-center overflow-hidden"
            >
              <div class="flex flex-col items-center pb-[50px]">
                <img src="@/assets/aboutus/reward1.svg" alt="" />
                <p class="text-[#0518BF] text-2xl font-medium leading-[150%]">第一名</p>
                <div class="flex items-center justify-center gap-[25px]">
                  <div class="flex items-center">
                    <div class="w-[2px] h-[2px] rounded-full bg-[#0518BF]"></div>
                    <div class="w-[440px] 2xl:w-[420px] h-[1px] bg-[#0518BF]"></div>
                  </div>
                  <p class="text-5xl text-[#818181] font-normal font-Metrophobic leading-[150%]">
                    1958
                  </p>
                  <div class="flex items-center">
                    <div class="w-[440px] 2xl:w-[420px] h-[1px] bg-[#0518BF]"></div>
                    <div class="w-[2px] h-[2px] rounded-full bg-[#0518BF]"></div>
                  </div>
                </div>
              </div>
              <img src="@/assets/aboutus/1958.svg" alt="" />
            </section>
          </div>
          <div class="fact">
            <section
              class="w-[375px] 2xl:w-[1400px] flex flex-col items-center justify-center overflow-hidden"
            >
              <div class="flex flex-col items-center pb-[50px]">
                <img src="@/assets/aboutus/reward2.svg" alt="" />
                <p class="text-[#0518BF] text-2xl font-medium leading-[150%]">第一名</p>
                <div class="flex items-center justify-center gap-[25px]">
                  <div class="flex items-center">
                    <div class="w-[2px] h-[2px] rounded-full bg-[#0518BF]"></div>
                    <div class="w-[440px] 2xl:w-[420px] h-[1px] bg-[#0518BF]"></div>
                  </div>
                  <p class="text-5xl text-[#818181] font-normal font-Metrophobic leading-[150%]">
                    1976
                  </p>
                  <div class="flex items-center">
                    <div class="w-[440px] 2xl:w-[420px] h-[1px] bg-[#0518BF]"></div>
                    <div class="w-[2px] h-[2px] rounded-full bg-[#0518BF]"></div>
                  </div>
                </div>
              </div>
              <img src="@/assets/aboutus/1976.svg" alt="" />
            </section>
          </div>
          <div class="fact">
            <section
              class="w-[375px] 2xl:w-[1400px] flex flex-col items-center justify-center overflow-hidden"
            >
              <div class="flex flex-col items-center pb-[50px]">
                <img src="@/assets/aboutus/reward3.svg" alt="" />
                <p class="text-[#0518BF] text-2xl font-medium leading-[150%]">第一名</p>
                <div class="flex items-center justify-center gap-[25px]">
                  <div class="flex items-center">
                    <div class="w-[2px] h-[2px] rounded-full bg-[#0518BF]"></div>
                    <div class="w-[440px] 2xl:w-[420px] h-[1px] bg-[#0518BF]"></div>
                  </div>
                  <p class="text-5xl text-[#818181] font-normal font-Metrophobic leading-[150%]">
                    2002
                  </p>
                  <div class="flex items-center">
                    <div class="w-[440px] 2xl:w-[420px] h-[1px] bg-[#0518BF]"></div>
                    <div class="w-[2px] h-[2px] rounded-full bg-[#0518BF]"></div>
                  </div>
                </div>
              </div>
              <img src="@/assets/aboutus/2002.svg" alt="" />
            </section>
          </div>
          <div class="fact">
            <section
              class="w-[375px] 2xl:w-[1400px] flex flex-col items-center justify-center overflow-hidden"
            >
              <div class="flex flex-col items-center pb-[50px]">
                <img src="@/assets/aboutus/reward4.svg" alt="" />
                <p class="text-[#0518BF] text-2xl font-medium leading-[150%]">第一名</p>
                <div class="flex items-center justify-center gap-[25px]">
                  <div class="flex items-center">
                    <div class="w-[2px] h-[2px] rounded-full bg-[#0518BF]"></div>
                    <div class="w-[440px] 2xl:w-[420px] h-[1px] bg-[#0518BF]"></div>
                  </div>
                  <p class="text-5xl text-[#818181] font-normal font-Metrophobic leading-[150%]">
                    2004
                  </p>
                  <div class="flex items-center">
                    <div class="w-[440px] 2xl:w-[420px] h-[1px] bg-[#0518BF]"></div>
                    <div class="w-[2px] h-[2px] rounded-full bg-[#0518BF]"></div>
                  </div>
                </div>
              </div>
              <img src="@/assets/aboutus/2004.svg" alt="" />
            </section>
          </div>
          <div class="fact">
            <section
              class="w-[375px] 2xl:w-[1400px] flex flex-col items-center justify-center overflow-hidden"
            >
              <div class="flex flex-col items-center pb-[50px]">
                <img src="@/assets/aboutus/reward5.svg" alt="" />
                <p class="text-[#0518BF] text-2xl font-medium leading-[150%]">第一名</p>
                <div class="flex items-center justify-center gap-[25px]">
                  <div class="flex items-center">
                    <div class="w-[2px] h-[2px] rounded-full bg-[#0518BF]"></div>
                    <div class="w-[440px] 2xl:w-[420px] h-[1px] bg-[#0518BF]"></div>
                  </div>
                  <p class="text-5xl text-[#818181] font-normal font-Metrophobic leading-[150%]">
                    2009
                  </p>
                  <div class="flex items-center">
                    <div class="w-[440px] 2xl:w-[420px] h-[1px] bg-[#0518BF]"></div>
                    <div class="w-[2px] h-[2px] rounded-full bg-[#0518BF]"></div>
                  </div>
                </div>
              </div>
              <img src="@/assets/aboutus/2009.svg" alt="" class="justify-self-end" />
            </section>
          </div>
          <picture class="absolute -left-[105%] 2xl:left-0 bottom-0 opacity-90 bustoright">
            <!-- <source srcset="@/assets/aboutus/bustoright.svg" media="(min-width:1400px)" /> -->
            <img src="@/assets/aboutus/bustoright.svg" alt="" class="max-w-none" />
          </picture>
        </div>
      </div>
    </div>
    <div
      class="relative w-full h-[2371px] 2xl:h-[3900px] bg-[url('@/assets/aboutus/bgroad(375px).svg')] 2xl:bg-[url('@/assets/aboutus/bgroad.svg')] bg-no-repeat"
      id="bgroad"
    >
      <picture class="absolute left-[65%] 2xl:left-3/4 top-[13%] 2xl:top-[5%]" id="gobus">
        <source srcset="@/assets/aboutus/gobus.svg" media="(min-width:1400px)" />
        <img src="@/assets/aboutus/gobus(375px).svg" alt="" />
      </picture>
      <div class="absolute left-[47px] 2xl:left-[540px] top-[240px] 2xl:top-[125px]">
        <swiper
          dir="ltr"
          :direction="'vertical'"
          :pagination="{
            el: paginationRef1,
            clickable: true
          }"
          :autoplay="{
            delay: 1200,
            disableOnInteraction: false
          }"
          :loop="true"
          :ltr="true"
          :speed="1000"
          :modules="modules"
          class="mySwiper1 w-[298px] 2xl:w-[620px] h-[205px] 2xl:h-[426.25px] rounded-tl-[20px] rounded-br-[20px] 2xl:rounded-tl-[80px] 2xl:rounded-br-[90px]"
        >
          <swiper-slide class=""
            ><img src="@/assets/oldimage/oldcar23＿1950年代班車.png" alt="" class="w-full h-full"
          /></swiper-slide>
          <swiper-slide
            ><img src="@/assets/oldimage/oldcar17＿1940年代.png" alt="" class="w-full h-full"
          /></swiper-slide>
          <swiper-slide
            ><img src="@/assets/oldimage/oldcar6＿1950年代班車.jpg" alt="" class="w-full h-full"
          /></swiper-slide>
        </swiper>
        <div ref="paginationRef1" class="swiper-pagination pagination-1"></div>
        <div
          class="absolute -left-[4.5%] top-[65%] w-[1px] h-[104px] bg-[#108313] hidden 2xl:block"
        ></div>
        <ul class="mt-[9px] -ml-7 2xl:-ml-11">
          <li
            class="text-xs 2xl:text-base text-[#818181] font-light 2xl:font-medium leading-[150%] flex items-center"
          >
            豐原客運1950年代班車
          </li>
        </ul>
      </div>
      <div class="absolute left-[30px] 2xl:left-[376px] top-[736px] 2xl:top-[788px]">
        <swiper
          dir="ltr"
          :direction="'vertical'"
          :pagination="{
            el: paginationRef2,
            clickable: true
          }"
          :autoplay="{
            delay: 1400,
            disableOnInteraction: false
          }"
          :loop="true"
          :ltr="true"
          :speed="1000"
          :modules="modules"
          class="mySwiper2 w-[298px] 2xl:w-[534px] h-[205px] 2xl:h-[365.66px] rounded-tr-[20px] rounded-bl-[20px] 2xl:rounded-tr-[80px] 2xl:rounded-bl-[45px]"
        >
          <swiper-slide
            ><img src="@/assets/oldimage/oldcar12＿豐客豐原站.png" alt="" class="w-full h-full"
          /></swiper-slide>
          <swiper-slide
            ><img src="@/assets/oldimage/oldcar13_豐客台中站.png" alt="" class="w-full h-full"
          /></swiper-slide>
          <swiper-slide
            ><img src="@/assets/oldimage/oldcar21＿豐客東勢站.png" alt="" class="w-full h-full"
          /></swiper-slide>
          <swiper-slide
            ><img src="@/assets/oldimage/oldcar19＿豐客清水站.png" alt="" class="w-full h-full"
          /></swiper-slide>
          <swiper-slide
            ><img src="@/assets/oldimage/oldcar11＿豐客卓蘭站-1.jpg" alt="" class="w-full h-full"
          /></swiper-slide>
        </swiper>
        <div ref="paginationRef2" class="swiper-pagination pagination-2"></div>
        <div
          class="absolute left-[106%] top-[65%] w-[1px] h-[104px] bg-[#108313] hidden 2xl:block"
        ></div>
        <ul class="mt-[9px] ml-5">
          <li
            class="text-xs 2xl:text-base text-[#818181] font-medium leading-[150%] flex items-center"
          >
            豐原客運豐原站
          </li>
        </ul>
      </div>
      <div class="absolute left-[48px] 2xl:left-[540px] top-[1218px] 2xl:top-[1629px]">
        <swiper
          dir="ltr"
          :direction="'vertical'"
          :pagination="{
            el: paginationRef3,
            clickable: true
          }"
          :autoplay="{
            delay: 1600,
            disableOnInteraction: false
          }"
          :loop="true"
          :speed="1000"
          :modules="modules"
          class="mySwiper3 w-[298px] 2xl:w-[620px] h-[205px] 2xl:h-[426.25px] rounded-tr-[20px] rounded-bl-[20px] 2xl:rounded-tl-[80px] 2xl:rounded-br-[90px]"
        >
          <swiper-slide
            ><img src="@/assets/oldimage/oldcar25＿行駛在東豐大橋的公車.jpeg" alt="" class="h-full"
          /></swiper-slide>
          <swiper-slide
            ><img src="@/assets/oldimage/oldcar14＿1970年代班車.png" alt="" class="h-full"
          /></swiper-slide>
          <swiper-slide
            ><img src="@/assets/oldimage/oldcar22＿1960年代遊覽車.png" alt="" class="h-full"
          /></swiper-slide>
        </swiper>
        <div ref="paginationRef3" class="swiper-pagination pagination-3"></div>
        <div
          class="absolute -left-[4.5%] top-[65%] w-[1px] h-[104px] bg-[#108313] hidden 2xl:block"
        ></div>
        <ul class="mt-[9px] -ml-6 2xl:-ml-11">
          <li
            class="text-xs 2xl:text-base text-[#818181] font-medium leading-[150%] flex items-center"
          >
            豐原客運1970年代班車
          </li>
        </ul>
      </div>
      <picture class="absolute left-[46px] 2xl:left-[375px] top-[140px] 2xl:top-[295px]">
        <source srcset="@/assets/aboutus/timereverse.svg" media="(min-width:1400px)" />
        <img src="@/assets/aboutus/時光流轉(375px).svg" alt="" />
      </picture>
      <picture class="absolute left-[170px] 2xl:left-[981px] top-[640px] 2xl:top-[894px]">
        <source srcset="@/assets/aboutus/歲月沉澱.svg" media="(min-width:1400px)" />
        <img src="@/assets/aboutus/歲月沉澱(375px).svg" alt="" />
      </picture>
      <picture class="absolute left-[74px] 2xl:left-[387px] top-[1140px] 2xl:top-[1851px]">
        <source srcset="@/assets/aboutus/昔日到今朝.svg" media="(min-width:1400px)" />
        <img src="@/assets/aboutus/從昔日到今朝(375px).svg" alt="" />
      </picture>
      <picture
        class="absolute left-[168px] 2xl:left-[677px] top-[2094px] 2xl:top-[3217px] rounded-tr-[100px]"
      >
        <source srcset="@/assets/aboutus/我們始終如一.svg" media="(min-width:1400px)" />
        <img src="@/assets/aboutus/我們始終如一(375px).svg" alt="" />
      </picture>
      <picture
        class="absolute left-[74px] 2xl:left-[482px] top-[1706px] 2xl:top-[2467px] rounded-tr-[100px]"
      >
        <source srcset="@/assets/aboutus/getoff.svg" media="(min-width:1400px)" />
        <img src="@/assets/aboutus/getoff(375px).svg" alt="" />
      </picture>
      <div class="absolute left-[395px] top-[132px] hidden 2xl:block">
        <div class="relative w-[1px] h-[203px] bg-[#108313]">
          <div
            class="absolute bottom-0 left-full top-full -translate-x-[57%] -translate-y-1/2 w-[5px] h-[5px] bg-[#108313] rounded-full"
          ></div>
        </div>
      </div>
      <div class="absolute left-[1049px] top-[690px] hidden 2xl:block">
        <div class="relative w-[1px] h-[165px] bg-[#108313]">
          <div
            class="absolute bottom-0 left-full top-full -translate-x-[57%] -translate-y-1/2 w-[5px] h-[5px] bg-[#108313] rounded-full"
          ></div>
        </div>
      </div>
      <div class="absolute left-[453px] top-[1648px] hidden 2xl:block">
        <div class="relative w-[1px] h-[165px] bg-[#108313]">
          <div
            class="absolute bottom-0 left-full top-full -translate-x-[57%] -translate-y-1/2 w-[5px] h-[5px] bg-[#108313] rounded-full"
          ></div>
        </div>
      </div>
      <div class="absolute left-[187px] 2xl:left-[700px] top-[2009px] 2xl:top-[3113px]">
        <div class="relative w-[1px] h-[57px] 2xl:h-[103px] bg-[#108313]">
          <div
            class="absolute left-full top-full -translate-x-[57%] -translate-y-1/2 w-[5px] h-[5px] bg-[#108313] rounded-full"
          ></div>
        </div>
      </div>
    </div>
  </div>
  <footer class="w-full -mt-60">
    <div
      class="w-full h-[200px] 2xl:h-[342px] bg-[url('@/assets/aboutus/footer圓弧(375px).svg')] 2xl:bg-[url('@/assets/aboutus/footer圓弧.svg')] bg-no-repeat bg-cover bg-center flex items-end"
    >
      <div class="relative w-[375px] 2xl:w-[1400px] mx-auto">
        <div class="w-full h-[190px] flex items-center justify-center 2xl:justify-between mx-auto">
          <div
            class="flex flex-col 2xl:flex-row items-center gap-[17px] 2xl:gap-[60px] py-[22px] 2xl:py-0 2xl:pl-[100px]"
          >
            <div class="2xl:self-start">
              <img :src="logo1200" alt="" class="w-[278.51px] hidden 2xl:block" />
              <div class="flex flex-col gap-[17px] items-center 2xl:hidden">
                <img :src="icon375" alt="" class="w-[34.56px]" />
                <img :src="logowi375" alt="" />
              </div>
            </div>
            <div
              class="text-gray-600 text-center self-start 2xl:text-start text-[10px] 2xl:text-sm leading-[18px] 2xl:leading-6 font-medium"
            >
              <p>住&nbsp;&nbsp;&nbsp;址&nbsp;|&nbsp;臺中市豐原區三民路46號</p>
              <div class="hidden 2xl:block">
                <p>電&nbsp;&nbsp;&nbsp;話&nbsp;|&nbsp;04-25234175</p>
                <p>傳&nbsp;&nbsp;&nbsp;真&nbsp;|&nbsp;04-25281621</p>
              </div>
              <p class="2xl:hidden flex gap-2">
                <span>電&nbsp;&nbsp;&nbsp;話&nbsp;|&nbsp;04-25234175</span>
                <span>傳&nbsp;&nbsp;&nbsp;真&nbsp;|&nbsp;04-25281621</span>
              </p>
              <p>Email&nbsp;|&nbsp;service@fybus.com.tw</p>
            </div>
          </div>
          <div class="hidden 2xl:flex items-center justify-center self-end pb-[50px] pr-[99px]">
            <picture>
              <source :srcset="slogan1200" alt="" class="self-end" media="(min-width:1200px)" />
              <img :src="slogan992" alt="" class="self-end" />
            </picture>
          </div>
        </div>
        <picture class="absolute left-[10%] -top-[33%] 2xl:left-[30%] 2xl:-top-[150%] z-30">
          <source
            srcset="@/assets/homepage/footer/flaglogo.svg"
            alt=""
            media="(min-width:1400px)"
          />
          <source
            srcset="@/assets/homepage/footer/flaglogo(1200px).svg"
            alt=""
            media="(min-width:1200px)"
          />
          <source
            srcset="@/assets/homepage/footer/flaglogo(992px).svg"
            alt=""
            media="(min-width:992px)"
          />
          <source
            srcset="@/assets/homepage/footer/flaglogo(768px).svg"
            alt=""
            media="(min-width:768px)"
          />
          <img src="" alt="" />
        </picture>
      </div>
    </div>
    <div class="w-full bg-green-700">
      <div
        class="xl:w-[1200px] 2xl:w-[1400px] h-10 md:h-[37px] lg:pr-[33px] pr-0 mx-auto flex justify-center md:justify-center lg:justify-end items-center"
      >
        <p class="text-white text-[10px] lg:text-xs font-light hidden md:block">
          豐原汽車客運股份有限公司 © Fengyuan Bus Transportation Co., Ltd. All Rights Reserved.
        </p>
        <p
          class="flex md:hidden flex-col items-center text-white text-[10px] font-light leading-[150%] -tracking-[1%]"
        >
          <span>豐原汽車客運股份有限公司 ©</span>
          <span> Fengyuan Bus Transportation Co., Ltd. All Rights Reserved. </span>
        </p>
      </div>
    </div>
  </footer>
  <RouterView />
</template>
<style scoped>
.bustoright {
  animation: shake 0.3s ease-in infinite;
  animation-delay: 1s;
}
@keyframes shake {
  to {
    transform: translateY(0.3%);
  }
  from {
    transform: translateY(-0.3%);
  }
}
.swiper {
  position: relative;
}
.pagination-1 {
  position: absolute;
  left: -7%;
  top: 50%;
  display: flex;
  flex-direction: column;
}
.pagination-2 {
  position: absolute;
  left: 103%;
  top: 45%;
  display: flex;
  flex-direction: column;
}
.pagination-3 {
  position: absolute;
  left: -7%;
  top: 50%;
  display: flex;
  flex-direction: column;
}

ul {
  list-style: none;
}
@media (min-width: 1400px) {
  ul li::before {
    content: '';
    width: 12px;
    height: 12px;
    background-color: #108313;
    border-radius: 12px;
    display: inline-block;
    margin: 10px;
  }
}

ul li::before {
  content: '';
  width: 5.4px;
  height: 5.4px;
  background-color: #108313;
  border-radius: 12px;
  display: inline-block;
  margin: 10px;
}

.wrapper {
  background: #ffffff;
  overflow: hidden;
}

.factsContainer {
  padding: 0em 2em;
  text-align: center;
  line-height: 10vh;
}

.factsContainer_sm {
  display: flex;
  width: 1400px;
}

.fact {
  display: flex;
  flex-direction: column;
  flex: 1;
  justify-content: space-between;
  padding: 1em;
  align-items: center;
  color: #f0c368;
}

@media (max-width: 1399px) {
  .factsContainer_sm {
    display: flex;
    width: 375px;
  }
}
</style>
