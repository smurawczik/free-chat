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
        password: await bcrypt.hash('aaaa', 10),
        lastConnection: new Date().toUTCString(),
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
        password: await bcrypt.hash('aaaa', 10),
        lastConnection: new Date(
          new Date().setDate(new Date().getDate() - 2),
        ).toUTCString(),
      }),
      queryRunner.manager.create(User, {
        firstName: 'pepe',
        lastName: 'grillo',
        email: 'pepe@localhost',
        password: await bcrypt.hash('aaaa', 10),
        lastConnection: new Date(
          new Date().getTime() - 20 * 60000,
        ).toUTCString(),
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
      queryRunner.manager.create(Contact, {
        contact: users[3],
        user: users[1],
      }),
    ];
    await queryRunner.manager.save(contacts);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager.delete(User, {});
    await queryRunner.manager.delete(Contact, {});
  }
}
