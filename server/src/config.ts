import 'dotenv/config'
import z from 'zod'

const { env } = process

if (!env.NODE_ENV) env.NODE_ENV = 'development'

const isTest = env.NODE_ENV === 'test'
const isDevTest = env.NODE_ENV === 'development' || isTest

const inMemoryDatabaseSchema = z.object({
  type: z.literal('pg-mem'),
  host: z.string().default('localhost'),
  port: z.coerce.number().default(5432),
  database: z.string().default('test'),
  username: z.string().default('test'),
  password: z.string().default('test'),
  logging: z.boolean().default(false),
  synchronize: z.boolean().default(true),
});

const regularDatabaseSchema = z.object({
  type: z.enum(['postgres', 'mysql', 'mariadb', 'better-sqlite3']).default('postgres'),
  host: z.string().default(env.DB_HOST || 'localhost'),
  port: z.coerce.number().default(5432),
  database: z.string().optional().default(env.DB_NAME || 'defaultDatabase'),
  username: z.string().optional().default(env.DB_USER || 'defaultUsername'),
  password: z.string().optional().default(env.DB_PASSWORD || 'defaultPassword'),
  logging: z.preprocess(coerceBoolean, z.boolean().default(isDevTest)),
  synchronize: z.preprocess(coerceBoolean, z.boolean().default(isDevTest)),
  ssl: z.boolean().default(true),
});

// Function to select the appropriate schema
function selectDatabaseSchema() {
  return env.DB_TYPE === 'pg-mem' ? inMemoryDatabaseSchema : regularDatabaseSchema;
}
const schema = z
  .object({
    env: z.enum(['development', 'production', 'staging', 'test']).default('development'),
    isCi: z.boolean().default(coerceBoolean(env.CI)),
    port: z.coerce.number().default(3000),
    database: selectDatabaseSchema(),

    auth: z.object({
      tokenKey: z.string().default(() => {
        if (isDevTest) {
          return 'dev-token-key' // Provide a default token key for non-production environments
        }
        throw new Error('You must provide a token key in production env!')
      }),
      expiresIn: z.string().default('7d'),
      passwordCost: z.coerce.number().default(isDevTest ? 6 : 12),
    }),

    sendGrid: z.object({
      apiKey: z.string(),
    }),

    stripe: z.object({
      secretKey: z.string(),
      publishableKey: z.string(),
    }),
    
  })
  .readonly()

const config = schema.parse({
  env: env.NODE_ENV,
  port: env.PORT,
  isCi: coerceBoolean(env.CI),

  auth: {
    tokenKey: env.TOKEN_KEY,
    expiresIn: env.TOKEN_EXPIRES_IN,
    passwordCost: env.PASSWORD_COST,
  },

  sendGrid: {
    apiKey: env.SENDGRID_API_KEY,
  },

  stripe: {
    secretKey: env.STRIPE_SECRET_KEY,
    publishableKey: env.STRIPE_PUBLISHABLE_KEY,
  },

  database: {
    type: env.DB_TYPE,
    host: env.DB_HOST,
    port: env.DB_PORT,
    database: env.DB_NAME,
    username: env.DB_USER,
    password: env.DB_PASSWORD,
    logging: env.DB_LOGGING,
    synchronize: env.DB_SYNC,
    ssl: true,
  },
})

export default config

// utility functions
function coerceBoolean(value: unknown) {
  if (typeof value === 'string') {
    return value === 'true' || value === '1';
  }
  return false; 
}

export const SENDGRID_API_KEY = config.sendGrid.apiKey;
