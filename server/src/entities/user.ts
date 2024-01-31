import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
import { z } from 'zod'
import { validates } from '@server/utils/validation'

@Entity()
export class User {
  @PrimaryGeneratedColumn('increment')
  id: number

  @Column('text')
  email: string

  @Column('text', { select: false })
  password: string

  @Column('boolean', { default: true })
  isAdmin: boolean
}

export const userSchema = z.object({
  id: z.number().int().positive(),
  email: z.string().trim().toLowerCase().email(),
  password: z.string().min(8).max(64),
  isAdmin: z.boolean(),
})

export type UserInsert = z.infer<typeof userSchema>

export type AuthUser = Pick<User, 'id' | 'isAdmin'>

export const authUserSchema = validates<AuthUser>().with({
  id: z.number().int().positive(),
  isAdmin: z.boolean(),
})
