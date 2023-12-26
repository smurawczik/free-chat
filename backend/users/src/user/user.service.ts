import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PasswordService } from 'src/password/password.service';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private readonly passwordService: PasswordService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const hashedPassword = await this.passwordService.hash(
      createUserDto.password,
    );

    const newUser = this.usersRepository.create({
      firstName: createUserDto.firstName,
      lastName: createUserDto.lastName,
      email: createUserDto.email,
      password: hashedPassword,
    });

    return this.usersRepository.save(newUser);
  }

  async find(email: string, password: string) {
    const user = await this.usersRepository.findOne({
      where: { email },
    });

    if (!user) {
      throw new Error('User not found');
    }

    const isPasswordMatching = await this.passwordService.compare(
      user.password,
      password,
    );

    if (!isPasswordMatching) {
      throw new Error('Error');
    }

    return user;
  }

  findMe(userId: string) {
    return this.usersRepository.findOne({
      where: { id: userId },
    });
  }

  findAll() {
    return this.usersRepository.find();
  }

  findOne(id: string) {
    return this.usersRepository.findOne({
      where: { id },
    });
  }

  async findLastConnection(
    id: string,
  ): Promise<{ lastConnection?: string | null }> {
    const user = await this.usersRepository.findOne({
      where: { id },
      select: {
        lastConnection: true,
      },
    });
    return { lastConnection: user?.lastConnection };
  }

  async updateLastConnection(
    id: string,
    lastConnection: string,
  ): Promise<{ lastConnection?: string | null }> {
    const updated = await this.usersRepository.update(id, {
      lastConnection: new Date().toUTCString(),
    });

    if (!updated?.affected) {
      return { lastConnection: null };
    }

    return { lastConnection };
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    console.log('updateUserDto', updateUserDto);

    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
