<script setup>
import { ref, onMounted, computed } from 'vue'
import { RouterLink, RouterView } from 'vue-router'
import dollar from '@/assets/homepage/header/dollar-bag.svg'
import backpack from '@/assets/homepage/header/backpack.svg'
import mailbox from '@/assets/homepage/header/mailbox.svg'
import busicon from '@/assets/homepage/header/busicon.svg'
import vline from '@/assets/passenger/verticalline.svg'
import { useButtonStore } from '@/stores/store.js'
import { useTokenStore } from '@/stores/token.js'
import { useBusinfoStore } from '@/stores/info.js'
const busData = ref(JSON.parse(localStorage.getItem('busData')) || [])
const busNumber = ref('')
const buttonStore = useButtonStore()
const handleSwitchBtn = (btn) => {
  buttonStore.updateSelectedBtn(btn)
}
const tokenStore = useTokenStore()
const token = computed(() => tokenStore.token)
const handleToken = (token) => {
  tokenStore.updateToken(token)
}

const businfoStore = useBusinfoStore()
const handleBusInfo = (routeno, routese) => {
  businfoStore.updateInfoRoute(routeno, routese)
}
// const routeNo = computed(() => businfoStore.routeNo)

const fetchAccessToken = async () => {
  try {
    const response = await fetch(
      'https://tdx.transportdata.tw/auth/realms/TDXConnect/protocol/openid-connect/token',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({
          grant_type: 'client_credentials',
          client_id: 'monky6503-18bb7fe6-b8f2-47e2',
          client_secret: 'ca6f27b0-354c-469a-9c4e-caeedf3cb5ac'
        })
      }
    )

    const data = await response.json()
    handleToken(data.access_token)
    fetchBusRoute()
  } catch (error) {
    console.error('Error fetching access token:', error)
  }
}
const fetchBusRoute = async () => {
  try {
    const response = await fetch(
      'https://tdx.transportdata.tw/api/advanced/v2/Bus/Route/City/Taichung/OperatorNo/1801?%24format=JSON',
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token.value}`
        }
      }
    )
    const data = await response.json()
    busData.value = data
    busData.value.sort((a, b) => {
      let numA = parseInt(a.RouteName.Zh_tw.match(/^\d+/)[0])
      let numB = parseInt(b.RouteName.Zh_tw.match(/^\d+/)[0])
      return numA > numB ? 1 : numA < numB ? -1 : 0
    })
    localStorage.setItem('busData', JSON.stringify(busData.value))
  } catch (error) {
    console.error('Error fetching bus data:', error)
  }
}
const go = () => {
  busData.value = busData.value.filter((item) => {
    return item.RouteName.Zh_tw === busNumber.value
  })
}

onMounted(async () => {
  await fetchAccessToken()
  await fetchBusRoute()
})
</script>

<template>
  <header class="w-[375px] 2xl:w-[989px] mx-auto lg:pt-[100px] pt-[57px]">
    <div
      class="relative w-full h-[183px] 2xl:h-[387px] bg-[url('@/assets/homepage/header/banner(375px).svg')] 2xl:bg-banner 2xl:px-[279px] pl-[79.5px] pt-[35px] 2xl:py-[77px] bg-no-repeat bg-cover"
    >
      <p
        class="w-[216px] 2xl:w-[448px] text-center text-2xl 2xl:text-[48px] text-white font-SerifTC 2xl:font-semibold font-medium leading-[150%] 2xl:pb-[150px]"
      >
        服務的心，始終如一
      </p>
      <div
        class="absolute w-[739px] h-[154px] left-1/2 -bottom-[95px] -translate-x-1/2 bg-white rounded-[20px] shadow-lg items-center justify-center bg-flagbg bg-no-repeat bg-contain px-[25px] py-[27px] hidden 2xl:flex"
      >
        <div class="w-[689px] flex flex-col items-start justify-center gap-[15px] px-5 py-[10px]">
          <span class="text-2xl font-semibold font-SerifTC tracking-[2px] leading-6"
            >想前往哪裡？</span
          >
          <div class="w-[649px] flex gap-6">
            <div
              class="w-full bg-white flex items-center justify-between border border-[#108313] rounded-[15px] py-3 pl-5 pr-4 text-[#818181] text-base font-normal"
            >
              <input
                v-model="busNumber"
                @change="go"
                type="text"
                class="text-base font-normal w-[112px]"
                placeholder="請輸入公車號碼"
              />
              <div class="flex gap-[10px]">
                <img :src="vline" alt="" />
                <select class="w-[65px] h-6">
                  <option disabled selected>地區</option>
                  <option>豐原</option>
                  <option>后里</option>
                  <option>東勢</option>
                  <option>新社</option>
                  <option>谷關</option>
                </select>
              </div>
              <div class="flex gap-[10px]">
                <img :src="vline" alt="" />
                <select class="w-[100px] h-6">
                  <option disabled selected>景點</option>
                  <option>后豐鐵馬道</option>
                  <option>谷關溫泉</option>
                  <option>東勢林場</option>
                  <option>新社花海</option>
                  <option>廟東夜市</option>
                </select>
              </div>
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
                      fill="#B3B3B3"
                    />
                    <path
                      d="M4.3836 5.51413C4.3836 5.29676 4.31114 5.07939 4.16623 4.93447C3.8764 4.64465 3.29675 4.64465 3.00692 4.93447C2.97069 4.9707 2.93446 5.00693 2.89824 5.04316C2.86201 5.07939 2.86201 5.15184 2.82578 5.18807C2.78955 5.2243 2.78955 5.29676 2.78955 5.33298C2.78955 5.36921 2.78955 5.44167 2.78955 5.4779C2.78955 5.51413 2.78955 5.58658 2.78955 5.62281C2.78955 5.65904 2.82578 5.7315 2.82578 5.76772C2.82578 5.80395 2.86201 5.87641 2.89824 5.91264C2.93446 5.94887 2.97069 5.9851 3.00692 6.02132C3.15183 6.16624 3.3692 6.27492 3.58657 6.27492C3.80395 6.27492 4.02132 6.20247 4.16623 6.02132C4.27491 5.94887 4.3836 5.7315 4.3836 5.51413Z"
                      fill="#B3B3B3"
                    />
                    <path
                      d="M18.9109 17.5419C19.0558 17.397 19.1645 17.1796 19.1645 16.9622C19.1645 16.7449 19.092 16.5275 18.9109 16.3826C18.8746 16.3464 18.8384 16.3101 18.8022 16.2739C18.7659 16.2377 18.6935 16.2377 18.6573 16.2015C18.621 16.2015 18.5486 16.1652 18.5123 16.1652C18.4037 16.1652 18.295 16.1652 18.1863 16.1652C18.1501 16.1652 18.0776 16.2015 18.0414 16.2015C18.0051 16.2377 17.9327 16.2377 17.8965 16.2739C17.8602 16.3101 17.824 16.3464 17.7878 16.3826C17.6429 16.5275 17.5342 16.7449 17.5342 16.9622C17.5342 17.1796 17.6066 17.397 17.7878 17.5419C17.824 17.5781 17.8602 17.6144 17.8965 17.6506C17.9327 17.6868 18.0051 17.6868 18.0414 17.723C18.0776 17.723 18.1501 17.7593 18.1863 17.7593C18.2225 17.7593 18.295 17.7593 18.3312 17.7593C18.5486 17.7593 18.7659 17.6868 18.9109 17.5419Z"
                      fill="#B3B3B3"
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
                      fill="#B3B3B3"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_131_1098">
                      <rect width="24" height="24" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </div>
            </div>
            <RouterLink
              :to="
                busNumber ? { name: 'busdetail', params: { id: busData[0].RouteID } } : '/businfo'
              "
              @click="handleBusInfo(busData[0].RouteName.Zh_tw, busData[0].SubRoutes[0].Headsign)"
              type="button"
              class="btn bg-[#108313] text-white text-base font-medium px-7 py-3 rounded-[15px] leading-6"
            >
              搜尋
            </RouterLink>
          </div>
        </div>
      </div>
    </div>
    <div
      class="relative w-[374px] h-[174px] bg-gradient-to-b from-[#FFF7D3] to-[#FFFFFF] block 2xl:hidden"
    >
      <div
        class="absolute left-1/2 -top-[15%] -translate-x-1/2 w-[316px] h-[174px] bg-white rounded-[10px] shadow-[0px_0px_5px_0px_rgba(0,0,0,0.25)] grid content-center"
      >
        <div class="w-[285px] h-[155px] mx-auto flex items-center justify-center">
          <div class="flex flex-col gap-[20px]">
            <div class="flex items-center gap-[19px] border-b-2 pb-[10px]">
              <img src="@/assets/homepage/header/search.svg" alt="" />
              <div>
                <p class="text-sm font-medium leading-[150%]">想前往哪裡?</p>
                <p class="text-[#818181] text-xs font-light leading-[150%]">公車號碼．地區．景點</p>
              </div>
            </div>
            <div>
              <div
                class="grid grid-cols-2 gap-[22px] pr-[13px] text-sm font-medium leading-[14.6px]"
              >
                <a
                  href="https://citybus.taichung.gov.tw/ebus/fare/all"
                  target="_blank"
                  class="flex items-center justify-start gap-[9px]"
                >
                  <img src="@/assets/homepage/header/dollar-bag(375).svg" alt="" />
                  <p>票價查詢</p>
                </a>
                <RouterLink to="/contactus" class="flex items-center justify-start gap-[9px]">
                  <img src="@/assets/homepage/header/mailbox(375).svg" alt="" />
                  <p>意見信箱</p>
                </RouterLink>
                <RouterLink to="/lostproperty" class="flex items-center justify-start gap-[9px]">
                  <img src="@/assets/homepage/header/backpack(375).svg" alt="" />
                  <p>旅客遺失物</p>
                </RouterLink>
                <RouterLink
                  to="/businfo"
                  @click="handleSwitchBtn('taipei')"
                  class="flex items-center justify-start gap-[9px]"
                >
                  <img src="@/assets/homepage/header/busicon(375).svg" alt="" />
                  <p>豐原-臺北</p>
                </RouterLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="w-[989px] h-[104.76] mx-auto mt-32 hidden 2xl:block">
      <div class="grid grid-cols-4 px-[35px]">
        <a
          href="https://citybus.taichung.gov.tw/ebus/fare/all"
          target="_blank"
          class="flex flex-col items-center gap-[15px] border-r-4 border-r-gray-200"
        >
          <img :src="dollar" alt="" />
          <span
            class="relative bg-white btnlink text-base font-medium tracking-[2px] leading-6 z-10"
            >票價查詢</span
          >
        </a>
        <RouterLink
          to="/lostproperty"
          class="flex flex-col items-center gap-[15px] border-r-4 border-r-gray-200"
        >
          <img :src="backpack" alt="" />
          <span class="relative btnlink text-base font-medium tracking-[2px] leading-6 z-10"
            >旅客遺失物</span
          >
        </RouterLink>
        <RouterLink
          to="/contactus"
          class="flex flex-col items-center gap-[15px] border-r-4 border-r-gray-200"
        >
          <img :src="mailbox" alt="" />
          <span class="relative btnlink text-base font-medium tracking-[2px] leading-6 z-10"
            >意見信箱</span
          >
        </RouterLink>
        <RouterLink
          to="/businfo"
          @click="handleSwitchBtn('taipei')"
          class="flex flex-col items-center gap-[15px]"
        >
          <img :src="busicon" alt="" />
          <span class="relative btnlink text-base font-medium tracking-[2px] leading-6 z-10"
            >豐原-臺北線</span
          >
        </RouterLink>
      </div>
    </div>
  </header>
  <RouterView />
</template>
<style scoped>
.btnlink::after {
  position: absolute;
  content: '';
  width: 0;
  height: 100%;
  top: 0;
  right: 0;
  z-index: -1;
  background-color: #f5d32f;
  transition: all 0.3s ease;
}
.btnlink:hover::after {
  left: 0;
  width: 100%;
}
</style>
