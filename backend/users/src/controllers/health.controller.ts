import { Controller, Get } from '@nestjs/common';

@Controller('health')
export class HealthController {
  @Get()
  healthCheck(): object {
    return { status: 'ok' };
  }
}
