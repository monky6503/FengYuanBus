<script setup>
import { ref, reactive, computed, onMounted, watchEffect, onUnmounted } from 'vue'
import { RouterLink, RouterView } from 'vue-router'
import NavBar from '../components/homepage/NavBar.vue'
import FooterView from '../components/homepage/FooterView.vue'
import bannerComponent from '../components/bannerComponent.vue'
import home from '@/assets/businfo/home.svg'
import arrowleft from '@/assets/businfo/arrow-left.svg'
import arrowright from '@/assets/businfo/arrow-right.svg'
import busfront from '@/assets/passenger/busfront.svg'
import backpack from '@/assets/passenger/backpack.svg'
import calendar from '@/assets/passenger/calendar.svg'
import question from '@/assets/passenger/question.svg'
import chevronright from '@/assets/passenger/chevronright.svg'
import chevrondown from '@/assets/passenger/chevrondown.svg'
import dash from '@/assets/passenger/dash.svg'
import vline from '@/assets/passenger/verticalline.svg'
const losts = reactive([
  {
    date: '2024/08/03',
    id: 'Fy01112',
    name: '3C產品-三星手機',
    site: '台中站',
    state: '已領取'
  },
  {
    date: '2024/08/02',
    id: 'Fy01111',
    name: '3C產品-蘋果手機',
    site: '台中站',
    state: '待領取'
  },
  {
    date: '2024/08/02',
    id: 'Fy01110',
    name: '皮包-錢包',
    site: '豐原站',
    state: '待領取'
  },
  {
    date: '2024/06/28',
    id: 'Fy01109',
    name: '3C產品-RedMI手機',
    site: '台中站',
    state: '已領取'
  },
  {
    date: '2024/06/27',
    id: 'Fy01108',
    name: '3C產品-蘋果手機',
    site: '豐原站',
    state: '待領取'
  },
  {
    date: '2024/04/25',
    id: 'Fy01107',
    name: '3C產品-蘋果手機',
    site: '台中站',
    state: '已領取'
  },
  {
    date: '2024/04/02',
    id: 'Fy01106',
    name: '3C產品-手機',
    site: '豐原站',
    state: '待領取'
  },
  {
    date: '2024/03/24',
    id: 'Fy01105',
    name: '3C產品-蘋果手機',
    site: '台中站',
    state: '待領取'
  },
  {
    date: '2024/03/15',
    id: 'Fy01104',
    name: '3C產品-手機',
    site: '台中站',
    state: '已領取'
  },
  {
    date: '2024/03/07',
    id: 'Fy01103',
    name: '票卡-悠遊卡',
    site: '豐原站',
    state: '已領取'
  },
  {
    date: '2024/03/06',
    id: 'Fy01102',
    name: '3C產品-手機',
    site: '豐原站',
    state: '待領取'
  },
  {
    date: '2024/02/27',
    id: 'Fy01101',
    name: '3C產品-手機',
    site: '台中站',
    state: '已領取'
  },
  {
    date: '2023/08/23',
    id: 'Fy01012',
    name: '3C產品-三星手機',
    site: '台中站',
    state: '待領取'
  },
  {
    date: '2023/08/22',
    id: 'Fy01011',
    name: '3C產品-蘋果手機',
    site: '豐原站',
    state: '已領取'
  },
  {
    date: '2023/08/22',
    id: 'Fy01010',
    name: '3C產品-蘋果手機',
    site: '豐原站',
    state: '待領取'
  },
  {
    date: '2023/06/28',
    id: 'Fy01009',
    name: '皮包-錢包',
    site: '豐原站',
    state: '已領取'
  },
  {
    date: '2023/06/27',
    id: 'Fy01008',
    name: '3C產品-手機',
    site: '豐原站',
    state: '已領取'
  },
  {
    date: '2023/04/25',
    id: 'Fy01007',
    name: '3C產品-蘋果手機',
    site: '台中站',
    state: '待領取'
  },
  {
    date: '2023/04/02',
    id: 'Fy01006',
    name: '3C產品-蘋果手機',
    site: '豐原站',
    state: '待領取'
  },
  {
    date: '2023/03/24',
    id: 'Fy01005',
    name: '3C產品-手機',
    site: '台中站',
    state: '已領取'
  },
  {
    date: '2023/03/15',
    id: 'Fy01004',
    name: '3C產品-蘋果手機',
    site: '豐原站',
    state: '已領取'
  },
  {
    date: '2023/03/07',
    id: 'Fy01003',
    name: '票卡-悠遊卡',
    site: '豐原站',
    state: '已領取'
  },
  {
    date: '2023/03/06',
    id: 'Fy01002',
    name: '3C產品-手機',
    site: '豐原站',
    state: '待領取'
  },
  {
    date: '2023/02/26',
    id: 'Fy01001',
    name: '3C產品-手機',
    site: '台中站',
    state: '已領取'
  },
  {
    date: '2022/02/26',
    id: 'Fy01101',
    name: '3C產品-手機',
    site: '豐原站',
    state: '已領取'
  },
  {
    date: '2024/07/25',
    id: 'Fy01101',
    name: '3C產品-手機',
    site: '豐原站',
    state: '已領取'
  },
  {
    date: '2024/07/25',
    id: 'Fy01101',
    name: '3C產品-手機',
    site: '豐原站',
    state: '待領取'
  },
  {
    date: '2024/07/25',
    id: 'Fy01101',
    name: '3C產品-手機',
    site: '豐原站',
    state: '已領取'
  },
  {
    date: '2024/07/25',
    id: 'Fy01101',
    name: '3C產品-手機',
    site: '豐原站',
    state: '待領取'
  }
])

