import { it, describe, afterAll, beforeAll } from 'vitest'
import supertest from 'supertest';
import createApp from '../app';
import { createTestDatabase } from './utils/database';

describe('Launch app', () => {
  let database;
  let app;

  beforeAll(async () => {
    database = await createTestDatabase();
    app = createApp(database);
  });

  afterAll(() => {
    database.destroy();
  });

  it('can launch the app', async () => {
    await supertest(app).get('/health').expect(200, 'OK');
  });
});
