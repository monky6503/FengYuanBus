<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { ref, computed, onMounted } from 'vue'
import { useButtonStore } from '@/stores/store.js'
import { useTokenStore } from '@/stores/token.js'
import { useBusinfoStore } from '@/stores/info.js'
import { useScheduleStore } from '@/stores/schedule.js'
import { gsap } from 'gsap'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'
import NavBar from '../components/homepage/NavBar.vue'
import FooterView from '../components/homepage/FooterView.vue'
import switchBusInter from '@/components/switchBusInter.vue'
import home from '@/assets/businfo/home.svg'
import flag from '@/assets/businfo/flag.svg'
import windowicon from '@/assets/businfo/window.svg'
import arrowdown from '@/assets/businfo/arrowdown.svg'
import pointer from '@/assets/businfo/pointer.svg'

const dir0timeweekdays = ref([]) //平日去程
const dir0timeweekends = ref([]) //假日去程
const dir1timeweekdays = ref([]) //平ㄖ返程
const dir1timeweekends = ref([]) //假日返程
const busweekdays = ref([]) //平日班距
const busweekends = ref([]) //假日班距
const isfreq = ref(false)
const selectedDirection = ref('go')
const direction0 = ref([]) //去程預估時間
const direction1 = ref([]) //返程預估時間
const timeleft = ref(30)
const scrollTo = () => {
  gsap.registerPlugin(ScrollToPlugin)
  gsap.to(window, { duration: 1, scrollTo: { y: '#needed', offsetY: 50 } })
}

const buttonStore = useButtonStore()
const handleSwitchBtn = (btn) => {
  buttonStore.updateSelectedBtn(btn)
}

const tokenStore = useTokenStore()
const token = computed(() => tokenStore.token)

const businfoStore = useBusinfoStore()
const routeNo = computed(() => businfoStore.routeNo)
const routeSE = computed(() => businfoStore.routeSE)

const scheduleStore = useScheduleStore()
const handleScheduleData = (data) => {
  scheduleStore.updateScheduleData(data)
}
const scheduleData = computed(() => scheduleStore.scheduleData)

onMounted(async () => {
  tokenStore.loadToken()
  businfoStore.loadInfo()
  await fetchBusSchedule(routeNo.value)
  await fetchBusEstimate(routeNo.value)
  clearData()
})

