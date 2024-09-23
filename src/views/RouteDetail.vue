<script>
export default {
  data() {
    return {
      info: JSON.parse(localStorage.getItem('Info')) || '',
      token: localStorage.getItem('Token'),
      stopList: '',
      scheduleData: '',
      dir0timeweekdays: [], //平日去程
      dir0timeweekends: [], //假日去程
      dir1timeweekdays: [], //平ㄖ返程
      dir1timeweekends: [], //假日返程
      busweekdays: [], //平日班距
      busweekends: [], //假日班距
      isfreq: false
    }
  },
  mounted() {
    this.loadData()
  },
  methods: {
    async loadData() {
      await this.fetchButStops(this.info.RouteNo)
      await this.fetchBusSchedule(this.info.RouteNo)
      // console.log(this.scheduleData)
      this.clearData()
    },
    async fetchButStops(route) {
      try {
        const response = await fetch(
          `https://tdx.transportdata.tw/api/basic/v2/Bus/DisplayStopOfRoute/City/Taichung/${route}?%24format=JSON`,
          {
            method: 'GET',
            headers: {
              Accept: 'application/json',
              Authorization: `Bearer ${this.token}`
            }
          }
        )
        const data = await response.json()
        this.stopList = data
        this.stopList = this.stopList.filter((item) => item.RouteName.Zh_tw === route)
      } catch (error) {
        console.error('Error fetching bus data:', error)
      }
    },
    async fetchBusSchedule(route) {
      try {
        const response = await fetch(
          `https://tdx.transportdata.tw/api/basic/v2/Bus/Schedule/City/Taichung/${route}?%24format=JSON`,
          {
            method: 'GET',
            headers: {
              Accept: 'application/json',
              Authorization: `Bearer ${this.token}`
            }
          }
        )

        const data = await response.json()
        this.scheduleData = data
        this.scheduleData = this.scheduleData.filter((item) => item.RouteName.Zh_tw === route)
      } catch (error) {
        console.error('Error fetching bus data:', error)
      }
    },
    clearData() {
      const d0 = this.scheduleData.filter((item) => item.Direction === 0)[0]
      const d1 = this.scheduleData.filter((item) => item.Direction === 1)[0]
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
      const keys = Object.keys(this.scheduleData[0])
      if (keys.includes('Timetables')) {
        this.isfreq = false
        if (d0) {
          const timetableData0 = timetable(d0)
          this.dir0timeweekdays = timetableData0.weekdays.sort((a, b) => a.tripid - b.tripid)
          this.dir0timeweekends = timetableData0.weekends.sort((a, b) => a.tripid - b.tripid)
        }
        if (d1) {
          const timetableData1 = timetable(d1)
          this.dir1timeweekdays = timetableData1.weekdays.sort((a, b) => a.tripid - b.tripid)
          this.dir1timeweekends = timetableData1.weekends.sort((a, b) => a.tripid - b.tripid)
        }
      } else if (keys.includes('Frequencys')) {
        this.isfreq = true
        if (d1) {
          const frequencyData1 = frequency(d1)
          this.busweekdays = frequencyData1.weekdays
          this.busweekends = frequencyData1.weekends
        }
      }
    },
    maxLength(obj1, obj2) {
      return Math.max(obj1.length, obj2.length)
    }
  }
}
</script>

