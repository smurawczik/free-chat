import { Controller, Get, Inject } from '@nestjs/common';
import { AppService } from './app.service';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @Inject('USER_SERVICE') private client: ClientProxy,
  ) {}

  @Get('/')
  async ping() {
    return { message: 'Orchestrator is up and running' };
  }

  @Get('/users')
  async getAllUsers(): Promise<any> {
    return firstValueFrom(this.client.send('findAllUser', {}));
  }
}
