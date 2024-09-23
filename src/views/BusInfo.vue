<script setup>
import { ref, onMounted, computed } from 'vue'
import { RouterLink, RouterView } from 'vue-router'
import { gsap } from 'gsap'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'

import NavBar from '../components/homepage/NavBar.vue'
import FooterView from '../components/homepage/FooterView.vue'
import bannerComponent from '@/components/bannerComponent.vue'
import switchBusInter from '@/components/switchBusInter.vue'
import home from '@/assets/businfo/home.svg'
import arrowleft from '@/assets/businfo/arrow-left.svg'
import arrowright from '@/assets/businfo/arrow-right.svg'
import flag from '@/assets/businfo/flag.svg'
import windowicon from '@/assets/businfo/window.svg'
import arrowdown from '@/assets/businfo/arrowdown.svg'
import pointer from '@/assets/businfo/pointer.svg'
import { useButtonStore } from '@/stores/store.js'
import { useTokenStore } from '@/stores/token.js'
import { useBusinfoStore } from '@/stores/info.js'

const busData = ref(JSON.parse(localStorage.getItem('busData')) || [])
const filterData = ref('')

const busNumber = ref('')
const interBusNumber = ref(JSON.parse(localStorage.getItem('interBusNumber')) || [])
const interBusSchedule0 = ref('')
const interBusSchedule1 = ref('')
const interbusdir0 = ref([]) //去程預估時間
const interbusdir1 = ref([]) //返程預估時間
const timeleft = ref(30)

const suspendedRoutes = ['865', '865區', '866區2']
//目前頁面
const currentPage = ref(1)
//每頁要顯示的數量
const itemsPerPage = ref(15)

// const selectedBtn = ref('bus')
const selectedDirection = ref('totaipei')

const buttonStore = useButtonStore()
const selectedBtn = computed(() => buttonStore.selectedBtn)
const handleSwitchBtn = (btn) => {
  buttonStore.updateSelectedBtn(btn)
}

const tokenStore = useTokenStore()
const token = computed(() => tokenStore.token)

const businfoStore = useBusinfoStore()
const handleInfo = (route, startend) => {
  businfoStore.updateInfoRoute(route, startend)
}

const fetchInterBusschedule = async () => {
  try {
    const response = await fetch(
      'https://tdx.transportdata.tw/api/basic/v2/Bus/Schedule/InterCity/6606?%24format=JSON',
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token.value}`
        }
      }
    )
    const data = await response.json()
    interBusNumber.value = data

    localStorage.setItem('interBusNumber', JSON.stringify(interBusNumber.value))
  } catch (error) {
    console.error('Error fetching bus data:', error)
  }
}

const fetchInterBusEstimate = async () => {
  try {
    const response = await fetch(
      'https://tdx.transportdata.tw/api/basic/v2/Bus/EstimatedTimeOfArrival/InterCity/6606?%24format=JSON',
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token.value}`
        }
      }
    )
    const data = await response.json()
    interbusdir0.value = data
      .filter((item) => {
        return item.Direction === 0
      })
      .sort((a, b) => {
        return a.StopSequence > b.StopSequence ? 1 : -1
      })
    interbusdir1.value = data
      .filter((item) => {
        return item.Direction === 1
      })
      .sort((a, b) => {
        return a.StopSequence > b.StopSequence ? 1 : -1
      })
  } catch (error) {
    console.error('Error fetching bus data:', error)
  }
}

const clearInterbus = () => {
  if (interBusNumber.value) {
    //timetable適用
    let go = []
    let back = []
    interBusNumber.value.forEach((item) => {
      const dir = item
      if (!dir || !dir.Timetables) return { go: [], back: [] }
      const times = dir.Timetables
      times.forEach((time) => {
        if (dir.Direction === 0) {
          go.push({
            tripid: time.TripID,
            departstop: time.StopTimes[0].StopName.Zh_tw,
            departtime: time.StopTimes[0].DepartureTime
          })
        } else {
          back.push({
            tripid: time.TripID,
            departstop: time.StopTimes[0].StopName.Zh_tw,
            departtime: time.StopTimes[0].DepartureTime
          })
        }
      })
    })
    interBusSchedule0.value = go
    interBusSchedule1.value = back
  }
}

const filterSuggestions = () => {
  const regx = new RegExp(busNumber.value, 'i')
  filterData.value = busData.value.filter((data) => {
    return regx.test(data.RouteName.Zh_tw)
  })
}

const isRouteSuspended = (routeNumber) => {
  return suspendedRoutes.includes(routeNumber)
}

