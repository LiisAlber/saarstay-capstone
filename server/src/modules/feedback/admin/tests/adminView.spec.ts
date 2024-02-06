import { it, expect } from 'vitest'
import { Feedback } from '../../../../entities'
import { fakeFeedback } from '../../../../entities/tests/fakes'
import { createTestDatabase } from '../../../../tests/utils/database'
import adminView from '../adminView'

it('should return a list of feedbacks for an admin user', async () => {
  // Setup test database
  const db = await createTestDatabase()

  // Seed two feedback entries for this test
  const feedbackEntries = [fakeFeedback(), fakeFeedback()]
  await db.getRepository(Feedback).save(feedbackEntries)

  // Create fake admin context
  const adminContext = { authUser: { isAdmin: true }, db }

  // Act
  const result = (await adminView({
    ctx: adminContext,
    path: 'admin.feedback.view',
    type: 'query' as const,
    rawInput: {},
  })) as Feedback[]

  // Assert
  expect(result).toHaveLength(2)
})

it('should return an empty array when no feedback is available', async () => {
  // Setup test database
  const db = await createTestDatabase()

  // Create fake admin context
  const adminContext = { authUser: { isAdmin: true }, db }

  // Act
  const result = (await adminView({
    ctx: adminContext,
    path: 'admin.feedback.view',
    type: 'query' as const,
    rawInput: {},
  })) as Feedback[]

  // Assert
  expect(result).toEqual([])
})
