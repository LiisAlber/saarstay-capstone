import { it, expect } from 'vitest'
import { TRPCError } from '@trpc/server'
import { Feedback } from '../../../../entities'
import { fakeFeedback } from '../../../../entities/tests/fakes'
import { createTestDatabase } from '../../../../tests/utils/database'
import adminDelete from '../adminDelete'

it('should allow an admin to delete feedback', async () => {
  // Arrange
  const db = await createTestDatabase()

  // Create and save fake feedback
  const feedbackEntry = fakeFeedback()
  const savedFeedback = await db.getRepository(Feedback).save(feedbackEntry)

  const adminUser = { isAdmin: true }
  const ctx = { authUser: adminUser, db }
  const input = { feedbackId: savedFeedback.id }

  // Act
  const response = await adminDelete({
    ctx,
    input,
    rawInput: input,
    path: 'admin.deleteFeedback',
    type: 'mutation' as const,
  })

  // Assert
  expect(response).toEqual({ message: 'Feedback deleted successfully' })

  // Check if the feedback has been removed from the database
  const deletedFeedback = await db.getRepository(Feedback).findOneBy({ id: savedFeedback.id })
  expect(deletedFeedback).toBeNull()
})

it('should return an error when trying to delete non-existent feedback', async () => {
  // Arrange
  const db = await createTestDatabase()
  const adminUser = { isAdmin: true }
  const ctx = { authUser: adminUser, db }
  const nonExistentFeedbackId = 999
  const input = { feedbackId: nonExistentFeedbackId }

  // Act and Assert
  await expect(
    adminDelete({
      ctx,
      input,
      rawInput: input,
      path: 'admin.deleteFeedback',
      type: 'mutation' as const,
    })
  ).rejects.toThrow(TRPCError)
})
