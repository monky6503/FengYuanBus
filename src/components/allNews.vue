<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { onMounted } from 'vue'
import { useButtonStore } from '@/stores/store.js'
const buttonStore = useButtonStore()
const switchState = (btn) => {
  buttonStore.updateSelectedState(btn)
}
// const selectedState = computed(() => buttonStore.selectedState)

onMounted(() => {
  buttonStore.loadState()
})
</script>
<template>
  <div class="w-full lg:w-[778px] bg-gradient-to-b from-[#FFF7D3] to-[#FFF] flex-grow p-[15px]">
    <div class="flex flex-col gap-[15px]">
      <div
        class="w-full lg:w-[748px] bg-white rounded-[20px] flex flex-col gap-5 px-[30px] pt-5 pb-[30px] shadow-[0px_2px_20px_rgba(113,113,113,0.1)]"
      >
        <h3 class="text-lg font-medium leading-[150%]">特別公告</h3>
        <div class="flex gap-5 border-l-[3px] border-[#F5D32F] px-5 py-[10px] hover:bg-[#EFEFEF]">
          <div class="w-full flex items-center justify-between gap-4">
            <div class="w-[580px] flex flex-col gap-[5px]">
              <div class="flex flex-col md:flex-row items-start md:items-center gap-[15px]">
                <div
                  class="bg-[#F5D32F] gap-2 text-base text-black font-medium rounded-[10px] px-[10px] py-[3px] leading-6"
                >
                  市區公車
                </div>
                <p class="text-base font-medium leading-[26px]">路線停駛公告</p>
                <p class="text-sm font-normal leading-[22px] text-[#637381]">25, Jun 2024</p>
              </div>
              <div>
                <p class="text-sm sm:text-base font-medium leading-6 text-gray-500 flex-1">
                  本公司170路公車，自113年7月15日起，改由睿奕交通接駛服務（變更為679路公車），不便之處，敬請見諒。
                </p>
              </div>
            </div>
            <div>
              <RouterLink
                to="/busnewestdetail"
                @click="switchState('bus')"
                class="w-6 h-6 border-2 border-[#818181] flex justify-center items-center rounded-full hover:border-none hover:bg-[#818181] text-[#818181] hover:text-white"
              >
                <i class="fa-solid fa-arrow-right"></i>
              </RouterLink>
            </div>
          </div>
        </div>
        <div class="flex gap-5 border-l-[3px] border-[#F5D32F] px-5 py-[10px] hover:bg-[#EFEFEF]">
          <div class="w-full flex items-center justify-between gap-4">
            <div class="w-[580px] flex flex-col gap-[5px]">
              <div class="flex flex-col md:flex-row items-start md:items-center gap-[15px]">
                <div
                  class="bg-[#F5D32F] gap-2 text-base text-black font-medium rounded-[10px] px-[10px] py-[3px] leading-6"
                >
                  期間變動
                </div>
                <p class="text-base font-medium leading-[26px]">暑假期間 7/1－8/29 行駛公告</p>
                <p class="text-sm font-normal leading-[22px] text-[#637381]">3, Mar 2024</p>
              </div>
              <div>
                <p class="text-sm sm:text-base font-medium leading-6 text-gray-500 flex-1">
                  暑假期間（7月1日～8月29日）停駛路線如下：208繞、211區1、211區2、219、258繞、232、278、279、900跳蛙。
                </p>
              </div>
            </div>
            <div>
              <button
                class="w-6 h-6 border-2 border-[#818181] flex justify-center items-center rounded-full hover:border-none hover:bg-[#818181] text-[#818181] hover:text-white"
              >
                <i class="fa-solid fa-arrow-right"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div
        class="w-full lg:w-[748px] bg-white rounded-[20px] flex flex-col gap-5 px-[30px] py-5 shadow-[0px_2px_20px_rgba(113,113,113,0.1)]"
      >
        <h3 class="text-lg font-medium leading-[150%]">全部公告</h3>

        <div class="flex gap-5 border-l-[3px] border-[#108313] px-5 py-[10px] hover:bg-[#EFEFEF]">
          <div class="w-full flex items-center justify-between gap-4">
            <div class="w-[580px] flex flex-col gap-[5px]">
              <div class="flex flex-col md:flex-row items-start md:items-center gap-[15px]">
                <div
                  class="bg-[#108313] gap-2 text-base text-white font-medium rounded-[10px] px-[10px] py-[3px] leading-6"
                >
                  市區公車
                </div>
                <span class="text-base font-medium leading-[26px]">253路公車『雪山橋頭』站</span>
                <span class="text-sm font-normal leading-[22px] text-[#637381]">26, Jun 2024</span>
              </div>
              <div>
                <p class="text-sm sm:text-base font-medium leading-6 text-gray-500 flex-1">
                  本公司253路公車之『雪山橋頭』站，自113年8月5日起，往士林村方向遷移至雪霸大眾餐廳前（和平區東崎路一段桃山巷73-7號），如下圖所示，不便之處，敬請見諒。
                </p>
              </div>
            </div>
            <div>
              <RouterLink
                to="/busnewestdetail"
                @click="switchState('bus')"
                class="w-6 h-6 border-2 border-[#818181] flex justify-center items-center rounded-full hover:border-none hover:bg-[#818181] text-[#818181] hover:text-white"
              >
                <i class="fa-solid fa-arrow-right"></i>
              </RouterLink>
            </div>
          </div>
        </div>
        <div class="flex gap-5 border-l-[3px] border-[#108313] px-5 py-[10px] hover:bg-[#EFEFEF]">
          <div class="w-full flex items-center justify-between gap-4">
            <div class="w-[580px] flex flex-col gap-[5px]">
              <div class="flex flex-col md:flex-row items-start md:items-center gap-[15px]">
                <div
                  class="bg-[#108313] gap-2 text-base text-white font-medium rounded-[10px] px-[10px] py-[3px] leading-6"
                >
                  市區公車
                </div>
                <p class="text-base font-medium leading-[26px]">280、287、288 發車時間變動公告</p>
                <p class="text-sm font-normal leading-[22px] text-[#637381]">15, Jun 2024</p>
              </div>
              <div>
                <p class="text-sm sm:text-base font-medium leading-6 text-gray-500 flex-1">
                  本公司280路、287路及288路公車，自113年7月15日起，調整班次時刻如下，不便之處，敬請見諒。
                </p>
              </div>
            </div>
            <div>
              <RouterLink
                to="/busnewestdetail"
                @click="switchState('bus')"
                class="w-6 h-6 border-2 border-[#818181] flex justify-center items-center rounded-full hover:border-none hover:bg-[#818181] text-[#818181] hover:text-white"
              >
                <i class="fa-solid fa-arrow-right"></i>
              </RouterLink>
            </div>
          </div>
        </div>
        <div class="flex gap-5 border-l-[3px] border-[#0518BF] px-5 py-[10px] hover:bg-[#EFEFEF]">
          <div class="w-full flex items-center justify-between gap-4">
            <div class="w-[580px] flex flex-col gap-[5px]">
              <div class="flex flex-col md:flex-row items-start md:items-center gap-[15px]">
                <div
                  class="bg-[#0518BF] gap-2 text-base text-white font-medium rounded-[10px] px-[10px] py-[3px] leading-6"
                >
                  國道客運
                </div>
                <span class="text-base font-medium leading-[26px]">6606豐原－台北 公告</span>
                <span class="text-sm font-normal leading-[22px] text-[#637381]">14, Feb 2024</span>
              </div>
              <div>
                <p class="text-sm sm:text-base font-medium leading-6 text-gray-500 flex-1">
                  本公司「6606豐原—臺北」國道客運路線，依規定於下列站位區間不得販售短程區間票，不便之處，敬請見諒。
                </p>
              </div>
            </div>
            <div>
              <RouterLink
                to="interbusnewestdetail"
                @click="switchState('interbus')"
                class="w-6 h-6 border-2 border-[#818181] flex justify-center items-center rounded-full hover:border-none hover:bg-[#818181] text-[#818181] hover:text-white"
              >
                <i class="fa-solid fa-arrow-right"></i>
              </RouterLink>
            </div>
          </div>
        </div>
        <div class="flex gap-5 border-l-[3px] border-[#108313] px-5 py-[10px] hover:bg-[#EFEFEF]">
          <div class="w-full flex items-center justify-between gap-4">
            <div class="w-[580px] flex flex-col gap-[5px]">
              <div class="flex flex-col md:flex-row items-start md:items-center gap-[15px]">
                <div
                  class="bg-[#108313] gap-2 text-base text-white font-medium rounded-[10px] px-[10px] py-[3px] leading-6"
                >
                  市區公車
                </div>
                <p class="text-base font-medium leading-[26px]">264、821 發車時間變動公告</p>
                <p class="text-sm font-normal leading-[22px] text-[#637381]">3, Jun 2024</p>
              </div>
              <div>
                <p class="text-sm sm:text-base font-medium leading-6 text-gray-500 flex-1">
                  本公司264路及821路公車，自113年7月15日起，調整班次時刻如下，不便之處，敬請見諒。
                </p>
              </div>
            </div>
            <div>
              <RouterLink
                to="/busnewestdetail"
                @click="switchState('bus')"
                class="w-6 h-6 border-2 border-[#818181] flex justify-center items-center rounded-full hover:border-none hover:bg-[#818181] text-[#818181] hover:text-white"
              >
                <i class="fa-solid fa-arrow-right"></i>
              </RouterLink>
            </div>
          </div>
        </div>
        <div class="flex gap-5 border-l-[3px] border-[#108313] px-5 py-[10px] hover:bg-[#EFEFEF]">
          <div class="w-full flex items-center justify-between gap-4">
            <div class="w-[580px] flex flex-col gap-[5px]">
              <div class="flex flex-col md:flex-row items-start md:items-center gap-[15px]">
                <div
                  class="bg-[#108313] gap-2 text-base text-white font-medium rounded-[10px] px-[10px] py-[3px] leading-6"
                >
                  市區公車
                </div>
                <p class="text-base font-medium leading-[26px]">90延、213 發車時間變動公告</p>
                <p class="text-sm font-normal leading-[22px] text-[#637381]">3, Jun 2024</p>
              </div>
              <div>
                <p class="text-sm sm:text-base font-medium leading-6 text-gray-500 flex-1">
                  本公司90延及213路公車，自113年7月15日起，調整班次時刻如下，不便之處，敬請見諒。
                </p>
              </div>
            </div>
            <div>
              <RouterLink
                to="/busnewestdetail"
                @click="switchState('bus')"
                class="w-6 h-6 border-2 border-[#818181] flex justify-center items-center rounded-full hover:border-none hover:bg-[#818181] text-[#818181] hover:text-white"
              >
                <i class="fa-solid fa-arrow-right"></i>
              </RouterLink>
            </div>
          </div>
        </div>
        <div class="flex gap-5 border-l-[3px] border-[#108313] px-5 py-[10px] hover:bg-[#EFEFEF]">
          <div class="w-full flex items-center justify-between gap-4">
            <div class="w-[580px] flex flex-col gap-[5px]">
              <div class="flex flex-col md:flex-row items-start md:items-center gap-[15px]">
                <div
                  class="bg-[#108313] gap-2 text-base text-white font-medium rounded-[10px] px-[10px] py-[3px] leading-6"
                >
                  市區公車
                </div>
                <p class="text-base font-medium leading-[26px]">153、206 發車時間變動公告</p>
                <p class="text-sm font-normal leading-[22px] text-[#637381]">25, Mar 2024</p>
              </div>
              <div>
                <p class="text-sm sm:text-base font-medium leading-6 text-gray-500 flex-1">
                  本公司153區及206路公車，自113年7月10日起，調整班次時刻如下，不便之處，敬請見諒。
                </p>
              </div>
            </div>
            <div>
              <RouterLink
                to="/busnewestdetail"
                @click="switchState('bus')"
                class="w-6 h-6 border-2 border-[#818181] flex justify-center items-center rounded-full hover:border-none hover:bg-[#818181] text-[#818181] hover:text-white"
              >
                <i class="fa-solid fa-arrow-right"></i>
              </RouterLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <RouterView />
</template>
