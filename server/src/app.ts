import express from 'express'
import {
  createExpressMiddleware,
  type CreateExpressContextOptions,
} from '@trpc/server/adapters/express'
import cors from 'cors'
import postgres from 'postgres'
import type { Database } from './database'
import { appRouter } from './modules'
import type { Context } from './trpc'
import 'dotenv/config'

export default function createApp(db: Database) {
  const app = express()

  app.use(cors())

  app.use(express.json())

  // Endpoint for health checks - pinging the server to see if it's alive.
  // This can be used by tests, load balancers, monitoring tools, etc.
  app.get('/api/health', (req, res) => {
    res.status(200).send('OK')
  })

  // Using TRPC router, which will live under /api/v1/trpc
  // path. It will be used for all our procedures.
  app.use(
    '/api/v1/trpc',
    createExpressMiddleware({
      // Created context for each request, which we will be able to
      // access in our procedures.
      createContext: ({ req, res }: CreateExpressContextOptions): Context => ({
        // What we provide to our procedures under `ctx` key.
        db,
        req,
        res,
      }),

      // all routes
      router: appRouter,
    })
  )

  return app
}

export const sql = postgres(process.env.DATABASE_URL as string, {
  ssl:
    process.env.DB_SSL_IS === 'true'
      ? {
          rejectUnauthorized: true,
        }
      : undefined,
})

export async function getPostgresVersion() {
  const response = await sql`select version()`
  const [{ version }] = response

  return version
}

// Only call getPostgresVersion if not using pg-mem
if (process.env.DB_TYPE !== 'pg-mem') {
  getPostgresVersion()
}
