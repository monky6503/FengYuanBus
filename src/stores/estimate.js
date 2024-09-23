import { defineStore } from 'pinia'

export const useEstimateStore = defineStore('estimateStore', {
  state: () => ({
    direction0: [],
    direction1: []
  }),
  actions: {
    updateEstimate(dir0, dir1) {
      this.direction0 = dir0
      this.direction1 = dir1
      this.saveEstimate()
    },
    saveEstimate() {
      localStorage.setItem('estimateStore', JSON.stringify(this.$state))
    },
    loadEstimate() {
      const data = localStorage.getItem('estimateStore')
      if (data) {
        this.$state = JSON.parse(data)
      }
    }
  }
})
