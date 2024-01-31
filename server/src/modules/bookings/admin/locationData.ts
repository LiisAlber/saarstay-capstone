import { Location } from '@server/entities'
import { z } from 'zod'
import { TRPCError } from '@trpc/server'
import { authenticatedProcedure } from '@server/trpc/authProcedure'

// schema for location submission
const locationSubmissionSchema = z.object({
  latitude: z.number(),
  longitude: z.number(),
  address: z.string().optional(),
})

// schema for location update
const locationUpdateSchema = z.object({
  id: z.number().positive(),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
  address: z.string().optional(),
})

// Procedure to create a location
const createLocation = authenticatedProcedure
  .input(locationSubmissionSchema)
  .mutation(async ({ input, ctx }) => {
    const { db } = ctx

    const location = new Location()
    location.latitude = input.latitude
    location.longitude = input.longitude
    location.address = input.address ?? ''

    await db.getRepository(Location).save(location)
    return { message: 'Location successfully created' }
  })

// Procedure to update a location
const updateLocation = authenticatedProcedure
  .input(locationUpdateSchema)
  .mutation(async ({ input, ctx }) => {
    const { db } = ctx

    const locationRepo = db.getRepository(Location)
    const location = await locationRepo.findOneBy({ id: input.id })

    if (!location) {
      throw new TRPCError({ code: 'NOT_FOUND', message: 'Location not found.' })
    }

    location.latitude = input.latitude ?? location.latitude
    location.longitude = input.longitude ?? location.longitude
    location.address = input.address ?? location.address

    await locationRepo.save(location)
    return { message: 'Location successfully updated' }
  })

export { createLocation, updateLocation }
