import { User } from 'src/user/entities/user.entity';
import * as bcrypt from 'bcrypt';
import { MigrationInterface, QueryRunner } from 'typeorm';
import { Contact } from 'src/contact/entities/contact.entity';

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
      queryRunner.manager.create(User, {
        firstName: 'test',
        lastName: 'test',
        email: 'test@localhost',
        password: await bcrypt.hash('test', 10),
      }),
    ];
    await queryRunner.manager.save(users);

    const contacts = [
      queryRunner.manager.create(Contact, {
        contact: users[0],
        user: users[1],
      }),
      queryRunner.manager.create(Contact, {
        contact: users[2],
        user: users[1],
      }),
      queryRunner.manager.create(Contact, {
        contact: users[2],
        user: users[0],
      }),
    ];
    await queryRunner.manager.save(contacts);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager.delete(User, {});
    await queryRunner.manager.delete(Contact, {});
  }
}
