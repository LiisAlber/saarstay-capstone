import { it, expect, vi } from 'vitest'
import * as pricingServiceModule from '../services/pricingService'
import { calculatePrice } from './calculatePrice'

// Directly mocks the calculateBookingCost function
vi.spyOn(pricingServiceModule.pricingService, 'calculateBookingCost').mockImplementation(() => 1000)

it('should correctly calculate the price based on provided dates', async () => {
  // Example check-in and check-out dates
  const checkInDate = new Date('2024-06-01')
  const checkOutDate = new Date('2024-06-05')

  // Calls the calculatePrice procedure
  const result = await calculatePrice({
    input: { checkInDate, checkOutDate },
    ctx: {},
    rawInput: { checkInDate, checkOutDate },
    path: 'calculatePrice',
    type: 'query',
  })

  // Verify that the price is calculated correctly
  expect(result).toEqual({ price: 1000 })

  // Verify that the mocked function was called with the correct dates
  expect(pricingServiceModule.pricingService.calculateBookingCost).toHaveBeenCalledWith(
    checkInDate,
    checkOutDate
  )
})
