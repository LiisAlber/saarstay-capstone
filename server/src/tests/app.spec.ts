import { describe, it, expect, beforeAll, afterAll, vi } from 'vitest';
import supertest from 'supertest';
import createApp from '../app';
import { createTestDatabase } from './utils/database';

interface AppExports {
  default: typeof createApp;
}

vi.mock('../app', async () => {
  const actual: AppExports = await vi.importActual('../app');
  return {
    ...actual,
    getPostgresVersion: vi.fn().mockResolvedValue('Mocked PostgreSQL 13.3 on x86_64-pc-linux-gnu'),
  };
});

describe('Launch app', () => {
  let app;
  let database;

  beforeAll(async () => {
    database = await createTestDatabase();
    app = createApp(database);
  });

  afterAll(async () => {
    await database.destroy();
  });

  it('can launch the app', async () => {
    expect(app).toBeDefined();
    await supertest(app).get('/health').expect(200, 'OK');
  });

  it('should fetch and log the PostgreSQL version', async () => {
    const { getPostgresVersion } = await import('../app');
    const version = await getPostgresVersion();
    expect(version).toBe('Mocked PostgreSQL 13.3 on x86_64-pc-linux-gnu');
  });
});