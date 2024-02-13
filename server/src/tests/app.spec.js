import supertest from 'supertest';
import createApp from '../app';
import { createTestDatabase } from './utils/database';
const database = await createTestDatabase();
const app = createApp(database);
afterAll(() => {
    database.destroy();
});
it('can launch the app', async () => {
    await supertest(app).get('/api/health').expect(200, 'OK');
});
//# sourceMappingURL=app.spec.js.map