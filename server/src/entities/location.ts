import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'
import { z } from 'zod'

@Entity()
export class Location {
  @PrimaryGeneratedColumn('increment')
  id: number

  @Column({ type: 'double precision' })
  latitude: number

  @Column({ type: 'double precision' })
  longitude: number

  @Column({ type: 'varchar', nullable: true })
  address: string | null
}

export const locationSchema = z.object({
  // id is auto-generated
  latitude: z.number(),
  longitude: z.number(),
  address: z.string().optional(), // Making the address optional
})

export type LocationInsert = z.infer<typeof locationSchema>
