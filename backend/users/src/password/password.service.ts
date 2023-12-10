import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class PasswordService {
  private saltRounds = 10;

  async hash(password: string) {
    return bcrypt.hash(password, this.saltRounds);
  }

  async compare(hashPassword: string, comparePassword: string) {
    return bcrypt.compare(comparePassword, hashPassword);
  }
}
