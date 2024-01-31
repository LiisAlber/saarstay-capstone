import { it, expect } from 'vitest';
import { PricingService } from '../pricingService';

it('should calculate price correctly', async () => {
    const defaultRate = 150;
    const seasonalRates = [
        { start: '2024-06-01', end: '2024-08-31', rate: 200 },
        { start: '2024-12-20', end: '2025-01-05', rate: 180 },
    ];

    const pricingService = new PricingService(defaultRate, seasonalRates)

    const checkInDate = new Date('2024-07-01');
    const checkOutDate = new Date('2024-07-03');

    const expectedCost = 2 * 200;

    expect(pricingService.calculateBookingCost(checkInDate, checkOutDate)).toBe(expectedCost)
})