const reorder = (data) => {
  const length = data.length
  const columns = 9 // 每行顯示的數字數量
  const rows = Math.ceil(length / columns)
  const datas = []
  let start = 0
  let end = columns

  for (let i = 0; i < rows; i++) {
    if (i % 2 === 0) {
      for (let j = start; j < end; j++) {
        datas.push(data[j])
      }
    } else {
      for (let j = end - 1; j >= start; j--) {
        datas.push(data[j])
      }
    }
    start += columns
    end += columns
    if (end > length) {
      end = length
    } else {
      end
    }
  }
  return datas
}
const updateTime = () => {
  setInterval(() => {
    timeleft.value > 0 ? timeleft.value-- : (timeleft.value = 30)
  }, 1000)
}
//每頁該顯示的數量
const paginatedData = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value
  const end = start + itemsPerPage.value
  const dt = filterData.value.length === 0 ? busData : filterData
  return dt.value.slice(start, end)
})
//計算總頁數
const totalPages = computed(() => {
  const dt = filterData.value.length === 0 ? busData : filterData
  return Math.ceil(dt.value.length / itemsPerPage.value)
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

//切換方向
const switchDirection = (button) => {
  selectedDirection.value = button
}
const scrollTo = () => {
  gsap.registerPlugin(ScrollToPlugin)
  gsap.to(window, { duration: 1, scrollTo: { y: '#needed', offsetY: 50 } })
}

onMounted(async () => {
  tokenStore.loadToken()
  await fetchInterBusschedule()
  await fetchInterBusEstimate()
  clearInterbus()
})
setInterval(() => {
  fetchInterBusEstimate(), clearInterbus()
}, 30000)
updateTime()
</script>

<template>
  <NavBar />
  <div class="w-full lg:w-[989px] mx-auto mb-72 lg:pt-[100px] pt-[57px]">
    <bannerComponent v-if="selectedBtn === 'bus'" title="路線查詢" mdPl="66px" dxlPl="109px" />
    <div
      v-else
      class="w-full h-[65.95px] sm:h-[173px] bg-[#EFEFEF] mx-auto text-lg sm:text-5xl font-semibold font-SerifTC flex justify-center items-center gap-6 p-[10px]"
    >
      <span class="pb-1">6606</span>
      <span class="pb-1">豐原-臺北</span>
    </div>
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
          <a> 乘車資訊 </a>
        </li>
        <li class="flex gap-3">
          <span class="inline-flex items-center gap-2 text-[#108313]">
            {{ selectedBtn === 'bus' ? '市區公車' : '豐原-臺北' }}
          </span>
        </li>
      </ul>
    </div>
    <div class="w-full mx-auto flex flex-col justify-center gap-[15px]">
      <switchBusInter :switchBtnFun="handleSwitchBtn" />
      <div v-if="selectedBtn === 'bus'">
        <div class="flex flex-col lg:flex-row justify-center gap-5 px-[33px] lg:p-0">
          <div class="w-full lg:w-[647px] flex items-center justify-between gap-2">
            <label
              class="input input-bordered input-success w-[624px] flex items-center justify-between gap-2 rounded-[15px] py-3 pl-5 pr-4"
            >
              <input
                v-model="busNumber"
                @input="filterSuggestions"
                type="text"
                class="grow text-base font-normal"
                placeholder="請輸入公車號碼"
              />
              <div class="flex gap-[7px] px-[6px]">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clip-path="url(#clip0_131_1093)">
                    <path
                      d="M21.9182 16.8174C21.9182 14.8248 20.3603 13.267 18.3678 13.267C16.3752 13.267 14.7812 14.8611 14.7812 16.8174C14.7812 17.9767 15.9405 20.0055 16.81 21.3822H6.08637C5.57917 21.3822 5.07197 21.1648 4.70969 20.8025C4.23872 20.3316 4.05758 19.6794 4.20249 18.9911C4.38363 18.1216 5.21689 17.4695 6.19505 17.4695H9.78166C10.7236 17.4695 11.6293 17.1072 12.3176 16.4189C13.2958 15.4407 13.6219 14.0278 13.1509 12.6874C12.6799 11.2745 11.3033 10.2963 9.7092 10.2963H5.07197C5.94145 8.88339 7.13699 6.74592 7.13699 5.55038C7.13699 3.55782 5.57917 2 3.58661 2C1.59405 2 0 3.59405 0 5.55038C0 7.21689 2.4273 10.8397 2.89827 11.5643C2.9345 11.6005 2.97073 11.6367 3.00696 11.673L3.04318 11.7092C3.07941 11.7454 3.11564 11.7454 3.15187 11.7817L3.1881 11.8179C3.22433 11.8541 3.26055 11.8541 3.29678 11.8541H3.33301C3.40547 11.8541 3.4417 11.8903 3.51415 11.8903H9.67298C10.5425 11.8903 11.3033 12.3975 11.5569 13.1583C11.8105 13.9191 11.6293 14.6799 11.0859 15.2234C10.7236 15.5856 10.2526 15.803 9.7092 15.803H6.1226C4.34741 15.803 2.86204 16.9985 2.53599 18.6288C2.28239 19.8244 2.64467 21.0561 3.51415 21.8894C4.20249 22.5777 5.07197 22.94 6.05014 22.94H18.2953C18.3678 22.94 18.404 22.94 18.4765 22.9038H18.5127C18.5489 22.9038 18.5852 22.8675 18.6214 22.8675C18.6576 22.8675 18.6576 22.8313 18.6938 22.8313C18.7301 22.7951 18.7663 22.7951 18.8025 22.7589L18.8388 22.7226C18.875 22.6864 18.9112 22.6502 18.9112 22.6139C18.9112 22.6139 18.9474 22.6139 18.9474 22.5777C19.4909 21.9981 21.9182 18.5201 21.9182 16.8174ZM3.58661 3.63028C4.67346 3.63028 5.50671 4.46353 5.50671 5.55038C5.50671 6.23872 4.52855 8.08637 3.58661 9.60796C2.60844 8.08637 1.63028 6.27495 1.63028 5.55038C1.63028 4.49976 2.49976 3.63028 3.58661 3.63028ZM18.3316 14.8973C19.4184 14.8973 20.2517 15.7306 20.2517 16.8174C20.2517 17.5057 19.2735 19.2809 18.2953 20.7301C17.3534 19.2809 16.339 17.5057 16.339 16.8174C16.3752 15.7668 17.2447 14.8973 18.3316 14.8973Z"
                      fill="#BABEF4"
                    />
                    <path
                      d="M4.3836 5.51413C4.3836 5.29676 4.31114 5.07939 4.16623 4.93447C3.8764 4.64465 3.29675 4.64465 3.00692 4.93447C2.97069 4.9707 2.93446 5.00693 2.89824 5.04316C2.86201 5.07939 2.86201 5.15184 2.82578 5.18807C2.78955 5.2243 2.78955 5.29676 2.78955 5.33298C2.78955 5.36921 2.78955 5.44167 2.78955 5.4779C2.78955 5.51413 2.78955 5.58658 2.78955 5.62281C2.78955 5.65904 2.82578 5.7315 2.82578 5.76772C2.82578 5.80395 2.86201 5.87641 2.89824 5.91264C2.93446 5.94887 2.97069 5.9851 3.00692 6.02132C3.15183 6.16624 3.3692 6.27492 3.58657 6.27492C3.80395 6.27492 4.02132 6.20247 4.16623 6.02132C4.27491 5.94887 4.3836 5.7315 4.3836 5.51413Z"
                      fill="#BABEF4"
                    />
                    <path
                      d="M18.9109 17.5419C19.0558 17.397 19.1645 17.1796 19.1645 16.9622C19.1645 16.7449 19.092 16.5275 18.9109 16.3826C18.8746 16.3464 18.8384 16.3101 18.8022 16.2739C18.7659 16.2377 18.6935 16.2377 18.6573 16.2015C18.621 16.2015 18.5486 16.1652 18.5123 16.1652C18.4037 16.1652 18.295 16.1652 18.1863 16.1652C18.1501 16.1652 18.0776 16.2015 18.0414 16.2015C18.0051 16.2377 17.9327 16.2377 17.8965 16.2739C17.8602 16.3101 17.824 16.3464 17.7878 16.3826C17.6429 16.5275 17.5342 16.7449 17.5342 16.9622C17.5342 17.1796 17.6066 17.397 17.7878 17.5419C17.824 17.5781 17.8602 17.6144 17.8965 17.6506C17.9327 17.6868 18.0051 17.6868 18.0414 17.723C18.0776 17.723 18.1501 17.7593 18.1863 17.7593C18.2225 17.7593 18.295 17.7593 18.3312 17.7593C18.5486 17.7593 18.7659 17.6868 18.9109 17.5419Z"
                      fill="#BABEF4"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_131_1093">
                      <rect width="24" height="24" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clip-path="url(#clip0_131_1098)">
                    <path
                      d="M12.5621 12.375V6.33751C12.5621 5.88751 12.1871 5.51251 11.7371 5.51251C11.2871 5.51251 10.9121 5.88751 10.9121 6.33751V12.7125C10.9121 12.9375 10.9871 13.1625 11.1371 13.3125L15.2996 17.55C15.4496 17.7 15.6746 17.8125 15.8996 17.8125C16.1246 17.8125 16.3121 17.7375 16.4996 17.5875C16.8371 17.25 16.8371 16.725 16.4996 16.3875L12.5621 12.375Z"
                      fill="#B3B3B3"
                    />
                    <path
                      d="M11.9998 0.5625C5.73731 0.5625 0.674805 5.7 0.674805 12C0.674805 18.3 5.77481 23.4375 11.9998 23.4375C18.2248 23.4375 23.3248 18.3 23.3248 12C23.3248 5.7 18.2623 0.5625 11.9998 0.5625ZM11.9998 21.75C6.67481 21.75 2.3248 17.3625 2.3248 12C2.3248 6.6375 6.67481 2.25 11.9998 2.25C17.3248 2.25 21.6748 6.6375 21.6748 12C21.6748 17.3625 17.3248 21.75 11.9998 21.75Z"
                      fill="#BABEF4"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_131_1098">
                      <rect width="24" height="24" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </div>
            </label>
          </div>
          <div class="flex gap-4 items-end px-2 flex-shrink-0">
            <button @click="scrollTo">
              <span
                class="text-base font-medium text-[#108313] underline decoration-[#108313] underline-offset-4"
                >搭乘須知</span
              >
            </button>
            <a
              href="https://citybus.taichung.gov.tw/ebus/fare/all"
              target="_blank"
              class="flex gap-[7px] border-l border-[#B3B3B3] px-[10px]"
            >
              <span
                class="text-base font-medium text-[#108313] underline decoration-[#108313] underline-offset-4"
                >票價查詢系統</span
              >
              <img :src="windowicon" alt="" />
            </a>
          </div>
        </div>
        <div
          class="w-full flex-col justify-center items-center gap-[10px] py-[10px] border-b border-[#818181] hidden md:flex"
        >
          <div
            v-for="item in paginatedData"
            :key="item.RouteUID"
            class="w-full border-t-2 border-b-gray-300 flex justify-center pt-[10px] px-[33px] hover:bg-[#EFEFEF]"
          >
            <RouterLink
              :to="{ name: 'busdetail', params: { id: item.RouteID } }"
              @click="handleInfo(item.RouteName.Zh_tw, item.SubRoutes[0].Headsign)"
              class="w-[870px] flex items-center justify-between"
            >
              <div
                class="w-[164px] h-[57px] bg-leaf bg-no-repeat bg-cover flex items-center justify-center p-0"
              >
                <span class="text-white text-lg font-medium text-center leading-[150%]">{{
                  item.RouteName.Zh_tw
                }}</span>
              </div>
              <div>
                <span class="text-[18px] font-medium leading-[150%]">{{
                  item.SubRoutes[0].Headsign
                }}</span>
                <span class="text-red-500">{{
                  isRouteSuspended(item.RouteName.Zh_tw) ? '（已停駛）' : null
                }}</span>
              </div>
              <div
                class="flex items-center gap-[10px] px-5 py-2 border-2 border-[#108313] rounded-[30px] hover:bg-[#108313] text-[#108313] hover:text-white"
              >
                <span class="hover:text-white text-sm font-medium leading-[150%]">路線時刻表</span>
                <i class="fa-solid fa-arrow-right"></i>
              </div>
            </RouterLink>
          </div>
        </div>
        <div
          class="w-full flex-col justify-center items-center gap-[10px] py-[10px] border-b border-[#818181] flex md:hidden"
        >
          <div
            v-for="item in paginatedData"
            :key="item.RouteUID"
            class="w-full border-t-2 border-b-gray-300 flex justify-center pt-[10px] px-[33px] hover:bg-[#EFEFEF]"
          >
            <RouterLink
              :to="{ name: 'busdetail', params: { id: item.RouteID } }"
              @click="handleInfo(item.RouteName.Zh_tw, item.SubRoutes[0].Headsign)"
              class="w-[870px] flex items-center justify-between"
            >
              <div class="flex flex-col items-start justify-center">
                <div class="w-[95px] h-[24px] p-0">
                  <span class="text-[#108313] text-base font-medium text-center leading-[150%]">{{
                    item.RouteName.Zh_tw
                  }}</span>
                </div>
                <div>
                  <span class="text-sm font-medium leading-[150%]">{{
                    item.SubRoutes[0].Headsign
                  }}</span>
                  <span class="text-sm text-red-500">{{
                    isRouteSuspended(item.RouteName.Zh_tw) ? '（已停駛）' : null
                  }}</span>
                </div>
              </div>
              <div
                class="w-6 h-6 flex items-center justify-center border-2 border-[#108313] rounded-full hover:bg-[#108313] text-[#108313] hover:text-white"
              >
                <i class="fa-solid fa-arrow-right"></i>
              </div>
            </RouterLink>
          </div>
        </div>
        <div class="flex justify-center gap-1 md:gap-[10px] mt-5 mb-32 p-[10px]">
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
            class="w-[35px] h-[35px] text-[#818181] text-base text-center leading-[15px] font-normal rounded-full"
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
        <div class="w-full lg:w-[874px] mx-auto flex flex-col gap-5 px-10 lg:p-0" id="needed">
          <div class="px-[25px] py-[17px] flex">
            <div class="flex justify-center items-center gap-[19px]">
              <img :src="flag" alt="" />
              <h3 class="text-2xl font-semibold font-SerifTC tracking-[2px] leading-6">搭乘須知</h3>
            </div>
          </div>
          <div class="flex flex-col gap-[10px]">
            <div class="bg-base-200 collapse collapse-arrow rounded-none">
              <input type="checkbox" class="peer" />
              <div
                class="collapse-title bg-[#EFEFEF] text-black border-l-[3px] border[#B3B3B3] peer-checked:bg-[#FFF7D3] peer-checked:border-[#818181]"
              >
                <span
                  class="text-base sm:text-lg font-medium leading-[150%] px-0 sm:px-[25px] py-[10px]"
                  >哩程段次計費的方式為何？</span
                >
              </div>
              <div class="collapse-content bg-white p-0">
                <ul
                  class="w-full lg:w-[737px] text-base text-[#818181] font-medium leading-[30px] px-[30px] py-[10px] sm:pl-24 sm:py-[35px] list-disc"
                >
                  <li class="leading-[120%] mb-[15px]">
                    臺中市民、市民的新住民配偶及臺中就學的外縣市學生，使用綁定市民限定乘車優惠的電子票證可享「10公里免費＋超過10公里車資上限10元」的雙十優惠。
                  </li>
                  <li class="leading-[120%] mb-[15px]">
                    非市民搭乘依里程計費，投現上車應付車資全票20元、半票11元，超過基本里程再依實際搭乘距離計算下車應付車資；另使用電子票證，刷卡上車應付車資全票僅扣15元(享有5元的優惠)、半票11元，超過基本里程再依實際搭乘距離計算下車應付車資。
                  </li>
                  <li class="leading-[120%] mb-[15px]">
                    臺中市委託發行敬老愛心卡先享有雙十乘車優惠，即搭乘距離在10公里內不會扣點，搭乘超過10公里最多扣10點。
                  </li>
                </ul>
              </div>
            </div>
            <div class="bg-base-200 collapse collapse-arrow rounded-none">
              <input type="checkbox" class="peer" />
              <div
                class="collapse-title bg-[#EFEFEF] text-black border-l-[3px] border[#B3B3B3] peer-checked:bg-[#FFF7D3] peer-checked:border-[#818181]"
              >
                <span
                  class="text-base sm:text-lg font-medium leading-[150%] px-0 sm:px-[25px] py-[10px]"
                  >多卡通電子票證乘車適用票卡？</span
                >
              </div>
              <div class="collapse-content bg-white p-0">
                <ul
                  class="w-full lg:w-[737px] text-base text-[#818181] font-medium leading-[150%] px-[30px] py-[10px] sm:pl-24 sm:py-[35px] list-disc list-inside"
                >
                  <p class="-ml-9">
                    悠遊卡(EasyCard)、一卡通(i-pass)卡、愛金卡(icash2.0) 各票證公司客服專線：
                  </p>
                  <li class="leading-[150%]">
                    悠遊卡股份有限公司24小時客服專線：412-8880（手機及金馬地區請加02）
                  </li>
                  <li class="leading-[150%]">一卡通票證股份有限公司：07-7912000</li>
                  <li class="leading-[150%]">愛金卡客服中心電話：0800-233-888或(02)2657-6388</li>
                </ul>
              </div>
            </div>
            <div class="bg-base-200 collapse collapse-arrow rounded-none">
              <input type="checkbox" class="peer" />
              <div
                class="collapse-title bg-[#EFEFEF] text-black border-l-[3px] border[#B3B3B3] peer-checked:bg-[#FFF7D3] peer-checked:border-[#818181]"
              >
                <span
                  class="text-base sm:text-lg font-medium leading-[150%] px-0 sm:px-[25px] py-[10px]"
                  >下車忘記刷卡如何解卡？</span
                >
              </div>
              <div class="collapse-content bg-white p-0">
                <p
                  class="w-full lg:w-[737px] text-base text-[#818181] font-medium leading-[30px] px-[30px] sm:pl-[55px] py-[10px] sm:pt-3 sm:pb-[35px]"
                >
                  民眾如因上車或下車時未刷卡，導致所持電子票證遭到「鎖卡」，則下次搭車時將由驗票機以「自動特許扣款」方式，於刷卡同時並解除「鎖卡」狀態，惟未完成上下車刷卡動作屬異常交易，故不得享受未刷卡該次市民卡基本里程優惠措施。
                </p>
              </div>
            </div>
            <div class="bg-base-200 collapse collapse-arrow rounded-none">
              <input type="checkbox" class="peer" />
              <div
                class="collapse-title bg-[#EFEFEF] text-black border-l-[3px] border[#B3B3B3] peer-checked:bg-[#FFF7D3] peer-checked:border-[#818181]"
              >
                <span
                  class="text-base sm:text-lg font-medium leading-[150%] px-0 sm:px-[25px] py-[10px]"
                  >轉乘資訊查詢</span
                >
              </div>
              <div class="collapse-content bg-white p-0">
                <ul
                  class="list-disc text-[#108313] flex flex-col sm:flex-row items-start sm:items-center gap-5 sm:gap-10 px-[35px] sm:pl-24 pt-3 pb-5"
                >
                  <li
                    class="text-sm font-medium leading-[150%] underline decoration-[#108313] underline-offset-4"
                  >
                    <a
                      href="https://www.youbike.com.tw/region/i/"
                      target="_blank"
                      class="flex items-center gap-[7px]"
                    >
                      youbike2.0自行車地圖<img :src="windowicon" alt="" />
                    </a>
                  </li>
                  <li
                    class="text-sm font-medium leading-[150%] underline decoration-[#108313] underline-offset-4"
                  >
                    <a
                      href="https://www.tmrt.com.tw/"
                      target="_blank"
                      class="flex items-center gap-[7px]"
                    >
                      臺中捷運<img :src="windowicon" alt="" />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-else>
        <div class="flex flex-col gap-[34px]">
          <div class="flex justify-start lg:justify-end px-[21px]">
            <div class="flex gap-4 items-end px-2">
              <button @click="scrollTo">
                <span
                  class="text-base font-medium text-[#108313] underline decoration-[#108313] underline-offset-4"
                  >搭乘須知</span
                >
              </button>
              <a
                href="https://citybus.taichung.gov.tw/ebus/fare/all"
                target="_blank"
                class="flex gap-[7px] border-l border-[#B3B3B3] px-[10px]"
              >
                <span
                  class="text-base font-medium text-[#108313] underline decoration-[#108313] underline-offset-4"
                  >票價查詢系統</span
                >
                <img :src="windowicon" alt="" />
              </a>
            </div>
          </div>
          <div class="flex flex-col md:flex-row items-center justify-center gap-5 pt-[17px]">
            <button
              @click="switchDirection('totaipei')"
              :class="
                selectedDirection === 'totaipei'
                  ? 'bg-[#4f5ed2]  text-white '
                  : 'bg-white border-2 border-[#969ee9] text-[#969ee9]'
              "
              class="w-[300px] h-[45px] text-base font-medium rounded-full px-5 py-2"
            >
              往台北
            </button>
            <button
              @click="switchDirection('tofengyuan')"
              :class="
                selectedDirection === 'tofengyuan'
                  ? 'bg-[#4f5ed2]  text-white '
                  : 'bg-white border-2 border-[#969ee9] text-[#969ee9]'
              "
              class="w-[300px] h-[45px] text-base font-medium rounded-full px-5 py-2"
            >
              往豐原
            </button>
          </div>
          <div v-if="selectedDirection === 'totaipei'" class="mb-32">
            <div class="w-full lg:w-[860px] bg-base-200 collapse mx-auto mb-[86px]">
              <input type="checkbox" class="peer" />
              <div
                class="collapse-title bg-white text-[#818181] text-center flex flex-col gap-[17px] px-4"
              >
                <span>發車時刻表</span>
                <div class="w-full flex gap-[1px]">
                  <hr class="w-1/2 lg:w-[410px] border-[#818181]" />
                  <img :src="arrowdown" alt="" class="arrow px-[10px] pb-[10px]" />
                  <hr class="w-1/2 lg:w-[410px] border-[#818181]" />
                </div>
              </div>
              <div
                class="w-full collapse-content bg-white text-[#818181] peer-checked:border-b peer-checked:border-[#818181] px-12"
              >
                <span
                  v-for="time in interBusSchedule0"
                  :key="time.tripid"
                  class="text-center text-lg font-SansTC font-medium text-black"
                >
                  {{ time.departtime }}&nbsp;&nbsp;
                </span>
              </div>
            </div>
            <div class="flex items-center gap-[10px] px-8 pb-5">
              <img :src="pointer" alt="" />
              <span class="text-base font-medium leading-[150%]">{{ timeleft }}秒前更新</span>
            </div>
            <div
              class="w-[810px] mx-auto flex-wrap gap-y-0 route-container hidden lg:flex"
              :class="[
                interbusdir0.length <= 9
                  ? 'justify-start'
                  : Math.floor(interbusdir0.length / 9) % 2 !== 0
                    ? 'justify-end'
                    : 'justify-start'
              ]"
            >
              <div
                v-for="(stop, index) in reorder(interbusdir0)"
                :key="index"
                :class="{
                  reverse: Math.floor(index / 9) % 2 === 1,
                  'turn-right':
                    index > 0 &&
                    index % 9 === 0 &&
                    !(
                      index === interbusdir0.length - 1 &&
                      Math.floor((interbusdir0.length - 1) / 9) % 2 === 1
                    ),
                  'turn-left':
                    index > 0 &&
                    (index + 1) % 9 === 0 &&
                    !(
                      index === interbusdir0.length - 1 &&
                      Math.floor((interbusdir0.length - 1) / 9) % 2 === 1
                    ),
                  'last-element':
                    index >
                    interbusdir0.length -
                      1 -
                      (interbusdir0.length % 9 === 0 ? 1 : interbusdir0.length % 9)
                }"
                class="relative w-[90px] h-[119px] flex items-center my-5"
              >
                <div
                  class="dot self-center outline outline-4"
                  :class="{
                    'outline-[#2B40C7]': stop.EstimateTime && stop.EstimateTime / 60 < 10
                  }"
                ></div>
                <div class="line"></div>
                <a
                  :href="`https://www.google.com/maps/search/?api=1&query=${stop.StopName.Zh_tw}`"
                  target="_blank"
                  class="w-11/12 absolute left-1/2 top-[0%] -translate-x-1/2 text-sm text-center font-medium leading-[150%]"
                  :class="{
                    'text-[#2B40C7]': stop.EstimateTime && stop.EstimateTime / 60 < 10
                  }"
                >
                  {{ stop.StopName.Zh_tw }}
                </a>
                <div
                  class="w-11/12 absolute left-1/2 bottom-[20%] -translate-x-1/2 text-sm text-center"
                >
                  <span class="text-xs font-light leading-[150%]">{{
                    stop.PlateNumb === '-1' && !stop.EstimateTime
                      ? stop.IsLastBus
                        ? '末班已駛離'
                        : '未發車'
                      : Math.floor(stop.EstimateTime / 60) + '分'
                  }}</span>
                </div>
              </div>
            </div>
            <div
              class="w-[286px] mx-auto m-0 flex flex-col justify-center items-start gap-20 lg:hidden route-container"
            >
              <div
                v-for="(stop, index) in interbusdir0"
                :key="index"
                class="relative flex justify-start items-center gap-10"
                :class="{ 'last-element': index === interbusdir0.length - 1 }"
              >
                <div>
                  <div
                    class="dot self-center outline outline-4"
                    :class="{
                      'outline-[#2B40C7]': stop.EstimateTime && stop.EstimateTime / 60 < 10
                    }"
                  ></div>
                  <div class="line"></div>
                  <div class="w-16 absolute left-0 top-0 ml-10 -mt-3">
                    <span class="text-sm font-medium leading-[150%] whitespace-wrap">
                      {{ stop.StopName.Zh_tw }}
                    </span>
                  </div>
                  <div class="absolute left-0 top-0 text-sm text-center ml-40 -mt-3">
                    <span class="text-sm font-medium leading-[150%] whitespace-nowrap">{{
                      stop.PlateNumb === '-1' && !stop.EstimateTime
                        ? stop.IsLastBus
                          ? '末班已駛離'
                          : '未發車'
                        : Math.floor(stop.EstimateTime / 60) + '分'
                    }}</span>
                  </div>
                  <a
                    :href="`https://www.google.com/maps/search/?api=1&query=${stop.StopName.Zh_tw}`"
                    target="_blank"
                    class="absolute left-0 top-0 ml-64 -mt-3 text-sm text-center font-medium leading-[150%]"
                  >
                    <svg
                      width="25"
                      height="25"
                      viewBox="0 0 25 25"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clip-path="url(#clip0_1750_5213)">
                        <path
                          d="M15.1792 8.32764C15.1792 6.45264 13.6792 4.95264 11.8042 4.95264C9.9292 4.95264 8.4292 6.45264 8.4292 8.32764C8.4292 10.2026 9.9292 11.7026 11.8042 11.7026C13.6792 11.7026 15.1792 10.2026 15.1792 8.32764ZM10.1167 8.32764C10.1167 7.39014 10.8667 6.64014 11.8042 6.64014C12.7417 6.64014 13.4917 7.39014 13.4917 8.32764C13.4917 9.26514 12.7417 10.0151 11.8042 10.0151C10.8667 10.0151 10.1167 9.26514 10.1167 8.32764Z"
                          fill="#2B40C7"
                        />
                        <path
                          d="M23.3544 22.1278L21.8169 15.1903C21.7419 14.8528 21.4794 14.5903 21.1044 14.5528L16.6419 13.9153C18.0669 11.8903 19.2294 9.75283 19.2294 8.10283C19.2294 4.12783 15.8919 0.902832 11.8044 0.902832C7.71687 0.902832 4.37937 4.12783 4.37937 8.10283C4.37937 9.75283 5.54187 11.8903 6.96687 13.9153L2.46687 14.5528C2.09187 14.5903 1.82937 14.8903 1.75437 15.2653L0.704372 22.2028C0.666872 22.5028 0.779372 22.8028 1.00437 22.9903C1.22937 23.1778 1.52937 23.2528 1.82937 23.1403L6.77937 21.4153L11.7669 23.1028C11.9544 23.1778 12.1419 23.1778 12.2919 23.1028L17.2794 21.4153L22.2669 23.1028C22.3419 23.1403 22.4544 23.1403 22.5294 23.1403C22.7169 23.1403 22.9419 23.0653 23.0919 22.9153C23.3169 22.7653 23.4294 22.4278 23.3544 22.1278ZM11.8044 2.59033C14.9919 2.59033 17.5419 5.06533 17.5419 8.10283C17.5419 10.1653 14.5794 14.1028 11.8044 17.1403C9.02937 14.1403 6.06687 10.1653 6.06687 8.10283C6.06687 5.06533 8.61687 2.59033 11.8044 2.59033ZM17.5419 19.7278C17.3544 19.6528 17.1669 19.6528 17.0169 19.7278L12.0294 21.4153L7.04187 19.7278C6.85437 19.6528 6.66687 19.6528 6.51687 19.7278L2.57937 21.0778L3.32937 16.1653L8.09187 15.4528C8.95437 16.5403 9.85437 17.5528 10.5669 18.3403C10.8669 18.6778 11.3169 18.8653 11.7669 18.8653C12.2169 18.8653 12.6669 18.6778 12.9669 18.3403C13.6794 17.5528 14.5794 16.5403 15.4419 15.4528L20.3169 16.1653L21.4044 21.0403L17.5419 19.7278Z"
                          fill="#2B40C7"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_1750_5213">
                          <rect
                            width="24"
                            height="24"
                            fill="white"
                            transform="translate(0.0292969 0.0405273)"
                          />
                        </clipPath>
                      </defs>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div v-else class="mb-32">
            <div class="w-full lg:w-[860px] collapse mx-auto mb-[86px]">
              <input type="checkbox" class="peer" />
              <div
                class="collapse-title bg-white text-[#818181] text-center flex flex-col gap-[17px] px-4"
              >
                <span>發車時刻表</span>
                <div class="flex gap-[1px]">
                  <hr class="w-1/2 lg:w-[410px] border-[#818181]" />
                  <img :src="arrowdown" alt="" class="arrow px-[10px] pb-[10px]" />
                  <hr class="w-1/2 lg:w-[410px] border-[#818181]" />
                </div>
              </div>
              <div
                class="collapse-content bg-white text-[#818181] peer-checked:border-b peer-checked:border-[#818181] px-12"
              >
                <span
                  v-for="time in interBusSchedule1"
                  :key="time.tripid"
                  class="text-center text-lg font-SansTC font-medium text-black"
                >
                  {{ time.departtime }}&nbsp;&nbsp;
                </span>
              </div>
            </div>
            <div class="flex items-center gap-[10px] px-8 pb-5">
              <img :src="pointer" alt="" />
              <span class="text-base font-medium leading-[150%]">{{ timeleft }}秒前更新</span>
            </div>
            <div
              class="w-[810px] mx-auto flex-wrap gap-y-0 route-container hidden lg:flex"
              :class="[
                interbusdir1.length <= 9
                  ? 'justify-start'
                  : Math.floor(interbusdir1.length / 9) % 2 !== 0
                    ? 'justify-end'
                    : 'justify-start'
              ]"
            >
              <div
                v-for="(stop, index) in reorder(interbusdir1)"
                :key="index"
                :class="{
                  reverse: Math.floor(index / 9) % 2 === 1,
                  'turn-right':
                    index > 0 &&
                    index % 9 === 0 &&
                    !(
                      index === interbusdir1.length - 1 &&
                      Math.floor((interbusdir1.length - 1) / 9) % 2 === 1
                    ),
                  'turn-left':
                    index > 0 &&
                    (index + 1) % 9 === 0 &&
                    !(
                      index === interbusdir1.length - 1 &&
                      Math.floor((interbusdir1.length - 1) / 9) % 2 === 1
                    ),
                  'last-element':
                    index >
                    interbusdir1.length -
                      1 -
                      (interbusdir1.length % 9 === 0 ? 1 : interbusdir1.length % 9)
                }"
                class="relative w-[90px] h-[119px] flex items-center my-5"
              >
                <div
                  class="dot self-center outline outline-4"
                  :class="{
                    'outline-[#2B40C7]': stop.EstimateTime && stop.EstimateTime / 60 < 10
                  }"
                ></div>
                <div class="line"></div>
                <a
                  :href="`https://www.google.com/maps/search/?api=1&query=${stop.StopName.Zh_tw}`"
                  target="_blank"
                  class="w-11/12 absolute left-1/2 top-[0%] -translate-x-1/2 text-sm text-center font-medium leading-[150%]"
                  :class="{
                    'text-[#2B40C7]': stop.EstimateTime && stop.EstimateTime / 60 < 10
                  }"
                >
                  {{ stop.StopName.Zh_tw }}
                </a>
                <div
                  class="w-11/12 absolute left-1/2 bottom-[20%] -translate-x-1/2 text-sm text-center"
                >
                  <span class="text-xs font-light leading-[150%]">{{
                    stop.PlateNumb === '-1' && !stop.EstimateTime
                      ? stop.IsLastBus
                        ? '末班已駛離'
                        : '未發車'
                      : Math.floor(stop.EstimateTime / 60) + '分'
                  }}</span>
                </div>
              </div>
            </div>
            <div
              class="w-[286px] mx-auto m-0 flex flex-col justify-center items-start gap-20 lg:hidden route-container"
            >
              <div
                v-for="(stop, index) in interbusdir1"
                :key="index"
                class="relative flex justify-start items-center gap-10"
                :class="{ 'last-element': index === interbusdir1.length - 1 }"
              >
                <div>
                  <div
                    class="dot self-center outline outline-4"
                    :class="{
                      'outline-[#2B40C7]': stop.EstimateTime && stop.EstimateTime / 60 < 10
                    }"
                  ></div>
                  <div class="line"></div>
                  <div class="w-16 absolute left-0 top-0 ml-10 -mt-3">
                    <span class="text-sm font-medium leading-[150%] whitespace-wrap">
                      {{ stop.StopName.Zh_tw }}
                    </span>
                  </div>
                  <div class="absolute left-0 top-0 text-sm text-center ml-40 -mt-3">
                    <span class="text-sm font-medium leading-[150%] whitespace-nowrap">{{
                      stop.PlateNumb === '-1' && !stop.EstimateTime
                        ? stop.IsLastBus
                          ? '末班已駛離'
                          : '未發車'
                        : Math.floor(stop.EstimateTime / 60) + '分'
                    }}</span>
                  </div>
                  <a
                    :href="`https://www.google.com/maps/search/?api=1&query=${stop.StopName.Zh_tw}`"
                    target="_blank"
                    class="absolute left-0 top-0 ml-64 -mt-3 text-sm text-center font-medium leading-[150%]"
                  >
                    <svg
                      width="25"
                      height="25"
                      viewBox="0 0 25 25"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clip-path="url(#clip0_1750_5213)">
                        <path
                          d="M15.1792 8.32764C15.1792 6.45264 13.6792 4.95264 11.8042 4.95264C9.9292 4.95264 8.4292 6.45264 8.4292 8.32764C8.4292 10.2026 9.9292 11.7026 11.8042 11.7026C13.6792 11.7026 15.1792 10.2026 15.1792 8.32764ZM10.1167 8.32764C10.1167 7.39014 10.8667 6.64014 11.8042 6.64014C12.7417 6.64014 13.4917 7.39014 13.4917 8.32764C13.4917 9.26514 12.7417 10.0151 11.8042 10.0151C10.8667 10.0151 10.1167 9.26514 10.1167 8.32764Z"
                          fill="#2B40C7"
                        />
                        <path
                          d="M23.3544 22.1278L21.8169 15.1903C21.7419 14.8528 21.4794 14.5903 21.1044 14.5528L16.6419 13.9153C18.0669 11.8903 19.2294 9.75283 19.2294 8.10283C19.2294 4.12783 15.8919 0.902832 11.8044 0.902832C7.71687 0.902832 4.37937 4.12783 4.37937 8.10283C4.37937 9.75283 5.54187 11.8903 6.96687 13.9153L2.46687 14.5528C2.09187 14.5903 1.82937 14.8903 1.75437 15.2653L0.704372 22.2028C0.666872 22.5028 0.779372 22.8028 1.00437 22.9903C1.22937 23.1778 1.52937 23.2528 1.82937 23.1403L6.77937 21.4153L11.7669 23.1028C11.9544 23.1778 12.1419 23.1778 12.2919 23.1028L17.2794 21.4153L22.2669 23.1028C22.3419 23.1403 22.4544 23.1403 22.5294 23.1403C22.7169 23.1403 22.9419 23.0653 23.0919 22.9153C23.3169 22.7653 23.4294 22.4278 23.3544 22.1278ZM11.8044 2.59033C14.9919 2.59033 17.5419 5.06533 17.5419 8.10283C17.5419 10.1653 14.5794 14.1028 11.8044 17.1403C9.02937 14.1403 6.06687 10.1653 6.06687 8.10283C6.06687 5.06533 8.61687 2.59033 11.8044 2.59033ZM17.5419 19.7278C17.3544 19.6528 17.1669 19.6528 17.0169 19.7278L12.0294 21.4153L7.04187 19.7278C6.85437 19.6528 6.66687 19.6528 6.51687 19.7278L2.57937 21.0778L3.32937 16.1653L8.09187 15.4528C8.95437 16.5403 9.85437 17.5528 10.5669 18.3403C10.8669 18.6778 11.3169 18.8653 11.7669 18.8653C12.2169 18.8653 12.6669 18.6778 12.9669 18.3403C13.6794 17.5528 14.5794 16.5403 15.4419 15.4528L20.3169 16.1653L21.4044 21.0403L17.5419 19.7278Z"
                          fill="#2B40C7"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_1750_5213">
                          <rect
                            width="24"
                            height="24"
                            fill="white"
                            transform="translate(0.0292969 0.0405273)"
                          />
                        </clipPath>
                      </defs>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="w-full lg:w-[874px] mx-auto flex flex-col gap-5 px-10 lg:p-0" id="needed">
          <div class="px-[25px] py-[17px] flex">
            <div class="flex justify-center items-center gap-[19px]">
              <img :src="flag" alt="" />
              <h3 class="text-2xl font-semibold font-SerifTC tracking-[2px]">搭乘須知</h3>
            </div>
          </div>
          <div class="flex flex-col gap-[10px]">
            <div class="bg-base-200 collapse collapse-arrow rounded-none">
              <input type="checkbox" class="peer" />
              <div
                class="collapse-title bg-[#EFEFEF] text-black border-l-[3px] border[#B3B3B3] peer-checked:bg-[#FFF7D3] peer-checked:border-[#818181]"
              >
                <span class="text-base sm:text-lg font-medium px-0 sm:px-[25px] py-[10px]"
                  >票價資訊</span
                >
              </div>
              <div class="collapse-content bg-white p-0">
                <div
                  class="w-full lg:w-[737px] text-base text-[#818181] font-medium leading-[30px] px-[30px] py-[10px] sm:pl-[55px] sm:py-[35px]"
                >
                  <p class="text-lg font-medium">第一優先乘坐</p>
                  <ul class="list-disc pl-1">
                    <li class="list-inside text-base font-medium">
                      北上欲至「臺北」之乘客，及有劃座位之乘客。
                    </li>
                    <li class="list-inside text-base font-medium">
                      從「臺北」、「三重修德國小」上車欲南下之乘客，及有劃座位之乘客。
                    </li>
                  </ul>
                  <br />
                  <p class="text-lg font-medium">第二優先乘坐</p>
                  <ul class="list-disc pl-1">
                    <li class="list-inside text-base font-medium">
                      往來「豐原—西湖渡假村」區間之乘客。
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div class="bg-base-200 collapse collapse-arrow rounded-none">
              <input type="checkbox" class="peer" />
              <div
                class="collapse-title bg-[#EFEFEF] text-black border-l-[3px] border[#B3B3B3] peer-checked:bg-[#FFF7D3] peer-checked:border-[#818181]"
              >
                <span class="text-base sm:text-lg font-medium px-0 sm:px-[25px] py-[10px]"
                  >班車座位優先乘坐說明</span
                >
              </div>
              <div class="collapse-content bg-white p-0">
                <div
                  class="w-full lg:w-[737px] text-base text-[#818181] font-medium leading-[30px] px-[30px] py-[10px] sm:pl-[55px] sm:py-[35px]"
                >
                  <p class="text-lg font-medium">第一優先乘坐</p>
                  <ul class="list-disc pl-1">
                    <li class="list-inside text-base font-medium">
                      北上欲至「臺北」之乘客，及有劃座位之乘客。
                    </li>
                    <li class="list-inside text-base font-medium">
                      從「臺北」、「三重修德國小」上車欲南下之乘客，及有劃座位之乘客。
                    </li>
                  </ul>
                  <br />
                  <p class="text-lg font-medium">第二優先乘坐</p>
                  <ul class="list-disc pl-1">
                    <li class="list-inside text-base font-medium">
                      往來「豐原—西湖渡假村」區間之乘客。
                    </li>
                  </ul>
                  <br />
                  ＊依據公路總局規定，本路線每班次均需繞駛「西湖渡假村」。
                </div>
              </div>
            </div>
            <div class="bg-base-200 collapse collapse-arrow rounded-none">
              <input type="checkbox" class="peer" />
              <div
                class="collapse-title bg-[#EFEFEF] text-black border-l-[3px] border[#B3B3B3] peer-checked:bg-[#FFF7D3] peer-checked:border-[#818181]"
              >
                <span class="text-base sm:text-lg font-medium px-0 sm:px-[25px] py-[10px]"
                  >國道客運使用電子票證乘車須知</span
                >
              </div>
              <div class="collapse-content bg-white p-0">
                <ul
                  class="w-full lg:w-[737px] text-base text-[#818181] font-medium leading-[30px] px-[30px] py-[10px] sm:pl-24 sm:py-[35px] list-disc"
                >
                  <li class="leading-[120%] mb-[15px]">
                    本公司6606「豐原-臺北」路線，自103年10月1日起，可接受臺中市敬老愛心卡刷卡乘車，持卡民眾可於車上刷卡乘車。
                  </li>
                  <li class="leading-[120%] mb-[15px]">
                    臺中市敬老卡請注意卡片內點數是否足夠，【點數】必須達本路線半票票價140點以上方可使用，歡迎多加利用。
                  </li>
                  <li class="leading-[120%] mb-[15px]">
                    每逢星期五、六、日或連續假期，請至售票窗口劃位，憑劃位單於上車時刷卡後入座。
                  </li>
                  <li class="leading-[120%] mb-[15px]">
                    即日起開放所有電子票證付費（金額必須達本路線全半票之票券金額以上方可使用），每逢星期五、六、日或連續假期，請至售票窗口劃位，憑劃位單於上車時刷卡後入座。
                  </li>
                  <li class="leading-[120%]">
                    臺中市敬老卡使用如有公告未盡事宜，悉依臺中市政府相關規定辦理。
                  </li>
                </ul>
              </div>
            </div>
            <div class="bg-base-200 collapse collapse-arrow rounded-none">
              <input type="checkbox" class="peer" />
              <div
                class="collapse-title bg-[#EFEFEF] text-black border-l-[3px] border[#B3B3B3] peer-checked:bg-[#FFF7D3] peer-checked:border-[#818181]"
              >
                <span class="text-base sm:text-lg font-medium px-0 sm:px-[25px] py-[10px]"
                  >於豐原站免費轉乘</span
                >
              </div>
              <div class="collapse-content bg-white p-0">
                <ul
                  class="list-disc text-[#108313] flex flex-col sm:flex-row items-start sm:items-center gap-5 sm:gap-10 px-[35px] sm:pl-24 pt-3 pb-5"
                >
                  <li
                    class="text-sm font-medium leading-[150%] underline decoration-[#108313] underline-offset-4"
                  >
                    <a
                      href="https://www.youbike.com.tw/region/i/"
                      target="_blank"
                      class="flex items-center gap-[7px]"
                    >
                      youbike2.0自行車地圖<img :src="windowicon" alt="" />
                    </a>
                  </li>
                  <li
                    class="text-sm font-medium leading-[150%] underline decoration-[#108313] underline-offset-4"
                  >
                    <a
                      href="https://www.tmrt.com.tw/"
                      target="_blank"
                      class="flex items-center gap-[7px]"
                    >
                      臺中捷運<img :src="windowicon" alt="" />
                    </a>
                  </li>
                </ul>
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
.route-container .dot {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 10px;
  height: 10px;
  background-color: #d9d9d9;
  border-radius: 5px;
  z-index: 10;
}

