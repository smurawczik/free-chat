import { Body, Controller, Post, Sse } from '@nestjs/common';
import { EventsService } from './events.service';

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Sse('events')
  events() {
    return this.eventsService.subscribe();
  }

  @Post('emit')
  async emit(@Body() body: any) {
    this.eventsService.emit({ emitting: new Date().toISOString(), ...body });
    return { ok: true };
  }
}
