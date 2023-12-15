import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class PasswordService {
  private saltRounds = bcrypt.genSaltSync(10);

  async hash(password: string) {
    return bcrypt.hashSync(password, this.saltRounds);
  }

  async compare(hashPassword: string, comparePassword: string) {
    return bcrypt.compare(comparePassword, hashPassword);
  }
}
