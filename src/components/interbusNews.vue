<script setup></script>
<template>
  <div
    class="w-full lg:w-[778px] bg-gradient-to-b from-[#DDE1FF] from-50% to-[#FFF] flex-grow p-[15px]"
  >
    <div class="flex flex-col gap-[15px]">
      <div
        class="w-full lg:w-[748px] bg-white rounded-[20px] flex flex-col gap-5 px-[30px] pt-5 pb-[30px] shadow-[0px_2px_20px_rgba(113,113,113,0.1)]"
      >
        <h3 class="text-lg font-medium leading-[150%]">客運公告</h3>
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
                <span class="text-base font-medium leading-[26px]"
                  >國道客運使用電子票證乘車須知</span
                >
                <span class="text-sm font-normal leading-[22px] text-[#637381]">28, Jan 2024</span>
              </div>
              <div>
                <p class="text-sm sm:text-base font-medium leading-6 text-gray-500 flex-1">
                  1.
                  本公司6606「豐原-臺北」路線，自103年10月1日起，可接受臺中市敬老愛心卡刷卡乘車，持卡民眾可於車上刷卡乘車。
                </p>
              </div>
            </div>
            <div>
              <RouterLink
                to="interbusnewestdetail"
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
</template>
