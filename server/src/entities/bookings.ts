import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
import { validates } from '@server/utils/validation'
import { z } from 'zod'

@Entity()
export class Booking {
  @PrimaryGeneratedColumn('increment')
  id: number

  @Column('varchar', { nullable: true })
  hashedId?: string

  @Column('text', { nullable: true })
  guestName: string | null

  @Column('text', { nullable: true })
  guestEmail: string | null

  @Column('text', { nullable: true })
  guestContactNumber: string | null

  @Column('timestamptz')
  checkInDate: Date

  @Column('timestamptz')
  checkOutDate: Date

  @Column('int')
  numberOfGuests: number

  @Column('text', { nullable: true })
  specialRequests: string | null

  @Column('enum', { enum: ['confirmed', 'pending', 'canceled'] })
  status: 'confirmed' | 'pending' | 'canceled'

  @Column('varchar', { nullable: true })
  stripePaymentIntentId?: string // Stores the Stripe Payment Intent ID

  @Column('enum', { enum: ['pending', 'succeeded', 'failed'], nullable: true })
  paymentStatus?: 'pending' | 'succeeded' | 'failed' // Stores the status of the payment

  @Column('decimal')
  totalPrice: number
}

export type BookingBare = Omit<Booking, 'id' | 'hashedId'>

export const bookingSchema = validates<BookingBare>().with({
  guestName: z.string().nullable(),
  guestEmail: z.string().email().nullable(),
  guestContactNumber: z.string().nullable(),
  checkInDate: z.coerce.date(),
  checkOutDate: z.coerce.date(),
  numberOfGuests: z.number().int().positive(),
  specialRequests: z.string().nullable(),
  status: z.enum(['confirmed', 'pending', 'canceled']),
  stripePaymentIntentId: z.string().optional(),
  paymentStatus: z.enum(['pending', 'succeeded', 'failed']).optional(),
  totalPrice: z.number(),
})

export type BookingSchemaType = z.infer<typeof bookingSchema>

export const bookingInsertSchema = bookingSchema.extend({})

export type BookingInsert = z.infer<typeof bookingInsertSchema>
