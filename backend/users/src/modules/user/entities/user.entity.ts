import { Contact } from 'src/modules/contact/entities/contact.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ nullable: true, type: 'timestamptz' })
  lastConnection: string | null;

  @OneToMany(() => Contact, (contact) => contact.user)
  contacts: Contact[];
}