<template>
  <div class="w-full flex flex-col xl:flex-row items-center xl:items-start justify-center">
    <div v-if="stopList" class="w-2/5">
      <div v-if="stopList.length === 2" class="flex items-start justify-center gap-5 py-5">
        <div class="flex flex-col justify-center items-center gap-2">
          <router-link to="/" class="btn whitespace-nowrap">回首頁</router-link>
          <router-link to="/routeview" class="btn whitespace-nowrap">回上頁</router-link>
          <h1 class="text-3xl">{{ stopList[0].RouteName.Zh_tw }}</h1>
        </div>
        <div>
          <h2 class="text-2xl text-center">去程</h2>
          <ul class="text-center">
            <li v-for="(stop, index) in stopList[0].Stops" :key="index" class="px-2 py-1">
              <a
                :href="`https://www.google.com/maps?q=${stop.StopPosition.PositionLat},${stop.StopPosition.PositionLon}`"
                target="_blank"
                class="no-underline decoration-red-500 hover:text-red-500 hover:underline underline-offset-4 transition-all ease-in duration-200"
              >
                {{ stop.StopName.Zh_tw }}
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h2 class="text-2xl text-center">返程</h2>
          <ul class="text-center">
            <li v-for="(stop, index) in stopList[1].Stops" :key="index" class="px-2 py-1">
              <a
                :href="`https://www.google.com/maps?q=${stop.StopPosition.PositionLat},${stop.StopPosition.PositionLon}`"
                target="_blank"
                class="no-underline decoration-red-500 hover:text-red-500 hover:underline underline-offset-4 transition-all ease-in duration-200"
              >
                {{ stop.StopName.Zh_tw }}
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div v-else class="flex items-start justify-center gap-5 py-5">
        <div class="flex justify-center items-center">
          <button @click="goHome" type="button" class="btn whitespace-nowrap">回首頁</button>
          <button @click="goBack" type="button" class="btn ml-5">回上頁</button>
          <h1 class="text-3xl">{{ stopList[0].RouteName.Zh_tw }}</h1>
        </div>
        <div>
          <h2 class="text-2xl">去程</h2>
          <ul>
            <li v-for="(stop, index) in stopList[0].Stops" :key="index">
              {{ stop.StopName.Zh_tw }}
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div v-if="scheduleData" class="w-2/5 py-5">
      <div v-show="!isfreq">
        <div class="overflow-x-visible mb-5">
          <h2 class="text-center text-2xl">平日</h2>
          <table class="table text-center">
            <thead class="text-sm text-black bg-slate-300">
              <tr>
                <th class="w-1/2 text-base break-all">
                  {{ dir0timeweekdays[0] !== undefined ? dir0timeweekdays[0]['departstop'] : '' }}
                </th>
                <th class="w-1/2 text-base break-all">
                  {{ dir1timeweekdays[0] !== undefined ? dir1timeweekdays[0]['departstop'] : '' }}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="index in maxLength(dir0timeweekdays, dir1timeweekdays)" :key="index">
                <td>
                  {{
                    dir0timeweekdays[index - 1] !== undefined
                      ? dir0timeweekdays[index - 1].departtime
                      : ''
                  }}
                </td>
                <td>
                  {{
                    dir1timeweekdays[index - 1] !== undefined
                      ? dir1timeweekdays[index - 1].departtime
                      : ''
                  }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="overflow-x-visible">
          <h2 class="text-center text-2xl">例假日及寒暑假</h2>
          <table class="table text-center">
            <thead class="text-sm text-black bg-slate-300">
              <tr>
                <th class="w-1/2 text-base break-all">
                  {{ dir0timeweekends[0] !== undefined ? dir0timeweekends[0]['departstop'] : '' }}
                </th>
                <th class="w-1/2 text-base break-all">
                  {{ dir1timeweekends[0] !== undefined ? dir1timeweekends[0]['departstop'] : '' }}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="index in maxLength(dir0timeweekends, dir1timeweekends)" :key="index">
                <td>
                  {{
                    dir0timeweekends[index - 1] !== undefined
                      ? dir0timeweekends[index - 1].departtime
                      : ''
                  }}
                </td>
                <td>
                  {{
                    dir1timeweekends[index - 1] !== undefined
                      ? dir1timeweekends[index - 1].departtime
                      : ''
                  }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div v-show="isfreq">
        <div class="overflow-x-visible mb-5">
          <h2 class="text-center text-2xl">平日班距</h2>
          <table class="table text-center">
            <thead class="text-sm text-black bg-slate-300">
              <tr>
                <th class="w-1/2 text-base break-all">時段</th>
                <th class="w-1/2 text-base break-all">班距</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(time, index) in busweekdays" :key="index">
                <td>{{ time.start }}~{{ time.end }}</td>
                <td>每{{ time.min }}~{{ time.max }}分鐘一班</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="overflow-x-visible">
          <h2 class="text-center text-2xl">例假日及寒暑假班距</h2>
          <table class="table text-center">
            <thead class="text-sm text-black bg-slate-300">
              <tr>
                <th class="w-1/2 text-base break-all">時段</th>
                <th class="w-1/2 text-base break-all">班距</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(time, index) in busweekends" :key="index">
                <td>{{ time.start }}~{{ time.end }}</td>
                <td>每{{ time.min }}~{{ time.max }}分鐘一班</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
