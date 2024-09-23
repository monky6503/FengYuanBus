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
    <bannerComponent title="國道客運" mdPl="66px" dxlPl="109px" />
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
      <div class="w-full lg:w-[778px] bg-gradient-to-b from-[#DDE1FF] from-50% to-[#FFF] p-[15px]">
        <div
          class="w-full lg:w-[748px] bg-white rounded-[20px] flex flex-col gap-5 px-[30px] pt-5 pb-[30px] shadow-[0px_2px_20px_rgba(113,113,113,0.1)]"
        >
          <p class="text-sm font-normal leading-[22px]">25, Nov 2024</p>
          <div class="px-[30px] py-5">
            <div class="w-full flex flex-col mx-auto gap-[17px]">
              <div class="text-[#4F5ED2] text-xl font-bold leading-[30px]">
                <p>本公司280路、287路及288路公車，</p>
                <p>自113年7月15日起，調整班次時刻。</p>
              </div>
              <div class="text-base font-normal tracking-[1px] leading-6">
                <ul class="list-decimal list-outside pl-5">
                  <li>
                    旅客得選擇以票證或投現金方式搭車，並依公告票價及收費方式付費，於上車時交付。
                  </li>
                  <li>
                    客票上應記載有效期間、票價及票號、班車等級，如有污損撕破致其記載不明時應視為無效。
                  </li>
                  <li>
                    旅客購票時，應自行查閱客票上所載乘車日期、起訖站名、班車時間、班車等級及所付票款與票價是否相
                    符。如有錯誤，應立即向售票員更換或退補，事後不予受理。
                  </li>
                  <li>
                    客票之有效期間以搭乘客票上所載乘車日期期限內之任何一次相當班車為限。對號客票之有效期間以搭乘
                    客票上當日指定之車次為限。
                  </li>
                  <li>
                    持用優待票者，應主動出示優待身份證明文件，以供查驗。未依規定使用優待票者，以搭乘該路線全程、
                    全票票價補票。
                  </li>
                  <li>
                    優待票使用對象：
                    <h4>老人、身心障礙者優待票及兒童票之規定：</h4>
                    <ul class="p1">
                      <li>年滿六十五歲以上，持有國民身份證或敬老證之老人。</li>
                      <li>持有身心障礙手冊之身心障礙者及其監護人或必要陪伴者一人。</li>
                      <li>
                        兒童票：
                        <ul class="p2 pl-[86px]">
                          <li class="text-justify">
                            免費：身高未滿一百十五公分者，
                            或身高滿一百十五公分而未滿六歲，經出示身份證件者。搭乘本公司國道6606、153、153副、153區、850路班車，目的地如有行經國道、快速
                            道路且佔位者，應購買半票）
                          </li>
                          <li>
                            半票：身高滿一百十五公分未滿一百五十公分者，或身高滿一百五十公分而未滿十二歲，經出示
                            身份證件者。
                          </li>
                          <li>
                            免費之兒童：須由已購買全票或成年之旅客攜帶，每一旅客最多以攜帶二人為限，逾限者，應購
                            買半票。
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </li>
                  <li>
                    本公司依旅客不同需求所發售之各種類客票，其使用規定與限制在客票上已載明者，旅客應依其規定使
                    用。
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <RouterLink to="/newestannounce" class="flex pl-[27px] gap-[15px]">
            <img src="@/assets/newestannounce/arrowtoleft.svg" alt="" />
            <p class="text-xl text-[#818181] font-bold leading-6 hover:text-[#4F5ED2]">回到列表</p>
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
