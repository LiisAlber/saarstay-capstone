import { MigrationInterface, QueryRunner } from 'typeorm'
import bcrypt from 'bcrypt'

export class CreateAdminUser1704443258792 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const adminPassword = process.env.ADMIN_PASSWORD
    if (!adminPassword) {
      throw new Error('Admin initial password not set in environment variables.')
    }

    const hashedPassword = await bcrypt.hash(adminPassword, 10)

    await queryRunner.query(
      `INSERT INTO "user" (email, password, is_admin) VALUES ('admin@admin.com', '${hashedPassword}', true)`
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // SQL statement to remove the admin user
    await queryRunner.query(`DELETE FROM user WHERE email = 'admin@admin.com'`)
  }
}
