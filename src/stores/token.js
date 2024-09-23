import { defineStore } from 'pinia'

export const useTokenStore = defineStore('tokenStore', {
  state: () => ({
    token: ''
  }),
  actions: {
    updateToken(token) {
      this.token = token
      this.saveToken()
    },
    saveToken() {
      localStorage.setItem('tokenStore', JSON.stringify(this.$state))
    },
    loadToken() {
      const data = localStorage.getItem('tokenStore')
      if (data) {
        this.$state = JSON.parse(data)
      }
    }
  }
})
