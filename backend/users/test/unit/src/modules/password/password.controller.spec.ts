import { Test, TestingModule } from '@nestjs/testing';
import { PasswordController } from '../../../../../src/modules/password/password.controller';
import { PasswordService } from '../../../../../src/modules/password/password.service';

describe('PasswordController', () => {
  let controller: PasswordController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PasswordController],
      providers: [PasswordService],
    }).compile();

    controller = module.get<PasswordController>(PasswordController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
