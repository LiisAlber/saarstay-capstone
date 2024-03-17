import { trpc } from '../trpc'
import log from 'loglevel'

export async function fetchAvailability(checkInDate: string, checkOutDate: string) {
  try {
    const response = await trpc.bookings.availability.query({ checkInDate, checkOutDate })

    // Transform the response into an array
    if (!Array.isArray(response)) {
      return [{ date: checkInDate, isAvailable: response.isAvailable }]
    }

    return response
  } catch (error) {
    log.error('Error fetching availability:', error)
    throw error
  }
}
