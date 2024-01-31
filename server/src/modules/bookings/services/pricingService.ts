type SeasonalRate = {
  start: string
  end: string
  rate: number
}

export class PricingService {
  private defaultRate: number

  private seasonalRates: SeasonalRate[]

  constructor(defaultRate: number, seasonalRates: SeasonalRate[]) {
    this.defaultRate = defaultRate
    this.seasonalRates = seasonalRates
  }

  private getSeasonRate(date: Date): number {
    const dateString = date.toISOString().split('T')[0]
    const seasonRate = this.seasonalRates.find(
      (sRate) => dateString >= sRate.start && dateString <= sRate.end
    )
    return seasonRate ? seasonRate.rate : this.defaultRate
  }

  public calculateBookingCost(checkInDate: Date, checkOutDate: Date): number {
    let totalCost = 0
    const currentDate = new Date(checkInDate)

    while (currentDate < checkOutDate) {
      totalCost += this.getSeasonRate(currentDate)
      currentDate.setDate(currentDate.getDate() + 1)
    }

    return totalCost
  }
}

// Prices
const defaultRate = 150
const seasonalRates = [
  { start: '2024-06-01', end: '2024-08-31', rate: 200 },
  { start: '2024-12-20', end: '2025-01-05', rate: 180 },
]

export const pricingService = new PricingService(defaultRate, seasonalRates)
