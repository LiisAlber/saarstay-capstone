import { it, expect, vi } from 'vitest'
import { sendBookingConfirmationEmail } from '../bookingEmailService'
import * as sendGridService from '../sendGridService'

vi.mock('../sendGridService', () => ({
  sendEmail: vi.fn(),
}))

it('should format booking details correctly and call sendEmail', async () => {
  const bookingDetails = {
    guestName: 'John Doe',
    guestEmail: 'johndoe@example.com',
    checkInDate: new Date('2024-02-14'),
    checkOutDate: new Date('2024-02-18'),
    numberOfGuests: 2,
    guestContactNumber: '1234567890',
    specialRequests: 'A bouquet of roses',
  }

  await sendBookingConfirmationEmail(bookingDetails)

  expect(sendGridService.sendEmail).toHaveBeenCalledWith({
    to: 'johndoe@example.com',
    from: 'liislepanurm@gmail.com',
    subject: 'Booking Confirmation',
    text: expect.stringContaining('John Doe'),
    html: expect.stringContaining('John Doe'),
  })
})
