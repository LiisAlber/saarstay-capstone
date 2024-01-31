import bcrypt from 'bcrypt'
import config from '@server/config'
import jsonwebtoken from 'jsonwebtoken'
import { publicProcedure } from '@server/trpc'
import { User } from '@server/entities'
import { TRPCError } from '@trpc/server'
import { userSchema } from '@server/entities/user'
import { prepareTokenPayload } from '../tokenPayload'

const { expiresIn, tokenKey } = config.auth

export const adminLogin = publicProcedure
  .input(
    userSchema.pick({
      email: true,
      password: true,
    })
  )
  .mutation(async ({ input: { email, password }, ctx: { db } }) => {
    const user = await db.getRepository(User).findOne({
      where: { email },
      select: ['id', 'password', 'isAdmin'],
    })

    if (!user || !user.isAdmin) {
      throw new TRPCError({
        code: 'UNAUTHORIZED',
        message: 'Access denied. Admin only.',
      })
    }

    const passwordMatch = await bcrypt.compare(password, user.password)
    if (!passwordMatch) {
      throw new TRPCError({
        code: 'UNAUTHORIZED',
        message: 'Incorrect email or password. Try again.',
      })
    }

    const payload = prepareTokenPayload(user)
    const accessToken = jsonwebtoken.sign(payload, tokenKey, { expiresIn })

    return {
      accessToken,
      user: {
        id: user.id,
        isAdmin: user.isAdmin,
      },
    }
  })
