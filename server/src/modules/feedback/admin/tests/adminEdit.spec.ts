import { it, expect } from 'vitest'
import { TRPCError } from '@trpc/server'
import { Feedback } from '../../../../entities';
import { fakeFeedback } from '../../../../entities/tests/fakes';
import { createTestDatabase } from '../../../../tests/utils/database'
import adminEdit from '../adminEdit'

it('should allow an admin to edit feedback', async () => {
  // Setup test database
  const db = await createTestDatabase()

  // Create and save fake feedback
  const feedbackEntry = fakeFeedback()
  const savedFeedback = await db.getRepository(Feedback).save(feedbackEntry)

  const updatedComment = 'Updated comment'
  const updatedStatus = 'confirmed'
  const feedbackId = savedFeedback.id

  const ctx = {
    authUser: { isAdmin: true },
    db,
  }

  const input = {
    feedbackId,
    updatedComment,
    updatedStatus
  }

  // Act
  const updatedFeedback = (await adminEdit({
    ctx,
    input,
    rawInput: input,
    path: 'admin.editFeedback',
    type: 'mutation' as const,
  })) as Feedback

  // Assert
  expect(updatedFeedback.comment).toBe(updatedComment)
})

it('should return an error when feedback is not found', async () => {
  // Setup test database
  const db = await createTestDatabase()

  const nonExistentFeedbackId = 999
  const updatedComment = 'Updated comment'

  const ctx = {
    authUser: { isAdmin: true },
    db,
  }

  const input = {
    feedbackId: nonExistentFeedbackId,
    updatedComment,
  }

  // Act and Assert
  await expect(
    adminEdit({
      ctx,
      input,
      rawInput: input,
      path: 'admin.editFeedback',
      type: 'mutation' as const,
    })
  ).rejects.toThrow(TRPCError)
})
