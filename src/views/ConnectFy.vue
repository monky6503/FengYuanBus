<script setup>
import AOS from 'aos'
import 'aos/dist/aos.css'
import { onMounted } from 'vue'
import { RouterView } from 'vue-router'
import NavBar from '../components/homepage/NavBar.vue'
import FooterView from '../components/homepage/FooterView.vue'
import banner_1400px from '@/assets/connectfy/banner_1400px.svg'
import banner_768px from '@/assets/connectfy/banner_768px.svg'
import banner_375px from '@/assets/connectfy/banner_375px.svg'
import chatbubble from '@/assets/connectfy/chatbubble.svg'
import flag from '@/assets/recruitment/flag.svg'
import bustoleft from '@/assets/recruitment/bustoleft.svg'
import bustoleft768px from '@/assets/connectfy/bustoleft_768px.svg'
import travelpic1 from '@/assets/connectfy/travelPhoto01.svg'
import travelpic2 from '@/assets/connectfy/travelPhoto02.svg'
import travelpic3 from '@/assets/connectfy/travelPhoto03.svg'

onMounted(() => {
  AOS.init({
    delay: 1,
    duration: 1000 // 動畫持續時間 (ms)
  })
})
</script>
<template>
  <NavBar />
  <div class="w-auto mx-auto overflow-hidden lg:pt-[100px] pt-[57px]">
    <div class="relative w-full h-auto">
      <!-- banner -->
      <div class="w-full h-auto bg-[#EFEFEF]">
        <picture>
          <img :src="banner_1400px" alt="" class="w-full h-full 2xl:block hidden" />
          <img :src="banner_768px" alt="" class="w-full h-full md:block 2xl:hidden hidden" />
          <img :src="banner_375px" alt="" class="w-full h-full bolck md:hidden" />
        </picture>
      </div>
      <div class="flex justify-end">
        <div
          class="md:absolute lg:left-[73%] md:top-[36%] md:left-[68%] mt-[30px] mr-[30px] lg:w-[438px] lg:h-[423px] md:w-[338px] md:h-[323px] w-[315px] h-[169px] bg-[#727EDD] lg:rounded-[193px] md:rounded-[143px] rounded-[15px] rounded-es-[85px] flex flex-col justify-center lg:pl-[116px] md:pl-[83px] pl-[58px] gap-[9px]"
        >
          <div class="md:w-auto w-[204px] flex md:flex-col justify-between">
            <img :src="chatbubble" alt="" class="lg:w-[107.63px] w-[73px]" />
            <div class="text-white md:text-[24px] text-[18px]">
              <p>回饋專線</p>
              <p>0800-034-175</p>
            </div>
          </div>

          <div
            class="flex md:flex-col gap-[10px] px-[10px] md:border-l border-white text-white md:text-[16px] text-[14px]"
          >
            <p>星期一至星期五</p>
            <div>
              <p>08:00-12:00</p>
              <p>13:00-17:00</p>
            </div>
          </div>
        </div>
      </div>

      <div
        class="flex md:justify-start justify-center 2xl:pl-[15%] 2xl:pr-[15%] md:pl-[15%] md:pr-[15%] py-10 gap-[10px]"
      >
        <div class="w-[298px]">
          <p
            class="text-2xl font-bold tracking-[4px] leading-[150%] text-[#108313] px-[15px] pb-[10px]"
          >
            豐原客運總公司
          </p>
          <p class="flex items-center gap-[15px]">
            <span
              class="text-[#108313] text-xs font-light leading-[150%] border-r border-[#108313] px-[15px]"
              >住&nbsp;&nbsp;&nbsp;址</span
            >臺中市豐原區三民路46號
          </p>
          <p class="flex items-center gap-[15px]">
            <span
              class="text-[#108313] text-xs font-light leading-[150%] border-r border-[#108313] px-[15px]"
              >電&nbsp;&nbsp;&nbsp;話</span
            >04-25234175
          </p>
          <p class="flex items-center gap-[15px]">
            <span
              class="text-[#108313] text-xs font-light leading-[150%] border-r border-[#108313] px-[15px]"
              >傳&nbsp;&nbsp;&nbsp;真</span
            >04-25281621
          </p>
          <p class="flex items-center gap-[15px]">
            <span
              class="w-[62.97px] text-[#108313] text-xs font-light leading-[150%] border-r border-[#108313] px-[15px]"
              >Email</span
            >service@fybus.com.tw
          </p>
        </div>
      </div>
    </div>
  </div>
  <div class="w-full mx-auto pt-10">
    <div class="pt-14">
      <div
        class="w-full 2xl:pl-[15%] 2xl:pr-[15%] md:pl-[15%] md:pr-[15%] flex flex-col gap-[30px]"
      >
        <div class="flex md:justify-start justify-center">
          <div class="md:w-auto w-[298px] flex items-center gap-[17px]">
            <img :src="flag" alt="" />
            <h3 class="text-2xl font-semibold font-SerifTC tracking-[2px] leading-6">搭乘地點</h3>
          </div>
        </div>
        <div class="w-full flex flex-col gap-[50px]" data-aos="fade-up">
          <div class="flex md:justify-start justify-center">
            <div
              class="md:w-[501px] w-[298px] h-auto border-t border-l border-[#108313] rounded-tl-[80px] pl-[50px] pt-[45px] pb-[37px]"
            >
              <div class="shadow-[2px_3px_4px_0_rgba(0,0,0,0.1)] rounded-br-[50px]">
                <div class="px-[15px] pb-[10px]">
                  <p class="md:text-2xl text-[20px] font-bold leading-[150%] tracking-[4px]">
                    豐原站
                  </p>
                </div>
                <div class="flex flex-col gap-[15px] p-5">
                  <div class="flex md:flex-row flex-col justify-items-start gap-6">
                    <p class="flex items-center gap-[15px]">
                      <span
                        class="text-[#108313] text-sm font-medium leading-[150%] border-r border-[#108313] pr-[15px]"
                        >電&nbsp;&nbsp;&nbsp;話</span
                      >04-25234175
                    </p>
                    <p class="flex items-center gap-[15px]">
                      <span
                        class="text-[#108313] text-sm font-medium leading-[150%] border-r border-[#108313] pr-[15px]"
                        >售票處</span
                      >04-25234175
                    </p>
                  </div>
                  <p class="text-sm leading-[150%] text-[#818181] flex md:flex-row flex-col">
                    <span>台中市豐原區三民路46號</span><span>(豐原火車站對面)</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div class="flex md:justify-end justify-center">
            <div
              class="md:w-[390px] w-[298px] h-[228px] border-t border-l border-[#108313] rounded-tl-[80px] pl-[50px] pt-[45px] pb-[37px] md:-mt-[37px] -mt-0"
            >
              <div class="shadow-[2px_3px_4px_0_rgba(0,0,0,0.1)] rounded-br-[50px]">
                <div class="px-[15px] pb-[10px]">
                  <p class="md:text-2xl text-[20px] font-bold leading-[150%] tracking-[4px]">
                    東勢站
                  </p>
                </div>
                <div class="flex flex-col gap-[15px] p-5">
                  <p class="flex items-center gap-[15px]">
                    <span
                      class="text-[#108313] text-sm font-medium leading-[150%] border-r border-[#108313] pr-[15px]"
                      >電&nbsp;&nbsp;&nbsp;話</span
                    >04-36091079
                  </p>

                  <p class="text-sm leading-[150%] text-[#818181]">台中市東勢區豐勢路488號</p>
                </div>
              </div>
            </div>
          </div>
          <div class="flex md:justify-start justify-center">
            <div
              class="md:w-[447px] w-[298px] h-[228px] border-t border-l border-[#108313] rounded-tl-[80px] pl-[50px] pt-[45px] pb-[37px]"
            >
              <div class="shadow-[2px_3px_4px_0_rgba(0,0,0,0.1)] rounded-br-[50px]">
                <div class="px-[15px] pb-[10px]">
                  <p class="md:text-2xl text-[20px] font-bold leading-[150%] tracking-[4px]">
                    臺中站
                  </p>
                </div>
                <div class="flex flex-col gap-[15px] p-5">
                  <p class="flex items-center gap-[15px]">
                    <span
                      class="text-[#108313] text-sm font-medium leading-[150%] border-r border-[#108313] pr-[15px]"
                      >電&nbsp;&nbsp;&nbsp;話</span
                    >04-25246603
                  </p>
                  <p class="text-sm leading-[150%] text-[#818181]">台中市南區明德街2號</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="w-full flex justify-end mt-8 pr-10">
        <img :src="bustoleft" alt="" class="bustoleft hidden md:block" />
        <img :src="bustoleft768px" alt="" class="bustoleft md:hidden" />
      </div>
    </div>
  </div>
  <div class="w-full md:h-[397px] h-[346px] bg-[#FFF7D3] mx-auto"></div>
  <div class="w-full mx-auto -mt-72 mb-72 flex flex-col items-center justify-center gap-[47px]">
    <div class="flex flex-col items-center gap-[22px]">
      <img :src="flag" alt="" class="w-[42px]" />
      <h3 class="text-2xl font-semibold font-SerifTC leading-6 tracking-[2px]">相關服務</h3>
    </div>
    <div class="flex xl:flex-row flex-col items-center gap-[16px]">
      <div>
        <div class="relative">
          <img :src="travelpic1" alt="" />
          <div
            class="absolute left-0 -bottom-[10%] w-[191px] h-[57px] bg-white flex items-center justify-center gap-3"
          >
            <h3
              class="text-2xl text-[#108313] font-bold tracking-[4px] leading-[150%] flex-shrink-0"
            >
              豐客旅行社
            </h3>
          </div>
        </div>
        <div class="flex flex-col gap-[15px] p-5 mt-[20px]">
          <div class="flex md:flex-row flex-col justify-start gap-6">
            <p class="flex items-center gap-[15px]">
              <span
                class="text-[#108313] text-sm font-medium leading-[150%] border-r border-[#108313] pr-[15px]"
                >電&nbsp;&nbsp;&nbsp;話</span
              >04-25234175
            </p>
            <p class="flex items-center gap-[15px]">
              <span
                class="text-[#108313] text-sm font-medium leading-[150%] border-r border-[#108313] pr-[15px]"
                >傳&nbsp;&nbsp;&nbsp;真</span
              >04-25222203
            </p>
          </div>
          <p class="text-sm leading-[150%] text-[#818181]">台中市豐原區三民路46號(總公司2樓)</p>
        </div>
      </div>
      <div>
        <div class="relative">
          <img :src="travelpic2" alt="" />
          <div
            class="absolute left-0 -bottom-[10%] w-[191px] h-[57px] bg-white flex items-center justify-center gap-3"
          >
            <h3
              class="text-2xl text-[#108313] font-bold tracking-[4px] leading-[150%] flex-shrink-0"
            >
              車輛代檢廠
            </h3>
          </div>
        </div>
        <div class="flex flex-col gap-[15px] p-5 mt-[20px]">
          <p class="flex items-center gap-[15px]">
            <span
              class="text-[#108313] text-sm font-medium leading-[150%] border-r border-[#108313] pr-[15px]"
              >電&nbsp;&nbsp;&nbsp;話</span
            >04-25246603
          </p>
          <p class="text-sm leading-[150%] text-[#818181]">
            台中市豐原區豐勢路二段147號(翁子派出所附近)
          </p>
        </div>
      </div>
      <div>
        <div class="relative">
          <img :src="travelpic3" alt="" />
          <div
            class="absolute left-0 -bottom-[10%] w-[191px] h-[57px] bg-white flex items-center justify-center gap-3"
          >
            <h3
              class="text-2xl text-[#108313] font-bold tracking-[4px] leading-[150%] flex-shrink-0"
            >
              遊覽車出租
            </h3>
          </div>
        </div>
        <div class="flex flex-col gap-[15px] p-5 mt-[20px]">
          <p class="flex items-center gap-[15px]">
            <span
              class="text-[#108313] text-sm font-medium leading-[150%] border-r border-[#108313] pr-[15px]"
              >電&nbsp;&nbsp;&nbsp;話</span
            >04-25246603
          </p>
          <p class="text-sm leading-[150%] text-[#818181]">台中市豐原區三民路46號(總公司2樓)</p>
        </div>
      </div>
    </div>
  </div>
  <FooterView />
  <RouterView />
</template>

<style scoped>
.bustoleft {
  animation: shake 0.3s linear infinite;
}
@keyframes shake {
  to {
    transform: translateY(0.3%);
  }
  from {
    transform: translateY(-0.3%);
  }
}
</style>
