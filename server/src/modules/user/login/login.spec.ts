import { it, expect } from 'vitest'
import usersRouter from '..'

const userSeed = {
  id: 12345,
  email: 'existing@user.com',
  password: '$2b$10$sD53fzWIQBjXWfSDzuwmMOyY1ZAygLpRZlLxxPhcNG5r9BFWrNaDC', // Hash for 'password.123' (PASSWORD_CORRECT)
  isAdmin: true,
}

// Example using a mocked out db.
const db = {
  getRepository: () => ({
    findOne: ({ where: { email } }: any) =>
      email === userSeed.email ? { ...userSeed, isAdmin: true } : null,
  }),
}

const { adminLogin } = usersRouter.createCaller({ db } as any)

const PASSWORD_CORRECT = 'password.123'

it('returns a token and admin status if the password matches', async () => {
  const { accessToken, user } = await adminLogin({
    email: userSeed.email,
    password: PASSWORD_CORRECT,
  })

  expect(accessToken).toEqual(expect.any(String))
  expect(accessToken.slice(0, 3)).toEqual('eyJ')
  expect(user.isAdmin).toEqual(userSeed.isAdmin) // Verifies the isAdmin status
})

it('should throw an error for non-existant user', async () => {
  await expect(
    adminLogin({
      email: 'nonexisting@user.com',
      password: PASSWORD_CORRECT,
    })
  ).rejects.toThrow() // some error
})

it('should throw an error for incorrect password', async () => {
  expect(
    adminLogin({
      email: userSeed.email,
      password: 'password.123!',
    })
  ).rejects.toThrow(/password/i)
})

it('throws an error for invalid email', async () => {
  await expect(
    adminLogin({
      email: 'not-an-email',
      password: PASSWORD_CORRECT,
    })
  ).rejects.toThrow(/email/)
})

it('throws an error for a short password', async () => {
  await expect(
    adminLogin({
      email: userSeed.email,
      password: 'short',
    })
  ).rejects.toThrow(/password/)
})

it('allows logging in with different email case', async () => {
  await expect(
    adminLogin({
      email: userSeed.email.toUpperCase(),
      password: PASSWORD_CORRECT,
    })
  ).resolves.toEqual(expect.anything())
})

it('allows logging in with surrounding white space', async () => {
  await expect(
    adminLogin({
      email: ` \t ${userSeed.email}\t `, // tabs and spaces
      password: PASSWORD_CORRECT,
    })
  ).resolves.toEqual(expect.anything())
})

it('allows admin user to log in', async () => {
  const result = await adminLogin({
    email: userSeed.email,
    password: PASSWORD_CORRECT,
  })

  // Check if the returned user is an admin
  expect(result.user.isAdmin).toBe(true)
})
