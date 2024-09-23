import { defineStore } from 'pinia'

export const useScheduleStore = defineStore('scheduleStore', {
  state: () => ({
    scheduleData: []
  }),
  actions: {
    updateScheduleData(data) {
      this.scheduleData = data
    }
  }
})
