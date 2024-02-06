import { it, expect, vi } from 'vitest'
import * as sendGridService from '../sendGridService'

// Mocks entire sendGridService module
vi.mock('../sendGridService', () => ({
  sendEmailWrapper: vi.fn(),
}))

it('should send an email successfully', async () => {
  // define a mock message object to simulate sending an email
  const msg = {
    to: 'test@example.com',
    from: 'noreply@example.com',
    subject: 'Test Email',
    text: 'This is a test email.',
    html: '<strong>This is a test email.</strong>',
  }

  // spy on the sendEmailWrapper function and mock its resolved value
  vi.spyOn(sendGridService, 'sendEmailWrapper').mockResolvedValue([
    {
      statusCode: 200, // mock successful response status code
      body: { message: 'Email sent successfully' }, // mock response body
      headers: {}, // mock headers
    },
    {},
  ])

  // expect the sendEmail function to complete without throwing errors
  await expect(sendGridService.sendEmailWrapper(msg)).resolves.not.toThrow()

  // assert that the sendEmailWrapper function was called with the expected message
  expect(sendGridService.sendEmailWrapper).toHaveBeenCalledWith(msg)
})
