import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
import { z } from 'zod'

@Entity()
export class Feedback {
  @PrimaryGeneratedColumn('increment')
  id: number

  @Column('text')
  comment: string

  @Column('int')
  rating: number

  @Column('timestamp', { default: () => 'CURRENT_TIMESTAMP' })
  dateSubmitted: Date

  @Column('enum', { enum: ['pending', 'confirmed', 'canceled'], default: 'pending' })
  status: 'pending' | 'confirmed' | 'canceled'
}

export const feedbackSchema = z.object({
  comment: z.string(),
  rating: z.number().int().min(1).max(5),
  
})

export type FeedbackInsert = z.infer<typeof feedbackSchema>