const fetchBusSchedule = async (route) => {
  try {
    const response = await fetch(
      `https://tdx.transportdata.tw/api/basic/v2/Bus/Schedule/City/Taichung/${route}?%24format=JSON`,
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token.value}`
        }
      }
    )

    const data = await response.json()
    handleScheduleData(data.filter((item) => item.RouteName.Zh_tw === route))
  } catch (error) {
    console.error('Error fetching bus data:', error)
  }
}

const fetchBusEstimate = async (route) => {
  try {
    const response = await fetch(
      `https://tdx.transportdata.tw/api/basic/v2/Bus/EstimatedTimeOfArrival/City/Taichung/${route}?%24format=JSON`,
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token.value}`
        }
      }
    )
    const data = await response.json()
    direction0.value = data
      .filter((item) => {
        return item.Direction === 0 && item.RouteName.Zh_tw === route
      })
      .sort((a, b) => {
        return a.StopSequence > b.StopSequence ? 1 : -1
      })
    direction1.value = data
      .filter((item) => {
        return item.Direction === 1 && item.RouteName.Zh_tw === route
      })
      .sort((a, b) => {
        return a.StopSequence > b.StopSequence ? 1 : -1
      })
    // handleEstimate(dir0, dir1)
  } catch (error) {
    console.error('Error fetching bus data:', error)
  }
}
const clearData = () => {
  if (scheduleData.value) {
    const d0 = scheduleData.value.filter((item) => item.Direction === 0)[0]
    const d1 = scheduleData.value.filter((item) => item.Direction === 1)[0]
    //timetable適用
    const timetable = (dir) => {
      if (!dir || !dir.Timetables) return { weekdays: [], weekends: [] }
      const times = dir.Timetables
      let weekdays = []
      let weekends = []
      times.forEach((time) => {
        if (time.TripID.startsWith('1')) {
          weekdays.push({
            tripid: parseInt(time.TripID.split('-')[1]),
            departstop: time.StopTimes[0].StopName.Zh_tw,
            departtime: time.StopTimes[0].DepartureTime
          })
        } else {
          weekends.push({
            tripid: parseInt(time.TripID.split('-')[1]),
            departstop: time.StopTimes[0].StopName.Zh_tw,
            departtime: time.StopTimes[0].DepartureTime
          })
        }
      })
      return { weekdays, weekends }
    }

    //frequency適用
    const frequency = (dir) => {
      if (!dir || !dir.Frequencys) return { weekdays: [], weekends: [] }
      const times = dir.Frequencys
      let weekdays = []
      let weekends = []
      times.forEach((time) => {
        if (time.ServiceDay.ServiceTag === '平常日') {
          weekdays.push({
            start: time.StartTime,
            end: time.EndTime,
            min: time.MinHeadwayMins,
            max: time.MaxHeadwayMins
          })
        } else if (time.ServiceDay.ServiceTag === '節假日') {
          weekends.push({
            start: time.StartTime,
            end: time.EndTime,
            min: time.MinHeadwayMins,
            max: time.MaxHeadwayMins
          })
        }
      })
      return { weekdays, weekends }
    }
    const keys = Object.keys(scheduleData.value[0])
    if (keys.includes('Timetables')) {
      isfreq.value = false
      if (d0) {
        const timetableData0 = timetable(d0)
        dir0timeweekdays.value = timetableData0.weekdays.sort((a, b) => a.tripid - b.tripid)
        dir0timeweekends.value = timetableData0.weekends.sort((a, b) => a.tripid - b.tripid)
      }
      if (d1) {
        const timetableData1 = timetable(d1)
        dir1timeweekdays.value = timetableData1.weekdays.sort((a, b) => a.tripid - b.tripid)
        dir1timeweekends.value = timetableData1.weekends.sort((a, b) => a.tripid - b.tripid)
      }
    } else if (keys.includes('Frequencys')) {
      isfreq.value = true
      if (d1) {
        const frequencyData1 = frequency(d1)
        busweekdays.value = frequencyData1.weekdays
        busweekends.value = frequencyData1.weekends
      }
    }
  }
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

const switchDirection = (button) => {
  selectedDirection.value = button
}

setInterval(() => {
  fetchBusEstimate(routeNo.value), clearData()
}, 30000)
updateTime()
</script>
<template>
  <NavBar />
  <div class="w-full lg:w-[989px] mx-auto mb-72 lg:pt-[100px] pt-[57px]">
    <div
      class="w-full h-[65.95px] sm:h-[173px] bg-[#EFEFEF] mx-auto flex justify-center items-center gap-6 p-[10px]"
    >
      <span class="text-lg sm:text-5xl font-semibold font-SerifTC pb-1">{{ routeNo }}</span>
      <span class="text-lg sm:text-5xl font-semibold font-SerifTC pb-1">{{ routeSE }}</span>
    </div>
    <div
      class="w-full breadcrumbs text-base font-medium leading-[150%] mx-auto px-[30px] py-[15px]"
    >
      <ul class="text-[#818181] gap-3 flex flex-wrap">
        <li>
          <RouterLink to="/" class="gap-2">
            <img :src="home" alt="" />
            首頁
          </RouterLink>
        </li>
        <li class="flex gap-3">
          <RouterLink to="/businfo" @click="handleSwitchBtn('bus')" class="gap-2">
            乘車資訊
          </RouterLink>
        </li>
        <li class="flex gap-3">
          <RouterLink to="/businfo" @click="handleSwitchBtn('bus')" class="gap-2">
            市區公車
          </RouterLink>
        </li>
        <li class="flex gap-3">
          <span class="inline-flex items-center gap-2 text-[#108313]"> {{ routeNo }}路 </span>
        </li>
      </ul>
    </div>
    <div class="flex flex-col gap-[58px] mb-32">
      <div class="flex flex-col gap-[15px]">
        <switchBusInter :switchBtnFun="handleSwitchBtn" />
        <div class="flex justify-start lg:justify-end px-[21px]">
          <div class="flex gap-4 items-end px-2">
            <button @click="scrollTo">
              <span
                class="text-base font-medium font-SansTC text-[#108313] underline decoration-[#108313] underline-offset-4"
                >搭乘須知</span
              >
            </button>
            <a
              href="https://citybus.taichung.gov.tw/ebus/fare/all"
              target="_blank"
              class="flex gap-[7px] border-l border-[#B3B3B3] px-[10px]"
            >
              <span
                class="text-base font-medium font-SansTC text-[#108313] underline decoration-[#108313] underline-offset-4"
                >票價查詢系統</span
              >
              <img :src="windowicon" alt="" />
            </a>
          </div>
        </div>
        <div class="flex flex-col md:flex-row items-center justify-center gap-5 pt-9">
          <button
            @click="switchDirection('go')"
            :class="
              selectedDirection === 'go'
                ? 'bg-[#4f5ed2]  text-white '
                : 'bg-white border-2 border-[#969ee9] text-[#969ee9]'
            "
            class="w-[300px] h-[45px] text-lg font-medium leading-[150%] rounded-full px-5 py-2"
          >
            往{{ routeSE.split('-').pop() }}
          </button>
          <button
            @click="switchDirection('back')"
            :class="
              selectedDirection === 'back'
                ? 'bg-[#4f5ed2]  text-white'
                : 'bg-white border-2 border-[#969ee9] text-[#969ee9]'
            "
            class="w-[300px] h-[45px] text-lg font-medium leading-[150%] rounded-full px-5 py-2"
          >
            往{{ routeSE.split('-').shift() }}
          </button>
        </div>
      </div>
      <div v-if="selectedDirection === 'go'">
        <div class="w-full lg:w-[860px] collapse mx-auto mb-[86px]">
          <input type="checkbox" class="peer" />
          <div
            class="collapse-title bg-white text-[#818181] text-center flex flex-col gap-[17px] px-4"
          >
            <span class="text-base font-medium leading-[150%]">發車時刻表</span>
            <div class="flex gap-[1px]">
              <hr class="w-1/2 lg:w-[410px] border-[#818181]" />
              <img :src="arrowdown" alt="" class="arrow px-[10px] pb-[10px]" />
              <hr class="w-1/2 lg:w-[410px] border-[#818181]" />
            </div>
          </div>
          <div
            v-if="!isfreq"
            class="collapse-content bg-white text-[#818181] peer-checked:border-b peer-checked:border-[#818181] px-12"
          >
            <div>平日</div>
            <span
              v-for="index in dir0timeweekdays.length"
              :key="index"
              class="text-center text-lg font-SansTC font-medium text-black"
              >{{
                dir0timeweekdays[index - 1] !== undefined
                  ? dir0timeweekdays[index - 1].departtime
                  : ''
              }}&nbsp;&nbsp;
            </span>
            <div>假日</div>
            <span
              v-for="index in dir0timeweekends.length"
              :key="index"
              class="text-center text-lg font-SansTC font-medium text-black"
              >{{
                dir0timeweekends[index - 1] !== undefined
                  ? dir0timeweekends[index - 1].departtime
                  : ''
              }}&nbsp;&nbsp;
            </span>
          </div>
          <div
            v-else
            class="collapse-content bg-white text-[#818181] peer-checked:border-b peer-checked:border-[#818181]"
          >
            <div>平日</div>
            <div
              v-for="(time, index) in busweekdays"
              :key="index"
              class="flex justify-center gap-3 text-center text-lg font-SansTC font-medium text-black"
            >
              <span>{{ time.start }}~{{ time.end }}</span>
              <span>每{{ time.min }}~{{ time.max }}分鐘一班</span>
            </div>
            <div>假日</div>
            <div
              v-for="(time, index) in busweekends"
              :key="index"
              class="flex justify-center gap-3 text-center text-lg font-SansTC font-medium text-black"
            >
              <span>{{ time.start }}~{{ time.end }}</span>
              <span>每{{ time.min }}~{{ time.max }}分鐘一班</span>
            </div>
          </div>
        </div>
        <div class="flex items-center gap-[10px] px-8 pb-5">
          <img :src="pointer" alt="" />
          <span class="text-base font-medium leading-[150%]">{{ timeleft }}秒前更新</span>
        </div>
        <div
          class="w-[810px] mx-auto flex-wrap gap-y-0 route-container hidden lg:flex"
          :class="[
            direction0.length <= 9
              ? 'justify-start'
              : Math.floor(direction0.length / 9) % 2 !== 0
                ? 'justify-end'
                : 'justify-start'
          ]"
        >
          <div
            v-for="(stop, index) in reorder(direction0)"
            :key="index"
            :class="{
              reverse: Math.floor(index / 9) % 2 === 1,
              'turn-right':
                index > 0 &&
                index % 9 === 0 &&
                !(
                  index === direction0.length - 1 &&
                  Math.floor((direction0.length - 1) / 9) % 2 === 1
                ),
              'turn-left':
                index > 0 &&
                (index + 1) % 9 === 0 &&
                !(
                  index === direction0.length - 1 &&
                  Math.floor((direction0.length - 1) / 9) % 2 === 1
                ),
              'last-element':
                index >=
                direction0.length - (direction0.length % 9 === 0 ? 1 : direction0.length % 9)
            }"
            class="relative w-[90px] h-[119px] flex items-center my-5"
          >
            <div
              class="dot self-center outline outline-4"
              :class="{
                'outline-[#2B40C7]':
                  stop.Estimates &&
                  stop.Estimates.length > 0 &&
                  stop.Estimates[0].EstimateTime / 60 < 3
              }"
            ></div>
            <div class="line"></div>
            <a
              :href="`https://www.google.com/maps/search/?api=1&query=${stop.StopName.Zh_tw}`"
              target="_blank"
              class="w-11/12 absolute left-1/2 top-[0%] -translate-x-1/2 text-sm text-center font-medium leading-[150%]"
              :class="{
                'text-[#2B40C7]':
                  stop.Estimates &&
                  stop.Estimates.length > 0 &&
                  stop.Estimates[0].EstimateTime / 60 < 3
              }"
            >
              {{ stop.StopName.Zh_tw }}
            </a>
            <div
              class="w-11/12 absolute left-1/2 bottom-[20%] -translate-x-1/2 text-sm text-center"
            >
              <span class="text-xs font-light leading-[150%]">{{
                stop.PlateNumb === '' && !stop.NextBusTime && !stop.Estimates
                  ? '末班已駛離'
                  : stop.PlateNumb === ''
                    ? stop.NextBusTime.split('T')[1].split('+')[0]
                    : stop.Estimates[0].EstimateTime / 60 < 3
                      ? '進站中'
                      : stop.Estimates[0].EstimateTime / 60 + '分'
              }}</span>
            </div>
          </div>
        </div>
        <div
          class="w-[286px] mx-auto m-0 flex flex-col justify-center items-start gap-20 lg:hidden route-container"
        >
          <div
            v-for="(stop, index) in direction0"
            :key="index"
            class="relative flex justify-start items-center gap-10"
            :class="{ 'last-element': index === direction0.length - 1 }"
          >
            <div>
              <div
                class="dot self-center outline outline-4"
                :class="{
                  'outline-[#2B40C7]':
                    stop.Estimates &&
                    stop.Estimates.length > 0 &&
                    stop.Estimates[0].EstimateTime / 60 < 3
                }"
              ></div>
              <div class="line"></div>
              <div class="w-16 absolute left-0 top-0 ml-10 -mt-3">
                <span
                  class="text-sm font-medium leading-[150%] whitespace-wrap"
                  :class="{
                    'text-[#2B40C7]':
                      stop.Estimates &&
                      stop.Estimates.length > 0 &&
                      stop.Estimates[0].EstimateTime / 60 < 3
                  }"
                >
                  {{ stop.StopName.Zh_tw }}
                </span>
              </div>
              <div class="absolute left-0 top-0 text-sm text-center ml-40 -mt-3">
                <span class="text-sm font-medium leading-[150%] whitespace-nowrap">{{
                  stop.PlateNumb === '' && !stop.NextBusTime && !stop.Estimates
                    ? '末班已駛離'
                    : stop.PlateNumb === ''
                      ? stop.NextBusTime.split('T')[1].split('+')[0]
                      : stop.Estimates[0].EstimateTime / 60 < 3
                        ? '進站中'
                        : stop.Estimates[0].EstimateTime / 60 + '分'
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
      <div v-else>
        <div class="w-full lg:w-[860px] bg-base-200 collapse mx-auto mb-[86px]">
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
            v-if="!isfreq"
            class="collapse-content bg-white text-[#818181] peer-checked:border-b peer-checked:border-[#818181] px-12"
          >
            <div>平日</div>
            <span
              v-for="index in dir1timeweekdays.length"
              :key="index"
              class="text-center text-lg font-SansTC font-medium text-black"
              >{{
                dir1timeweekdays[index - 1] !== undefined
                  ? dir1timeweekdays[index - 1].departtime
                  : ''
              }}&nbsp;&nbsp;
            </span>
            <div>假日</div>
            <span
              v-for="index in dir1timeweekends.length"
              :key="index"
              class="text-center text-lg font-SansTC font-medium text-black"
              >{{
                dir1timeweekends[index - 1] !== undefined
                  ? dir1timeweekends[index - 1].departtime
                  : ''
              }}&nbsp;&nbsp;
            </span>
          </div>
          <div
            v-else
            class="collapse-content bg-white text-[#818181] peer-checked:border-b peer-checked:border-[#818181]"
          >
            <div>平日</div>
            <div
              v-for="(time, index) in busweekdays"
              :key="index"
              class="flex justify-center gap-3 text-center text-lg font-SansTC font-medium text-black"
            >
              <span>{{ time.start }}~{{ time.end }}</span>
              <span>每{{ time.min }}~{{ time.max }}分鐘一班</span>
            </div>
            <div>假日</div>
            <div
              v-for="(time, index) in busweekends"
              :key="index"
              class="flex justify-center gap-3 text-center text-lg font-SansTC font-medium text-black"
            >
              <span>{{ time.start }}~{{ time.end }}</span>
              <span>每{{ time.min }}~{{ time.max }}分鐘一班</span>
            </div>
          </div>
        </div>
        <div class="flex items-center gap-[10px] px-8 pb-5">
          <img :src="pointer" alt="" />
          <span class="text-base font-medium leading-[150%]">{{ timeleft }}秒前更新</span>
        </div>
        <div
          class="w-[810px] mx-auto flex-wrap gap-y-0 route-container hidden lg:flex"
          :class="[
            direction1.length <= 9
              ? 'justify-start'
              : Math.floor(direction1.length / 9) % 2 !== 0
                ? 'justify-end'
                : 'justify-start'
          ]"
        >
          <div
            v-for="(stop, index) in reorder(direction1)"
            :key="index"
            :class="{
              reverse: Math.floor(index / 9) % 2 === 1,
              'turn-right':
                index > 0 &&
                index % 9 === 0 &&
                !(
                  index === direction1.length - 1 &&
                  Math.floor((direction1.length - 1) / 9) % 2 === 1
                ),
              'turn-left':
                index > 0 &&
                (index + 1) % 9 === 0 &&
                !(
                  index === direction1.length - 1 &&
                  Math.floor((direction1.length - 1) / 9) % 2 === 1
                ),
              'last-element':
                index >
                direction1.length - 1 - (direction1.length % 9 === 0 ? 1 : direction1.length % 9)
            }"
            class="relative w-[90px] h-[119px] flex items-center my-5"
          >
            <div
              class="dot self-center outline outline-4"
              :class="{
                'outline-[#2B40C7]':
                  stop.Estimates &&
                  stop.Estimates.length > 0 &&
                  stop.Estimates[0].EstimateTime / 60 < 3
              }"
            ></div>
            <div class="line"></div>
            <a
              :href="`https://www.google.com/maps/search/?api=1&query=${stop.StopName.Zh_tw}`"
              target="_blank"
              class="w-11/12 absolute left-1/2 top-[0%] -translate-x-1/2 text-sm text-center font-medium leading-[150%]"
              :class="{
                'text-[#2B40C7]':
                  stop.Estimates &&
                  stop.Estimates.length > 0 &&
                  stop.Estimates[0].EstimateTime / 60 < 3
              }"
            >
              {{ stop.StopName.Zh_tw }}
            </a>
            <div
              class="w-11/12 absolute left-1/2 bottom-[20%] -translate-x-1/2 text-sm text-center"
            >
              <span class="text-xs font-light leading-[150%]">{{
                stop.PlateNumb === '' && !stop.NextBusTime && !stop.Estimates
                  ? '末班已駛離'
                  : stop.PlateNumb === ''
                    ? stop.NextBusTime.split('T')[1].split('+')[0]
                    : stop.Estimates[0].EstimateTime / 60 < 3
                      ? '進站中'
                      : stop.Estimates[0].EstimateTime / 60 + '分'
              }}</span>
            </div>
          </div>
        </div>
        <div
          class="w-[286px] mx-auto m-0 flex flex-col justify-center items-start gap-20 lg:hidden route-container"
        >
          <div
            v-for="(stop, index) in direction1"
            :key="index"
            class="relative flex justify-start items-center gap-10"
            :class="{ 'last-element': index === direction1.length - 1 }"
          >
            <div>
              <div
                class="dot self-center outline outline-4"
                :class="{
                  'outline-[#2B40C7]':
                    stop.Estimates &&
                    stop.Estimates.length > 0 &&
                    stop.Estimates[0].EstimateTime / 60 < 3
                }"
              ></div>
              <div class="line"></div>
              <div class="w-16 absolute left-0 top-0 ml-10 -mt-3">
                <span
                  class="text-sm font-medium leading-[150%] whitespace-wrap"
                  :class="{
                    'text-[#2B40C7]':
                      stop.Estimates &&
                      stop.Estimates.length > 0 &&
                      stop.Estimates[0].EstimateTime / 60 < 3
                  }"
                >
                  {{ stop.StopName.Zh_tw }}
                </span>
              </div>
              <div class="absolute left-0 top-0 text-sm text-center ml-40 -mt-3">
                <span class="text-sm font-medium leading-[150%] whitespace-nowrap">{{
                  stop.PlateNumb === '' && !stop.NextBusTime && !stop.Estimates
                    ? '末班已駛離'
                    : stop.PlateNumb === ''
                      ? stop.NextBusTime.split('T')[1].split('+')[0]
                      : stop.Estimates[0].EstimateTime / 60 < 3
                        ? '進站中'
                        : stop.Estimates[0].EstimateTime / 60 + '分'
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
              class="w-full lg:w-[737px] text-base text-[#818181] font-medium leading-[150%] px-[30px] py-[10px] sm:pl-24 sm:py-[35px] list-disc list-outside"
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
