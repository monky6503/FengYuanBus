<script setup>
import { onMounted } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)
const busAnimation = () => {
  let tl = gsap.timeline({
    scrollTrigger: {
      trigger: '#bgroad',
      start: 'top top',
      end: '60% 40%',
      markers: true,
      scrub: 3,
      toggleActions: 'restart pause reverse pause'
    }
  })
  // 出發
  tl.to('#gobus', {
    motionPath: {
      path: [
        { x: 0, y: 220, duration: 1 },
        { x: -25, y: 240, duration: 1 },
        { x: -50, y: 260, duration: 1 },
        { x: -75, y: 280, duration: 1 },
        { x: -100, y: 300, duration: 1 }
      ],
      autoRotate: -90,
      alignOrigin: [0.5, 0.5]
    }
  })
}

// const test = () => {
//   const maintimeline = gsap.timeline()
//   let firstAnimation = gsap.timeline({
//       scrollTrigger: {
//         trigger: '.factsContainer',
//         start: 'top center',
//         scrub: true,
//         end: '+=300'
//       }
//     }),
//     facts = gsap.utils.toArray('.fact')
//   firstAnimation.to(facts, {
//     xPercent: -100 * (facts.length - 1),
//     scrollTrigger: {
//       trigger: '.factsContainer_sm',
//       start: 'center center',
//       pin: true,
//       scrub: 1,
//       snap: 1 / (facts.length - 1),
//       end: () => `+=7000`
//     }
//   })

