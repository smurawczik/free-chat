import { Test, TestingModule } from '@nestjs/testing';
import { ContactController } from '../../../../../src/modules/contact/contact.controller';
import { ContactService } from '../../../../../src/modules/contact/contact.service';

describe('ContactController', () => {
  let controller: ContactController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ContactController],
      providers: [ContactService],
    }).compile();

    controller = module.get<ContactController>(ContactController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
