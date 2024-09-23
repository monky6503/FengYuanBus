<script>
export default {
  data() {
    return {
      busData: JSON.parse(localStorage.getItem('busData')) || [],
      filterData: '',
      scheduleData: '',
      busNumber: '',
      token: '',
      info: { RouteNo: null },
      suspendedRoutes: ['865', '865區', '866區2']
    }
  },
  created() {
    this.fetchAccessToken()
  },
  mounted() {
    this.fetchBusRoute()
  },
  methods: {
    async fetchAccessToken() {
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
        this.token = data.access_token
        localStorage.setItem('Token', this.token)
        this.fetchBusRoute()
      } catch (error) {
        console.error('Error fetching access token:', error)
      }
    },

    async fetchBusRoute() {
      try {
        const response = await fetch(
          'https://tdx.transportdata.tw/api/advanced/v2/Bus/Route/City/Taichung/OperatorNo/1801?%24format=JSON',
          {
            method: 'GET',
            headers: {
              Accept: 'application/json',
              Authorization: `Bearer ${this.token}`
            }
          }
        )
        const data = await response.json()
        this.busData = data
        this.busData.sort((a, b) => {
          let numA = parseInt(a.RouteName.Zh_tw.match(/^\d+/)[0])
          let numB = parseInt(b.RouteName.Zh_tw.match(/^\d+/)[0])
          return numA > numB ? 1 : numA < numB ? -1 : 0
        })
        localStorage.setItem('busData', JSON.stringify(this.busData))
      } catch (error) {
        console.error('Error fetching bus data:', error)
      }
    },
    check(route) {
      this.info.RouteNo = route
      localStorage.setItem('Info', JSON.stringify(this.info))
    },
    search() {
      if (this.busNumber) {
        this.busData = this.busData.filter((item) => {
          return item.RouteName.Zh_tw === this.busNumber
        })
        this.filterData = ''
      } else {
        this.$swal.fire({
          icon: 'error',
          title: '請輸入正確的路線'
        })
      }
    },
    reset() {
      this.fetchBusRoute()
      this.busNumber = ''
      this.filterData = ''
    },
    filterSuggestions() {
      const regx = new RegExp(this.busNumber, 'i')
      this.filterData = this.busData.filter((data) => {
        return regx.test(data.RouteName.Zh_tw)
      })
    },
    timeEstimate(route) {
      this.info.RouteNo = route
      localStorage.setItem('Info', JSON.stringify(this.info))
    },
    isRouteSuspended(routeNumber) {
      return this.suspendedRoutes.includes(routeNumber)
    }
  }
}
</script>

<template>
  <div class="flex justify-center items-center py-2">
    <router-link to="/" class="btn">回上頁</router-link>
  </div>
  <div class="w-full sm:w-3/4 lg:w-1/2 mx-auto px-5 py-5">
    <label class="input input-bordered w-full flex items-center justify-center gap-2 mb-3">
      <input
        v-model="busNumber"
        @input="filterSuggestions"
        type="text"
        class="w-full"
        placeholder="Search"
      />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 16 16"
        fill="currentColor"
        class="h-4 w-4 opacity-70"
      >
        <path
          fill-rule="evenodd"
          d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
          clip-rule="evenodd"
        />
      </svg>
    </label>
    <div class="full flex items-center justify-center gap-5 px-3">
      <button @click="search" class="btn btn-neutral text-white w-1/2">搜尋</button>
      <button @click="reset" class="btn btn-neutral text-white w-1/2">重置</button>
    </div>
  </div>
  <div class="overflow-x-visible w-full sm:w-3/4 lg:w-1/2 mx-auto px-5 py-5">
    <table class="table text-center">
      <thead class="text-lg text-black bg-slate-300">
        <tr>
          <th>路線</th>
          <th>起迄站</th>
          <th>詳細站址</th>
          <th>動態查詢</th>
        </tr>
      </thead>
      <tbody class="text-base">
        <tr
          v-for="item in filterData.length === 0 ? busData : filterData"
          :key="item.RouteUID"
          class="hover border-b-2 border-b-gray-300"
        >
          <td>{{ item.RouteName.Zh_tw }}</td>
          <td>
            {{ item.SubRoutes[0].Headsign }}
            <br />
            <span class="text-red-500">{{
              isRouteSuspended(item.RouteName.Zh_tw) ? '已停駛' : null
            }}</span>
          </td>
          <td>
            <!-- <button @click="check(item.RouteName.Zh_tw)" type="button" class="btn btn-outline">
              查看
            </button> -->
            <router-link
              to="/routedetail"
              @click="check(item.RouteName.Zh_tw)"
              class="btn btn-outline"
              >查看</router-link
            >
          </td>
          <td>
            <!-- <button
              @click="timeEstimate(item.RouteName.Zh_tw)"
              type="button"
              class="btn btn-outline"
            >
              查看
            </button> -->
            <router-link
              to="/routeestimate"
              @click="timeEstimate(item.RouteName.Zh_tw)"
              class="btn btn-outline"
              >查看</router-link
            >
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
