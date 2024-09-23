<script>
export default {
  data() {
    return {
      info: JSON.parse(localStorage.getItem('Info')) || '',
      token: localStorage.getItem('Token'),
      direction0: [],
      direction1: [],
      timeleft: 30
    }
  },
  mounted() {
    this.fetchBusEstimate(this.info.RouteNo)
    setInterval(() => {
      this.fetchBusEstimate(this.info.RouteNo)
    }, 30000)
    this.updateTime()
  },
  methods: {
    async fetchBusEstimate(route) {
      try {
        const response = await fetch(
          `https://tdx.transportdata.tw/api/basic/v2/Bus/EstimatedTimeOfArrival/City/Taichung/${route}?%24format=JSON`,
          {
            method: 'GET',
            headers: {
              Accept: 'application/json',
              Authorization: `Bearer ${this.token}`
            }
          }
        )
        const data = await response.json()
        this.direction0 = data
          .filter((item) => {
            return item.Direction === 0 && item.RouteName.Zh_tw === route
          })
          .sort((a, b) => {
            return a.StopSequence > b.StopSequence ? 1 : -1
          })
        this.direction1 = data
          .filter((item) => {
            return item.Direction === 1 && item.RouteName.Zh_tw === route
          })
          .sort((a, b) => {
            return a.StopSequence > b.StopSequence ? 1 : -1
          })
      } catch (error) {
        console.error('Error fetching bus data:', error)
      }
    },
    goBack() {
      this.$router.push('/routeview')
    },
    updateTime() {
      setInterval(() => {
        this.timeleft > 0 ? this.timeleft-- : (this.timeleft = 30)
      }, 1000)
    }
  }
}
</script>

<template>
  <div class="flex flex-col justify-center items-center">
    <div>
      <button @click="goBack" class="btn mx-auto">回上頁</button>
      <span>{{ timeleft }}秒前更新</span>
    </div>
    <div class="flex items-start justify-center gap-5">
      <ul class="px-5">
        <li
          v-for="(stop, index) in direction0"
          :key="index"
          class="flex items-center justify-between gap-5"
        >
          <span>{{
            stop.PlateNumb === '' && !stop.NextBusTime && !stop.Estimates
              ? '末班已駛離'
              : stop.PlateNumb === ''
                ? stop.NextBusTime.split('T')[1].split('+')[0]
                : stop.Estimates[0].EstimateTime / 60 + '分'
          }}</span>
          <span class="w-52">{{ stop.StopName.Zh_tw }}</span>
        </li>
      </ul>
      <ul class="px-5">
        <li
          v-for="(stop, index) in direction1"
          :key="index"
          class="flex items-center justify-between gap-5"
        >
          <span>{{
            stop.PlateNumb === '' && !stop.NextBusTime && !stop.Estimates
              ? '末班已駛離'
              : stop.PlateNumb === ''
                ? stop.NextBusTime.split('T')[1].split('+')[0]
                : stop.Estimates[0].EstimateTime / 60 + '分'
          }}</span>
          <span class="w-52">{{ stop.StopName.Zh_tw }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>