.route-container .line {
  width: 100%;
  height: 10px;
  background-color: #b3b3b3;
  position: relative;
}

.turn-left:not(.reverse)::after {
  content: '';
  position: absolute;
  width: 10px;
  height: 169px;
  background-color: #b3b3b3;
  right: -11%;
  bottom: -88%;
  border-top-right-radius: 15px;
  border-bottom-right-radius: 15px;
}
.reverse.turn-right::after {
  content: '';
  position: absolute;
  width: 10px;
  height: 169px;
  background-color: #b3b3b3;
  left: -11%;
  top: 46%;
  border-top-left-radius: 15px;
  border-bottom-left-radius: 15px;
}

.reverse .line {
  transform: scaleX(-1);
}
.reverse.turn-right.last-element::after {
  content: none;
}
.turn-left.last-element::after {
  content: none;
}

@media (max-width: 992px) {
  .route-container .dot {
    position: relative;
    width: 10px;
    height: 10px;
    background-color: #d9d9d9;
    border-radius: 5px;
    z-index: 10;
  }

  .route-container .line {
    width: 10px;
    height: 90px;
    background-color: #b3b3b3;
    position: absolute;
    left: 0%;
    top: 0%;
  }
  .route-container .last-element .line {
    width: 0;
    height: 0;
  }
}

.collapse-title .arrow {
  transition: 0.2s ease-in-out;
}
.peer:checked + .collapse-title .arrow {
  transform: rotate(180deg);
  padding-top: 10px;
  padding-bottom: 0px;
}
</style>
