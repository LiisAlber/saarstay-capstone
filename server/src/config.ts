import 'dotenv/config';
import z from 'zod';

const { env } = process;

if (!env.NODE_ENV) env.NODE_ENV = 'development';

const isTest = env.NODE_ENV === 'test';
const isDevTest = env.NODE_ENV === 'development' || isTest;

// Utility function
function coerceBoolean(value: unknown) {
  if (typeof value === 'string') {
    return value === 'true' || value === '1';
  }
  return false;
}

const databaseSchema = z.object({
  type: z.enum(['postgres', 'mysql', 'mariadb', 'better-sqlite3', 'pg-mem', 'neon']).default('postgres'),
  host: z.string().optional(),
  port: z.number().optional().default(5432),
  username: z.string().optional(),
  password: z.string().optional(),
  database: z.string().optional(),
  logging: z.boolean().default(false),
  synchronize: z.boolean().default(true),
  ssl: z.boolean().default(false),
});

const schema = z.object({
  env: z.enum(['development', 'production', 'staging', 'test']).default('development'),
  isCi: z.boolean().default(coerceBoolean(env.CI)),
  port: z.coerce.number().default(3000),
  database: databaseSchema,

  auth: z.object({
    tokenKey: z.string().default(() => {
      if (isDevTest) {
        return 'dev-token-key';
      }
      throw new Error('You must provide a token key in production env!');
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
}).readonly();

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
    type: env.DB_TYPE as 'mysql' | 'mariadb' | 'postgres' | 'better-sqlite3' | 'pg-mem',
    host: env.DB_HOST,
    port: parseInt(env.DB_PORT || '5432', 10),
    username: env.DB_USER,
    password: env.DB_PASSWORD,
    database: env.DB_NAME,
    logging: coerceBoolean(env.DB_LOGGING),
    synchronize: coerceBoolean(env.DB_SYNC),
    ssl: true,
  },
});

export default config;

export const SENDGRID_API_KEY = config.sendGrid.apiKey;
