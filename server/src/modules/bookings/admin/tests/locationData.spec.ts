import { it, expect } from 'vitest'
// eslint-disable-next-line import/no-useless-path-segments
import { appRouter } from '../../../../modules/index';
import { User, Location } from '../../../../entities';
import { fakeAdminUser } from '../../../../entities/tests/fakes';
import { authContext } from '../../../../tests/utils/context';
import { createTestDatabase } from '../../../../tests/utils/database'

it('should create a location', async () => {
  const db = await createTestDatabase()
  const adminUser = await db.getRepository(User).save(fakeAdminUser())

  const locationData = { latitude: 40.7128, longitude: -74.006, address: 'New York, NY' }

  const { bookings } = appRouter.createCaller(authContext({ db }, adminUser))
  const { admin } = bookings

  await admin.createLocation(locationData)

  const savedLocation = await db
    .getRepository(Location)
    .findOneBy({ latitude: 40.7128, longitude: -74.006 })
  expect(savedLocation).not.toBeNull()
  expect(savedLocation?.address).toBe('New York, NY')
})

it('should update a location', async () => {
  const db = await createTestDatabase()
  const adminUser = await db.getRepository(User).save(fakeAdminUser())

  const originalLocation = await db.getRepository(Location).save({
    latitude: 40.7128,
    longitude: -74.006,
    address: 'New York, NY',
  })

  const { bookings } = appRouter.createCaller(authContext({ db }, adminUser))
  const { admin } = bookings

  await admin.updateLocation({
    id: originalLocation.id,
    address: 'Updated Address',
  })

  const updatedLocation = await db.getRepository(Location).findOneBy({ id: originalLocation.id })
  expect(updatedLocation).not.toBeNull()
  expect(updatedLocation?.address).toBe('Updated Address')
})
