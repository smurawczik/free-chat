import { User } from 'src/user/entities/user.entity';
import * as bcrypt from 'bcryptjs';
import { MigrationInterface, QueryRunner } from 'typeorm';
import { Contact } from 'src/contact/entities/contact.entity';

export class BaseUsers1702295411048 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const saltRounds = bcrypt.genSaltSync(10);
    const users = [
      queryRunner.manager.create(User, {
        firstName: 'Admin',
        lastName: 'Admin',
        email: 'admin@localhost',
        password: await bcrypt.hash('aaaa', saltRounds),
        lastConnection: new Date().toUTCString(),
      }),
      queryRunner.manager.create(User, {
        firstName: 'sebastian',
        lastName: 'murawczik',
        email: 'sebastian.murawczik@gmail.com',
        password: await bcrypt.hash('aaaa', saltRounds),
        lastConnection: new Date(new Date()).toUTCString(),
      }),
      queryRunner.manager.create(User, {
        firstName: 'test',
        lastName: 'test',
        email: 'test@localhost',
        password: await bcrypt.hash('aaaa', saltRounds),
        lastConnection: new Date(
          new Date().setDate(new Date().getDate() - 2),
        ).toUTCString(),
      }),
      queryRunner.manager.create(User, {
        firstName: 'pepe',
        lastName: 'grillo',
        email: 'pepe@localhost',
        password: await bcrypt.hash('aaaa', saltRounds),
        lastConnection: new Date(
          new Date().getTime() - 20 * 60000,
        ).toUTCString(),
      }),
      queryRunner.manager.create(User, {
        firstName: 'pepe',
        lastName: 'pepe',
        email: 'admin@pepe.com',
        password: await bcrypt.hash('aaaa', saltRounds),
        lastConnection: new Date(new Date()).toUTCString(),
      }),
    ];
    await queryRunner.manager.save(users);

    const contacts = [
      queryRunner.manager.create(Contact, {
        contact: users[0],
        status: 'accepted',
        user: users[1],
      }),
      queryRunner.manager.create(Contact, {
        contact: users[2],
        status: 'accepted',
        user: users[1],
      }),
      queryRunner.manager.create(Contact, {
        contact: users[2],
        status: 'accepted',
        user: users[0],
      }),
      queryRunner.manager.create(Contact, {
        contact: users[3],
        status: 'pending',
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
