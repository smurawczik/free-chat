import { User } from 'src/user/entities/user.entity';
import * as bcrypt from 'bcrypt';
import { MigrationInterface, QueryRunner } from 'typeorm';

export class BaseUsers1702295411048 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const users = [
      queryRunner.manager.create(User, {
        firstName: 'Admin',
        lastName: 'Admin',
        email: 'admin@localhost',
        password: await bcrypt.hash('admin', 10),
      }),
      queryRunner.manager.create(User, {
        firstName: 'sebastian',
        lastName: 'murawczik',
        email: 'sebastian.murawczik@gmail.com',
        password: await bcrypt.hash('aaaa', 10),
      }),
    ];
    await queryRunner.manager.save(users);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager.delete(User, {});
  }
}
