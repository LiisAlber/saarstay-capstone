import { it, expect } from 'vitest'
import { DataSource } from 'typeorm'
import { createTestDatabase } from '../../../tests/utils/database'
import submit from '.'

it('should successfully submit feedback', async () => {
  // Setup test database
  const db: DataSource = await createTestDatabase()

  // Define feedback input
  const feedbackInput = {
    comment: 'Great service!',
    rating: 5,
    status: 'pending',
  }

  // Act: Submit feedback
  const feedbackCreated = await submit({
    ctx: { db },
    rawInput: feedbackInput,
    path: 'dummyPath',
    type: 'mutation',
  })

  // Assert: Check if feedback is created as expected
  const expected = {
    comment: 'Great service!',
    rating: 5,
    status: 'pending', // Expect the status to be 'pending'
    dateSubmitted: expect.any(Date),
  }

  expect(feedbackCreated).toMatchObject(expected)
})
