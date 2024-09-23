import { defineStore } from 'pinia'

export const useBusinfoStore = defineStore('infoStore', {
  state: () => ({
    routeNo: '',
    routeSE: ''
  }),
  actions: {
    updateInfoRoute(route, startend) {
      this.routeNo = route
      this.routeSE = startend
      this.saveInfo()
    },
    saveInfo() {
      localStorage.setItem('infoStore', JSON.stringify(this.$state))
    },
    loadInfo() {
      const data = localStorage.getItem('infoStore')
      if (data) {
        this.$state = JSON.parse(data)
      }
    }
  }
})
