import crypto from 'crypto'
import { publicProcedure } from '@server/trpc'
import { Booking } from '@server/entities'
import { TRPCError } from '@trpc/server'
import { z } from 'zod'
import logger from '../../../logger';
import { checkRoomAvailability } from '../services/roomAvailabilityService'
import { sendBookingConfirmationEmail } from '../services/bookingEmailService'
import { pricingService } from '../services/pricingService'
import { createPaymentIntent } from '../services/stripeService'

// const currentDate = new Date()

// Define a schema for the booking submission
const bookingSubmissionSchema = z.object({
  userId: z.number().int().positive().optional(),
  guestName: z
    .string()
    .min(1, { message: 'error.guestName.required' })
    .max(100, { message: 'error.guestName.maxLength' })
    .regex(/^[a-zA-Z\s'-]+$/, { message: 'error.guestName.invalidCharacters' }),
  guestEmail: z
    .string()
    .email({ message: 'error.guestEmail.invalidFormat' })
    .max(100, { message: 'error.guestEmail.maxLength' }),
  guestContactNumber: z
    .string()
    .min(1, { message: 'error.guestContactNumber.required' })
    .max(20, { message: 'error.guestContactNumber.maxLength' })
    .regex(/^[0-9+()-\s]+$/, { message: 'error.guestContactNumber.invalidFormat' }),
  checkInDate: z
    .date()
    .min(new Date(), { message: 'error.checkInDate.pastDate' }),
  checkOutDate: z
    .date()
    .min(new Date(), { message: 'error.checkOutDate.pastDate' }),
  numberOfGuests: z
    .number()
    .int({ message: 'error.numberOfGuests.integer' })
    .min(1, { message: 'error.numberOfGuests.minGuests' })
    .max(10, { message: 'error.numberOfGuests.maxGuests' }),
  specialRequests: z
    .string()
    .max(500, { message: 'error.specialRequests.maxLength' })
    .nullable()
    .default(null),
});


export default publicProcedure
  .input(bookingSubmissionSchema)
  .mutation(async ({ input, ctx: { db } }) => {
    try {
      const validInput = bookingSubmissionSchema.safeParse(input)
      if (!validInput.success) {
        const validationMessages = validInput.error.errors.map((error) => error.message)
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: validationMessages.join('; '),
        })
      }

      const checkInDate = new Date(input.checkInDate)
      const checkOutDate = new Date(input.checkOutDate)
      const totalPrice = pricingService.calculateBookingCost(checkInDate, checkOutDate)

      if (!(await checkRoomAvailability(checkInDate, checkOutDate, db))) {
        throw new TRPCError({
          code: 'CONFLICT',
          message: 'Selected dates are not available.',
        })
      }

      // Create the booking instance
      let booking = new Booking()
      booking.guestName = input.guestName
      booking.guestEmail = input.guestEmail
      booking.guestContactNumber = input.guestContactNumber
      booking.checkInDate = new Date(input.checkInDate)
      booking.checkOutDate = new Date(input.checkOutDate)
      booking.numberOfGuests = input.numberOfGuests
      booking.specialRequests = input.specialRequests
      booking.status = 'pending'
      booking.totalPrice = totalPrice

      // Save the booking to get the generated id
      booking = await db.getRepository(Booking).save(booking)

      // generate and set the hashedId
      booking.hashedId = crypto.createHash('sha256').update(String(booking.id)).digest('hex')

      // Save the booking again to store the hashedId
      booking = await db.getRepository(Booking).save(booking)

      const paymentIntent = await createPaymentIntent(booking.totalPrice, 'eur', {
        bookingId: booking.hashedId!,
      })

      // Update the booking with payment intent details
      booking.stripePaymentIntentId = paymentIntent.id
      booking.paymentStatus = 'pending'
      booking = await db.getRepository(Booking).save(booking)

      const clientSecret = paymentIntent.client_secret

      // Send confirmation email
      await sendBookingConfirmationEmail({
        guestName: booking.guestName ?? 'Guest',
        guestEmail: booking.guestEmail ?? 'noemail@example.com',
        checkInDate: booking.checkInDate,
        checkOutDate: booking.checkOutDate,
        numberOfGuests: booking.numberOfGuests,
        guestContactNumber: booking.guestContactNumber ?? 'No contact number provided',
        specialRequests: booking.specialRequests ?? 'No special requests',
      })

      // Return booking details with the hashed ID
      return {
        message: 'Booking successfully created. Proceed to payment.',
        bookingId: booking.hashedId,
        bookingDetails: booking,
        totalPrice,
        clientSecret,
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        const validationMessages = error.issues.map((issue) => issue.message)
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: validationMessages.join('; '),
        })
      } else if (error instanceof TRPCError) {
        // eslint-disable-next-line no-console
        logger.error("TRPCError details:", error);
        throw error
      } else {
        // eslint-disable-next-line no-console
        logger.error("Unexpected error:", error);
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'An unexpected error occurred',
        })
      }
    }
  })