//   let secondAnimation = gsap.timeline({
//     scrollTrigger: {
//       trigger: '#bgroad',
//       start: '10% 80%',
//       end: '70% bottom',
//       markers: true,
//       scrub: 3,
//       toggleActions: 'restart pause reverse pause'
//     }
//   })
//   secondAnimation
//     .to('#gobus', { x: 0, y: 200, duration: 1 })
//     .to('#gobus', { x: -25, y: 220, rotate: 10, duration: 1 })
//     .to('#gobus', { x: -50, y: 240, rotate: 20, duration: 1 })
//     .to('#gobus', { x: -75, y: 260, rotate: 30, duration: 1 })
//     .to('#gobus', { x: -100, y: 280, rotate: 40, duration: 1 })
//     .to('#gobus', { x: -125, y: 300, rotate: 50, duration: 1 })
//     .to('#gobus', { x: -150, y: 320, rotate: 60, duration: 1 })
//     .to('#gobus', { x: -175, y: 340, rotate: 70, duration: 1 })
//     .to('#gobus', { x: -200, y: 360, rotate: 80, duration: 1 })
//     .to('#gobus', { x: -225, y: 380, rotate: 90, duration: 1 })
//     // 直線
//     .to('#gobus', { x: -550, y: 380, rotate: 90, duration: 1 })
//     .to('#gobus', { x: -600, y: 380, rotate: 90, duration: 1 })
//     .to('#gobus', { x: -650, y: 400, rotate: 80, duration: 1 })
//     .to('#gobus', { x: -700, y: 420, rotate: 70, duration: 1 })
//     .to('#gobus', { x: -750, y: 450, rotate: 60, duration: 1 })
//     .to('#gobus', { x: -800, y: 480, rotate: 50, duration: 1 })
//     .to('#gobus', { x: -820, y: 510, rotate: 40, duration: 1 })
//     .to('#gobus', { x: -840, y: 550, rotate: 30, duration: 1 })
//     .to('#gobus', { x: -860, y: 600, rotate: 20, duration: 1 })
//     .to('#gobus', { x: -880, y: 630, rotate: 10, duration: 1 })
//     .to('#gobus', { x: -880, y: 680, rotate: 0, duration: 1 })
//     // 直線
//     .to('#gobus', { x: -880, y: 820, rotate: 0, duration: 1 })
//     .to('#gobus', { x: -860, y: 860, rotate: -10, duration: 0.5 })
//     .to('#gobus', { x: -840, y: 900, rotate: -20, duration: 0.5 })
//     .to('#gobus', { x: -820, y: 940, rotate: -30, duration: 0.5 })
//     .to('#gobus', { x: -800, y: 980, rotate: -40, duration: 0.5 })
//     .to('#gobus', { x: -760, y: 990, rotate: -50, duration: 0.5 })
//     .to('#gobus', { x: -720, y: 1000, rotate: -60, duration: 0.5 })
//     .to('#gobus', { x: -670, y: 1010, rotate: -70, duration: 0.5 })
//     .to('#gobus', { x: -640, y: 1020, rotate: -80, duration: 0.5 })
//     .to('#gobus', { x: -600, y: 1020, rotate: -90, duration: 1 })
//     // 直線
//     .to('#gobus', { x: -180, y: 1020, rotate: -90, duration: 1 })
//     .to('#gobus', { x: -120, y: 1040, rotate: -80, duration: 0.5 })
//     .to('#gobus', { x: -60, y: 1060, rotate: -70, duration: 0.5 })
//     .to('#gobus', { x: 0, y: 1080, rotate: -60, duration: 0.5 })
//     .to('#gobus', { x: 20, y: 1100, rotate: -50, duration: 0.5 })
//     .to('#gobus', { x: 40, y: 1160, rotate: -40, duration: 0.5 })
//     .to('#gobus', { x: 60, y: 1170, rotate: -30, duration: 0.5 })
//     .to('#gobus', { x: 80, y: 1180, rotate: -20, duration: 0.5 })
//     .to('#gobus', { x: 90, y: 1200, rotate: -10, duration: 0.5 })
//     .to('#gobus', { x: 100, y: 1300, rotate: 0, duration: 0.5 })
//     //直線
//     .to('#gobus', { x: 100, y: 1700, rotate: 0, duration: 0.5 })
//     .to('#gobus', { x: 75, y: 1735, rotate: 10, duration: 0.5 })
//     .to('#gobus', { x: 50, y: 1770, rotate: 20, duration: 0.5 })
//     .to('#gobus', { x: 25, y: 1805, rotate: 30, duration: 0.5 })
//     .to('#gobus', { x: 0, y: 1840, rotate: 40, duration: 0.5 })
//     .to('#gobus', { x: -25, y: 1875, rotate: 50, duration: 0.5 })
//     .to('#gobus', { x: -50, y: 1910, rotate: 60, duration: 0.5 })
//     .to('#gobus', { x: -75, y: 1960, rotate: 70, duration: 0.5 })
//     .to('#gobus', { x: -100, y: 1990, rotate: 80, duration: 0.5 })
//     .to('#gobus', { x: -150, y: 2000, rotate: 90, duration: 0.5 })
//     //直線
//     .to('#gobus', { x: -550, y: 2000, rotate: 90, duration: 0.5 })
//     .to('#gobus', { x: -700, y: 2200, rotate: 0, duration: 0.5 })
//     .to('#gobus', { x: -25, y: 220, rotate: 10, duration: 1 })
//     .to('#gobus', { x: -50, y: 240, rotate: 20, duration: 1 })
//     .to('#gobus', { x: -75, y: 260, rotate: 30, duration: 1 })
//     .to('#gobus', { x: -100, y: 280, rotate: 40, duration: 1 })
//     .to('#gobus', { x: -125, y: 300, rotate: 50, duration: 1 })
//     .to('#gobus', { x: -150, y: 320, rotate: 60, duration: 1 })
//     .to('#gobus', { x: -175, y: 340, rotate: 70, duration: 1 })
//     .to('#gobus', { x: -200, y: 360, rotate: 80, duration: 1 })
//     .to('#gobus', { x: -225, y: 380, rotate: 90, duration: 1 })
//     // 直線
//     .to('#gobus', { x: -550, y: 380, rotate: 90, duration: 1 })
//     .to('#gobus', { x: -600, y: 380, rotate: 90, duration: 1 })
//     .to('#gobus', { x: -650, y: 400, rotate: 80, duration: 1 })
//     .to('#gobus', { x: -700, y: 420, rotate: 70, duration: 1 })
//     .to('#gobus', { x: -750, y: 450, rotate: 60, duration: 1 })
//     .to('#gobus', { x: -800, y: 480, rotate: 50, duration: 1 })
//     .to('#gobus', { x: -820, y: 510, rotate: 40, duration: 1 })
//     .to('#gobus', { x: -840, y: 550, rotate: 30, duration: 1 })
//     .to('#gobus', { x: -860, y: 600, rotate: 20, duration: 1 })
//     .to('#gobus', { x: -880, y: 630, rotate: 10, duration: 1 })
//     .to('#gobus', { x: -880, y: 680, rotate: 0, duration: 1 })
//     // 直線
//     .to('#gobus', { x: -880, y: 820, rotate: 0, duration: 1 })
//     .to('#gobus', { x: -860, y: 860, rotate: -10, duration: 0.5 })
//     .to('#gobus', { x: -840, y: 900, rotate: -20, duration: 0.5 })
//     .to('#gobus', { x: -820, y: 940, rotate: -30, duration: 0.5 })
//     .to('#gobus', { x: -800, y: 980, rotate: -40, duration: 0.5 })
//     .to('#gobus', { x: -760, y: 990, rotate: -50, duration: 0.5 })
//     .to('#gobus', { x: -720, y: 1000, rotate: -60, duration: 0.5 })
//     .to('#gobus', { x: -670, y: 1010, rotate: -70, duration: 0.5 })
//     .to('#gobus', { x: -640, y: 1020, rotate: -80, duration: 0.5 })
//     .to('#gobus', { x: -600, y: 1020, rotate: -90, duration: 1 })
//     // 直線
//     .to('#gobus', { x: -180, y: 1020, rotate: -90, duration: 1 })
//     .to('#gobus', { x: -120, y: 1040, rotate: -80, duration: 0.5 })
//     .to('#gobus', { x: -60, y: 1060, rotate: -70, duration: 0.5 })
//     .to('#gobus', { x: 0, y: 1080, rotate: -60, duration: 0.5 })
//     .to('#gobus', { x: 20, y: 1100, rotate: -50, duration: 0.5 })
//     .to('#gobus', { x: 40, y: 1160, rotate: -40, duration: 0.5 })
//     .to('#gobus', { x: 60, y: 1170, rotate: -30, duration: 0.5 })
//     .to('#gobus', { x: 80, y: 1180, rotate: -20, duration: 0.5 })
//     .to('#gobus', { x: 90, y: 1200, rotate: -10, duration: 0.5 })
//     .to('#gobus', { x: 100, y: 1300, rotate: 0, duration: 0.5 })
//     //直線
//     .to('#gobus', { x: 100, y: 1700, rotate: 0, duration: 0.5 })
//     .to('#gobus', { x: 75, y: 1740, rotate: 10, duration: 0.5 })
//     .to('#gobus', { x: 50, y: 1780, rotate: 20, duration: 0.5 })
//     .to('#gobus', { x: 25, y: 1820, rotate: 30, duration: 0.5 })
//     .to('#gobus', { x: 0, y: 1860, rotate: 40, duration: 0.5 })
//     .to('#gobus', { x: -25, y: 1900, rotate: 50, duration: 0.5 })
//     .to('#gobus', { x: -50, y: 1930, rotate: 60, duration: 0.5 })
//     .to('#gobus', { x: -75, y: 1960, rotate: 70, duration: 0.5 })
//     .to('#gobus', { x: -100, y: 1990, rotate: 80, duration: 0.5 })
//     .to('#gobus', { x: -150, y: 2000, rotate: 90, duration: 0.5 })
//     //直線
//     .to('#gobus', { x: -550, y: 2000, rotate: 90, duration: 0.5 })
//     .to('#gobus', { x: -565, y: 2015, rotate: 80, duration: 1 })
//     .to('#gobus', { x: -580, y: 2030, rotate: 70, duration: 1 })
//     .to('#gobus', { x: -595, y: 2045, rotate: 60, duration: 1 })
//     .to('#gobus', { x: -620, y: 2060, rotate: 50, duration: 1 })
//     .to('#gobus', { x: -635, y: 2090, rotate: 40, duration: 1 })
//     .to('#gobus', { x: -655, y: 2120, rotate: 30, duration: 1 })
//     .to('#gobus', { x: -670, y: 2140, rotate: 20, duration: 1 })
//     .to('#gobus', { x: -690, y: 2160, rotate: 10, duration: 1 })
//     .to('#gobus', { x: -700, y: 2200, rotate: 0, duration: 0.5 })
//     //直線
//     .to('#gobus', { x: -700, y: 2400, rotate: 0, duration: 0.5 })

