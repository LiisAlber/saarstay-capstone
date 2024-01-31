import { trpc } from '../trpc'

export async function fetchAvailability(checkInDate: string, checkOutDate: string) {
  try {
    const response = await trpc.bookings.availability.query({ checkInDate, checkOutDate })

    // Transform the response into an array
    if (!Array.isArray(response)) {
      return [{ date: checkInDate, isAvailable: response.isAvailable }]
    }

    return response
  } catch (error) {
    console.error('Error fetching availability:', error)
    throw error
  }
}
