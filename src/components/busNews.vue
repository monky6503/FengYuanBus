<script setup></script>
<template>
  <div class="w-full lg:w-[778px] bg-gradient-to-b from-[#D2E3D3] to-[#FFF] flex-grow p-[15px]">
    <div class="flex flex-col gap-[15px]">
      <div
        class="w-full lg:w-[748px] bg-white rounded-[20px] flex flex-col gap-5 px-[30px] pt-5 pb-[30px] shadow-[0px_2px_20px_rgba(113,113,113,0.1)]"
      >
        <h3 class="text-lg font-medium leading-[150%]">路線停駛公告</h3>
        <div class="flex gap-5 border-l-[3px] border-[#108313] px-5 py-[10px] hover:bg-[#EFEFEF]">
          <div class="w-full flex items-center justify-between gap-4">
            <div class="w-[580px] flex flex-col gap-[5px]">
              <div class="flex flex-col md:flex-row items-start md:items-center gap-[15px]">
                <div
                  class="bg-[#108313] gap-2 text-base text-white font-medium rounded-[10px] px-[10px] py-[3px] leading-6"
                >
                  市區公車
                </div>
                <p class="text-base font-medium leading-[26px]">865路調整行駛865臨公告公告</p>
                <p class="text-sm font-normal leading-[22px] text-[#637381]">5, May 2024</p>
              </div>
              <div>
                <p class="text-sm sm:text-base font-medium leading-6 text-gray-500 flex-1">
                  04/07起 中橫便道落石阻斷，改行駛「865臨
                  豐原-梨山」路線(現場排隊，無預約)，調整班次如下。
                </p>
              </div>
            </div>
            <div>
              <RouterLink
                to="/busnewestdetail"
                class="w-6 h-6 border-2 border-[#818181] flex justify-center items-center rounded-full hover:border-none hover:bg-[#818181] text-[#818181] hover:text-white"
              >
                <i class="fa-solid fa-arrow-right"></i>
              </RouterLink>
            </div>
          </div>
        </div>
      </div>
      <div
        class="w-full lg:w-[748px] bg-white rounded-[20px] flex flex-col gap-5 px-[30px] py-5 shadow-[0px_2px_20px_rgba(113,113,113,0.1)]"
      >
        <h3 class="text-lg font-medium leading-[150%]">路線變更公告</h3>
        <div class="flex gap-5 border-l-[3px] border-[#108313] px-5 py-[10px] hover:bg-[#EFEFEF]">
          <div class="w-full flex items-center justify-between gap-4">
            <div class="w-[580px] flex flex-col gap-[5px]">
              <div class="flex flex-col md:flex-row items-start md:items-center gap-[15px]">
                <div
                  class="bg-[#108313] gap-2 text-base text-white font-medium rounded-[10px] px-[10px] py-[3px] leading-6"
                >
                  市區公車
                </div>
                <span class="text-base font-medium leading-[26px]"
                  >272路公車部分班次 增加繞駛水井</span
                >
                <span class="text-sm font-normal leading-[22px] text-[#637381]">3, Jun 2024</span>
              </div>
              <div>
                <p class="text-sm sm:text-base font-medium leading-6 text-gray-500 flex-1">
                  本公司272路公車部分班次，於113年8月5日～8月9日、8月12日～8月16日、8月19日～8月23日，增加繞駛水井，歡迎踴躍搭乘。
                </p>
              </div>
            </div>
            <div>
              <RouterLink
                to="/busnewestdetail"
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
                <span class="text-base font-medium leading-[26px]"
                  >237路、238路 公車部分班次 改道行駛</span
                >
                <span class="text-sm font-normal leading-[22px] text-[#637381]">22, July 2024</span>
              </div>
              <div>
                <p class="text-sm sm:text-base font-medium leading-6 text-gray-500 flex-1">
                  本公司237路（含區間車）及238路公車，於113年8月3日20:00起～8月4日18:00止，配合大雅區和平路舉行廟會活動，管制通行，改道行駛如下圖所示。
                </p>
              </div>
            </div>
            <div>
              <RouterLink
                to="/busnewestdetail"
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
                <span class="text-base font-medium leading-[26px]"
                  >新增211區3「土城-大甲體育場」路線</span
                >
                <span class="text-sm font-normal leading-[22px] text-[#637381]">3, Jun 2024</span>
              </div>
              <div>
                <p class="text-sm sm:text-base font-medium leading-6 text-gray-500 flex-1">
                  本公司自113年7月15日起，新增211區3「土城-大甲體育場」路線，如下圖所示，歡迎踴躍搭乘。
                </p>
              </div>
            </div>
            <div>
              <RouterLink
                to="/busnewestdetail"
                class="w-6 h-6 border-2 border-[#818181] flex justify-center items-center rounded-full hover:border-none hover:bg-[#818181] text-[#818181] hover:text-white"
              >
                <i class="fa-solid fa-arrow-right"></i>
              </RouterLink>
            </div>
          </div>
        </div>
      </div>
      <div
        class="w-full lg:w-[748px] bg-white rounded-[20px] flex flex-col gap-5 px-[30px] py-5 shadow-[0px_2px_20px_rgba(113,113,113,0.1)]"
      >
        <h3 class="text-lg font-medium leading-[150%]">發車時間變動公告</h3>
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
                class="w-6 h-6 border-2 border-[#818181] flex justify-center items-center rounded-full hover:border-none hover:bg-[#818181] text-[#818181] hover:text-white"
              >
                <i class="fa-solid fa-arrow-right"></i>
              </RouterLink>
            </div>
          </div>
        </div>
      </div>
      <div
        class="w-full lg:w-[748px] bg-white rounded-[20px] flex flex-col gap-5 px-[30px] py-5 shadow-[0px_2px_20px_rgba(113,113,113,0.1)]"
      >
        <h3 class="text-lg font-medium leading-[150%]">站牌變更公告</h3>
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
                <span class="text-base font-medium leading-[26px]">251、252路公車 新增兩站點</span>
                <span class="text-sm font-normal leading-[22px] text-[#637381]">3, Jun 2024</span>
              </div>
              <div>
                <p class="text-sm sm:text-base font-medium leading-6 text-gray-500 flex-1">
                  本公司251路與252路公車，自113年8月1日起，新增「十里坡生態莊園」站及「出雲山莊」站，如下圖所示，歡迎踴躍搭乘。
                </p>
              </div>
            </div>
            <div>
              <RouterLink
                to="/busnewestdetail"
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
                <span class="text-base font-medium leading-[26px]"
                  >287、288路公車『香蕉市場』站遷移</span
                >
                <span class="text-sm font-normal leading-[22px] text-[#637381]">3, Jun 2024</span>
              </div>
              <div>
                <p class="text-sm sm:text-base font-medium leading-6 text-gray-500 flex-1">
                  本公司287路及288路公車之『香蕉市場』站（往西方向站牌），自113年6月30日起，往一江橋方向遷移約45公尺太平龍路一段280號對面），如下圖所示，不便之處，敬請見諒。
                </p>
              </div>
            </div>
            <div>
              <RouterLink
                to="/busnewestdetail"
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
