import { TRPCError } from '@trpc/server'
import { Booking } from '@server/entities'
import { z } from 'zod'
import { authenticatedProcedure } from '@server/trpc/authProcedure'
import provideRepos from '@server/trpc/provideRepos'

// Defined schemas for confirming, canceling, editing bookings
const confirmBookingSchema = z.object({
  bookingId: z.number().positive(),
})

const cancelBookingSchema = z.object({
  bookingId: z.number().positive(),
})

const updateBookingSchema = z.object({
  bookingId: z.number().positive(),
  guestName: z.string().optional(),
  guestEmail: z.string().email().optional(),
  guestContactNumber: z.string().optional(),
  checkInDate: z.date().optional(),
  checkOutDate: z.date().optional(),
  numberOfGuests: z.number().int().positive().optional(),
  specialRequests: z.string().optional(),
})

// Procedure to confirm a booking (admin only)
const confirmBooking = authenticatedProcedure
  .use(provideRepos({ Booking }))
  .input(confirmBookingSchema)
  .mutation(async ({ input, ctx: { repos } }) => {
    const bookingToUpdate = await repos.Booking.findOne({
      where: { id: input.bookingId },
    });

    if (!bookingToUpdate) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'Booking not found.',
      });
    }

    // Allow confirming if booking is either pending or canceled
    if (bookingToUpdate.status === 'pending' || bookingToUpdate.status === 'canceled') {
      bookingToUpdate.status = 'confirmed';
      await repos.Booking.save(bookingToUpdate);
      return bookingToUpdate;
    }

    throw new TRPCError({
      code: 'CONFLICT',
      message: 'Booking cannot be confirmed in its current state.',
    });
  });


// Procedure to cancel a booking (admin only)
const cancelBooking = authenticatedProcedure
  .use(provideRepos({ Booking }))
  .input(cancelBookingSchema)
  .mutation(async ({ input, ctx: { repos } }) => {
    const bookingToCancel = await repos.Booking.findOne({
      where: { id: input.bookingId },
    })

    if (!bookingToCancel) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'Booking not found.',
      })
    }

    bookingToCancel.status = 'canceled'
    await repos.Booking.save(bookingToCancel)
    return bookingToCancel
  })

// Procedure to update a booking (admin only)
const updateBooking = authenticatedProcedure
  .use(provideRepos({ Booking }))
  .input(updateBookingSchema)
  .mutation(async ({ input, ctx: { repos } }) => {
    const { bookingId, ...updateData } = input

    const bookingToUpdate = await repos.Booking.findOne({
      where: { id: bookingId },
    })

    if (!bookingToUpdate) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'Booking not found.',
      })
    }

    // Update the booking with new data
    const updatedBooking = await repos.Booking.save({
      ...bookingToUpdate,
      ...updateData,
    })

    return updatedBooking
  })

export { confirmBooking, cancelBooking, updateBooking }
