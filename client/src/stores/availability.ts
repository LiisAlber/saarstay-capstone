import { defineStore } from 'pinia'
import { fetchAvailability } from '../utils/trpcClient'

export const useAvailabilityStore = defineStore('availability', {
  state: () => ({
    dates: [] as Array<{ date: string; isAvailable: boolean }>,
  }),
  actions: {
    async checkAvailability(checkInDate: string, checkOutDate: string) {
      try {
        const response = await fetchAvailability(checkInDate, checkOutDate)
        this.dates = response // Store the dates in the state
      } catch (error) {
        console.error('Error fetching availability:', error)
        throw error
      }
    },
  },
})