//目前頁面
const currentPage = ref(1)
//每頁要顯示的數量
const itemsPerPage = ref(10)
const screenWidth = ref(window.innerWidth)
const pagenum = () => {
  if (screenWidth.value >= 992) {
    itemsPerPage.value = 10
  } else {
    itemsPerPage.value = 6
  }
}
onMounted(() => {
  const handleResize = () => {
    screenWidth.value = window.innerWidth
  }
  window.addEventListener('resize', handleResize)
  onUnmounted(() => {
    window.removeEventListener('resize', handleResize)
  })
  watchEffect(() => {
    pagenum()
  })
})
const paginatedData = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value
  const end = start + itemsPerPage.value
  return losts.slice(start, end)
})
//計算總頁數
const totalPages = computed(() => {
  return Math.ceil(losts.length / itemsPerPage.value)
})
//前一頁
const prevPage = () => {
  if (currentPage.value > 1) currentPage.value--
}
//下一頁
const nextPage = () => {
  if (currentPage.value < totalPages.value) currentPage.value++
}
//直接到該頁
const goToPage = (page) => {
  currentPage.value = page
}
</script>

<template>
  <NavBar />
  <div class="w-full lg:w-[989px] mx-auto mb-80 lg:pt-[100px] pt-[57px]">
    <bannerComponent title="旅客遺失物查詢" mdPl="66px" dxlPl="80px" />
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
          <a> 旅客服務 </a>
        </li>
        <li class="flex gap-3">
          <span class="inline-flex items-center gap-2 text-[#108313]"> 旅客遺失物查詢 </span>
        </li>
      </ul>
    </div>
    <div class="w-full lg:w-[638px] xl:w-[989px] flex flex-col gap-[15px] mx-auto">
      <!-- 搜尋 -->
      <div class="px-0 xl:px-5 py-[10px] hidden md:block">
        <div class="flex items-center justify-center gap-[18px] xl:gap-[15px]">
          <div
            class="w-[531px] xl:w-[848px] border border-[#108313] rounded-[15px] px-2 py-3 xl:pl-5 xl:py-3 xl:pr-4"
          >
            <div
              class="xl:w-[733px] flex items-center justify-between text-sm xl:text-base text-[#818181]"
            >
              <label for="startDate">遺失日期</label>
              <input
                type="date"
                id="startDate"
                class="outline-none border-none w-[110px] h-6 text-center"
                placeholder="YYYY/MM/DD"
              />
              <img :src="dash" alt="" />
              <input
                type="date"
                class="outline-none border-none w-[110px] h-6 text-center"
                placeholder="YYYY/MM/DD"
              />
              <div class="flex gap-[10px]">
                <img :src="vline" alt="" />
                <select class="w-[97px] h-6">
                  <option disabled selected>搭乘車號</option>
                  <option>63</option>
                  <option>211</option>
                  <option>91</option>
                  <option>900</option>
                  <option>153</option>
                </select>
              </div>
              <div class="flex gap-[10px]">
                <img :src="vline" alt="" />
                <select class="w-[97px] h-6">
                  <option disabled selected>物品類型</option>
                  <option>手機</option>
                  <option>錢包</option>
                  <option>雨傘</option>
                  <option>電腦</option>
                  <option>水壺</option>
                </select>
              </div>
            </div>
          </div>
          <button
            class="btn px-7 py-3 rounded-[15px] bg-[#108313] text-white hover:bg-white hover:text-[#108313] hover:border-[#108313]"
          >
            搜尋
          </button>
        </div>
      </div>
      <!-- 768搜尋 -->
      <div class="w-[314px] bg-[#EFEFEF] rounded-[60px] px-[26px] py-[7px] block md:hidden mx-auto">
        <div class="w-[262px] flex items-center gap-[19px]">
          <button>
            <img src="@/assets/passenger/search.svg" alt="" />
          </button>
          <div>
            <p class="text-sm font-medium leading-[150%]">請輸入遺失物資訊</p>
            <p class="text-xs font-light leading-[150%]">遺失日期．搭乘車號．物品類型</p>
          </div>
        </div>
      </div>
      <!-- 表格 -->
      <div class="flex-col gap-[39px] hidden lg:flex">
        <div class="flex flex-col gap-[5px]">
          <table class="w-[638px] xl:w-[989px]">
            <thead class="h-[53px]">
              <tr class="text-base font-medium tracking-[2px] leading-6 bg-[#D2E3D3]">
                <th class="px-4 xl:px-8 py-[9px] rounded-tl-[15px] text-center">拾獲日期</th>
                <th class="px-4 xl:px-8 py-[9px]">遺失物編號</th>
                <th class="px-4 xl:px-8 py-[9px]">遺失物名稱</th>
                <th class="px-4 xl:px-8 py-[9px]">回收處</th>
                <th class="px-4 xl:px-8 py-[9px] rounded-tr-[15px]">物品狀態</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="item in paginatedData"
                :key="item.id"
                class="text-base font-medium leading-6 text-center border-b border-solid border-[#B3B3B3]"
              >
                <td class="px-4 xl:px-8 py-3">{{ item.date }}</td>
                <td class="px-4 xl:px-8 py-3">{{ item.id }}</td>
                <td class="px-4 xl:px-8 py-3">{{ item.name }}</td>
                <td class="px-4 xl:px-8 py-3">{{ item.site }}</td>
                <td
                  class="px-4 xl:px-8 py-3"
                  :class="[item.state === '待領取' ? 'text-[#FC0E1E]' : 'text-[#818181]']"
                >
                  {{ item.state }}
                </td>
              </tr>
            </tbody>
          </table>
          <div>
            <p class="text-base text-[#B3B3B3] font-medium tracking-[2px] leading-6 text-center">
              ＊僅提供六個月內資料查詢（當日遺失物於隔日營業時間查詢），超過六個月以上遺失物查詢，請與我們聯繫
            </p>
          </div>
        </div>
        <div class="flex justify-center gap-[10px] mt-5 mb-32">
          <button
            @click="prevPage"
            :disabled="currentPage === 1"
            :class="{ 'opacity-30': currentPage === 1 }"
          >
            <img :src="arrowleft" alt="" />
          </button>
          <button
            v-for="page in totalPages"
            :key="page"
            @click="goToPage(page)"
            class="w-[35px] h-[35px] text-[#818181] text-base text-center leading-[35px] font-normal rounded-full"
            :class="currentPage === page ? 'bg-[#dde1ff]' : null"
          >
            {{ page }}
          </button>
          <button
            @click="nextPage"
            :disabled="currentPage === totalPages"
            :class="{ 'opacity-30': currentPage === totalPages }"
          >
            <img :src="arrowright" alt="" />
          </button>
        </div>
      </div>
      <!-- 768卡片 -->
      <div class="flex flex-col lg:hidden">
        <div class="grid grid-cols-1 md:grid-cols-2 self-center gap-10">
          <div
            v-for="item in paginatedData"
            :key="item.id"
            class="w-[314px] px-[17px] py-5 flex flex-col gap-[6px] border-b border-b-[#B3B3B3]"
          >
            <p class="text-[#818181] text-sm font-medium leading-[100%]">{{ item.date }}</p>
            <div class="flex flex-col gap-[14px] py-[18px]">
              <div class="flex items-center gap-[10px]">
                <div class="w-4 h-4 rounded-full bg-[#0518BF]"></div>
                <p class="text-[#0518BF] text-base font-medium leading-[150%]">{{ item.name }}</p>
              </div>
              <p
                class="flex items-center justify-start gap-[5px] text-xs font-medium leading-[150%]"
              >
                <span class="w-[52px] bg-[#EFEFEF] text-[#0518BF] text-center">{{
                  item.site
                }}</span>
                <span
                  class="w-[52px] bg-[#EFEFEF] text-center"
                  :class="[item.state === '待領取' ? 'text-[#0518BF ]' : 'text-[#818181]']"
                  >{{ item.state }}</span
                >
              </p>
            </div>
            <div class="self-end">
              <span>#{{ item.id }}</span>
            </div>
          </div>
        </div>
        <div class="flex justify-center gap-[10px] mt-5 mb-8 lg:mb-32">
          <button
            @click="prevPage"
            :disabled="currentPage === 1"
            :class="{ 'opacity-30': currentPage === 1 }"
          >
            <img :src="arrowleft" alt="" />
          </button>
          <button
            v-for="page in totalPages"
            :key="page"
            @click="goToPage(page)"
            class="w-[35px] h-[35px] text-[#818181] text-base text-center leading-[35px] font-normal rounded-full"
            :class="currentPage === page ? 'bg-[#dde1ff]' : null"
          >
            {{ page }}
          </button>
          <button
            @click="nextPage"
            :disabled="currentPage === totalPages"
            :class="{ 'opacity-30': currentPage === totalPages }"
          >
            <img :src="arrowright" alt="" />
          </button>
        </div>
      </div>
    </div>
    <div class="w-full flex flex-col justify-start gap-7">
      <div
        class="h-[977px] xl:h-[260px] flex flex-col xl:flex-row justify-center items-center gap-7 xl:gap-5"
      >
        <div
          class="w-[230px] h-[195px] xl:h-full flex flex-col items-center justify-between gap-5 xl:gap-0"
        >
          <img :src="busfront" alt="" />
          <div class="h-[99px] xl:h-[165px] flex flex-col items-center gap-[6px]">
            <div class="flex items-center gap-3">
              <div class="w-6 h-6 bg-[#4F5ED2] text-white rounded-full flex justify-center">1</div>
              <p class="text-2xl text-[#4F5ED2] font-bold tracking-[2px] leading-6">確認回收處</p>
            </div>
            <p class="w-[207px] text-base font-normal leading-[30px]">
              請先確認遺失物回收處，至該處服務台辦理遺失物認領
            </p>
          </div>
        </div>
        <div class="flex items-center">
          <picture>
            <source :srcset="chevronright" alt="" class="w-[30px]" media="(min-width:1200px)" />
            <img :src="chevrondown" alt="" class="w-[30px]" />
          </picture>
        </div>
        <div
          class="w-[230px] h-[250px] xl:h-full flex flex-col items-center justify-between gap-5 xl:gap-0"
        >
          <img :src="backpack" alt="" />
          <div class="h-[165px] flex flex-col items-center gap-[6px]">
            <div class="flex items-center gap-3">
              <div class="w-6 h-6 bg-[#4F5ED2] text-white rounded-full flex justify-center">2</div>
              <p class="text-2xl text-[#4F5ED2] font-bold tracking-[2px] leading-6">遺失物認領</p>
            </div>

            <p class="w-[207px] text-base font-normal leading-[30px]">
              認領遺失物時，請攜帶<strong>身分證明文件</strong>至車站服務台領取
            </p>
            <div
              class="tooltip tooltip-bottom"
              data-tip="若認領人非所有權人本人，則應憑所有權人之身分證明文件及所有權人之委託書得辦理遺失物領回手續。"
            >
              <button class="pt-[15px] text-[#818181] hover:text-[#108313]">
                <div class="flex items-center gap-[10px] border-t border-b">
                  <img :src="question" alt="" />
                  <p class="text-base font-bold leading-[30px]">非所有權本人可以代領嗎？</p>
                </div>
              </button>
            </div>
          </div>
        </div>
        <div class="flex items-center">
          <picture>
            <source :srcset="chevronright" alt="" class="w-[30px]" media="(min-width:1200px)" />
            <img :src="chevrondown" alt="" class="w-[30px]" />
          </picture>
        </div>
        <div
          class="w-[251px] h-[255px] xl:h-full flex flex-col items-center justify-between gap-5 xl:gap-0"
        >
          <img :src="calendar" alt="" />
          <div class="h-[165px] flex flex-col items-center gap-[6px]">
            <div class="flex items-center gap-3">
              <div class="w-6 h-6 bg-[#4F5ED2] text-white rounded-full flex justify-center">3</div>
              <p class="text-2xl text-[#4F5ED2] font-bold tracking-[2px] leading-6">
                逾保管期限之處理
              </p>
            </div>
            <p class="w-[207px] text-base font-normal leading-[30px]">
              拾獲遺失物由各車站保管，逾公告招領期限<strong>(6個月)</strong>而未經認領者，遺失人即喪失該遺失物之所有權
            </p>
          </div>
        </div>
      </div>
      <div class="text-center pt-5">
        <span
          class="text-lg font-medium tracking-[8%] leading-[150%] flex justify-center sm:flex-row flex-col"
        >
          <p>若有任何問題，</p>
          <p>
            請於服務期間<router-link to="/connectfy" class="text-[#4F5ED2] hover:underline"
              >與我們聯繫。</router-link
            >
          </p>
        </span>
      </div>
    </div>
  </div>
  <FooterView />
  <router-view />
</template>
<style scoped>
.tooltip::before {
  max-width: 374px;
  border-radius: 15px;
  background-color: #efefef;
  color: black;
  font-size: 16px;
  font-weight: normal;
  line-height: 30px;
  padding: 24px 25px 28px;
  text-align: start;
  top: 130%;
}
.tooltip-bottom::after {
  width: 0px;
  height: 0px;
  border-style: solid;
  border-width: 0px 10px 10px 10px;
  border-color: transparent transparent #efefef transparent;
  top: 109%;
}
</style>
