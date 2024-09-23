import { defineStore } from 'pinia'

export const useButtonStore = defineStore('buttonStore', {
  state: () => ({
    selectedBtn: 'bus',
    selectedState: 'all'
  }),
  actions: {
    updateSelectedBtn(btn) {
      this.selectedBtn = btn
    },
    updateSelectedState(state) {
      this.selectedState = state
      this.saveState()
    },
    saveState() {
      localStorage.setItem('buttonStore', JSON.stringify(this.$state))
    },
    loadState() {
      const data = localStorage.getItem('buttonStore')
      if (data) {
        this.$state = JSON.parse(data)
      }
    }
  }
})
