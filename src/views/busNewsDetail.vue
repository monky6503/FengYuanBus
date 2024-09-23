<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { computed, onMounted } from 'vue'
import NavBar from '@/components/homepage/NavBar.vue'
import FooterView from '@/components/homepage/FooterView.vue'

import home from '@/assets/businfo/home.svg'
import bannerComponent from '@/components/bannerComponent.vue'
import { useButtonStore } from '@/stores/store.js'

const buttonStore = useButtonStore()
const switchState = (btn) => {
  buttonStore.updateSelectedState(btn)
}
const selectedState = computed(() => buttonStore.selectedState)

onMounted(() => {
  buttonStore.loadState()
})
</script>
<template>
  <NavBar />
  <div class="w-full lg:w-[989px] mx-auto mb-72 lg:pt-[100px] pt-[57px]">
    <bannerComponent title="市區公車" mdPl="66px" dxlPl="109px" />
    <div
      class="w-full breadcrumbs text-base font-medium leading-[150%] mx-auto px-[30px] py-[15px]"
    >
      <ul class="text-[#818181] gap-3">
        <li>
          <RouterLink to="/" class="gap-2">
            <img :src="home" alt="" />
            首頁
          </RouterLink>
        </li>
        <li class="flex gap-3">
          <RouterLink to="/newestannounce"> 最新消息 </RouterLink>
        </li>
        <li class="flex gap-3">
          <span class="inline-flex items-center gap-2 text-[#108313]">
            {{
              selectedState === 'all'
                ? '全部消息'
                : selectedState === 'bus'
                  ? '市區公車'
                  : '國道客運'
            }}
          </span>
        </li>
      </ul>
    </div>
    <div class="flex flex-col lg:flex-row">
      <div class="w-full lg:w-[210px] flex lg:block">
        <RouterLink
          to="/newestannounce"
          @click="switchState('all')"
          :class="selectedState === 'all' ? 'bg-[#FFF7D3] text-black' : 'bg-white text-[#818181]'"
          type="button"
          class="w-1/3 lg:w-full h-[60px] text-lg font-medium leading-[150%] flex items-center justify-center"
        >
          全部消息
        </RouterLink>
        <RouterLink
          to="/newestannounce"
          @click="switchState('bus')"
          :class="selectedState === 'bus' ? 'bg-[#D2E3D3] text-black' : 'bg-white text-[#818181]'"
          type="button"
          class="w-1/3 lg:w-full h-[60px] text-lg font-medium leading-[150%] flex items-center justify-center"
        >
          市區公車
        </RouterLink>
        <RouterLink
          to="/newestannounce"
          @click="switchState('interbus')"
          :class="
            selectedState === 'interbus' ? 'bg-[#DDE1FF] text-black' : 'bg-white text-[#818181]'
          "
          type="button"
          class="w-1/3 lg:w-full h-[60px] text-lg font-medium leading-[150%] flex items-center justify-center"
        >
          國道客運
        </RouterLink>
      </div>
      <div class="w-full lg:w-[778px] bg-gradient-to-b from-[#D2E3D3] to-[#FFF] p-[15px]">
        <div
          class="w-full lg:w-[748px] bg-white rounded-[20px] flex flex-col gap-5 px-3 sm:px-[30px] pt-5 pb-[30px] shadow-[0px_2px_20px_rgba(113,113,113,0.1)]"
        >
          <p class="text-sm font-normal leading-[22px]">25, Nov 2024</p>
          <div class="px-3 sm:px-[30px] py-5">
            <div
              class="flex flex-col gap-[30px] overflow-x-scroll overflow-y-hidden md:overflow-visible"
            >
              <div class="text-[#108313] text-xl font-bold leading-[30px]">
                <p>本公司280路、287路及288路公車，</p>
                <p>自113年7月15日起，調整班次時刻。</p>
              </div>
              <div class="w-[630px] h-[203px] flex flex-col gap-3">
                <div class="flex flex-col gap-1">
                  <p class="text-xl text-[#108313] font-bold leading-6 tracking-[2px]">280路公車</p>
                  <div class="flex items-end justify-start">
                    <hr class="w-[91px] h-[2px] bg-[#108313] border-0" />
                    <hr class="flex-grow h-[1px] bg-[#B3B3B3] border-0" />
                  </div>
                </div>
                <div class="w-full h-full flex gap-[7px]">
                  <div class="w-[103px] bg-[#D2E3D3] pt-[47px] pb-4">
                    <div class="flex flex-col items-center gap-8 justify-center">
                      <span class="h-[35px] text-lg font-medium leading-[150%]">平日</span>
                      <span class="h-[35px] text-lg font-medium leading-[150%]">例假日</span>
                    </div>
                  </div>
                  <div class="flex-grow">
                    <table class="w-full h-full">
                      <thead class="bg-[#75B276] text-white text-center">
                        <tr>
                          <th class="text-lg font-medium leading-[150%]">臺中二中</th>
                          <th class="text-lg font-medium leading-[150%]">修平科技大學</th>
                        </tr>
                      </thead>
                      <tbody class="text-center">
                        <tr>
                          <td class="text-base font-medium leading-6 border border-[#B3B3B3]">
                            維持原本時刻
                          </td>
                          <td class="text-base font-medium leading-6 border border-[#B3B3B3]">
                            維持原本時刻
                          </td>
                        </tr>
                        <tr>
                          <td class="text-base font-medium leading-6 border border-[#B3B3B3]">
                            <div class="flex justify-center items-center gap-[5px]">
                              <span class="text-[#6B6B6B]">10:30</span>
                              <img src="@/assets/newestannounce/arrowtoright.svg" alt="" />
                              <span class="text-[#108313]">10:40</span>
                            </div>
                          </td>
                          <td class="text-base font-medium leading-6 border border-[#B3B3B3]">
                            <div class="flex justify-center items-center gap-[5px]">
                              <span class="text-[#6B6B6B]">10:30</span>
                              <img src="@/assets/newestannounce/arrowtoright.svg" alt="" />
                              <span class="text-[#108313]">10:40</span>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <div class="w-[630px] h-[203px] flex flex-col gap-3">
                <div class="flex flex-col gap-1">
                  <p class="text-xl text-[#108313] font-bold leading-6 tracking-[2px]">280路公車</p>
                  <div class="flex items-end justify-start">
                    <hr class="w-[91px] h-[2px] bg-[#108313] border-0" />
                    <hr class="flex-grow h-[1px] bg-[#B3B3B3] border-0" />
                  </div>
                </div>
                <div class="w-full h-full flex gap-[7px]">
                  <div class="w-[103px] bg-[#D2E3D3] pt-[47px] pb-4">
                    <div class="flex flex-col items-center gap-8 justify-center">
                      <span class="h-[35px] text-lg font-medium leading-[150%]">平日</span>
                      <span class="h-[35px] text-lg font-medium leading-[150%]">例假日</span>
                    </div>
                  </div>
                  <div class="flex-grow">
                    <table class="w-full h-full">
                      <thead class="bg-[#75B276] text-white text-center">
                        <tr>
                          <th class="text-lg font-medium leading-[150%]">臺中二中</th>
                          <th class="text-lg font-medium leading-[150%]">修平科技大學</th>
                        </tr>
                      </thead>
                      <tbody class="text-center">
                        <tr>
                          <td class="text-base font-medium leading-6 border border-[#B3B3B3]">
                            維持原本時刻
                          </td>
                          <td class="text-base font-medium leading-6 border border-[#B3B3B3]">
                            維持原本時刻
                          </td>
                        </tr>
                        <tr>
                          <td class="text-base font-medium leading-6 border border-[#B3B3B3]">
                            <div class="flex justify-center items-center gap-[5px]">
                              <span class="text-[#6B6B6B]">10:30</span>
                              <img src="@/assets/newestannounce/arrowtoright.svg" alt="" />
                              <span class="text-[#108313]">10:40</span>
                            </div>
                          </td>
                          <td class="text-base font-medium leading-6 border border-[#B3B3B3]">
                            <div class="flex justify-center items-center gap-[5px]">
                              <span class="text-[#6B6B6B]">10:30</span>
                              <img src="@/assets/newestannounce/arrowtoright.svg" alt="" />
                              <span class="text-[#108313]">10:40</span>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <div class="w-[630px] h-[203px] flex flex-col gap-3">
                <div class="flex flex-col gap-1">
                  <p class="text-xl text-[#108313] font-bold leading-6 tracking-[2px]">280路公車</p>
                  <div class="flex items-end justify-start">
                    <hr class="w-[91px] h-[2px] bg-[#108313] border-0" />
                    <hr class="flex-grow h-[1px] bg-[#B3B3B3] border-0" />
                  </div>
                </div>
                <div class="w-full h-full flex gap-[7px]">
                  <div class="w-[103px] bg-[#D2E3D3] pt-[47px] pb-4">
                    <div class="flex flex-col items-center gap-8 justify-center">
                      <span class="h-[35px] text-lg font-medium leading-[150%]">平日</span>
                      <span class="h-[35px] text-lg font-medium leading-[150%]">例假日</span>
                    </div>
                  </div>
                  <div class="flex-grow">
                    <table class="w-full h-full">
                      <thead class="bg-[#75B276] text-white text-center">
                        <tr>
                          <th class="text-lg font-medium leading-[150%]">臺中二中</th>
                          <th class="text-lg font-medium leading-[150%]">修平科技大學</th>
                        </tr>
                      </thead>
                      <tbody class="text-center">
                        <tr>
                          <td class="text-base font-medium leading-6 border border-[#B3B3B3]">
                            維持原本時刻
                          </td>
                          <td class="text-base font-medium leading-6 border border-[#B3B3B3]">
                            維持原本時刻
                          </td>
                        </tr>
                        <tr>
                          <td class="text-base font-medium leading-6 border border-[#B3B3B3]">
                            <div class="flex justify-center items-center gap-[5px]">
                              <span class="text-[#6B6B6B]">10:30</span>
                              <img src="@/assets/newestannounce/arrowtoright.svg" alt="" />
                              <span class="text-[#108313]">10:40</span>
                            </div>
                          </td>
                          <td class="text-base font-medium leading-6 border border-[#B3B3B3]">
                            <div class="flex justify-center items-center gap-[5px]">
                              <span class="text-[#6B6B6B]">10:30</span>
                              <img src="@/assets/newestannounce/arrowtoright.svg" alt="" />
                              <span class="text-[#108313]">10:40</span>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <RouterLink to="/newestannounce" class="flex pl-[27px] gap-[15px]">
            <img src="@/assets/newestannounce/arrowtoleft.svg" alt="" />
            <p class="text-xl text-[#818181] font-bold leading-6 hover:text-[#108313]">回到列表</p>
          </RouterLink>
        </div>
      </div>
    </div>
  </div>
  <FooterView />
  <RouterView />
</template>
<style scoped>
.breadcrumbs > ul > li + *:before {
  width: 10.63px;
  height: 10.63px;
  padding: 0px;
  margin: 2px 5px;
  color: #818181;
  opacity: 1;
  border-top: 2px solid;
  border-right: 2px solid;
}
</style>
