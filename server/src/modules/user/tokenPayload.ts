import type { AuthUser } from '@server/entities/user'
import z from 'zod'

// We have move out the token payload logic into a separate file.
// As we would like to keep both sides of token handling in one place.

const tokenPayloadSchema = z.object({
  user: z.object({
    id: z.number(),
    isAdmin: z.boolean(),
  }),
})

type TokenPayload = z.infer<typeof tokenPayloadSchema>

/**
 * Prepares the token payload for the given user.
 * @param user The authenticated user.
 * @returns The token payload containing the user information.
 */
export function prepareTokenPayload(user: AuthUser): TokenPayload {
  // Ensure that the AuthUser type includes the isAdmin property
  return tokenPayloadSchema.parse({
    user: {
      id: user.id,
      isAdmin: user.isAdmin, // Pass isAdmin to the payload
    },
  })
}

/**
 * Parses the payload of a verified JWT token.
 * @param tokenVerified - The verified JWT token.
 * @returns The parsed token payload.
 */
export function parseTokenPayload(tokenVerified: unknown): TokenPayload {
  return tokenPayloadSchema.parse(tokenVerified)
}
