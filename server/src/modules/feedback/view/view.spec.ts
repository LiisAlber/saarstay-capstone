import { it, expect } from 'vitest'
import { DataSource } from 'typeorm'
import { TRPCError } from '@trpc/server'
import { Feedback } from '../../../entities';
import { fakeFeedback } from '../../../entities/tests/fakes';
import { createTestDatabase } from '../../../tests/utils/database'

it('should return a list of confirmed feedbacks', async () => {
  const db: DataSource = await createTestDatabase()

  // Create and save fake feedback entries
  const feedbackEntries = [
    fakeFeedback({ status: 'confirmed' }),
    fakeFeedback({ status: 'confirmed' }),
  ]
  await db.getRepository(Feedback).save(feedbackEntries)

  // Query the confirmed feedback
  const feedbacks = await db.getRepository(Feedback).find({
    where: { status: 'confirmed' },
  })

  // Assertions
  expect(feedbacks).toHaveLength(2)
  feedbacks.forEach((feedback) => {
    expect(feedback).toMatchObject({
      id: expect.any(Number),
      comment: expect.any(String),
      dateSubmitted: expect.any(Date),
      rating: expect.any(Number),
      status: 'confirmed',
    })
  })

  // Cleanup
  await db.getRepository(Feedback).clear()
})

it('should handle empty feedback list gracefully', async () => {
  const db: DataSource = await createTestDatabase()

  const feedbacks = await db.getRepository(Feedback).find()
  expect(feedbacks).toHaveLength(0)

  // Cleanup
  await db.getRepository(Feedback).clear()
})

it('should correctly identify TRPCError', () => {
  const error = new TRPCError({
    code: 'INTERNAL_SERVER_ERROR',
    message: 'Test error',
  })
  expect(error).toBeInstanceOf(TRPCError)
  expect(error.code).toBe('INTERNAL_SERVER_ERROR')
})
