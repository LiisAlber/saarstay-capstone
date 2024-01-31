import { createDatabase } from '@server/database';
import config from '@server/config';
export async function createTestDatabase() {
    const db = createDatabase(config.database);
    await db.initialize();
    return db;
}
export function createMockDatabase(repositories) {
    return {
        getRepository: (entity) => {
            if (!(entity.name in repositories)) {
                throw new Error(`Repository for ${entity.name} was not found. Did you forget to mock it?`);
            }
            return repositories[entity.name];
        },
    };
}
//# sourceMappingURL=database.js.map