//   maintimeline.add(firstAnimation).add(secondAnimation)
// }

onMounted(() => {
  busAnimation()
  // test()
})
</script>
<template>
  <div
    class="relative w-[1400px] h-[4064px] bg-[url('@/assets/aboutus/bgroad.svg')] mx-auto"
    id="bgroad"
  >
    <img src="@/assets/aboutus/gobus.svg" alt="" class="absolute left-3/4 top-[5%]" id="gobus" />
  </div>
  <!-- <div class="wrapper mx-auto w-[1400px] flex justify-center">
    <div class="factsContainer">
      <div class="factsContainer_sm relative">
        <div class="fact">
          <section class="w-[1400px] flex flex-col items-center justify-center overflow-hidden">
            <div class="flex flex-col items-center pb-[50px]">
              <img src="@/assets/aboutus/reward1.svg" alt="" />
              <p class="text-[#0518BF] text-2xl font-medium leading-[150%]">第一名</p>
              <div class="flex items-center justify-center gap-[25px]">
                <div class="flex items-center">
                  <div class="w-[2px] h-[2px] rounded-full bg-[#0518BF]"></div>
                  <div class="w-[420px] h-[1px] bg-[#0518BF]"></div>
                </div>
                <p class="text-5xl text-[#818181] font-normal font-Metrophobic leading-[150%]">
                  1958
                </p>
                <div class="flex items-center">
                  <div class="w-[420px] h-[1px] bg-[#0518BF]"></div>
                  <div class="w-[2px] h-[2px] rounded-full bg-[#0518BF]"></div>
                </div>
              </div>
            </div>
            <img src="@/assets/aboutus/1958.svg" alt="" />
          </section>
        </div>
        <div class="fact">
          <section class="w-[1400px] flex flex-col items-center justify-center overflow-hidden">
            <div class="flex flex-col items-center pb-[50px]">
              <img src="@/assets/aboutus/reward1.svg" alt="" />
              <p class="text-[#0518BF] text-2xl font-medium leading-[150%]">第一名</p>
              <div class="flex items-center justify-center gap-[25px]">
                <div class="flex items-center">
                  <div class="w-[2px] h-[2px] rounded-full bg-[#0518BF]"></div>
                  <div class="w-[420px] h-[1px] bg-[#0518BF]"></div>
                </div>
                <p class="text-5xl text-[#818181] font-normal font-Metrophobic leading-[150%]">
                  1958
                </p>
                <div class="flex items-center">
                  <div class="w-[420px] h-[1px] bg-[#0518BF]"></div>
                  <div class="w-[2px] h-[2px] rounded-full bg-[#0518BF]"></div>
                </div>
              </div>
            </div>
            <img src="@/assets/aboutus/1958.svg" alt="" />
          </section>
        </div>
        <div class="fact">
          <section class="w-[1400px] flex flex-col items-center justify-center overflow-hidden">
            <div class="flex flex-col items-center pb-[50px]">
              <img src="@/assets/aboutus/reward1.svg" alt="" />
              <p class="text-[#0518BF] text-2xl font-medium leading-[150%]">第一名</p>
              <div class="flex items-center justify-center gap-[25px]">
                <div class="flex items-center">
                  <div class="w-[2px] h-[2px] rounded-full bg-[#0518BF]"></div>
                  <div class="w-[420px] h-[1px] bg-[#0518BF]"></div>
                </div>
                <p class="text-5xl text-[#818181] font-normal font-Metrophobic leading-[150%]">
                  1958
                </p>
                <div class="flex items-center">
                  <div class="w-[420px] h-[1px] bg-[#0518BF]"></div>
                  <div class="w-[2px] h-[2px] rounded-full bg-[#0518BF]"></div>
                </div>
              </div>
            </div>
            <img src="@/assets/aboutus/1958.svg" alt="" />
          </section>
        </div>
        <div class="fact">
          <section class="w-[1400px] flex flex-col items-center justify-center overflow-hidden">
            <div class="flex flex-col items-center pb-[50px]">
              <img src="@/assets/aboutus/reward1.svg" alt="" />
              <p class="text-[#0518BF] text-2xl font-medium leading-[150%]">第一名</p>
              <div class="flex items-center justify-center gap-[25px]">
                <div class="flex items-center">
                  <div class="w-[2px] h-[2px] rounded-full bg-[#0518BF]"></div>
                  <div class="w-[420px] h-[1px] bg-[#0518BF]"></div>
                </div>
                <p class="text-5xl text-[#818181] font-normal font-Metrophobic leading-[150%]">
                  1958
                </p>
                <div class="flex items-center">
                  <div class="w-[420px] h-[1px] bg-[#0518BF]"></div>
                  <div class="w-[2px] h-[2px] rounded-full bg-[#0518BF]"></div>
                </div>
              </div>
            </div>
            <img src="@/assets/aboutus/1958.svg" alt="" />
          </section>
        </div>
        <div class="fact">
          <section class="w-[1400px] flex flex-col items-center justify-center overflow-hidden">
            <div class="flex flex-col items-center pb-[50px]">
              <img src="@/assets/aboutus/reward1.svg" alt="" />
              <p class="text-[#0518BF] text-2xl font-medium leading-[150%]">第一名</p>
              <div class="flex items-center justify-center gap-[25px]">
                <div class="flex items-center">
                  <div class="w-[2px] h-[2px] rounded-full bg-[#0518BF]"></div>
                  <div class="w-[420px] h-[1px] bg-[#0518BF]"></div>
                </div>
                <p class="text-5xl text-[#818181] font-normal font-Metrophobic leading-[150%]">
                  1958
                </p>
                <div class="flex items-center">
                  <div class="w-[420px] h-[1px] bg-[#0518BF]"></div>
                  <div class="w-[2px] h-[2px] rounded-full bg-[#0518BF]"></div>
                </div>
              </div>
            </div>
            <img src="@/assets/aboutus/1958.svg" alt="" />
          </section>
        </div>
        <img
          src="@/assets/aboutus/bustoright.svg"
          alt=""
          class="absolute left-0 bottom-0 opacity-50 bustoright"
        />
      </div>
    </div>
  </div>
  <div
    class="relative w-[1400px] h-[2371px] mx-auto 2xl:h-[3900px] bg-[url('@/assets/aboutus/bgroad(375px).svg')] 2xl:bg-[url('@/assets/aboutus/bgroad.svg')] bg-no-repeat"
    id="bgroad"
  >
    <picture class="absolute left-[65%] 2xl:left-3/4 top-[13%] 2xl:top-[5%]" id="gobus">
      <source srcset="@/assets/aboutus/gobus.svg" media="(min-width:1400px)" />
      <img src="@/assets/aboutus/gobus(375px).svg" alt="" />
    </picture>
  </div> -->
</template>
<style scoped>
.wrapper {
  background: #ffffff;
  overflow-x: hidden;
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
}
</style>
