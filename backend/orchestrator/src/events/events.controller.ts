import { Body, Controller, HttpStatus, Post, Res, Sse } from '@nestjs/common';
import { EventsService } from './events.service';
import { Response } from 'express';

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Sse('subscribe')
  subscribe() {
    return this.eventsService.subscribeLastConnection();
  }

  @Post('last-connection-event')
  async lastConnection(
    @Res() res: Response,
    @Body() body: { userId: string; lastConnection: string },
  ) {
    // Emit the event to the frontend with new connection data
    this.eventsService.emitLastConnection(body);

    return res.status(HttpStatus.OK).send({ message: 'OK' });
  }
}
